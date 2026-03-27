/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {RxDocument} from 'rxdb';
import {clone} from './clone';
import {Model} from './model';
import {from, of as obsOf} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {deepCopy} from '@ajf/core/utils';

/**
 * Populates all references to external collections in RxDocuments
 * @param docs RxDocument or RxDocument array
 * @returns The document or documents with populated refs
 */
export function populateDocRefs<T extends Model = Model>(docs: RxDocument<T>[]): RxDocument<T>[];
export function populateDocRefs<T extends Model = Model>(docs: RxDocument<T>): RxDocument<T>;
export function populateDocRefs<T extends Model = Model>(
  docs: RxDocument<T>[] | RxDocument<T>,
): RxDocument<T>[] | RxDocument<T> {
  const isDocsArray = Array.isArray(docs);
  const documents = isDocsArray ? [...docs] : [docs];
  const populatedDocs = documents.map(doc => {
    let refProps = {};
    for (let prop in doc) {
      if (prop.includes('_ref_id')) {
        const propKey = prop.replace('_ref_id', '') as keyof RxDocument<T>;
        let refProp;
        try {
          refProp = {[propKey]: from(doc.populate(prop)).pipe(shareReplay(1))};
        } catch (_) {
          refProp = {[propKey]: obsOf(null)};
        }
        refProps = {...refProps, ...refProp};
      }
    }
    const popDoc = {...deepCopy(doc), ...refProps} as RxDocument<T>;
    return popDoc;
  });

  return isDocsArray ? populatedDocs : populatedDocs[0];
}

/**
 * Converts an array of RxDocuments into an array of T objects
 * @param docs RxDocument[]
 * @returns The converted objects
 */
export function rxDocsToJson<T extends Model = Model>(docs: RxDocument<T>[]): T[] {
  let docsJson: T[] = [];
  docs.forEach(doc => {
    docsJson.push(clone(doc.toJSON()) as T);
  });
  return docsJson;
}

/**
 * Adds a nested object property and an optional value to an object
 * @param baseObj The object to modify
 * @param props The property names tree. The last one is the name of nested property to be added
 * @param value? The optional value to set for the added property.
 * @param options? The optional regex flags.
 * @returns The modified object
 */
export function addNestedProps(
  baseObj: {[key: string]: any},
  props: string[],
  value?: any,
  options?: any,
): {[key: string]: string | {}} {
  let lastProp = value !== undefined ? props.pop() : false;

  for (const key of props) {
    if (!baseObj[key] || typeof baseObj[key] !== 'object') {
      baseObj[key] = {};
    }
    baseObj = baseObj[key];
  }

  if (lastProp) {
    baseObj[lastProp] = value;
    if (options != null && lastProp === '$regex') {
      baseObj['$options'] = options ?? 'i';
    }
  }

  return baseObj;
}
