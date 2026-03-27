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

import {AjfFieldType, AjfValidationGroup} from '@ajf/core/forms';
import {AjfCondition, evaluateExpression} from '@ajf/core/models';
import {EventEmitter, Injectable} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MetricsService, Model} from '@dino/core/data';
import {TranslocoService} from '@ngneat/transloco';
import {RxJsonSchema, isRxDocument} from 'rxdb';
import {TopLevelProperty} from 'rxdb/dist/types/types/rx-schema';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  of as obsOf,
  Subscription,
  throwError,
} from 'rxjs';
import {catchError, debounceTime, map, skip, take, withLatestFrom} from 'rxjs/operators';

import {
  DEFAULT_MODEL_KEYS,
  FIELD_TYPES,
  FilterGroup,
  FilterItem,
  FilterListType,
} from './list-filters-interfaces';

/**
 * Service that handles all operations related to list Filters.
 * It maintains the state of all FilterItems, including the value and operator of the active ones.
 * It takes care of communication between all Search Filters Components and the ListDataSource,
 * by generating a querystring from all active filters, which is then sent to the ListDataSource to
 * retrieve and display the filtered data in the List.
 * It generates FilterItems from the model RxJsonSchema provided by the ListDataSource.
 * It can load filters presets from the Preset Manager, and initialize filters accordingly.
 */
@Injectable({providedIn: 'root'})
export class FiltersService<T extends Model = Model> {
  /**
   * Event emitted whenever a filter cannot be added or the and/or logic cannot be switched.
   * Should trigger a snackbar in a Material component.
   */
  filterErrorEvt: EventEmitter<{text: string; msg: string}> = new EventEmitter<{
    text: string;
    msg: string;
  }>();

  /**
   * The labels of all available additional basic filters.
   * Available filters are added by importing the relative modules.
   * Used to check if a filter can be added and displayed in the
   * main filters component (eg. SearchFiltersBar)-
   */
  private _availableBasicFilterLabels: string[] = ['form_status', 'user_data', 'user_group'];

  get availableBasicFilterLabels(): string[] {
    return this._availableBasicFilterLabels;
  }

  /**
   * The labels of all the currently created additional basic filters.
   */
  private _currentBasicFilterLabels: string[] = [];

  get currentBasicFilterLabels(): string[] {
    return this._currentBasicFilterLabels;
  }
  /**
   * Filters generated from a Model Schema
   */
  private _generatedModelFilters: BehaviorSubject<FilterGroup[]>;

  get generatedModelFilters(): BehaviorSubject<FilterGroup[]> {
    return this._generatedModelFilters;
  }

  /**
   * Filters generated from the 'data' property of the model
   */
  private _generatedAdditionalFilters: BehaviorSubject<FilterGroup[]>;

  get generatedAdditionalFilters(): Observable<FilterGroup[]> {
    return this._generatedAdditionalFilters;
  }

  /**
   * List of all generated or custom filters
   */
  private _generatedFilters: Observable<FilterGroup[]>;

  get generatedFilters(): Observable<FilterGroup[]> {
    return this._generatedFilters;
  }

  /**
   * List of custom filters. Overwrites the generated filters with a set of custom filters.
   */
  private _customFilters: BehaviorSubject<FilterGroup[]>;

  set setCustomFilters(filterGroups: FilterGroup[]) {
    this._customFilters.next(filterGroups);
  }

  /**
   * The FormGroups of the basic filters (Date and Keyword fields)
   */
  private _basicFormGroups: UntypedFormGroup[] = [];

  /**
   * The FormGroups of the Additional filters to be displayed in the main filter component
   * (eg. Location, Project etc.)
   */
  private _basicAdditionalFormGroups: UntypedFormGroup[] = [];

  /**
   * An array of the valueChanges observables of all the basicFormGroups
   */
  private _formValueChanges: Observable<any>[];

  /**
   * Basic filters such as text keyword search, from/to date search, usually displayed in the main
   * filter component
   */
  private _basicFilters: BehaviorSubject<FilterItem[]>;

  get basicFilters(): BehaviorSubject<FilterItem[]> {
    return this._basicFilters;
  }

