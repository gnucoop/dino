#!/usr/bin/env node

/**
 * release-notes.mjs
 *
 * Generate user-facing "What's new" release notes from the commits in a tag
 * range, using the Anthropic API (same env as dino-doc/scripts/docs-generate.mjs).
 *
 * The GitHub-native `--generate-notes` only echoes PR titles; our PR titles are
 * poor but our commits are well-formed (conventional). So we feed the commit
 * subjects to the model and let it write plain-language notes for end users.
 *
 * When the release also bumps the shared AJF library (gnucoop/ajf), the notes get
 * an extra section describing what changed there. The AJF entries come from that
 * repo's CHANGELOG.md, restricted to the versions crossed by this release (the
 * `@ajf/core` version locked in yarn.lock, previous tag vs. this one).
 *
 * Usage:
 *   node scripts/release/release-notes.mjs --from=v18.0.4-sw.145 --to=v18.0.4-sw.146
 *   node scripts/release/release-notes.mjs --from=<tag> --to=<tag> --lang=Italian
 *   node scripts/release/release-notes.mjs --from=<tag> --to=<tag> --dry   # show model input only
 *   node scripts/release/release-notes.mjs --from=<tag> --ajf-notes=ajf.md # hand-curated AJF block
 *   node scripts/release/release-notes.mjs --from=<tag> --no-ajf          # skip the AJF section
 *
 * By default it only prints the generated notes to stdout (a preview). Pipe it
 * into a release when ready, e.g.:
 *   node scripts/release/release-notes.mjs --from=A --to=B > notes.md
 *   gh release create B --title B --notes-file notes.md
 */

import {execSync} from 'child_process';
import {readFileSync} from 'fs';
import {default as esMain} from 'es-main';
import {default as semver} from 'semver';

const AUTH_TOKEN = process.env.ANTHROPIC_AUTH_TOKEN;
const BASE_URL = (process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com').replace(/\/$/, '');
const MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';
const MAX_TOKENS = 4096;
const MAX_CONTINUATIONS = 5;

// Conventional-commit types that are user-facing. Everything else (build, chore,
// ci, docs, refactor, style, test) is internal and excluded from user notes.
const USER_FACING = /^(feat|fix|perf)(\([^)]*\))?!?:/i;

// Scopes that are internal tooling, not app changes an end user would notice.
// A user-facing type carrying one of these scopes is dropped anyway.
const EXCLUDED_SCOPES = new Set(['dino-doc', 'docker', 'build']);

// Extract the conventional-commit scope (lowercased) from a subject, or '' if none.
const scopeOf = subject => {
  const m = /^[a-z]+\(([^)]*)\)!?:/i.exec(subject);
  return m ? m[1].trim().toLowerCase() : '';
};

// --- Shared library (AJF) ---------------------------------------------------

const AJF_REPO = 'gnucoop/ajf';
const AJF_CHANGELOG_RAW = `https://raw.githubusercontent.com/${AJF_REPO}/master/CHANGELOG.md`;
// The dependency whose locked version defines "which AJF is in this release".
const AJF_PKG = '@ajf/core';
// Safety net: never feed more than this many AJF version sections to the model.
const AJF_MAX_SECTIONS = 12;

// AJF scopes that are internal to the library: an end user of Dino cannot see
// them. Matched against the `**scope:**` of each changelog bullet.
const AJF_EXCLUDED_SCOPE =
  /\b(cypress|e2e|test|tests|build|ci|deps|dev-app|docs|demo|schematics)\b/;

function arg(name, def = undefined) {
  const hit = process.argv.slice(2).find(a => a === `--${name}` || a.startsWith(`--${name}=`));
  if (hit == null) return def;
  return hit.includes('=') ? hit.slice(hit.indexOf('=') + 1) : true;
}

/**
 * Collect user-facing commit subjects in `from..to` (or up to `to` if no from).
 */
function collectCommits(from, to) {
  const range = from ? `${from}..${to}` : to;
  const raw = execSync(`git log --no-merges --format=%s ${range}`, {encoding: 'utf8'});
  return raw
    .split('\n')
    .map(s => s.trim())
    .filter(Boolean)
    .filter(s => USER_FACING.test(s))
    .filter(s => !EXCLUDED_SCOPES.has(scopeOf(s)));
}

