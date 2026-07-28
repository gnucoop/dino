#!/usr/bin/env node

import {default as esMain} from 'es-main';
import {readFileSync, unlinkSync, writeFileSync} from 'fs';
import {tmpdir} from 'os';
import {join} from 'path';
import {default as inquirer} from 'inquirer';
import {default as semver} from 'semver';
import {default as shell} from 'shelljs';

import {changelog} from './release/index.mjs';
import {ajfVersionAt, releaseNotes} from './release/release-notes.mjs';

// The release branch. A deploy is cut from here.
const RELEASE_BRANCH = 'dev';

// Files that carry the app "version". package.json (root) is the source of truth.
const VERSION_FILES = [
  'package.json',
  'projects/dinoapp/package.json',
  'projects/dinoapp/ngsw-config.json',
  'projects/dinoapp/src/manifest.webmanifest',
  'projects/dinoapp/src/app/base-webmanifest.ts',
];

// Files that carry the service-worker "sw_version" (a monotonic deploy counter).
const SW_VERSION_FILES = [
  'projects/dinoapp/ngsw-config.json',
  'projects/dinoapp/src/manifest.webmanifest',
  'projects/dinoapp/src/app/base-webmanifest.ts',
];

// TypeScript sources quote keys/values with single quotes; JSON with double.
const quoteFor = file => (file.endsWith('.ts') ? "'" : '"');

// Read the value of `<q>key<q>: <q>value<q>` from a file.
const readField = (file, key) => {
  const q = quoteFor(file);
  const match = new RegExp(`${q}${key}${q}:\\s*${q}([^${q}]+)${q}`).exec(readFileSync(file, 'utf8'));
  return match != null ? match[1] : null;
};

// Replace the value of `<q>key<q>: <q>oldValue<q>` with newValue across files.
const replaceField = (files, key, oldValue, newValue) => {
  if (oldValue === newValue) {
    return;
  }
  for (const file of files) {
    const q = quoteFor(file);
    const search = `${q}${key}${q}: ${q}${oldValue}${q}`;
    const replacement = `${q}${key}${q}: ${q}${newValue}${q}`;
    const content = readFileSync(file, 'utf8');
    if (!content.includes(search)) {
      shell.echo(`  WARN: "${key}" (${oldValue}) not found in ${file}`);
      continue;
    }
    writeFileSync(file, content.split(search).join(replacement));
    shell.echo(`  updated ${key} -> ${newValue} in ${file}`);
  }
};

// After the push, optionally create a GitHub Release for the new tag, with
// user-facing notes generated from the commits (via release-notes.mjs). Failures
// here are non-fatal: the tag and push already succeeded.
const maybeCreateGitHubRelease = async (tag, title) => {
  if (!shell.which('gh')) {
    shell.echo('gh CLI not found — skipping GitHub Release. Create it later with:');
    shell.echo(`  node scripts/release/release-notes.mjs --from=<prev-tag> --to=${tag} > notes.md`);
    shell.echo(`  gh release create ${tag} --title "${title}" --notes-file notes.md`);
    return;
  }
  const {create} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'create',
      default: true,
      message: `Create a GitHub Release for ${tag} with AI-generated user-facing notes?`,
    },
  ]);
  if (!create) {
    return;
  }
  const {lang} = await inquirer.prompt([
    {type: 'list', name: 'lang', message: 'Release notes language:', choices: ['English', 'Italian'], default: 'English'},
  ]);
  // Previous release tag (HEAD^ excludes the tag we just created on HEAD).
  const prevTag = shell.exec('git describe --tags --abbrev=0 HEAD^', {silent: true}).stdout.trim() || undefined;
  // Heads-up when this release also carries a new AJF: the library changelog is
  // folded into the notes as its own section.
  const ajfPrev = prevTag != null ? ajfVersionAt(prevTag) : null;
  const ajfCur = ajfVersionAt(tag);
  if (ajfPrev != null && ajfCur != null && ajfPrev !== ajfCur) {
    shell.echo(`  Shared library: ${ajfPrev} -> ${ajfCur}, its changelog will be included.`);
  }
  let notes;
  try {
    notes = await releaseNotes({from: prevTag, to: tag, lang});
  } catch (err) {
    shell.echo(`  Could not generate notes (${err.message}). Skipping Release — create it manually.`);
    return;
  }
  if (!notes) {
    shell.echo('  Nothing user-facing since the previous tag — skipping GitHub Release.');
    return;
  }
  const notesFile = join(tmpdir(), `dino-relnotes-${tag.replace(/[^\w.-]/g, '_')}.md`);
  writeFileSync(notesFile, notes);
  const res = shell.exec(`gh release create ${tag} --title "${title}" --notes-file "${notesFile}"`);
  unlinkSync(notesFile);
  shell.echo(res.code === 0 ? 'GitHub Release created.' : 'gh release create failed — see output above.');
};

