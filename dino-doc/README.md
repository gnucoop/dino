# Dino-doc Documentation (MkDocs)

This project includes an automatically generated documentation system powered by MkDocs.

It generates user-facing documentation for Dino based on the dinoapp application, including pages, navigation structure, and screenshots extracted from the UI.

---

## Full workflow (screenshots + documentation)

This guide describes the correct workflow to:

- generate screenshots of `dinoapp` routes used in the documentation
- generate md documentation in `dino-doc/docs/en` and its translations
- generate the static html documentation site

---

## Prerequisites

- Node/Yarn compatible with the project
- Installed dependencies
- Anthropic variables available for documentation generation:
  - `ANTHROPIC_AUTH_TOKEN` (required)
  - `ANTHROPIC_BASE_URL` (optional)
  - `ANTHROPIC_MODEL` (optional)

---

## 1) Install dependencies

```bash
yarn install
```

### 2) Regenerate route map (screenshots/docs)

```bash
node dino-doc/scripts/docs-route-scanner.mjs
```

The scanner reads the Angular routing files of `dinoapp` and builds the
**canonical list of documentation pages** (section, slug, title) plus, for each
page, the set of **source files** and **screenshot configs** used downstream.

It writes:

`dino-doc/scripts/docs-route-map.json`

which is consumed by Cypress (`dino-doc/cypress/e2e/docs-screenshots.cy.js`) to
capture screenshots.

Two things worth knowing:

- For documentation generation, each page's source set is **expanded** beyond
  the thin `dinoapp` module wrappers: the scanner walks the module folder
  recursively and resolves the `<dino-*>` library components it references
  (under `projects/material/<name>/src/`), so the generator sees the actual UI
  markup (field labels, action buttons, dialogs).
