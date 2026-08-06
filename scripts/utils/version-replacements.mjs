import {existsSync, readFileSync, writeFileSync} from 'fs';
import {join} from 'path';

export const versionReplacements = packages => {
  const mainPackage = JSON.parse(readFileSync('package.json', 'utf-8'));
  const mainDeps = {...mainPackage.devDependencies, ...mainPackage.dependencies};

  const replacements = [
    ['@ajf/core', 'AJF'],
    ['@angular/core', 'NGF'],
    ['@angular/cdk', 'NGC'],
    ['@apollo/client', 'APOLLOCLIENT'],
    ['@ngneat/transloco', 'TRANSLOCO'],
    ['angular-material-css-vars', 'AMCV'],
    ['apollo-angular', 'APOLLONG'],
    ['assert', 'ASSERT'],
    ['chart.js', 'CHARTJS'],
    ['process', 'PROCESS'],
    ['rxdb', 'RXDB'],
    ['rxjs', 'RXJS'],
    ['stream-browserify', 'STREAM'],
    ['graphql-ws', 'GWS'],
    ['tslib', 'TSLIB'],
    ['uuid', 'UUID'],
    ['xlsx', 'XLSX'],
  ];

  for (const pkg of packages) {
    const packageFile = join('dist', pkg, 'package.json');
    if (existsSync(packageFile)) {
      let content = readFileSync(packageFile, 'utf8');
      content = content.replace(/0.0.0-PLACEHOLDER/g, mainPackage.version);
      for (const [version, search] of replacements) {
        if (mainDeps[version] != null) {
          content = content.replace(new RegExp(`0.0.0-${search}`, 'g'), mainDeps[version]);
        }
      }
      writeFileSync(packageFile, content);
    }
  }
};
