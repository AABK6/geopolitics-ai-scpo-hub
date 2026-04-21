import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const repoRoot = process.cwd();

test('README uses a fork-and-pull-request GitHub workflow', async () => {
  const readme = await readFile(path.join(repoRoot, 'README.md'), 'utf8');

  assert.doesNotMatch(readme, /YOUR_ORG/i, 'README still contains a placeholder repository owner');
  assert.match(readme, /Fork/i, 'README should instruct contributors to fork the repository');
  assert.match(
    readme,
    /git push -u origin add-group-1-project/i,
    'README should push a feature branch to the contributor fork'
  );
  assert.doesNotMatch(
    readme,
    /git push origin main/i,
    'README should not tell normal contributors to push directly to main'
  );
});

test('architecture doc matches the numbered project sandboxes', async () => {
  const architecture = await readFile(path.join(repoRoot, 'ARCHITECTURE.md'), 'utf8');

  assert.doesNotMatch(
    architecture,
    /group-alpha/i,
    'ARCHITECTURE.md still references the obsolete group-alpha folder naming'
  );
  assert.match(
    architecture,
    /group-1/i,
    'ARCHITECTURE.md should document the numbered project folder layout'
  );
});
