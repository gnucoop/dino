#!/usr/bin/env node

/**
 * docs-generate.mjs
 *
 * Main orchestrator for automated documentation generation.
 *
 * Workflow:
 * 1. Detect changed files via git diff (or via --modules/--pages overrides)
 * 2. Classify changes (routing vs component)
 * 3. If routing changed → full re-scan → sync mkdocs.yml nav → create/delete .md files
 * 4. If only components changed → targeted re-generation of affected pages.
 *    A page is affected when any of its docSourceFiles (which include resolved
 *    <dino-*> library templates under projects/material/) is in the git diff,
 *    so changes isolated to a shared library component still update every page
 *    that embeds it. --modules / --pages force specific pages regardless of diff.
 * 5. Call Claude API for each affected doc page (English)
 * 6. Translate each generated page into all configured languages
 */

import fs from 'fs';
import path from 'path';
import {execSync} from 'child_process';
import {fileURLToPath} from 'url';
import {scanRoutes, exportRouteMapForCypress} from './docs-route-scanner.mjs';
import {syncNav} from './docs-nav-sync.mjs';
import {sanitizeGenerated, stripBrokenImageRefs} from './docs-sanitize.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOC_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(DOC_ROOT, '..');

function absFromDocRoot(p) {
  return path.isAbsolute(p) ? p : path.join(DOC_ROOT, p);
}

// ---------------------------------------------------------------------------
// Screenshot descriptions (loaded early — used by buildPrompt)
// ---------------------------------------------------------------------------

/**
 * Build a lookup from screenshot name (e.g. 'forms/index-fab') to its description.
 * Sources: route map JSON which carries descriptions from TEMPLATE_PATTERNS and EXTRA_ROUTE_ENTRIES.
 */
const _screenshotDescriptions = (() => {
  const mapPath = absFromDocRoot('scripts/docs-route-map.json');
  if (!fs.existsSync(mapPath)) return {};
  const entries = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  const lookup = {};
  for (const entry of entries) {
    for (const s of entry.screenshots || []) {
      if (s.description) lookup[s.name] = s.description;
    }
  }
  return lookup;
})();

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const ANTHROPIC_AUTH_TOKEN = process.env.ANTHROPIC_AUTH_TOKEN;
if (!ANTHROPIC_AUTH_TOKEN) {
  console.error('ANTHROPIC_AUTH_TOKEN environment variable is required');
  process.exit(1);
}

const ANTHROPIC_BASE_URL = process.env.ANTHROPIC_BASE_URL || undefined;
const CLAUDE_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-6';
// Sized so a whole page fits in a single response. A translation costs
// noticeably more tokens than its English source — non-Latin scripts (uk, ar)
// worst of all — so a cap tuned to the English length truncates every large
// page. 16k stays well under the HTTP timeout for non-streaming requests.
const MAX_TOKENS = 16000;
// A single response can hit the MAX_TOKENS cap and stop mid-document. We resume
// via continuation turns; this bounds how many times, so a page that keeps
// truncating fails loudly instead of looping forever.
const MAX_CONTINUATIONS = 5;

/**
 * Single raw call to the Anthropic Messages API. Throws on a non-OK response.
 * Returns the parsed JSON so the caller can inspect `stop_reason`.
 */
