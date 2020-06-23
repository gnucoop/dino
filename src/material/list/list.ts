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

import {SelectionModel} from '@angular/cdk/collections';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DataModelManager, Model} from '@dewco/core/data';
import {ListComponent} from '@dewco/core/list';
import * as RxDb from 'rxdb';
import {BehaviorSubject, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {ListCellDirective} from './list-cell';
import {AdminUserInteractionsService} from './user-interactions';

/**
 * The base Material List component.
 * Provides a template, selection and bulk/individual action functionalities for all list/tables of
 * Models in Material.
 */
@Component({
  selector: 'dewco-mat-list',
  styleUrls: ['list.css'],
  templateUrl: 'list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SelectionList<T extends Model = Model,
                                     DM extends DataModelManager<T> = DataModelManager<T>> extends
    ListComponent<T, DM> implements AfterContentInit, OnInit, OnDestroy {
  private _serviceData: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private _dataSub: Subscription = Subscription.EMPTY;
  private _dataSource: MatTableDataSource<T>;
  get dataSource(): MatTableDataSource<T> {
    return this._dataSource;
  }

  readonly selection = new SelectionModel<T>(true, []);
  selectionSub: Subscription;

  private _cellTemplatesMap: {[column: string]: TemplateRef<any>} = {};
  get cellTemplatesMap(): {[column: string]: TemplateRef<any>} {
    return this._cellTemplatesMap;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sorting: MatSort;

  @ContentChildren(ListCellDirective) cellTemplates: QueryList<ListCellDirective>;

  constructor(cdr: ChangeDetectorRef, aui: AdminUserInteractionsService) {
    super(cdr, aui);
  }

  ngAfterContentInit(): void {
    this._cellTemplatesMap = this.cellTemplates.reduce((prev, cur) => {
      prev[cur.column] = cur.templateRef;
      return prev;
    }, {} as {[column: string]: TemplateRef<any>});
  }

  ngOnInit() {
    this._dataSource = new MatTableDataSource<T>();
    this._fillDataSource();
    this._dataSub = this._serviceData.subscribe(items => {
      this._dataSource.data = items;
    });
    this.refreshList();
  }

  /**
   * Gets the currently selected items
   * @return T[]
   */
  getSelection(): T[] {
    return this.selection ? this.selection.selected : [];
  }

  /**
   * Gets all the items in the dataSource
   * @return T[]
   */
  getItems(): T[] {
    return this.dataSource ? this.dataSource.data : [];
  }

  /**
   * Removes all items from the current selection
   * @return void
   */
  clearSelection(): void {
    if (this.selection == null) {
      return;
    }
    this.selection.clear();
  }

  /**
   * Selects all the items
   * @return voi
   */
  selectAll(): void {
    if (this.dataSource == null) {
      return;
    }
    this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   * Refreshes the items list and updates the dataSource data
   * @return void
   */
  refreshList(): void {
    this._service.list()
        .pipe(
            switchMap(listQuery => {
              return listQuery.exec();
            }),
            )
        .subscribe((items) => {
          this._serviceData.next(this._rxDocsToJson(items));
        });
    this._cdr.detectChanges();
  }

  /**
   * Applies simple filtering from a text input to the dataSource items list
   * @param event Event
   * @return void
   */
  applyFilter(event: Event) {
    if (this.dataSource == null) {
      return;
    }
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * Checks if all the items in the list are currently selected
   * @return boolean
   */
  isAllSelected(): boolean {
    if (this.dataSource == null) {
      return false;
    }
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * If not all items are currently selected, it selects all of them.
   * If all items are currently selected, it removes all of them from the selection.
   * @return void
   */
  masterToggle() {
    if (this.dataSource == null) {
      return;
    }
    this.isAllSelected() ? this.selection.clear() : this.selectAll();
  }

  /**
   * Checks the current selection state of the row and changes its aria-label accordingly
   * @param row T
   * @return string
   */
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /**
   * Adds pagination and sorting to the dataSource
   * @return void
   */
  private _fillDataSource(): void {
    if (this.dataSource == null) {
      return;
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sorting;
  }

  /**
   * Converts an array of RxDocuments into an array of T objects
   * @param docs RxDocument[]
   * @retun T[]
   */
  private _rxDocsToJson(docs: RxDb.RxDocument<T>[]): T[] {
    let docsJson: T[] = [];
    docs.forEach(doc => {
      docsJson.push(doc.toJSON());
    });
    return docsJson;
  }

  ngOnDestroy() {
    this.selectionSub.unsubscribe();
    this._dataSub.unsubscribe();
  }
}
