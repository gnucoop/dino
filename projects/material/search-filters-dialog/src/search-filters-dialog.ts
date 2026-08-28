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

import {AjfFieldType, AjfNodeType} from '@ajf/core/forms';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  FilterGroup,
  FilterItem,
  FilterListType,
  FiltersService,
  NULL_OPERATORS,
} from '@dino/core/list';
import {SearchFiltersWidget} from '@dino/material/search-filters-widget';
import {BehaviorSubject, Observable, of as obsOf, Subscription, throwError} from 'rxjs';
import {catchError, map, take, withLatestFrom} from 'rxjs/operators';

/**
 * Dialog component that shows Additional Filters, grouped and divided in Tabs.
 * It may contain dino-search-filters-chips and multiple dino-search-filters-widget.
 * It is usually associated with a main filters component that displays Basic Filters
 * (eg. dino-search-filters-bar).
 */
@Component({
  selector: 'dino-search-filters-dialog',
  styleUrls: ['search-filters-dialog.scss'],
  templateUrl: 'search-filters-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchFiltersDialog implements OnInit, OnDestroy {
  /**
   * Data of all the filters in the Dialog
   */
  filterItemsData: Observable<FilterItem[]> = obsOf([]);

  /**
   * A query list of the widgets contained in the dialog.
   */
  @ViewChildren(SearchFiltersWidget) widgets!: QueryList<SearchFiltersWidget>;

  /**
   * The "And"/"Or" toggle Form Control.
   */
  logicAndOrToggle: UntypedFormControl;

  /**
   * Subscribes to the "And"/"Or" toggle Form Control value changes.
   */
  private _logicToggleSub: Subscription = Subscription.EMPTY;

  /**
   * The index of the selected tab. Defaults to 0 (first tab)
   */
  private _currentGroupId: BehaviorSubject<number>;

  /**
   * Subscribes to the backdrop click event of the dialog ref, closing the Dialog when that emits
   */
  private _backdropClickSub: Subscription = Subscription.EMPTY;

  constructor(
    public dialogRef: MatDialogRef<SearchFiltersDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fts: FiltersService,
  ) {
    this._currentGroupId = new BehaviorSubject<number>(0);
    this._backdropClickSub = this.dialogRef.backdropClick().subscribe(_ => this.closeDialog());
    const currentLogic = this.fts.additionalFiltersLogic.value;
    this.logicAndOrToggle = new UntypedFormControl(currentLogic);
    this._logicToggleSub = this.logicAndOrToggle.valueChanges.subscribe(res => {
      if (this.fts.canSwitchLogic()) {
        this.fts.temporaryAdditionalFiltersLogic.next(res);
      }
    });
    this.fts.temporaryAdditionalFiltersLogic.next(currentLogic);
  }

  ngOnInit() {
    // This is where the setup of all widgets data happens
    this.filterItemsData = this.fts.generatedFilters.pipe(
      withLatestFrom(this._currentGroupId),
      map(([groups, id]) => groups[id] as FilterGroup),
      map(group =>
        group.filterGroupAdditionalFilters
          ? group.filterGroupAdditionalFilters
              .filter(ft => ft.fieldType !== AjfFieldType.Empty)
              .map(flt => {
                flt.isFilterItemDetails = group.isFilterGroupDetails;
                return flt;
              })
          : [],
      ),
      map(filters => filters.map(f => this._setupFilterItem(f))),
      catchError(err => throwError(() => err) as Observable<FilterItem[]>),
      take(1),
    );
  }

  /**
   * Closes the dialog without updating the Filters
   *
   */
  closeDialog() {
    this.dialogRef.close({search: false});
  }

  /**
   * Closes the dialog and updates the Filters
   *
   */
  search() {
    this.dialogRef.close({search: true, logic: this.logicAndOrToggle.value});
  }

  /**
   * Sets the group id in the mat tab group (the tab index)
   * @param id The group id
   */
  setCurrentGroupId(id: number): void {
    this._currentGroupId.next(id);
  }

  /**
   * Asks the FilterService to add a FilterItem to the filterItems list of the chosen FilterListType
   * @param filterItem The filter item to add
   * @param filterList The filter list type
   */
  addFilter(filterItem: FilterItem, listType: FilterListType): void {
    const operatorValue = filterItem.operator?.value;
    const isNullOperator = operatorValue && operatorValue in NULL_OPERATORS;

    const hasValue = filterItem.value !== null && filterItem.value !== '';

    if (hasValue || isNullOperator) {
      this.fts.addFilter(filterItem, listType);
    }
  }

  /**
   * Asks the FilterService to remove a FilterItem from the filterItems lists of the chosen
   * FilterListTypes, then triggers the update of the associated widgets.
   * @param filterItem The filter item to remove
   * @param filterList The filter list type or types
   */
  removeFilter(filterItem: FilterItem, listType: FilterListType[] | FilterListType): void {
    this.fts
      .removeFilter(filterItem, listType)
      .pipe(
        take(1),
        catchError(err => throwError(() => err) as Observable<boolean>),
      )
      .subscribe();
  }

  /**
   * Sets up a FilterItem, assigning default fallback values to
   * required properties where necessary.
   * Ids are fixed, because every filter is rendered as the only field of a slide
   * with id 1 in its own SearchFiltersWidget form.
   * A filter is always editable and always visible: which filters exist at all is
   * decided upstream by the list, that evaluates the form schema visibility
   * conditions with the full form context.
   * @param item The FilterItem to set up
   * @returns The generated FilterItem
   */
  private _setupFilterItem(item: FilterItem): FilterItem {
    return {
      id: 10,
      parent: 1,
      parentNode: 1,
      choicesOrigin: item.choicesOrigin,
      choicesOriginRef: item.choicesOrigin?.name,
      name: item.name,
      label: item.label ?? item.name,
      nodeType: AjfNodeType.AjfField,
      fieldType: item.fieldType ? item.fieldType : AjfFieldType.String,
      isAdditionalFilter: item.isAdditionalFilter,
      editable: true,
      defaultValue: null,
      visibility: {condition: 'true'},
      isFilterItemDetails: item.isFilterItemDetails,
      isRepeatingSlideFilter: item.isRepeatingSlideFilter,
    };
  }

  ngOnDestroy() {
    this._backdropClickSub.unsubscribe();
    this._logicToggleSub.unsubscribe();
    this._currentGroupId.complete();
  }
}
