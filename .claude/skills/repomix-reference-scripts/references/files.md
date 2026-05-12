# Files

## File: docs/build-dgeni-docs.mjs
```javascript
export const buildDgeniDocs = async (packages) =>
```

## File: docs/build-examples.mjs
```javascript
const buildExampleManifest = (packages) =>
⋮----
export const buildExamples = async (packages) =>
```

## File: docs/build-overviews.mjs
```javascript
const buildOverview = async (mdPath) =>
⋮----
export const buildOverviews = async (packages) =>
```

## File: docs/copy-examples-source.mjs
```javascript
export const copyExamplesSource = (packages) =>
```

## File: docs/highlight-examples-source.mjs
```javascript
export const highlightExamplesSource = async packages => {
  const sources = scanDir(srcDir);
```

## File: docs/index.mjs
```javascript

```

## File: jenkins/create-build-artifacts.mjs
```javascript

```

## File: jenkins/publish-build-artifacts.sh
```bash
#!/bin/bash

# Script to publish the build artifacts to a Bitbucket repository.
# Builds will be automatically published once new changes are made to the repository.

# The script should immediately exit if any command in the script fails.
set -e

# Go to the project root directory
cd $(dirname ${0})/../..

if [ -z ${DINO_BUILDS_TOKEN} ]; then
  echo "Error: No access token for Bitbucket could be found." \
       "Please set the environment variable 'DINO_BUILDS_TOKEN'."
  exit 1
fi

# Dino packages that need to published.
PACKAGES=(core material)
REPOSITORIES=(dino-core-builds dino-material-builds)

# Command line arguments.
COMMAND_ARGS=${*}

# Function to publish artifacts of a package to Bitbucket.
#   @param ${1} Name of the package
#   @param ${2} Repository name of the package.
publishPackage() {
  packageName=${1}
  packageRepo=${2}

  buildDir="$(pwd)/dist/artifacts/${packageName}"
  buildVersion=$(node -pe "require('./package.json').version")
  branchName=${CIRCLE_BRANCH:-'master'}

  commitSha=$(git rev-parse --short HEAD)
  commitAuthorName=$(git --no-pager show -s --format='%an' HEAD)
  commitAuthorEmail=$(git --no-pager show -s --format='%ae' HEAD)
  commitMessage=$(git log --oneline -n 1)

  buildVersionName="${buildVersion}-sha-${commitSha}"
  buildTagName="${branchName}-${commitSha}"
  buildCommitMessage="${branchName} - ${commitMessage}"

  repoUrl="https://${DINO_BUILDS_TOKEN}@bitbucket.org/gnucoop/${packageRepo}.git"
  repoUrlLog="https://bitbucket.org/gnucoop/${packageRepo}.git"
  repoDir="tmp/${packageRepo}"

  echo "Starting publish process of ${packageName} for ${buildVersionName} into ${branchName}.."

  # Prepare cloning the builds repository
  rm -rf ${repoDir}
  mkdir -p ${repoDir}

  echo "Starting cloning process of ${repoUrlLog} into ${repoDir}.."

  if [[ $(git ls-remote --heads ${repoUrl} ${branchName}) ]]; then
    echo "Branch ${branchName} already exists. Cloning that branch."
    git clone ${repoUrl} ${repoDir} --depth 1 --branch ${branchName}

    cd ${repoDir}
    echo "Cloned repository and switched into the repository directory (${repoDir})."
  else
    echo "Branch ${branchName} does not exist on ${packageRepo} yet."
    echo "Cloning default branch and creating branch '${branchName}' on top of it."

    git clone ${repoUrl} ${repoDir} --depth 1
    cd ${repoDir}

    echo "Cloned repository and switched into directory. Creating new branch now.."

    git checkout -b ${branchName}
  fi

  # Copy the build files to the repository
  rm -rf ./*
  cp -r ${buildDir}/* ./

  echo "Removed everything from ${packageRepo}#${branchName} and added the new build output."

  if [[ $(git ls-remote origin "refs/tags/${buildTagName}") ]]; then
    echo "Skipping publish because tag is already published"
    exit 0
  fi

  echo "Updated the build version in every file to include the SHA of the latest commit."

  # Prepare Git for pushing the artifacts to the repository.
  git config user.name "${commitAuthorName}"
  git config user.email "${commitAuthorEmail}"
  git config credential.helper "store --file=.git/credentials"

  echo "https://${DINO_BUILDS_TOKEN}@bitbucket.org" > .git/credentials

  echo "Git configuration has been updated to match the last commit author. Publishing now.."

  git add -A
  git commit --allow-empty -m "${buildCommitMessage}"
  git tag "${buildTagName}"
  git push origin ${branchName} --tags --force

  echo "Published package artifacts for ${packageName}#${buildVersionName} into ${branchName}"
}

for ((i = 0; i < ${#PACKAGES[@]}; i++)); do
  packageName=${PACKAGES[${i}]}
  packageRepo=${REPOSITORIES[${i}]}

  # Publish artifacts of the current package. Run publishing in a sub-shell to avoid working
  # directory changes.
  (publishPackage ${packageName} ${packageRepo})
done
```

