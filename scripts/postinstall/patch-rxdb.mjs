import {default as esMain} from 'es-main';
import {readFileSync, writeFileSync} from 'fs';

export const patchRxDb = () => {
  const patchFile = 'node_modules/rxdb/dist/es/plugins/replication/index.js';

  const content = readFileSync(patchFile, 'utf-8').replace(
    'result = _this2$push$handler',
    'result = []',
  );
  writeFileSync(patchFile, content);
};

if (esMain(import.meta)) {
  patchRxDb();
}
