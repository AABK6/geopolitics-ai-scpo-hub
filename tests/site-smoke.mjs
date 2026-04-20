import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import process from 'node:process';

import {
  STATIC_TEXT_EXTENSIONS,
  VALID_GROUPS,
  getChangedFiles,
  getSubmissionScope,
  parseCliArgs,
  toPosixPath,
  writeGitHubNotice
} from './lib/submission-utils.mjs';

function contentTypeFor(filePath) {
  switch (path.extname(filePath).toLowerCase()) {
    case '.css':
      return 'text/css; charset=utf-8';
    case '.gif':
      return 'image/gif';
    case '.html':
      return 'text/html; charset=utf-8';
    case '.ico':
      return 'image/x-icon';
    case '.jpeg':
    case '.jpg':
      return 'image/jpeg';
    case '.js':
    case '.mjs':
      return 'text/javascript; charset=utf-8';
    case '.json':
    case '.map':
    case '.webmanifest':
      return 'application/json; charset=utf-8';
    case '.png':
      return 'image/png';
    case '.svg':
      return 'image/svg+xml';
    case '.txt':
      return 'text/plain; charset=utf-8';
    case '.webp':
      return 'image/webp';
    case '.woff':
      return 'font/woff';
    case '.woff2':
      return 'font/woff2';
    default:
      return 'application/octet-stream';
  }
}

function createStaticServer(rootDir) {
  return createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url || '/', 'http://127.0.0.1');
      const relativePath = decodeURIComponent(requestUrl.pathname === '/' ? '/index.html' : requestUrl.pathname);
      const filePath = path.normalize(path.join(rootDir, `.${relativePath}`));

      if (!filePath.startsWith(rootDir)) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
      }

      const fileStat = await stat(filePath);
      if (!fileStat.isFile()) {
        response.writeHead(404);
        response.end('Not Found');
        return;
      }

      response.writeHead(200, { 'Content-Type': contentTypeFor(filePath) });
      createReadStream(filePath).pipe(response);
    } catch {
      response.writeHead(404);
      response.end('Not Found');
    }
  });
}

function isSkippableReference(reference) {
  return (
    !reference ||
    reference.startsWith('#') ||
    reference.startsWith('data:') ||
    reference.startsWith('mailto:') ||
    reference.startsWith('tel:') ||
    reference.startsWith('blob:') ||
    reference.startsWith('javascript:') ||
    /^[a-z]+:\/\//i.test(reference) ||
    reference.startsWith('//')
  );
}

