import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { access, readdir, readFile } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';

export const VALID_GROUPS = ['group-1', 'group-2', 'group-3', 'group-4', 'group-5'];
export const STATIC_TEXT_EXTENSIONS = new Set([
  '.css',
  '.csv',
  '.html',
  '.js',
  '.json',
  '.map',
  '.md',
  '.mjs',
  '.svg',
  '.txt',
  '.webmanifest',
  '.xml'
]);

const PROJECT_PATH_PATTERN = /^projects\/(group-[1-5])(?:\/|$)/;
const DISALLOWED_EXACT_NAMES = new Set([
  'package.json',
  'package-lock.json',
  'pnpm-lock.yaml',
  'yarn.lock',
  'bun.lock',
  'bun.lockb',
  'tsconfig.json',
  'vercel.json'
]);
const DISALLOWED_PREFIXES = [
  'vite.config.',
  'next.config.',
  'astro.config.',
  'webpack.config.',
  'rollup.config.',
  'postcss.config.',
  'tailwind.config.',
  'eslint.config.'
];
const DISALLOWED_EXTENSIONS = new Set([
  '.bat',
  '.cgi',
  '.class',
  '.cmd',
  '.cs',
  '.cts',
  '.dll',
  '.dylib',
  '.exe',
  '.go',
  '.jar',
  '.java',
  '.jsx',
  '.mts',
  '.php',
  '.pl',
  '.ps1',
  '.py',
  '.rb',
  '.rs',
  '.sh',
  '.so',
  '.svelte',
  '.ts',
  '.tsx',
  '.vue',
  '.war'
]);
const DISALLOWED_PATH_SEGMENTS = new Set(['node_modules']);
const WINDOWS_INITIAL_SHA = '0000000000000000000000000000000000000000';

function quoteShellValue(value) {
  return value.replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A');
}

export function toPosixPath(value) {
  return value.replaceAll('\\', '/');
}

