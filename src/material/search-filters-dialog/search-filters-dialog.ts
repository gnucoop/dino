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
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FilterGroup, FilterItem, FilterListType, FiltersService} from '@dino/core/list';
import {SearchFiltersWidget} from '@dino/material/search-filters-widget';
import {BehaviorSubject, Observable, Subscription, throwError} from 'rxjs';
import {catchError, map, take, withLatestFrom} from 'rxjs/operators';

/**
 * Dialog component that shows Additional Filters, grouped and divided in Tabs.
 * It may contain dino-search-filters-chips and multiple dino-search-filters-widget.
 * It is usually associated with a main filters component that displays Basic Filters
 * (eg. dino-search-filters-bar).
 */
@Component({
  selector: 'dino-search-filters-dialog',
  styleUrls: ['search-filters-dialog.css'],
  templateUrl: 'search-filters-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchFiltersDialog implements OnInit, OnDestroy, AfterViewInit {
  /**
   * Data of all the filters in the Dialog
   */
  filterItemsData: Observable<FilterItem[]>;

  /**
   * A query list of the widgets contained in the dialog.
   */
  @ViewChildren(SearchFiltersWidget) widgets: QueryList<SearchFiltersWidget>;

  /**
   * The index of the selected tab. Defaults to 0 (first tab)
   */
  private _currentGroupId: BehaviorSubject<number>;

  /**
   * An event emitted to update the state of a widget in the dialog and
   * toggle its slideToggle, when its value is set to null
   */
  private _updateWidgetsEvent: EventEmitter<boolean>;

  /**
   * Subscribes to the updateWidgetsEvent and updates the widgets's toggle states
   */
  private _updateWidgetsSub: Subscription = Subscription.EMPTY;

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
    this._updateWidgetsEvent = new EventEmitter<boolean>();
    this._backdropClickSub = this.dialogRef.backdropClick().subscribe(_ => this.closeDialog());
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

  ngAfterViewInit() {
    if (this.widgets) {
      this._updateWidgetsSub = this._updateWidgetsEvent.subscribe((res: boolean) => {
        if (res === false) {
          return;
        }
        let matchingWidgets = this.widgets.toArray().filter(widget => {
          return this.fts.temporaryFilters.value.some(
            ft => ft.name === widget.widgetName && ft.value === null && widget.toggleButton.checked,
          );
        });
        matchingWidgets.map(w => {
          w.toggleButton.toggle();
        });
      });
    }
  }

  /**
   * Closes the dialog without updating the Filters
   *
   */
  closeDialog() {
    this.dialogRef.close(false);
  }

  /**
   * Closes the dialog and updates the Filters
   *
   */
  search() {
    this.dialogRef.close(true);
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
    if (filterItem.value !== null && filterItem.value !== '') {
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
      .subscribe(res => this._updateWidgetsEvent.emit(res));
  }

  /**
   * Sets up a FilterItem, assigning default fallback values to
   * required properties where necessary.
   * @param item The FilterItem to set up
   * @returns The generated FilterItem
   */
  private _setupFilterItem(item: FilterItem): FilterItem {
    const ftItem: FilterItem = {
      id: item.id ?? 10,
      parent: 1,
      parentNode: item.parentNode ?? 1,
      choicesOrigin: item.choicesOrigin,
      choicesOriginRef: item.choicesOrigin?.name,
      name: item.name,
      label: item.label ?? item.name.charAt(0).toUpperCase() + item.name.slice(1),
      nodeType: AjfNodeType.AjfField,
      fieldType: item.fieldType ? item.fieldType : AjfFieldType.String,
      isAdditionalFilter: item.isAdditionalFilter,
      editable: item.editable ?? true,
      defaultValue: item.defaultValue ?? null,
      size: item.size ?? 'normal',
      validation: item.validation,
      visibility: item.visibility != null ? item.visibility : {condition: 'true'},
      isFilterItemDetails: item.isFilterItemDetails,
      isRepeatingSlideFilter: item.isRepeatingSlideFilter,
    };
    return ftItem;
  }

  ngOnDestroy() {
    this._backdropClickSub.unsubscribe();
    this._updateWidgetsSub.unsubscribe();
    this._currentGroupId.complete();
  }
}
