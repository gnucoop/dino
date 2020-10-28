const shelljs = require('shelljs');
const chalk = require('chalk');
const path = require('path');
const models = process.argv.slice(2);

if (models.length === 0) {
  console.error(chalk.red('No package name has been passed in for model JSON schema approval.'));
  process.exit(1);
}

models.forEach(model => {
  // ShellJS should exit if any command fails.
  shelljs.set('-e');
  shelljs.cd(path.join(__dirname, '../'));
  shelljs.exec(`yarn bazel run //tools/model-schema:model-schema-${model}-json.ts.accept`);
});