export function isWithinDirectory(parentDir, candidatePath) {
  const relative = path.relative(parentDir, candidatePath);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

export function parseCliArgs(argv) {
  const options = {};

  for (const arg of argv) {
    if (!arg.startsWith('--')) continue;
    const trimmed = arg.slice(2);
    const [key, ...rest] = trimmed.split('=');
    options[key] = rest.length ? rest.join('=') : 'true';
  }

  return options;
}

export function summarizeErrors(errors) {
  return errors.map((error) => `- ${error}`).join('\n');
}

export function getSubmissionScope(changedFiles) {
  const normalized = changedFiles.map(toPosixPath);
  const projectFiles = normalized.filter((file) => file.startsWith('projects/'));

  if (projectFiles.length === 0) {
    return {
      changedFiles: normalized,
      groupId: null,
      groupIds: [],
      invalidProjectFiles: [],
      isProjectSubmission: false,
      projectFiles,
      scopeErrors: []
    };
  }

  const groupIds = new Set();
  const invalidProjectFiles = [];
  const scopeErrors = [];

  for (const file of projectFiles) {
    const match = file.match(PROJECT_PATH_PATTERN);
    if (!match) {
      invalidProjectFiles.push(file);
      continue;
    }

    groupIds.add(match[1]);
  }

  if (invalidProjectFiles.length > 0) {
    scopeErrors.push(
      `Project changes must stay inside a named group folder. Found: ${invalidProjectFiles.join(', ')}`
    );
  }

  if (groupIds.size > 1) {
    scopeErrors.push(
      `Submission PRs may only change one group folder. Found: ${Array.from(groupIds).sort().join(', ')}`
    );
  }

  const groupId = groupIds.size === 1 ? Array.from(groupIds)[0] : null;
  return {
    changedFiles: normalized,
    groupId,
    groupIds: Array.from(groupIds).sort(),
    invalidProjectFiles,
    isProjectSubmission: true,
    projectFiles,
    scopeErrors
  };
}

export function getChangedFiles({ repoRoot, baseRef, headRef, rangeMode = 'triple-dot' }) {
  const diffArgs = ['diff', '--name-only', '--diff-filter=ACMRTUXB'];

  if (rangeMode === 'push' && (!baseRef || baseRef === WINDOWS_INITIAL_SHA)) {
    const lsResult = spawnSync('git', ['ls-tree', '-r', '--name-only', headRef || 'HEAD'], {
      cwd: repoRoot,
      encoding: 'utf8'
    });

    if (lsResult.status !== 0) {
      throw new Error(lsResult.stderr || 'Unable to enumerate files for initial push.');
    }

    return lsResult.stdout
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  }

  if (baseRef && headRef) {
    diffArgs.push(rangeMode === 'push' ? `${baseRef}..${headRef}` : `${baseRef}...${headRef}`);
  }

  const result = spawnSync('git', diffArgs, {
    cwd: repoRoot,
    encoding: 'utf8'
  });

  if (result.status !== 0) {
    const compared = baseRef && headRef ? `${baseRef} -> ${headRef}` : 'working tree';
    throw new Error(`git diff failed for ${compared}: ${result.stderr || result.stdout}`);
  }

  return result.stdout
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export async function fileExists(targetPath) {
  try {
    await access(targetPath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function listFilesRecursive(rootDir) {
  const entries = await readdir(rootDir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(rootDir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFilesRecursive(fullPath)));
      continue;
    }

    if (entry.isFile()) {
      files.push(fullPath);
    }
  }

  return files;
}

function isTextFile(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return STATIC_TEXT_EXTENSIONS.has(extension);
}

function isIgnoredReference(rawReference) {
  return (
    !rawReference ||
    rawReference.startsWith('#') ||
    rawReference.startsWith('data:') ||
    rawReference.startsWith('mailto:') ||
    rawReference.startsWith('tel:') ||
    rawReference.startsWith('blob:') ||
    rawReference.startsWith('javascript:') ||
    /^[a-z]+:\/\//i.test(rawReference) ||
    rawReference.startsWith('//')
  );
}

function normalizeReferenceValue(rawReference) {
  const trimmed = rawReference.trim().replace(/^['"]|['"]$/g, '');
  return trimmed.replace(/&amp;/g, '&');
}

function cleanReferencePath(reference) {
  return reference.split('#', 1)[0].split('?', 1)[0];
}

function extractHtmlLikeReferences(content) {
  const references = [];
  const attrPattern = /\b(?:src|href|poster|data)\s*=\s*(['"])([^"'<>]+)\1/gi;
  let match;

  while ((match = attrPattern.exec(content)) !== null) {
    references.push(match[2]);
  }

  const srcsetPattern = /\bsrcset\s*=\s*(['"])([^"'<>]+)\1/gi;
  while ((match = srcsetPattern.exec(content)) !== null) {
    const candidates = match[2].split(',');
    for (const candidate of candidates) {
      const [urlPart] = candidate.trim().split(/\s+/);
      if (urlPart) references.push(urlPart);
    }
  }

  return references;
}

function extractCssReferences(content) {
  const references = [];
  const urlPattern = /url\(([^)]+)\)/gi;
  let match;

  while ((match = urlPattern.exec(content)) !== null) {
    references.push(match[1]);
  }

  const importPattern = /@import\s+(?:url\()?['"]([^'"]+)['"]\)?/gi;
  while ((match = importPattern.exec(content)) !== null) {
    references.push(match[1]);
  }

  return references;
}

function extractJsReferences(content) {
  const references = [];
  const patterns = [
    /\bimport\s+(?:[^'"]*?\sfrom\s*)?['"]([^'"]+)['"]/gi,
    /\bimport\(\s*['"]([^'"]+)['"]\s*\)/gi,
    /\bfetch\(\s*['"]([^'"]+)['"]\s*\)/gi,
    /\bnew\s+Worker\(\s*['"]([^'"]+)['"]\s*[,)]/gi
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      references.push(match[1]);
    }
  }

  return references;
}

export function extractLocalReferences(filePath, content) {
  const extension = path.extname(filePath).toLowerCase();
  const rawReferences = [];

  if (extension === '.html' || extension === '.svg' || extension === '.xml') {
    rawReferences.push(...extractHtmlLikeReferences(content));
  } else if (extension === '.css') {
    rawReferences.push(...extractCssReferences(content));
  } else if (extension === '.js' || extension === '.mjs') {
    rawReferences.push(...extractJsReferences(content));
  }

  return rawReferences
    .map(normalizeReferenceValue)
    .map(cleanReferencePath)
    .filter(Boolean)
    .filter((reference) => reference.startsWith('.') || reference.startsWith('/'))
    .filter((reference) => !isIgnoredReference(reference));
}

export function resolveReference({ repoRoot, sourceFilePath, reference }) {
  if (reference.startsWith('/')) {
    return path.resolve(repoRoot, `.${reference}`);
  }

  return path.resolve(path.dirname(sourceFilePath), reference);
}

function isDisallowedArtifact(relativePath) {
  const normalized = toPosixPath(relativePath);
  const parsed = path.posix.parse(normalized);
  const segments = normalized.split('/').filter(Boolean);

  const blockedSegment = segments.find((segment) => DISALLOWED_PATH_SEGMENTS.has(segment));
  if (blockedSegment) {
    return `Bundles may not include ${blockedSegment} directories.`;
  }

  if (DISALLOWED_EXACT_NAMES.has(parsed.base)) {
    return `Bundles may not include build or package manifest files such as ${parsed.base}.`;
  }

  if (DISALLOWED_PREFIXES.some((prefix) => parsed.base.startsWith(prefix))) {
    return `Bundles may not include build configuration files such as ${parsed.base}.`;
  }

  if (DISALLOWED_EXTENSIONS.has(parsed.ext.toLowerCase())) {
    return `Bundles may not include non-static source or executable files such as ${parsed.base}.`;
  }

  return null;
}

export async function validateProjectSubmission({ repoRoot, changedFiles, strictScope = true }) {
  const scope = getSubmissionScope(changedFiles);
  const errors = strictScope
    ? [...scope.scopeErrors]
    : [...scope.scopeErrors.filter((error) => !error.includes('may only change one group folder'))];
  const warnings = [];

  if (!scope.isProjectSubmission) {
    return {
      errors,
      groupId: null,
      isProjectSubmission: false,
      warnings
    };
  }

  const groupIds = strictScope ? (scope.groupId ? [scope.groupId] : []) : scope.groupIds;

  if (groupIds.length === 0) {
    return {
      errors,
      groupId: strictScope ? null : scope.groupIds[0] || null,
      groupIds: scope.groupIds,
      isProjectSubmission: true,
      warnings
    };
  }

  for (const groupId of groupIds) {
    const groupRootRelative = `projects/${groupId}`;
    const groupRootAbsolute = path.join(repoRoot, 'projects', groupId);

    if (strictScope) {
      const changedOutsideGroup = scope.changedFiles.filter((file) => !file.startsWith(`${groupRootRelative}/`));
      if (changedOutsideGroup.length > 0) {
        errors.push(
          `Submission PRs may only touch ${groupRootRelative}/. Found outside files: ${changedOutsideGroup.join(', ')}`
        );
      }
    }

    const indexPath = path.join(groupRootAbsolute, 'index.html');
    if (!(await fileExists(indexPath))) {
      errors.push(`Missing required entrypoint: ${toPosixPath(path.relative(repoRoot, indexPath))}`);
    }

    if (!(await fileExists(groupRootAbsolute))) {
      errors.push(`Expected submission folder does not exist: ${groupRootRelative}`);
      continue;
    }

    const bundleFiles = await listFilesRecursive(groupRootAbsolute);
    if (bundleFiles.length === 0) {
      errors.push(`Submission folder is empty: ${groupRootRelative}`);
      continue;
    }

    for (const absoluteFilePath of bundleFiles) {
      const relativeToRepo = toPosixPath(path.relative(repoRoot, absoluteFilePath));
      const artifactProblem = isDisallowedArtifact(relativeToRepo);
      if (artifactProblem) {
        errors.push(`${artifactProblem} Offending file: ${relativeToRepo}`);
        continue;
      }

      if (!isTextFile(absoluteFilePath)) {
        continue;
      }

      const content = await readFile(absoluteFilePath, 'utf8');
      const references = extractLocalReferences(absoluteFilePath, content);

      for (const reference of references) {
        const resolvedPath = resolveReference({
          repoRoot,
          reference,
          sourceFilePath: absoluteFilePath
        });

        if (!isWithinDirectory(groupRootAbsolute, resolvedPath)) {
          errors.push(
            `${relativeToRepo} contains a local reference that escapes ${groupRootRelative}/: ${reference}`
          );
          continue;
        }

        if (!(await fileExists(resolvedPath))) {
          errors.push(`${relativeToRepo} references a missing local file: ${reference}`);
        }
      }
    }
  }

  return {
    errors,
    groupId: scope.groupId,
    groupIds,
    isProjectSubmission: true,
    warnings
  };
}

export function writeGitHubNotice({ title, message, level = 'notice' }) {
  const sanitizedTitle = quoteShellValue(title.replaceAll('\n', ' '));
  const sanitizedMessage = quoteShellValue(message);
  console.log(`::${level} title=${sanitizedTitle}::${sanitizedMessage}`);
}
