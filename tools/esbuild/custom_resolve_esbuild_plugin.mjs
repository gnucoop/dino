import fs from 'fs';
import path from 'path';

const resolvePath = (args, modulePath) => {
  return {path: path.join(process.cwd(), 'node_modules', modulePath)};
};

export const customResolvePlugin = {
  name: 'custom-resolve-plugin',
  setup(build) {
    build.onResolve({filter: /^xlsx$/}, (args) => {
      return resolvePath(args, 'xlsx/dist/xlsx.min.js');
    });
    build.onLoad({filter: /xlsx\.min\.js/}, (args) => {
      const contents = fs.readFileSync(args.path, 'utf-8').replace(/require\("fs"\)/gm, 'undefined');
      return {contents};
    });
  },
};
