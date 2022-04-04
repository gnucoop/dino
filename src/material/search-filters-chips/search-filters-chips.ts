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
import {combineLatest, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

/**
 * Shows a list of active filters and allows their deletion.
 * Each single active filter is represented by a chip, with it's corrisponding name,
 * operator and value.
 */
@Component({
  selector: 'dino-search-filters-chips',
  styleUrls: ['search-filters-chips.css'],
  templateUrl: 'search-filters-chips.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchFiltersChips implements OnInit {
  /**
   * The chips to be displayed.
   */
  chipsFilters: Observable<FilterItem[]>;

  /**
   * The list of filters which will be displayed by the chips.
   */
  @Input() chipsType: FilterListType;

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
        this.chipsFilters = this._fts.basicFilters;
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
        ]).pipe(map(([basic, additional]) => basic.concat(additional)));
        break;
    }
    // Here we make sure that invalid filters or filters with null / empty values
    // are not displayed as chips
    this.chipsFilters = this.chipsFilters.pipe(
      map(filters => filters.filter(cf => cf.value !== null && cf.value !== '' && cf.isValid)),
      catchError(err => throwError(() => err) as Observable<FilterItem[]>),
    );
  }

  /**
   * Removes a filterItem from the filter list, deleting the chip
   * @param filterItem The filter item to remove
   */
  removeFilterItem(filterItem: FilterItem): void {
    this.excludeFilter.emit(filterItem);
  }
}
