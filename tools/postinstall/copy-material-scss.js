const {existsSync, copyFileSync, mkdirSync} = require('fs');
const glob = require('glob');
const {join, dirname} = require('path');

/** Path to the project directory. */
const projectDir = join(__dirname, '..', '..');

const scssDirs = ['cdk', 'material'];

scssDirs.forEach(scssDir => {
  const nodeModulesDir = join(projectDir, 'node_modules');
  const sourceDir = join(nodeModulesDir, '@angular', scssDir);
  const targetDir = join(nodeModulesDir, '~@angular', scssDir);

  mkdirSync(targetDir, {recursive: true});

  glob('**/*.scss', {cwd: sourceDir}, (err, matches) => {
    if (err == null) {
      matches.forEach(match => {
        const source = join(sourceDir, match);
        const dest = join(targetDir, match);
        const destDir = dirname(dest);
        if (!existsSync(destDir)) {
          mkdirSync(destDir, {recursive: true});
        }
        copyFileSync(source, dest);
      });
    } else {
      console.log(`Unable to copy Angular Material SCSS library`);
      process.exit(1);
    }
  });
});
