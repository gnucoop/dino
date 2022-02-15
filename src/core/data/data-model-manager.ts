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

import {MangoQuery, RxDocument, RxJsonSchema} from 'rxdb';
import {from, Observable, of as obsOf, throwError, zip} from 'rxjs';
import {catchError, filter, map, shareReplay, switchMap, take} from 'rxjs/operators';

import {PermissionContextService} from './data-context-service';
import {DataCreateCollectionRequest} from './data-create-collection-request';
import {DataListOptions, DataQueryOptions, DataQuerySort} from './data-options-interface';
import {Permission} from './data-permission';
import {PermissionContext, PermissionContextDataUpdate} from './data-permission-interface';
import {CollectionChangedEvent, DataService} from './data-service';
import {InsertModel} from './insert-model';
import {Model} from './model';

/**
 * This class will manage the data model, providing basic and generic Crud methods
 * to all services extending it.
 * All the operations will be performed on the RxDb collection named as _modelName,
 * provided in the DataModelManager constructor.
 */
export abstract class DataModelManager<T extends Model = Model> {
  /**
   * A foreign key to retrieve child docs (details) in an
   * expandable list
   */
  detailsKey: keyof T;

  /**
   * The data manager to get details in an expandable list
   */
  detailsManager: DataModelManager<any>;

  /**
   * Gets the child docs of a parent doc, in expandable lists.
   * @param doc The parent doc
   * @param querySelector? Additional query params
   */
  getSubData: (doc: T, querySelector?: any) => Observable<T[]>;

  get permissions(): Permission[] {
    return this._permissions;
  }
  private _context: Observable<PermissionContext<T>>;
  private _collectionInit: Observable<boolean>;
  private _modelName: string;
  private _collectionSchema: RxJsonSchema<T>;

  constructor(
    createParams: DataCreateCollectionRequest,
    private _dataService: DataService,
    private _contextService: PermissionContextService,
    private _permissions: Permission[] = [],
  ) {
    this._context = _contextService.permissionContext;
    this._modelName = createParams.name;
    this._collectionSchema = createParams.collection.schema;
    this._collectionInit = _dataService.createCollection(createParams).pipe(
      filter(created => created),
      shareReplay(1),
    );
  }

  /**
   * Retrieves the collection name
   * @returns The name of the model/collection
   */
  get collectionName(): string {
    return this._modelName;
  }

  /**
   * Retrieves the collection schema
   * @returns RxJsonSchema
   */
  get collectionSchema(): RxJsonSchema<T> {
    return this._collectionSchema;
  }

  /**
   * Exposes the data service collectionChanged event.
   * Emits only when the change event is related to the
   * data model manager own collection.
   */
  get collectionChanged(): Observable<CollectionChangedEvent> {
    return this._dataService.collectionChanged.pipe(
      filter(changeEvt => changeEvt.collection === this._modelName),
    );
  }

