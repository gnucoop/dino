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
import {EventEmitter, Optional} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort, SortDirection} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {
  clone,
  CollectionChangedEvent,
  DataModelManager,
  DataQueryOptions,
  DataQuerySortDir,
  Model,
  PermissionContext,
} from '@dino/core/data';
import {FilterItem, FiltersService, ListHeader, SearchFiltersComponent} from '@dino/core/list';
import {format} from 'date-fns';
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
import {
  catchError,
  map,
  shareReplay,
  skipWhile,
  switchMap,
  take,
  takeUntil,
  throttleTime,
} from 'rxjs/operators';

/**
 * Dictionary of label/values for Schema choices
 */
export type ChoicesDicitionary = {[key: string]: {label: string; value: string}[]};

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
   * Event that emits whenever an action performed on an Item throws an error
   */
  actionErrorEvt: EventEmitter<Error> = new EventEmitter<Error>();

  /**
   * A Material sort triggering queries sorting for indexed fields
   * (NOT connected to the material datasource)
   */
  customSort: BehaviorSubject<MatSort | null> = new BehaviorSubject<MatSort | null>(null);

  /**
   * The ListDataSource Sort material component
   */
  get getSort(): MatSort | null {
    return this.customSort.getValue();
  }
  set setSort(sort: MatSort | null) {
    if (sort == null) {
      return;
    }
    this.customSort.next(sort);
  }

  /**
   * A Material paginator triggering queries with limit and skip
   * (NOT connected to the material datasource)
   */
  customPaginator: BehaviorSubject<MatPaginator | null> = new BehaviorSubject<MatPaginator | null>(
    null,
  );

  /**
   * The ListDataSource Paginator material component
   */
  get getPaginator(): MatPaginator | null {
    return this.customPaginator.getValue();
  }
  set setPaginator(paginator: MatPaginator | null) {
    if (paginator == null) {
      return;
    }
    this.customPaginator.next(paginator);
  }

  /**
   * The schema Choices dictionary
   */
  private _choices: ChoicesDicitionary | null = null;
  get choices(): ChoicesDicitionary | null {
    return this._choices;
  }

  /**
   * The Material paginator current page index
   */
  customPaginatorCurrentPageIndex: number = 0;

  /**
   * The Material paginator length observable
   */
  customPaginatorLength: EventEmitter<number> = new EventEmitter<number>();

  /**
   * The list currently displayed Headers for the model Data
   */
  private _dataHeaders: BehaviorSubject<ListHeader<T>[]> = new BehaviorSubject<ListHeader<T>[]>([]);
  set dataHeaders(headers: ListHeader<T>[]) {
    if (headers == null) {
      return;
    }
    this._dataHeaders.next(headers);
  }

  /**
   * The maximum index of repeating slides instances on which filtering is performed.
   * Defaults to 9.
   */
  private _maxRepeatingSlidesFiltering: number = 9;
  set maxRepeatingSlidesFiltering(max: number) {
    if (max == null) {
      return;
    }
    this._maxRepeatingSlidesFiltering = max;
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
   * @param _isDataList If not null, this is the datasource for a list of Form or Report Datas.
   * @param _isAggregationList If not null, this is the datasource for an aggregation list of Form or Report Datas.
   */
  constructor(
    private _dataModelManager: DataModelManager<T>,
    private _fs: FiltersService,
    @Optional() private _additionalDataManager?: DataModelManager<AD>,
    private _isDataList: 'form' | 'report' | null = null,
    private _isAggregationList: 'form' | 'report' | null = null,
  ) {
    super();
    this._modelSchema = this._dataModelManager.collectionSchema;
    this.data = [];
    this._dataResults.pipe(takeUntil(this._mainUnsubscribe)).subscribe(results => {
      this.data = results;
    });

    // Here we ask the FilterService to generate all the filters based on the model RxJsonSchema
    this._fs.generateModelFilters(this._modelSchema as RxJsonSchema<Model>);

    // Next we call the method that generates additional filters on the additional DataManager
    // (if present) and set the additional filters on the FiltersService.
    // If no additional DataManager or data schema are provided, the additional filters
    // are set to an empty array.
    this._additionalDataSchema.pipe(takeUntil(this._mainUnsubscribe)).subscribe(dataSchema => {
      if (dataSchema != null) {
        this._choices = this._getChoices();
        let additionalFilters = [];
        if (this._additionalDataManager) {
          additionalFilters = this._additionalDataManager.generateAdditionalFilters(dataSchema);
        }
        this._fs.setAdditionalFilters(additionalFilters);
      }
    });

    this._dataModelManager.collectionChanged
      .pipe(takeUntil(this._mainUnsubscribe), throttleTime(500))
      .subscribe(evt => {
        this.refreshListData.next(evt);
      });

    // Subscribes to the FiltersService queryString, and generates a Mango Query from it.
    combineLatest([
      this._fs.queryString,
      this._dataModelManager.permissionContext,
      this.refreshListData,
      this._additionalDataSchema.pipe(
        skipWhile(schema => this._isDataList != null && schema == null),
      ),
      this.customPaginator.pipe(switchMap(pag => (pag ? pag.page : obsOf(null)))),
      this.customSort.pipe(
        switchMap(sort =>
          sort
            ? sort.sortChange
            : obsOf(
                this._isAggregationList
                  ? {
                      active: `${this._isAggregationList}_schema_ref_id`,
                      direction: 'asc' as SortDirection,
                    }
                  : null,
              ),
        ),
      ),
      this._dataHeaders,
    ])
      .pipe(
        map(
          ([
            queryString,
            permissionContext,
            refreshEvt,
            addSchema,
            pageEvt,
            sortEvt,
            dataHeaders,
          ]) => {
            if (pageEvt) {
              if (
                this.getPaginator &&
                this.customPaginatorCurrentPageIndex == pageEvt.pageIndex &&
                pageEvt.pageIndex != 0
              ) {
                pageEvt = this._resetPaginator(pageEvt);
              }
              if (
                this.getPaginator &&
                (pageEvt.previousPageIndex ?? 0) <= pageEvt.pageIndex &&
                this.data.length < pageEvt.pageSize
              ) {
                pageEvt = this._resetPaginator(pageEvt);
              }
              this.customPaginatorCurrentPageIndex = pageEvt.pageIndex;
            }

            if (queryString && refreshEvt) {
              return {queryString, permissionContext, pageEvt, sortEvt, addSchema, dataHeaders};
            } else {
              return {queryString: '', permissionContext, pageEvt, sortEvt, addSchema, dataHeaders};
            }
          },
        ),
        catchError(
          err =>
            throwError(() => new Error(err)) as Observable<{
              queryString: string;
              permissionContext: PermissionContext;
              addSchema: AD | null;
              pageEvt: PageEvent | null;
              sortEvt: Sort | null;
              dataHeaders: ListHeader<T>[];
            }>,
        ),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe(res =>
        this.queryDM(
          res.queryString,
          res.permissionContext,
          res.addSchema,
          res.pageEvt,
          res.sortEvt,
          res.dataHeaders,
        ),
      );
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
   * @param permissionContext The user permissions context
   * @param additionalDataSchema? The additional data schema
   * @param page? The paginator change event
   * @returns The Mango query with the generated query selector
   */
  queryDM(
    queryString: string,
    permissionContext: PermissionContext,
    additionalDataSchema?: AD | null,
    page?: PageEvent | null,
    sort?: Sort | null,
    dataHeaders?: ListHeader<T>[],
  ): DataQueryOptions {
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
      const selector: {[key: string]: any} = item.isFilterItemDetails
        ? detailsQuerySelector
        : querySelector;
      switch (item.name) {
        case 'keyword':
          if (dataHeaders) {
            const dataHeadersSearchExpressions = dataHeaders
              .filter(h => h.dataColumn)
              .map(header => {
                // Repeating Slide Field Filter
                if (header.repeatingSlideColumn) {
                  const repeatedFilters: {[key: string]: {$eq: string}}[] = [];
                  let slideIdx = 0;
                  while (slideIdx <= this._maxRepeatingSlidesFiltering) {
                    repeatedFilters.push({
                      [`data.${header.column.toString()}__${slideIdx}`]: {
                        '$eq': item.value,
                      },
                    });
                    slideIdx++;
                  }
                  return repeatedFilters;
                }
                // Single Slide Field Filter
                else {
                  return {
                    [`data.${header.column.toString()}`]: {
                      '$eq': item.value,
                    },
                  };
                }
              });
            const headersSearchExpressions = dataHeaders
              .filter(h => !h.dataColumn)
              .map(header => {
                return {
                  [`${header.column.toString()}`]: {
                    '$eq': item.value,
                  },
                };
              });
            selector['$or'] = [
              ...dataHeadersSearchExpressions.flat(1),
              ...headersSearchExpressions,
            ];
          }

          break;
        case 'dateStart':
          if (item && item.value) {
            this._addNestedProps(
              selector,
              ['created_at', '$gte'],
              format(new Date(item.value), 'yyyy-MM-dd'),
            );
          }
          break;
        case 'dateEnd':
          if (item && item.value) {
            this._addNestedProps(
              selector,
              ['created_at', '$lte'],
              format(new Date(item.value), 'yyyy-MM-dd'),
            );
          }
          break;
        default:
          // Basic Filter
          if (!item.isAdditionalFilter) {
            if (this._fs.availableBasicFilterLabels.indexOf(item.name) > -1 && item.value) {
              this._addNestedProps(
                selector,
                [`${item.name.trim().toLowerCase()}_ref_id`, '$regex'],
                item.value.id,
              );
            } else {
              this._addNestedProps(
                selector,
                [item.name.trim().toLowerCase(), item.operator ? item.operator.value : '$eq'],
                item.value,
                item.operator?.options,
              );
            }
            // Additional Filter
          } else {
            // Repeating Slide Field Filter
            if (item.isRepeatingSlideFilter) {
              const repeatedFilters: {[key: string]: any}[] = [];
              let slideIdx = 0;
              while (slideIdx <= this._maxRepeatingSlidesFiltering) {
                repeatedFilters.push({
                  [this._isDataList != null
                    ? `data.${item.name}__${slideIdx}`
                    : `data.data.${item.name}__${slideIdx}`]: {
                    [item.operator ? item.operator.value : '$eq']: item.value,
                  },
                });
                slideIdx++;
              }
              if (selector['$or'] && selector['$or'].length) {
                selector['$or'] = [...selector['$or'], ...repeatedFilters];
              } else {
                selector['$or'] = repeatedFilters;
              }
              // Single Slide Field Filter
            } else {
              this._addNestedProps(
                selector,
                [
                  this._isDataList != null
                    ? `data.${item.name.trim().toLowerCase()}`
                    : `data.data.${item.name.trim().toLowerCase()}`,
                  item.operator ? item.operator.value : '$eq',
                ],
                item.value,
                item.operator?.options,
              );
            }
          }
          break;
      }
    });
    if (additionalDataSchema != null && this._isDataList != null) {
      const schemaKey = this._isDataList === 'form' ? 'form_schema_ref_id' : 'report_schema_ref_id';
      this._addNestedProps(querySelector, [schemaKey, '$eq'], additionalDataSchema.id);
    }
    if (
      this._isAggregationList &&
      permissionContext['user_form_schemas'] != null &&
      !permissionContext['user_form_schemas'].has('all')
    ) {
      this._addNestedProps(
        querySelector,
        [`${this._isAggregationList}_schema_ref_id`, '$in'],
        [...permissionContext['user_form_schemas']],
      );
    }

    this._addNestedProps(querySelector, ['is_deleted', '$ne'], true);

    const query: DataQueryOptions = {
      selector: querySelector,
      limit: this.getPaginator?.pageSize ?? 10,
    };
    if (page) {
      query.limit = page.pageSize;
      query.skip = page.pageSize * page.pageIndex;
    }
    if (sort) {
      query.sort = [{[sort.active]: sort.direction as DataQuerySortDir}];
    }
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
      take(1),
      catchError(err => throwError(() => err) as Observable<RxDocument<T, {}>[]>),
    );

    let dmDetailsQuery: Observable<RxDocument<T, {}>[]> = obsOf([]);
    const hasDetailsQuery = detailsQuery != null && Object.keys(detailsQuery.selector).length > 0;

    if (detailsQuery != null && hasDetailsQuery && this._dataModelManager.detailsManager != null) {
      dmDetailsQuery = this._dataModelManager.detailsManager.query(detailsQuery).pipe(
        take(1),
        catchError(err => throwError(() => err) as Observable<RxDocument<T, {}>[]>),
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
        const populatedDocs = this._populateDocRefs(resultDocs);
        if (this.getPaginator != null) {
          this.customPaginatorLength.emit(
            (this.getPaginator.pageIndex + 1) * populatedDocs.length * this.getPaginator.pageSize,
          );
        }
        this._dataResults.next(populatedDocs);
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
        catchError(err => throwError(() => new Error(err))),
      )
      .subscribe({
        next: res => {
          results = res;
          this.refreshListData.next({
            timestamp: new Date().getTime(),
            collection: dm.collectionName,
            action: 'delete',
          });
        },
        error: err => this.actionErrorEvt.emit(err),
      });
    return results ? this._rxDocsToJson(results) : [];
  }

  /**
   * Retrieves all choices label/values from the schema (if present) for all
   * the fields, so that the list can show choice Labels instead of raw data values.
   * @returns The field -> choices dictionary, if available.
   */
  private _getChoices(): ChoicesDicitionary | null {
    if (this._additionalDataSchema.value == null) {
      return null;
    }
    const schema: {[key: string]: any} = this._additionalDataSchema.value as {[key: string]: any};
    if (
      schema == null ||
      schema['schema'] == null ||
      schema['schema']['nodes'] == null ||
      schema['schema']['choicesOrigins'] == null
    ) {
      return null;
    }
    const schemaSlides: {[key: string]: any}[] = schema['schema']['nodes'];
    const schemaChoicesOrigins: {[key: string]: any} = {};
    const choicesDicitionary: {[key: string]: any} = {};
    schema['schema']['choicesOrigins'].forEach((ch: {[key: string]: any}) => {
      schemaChoicesOrigins[ch['name']] = ch['choices'];
    });
    schemaSlides.forEach((slide: {[key: string]: any}) =>
      slide['nodes'].forEach((field: {[key: string]: any}) => {
        if (field['choicesOriginRef']) {
          choicesDicitionary[field['name']] = schemaChoicesOrigins[field['choicesOriginRef']];
        }
      }),
    );

    return choicesDicitionary;
  }

  /**
   * Resets the Custom Paginator to the first page
   * @param pageEvt The pagination change event
   * @returns The reset pagination change event
   */
  private _resetPaginator(pageEvt: PageEvent): PageEvent {
    pageEvt.pageIndex = 0;
    this.customPaginatorCurrentPageIndex = 0;
    if (this.getPaginator) {
      this.getPaginator.firstPage();
    }
    return pageEvt;
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
   * Populates all references to external collections in RxDocuments
   * @param docs RxDocument array
   * @returns The documents with populated refs
   */
  private _populateDocRefs(docs: RxDocument<T>[]): RxDocument<T>[] {
    return docs.map(doc => {
      let refProps = {};
      for (let prop in doc) {
        if (prop.includes('_ref_id')) {
          const propKey = prop.replace('_ref_id', '') as keyof RxDocument<T>;
          let refProp;
          try {
            refProp = {[propKey]: from(doc.populate(prop)).pipe(shareReplay(1))};
          } catch (_) {
            refProp = {[propKey]: obsOf(null)};
          }
          refProps = {...refProps, ...refProp};
        }
      }
      const popDoc = {...deepCopy(doc), ...refProps} as RxDocument<T>;
      return popDoc;
    });
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
