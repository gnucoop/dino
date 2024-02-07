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

import {HttpHeaders} from '@angular/common/http';
import {Inject, Injectable, isDevMode} from '@angular/core';
import {AuthService, buildAuthorizationHeader} from '@dino/core/auth';
import {Apollo} from 'apollo-angular';
import {Observable, ObservableInput, of as obsOf, throwError} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';

import {DataCreateCollectionRequest} from './data-create-collection-request';
import {DataBulkInsertRequest} from './data-bulk-insert-request';
import {DataFindRequest} from './data-find-request';
import {DataGetRequest} from './data-get-request';
import {DataInsertRequest} from './data-insert-request';
import {DataRequest} from './data-request';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from './data-service-config';
import {BulkInsertResult, CollectionChangedEvent, IDataService} from './data-service-interface';
import {fillConfigDefaultValues} from './data-service-utils';
import {DataUpsertRequest} from './data-upsert-request';
import {findQueryGql, getQueryGql, insertQueryGql, updateQueryGql} from './gql';
import {Model} from './model';

/**
 * Service that allows to interact with the remote database.
 */
@Injectable({providedIn: 'root'})
export class OnlineDataService implements IDataService {
  /**
   * True when the Syncing process is currently operating
   * (A replication cycle is undergoing)
   */
  readonly isSyncing = obsOf(false);

  readonly config: DataServiceConfig;

  readonly collectionChanged: Observable<CollectionChangedEvent>;

  private _collections: {[name: string]: string[]} = {};

  constructor(
    @Inject(DATA_SERVICE_CONFIG) config: DataServiceConfig,
    private _apollo: Apollo,
    private _authService: AuthService,
  ) {
    this.config = fillConfigDefaultValues(config);
    this.collectionChanged = obsOf();
  }

  /**
   * Get an object from the database.
   * Throws and error if the collection does not exist.
   * @param params The get request parameters.
   */
  get<T extends Model = Model>(params: DataGetRequest): Observable<T | null> {
    return this._getCollection(params).pipe(
      switchMap(({name, fields}) => {
        const {query, queryName} = getQueryGql<T>(name, fields, params.id);
        const context = this._getQueryContext();
        return this._apollo.query({query, context, errorPolicy: 'all'}).pipe(
          map(res => {
            if (res.errors) {
              throw new Error(JSON.stringify(res.errors));
            }
            const results = res.data[queryName] || [];
            if (results.length === 1) {
              return results[0];
            }
            return null;
          }),
        );
      }),
      catchError(this._queryErrorHandler(null)),
    );
  }

  /**
   * Insert a new object into the database.
   * Throws and error if the collection does not exist.
   * @param params The insert request parameters.
   */
  insert<T extends Model = Model, R extends T = T>(
    params: DataInsertRequest<T>,
  ): Observable<R | null> {
    return this._getCollection(params).pipe(
      switchMap(({name, fields}) => {
        const objects = [params.object];
        const {mutation, mutationName} = insertQueryGql<T>(name, fields);
        const context = this._getQueryContext();
        return this._apollo
          .mutate({mutation, context, variables: {objects}, errorPolicy: 'all'})
          .pipe(
            map(res => {
              if (res.errors) {
                throw new Error(JSON.stringify(res.errors));
              }
              const data = (res.data || {})[mutationName];
              if (data == null || data.affected_rows !== 1) {
                return null;
              }
              return data.returning[0] as R;
            }),
          );
      }),
      catchError(this._queryErrorHandler(null)),
    );
  }

  /**
   * Insert multiple objects into the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk insert request parameters.
   */
  bulkInsert<T extends Model = Model, R extends T = T>(
    params: DataBulkInsertRequest<T>,
  ): Observable<BulkInsertResult<R>> {
    return this._getCollection(params).pipe(
      switchMap(({name, fields}) => {
        const {objects} = params;
        const {mutation, mutationName} = insertQueryGql<T>(name, fields);
        const context = this._getQueryContext();
        return this._apollo
          .mutate({mutation, context, variables: {objects}, errorPolicy: 'all'})
          .pipe(
            map(res => {
              if (res.errors) {
                throw new Error(JSON.stringify(res.errors));
              }
              const data = (res.data || {})[mutationName];
              if (data == null || data.affected_rows !== 1) {
                return {success: [], error: [...(res.errors || [])]};
              }
              return {
                success: data.returning as R[],
                error: [],
              };
            }),
          );
      }),
      catchError(this._queryErrorHandler({success: [], error: []})),
    );
  }

