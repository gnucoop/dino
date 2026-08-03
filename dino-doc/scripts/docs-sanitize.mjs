#!/usr/bin/env node

/**
 * docs-sanitize.mjs
 *
 * Cleans up Markdown produced by the language model before it is written to
 * disk. The generation/translation prompts instruct the model NOT to wrap its
 * output in code fences, but it sometimes does anyway — most often a
 * ```yaml / ```markdown fence around the YAML frontmatter. That breaks MkDocs:
 *
 *   - the frontmatter renders as a literal code block instead of page metadata;
 *   - if the fence is left unclosed, the REST of the page renders as raw text
 *     ("markdown instead of HTML").
 *
 * sanitizeGenerated() normalizes the observed failure modes back to proper
 * `---` frontmatter, and inserts the blank line Python-Markdown (MkDocs) requires
 * before a list that directly follows a paragraph or heading — without it the
 * list renders as one inline paragraph with literal `*` markers. It is
 * idempotent: a well-formed page is returned unchanged.
 *
 * Run as a CLI to repair existing files in place:
 *   node dino-doc/scripts/docs-sanitize.mjs                # all Markdown under docs/
 *   node dino-doc/scripts/docs-sanitize.mjs path/to/file.md ...
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const isFence = line => /^```[\w-]*\s*$/.test(line.trim());
const isListItem = line => /^\s*([-*+]|\d+\.)\s+/.test(line);

/**
 * Insert the blank line Python-Markdown (MkDocs) requires before a list that
 * immediately follows a paragraph or heading. Without it the whole block is
 * parsed as one paragraph and the markers render as literal `*` / `-` text.
 *
 * Conservative and non-destructive: it ONLY adds blank lines, and only when a
 * list marker starts a new list right after a non-blank, non-list line. Lines
 * inside fenced code blocks, list continuation lines, and lists that are
 * already spaced correctly are left untouched \u2014 so it is idempotent and returns
 * a well-formed document unchanged.
 *
 * @param {string} content
 * @returns {string}
 */
export function fixListSpacing(content) {
  if (!content) return content;

  const lines = content.split('\n');
  const out = [];
  let inList = false;
  let inCode = false;

  for (const line of lines) {
    // Track fenced code blocks \u2014 never touch their contents.
    if (isFence(line)) {
      inCode = !inCode;
      inList = false;
      out.push(line);
      continue;
    }
    if (inCode) {
      out.push(line);
      continue;
    }

    if (isListItem(line)) {
      const prev = out.length ? out[out.length - 1] : '';
      // A new list (not already inside one) right after a non-blank line needs
      // a separating blank line.
      if (!inList && prev.trim() !== '') out.push('');
      inList = true;
      out.push(line);
      continue;
    }

    if (line.trim() === '') {
      // Blank lines don't end a list on their own (loose lists / trailing blanks).
      out.push(line);
      continue;
    }

    // Non-blank, non-list line: an indented line continues the current list
    // item; anything else (paragraph/heading) ends the list.
    if (inList && /^\s+\S/.test(line)) {
      out.push(line);
      continue;
    }
    inList = false;
    out.push(line);
  }

  return out.join('\n');
}

/**
 * Quote YAML frontmatter values that would otherwise fail to parse.
 *
 * Translations routinely turn an English dash into a colon ("An overview of X —
 * the toolbar" → "Una panoramica di X: la barra"), and an unquoted ": " inside a
 * value is a YAML syntax error. MkDocs reacts by silently discarding the whole
 * frontmatter: the page loses its `title` and `description` (so the browser tab
 * shows only the site name and the meta description disappears) and the raw
 * `title: ... description: ...` block renders as a paragraph.
 *
 * Only values that actually need it are touched, and already-quoted values are
 * left alone, so this is idempotent and returns valid frontmatter unchanged.
 *
 * @param {string} content
 * @returns {string}
 */
