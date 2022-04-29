#!/usr/bin/env node

import {default as esMain} from 'es-main';

import {buildKarmaPolyfills} from './postinstall/index.mjs';

if (esMain(import.meta)) {
  buildKarmaPolyfills();
}
