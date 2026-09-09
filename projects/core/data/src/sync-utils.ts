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

import {isDevMode} from '@angular/core';
import {
  lastOfArray,
  RxCollection,
  RxDocumentData,
  RxGraphQLReplicationPullQueryBuilder,
  RxGraphQLReplicationPushQueryBuilder,
  RxReplicationWriteToMasterRow,
} from 'rxdb';
import {PullQueryContextChecks} from './data-create-collection-request';
import {PermissionContext} from './data-permission-interface';

import {DataServiceSyncOptions} from './data-service-config';
import {Model} from './model';
import {PullGrantsDiff} from './pull-grants';
import {PullQueryExtraParams} from './pull-query-extra-params';
import {PushQueryExtraParams} from './push-query-extra-params';

const MAX_ITERATIONS = 100;
const SYNC_IGNORED_PROPERTIES = ['_rev', '_attachments', '_id', '_meta'];
const UPDATE_IGNORED_PROPERTIES = [...SYNC_IGNORED_PROPERTIES, 'id'];

/**
 * Builds a GraphQL query used to pull documents belonging to a given collection in pull sync.
 * @param collection The collection to be synced.
 * @param options The data service sync options.
 * @param params Option extra parameters to be included in the query.
 */
export function pullQueryBuilder<T extends Model = Model>(
  collection: RxCollection,
  options: DataServiceSyncOptions,
  extraParams?: PullQueryExtraParams,
): RxGraphQLReplicationPullQueryBuilder<RxDocumentData<T>> {
  return (doc: RxDocumentData<T> | null | undefined) => {
    /**
     * If there's no checkpoint document pulled, we start from the beginning.
     * Otherwise, pull happens for all docs updated during the month before the checkpoint.
     */
    let docUpdatedAt: string;
    if (doc == null || doc == undefined) {
      docUpdatedAt = new Date(0).toUTCString();
    } else {
      const docUpdate: Date = new Date(doc.updated_at);
      docUpdatedAt = docUpdate.toUTCString();
    }
    extraParams = extraParams || {};
    const currentChecks = extraParams.where || {};
    const sinceCheckpoint = {updated_at: {_gte: `${docUpdatedAt}`}};
    // Without a backfill this is what it has always been: the current checks, and
    // everything changed since the checkpoint.
    //
    // With one, the checkpoint condition moves inside an `_or` that also admits the
    // documents just granted, and the whole thing stays inside the `_and` of the
    // current checks. A document has to satisfy the permissions either way: the
    // backfill widens what the checkpoint hides, never what the permissions hide.
    const where =
      extraParams.backfillWhere != null
        ? {
            ...currentChecks,
            _and: [
              ...((currentChecks as {_and?: any[]})._and || []),
              {_or: [sinceCheckpoint, extraParams.backfillWhere]},
            ],
          }
        : {
            ...currentChecks,
            ...sinceCheckpoint,
          };
    const fields = extraParams.fields || getCollectionFields(collection);
    const query = `{
        ${collection.name}(
          where: ${JSON.stringify(where)},
          order_by: [{updated_at: asc}]
        ) {
          ${fields.join(' ')}
        }
      }`;
    const unquotedQuery = query.replace(/"([^"]+)":/g, '$1:');
    const variables = {};
    return {query: unquotedQuery, variables};
  };
}

/**
 * The checkpoint used to resume a pull replication.
 */
export interface PullCheckpoint {
  id: string;
  updated_at: string;
}

/**
 * The checkpoint a replication starts from when nothing has been pulled yet.
 */
export function startingPullCheckpoint(): PullCheckpoint {
  return {id: '', updated_at: new Date(0).toUTCString()};
}

/**
 * Modifies the GraphQl server response before it's processed by rxDb and synced into the client,
 * by adding a checkpoint from the last updated pulled document.
 *
 * An empty response means "nothing new since the checkpoint we asked from", so that same
 * checkpoint is handed back. Returning the starting checkpoint instead would rewind the
 * replication to the epoch, and the next pull would re-download the whole collection - which is
 * the steady state of a synced app, so the waste would repeat on every replication cycle.
 * @param plainResponse The graphql server response
 * @param requestCheckpoint The checkpoint the pull was requested from, when available
 * @returns An object with all documents and a checkpoint
 */
export function pullResponseModifier<T extends Model = Model>(
  plainResponse: RxDocumentData<T>[],
  requestCheckpoint?: PullCheckpoint | null,
): {
  documents: RxDocumentData<T>[];
  checkpoint: PullCheckpoint;
} {
  const docs = plainResponse;
  const lastDoc = lastOfArray(docs);
  if (docs.length === 0 || lastDoc == undefined) {
    return {
      documents: docs,
      checkpoint:
        requestCheckpoint != null && requestCheckpoint.updated_at != null
          ? requestCheckpoint
          : startingPullCheckpoint(),
    };
  }
  // The response is ordered by `updated_at` ascending, so the last document is the
  // newest one the page carries. A backfill can fill a page with documents older than
  // the checkpoint - they were granted, not changed - and taking the last one then
  // would rewind the replication and re-download what is already here. The checkpoint
  // only ever moves forward.
  const lastCheckpoint: PullCheckpoint = {id: lastDoc.id, updated_at: lastDoc.updated_at};
  if (
    requestCheckpoint != null &&
    requestCheckpoint.updated_at != null &&
    new Date(lastCheckpoint.updated_at).getTime() < new Date(requestCheckpoint.updated_at).getTime()
  ) {
    return {documents: docs, checkpoint: requestCheckpoint};
  }
  return {documents: docs, checkpoint: lastCheckpoint};
}

