# Working on dino

Angular monorepo. `projects/core` (auth, data, forms, users, translations, error-handler),
`projects/material` (ui components), `projects/dinoapp` (the app), `projects/e2e-app`. The tsconfig
paths map `@dino/core/*` and `@dino/material/*` to the sources, so a change in a library is compiled
straight away by `ng serve`.

## The constraint that outranks the others

The app is used where connectivity is unstable or absent for days, and **data collected offline must
never be lost**. Local data is destroyed only by a deliberate act — the user logging out and choosing
to delete it, or a different user logging in on the device. No failure the app detects by itself may
delete anything, and no automatic path may reach a logout.

Before touching the sync, the replications, the tokens or the guards, read **`SYNC.md`**: it is the
reference for how the sync behaves case by case, and for what differs from `dev`. **`TEST-SYNC.md`** is
the manual script for those same cases, written for non-developers. Keep both current when the
behaviour changes.

## Conventions

- Code comments and JSDoc **in English**, whatever the language of the conversation.
- Commits: conventional-commit subject, and a body explaining *why*, not what the diff already shows.
- New translation keys go in **all** the locale files under `projects/core/translations/src`
  (`ar, eng, esp, fra, ita, prt, uga, ukr`), keyed by the full English string.
- Never stage `projects/dinoapp/src/environments/environment.ts` or `RELEASE.md`: they carry local
  configuration.

## Tests

- `yarn test:ci:core`, `yarn test:ci:material`, `yarn test:ci:dinoapp`.
- To run one area: `npx ng test material --watch=false --include='**/main-nav/src/*.spec.ts'`.
- Cypress suites exist under `projects/*/cypress` but are not part of the usual loop.
- A fix worth its test is worth checking the other way round: revert the fix and watch that test fail.

## Formatting

Prettier is configured, but a good part of the tree predates it and is not clean. Format **only the
lines you touch**: running prettier over a whole file rewrites hundreds of unrelated lines and buries
the change under churn.
