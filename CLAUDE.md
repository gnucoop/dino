Project: [Dino]

## Current Objective
Generate user-facing documentation from the source code.

## Architecture
Angular SPA with lazy loading. Each lazy module represents a functional macro-area.

## Ignore
- node_modules, dist, .angular
- Test files (*.spec.ts)
- Pure presentational components
- Internal service logic, state management (NgRx, signals, etc.)

## Focus
- Routing files (root + lazy routes)
- Route-connected components (page/container components)
- HTML templates for user interactions