  /**
   * Additional filters, related to the "data" property of the model, usually displayed in
   * a secondary filter component (eg. a Dialog)
   */
  private _additionalFilters: BehaviorSubject<FilterItem[]>;

  get additionalFilters(): BehaviorSubject<FilterItem[]> {
    return this._additionalFilters;
  }

  /**
   * Logic operator to be used when concatenating additional filters in the dataSource query.
   * Defaults to 'and'.
   */
  private _additionalFiltersLogic: BehaviorSubject<'and' | 'or'> = new BehaviorSubject<
    'and' | 'or'
  >('and');

  get additionalFiltersLogic(): BehaviorSubject<'and' | 'or'> {
    return this._additionalFiltersLogic;
  }

  /**
   * Logic operator dialog "toggle" value in the Advanced Filters dialog.
   * Defaults to 'and'.
   */
  temporaryAdditionalFiltersLogic: BehaviorSubject<'and' | 'or'> = new BehaviorSubject<
    'and' | 'or'
  >('and');

  /**
   * List of temporary filters that are not immediately applied and need an action to be included
   * in the activeFilters. (Eg. filters in a Dialog when the "search" button is clicked)
   */
  private _temporaryFilters: BehaviorSubject<FilterItem[]>;

  get temporaryFilters(): BehaviorSubject<FilterItem[]> {
    return this._temporaryFilters;
  }

  /**
   * Encoded string of query parameters, generated from the all filters.
   * ListDataSource subscribes to this onbservable to generate queries to the db and
   * retrieve data.
   */
  private _queryString: Observable<string>;

  get queryString(): Observable<string> {
    return this._queryString;
  }

  /**
   * Subscribes to the value changes of all the basic filters
   * (displayed in the main filter component)
   */
  private _basicFiltersSub: Subscription;

  /**
   * Encoded string of a filters preset currently being loaded
   */
  private _loadingPreset: string | null;

  /**
   * Subscribes to the load preset event, loading the filters preset and
   * updating the filters list accordingly
   */
  private _loadingPresetSub: Subscription;

  /**
   * Event that triggers the loading of a filters preset.
   */
  private _loadPresetEvent: EventEmitter<boolean>;

  get loadPresetEvent(): EventEmitter<boolean> {
    return this._loadPresetEvent;
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _ts: TranslocoService,
    private _metricsService: MetricsService,
  ) {
    this._generatedModelFilters = new BehaviorSubject<FilterGroup[]>([]);
    this._generatedAdditionalFilters = new BehaviorSubject<FilterGroup[]>([]);
    this._basicFilters = new BehaviorSubject<FilterItem[]>([]);
    this._customFilters = new BehaviorSubject<FilterGroup[]>([]);
    this._additionalFilters = new BehaviorSubject<FilterItem[]>([]);
    this._temporaryFilters = new BehaviorSubject<FilterItem[]>([]);
    this._queryString = new BehaviorSubject<string>('');
    this._loadingPreset = null;
    this._loadPresetEvent = new EventEmitter<boolean>();
    this._basicFiltersSub = Subscription.EMPTY;
    this._loadingPresetSub = Subscription.EMPTY;
    this._availableBasicFilterLabels = ['form_status', 'user_data', 'user_group'];
    this._formValueChanges = [];

    this._generatedFilters = combineLatest([
      this._generatedModelFilters,
      this._generatedAdditionalFilters,
      this._customFilters,
    ]).pipe(
      map(([defaultModelFilters, defaultAdditionalFilters, customFilters]) => {
        if (customFilters.length > 0) {
          return customFilters;
        }
        return defaultModelFilters.concat(defaultAdditionalFilters);
      }),
      catchError(err => throwError(() => err) as Observable<FilterGroup[]>),
    );

    this._loadingPresetSub.unsubscribe();
    this._loadingPresetSub = this._loadPresetEvent
      .pipe(
        withLatestFrom(this._route.queryParams.pipe(map(f => f['filters']))),
        catchError(err => throwError(() => err) as Observable<[any, any]>),
      )
      .subscribe(([loadEvent, preset]) => {
        if (loadEvent) {
          this.loadPreset(preset);
        }
      });

    this._queryString = combineLatest([
      this._basicFilters.pipe(skip(1)),
      this._additionalFilters.pipe(skip(1)),
    ]).pipe(
      map(([basicFilters, additionalFilters]) => {
        const allFilters = [...basicFilters, ...additionalFilters];
        // .filter(
        //   ft => ft.value || ft.value === false || ft.value === 0,
        // );
        if (this._loadingPreset != null) {
          this._updateBasicFormValues(allFilters);
          this._loadingPreset = null;
        }
        const transformedFilters: FilterItem[] = this._transformMetricSubFilters(allFilters);
        return this._updateQueryString(transformedFilters);
      }),
      catchError(err => throwError(() => err) as Observable<string>),
    );
  }