async function anthropicRaw({system, messages}) {
  const baseUrl = ANTHROPIC_BASE_URL || 'https://api.anthropic.com';
  const url = `${baseUrl.replace(/\/$/, '')}/v1/messages`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': ANTHROPIC_AUTH_TOKEN,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: CLAUDE_MODEL,
      max_tokens: MAX_TOKENS,
      system,
      messages,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Anthropic API error (${res.status}): ${text || res.statusText}`);
  }

  return res.json();
}

/**
 * Call the model and return its full text output.
 *
 * Guards against silent truncation: if a response stops with
 * `stop_reason === 'max_tokens'`, the partial output is fed back as an assistant
 * prefill so the model resumes exactly where it left off (no repetition, no
 * preamble). Chunks are concatenated and sanitized once at the end, since a cap
 * can fall mid-line. Throws if the output is still truncated after
 * MAX_CONTINUATIONS attempts, so callers never write an incomplete page.
 */
async function anthropicMessage({system, user}) {
  const messages = [{role: 'user', content: user}];
  let full = '';

  for (let attempt = 0; ; attempt++) {
    const json = await anthropicRaw({system, messages});
    const parts = Array.isArray(json.content) ? json.content : [];
    full += parts.map(p => (p && p.type === 'text' ? p.text : '')).join('');

    if (json.stop_reason !== 'max_tokens') break;

    if (attempt >= MAX_CONTINUATIONS) {
      throw new Error(
        `Output still truncated after ${MAX_CONTINUATIONS} continuation(s) (stop_reason=max_tokens)`,
      );
    }

    // Hit the token cap. Resume via assistant prefill: resend the partial output
    // as the final assistant turn so the model continues that same turn. The API
    // rejects a prefill ending in whitespace, so trim it and keep our accumulator
    // in sync with what we actually sent.
    console.log('    stop_reason=max_tokens — requesting continuation...');
    full = full.replace(/\s+$/, '');
    messages.length = 1; // keep only the original user turn
    messages.push({role: 'assistant', content: full});
  }

  // The model is told not to wrap output in code fences, but sometimes does
  // (most often a ```yaml fence around the frontmatter, which breaks MkDocs).
  // Normalize it here so every generated/translated page is safe to write.
  return sanitizeGenerated(full);
}

/**
 * Languages to generate besides English (the default).
 * Each entry: { code, name, dir (text direction) }
 */
const LANGUAGES = [
  {code: 'it', name: 'Italian', dir: 'ltr'},
  {code: 'es', name: 'Spanish', dir: 'ltr'},
  {code: 'fr', name: 'French', dir: 'ltr'},
  {code: 'pt', name: 'Portuguese', dir: 'ltr'},
  {code: 'uk', name: 'Ukrainian', dir: 'ltr'},
  {code: 'ar', name: 'Arabic', dir: 'rtl'},
];

const SYSTEM_PROMPT = `You are a technical writer creating user-facing documentation for Dino, a web-based platform for structured data collection, monitoring, and analysis.

Rules:
- Write for end users, not developers. Never mention Angular, components, modules, or TypeScript.
- Use the term "Dino" for the application name.
- Use second person ("you") and present tense.
- Structure with clear headings (##, ###), numbered steps for procedures, and bullet lists for options.
- Use MkDocs Material admonitions for tips and warnings: !!! tip "Title" and !!! warning "Title"
- Include YAML frontmatter with title and description.
- Reference screenshots as ![Description](../imgs/{section}/{name}.png) — but only if the image path seems plausible. Do not invent screenshot references.
- Keep pages concise (300–600 words). Focus on what the user can do on this screen and how to do it.
- Use consistent terminology: "form schema" (not "form template"), "submission" (not "entry"), "schema" (not "template").
- When referencing other pages, use relative markdown links: [Link Text](filename.md). ONLY link to pages listed in the AVAILABLE PAGES section of the prompt — never invent filenames.
- Preserve any existing content structure when updating — keep section ordering and links that are still valid.`;

const TRANSLATION_SYSTEM_PROMPT = `You are a professional translator for software documentation. You translate user-facing documentation for Dino, a web-based data collection platform.

Rules:
- Translate ALL user-visible text naturally and fluently into the target language.
- Keep the YAML frontmatter keys in English (title, description) but translate their VALUES.
- Keep all Markdown formatting exactly as-is: headings, links, admonitions, lists, image references.
- Do NOT translate: file paths, URLs, image references (![...](path)), code snippets, the word "Dino".
- Keep admonition keywords in English (!!! tip, !!! warning, !!! note) but translate the admonition title text and body.
- Keep relative markdown link paths unchanged but translate the link display text.
- Same-page anchor links are the ONE exception to leaving link targets alone. An anchor like ](#user-area) points at a heading on this page, and the heading id is derived from the heading text — which you are translating — so the anchor must be translated in step with it, or the link breaks. Build it from the translated heading: lowercase it and replace each space with a hyphen, keeping the original letters (do not transliterate to ASCII). If "## User Area" becomes "## Area utente", then ](#user-area) becomes ](#area-utente). If the translated heading is identical to the English one, leave the anchor as it is. This applies ONLY to targets starting with "#" — file paths in link targets stay untouched.
- Terminology glossary (translate these terms consistently, including in headings, titles and frontmatter values):
  - Italian: always translate "location" / "locations" as "posizione" / "posizioni" — never "sede" / "sedi".
- Output ONLY the translated Markdown content, no code fences or explanations.
- The translation must read naturally — do not produce word-by-word literal translations.`;

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const forceFullScan = args.includes('--full');
const skipTranslations = args.includes('--no-translate');
const onlyTranslate = args.includes('--translate-only');