  /**
   * Update multiple objects in the database.
   * Throws and error if the collection does not exist.
   * @param params The bulk update request parameters.
   * @param update The updated fields set.
   */
  bulkUpdate<T extends Model = Model, R extends T = T>(
    params: DataFindRequest<T>,
    update: Partial<T>,
  ): Observable<R[]> {
    return this._getCollection(params).pipe(
      switchMap(({name, fields}) => {
        const {mutation, mutationName} = updateQueryGql<T>(name, fields, params);
        const context = this._getQueryContext();
        return this._apollo
          .mutate({mutation, context, variables: {_set: update}, errorPolicy: 'all'})
          .pipe(
            map(res => {
              if (res.errors) {
                throw new Error(JSON.stringify(res.errors));
              }
              const data = (res.data || {})[mutationName] || {};
              return (data.returning || []) as R[];
            }),
          );
      }),
      catchError(this._queryErrorHandler([])),
    );
  }

  update<T extends Model = Model, R extends T = T>(
    collectionName: string,
    doc: T,
    updateData: Partial<T>,
  ): Observable<R | null> {
    return this._getCollection({collectionName}).pipe(
      switchMap(({name, fields}) => {
        const params = {collectionName: name, selector: {id: {$eq: doc.id}}};
        const {mutation, mutationName} = updateQueryGql<T>(name, fields, params);
        const context = this._getQueryContext();
        return this._apollo
          .mutate({mutation, context, variables: {_set: updateData}, errorPolicy: 'all'})
          .pipe(
            map(res => {
              if (res.errors) {
                throw new Error(JSON.stringify(res.errors));
              }
              const data = (res.data || {})[mutationName] || {};
              const results = data.returning || [];
              if (results.length !== 1) {
                return null;
              }
              return results[0] as R;
            }),
          );
      }),
      catchError(this._queryErrorHandler(null)),
    );
  }

  /**
   * Insert a new object if it does not exist within the collection, otherwise it will overwrite it.
   * Throws and error if the collection does not exist.
   * @param params The upinsert request parameters.
   */
  upsert<T extends Model = Model, R extends T = T>(
    params: DataUpsertRequest<T>,
  ): Observable<R | null> {
    const {collectionName, object} = params;
    const {id} = object;
    const existing$ = id != null ? this.get({collectionName, id}) : obsOf(null);
    return existing$.pipe(
      switchMap(existing => {
        if (existing == null) {
          return this.insert<T, R>(params);
        }
        return this.update<T, R>(collectionName, object as T, object as Partial<T>);
      }),
    );
  }

  /**
   * Create a RxQuery query object for multiple documents selection.
   * Throws and error if the collection does not exist.
   * @param params The find request parameters.
   */
  find<T extends Model = Model, R extends T = T>(params: DataFindRequest<T>): Observable<R[]> {
    return this._getCollection(params).pipe(
      switchMap(({name, fields}) => {
        const {query, queryName} = findQueryGql<T>(name, fields, params);
        const context = this._getQueryContext();
        return this._apollo.query({query, context, errorPolicy: 'all'}).pipe(
          map(res => {
            if (res.errors) {
              throw new Error(JSON.stringify(res.errors));
            }
            return (res.data[queryName] || []) as R[];
          }),
        );
      }),
      catchError(this._queryErrorHandler([])),
    );
  }

  /**
   * Create a collection in the local database from a JSON schema
   * and sets up the GraphQL sync.
   * @param params The create collection request parameters.
   */
  createCollection(params: DataCreateCollectionRequest): Observable<boolean> {
    const {name, collection} = params;
    if (this._collections[name] == null) {
      this._collections[name] = Object.keys(collection.schema.properties);
    }
    return obsOf(true);
  }

  /**
   * Destroy an existing collection in the local database.
   * Throws and error if the collection does not exist.
   * @param _collectionName The name of the collection to destroy.
   */
  destroyCollection(_collectionName: string): Observable<boolean> {
    return obsOf(true);
  }

  private _getCollection(params: DataRequest): Observable<{name: string; fields: string[]}> {
    const {collectionName} = params;
    if (this._collections[collectionName] == null) {
      throwError(() => new Error('Invalid collection'));
    }
    return obsOf({name: collectionName, fields: this._collections[collectionName]});
  }

  private _getQueryContext(): {headers: HttpHeaders} {
    let headers = new HttpHeaders();
    const token = this._authService.getAuthToken();
    if (token != null) {
      headers = headers
        .set('Authorization', buildAuthorizationHeader(token))
        .set('X-Hasura-Form-Schema-Id', JSON.stringify(['eeef7101-57b7-4ef8-add3-32bc961013ff']));
    }
    return {
      headers,
    };
  }

  private _queryErrorHandler<E, R>(
    errValue: R,
  ): (err: any, caught: Observable<E>) => ObservableInput<R> {
    return err => {
      if (isDevMode()) {
        console.error(err);
      }
      return obsOf(errValue);
    };
  }
}