const prepareRelease = async () => {
  // --- Branch guard ---
  const branch = shell.exec('git rev-parse --abbrev-ref HEAD', {silent: true}).stdout.trim();
  if (branch !== RELEASE_BRANCH) {
    const {proceed} = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'proceed',
        default: false,
        message: `You are on "${branch}", not "${RELEASE_BRANCH}". Continue anyway?`,
      },
    ]);
    if (!proceed) {
      shell.echo('Aborted.');
      shell.exit(0);
    }
  }

  // --- Current version + sw_version ---
  const currentVersion = JSON.parse(readFileSync('package.json', 'utf8')).version;
  const currentSw = readField('projects/dinoapp/src/app/base-webmanifest.ts', 'sw_version');
  if (currentSw == null) {
    shell.echo('Could not read the current sw_version.');
    shell.exit(1);
  }
  shell.echo(`Current version: ${currentVersion}  |  sw_version: ${currentSw}`);

  // --- Pick the new version (default: keep — most deploys only bump sw_version) ---
  const choices = [{name: `Keep ${currentVersion}`, value: currentVersion}];
  if (semver.prerelease(currentVersion) != null) {
    choices.push({name: `Pre-release: ${semver.inc(currentVersion, 'prerelease')}`, value: semver.inc(currentVersion, 'prerelease')});
    choices.push({name: `Stable: ${semver.inc(currentVersion, 'patch')}`, value: semver.inc(currentVersion, 'patch')});
  } else {
    choices.push({name: `Patch: ${semver.inc(currentVersion, 'patch')}`, value: semver.inc(currentVersion, 'patch')});
    choices.push({name: `Minor: ${semver.inc(currentVersion, 'minor')}`, value: semver.inc(currentVersion, 'minor')});
    choices.push({name: `Major: ${semver.inc(currentVersion, 'major')}`, value: semver.inc(currentVersion, 'major')});
  }
  choices.push({name: 'Custom', value: 'custom'});
  let {newVersion} = await inquirer.prompt([
    {type: 'list', name: 'newVersion', message: 'Version to release:', choices},
  ]);
  if (newVersion === 'custom') {
    ({newVersion} = await inquirer.prompt([
      {type: 'input', name: 'newVersion', message: 'Enter a new version:'},
    ]));
    if (semver.parse(newVersion) == null) {
      shell.echo('Invalid version');
      shell.exit(1);
    }
  }

  // --- Pick the new sw_version (default: +1) ---
  const {newSw} = await inquirer.prompt([
    {
      type: 'input',
      name: 'newSw',
      message: 'sw_version:',
      default: String(Number(currentSw) + 1),
      validate: value => (/^[0-9]+$/.test(value) ? true : 'sw_version must be an integer'),
    },
  ]);

  const releaseId = `${newVersion}-sw.${newSw}`;
  const tag = `v${releaseId}`;
  // A version bump is the headline release for that version: title it with the
  // bare semver ("18.0.5"). Later sw-only deploys of the same version keep the
  // full releaseId ("18.0.5-sw.148").
  const isVersionBump = newVersion !== currentVersion;
  const releaseTitle = isVersionBump ? newVersion : releaseId;
  shell.echo(`\nReleasing: ${releaseId}  (tag ${tag})\n`);

  // --- Write the version files ---
  replaceField(VERSION_FILES, 'version', currentVersion, newVersion);
  replaceField(SW_VERSION_FILES, 'sw_version', currentSw, newSw);

  // --- Changelog (built from commits since the previous tag) ---
  const result = await changelog(releaseId);
  if (result == null) {
    shell.echo('No conventional commits since the last tag — CHANGELOG.md not updated.');
  }

  // --- Review + commit ---
  const {commit} = await inquirer.prompt([
    {type: 'confirm', name: 'commit', message: 'Review the staged changes. Commit? (Y/N)'},
  ]);
  if (!commit) {
    shell.echo('Nothing committed — changes left in the working tree for review.');
    shell.exit(0);
  }

  const filesToAdd = [...new Set([...VERSION_FILES, ...SW_VERSION_FILES, 'CHANGELOG.md'])].join(' ');
  shell.exec(`git add ${filesToAdd}`);
  const message = isVersionBump
    ? `release: cut the v${newVersion} release`
    : `build: Manifest and worker sw_version upgraded to ${newSw}`;
  shell.exec(`git commit -m "${message}"`);
  shell.exec(`git tag -a ${tag} -m "Release deploy: v${newVersion} sw_version ${newSw}"`);

  // --- Push (this triggers the real deploy) ---
  const {push} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'push',
      default: false,
      message: `Push "${branch}" and tag ${tag}? This triggers the deploy.`,
    },
  ]);
  if (!push) {
    shell.echo(`Not pushed. When ready:\n  git push --atomic origin ${branch} ${tag}`);
    shell.exit(0);
  }
  // Push branch + tag together so Vercel never sees the release commit before
  // its tag (they either both land or neither does).
  shell.exec(`git push --atomic origin ${branch} ${tag}`);

  // --- GitHub Release with user-facing notes (optional, non-fatal) ---
  await maybeCreateGitHubRelease(tag, releaseTitle);

  shell.echo('Done.');
};

if (esMain(import.meta)) {
  prepareRelease();
}