- Pages and screenshots are configured/tuned in `docs-route-scanner.mjs` — see
  [Customizing routes, screenshots and exclusions](#customizing-routes-screenshots-and-exclusions).

### 3) Build dinoapp

```bash
npx ng build dinoapp --configuration=e2e
```

### 4) Serve local build

Run in a separate terminal:

```bash
npx -y serve dist/dinoapp -s -l 4200
```

### 5) Capture screenshots

Run in another terminal (the local build from step 4 must be serving on
`http://localhost:4200`):

```bash
yarn cypress run --project dino-doc --spec dino-doc/cypress/e2e/docs-screenshots.cy.js --browser chrome --headless

```

Screenshots are saved under `dino-doc/docs/imgs/<section>/<name>.png` — the
`name` from the route map carries the subfolder (e.g. `forms/index-export` →
`docs/imgs/forms/index-export.png`).

For each route the spec captures:

- a **main view** screenshot of the page, and
- any **interactive** screenshots declared for it (dialogs, expanded panels,
  edit forms…), each defined by a `setup` (Cypress commands to reach the UI
  state) and a guard `selector`.

> **Skip-safe by design.** Before running a screenshot's `setup`, the spec
> checks its guard `selector`: if that element is not visible (feature disabled,
> no seed data, etc.) the screenshot is **skipped and logged**, not failed. This
> keeps a missing/optional UI element from breaking the whole run (and, in CI,
> from blocking the docs deploy). When a screenshot you expected is missing,
> check the Cypress log for a `SKIP:` line.

### 6) Export Anthropic variables

```bash
export ANTHROPIC_AUTH_TOKEN="..."
export ANTHROPIC_BASE_URL="..."      # optional
export ANTHROPIC_MODEL="claude-sonnet-4-6"  # optional
```

### 7) Generate documentation

Capture the screenshots with Cypress **first** (step 5): the generator embeds
references to the screenshot files that already exist on disk, so missing
screenshots won't be linked.

```bash
node dino-doc/scripts/docs-generate.mjs
```

#### Output sanitization (automatic)

Every page is passed through `dino-doc/scripts/docs-sanitize.mjs` before being
written, to clean up two recurring model quirks:

- **Stray code fences** — the model sometimes wraps the page (most often the
  YAML frontmatter) in a ```` ```yaml ````/```` ```markdown ```` fence. Left as
  is, this makes MkDocs render the frontmatter — or, with an unclosed fence, the
  **rest of the page** — as raw text instead of HTML. The frontmatter is
  normalized back to `---` delimiters.
- **Invented images** — image references whose target file does not exist on
  disk (e.g. hallucinated `imgs/icons/*.png`) are removed: a whole-line image is
  dropped, an inline image is replaced by its alt text. Removed paths are
  logged (`Removed N broken image ref(s): …`).
- **List spacing** — the model sometimes writes a bullet/numbered list directly
  under a paragraph or heading with no blank line between them. Python-Markdown
  (MkDocs) then parses the whole block as one paragraph and renders the markers
  as literal `*`/`-` text inline. A blank line is inserted before such lists.

This runs inline during generation (and in CI), so no manual step is needed. To
repair existing files on demand, run the sanitizer as a CLI:

```bash
node dino-doc/scripts/docs-sanitize.mjs            # fix all Markdown under docs/
node dino-doc/scripts/docs-sanitize.mjs path/to/file.md ...
```

> Note: invented-image removal resolves paths against the page's folder, so the
> referenced screenshots must exist **before** generation (capture them in
> step 5). A valid screenshot you simply haven't captured yet would otherwise be
> treated as missing and dropped.

#### What it generates, and in which languages

For every page it (re)generates, the script writes the **English** source in
`dino-doc/docs/en/` and then its **translations** into all configured languages:

- `dino-doc/docs/it`, `dino-doc/docs/es`, `dino-doc/docs/fr`
- `dino-doc/docs/pt`, `dino-doc/docs/uk`, `dino-doc/docs/ar`

> **A translation is generated only if its file does not already exist.** If a
> page's English changes but a translation is still on disk, the existing
> translation is kept (in default mode). Use `--full` or `--translate-only` to
> force re-translation — see [modes](#documentation-generator-modes).

#### Which pages it regenerates (default — no flags)

By default the script does **not** rewrite every page. It picks the scope from
the Git history and the files on disk:

1. It inspects the last commit: `git diff --name-only HEAD~1 HEAD`.
2. Then:
   - if a **routing module** changed (`*-routing.module.ts`) → **full
     regeneration** of all pages;
   - otherwise it regenerates every page whose **source files changed**, plus
     any page whose **`.md` file is missing**. A page's source files are its
     `docSourceFiles` from the route map, which include the resolved `<dino-*>`
     **library templates** under `projects/material/`. So a change isolated to a
     shared library component (with no edit to the dinoapp module) still
     regenerates **every page that embeds it**, not just pages under
     `projects/dinoapp/src/app/`;
   - if nothing relevant changed → it regenerates no content pages.
3. The landing page `docs/en/index.md` is **always** rebuilt from the route map
   (its translations only if missing).

> **Regenerate specific pages on demand:** delete their `.md` files — the
> English page **and** every language version — then run the script with no
> flags. The deleted pages now count as "missing" and are regenerated in all
> languages, while every other page is left untouched. This is the safest way
> to refresh a few pages without the cost and risk of `--full`.
>
> ```bash
> # Example: refresh the Forms overview page in all languages
> for lang in en it es fr pt uk ar; do
>   rm -f dino-doc/docs/$lang/forms/index.md
> done
> node dino-doc/scripts/docs-generate.mjs
> ```

## Documentation generator modes

### Full regeneration

Rewrites **every** page and **every** translation, overwriting whatever is on
disk (existing translations are re-translated, not preserved). Use sparingly:
it is the slowest and most expensive mode, and may introduce wording/structure
changes on pages that were already correct.

```bash
node dino-doc/scripts/docs-generate.mjs --full
```

### Translate only (from existing EN content)

Skips English generation and (re)translates **every** page from its existing
English source into all languages, overwriting existing translations.

```bash
node dino-doc/scripts/docs-generate.mjs --translate-only
```

### English only (no translations)

Generates/updates the English pages and skips all translations entirely.

```bash
node dino-doc/scripts/docs-generate.mjs --no-translate
```

### Target specific pages manually

Force regeneration of specific pages regardless of what the Git diff detects.
Useful to refresh a page without deleting its `.md` files, or when the change
lives somewhere the auto-detection doesn't reach. Two comma-separated flags:

- `--modules=` — by dinoapp **module directory** (e.g. `mat-forms`); every page
  fed by that module is regenerated.
- `--pages=` — by **route key** (`section/slug`, e.g. `forms/index`).

An unknown module or page is skipped with a `WARN`. These combine with the
normal Git-diff detection (they add to it, they don't replace it), and honor
`--no-translate`.

```bash
# by module directory
node dino-doc/scripts/docs-generate.mjs --modules=mat-forms,mat-reports

# by route key
node dino-doc/scripts/docs-generate.mjs --pages=forms/index,reports/index
```

## Customizing routes, screenshots and exclusions

Most behaviour is convention-based and needs no configuration. The exceptions
are tuned via these knobs in `dino-doc/scripts/docs-route-scanner.mjs` (re-run
the scanner after editing any of them):

| Knob | Purpose |
|---|---|
| `DOC_OVERRIDES` | Override a module's `section` / `slug` / `title`. Use to merge several modules into one page (e.g. all metric types → one `metrics/areas` page) or to give a page a custom title. |
| `SECTION_ALIASES` | Map a route-path prefix to a doc section (e.g. `login` → `getting-started`). |
| `EXTRA_ROUTE_ENTRIES` | Add screenshots for UI states that can't be auto-detected (a dialog reached only after clicking through the UI). Each entry has a `url`, `dir`, optional `resolveFrom`, and `screenshots: [{ name, setup, selector, description }]`. |
| `TEMPLATE_PATTERNS` | Auto-generate an interactive screenshot whenever a template matches a pattern (e.g. any page with a `<dino-floating-button>`). |
| `SCREENSHOT_EXCLUDES` | Keep the doc page but **skip its screenshots** (by route key, e.g. `forms/datachat`). |
| `DOC_EXCLUDES` | Drop a page **entirely** (by route key) — no doc file, no nav entry, no screenshot. Used to keep an app area out of the user-facing docs (e.g. `checkout/index`). |
| `SCHEMA_EDITOR_FIXUPS` | Parameterised routes that must load an **existing** entity (e.g. open a schema in edit mode via an internal `:id/edit` route). |

When writing an `EXTRA_ROUTE_ENTRIES` (or `TEMPLATE_PATTERNS`) screenshot, make
the `setup` **skip-safe**: pick a guard `selector` that is present **only** when
the target UI exists, so the screenshot is skipped rather than failing the
Cypress run if the feature/state is absent (see step 5).

### Process only selected routes

The Cypress spec captures every entry in `dino-doc/scripts/docs-route-map.json`.
To run only a subset (e.g. while iterating on one page):

1. Regenerate the route map: `node dino-doc/scripts/docs-route-scanner.mjs`
2. Temporarily filter the JSON to keep only the routes you need
3. Run the Cypress screenshots (step 5)
4. Generate documentation (step 7)
5. Restore the full route map (re-run the scanner)

## Build static HTML site

To build the documentation into a static website:

```bash
cd dino/dino-doc/config/en
mkdocs build
```

The output will be generated in:

```bash
cd dino/dino-doc/site/
```

### Preview documentation locally

To serve the documentation locally with live reload:

```bash
cd dino/dino-doc/config/en
mkdocs serve
```

Then open:

`http://127.0.0.1:8000/docs.dinoapp.io/en/`

or

`http://127.0.0.1:8000/docs.dinoapp.io/it/`
