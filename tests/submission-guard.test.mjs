import test from 'node:test';
import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';

import { getSubmissionScope, validateProjectSubmission } from './lib/submission-utils.mjs';

async function makeRepoFixture(layout) {
  const repoRoot = await mkdtemp(path.join(os.tmpdir(), 'submission-guard-'));

  for (const [relativePath, content] of Object.entries(layout)) {
    const absolutePath = path.join(repoRoot, relativePath);
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, content, 'utf8');
  }

  return repoRoot;
}

test('valid multi-file bundle inside one group folder passes', async () => {
  const repoRoot = await makeRepoFixture({
    'projects/group-1/index.html': '<!doctype html><link rel="stylesheet" href="assets/site.css"><script type="module" src="assets/site.js"></script>',
    'projects/group-1/assets/site.css': 'body { background: url("./hero.png"); }',
    'projects/group-1/assets/site.js': 'import "./chunk.mjs";',
    'projects/group-1/assets/chunk.mjs': 'console.log("ok");',
    'projects/group-1/assets/hero.png': 'png'
  });

  try {
    const validation = await validateProjectSubmission({
      changedFiles: ['projects/group-1/index.html', 'projects/group-1/assets/site.css'],
      repoRoot
    });

    assert.equal(validation.isProjectSubmission, true);
    assert.equal(validation.groupId, 'group-1');
    assert.deepEqual(validation.errors, []);
  } finally {
    await rm(repoRoot, { force: true, recursive: true });
  }
});

test('submission scope rejects edits across multiple group folders', () => {
  const scope = getSubmissionScope([
    'projects/group-1/index.html',
    'projects/group-2/index.html'
  ]);

  assert.equal(scope.isProjectSubmission, true);
  assert.equal(scope.groupId, null);
  assert.match(scope.scopeErrors.join('\n'), /one group folder/i);
});

test('submission validation rejects files outside the assigned group folder', async () => {
  const repoRoot = await makeRepoFixture({
    'projects/group-1/index.html': '<!doctype html><p>ok</p>',
    'README.md': '# outside change'
  });

  try {
    const validation = await validateProjectSubmission({
      changedFiles: ['projects/group-1/index.html', 'README.md'],
      repoRoot
    });

    assert.match(validation.errors.join('\n'), /only touch projects\/group-1\//i);
  } finally {
    await rm(repoRoot, { force: true, recursive: true });
  }
});

test('submission validation requires an index.html entrypoint', async () => {
  const repoRoot = await makeRepoFixture({
    'projects/group-3/styles.css': 'body { color: black; }'
  });

  try {
    const validation = await validateProjectSubmission({
      changedFiles: ['projects/group-3/styles.css'],
      repoRoot
    });

    assert.match(validation.errors.join('\n'), /missing required entrypoint/i);
  } finally {
    await rm(repoRoot, { force: true, recursive: true });
  }
});

test('submission validation rejects traversal-style local references', async () => {
  const repoRoot = await makeRepoFixture({
    'projects/group-4/index.html': '<!doctype html><img src="../group-5/secret.png">',
    'projects/group-5/secret.png': 'png'
  });

  try {
    const validation = await validateProjectSubmission({
      changedFiles: ['projects/group-4/index.html'],
      repoRoot
    });

    assert.match(validation.errors.join('\n'), /escapes projects\/group-4\//i);
  } finally {
    await rm(repoRoot, { force: true, recursive: true });
  }
});

test('submission validation rejects root-relative references into the main site', async () => {
  const repoRoot = await makeRepoFixture({
    'projects/group-2/index.html': '<!doctype html><script src="/shared/scripts.js"></script>',
    'shared/scripts.js': 'console.log("main site");'
  });

  try {
    const validation = await validateProjectSubmission({
      changedFiles: ['projects/group-2/index.html'],
      repoRoot
    });

    assert.match(validation.errors.join('\n'), /escapes projects\/group-2\//i);
  } finally {
    await rm(repoRoot, { force: true, recursive: true });
  }
});

test('submission validation rejects build manifests and source files', async () => {
  const repoRoot = await makeRepoFixture({
    'projects/group-5/index.html': '<!doctype html><p>ok</p>',
    'projects/group-5/package.json': '{"name":"bad"}',
    'projects/group-5/src/app.tsx': 'export default function App() {}'
  });

  try {
    const validation = await validateProjectSubmission({
      changedFiles: ['projects/group-5/index.html', 'projects/group-5/package.json'],
      repoRoot
    });

    const combined = validation.errors.join('\n');
    assert.match(combined, /package manifest/i);
    assert.match(combined, /non-static source or executable files/i);
  } finally {
    await rm(repoRoot, { force: true, recursive: true });
  }
});
