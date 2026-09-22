/**
 * Hand-written documentation pages that no route produces.
 *
 * Most pages in docs/en/ are generated from the route map: a route exists, so a
 * page is generated for it, it lands in the nav, and it gets translated. These
 * pages describe concepts rather than screens, so no route will ever produce
 * them — but they still need the other two halves of that treatment, and both
 * scripts read this list to provide them:
 *
 *  - docs-nav-sync.mjs puts them in the nav and keeps them there. That script
 *    rebuilds the nav from scratch, so a hand-added entry would not survive; it
 *    also reports anything in the nav without a route as orphaned, which makes
 *    docs-generate.mjs delete the file. Being listed here prevents both.
 *  - docs-generate.mjs translates them alongside the route-driven pages.
 *
 * `path` is relative to docs/<lang>/, `section` is a nav display name from
 * SECTION_ORDER in docs-nav-sync.mjs, and `title` is the nav label.
 */
export const EXTRA_PAGES = [
  {path: 'reports/autoreports.md', section: 'Reports', title: 'Auto Report'},
  {path: 'reports/xlsreport.md', section: 'Reports', title: 'XLSReport'},
];

/** The route-key-style name used by --pages, e.g. `reports/xlsreport`. */
export function extraPageKey(page) {
  return page.path.replace(/\.md$/, '');
}