export function quoteFrontmatterValues(content) {
  if (!content) return content;

  const m = /^---\n([\s\S]*?)\n---(\n|$)/.exec(content);
  if (!m) return content;

  // A bare value breaks (or changes) the parse when it contains ": " or " #", or
  // opens with a YAML indicator character.
  const needsQuoting = v => !/^["']/.test(v) && (/:\s/.test(v) || /\s#/.test(v) || /^[[\]{}&*!|>%@`]/.test(v));

  const body = m[1];
  const fixed = body
    .split('\n')
    .map(line => {
      const kv = /^([A-Za-z_][\w-]*):[ \t]+(.*\S)[ \t]*$/.exec(line);
      if (!kv) return line;
      const [, key, value] = kv;
      if (!needsQuoting(value)) return line;
      return `${key}: "${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
    })
    .join('\n');

  if (fixed === body) return content;
  const start = 4; // past the opening "---\n"
  return content.slice(0, start) + fixed + content.slice(start + body.length);
}

/**
 * Strip code-fence wrappers the model may have added around generated Markdown,
 * quote frontmatter values that would break the YAML parse (see
 * quoteFrontmatterValues), then normalize list spacing (see fixListSpacing).
 * @param {string} raw - raw model output
 * @returns {string} sanitized Markdown (always ends with a single trailing newline)
 */
export function sanitizeGenerated(raw) {
  if (!raw) return raw;

  const stripped = raw.replace(/^\uFEFF/, '');
  const lines = stripped.trimStart().split('\n');

  // No bogus opening fence: don't normalize whitespace, but still fix list
  // spacing (a rendering defect even on otherwise well-formed files). A file
  // that needs no list fix is returned byte-for-byte unchanged.
  if (lines.length === 0 || !isFence(lines[0])) {
    return fixListSpacing(quoteFrontmatterValues(raw));
  }

  // Drop the bogus opening fence.
  lines.shift();

  if (lines.length && lines[0].trim() === '---') {
    // Proper `---` frontmatter was wrapped inside the fence (e.g. the whole
    // document was fenced). Drop a dangling closing fence at the very end.
    if (lines.length && lines[lines.length - 1].trim() === '```') {
      lines.pop();
    }
  } else {
    // The fenced block itself was the frontmatter, written without `---`
    // delimiters (```yaml\ntitle: …\n```). Convert it to real frontmatter.
    const closeIdx = lines.findIndex(isFence);
    if (closeIdx !== -1) {
      lines[closeIdx] = '---';
      lines.unshift('---');
    }
  }

  return fixListSpacing(quoteFrontmatterValues(lines.join('\n').trim() + '\n'));
}

/**
 * Remove Markdown image references whose target file does not exist on disk.
 * The model occasionally invents screenshot/icon paths (e.g. `imgs/icons/*.png`)
 * that would render as broken images. Local refs are resolved relative to
 * `baseDir` (the directory the page lives in); http(s)/data/mailto URIs are
 * always kept.
 *
 * - A whole-line (block) image is dropped together with its line.
 * - An inline image (table cell, sentence) is replaced by its alt text.
 *
 * @param {string} content
 * @param {string} baseDir - directory the page lives in (resolves relative paths)
 * @returns {{ content: string, removed: string[] }}
 */
export function stripBrokenImageRefs(content, baseDir) {
  if (!content) return {content, removed: []};

  const removed = [];
  const isBroken = url => {
    if (!url || /^(https?:|data:|mailto:)/i.test(url)) return false;
    const target = path.resolve(baseDir, url.split('#')[0].split('?')[0]);
    return !fs.existsSync(target); // follows symlinks (docs/<lang>/imgs → ../imgs)
  };

  const imgRe = /!\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)/g;
  const blockRe = /^!\[([^\]]*)\]\(\s*([^)\s]+)(?:\s+"[^"]*")?\s*\)$/;

  const out = [];
  for (const line of content.split('\n')) {
    const block = line.trim().match(blockRe);
    if (block && isBroken(block[2])) {
      removed.push(block[2]);
      continue; // drop the whole line
    }
    out.push(
      line.replace(imgRe, (m, alt, url) => {
        if (isBroken(url)) {
          removed.push(url);
          return alt; // keep the alt text inline
        }
        return m;
      }),
    );
  }

  let result = out.join('\n');
  if (removed.length) result = result.replace(/\n{3,}/g, '\n\n'); // collapse gaps left by dropped lines
  return {content: result, removed};
}

// --- CLI: repair files in place ---------------------------------------------
if (process.argv[1] && process.argv[1].endsWith('docs-sanitize.mjs')) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const DOC_ROOT = path.resolve(__dirname, '..');

  let targets = process.argv.slice(2);
  if (targets.length === 0) {
    // Default: every Markdown file under docs/
    const walk = dir => {
      const out = [];
      for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
        const full = path.join(dir, e.name);
        if (e.isDirectory()) out.push(...walk(full));
        else if (e.name.endsWith('.md')) out.push(full);
      }
      return out;
    };
    targets = walk(path.join(DOC_ROOT, 'docs'));
  }

  let changed = 0;
  for (const file of targets) {
    const before = fs.readFileSync(file, 'utf8');
    const after = sanitizeGenerated(before);
    if (after !== before) {
      fs.writeFileSync(file, after);
      console.log(`fixed: ${file}`);
      changed++;
    }
  }
  console.log(`\nSanitized ${changed} file(s) of ${targets.length} checked.`);
}