function normalizeReference(reference) {
  return reference
    .trim()
    .replace(/^['"]|['"]$/g, '')
    .replace(/&amp;/g, '&');
}

function splitSrcsetCandidates(value) {
  return value
    .split(',')
    .map((item) => item.trim().split(/\s+/)[0])
    .filter(Boolean);
}

function extractHtmlAssets(content) {
  const references = [];
  const scriptPattern = /<script[^>]+\bsrc\s*=\s*(['"])([^"'<>]+)\1/gi;
  const linkPattern = /<link[^>]+\bhref\s*=\s*(['"])([^"'<>]+)\1/gi;
  const mediaPattern = /<(?:img|source|video|audio|iframe)[^>]+\b(?:src|poster)\s*=\s*(['"])([^"'<>]+)\1/gi;
  const srcsetPattern = /\bsrcset\s*=\s*(['"])([^"'<>]+)\1/gi;
  let match;

  while ((match = scriptPattern.exec(content)) !== null) references.push(match[2]);
  while ((match = linkPattern.exec(content)) !== null) references.push(match[2]);
  while ((match = mediaPattern.exec(content)) !== null) references.push(match[2]);
  while ((match = srcsetPattern.exec(content)) !== null) {
    references.push(...splitSrcsetCandidates(match[2]));
  }

  return references;
}

function extractCssAssets(content) {
  const references = [];
  const urlPattern = /url\(([^)]+)\)/gi;
  const importPattern = /@import\s+(?:url\()?['"]([^'"]+)['"]\)?/gi;
  let match;

  while ((match = urlPattern.exec(content)) !== null) references.push(match[1]);
  while ((match = importPattern.exec(content)) !== null) references.push(match[1]);

  return references;
}

function extractJsAssets(content) {
  const references = [];
  const patterns = [
    /\bimport\s+(?:[^'"]*?\sfrom\s*)?['"]([^'"]+)['"]/gi,
    /\bimport\(\s*['"]([^'"]+)['"]\s*\)/gi,
    /\bnew\s+Worker\(\s*['"]([^'"]+)['"]\s*[,)]/gi,
    /\bfetch\(\s*['"]([^'"]+)['"]\s*\)/gi
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) references.push(match[1]);
  }

  return references;
}

function extractAssetReferences(requestPath, contentType, content) {
  if (contentType.includes('text/html') || requestPath.endsWith('.html')) {
    return extractHtmlAssets(content);
  }

  if (contentType.includes('text/css') || requestPath.endsWith('.css')) {
    return extractCssAssets(content);
  }

  if (
    contentType.includes('text/javascript') ||
    contentType.includes('application/javascript') ||
    requestPath.endsWith('.js') ||
    requestPath.endsWith('.mjs')
  ) {
    return extractJsAssets(content);
  }

  return [];
}

function cleanReference(reference) {
  return reference.split('#', 1)[0].split('?', 1)[0];
}

function resolveRequestPath(fromPath, reference) {
  const cleaned = cleanReference(reference);
  if (!cleaned) return null;

  if (cleaned.startsWith('/')) {
    return cleaned;
  }

  const baseDir = path.posix.dirname(fromPath);
  return path.posix.normalize(path.posix.join(baseDir, cleaned));
}

async function fetchTextIfUseful(response, requestPath) {
  const contentType = response.headers.get('content-type') || '';
  const extension = path.extname(requestPath).toLowerCase();
  const shouldReadText =
    contentType.startsWith('text/') ||
    contentType.includes('javascript') ||
    contentType.includes('json') ||
    contentType.includes('svg') ||
    STATIC_TEXT_EXTENSIONS.has(extension);

  if (!shouldReadText) {
    await response.arrayBuffer();
    return { content: '', contentType };
  }

  return { content: await response.text(), contentType };
}

function getPathsForMode({ groupId, mode }) {
  if (mode === 'push') {
    return [
      '/index.html',
      '/magazine.html',
      ...VALID_GROUPS.flatMap((id) => [`/projects/${id}/index.html`, `/preview.html?project=${id}`])
    ];
  }

  if (!groupId) {
    return [];
  }

  return [
    '/index.html',
    '/magazine.html',
    `/projects/${groupId}/index.html`,
    `/preview.html?project=${groupId}`
  ];
}

async function runSmokeCheck({ advisory, mode, repoRoot }) {
  const options = parseCliArgs(process.argv.slice(2));
  const baseRef = options.base || '';
  const headRef = options.head || 'HEAD';
  const rangeMode = mode === 'push' ? 'push' : 'triple-dot';
  const changedFiles = getChangedFiles({ baseRef, headRef, rangeMode, repoRoot });
  const scope = getSubmissionScope(changedFiles);

  if (mode !== 'push' && !scope.isProjectSubmission) {
    console.log('No project submission changes detected. Skipping smoke check.');
    return;
  }

  const pagesToVisit = getPathsForMode({ groupId: scope.groupId, mode });
  const seen = new Set();
  const failures = [];
  const server = createStaticServer(repoRoot);

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  const baseUrl = `http://127.0.0.1:${address.port}`;

  async function fetchPath(requestPath) {
    const cacheKey = requestPath;
    if (seen.has(cacheKey)) {
      return;
    }

    seen.add(cacheKey);
    const response = await fetch(`${baseUrl}${requestPath}`);
    if (!response.ok) {
      failures.push(`${requestPath} returned ${response.status}`);
      return;
    }

    const { content, contentType } = await fetchTextIfUseful(response, requestPath);
    const references = extractAssetReferences(requestPath, contentType, content)
      .map(normalizeReference)
      .filter(Boolean)
      .filter((reference) => reference.startsWith('.') || reference.startsWith('/'))
      .filter((reference) => !isSkippableReference(reference));

    for (const reference of references) {
      const resolved = resolveRequestPath(requestPath.split('?', 1)[0], reference);
      if (!resolved) continue;
      await fetchPath(resolved);
    }
  }

  try {
    for (const pagePath of pagesToVisit) {
      await fetchPath(pagePath);
    }
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }

  if (failures.length === 0) {
    const summary = mode === 'push'
      ? 'Advisory site smoke check passed on push to main.'
      : `Site smoke check passed for projects/${scope.groupId}/.`;
    writeGitHubNotice({ level: 'notice', message: summary, title: 'Site smoke check' });
    console.log(summary);
    return;
  }

  const summary = mode === 'push'
    ? `Advisory site smoke check found ${failures.length} issue(s) on push to main.`
    : `Site smoke check failed for projects/${scope.groupId}/.`;
  const details = failures.map((failure) => `- ${failure}`).join('\n');
  writeGitHubNotice({
    level: advisory ? 'warning' : 'error',
    message: `${summary}\n${details}`,
    title: 'Site smoke check'
  });
  console[advisory ? 'warn' : 'error'](`${summary}\n${details}`);

  if (!advisory) {
    process.exitCode = 1;
  }
}

const options = parseCliArgs(process.argv.slice(2));
const mode = options.mode || 'pull-request';
const advisory = options.advisory === 'true' || mode === 'push';

runSmokeCheck({
  advisory,
  mode,
  repoRoot: process.cwd()
}).catch((error) => {
  const message = error instanceof Error ? error.stack || error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
