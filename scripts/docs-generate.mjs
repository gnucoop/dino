#!/usr/bin/env node

/**
 * docs-generate.mjs
 *
 * Main orchestrator for automated documentation generation.
 *
 * Workflow:
 * 1. Detect changed files via git diff
 * 2. Classify changes (routing vs component)
 * 3. If routing changed → full re-scan → sync mkdocs.yml nav → create/delete .md files
 * 4. If only components changed → targeted re-generation of affected modules
 * 5. Call Claude API for each affected doc page (English)
 * 6. Translate each generated page into all configured languages
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { scanRoutes, exportRouteMapForCypress } from './docs-route-scanner.mjs';
import { syncNav } from './docs-nav-sync.mjs';

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
const MAX_TOKENS = 4096;

/**
 * Languages to generate besides English (the default).
 * Each entry: { code, name, dir (text direction) }
 */
const LANGUAGES = [
  { code: 'it', name: 'Italian',    dir: 'ltr' },
  { code: 'es', name: 'Spanish',    dir: 'ltr' },
  { code: 'fr', name: 'French',     dir: 'ltr' },
  { code: 'pt', name: 'Portuguese', dir: 'ltr' },
  { code: 'uk', name: 'Ukrainian',  dir: 'ltr' },
  { code: 'ar', name: 'Arabic',     dir: 'rtl' },
];

const SYSTEM_PROMPT = `You are a technical writer creating user-facing documentation for Dino, a web-based platform for structured data collection, monitoring, and analysis.

Rules:
- Write for end users, not developers. Never mention Angular, components, modules, or TypeScript.
- Use the term "Dino" for the application name.
- Use second person ("you") and present tense.
- Structure with clear headings (##, ###), numbered steps for procedures, and bullet lists for options.
- Use MkDocs Material admonitions for tips and warnings: !!! tip "Title" and !!! warning "Title"
- Include YAML frontmatter with title and description.
- Reference screenshots as ![Description](../../imgs/{section}/{name}.png) — but only if the image path seems plausible. Do not invent screenshot references.
- Keep pages concise (300–600 words). Focus on what the user can do on this screen and how to do it.
- Use consistent terminology: "form schema" (not "form template"), "submission" (not "entry"), "schema" (not "template").
- When referencing other pages, use relative markdown links: [Link Text](filename.md).
- Preserve any existing content structure when updating — keep section ordering and links that are still valid.`;

const TRANSLATION_SYSTEM_PROMPT = `You are a professional translator for software documentation. You translate user-facing documentation for Dino, a web-based data collection platform.

Rules:
- Translate ALL user-visible text naturally and fluently into the target language.
- Keep the YAML frontmatter keys in English (title, description) but translate their VALUES.
- Keep all Markdown formatting exactly as-is: headings, links, admonitions, lists, image references.
- Do NOT translate: file paths, URLs, image references (![...](path)), code snippets, the word "Dino".
- Keep admonition keywords in English (!!! tip, !!! warning, !!! note) but translate the admonition title text and body.
- Keep relative markdown link paths unchanged but translate the link display text.
- Output ONLY the translated Markdown content, no code fences or explanations.
- The translation must read naturally — do not produce word-by-word literal translations.`;

// ---------------------------------------------------------------------------
// CLI flags
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const forceFullScan = args.includes('--full');
const skipTranslations = args.includes('--no-translate');
const onlyTranslate = args.includes('--translate-only');

// ---------------------------------------------------------------------------
// Step 1: Detect changed files
// ---------------------------------------------------------------------------

let changedFiles = [];

