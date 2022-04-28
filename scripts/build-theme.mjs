#!/usr/bin/env node

import {default as esMain} from 'es-main';
import {default as ora} from 'ora';
import {default as shell} from 'shelljs';

import {silentExec} from './utils/index.mjs';

export const buildTheme = async () => {
  const spinner = ora(`Building theme`).start();
  const src = 'projects/material/core/src/theming/prebuilt/dino-theme.scss';
  const dstDir = 'dist/material/prebuilt-themes';
  shell.mkdir('-p', dstDir);
  const res = shell.exec(
    `yarn -s sass --no-source-map --style compressed -I node_modules ${src} ${dstDir}/dino-theme.css`,
    {
      async: true,
      silent: silentExec(),
    },
  );
  let stdErr = '';
  return new Promise((resolve, reject) => {
    res.stderr.on('data', data => (stdErr = `${stdErr}${data}`));
    res.on('close', code => {
      if (code === 0) {
        spinner.succeed(`Built theme`);
        resolve();
      } else {
        spinner.fail(`Unable to build theme`);
        reject(stdErr);
      }
    });
  });
};

if (esMain(import.meta)) {
  buildTheme();
}
