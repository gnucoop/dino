#!/usr/bin/env node

import {default as esMain} from 'es-main';
import {default as ora} from 'ora';
import {join} from 'path';

import {models} from './build-config.mjs';
import {modelSchemaTest} from './model-schema/model-schema.mjs';

const runTests = async () => {
  const packages = Object.keys(models);
  for (const pkg of packages) {
    const subPackages = Object.keys(models[pkg]);
    for (const subPkg of subPackages) {
      for (const model of models[pkg][subPkg]) {
        const spinner = ora(`Running @dino/${pkg}/${subPkg}/${model} model schema test`).start();
        const source = join('projects', pkg, subPkg, 'src', `${model}.ts`);
        const res = await modelSchemaTest({source});
        if (!res) {
          spinner.fail(`@dino/${pkg}/${subPkg}/${model} model schema test failed`);
          process.exit(1);
        } else {
          spinner.succeed(`@dino/${pkg}/${subPkg}/${model} model schema test passed`);
        }
      }
    }
  }
};

if (esMain(import.meta)) {
  runTests();
}
