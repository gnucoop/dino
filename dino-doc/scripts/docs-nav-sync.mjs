#!/usr/bin/env node

/**
 * docs-nav-sync.mjs
 *
 * Keeps the `nav` section of mkdocs.yml in sync with the route map produced
 * by docs-route-scanner.mjs.
 *
 * - Adds nav entries for new doc pages
 * - Removes nav entries for deleted doc pages
 * - Preserves section ordering and manual entries (e.g. index.md)
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DOC_ROOT = path.resolve(__dirname, '..');

function absFromDocRoot(p) {
  return path.isAbsolute(p) ? p : path.join(DOC_ROOT, p);
}

/**
 * Preferred section order in mkdocs.yml nav.
 * Sections not listed here are appended at the end.
 */
const SECTION_ORDER = [
  'Home',
  'Getting Started',
  'Interface & Navigation',
  'Dashboard',
  'Forms',
  'Reports',
  'Metrics',
  'Aggregation',
  'Notifications',
  'DinoGPT',
  'Public Forms',
  'Administration',
];

/**
 * Map from internal section names (used in routeMap keys) to nav display names.
 */
const SECTION_DISPLAY = {
  'interface':        'Interface & Navigation',
  'getting-started':  'Getting Started',
  'dashboard':        'Dashboard',
  'forms':            'Forms',
  'reports':          'Reports',
  'aggregation':      'Aggregation',
  'metrics':          'Metrics',
  'gpt':              'DinoGPT',
  'notifications':    'Notifications',
  'public-forms':     'Public Forms',
  'administration':   'Administration',
};

/**
 * Preferred sub-item order within sections.
 * Follows user workflow: overview → setup/schemas → create/use → review → advanced.
 * Entries not listed here are appended alphabetically at the end of their section.
 */
const ENTRY_ORDER = {
  'Forms': [
    'forms/index.md',
    'forms/edit-form-schema.md',
    'forms/edit-form.md',
    'forms/forms-list.md',
    'forms/forms-map.md',
    'forms/datachat.md',
  ],
  'Reports': [
    'reports/index.md',
    'reports/edit-report-schema.md',
    'reports/edit-report.md',
    'reports/reports-list.md',
  ],
  'Metrics': [
    'metrics/index.md',
    'metrics/areas.md',
  ],
  'Getting Started': [
    'getting-started/login.md',
    'getting-started/reset-password.md',
  ],
  'Administration': [
    'administration/users.md',
    'administration/languages.md',
  ],
};

/**
 * Parse mkdocs.yml manually (simple YAML subset — avoids adding a YAML library dependency).
 * Returns the full file content as a string for manipulation.
 */
const MKDOCS_EN = absFromDocRoot('config/en/mkdocs.yml');

const LANGUAGE_CONFIGS = [
  absFromDocRoot('config/it/mkdocs.yml'),
  absFromDocRoot('config/es/mkdocs.yml'),
  absFromDocRoot('config/fr/mkdocs.yml'),
  absFromDocRoot('config/pt/mkdocs.yml'),
  absFromDocRoot('config/uk/mkdocs.yml'),
  absFromDocRoot('config/ar/mkdocs.yml'),
];

function readMkdocsYml() {
  return fs.readFileSync(MKDOCS_EN, 'utf8');
}

/**
 * Extract all doc file paths currently referenced in the nav section.
 */