  /**
   * Initializes and creates the collection.
   */
  init(): Observable<boolean> {
    return this._collectionInit;
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
   * @returns an observable of the created RxDocument
   */
  create(obj: InsertModel<T>): Observable<RxDocument<T> | null> {
    const params = {
      collectionName: this._modelName,
      object: obj,
    };
    return this._getPermissionContext().pipe(
      switchMap(context => {
        if (!this.canCreate(obj, context)) {
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
   * @returns an observable of the array of the created RxDocuments
   */
  bulkCreate(data: InsertModel<T>[]): Observable<{success: RxDocument<T>[]; error: any[]}> {
    const params = {
      collectionName: this._modelName,
      objects: data,
    };
    return this._getPermissionContext().pipe(
      switchMap(context => {
        for (let obj of data) {
          if (!this.canCreate(obj, context)) {
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
   * @returns an observable of the retrieved RxDocument
   */
  get(id: string): Observable<RxDocument<T> | null> {
    const params = {
      collectionName: this._modelName,
      id: id,
    };
    return this._getPermissionContext().pipe(
      switchMap(() => this._dataService.get<T>(params).pipe(take(1))),
    );
  }

  /**
   * Retrieves a list of RxDocument objects from the model collections.
   * Optional parameters can be passed to modify the returned list.
   * @param options? a list of DataListOptions options.
   * @returns  RxQuery object for multiple documents selection.
   */
  list(options?: DataListOptions): Observable<RxDocument<T>[]> {
    const params = {
      collectionName: this._modelName,
      query: this._optionsToMangoQuery(options),
    };
    return this._getPermissionContext().pipe(
      switchMap(context =>
        this._dataService.find<T>(params).pipe(
          switchMap(qry => from(qry.exec())),
          map(docs => {
            if (context.user_permissions != null && context.user_metrics != null) {
              return docs.filter(doc => this.canView(doc, context));
            }
            return [];
          }),
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
   * @returns RxQuery object for multiple documents selection.
   */
  query(options: DataQueryOptions): Observable<RxDocument<T>[]> {
    const params = {
      collectionName: this._modelName,
      query: this._optionsToMangoQuery(options),
    };
    return this._getPermissionContext().pipe(
      switchMap(context =>
        this._dataService.find<T>(params).pipe(
          switchMap(qry => from(qry.exec())),
          map(docs => {
            if (context.user_permissions != null && context.user_metrics != null) {
              return docs.filter(doc => this.canView(doc, context));
            }
            return docs;
          }),
          take(1),
        ),
      ),
    );
  }

  /**
   * Removes a single RxDocument object by id from the model collection
   * @param data
   * @returns an observable of the deleted RxDocument
   */
  delete(data: string | T): Observable<RxDocument<T> | null> {
    const params = {
      collectionName: this._modelName,
      id: typeof data === 'string' ? data : data.id,
    };

    return this._getPermissionContext().pipe(
      switchMap(context => this._dataService.get<T>(params).pipe(map(doc => ({doc, context})))),
      switchMap(({doc, context}) => {
        if (doc == null) {
          return throwError(new Error('Invalid document'));
        } else {
          if (!this.canDelete(doc, context)) {
            return throwError(() => new Error('Deletion not allowed'));
          } else {
            return from(doc.update({$set: {_deleted: true, is_deleted: true}})).pipe(
              map(_ => doc),
              catchError(err => throwError(() => new Error(err))),
            );
          }
        }
      }),
    );
  }

  /**
   * Deletes multiple RxDocument objects in the model collection
   * @param data
   * @returns an observable of the array of the deleted RxDocuments
   */
  bulkDelete(data: T[]): Observable<RxDocument<T>[] | null> {
    if (data == null || data.length == 0) {
      return obsOf(null);
    }
    const ids = data.map(d => d.id);
    const selectorParams = {id: {$in: ids}};
    const params = {
      collectionName: this._modelName,
      query: {
        selector: selectorParams,
      },
    };
    return this._getPermissionContext().pipe(
      switchMap(context =>
        this._dataService.find<T>(params).pipe(map(query => ({query, context}))),
      ),
      switchMap(({query, context}) => {
        const res = from(query.exec()).pipe(map(docs => ({docs, context, query})));
        return res;
      }),
      switchMap(res => {
        for (let obj of res.docs) {
          if (!this.canDelete(obj, res.context)) {
            return throwError(new Error('Deletion not allowed'));
          }
        }
        return from(res.query.update({$set: {_deleted: true, is_deleted: true}})).pipe(
          catchError(err => throwError(err)),
        );
      }),
    );
  }

  /**
   * Updates a single RxDocument object in the model collection,
   * replacing all field values with the passed object properties values.
   * @param obj
   * @returns an observable of the updated RxDocument
   */
  update(obj: T): Observable<RxDocument<T> | null> {
    const params = {
      collectionName: this._modelName,
      id: obj.id,
    };

    return this._getPermissionContext().pipe(
      switchMap(context => this._dataService.get<T>(params).pipe(map(doc => ({doc, context})))),
      switchMap(({doc, context}) => {
        if (doc == null) {
          return throwError(() => new Error('Invalid document'));
        } else {
          if (!this.canModify(obj, doc, context)) {
            return throwError(() => new Error('Modification not allowed'));
          } else {
            return this._dataService.update(doc, this._prepareUpdateQuery(obj));
          }
        }
      }),
    );
  }

  /**
   * Patches a single RxDocument object in the model collection,
   * replacing the values of the fields corresponding to the passed object properties.
   * @param data
   * @returns an observable of the patched RxDocument
   */
  patch(data: Partial<T> & {id: string}): Observable<RxDocument<T> | null> {
    const params = {
      collectionName: this._modelName,
      id: data.id,
    };

    return this._getPermissionContext().pipe(
      switchMap(context => this._dataService.get<T>(params).pipe(map(doc => ({doc, context})))),
      switchMap(({doc, context}) => {
        if (doc == null) {
          return throwError(new Error('Invalid document'));
        } else {
          if (!this.canModify(data, doc, context)) {
            return throwError(new Error('Modification not allowed'));
          } else {
            return from(doc.update(this._prepareUpdateQuery(data))).pipe(
              map(_ => doc),
              catchError(err => throwError(err)),
            );
          }
        }
      }),
    );
  }

  /**
   * Generates additional filters based of the model of the "data" property of
   * the main model. This is overridden by methods which are specific for
   * each concrete DataModelManager.
   * An optional schema for the filters generation can be provided.
   * @param dataSchema The schema of the "additionalData" model
   */
  generateAdditionalFilters(dataSchema?: any): any[] {
    return [];
  }

  /**
   * Transforms an object into a list of Mango update operations
   * @param data
   * @returns a Mango update operation
   */
  private _prepareUpdateQuery(data: Partial<T>): any {
    data.updated_at = new Date().toISOString();
    return {$set: {...data}};
  }

  /**
   * Checks all Permissions for viewing a RxDocument in a given Context
   * @param object The doc to be viewed
   * @param context? The permission context data
   * @returns True if the permission is granted
   */
  canView(object: RxDocument<T>, context?: PermissionContext<T>): boolean {
    const viewData = {
      object: object,
      context: context,
    };
    for (let permission of this._permissions) {
      if (permission.canView === undefined) {
        continue;
      } else {
        if (!permission.canView(viewData)) {
          return false;
        }
      }
    }
    if (!this._contextService.getMatchingMetric(object, context)) {
      return false;
    }
    if (!this._contextService.checkPermission<T>(object.id, this.collectionName, 'view', context)) {
      return false;
    }
    return true;
  }

  /**
   * Checks all Permissions for creating a RxDocument in a given Context
   * @param data
   * @returns boolean
   */
  canCreate(object: InsertModel<T>, context?: PermissionContext<T>): boolean {
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
   * @returns boolean
   */
  canModify(
    data: Partial<T> & {id: string},
    object: RxDocument<T>,
    context?: PermissionContext<T>,
  ): boolean {
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
    if (!this._contextService.checkPermission<T>(object.id, this.collectionName, 'edit', context)) {
      return false;
    }
    return true;
  }

  /**
   * Checks all Permissions for deleting a RxDocument in a given Context
   * @param data
   * @returns boolean
   */
  canDelete(object: RxDocument<T>, context?: PermissionContext<T>): boolean {
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
    if (
      !this._contextService.checkPermission<T>(object.id, this.collectionName, 'delete', context)
    ) {
      return false;
    }
    return true;
  }

  /**
   * Returns permission context after collection initialization.
   */
  private _getPermissionContext(): Observable<PermissionContext> {
    return zip(this._collectionInit, this._context).pipe(
      map(([_, context]) => context),
      take(1),
    );
  }

  get permissionContext(): Observable<PermissionContext> {
    return this._getPermissionContext();
  }

  /**
   * Creates a Mango query from a list or query options
   * @param options The list or query options
   * @returns a Mango query
   */
  private _optionsToMangoQuery(options?: DataListOptions | DataQueryOptions): MangoQuery<T> {
    options = options || {};
    const selector = (options as DataQueryOptions).selector || {};
    const sort =
      options.sort != null
        ? (options.sort.map(s => {
            if (typeof s === 'string') {
              const sortEntry: DataQuerySort = {};
              sortEntry[s] = 'asc';
              return sortEntry;
            }
            return s;
          }) as {[key in keyof T | string]: 'asc' | 'desc'}[])
        : undefined;
    return {...options, selector, sort};
  }
}
