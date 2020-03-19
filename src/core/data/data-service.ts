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

import {Inject, Injectable} from '@angular/core';
import * as pouchdbAdapterIdb from 'pouchdb-adapter-idb';
import * as pouchdbAdapterMemory from 'pouchdb-adapter-memory';
import * as RxDb from 'rxdb';
import {from, Observable, of as obsOf, throwError} from 'rxjs';
import {catchError, concatMap, mapTo, shareReplay} from 'rxjs/operators';
import {v4 as uuidv4} from 'uuid';

import {DataGetRequest} from './data-get-request';
import {DataInsertRequest} from './data-insert-request';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from './data-service-config';
import {DataUpsertRequest} from './data-upsert-request';
import {Model} from './model';

/**
 * Service that allows to interact with the local database.
 */
@Injectable({providedIn: 'root'})
export class DataService {
  private _db: Observable<RxDb.RxDatabase>;

  constructor(@Inject(DATA_SERVICE_CONFIG) config: DataServiceConfig) {
    RxDb.plugin(pouchdbAdapterIdb);
    RxDb.plugin(pouchdbAdapterMemory);
    this._db = from(RxDb.create(config.databaseCreateOptions)).pipe(shareReplay(1));
  }

  /**
   * Add an RxDb plugin
   * @param plugin The plugin to add
   */
  plugin(plugin: any): void {
    RxDb.plugin(plugin);
  }

  /**
   * Get an object from the database.
   * @param params The get request parameters.
   */
  get<T extends Model = Model>(params: DataGetRequest): Observable<RxDb.RxDocument<T>|null> {
    const {collectionName, id} = params;
    return this._db.pipe(
        concatMap(db => {
          const collection = db.collections[collectionName] as RxDb.RxCollection<T>;
          if (collection == null) {
            return throwError(new Error('Invalid collection'));
          }
          return from(collection.findOne().where('id').eq(id).exec());
        }),
    );
  }

  /**
   * Insert a new object into the database.
   * @param params The insert request parameters.
   */
  insert<T extends Model = Model>(params: DataInsertRequest<T>):
      Observable<RxDb.RxDocument<T>|null> {
    const {collectionName, object} = params;
    return this._db.pipe(
        concatMap(db => {
          const collection = db.collections[collectionName] as RxDb.RxCollection<T>;
          if (collection == null) {
            throwError(new Error('Invalid collection'));
          }
          const insertObject = {
            id: uuidv4(),
            ...object,
            created_at: new Date().toISOString(),
            updated_at: null,
          } as T;
          return from(collection.insert(insertObject))
              .pipe(
                  catchError(() => obsOf(null)),
              );
        }),
    );
  }

  /**
   * Insert a new object if it does not exist within the collection, otherwise it will overwrite it.
   * @param collectionName The object collection
   * @param object The object to upsert
   */
  upsert<T extends Model = Model>(params: DataUpsertRequest<T>):
      Observable<RxDb.RxDocument<T>|null> {
    const {collectionName, object} = params;
    return this._db.pipe(
        concatMap(db => {
          const collection = db.collections[collectionName] as RxDb.RxCollection<T>;
          if (collection == null) {
            throwError(new Error('Invalid collection'));
          }
          const insertObject = {
            id: object.id || uuidv4(),
            ...object,
            created_at: object.created_at || new Date().toISOString(),
            updated_at: object.updated_at || null,
          } as T;
          return from(collection.upsert(insertObject))
              .pipe(
                  catchError(() => obsOf(null)),
              );
        }),
    );
  }

  /**
   * Create a collection in the local database from a JSON schema.
   * @param collection The collection to create.
   */
  createCollection(collection: RxDb.RxCollectionCreator): Observable<boolean> {
    return this._db.pipe(
        concatMap(db => {
          return from(db.collection(collection))
              .pipe(
                  mapTo(true),
                  catchError(() => obsOf(false)),
              );
        }),
    );
  }

  /**
   * Destroy an existing collection in the local database.
   * @param collectionName The name of the collection to destroy.
   */
  destroyCollection(collectionName: string): Observable<boolean> {
    return this._db.pipe(
        concatMap(db => {
          const collection = db.collections[collectionName] as RxDb.RxCollection;
          if (collection == null) {
            throwError(new Error('Invalid collection'));
          }
          return from(collection.destroy());
        }),
    );
  }
}