/**
 * Builds a GraphQL query used to push documents belonging to a given collection in pull sync.
 * @param collection The collection to be synced.
 * @param extraParams Option extra parameters to be included in the query.
 */
export function pushQueryBuilder<T extends Model = Model>(
  collection: RxCollection,
  extraParams?: PushQueryExtraParams,
): RxGraphQLReplicationPushQueryBuilder {
  const ucfCollectionName = ucfirst(collection.name);
  const updateFields = getCollectionUpdateFields(collection);
  return (docs: RxReplicationWriteToMasterRow<RxDocumentData<T>>[]) => {
    if (docs == null || docs.length <= 0 || docs[0] == null) {
      return {query: '', variables: {}};
    }
    if (isDevMode()) {
      console.log(
        `INSERT ${collection.name} (${docs.length}):`,
        docs,
        docs[0].assumedMasterState?.updated_at,
      );
    }
    // let documents: RxReplicationWriteToMasterRow<T>[] = docs;
    // documents.forEach(dc => delete dc['_meta']);
    extraParams = extraParams || {};
    const where = {
      ...(extraParams.where || {}),
      updated_at: {_lte: `${docs[0].newDocumentState.updated_at}`},
    };
    const newDocs = docs.map(dc => {
      if (extraParams != null && extraParams.docModifier) {
        return extraParams.docModifier(dc.newDocumentState);
      }
      return dc.newDocumentState;
    });

    const query = `
      mutation Insert${ucfCollectionName}($docs: [${collection.name}_insert_input!]!) {
        insert_${collection.name}(
          objects: $docs,
          on_conflict: {
            constraint: ${collection.name}_pkey,
            update_columns: [${updateFields.join(', ')}],
            where: ${JSON.stringify(where)}
        })
        {
          returning {id}
        }
      }
    `;
    const unquotedQuery = query.replace(/"([^"]+)":/g, '$1:');
    const variables = {'docs': newDocs};
    return {query: unquotedQuery, variables};
  };
}

/**
 * Modifies the GraphQl server response after push sync has sent data.
 *
 * The replication protocol reads the return value of the push handler as the list of
 * CONFLICTING master documents, and resolves each of them by overwriting the local document
 * with the master state it was handed. The upsert's `returning {id}` lists the rows that
 * WERE written, i.e. the ones that did not conflict, so handing them back made rxdb replace
 * every successfully pushed document with `{id}` alone, losing all the other fields until
 * the next pull happened to rewrite it. Rows the server refused (skipped by the
 * `updated_at: {_lte: ...}` guard of the upsert) are absent from `returning`, so they were
 * never reported as conflicts either way: an empty list is the correct value here.
 * @param _plainResponse The graphql server response, not needed to detect conflicts
 * @returns An empty array, meaning this push had no conflicts to resolve
 */
