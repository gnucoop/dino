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
import {AjfCondition} from '@ajf/core/models';
import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RxJsonSchema} from 'rxdb';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  of as obsOf,
  Subject,
  Subscription,
} from 'rxjs';
import {
  debounceTime,
  map,
  switchMap,
  take,
  withLatestFrom,
} from 'rxjs/operators';
import {
  DEFAULT_MODEL_KEYS,
  FIELD_TYPES,
  FilterGroup,
  FilterItem,
  filterListType,
} from '@dewco/core/list';

/**
 * Service that handles all operations related to list Filters.
 */
@Injectable({providedIn: 'root'})
export class FiltersService implements OnDestroy {
  private _listReady: BehaviorSubject<boolean>;
  set listReady(status: boolean) {
    this._listReady.next(status);
  }

  private _defaultModelFilters: Subject<FilterGroup[]>;

  private _defaultFormSchemaFilters: Subject<FilterGroup[]>;

  private _modelFilters: BehaviorSubject<FilterGroup[]>;
  get modelFilters(): BehaviorSubject<FilterGroup[]> {
    return this._modelFilters;
  }
  set setCustomFilters(filterGroups: FilterGroup[]) {
    this._modelFilters.next(filterGroups);
  }

  private _basicFormGroups: FormGroup[];

  private _basicFilters: BehaviorSubject<FilterItem[]>;
  get basicFilters(): BehaviorSubject<FilterItem[]> {
    return this._basicFilters;
  }

  private _temporaryFilters: BehaviorSubject<FilterItem[]>;
  get temporaryFilters(): BehaviorSubject<FilterItem[]> {
    return this._temporaryFilters;
  }
  private _advancedFilters: BehaviorSubject<FilterItem[]>;
  get advancedFilters(): BehaviorSubject<FilterItem[]> {
    return this._advancedFilters;
  }

  private _activeFilters: Subject<FilterItem[]>;
  get activeFilters(): Subject<FilterItem[]> {
    return this._activeFilters;
  }

  _queryString: BehaviorSubject<string>;
  get queryString(): BehaviorSubject<string> {
    return this._queryString;
  }

