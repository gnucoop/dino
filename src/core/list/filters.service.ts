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

import {AjfFieldType, AjfValidationGroup} from '@ajf/core/forms';
import {AjfCondition, evaluateExpression} from '@ajf/core/models';
import {EventEmitter, Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PrimaryProperty, RxJsonSchema} from 'rxdb';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  of as obsOf,
  Subscription,
  throwError,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  take,
  withLatestFrom,
} from 'rxjs/operators';

import {
  DEFAULT_MODEL_KEYS,
  FIELD_TYPES,
  FilterGroup,
  FilterItem,
  FilterListType,
} from './list-filters-interfaces';
import {ListModule} from './list.module';

/**
 * Service that handles all operations related to list Filters.
 * It maintains the state of all FilterItems, including the value and operator of the active ones.
 * It takes care of communication between all Search Filters Components and the ListDataSource,
 * by generating a querystring from all active filters, which is then sent to the ListDataSource to
 * retrieve and display the filtered data in the List.
 * It generates FilterItems from the model RxJsonSchema provided by the ListDataSource.
 * It can load filters presets from the Preset Manager, and initialize filters accordingly.
 */
@Injectable({providedIn: ListModule})
export class FiltersService {
  /**
   * The labels of all available additional basic filters.
   * Available filters are added by importing the relative modules.
   * Used to check if a filter can be added and displayed in the
   * main filters component (eg. SearchFiltersBar)-
   */
  private _availableBasicFilterLabels: string[] = [];

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
  private _basicFormGroups: FormGroup[];

  /**
   * The FormGroups of the Additional filters to be displayed in the main filter component
   * (eg. Location, Project etc.)
   */
  private _basicAdditionalFormGroups: FormGroup[] = [];

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
  private _loadingPreset: string|null;

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
    this._availableBasicFilterLabels = [];
    this._formValueChanges = [];

    this._generatedFilters =
        combineLatest([
          this._generatedModelFilters,
          this._generatedAdditionalFilters,
          this._customFilters,
        ])
            .pipe(
                map(([defaultModelFilters, defaultAdditionalFilters, customFilters]) => {
                  if (customFilters.length > 0) {
                    return customFilters;
                  }
                  return defaultModelFilters.concat(defaultAdditionalFilters);
                }),
                catchError(err => throwError(err) as Observable<FilterGroup[]>),
            );

    this._loadingPresetSub.unsubscribe();
    this._loadingPresetSub =
        this._loadPresetEvent
            .pipe(
                withLatestFrom(this._route.queryParams.pipe(map((f) => f['filters']))),
                catchError(err => throwError(err) as Observable<[any, any]>),
                )
            .subscribe(([loadEvent, preset]) => {
              if (loadEvent) {
                this.loadPreset(preset);
              }
            });

