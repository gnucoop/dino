#!/bin/bash

set -e

echo "Setup"
yarn install --frozen-lockfile --non-interactive

echo "Lint"
yarn -s lint

echo "Build"
./scripts/build.mjs

echo "Build"
./scripts/build.mjs

echo "Model schema tests"
yarn -s model-schema-test

echo "E2E tests"
./scripts/e2e-ci.mjs

echo "Build release"
./scripts/release.mjs

echo "Build docs"
./scripts/build-docs.mjs
