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
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {FilterItem, FilterListType, FiltersService} from '@dino/core/list';
import {combineLatest, Observable, of as obsOf, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

/**
 * Shows a list of active filters and allows their deletion.
 * Each single active filter is represented by a chip, with it's corrisponding name,
 * operator and value.
 */
@Component({
  selector: 'dino-search-filters-chips',
  styleUrls: ['search-filters-chips.scss'],
  templateUrl: 'search-filters-chips.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchFiltersChips implements OnInit {
  /**
   * The chips to be displayed.
   */
  chipsFilters: Observable<FilterItem[]> = obsOf([]);

  /**
   * The list of filters which will be displayed by the chips.
   */
  @Input() chipsType: FilterListType = 'basic';

  /**
   * The names of the basic filters that get no chip, because the component
   * hosting the chips already displays them (eg. the keyword field of the
   * filters bar, always visible with its own value and clear button).
   */
  @Input() hiddenFilterNames: string[] = [];

  /**
   * Event emitted when a chip is deleted.
   */
  @Output() readonly excludeFilter: EventEmitter<FilterItem>;

  constructor(private _fts: FiltersService) {
    this.excludeFilter = new EventEmitter<FilterItem>();
  }

  /**
   * Selects which filterList the chips should display on init, based on the @Input chipsType
   */
  ngOnInit() {
    switch (this.chipsType) {
      case 'basic':
        this.chipsFilters = this._fts.basicFilters.pipe(map(basic => this._markBasicFilters(basic)));
        break;
      case 'additional':
        this.chipsFilters = this._fts.additionalFilters;
        break;
      case 'temporary':
        this.chipsFilters = this._fts.temporaryFilters;
        break;
      case 'all':
      default:
        this.chipsFilters = combineLatest([
          this._fts.basicFilters,
          this._fts.additionalFilters,
        ]).pipe(map(([basic, additional]) => this._markBasicFilters(basic).concat(additional)));
        break;
    }
    // Here we make sure that invalid filters or filters with null / empty values
    // are not displayed as chips
    this.chipsFilters = this.chipsFilters.pipe(
      map(filters => filters.filter(cf => this._isDisplayed(cf))),
      catchError(err => throwError(() => err) as Observable<FilterItem[]>),
    );
  }

  /**
   * The label displayed by a chip: the name of the field the filter comes from.
   * @param filterItem The filter item of the chip
   * @returns The label to display, still to be translated
   */
  chipLabel(filterItem: FilterItem): string {
    if (!filterItem.isBasicFilter) {
      return filterItem.label ? filterItem.label : filterItem.name;
    }
    if (filterItem.name === 'dateStart') {
      return 'From date';
    }
    if (filterItem.name === 'dateEnd') {
      return 'To date';
    }
    // The same transformation the filters bar applies to the placeholders of the
    // basic filter fields: 'user_data' reads 'User', 'form_status' reads
    // 'Form status'.
    return (
      filterItem.name.charAt(0).toUpperCase() +
      filterItem.name.slice(1).replace('_', ' ').replace('data', '')
    ).trim();
  }

  /**
   * The value displayed by the chip of a basic filter: the same the field it
   * comes from displays, since that field is not visible once the filters
   * dialog is closed.
   * @param filterItem The basic filter item of the chip
   * @returns The value to display, a Date when the filter is a date one
   */
  chipValue(filterItem: FilterItem): any {
    const value = filterItem.value;
    if (value == null) {
      return '';
    }
    if (typeof value !== 'object' || value instanceof Date) {
      return value;
    }
    const item = value as {[key: string]: any};
    // Form statuses
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
    // Metrics, either a single option or a multiple selection
    if (item['name']) {
      return item['secondary'] ? `${item['name']} - (${item['secondary']})` : item['name'];
    }
    return '';
  }

  /**
   * Marks the filters of the basic list, whose chips are labelled and valued
   * after the field they come from, dropping the ones the host component
   * displays on its own.
   * @param filters The basic filters
   * @returns The basic filters to be displayed as chips
   */
  private _markBasicFilters(filters: FilterItem[]): FilterItem[] {
    return filters
      .filter(ft => this.hiddenFilterNames.indexOf(ft.name) < 0)
      .map(ft => ({...ft, isBasicFilter: true}));
  }

  /**
   * Checks if a filter is to be displayed as a chip. A basic filter keeps its
   * place in the list once its field has been used, so only the ones actually
   * carrying a value get a chip.
   * @param filterItem The filter item
   * @returns True if the filter is to be displayed
   */
  private _isDisplayed(filterItem: FilterItem): boolean {
    if (!filterItem.isBasicFilter) {
      return filterItem.isValid === true;
    }
    const value = this.chipValue(filterItem);
    return value !== '' && value != null;
  }

  /**
   * Checks if the value is an array with null
   * @param value The value to check
   * @returns True if the value is an array with null, false otherwise
   */
  isArrayWithNull(value: any): boolean {
    return Array.isArray(value) && value.includes(null);
  }

  /**
   * Removes a filterItem from the filter list, deleting the chip
   * @param filterItem The filter item to remove
   */
  removeFilterItem(filterItem: FilterItem): void {
    this.excludeFilter.emit(filterItem);
  }
}
