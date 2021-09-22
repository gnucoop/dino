import {existsSync, readFileSync, writeFileSync} from 'fs';
import {JSONSchema7} from 'json-schema';
import * as minimist from 'minimist';
import {basename, join} from 'path';
import {Config, createGenerator} from 'ts-json-schema-generator';

const args = process.argv.slice(2);
const {tsconfig, source, expose, topRef, jsDoc, accept} = minimist(args, {
  boolean: ['topRef', 'accept'],
  string: ['tsconfig', 'source', 'expose', 'jsDoc'],
  default: {expose: 'export', topRef: true, jsDoc: 'extended', accept: false},
});

const basePath = join(process.cwd(), '..', process.env.BAZEL_WORKSPACE);
const {licenseBanner} = require(join(basePath, 'build-config.js'));
const sourceWoExt = source.replace('.d.ts', '');
const {VERSION} = require(join(basePath, sourceWoExt));
const fileName = basename(sourceWoExt);
const type =
    fileName.split('-').map(p => `${p.slice(0, 1).toLocaleUpperCase()}${p.slice(1)}`).join('');
const actualFile = join(basePath, `${sourceWoExt}-json.ts`);

const config = {
  path: source,
  tsconfig,
  expose,
  type,
  topRef,
  jsDoc,
} as Config;

const generator = createGenerator(config);
const schema = generator.createSchema(config.type);
const definition = {
  ...schema.definitions[config.type] as JSONSchema7,
  primaryKey: 'id',
  version: VERSION,
};
const properties = definition.properties || {};
Object.keys(definition.properties || {}).forEach(propertyName => {
  const property = properties[propertyName] as JSONSchema7;
  if (property.$ref != null && property.type === 'object') {
    delete property.$ref;
  }
});

const schemaString = JSON.stringify(definition, null, 2);
const modelName = definition.title || '';
const modelModule = modelName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
const expected = `${licenseBanner}\n\n` +
    `import {RxJsonSchema} from 'rxdb';\n\n` +
    `import {${modelName}} from './${modelModule}';\n\n` +
    `// tslint:disable\n` +
    `export const schema = ${schemaString} as RxJsonSchema<${modelName}>;\n`;

if (accept) {
  writeFileSync(actualFile, expected);
} else {
  const actual = existsSync(actualFile) ? readFileSync(actualFile, 'utf-8') : '';

  if (expected !== actual) {
    const bazelTarget = process.env.BAZEL_TARGET;
    if (bazelTarget) {
      console.error(
          '\n\nIf you modify a model interface, you must increment the corresponding ' +
          'schema version and accept the new json schema');
      console.error(
          `\n\nTo do so, increment by 1 the VERSION constant in ${sourceWoExt}.ts then ` +
          'execute the following Bazel target:');
      console.error(`  yarn bazel run ${bazelTarget.replace(/_bin$/, '')}.accept`);
    }
    process.exit(1);
  }
}