/**
 * Parse a comma-separated list flag, e.g. `--modules=mat-forms,mat-reports`.
 * Returns [] when the flag is absent.
 */
function parseListFlag(name) {
  const prefix = `--${name}=`;
  const arg = args.find(a => a.startsWith(prefix));
  if (!arg) return [];
  return arg.slice(prefix.length).split(',').map(s => s.trim()).filter(Boolean);
}

// Manual overrides: force regeneration of specific modules (dinoapp module dir,
// e.g. mat-forms) or pages (route key, e.g. forms/index) regardless of git diff.
const manualModules = parseListFlag('modules');
const manualPages = parseListFlag('pages');

// ---------------------------------------------------------------------------
// Step 1: Detect changed files
// ---------------------------------------------------------------------------

let changedFiles = [];

if (forceFullScan || onlyTranslate) {
  console.log(
    onlyTranslate
      ? '--translate-only flag: will translate existing English docs.'
      : '--full flag: forcing full regeneration of all pages.',
  );
  changedFiles = ['main.routing.module.ts']; // triggers routing-changed path
} else {
  try {
    changedFiles = execSync('git diff --name-only HEAD~1 HEAD', {encoding: 'utf8'})
      .split('\n')
      .filter(Boolean);
  } catch {
    console.log('Could not determine git diff (first commit or shallow clone). Running full scan.');
    changedFiles = ['main.routing.module.ts'];
  }
}

console.log(`Changed files: ${changedFiles.length}`);

// ---------------------------------------------------------------------------
// Step 2: Classify changes
// ---------------------------------------------------------------------------

const routingChanged = changedFiles.some(
  f => f.includes('-routing.module.ts') || f.includes('main.routing.module.ts'),
);