/**
 * Read the `@ajf/core` version locked at a git ref. yarn.lock carries the
 * resolved version; package.json only carries the `^x.y.z` range, which does not
 * move when a patch is picked up.
 * @returns {string|null} the version, or null if the ref or the entry is missing.
 */
export function ajfVersionAt(ref) {
  let lock;
  try {
    lock = execSync(`git show ${ref}:yarn.lock`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });
  } catch {
    return null;
  }
  // yarn v1: one or more quoted specs, then an indented `version "x.y.z"`.
  const escaped = AJF_PKG.replace('/', '\\/');
  const match = new RegExp(
    `^"?${escaped}@[^\\n]*:\\n(?:[^\\n]*\\n)*?\\s+version "([^"]+)"`,
    'm',
  ).exec(lock);
  return match != null ? match[1] : null;
}

/**
 * Fetch AJF's CHANGELOG.md. Prefers the gh CLI (already part of the release
 * flow, so auth and rate limits are handled) and falls back to the raw URL.
 */
async function fetchAjfChangelog() {
  try {
    return execSync(
      `gh api repos/${AJF_REPO}/contents/CHANGELOG.md -H "Accept: application/vnd.github.raw"`,
      {encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], maxBuffer: 32 * 1024 * 1024},
    );
  } catch {
    const res = await fetch(AJF_CHANGELOG_RAW);
    if (!res.ok) {
      throw new Error(`Could not fetch ${AJF_REPO} CHANGELOG.md (${res.status} ${res.statusText})`);
    }
    return res.text();
  }
}

/**
 * Split a changelog into per-version sections on its version headings. AJF's
 * CHANGELOG.md uses `# 18.3.2 "codename" (date)`; the GitHub release bodies use
 * `## 18.3.2 ...`, so accept both.
 * @returns {Array<{version: string, heading: string, body: string}>}
 */
function changelogSections(md) {
  const sections = [];
  let current = null;
  for (const line of md.replace(/\r/g, '').split('\n')) {
    const match = /^#{1,2}\s+v?(\d+\.\d+\.\d+[^\s"(]*)/.exec(line);
    if (match != null) {
      current = {version: match[1], heading: line.trim(), lines: []};
      sections.push(current);
      continue;
    }
    if (current != null) current.lines.push(line);
  }
  return sections.map(s => ({
    version: s.version,
    heading: s.heading,
    body: s.lines.join('\n').trim(),
  }));
}

/**
 * Strip a changelog section down to what could matter to an end user: drop the
 * commit-hash links and the bullets whose scope is library-internal, then drop
 * any `### Bug Fixes` / `### Features` heading left without bullets.
 */
