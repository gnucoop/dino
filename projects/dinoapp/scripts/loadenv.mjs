import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream/promises';
import dotenv from 'dotenv';

const dinoappRoot = path.resolve(fileURLToPath(import.meta.url), '../../');

const usage = `This script reads the environment variable "dinoenv" form a .env file
and writes it to src/environments/environment.ts.
It also loads actions and ajf custom functions, where necessary.
Before building the project, run this script with "yarn loadenv src/.env".
`;
if (process.argv.length <= 2) {
  console.log(usage);
  process.exit(1);
}
const envPath = process.argv[2];
dotenv.config({ path: envPath });

const base64 = process.env.dinoenv;
if (!base64) {
  console.error('dinoenv variable is not defined in file ' + envPath);
  process.exit(1);
}
const json = Buffer.from(base64, 'base64').toString();
const obj = JSON.parse(json);

const assets = [];
const icons = obj.webManifest?.icons || [];
for (const icon of icons) {
  assets.push({ object: icon, propName: 'src' });
}
const images = obj.customImagesConfig || {};
const names = ['logoLight', 'logoDark', 'logoBigLight', 'logoBigDark',
  'spinnerLight', 'spinnerDark', 'favicon'];
for (const name of names) {
  if (images[name]) {
    assets.push({ object: images, propName: name });
  }
}
for (const ass of assets) {
  const url = ass.object[ass.propName];
  const i = url.indexOf('/envassets/');
  if (i === -1) {
    console.error(`asset url ${url} does not contain /envassets/`);
    process.exit(1);
  }
  const rel = 'assets' + url.slice(i);
  // Replace absolute with relative url in env object
  ass.object[ass.propName] = rel;

  const dest = path.join(dinoappRoot, 'src', rel);
  if (fs.existsSync(dest)) {
    continue;
  }
  const resp = await fetch(url);
  if (!resp.ok) {
    console.error(`error ${resp.status} fetching asset ${url}`);
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await pipeline(resp.body, fs.createWriteStream(dest));
}

const env = `import {DinoEnvironment} from './environment-interface';

export const environment: DinoEnvironment = ${JSON.stringify(obj, null, 2)};
`;

let actions = `// this file is loaded at build time by the loadenv script
import {Actions} from '@dino/core/data';

export const actions: Actions = {};
`;
let functions = `// this file is loaded at build time by the loadenv script
import {AjfCustomFunctions} from '@dino/core/data';

export const ajfCustomFunctions: AjfCustomFunctions = {};
`;

const actionsUrl = obj.actionsUrl;
if (actionsUrl) {
  const resp = await fetch(actionsUrl);
  if (!resp.ok) {
    console.error(`error ${resp.status} fetching actions`);
    process.exit(1);
  }
  actions = await resp.text();
}

const functionsUrl = obj.ajfCustomFunctionsUrl;
if (functionsUrl) {
  const resp = await fetch(functionsUrl);
  if (!resp.ok) {
    console.error(`error ${resp.status} fetching custom functions`);
    process.exit(1);
  }
  functions = await resp.text();
}

fs.writeFileSync(path.join(dinoappRoot, 'src/environments/environment.ts'), env, 'utf8');
fs.writeFileSync(path.join(dinoappRoot, 'src/actions/actions.custom.ts'), actions, 'utf8');
fs.writeFileSync(path.join(dinoappRoot, 'src/ajf-functions/ajf-functions.custom.ts'), functions, 'utf8');
