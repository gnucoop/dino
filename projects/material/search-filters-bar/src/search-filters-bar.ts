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

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormGroup} from '@angular/forms';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {DataModelManager, DataQueryOptions, Metric, MetricsService} from '@dino/core/data';
import {FormSchemaManager, FormStatus, FormStatusManager} from '@dino/core/forms';
import {
  FilterGroup,
  FilterItem,
  FilterListType,
  FiltersService,
  SearchFiltersComponent,
} from '@dino/core/list';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {UserData, UserDataManager, UserGroup, UserGroupManager} from '@dino/core/users';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {ExportBottomSheet} from '@dino/material/export-list';
import {SearchFiltersDialog} from '@dino/material/search-filters-dialog';
import {isRxDocument, RxDocument} from 'rxdb';
import {combineLatest, Observable, of as obsOf, Subject, Subscription, throwError} from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  startWith,
  switchMap,
  take,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

/**
 * Opt-in component that handles all SelectionList filters.
 * The filters are obtained by parsing the RxJsonSchema of the model and the ajfFormSchema,
 * if present as a model property.
 * It may contain two child components:
 * dino-search-filters-chips and dino-search-filters-dialog.
 */
@Component({
  selector: 'dino-search-filters-bar',
  styleUrls: ['search-filters-bar.scss'],
  templateUrl: 'search-filters-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: SearchFiltersComponent, useExisting: SearchFiltersBar}],
})
export class SearchFiltersBar extends SearchFiltersComponent implements OnInit, OnDestroy {
  /**
   * All the metrics filters autocomplete options.
   */
  metricFiltersOptions: {
    [key: string]: Observable<
      (Metric & {level?: number} & {[key: string]: any} & {selected?: boolean})[]
    >;
  } = {};

  /**
   * All the form status filter autocomplete options.
   */
  formStatusFilterOptions: Observable<FormStatus[]> | null = null;

  /**
   * All the users filter autocomplete options.
   */
  usersFilterOptions: Observable<UserData[]> | null = null;

  /**
   * All the user groups filter autocomplete options.
   */
  userGroupsFilterOptions: Observable<UserGroup[]> | null = null;

  /**
   * If the filters bar is applied to a formData list,
   * here are the IDs of the form statuses available for the current form schema.
   */
  availableFormStatuses: Observable<string[] | null>;

  /**
   * If true, the Form Map button is displayed
   */
  displayFormMapButton: Observable<boolean>;

  /**
   * The Filter Service Generated filters
   */
  generatedAdditionalFilters: Observable<FilterGroup[]>;

  /**
   * Date Picker input filtering methods.
   */
  minDatePicker: (d: Date | null) => boolean;
  maxDatePicker: (d: Date | null) => boolean;

  /**
   * If true, the search filters bar is associated to an aggregation list.
   * Filters availability and disposition in the template will change
   * accordingly.
   */
  @Input() aggregationFilters: boolean = false;