  /**
   * Generates default filters from the RxJsonSchema of a model
   * @param modelSchema The model RxJsonSchema schema
   */
  generateModelFilters(modelSchema: RxJsonSchema<T>): void {
    if (!modelSchema || modelSchema.title === 'FormData') {
      this._generatedModelFilters.next([]);
      return;
    }
    const propertyKeys = Object.keys(modelSchema.properties);
    const index = propertyKeys.indexOf('_deleted');
    if (index > -1) {
      propertyKeys.splice(index, 1);
    }
    let modelFiltersGroup: FilterGroup = {
      filterGroupName: modelSchema.title
        ? modelSchema.title.charAt(0).toUpperCase() + modelSchema.title.slice(1)
        : '',
      filterGroupAdditionalFilters: [],
    };
    propertyKeys.forEach(prop => {
      if (prop && DEFAULT_MODEL_KEYS.indexOf(prop) < 0) {
        const propKey = prop as Extract<keyof T, string>;
        modelFiltersGroup.filterGroupAdditionalFilters?.push(
          this._propToFilterItem(prop, modelSchema.properties[propKey]),
        );
      }
    });
    const currentModelFilters = this._generatedModelFilters.getValue();
    this._generatedModelFilters.next([...currentModelFilters, modelFiltersGroup]);
  }

  /**
   * Clears all generated model filters
   */
  clearModelFilters(): void {
    this._generatedModelFilters.next([]);
  }

  /**
   * Clears all custom filters
   */
  clearCustomFilters(): void {
    this._customFilters.next([]);
  }

  /**
   * Sets the additional filters list
   * @param filters The generated filters. Defaults to an empty array
   */
  setAdditionalFilters(filters: FilterGroup[] = []): void {
    this._generatedAdditionalFilters.next(filters);
  }

  /**
   * Loads a filters preset from an encoded string, and initializes filters accordingly.
   * If no encoded string is passed to the method, it just initializes
   * the filters lists as empty.
   * @param encodedString? The optional encoded string
   */
  loadPreset(encodedString?: string): void {
    this._basicFilters.next([]);
    if (encodedString == null) {
      this._additionalFilters.next([]);
      return;
    }
    this._loadingPreset = encodedString;
    const parsedFilters: {filters: FilterItem[]; additionalFiltersLogic: 'and' | 'or'} = JSON.parse(
      decodeURI(atob(encodedString)),
    );
    const filterItems: FilterItem[] = parsedFilters.filters ?? [];
    const additionalFiltersLogic = parsedFilters.additionalFiltersLogic;
    let basic: FilterItem[] = [];
    let additional: FilterItem[] = [];
    let basicFormGroupsKeys: string[] = [];
    if (this._basicFormGroups) {
      this._basicFormGroups.forEach(fg => basicFormGroupsKeys.push(...Object.keys(fg.value)));
    }
    filterItems.forEach(item => {
      basicFormGroupsKeys.indexOf(item.name) > -1 ? basic.push(item) : additional.push(item);
    });
    this._additionalFiltersLogic.next(additionalFiltersLogic);
    this._basicFilters.next(basic);
    this._additionalFilters.next(additional);
    this.resetTemporaryFilters();
  }

