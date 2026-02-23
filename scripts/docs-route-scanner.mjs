#!/usr/bin/env node

/**
 * docs-route-scanner.mjs
 *
 * Reads Angular routing files from the e2e-app and builds a canonical route map.
 * The map is the single source of truth for what documentation pages should exist.
 *
 * Output shape:
 * {
 *   'forms/index': {
 *     docFile: 'docs/forms/index.md',
 *     url: '/forms',
 *     moduleDir: 'mat-forms',
 *     componentFiles: ['projects/e2e-app/src/mat-forms/forms-e2e.component.ts', ...]
 *   },
 *   ...
 * }
 */

import fs from 'fs';
import path from 'path';

const E2E_SRC = 'projects/e2e-app/src';
const ROOT_ROUTING = path.join(E2E_SRC, 'main.routing.module.ts');

/**
 * Mapping from module directory names to their documentation section and title.
 * This defines the structure of the docs site. Modules not listed here are skipped
 * (e.g. internal/presentational modules that don't warrant a user-facing doc page).
 */
const MODULE_TO_DOC = {
  // Getting Started
  'mat-login':              { section: 'getting-started', slug: 'login',              title: 'Logging In' },
  'mat-reset-password':     { section: 'getting-started', slug: 'reset-password',     title: 'Resetting Your Password' },

  // Dashboard
  'mat-dashboard':          { section: 'dashboard',       slug: 'index',              title: 'Dashboard' },

  // Forms
  'mat-forms':              { section: 'forms',           slug: 'index',              title: 'Data Collection' },
  'mat-forms-list':         { section: 'forms',           slug: 'viewing-submissions', title: 'Viewing & Managing Submissions' },
  'mat-forms-map':          { section: 'forms',           slug: 'map-view',           title: 'Exploring Data on a Map' },
  'mat-datachat':           { section: 'forms',           slug: 'data-chat',          title: 'Chatting with Your Data (AI)' },
  'mat-edit-form':          { section: 'forms',           slug: 'filling-in-a-form',  title: 'Filling In a Form' },
  'mat-create-form-data':   { section: 'forms',           slug: 'filling-in-a-form',  title: 'Filling In a Form' },  // shares doc with edit-form
  'mat-edit-form-schema':   { section: 'forms',           slug: 'managing-templates', title: 'Managing Form Schemas' },

  // Reports
  'mat-reports':            { section: 'reports',         slug: 'index',              title: 'Reports' },
  'mat-reports-list':       { section: 'reports',         slug: 'viewing-reports',    title: 'Viewing & Managing Reports' },
  'mat-edit-report':        { section: 'reports',         slug: 'creating-a-report',  title: 'Creating a Report' },
  'mat-create-report-data': { section: 'reports',         slug: 'creating-a-report',  title: 'Creating a Report' },  // shares doc
  'mat-edit-report-schema': { section: 'reports',         slug: 'managing-templates', title: 'Managing Report Schemas' },

  // Aggregation
  'mat-aggregation':        { section: 'aggregation',     slug: 'index',              title: 'Aggregation' },

  // Metrics
  'mat-metrics':            { section: 'metrics',         slug: 'index',              title: 'Metrics' },
  'mat-areas':              { section: 'metrics',         slug: 'managing-metrics',   title: 'Managing Metrics' },
  'mat-cases':              { section: 'metrics',         slug: 'managing-metrics',   title: 'Managing Metrics' },
  'mat-locations':          { section: 'metrics',         slug: 'managing-metrics',   title: 'Managing Metrics' },
  'mat-organizations':      { section: 'metrics',         slug: 'managing-metrics',   title: 'Managing Metrics' },
  'mat-projects':           { section: 'metrics',         slug: 'managing-metrics',   title: 'Managing Metrics' },

  // DinoGPT
  'mat-gpt':                { section: 'gpt',             slug: 'index',              title: 'DinoGPT' },

  // Notifications
  'mat-notifications':      { section: 'notifications',   slug: 'index',              title: 'Notifications' },

  // Public Forms
  'mat-edit-public-form':   { section: 'public-forms',    slug: 'index',              title: 'Public Forms' },

  // Administration
  'mat-users':              { section: 'administration',  slug: 'users',              title: 'Managing Users & Groups' },
  'mat-manage-users':       { section: 'administration',  slug: 'users',              title: 'Managing Users & Groups' },
  'mat-groups':             { section: 'administration',  slug: 'users',              title: 'Managing Users & Groups' },
  'mat-langs':              { section: 'administration',  slug: 'languages',          title: 'Managing Languages' },

  // Checkout (may not have a doc page yet — included for completeness)
  'mat-checkout':           { section: 'checkout',        slug: 'index',              title: 'Checkout' },
};

/**
 * Parse loadChildren entries from a routing file.
 * Returns array of { path, moduleDir } objects.
 */
