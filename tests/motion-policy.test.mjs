import test from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readdir, readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';

const execFileAsync = promisify(execFile);
const repoRoot = process.cwd();
const primerDir = path.join(repoRoot, 'primer');

function contentTypeFor(filePath) {
  switch (path.extname(filePath).toLowerCase()) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.ico':
      return 'image/x-icon';
    default:
      return 'application/octet-stream';
  }
}

async function resolveChromePath() {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];

  for (const candidate of candidates) {
    try {
      await stat(candidate);
      return candidate;
    } catch {
      // Try the next candidate.
    }
  }

  return null;
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

function getClassAttribute(dom, className) {
  const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = dom.match(new RegExp(`<[^>]+class="([^"]*\\b${escaped}\\b[^"]*)"[^>]*>`, 'i'));
  assert.ok(match, `Expected to find an element with class "${className}"`);
  return match[1];
}

async function dumpDom(chromePath, url, extraArgs = []) {
  const { stdout, stderr } = await execFileAsync(
    chromePath,
    [
      '--headless=new',
      '--disable-gpu',
      '--dump-dom',
      '--virtual-time-budget=5000',
      '--window-size=1440,900',
      ...extraArgs,
      url
    ],
    {
      cwd: repoRoot,
      maxBuffer: 20 * 1024 * 1024
    }
  );

  if (stderr && /error/i.test(stderr) && !stdout) {
    throw new Error(stderr);
  }

  return stdout;
}

let chromePath;
let server;
let baseUrl;
let moduleFiles;

test.before(async () => {
  chromePath = await resolveChromePath();
  assert.ok(chromePath, 'Chrome executable not found');

  moduleFiles = (await readdir(primerDir))
    .filter((name) => /^module-\d+\.html$/.test(name))
    .sort();

  server = createStaticServer(repoRoot);
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const address = server.address();
  baseUrl = `http://127.0.0.1:${address.port}`;
});

test.after(async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
});

test('every primer module loads the shared motion policy helper', async () => {
  assert.equal(moduleFiles.length, 8, 'Expected eight primer modules');

  for (const fileName of moduleFiles) {
    const source = await readFile(path.join(primerDir, fileName), 'utf8');
    assert.match(
      source,
      /\.\.\/shared\/motion-policy\.js/,
      `${fileName} should load the shared motion policy helper`
    );
  }
});

test('primer modules no longer use back easing or animate-bounce markers', async () => {
  for (const fileName of moduleFiles) {
    const source = await readFile(path.join(primerDir, fileName), 'utf8');
    assert.doesNotMatch(source, /back\.out/i, `${fileName} still contains back easing`);
    assert.doesNotMatch(source, /animate-bounce/i, `${fileName} still contains animate-bounce`);
  }
});

test('shared styles and shared runtime both expose the unified motion policy hooks', async () => {
  const sharedStyles = await readFile(path.join(repoRoot, 'shared', 'styles.css'), 'utf8');
  const sharedScripts = await readFile(path.join(repoRoot, 'shared', 'scripts.js'), 'utf8');

  assert.match(sharedStyles, /prefers-reduced-motion:\s*reduce/i);
  assert.match(sharedStyles, /\.animate-bounce\s*\{/);
  assert.match(sharedScripts, /window\.AIGeoMotionPolicy/);
});

test('module 03 reveals hidden hero elements under reduced motion', async () => {
  const dom = await dumpDom(
    chromePath,
    `${baseUrl}/primer/module-03.html`,
    ['--force-prefers-reduced-motion']
  );

  const ruptureHeaderClass = getClassAttribute(dom, 'rupture-header');
  const scrollIndicatorClass = getClassAttribute(dom, 'scroll-indicator');

  assert.doesNotMatch(ruptureHeaderClass, /\bopacity-0\b/);
  assert.doesNotMatch(ruptureHeaderClass, /\btranslate-y-12\b/);
  assert.doesNotMatch(scrollIndicatorClass, /\bopacity-0\b/);
  assert.match(dom, /THE\s+RUPTURE/i);
});

test('module 06 strips hidden utility classes under reduced motion', async () => {
  const dom = await dumpDom(
    chromePath,
    `${baseUrl}/primer/module-06.html`,
    ['--force-prefers-reduced-motion']
  );

  const headerClass = getClassAttribute(dom, 'gsap-header');
  const sectionHeaderClass = getClassAttribute(dom, 'gsap-section-header');
  const claimClass = getClassAttribute(dom, 'gsap-claim');

  assert.doesNotMatch(headerClass, /\bopacity-0\b/);
  assert.doesNotMatch(headerClass, /\btranslate-y-8\b/);
  assert.doesNotMatch(sectionHeaderClass, /\bopacity-0\b/);
  assert.doesNotMatch(sectionHeaderClass, /\btranslate-y-6\b/);
  assert.doesNotMatch(claimClass, /\bopacity-0\b/);
  assert.doesNotMatch(claimClass, /\btranslate-x-8\b/);
  assert.match(dom, /National Revival Through Tech Power/i);
});