  /**
   * Adds a FilterItem to the list of the chosen type.
   * @param filterItem The filter item to add
   * @param filterList The filter list where it will be added
   */
  addFilter(filterItem: FilterItem, filterList: FilterListType): void {
    if (!this._canAddFilter(filterItem, filterList)) {
      return;
    }
    const currentList = this._selectFilterListType(filterList);
    const currentValue = currentList.getValue().map(a => ({...a} as FilterItem));
    if (filterList === 'basic') {
      this._updateBasicFormValues([filterItem]);
    }
    if (currentValue != null && currentList != null) {
      const newFilters = currentValue.concat([filterItem]);
      currentList.next(newFilters);
    }
  }

  /**
   * Removes a FilterItem from the list/lists of the chosen type.
   * @param filterItem The filter item to remove
   * @param filterList The filter list or lists where it will be removed from
   * @returns a confirmation of the filter removal
   */
  removeFilter(
    filterItem: FilterItem,
    filterList: FilterListType[] | FilterListType,
  ): Observable<boolean> {
    if (!Array.isArray(filterList)) {
      filterList = [filterList];
    }
    filterList.forEach(fl => {
      const currentList = this._selectFilterListType(fl);
      if (currentList != null) {
        const updatedList = currentList.value.filter(ft => {
          return (
            ft.name != filterItem.name ||
            ft.operator != filterItem.operator ||
            ft.value != filterItem.value
          );
        });
        currentList.next(updatedList);
        if (filterList.indexOf('basic') > -1) {
          this._updateBasicFormValues([filterItem]);
        }
      }
    });
    return obsOf(true);
  }

  /**
   * Searches for a FilterItem by name in a list of the chosen type.
   * If no type is specified, it searches in the TemporaryFiltersList
   * @param filterName The name of the filter to search for
   * @param filterList? Optional list of filters to search in
   * @returns The found FilterItem, or undefined if nothing is found
   */
  findFilterByName(
    filterName: string,
    filterList?: FilterListType,
  ): Observable<FilterItem | undefined> {
    if (filterList == null) {
      filterList = 'temporary';
    }
    const currentList = this._selectFilterListType(filterList);
    const filterItem: Observable<FilterItem | undefined> = currentList.pipe(
      map(filters => filters.find(f => f.name === filterName)),
      take(1),
    );
    return filterItem.pipe(catchError(err => throwError(() => err) as Observable<FilterItem>));
  }

  /**
   * Evaluates a Filter's validation conditions
   * @param filterItem The FilterItem to check
   * @param ajfValidation The filter validation conditions to evaluate
   * @returns True if all the conditions are valid
   */
  checkValidation(filterItem: FilterItem, ajfValidation?: AjfValidationGroup): boolean {
    if (!ajfValidation) {
      return true;
    }
    let valid = true;
    if (ajfValidation.maxValue != null) {
      valid = filterItem.value <= ajfValidation.maxValue;
      if (!valid) {
        return valid;
      }
    }
    if (ajfValidation.minValue != null) {
      valid = filterItem.value >= ajfValidation.minValue;
      if (!valid) {
        return valid;
      }
    }
    if (ajfValidation.notEmpty) {
      valid = filterItem.value !== null && filterItem.value !== '';
      if (!valid) {
        return valid;
      }
    }
    if (ajfValidation.conditions && ajfValidation.conditions.length > 0) {
      for (let cnd of ajfValidation.conditions) {
        valid = this.checkCondition(cnd, filterItem);
        if (!valid) {
          break;
        }
      }
    }
    return valid;
  }

