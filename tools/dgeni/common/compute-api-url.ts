import {Document} from 'dgeni';
import {ModuleInfo} from '../processors/entry-point-grouper';

/**
 * Computes an URL that refers to the given API document in the docs. Note that this logic
 * needs to be kept in sync with the routes from the material.angular.io CLI project.
 */
export function computeApiDocumentUrl(apiDoc: Document, moduleInfo: ModuleInfo): string {
  // Base URL for the given package. This is currently either:
  //   1) dino.io/core
  //   2) dino.io/ionic
  //   3) dino.io/material
  const baseUrl = moduleInfo.packageName;
  return `${baseUrl}/${moduleInfo.entryPointName}/api#${apiDoc.name}`;
}
