import {readFileSync} from 'fs';

const adapterMemorySearchStr = `guardedConsole('error', 'memory adapter plugin error: ' +\n`
  + `    'Cannot find global "PouchDB" object! ' +\n`
  + `    'Did you remember to include pouchdb.js?');`;
const pouchdDbPlugin = {
  name: 'pouchdb',
  setup(build) {
    build.onLoad({filter: /pouchdb\.(find|memory)\.js/}, async (args) => {
      let contents = await new Promise((resolve, reject) => {
        const content = readFileSync(args.path, 'utf-8')
          .replace(adapterMemorySearchStr, 'PouchDBPlugin = MemoryPouchPlugin;');
        resolve(`var PouchDBPlugin;\n${content}\nmodule.exports = PouchDBPlugin;`);
      });
      return {contents};
    });
  },
};

const rxdbPlugin = {
  name: 'rxdb',
  setup(build) {
    build.onLoad({filter: /rxdb\.browserify\.js/}, async (args) => {
      let contents = await new Promise((resolve, reject) => {
        const content = readFileSync(args.path, 'utf-8')
          .replace(`window['RxDB'] = RxDB;`, `window['RxDB'] = RxDB;\nRxDBObj = RxDB;`);
        resolve(`var RxDBObj;\n${content}\nmodule.exports = RxDBObj;`);
      });
      return {contents};
    });
  },
};

export default {
  globalName: "__exports",
  banner: {js: 'define("TMPL_MODULE_NAME", [], function() {var global = window; var process = {env: {}};'},
  footer: {js: 'return __exports;})'},
  plugins: [pouchdDbPlugin, rxdbPlugin],
};
