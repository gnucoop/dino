#!/usr/bin/env node

import {default as esMain} from 'es-main';

import {packages} from './build-config.mjs';
import {buildPackages} from './release/index.mjs';
import {buildTheme} from './build-theme.mjs';

const build = async () => {
  await buildPackages(packages);
  await buildTheme();
};

if (esMain(import.meta)) {
  build();
}
