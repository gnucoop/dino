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
 * Usage:
 *   node scripts/release/release-notes.mjs --from=v18.0.4-sw.145 --to=v18.0.4-sw.146
 *   node scripts/release/release-notes.mjs --from=<tag> --to=<tag> --lang=Italian
 *   node scripts/release/release-notes.mjs --from=<tag> --to=<tag> --dry   # show model input only
 *
 * By default it only prints the generated notes to stdout (a preview). Pipe it
 * into a release when ready, e.g.:
 *   node scripts/release/release-notes.mjs --from=A --to=B > notes.md
 *   gh release create B --title B --notes-file notes.md
 */

import {execSync} from 'child_process';
import {default as esMain} from 'es-main';

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

function systemPrompt(lang) {
  return `You write user-facing "What's new" release notes for Dino, a web application for structured data collection, monitoring and analysis. The audience is END USERS, not developers.

Rules:
- Write in ${lang}.
- Plain, benefit-oriented language. Describe what changed for the user and why it matters.
- NEVER include commit hashes, scopes (e.g. "material/import-form:"), branch names, or technical jargon (Angular, components, modules, service worker, etc.).
- Never mention code-level identifiers, field/property names, CSS units or units of measure, file formats used internally, or implementation terms (e.g. "updated_at", "dvh", "chrome", "gating", "ref id"). Describe the visible effect instead ("the last-updated date can now be shown as a column", "the footer stays visible on mobile").
- Merge related commits into a single clear point; drop anything purely internal that a user would not notice.
- Group items under a few short headings. Suggested: "✨ Novità" for new features and "🛠 Miglioramenti e correzioni" for improvements and fixes (translate the headings into ${lang}). Omit a heading if it has no items.
- Keep it concise: short bullet points, no filler.
- Output ONLY Markdown. No preamble, no explanations, no code fences.`;
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
 * Generate user-facing release notes for a tag range.
 * @param {{from?: string, to?: string, lang?: string}} opts
 * @returns {Promise<string|null>} the Markdown notes, or null when the range has
 *   no user-facing (feat/fix/perf) commits.
 */
export async function releaseNotes({from, to = 'HEAD', lang = 'English'} = {}) {
  if (!AUTH_TOKEN) {
    throw new Error('ANTHROPIC_AUTH_TOKEN environment variable is required');
  }
  const commits = collectCommits(from, to);
  if (commits.length === 0) return null;
  const userPrompt = `Version range: ${from || '(start)'} → ${to}

User-facing commits (conventional format):
${commits.map(c => `- ${c}`).join('\n')}`;
  return generate(systemPrompt(lang), userPrompt);
}

async function main() {
  const from = arg('from');
  const to = arg('to', 'HEAD');
  const lang = arg('lang', 'English');
  const dry = arg('dry', false);

  const commits = collectCommits(from, to);

  if (commits.length === 0) {
    console.error(`No user-facing (feat/fix/perf) commits in ${from || '(start)'}..${to}.`);
    process.exit(0);
  }

  if (dry) {
    const userPrompt = `Version range: ${from || '(start)'} → ${to}

User-facing commits (conventional format):
${commits.map(c => `- ${c}`).join('\n')}`;
    console.error(`# DRY RUN — model input (${commits.length} commits), no API call:\n`);
    console.log(userPrompt);
    return;
  }

  if (!AUTH_TOKEN) {
    console.error('ANTHROPIC_AUTH_TOKEN environment variable is required (or use --dry).');
    process.exit(1);
  }

  console.log(await releaseNotes({from, to, lang}));
}

if (esMain(import.meta)) {
  main().catch(err => {
    console.error(err.message);
    process.exit(1);
  });
}
