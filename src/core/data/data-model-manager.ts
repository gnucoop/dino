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

import {MangoQuery, RxDocument, RxQuery} from 'rxdb';
import {from, Observable, throwError, zip} from 'rxjs';
import {
  catchError,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
} from 'rxjs/operators';

import {PermissionContextService} from './data-context-service';
import {DataCreateCollectionRequest} from './data-create-collection-request';
import {DataListOptions, DataQueryOptions, DataQuerySort} from './data-options-interface';
import {Permission} from './data-permission';
import {PermissionContext, PermissionContextDataUpdate} from './data-permission-interface';
import {DataService} from './data-service';
import {InsertModel} from './insert-model';
import {Model} from './model';


/**
 * This class will manage the data model, providing basic and generic Crud methods
 * to all services extending it.
 * All the operations will be performed on the RxDb collection named as _modelName,
 * provided in the DataModelManager constructor.
 */
export abstract class DataModelManager<T extends Model = Model> {
  private _context: Observable<PermissionContext<T>>;
  private _collectionInit: Observable<boolean>;
  private _modelName: string;

  constructor(
      createParams: DataCreateCollectionRequest,
      private _dataService: DataService,
      private _contextService: PermissionContextService,
      private _permissions: Permission[] = [],
  ) {
    this._context = _contextService.permissionContext;
    this._modelName = createParams.collection.name;
    this._collectionInit = _dataService.createCollection(createParams)
                               .pipe(
                                   filter(created => created),
                                   shareReplay(1),
                               );
  }

  /**
   * Updates the Context by adding new data
   */
  addToContext(data: PermissionContextDataUpdate): void {
    this._contextService.addToContext(data);
  }

  /**
   * Creates a RxDocument object with a unique uuidv4 Id in the model collection
   * @param obj
   * @return an observable of the created RxDocument
   */
  create(obj: InsertModel<T>): Observable<RxDocument<T>|null> {
    const params = {
      collectionName: this._modelName,
      object: obj,
    };
    return this._getPermissionContext().pipe(
        switchMap(context => {
          if (!this._canCreate(obj, context)) {
            return throwError(new Error('Creation not allowed'));
          }
          return this._dataService.insert<T>(params);
        }),
        take(1),
    );
  }

  /**
   * Creates multiple RxDocument objects with a unique uuidv4 Id in the model collection
   * @param data
   * @return an observable of the array of the created RxDocuments
   */
  bulkCreate(data: InsertModel<T>[]): Observable<{success: RxDocument<T>[], error: any[]}> {
    const params = {
      collectionName: this._modelName,
      objects: data,
    };
    return this._getPermissionContext().pipe(
        switchMap(context => {
          for (let obj of data) {
            if (!this._canCreate(obj, context)) {
              return throwError(new Error('Creation not allowed'));
            }
          }
          return this._dataService.bulkInsert<T>(params);
        }),
        take(1),
    );
  }

  /**
   * Retrieves a single RxDocument object by id from the model collection
   * @param id
   * @return an observable of the retrieved RxDocument
   */
  get(id: string): Observable<RxDocument<T>|null> {
    const params = {
      collectionName: this._modelName,
      id: id,
    };
    return this._collectionInit.pipe(
        switchMap(
            () => this._dataService.get<T>(params).pipe(
                take(1),
                )),
    );
  }

  /**
   * Retrieves a list of RxDocument objects from the model collections.
   * Optional parameters can be passed to modify the returned list.
   * @param options? a list of DataListOptions options.
   * @return  RxQuery object for multiple documents selection.
   */
  list(options?: DataListOptions): Observable<RxQuery<T, RxDocument<T>[]>> {
    const params = {
      collectionName: this._modelName,
      query: this._optionsToMangoQuery(options),
    };
    return this._collectionInit.pipe(
        switchMap(
            () => this._dataService.find<T>(params).pipe(
                take(1),
                ),
            ),
    );
  }

  /**
   * Performs a query on the model collection, given a list of options
   * (a mango query selector is a required option).
   * Optional parameters can be passed to modify the returned list.
   * @param options a list of DataQueryOptions parameters.
   * @return RxQuery object for multiple documents selection.
   */
  query(options: DataQueryOptions): Observable<RxQuery<T, RxDocument<T>[]>> {
    const params = {
      collectionName: this._modelName,
      query: this._optionsToMangoQuery(options),
    };
    return this._collectionInit.pipe(
        switchMap(
            () => this._dataService.find<T>(params).pipe(
                take(1),
                )),
    );
  }