export function pushResponseModifier<T extends Model = Model>(
  _plainResponse: RxDocumentData<T>[],
): RxDocumentData<T>[] {
  return [];
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
          updated_at
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
 * Generates the 'where' attribute object of a PullQueryExtraParams object
 * @param context The current permission context
 * @param checks The attributes of the context on which to perform the checks
 */
export function generateSyncPullChecks(
  context: PermissionContext,
  checks: PullQueryContextChecks,
): {_and: {[key: string]: any}[]} {
  let where: {_and: {[key: string]: any}[]} = {_and: []};
  for (let checkObj of checks) {
    switch (checkObj.checkName) {
      case 'user_data':
        if (checkObj.checkKey === 'notification') {
          const ntf = generateSyncPullNotificationsChecks(context[checkObj.checkName].id);
          where._and.push(...ntf);
        }
        break;
      case 'user_metrics':
        const mts = generateSyncPullMetricChecks(context[checkObj.checkName], checkObj.checkKey);
        where._and.push(...mts);
        break;
      case 'user_form_schemas':
      case 'user_report_schemas':
        const fschemas = generateSyncPullSchemaChecks(
          context[checkObj.checkName],
          checkObj.checkKey,
        );
        where._and.push(...fschemas);
        break;
      default:
        break;
    }
  }
  return where;
}

/**
 * Builds the where condition asking for the documents a collection is now allowed to
 * see and did not ask for before, because they were granted rather than changed.
 *
 * The conditions are joined with `_or`, and that is the whole point: the current filter
 * joins the dimensions with `_and` - a form data has to pass the schema check *and* the
 * check of every metric type - which is right for "what may I see", and wrong for "what
 * has just been opened to me". Reusing {@link generateSyncPullChecks} on the diff would
 * ask for the documents that sit in a new schema *and* in a new project *and* in a new
 * area at once: almost always none of them.
 *
 * @param diff The ids granted since the last recorded session.
 * @param checks The collection's context checks, which say which field carries each
 * dimension for this collection.
 * @returns The where condition, or null when nothing this collection is filtered by has
 * widened - in which case the collection gets no backfill at all.
 */
export function generateBackfillWhere(
  diff: PullGrantsDiff,
  checks: PullQueryContextChecks,
): {_or: {[key: string]: any}[]} | null {
  const conditions: {[key: string]: any}[] = [];

  for (const checkObj of checks) {
    switch (checkObj.checkName) {
      case 'user_form_schemas':
      case 'user_report_schemas': {
        const ids =
          checkObj.checkName === 'user_form_schemas' ? diff.formSchemas : diff.reportSchemas;
        if (ids.length) {
          // No `checkKey` means the collection *is* the schema collection, matched on
          // its own id; with one, it is a collection referencing the schema.
          conditions.push({[checkObj.checkKey ?? 'id']: {_in: ids}});
        }
        break;
      }
      case 'user_metrics': {
        if (checkObj.checkKey) {
          // The metric collection itself: `checkKey` names the metric type, and the
          // documents are matched on their own id.
          const ids = diff.metrics[checkObj.checkKey];
          if (ids != null && ids.length) {
            conditions.push({id: {_in: ids}});
          }
          break;
        }
        // A collection referencing metrics of every type - form data, report data -
        // one condition per type that widened. No `_is_null` branch here: a document
        // with no reference was visible already, so it is not something newly granted.
        for (const metricType of Object.keys(diff.metrics)) {
          const ids = diff.metrics[metricType];
          if (ids.length) {
            conditions.push({[`${metricType}_ref_id`]: {_in: ids}});
          }
        }
        break;
      }
      default:
        break;
    }
  }

  return conditions.length ? {_or: conditions} : null;
}

/**
 * Generates 'and' conditions for notifications checks
 * @param userSchemas The context user schemas
 * @returns The conditions
 */
function generateSyncPullNotificationsChecks(userDataId: string | null): {
  [key: string]: any;
}[] {
  if (userDataId == null) {
    return [];
  }
  let whereAndConditions: {[key: string]: any}[] = [];
  const wObj: {[key: string]: any} = {
    _or: [{'recipients': {_contains: userDataId}}, {'recipients': {_contains: 'all'}}],
  };
  whereAndConditions.push(wObj);

  return whereAndConditions;
}

/**
 * Generates 'and' conditions for schemas checks
 * @param userSchemas The context user schemas
 * @returns The conditions
 */
function generateSyncPullSchemaChecks(
  userSchemas: Set<string> | null,
  checkKey?: string,
): {
  [key: string]: any;
}[] {
  if (userSchemas == null || userSchemas.has('all')) {
    return [];
  }
  let whereAndConditions: {[key: string]: any}[] = [];
  const wObj: {[key: string]: any} = {[checkKey ?? 'id']: {_in: [...userSchemas]}};
  whereAndConditions.push(wObj);

  return whereAndConditions;
}

/**
 * Generates 'and' conditions for metric checks
 * @param userMetrics The context user metrics
 * @returns The conditions
 */
function generateSyncPullMetricChecks(
  userMetrics: {[key: string]: string[]} | null,
  checkKey?: string,
): {
  [key: string]: any;
}[] {
  if (userMetrics == null) {
    return [];
  }

  let whereAndConditions: {[key: string]: any}[] = [];

  if (checkKey && userMetrics[checkKey] != null) {
    if (!userMetrics[checkKey].includes('all')) {
      const wObj: {[key: string]: any} = {
        _or: [{id: {_in: userMetrics[checkKey]}}],
      };
      whereAndConditions.push(wObj);
    }
  } else {
    const mtKeys = Object.keys(userMetrics);
    for (let mtKey of mtKeys) {
      if (!userMetrics[mtKey].includes('all')) {
        const wObj: {[key: string]: any} = {
          _or: [{[checkKey ?? `${mtKey}_ref_id`]: {_in: userMetrics[mtKey]}}],
        };
        if (!checkKey) {
          wObj['_or'].push({[`${mtKey}_ref_id`]: {_is_null: true}});
        }
        whereAndConditions.push(wObj);
      }
    }
  }

  return whereAndConditions;
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
function findSatisfiedDeps(
  collections: RxCollection[],
  deps: string[],
): {satisfied: RxCollection[]; unsatisfied: RxCollection[]} {
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
  return Object.keys(collection.schema.jsonSchema.properties).filter(
    property => SYNC_IGNORED_PROPERTIES.indexOf(property) === -1,
  );
}

/**
 * Returns an array containing the collection fields to be updated.
 * @param collection The input collection.
 */
function getCollectionUpdateFields(collection: RxCollection): string[] {
  return Object.keys(collection.schema.jsonSchema.properties).filter(
    property => UPDATE_IGNORED_PROPERTIES.indexOf(property) === -1,
  );
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
