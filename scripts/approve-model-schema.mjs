#!/usr/bin/env node

import {default as esMain} from 'es-main';
import {join} from 'path';

import {modelSchemaTest} from './model-schema/model-schema.mjs';

const approveModelSchema = async modelDef => {
  if (modelDef == null || typeof modelDef !== 'string') {
    return;
  }
  const parts = modelDef.split('/');
  if (parts.length !== 3) {
    return;
  }
  const source = join('projects', parts[0], parts[1], 'src', `${parts[2]}.ts`);
  await modelSchemaTest({source, accept: true});
};

if (esMain(import.meta)) {
  const args = process.argv.slice(2);
  approveModelSchema(args[0]);
}