function parseLoadChildren(fileContent) {
  const entries = [];
  // Match loadChildren patterns: import('./mat-xxx/...').then(...)
  const loadChildrenRe = /path:\s*'([^']*)'[\s\S]*?import\(\s*'\.\/([^']+)'/g;
  // Also match cross-directory imports: import('../mat-xxx/...')
  const loadChildrenRe2 = /path:\s*'([^']*)'[\s\S]*?import\(\s*'\.\.\/([^']+)'/g;

  let match;
  while ((match = loadChildrenRe.exec(fileContent)) !== null) {
    const routePath = match[1];
    const importPath = match[2];
    const moduleDir = importPath.split('/')[0];
    entries.push({ path: routePath, moduleDir });
  }
  while ((match = loadChildrenRe2.exec(fileContent)) !== null) {
    const routePath = match[1];
    const importPath = match[2];
    const moduleDir = importPath.split('/')[0];
    entries.push({ path: routePath, moduleDir });
  }

  return entries;
}

/**
 * Find all component-related files in a module directory (TS + HTML, excluding specs).
 */
function findComponentFiles(moduleDir) {
  const dirPath = path.join(E2E_SRC, moduleDir);
  if (!fs.existsSync(dirPath)) return [];

  return fs.readdirSync(dirPath)
    .filter(f => (f.endsWith('.ts') || f.endsWith('.html')) && !f.endsWith('.spec.ts'))
    .map(f => path.join(E2E_SRC, moduleDir, f));
}

/**
 * Scan all routing files and build the complete route map.
 */
export function scanRoutes() {
  const routeMap = {};

  if (!fs.existsSync(ROOT_ROUTING)) {
    console.error(`Root routing file not found: ${ROOT_ROUTING}`);
    return routeMap;
  }

  const rootContent = fs.readFileSync(ROOT_ROUTING, 'utf8');
  const rootEntries = parseLoadChildren(rootContent);

  for (const root of rootEntries) {
    processModule(root.path, root.moduleDir, routeMap);

    // Check if the module has its own child routing file
    const childRoutingFile = findRoutingFile(root.moduleDir);
    if (childRoutingFile) {
      const childContent = fs.readFileSync(childRoutingFile, 'utf8');
      const childEntries = parseLoadChildren(childContent);

      for (const child of childEntries) {
        const fullPath = root.path ? `${root.path}/${child.path}` : child.path;
        processModule(fullPath, child.moduleDir, routeMap);
      }
    }
  }

  return routeMap;
}

/**
 * Find the routing file for a given module directory.
 */
function findRoutingFile(moduleDir) {
  const dirPath = path.join(E2E_SRC, moduleDir);
  if (!fs.existsSync(dirPath)) return null;

  const files = fs.readdirSync(dirPath);
  const routingFile = files.find(f => f.includes('-routing.module.ts'));
  return routingFile ? path.join(dirPath, routingFile) : null;
}

/**
 * Process a single module entry and add it to the route map.
 */
function processModule(routePath, moduleDir, routeMap) {
  const docMapping = MODULE_TO_DOC[moduleDir];
  if (!docMapping) return; // Module not mapped to a doc page

  const key = `${docMapping.section}/${docMapping.slug}`;

  // If the key already exists, merge component files (multiple modules can map to the same doc)
  if (routeMap[key]) {
    const newFiles = findComponentFiles(moduleDir);
    for (const f of newFiles) {
      if (!routeMap[key].componentFiles.includes(f)) {
        routeMap[key].componentFiles.push(f);
      }
    }
    // Also track additional module dirs
    if (!routeMap[key].moduleDirs.includes(moduleDir)) {
      routeMap[key].moduleDirs.push(moduleDir);
    }
    return;
  }

  routeMap[key] = {
    docFile: `docs/en/${docMapping.section}/${docMapping.slug}.md`,
    url: routePath ? `/${routePath}` : '/',
    title: docMapping.title,
    section: docMapping.section,
    moduleDir,
    moduleDirs: [moduleDir],
    componentFiles: findComponentFiles(moduleDir),
  };
}

/**
 * Export the route map as a JSON file suitable for Cypress consumption.
 * Each entry includes the URL and a default screenshot configuration.
 */
export function exportRouteMapForCypress(routeMap) {
  const entries = Object.values(routeMap)
    .filter(r => !r.url.includes(':'))  // Skip parameterised routes only
    .map(r => ({
      url: r.url,
      dir: r.section,
      screenshots: [
        { name: `${r.section}/${path.basename(r.docFile, '.md')}`, setup: null },
      ],
    }));

  // Add manual entries for pages not tied to a single route
  entries.unshift({
    url: '/',
    dir: 'interface',
    screenshots: [
      { name: 'interface/index', setup: null },
    ],
  });

  fs.writeFileSync(
    'scripts/docs-route-map.json',
    JSON.stringify(entries, null, 2) + '\n',
  );

  return entries;
}

// CLI entry point
if (process.argv[1] && process.argv[1].endsWith('docs-route-scanner.mjs')) {
  const routeMap = scanRoutes();
  console.log(`Scanned ${Object.keys(routeMap).length} doc-mapped routes:`);
  for (const [key, val] of Object.entries(routeMap)) {
    console.log(`  ${key} → ${val.url} (${val.componentFiles.length} files)`);
  }

  exportRouteMapForCypress(routeMap);
  console.log('\nRoute map exported to scripts/docs-route-map.json');
}
