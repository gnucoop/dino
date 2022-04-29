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
