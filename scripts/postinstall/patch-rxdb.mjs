import {default as esMain} from 'es-main';
import {readFileSync, writeFileSync} from 'fs';

export const patchRxDb = () => {
  // const patchFile = 'node_modules/rxdb/dist/es/plugins/replication/index.js';
  const patchFile = 'node_modules/rxdb/dist/types/types/util.d.ts';
  const content = readFileSync(patchFile, 'utf-8')
    .replace('Paths<T, D extends number = 10>', 'Paths<T, D extends number = 3>')
    .replace('Leaves<T, D extends number = 10>', 'Leaves<T, D extends number = 3>');
  writeFileSync(patchFile, content);
};

if (esMain(import.meta)) {
  patchRxDb();
}
