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

import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {
  DataModelManager,
  DataQueryOptions,
  Model,
} from '@dewco/core/data';
import {FormSchema} from '@dewco/core/forms';
import {
  FilterItem,
  FiltersService,
  SearchFiltersComponent,
} from '@dewco/core/list';
import {RxDocument, RxJsonSchema} from 'rxdb';
import {
  BehaviorSubject,
  combineLatest,
  from,
  Observable,
  Subscription,
  throwError,
} from 'rxjs';
import {catchError, map, switchMap, take} from 'rxjs/operators';


export class ListDataSource<T extends Model = Model,
                                      DM extends DataModelManager<T> = DataModelManager<T>> extends
    MatTableDataSource<T> {
  private _modelSchema: RxJsonSchema;
  private _formSchema: FormSchema|undefined;
  get modelSchema(): RxJsonSchema {
    return this._modelSchema;
  }
  private _dataResults: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private _sortParams: BehaviorSubject<Sort|null> = new BehaviorSubject<Sort|null>(null);
  refreshList: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private _dataResultsSub: Subscription = Subscription.EMPTY;
  private _filterParamsSub: Subscription = Subscription.EMPTY;

  constructor(
      private _dataModelManager: DM,
      private _fs: FiltersService,
      formSchema?: FormSchema,
  ) {
    // @TODO (Marco):  formSchema will be provided by FormSchemaManager
    super();

    /**
     * The model RxJsonSchema
     */
    this._modelSchema = this._dataModelManager.collectionSchema;

    /**
     * The AjfFormSchema
     */
    this._formSchema = formSchema;
    this._dataResultsSub = this._dataResults.subscribe(results => {
      this.data = results;
    });

    /**
     * Asks the FilterService to generate all the default filters, providing the model and, if
     * present, form schema.
     */
    this._fs.generateFilters(this._modelSchema, this._formSchema);

    this._filterParamsSub =
        combineLatest([this._fs.queryString, this.refreshList])
            .pipe(
                map(([queryString, refresh]) => (queryString && refresh) ? queryString : ''),
                catchError(err => throwError(err) as Observable<string>),
                )
            .subscribe(queryString => this.queryDM(queryString));
  }

  /**
   * The query results
   */
  get dataResults(): BehaviorSubject<T[]> {
    return this._dataResults;
  }

  /**
   * The dataSource Paginator
   */
  get getPaginator(): MatPaginator|null {
    return this.paginator;
  }
  set setPaginator(paginator: MatPaginator|null) {
    this.paginator = paginator;
  }

  /**
   * The dataSource Sort
   */
  get getSort(): MatSort|null {
    return this.sort;
  }
  set setSort(sort: MatSort|null) {
    this.sort = sort;
  }

  /**
   * The filterComponent associated to the List
   */
  get getFiltersComponent(): SearchFiltersComponent|null {
    return this._filters.getValue();
  }
  set setFiltersComponent(searchFilters: SearchFiltersComponent|null) {
    this._filters.next(searchFilters);
  }
  private _filters: BehaviorSubject<SearchFiltersComponent|null> =
      new BehaviorSubject<SearchFiltersComponent|null>(null);

  /**
   * Returns the items displayed on the current list page
   * @returns The items displayed
   */
  getDisplayedItems(): T[] {
    return this.connect().value;
  }

  /**
   * Creates and returns a Mango Query from the Filters Component encoded queryString.
   * Queries the DataModelManager and updates the dataResults
   * @param queryString The encoded query string
   * @returns The Mango query options
   */
  queryDM(queryString: string): DataQueryOptions {
    if (!queryString) {
      return {selector: {}};
    }
    const filterItems: FilterItem[] = JSON.parse(decodeURI(atob(queryString)));
    let querySelector = {};

    if (!filterItems.find(f => f.name === 'keyword')) {
      this.filter = '';
    }
    filterItems.forEach(item => {
      switch (item.name) {
        case 'keyword':
          this.filter = item.value.trim().toLowerCase();
          break;
        case 'dateStart':
          if (item && item.value) {
            this._addNestedProps(
                querySelector, ['created_at', '$gte'], new Date(item.value).toISOString());
          }
          break;
        case 'dateEnd':
          if (item && item.value) {
            this._addNestedProps(
                querySelector, ['created_at', '$lte'], new Date(item.value).toISOString());
          }
          break;
        case 'location':
        case 'project':
          if (item && item.value) {
            this._addNestedProps(
                querySelector, [`data.${item.name.trim().toLowerCase()}.name`, '$regex'],
                item.value);
          }
          break;
        default:
          if (item) {
            if (!item.isFormData) {
              this._addNestedProps(
                  querySelector,
                  [
                    item.name.trim().toLowerCase(),
                    item.operator ? item.operator.value : '$eq',
                  ],
                  item.value);
            } else {
              this._addNestedProps(
                  querySelector,
                  [
                    `data.data.${item.name.trim().toLowerCase()}`,
                    item.operator ? item.operator.value : '$eq',
                  ],
                  item.value);
            }
          }
          break;
      }
    });
    const query: DataQueryOptions = {
      selector: querySelector,
    };
    this.getQueryResults(query);
    return query;
  }

  /**
   * Queries the dataModelManager and updates the dataResults
   * @param query The query options
   */
  getQueryResults(query: DataQueryOptions) {
    this._dataModelManager.query(query)
        .pipe(
            switchMap((rxdbQuery) => {
              const res = from(rxdbQuery.exec());
              return res;
            }),
            take(1),
            catchError(err => throwError(err) as Observable<RxDocument<T, {}>[]>),
            )
        .subscribe((results) => {
          this._dataResults.next(this._rxDocsToJson(results));
        });
  }

  /**
   * Deletes the selected items from the db
   * @param items The items to delete
   * @return The deleted items
   */
  deleteAction(items: T[]): T[] {
    let results: RxDocument<T>[]|null = [];
    this._dataModelManager.bulkDelete(items)
        .pipe(
            take(1),
            catchError(err => throwError(err) as Observable<RxDocument<T, {}>[]|null>),
            )
        .subscribe(res => {
          results = res;
          this.refreshList.next(true);
        });
    return this._rxDocsToJson(results);
  }

  /**
   * Converts an array of RxDocuments into an array of T objects
   * @param docs RxDocument[]
   * @retun T[]
   */
  private _rxDocsToJson(docs: RxDocument<T>[]): T[] {
    let docsJson: T[] = [];
    docs.forEach(doc => {
      docsJson.push(doc.toJSON());
    });
    return docsJson;
  }

  /**
   * Adds a nested object property and an optional value to an object
   * @param baseObj The object to modify
   * @param props The properties
   * @param value The value to set
   * @returns The modified object
   */
  private _addNestedProps(baseObj: {[key: string]: string|{}}, props: string[], value?: any):
      {[key: string]: string|{}} {
    let lastProp = value != undefined ? props.pop() : false;

    for (let i = 0; i < props.length; i++) {
      baseObj = baseObj[props[i].toString()] = baseObj[props[i].toString()] || {};
    }

    if (lastProp) {
      baseObj = baseObj[lastProp.toString()] = value;
    }

    return baseObj;
  }

  disconnect() {
    this._dataResultsSub.unsubscribe();
    this._filterParamsSub.unsubscribe();

    this._dataResults.complete();
    this._sortParams.complete();
    this.refreshList.complete();
  }
}