## File: jenkins/publish-docs-content.sh
```bash
#!/bin/bash

# Publish dino docs assets to the dino-docs-content repo
# dino.io will pull from this assets repo to get the latest docs

# The script should immediately exit if any command in the script fails.
set -e

cd "$(dirname $0)/../../"

if [ -z ${DINO_BUILDS_TOKEN} ]; then
  echo "Error: No access token for Bitbucket could be found." \
       "Please set the environment variable 'DINO_BUILDS_TOKEN'."
  exit 1
fi

# Path to the project directory.
projectPath="$(pwd)"

# Path to the cloned docs-content repository.
docsContentPath="${projectPath}/tmp/dino-docs-content"

# Path to the build output of the Bazel "@dino/dino-examples" NPM package.
# Note: When changing this, also change the path in `scripts/build-docs-content.js`.
examplesPackagePath="${projectPath}/dist/dino-examples"

# Git clone URL for the dino-docs-content repository.
docsContentRepoUrl="https://${DINO_BUILDS_TOKEN}@bitbucket.org/gnucoop/dino-docs-content"
docsContentRepoUrlLog="https://bitbucket.org/gnucoop/dino-docs-content"

# Current version of Dino from the package.json file
buildVersion=$(node -pe "require('./package.json').version")

# Name of the branch that is currently being deployed.
branchName=${CIRCLE_BRANCH:-'master'}

# Additional information about the last commit for docs-content commits.
commitSha=$(git rev-parse --short HEAD)
commitAuthorName=$(git --no-pager show -s --format='%an' HEAD)
commitAuthorEmail=$(git --no-pager show -s --format='%ae' HEAD)
commitMessage=$(git log --oneline -n 1)

buildVersionName="${buildVersion}-sha-${commitSha}"
buildTagName="${branchName}-${commitSha}"
buildCommitMessage="${branchName} - ${commitMessage}"

echo "Starting deployment of the docs-content for ${buildVersionName} in ${branchName}"

# Remove the docs-content repository if the directory exists
rm -Rf ${docsContentPath}

echo "Starting cloning process of ${docsContentRepoUrlLog} into ${docsContentPath}.."

if [[ $(git ls-remote --heads ${docsContentRepoUrl} ${branchName}) ]]; then
  echo "Branch ${branchName} already exists. Cloning that branch."
  git clone ${docsContentRepoUrl} ${docsContentPath} --depth 1 --branch ${branchName}

  cd ${docsContentPath}
  echo "Cloned repository and switched into the repository directory (${docsContentPath})."
else
  echo "Branch ${branchName} does not exist yet."
  echo "Cloning default branch and creating branch '${branchName}' on top of it."

  git clone ${docsContentRepoUrl} ${docsContentPath} --depth 1
  cd ${docsContentPath}

  echo "Cloned repository and switched into directory. Creating new branch now.."

  git checkout -b ${branchName}
fi

# Remove everything inside of the docs-content repository.
rm -Rf ${docsContentPath}/*

echo "Removed everything from the docs-content repository. Copying package output.."

# Copy the package output to the docs-content repository.
cp -R ${examplesPackagePath}/* ${docsContentPath}

echo "Successfully copied package output into the docs-content repository."

if [[ $(git ls-remote origin "refs/tags/${buildTagName}") ]]; then
  echo "Skipping publish of docs-content because tag is already published. Exiting.."
  exit 0
fi

# Setup the Git configuration
git config user.name "$commitAuthorName"
git config user.email "$commitAuthorEmail"
git config credential.helper "store --file=.git/credentials"

echo "https://${DINO_BUILDS_TOKEN}@bitbucket.org" > .git/credentials

echo "Credentials for docs-content repository are now set up. Publishing.."

git add -A
git commit --allow-empty -m "${buildCommitMessage}"
git tag "${buildTagName}"
git push origin ${branchName} --tags --force

echo "Published docs-content for ${buildVersionName} into ${branchName} successfully"
```

## File: jenkins/publish-snapshots.sh
```bash
#!/bin/bash

# This script should fail if one of the individual publish scripts fails.
set -e

# Go to project directory.
cd $(dirname ${0})/../..

# Deploy build artifacts to the Bitbucket build repositories. The release output is already
# fetched from the Jenkins workspace storage.
./scripts/jenkins/publish-build-artifacts.sh

# Deploy the docs content to the Bitbucket repository. We don't want to build the examples
# package here again because it's already fetched from the Jenkins workspace storage.
# ./scripts/jenkins/publish-docs-content.sh
```

