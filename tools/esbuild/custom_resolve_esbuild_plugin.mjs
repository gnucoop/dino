import fs from 'fs';
import path from 'path';

const resolvePath = (args, modulePath) => {
  return {path: path.join(process.cwd(), 'node_modules', modulePath)};
};

export const customResolvePlugin = {
  name: 'custom-resolve-plugin',
  setup(build) {
    build.onResolve({filter: /^immediate$/}, (args) => {
      return resolvePath(args, 'immediate/dist/immediate.js');
    });
    build.onResolve({filter: /^isomorphic-fetch$/}, (args) => {
      return resolvePath(args, 'isomorphic-fetch/fetch-npm-browserify.js');
    });
    build.onResolve({filter: /^pouchdb-adapter-memory$/}, (args) => {
      return resolvePath(args, 'pouchdb/dist/pouchdb.memory.js');
    });
    build.onResolve({filter: /^rxdb$/}, (args) => {
      return resolvePath(args, 'rxdb/dist/rxdb.browserify.js');
    });
    build.onResolve({filter: /^subscriptions-transport-ws$/}, (args) => {
      return resolvePath(args, 'subscriptions-transport-ws/browser/client.js');
    });
    build.onResolve({filter: /^xlsx$/}, (args) => {
      return resolvePath(args, 'xlsx/dist/xlsx.min.js');
    });
    build.onLoad({filter: /has-bigints\/index\.js/}, (args) => {
      const contents = `var global = window;\n`
        + `${fs.readFileSync(args.path, 'utf-8')}`;
      return {contents};
    });
    build.onLoad({filter: /pouchdb\.memory\.js/}, (args) => {
      const rep = 'if (typeof PouchDB === \'undefined\') {\n' +
        '  guardedConsole(\'error\', \'memory adapter plugin error: \' +\n' +
        '    \'Cannot find global "PouchDB" object! \' +\n' +
        '    \'Did you remember to include pouchdb.js?\');\n' +
        '} else {\n' +
        '  PouchDB.plugin(MemoryPouchPlugin);\n' +
        '}\n';
      const contents = `var modExports;\n`
        + `${fs.readFileSync(args.path, 'utf-8').replace(rep, 'modExports = MemoryPouchPlugin;\n')}\n`
        + `module.exports = modExports;\n`;
      return {contents};
    });
    build.onLoad({filter: /rxdb\.browserify\.js/}, async (args) => {
      const content = fs.readFileSync(args.path, 'utf-8')
        .replace(`window['RxDB'] = RxDB;`, `window['RxDB'] = RxDB;\nRxDBObj = RxDB;`);
      return {contents: `var RxDBObj;\n${content}\nmodule.exports = RxDBObj;`};
    });
    build.onLoad({filter: /subscriptions-transport-ws\/browser\/client\.js/}, async (args) => {
      const contents = fs.readFileSync(args.path, 'utf-8');
      return {contents: `${contents}module.exports = SubscriptionsTransportWs;`}
    });
    build.onLoad({filter: /xlsx\.min\.js/}, (args) => {
      const contents = fs.readFileSync(args.path, 'utf-8').replace(/require\("fs"\)/gm, 'undefined');
      return {contents};
    });
  },
};
