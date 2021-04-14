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

import {Optional} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {
  CollectionChangedEvent,
  DataModelManager,
  DataQueryOptions,
  Model,
} from '@dewco/core/data';
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
  Subject,
  Subscription,
  throwError,
} from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  take,
} from 'rxjs/operators';

/**
 * This class extends MatTableDataSource, and augments it with additional functionalities.
 * It is associated to a SelectionList component, managing and retrieving data for the list, via
 * the DataModelManager.
 * This DataSource subscribes to an encoded queryString of parameters in the FiltersService,
 * which is used to generate a Mango Query for the DataModelManager, to query the db and
 */
export class ListDataSource<T extends Model = Model, AD extends Model = Model> extends
    MatTableDataSource<T> {
  /**
   * Determines if the list data can be updated, and the SelectionList refreshed
   */
  refreshListData: BehaviorSubject<CollectionChangedEvent> =
      new BehaviorSubject<CollectionChangedEvent>({
        timestamp: new Date().getTime(),
        collection: '',
        action: 'init datasource',
      });

  /**
   * The ListDataSource Paginator material component
   */
  get getPaginator(): MatPaginator|null {
    return this.paginator;
  }
  set setPaginator(paginator: MatPaginator|null) {
    this.paginator = paginator;
  }

  /**
   * The ListDataSource Sort material component
   */
  get getSort(): MatSort|null {
    return this.sort;
  }
  set setSort(sort: MatSort|null) {
    this.sort = sort;
  }

  /**
   * The Filters Component associated to this ListDataSource (eg. a SearchFiltersBar)
   */
  private _filtersComponent: BehaviorSubject<SearchFiltersComponent|null> =
      new BehaviorSubject<SearchFiltersComponent|null>(null);

  get getFiltersComponent(): SearchFiltersComponent|null {
    return this._filtersComponent.getValue();
  }
  set setFiltersComponent(component: SearchFiltersComponent|null) {
    this._filtersComponent.next(component);
  }

  /**
   * The RxJsonSchema of the model associated with the ListDataSource
   */
  private _modelSchema: RxJsonSchema;
  get modelSchema(): RxJsonSchema {
    return this._modelSchema;
  }

  /**
   * The model of the "data" property associated with the ListDataSource main model.
   */
  private _additionalDataSchema: Subject<AD> = new Subject<AD>();

  set additionalDataSchema(dataSchema: AD) {
    this._additionalDataSchema.next(dataSchema);
  }

  /**
   * Subscribes to the additionalDataSchema and asks the FiltersService to
   * generate filters from it when one is provided.
   */
  private _additionalDataSub: Subscription = Subscription.EMPTY;

  /**
   * The data resulting from querying the db via the DataModelManager
   */
  private _dataResults: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  get dataResults(): BehaviorSubject<T[]> {
    return this._dataResults;
  }

  /**
   * Subscribes to the _dataResults and updates the actual MatTableDataSource data
   */
  private _dataResultsSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the FiltersService queryString, and generates a Mango Query from it
   */
  private _filterParamsSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the collectionChanged event of the data service, and
   * refreshes the data whenever it's emitted.
   */
  private _collectionChangedSub: Subscription = Subscription.EMPTY;

  /**
   * @param _dataModelManager The main model DataModelManager.
   * @param _fs The service managing the List filters.
   * @param _additionalDataManager The optional manager used to generate additional
   * filters from the "data" property of the main model.
   */
  constructor(
      private _dataModelManager: DataModelManager<T>,
      private _fs: FiltersService,
      @Optional() private _additionalDataManager?: DataModelManager<AD>,
  ) {
    super();

    this._modelSchema = this._dataModelManager.collectionSchema;

    this._dataResultsSub = this._dataResults.subscribe(results => {
      this.data = results;
    });

    // Here we ask the FilterService to generate all the filters based on the model RxJsonSchema
    this._fs.generateModelFilters(this._modelSchema);

    // Next we call the method that generates additional filters on the additional DataManager
    // (if present) and set the additional filters on the FiltersService.
    // If no additional DataManager or data schema are provided, the additional filters
    // are set to an empty array.
    this._additionalDataSub = this._additionalDataSchema.subscribe(dataSchema => {
      let additionalFilters = [];
      if (this._additionalDataManager) {
        additionalFilters = this._additionalDataManager.generateAdditionalFilters(dataSchema);
      }
      this._fs.setAdditionalFilters(additionalFilters);
    });

    this._collectionChangedSub = this._dataModelManager.collectionChanged.subscribe(evt => {
      this.refreshListData.next(evt);
    });

    this._filterParamsSub =
        combineLatest([
          this._fs.queryString,
          this.refreshListData,
        ])
            .pipe(
                map(([queryString, refresh]) => (queryString && refresh) ? queryString : ''),
                catchError(err => throwError(err) as Observable<string>),
                )
            .subscribe(queryString => this.queryDM(queryString));
  }


  /**
   * Returns the items displayed on the current list page
   * @returns The items displayed
   */
  getDisplayedItems(): T[] {
    return this.connect().value;
  }

  /**
   * Creates and returns a Mango Query from the Filters Component encoded queryString.
   * Queries the DataModelManager and updates the dataResults.
   * @param queryString The encoded query string of parameters
   * @returns The Mango query with the generated query selector
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
        default:
          if (!item.isAdditionalFilter) {
            if (this._fs.availableBasicFilterLabels.indexOf(item.name) > -1 && item.value) {
              this._addNestedProps(
                  querySelector, [`data.${item.name.trim().toLowerCase()}.name`, '$regex'],
                  item.value);
            } else {
              this._addNestedProps(
                  querySelector,
                  [
                    item.name.trim().toLowerCase(),
                    item.operator ? item.operator.value : '$eq',
                  ],
                  item.value);
            }
          } else {
            this._addNestedProps(
                querySelector,
                [
                  `data.data.${item.name.trim().toLowerCase()}`,
                  item.operator ? item.operator.value : '$eq',
                ],
                item.value);
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
   * @param query The query object
   */
  getQueryResults(query: DataQueryOptions): void {
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
   * @returns The deleted items
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
          this.refreshListData.next({
            timestamp: new Date().getTime(),
            collection: this._dataModelManager.collectionName,
            action: 'delete',
          });
        });
    return this._rxDocsToJson(results);
  }

  /**
   * Converts an array of RxDocuments into an array of T objects
   * @param docs RxDocument[]
   * @returns The converted objects
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
   * @param props The property names tree. The last one is the name of nested property to be added
   * @param value? The optional value to set for the added property.
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

  /**
   * Disconnects the ListDataSource, unsubscribing from the data and the filters
   */
  disconnect(): void {
    this._additionalDataSub.unsubscribe();
    this._collectionChangedSub.unsubscribe();
    this._dataResultsSub.unsubscribe();
    this._filterParamsSub.unsubscribe();

    this._dataResults.complete();
    this.refreshListData.complete();
  }
}
