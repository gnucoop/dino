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

import {Observable} from 'rxjs';
import * as RxDb from 'rxdb';

import {DataService} from './data-service';
import {InsertModel} from './insert-model';
import {Model} from './model';

/**
 * This class will manage the data model
 */
export abstract class DataModelManager<T extends Model = Model> {

    constructor(
        private _modelName: string,
        private _dataService: DataService
    ) { }

    /**
     * Call a _dataservice.insert
     * @param obj
     * @return an observable of the created RxDocument
     */
    create(obj: InsertModel<T>): Observable<RxDb.RxDocument<T> | null> {
        const params = {
            collectionName: this._modelName,
            object: obj
        };
        return this._dataService.insert<T>(params);
    }

    /**
     * Call a _dataservice.get
     * @param id
     * @return an observable of the retrieved RxDocument
     */
    get(id: string): Observable<RxDb.RxDocument<T> | null> {
        const params = {
            collectionName: this._modelName,
            id: id
        };
        return this._dataService.get<T>(params);
    }
}
