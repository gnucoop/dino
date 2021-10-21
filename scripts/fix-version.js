#!/usr/bin/env node

const {readFileSync, writeFileSync} = require('fs');

if (process.argv.length !== 4) {
  process.exit(1);
}

const [packageJsonFile, version] = process.argv.slice(2);

if (packageJsonFile == null || version == null) {
  process.exit(1);
}

const packageJson = JSON.parse(readFileSync(packageJsonFile));
packageJson.version = version;
if (packageJson.dependencies['@dino/core'] != null) {
  packageJson.dependencies['@dino/core'] = version;
}
if (packageJson.peerDependencies['@dino/core'] != null) {
  packageJson.peerDependencies['@dino/core'] = version;
}

writeFileSync(packageJsonFile, JSON.stringify(packageJson, null, 2));
