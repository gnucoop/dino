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
  'Aggregation',
  'Metrics',
  'DinoGPT',
  'Notifications',
  'Public Forms',
  'Administration',
  'Checkout',
];

/**
 * Map from internal section names (used in routeMap keys) to nav display names.
 */
const SECTION_DISPLAY = {
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
  'checkout':         'Checkout',
};

/**
 * Parse mkdocs.yml manually (simple YAML subset — avoids adding a YAML library dependency).
 * Returns the full file content as a string for manipulation.
 */
const MKDOCS_EN = 'config/en/mkdocs.yml';

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
    const sectionName = SECTION_DISPLAY[route.section];
    if (!sectionName) continue;

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
  expectedPaths.add('interface/index.md'); // manual page
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
  // (skip index.md and interface/index.md which are manual)
  const manualPages = new Set(['index.md', 'interface/index.md']);
  for (const p of currentPaths) {
    if (!expectedPaths.has(p) && !manualPages.has(p)) {
      removed.push(p);
    }
  }

  // If there are changes, rebuild the full mkdocs.yml
  if (added.length > 0 || removed.length > 0) {
    rebuildMkdocsYml(expectedSections);
  }

  return { added, removed };
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

  for (const sectionName of SECTION_ORDER) {
    const entries = sections[sectionName];
    if (!entries || entries.length === 0) {
      // Check for manual single-page sections
      if (sectionName === 'Interface & Navigation') {
        lines.push('  - Interface & Navigation: interface/index.md');
      }
      continue;
    }

    // Deduplicate by path (multiple modules can map to the same doc)
    const seen = new Set();
    const unique = entries.filter(e => {
      if (seen.has(e.path)) return false;
      seen.add(e.path);
      return true;
    });

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
  }

  fs.writeFileSync(MKDOCS_EN, header + lines.join('\n') + '\n');
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
