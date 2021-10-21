#!/bin/bash

PACKAGES=(core
  ionic
  material)
PWD=`pwd`
BASE_DIR="${PWD}/dist/releases"
FIX_VERSION_SCRIPT="${PWD}/scripts/fix-version.js"

GIT_BRANCH=master

CUR_TAG=`git describe --abbrev=0 --tags --exact-match 2> /dev/null`

if [[ -z "${CUR_TAG}" ]]; then
  echo "No version tag defined"
  exit 0
fi

PUBLISH_TAG=$1
if [[ -z "${PUBLISH_TAG}" ]]; then
  PUBLISH_TAG=latest
fi

TAG_VERSION=`yarn -s semver ${CUR_TAG}`

for PACKAGE in ${PACKAGES[@]}
do
  PACKAGE_DIR="${BASE_DIR}/${PACKAGE}"
  EXISTING=`npm show @dino/${PACKAGE}@${TAG_VERSION}`
  if [[ -z "${EXISTING}" ]]; then
    cp "${PWD}/.npmrc" $PACKAGE_DIR
    cd $PACKAGE_DIR
    "${FIX_VERSION_SCRIPT}" "${PACKAGE_DIR}/package.json" "${TAG_VERSION}"
    npm publish --tag ${PUBLISH_TAG}
  else
    echo "Skipping deploy of ${PACKAGE} package"
  fi
done