function extractNavPaths(content) {
  const paths = new Set();
  const re = /:\s+([^\s#]+\.md)/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    paths.add(match[1]);
  }
  return paths;
}

/**
 * Build a complete nav structure from the route map.
 */
function buildNavFromRouteMap(routeMap) {
  const sections = {};

  for (const [key, route] of Object.entries(routeMap)) {
    const sectionName = SECTION_DISPLAY[route.section]
      || route.section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    if (!sections[sectionName]) {
      sections[sectionName] = [];
    }

    const relPath = route.docFile.replace(/^docs\/en\//, '');
    sections[sectionName].push({
      title: route.title,
      path: relPath,
    });
  }

  return sections;
}

/**
 * Synchronise mkdocs.yml nav with the route map.
 * Returns { added: string[], removed: string[] } describing changes.
 */
export function syncNav(routeMap) {
  const content = readMkdocsYml();
  const currentPaths = extractNavPaths(content);
  const expectedSections = buildNavFromRouteMap(routeMap);

  // Collect all expected paths
  const expectedPaths = new Set();
  expectedPaths.add('index.md'); // always keep home
  for (const entries of Object.values(expectedSections)) {
    for (const entry of entries) {
      expectedPaths.add(entry.path);
    }
  }

  const added = [];
  const removed = [];

  // Find paths that should exist but are missing from nav
  for (const p of expectedPaths) {
    if (!currentPaths.has(p)) {
      added.push(p);
    }
  }

  // Find paths in nav that no longer have a corresponding route
  // (skip index.md which is manual)
  const manualPages = new Set(['index.md']);
  for (const p of currentPaths) {
    if (!expectedPaths.has(p) && !manualPages.has(p)) {
      removed.push(p);
    }
  }

  // If there are changes, rebuild the full mkdocs.yml and sync all language configs
  if (added.length > 0 || removed.length > 0) {
    rebuildMkdocsYml(expectedSections);
    syncLanguageConfigs();
  }

  return { added, removed };
}

/**
 * Render a single section into nav lines.
 * Returns true if the section had entries and was rendered.
 */
function renderSection(lines, sectionName, entries) {
  if (!entries || entries.length === 0) return false;

  // Deduplicate by path (multiple modules can map to the same doc)
  const seen = new Set();
  const unique = entries.filter(e => {
    if (seen.has(e.path)) return false;
    seen.add(e.path);
    return true;
  });

  // Sort by preferred order if defined, otherwise alphabetically
  const order = ENTRY_ORDER[sectionName];
  if (order) {
    unique.sort((a, b) => {
      const ai = order.indexOf(a.path);
      const bi = order.indexOf(b.path);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  } else {
    unique.sort((a, b) => a.path.localeCompare(b.path));
  }

  if (unique.length === 1 && unique[0].path.endsWith('index.md')) {
    // Single-page section
    lines.push(`  - ${sectionName}: ${unique[0].path}`);
  } else {
    // Multi-page section
    lines.push(`  - ${sectionName}:`);
    for (const entry of unique) {
      const label = entry.path.endsWith('index.md') ? 'Overview' : entry.title;
      lines.push(`    - ${label}: ${entry.path}`);
    }
  }

  return true;
}

/**
 * Rebuild mkdocs.yml with the correct nav structure.
 * Preserves all non-nav configuration.
 */
function rebuildMkdocsYml(sections) {
  const content = readMkdocsYml();

  // Split at `nav:` to preserve everything before it
  const navIndex = content.indexOf('\nnav:');
  if (navIndex === -1) {
    console.error('Could not find nav: section in mkdocs.yml');
    return;
  }

  const header = content.substring(0, navIndex);

  // Build new nav
  const lines = ['\nnav:'];
  lines.push('  - Home: index.md');

  // Track which sections we've rendered to detect unknowns
  const renderedSections = new Set();

  for (const sectionName of SECTION_ORDER) {
    if (renderSection(lines, sectionName, sections[sectionName])) {
      renderedSections.add(sectionName);
    }
  }

  // Auto-append sections not in SECTION_ORDER (new sections get picked up automatically)
  for (const sectionName of Object.keys(sections)) {
    if (!renderedSections.has(sectionName)) {
      renderSection(lines, sectionName, sections[sectionName]);
    }
  }

  fs.writeFileSync(MKDOCS_EN, header + lines.join('\n') + '\n');
}

/**
 * Extract a mapping of doc file path → nav label from a mkdocs.yml content string.
 */
function extractNavLabels(content) {
  const labels = {};
  const re = /- (.+?):\s+([^\s#]+\.md)/g;
  let match;
  while ((match = re.exec(content)) !== null) {
    labels[match[2]] = match[1].trim();
  }
  return labels;
}

/**
 * Extract a mapping of English section name → translated section name from a language config.
 * Matches section headers (lines like "  - SectionName:") against the English nav.
 */
function extractSectionLabels(langContent, enContent) {
  const enSections = {};
  const enRe = /^ {2}- (.+?):\s*$/gm;
  const langRe = /^ {2}- (.+?):\s*$/gm;

  const enMatches = [];
  let m;
  while ((m = enRe.exec(enContent)) !== null) {
    enMatches.push(m[1].trim());
  }
  const langMatches = [];
  while ((m = langRe.exec(langContent)) !== null) {
    langMatches.push(m[1].trim());
  }

  // Match by position — sections appear in the same order
  for (let i = 0; i < Math.min(enMatches.length, langMatches.length); i++) {
    enSections[enMatches[i]] = langMatches[i];
  }
  return enSections;
}

/**
 * Sync all non-English language configs to match the English nav structure.
 * Preserves existing translated labels; uses English labels for new entries.
 */
function syncLanguageConfigs() {
  const enContent = readMkdocsYml();

  // Parse the English nav to get the structure
  const enNavIndex = enContent.indexOf('\nnav:');
  if (enNavIndex === -1) return;
  const enNavSection = enContent.substring(enNavIndex);

  for (const langConfig of LANGUAGE_CONFIGS) {
    if (!fs.existsSync(langConfig)) continue;

    const langContent = fs.readFileSync(langConfig, 'utf8');

    // Extract existing translations: path → label
    const existingLabels = extractNavLabels(langContent);

    // Extract existing section name translations
    const sectionLabels = extractSectionLabels(langContent, enContent);

    // Split the language config at nav:
    const langNavIndex = langContent.indexOf('\nnav:');
    if (langNavIndex === -1) continue;
    const langHeader = langContent.substring(0, langNavIndex);

    // Rebuild the nav section using English structure but translated labels
    const enLines = enNavSection.split('\n');
    const newLines = [];
    for (const line of enLines) {
      // Match section headers: "  - SectionName:"
      const sectionMatch = line.match(/^( {2}- )(.+?):(\s*)$/);
      if (sectionMatch) {
        const indent = sectionMatch[1];
        const enLabel = sectionMatch[2].trim();
        const translatedLabel = sectionLabels[enLabel] || enLabel;
        newLines.push(`${indent}${translatedLabel}:`);
        continue;
      }

      // Match nav entries: "    - Label: path.md" or "  - Label: path.md"
      const entryMatch = line.match(/^(\s+- )(.+?):\s+([^\s#]+\.md)\s*$/);
      if (entryMatch) {
        const indent = entryMatch[1];
        const enLabel = entryMatch[2].trim();
        const filePath = entryMatch[3];
        const translatedLabel = existingLabels[filePath] || enLabel;
        newLines.push(`${indent}${translatedLabel}: ${filePath}`);
        continue;
      }

      // Keep other lines as-is (nav:, comments, etc.)
      newLines.push(line);
    }

    fs.writeFileSync(langConfig, langHeader + newLines.join('\n'));
    console.log(`  Synced nav: ${langConfig}`);
  }
}

// CLI entry point
if (process.argv[1] && process.argv[1].endsWith('docs-nav-sync.mjs')) {
  const { scanRoutes } = await import('./docs-route-scanner.mjs');
  const routeMap = scanRoutes();
  const { added, removed } = syncNav(routeMap);
  console.log(`Nav sync complete. Added: ${added.length}, Removed: ${removed.length}`);
  if (added.length) console.log('  Added:', added);
  if (removed.length) console.log('  Removed:', removed);
}
