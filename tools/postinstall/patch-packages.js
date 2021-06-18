const fs = require('fs');
const path = require('path');

const memorySrc = path.posix.join('node_modules', 'pouchdb', 'dist', 'pouchdb.memory.js');
const memoryDst = path.posix.join('node_modules', 'pouchdb-adapter-memory', 'lib', 'pouchdb.memory.js');
const rep = 'if (typeof PouchDB === \'undefined\') {\n' +
  '  guardedConsole(\'error\', \'memory adapter plugin error: \' +\n' +
  '    \'Cannot find global "PouchDB" object! \' +\n' +
  '    \'Did you remember to include pouchdb.js?\');\n' +
  '} else {\n' +
  '  PouchDB.plugin(MemoryPouchPlugin);\n' +
  '}\n';
let content = `var modExports;\n`
  + `${fs.readFileSync(memorySrc, 'utf-8').replace(rep, 'modExports = MemoryPouchPlugin;\n')}\n`
  + `module.exports = modExports;\n`;
fs.writeFileSync(memoryDst, content);
packageJsonPath = path.posix.join('node_modules', 'pouchdb-adapter-memory', 'package.json');
packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
packageJson.browser = './lib/pouchdb.memory.js';
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));

const generateFunction = path.posix.join('node_modules', 'generate-function', 'index.js');
content = fs.readFileSync(generateFunction, 'utf-8');
content = content.replace('require(\'util\')', 'require(\'util/\')');
fs.writeFileSync(generateFunction, content);

const rxdbPackagePath = path.posix.join('node_modules', 'rxdb', 'package.json');
const rxdbPackage = JSON.parse(fs.readFileSync(rxdbPackagePath), 'utf8');

let indexFile = './lib/plugins/migration/index.js';
content = JSON.stringify({
  name: `rxdb/plugins/migration`,
  main: indexFile,
  dependencies: rxdbPackage.dependencies,
  peerDependencies: rxdbPackage.peerDependencies,
  devDependencies: rxdbPackage.devDependencies,
});
packageJsonPath = path.posix.join('node_modules', 'rxdb', 'dist', 'package' + '.json');
fs.writeFileSync(packageJsonPath, content);

indexFile = './plugins/replication-graphql/index.js';
content = JSON.stringify({
  name: `rxdb/plugins/replication-graphql`,
  main: indexFile,
  dependencies: rxdbPackage.dependencies,
  peerDependencies: rxdbPackage.peerDependencies,
  devDependencies: rxdbPackage.devDependencies,
});
packageJsonPath = path.posix.join('node_modules', 'rxdb', 'dist', 'lib', 'package' + '.json');
fs.writeFileSync(packageJsonPath, content);

const uuidV4 = path.posix.join('node_modules', 'pouchdb-utils', 'node_modules', 'uuid', 'dist', 'v4.js');
const uuidV4Cont = fs.readFileSync(uuidV4, 'utf8');
const uuidV4Search = 'var _rng = _interopRequireDefault(require("./rng.js"));';
const uuidV4Replace = 'var _rng = _interopRequireDefault(require("./rng-browser.js"));';
fs.writeFileSync(uuidV4, uuidV4Cont.replace(uuidV4Search, uuidV4Replace));