  /**
   * Evaluates if a Filter validation/visibility single condition is met
   * @param condition The validation/visibility condition to evaluate
   * @param filterItem Optional filterItem to check
   * @returns True if the condition is met
   */
  checkCondition(ajfCondition: AjfCondition, filterItem?: FilterItem): boolean {
    if (ajfCondition.condition == null) {
      return false;
    }
    const condition = ajfCondition.condition;
    let valid: boolean = true;
    if (condition.includes('valueInChoice')) {
      const str = condition.replace('valueInChoice', '').replace(/[()]/g, '').split(' ');
      const nameToCheck = str[0].replace(',', '');
      const valueToCheck = str[1].replace(/[\"\']/g, '');
      this.findFilterByName(nameToCheck).subscribe(filterToCheck => {
        filterToCheck = filterItem ?? filterToCheck;
        if (
          !filterToCheck ||
          filterToCheck.value == null ||
          filterToCheck.value.indexOf(valueToCheck) < 0 ||
          filterToCheck.operator?.value == '$nin'
        ) {
          valid = false;
        }
      });
    } else {
      const strConditions = condition.split('&&');
      strConditions.forEach(cnd => {
        const str = cnd.split(' ');
        const nameToCheck = str[0];
        this.findFilterByName(nameToCheck).subscribe(filterToCheck => {
          filterToCheck = filterItem ?? filterToCheck;
          const conditionNoQuotes = cnd.replace(nameToCheck, filterToCheck?.value);
          const conditionQuotes = cnd.replace(nameToCheck, `'${filterToCheck?.value}'`);
          const evaluateConditions =
            evaluateExpression(conditionNoQuotes) || evaluateExpression(conditionQuotes);
          if (!filterToCheck || filterToCheck.value == null || !evaluateConditions) {
            valid = false;
          }
        });
      });
    }

    return valid;
  }

  /**
   * Overwrites the additional filters with the temporaryFilters.
   * @param logic The logic operator to use when creating the query in the dataSource.
   */
  updateAdditionalFilters(logic?: 'and' | 'or'): void {
    if (logic && logic !== this._additionalFiltersLogic.value) {
      this._additionalFiltersLogic.next(logic);
    }
    const newFilters = this._temporaryFilters.value.map(a => ({...a} as FilterItem));
    this._additionalFilters.next(newFilters);
  }

  /**
   * Resets the temporaryFilters to the current additionalFilters value
   */
  resetTemporaryFilters(): void {
    const tempFilters = this._additionalFilters.value.map(a => ({...a} as FilterItem));
    this._temporaryFilters.next(tempFilters);
  }

  /**
   * Sets and initializes the basic filters (dateStart, dateEnd and keyword and all other
   * additional basic filters) and loads the filter preset from the queryParams.
   * Returns an observable of all the additional basic filters initalized.
   * @param formGroups The basic filter form groups
   * @returns All the optional basic filters initalized
   */
  initializeFilters(basicFormGroups: UntypedFormGroup[]): Observable<UntypedFormGroup[]> {
    this._basicFormGroups = [...basicFormGroups, ...this._basicAdditionalFormGroups];
    this._formValueChanges = this._basicFormGroups.map(group => group.valueChanges);

    this._basicFiltersSub.unsubscribe();
    this._basicFiltersSub = merge(...this._formValueChanges)
      .pipe(
        withLatestFrom(this._basicFilters),
        debounceTime(400),
        map(([changes, basicFilters]) => {
          let filterItems: FilterItem[] = [];
          for (const fName of Object.keys(changes)) {
            if (fName.indexOf('_multiple') < 0) {
              const changesValue =
                this._getIdsFromMultipleMetricSelection(changes, fName) ?? changes[fName];
              const ftItem: FilterItem = {
                name: fName,
                value: changesValue,
                operator: {label: 'Like', value: '$regex'},
                fieldType: AjfFieldType.String,
              };
              filterItems.push(ftItem);
            }
          }
          return [filterItems, basicFilters];
        }),
        catchError(err => throwError(() => err) as Observable<[FilterItem[], FilterItem[]]>),
      )
      .subscribe(([filters, currentFilters]) => {
        const currentValue = currentFilters;
        this._basicFilters.next(this._mergeFilterItems(currentValue, filters));
      });

    this.loadPresetTrigger();
    return obsOf(this._basicAdditionalFormGroups).pipe(
      catchError(err => throwError(() => err) as Observable<UntypedFormGroup[]>),
    );
  }

  /**
   * Triggers the _loadPresetEvent
   */
  loadPresetTrigger(): void {
    this._loadPresetEvent.emit(true);
  }

  /**
   * Adds a label to the list of available basic filters labels.
   * A label is added when the module of the relative filter (eg. Projects, Locations etc.)
   * is imported.
   * @param label The label of the filter to be displayed.
   */
  addAvailableFilterLabel(label: string): void {
    if (this._availableBasicFilterLabels.indexOf(label) > -1) {
      return;
    }
    this._availableBasicFilterLabels.push(label);
  }

  /**
   * Checks for additional basic filters, related to opt-in modules
   * (eg. Project, Location, Forms etc.).
   * @param basicFilter the basic filter to be added
   */
  addBasicFilter(ftName: string): void {
    if (!ftName || this._currentBasicFilterLabels.indexOf(ftName) > -1) {
      return;
    }

    const formControl = Object.create({});
    formControl[`${ftName}`] = new UntypedFormControl();
    // TODO sara multiple
    formControl[`${ftName}_multiple`] = new UntypedFormControl();
    const basicFilter = new UntypedFormGroup(formControl);
    this._basicAdditionalFormGroups.push(basicFilter);
    this._currentBasicFilterLabels.push(ftName);
  }

  /**
   * Clears the additional basic filters arrays.
   */
  clearAdditionalBasicFilters(): void {
    this._basicAdditionalFormGroups = [];
    this._currentBasicFilterLabels = [];
  }

  /**
   * Checks if the "and/or" logic can be switched based on the filters currently present
   * in the temporary filters list.
   * @returns True if the logic can be switched
   */
  canSwitchLogic(): Observable<boolean> {
    return this._temporaryFilters.pipe(
      withLatestFrom(this.temporaryAdditionalFiltersLogic),
      map(([tFilters, tLogic]) => {
        if (tLogic === 'and') {
          return true;
        }

        let canSwitch = true;
        for (let idx = 0; idx < tFilters.length; idx++) {
          const filterItem = tFilters[idx];
          if (
            tFilters.some(
              fi =>
                fi.name === filterItem.name &&
                fi.operator?.value == filterItem.operator?.value &&
                tFilters.indexOf(fi) !== idx,
            )
          ) {
            canSwitch = false;
            break;
          }
        }
        return canSwitch;
      }),
    );
  }

  /**
   * Checks if a filter can be added to a filter list.
   * @param filterItem The filter to be added
   * @param listType The list of filters
   * @returns True if the filter can be added to the specified list
   */
  private _canAddFilter(filterItem: FilterItem, listType: FilterListType): boolean {
    if (listType === 'basic') {
      return true;
    }
    const logic = this.temporaryAdditionalFiltersLogic.value;
    const targetList = this._selectFilterListType(listType);
    const targetListValue = targetList.getValue().map(a => ({...a} as FilterItem));
    const hasOperator = filterItem.operator != null;
    let res = false;
    let errText = `A filter `;
    if (hasOperator) {
      errText += `with operator "{{operator}}" `;
    }
    if (logic === 'and') {
      res = !targetListValue.some(f => {
        return f.name === filterItem.name && f.operator?.value == filterItem.operator?.value;
      });
    } else {
      res = !targetListValue.some(
        f =>
          f.name === filterItem.name &&
          f.operator?.value == filterItem.operator?.value &&
          f.value == filterItem.value,
      );
      errText += `${hasOperator ? 'and' : 'with'} value "{{value}}" `;
    }
    errText += `on field "{{field}}" already exists. Please create a different filter.`;

    if (!res) {
      this.filterErrorEvt.emit({
        msg: this._ts.translate('FILTER ALREADY EXISTS'),
        text: this._ts.translate(errText, {
          operator: filterItem.operator?.label.toUpperCase(),
          value: filterItem.value,
          field: filterItem.label?.toUpperCase(),
        }),
      });
    }
    return res;
  }

  /**
   * Merges two arrays of FilterItems while overwriting old Filter values with new ones
   * @param oldFilters The old filters array
   * @param newFilters The new filters array
   * @returns The merged filters
   */
  private _mergeFilterItems(oldFilters: FilterItem[], newFilters: FilterItem[]) {
    for (let i = 0, l = oldFilters.length; i < l; i++) {
      for (let j = 0, ll = newFilters.length; j < ll; j++) {
        if (oldFilters[i].name === newFilters[j].name) {
          oldFilters.splice(i, 1, newFilters[j]);
          break;
        }
      }
    }
    const diff = newFilters.filter(item => !oldFilters.some(ft => ft.name === item.name));
    oldFilters = oldFilters.concat(diff);
    return oldFilters;
  }

  /**
   * If the field value in the form changes is a string instead of an object, it return,
   * if exists an '<fname>_multiple' field, the new value for the filter with all the selected ids.
   * @param changes form value changes
   * @param fName form field name
   * @returns the new value for the form field or null
   */
  private _getIdsFromMultipleMetricSelection(changes: any, fName: string): any {
    if (typeof changes[fName] === 'string') {
      const multipleValue: any[] = changes[`${fName}_multiple`] ? changes[`${fName}_multiple`] : [];
      if (multipleValue.length) {
        let multipleIds = multipleValue.map((m: any) => m?.id ?? m).map(m => (m == null ? '' : m));
        return {id: multipleIds, name: changes[fName], secondary: null};
      }
    }
    return null;
  }

  /**
   * Updates the queryString encoding a FilterItems array, and adds the queryParams to the url
   * @param filterItems The FilterItems array to be encoded
   * @returns The encoded query string
   */
  private _updateQueryString(filterItems: FilterItem[]): string {
    const queryString = btoa(
      encodeURI(
        JSON.stringify({
          filters: filterItems,
          additionalFiltersLogic: this._additionalFiltersLogic.value,
        }),
      ),
    );
    if (this._loadingPreset == null) {
      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: filterItems.length ? {'filters': queryString} : null,
      });
    }
    return queryString;
  }

