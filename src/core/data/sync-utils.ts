/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {RxCollection, RxGraphQLReplicationQueryBuilder} from 'rxdb';

import {DataServiceSyncOptions} from './data-service-config';
import {Model} from './model';
import {PullQueryExtraParams} from './pull-query-extra-params';
import {PushQueryExtraParams} from './push-query-extra-params';

const MAX_ITERATIONS = 100;
const SYNC_IGNORED_PROPERTIES = ['_rev', '_attachments'];

/**
 * Builds a GraphQL query used to pull documents belonging to a given collection in pull sync.
 * @param collection The collection to be synced.
 * @param options The data service sync options.
 * @param params Option extra parameters to be included in the query.
 */
export function pullQueryBuilder(
    collection: RxCollection, options: DataServiceSyncOptions,
    extraParams?: PullQueryExtraParams): RxGraphQLReplicationQueryBuilder {
  const batchSize = options.batchSize;
  return (doc: Model) => {
    if (doc == null) {
      doc = {
        id: '',
        created_at: new Date(0).toUTCString(),
        updated_at: new Date(0).toUTCString(),
      };
    }
    extraParams = extraParams || {};
    const where = {...(extraParams.where || {}), updated_at: {_gt: `${doc.updated_at}`}};
    const fields = extraParams.fields || getCollectionFields(collection);
    const query = `{
      ${collection.name}(
        where: ${JSON.stringify(where)},
        limit: ${batchSize},
        order_by: [{updated_at: asc}]
      ) {
        ${fields.join(' ')}
      }
    }`;
    const variables = {};
    return {query, variables};
  };
}

/**
 * Builds a GraphQL query used to push documents belonging to a given collection in pull sync.
 * @param collection The collection to be synced.
 * @param params Option extra parameters to be included in the query.
 */
export function pushQueryBuilder<T extends Model = Model>(
    collection: RxCollection,
    extraParams?: PushQueryExtraParams): RxGraphQLReplicationQueryBuilder {
  const ucfCollectionName = ucfirst(collection.name);
  return (doc: T) => {
    if (extraParams && extraParams.docModifier) {
      doc = extraParams.docModifier(doc);
    }
    const query = `
      mutation Insert${ucfCollectionName}($doc: [${collection.name}_insert_input!]!) {
        insert_${collection.name}(
          objects: $doc
        ){
          returning {id}
        }
      }
    `;
    const variables = {doc};
    return {query, variables};
  };
}

/**
 * Builds a change subscription query for a given collection.
 * @param collection The collection.
 */
export function subscriptionQueryBuilder(collection: RxCollection): string {
  const ucfCollectionName = ucfirst(collection.name);
  return `
    subscription on${ucfCollectionName}Changed {
      ${collection.name} {
        id
      }
    }
  `;
}

/**
 * Returns the collections list ordered for sync purposes. First you will find collections with no
 * external references, then all others collections with external references already present in the
 * sorted list.
 * @param collections The list of collections to sort.
 */
export function syncOrderedCollections(collections: RxCollection[]): RxCollection[] {
  let toSort = [...collections];
  let sorted = [] as RxCollection[];
  let iteration = 0;
  let deps = [] as string[];
  while (iteration < MAX_ITERATIONS) {
    const {satisfied, unsatisfied} = findSatisfiedDeps(toSort, deps);
    toSort = unsatisfied;
    sorted = [...sorted, ...satisfied];
    deps = sorted.map(collection => collection.name);
    iteration++;
  }
  return sorted;
}

/**
 * Returns true if the all the collection depencencies newDeps are already satisfied.
 * @param newDeps Collection dependencies to be checked.
 * @param deps Current satisfied dependencies.
 */
function depsAreSatisfied(newDeps: string[], deps: string[]): boolean {
  for (let dep of newDeps) {
    if (deps.indexOf(dep) === -1) {
      return false;
    }
  }
  return true;
}

/**
 * Returns an array of collection names referenced by the given properties object.
 * @param properties
 */
function findDeps(properties: {[key: string]: any}): string[] {
  const deps = [] as string[];
  for (let key in properties) {
    const property = properties[key];
    if (isObject(property)) {
      if (property.hasOwnProperty('ref') && property.ref != null) {
        deps.push(property.ref);
      } else {
        const propDeps = findDeps(property);
        for (let propDep of propDeps) {
          if (deps.indexOf(propDep) === -1) {
            deps.push(propDep);
          }
        }
      }
    }
  }
  return deps;
}

/**
 * Given an array of collections and an array of satisfied depencies returns an object containing
 * the input collections split in two arrays, one containing all the collections whose dependencies
 * are already satisfied, and the other containing all the collections that have unmet dependencies.
 * @param collections The input array of collections.
 * @param deps The dependencies already satisfied.
 */
function findSatisfiedDeps(collections: RxCollection[], deps: string[]):
    {satisfied: RxCollection[], unsatisfied: RxCollection[]} {
  const unsatisfied = [] as RxCollection[];
  const satisfied = [] as RxCollection[];
  collections.forEach(collection => {
    const collectionDeps = findDeps(collection.schema.jsonSchema.properties);
    if (depsAreSatisfied(collectionDeps, deps)) {
      satisfied.push(collection);
    } else {
      unsatisfied.push(collection);
    }
  });
  return {satisfied, unsatisfied};
}

/**
 * Returns an array containing the input collection field names.
 * @param collection The input collection.
 */
function getCollectionFields(collection: RxCollection): string[] {
  return Object.keys(collection.schema.jsonSchema.properties)
      .filter(property => SYNC_IGNORED_PROPERTIES.indexOf(property) === -1);
}

/**
 * Returns true if the parameter is a plain object.
 * @param variable The parameter to test.
 */
function isObject(variable: any): boolean {
  return Object.prototype.toString.call(variable) === '[object Object]';
}

/**
 * Returns a string with the first character of str capitalized, if that character is alphabetic.
 * @param str The input string.
 */
function ucfirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
