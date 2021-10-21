const fs = require('fs');

const ngDevFile = 'node_modules/@angular/dev-infra-private/ng-dev/cli-bundle.js';
let ngDev = fs.readFileSync(ngDevFile, 'utf8');
ngDev = ngDev.replace(
  `    function getReleaseTagForVersion(version) {
      return version.format();
    }`,
  `    function getReleaseTagForVersion(version) {
      return 'v' + version.format();
    }`,
);
fs.writeFileSync(ngDevFile, ngDev);

const cleanDirs = [
  '@angular/common/locales',
  '@angular/core/schematics',
  '@angular/cdk/schematics',
  '@angular/material/schematics',
  '@ngneat/transloco/schematics',
];
cleanDirs.forEach(cleanDir => {
  const cleanDirPath = path.join('node_modules', cleanDir);
  if (fs.existsSync(cleanDirPath) && fs.statSync(cleanDirPath).isDirectory()) {
    fs.rmdirSync(cleanDirPath, {recursive: true});
  }
});
