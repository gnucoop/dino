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
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DataModelManager, DataQueryOptions, Metric} from '@dino/core/data';
import {FormDataManager} from '@dino/core/forms';
import {ReportDataManager} from '@dino/core/reports';
import {TranslocoService} from '@ngneat/transloco';
import {RxDocument} from 'rxdb';
import {
  catchError,
  combineLatest,
  forkJoin,
  map,
  Observable,
  Subscription,
  take,
  throwError,
} from 'rxjs';

/**
 * This Dialog is opened to ask the user a confirmation
 * of a delete metric/metrics action, after check if there are no related forms or metric's children
 */
export interface MetricDeleteDialogData<T extends Metric = Metric> {
  /**
   * The manager passed to the dialog.
   */
  metricManager: DataModelManager<T>;

  /**
   * The selected Metric item/items.
   */
  metricItems?: T | T[];

  /**
   * The dialog custom text
   */
  customContent?: string;
}

/**
 * Dino Metric Editor component.
 * Allows the Admin to add and edit entries for any optional metric.
 * The generic type refers to the model of the Metric to be edited.
 */
@Component({
  selector: 'dino-metric-delete',
  templateUrl: 'metric-delete.html',
  styleUrls: ['metric-delete.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MetricDelete<T extends Metric = Metric> implements OnInit, OnDestroy {
  /**
   * The data model manager used to retrieve and edit the items of
   * the relative Metric.
   */
  private _metricManager?: DataModelManager<T>;

  /**
   * Subscribes to the confirm event.
   */
  private _querySub: Subscription = Subscription.EMPTY;

  /**
   * If true delete is enabled
   */
  enableDelete: boolean;

  constructor(
    readonly snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<MetricDelete>,
    @Inject(MAT_DIALOG_DATA) public data: MetricDeleteDialogData<T>,
    private _formDataManager: FormDataManager,
    private _reportDataManager: ReportDataManager,
    private _ts: TranslocoService,
    private _cdr: ChangeDetectorRef,
  ) {
    this.enableDelete = false;
    if (data != null && data.metricManager != null) {
      this._metricManager = data.metricManager;
    }
  }

  /**
   * Closes the dialog returning the user response to the action confirmation request
   * @param response The user response
   */
  confirmationResponse(response: boolean) {
    this.dialogRef.close(response);
  }

  ngOnInit(): void {
    this.enableDelete = false;
    if (this._metricManager == null || this.data.metricItems == null) {
      this.snackbar.open('Oops! Something went wrong checking the Metric', 'ERROR', {
        duration: 5000,
      });
      throw new Error('No metric manager or metrics item was provided');
    }
    let itemsToDelete: T | T[] = this.data.metricItems;
    if (!Array.isArray(itemsToDelete)) {
      itemsToDelete = [itemsToDelete];
    }

    const metricIds: string[] = itemsToDelete.map(itemToDelete => itemToDelete.id);
    const refKey = this._metricManager.collectionName + '_ref_id';
    const query: DataQueryOptions = {
      selector: {
        is_deleted: {$ne: true},
      },
    };
    query.selector[refKey] = {
      $in: metricIds,
    };
    const findForms = this._formDataManager.query(query).pipe(
      take(1),
      map(results => {
        return results.length ?? 0;
      }),
      catchError(err => throwError(() => err) as Observable<RxDocument<T, {}>[]>),
    );

    const findReports = this._reportDataManager.query(query).pipe(
      take(1),
      catchError(err => throwError(() => err) as Observable<RxDocument<T, {}>[]>),
    );

    const descendants: {[key: string]: Observable<string[]>} = {};
    metricIds.forEach(metricId => {
      if (this._metricManager != null) {
        descendants[metricId] = this._metricManager
          .findDescendants([metricId])
          .pipe(map(ds => ds.map(d => d.id)));
      }
    });

    this._querySub = combineLatest([findForms, findReports, forkJoin(descendants)])
      .pipe(take(1))
      .subscribe(([formsCount, reports, allDescendants]) => {
        if (typeof formsCount === 'number' && formsCount > 0) {
          this.enableDelete = false;
          this.data.customContent =
            this._ts.translate('Some forms use this metrics.') +
            ' ' +
            this._ts.translate('You cannot delete them.');
        } else {
          let countMetricWithDescendants = 0;
          if (allDescendants) {
            Object.keys(allDescendants).forEach(metricId => {
              if (allDescendants[metricId] && allDescendants[metricId].length) {
                countMetricWithDescendants++;
              }
            });
          }
          if (countMetricWithDescendants > 0) {
            this.enableDelete = false;
            this.data.customContent =
              this._ts.translate('Some metrics have children.') +
              ' ' +
              this._ts.translate('You cannot delete them.');
          } else {
            this.enableDelete = true;
            if (reports.length > 0) {
              this.data.customContent =
                this._ts.translate('Some reports use this metrics.') +
                ' ' +
                this._ts.translate('Do you still want to delete the selected items?');
            }
          }
        }
        this._cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this._querySub.unsubscribe();
  }
}
