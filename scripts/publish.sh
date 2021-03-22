#!/bin/bash

PACKAGES=(core
  material)
PWD=`pwd`
BASE_DIR="${PWD}/dist/releases"

GIT_BRANCH=master

CUR_TAG=`git describe --abbrev=0 --tags --exact-match 2> /dev/null`
if [[ -z $CUR_TAG ]]; then
  echo "Skipping deploy of ${PACKAGE} package"
else
  TAG_VERSION=`yarn semver ${CUR_TAG}`

  for PACKAGE in ${PACKAGES[@]}
  do
    PACKAGE_DIR="${BASE_DIR}/${PACKAGE}"
    CURRENT_VERSION=`npm show @dewco/${PACKAGE} version`
    echo $CURRENT_VERSION
    echo $TAG_VERSION
    if [[ "${CURRENT_VERSION}" == "${TAG_VERSION}" ]]; then
      echo "Skipping deploy of ${PACKAGE} package"
    else
      cp "${PWD}/.npmrc" $PACKAGE_DIR
      cd $PACKAGE_DIR
      npm publish
    fi
  done
fi
