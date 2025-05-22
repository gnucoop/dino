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

import {deepCopy} from '@ajf/core/utils';
import {DeepReadonlyObject, MangoQuery, MangoQuerySelector, RxJsonSchema} from 'rxdb';
import {BehaviorSubject, forkJoin, Observable, of as obsOf, throwError, zip} from 'rxjs';
import {catchError, filter, map, switchMap, take, tap} from 'rxjs/operators';

import {PermissionContextService} from './data-context-service';
import {
  DataCreateCollectionRequest,
  PullQueryContextChecks,
} from './data-create-collection-request';
import {IDataModelManager} from './data-model-manager-interface';
import {DataListOptions, DataQueryOptions, DataQuerySort} from './data-options-interface';
import {Permission} from './data-permission';
import {PermissionContext, PermissionContextDataUpdate} from './data-permission-interface';
import {CollectionChangedEvent, IDataService} from './data-service-interface';
import {InsertModel} from './insert-model';
import {Model} from './model';

/**
 * This class will manage the data model, providing basic and generic Crud methods
 * to all services extending it.
 * All the operations will be performed on the database model named as _modelName,
 * provided in the IDataModelManager constructor.
 */
export abstract class BaseDataModelManager<T extends Model = Model, R extends T = T>
  implements IDataModelManager<T, R>
{
  /**
   * A foreign key to retrieve child docs (details) in an
   * expandable list
   */
  detailsKey?: keyof T;

  /**
   * The data manager to get details in an expandable list
   */
  detailsManager?: IDataModelManager<any>;

  /**
   * Gets the child docs of a parent doc, in expandable lists.
   * @param doc The parent doc
   * @param querySelector? Additional query params
   */
  getSubData?: (doc: T, querySelector?: any) => Observable<T[]>;

  get permissions(): Permission[] {
    return this._permissions;
  }
  private _context: Observable<PermissionContext>;
  private _collectionInit: Observable<boolean>;
  private _modelName: string;
  private _collectionSchema: RxJsonSchema<T>;
  private _collectionCreated: BehaviorSubject<boolean>;

  constructor(
    createParams: DataCreateCollectionRequest,
    private _dataService: IDataService,
    private _contextService: PermissionContextService,
    private _permissions: Permission[] = [],
    private _pullQueryContextChecks?: PullQueryContextChecks,
  ) {
    this._context = _contextService.permissionContext;
    this._modelName = createParams.name;
    this._collectionSchema = createParams.collection.schema;
    this._collectionCreated = new BehaviorSubject<boolean>(false);
    this._collectionInit = _dataService
      .createCollection(createParams, this._pullQueryContextChecks)
      .pipe(tap(created => this._collectionCreated.next(created)));
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
   * Creates an object with a unique uuidv4 Id in the model collection
   * @param obj
   * @returns an observable of the created object
   */
  create(obj: InsertModel<T>): Observable<R | null> {
    const params = {
      collectionName: this._modelName,
      object: obj,
    };
    return this._getPermissionContext().pipe(
      switchMap(context => {
        if (!this.canCreate(obj, context)) {
          return throwError(() => new Error('Creation not allowed'));
        }
        return this._dataService.insert<T, R>(params);
      }),
      take(1),
    );
  }

  /**
   * Creates multiple objects with a unique uuidv4 Id in the model collection
   * @param data
   * @returns an observable of the array of the created objects
   */
  bulkCreate(data: InsertModel<T>[]): Observable<{success: R[]; error: any[]}> {
    const params = {
      collectionName: this._modelName,
      objects: data,
    };
    return this._getPermissionContext().pipe(
      switchMap(context => {
        for (let obj of data) {
          if (!this.canCreate(obj, context)) {
            return throwError(() => new Error('Creation not allowed'));
          }
        }
        return this._dataService.bulkInsert<T, R>(params);
      }),
      take(1),
    );
  }
  // TODO(marco) - delete the commented method if tests are successful
  // /**
  //  * Updates multiple objects with a unique uuidv4 Id in the model collection
  //  * @param data
  //  * @returns an observable of the array of the created objects
  //  */
  // bulkUpdate(data: T[], update: Partial<T>): Observable<R[]> {
  //   return this._getPermissionContext().pipe(
  //     switchMap(context => {
  //       for (let obj of data) {
  //         if (!this.canModify({...update, id: obj.id}, obj, context)) {
  //           return throwError(() => new Error('Modification not allowed'));
  //         }
  //       }
  //       const selector = {id: {$in: data.map(doc => doc.id)}};
  //       const query = {selector} as MangoQuery<T>;
  //       return this._dataService.bulkUpdate<T, R>({collectionName: this._modelName, query}, update);
  //     }),
  //     take(1),
  //   );
  // }

  /**
   * Updates multiple objects with a unique uuidv4 Id in the model collection
   * @param data
   * @returns an observable of the array of the created objects
   */
  bulkUpdate(data: T[], update: Partial<T>): Observable<(R | null)[]> {
    if (data == null || data.length == 0 || !update) {
      return obsOf([]);
    }
    const ids = data.map(d => d.id);
    const selectorParams = {id: {$in: ids}};
    const params = {
      collectionName: this._modelName,
      query: this._optionsToMangoQuery({selector: selectorParams}),
    };
    return this._getPermissionContext().pipe(
      switchMap(context => this._dataService.find<T>(params).pipe(map(docs => ({docs, context})))),
      switchMap(({docs, context}) => {
        for (let obj of docs) {
          if (!this.canModify({id: obj.id, ...update}, obj, context)) {
            return throwError(() => new Error('Modification not allowed'));
          }
        }
        return zip(
          docs.map(doc => {
            let newDoc = deepCopy(doc);
            newDoc = {...newDoc, ...update};
            return this.update(newDoc);
          }),
        );
      }),
      catchError(err => throwError(() => err)),
    );
  }

  /**
   * Retrieves a single object by id from the model collection
   * @param id
   * @returns an observable of the retrieved object
   */
  get(id: string): Observable<R | null> {
    const params = {
      collectionName: this._modelName,
      id: id,
    };
    return this._getPermissionContext().pipe(
      switchMap(() => this._dataService.get<T, R>(params).pipe(take(1))),
    );
  }

  /**
   * Retrieves a list of objects from the model collections.
   * Optional parameters can be passed to modify the returned list.
   * @param options? a list of DataListOptions options.
   * @returns The documents selected.
   */
  list(options?: DataListOptions): Observable<R[]> {
    const params = {
      collectionName: this._modelName,
      query: this._optionsToMangoQuery(options),
    };
    return this._getPermissionContext().pipe(
      switchMap(_context => this._dataService.find<T, R>(params).pipe(take(1))),
    );
  }

  /**
   * Performs a query on the model collection, given a list of options
   * (a mango query selector is a required option).
   * Optional parameters can be passed to modify the returned list.
   * @param options a list of DataQueryOptions parameters.
   * @returns The multiple documents selected.
   */
  query(options: DataQueryOptions): Observable<R[]> {
    const params = {
      collectionName: this._modelName,
      query: this._optionsToMangoQuery(options),
    };
    return this._getPermissionContext().pipe(
      switchMap(_context => {
        return this._dataService.find<T, R>(params).pipe(take(1));
      }),
    );
  }

  /**
   * Removes a single object by id from the model collection
   * @param data
   * @returns an observable of the deleted object
   */
  delete(data: string | T): Observable<R | null> {
    const params = {
      collectionName: this._modelName,
      id: typeof data === 'string' ? data : data.id,
    };

    return this._getPermissionContext().pipe(
      switchMap(context => this._dataService.get<T, R>(params).pipe(map(doc => ({doc, context})))),
      switchMap(({doc, context}) => {
        if (doc == null) {
          return throwError(() => new Error('Invalid document'));
        } else {
          if (!this.canDelete(doc, context)) {
            return throwError(() => new Error('Deletion not allowed'));
          } else {
            return this._dataService
              .update<T, R>(this._modelName, doc, {_deleted: true, is_deleted: true} as Partial<R>)
              .pipe(
                map(_ => doc as R),
                catchError(err => throwError(() => new Error(err))),
              );
          }
        }
      }),
    );
  }

  /**
   * Deletes multiple objects in the model collection
   * @param data
   * @returns an observable of the array of the deleted objects
   */
  bulkDelete(data: T[]): Observable<R[] | null> {
    if (data == null || data.length == 0) {
      return obsOf(null);
    }
    const ids = data.map(d => d.id);
    const selectorParams = {id: {$in: ids}};
    const params = {
      collectionName: this._modelName,
      query: this._optionsToMangoQuery({selector: selectorParams}),
    };
    return this._getPermissionContext().pipe(
      switchMap(context => this._dataService.find<T>(params).pipe(map(docs => ({docs, context})))),
      switchMap(({docs, context}) => {
        for (let obj of docs) {
          if (!this.canDelete(obj, context)) {
            return throwError(() => new Error('Deletion not allowed'));
          }
        }
        return zip(
          docs.map(doc => {
            const newDoc = deepCopy(doc);
            newDoc._deleted = true;
            newDoc.is_deleted = true;
            return this.update(newDoc);
          }),
        ).pipe(
          switchMap(upDocs => {
            return upDocs.some(d => d == null) ? obsOf(null) : (obsOf(upDocs) as Observable<R[]>);
          }),
          catchError(err => throwError(() => err)),
        );
      }),
    );
  }

  /**
   * Updates a single object in the model collection,
   * replacing all field values with the passed object properties values.
   * @param obj
   * @returns an observable of the updated object
   */
  update(obj: T): Observable<R | null> {
    const params = {
      collectionName: this._modelName,
      id: obj.id,
    };

    return this._getPermissionContext().pipe(
      switchMap(context => this._dataService.get<T, R>(params).pipe(map(doc => ({doc, context})))),
      switchMap(({doc, context}) => {
        if (doc == null) {
          return throwError(() => new Error('Invalid document'));
        } else {
          if (!this.canModify(obj, doc, context)) {
            return throwError(() => new Error('Modification not allowed'));
          } else {
            return this._dataService.update<T, R>(
              this._modelName,
              doc,
              this._prepareUpdateQuery(obj),
            );
          }
        }
      }),
    );
  }

  /**
   * Patches a single object in the model collection,
   * replacing the values of the fields corresponding to the passed object properties.
   * @param data
   * @returns an observable of the patched object
   */
  patch(data: Partial<T> & {id: string}): Observable<R | null> {
    const params = {
      collectionName: this._modelName,
      id: data.id,
    };

    return this._getPermissionContext().pipe(
      switchMap(context => this._dataService.get<T, R>(params).pipe(map(doc => ({doc, context})))),
      switchMap(({doc, context}) => {
        if (doc == null) {
          return throwError(() => new Error('Invalid document'));
        } else {
          if (!this.canModify(data, doc, context)) {
            return throwError(() => new Error('Modification not allowed'));
          } else {
            return this._dataService
              .update(this._modelName, doc, this._prepareUpdateQuery(data))
              .pipe(catchError(err => throwError(() => err)));
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
   * @param _dataSchema The schema of the "additionalData" model
   */
  generateAdditionalFilters(_dataSchema?: any, _nodesVisibility?: any): any[] {
    return [];
  }

  /**
   * Transforms an object into a list of Mango update operations
   * @param data
   * @returns a Mango update operation
   */
  private _prepareUpdateQuery(data: Partial<T>): any {
    data.updated_at = new Date().toISOString();
    return {...data};
  }

  /**
   * Checks all Permissions for viewing an object in a given Context
   * @param object The doc to be viewed
   * @param context? The permission context data
   * @returns True if the permission is granted
   */
  canView(object: R, context?: PermissionContext): boolean {
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
    if (!this._contextService.getMatchingMetric(this._objectToJSON(object), context)) {
      return false;
    }
    if (!this._contextService.checkPermission(object.id, this.collectionName, 'view', context)) {
      return false;
    }
    return true;
  }

  /**
   * Checks all Permissions for creating an object in a given Context
   * @param object The object to be created
   * @param context The permissions context
   * @returns True if the object can be created
   */
  canCreate(object: InsertModel<T>, context?: PermissionContext): boolean {
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
   * Checks all Permissions for modifying an object in a given Context
   * @param data The partial updates to be performed
   * @param object The object to be modified
   * @param context The permissions context
   * @returns True if the object can be modified
   */
  canModify(data: Partial<T> & {id: string}, object: T, context?: PermissionContext): boolean {
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
    if (!this._contextService.checkPermission(object.id, this.collectionName, 'edit', context)) {
      return false;
    }
    return true;
  }

  /**
   * Checks all Permissions for deleting an object in a given Context
   * @param object The object to be deleted
   * @param context The permissions context
   * @returns True if the object can be deleted
   */
  canDelete(object: T, context?: PermissionContext): boolean {
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
    if (!this._contextService.checkPermission(object.id, this.collectionName, 'delete', context)) {
      return false;
    }
    return true;
  }

  /**
   * Queries all the descendants of the document, based on its "parent_id" attribute.
   * @param ids The IDs of the documents to be checked.
   * @param limit The optional query limit.
   * @returns All of its descendants
   */
  findDescendants(ids: string[], limit?: number): Observable<R[]> {
    const schemaPropertiesKeys = Object.keys(this._collectionSchema.properties);
    if (!ids || !ids.length || !schemaPropertiesKeys.includes('parent_id')) {
      return obsOf([]);
    }
    const selector = {parent_id: {$in: ids}};
    const queryOptions: DataQueryOptions = {
      selector,
    };
    if (limit) {
      queryOptions.limit = limit;
    }
    return this.query(queryOptions).pipe(
      switchMap(docs => {
        if (docs.length) {
          const docsIds = docs.map(doc => doc.id);
          return this.findDescendants(docsIds).pipe(map(descendants => [...docs, ...descendants]));
        }
        return obsOf([]);
      }),
    );
  }

  /**
   * Finds all ancestors of matching documents by their "parent_id" attribute
   * @param allDocs The list of all documents
   * @param selectedDocsParentIDs The parent_ids of all documents whose ancestors must be found
   * @returns All the ancestors of the selected documents
   */
  findMatchingAncestors(
    allDocs: (R & {parent_id: string | null})[],
    selectedDocsParentIDs: (string | null)[],
  ): (R & {parent_id: string | null})[] {
    const ancestors: (R & {parent_id: string | null})[] = [];
    const matchingParents = allDocs.filter(option => {
      return selectedDocsParentIDs.includes(option.id);
    });
    ancestors.push(...matchingParents);

    let ancestorsParentIDs = [...new Set(ancestors.map(anc => anc.parent_id))];
    ancestorsParentIDs = ancestorsParentIDs.filter(id => id != null);
    if (ancestorsParentIDs.length) {
      ancestors.push(...this.findMatchingAncestors(allDocs, ancestorsParentIDs));
    }
    return ancestors;
  }

  /**
   * Organizes documents hyerarchically (parent->children)
   * @param allDocs All the unorganized documents
   * @param allParentIDs An array of all the ids of documents that have children
   * @param parent An object defining the parent id and the current level in the nested list
   * @param topCall True if it's the first call for of the method
   * @returns The organized documents with their new level attribute
   */
  organizeDocsHierarchy(
    allDocs: (R & {parent_id: string | null})[],
    allParentIDs: (string | null)[],
    parent: {id: string | null; level: number | null} = {id: null, level: null},
    firstCall: boolean = true,
  ): (R & {parent_id: string | null; level?: number})[] {
    let result: (R & {parent_id: string | null; level?: number})[] = [];
    // Get every element whose parent_id attribute matches the parent's id.
    const children: (R & {parent_id: string | null; level?: number})[] = allDocs.filter(
      item => item.parent_id === parent.id,
    );
    // If all the docs have a parent but the ancestor is not in the hierarchy, a new ancestor is determined
    // by finding the doc whose parent_id is the id of the missing ancestor.
    if (!children.length) {
      const allDocsIds = allDocs.map(doc => doc.id);
      const absentAncestorId = allParentIDs.filter(d => d != null && !allDocsIds.includes(d));
      const newAncestor = allDocs.find(doc => doc.parent_id === absentAncestorId[0]);
      if (newAncestor != null) {
        const ancestorIndex = allDocs.findIndex(doc => doc.id === newAncestor.id);
        allDocs.splice(ancestorIndex, 1);
        result = [
          ...result,
          newAncestor,
          ...this.organizeDocsHierarchy(
            allDocs,
            allParentIDs,
            {id: newAncestor.id, level: 0},
            false,
          ),
        ];
      } else {
        result = [...result, ...allDocs];
      }
    }

    // Set the level based on the parent level for each element identified,
    // add them to the result array, then recursively sort the children.
    children.forEach(child => {
      if (allParentIDs.includes(child.id)) {
        child.level = parent.level != null && child.parent_id != null ? parent.level + 1 : 0;
        result = [
          ...result,
          child,
          ...this.organizeDocsHierarchy(
            allDocs,
            allParentIDs,
            {
              id: child.id,
              level: child.level,
            },
            false,
          ),
        ];
      } else {
        child.level = parent.level != null ? parent.level + 1 : 0;
        result = [...result, child];
      }
    });

    // If the full cycle is completed, and some docs are left out of the hierarchy (orphans)
    // they are now brought up to "level 0" and introduced in the hierarchy.
    if (firstCall && result.length < allDocs.length) {
      const resultIDs = result.map(r => r.id);
      const orphans = allDocs.filter(
        doc =>
          !resultIDs.includes(doc.id) &&
          !this.findMatchingAncestors(allDocs, [doc.parent_id]).length,
      );
      const orphansParentIDs = new Set(orphans.map(orphan => orphan.parent_id));
      for (let orphanParentId of orphansParentIDs) {
        result = [
          ...result,
          ...this.organizeDocsHierarchy(
            allDocs,
            allParentIDs,
            {
              id: orphanParentId,
              level: null,
            },
            false,
          ),
        ];
      }
    }
    return result;
  }

  /**
   * Transforms a resulting object to a deep readonly version of the base object
   */
  protected _objectToJSON(obj: R): DeepReadonlyObject<T> {
    return JSON.parse(JSON.stringify(obj));
  }

  /**
   * Returns permission context after collection initialization.
   */
  private _getPermissionContext(): Observable<PermissionContext> {
    return this._collectionCreated.pipe(
      filter(created => created),
      switchMap(() => this._context),
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
    const selector = ((options as DataQueryOptions).selector || {
      is_deleted: {$ne: true},
    }) as MangoQuerySelector<T>;
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
