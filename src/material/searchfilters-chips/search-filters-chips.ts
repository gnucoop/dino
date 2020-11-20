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
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {FilterItem, FilterListType, FiltersService} from '@dewco/core/list';
import {combineLatest, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

/**
 * Shows a list of active filters and allows the deletion of any one of those
 *
 */
@Component({
  selector: 'dewco-searchfilters-chips',
  styleUrls: ['search-filters-chips.css'],
  templateUrl: 'search-filters-chips.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchFiltersChips implements OnInit {
  chipsFilters: Observable<FilterItem[]>;
  @Input() chipsType: FilterListType;
  @Output() excludeFilter: EventEmitter<FilterItem>;

  constructor(private _fts: FiltersService) {
    this.excludeFilter = new EventEmitter<FilterItem>();
  }

  /**
   * Selects which filterList the chips should display on init, by the @Input chipsType
   */
  ngOnInit() {
    switch (this.chipsType) {
      case 'basic':
        this.chipsFilters = this._fts.basicFilters;
        break;
      case 'advanced':
        this.chipsFilters = this._fts.advancedFilters;
        break;
      case 'temporary':
        this.chipsFilters = this._fts.temporaryFilters;
        break;
      case 'all':
      default:
        this.chipsFilters = combineLatest([this._fts.basicFilters, this._fts.advancedFilters])
                                .pipe(
                                    map(([basic, advanced]) => basic.concat(advanced)),
                                );
        break;
    }
    this.chipsFilters = this.chipsFilters.pipe(
        map(filters => filters.filter(cf => cf.value !== null && cf.value !== '' && cf.isValid)),
        catchError(err => throwError(err) as Observable<FilterItem[]>),
    );
  }

  /**
   * Removes a filterItem from the filter list, deleting the chip
   * @param filterItem The filter item to remove
   */
  removeFilterItem(filterItem: FilterItem) {
    this.excludeFilter.emit(filterItem);
  }
}