  /**
   * Updates the basic filters form values
   * @param filterItems The FilterItems used to update the form values
   */
  private _updateBasicFormValues(filterItems: FilterItem[]): void {
    if (!filterItems || !this._basicFormGroups) {
      return;
    }
    const formValue = Object.create({});
    filterItems.forEach(ft => {
      formValue[ft.name] = ft.value;

      if (ft.value && ft.value.id && Array.isArray(ft.value.id)) {
        formValue[`${ft.name}_multiple`] = ft.value.id;
      }
    });
    this._basicFormGroups.forEach(fg => {
      fg.patchValue(formValue, {emitEvent: false});
    });
  }

  /**
   * Generates a FilterItem from a Model Property
   * @param propName The property name
   * @param prop The property
   * @returns The generated FilterItem
   */
  private _propToFilterItem(propName: string, prop: TopLevelProperty): FilterItem {
    const fieldType =
      prop.type != null && typeof prop.type === 'string'
        ? FIELD_TYPES[prop.type]
        : AjfFieldType.String;
    let filterItem: FilterItem = {
      name: propName,
      fieldType,
    };
    return filterItem;
  }

  /**
   * Returns an observable of all the filters in the list of the chosen type.
   * basic: filters displayed in the main component.
   * additional: filters displayed in a secondary component, usually related to model's "data".
   * temporary: filters temporarily stored, that need an action to be merged in the active filters.
   * @param type The filter list type
   * @returns The filter items in the chosen list
   */
  private _selectFilterListType(type: FilterListType): BehaviorSubject<FilterItem[]> {
    switch (type) {
      case 'basic':
        return this._basicFilters;
      case 'additional':
        return this._additionalFilters;
      case 'temporary':
      default:
        return this._temporaryFilters;
    }
  }

  /**
   * Transforms the names of the Filter Items that are related to a metric RxDocument sub-filter
   * into their main Metric Name
   * (eg. case_code with RxDocument as value -> case (eg. filter by case code in aggregation section)
   *      case_name with string as value -> case_name (eg. for relationship metrics fields)
   * @param allFilters
   * @returns
   */
  private _transformMetricSubFilters(allFilters: FilterItem[]): FilterItem[] {
    const activeMetrics: string[] = this._metricsService.activeMetrics.value.map(
      metric => metric.metricName,
    );
    const transformedFilters = allFilters.map(filter => {
      const metric = activeMetrics.find(amt => filter.name.includes(`${amt}_`));
      if (metric) {
        if (filter.value && isRxDocument(filter.value)) {
          return {...filter, name: metric};
        }
      }
      return filter;
    });
    return transformedFilters;
  }
}
