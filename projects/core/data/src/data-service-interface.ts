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

import {EventEmitter} from '@angular/core';
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
 * Health of the connection to the backend, for user-facing feedback.
 *
 * - `connected`: everything is working (the optimistic default).
 * - `reconnecting`: a failure was detected and recovery is under way — the
 *   websocket is being rebuilt, or a token is being refreshed and the operation
 *   retried. The user should be told, because data may be briefly stale.
 * - `failed`: recovery was attempted and did not work, so the app will not heal
 *   on its own. Typically an expired session that could not be refreshed.
 */
export type DataConnectionState = 'connected' | 'reconnecting' | 'failed';

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
   * Emits 'started' when collection initialization begins and 'completed' when
   * it finishes. In offline mode this is driven by the sync/replication
   * lifecycle; in online mode there is no local sync, so completion is
   * signalled as soon as collections are registered.
   */
  readonly collectionsInitialized: EventEmitter<'started' | 'completed'>;

  /**
   * Emits true once every registered collection has completed its first
   * replication. This is a **replication** concept: use `dataReady` instead when
   * all you need is "data can be queried now".
   */
  readonly firstReplicationComplete: Observable<boolean>;

  /**
   * Emits true once collections are initialised and data can be queried.
   *
   * This is the signal features should gate their startup on. Offline it follows
   * the first replication; online there is no replication, so it follows
   * collection registration and authentication. Gating on replication-specific
   * signals instead means a feature never starts in online mode.
   */
  readonly dataReady: Observable<boolean>;

  /**
   * Health of the connection to the backend, so the UI can be honest about
   * recovery instead of silently showing stale or empty data.
   */
  readonly connectionState: Observable<DataConnectionState>;

  /**
   * Names of the collections currently having synchronization problems.
   * Always empty online (nothing is synchronized).
   */
  readonly problemSyncing: Observable<string[]>;

  /**
   * Emits when a replication cycle completes. Never emits online.
   */
  readonly replicationCycleComplete: Observable<void>;

  /**
   * Emits when a recoverable synchronization error occurs. Never emits online.
   */
  readonly syncErrorEvt: Observable<SyncErrorEvent>;

  /**
   * Emits when synchronization has failed for good. Never emits online.
   */
  readonly couldNotSyncEvt: Observable<SyncErrorEvent>;

  /**
   * Forces a replication run. A no-op online, where reads always hit the server.
   * @param collectionName? Restricts the run to a single collection.
   */
  runSync(collectionName?: string): void;

  /**
   * Emits true once the named collection has completed its first sync. In
   * online mode (no local replication) this emits true immediately.
   * @param name The collection name.
   */
  collectionFirstSyncCompleted(name: string): Observable<boolean>;

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
