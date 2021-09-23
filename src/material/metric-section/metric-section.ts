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

import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DataModelManager, Metric} from '@dewco/core/data';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dewco/core/list';
import {ListDataSource} from '@dewco/material/list';
import {MetricEditor} from '@dewco/material/metric-editor';

/**
 * Dino Metric Section component.
 * Allows the management of a generic Metric by displaying a Metrics
 * list and a Metrics Editor dialog.
 */
@Component({
  selector: 'dewco-metric-section',
  templateUrl: './metric-section.html',
  styleUrls: ['metric-section.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MetricSection<T extends Metric = Metric> implements OnInit {
  /**
   * If true, the Metrics List is displayed
   */
  @Input() readonly showList: boolean = true;

  /**
   * If true, the Metrics Editor is available
   */
  @Input() readonly showEditor: boolean = true;

  /**
   * The Metrics List headers
   */
  @Input() readonly headers: ListHeader<T>[];

  /**
   * The Metrics List available row actions
   */
  @Input() readonly listRowActions: ListAction[];

  /**
   * The Metrics List actions to be performed on a row click
   */
  @Input() readonly onClickRowActions: ActionType[];

  /**
   * The Label of the Metric
   */
  metricLabel: string = '';

  /**
   * The Metrics List data sourcev
   */
  dataSource: ListDataSource<T>;

  /**
   * The Metric manager
   */
  private _metricManager: DataModelManager<T>;
  @Input()
  set metricManager(mm: DataModelManager<T>) {
    if (mm == null) {
      return;
    }
    this.metricLabel = mm.collectionName.toUpperCase();
    this._metricManager = mm;
  }

  constructor(
      private _filtersService: FiltersService,
      public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.dataSource = new ListDataSource(
        this._metricManager,
        this._filtersService,
    );
  }

  openDialog(metric?: T, action?: 'view'|'edit'|'create'): void {
    this.dialog.open(MetricEditor, {
      data: {
        metricManager: this._metricManager,
        metricItem: metric,
        metricAction: action,
      },
    });
  }
}
