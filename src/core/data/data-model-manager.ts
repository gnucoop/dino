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

import * as RxDb from 'rxdb';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {DataListOptions, DataQueryOptions} from './data-options-interface';
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
  constructor(
      private _modelName: string,
      private _dataService: DataService,
  ) {}

  /**
   * Creates a RxDocument object with a unique uuidv4 Id in the model collection
   * @param obj
   * @return an observable of the created RxDocument
   */
  create(obj: InsertModel<T>): Observable<RxDb.RxDocument<T>|null> {
    const params = {
      collectionName: this._modelName,
      object: obj,
    };
    return this._dataService.insert<T>(params);
  }

  /**
   * Creates multiple RxDocument objects with a unique uuidv4 Id in the model collection
   * @param data
   * @return an observable of the array of the created RxDocuments
   */
  bulkCreate(data: InsertModel<T>[]): Observable<{success: RxDb.RxDocument<T>[], error: any[]}> {
    const params = {
      collectionName: this._modelName,
      objects: data,
    };
    return this._dataService.bulkInsert<T>(params);
  }

  /**
   * Retrieves a single RxDocument object by id from the model collection
   * @param id
   * @return an observable of the retrieved RxDocument
   */
  get(id: string): Observable<RxDb.RxDocument<T>|null> {
    const params = {
      collectionName: this._modelName,
      id: id,
    };
    return this._dataService.get<T>(params);
  }

  /**
   * Retrieves a list of RxDocument objects from the model collections.
   * Optional parameters can be passed to modify the returned list.
   * @param options? a list of DataListOptions options.
   * @return  RxQuery object for multiple documents selection.
   */
  list(options?: DataListOptions): Observable<RxDb.RxQuery<T, RxDb.RxDocument<T>[]>> {
    const params = {
        collectionName: this._modelName,
        query: options ?? null,
    };
    return this._dataService.find<T>(params);
  }

  /**
   * Performs a query on the model collection, given a list of options
   * (a mango query selector is a required option).
   * Optional parameters can be passed to modify the returned list.
   * @param options a list of DataQueryOptions parameters.
   * @return RxQuery object for multiple documents selection.
   */
  query(options: DataQueryOptions): Observable<RxDb.RxQuery<T, RxDb.RxDocument<T>[]>> {
    const params = {
      collectionName: this._modelName,
      query: options,
    };
    return this._dataService.find<T>(params);
  }

  /**
   * Removes a single RxDocument object by id from the model collection
   * @param data
   * @return an observable of the deleted RxDocument
   */
  delete(data: string|T): Observable<RxDb.RxDocument<T>|null> {
    const params = {
      collectionName: this._modelName,
      query: {id: (typeof data === 'string' ? data : data.id)},
    };

    return this._dataService.findOne<T>(params).pipe(
        switchMap((query) => {
          return (query.remove());
        }),
    );
  }

  /**
   * Updates a single RxDocument object in the model collection,
   * replacing all field values with the passed object properties values.
   * @param obj
   * @return an observable of the updated RxDocument
   */
  update(obj: T): Observable<RxDb.RxDocument<T>|null> {
    const params = {
      collectionName: this._modelName,
      query: {id: obj.id},
    };
    return this._dataService.findOne<T>(params).pipe(
        switchMap((query) => {
          return (query.update(this._prepareUpdateQuery(obj)));
        }),
    );
  }

  /**
   * Patches a single RxDocument object in the model collection,
   * replacing the values of the fields corresponding to the passed object properties.
   * @param data
   * @return an observable of the patched RxDocument
   */
  patch(data: Partial<T>&{id: string}): Observable<RxDb.RxDocument<T>|null> {
    const params = {
      collectionName: this._modelName,
      query: {id: data.id},
    };
    return this._dataService.findOne<T>(params).pipe(
        switchMap((query) => {
          return (query.update(this._prepareUpdateQuery(data)));
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
}