const changedModuleDirs = [
  ...new Set(
    changedFiles
      .filter(f => f.match(/projects\/dinoapp\/src\/app\/([^/]+)\//))
      .map(f => f.match(/projects\/dinoapp\/src\/app\/([^/]+)\//)[1]),
  ),
];

console.log(`Routing changed: ${routingChanged}`);
console.log(`Changed module dirs: ${changedModuleDirs.join(', ') || '(none)'}`);

// ---------------------------------------------------------------------------
// Step 3: Scan routes and sync nav if needed
// ---------------------------------------------------------------------------

const routeMap = scanRoutes();
console.log(`Route map: ${Object.keys(routeMap).length} entries`);

// Always check for missing doc files — if a route exists but its .md doesn't, it needs generation
const missingDocs = Object.values(routeMap).filter(r => !fs.existsSync(absFromDocRoot(r.docFile)));
if (missingDocs.length) {
  console.log(`Found ${missingDocs.length} routes with missing doc files — will generate them.`);
}

if (routingChanged && !onlyTranslate) {
  console.log('Routing changed — running full nav sync...');
  const {added, removed} = syncNav(routeMap);

  if (removed.length) {
    console.log(`Removing ${removed.length} orphaned doc files...`);
    for (const relPath of removed) {
      const fullPath = absFromDocRoot(path.join('docs', 'en', relPath));
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath);
        console.log(`  Deleted: ${fullPath}`);
      }
      // Also remove translations
      for (const lang of LANGUAGES) {
        const langPath = absFromDocRoot(path.join('docs', lang.code, relPath));
        if (fs.existsSync(langPath)) {
          fs.rmSync(langPath);
          console.log(`  Deleted: ${langPath}`);
        }
      }
    }
  }

  // Also re-export the Cypress route map
  exportRouteMapForCypress(routeMap);
}

// ---------------------------------------------------------------------------
// Step 4: Determine which modules to regenerate
// ---------------------------------------------------------------------------

// Changed files as absolute paths, for reverse-lookup against each route's
// docSourceFiles. This catches changes to <dino-*> library templates under
// projects/material/ that the dinoapp-only changedModuleDirs regex misses.
const changedAbs = new Set(changedFiles.map(f => path.resolve(REPO_ROOT, f)));

// Validate manual overrides against the route map and warn on unknown values.
if (manualModules.length) {
  const knownModules = new Set(Object.values(routeMap).flatMap(r => r.moduleDirs));
  for (const m of manualModules) {
    if (!knownModules.has(m)) console.warn(`  WARN: --modules "${m}" matches no route in the map`);
  }
  console.log(`Manual modules: ${manualModules.join(', ')}`);
}
if (manualPages.length) {
  for (const p of manualPages) {
    if (!routeMap[p]) console.warn(`  WARN: --pages "${p}" matches no route key in the map`);
  }
  console.log(`Manual pages: ${manualPages.join(', ')}`);
}

/**
 * Decide whether a route needs targeted regeneration. Combines:
 *  - manual overrides (--modules / --pages)
 *  - changed dinoapp module dirs (git diff, regex-based)
 *  - reverse-lookup: any of the route's docSourceFiles is in the git diff
 *    (covers shared library templates under projects/material/)
 */
function routeChanged(key, r) {
  if (manualModules.length && r.moduleDirs.some(d => manualModules.includes(d))) return true;
  if (manualPages.includes(key)) return true;
  if (r.moduleDirs.some(dir => changedModuleDirs.includes(dir))) return true;
  return (r.docSourceFiles || []).some(src => changedAbs.has(path.resolve(src)));
}

let modulesToProcess;

if (routingChanged) {
  // Full regeneration on routing changes
  modulesToProcess = Object.values(routeMap);
  console.log(`Full regeneration: ${modulesToProcess.length} pages`);
} else {
  const changedRoutes = Object.entries(routeMap)
    .filter(([key, r]) => routeChanged(key, r))
    .map(([, r]) => r);

  if (changedRoutes.length || missingDocs.length) {
    // Merge changed + missing, deduplicate by docFile
    const seen = new Set();
    modulesToProcess = [...changedRoutes, ...missingDocs].filter(r => {
      if (seen.has(r.docFile)) return false;
      seen.add(r.docFile);
      return true;
    });
    if (changedRoutes.length) console.log(`Changed routes: ${changedRoutes.length} pages`);
    if (missingDocs.length) console.log(`Missing doc files: ${missingDocs.length} pages`);
    console.log(`Total to regenerate: ${modulesToProcess.length} pages`);
  } else {
    console.log('No relevant source changes detected. Nothing to regenerate.');
    modulesToProcess = [];
  }
}

// ---------------------------------------------------------------------------
// Step 5: Call Claude API for each affected page
// ---------------------------------------------------------------------------

if (modulesToProcess.length > 0) {
  for (const route of modulesToProcess) {
    // ----- English generation -----
    let englishContent;

    if (onlyTranslate) {
      // Read existing English doc
      const docPath = absFromDocRoot(route.docFile);
      if (fs.existsSync(docPath)) {
        englishContent = fs.readFileSync(docPath, 'utf8');
        console.log(`\nRead existing: ${route.docFile}`);
      } else {
        console.log(`\nSkipping ${route.docFile} — no English doc exists yet`);
        continue;
      }
    } else {
      console.log(`\nGenerating (en): ${route.docFile}`);

      // Read all source files for this page. Prefer docSourceFiles (recursive +
      // resolved <dino-*> library templates) so the AI sees the actual UI markup;
      // fall back to componentFiles for older route maps.
      const sources = (route.docSourceFiles || route.componentFiles)
        .filter(f => fs.existsSync(f))
        .map(f => ({
          name: path.basename(f),
          content: fs.readFileSync(f, 'utf8'),
        }));

      if (sources.length === 0) {
        console.log(`  Skipping — no source files found for ${route.moduleDir}`);
        continue;
      }

      // Read existing doc content (if any) for context
      const docPath = absFromDocRoot(route.docFile);
      const existingDoc = fs.existsSync(docPath) ? fs.readFileSync(docPath, 'utf8') : '';

      const userPrompt = buildPrompt(route, sources, existingDoc, routeMap);

      try {
        englishContent = await anthropicMessage({system: SYSTEM_PROMPT, user: userPrompt});
        // Strip invented image refs before writing AND before translating, so
        // translations inherit the cleaned source.
        englishContent = dropBrokenImages(englishContent, docPath);

        // Write the English doc
        fs.mkdirSync(path.dirname(docPath), {recursive: true});
        fs.writeFileSync(docPath, englishContent);
        console.log(`  Written: ${route.docFile} (${englishContent.length} chars)`);
      } catch (err) {
        console.error(`  Error generating ${route.docFile}: ${err.message}`);
        continue;
      }

      await sleep(500);
    }

    // ----- Translations -----
    if (!skipTranslations && englishContent && englishContent.trim()) {
      for (const lang of LANGUAGES) {
        const langDocFile = route.docFile.replace(/^docs\/en\//, `docs/${lang.code}/`);
        const langDocPath = absFromDocRoot(langDocFile);

        // Check if translation already exists and English hasn't changed
        if (!forceFullScan && !onlyTranslate && fs.existsSync(langDocPath)) {
          // Skip if we're in targeted mode and translation exists
          console.log(`  Skipping ${lang.code} — translation exists (use --full to regenerate)`);
          continue;
        }

        console.log(`  Translating to ${lang.name} (${lang.code})...`);

        const translationPrompt = `Translate the following English documentation page into ${lang.name}.

Keep all image references (![...](../imgs/...)) exactly as-is — they are shared across all languages and the paths are already correct.

--- ENGLISH SOURCE ---
${englishContent}`;

        try {
          let translatedContent = await anthropicMessage({
            system: TRANSLATION_SYSTEM_PROMPT,
            user: translationPrompt,
          });
          translatedContent = dropBrokenImages(translatedContent, langDocPath);
          fs.mkdirSync(path.dirname(langDocPath), {recursive: true});
          fs.writeFileSync(langDocPath, translatedContent);
          console.log(`  Written: ${langDocFile} (${translatedContent.length} chars)`);
        } catch (err) {
          console.error(`  Error translating ${langDocFile}: ${err.message}`);
        }

        await sleep(500);
      }
    }
  }
}

// ---------------------------------------------------------------------------
// Step 6: Generate + translate the index page (docs/en/index.md)
// ---------------------------------------------------------------------------
// The index page is NOT part of the route map — it's a standalone welcome /
// table-of-contents page.  We generate it from the route map so it always has
// correct links and automatically updates when routes change.

const INDEX_DOC_FILE = 'docs/en/index.md';

{
  let englishContent;

  if (onlyTranslate) {
    const indexDocPath = absFromDocRoot(INDEX_DOC_FILE);
    if (fs.existsSync(indexDocPath)) {
      englishContent = fs.readFileSync(indexDocPath, 'utf8');
      console.log(`\nRead existing index: ${INDEX_DOC_FILE}`);
    }
  } else {
    console.log(`\nGenerating index page: ${INDEX_DOC_FILE}`);

    // Build the available pages list (relative to docs/en/)
    const indexDir = path.dirname(INDEX_DOC_FILE); // docs/en
    const availablePages = Object.entries(routeMap).map(([key, r]) => {
      const relLink = path.relative(indexDir, r.docFile);
      return `- ${r.title} (${r.section}): ${relLink}`;
    });

    // Group pages by section for the prompt
    const sections = {};
    for (const [key, r] of Object.entries(routeMap)) {
      if (!sections[r.section]) sections[r.section] = [];
      const relLink = path.relative(indexDir, r.docFile);
      sections[r.section].push({title: r.title, link: relLink});
    }

    const sectionSummary = Object.entries(sections)
      .map(([section, pages]) => {
        const links = pages.map(p => `  - [${p.title}](${p.link})`).join('\n');
        return `### ${section.charAt(0).toUpperCase() + section.slice(1)}\n${links}`;
      })
      .join('\n\n');

    const indexDocPath = absFromDocRoot(INDEX_DOC_FILE);
    const existingDoc = fs.existsSync(indexDocPath) ? fs.readFileSync(indexDocPath, 'utf8') : '';

    const indexPrompt = `Generate the welcome / index page for the Dino documentation site.

This is the landing page users see first. It should:
- Welcome the user and briefly explain what Dino is (a web-based platform for structured data collection, monitoring, and analysis).
- Provide a structured overview of what users can do, organized by topic (not by section name).
- Link to the most important pages so users can navigate to what they need.

AVAILABLE PAGES (grouped by section):
${sectionSummary}

IMPORTANT: You MUST only link to pages from the list above. NEVER invent page filenames.
Use the exact relative paths shown above for all links.

${
  existingDoc
    ? `--- EXISTING DOCUMENTATION (update this, preserving tone and structure where appropriate) ---\n${existingDoc}\n`
    : ''
}
Instructions:
- Produce a complete Markdown document with YAML frontmatter (title, description).
- Keep it concise — this is a navigation page, not a tutorial.
- Use clear headings to organize by topic.
- Output ONLY the Markdown content, no code fences or explanations.`;

    try {
      englishContent = await anthropicMessage({system: SYSTEM_PROMPT, user: indexPrompt});
      englishContent = dropBrokenImages(englishContent, indexDocPath);
      fs.mkdirSync(path.dirname(indexDocPath), {recursive: true});
      fs.writeFileSync(indexDocPath, englishContent);
      console.log(`  Written: ${INDEX_DOC_FILE} (${englishContent.length} chars)`);
    } catch (err) {
      console.error(`  Error generating index page: ${err.message}`);
    }

    await sleep(500);
  }

  // Translate the index page
  if (!skipTranslations && englishContent && englishContent.trim()) {
    for (const lang of LANGUAGES) {
      const langDocFile = INDEX_DOC_FILE.replace(/^docs\/en\//, `docs/${lang.code}/`);
      const langDocPath = absFromDocRoot(langDocFile);

      if (!forceFullScan && !onlyTranslate && fs.existsSync(langDocPath)) {
        console.log(`  Skipping ${lang.code} — translation exists (use --full to regenerate)`);
        continue;
      }

      console.log(`  Translating index to ${lang.name} (${lang.code})...`);

      const translationPrompt = `Translate the following English documentation page into ${lang.name}.

Keep all image references exactly as-is — they are shared across all languages and the paths are already correct.
For cross-page links, keep the same relative filenames (e.g. getting-started/login.md stays the same).

--- ENGLISH SOURCE ---
${englishContent}`;

      try {
        let translatedContent = await anthropicMessage({
          system: TRANSLATION_SYSTEM_PROMPT,
          user: translationPrompt,
        });
        translatedContent = dropBrokenImages(translatedContent, langDocPath);
        fs.mkdirSync(path.dirname(langDocPath), {recursive: true});
        fs.writeFileSync(langDocPath, translatedContent);
        console.log(`  Written: ${langDocFile} (${translatedContent.length} chars)`);
      } catch (err) {
        console.error(`  Error translating ${langDocFile}: ${err.message}`);
      }

      await sleep(500);
    }
  }
}

console.log('\nDocs generation complete.');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findScreenshots(route) {
  const imgsDir = absFromDocRoot(path.join('docs', 'imgs', route.section));
  if (!fs.existsSync(imgsDir)) return [];

  const slug = path.basename(route.docFile, '.md');
  return fs
    .readdirSync(imgsDir)
    .filter(f => f.startsWith(slug) && /\.(png|jpg|jpeg|webp)$/i.test(f))
    .map(f => {
      // Relative path within MkDocs docs_dir context (docs/en/ is the root)
      const docsDir = 'docs/en';
      const docRelDir = path.dirname(path.relative(docsDir, route.docFile));
      const imgRelPath = path.join('imgs', route.section, f);
      const relPath = path.relative(docRelDir, imgRelPath);
      // Look up description from route map (e.g. 'forms/index-fab' → 'Floating action button dialog')
      const screenshotName = `${route.section}/${f.replace(/\.(png|jpg|jpeg|webp)$/i, '')}`;
      const description = _screenshotDescriptions[screenshotName] || route.title;
      return {filename: f, markdownRef: relPath, description};
    });
}

function buildPrompt(route, sources, existingDoc, routeMap) {
  const screenshots = findScreenshots(route);

  // Build the list of all pages in the documentation, with relative links
  // from the current page's directory.
  const currentDocDir = path.dirname(route.docFile); // e.g. docs/en/forms
  const availablePages = Object.entries(routeMap).map(([key, r]) => {
    const relLink = path.relative(currentDocDir, r.docFile);
    return `- ${r.title}: ${relLink}`;
  });

  let prompt = `Generate a user-facing documentation page for the "${route.title}" feature in Dino.

URL in the application: ${route.url}
Documentation section: ${route.section}
Documentation file: ${route.docFile}

Source files for this feature:
`;

  for (const src of sources) {
    prompt += `\n--- ${src.name} ---\n${src.content}\n`;
  }

  prompt += `\n--- AVAILABLE PAGES ---\nThese are ALL the pages that exist in the documentation. When linking to other pages, you MUST only use paths from this list. NEVER invent page filenames.\n\n${availablePages.join(
    '\n',
  )}\n`;

  if (screenshots.length > 0) {
    prompt += `\n--- AVAILABLE SCREENSHOTS ---\n`;
    prompt += `The following screenshots are available for this page. These are the ONLY screenshot files that exist — do NOT reference any other image. You MUST include the ones below using the exact markdown references provided. Each screenshot has a description of what it shows — use this to place it in the right context.\n\n`;
    for (const img of screenshots) {
      prompt += `- ![${img.description}](${img.markdownRef}) — ${img.description}\n`;
    }
    prompt += `\nPlace each screenshot where it best illustrates the content. The main view screenshot should go after the introductory paragraph. Interactive screenshots (dialogs, expanded panels, etc.) should go after describing the relevant action or feature.\n`;
  }

  if (existingDoc && existingDoc.trim()) {
    prompt += `\n--- EXISTING DOCUMENTATION (update this, preserving structure where appropriate) ---\n${existingDoc}\n`;
  }

  prompt += `
Instructions:
- Produce a complete Markdown document with YAML frontmatter (title, description).
- Describe what the user sees on this screen and the actions available.
- Write numbered steps for key workflows.
- Use admonitions (!!! tip, !!! warning) for important notes.${
    screenshots.length > 0
      ? '\n- Include ALL available screenshots listed above using the exact markdown references provided.' +
        '\n- Do NOT reference any other screenshot. The AVAILABLE SCREENSHOTS list is exhaustive: never invent additional image files (e.g. "-fab", "-dialog", "-toggle", "-list" variants) — they do not exist and would render as broken links.'
      : '\n- Do NOT include or invent any screenshot references — no screenshot files exist for this page.'
  }
- When linking to other pages, ONLY use paths from the AVAILABLE PAGES list above. Do not guess or invent filenames.
- Output ONLY the Markdown content, no code fences or explanations.`;

  return prompt;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Strip image references that point to files which don't exist on disk
 * (resolved relative to the target page), logging what was removed. Guards
 * against the model inventing screenshot/icon paths that would render broken.
 */
function dropBrokenImages(content, targetPath) {
  const {content: clean, removed} = stripBrokenImageRefs(content, path.dirname(targetPath));
  if (removed.length) {
    console.log(
      `  Removed ${removed.length} broken image ref(s): ${[...new Set(removed)].join(', ')}`,
    );
  }
  return clean;
}
