import {default as conventionalChangelog} from 'conventional-changelog';
import {default as esMain} from 'es-main';
import {readFileSync, writeFileSync} from 'fs';
import {
  adjectives, animals, colors, countries, languages, names, starWars,
  uniqueNamesGenerator
} from 'unique-names-generator';

const dateRe = /\(([0-9]{4}-[0-9]{2}-[0-9]{2})\)/;
const changelogPath = 'CHANGELOG.md';
const dictionaries = [adjectives, animals, colors, countries, languages, names, starWars];

// Generate the changelog body for the commits since the previous git tag.
// `version` is passed as the writer context so the section header carries the
// full release id (e.g. 18.0.4-sw.147) and the compare link is built against
// the previous tag.
const baseContent = version => {
  return new Promise(resolve => {
    const res = conventionalChangelog({preset: 'angular'}, {version});
    let content = '';
    res.setEncoding('utf8');
    res.on('data', data => content = `${content}${data}`);
    res.on('close', () => resolve(content));
  });
};

/**
 * Prepend a new release section to CHANGELOG.md, built from the commits since
 * the previous git tag.
 * @param {string} [version] full release id (e.g. "18.0.4-sw.147"). Defaults to
 *   the package.json version.
 * @returns {Promise<{releaseName: string, version: string, content: string}|null>}
 *   the written section, or null when there are no commits to record.
 */
export const changelog = async version => {
  if (version == null) {
    version = JSON.parse(readFileSync('package.json', 'utf-8')).version;
  }
  const content = await baseContent(version);
  const lines = content.split('\n');
  if (lines.length === 0) {
    return null;
  }
  // conventional-changelog emits its own header on the first line; we replace
  // it with our custom "# <version> "<name>" (<date>)" format but reuse its date.
  const dateMatch = dateRe.exec(lines[0] || '');
  const date = dateMatch != null ? dateMatch[1] : new Date().toISOString().slice(0, 10);
  const body = lines.slice(1).filter(line => line.length > 0);
  if (body.length === 0) {
    // No conventional commits since the previous tag: nothing to record.
    return null;
  }
  const releaseName = uniqueNamesGenerator({dictionaries, length: 2, separator: '-'});
  const section = [
    `<a name="${version}"></a>`,
    `# ${version} "${releaseName}" (${date})`,
    ...body,
    '',
    '<!-- CHANGELOG SPLIT MARKER -->',
    '',
    '',
  ].join('\n');
  const current = readFileSync(changelogPath, 'utf-8');
  writeFileSync(changelogPath, `${section}${current}`);
  return {releaseName, version, content: section};
};

if (esMain(import.meta)) {
  changelog();
}
