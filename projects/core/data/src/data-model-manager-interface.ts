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

import {DataListOptions, DataQueryOptions} from './data-options-interface';
import {Permission} from './data-permission';
import {PermissionContext, PermissionContextDataUpdate} from './data-permission-interface';
import {CollectionChangedEvent} from './data-service-interface';
import {InsertModel} from './insert-model';
import {Model} from './model';

/**
 * This class will manage the data model, providing basic and generic Crud methods
 * to all services extending it.
 * All the operations will be performed on the model named as _modelName,
 * provided in the DataModelManager constructor.
 */
export interface IDataModelManager<T extends Model = Model, R extends T = T> {
  /**
   * A foreign key to retrieve child docs (details) in an
   * expandable list
   */
  detailsKey?: keyof T;

  /**
   * The data manager to get details in an expandable list
   */
  detailsManager?: IDataModelManager<any>;

  readonly permissions: Permission[];

  /**
   * The collection name
   */
  readonly collectionName: string;

  /**
   * Exposes the data service collectionChanged event.
   * Emits only when the change event is related to the
   * data model manager own collection.
   */
  readonly collectionChanged: Observable<CollectionChangedEvent>;

  readonly permissionContext: Observable<PermissionContext>;

  /**
   * Gets the child docs of a parent doc, in expandable lists.
   * @param doc The parent doc
   * @param querySelector? Additional query params
   */
  getSubData?: (doc: T, querySelector?: any) => Observable<T[]>;

  /**
   * Initializes and creates the collection.
   */
  init(): Observable<boolean>;

  /**
   * Updates the Context by adding new data
   */
  addToContext(data: PermissionContextDataUpdate): void;

  /**
   * Creates an object with a unique uuidv4 Id in the model collection
   * @param obj
   * @returns an observable of the created object
   */
  create(obj: InsertModel<T>): Observable<R | null>;

  /**
   * Creates multiple objects with a unique uuidv4 Id in the model collection
   * @param data
   * @returns an observable of the array of the created objects
   */
  bulkCreate(data: InsertModel<T>[]): Observable<{success: R[]; error: any[]}>;

  /**
   * Retrieves a single object by id from the model collection
   * @param id
   * @returns an observable of the retrieved object
   */
  get(id: string): Observable<R | null>;

  /**
   * Retrieves a list of objects from the model collections.
   * Optional parameters can be passed to modify the returned list.
   * @param options? a list of DataListOptions options.
   * @returns The multiple documents selected.
   */
  list(options?: DataListOptions): Observable<R[]>;

  /**
   * Performs a query on the model collection, given a list of options
   * (a mango query selector is a required option).
   * Optional parameters can be passed to modify the returned list.
   * @param options a list of DataQueryOptions parameters.
   * @returns The multiple documents selected.
   */
  query(options: DataQueryOptions): Observable<T[]>;

  /**
   * Removes a single object by id from the model collection
   * @param data
   * @returns an observable of the deleted object
   */
  delete(data: string | T): Observable<T | null>;

  /**
   * Deletes multiple objects in the model collection
   * @param data
   * @returns an observable of the array of the deleted objects
   */
  bulkDelete(data: T[]): Observable<R[] | null>;

  /**
   * Updates a single object in the model collection,
   * replacing all field values with the passed object properties values.
   * @param obj
   * @returns an observable of the updated object
   */
  update(obj: T): Observable<R | null>;

  /**
   * Patches a single object in the model collection,
   * replacing the values of the fields corresponding to the passed object properties.
   * @param data
   * @returns an observable of the patched object
   */
  patch(data: Partial<T> & {id: string}): Observable<R | null>;

  /**
   * Generates additional filters based of the model of the "data" property of
   * the main model. This is overridden by methods which are specific for
   * each concrete DataModelManager.
   * An optional schema for the filters generation can be provided.
   * @param dataSchema The schema of the "additionalData" model
   */
  generateAdditionalFilters(dataSchema?: any): any[];

  /**
   * Checks all Permissions for viewing an object in a given Context
   * @param object The doc to be viewed
   * @param context The permission context data
   * @returns True if the permission is granted
   */
  canView(object: R, context?: PermissionContext): boolean;

  /**
   * Checks all Permissions for creating an objectin a given Context
   * @param object The object to be created
   * @param context The permissions context
   * @returns True if the object can be created
   */
  canCreate(object: InsertModel<T>, context?: PermissionContext): boolean;

  /**
   * Checks all Permissions for modifying an object in a given Context
   * @param data The updates to be performed
   * @param object The object to be modified
   * @param context The permissions context
   * @returns True if the object can be modified
   */
  canModify(data: Partial<T> & {id: string}, object: R, context?: PermissionContext): boolean;

  /**
   * Checks all Permissions for deleting an object in a given Context
   * @param object The object to be deleted
   * @param context The permissions context
   * @returns True if the object can be deleted
   */
  canDelete(object: R, context?: PermissionContext): boolean;
}
