#!/usr/bin/env node

import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import {default as esMain} from 'es-main';
import {rollup} from 'rollup';

export const buildKarmaPolyfills = async () => {
  const config = {
    input: 'scripts/postinstall/karma-polyfills-source.js',
    plugins: [nodeResolve({preferBuiltins: false}), commonjs()],
  };
  const res = await rollup(config);
  await res.write({
    name: 'karma_polyfills',
    format: 'iife',
    file: 'karma-polyfills.js',
  });
};

if (esMain(import.meta)) {
  buildKarmaPolyfills();
}
