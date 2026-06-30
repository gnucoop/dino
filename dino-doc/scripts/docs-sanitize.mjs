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
 * `---` frontmatter. It is idempotent: a well-formed page is returned unchanged.
 *
 * Run as a CLI to repair existing files in place:
 *   node dino-doc/scripts/docs-sanitize.mjs                # all Markdown under docs/
 *   node dino-doc/scripts/docs-sanitize.mjs path/to/file.md ...
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const isFence = line => /^```[\w-]*\s*$/.test(line.trim());

/**
 * Strip code-fence wrappers the model may have added around generated Markdown.
 * @param {string} raw - raw model output
 * @returns {string} sanitized Markdown (always ends with a single trailing newline)
 */
export function sanitizeGenerated(raw) {
  if (!raw) return raw;

  const stripped = raw.replace(/^\uFEFF/, '');
  const lines = stripped.trimStart().split('\n');

  // Nothing to do unless the document opens with a code fence. Return the input
  // UNCHANGED in that case (don't normalize whitespace on already-good files).
  if (lines.length === 0 || !isFence(lines[0])) {
    return raw;
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

  return lines.join('\n').trim() + '\n';
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