    this._queryString = combineLatest([
                          this._basicFilters.pipe(skip(1)),
                          this._additionalFilters.pipe(skip(1)),
                        ])
                            .pipe(
                                map(([
                                      basicFilters,
                                      additionalFilters,
                                    ]) => {
                                  const allFilters = [...basicFilters, ...additionalFilters].filter(
                                      (ft) => ft.value || ft.value === false || ft.value === 0);
                                  if (this._loadingPreset != null) {
                                    this._updateBasicFormValues(allFilters);
                                    this._loadingPreset = null;
                                  }
                                  return this._updateQueryString(allFilters);
                                }),
                                catchError(err => throwError(err) as Observable<string>),
                            );
  }

  /**
   * Generates default filters from the RxJsonSchema of a model
   * @param modelSchema The model RxJsonSchema schema
   */
  generateModelFilters(modelSchema: RxJsonSchema): void {
    if (!modelSchema || modelSchema.title === 'FormData') {
      this._generatedModelFilters.next([]);
      return;
    }
    const propertyKeys = Object.keys(modelSchema.properties);
    const index = propertyKeys.indexOf('is_deleted');
    if (index > -1) {
      propertyKeys.splice(index, 1);
    }
    let modelFiltersGroup: FilterGroup = {
      filterGroupName: modelSchema.title ?
          modelSchema.title.charAt(0).toUpperCase() + modelSchema.title.slice(1) :
          '',
      filterGroupAdditionalFilters: [],
    };
    propertyKeys.forEach(prop => {
      if (prop && DEFAULT_MODEL_KEYS.indexOf(prop) < 0) {
        modelFiltersGroup.filterGroupAdditionalFilters?.push(
            this._propToFilterItem(prop, modelSchema.properties[prop] as PrimaryProperty));
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
    if (encodedString == null) {
      this._basicFilters.next([]);
      this._additionalFilters.next([]);
      return;
    }
    this._loadingPreset = encodedString;
    const filterItems: FilterItem[] = JSON.parse(decodeURI(atob(encodedString)));
    let basic: FilterItem[] = [];
    let additional: FilterItem[] = [];
    let basicFormGroupsKeys: string[] = [];
    if (this._basicFormGroups) {
      this._basicFormGroups.forEach(fg => basicFormGroupsKeys.push(...Object.keys(fg.value)));
    }
    filterItems.forEach(item => {
      basicFormGroupsKeys.indexOf(item.name) > -1 ? basic.push(item) : additional.push(item);
    });
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
    const currentList = this._selectFilterListType(filterList);
    const currentValue =
        this._selectFilterListType(filterList).value.map(a => ({...a}) as FilterItem);
    if (filterList === 'basic') {
      this._updateBasicFormValues([filterItem]);
    }
    if (currentValue != null && currentList != null) {
      currentList.next(this._mergeFilterItems(currentValue, [filterItem]));
    }
  }

  /**
   * Removes a FilterItem from the list/lists of the chosen type.
   * @param filterItem The filter item to remove
   * @param filterList The filter list or lists where it will be removed from
   * @returns a confirmation of the filter removal
   */
  removeFilter(filterItem: FilterItem, filterList: FilterListType[]|FilterListType):
      Observable<boolean> {
    if (!Array.isArray(filterList)) {
      filterList = [filterList];
    }
    filterList.forEach(fl => {
      const currentList = this._selectFilterListType(fl);
      if (currentList != null) {
        const updatedList = currentList.value.map(ft => {
          ft.value = ft.name == filterItem.name ? null : ft.value;
          return ft;
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
  findFilterByName(filterName: string, filterList?: FilterListType):
      Observable<FilterItem|undefined> {
    if (filterList == null) {
      filterList = 'temporary';
    }
    const currentList = this._selectFilterListType(filterList);
    const filterItem: Observable<FilterItem|undefined> = currentList.pipe(
        map(filters => filters.find(f => f.name === filterName)),
        take(1),
    );
    return filterItem.pipe(
        catchError(err => throwError(err) as Observable<FilterItem>),
    );
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
        if (!filterToCheck || filterToCheck.value == null ||
            filterToCheck.value.indexOf(valueToCheck) < 0 ||
            filterToCheck.operator?.value == '$nin') {
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
   * Merges the temporaryFilters into the additional filters, updating the latter
   */
  updateAdditionalFilters(): void {
    const newFilters = this._temporaryFilters.value.map(a => ({...a}) as FilterItem);
    this._additionalFilters.next(this._mergeFilterItems(this._additionalFilters.value, newFilters));
  }

  /**
   * Resets the temporaryFilters to the current additionalFilters value
   */
  resetTemporaryFilters(): void {
    const tempFilters = this._additionalFilters.value.map(a => ({...a}) as FilterItem);
    this._temporaryFilters.next(tempFilters);
  }

  /**
   * Sets and initializes the basic filters (dateStart, dateEnd and keyword and all other
   * additional basic filters) and loads the filter preset from the queryParams.
   * Returns an observable of all the additional basic filters initalized.
   * @param formGroups The basic filter form groups
   * @returns All the optional basic filters initalized
   */
  initializeFilters(basicFormGroups: FormGroup[]): Observable<FormGroup[]> {
    this._basicFormGroups = [...basicFormGroups, ...this._basicAdditionalFormGroups];
    this._formValueChanges = this._basicFormGroups.map(group => group.valueChanges);

    this._basicFiltersSub.unsubscribe();
    this._basicFiltersSub =
        merge(...this._formValueChanges)
            .pipe(
                withLatestFrom(this._basicFilters),
                debounceTime(400),
                map(([changes, basicFilters]) => {
                  let filterItems: FilterItem[] = [];
                  for (const fName of Object.keys(changes)) {
                    const ftItem: FilterItem = {
                      name: fName,
                      value: changes[fName],
                      operator: {label: 'Like', value: '$regex'},
                      fieldType: AjfFieldType.String,
                    };
                    filterItems.push(ftItem);
                  }
                  return [filterItems, basicFilters];
                }),
                catchError(err => throwError(err) as Observable<[FilterItem[], FilterItem[]]>),
                )
            .subscribe(([filters, currentFilters]) => {
              const currentValue = currentFilters;
              this._basicFilters.next(this._mergeFilterItems(currentValue, filters));
            });


    this.loadPresetTrigger();
    return obsOf(this._basicAdditionalFormGroups)
        .pipe(catchError(err => throwError(err) as Observable<FormGroup[]>));
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
    formControl[`${ftName}`] = new FormControl();
    const basicFilter = new FormGroup(formControl);
    this._basicAdditionalFormGroups.push(basicFilter);
    this._currentBasicFilterLabels.push(ftName);
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
    const diff = newFilters.filter((item) => !oldFilters.some((ft) => ft.name === item.name));
    oldFilters = oldFilters.concat(diff);
    return oldFilters;
  }

  /**
   * Updates the queryString encoding a FilterItems array, and adds the queryParams to the url
   * @param filterItems The FilterItems array to be encoded
   * @returns The encoded query string
   */
  private _updateQueryString(filterItems: FilterItem[]): string {
    const queryString = btoa(encodeURI(JSON.stringify(filterItems)));
    if (this._loadingPreset == null) {
      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: filterItems.length ? {'filters': queryString} : null
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
  private _propToFilterItem(propName: string, prop: PrimaryProperty): FilterItem {
    const fieldType = prop.type != null ? FIELD_TYPES[prop.type] : AjfFieldType.String;
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
}
