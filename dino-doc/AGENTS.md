# AGENTS.md - AI Agent Instructions for dino-doc

## Objective

`dino-doc` hosts **user-facing documentation tooling** for the Dino application, including:

- route scanning from `projects/dinoapp/src`
- screenshot capture via Cypress
- docs generation + translation via Anthropic API

## Project Map (relevant)

```
dino/
├── projects/dinoapp/                 # The application being documented
├── projects/material/                # UI library templates used by route scanner
└── dino-doc/
    ├── config/*/mkdocs.yml           # Per-language MkDocs configs (inherit base)
    ├── docs/{en,it,es,fr,pt,uk,ar}/  # Generated markdown pages
    ├── docs/imgs/                    # Captured screenshots
    ├── cypress/e2e/docs-screenshots.cy.js
    └── scripts/
        ├── docs-route-scanner.mjs
        ├── docs-nav-sync.mjs
        └── docs-generate.mjs
```

## Commands (from repo root)

```bash
# 1) regenerate route map (feeds Cypress + docs)
node dino-doc/scripts/docs-route-scanner.mjs

# 2) build + serve dinoapp (for screenshots)
npx ng build dinoapp --configuration=e2e
npx -y serve dist/dinoapp -s -l 4200

# 3) capture screenshots
yarn cypress run --config-file "dino-doc/cypress.config.ts" \
  --spec "dino-doc/cypress/e2e/docs-screenshots.cy.js" \
  --headless --browser chrome

# 4) generate docs (requires ANTHROPIC_AUTH_TOKEN)
node dino-doc/scripts/docs-generate.mjs
```

## Safety / Scope

- Prefer **not** to modify Dino application code (`projects/dinoapp/**`) while working on docs, unless explicitly asked.
- Keep all docs outputs confined under `dino-doc/docs/**` and `dino-doc/scripts/**`.