if (forceFullScan || onlyTranslate) {
  console.log(onlyTranslate
    ? '--translate-only flag: will translate existing English docs.'
    : '--full flag: forcing full regeneration of all pages.');
  changedFiles = ['main.routing.module.ts']; // triggers routing-changed path
} else {
  try {
    changedFiles = execSync('git diff --name-only HEAD~1 HEAD', { encoding: 'utf8' })
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
      .filter(f => f.match(/projects\/e2e-app\/src\/(mat-[^/]+)\//))
      .map(f => f.match(/projects\/e2e-app\/src\/(mat-[^/]+)\//)[1]),
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
const missingDocs = Object.values(routeMap).filter(r => !fs.existsSync(r.docFile));
if (missingDocs.length) {
  console.log(`Found ${missingDocs.length} routes with missing doc files — will generate them.`);
}

if (routingChanged && !onlyTranslate) {
  console.log('Routing changed — running full nav sync...');
  const { added, removed } = syncNav(routeMap);

  if (removed.length) {
    console.log(`Removing ${removed.length} orphaned doc files...`);
    for (const relPath of removed) {
      const fullPath = path.join('docs', 'en', relPath);
      if (fs.existsSync(fullPath)) {
        fs.rmSync(fullPath);
        console.log(`  Deleted: ${fullPath}`);
      }
      // Also remove translations
      for (const lang of LANGUAGES) {
        const langPath = path.join('docs', lang.code, relPath);
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

let modulesToProcess;

if (routingChanged) {
  // Full regeneration on routing changes
  modulesToProcess = Object.values(routeMap);
  console.log(`Full regeneration: ${modulesToProcess.length} pages`);
} else if (changedModuleDirs.length > 0 || missingDocs.length > 0) {
  // Targeted regeneration: changed modules + any routes with missing doc files
  const changedRoutes = Object.values(routeMap).filter(r =>
    r.moduleDirs.some(dir => changedModuleDirs.includes(dir)),
  );
  // Merge changed + missing, deduplicate by docFile
  const seen = new Set();
  modulesToProcess = [...changedRoutes, ...missingDocs].filter(r => {
    if (seen.has(r.docFile)) return false;
    seen.add(r.docFile);
    return true;
  });
  if (changedRoutes.length) console.log(`Changed modules: ${changedRoutes.length} pages`);
  if (missingDocs.length) console.log(`Missing doc files: ${missingDocs.length} pages`);
  console.log(`Total to regenerate: ${modulesToProcess.length} pages`);
} else {
  console.log('No relevant source changes detected. Nothing to regenerate.');
  modulesToProcess = [];
}

// ---------------------------------------------------------------------------
// Step 5: Call Claude API for each affected page
// ---------------------------------------------------------------------------

if (modulesToProcess.length > 0) {
  // Dynamic import of the Anthropic SDK
  let Anthropic;
  try {
    ({ default: Anthropic } = await import('@anthropic-ai/sdk'));
  } catch {
    console.error(
      'Could not import @anthropic-ai/sdk. Install it with: yarn add -D @anthropic-ai/sdk',
    );
    process.exit(1);
  }

  const client = new Anthropic({
    authToken: ANTHROPIC_AUTH_TOKEN,
    ...(ANTHROPIC_BASE_URL && { baseURL: ANTHROPIC_BASE_URL }),
  });

  for (const route of modulesToProcess) {
    // ----- English generation -----
    let englishContent;

    if (onlyTranslate) {
      // Read existing English doc
      if (fs.existsSync(route.docFile)) {
        englishContent = fs.readFileSync(route.docFile, 'utf8');
        console.log(`\nRead existing: ${route.docFile}`);
      } else {
        console.log(`\nSkipping ${route.docFile} — no English doc exists yet`);
        continue;
      }
    } else {
      console.log(`\nGenerating (en): ${route.docFile}`);

      // Read all component source files
      const sources = route.componentFiles
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
      const existingDoc = fs.existsSync(route.docFile)
        ? fs.readFileSync(route.docFile, 'utf8')
        : '';

      const userPrompt = buildPrompt(route, sources, existingDoc);

      try {
        const response = await client.messages.create({
          model: CLAUDE_MODEL,
          max_tokens: MAX_TOKENS,
          system: SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userPrompt }],
        });

        englishContent = response.content[0].text;

        // Write the English doc
        fs.mkdirSync(path.dirname(route.docFile), { recursive: true });
        fs.writeFileSync(route.docFile, englishContent);
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

        // Check if translation already exists and English hasn't changed
        if (!forceFullScan && !onlyTranslate && fs.existsSync(langDocFile)) {
          // Skip if we're in targeted mode and translation exists
          console.log(`  Skipping ${lang.code} — translation exists (use --full to regenerate)`);
          continue;
        }

        console.log(`  Translating to ${lang.name} (${lang.code})...`);

        const translationPrompt = `Translate the following English documentation page into ${lang.name}.

Keep all image references (![...](../../imgs/...)) exactly as-is — they are shared across all languages and the paths are already correct.

--- ENGLISH SOURCE ---
${englishContent}`;

        try {
          const response = await client.messages.create({
            model: CLAUDE_MODEL,
            max_tokens: MAX_TOKENS,
            system: TRANSLATION_SYSTEM_PROMPT,
            messages: [{ role: 'user', content: translationPrompt }],
          });

          const translatedContent = response.content[0].text;
          fs.mkdirSync(path.dirname(langDocFile), { recursive: true });
          fs.writeFileSync(langDocFile, translatedContent);
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
// Step 6: Translate standalone pages (index.md, interface/index.md, etc.)
// ---------------------------------------------------------------------------

const STANDALONE_PAGES = [
  'docs/en/index.md',
  'docs/en/interface/index.md',
];

if (!skipTranslations) {
  let client;
  if (!modulesToProcess.length) {
    // SDK not loaded yet — load it now
    try {
      const { default: Anthropic } = await import('@anthropic-ai/sdk');
      client = new Anthropic({
        authToken: ANTHROPIC_AUTH_TOKEN,
        ...(ANTHROPIC_BASE_URL && { baseURL: ANTHROPIC_BASE_URL }),
      });
    } catch {
      console.error('Could not import @anthropic-ai/sdk for standalone translations.');
    }
  } else {
    // Reuse client from step 5 — need to reconstruct since it was scoped
    const { default: Anthropic } = await import('@anthropic-ai/sdk');
    client = new Anthropic({
      authToken: ANTHROPIC_AUTH_TOKEN,
      ...(ANTHROPIC_BASE_URL && { baseURL: ANTHROPIC_BASE_URL }),
    });
  }

  if (client) {
    for (const docFile of STANDALONE_PAGES) {
      if (!fs.existsSync(docFile)) {
        console.log(`\nStandalone page not found: ${docFile} — skipping`);
        continue;
      }

      const englishContent = fs.readFileSync(docFile, 'utf8');
      if (!englishContent.trim()) continue;

      console.log(`\nTranslating standalone page: ${docFile}`);

      for (const lang of LANGUAGES) {
        const langDocFile = docFile.replace(/^docs\/en\//, `docs/${lang.code}/`);

        if (!forceFullScan && !onlyTranslate && fs.existsSync(langDocFile)) {
          console.log(`  Skipping ${lang.code} — translation exists (use --full to regenerate)`);
          continue;
        }

        console.log(`  Translating to ${lang.name} (${lang.code})...`);

        const translationPrompt = `Translate the following English documentation page into ${lang.name}.

Keep all image references exactly as-is — they are shared across all languages and the paths are already correct.
For cross-page links, keep the same relative filenames (e.g. getting-started/login.md stays the same).

--- ENGLISH SOURCE ---
${englishContent}`;

        try {
          const response = await client.messages.create({
            model: CLAUDE_MODEL,
            max_tokens: MAX_TOKENS,
            system: TRANSLATION_SYSTEM_PROMPT,
            messages: [{ role: 'user', content: translationPrompt }],
          });

          const translatedContent = response.content[0].text;
          fs.mkdirSync(path.dirname(langDocFile), { recursive: true });
          fs.writeFileSync(langDocFile, translatedContent);
          console.log(`  Written: ${langDocFile} (${translatedContent.length} chars)`);
        } catch (err) {
          console.error(`  Error translating ${langDocFile}: ${err.message}`);
        }

        await sleep(500);
      }
    }
  }
}

console.log('\nDocs generation complete.');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function findScreenshots(route) {
  const imgsDir = path.join('docs', 'imgs', route.section);
  if (!fs.existsSync(imgsDir)) return [];

  const slug = path.basename(route.docFile, '.md');
  return fs.readdirSync(imgsDir)
    .filter(f => f.startsWith(slug) && /\.(png|jpg|jpeg|webp)$/i.test(f))
    .map(f => {
      // Relative path from the doc file to the image
      const relPath = path.relative(path.dirname(route.docFile), path.join('docs', 'imgs', route.section, f));
      return { filename: f, markdownRef: relPath };
    });
}

function buildPrompt(route, sources, existingDoc) {
  const screenshots = findScreenshots(route);

  let prompt = `Generate a user-facing documentation page for the "${route.title}" feature in Dino.

URL in the application: ${route.url}
Documentation section: ${route.section}
Documentation file: ${route.docFile}

Source files for this feature:
`;

  for (const src of sources) {
    prompt += `\n--- ${src.name} ---\n${src.content}\n`;
  }

  if (screenshots.length > 0) {
    prompt += `\n--- AVAILABLE SCREENSHOTS ---\n`;
    prompt += `The following screenshots are available for this page. You MUST include them in the documentation using the exact markdown references provided.\n\n`;
    for (const img of screenshots) {
      prompt += `- ![${route.title}](${img.markdownRef})\n`;
    }
    prompt += `\nPlace each screenshot where it best illustrates the content — typically after the introductory paragraph or after describing what the user sees on the screen.\n`;
  }

  if (existingDoc && existingDoc.trim()) {
    prompt += `\n--- EXISTING DOCUMENTATION (update this, preserving structure where appropriate) ---\n${existingDoc}\n`;
  }

  prompt += `
Instructions:
- Produce a complete Markdown document with YAML frontmatter (title, description).
- Describe what the user sees on this screen and the actions available.
- Write numbered steps for key workflows.
- Use admonitions (!!! tip, !!! warning) for important notes.${screenshots.length > 0 ? '\n- Include ALL available screenshots listed above using the exact markdown references provided.' : '\n- Do not invent screenshot references.'}
- Output ONLY the Markdown content, no code fences or explanations.`;

  return prompt;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