## File: model-schema/model-schema.mjs
```javascript
export const modelSchemaTest = async params => {
  let {source, expose, topRef, jsDoc, accept} = params;
if (expose == null)
⋮----
VariableDeclarator: astPath => {
      const {id, init} = astPath.node;
      if (
        id.type === 'Identifier' &&
        id.name == 'VERSION' &&
        init != null &&
        init.type == 'NumericLiteral'
)
```

## File: model-schema/tsconfig-generate.json
```json
{
  "compilerOptions": {
      "noEmit": true,
      "experimentalDecorators": true,
      "skipLibCheck": true,
      "strict": true,
      "target": "es2015",
      "module": "esnext",
      "moduleResolution": "node",
      "lib": ["es5", "es2017", "es2020", "dom"],
      "baseUrl": ".",
      "types": [],
      "paths": {
        "*": ["../../node_modules/*"],
        "@dino/core/*": ["../../projects/core/*"]
      }
  },
  "include": [
    "../projects/core/forms/**/*.ts"
  ],
}
```

## File: postinstall/build-karma-polyfills.mjs
```javascript
export const buildKarmaPolyfills = async () =>
```

## File: postinstall/index.mjs
```javascript

```

## File: postinstall/karma-polyfills-source.js
```javascript

```

## File: postinstall/patch-rxdb.mjs
```javascript
export const patchRxDb = () =>
⋮----
// const patchFile = 'node_modules/rxdb/dist/es/plugins/replication/index.js';
```

## File: release/build-packages.mjs
```javascript
const buildPackage = async (pkg, prod) =>
⋮----
export const buildPackages = async (packages, prod) =>
⋮----
const failure = (error) =>
```

## File: release/changelog.mjs
```javascript
const baseContent = () =>
⋮----
export const changelog = async () =>
```

## File: release/index.mjs
```javascript

```

## File: utils/find-subpackages.mjs
```javascript
export const findSubpackages = (packages) =>
```

## File: utils/index.mjs
```javascript

```

## File: utils/scan-dir.mjs
```javascript
export const scanDir = (dirPath) =>
```

## File: utils/silent-exec.mjs
```javascript
export const silentExec = () =>
```

## File: utils/version-replacements.mjs
```javascript
export const versionReplacements = packages => {
  const mainPackage = JSON.parse(readFileSync('package.json', 'utf-8'));
```

## File: approve-model-schema.mjs
```javascript
const approveModelSchema = async modelDef => {
if (modelDef == null || typeof modelDef !== 'string')
```

## File: build-config.mjs
```javascript

```

## File: build-docs.mjs
```javascript
const buildDocs = async () =>
```

## File: build-theme.mjs
```javascript
export const buildTheme = async () =>
```

## File: build.mjs
```javascript
const build = async () =>
```

## File: deploy-dev-app.js
```javascript
/**
 * Script that builds the dev-app as a static web package that will be
 * deployed to the currently configured Firebase project.
 */
⋮----
// ShellJS should throw if any command fails.
⋮----
/** Path to the project directory. */
⋮----
// Go to project directory.
⋮----
// Build web package output.
```

## File: e2e-ci.mjs
```javascript
const runE2eApp = async () =>
⋮----
const runPackageE2e = async pkg => {
  const res = shell.exec(`NO_COLOR=1 yarn -s ng run ${pkg}:cypress-run-ci`, {
    async: true,
    silent: false,
  });
⋮----
const e2eCi = async () =>
```

## File: local-pipeline.sh
```bash
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
```

## File: model-schema-tests.mjs
```javascript
const runTests = async () =>
```

## File: postinstall.mjs
```javascript

```

## File: prepare-release.mjs
```javascript
const prepareRelease = async () =>
```

## File: publish.mjs
```javascript
const publish = async () =>
```

## File: release.mjs
```javascript
const release = async () =>
```

## File: tsconfig.json
```json
// A lot of the scripts under `tools` are run manually, rather than on the CI. As such, it's easy
// to miss compilation errors in them. This config is used to verify the files on the CI. Note that
// the compiler options are somewhat loose, which is intentional in order to mimic the default
// options used by `ts-node` when running the scripts.
{
  "include": ["./**/*.ts"],
  "compilerOptions": {
    "outDir": "../dist/scripts",
    "target": "es2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "lib": ["es2020"],
    "skipLibCheck": true,
    // Don't emit to the file system, because we only want to check for compilation errors.
    "noEmit": true,
    "downlevelIteration": true
  }
}
```