  /**
   * Removes a single RxDocument object by id from the model collection
   * @param data
   * @return an observable of the deleted RxDocument
   */
  delete(data: string|T): Observable<RxDocument<T>|null> {
    const params = {
      collectionName: this._modelName,
      id: (typeof data === 'string' ? data : data.id),
    };

    return this._getPermissionContext().pipe(
        switchMap(
            context => this._dataService.get<T>(params).pipe(map(
                doc => ({doc, context}),
                ))),
        switchMap(({doc, context}) => {
          if (doc == null) {
            return throwError(new Error('Invalid document'));
          } else {
            if (!this._canDelete(doc, context)) {
              return throwError(new Error('Deletion not allowed'));
            } else {
              return from(doc.remove())
                  .pipe(
                      map(_ => doc),
                      catchError(err => throwError(err)),
                  );
            }
          }
        }),
    );
  }

  /**
   * Updates a single RxDocument object in the model collection,
   * replacing all field values with the passed object properties values.
   * @param obj
   * @return an observable of the updated RxDocument
   */
  update(obj: T): Observable<RxDocument<T>|null> {
    const params = {
      collectionName: this._modelName,
      id: obj.id,
    };

    return this._getPermissionContext().pipe(
        switchMap(
            context => this._dataService.get<T>(params).pipe(map(
                doc => ({doc, context}),
                ))),
        switchMap(({doc, context}) => {
          if (doc == null) {
            return throwError(new Error('Invalid document'));
          } else {
            if (!this._canModify(obj, doc, context)) {
              return throwError(new Error('Modification not allowed'));
            } else {
              return from(doc.update(this._prepareUpdateQuery(obj)))
                  .pipe(
                      map(_ => doc),
                      catchError(err => throwError(err)),
                  );
            }
          }
        }),
    );
  }

  /**
   * Patches a single RxDocument object in the model collection,
   * replacing the values of the fields corresponding to the passed object properties.
   * @param data
   * @return an observable of the patched RxDocument
   */
  patch(data: Partial<T>&{id: string}): Observable<RxDocument<T>|null> {
    const params = {
      collectionName: this._modelName,
      id: data.id,
    };

    return this._getPermissionContext().pipe(
        switchMap(
            context => this._dataService.get<T>(params).pipe(map(
                doc => ({doc, context}),
                ))),
        switchMap(({doc, context}) => {
          if (doc == null) {
            return throwError(new Error('Invalid document'));
          } else {
            if (!this._canModify(data, doc, context)) {
              return throwError(new Error('Modification not allowed'));
            } else {
              return from(doc.update(this._prepareUpdateQuery(data)))
                  .pipe(
                      map(_ => doc),
                      catchError(err => throwError(err)),
                  );
            }
          }
        }),
    );
  }

  /**
   * Transforms an object into a list of Mango update operations
   * @param data
   * @return a Mango update operation
   */
  private _prepareUpdateQuery(data: Partial<T>): any {
    data.updated_at = new Date().toISOString();
    delete data.created_at;
    return {$set: {...data}};
  }

  /**
   * Checks all Permissions for creating a RxDocument in a given Context
   * @param data
   * @return boolean
   */
  private _canCreate(object: InsertModel<T>, context?: PermissionContext<T>): boolean {
    const createData = {
      object: object,
      context: context,
    };
    for (let permission of this._permissions) {
      if (permission.canCreate === undefined) {
        continue;
      } else {
        if (!permission.canCreate(createData)) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Checks all Permissions for modifying a RxDocument in a given Context
   * @param data
   * @return boolean
   */
  private _canModify(
      data: Partial<T>&{id: string}, object: RxDocument<T>,
      context?: PermissionContext<T>): boolean {
    const modifyData = {
      data: data,
      object: object,
      context: context,
    };
    for (let permission of this._permissions) {
      if (permission.canModify === undefined) {
        continue;
      } else {
        if (!permission.canModify(modifyData)) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Checks all Permissions for deleting a RxDocument in a given Context
   * @param data
   * @return boolean
   */
  private _canDelete(object: RxDocument<T>, context?: PermissionContext<T>): boolean {
    const deleteData = {
      object: object,
      context: context,
    };
    for (let permission of this._permissions) {
      if (permission.canDelete === undefined) {
        continue;
      } else {
        if (!permission.canDelete(deleteData)) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Returns permission context after collection initialization.
   */
  private _getPermissionContext(): Observable<PermissionContext> {
    return zip(this._collectionInit, this._context)
        .pipe(
            map(([_, context]) => context),
        );
  }

  /**
   * Creates a Mango query from a list or query options
   * @param options The list or query options
   * @return a Mango query
   */
  private _optionsToMangoQuery(options?: DataListOptions|DataQueryOptions): MangoQuery<T> {
    options = options || {};
    const selector = (options as DataQueryOptions).selector || {};
    const sort = options.sort != null ? options.sort.map(s => {
      if (typeof s === 'string') {
        const sortEntry: DataQuerySort = {};
        sortEntry[s] = 'asc';
        return sortEntry;
      }
      return s;
    }) as {[key in keyof T | string]: 'asc' | 'desc'}[] :
                                        undefined;
    return {...options, selector, sort};
  }
}
