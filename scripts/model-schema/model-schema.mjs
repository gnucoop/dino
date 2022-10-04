#!/usr/bin/env node

import {transformSync} from '@babel/core';
import traverseModule from '@babel/traverse';
import {default as esMain} from 'es-main';
import {existsSync, readFileSync, writeFileSync} from 'fs';
import minimist from 'minimist';
import {dirname, basename, join} from 'path';
import {createGenerator} from 'ts-json-schema-generator';
import {fileURLToPath} from 'url';

const traverse = traverseModule.default;

export const modelSchemaTest = async params => {
  let {source, expose, topRef, jsDoc, accept} = params;
  if (expose == null) {
    expose = 'export';
  }
  if (topRef == null) {
    topRef = true;
  }
  if (jsDoc == null) {
    jsDoc = 'extended';
  }
  if (accept == null) {
    accept = false;
  }
  const curDir = dirname(fileURLToPath(import.meta.url));
  const tsconfig = join(curDir, 'tsconfig-generate.json');

  const basePath = process.cwd();
  const {licenseBanner} = await import(join(basePath, 'scripts', 'build-config.mjs'));
  const sourceWoExt = source.replace('.ts', '');
  const sourceContent = readFileSync(join(basePath, source), 'utf8');
  const {ast} = transformSync(sourceContent, {
    ast: true,
    filename: source,
    presets: ['@babel/preset-typescript'],
  });
  let VERSION = 0;
  traverse(ast, {
    VariableDeclarator: astPath => {
      const {id, init} = astPath.node;
      if (
        id.type === 'Identifier' &&
        id.name == 'VERSION' &&
        init != null &&
        init.type == 'NumericLiteral'
      ) {
        VERSION = init.value;
      }
    },
  });
  const fileName = basename(sourceWoExt);
  const type = fileName
    .split('-')
    .map(p => `${p.slice(0, 1).toLocaleUpperCase()}${p.slice(1)}`)
    .join('');
  const actualFile = join(basePath, `${sourceWoExt}-json.ts`);

  const config = {
    path: source,
    tsconfig,
    expose,
    type,
    topRef,
    jsDoc,
  };

  const generator = createGenerator(config);
  const schema = generator.createSchema(config.type);
  const definition = {
    ...schema.definitions[config.type],
    indexes: ['created_at', 'updated_at'],
    primaryKey: 'id',
    version: VERSION,
  };
  const properties = definition.properties || {};
  const propertyKeys = Object.keys(properties);
  if (propertyKeys.includes('name')) {
    definition['indexes'].push('name');
  }
  propertyKeys.forEach(propertyName => {
    const property = properties[propertyName];
    if (property.$ref != null && property.type === 'object') {
      delete property.$ref;
    }
    if (propertyName.includes('_ref_id')) {
      const collectionRef = propertyName.replace('_ref_id', '');
      property.ref = collectionRef;
    }
  });

  const schemaString = JSON.stringify(definition, null, 2);
  const modelName = definition.title || '';
  const modelModule = modelName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  const expected =
    `${licenseBanner}\n\n` +
    `import {RxJsonSchema} from 'rxdb';\n\n` +
    `import {${modelName}} from './${modelModule}';\n\n` +
    `// tslint:disable\n` +
    `export const schema = ${schemaString} as RxJsonSchema<${modelName}>;\n`;

  if (accept) {
    writeFileSync(actualFile, expected);
  } else {
    const actual = existsSync(actualFile) ? readFileSync(actualFile, 'utf-8') : '';

    if (expected !== actual) {
      console.error(
        '\n\nIf you modify a model interface, you must increment the corresponding ' +
          'schema version and accept the new json schema',
      );
      console.error(
        `\n\nTo do so, increment by 1 the VERSION constant in ${sourceWoExt}.ts then ` +
          'execute the following script:',
      );
      const matches = /projects\/(\w+)\/(\w+)\//g.exec(actualFile);
      console.error(`\n\nyarn approve-model-schema ${matches[1]}/${matches[2]}/${modelModule}\n\n`);
      return false;
    }
  }
  return true;
};

if (esMain(import.meta)) {
  const args = process.argv.slice(2);
  const params = minimist(args, {
    boolean: ['topRef', 'accept'],
    string: ['source', 'expose', 'jsDoc'],
    default: {expose: 'export', topRef: true, jsDoc: 'extended', accept: false},
  });
  modelSchemaTest(params).then(res => {
    if (!res) {
      process.exit(1);
    }
  });
}
