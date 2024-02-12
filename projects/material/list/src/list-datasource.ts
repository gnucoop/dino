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
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {
  clone,
  CollectionChangedEvent,
  DataModelManager,
  DataQueryOptions,
  DataQuerySortDir,
  Metric,
  Model,
  PermissionContext,
} from '@dino/core/data';
import {FilterItem, FiltersService, ListHeader, SearchFiltersComponent} from '@dino/core/list';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {format} from 'date-fns';
import {
  DepsOrigin,
  FormData,
  FormSchema,
  FormSchemaDeps,
  FormSchemaManager,
} from '@dino/core/forms';
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
  zip,
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
import {
  AjfChoicesOrigin,
  AjfField,
  AjfFieldType,
  AjfNode,
  AjfRepeatingSlide,
  AjfSlide,
  isField,
  isFieldWithChoices,
  isRepeatingContainerNode,
} from '@ajf/core/forms';

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
   * Query options to retrieve all items using user filters. Without pagination.
   * Used by the export function.
   */
  private _filteredQueryObs: Observable<RxDocument<T, {}>[]> = obsOf([]);
  get filteredQueryObs(): Observable<RxDocument<T, {}>[]> {
    return this._filteredQueryObs;
  }

  /**
   * Query options to retrieve all items without filters and without pagination.
   * Used by the export function.
   */
  private _allItemsQueryObs: Observable<RxDocument<T, {}>[]> = obsOf([]);
  get allItemsQueryObs(): Observable<RxDocument<T, {}>[]> {
    return this._allItemsQueryObs;
  }

  /**
   * The number of active filters for the list. Used by the export function.
   */
  private _filtersCount: number = 0;
  get filtersCount(): number {
    return this._filtersCount;
  }

  /**
   * The count of the docs resulting by the current query.
   */
  private _dataResultsCount: Observable<number | null> = obsOf(null);
  get dataResultsCount(): Observable<number | null> {
    return this._dataResultsCount;
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
   * A Dictionary of all the optional Metrics managers
   */
  private _metricManagers: {[metricType: string]: DataModelManager<Metric> | null};

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
    @Optional() private _areaManager?: AreaManager | null,
    @Optional() private _caseManager?: CaseManager | null,
    @Optional() private _projectManager?: ProjectManager | null,
    @Optional() private _locationManager?: LocationManager | null,
    @Optional() private _organizationManager?: OrganizationManager | null,
  ) {
    super();
    this._modelSchema = this._dataModelManager.collectionSchema;
    this.data = [];
    this._dataResults.pipe(takeUntil(this._mainUnsubscribe)).subscribe(results => {
      this.data = results;
    });

    this._metricManagers = {
      area: this._areaManager,
      case: this._caseManager,
      location: this._locationManager,
      organization: this._organizationManager,
      project: this._projectManager,
    } as {[metricType: string]: DataModelManager<Metric> | null};

    // Here we ask the FilterService to generate all the filters based on the model RxJsonSchema
    this._fs.generateModelFilters(this._modelSchema as RxJsonSchema<Model>);

    // Next we call the method that generates additional filters on the additional DataManager
    // (if present) and set the additional filters on the FiltersService.
    // If no additional DataManager or data schema are provided, the additional filters
    // are set to an empty array.
    this._additionalDataSchema
      .pipe(
        switchMap(dataSchema => {
          if (dataSchema && this._isDataList != null && this._isDataList === 'form') {
            if ((dataSchema as any)['form_schema_deps_ref_id']) {
              return this._addRelationshipsChoicesInSchema(dataSchema);
            }
            return obsOf(dataSchema);
          }
          return obsOf(dataSchema);
        }),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe(dataSchema => {
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
      .pipe(takeUntil(this._mainUnsubscribe), throttleTime(100))
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
      .subscribe(res => {
        const emptyQueryStringFilter = btoa(
          encodeURI(
            JSON.stringify({
              filters: [],
              additionalFiltersLogic: 'and',
            }),
          ),
        );

        this._dataResultsCount = this._getQueryResultsCount(
          this.queryDM(
            res.queryString,
            res.permissionContext,
            false,
            res.addSchema,
            null,
            null,
            res.dataHeaders,
            true,
          ),
        ).pipe(shareReplay(1));

        this._allItemsQueryObs = this._getQueryResultsObs(
          this.queryDM(
            emptyQueryStringFilter,
            res.permissionContext,
            false,
            res.addSchema,
            null,
            null,
            res.dataHeaders,
            true,
          ),
        );

        this._filteredQueryObs = this._getQueryResultsObs(
          this.queryDM(
            res.queryString,
            res.permissionContext,
            false,
            res.addSchema,
            null,
            null,
            res.dataHeaders,
            true,
          ),
        );

        return this.queryDM(
          res.queryString,
          res.permissionContext,
          true,
          res.addSchema,
          res.pageEvt,
          res.sortEvt,
          res.dataHeaders,
        );
      });
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
   * @param executeQuery if True execute the query
   * @param additionalDataSchema? The additional data schema
   * @param page? The paginator change event
   * @param sort? The sort change event
   * @param dataHeaders?
   * @param noLimit? if True return all items without limit
   * @returns The Mango query with the generated query selector
   */
  queryDM(
    queryString: string,
    permissionContext: PermissionContext,
    executeQuery: boolean,
    additionalDataSchema?: AD | null,
    page?: PageEvent | null,
    sort?: Sort | null,
    dataHeaders?: ListHeader<T>[],
    noLimit?: boolean,
  ): DataQueryOptions {
    let querySelector: {[key: string]: any} = {};
    let detailsQuerySelector: {[key: string]: any} = {};

    const parsedFilters: {filters: FilterItem[]; additionalFiltersLogic: 'and' | 'or'} = JSON.parse(
      decodeURI(atob(queryString)),
    );
    const filterItems: FilterItem[] = parsedFilters.filters ?? [];
    if (!filterItems.find(f => f.name === 'keyword')) {
      this.filter = '';
    }
    this._filtersCount = filterItems.length;
    const additionalFiltersLogic = parsedFilters.additionalFiltersLogic;

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
                  const repeatedFilters: {[key: string]: {$regex: string | RegExp}}[] = [];
                  let slideIdx = 0;
                  while (slideIdx <= this._maxRepeatingSlidesFiltering) {
                    repeatedFilters.push({
                      [`data.${header.column.toString()}__${slideIdx}`]: {
                        '$regex': new RegExp(item.value, 'i'),
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
                      '$regex': new RegExp(item.value, 'i'),
                    },
                  };
                }
              });
            const headersSearchExpressions = dataHeaders
              .filter(h => !h.dataColumn)
              .map(header => {
                return {
                  [`${header.column.toString()}`]: {
                    '$regex': new RegExp(item.value, 'i'),
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
                [`${item.name.trim().toLowerCase()}_ref_id`, '$in'],
                Array.isArray(item.value.id) ? item.value.id : [item.value.id],
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
                if (additionalFiltersLogic === 'and') {
                  const newSel = selector['$or'].map((f: {[k: string]: any}) => {
                    const key = Object.keys(f)[0];
                    const repFilter = repeatedFilters.find(r => key in r);

                    if (repFilter) {
                      const idx = repeatedFilters.indexOf(repFilter);
                      repeatedFilters.splice(idx, 1);
                      return {[key]: {...f[key], ...repFilter[key]}};
                    }
                    return f;
                  });
                  selector['$or'] = [...newSel, ...repeatedFilters];
                } else {
                  selector['$or'] = [...selector['$or'], ...repeatedFilters];
                }
              } else {
                selector['$or'] = repeatedFilters;
              }
              // Single Slide Field Filter
            } else {
              // AND additional filters logic
              if (additionalFiltersLogic === 'and') {
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
                // OR additional filters logic
              } else if (additionalFiltersLogic === 'or') {
                const flt = {
                  [this._isDataList != null ? `data.${item.name}` : `data.data.${item.name}`]: {
                    [item.operator ? item.operator.value : '$eq']: item.value,
                  },
                };
                if (selector['$or'] && selector['$or'].length) {
                  selector['$or'] = [...selector['$or'], flt];
                } else {
                  selector['$or'] = [flt];
                }
              }
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
    };
    if (!noLimit) {
      query.limit = this.getPaginator?.pageSize ?? 10;
    }
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
    if (executeQuery) {
      this.getQueryResults(query, detailsQuery);
    }
    return query;
  }

  /**
   * Queries the dataModelManager and updates the dataResults
   * @param query The query object
   * @param detailsQuery? The optional query, performed by the dataModelManager detailsManager
   */
  getQueryResults(query: DataQueryOptions, detailsQuery?: DataQueryOptions): void {
    if (!query.sort) {
      query.sort = [{created_at: 'desc'}, {updated_at: 'desc'}];
    }

    this._getQueryResultsObs(query, detailsQuery).subscribe(populatedDocs => {
      this._dataResults.next(populatedDocs);
    });
  }

  /**
   * Get the result count of the dataModelManager query
   * @param query The query object
   * @returns The count of the query result
   */
  private _getQueryResultsCount(query: DataQueryOptions): Observable<number> {
    return this._dataModelManager.query(query).pipe(
      map(results => {
        return results.length ?? 0;
      }),
    );
  }

  /**
   * Get the observable for queries the dataModelManager
   * @param query The query object
   * @param detailsQuery? The optional query
   */
  private _getQueryResultsObs(
    query: DataQueryOptions,
    detailsQuery?: DataQueryOptions,
  ): Observable<RxDocument<T, {}>[]> {
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

    return forkJoin([dmMainQuery, dmDetailsQuery, this._dataModelManager.permissionContext]).pipe(
      map(([mainDocs, detailsDocs, context]) => {
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

        return populatedDocs;
      }),
    );
  }

  private _replaceTypeForFieldsWithChoicesByChoicesName(
    nodes: (AjfRepeatingSlide | AjfSlide)[] | undefined,
    choicesOriginName: string,
  ) {
    if (nodes) {
      nodes.forEach((ctnNode: AjfNode) => {
        if (isRepeatingContainerNode(ctnNode)) {
          ctnNode.nodes.forEach((n: AjfNode) => {
            if (
              isField(n) &&
              isFieldWithChoices(n) &&
              (n as any).choicesOriginRef === choicesOriginName
            ) {
              (n as AjfField).fieldType = AjfFieldType.String;
            }
          });
        }
      });
    }
  }

  /**
   * If is a Form Data List, edit the choice origins in the FormSchema
   * adding the external values taken via the relationships
   * @param dataSchema
   * @returns
   */
  private _addRelationshipsChoicesInSchema(dataSchema: AD | null): Observable<AD | null> {
    const fsm = this._additionalDataManager
      ? (this._additionalDataManager as unknown as FormSchemaManager)
      : null;
    if (dataSchema == null || fsm == null) {
      return obsOf(dataSchema);
    }

    const formSchemaDeps: Observable<AD | null> = (dataSchema as any)['form_schema_deps'].pipe(
      switchMap((doc: RxDocument<FormSchemaDeps>) => {
        if (doc == null) {
          return obsOf(null);
        }
        return obsOf(doc.toJSON()) as Observable<FormSchemaDeps>;
      }),
      switchMap((fschemadeps: FormSchemaDeps) => {
        if (fschemadeps == null || fschemadeps.deps_origin == null) {
          return zip(obsOf(null), obsOf(null), obsOf(fschemadeps));
        }

        const extFormDataObs = this._getExternalFormData(fschemadeps);
        let extFormDataRes: Observable<RxDocument<FormData>[][] | null> = obsOf(null);
        if (extFormDataObs.length) {
          extFormDataRes = forkJoin(extFormDataObs).pipe(
            map((extDatas: RxDocument<FormData>[][]) => {
              return extDatas;
            }),
          );
        }

        let metricOptSourceObs: Observable<RxDocument<Metric, {}>[]>[] = [];
        let metricOptSource: Observable<RxDocument<Metric>[][] | null> = obsOf(null);
        const metricsChoicesOrigin = (fschemadeps.deps_origin as DepsOrigin[]).find(
          deps => deps.metrics_choices_origin != null && deps.metrics_choices_origin.length,
        );
        if (metricsChoicesOrigin != undefined) {
          metricOptSourceObs = this._getFormMetricsOptions(
            metricsChoicesOrigin.metrics_choices_origin,
          );
        }
        if (metricOptSourceObs.length) {
          metricOptSource = forkJoin(metricOptSourceObs).pipe(
            map((mData: RxDocument<Metric>[][]) => {
              return mData;
            }),
          );
        }
        return zip(extFormDataRes, metricOptSource, obsOf(fschemadeps));
      }),
      map((originData: any[]) => {
        if (originData && originData.length > 2) {
          const changes: RxDocument<FormData>[][] | null = originData[0];
          const metricsOrigin: RxDocument<Metric>[][] | null = originData[1];
          const fschemadeps = originData[2] as FormSchemaDeps;

          const newChoicesOrigins: AjfChoicesOrigin<string>[] = [];
          const newFormSchema: FormSchema = deepCopy(dataSchema);
          if (fschemadeps.deps_origin && newFormSchema.schema.nodes) {
            let extDocsIdx = 0;
            fschemadeps.deps_origin.forEach(depsOrigin => {
              if (
                depsOrigin.form_schema_ref_id &&
                depsOrigin.fields_to_update &&
                depsOrigin.fields_to_update.length
              ) {
                if (depsOrigin.is_choice && changes && changes.length > extDocsIdx) {
                  const field = depsOrigin.fields_to_update[0];
                  const choicesOriginName = field + '_choice';
                  newChoicesOrigins.push({
                    type: 'fixed',
                    name: choicesOriginName,
                    label: choicesOriginName,
                    choices: fsm.getChoicesFromDocs(depsOrigin, changes[extDocsIdx]),
                  });
                  extDocsIdx++;
                } else {
                  depsOrigin.fields_to_update.forEach(field => {
                    // Replace the field type for all fields that have a
                    // choice origin based on a One-to-One Relationship
                    const choicesOriginName = field + '_choice';
                    this._replaceTypeForFieldsWithChoicesByChoicesName(
                      newFormSchema.schema.nodes,
                      choicesOriginName,
                    );
                  });
                }
              }
            });
          }

          if (metricsOrigin && metricsOrigin.length) {
            metricsOrigin.forEach(metricOrigin => {
              if (metricOrigin.length) {
                const choicesOriginName = metricOrigin[0].collection.name + '_metric_choice';
                newChoicesOrigins.push({
                  type: 'fixed',
                  name: choicesOriginName,
                  label: choicesOriginName,
                  choices: fsm.getChoicesFromMetrics(metricOrigin, metricOrigin[0].collection.name),
                });
              }
            });
          }

          if (newChoicesOrigins.length) {
            const schemaWithNewChoices = fsm.addChoiceOriginToFormSchema(
              newFormSchema,
              newChoicesOrigins,
            );
            return schemaWithNewChoices;
          }
          return newFormSchema;
        }
        return dataSchema;
      }),
    );
    return formSchemaDeps;
  }

  /**
   * Retrieves the available options for all required Metrics
   *
   * @param metricType The type identifier of the metric.
   */
  private _getFormMetricsOptions(
    metricsType: string[] | null | undefined,
  ): Observable<RxDocument<Metric, {}>[]>[] {
    let metricsOptSource: Observable<RxDocument<Metric, {}>[]>[] = [];
    if (metricsType) {
      metricsType.forEach(metricType => {
        if (metricType && this._metricManagers[metricType] != null) {
          let mtOptSource = this._metricManagers[metricType]!.query({
            selector: {is_deleted: {$ne: true}},
            sort: [{'name': 'asc'}],
          });
          metricsOptSource.push(mtOptSource);
        }
      });
    }
    return metricsOptSource;
  }

  /**
   * Return the queries for the external datas for relationships
   * @param fschemadeps The form schema dependencies info
   * @returns An array of observable with queries for the external data
   */
  private _getExternalFormData(fschemadeps: FormSchemaDeps): Observable<any>[] {
    const extFormDataObs: Observable<any>[] = [];
    if (fschemadeps.deps_origin) {
      fschemadeps.deps_origin
        .filter(
          deps =>
            deps.form_schema_ref_id != null &&
            deps.fields_to_update &&
            deps.fields_to_update.length,
        )
        .forEach(depsOrigin => {
          if (depsOrigin.is_choice) {
            const opt: DataQueryOptions = {
              selector: {
                form_schema_ref_id: {$eq: depsOrigin.form_schema_ref_id},
                is_deleted: {$ne: true},
              },
              sort: [{created_at: 'desc'}],
            };
            const query = this._dataModelManager.query(opt).pipe(
              take(1),
              catchError(err => throwError(() => err) as Observable<RxDocument<FormData>[]>),
            );
            extFormDataObs.push(query);
          }
        });
    }
    return extFormDataObs;
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
   * Create a new item
   * @param item The item to be created
   * @returns The created item
   */
  createAction(item: T, isDetails: boolean = false): Observable<T | null> {
    const dm =
      isDetails && this._dataModelManager.detailsManager != null
        ? this._dataModelManager.detailsManager
        : this._dataModelManager;
    return dm.create(item).pipe(
      take(1),
      catchError(err => throwError(() => new Error(err))),
    );
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
        baseObj[lastProp.toString()] = new RegExp(value, options ? options : 'i');
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