  private _modelFiltersSub: Subscription;
  private _basicFiltersSub: Subscription;
  private _activeFiltersSub: Subscription;
  private _queryStringSub: Subscription;
  private _loadingPreset: string|null;
  private _loadingPresetSub: Subscription;
  loadPresetEvent: EventEmitter<boolean>;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
  ) {
    /**
     * Filters generated from a Model Schema
     */
    this._defaultModelFilters = new Subject<FilterGroup[]>();

    /**
     * Filters generated from an Ajf Form Schema
     */
    this._defaultFormSchemaFilters = new Subject<FilterGroup[]>();

    /**
     * List of all generated or custom filters
     */
    this._modelFilters = new BehaviorSubject<FilterGroup[]>([]);

    /**
     * Basic filters such as text keyword search, from/to date search, usually displayed in the main
     * filter component
     */
    this._basicFilters = new BehaviorSubject<FilterItem[]>([]);

    /**
     * Advanced filters, related to the modelSchema or formSchema properties, usually displayed in
     * a secondary filter component (Dialog, Chips etc.)
     */
    this._advancedFilters = new BehaviorSubject<FilterItem[]>([]);

    /**
     * List of temporary filters that are not immediately applied and need an action to be included
     * in the activeFilters. (Ex. filters in a Dialog when the "search" button is clicked)
     */
    this._temporaryFilters = new BehaviorSubject<FilterItem[]>([]);

    /**
     * List of all basic/advanced active filters associated with a value and an operator.
     * Used to compose a query string, sent to the DataSource
     */
    this._activeFilters = new Subject<FilterItem[]>();

    /**
     * Encoded string of a mango query, generated with the activeFilters, sent to the dataSource to
     * retrieve data.
     */
    this._queryString = new BehaviorSubject<string>('');

    /**
     * Determines if the service can start to query the ListDataSource
     */
    this._listReady = new BehaviorSubject<boolean>(true);

    /**
     * Encoded string of a filters preset currently being loaded
     */
    this._loadingPreset = null;

    /**
     * Event that triggers the loading of a filters preset.
     */
    this.loadPresetEvent = new EventEmitter<boolean>(true);

    this._basicFiltersSub = Subscription.EMPTY;

    this._modelFiltersSub =
        combineLatest([this._defaultModelFilters, this._defaultFormSchemaFilters])
            .pipe(
                withLatestFrom(this._modelFilters),
                )
            .subscribe(([[defaultModelFilters, defaultSchemaFilters], modelFilters]) => {
              if (!modelFilters.length &&
                  (defaultModelFilters.length > 0 || defaultSchemaFilters.length > 0)) {
                this._modelFilters.next(defaultModelFilters.concat(defaultSchemaFilters));
              }
            });

    this._activeFiltersSub = combineLatest([
                               this._basicFilters,
                               this._advancedFilters,
                               this._listReady,
                             ]).subscribe(([basicFilters, advancedFilters, listReady]) => {
      if (!listReady) {
        return;
      }
      let allFilters = [...basicFilters, ...advancedFilters];
      let actFilters: FilterItem[] = [];
      this._activeFilters.pipe(take(1)).subscribe(fts => actFilters = fts);
      if (actFilters.length > 0 && allFilters.length > 0) {
        actFilters = this._mergeFilterItems(actFilters, allFilters);
      } else {
        actFilters = allFilters;
      }
      actFilters = actFilters.filter((ft) => ft.value || ft.value === false || ft.value === 0);
      this._activeFilters.next(actFilters);
    });

    this._queryStringSub = this._activeFilters.subscribe((items) => {
      if (this._loadingPreset != null) {
        this._updateBasicFormValues(items);
        this._loadingPreset = null;
      }
      this._updateQueryString(items);
    });
  }

  /**
   * Returns an observable of the filterItems list of the chosen filterListType
   * @param {filterListType} type
   * @returns {BehaviorSubject(FilterItem[])}
   */
  private _selectFilterListType(type: filterListType): BehaviorSubject<FilterItem[]> {
    switch (type) {
      case 'basic':
        return this.basicFilters;
      case 'advanced':
        return this.advancedFilters;
      case 'temporary':
      default:
        return this.temporaryFilters;
    }
  }

  /**
   * Adds a FilterItem to the filterItems list of the chosen filterListType
   * @param {FilterItem} filterItem
   * @param {filterListType} filterList
   */
  addFilter(filterItem: FilterItem, filterList: filterListType): void {
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
   * Removes a FilterItem from the filterItems lists of the chosen filterListTypes
   * @param {FilterItem} filterItem
   * @param {filterListType} filterList
   */
  removeFilter(filterItem: FilterItem, filterList: filterListType[]|filterListType):
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
   * Searches for a FilterItem by name in filterItems list of the chosen filterListType.
   * If no filterListType is specified, it searches in the TemporaryFiltersList
   * @param {string} filterName
   * @param {filterListType?} filterList?
   * @returns {Observable(FilterItem|undefined)}
   */
  findFilterByName(filterName: string, filterList?: filterListType):
      Observable<FilterItem|undefined> {
    if (filterList == null) {
      filterList = 'temporary';
    }
    const currentList = this._selectFilterListType(filterList);
    const filterItem: Observable<FilterItem|undefined> = currentList.pipe(
        map(filters => filters.find(f => f.name === filterName)),
        take(1),
    );
    return filterItem;
  }

  /**
   * Evaluates a Filter validation conditions
   * @param {AjfValidationGroup}
   * @return {boolean}
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
   * @param {AjfCondition} condition
   * @returns {boolean}
   */
  checkCondition(ajfCondition: AjfCondition, filterItem?: FilterItem): boolean {
    if (ajfCondition.condition == null) {
      return false;
    }
    const condition = ajfCondition.condition;
    let valid: boolean = true;
    if (condition.indexOf('valueInChoice') > -1) {
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
        const operator = str[1];
        const valueToCompare = str[2];
        this.findFilterByName(nameToCheck).subscribe(filterToCheck => {
          filterToCheck = filterItem ?? filterToCheck;
          if (!filterToCheck || !this.checkValues(filterToCheck.value, valueToCompare, operator)) {
            valid = false;
          }
        });
      });
    }

    return valid;
  }

  /**
   * Evaluates string expression with two string values and a string comparison operator
   * @param {string} val_a;
   * @param {string} val_b;
   * @param {string} operator;
   * @returns {boolean}
   */
  checkValues(val_a: string, val_b: string, operator: string): boolean {
    val_b = val_b.replace(/[\"\']/g, '');
    switch (operator) {
      case '>=':
        return Number(val_a) >= Number(val_b);
      case '<=':
        return Number(val_a) <= Number(val_b);
      case '!=':
      case '!==':
        return '' + val_a != val_b && '' + val_a != null;
      default:
        return '' + val_a == val_b;
    }
  }

  /**
   * Updates the AdvancedFilters by merging in the temporaryFilters
   */
  updateAdvancedFilters(): void {
    const newFilters = this._temporaryFilters.value.map(a => ({...a}) as FilterItem);
    this._advancedFilters.next(this._mergeFilterItems(this._advancedFilters.value, newFilters));
  }

  /**
   * Resets the temporaryFilters to the current AdvancedFilters value
   */
  resetTemporaryFilters(): void {
    const tempFilters = this._advancedFilters.value.map(a => ({...a}) as FilterItem);
    this._temporaryFilters.next(tempFilters);
  }

  /**
   * Sets and initializes the basic filters (usually dateStart, dateEnd and keyword) and loads the
   * filter preset from the queryParams
   * @param {FormGroup[]} formGroups
   */
  initializeFilters(basicFormGroups: FormGroup[]): void {
    this._basicFormGroups = basicFormGroups;
    const valueChanges = this._basicFormGroups.map(group => group.valueChanges);

    this._loadingPresetSub =
        this.loadPresetEvent.asObservable()
            .pipe(withLatestFrom(this._route.queryParams.pipe(map((f) => f['filters']))))
            .subscribe(([loadEvent, preset]) => {
              if (loadEvent) {
                this.loadPreset(preset);
              }
            });

    this._basicFiltersSub =
        merge(...valueChanges)
            .pipe(
                debounceTime(200),
                switchMap((flt) => {
                  let filterItems: FilterItem[] = [];
                  for (const fName of Object.keys(flt)) {
                    const ftItem: FilterItem = {
                      name: fName,
                      value: flt[fName],
                      operator: {label: '==', value: '$eq'},
                      fieldType: AjfFieldType.String,
                    };
                    filterItems.push(ftItem);
                  }
                  return [filterItems];
                }),
                )
            .subscribe(filters => {
              const currentValue = this._basicFilters.value.map(a => ({...a}) as FilterItem);
              this._basicFilters.next(this._mergeFilterItems(currentValue, filters));
            });

    this.LoadPresetTrigger();
  }

  /**
   * Triggers the loadPresetEvent
   */
  LoadPresetTrigger() {
    this.loadPresetEvent.emit(true);
  }


  /**
   * Merges two arrays of FilterItems while overwriting old Filter values with new ones
   *
   * @param {FilterItem[]} oldFilters
   * @param {FilterItem[]} newFilters
   * @returns {FilterItem[]}
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
   * Loads a filters preset from an encoded string, and initializes filters accordingly
   * @param {string|null} encodedString
   */
  loadPreset(encodedString: string|null): void {
    if (encodedString == null) {
      this._basicFilters.next([]);
      this._advancedFilters.next([]);
      return;
    }
    this._loadingPreset = encodedString;
    const filterItems: FilterItem[] = JSON.parse(decodeURI(atob(encodedString)));
    let basic: FilterItem[] = [];
    let advanced: FilterItem[] = [];
    let basicFormGroupsKeys: string[] = [];
    if (this._basicFormGroups) {
      this._basicFormGroups.forEach(fg => basicFormGroupsKeys.push(...Object.keys(fg.value)));
    }
    filterItems.forEach(item => {
      basicFormGroupsKeys.indexOf(item.name) > -1 ? basic.push(item) : advanced.push(item);
    });
    this._basicFilters.next(basic);
    this._advancedFilters.next(advanced);
    this.resetTemporaryFilters();
  }

  /**
   * Updates the queryString encoding a FilterItems array, and adds the queryParams to the url
   *
   * @param {FilterItem[]} FilterItems
   *
   */
  private _updateQueryString(filterItems: FilterItem[]) {
    const queryString = btoa(encodeURI(JSON.stringify(filterItems)));
    if (this._loadingPreset == null) {
      this._router.navigate([], {
        relativeTo: this._route,
        queryParams: filterItems.length ? {'filters': queryString} : null
      });
    }
    this._queryString.next(queryString);
  }

  /**
   * Updates the basic filters form values
   *
   *  @param {FilterItem[]} filterItems
   */
  private _updateBasicFormValues(filterItems: FilterItem[]) {
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
   * Generates all filters from the model and form schemas
   * @param {RxJsonSchema} modelSchema
   * @param {any} formSchema
   */
  generateFilters(modelSchema: RxJsonSchema, formSchema: any = null) {
    this.generateModelSchemaFilters(modelSchema);
    this.generateFormSchemaFilters(formSchema);
  }

  /**
   * Creates default filters from a RxJsonSchema of a model
   * @param {RxJsonSchema} modelSchema
   */
  generateModelSchemaFilters(modelSchema: RxJsonSchema) {
    if (!modelSchema) {
      this._defaultModelFilters.next([]);
      return;
    }
    const propertyKeys = Object.keys(modelSchema.properties);
    let modelFiltersGroup: FilterGroup = {
      filterGroupName: modelSchema.title ?? '',
      filterGroupAdvancedFilters: [],
    };
    propertyKeys.forEach(prop => {
      if (prop && DEFAULT_MODEL_KEYS.indexOf(prop) < 0) {
        modelFiltersGroup.filterGroupAdvancedFilters?.push(
            this._propToFilterItem(prop, modelSchema.properties[prop]));
      }
    });
    this._defaultModelFilters.next([modelFiltersGroup]);
  }

  /**
   * Creates form filters from an AjfFormSchema ()
   * @param {Object} formSchema
   */
  generateFormSchemaFilters(formSchema: any) {
    if (!formSchema) {
      this._defaultFormSchemaFilters.next([]);
      return;
    }
    const slides = formSchema.nodes;
    const nodes: FilterGroup[] = [];
    for (let i = 0; i < slides.length; i++) {
      let advancedFilters = slides[i].nodes as FilterItem[];
      nodes.push({
        filterGroupName: slides[i].label,
        filterGroupAdvancedFilters: advancedFilters.map(f => {
          f.choices = f.choicesOrigin ? f.choicesOrigin.choices : undefined;
          f.isFormData = true;
          return f;
        })

      } as FilterGroup);
    }
    this._defaultFormSchemaFilters.next(nodes);
  }

  /**
   * Generates a FilterItem from a Model Property
   * @param {string} propName
   * @param {any} prop
   * @returns {FilterItem}
   */
  private _propToFilterItem(propName: string, prop: any) {
    const propType = FIELD_TYPES[prop.type];
    let filterItem: FilterItem = {
      name: propName,
      fieldType: propType ?? AjfFieldType.String,
    };
    return filterItem;
  }

  ngOnDestroy() {
    this._activeFiltersSub.unsubscribe();
    this._basicFiltersSub.unsubscribe();
    this._queryStringSub.unsubscribe();
    this._loadingPresetSub.unsubscribe();
    this._modelFiltersSub.unsubscribe();

    this._defaultModelFilters.complete();
    this._defaultFormSchemaFilters.complete();
    this._modelFilters.complete();
    this._basicFilters.complete();
    this._advancedFilters.complete();
    this._temporaryFilters.complete();
    this._activeFilters.complete();
    this._queryString.complete();
  }
}
