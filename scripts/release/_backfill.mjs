// scripts/release/_backfill.mjs  (one-off: usa e cancella)
import {readFileSync, writeFileSync} from 'fs';
import conventionalChangelog from 'conventional-changelog';
import {
  adjectives,
  animals,
  colors,
  countries,
  languages,
  names,
  starWars,
  uniqueNamesGenerator,
} from 'unique-names-generator';

const version = '18.0.4-sw.146';
const from = 'v18.0.4-sw.145';
const to = 'v18.0.4-sw.146';
const dicts = [adjectives, animals, colors, countries, languages, names, starWars];

const out = await new Promise(res => {
  const s = conventionalChangelog({preset: 'angular'}, {version}, {from, to});
  let o = '';
  s.setEncoding('utf8');
  s.on('data', d => (o += d));
  s.on('close', () => res(o));
});

const lines = out.split('\n');
const dm = /\(([0-9]{4}-[0-9]{2}-[0-9]{2})\)/.exec(lines[0] || '');
const date = dm ? dm[1] : '2026-07-21';
const body = lines.slice(1).filter(l => l.length > 0);
const name = uniqueNamesGenerator({dictionaries: dicts, length: 2, separator: '-'});
const section = [
  `<a name="${version}"></a>`,
  `# ${version} "${name}" (${date})`,
  ...body,
  '',
  '<!-- CHANGELOG SPLIT MARKER -->',
  '',
  '',
].join('\n');

writeFileSync('CHANGELOG.md', section + readFileSync('CHANGELOG.md', 'utf8')); // prepend
console.log(`Prepended ${version} (${date}) to CHANGELOG.md`);
