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
  Input,
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
import {BreakpointObserverService} from '@dewco/material/breakpoint-observer';
import {SearchFiltersDialog} from '@dewco/material/search-filters-dialog';
import {Observable, Subscription, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

/**
 * Opt-in component that handles all SelectionList filters.
 * The filters are obtained by parsing the RxJsonSchema of the model and the ajfFormSchema,
 * if present as a model property.
 * It may contain two child components:
 * dewco-search-filters-chips and dewco-search-filters-dialog.
 */
@Component({
  selector: 'dewco-search-filters-bar',
  styleUrls: ['search-filters-bar.css'],
  templateUrl: 'search-filters-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: SearchFiltersComponent, useExisting: SearchFiltersBar}]
})
export class SearchFiltersBar extends SearchFiltersComponent implements OnInit, OnDestroy {
  /**
   * If true, the Preset Manager is available and displayed.
   * Defaults to false.
   */
  private _presetManager: boolean = false;
  get presetManager(): boolean {
    return this._presetManager;
  }
  @Input()
  set presetManager(state: boolean) {
    this._presetManager = state;
  }

  /**
   * Allows the customization of the filters dialog width
   */
  private _filtersDialogWidth: number = 95;
  @Input()
  set filtersDialogWidth(w: number) {
    if (w != null && w > 0) {
      this._filtersDialogWidth = w;
    }
  }
  /**
   * A reference to the MatDialog that contains the additionalFilters
   */
  private _dialogRef: MatDialogRef<SearchFiltersDialog>;

  /**
   * Subscribes to the value returned by the MatDialog on its closing event
   */
  private _dialogSub: Subscription = Subscription.EMPTY;

  constructor(
      protected _fts: FiltersService,
      public dialog: MatDialog,
      private _cdr: ChangeDetectorRef,
      readonly breakpointObserver: BreakpointObserverService,
  ) {
    super();
  }

  ngOnInit() {
    this._initFilters();
  }

  /**
   * Opens a dialog with dewco-search-filters-dialog component.
   * Aligns the temporary filters list to the additional filters list.
   * Subscribes to Dialog closing event, updating the Additional Filters when
   * the Dialog closing event value is true.
   */
  openDialog() {
    this._fts.resetTemporaryFilters();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dewco-search-filters-dialog';
    dialogConfig.minWidth = `${this._filtersDialogWidth}vw`;
    dialogConfig.maxWidth = `${this._filtersDialogWidth}vw`;
    this._dialogRef = this.dialog.open(SearchFiltersDialog, dialogConfig);
    this._dialogSub = this._dialogRef.afterClosed()
                          .pipe(catchError(err => throwError(err) as Observable<boolean>))
                          .subscribe((search: boolean) => {
                            if (search) {
                              this._fts.updateAdditionalFilters();
                            }
                          });
  }

  /**
   * Asks the FilterService to remove a FilterItem from the selected filter lists
   * @param filterItem The filter item to remove
   * @param listType The list/lists to remove the filter from
   */
  removeFilter(filterItem: FilterItem, listType: FilterListType[]|FilterListType): void {
    this._fts.removeFilter(filterItem, listType);
  }

  /**
   * Asks the FilterService to initialize the filters and load them from the route
   * queryParams
   */
  private _initFilters() {
    this._fts.initializeFilters(this.basicFilters)
        .pipe(
            catchError(err => throwError(err) as Observable<FormGroup[]>),
            )
        .subscribe(formGroups => {
          this.basicFilters = [...this.basicFilters, ...formGroups];
          this.additionalBasicFilters = formGroups;
          this.additionalBasicFiltersLabels =
              this.additionalBasicFilters.map(group => Object.keys(group.controls)[0]);
          this._cdr.detectChanges();
        })
        .unsubscribe();
  }

  ngOnDestroy() {
    this._dialogSub.unsubscribe();
  }
}
