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
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {
  FilterItem,
  FilterListType,
  FiltersService,
  SearchFiltersComponent,
} from '@dewco/core/list';
import {SearchFiltersDialog} from '@dewco/material/searchfilters-dialog';
import {Observable, Subscription, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

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
      private _cdr: ChangeDetectorRef,
  ) {
    super();
  }

  ngOnInit() {
    this._initFilters();
  }

  /**
   * Opens a dialog with dewco-searchfilters-dialog component.
   * Subscribes to Dialog closing event, updating the advancedFilters when requested.
   */
  openDialog() {
    this._fts.resetTemporaryFilters();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.id = 'modal-component';
    dialogConfig.panelClass = 'search-filters-dialog';
    this._dialogRef = this.dialog.open(SearchFiltersDialog, dialogConfig);
    this._dialogSub = this._dialogRef.afterClosed()
                          .pipe(catchError(err => throwError(err) as Observable<boolean>))
                          .subscribe((search: boolean) => {
                            if (search) {
                              this._fts.updateAdvancedFilters();
                            }
                          });
  }

  /**
   * Asks the FilterService to remove a FilterItem from the selected filter lists
   * @param filterItem The filter item to remove
   * @param listType The list type
   */
  removeFilter(filterItem: FilterItem, listType: FilterListType[]|FilterListType): void {
    this._fts.removeFilter(filterItem, listType);
  }

  /**
   * Tells the FilterService to initialize the filters and load them from the route
   * queryParams
   */
  private _initFilters() {
    this._fts.initializeFilters(this.basicFilters)
        .pipe(
            catchError(err => throwError(err) as Observable<FormGroup[]>),
            )
        .subscribe(formGroups => {
          this.basicFilters = [...this.basicFilters, ...formGroups];
          this.optionalFilters = formGroups;
          this.optionalFiltersLabels =
              this.optionalFilters.map(group => Object.keys(group.controls)[0]);
          this._cdr.detectChanges();
        })
        .unsubscribe();
  }

  ngOnDestroy() {
    this._dialogSub.unsubscribe();
  }
}
