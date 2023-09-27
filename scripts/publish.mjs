#!/usr/bin/env node

import {default as esMain} from 'es-main';
import {writeFileSync} from 'fs';
import {default as semver} from 'semver';
import {default as shell} from 'shelljs';

import {packages} from './build-config.mjs';

const publish = async () => {
  const npmToken = process.env.BYTESAFE_TOKEN;
  if (npmToken == null || npmToken.length === 0) {
    shell.echo(
      `Error: No access token for Npm could be found. Please set the environment variable 'BYTESAFE_TOKEN'.`,
    );
    shell.exit(1);
  }
  const npmReg = `gnucoop.bytesafe.dev/r/dino`;
  const nmpRc = `@dino:registry=https://${npmReg}/\r\n//${npmReg}/:_authToken=${npmToken}`;
  const curTag = shell.exec(`git describe --abbrev=0 --tags 2> /dev/null`, {
    silent: true,
  }).stdout;
  if (curTag == null || curTag.length === 0) {
    shell.echo('No version tag defined');
    shell.exit(0);
  }
  const tagVersion = semver.valid(semver.clean(curTag));
  if (tagVersion == null) {
    shell.echo('Invalid version tag defined');
    shell.exit(0);
  }
  for (const pkg of packages) {
    const pkgName = `@dino/${pkg}@${tagVersion}`;
    const existing = shell.exec(`npm show ${pkgName}`, {silent: true}).stdout;
    if (existing == null || existing.length === 0) {
      const distDir = `dist/${pkg}`;
      writeFileSync(`${distDir}/.npmrc`, nmpRc);
      shell.cd(distDir);
      shell.exec(`npm publish`);
      shell.cd(`../..`);
    } else {
      shell.echo(`Skipping deploy of ${pkg} package`);
    }
  }
};

if (esMain(import.meta)) {
  publish();
}
