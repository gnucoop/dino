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
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DataModelManager, Metric} from '@dino/core/data';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {ListDataSource} from '@dino/material/list';
import {MetricEditor} from '@dino/material/metric-editor';

/**
 * Dino Metric Section component.
 * Allows the management of a generic Metric by displaying a Metrics
 * list and a Metrics Editor dialog.
 */
@Component({
  selector: 'dino-metric-section',
  templateUrl: './metric-section.html',
  styleUrls: ['metric-section.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MetricSection<T extends Metric = Metric> implements OnInit, AfterViewInit {
  /**
   * If true, the Metrics List is displayed
   */
  @Input() showList: boolean = true;

  /**
   * If true, the Metrics Editor is available
   */
  @Input() showEditor: boolean = true;

  /**
   * List of the names of fields that cannot be edited by the user
   */
  @Input() readOnlyFields: string[] | null = null;

  /**
   * The Metrics List headers
   */
  @Input() headers: ListHeader<T>[] = [];

  /**
   * The Metrics List available row actions
   */
  @Input() listRowActions: ListAction[] = [];

  /**
   * The Metrics List actions to be performed on a row click
   */
  @Input() onClickRowActions: ActionType[] = [];

  /**
   * The Label of the Metric
   */
  metricLabel: string = '';

  /**
   * The Metrics List data sourcev
   */
  dataSource?: ListDataSource<T>;

  /**
   * The Metric manager
   */
  private _metricManager?: DataModelManager<T>;
  @Input()
  set metricManager(mm: DataModelManager<T>) {
    if (mm == null) {
      return;
    }
    this.metricLabel = mm.collectionName.toUpperCase();
    this._metricManager = mm;
  }

  constructor(private _filtersService: FiltersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    if (this._metricManager == null) {
      return;
    }
    this.dataSource = new ListDataSource(this._metricManager, this._filtersService);
  }

  ngAfterViewInit(): void {
    if (this.dataSource == null) {
      return;
    }
    this.dataSource.dataHeaders = this.headers;
  }
  openDialog(metric?: T, action?: 'View' | 'Edit' | 'Create'): void {
    this.dialog.open(MetricEditor, {
      data: {
        metricManager: this._metricManager,
        metricItem: metric,
        metricAction: action,
        readOnlyFields: this.readOnlyFields,
      },
    });
  }
}
