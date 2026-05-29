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

This updates:

`dino-doc/scripts/docs-route-map.json`

used by Cypress:

`dino-doc/cypress/e2e/docs-screenshots.cy.js`.

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

Run in another terminal:

```bash
yarn cypress run --project dino-doc --spec dino-doc/cypress/e2e/docs-screenshots.cy.js --browser chrome --headless

```

Output screenshot: `dino-doc/docs/imgs/`.

### 6) Export Anthropic variables

```bash
export ANTHROPIC_AUTH_TOKEN="..."
export ANTHROPIC_BASE_URL="..."      # optional
export ANTHROPIC_MODEL="claude-sonnet-4-6"  # optional
```

### 7) Generate documentation

Assume that screenshots have already been generated before by cypress.

```bash
node dino-doc/scripts/docs-generate.mjs
```

This generates English docs (`dino-doc/docs/en`) and, if enabled, optional translations:

- `dino-doc/docs/it`
- `dino-doc/docs/es`
- `dino-doc/docs/fr`
- `dino-doc/docs/pt`
- `dino-doc/docs/uk`
- `dino-doc/docs/ar`

## Documentation generator modes

### Full regeneration

```bash
node dino-doc/scripts/docs-generate.mjs --full
```

### Translate only (from existing EN content)

```bash
node dino-doc/scripts/docs-generate.mjs --translate-only
```

### English only (no translations)

```bash
node dino-doc/scripts/docs-generate.mjs --no-translate
```

## Notes on route selection

The Cypress tests use all entries in: `dino-doc/scripts/docs-route-map.json`.
To process only selected routes:

1. Regenerate the route map (`node dino-doc/scripts/docs-route-scanner.mjs`);
2. Temporarily filter the JSON to keep only required routes
3. Run Cypress screenshots
4. Generate documentation
5. Restore full route map

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
