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

import {Observable} from 'rxjs';
import {
  DataCreateCollectionRequest,
  PullQueryContextChecks,
} from './data-create-collection-request';
import {DataBulkInsertRequest} from './data-bulk-insert-request';
import {DataFindRequest} from './data-find-request';
import {DataGetRequest} from './data-get-request';
import {DataInsertRequest} from './data-insert-request';
import {DataServiceConfig} from './data-service-config';
import {DataUpsertRequest} from './data-upsert-request';
import {Model} from './model';
import {RxError, RxTypeError} from 'rxdb';

/**
 * Event fired when collection data changes.
 */
export interface CollectionChangedEvent {
  /**
   * Change event time.
   */
  timestamp: number;

  /**
   * Collection name.
   */
  collection: string;

  /**
   * The Action triggering the event.
   */
  action?: string;

  /**
   * The total docs of the changed collection
   */
  count?: number;
}

/**
 * Event fired when a replication state throws an error.
 */
export interface SyncErrorEvent {
  /**
   * Collection name.
   */
  collection: string;

  /**
   * Number of attempts to resync the collection.
   * It's set to 0 when the collection is synced successfully.
   * It's set to -1 when the collection keeps raising exceptions after the max number of sync retries.
   */
  retrySyncAttempts: number;

  /**
   * The replication state error message
   */
  error?: RxError | RxTypeError;
}

/**
 * The result of a bulk insert operation.
 */
export interface BulkInsertResult<T extends Model = Model> {
  /**
   * List of successfully inserted documents
   */
  success: T[];
  /**
   * List of errors
   */
  error: any[];
}

/**
 * Service that allows to interact with the database.
 */
export interface IDataService {
  /**
   * True when the Syncing process is currently operating
   * (A replication cycle is undergoing)
   */
  readonly isSyncing: Observable<boolean>;

  readonly config: DataServiceConfig;

  readonly collectionChanged: Observable<CollectionChangedEvent>;

  /**
   * Get an object from the database.
   * Throws and error if the collection does not exist.
   * @param params The get request parameters.
   */
  get<T extends Model, R extends T>(params: DataGetRequest): Observable<R | null>;

  /**
   * Insert a new object into the database.
   * Throws and error if the collection does not exist.
   * @param params The insert request parameters.
   */
  insert<T extends Model, R extends T>(params: DataInsertRequest<T>): Observable<R | null>;

  /**
   * Insert multiple objects into the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk insert request parameters.
   */
  bulkInsert<T extends Model = Model, R extends T = T>(
    params: DataBulkInsertRequest<T>,
  ): Observable<BulkInsertResult<R>>;

  /**
   * Update multiple objects in the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk update request parameters.
   * @param update The updated fields set.
   */
  bulkUpdate<T extends Model = Model, R extends T = T>(
    params: DataFindRequest<T>,
    update: Partial<T>,
  ): Observable<R[]>;

  update<T extends Model = Model, R extends T = T>(
    collectionName: string,
    doc: R,
    updateData: Partial<R>,
  ): Observable<R | null>;

  /**
   * Insert a new object if it does not exist within the collection, otherwise it will overwrite it.
   * Throws and error if the collection does not exist.
   * @param params The upinsert request parameters.
   */
  upsert<T extends Model = Model, R extends T = T>(
    params: DataUpsertRequest<T>,
  ): Observable<R | null>;

  /**
   * Get multiple documents selected by a mango-style query.
   * Throws and error if the collection does not exist.
   * @param params The find request parameters.
   */
  find<T extends Model = Model, R extends T = T>(params: DataFindRequest<T>): Observable<R[]>;

  /**
   * Create a collection in the local database from a JSON schema
   * and sets up the GraphQL sync.
   * @param params The create collection request parameters.
   */
  createCollection(
    params: DataCreateCollectionRequest,
    pullQueryContextChecks?: PullQueryContextChecks,
  ): Observable<boolean>;

  /**
   * Destroy an existing collection in the local database.
   * Throws and error if the collection does not exist.
   * @param collectionName The name of the collection to destroy.
   */
  destroyCollection(collectionName: string): Observable<boolean>;
}
