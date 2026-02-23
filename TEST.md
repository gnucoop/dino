# Testing the Docs Pipeline

## Prerequisites

- Node 20+
- `@anthropic-ai/sdk` installed (`yarn add -D @anthropic-ai/sdk`)
- Python 3.11+ (for MkDocs)
- Cypress + Chrome (for screenshots)

## Pipeline Order

Screenshots must be captured **before** doc generation so the Claude API can reference the actual available images.

```
1. Route scan  →  2. Screenshots  →  3. Doc generation  →  4. MkDocs build
```

## Step 1 — Route Scanner

Parses all Angular routing files and builds the canonical route map.

```bash
node scripts/docs-route-scanner.mjs
```

Expected output: list of ~22 doc-mapped routes. Also writes `scripts/docs-route-map.json`.

## Step 2 — Nav Sync

Checks `mkdocs.yml` nav against the route map and adds/removes entries.

```bash
node --input-type=module -e "
import { scanRoutes } from './scripts/docs-route-scanner.mjs';
import { syncNav } from './scripts/docs-nav-sync.mjs';
const { added, removed } = syncNav(scanRoutes());
console.log('Added:', added);
console.log('Removed:', removed);
"
```

Check `mkdocs.yml` after — it should reflect any new/removed routes.

## Step 3 — Screenshots (needs app build + Cypress)

Builds the Angular app, serves it, and captures screenshots with Cypress.

```bash
# Build the app
npx ng build e2e-app --configuration development

# Serve it
npx -y serve dist/e2e-app -s -l 4200 &

# Wait for server
sleep 5

# Run the screenshot spec
yarn cypress run --spec "cypress/e2e/docs-screenshots.cy.js" --headless --browser chrome

# Kill the server when done
kill %1
```

Screenshots are saved to `docs/imgs/` (configured in `cypress.config.ts`).

## Step 4 — Doc Generation (needs API credentials)

Generates/updates markdown files in `docs/` via the Claude API. The generator scans `docs/imgs/` to find available screenshots and tells Claude to embed them. It then translates each page into it, es, fr, pt, uk, ar.

```bash
# Targeted: only changed modules + missing doc files (English + all translations)
ANTHROPIC_AUTH_TOKEN=your-token \
ANTHROPIC_BASE_URL=https://your-endpoint \
ANTHROPIC_MODEL=claude-sonnet-4-6 \
node scripts/docs-generate.mjs

# Full: regenerate all pages in all languages
ANTHROPIC_AUTH_TOKEN=your-token \
ANTHROPIC_BASE_URL=https://your-endpoint \
node scripts/docs-generate.mjs --full

# English only (skip translations)
ANTHROPIC_AUTH_TOKEN=your-token \
ANTHROPIC_BASE_URL=https://your-endpoint \
node scripts/docs-generate.mjs --full --no-translate

# Translate existing English docs without regenerating them
ANTHROPIC_AUTH_TOKEN=your-token \
ANTHROPIC_BASE_URL=https://your-endpoint \
node scripts/docs-generate.mjs --translate-only
```

Environment variables:

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `ANTHROPIC_AUTH_TOKEN` | Yes | — | API authentication token |
| `ANTHROPIC_BASE_URL` | No | Anthropic default | Override for compatible APIs |
| `ANTHROPIC_MODEL` | No | `claude-sonnet-4-6` | Override the model name |

CLI flags:

| Flag | Purpose |
|---|---|
| `--full` | Regenerate all pages (ignore git diff) |
| `--no-translate` | Skip translations, generate English only |
| `--translate-only` | Translate existing English docs without regenerating them |

Translation output structure:

```
docs/en/                 ← English
docs/it/                 ← Italian
docs/es/                 ← Spanish
docs/fr/                 ← French
docs/pt/                 ← Portuguese
docs/uk/                 ← Ukrainian
docs/ar/                 ← Arabic
docs/imgs/               ← Screenshots (shared by all languages)
```

## Step 5 — MkDocs Build (all languages)

Each language (including English) has its own config in `config/{lang}/mkdocs.yml` that inherits shared settings from the root `mkdocs.yml`. Each config defines its own translated `nav`.

```bash
pip install mkdocs-material

# Build all languages (en → site/, it → site/it/, etc.)
for lang in en it es fr pt uk ar; do
  mkdocs build -f config/$lang/mkdocs.yml --strict
done
```

Exit code 0 = no broken links. Preview locally:

```bash
# English
mkdocs serve -f config/en/mkdocs.yml

# Specific language
mkdocs serve -f config/it/mkdocs.yml
```

## Quick End-to-End Sequence

```bash
# 1. Scanner + nav sync
node scripts/docs-route-scanner.mjs

# 2. Screenshots (before docs so images are available for embedding)
npx ng build e2e-app --configuration development
npx -y serve dist/e2e-app -s -l 4200 &
sleep 5
yarn cypress run --spec "cypress/e2e/docs-screenshots.cy.js" --headless --browser chrome
kill %1

# 3. Generate docs (Claude will embed the screenshots)
ANTHROPIC_AUTH_TOKEN=your-token \
ANTHROPIC_BASE_URL=https://your-endpoint \
node scripts/docs-generate.mjs --full

# 4. Build all language sites
pip install mkdocs-material
for lang in en it es fr pt uk ar; do
  mkdocs build -f config/$lang/mkdocs.yml --strict
done

# 5. Preview the site
mkdocs serve -f config/en/mkdocs.yml
```

## Verification Checklist

- [ ] Route scanner finds ~22 entries
- [ ] Nav sync detects added/removed pages correctly
- [ ] Cypress captures screenshots to `docs/imgs/`
- [ ] `docs-generate.mjs` creates missing `.md` files via Claude API
- [ ] `docs-generate.mjs --full` regenerates all pages in all languages
- [ ] Generated `.md` files contain `![...](../imgs/...)` screenshot references
- [ ] Translated docs exist in `docs/it/`, `docs/es/`, `docs/fr/`, `docs/pt/`, `docs/uk/`, `docs/ar/`
- [ ] Translated docs use `../../imgs/` for screenshot paths (one level deeper)
- [ ] `mkdocs build -f config/en/mkdocs.yml --strict` exits 0 (English)
- [ ] `mkdocs build -f config/{lang}/mkdocs.yml --strict` exits 0 (all 6 translations)
- [ ] `site/` contains English output, `site/{lang}/` contains each translation
- [ ] MkDocs site renders correctly at `http://localhost:8000`
- [ ] Language switcher appears in the site header