  /**
   * Secondary metric field to display in the Form Metric Selector and Filters
   */
  private _secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string[];
  } | null = null;
  get secondaryMetricFieldsDisplayed(): {
    [metricName: string]: string | string[];
  } | null {
    return this._secondaryMetricFieldsDisplayed;
  }
  @Input()
  set secondaryMetricFieldsDisplayed(
    fields: {
      [metricName: string]: string | string[];
    } | null,
  ) {
    this._secondaryMetricFieldsDisplayed = fields;
  }

  /**
   * If true, the Preset Manager is available and displayed.
   * Defaults to false.
   */
  private _presetManager: boolean = false;
  get presetManager(): boolean {
    return this._presetManager;
  }
  @Input()
  set presetManager(state: boolean) {
    this._presetManager = state;
  }

  private _exportable = false;
  get exportable() {
    return this._exportable;
  }
  @Input()
  set exportable(state: boolean) {
    this._exportable = state;
  }
  /**
   * If true, the Additional Filters button and dialog
   * are available and displayed.
   * Defaults to true.
   */
  private _additionalFilters: boolean = true;
  get additionalFilters(): boolean {
    return this._additionalFilters;
  }
  @Input()
  set additionalFilters(state: boolean) {
    this._additionalFilters = state;
  }

  /**
   * Allows the customization of the filters dialog width
   */
  private _filtersDialogWidth: number = 95;
  @Input()
  set filtersDialogWidth(w: number) {
    if (w != null && w > 0) {
      this._filtersDialogWidth = w;
    }
  }
  /**
   * A reference to the MatDialog that contains the additionalFilters
   */
  private _dialogRef?: MatDialogRef<SearchFiltersDialog>;

  /**
   * Subscribes to the value returned by the MatDialog on its closing event
   */
  private _dialogSub: Subscription = Subscription.EMPTY;

  /**
   * Main unsub subject.
   * Used for unsubscribing all subscriptions.
   */
  private _mainUnsubscribe: Subject<void> = new Subject();

  constructor(
    readonly metricsService: MetricsService,
    protected _fts: FiltersService,
    public dialog: MatDialog,
    private _fsm: FormStatusManager,
    private _cdr: ChangeDetectorRef,
    private _bottomSheet: MatBottomSheet,
    private _route: ActivatedRoute,
    private _fschm: FormSchemaManager,
    private _udm: UserDataManager,
    private _ugm: UserGroupManager,
    private _router: Router,
    readonly breakpointObserver: BreakpointObserverService,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _caseManager: CaseManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
  ) {
    super();

    this.generatedAdditionalFilters = this._fts.generatedAdditionalFilters;

    this.availableFormStatuses = combineLatest([this._route.params, this._route.data]).pipe(
      switchMap(([params, data]) => {
        if (data['aggregation']) {
          return this._fsm
            .query({selector: {is_deleted: {$ne: true}}})
            .pipe(map(statuses => statuses.map(st => st.id)));
        }
        if (!params['form_schema_id']) {
          return obsOf(null);
        }
        return this._fschm.get(params['form_schema_id']).pipe(
          map(schema => {
            if (schema == null || !schema.form_status_ref_id?.length) {
              return null;
            }
            return schema.form_status_ref_id;
          }),
        );
      }),
    );

    this.displayFormMapButton = this._route.params.pipe(
      switchMap(params => this._fschm.get(params['form_schema_id'])),
      map(schema => {
        if (schema == null) {
          return false;
        }
        return !schema.form_schema_metrics?.length
          ? this._locationManager != null
          : schema.form_schema_metrics?.includes('location');
      }),
    );

    this.minDatePicker = (d: Date | null): boolean => {
      const minDate = this.dateSearchFilters.get('dateStart')?.value
        ? new Date(this.dateSearchFilters.get('dateStart')?.value)
        : null;
      if (minDate != null && d != null) {
        return d >= minDate;
      }
      return true;
    };
    this.maxDatePicker = (d: Date | null): boolean => {
      const maxDate = this.dateSearchFilters.get('dateEnd')?.value
        ? new Date(this.dateSearchFilters.get('dateEnd')?.value)
        : null;
      if (maxDate != null && d != null) {
        return d <= maxDate;
      }
      return true;
    };
  }

  @Output()
  readonly exportEvt: EventEmitter<'XLSX' | 'CSV' | 'dialog'> = new EventEmitter<
    'XLSX' | 'CSV' | 'dialog'
  >();

  ngOnInit() {
    this.initFilters();
  }

  /**
   * Clears the input and value of a filter.
   * @param controlname The Form control name
   * @param fg The form group whose value must be cleared
   */
  clearFilter(controlname: string, fg: UntypedFormGroup): void {
    const formGroupValue = fg.value;
    const newValue: {[key: string]: any} = {[controlname]: ''};
    if (`${controlname}_multiple` in formGroupValue) {
      newValue[`${controlname}_multiple`] = [];
    }
    fg.setValue({...formGroupValue, ...newValue});
  }

  /**
   * Opens a dialog with dino-search-filters-dialog component.
   * Aligns the temporary filters list to the additional filters list.
   * Subscribes to Dialog closing event, updating the Additional Filters when
   * the Dialog closing event value is true.
   */
  openDialog() {
    this._fts.resetTemporaryFilters();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dino-search-filters-dialog';
    dialogConfig.minWidth = `${this._filtersDialogWidth}vw`;
    dialogConfig.maxWidth = `${this._filtersDialogWidth}vw`;
    this._dialogRef = this.dialog.open(SearchFiltersDialog, dialogConfig);
    this._dialogSub = this._dialogRef
      .afterClosed()
      .pipe(catchError(err => throwError(() => err) as Observable<boolean>))
      .subscribe((searchFilters: {search: boolean; logic?: 'and' | 'or'}) => {
        if (searchFilters && searchFilters.search) {
          this._fts.updateAdditionalFilters(searchFilters.logic);
        }
      });
  }

  /**
   * Open export dialog
   */
  openExportDialog(): void {
    this.exportEvt.emit('CSV');
  }

  /**
   * Open bottom sheet with export options
   */
  openExportBottomSheet(): void {
    this._bottomSheet
      .open(ExportBottomSheet)
      .afterDismissed()
      .subscribe((ev: 'XLSX' | 'CSV' | 'dialog' | null) => {
        if (ev != null) {
          this.exportEvt.emit(ev);
        }
      });
  }

  /**
   * Redirects to the forms' View Map component
   */
  viewMap(): void {
    this._route.params.pipe(take(1)).subscribe(params => {
      if (params['form_schema_id']) {
        this._router.navigate(['forms', params['form_schema_id'], 'map']);
      }
    });
  }

  /**
   * Asks the FilterService to remove a FilterItem from the selected filter lists
   * @param filterItem The filter item to remove
   * @param listType The list/lists to remove the filter from
   */
  removeFilter(filterItem: FilterItem, listType: FilterListType[] | FilterListType): void {
    this._fts.removeFilter(filterItem, listType);
  }

  /**
   * Returns true if the Form Group refers to an active Metric
   *
   * @param group The FormGroup of the filter
   */
  isMetric(group: UntypedFormGroup): boolean {
    if (group == null) {
      return false;
    }
    const groupControlKey = this.getControlKey(group);
    if (groupControlKey == null) {
      return false;
    }
    const activeMetrics = this.metricsService.activeMetrics.value.map(metric => metric.metricName);

    return activeMetrics.indexOf(groupControlKey) >= 0;
  }

  /**
   * Returns true if the Form Group refers to a Metric attribute (eg. "case_code")
   * Metric subfilters should follow this naming convention: <metricName>_<attributeName>
   *
   * @param group The FormGroup of the filter
   */
  isMetricSubFilter(group: UntypedFormGroup): boolean {
    if (group == null) {
      return false;
    }
    const groupControlKey = this.getControlKey(group);
    if (groupControlKey == null) {
      return false;
    }
    const activeMetrics = this.metricsService.activeMetrics.value.map(metric => metric.metricName);

    return activeMetrics.some(amt => groupControlKey.includes(`${amt}_`));
  }

  /**
   * Returns true if the Form Group refers to the User filter
   *
   * @param group The FormGroup of the filter
   */
  isUser(group: UntypedFormGroup): boolean {
    if (group == null) {
      return false;
    }
    const groupControlKey = this.getControlKey(group);
    if (groupControlKey == null) {
      return false;
    }
    return groupControlKey === 'user_data';
  }

  /**
   * Returns true if the Form Group refers to the User Group filter
   *
   * @param group The FormGroup of the filter
   */
  isUserGroup(group: UntypedFormGroup): boolean {
    if (group == null) {
      return false;
    }
    const groupControlKey = this.getControlKey(group);
    if (groupControlKey == null) {
      return false;
    }
    return groupControlKey === 'user_group';
  }

  /**
   * Returns true if the Form Group refers to the Form Status
   *
   * @param group The FormGroup of the filter
   */
  isStatus(group: UntypedFormGroup): boolean {
    if (group == null) {
      return false;
    }
    const groupControlKey = this.getControlKey(group);
    if (groupControlKey == null) {
      return false;
    }
    return groupControlKey === 'form_status';
  }

  getControlKey(group: UntypedFormGroup): string {
    if (group == null) {
      return '';
    }
    const groupControl = Object.keys(group.controls)[0];
    return groupControl;
  }

  getMetricSubFilter(
    option: Metric & {level?: number} & {[key: string]: any},
    group: UntypedFormGroup,
  ): string {
    if (group == null || option == null) {
      return '';
    }
    const groupControlKey = this.getControlKey(group);
    if (groupControlKey == null) {
      return '';
    }
    const activeMetrics = this.metricsService.activeMetrics.value.map(metric => metric.metricName);
    const filterMetric = activeMetrics.find(amt => groupControlKey.includes(`${amt}_`));
    if (filterMetric == undefined) {
      return '';
    }
    return groupControlKey.replace(`${filterMetric}_`, '');
  }

  /**
   * Displays the Metric/Status/User/User group name in the
   * autocomplete field.
   */
  displayItemName(
    obj:
      | FormStatus
      | UserData
      | {
          id: string[];
          name: string;
          secondary: string | null;
        }
      | string,
  ): string {
    if (obj == null) {
      return '';
    }
    if (typeof obj === 'string') {
      return obj;
    }
    const item = obj as {[key: string]: any};

    // Statuses
    if (item['label'] && item['name'] && item['id']) {
      return item['label'];
    }
    // Users
    if (item['full_name']) {
      return item['full_name'];
    }
    // User groups
    if (item['groupName']) {
      return item['groupName'];
    }
    // Metrics (after finding descendants)
    if (item['id'] && Array.isArray(item['id']) && item['name']) {
      let displayed = item['name'];
      if (item['secondary']) {
        displayed = `${displayed} - (${item['secondary']})`;
      }
      return displayed;
    }

    return '';
  }

  /**
   * Displays the Metric code attribute.
   */
  displayCode(item: Metric & {code: number}): string {
    if (item == null) {
      return '';
    }
    return item.code && item.id ? item.code.toString() : '';
  }

  /**
   * Show options for filter with options (metrics, form_status, user, user_group)
   * @param group
   */
  showOptions(group: UntypedFormGroup) {
    const metricType = Object.keys(group.controls)[0];
    const inputControl = this.additionalBasicFilters.find(grp => grp.get(metricType) != null);
    if (inputControl && inputControl.value[metricType] == null) {
      let metricMultiple =
        inputControl.value[`${metricType}_multiple`] == null
          ? []
          : inputControl.value[`${metricType}_multiple`];
      inputControl.setValue({[metricType]: '', [`${metricType}_multiple`]: metricMultiple});
    }
  }

  /**
   * Sorts Options alphabetically by the chosen property.
   * @param a Prev item
   * @param b Next Item
   * @param sortKey The property key used to sort the items. Defaults to 'name'
   * @returns Sort order
   */
  private _sortItemsAlphabetically(
    a: RxDocument<any>,
    b: RxDocument<any>,
    sortKey: string = 'name',
  ): number {
    let textA = a[sortKey].toUpperCase();
    let textB = b[sortKey].toUpperCase();
    const less = textA < textB;
    const more = textA > textB;
    if (less) {
      return -1;
    } else if (more) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Populates the autocomplete panels of metric filters with options
   * @param metricType The type of metric
   * @param metricManager The related metric manager
   * @param metricAttributeToSearchBy The attribute the metric option is searched by. Defaults to 'name'
   */
  private _populateMetricsOptions(
    metricType: string,
    metricManager: DataModelManager<any>,
    metricAttributeToSearchBy: string = 'name',
  ): void {
    if (metricType == null || metricManager == null) {
      return;
    }
    const inputControl = this.additionalBasicFilters.find(group => group.get(metricType) != null);
    const inputStartingValue = inputControl?.get(metricType)?.value;
    let inputValue = inputControl?.get(metricType)?.valueChanges;
    if (typeof inputStartingValue === 'string') {
      inputValue = inputValue?.pipe(startWith(inputStartingValue));
    }
    if (inputValue != null) {
      this.metricFiltersOptions[metricType] = inputValue.pipe(
        debounceTime(800),
        switchMap(metricValue => {
          if (typeof metricValue === 'string') {
            let mtQuery: DataQueryOptions = {
              selector: {is_deleted: {$ne: true}},
              sort: [{[metricAttributeToSearchBy]: 'asc'}],
            };
            // Cases can be very numerous and their filtering is treated differently
            if (metricType === 'case') {
              mtQuery = {
                selector: {
                  [metricAttributeToSearchBy]: {$regex: metricValue, $options: 'i'},
                  is_deleted: {$ne: true},
                },
                sort: [{[metricAttributeToSearchBy]: 'asc'}],
                limit: 50,
              };
            }
            return metricManager.query(mtQuery).pipe(
              map((metricOptions: (Metric & {[key: string]: any})[]) => {
                if (
                  metricOptions != null &&
                  metricValue != null &&
                  typeof metricValue === 'string'
                ) {
                  const mtrName = metricValue.toLowerCase();
                  const metricsMatchingByAttribute = metricOptions.filter(option => {
                    return option[metricAttributeToSearchBy]
                      .toString()
                      .toLowerCase()
                      .includes(mtrName);
                  });
                  const matchingMetricsParentsIDs = [
                    ...new Set(metricsMatchingByAttribute.map(mt => mt.parent_id)),
                  ];
                  const metricsMatchingParents =
                    metricManager != null
                      ? metricManager.findMatchingAncestors(
                          metricOptions,
                          matchingMetricsParentsIDs,
                        )
                      : [];
                  const metricsWithAncestors = [
                    ...new Set([...metricsMatchingByAttribute, ...metricsMatchingParents]),
                  ];

                  let parentIds = metricsWithAncestors
                    .filter(mo => mo.parent_id != null)
                    .map(mt => mt.parent_id);
                  parentIds = [...new Set(parentIds)];

                  let organizedMetricOptions = metricsWithAncestors;
                  if (parentIds.length && metricManager != null) {
                    organizedMetricOptions = metricManager.organizeDocsHierarchy(
                      metricsWithAncestors,
                      parentIds,
                    );
                  }

                  this._setupMetricsCheckboxes(inputControl, metricType, organizedMetricOptions);
                  return organizedMetricOptions;
                }
                this._setupMetricsCheckboxes(inputControl, metricType, metricOptions);
                return metricOptions;
              }),
            );
          }
          return [];
        }),
      );
      this._setInitialMetricOptionFromInputText(metricType, metricManager);
    }
  }

  /**
   * When a Metric Filter initial value is a string and not a valid metric option,
   * this looks for an option with that string as name, and sets it as the value of that Filter input.
   * @param metricType The type of metric
   * @param metricManager The related metric manager
   */
  private _setInitialMetricOptionFromInputText(
    metricType: string,
    metricManager: DataModelManager<any>,
  ): void {
    if (metricType == null || metricManager == null) {
      return;
    }
    const inputControl = this.additionalBasicFilters.find(group => group.get(metricType) != null);
    const inputStartingValue: {[key: string]: any} | string = inputControl?.get(metricType)?.value;
    if (typeof inputStartingValue !== 'string' || inputControl == null) {
      return;
    }
    this.metricFiltersOptions[metricType].pipe(take(1)).subscribe(options => {
      if (options == null || !options.length) {
        return;
      }
      const firstMatch = options[0];
      inputControl?.get(metricType)?.setValue(firstMatch);
      this._cdr.detectChanges();
    });
  }

  /**
   * Populates the autocomplete panel of the Form Status filter with options
   */
  private _populateStatusOptions(): void {
    const inputControl = this.additionalBasicFilters.find(
      group => group.get('form_status') != null,
    );
    const inputValue = inputControl?.get('form_status')?.valueChanges;
    if (inputValue != null) {
      this.formStatusFilterOptions = combineLatest([inputValue, this.availableFormStatuses]).pipe(
        switchMap(([inputVal, options]) => {
          if (typeof inputVal === 'string') {
            return this._fsm
              .query({
                selector: {
                  name: {$regex: inputVal, $options: 'i'},
                  id: {$in: options ?? []},
                  is_deleted: {$ne: true},
                },
              })
              .pipe(map(results => results.sort((a, b) => this._sortItemsAlphabetically(a, b))));
          }
          return [];
        }),
      );
    }
  }

  /**
   * Populates the autocomplete panel of the User Data filter with options
   */
  private _populateUserDataOptions(): void {
    const inputControl = this.additionalBasicFilters.find(group => group.get('user_data') != null);
    const inputValue = inputControl?.get('user_data')?.valueChanges;
    if (inputValue != null) {
      this.usersFilterOptions = inputValue.pipe(
        switchMap(inputVal => {
          if (typeof inputVal === 'string') {
            return this._udm
              .query({
                selector: {
                  full_name: {$regex: inputVal, $options: 'i'},
                  is_deleted: {$ne: true},
                },
              })
              .pipe(
                map(results =>
                  results.sort((a, b) => this._sortItemsAlphabetically(a, b, 'full_name')),
                ),
              );
          }
          return [];
        }),
      );
    }
  }

  /**
   * Populates the autocomplete panel of the User Group filter with options
   */
  private _populateUserGroupOptions(): void {
    const inputControl = this.additionalBasicFilters.find(group => group.get('user_group') != null);
    const inputValue = inputControl?.get('user_group')?.valueChanges;
    if (inputValue != null) {
      this.userGroupsFilterOptions = inputValue.pipe(
        switchMap(inputVal => {
          if (typeof inputVal === 'string') {
            return this._ugm
              .query({
                selector: {
                  groupName: {$regex: inputVal, $options: 'i'},
                  is_deleted: {$ne: true},
                },
              })
              .pipe(
                map(results =>
                  results.sort((a, b) => this._sortItemsAlphabetically(a, b, 'groupName')),
                ),
              );
          }
          return [];
        }),
      );
    }
  }

  /**
   * Sets up the subscription to the Metric Fields inputs valuechanges,
   * then sets the value of the field as an array of ids of the selected metric
   * and all of its descendants.
   * @param metricType The type of metric
   * @param metricManager The related metric manager
   */
  private _setupMetricDescendants(metricType: string, metricManager: DataModelManager<any>): void {
    if (metricType == null || metricManager == null) {
      return;
    }
    const inputControl = this.additionalBasicFilters.find(group => group.get(metricType) != null);
    const inputValue = inputControl?.get(metricType)?.valueChanges;
    if (inputControl != null && inputValue != null) {
      inputValue
        .pipe(
          switchMap(inputVal => {
            if (typeof inputVal === 'object' && isRxDocument(inputVal)) {
              return metricManager
                .findDescendants([inputVal.id])
                .pipe(map(desc => desc?.map(d => d.id)))
                .pipe(withLatestFrom(obsOf(inputVal)));
            }
            return obsOf([null, null]);
          }),
          withLatestFrom(this.metricFiltersOptions[metricType].pipe(startWith([]))),
          takeUntil(this._mainUnsubscribe),
        )
        .subscribe(([[allDescendants, parentMetric], metricFiltersOptionsValues]) => {
          if (allDescendants != null && parentMetric != null) {
            const multiple: any[] =
              inputControl.value[`${metricType}_multiple`] == null
                ? []
                : inputControl.value[`${metricType}_multiple`];
            let multipleIds = multiple.map((m: any) => m?.id ?? m).map(m => (m == null ? '' : m));

            if (inputControl?.get(metricType)) {
              const multipleName = multiple
                .filter((m: any) => m && m.id && m.name)
                .map(m => m.name);

              const selectedTrue = multiple.findIndex((value: any) => value.id === parentMetric.id);
              if (selectedTrue > -1) {
                // User added a new object for the metric input. Add all descendants.
                inputControl.setValue({
                  [metricType]: {
                    id: [...new Set([parentMetric.id, ...allDescendants, ...multipleIds])],
                    name: multipleName.join(),
                    secondary: this.getMetricDataSecondaryAttribute(
                      parentMetric,
                      this.secondaryMetricFieldsDisplayed,
                      metricType,
                    ),
                  },
                  [`${metricType}_multiple`]: [...multiple, ...allDescendants],
                });
              } else {
                // User removed an abject from the metric input. Remove all descendants.
                const filteredMultiple = multiple.filter((m: any) => {
                  const mId = m?.id ?? m;
                  return !allDescendants.includes(mId);
                });
                multipleIds = filteredMultiple.map((m: any) => (m && m.id ? m.id : m));
                inputControl.setValue({
                  [metricType]: {
                    id: [...multipleIds],
                    name: multipleName.join(),
                    secondary: null,
                  },
                  [`${metricType}_multiple`]: [...filteredMultiple],
                });
              }

              // Clean also checkbox in list
              if (allDescendants.length) {
                metricFiltersOptionsValues.forEach(metricOpt => {
                  if (allDescendants.includes(metricOpt.id)) {
                    metricOpt['selected'] = selectedTrue > -1 ? true : false;
                  }
                });
              }
            }
          }
        });
    }
  }

  /**
   * Retrieves a metric data attribute specific value
   * @param metric The metric option
   * @param secondaryFields The metric secondary fields to be displayed
   * @param metricType The type of the metric ('area', 'location' etc.)
   * @returns The secondary attribute value if present
   */
  getMetricDataSecondaryAttribute(
    metric: Metric & {[key: string]: any},
    secondaryFields: {
      [metricName: string]: string | string[];
    } | null,
    metricType: string,
  ): string | null {
    let secondaryAttributeVal: string[] = [];
    if (metric && secondaryFields && metricType) {
      const secondaryFieldsList: string[] = Array.isArray(secondaryFields[metricType])
        ? (secondaryFields[metricType] as string[])
        : [secondaryFields[metricType] as string];

      secondaryFieldsList.forEach(secondaryField => {
        if (secondaryField && secondaryField.includes('metric_data')) {
          const metricDataKey = secondaryField.split('metric_data ')[1];
          secondaryAttributeVal.push(
            metric['metric_data'] != null ? metric['metric_data'][metricDataKey] : null,
          );
        } else {
          secondaryAttributeVal.push(metric[secondaryField] ?? null);
        }
      });
    }
    secondaryAttributeVal = secondaryAttributeVal.filter(v => v != null);
    return secondaryAttributeVal.length ? secondaryAttributeVal.join(' - ') : null;
  }

  /**
   * Asks the FilterService to initialize the filters and load them from the route
   * queryParams
   */
  initFilters() {
    this._fts
      .initializeFilters(this.basicFilters)
      .pipe(
        take(1),
        catchError(err => throwError(() => err) as Observable<UntypedFormGroup[]>),
      )
      .subscribe(formGroups => {
        this.basicFilters = [...this.basicFilters, ...formGroups];
        this.additionalBasicFilters = formGroups;
        this.additionalBasicFiltersLabels = this.additionalBasicFilters.map(
          group => Object.keys(group.controls)[0],
        );
        this._populateStatusOptions();
        this._populateUserDataOptions();
        this._populateUserGroupOptions();

        if (this._areaManager != null) {
          this._populateMetricsOptions('area', this._areaManager);
          this._setupMetricDescendants('area', this._areaManager);
        }
        if (this._caseManager != null) {
          this._populateMetricsOptions('case', this._caseManager);
          this._populateMetricsOptions('case_code', this._caseManager, 'code');
          this._setupMetricDescendants('case', this._caseManager);
        }
        if (this._projectManager != null) {
          this._populateMetricsOptions('project', this._projectManager);
          this._setupMetricDescendants('project', this._projectManager);
        }
        if (this._locationManager != null) {
          this._populateMetricsOptions('location', this._locationManager);
          this._setupMetricDescendants('location', this._locationManager);
        }
        if (this._organizationManager != null) {
          this._populateMetricsOptions('organization', this._organizationManager);
          this._setupMetricDescendants('organization', this._organizationManager);
        }
        this._cdr.detectChanges();
      });
  }

  /**
   * Select the correct checkbox in the list, for each option found in the multi-select form input
   * @param inputControl
   * @param metricType
   * @param metricOptions
   */
  private _setupMetricsCheckboxes(
    inputControl: UntypedFormGroup | undefined,
    metricType: string,
    metricOptions: (Metric & {
      [key: string]: any;
    })[],
  ) {
    let inputMultipleStartingValue = inputControl?.get(`${metricType}_multiple`)?.value;
    if (inputMultipleStartingValue) {
      let multipleIds = inputMultipleStartingValue.map((m: any) => m?.id ?? m);

      metricOptions.forEach(metricOpt => {
        if (multipleIds.includes(metricOpt.id)) {
          metricOpt['selected'] = true;
        } else {
          metricOpt['selected'] = false;
        }
      });

      // Replace ids in input multiple values with corresponding object, if found
      let changes = false;
      const inputMultipleCleanValue = inputMultipleStartingValue
        .map((val: any) => {
          if (val && typeof val === 'string') {
            const objOption = metricOptions.find(metricOpt => metricOpt.id === val);
            if (objOption) {
              changes = true;
              return objOption;
            }
          }
          return val;
        })
        .filter((val: any) => val);
      if (changes || inputMultipleStartingValue.length !== inputMultipleCleanValue.length) {
        inputControl?.patchValue({[`${metricType}_multiple`]: inputMultipleCleanValue});
      }
      //}
    }
  }

  /**
   * Click an option in metric selector (not the checkbox)
   * @param option
   * @param controlname
   * @param fg
   */
  optionClicked = (
    option: Metric & {level?: number | undefined} & {[key: string]: any} & {
      selected?: boolean | undefined;
    },
    controlname: string,
    fg: UntypedFormGroup,
  ): void => {
    if (this.isMetric(fg)) {
      this.toggleSelection(option, controlname, fg);
    }
  };

  /**
   * Toggle a checkbox option from metric selector
   * @param option
   * @param controlname
   * @param fg
   */
  toggleSelection = (
    option: Metric & {level?: number | undefined} & {[key: string]: any} & {
      selected?: boolean | undefined;
    },
    controlname: string,
    fg: UntypedFormGroup,
  ): void => {
    const formGroupValue = fg.value;
    option.selected = !option.selected;
    let newValue = {};
    let multiple =
      fg.value[`${controlname}_multiple`] == null ? [] : fg.value[`${controlname}_multiple`];

    if (option.selected === true) {
      multiple = this._addOptionObjectToMultipleSelect(multiple, option, option.selected);
      newValue = {[controlname]: option, [`${controlname}_multiple`]: multiple};
      fg.setValue({...formGroupValue, ...newValue});
    } else {
      multiple = this._addOptionObjectToMultipleSelect(multiple, option, option.selected);
      if (multiple.length) {
        newValue = {[controlname]: option, [`${controlname}_multiple`]: multiple};
        fg.setValue({...formGroupValue, ...newValue});
      } else {
        this.clearFilter(controlname, fg);
      }
    }
  };

  /**
   * Add or remove an option from the multiple select.
   * If an option is in the list with only an id value, replace it with the corresponding selected object.
   * @param multiple
   * @param option
   * @param toRemove
   */
  private _addOptionObjectToMultipleSelect(multiple: any[], option: any, optionSelected: boolean) {
    multiple = multiple.filter((value: any) => value.id !== option.id && value !== option.id);
    if (optionSelected === true) {
      multiple.push(option);
    }
    return multiple;
  }

  ngOnDestroy() {
    this._dialogSub.unsubscribe();
    this._mainUnsubscribe.next();
    this._mainUnsubscribe.complete();
  }
}
