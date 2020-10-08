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
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {
  FilterItem,
  filterListType,
  FiltersService,
  SearchFiltersComponent,
} from '@dewco/core/list';
import {SearchFiltersDialog} from '@dewco/material/searchfilters-dialog';
import {Subscription} from 'rxjs';

/**
 * Opt-in component that handles all SelectionList filters.
 * The filters are obtained by parsing the RxJsonSchema of the model and the ajfFormSchema,
 * if present as a model property.
 * It may contain two child components:
 * dewco-mat-searchfilters-chips and dewco-mat-searchfilters-dialog.
 * This component creates and sends a query string to the SelectionList component DataSource
 */
@Component({
  selector: 'dewco-mat-searchfilters-bar',
  styleUrls: ['search-filters-bar.css'],
  templateUrl: 'search-filters-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: SearchFiltersComponent, useExisting: SearchFiltersBar}]
})
export class SearchFiltersBar extends SearchFiltersComponent implements OnInit, OnDestroy {
  private _dialogRef: MatDialogRef<SearchFiltersDialog, any>;
  private _dialogSub: Subscription = Subscription.EMPTY;

  constructor(
      protected _fts: FiltersService,
      public dialog: MatDialog,
  ) {
    super(_fts);
  }

  ngOnInit() {
    this._initFilters();
  }

  /**
   * Opens a dialog with dewco-mat-searchfilters-dialog component.
   * Subscribes to Dialog closing event, updating the advancedFilters when requested.
   *
   * @param {FilterSlide[]} filterSlides
   * @param {FilterItem[]} activeFilterItems
   * @return {void}
   *
   */
  openDialog() {
    this._fts.resetTemporaryFilters();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.panelClass = 'search-filters-dialog';
    this._dialogRef = this.dialog.open(SearchFiltersDialog, dialogConfig);
    this._dialogSub = this._dialogRef.afterClosed().subscribe(search => {
      if (search) {
        this._fts.updateAdvancedFilters();
      }
    });
  }

  /**
   * Asks the FilterService to remove a FilterItem from the selected filter lists
   * @param {FilterItem} filterItem
   * @param {filterListType[]|filterListType} listType
   */
  removeFilter(filterItem: FilterItem, listType: filterListType[]|filterListType): void {
    this._fts.removeFilter(filterItem, listType);
  }

  /**
   * Tells the FilterService to initialize the filters and load the filters from the route
   * queryParams
   */
  private _initFilters() {
    this._fts.initializeFilters(this.basicFilters);
  }

  ngOnDestroy() {
    this._dialogSub.unsubscribe();
  }
}
