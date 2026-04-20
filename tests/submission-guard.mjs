import process from 'node:process';

import {
  getChangedFiles,
  parseCliArgs,
  summarizeErrors,
  validateProjectSubmission,
  writeGitHubNotice
} from './lib/submission-utils.mjs';

async function main() {
  const options = parseCliArgs(process.argv.slice(2));
  const repoRoot = process.cwd();
  const mode = options.mode || 'pull-request';
  const baseRef = options.base || '';
  const headRef = options.head || 'HEAD';
  const advisory = options.advisory === 'true' || mode === 'push';
  const rangeMode = mode === 'push' ? 'push' : 'triple-dot';

  const changedFiles = getChangedFiles({
    baseRef,
    headRef,
    rangeMode,
    repoRoot
  });

  const validation = await validateProjectSubmission({
    changedFiles,
    repoRoot,
    strictScope: mode !== 'push'
  });

  if (!validation.isProjectSubmission) {
    console.log('No project submission changes detected. Skipping submission guard.');
    return;
  }

  const scopeLabel = validation.groupIds?.length
    ? validation.groupIds.map((groupId) => `projects/${groupId}/`).join(', ')
    : validation.groupId
      ? `projects/${validation.groupId}/`
      : 'project submission scope';
  const summary = validation.errors.length === 0
    ? `Submission guard passed for ${scopeLabel}.`
    : `Submission guard found ${validation.errors.length} issue(s) in ${scopeLabel}.`;

  if (validation.errors.length === 0) {
    writeGitHubNotice({
      level: 'notice',
      message: summary,
      title: 'Submission guard'
    });
    console.log(summary);
    return;
  }

  const details = summarizeErrors(validation.errors);
  writeGitHubNotice({
    level: advisory ? 'warning' : 'error',
    message: `${summary}\n${details}`,
    title: 'Submission guard'
  });
  console[advisory ? 'warn' : 'error'](`${summary}\n${details}`);

  if (!advisory) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.stack || error.message : String(error);
  console.error(message);
  process.exitCode = 1;
});