function cleanAjfSection(body) {
  const kept = [];
  for (const line of body.split('\n')) {
    // Anchors and split markers the changelog generator emits.
    if (/^\s*(<a\s|<!--)/.test(line)) continue;
    if (/^\s*[*-]\s/.test(line)) {
      const scope = /\*\*([^*]+)\*\*/.exec(line);
      if (scope != null && AJF_EXCLUDED_SCOPE.test(scope[1].toLowerCase())) continue;
      // `([abc1234](https://github.com/...))` -> nothing.
      kept.push(line.replace(/\s*\(\[[0-9a-f]{6,}\]\([^)]*\)\)/gi, '').trimEnd());
      continue;
    }
    if (/^###\s/.test(line)) {
      // Heading: keep it only if a bullet follows (decided when we hit one).
      while (kept.length > 0 && /^###\s/.test(kept[kept.length - 1])) kept.pop();
      kept.push(line.trim());
      continue;
    }
    if (line.trim() !== '') kept.push(line.trimEnd());
  }
  while (kept.length > 0 && /^###\s/.test(kept[kept.length - 1])) kept.pop();
  return kept.join('\n').trim();
}

/**
 * Collect the AJF changelog entries crossed by this release.
 * @param {{from?: string, to?: string}} opts git refs of the previous and current release
 * @returns {Promise<{from: string, to: string, text: string}|null>} null when the
 *   AJF version did not move, cannot be resolved, or has nothing user-relevant.
 */
export async function ajfChanges({from, to = 'HEAD'} = {}) {
  // Without a previous ref the range is unbounded, and the whole AJF history is
  // not a release note. Skip rather than guess.
  if (!from) return null;
  const prev = ajfVersionAt(from);
  const cur = ajfVersionAt(to);
  if (prev == null || cur == null || !semver.valid(prev) || !semver.valid(cur)) return null;
  if (!semver.gt(cur, prev)) return null;

  const all = changelogSections(await fetchAjfChangelog())
    .filter(
      s => semver.valid(s.version) && semver.gt(s.version, prev) && semver.lte(s.version, cur),
    )
    .sort((a, b) => semver.rcompare(a.version, b.version));
  let picked = all;
  if (picked.length > AJF_MAX_SECTIONS) {
    picked = picked.slice(0, AJF_MAX_SECTIONS);
    console.error(
      `  NOTE: ${all.length} AJF versions in ${prev}..${cur}; using the ${AJF_MAX_SECTIONS} most recent ` +
        `(dropped ${all
          .map(s => s.version)
          .slice(AJF_MAX_SECTIONS)
          .join(', ')}).`,
    );
  }

  const text = picked
    .map(s => ({heading: s.heading, body: cleanAjfSection(s.body)}))
    .filter(s => s.body !== '')
    .map(s => `${s.heading}\n${s.body}`)
    .join('\n\n');
  return text === '' ? null : {from: prev, to: cur, text};
}

function systemPrompt(lang, withLibrary) {
  return `You write user-facing "What's new" release notes for Dino, a web application for structured data collection, monitoring and analysis. The audience is END USERS, not developers.

Rules:
- Write in ${lang}.
- Plain, benefit-oriented language. Describe what changed for the user and why it matters.
- NEVER include commit hashes, scopes (e.g. "material/import-form:"), branch names, or technical jargon (Angular, components, modules, service worker, etc.).
- Never mention code-level identifiers, field/property names, CSS units or units of measure, file formats used internally, or implementation terms (e.g. "updated_at", "dvh", "chrome", "gating", "ref id"). Describe the visible effect instead ("the last-updated date can now be shown as a column", "the footer stays visible on mobile").
- Merge related commits into a single clear point; drop anything purely internal that a user would not notice.
- Group items under a few short headings. Suggested: "✨ Novità" for new features and "🛠 Miglioramenti e correzioni" for improvements and fixes (translate the headings into ${lang}). Omit a heading if it has no items.
- Keep it concise: short bullet points, no filler.
- Output ONLY Markdown. No preamble, no explanations, no code fences.${
    withLibrary
      ? `

The input has a SECOND block: changes to the shared forms/reports library that Dino is built on (its own changelog, raw and much noisier).
- Treat it under its own final heading, "🧩 Moduli, form e report" (translate into ${lang}), after the Dino headings. Never merge its items into the Dino ones.
- Include ONLY items an end user can notice while using Dino: form fields and their inputs, tables, charts, reports and printing, translations, layout. Say what the user sees.
- DROP everything else without exception: internal APIs and function rewrites, data models, renamed identifiers, tests, tooling, dependencies. Most of this block is internal — a very short list, or none at all, is the expected outcome.
- If nothing in the block is user-visible, omit the heading entirely.
- Do not mention the library name, its version numbers, or its scopes.`
      : ''
  }`;
}

async function anthropicRaw(messages, system) {
  const res = await fetch(`${BASE_URL}/v1/messages`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': AUTH_TOKEN,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({model: MODEL, max_tokens: MAX_TOKENS, system, messages}),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Anthropic API error (${res.status}): ${text || res.statusText}`);
  }
  return res.json();
}

// Same truncation-safe pattern as docs-generate.mjs: resume via assistant prefill
// if the response stops on max_tokens.
async function generate(system, user) {
  const messages = [{role: 'user', content: user}];
  let full = '';
  for (let attempt = 0; ; attempt++) {
    const json = await anthropicRaw(messages, system);
    const parts = Array.isArray(json.content) ? json.content : [];
    full += parts.map(p => (p && p.type === 'text' ? p.text : '')).join('');
    if (json.stop_reason !== 'max_tokens') break;
    if (attempt >= MAX_CONTINUATIONS) {
      throw new Error(`Output still truncated after ${MAX_CONTINUATIONS} continuation(s)`);
    }
    full = full.replace(/\s+$/, '');
    messages.length = 1;
    messages.push({role: 'assistant', content: full});
  }
  return full.trim();
}

/**
 * Build the model input for a range.
 * @param {string|undefined} from
 * @param {string} to
 * @param {string[]} commits
 * @param {{from: string, to: string, text: string}|{text: string}|null} ajf
 */
function userPrompt(from, to, commits, ajf) {
  const blocks = [`Version range: ${from || '(start)'} → ${to}`];
  blocks.push(
    commits.length > 0
      ? `User-facing commits (conventional format):\n${commits.map(c => `- ${c}`).join('\n')}`
      : 'User-facing commits (conventional format):\n(none in this range)',
  );
  if (ajf != null) {
    const range = ajf.from != null ? ` (${ajf.from} → ${ajf.to})` : '';
    blocks.push(`Shared library changelog${range}, raw:\n${ajf.text}`);
  }
  return blocks.join('\n\n');
}

/**
 * Resolve the shared-library block: `false` skips it, a non-empty string is used
 * verbatim (hand-curated notes), anything else is auto-detected from the AJF
 * version crossed by the range.
 * @returns {Promise<{from?: string, to?: string, text: string}|null>}
 */
async function resolveLibrary(ajf, from, to) {
  if (ajf === false) return null;
  if (typeof ajf === 'string') return ajf.trim() === '' ? null : {text: ajf};
  return ajfChanges({from, to});
}

/**
 * Generate user-facing release notes for a tag range.
 * @param {{from?: string, to?: string, lang?: string, ajf?: false|string}} opts
 *   `ajf: false` skips the shared-library section; a string is used verbatim as
 *   the library block (hand-curated notes) instead of fetching the changelog.
 * @returns {Promise<string|null>} the Markdown notes, or null when the range has
 *   nothing user-facing to report.
 */
export async function releaseNotes({from, to = 'HEAD', lang = 'English', ajf} = {}) {
  if (!AUTH_TOKEN) {
    throw new Error('ANTHROPIC_AUTH_TOKEN environment variable is required');
  }
  const commits = collectCommits(from, to);
  const library = await resolveLibrary(ajf, from, to);
  if (commits.length === 0 && library == null) return null;
  return generate(systemPrompt(lang, library != null), userPrompt(from, to, commits, library));
}

async function main() {
  const from = arg('from');
  const to = arg('to', 'HEAD');
  const lang = arg('lang', 'English');
  const dry = arg('dry', false);
  const ajfNotesFile = arg('ajf-notes');
  const noAjf = arg('no-ajf', false);

  const commits = collectCommits(from, to);
  const ajf = noAjf ? false : ajfNotesFile ? readFileSync(ajfNotesFile, 'utf8').trim() : undefined;
  const library = await resolveLibrary(ajf, from, to);

  if (commits.length === 0 && library == null) {
    console.error(
      `No user-facing (feat/fix/perf) commits in ${
        from || '(start)'
      }..${to}, and no shared-library changes.`,
    );
    process.exit(0);
  }

  if (dry) {
    const counts = `${commits.length} commits${library != null ? ', + shared library block' : ''}`;
    console.error(`# DRY RUN — model input (${counts}), no API call:\n`);
    console.log(userPrompt(from, to, commits, library));
    return;
  }

  if (!AUTH_TOKEN) {
    console.error('ANTHROPIC_AUTH_TOKEN environment variable is required (or use --dry).');
    process.exit(1);
  }

  console.log(
    await generate(systemPrompt(lang, library != null), userPrompt(from, to, commits, library)),
  );
}

if (esMain(import.meta)) {
  main().catch(err => {
    console.error(err.message);
    process.exit(1);
  });
}
