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

import {
  AjfChoicesOrigin,
  AjfFieldType,
  AjfForm,
  AjfFormSerializer,
  AjfNode,
  AjfNodeType,
  AjfSlide
} from '@ajf/core/forms';
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
import {
  DEFAULT_OPERATORS,
  FilterGroup,
  FilterItem,
  FilterListType,
  FiltersService,
  WidgetData,
} from '@dewco/core/list';
import {BehaviorSubject, Observable, Subscription, throwError} from 'rxjs';
import {catchError, map, take, withLatestFrom} from 'rxjs/operators';

import {SearchFiltersWidget} from '../searchfilters-widget';

/**
 * Dialog component that shows and handles all advancedFilters.
 * It may contain dewco-mat-searchfilters-chips and multiple dewco-mat-searchfilters-widget.
 */
@Component({
  selector: 'dewco-mat-searchfilters-dialog',
  styleUrls: ['search-filters-dialog.css'],
  templateUrl: 'search-filters-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchFiltersDialog implements OnInit, OnDestroy, AfterViewInit {
  /**
   * The Id of the selected tab
   */
  private _currentGroupId: BehaviorSubject<number>;

  private _updateWidgetsEvent: EventEmitter<boolean>;

  /**
   * Data of all widgets in the dialog
   */
  widgetData: Observable<WidgetData[]>;

  private _updateWidgetsSub: Subscription = Subscription.EMPTY;

  @ViewChildren(SearchFiltersWidget) widgets: QueryList<SearchFiltersWidget>;

  constructor(
      public dialogRef: MatDialogRef<SearchFiltersDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public fts: FiltersService,
  ) {
    this._currentGroupId = new BehaviorSubject<number>(0);
    this._updateWidgetsEvent = new EventEmitter<boolean>();
    this.dialogRef.backdropClick().subscribe(_ => this.closeDialog());
  }

  ngOnInit() {
    this.widgetData = this._currentGroupId.pipe(
        withLatestFrom(this.fts.modelFilters),
        map(([id, groups]) => groups[id] as FilterGroup),
        map((group) => group.filterGroupAdvancedFilters ?
                group.filterGroupAdvancedFilters.filter(ft => ft.fieldType !== AjfFieldType.Empty) :
                []),
        map(filters => filters.map(f => this._setupWidget(this._setupFilterItem(f)))),
        catchError(err => throwError(err) as Observable<WidgetData[]>),
        take(1),
    );
  }

  ngAfterViewInit() {
    if (this.widgets) {
      this._updateWidgetsSub = (this._updateWidgetsEvent as Observable<boolean>).subscribe(res => {
        if (res === false) {
          return;
        }
        let matchingWidgets = this.widgets.toArray().filter(widget => {
          return this.fts.temporaryFilters.value.some(
              ft => ft.name === widget.widgetName && ft.value === null &&
                  widget.toggleButton.checked);
        });
        matchingWidgets.map(w => {
          w.toggleButton.toggle();
        });
      });
    }
  }

  /**
   * Closes the dialog and resets the Temporary Filters
   *
   */
  closeDialog() {
    this.dialogRef.close(false);
  }

  /**
   * Closes the dialog and updates the Active Filters
   *
   */
  search() {
    this.dialogRef.close(true);
  }

  /**
   * Sets the group id in the mat tab group
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
   * @param filterList The filter list type
   */
  removeFilter(filterItem: FilterItem, listType: FilterListType[]|FilterListType): void {
    this.fts.removeFilter(filterItem, listType)
        .pipe(
            take(1),
            catchError(err => throwError(err) as Observable<boolean>),
            )
        .subscribe(res => this._updateWidgetsEvent.emit(res));
  }

  /**
   * Generates and sets up a FilterItem
   * @param item The FilterItem to set up
   * @return The generated FilterItem
   */
  private _setupFilterItem(item: FilterItem): FilterItem {
    const ftItem: FilterItem = {
      id: item.id ?? 11,
      parent: 1,
      parentNode: item.parentNode ?? 1,
      choicesOrigin: item.choicesOrigin,
      choicesOriginRef: item.choicesOrigin?.name,
      name: item.name,
      label: item.label ?? item.name.charAt(0).toUpperCase() + item.name.slice(1),
      nodeType: AjfNodeType.AjfField,
      fieldType: item.fieldType ? item.fieldType : AjfFieldType.String,
      isFormData: item.isFormData,
      editable: item.editable ?? true,
      defaultValue: item.defaultValue ?? null,
      size: item.size ?? 'normal',
      validation: item.validation,
      visibility: item.visibility != null ? item.visibility : {condition: 'true'},
    };
    return ftItem;
  }

  /**
   * Transforms a FilterItem into a WidgetData object
   * @param filterItem The filter item to transform
   * @returns The WidgetData object
   */
  private _setupWidget(filterItem: FilterItem): WidgetData {
    const activeFilter = this.fts.temporaryFilters.value.find(f => f.name === filterItem.name);
    const fieldValue = activeFilter ? activeFilter.value : null;
    const fieldChoices: AjfChoicesOrigin<any>[] =
        filterItem.choicesOrigin ? [filterItem.choicesOrigin] : [];
    filterItem.value = fieldValue;
    filterItem.operator =
        activeFilter?.operator ?? DEFAULT_OPERATORS[filterItem.fieldType ?? AjfFieldType.String];
    const formSchema: Partial<AjfForm> = {
      choicesOrigins: fieldChoices,
      nodes: [{
        parent: 0,
        parentNode: 0,
        id: 1,
        name: filterItem.name,
        label: filterItem.label,
        nodeType: AjfNodeType.AjfSlide,
        nodes: [filterItem as Partial<AjfNode>]
      } as AjfSlide],
    };
    const ctx = Object.create({});
    ctx[filterItem.name] = fieldValue;
    const filterVisibility = filterItem.visibility;
    const form = AjfFormSerializer.fromJson(formSchema, ctx);
    form.nodes[0].visibility = filterVisibility;
    return {
      form: form,
      operator: filterItem.operator,
      active: fieldValue != null,
      validation: filterItem.validation,
      isFormData: filterItem.isFormData ?? false,
    };
  }

  ngOnDestroy() {
    this._updateWidgetsSub.unsubscribe();
    this._currentGroupId.complete();
  }
}
