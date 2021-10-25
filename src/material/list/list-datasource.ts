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

import {Optional} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {
  clone,
  CollectionChangedEvent,
  DataModelManager,
  DataQueryOptions,
  Model,
} from '@dino/core/data';
import {FilterItem, FiltersService, SearchFiltersComponent} from '@dino/core/list';
import {RxDocument, RxJsonSchema} from 'rxdb';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  Observable,
  of as obsOf,
  Subject,
  throwError,
} from 'rxjs';
import {catchError, map, skipWhile, switchMap, take, takeUntil} from 'rxjs/operators';

/**
 * This class extends MatTableDataSource, and augments it with additional functionalities.
 * It is associated to a SelectionList component, managing and retrieving data for the list, via
 * the DataModelManager.
 * This DataSource subscribes to an encoded queryString of parameters in the FiltersService,
 * which is used to generate a Mango Query for the DataModelManager, to query the db and
 */
export class ListDataSource<
  T extends Model = Model,
  AD extends Model = Model,
> extends MatTableDataSource<T> {
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
  get getPaginator(): MatPaginator | null {
    return this.paginator;
  }
  set setPaginator(paginator: MatPaginator | null) {
    this.paginator = paginator;
  }

  /**
   * The ListDataSource Sort material component
   */
  get getSort(): MatSort | null {
    return this.sort;
  }
  set setSort(sort: MatSort | null) {
    this.sort = sort;
  }

  /**
   * The Filters Component associated to this ListDataSource (eg. a SearchFiltersBar)
   */
  private _filtersComponent: BehaviorSubject<SearchFiltersComponent | null> =
    new BehaviorSubject<SearchFiltersComponent | null>(null);

  get getFiltersComponent(): SearchFiltersComponent | null {
    return this._filtersComponent.getValue();
  }
  set setFiltersComponent(component: SearchFiltersComponent | null) {
    this._filtersComponent.next(component);
  }

  /**
   * The RxJsonSchema of the model associated with the ListDataSource
   */
  private _modelSchema: RxJsonSchema<T>;
  get modelSchema(): RxJsonSchema<T> {
    return this._modelSchema;
  }

  /**
   * The model of the "data" property associated with the ListDataSource main model.
   */
  private _additionalDataSchema: BehaviorSubject<AD | null> = new BehaviorSubject<AD | null>(null);
  get additionalDataSchema(): AD {
    return this._additionalDataSchema.value as AD;
  }
  set additionalDataSchema(dataSchema: AD) {
    this._additionalDataSchema.next(dataSchema);
  }

  /**
   * The data resulting from querying the db via the DataModelManager
   */
  private _dataResults: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);

  get dataResults(): BehaviorSubject<T[]> {
    return this._dataResults;
  }

  /**
   * Main unsub subject.
   * Used for unsubscribing all subscriptions.
   */
  private _mainUnsubscribe: Subject<void> = new Subject();

  /**
   * @param _dataModelManager The main model DataModelManager.
   * @param _fs The service managing the List filters.
   * @param _additionalDataManager The optional manager used to generate additional
   * filters from the "data" property of the main model.
   * @param _isFormDataList If true, this is the datasource for a list of FormDatas.
   */
  constructor(
    private _dataModelManager: DataModelManager<T>,
    private _fs: FiltersService,
    @Optional() private _additionalDataManager?: DataModelManager<AD>,
    private _isFormDataList: boolean = false,
  ) {
    super();

    this._modelSchema = this._dataModelManager.collectionSchema;

    this._dataResults.pipe(takeUntil(this._mainUnsubscribe)).subscribe(results => {
      this.data = results;
    });

    if (this._dataModelManager.detailsManager != null) {
      this._dataModelManager.detailsManager.init().pipe(take(1)).subscribe();
    }

    // Here we ask the FilterService to generate all the filters based on the model RxJsonSchema
    this._fs.generateModelFilters(this._modelSchema as RxJsonSchema<Model>);

    // Next we call the method that generates additional filters on the additional DataManager
    // (if present) and set the additional filters on the FiltersService.
    // If no additional DataManager or data schema are provided, the additional filters
    // are set to an empty array.
    this._additionalDataSchema.pipe(takeUntil(this._mainUnsubscribe)).subscribe(dataSchema => {
      if (dataSchema != null) {
        let additionalFilters = [];
        if (this._additionalDataManager) {
          this._additionalDataManager.init().pipe(take(1)).subscribe();
          additionalFilters = this._additionalDataManager.generateAdditionalFilters(dataSchema);
        }
        this._fs.setAdditionalFilters(additionalFilters);
      }
    });

    this._dataModelManager.collectionChanged
      .pipe(takeUntil(this._mainUnsubscribe))
      .subscribe(evt => {
        this.refreshListData.next(evt);
      });

    // Subscribes to the FiltersService queryString, and generates a Mango Query from it.
    combineLatest([
      this._fs.queryString,
      this.refreshListData,
      this._additionalDataSchema.pipe(skipWhile(schema => this._isFormDataList && schema == null)),
    ])
      .pipe(
        map(([queryString, refresh, addSchema]) => {
          if (queryString && refresh) {
            return {queryString, addSchema};
          } else {
            return {queryString: '', addSchema};
          }
        }),
        catchError(
          err => throwError(err) as Observable<{queryString: string; addSchema: AD | null}>,
        ),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe(res => this.queryDM(res.queryString, res.addSchema));
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
   * @param additionalDataSchema? The additional data schema
   * @returns The Mango query with the generated query selector
   */
  queryDM(queryString: string, additionalDataSchema?: AD | null): DataQueryOptions {
    let querySelector: {[key: string]: any} = {};
    let detailsQuerySelector: {[key: string]: any} = {};

    if (!queryString) {
      return {selector: querySelector};
    }
    const filterItems: FilterItem[] = JSON.parse(decodeURI(atob(queryString)));

    if (!filterItems.find(f => f.name === 'keyword')) {
      this.filter = '';
    }
    filterItems.forEach(item => {
      const selector: {} = item.isFilterItemDetails ? detailsQuerySelector : querySelector;
      switch (item.name) {
        case 'keyword':
          this.filter = item.value.trim().toLowerCase();
          break;
        case 'dateStart':
          if (item && item.value) {
            this._addNestedProps(
              selector,
              ['created_at', '$gte'],
              new Date(item.value).toISOString(),
            );
          }
          break;
        case 'dateEnd':
          if (item && item.value) {
            this._addNestedProps(
              selector,
              ['created_at', '$lte'],
              new Date(item.value).toISOString(),
            );
          }
          break;
        default:
          if (!item.isAdditionalFilter) {
            if (this._fs.availableBasicFilterLabels.indexOf(item.name) > -1 && item.value) {
              this._addNestedProps(
                selector,
                [`data.${item.name.trim().toLowerCase()}.name`, '$regex'],
                item.value,
              );
            } else {
              this._addNestedProps(
                selector,
                [item.name.trim().toLowerCase(), item.operator ? item.operator.value : '$eq'],
                item.value,
                item.operator?.options,
              );
            }
          } else {
            this._addNestedProps(
              selector,
              [
                this._isFormDataList
                  ? `data.${item.name.trim().toLowerCase()}`
                  : `data.data.${item.name.trim().toLowerCase()}`,
                item.operator ? item.operator.value : '$eq',
              ],
              item.value,
              item.operator?.options,
            );
          }
          break;
      }
    });

    if (additionalDataSchema != null) {
      this._addNestedProps(querySelector, ['schema_id', '$eq'], additionalDataSchema.id);
    }

    this._addNestedProps(querySelector, ['is_deleted', '$eq'], false);

    const query: DataQueryOptions = {
      selector: querySelector,
    };
    const detailsQuery: DataQueryOptions = {
      selector: detailsQuerySelector,
    };

    this.getQueryResults(query, detailsQuery);
    return query;
  }

  /**
   * Queries the dataModelManager and updates the dataResults
   * @param query The query object
   * @param detailsQuery? The optional query, performed by the dataModelManager detailsManager
   */
  getQueryResults(query: DataQueryOptions, detailsQuery?: DataQueryOptions): void {
    const dmMainQuery = this._dataModelManager.query(query).pipe(
      switchMap(rxdbQuery => {
        const res = from(rxdbQuery.exec());
        return res;
      }),
      take(1),
      catchError(err => throwError(err) as Observable<RxDocument<T, {}>[]>),
    );

    let dmDetailsQuery: Observable<RxDocument<T, {}>[]> = obsOf([]);
    const hasDetailsQuery = detailsQuery != null && Object.keys(detailsQuery.selector).length > 0;

    if (detailsQuery != null && hasDetailsQuery && this._dataModelManager.detailsManager != null) {
      dmDetailsQuery = this._dataModelManager.detailsManager.query(detailsQuery).pipe(
        switchMap(rxdbQuery => {
          const res = from(rxdbQuery.exec());
          return res;
        }),
        take(1),
        catchError(err => throwError(err) as Observable<RxDocument<T, {}>[]>),
      );
    }

    forkJoin([dmMainQuery, dmDetailsQuery, this._dataModelManager.permissionContext]).subscribe(
      ([mainDocs, detailsDocs, context]) => {
        const detailsKey = this._dataModelManager.detailsKey;
        let resultDocs = mainDocs;
        if (detailsKey != null && hasDetailsQuery) {
          resultDocs = mainDocs.filter(doc =>
            detailsDocs.some(detailDoc => doc[detailsKey] == detailDoc[detailsKey]),
          );
        }
        if (this._dataModelManager.permissions.some(permission => permission.canView != null)) {
          resultDocs = resultDocs.filter(doc => {
            for (let permission of this._dataModelManager.permissions) {
              if (permission.canView != null) {
                const allowedToView = permission.canView({object: doc, context: context});
                if (!allowedToView) {
                  return false;
                }
              }
            }
            return true;
          });
        }
        this._dataResults.next(this._rxDocsToJson(resultDocs));
      },
    );
  }

  /**
   * Retrieves the subdata from the dataModelManager, based on the
   * provided parent row object.
   * @param row The parent row object
   * @param querySelector? Additional query params
   * @returns The details data
   */
  getDetailsData(row: T, querySelector?: {}): Observable<T[]> {
    if (
      this._dataModelManager == null ||
      this._dataModelManager.detailsManager == null ||
      this._dataModelManager.getSubData == null
    ) {
      return obsOf([]);
    }
    return this._dataModelManager.getSubData(row, querySelector);
  }

  /**
   * Deletes the selected items from the db
   * @param items The items to delete
   * @returns The deleted items
   */
  deleteAction(items: T[], isDetails: boolean = false): T[] {
    let results: RxDocument<T>[] | null = [];
    const dm =
      isDetails && this._dataModelManager.detailsManager != null
        ? this._dataModelManager.detailsManager
        : this._dataModelManager;
    dm.bulkDelete(items)
      .pipe(
        take(1),
        catchError(err => throwError(err) as Observable<RxDocument<T, {}>[] | null>),
      )
      .subscribe(res => {
        results = res;
        this.refreshListData.next({
          timestamp: new Date().getTime(),
          collection: dm.collectionName,
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
      docsJson.push(clone(doc.toJSON()) as T);
    });
    return docsJson;
  }

  /**
   * Adds a nested object property and an optional value to an object
   * @param baseObj The object to modify
   * @param props The property names tree. The last one is the name of nested property to be added
   * @param value? The optional value to set for the added property.
   * @param options? The optional regex flags.
   * @returns The modified object
   */
  private _addNestedProps(
    baseObj: {[key: string]: string | {}},
    props: string[],
    value?: any,
    options?: any,
  ): {[key: string]: string | {}} {
    let lastProp = value != undefined ? props.pop() : false;

    for (let i = 0; i < props.length; i++) {
      baseObj = baseObj[props[i].toString()] = baseObj[props[i].toString()] || {};
    }

    if (lastProp) {
      baseObj[lastProp.toString()] = value;
      if (options != null && lastProp === '$regex') {
        baseObj[lastProp.toString()] = new RegExp(value, options);
      }
    }

    return baseObj;
  }

  /**
   * Disconnects the ListDataSource, unsubscribing from the data and the filters
   */
  override disconnect(): void {
    this._mainUnsubscribe.next();
    this._mainUnsubscribe.complete();

    this._dataResults.complete();
    this.refreshListData.complete();
  }
}
