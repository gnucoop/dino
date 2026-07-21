# Dino

Dino is a web-based platform for **structured data collection, monitoring, and analysis**. It gives teams a single place to design forms, gather information from the field, track progress, and explore results — whether they are online or working in low-connectivity environments.

Dino is developed by [Gnucoop](https://www.gnucoop.com) and released as free software under the AGPL-3.0 license.

---

## Features

- **Collect and manage data** — Design form schemas, fill them in, and manage all your records from a central dashboard. Explore geolocated data on an interactive map.
- **Offline-first** — Built on RxDB so data can be collected in low- or no-connectivity environments and synchronized when a connection is available.
- **Analyze and report** — Turn collected data into insights with custom report schemas and data aggregation.
- **Chat with your data** — Ask questions about your data in plain language using AI-powered data chat.
- **Monitor and measure** — Track key indicators and monitor entities such as thematic areas, cases, locations, organizations, and projects.
- **Collaborate** — In-app notifications, user and group management, and fine-grained permission groups.
- **Multilingual** — Ships with Arabic, English, Spanish, French, Italian, Portuguese, and Ukrainian.
- **Public forms** — Share forms publicly for external data collection.
- **Installable (PWA)** — Can be installed as a Progressive Web App.

For end-user documentation, see the [`dino-doc`](dino-doc/) directory.

---

## Tech Stack

| Technology                                                           | Purpose                        |
| -------------------------------------------------------------------- | ------------------------------ |
| [Angular](https://angular.dev) 18                                    | Application framework          |
| TypeScript                                                           | Language                       |
| Angular Material / CDK                                               | UI components                  |
| RxJS                                                                 | Reactive streams               |
| [RxDB](https://rxdb.info)                                            | Offline-first database         |
| Apollo Client + graphql-ws                                           | GraphQL client & subscriptions |
| [AJF](https://github.com/gnucoop/ajf) (`@ajf/core`, `@ajf/material`) | Form framework                 |
| Nhost                                                                | Backend authentication         |
| Transloco                                                            | Internationalization           |
| Cypress · Karma + Jasmine                                            | E2E & unit testing             |

---

## Repository Structure

This is an [Angular workspace](https://angular.dev/reference/configs/workspace-config) (monorepo) containing several projects:

```
dino/
├── projects/
│   ├── core/          # @dino/core — data, auth, sync, forms, reports, metrics…
│   ├── material/      # @dino/material — UI components built on Angular Material
│   ├── dinoapp/       # The Dino application
│   ├── dev-app/       # Development playground app
│   └── dino-examples/ # Example components
├── dino-doc/          # User-facing documentation (MkDocs)
├── docker/            # Production Docker image (Nginx)
├── scripts/           # Build & release scripts
└── tools/             # Build tooling
```

---

## Getting Started

### Prerequisites

- **Node.js** `^20.11.1 || ^22.0.0`
- **Yarn** (npm is not supported for installing dependencies)

### Install

```bash
yarn install
```

### Run the app

```bash
# Serve the Dino application
yarn dinoapp

# Serve the development playground app
yarn dev-app
```

The app is served on [http://localhost:4200](http://localhost:4200).

Backend connection settings (authentication URL, GraphQL endpoint, WebSocket URL, instance name, feature toggles, theme, etc.) live in `projects/dinoapp/src/environments/`.

---

## Building

```bash
# Build the core and material libraries
yarn build

# Build the application
yarn build:dinoapp
```

---

## Testing

```bash
# Unit tests (watch mode)
yarn test

# Unit tests (single CI run)
yarn test:ci

# E2E tests (Cypress)
yarn e2e            # all libraries
yarn e2e:core       # open Cypress for @dino/core
yarn e2e:material   # open Cypress for @dino/material

# Model schema validation
yarn model-schema-test
```

```bash
# Lint
yarn lint
```

---

## Deployment (Docker)

A production image based on Nginx is available. It serves the pre-built static application and injects runtime configuration from environment variables at container startup, so the same image can be reused across environments.

Build the image:

```bash
docker build -f docker/Dockerfile -t dinoapp .
```

Run the container, passing the backend configuration:

```bash
docker run -p 8080:80 \
  -e AUTH_URL="https://your-auth-host/v1" \
  -e SYNC_GRAPHQL_URL="https://your-hasura-host/v1/graphql" \
  -e WS_URL="wss://your-hasura-host/v1/graphql" \
  -e INSTANCE_NAME="your_instance" \
  dinoapp
```

| Variable           | Required | Description                                    |
| ------------------ | :------: | ---------------------------------------------- |
| `AUTH_URL`         |    ✅    | Authentication service base URL                |
| `SYNC_GRAPHQL_URL` |          | GraphQL endpoint used for data synchronization |
| `WS_URL`           |          | WebSocket endpoint for GraphQL subscriptions   |
| `INSTANCE_NAME`    |          | Name of the Dino instance                      |

Official images are published to Docker Hub as [`devgnucoop/dinoapp`](https://hub.docker.com/r/devgnucoop/dinoapp).

---

## Documentation

- **User documentation** is generated with MkDocs and lives in [`dino-doc/`](dino-doc/). See [`dino-doc/README.md`](dino-doc/README.md) for the generation workflow.
- **Contributor and coding guidelines** are described in [`AGENTS.md`](AGENTS.md).

---

## License

Copyright (C) Gnucoop soc. coop.

Dino is free software: you can redistribute it and/or modify it under the terms of the **GNU Affero General Public License** as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

See the [LICENSE](LICENSE) file for the full text.
