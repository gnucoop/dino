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
  Inject,
  Input,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Params} from '@angular/router';
import {FormMetricSelector} from './form-metric-selector';
import {combineLatest, forkJoin, Observable, of as obsOf} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormStatus,
  FormStatusManager,
} from '@dino/core/forms';
import {PermissionContextService} from '@dino/core/data';

/**
 * This component allows the selection and association of Metrics to the created or edited Form.
 */
@Component({
  selector: 'dino-form-metric-selector-dialog',
  styleUrls: ['form-metric-selector-dialog.scss'],
  templateUrl: 'form-metric-selector-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormMetricSelectorDialog implements AfterViewInit, OnDestroy {
  /**
   * True if the Form can have one or more null Metrics.
   * Defaults to false.
   */
  @Input()
  hasOptionalMetrics: boolean = true;
  /**
   * The list of all the Form Statuses available to the active User
   */
  readonly availableStatuses: Observable<FormStatus[] | null>;
  /**
   * Metrics of the types specified in the array can be created directly from the metric fields
   */
  @Input() allowMetricCreationFor: string[] = [];
  /**
   * The Form Metrics Selector
   */
  @ViewChild(FormMetricSelector)
  formMetricsSelectorComponent: FormMetricSelector | undefined;
  /**
   * The Form Metric Selector
   */
  private _formMetricsSelector: FormMetricSelector | undefined = undefined;

  constructor(
    public dialogRef: MatDialogRef<FormMetricSelectorDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      routeParams: Params;
      formSchema: Observable<FormSchema | null>;
      formDatas: FormData[];
      statusEditable: boolean;
      secondaryMetricFieldsDisplayed: {
        [metricName: string]: string;
      } | null;
    },
    private _fstm: FormStatusManager,
    private _fdm: FormDataManager,
    private _pcs: PermissionContextService,
  ) {
    this.availableStatuses = combineLatest([
      data.formSchema,
      forkJoin(data.formDatas.map(data => this._fdm.hasAllowedFormStatus(data))),
    ]).pipe(
      switchMap(([fschema, statusChangesAllowed]) => {
        if (fschema == null || !data.statusEditable || statusChangesAllowed.includes(false)) {
          return obsOf([]);
        }
        return combineLatest([
          this._fstm.formStatusesOfSchema(fschema),
          this._pcs.permissionContext,
        ]).pipe(
          map(([statuses, context]) => {
            if (statuses == null || context == null) {
              return [];
            }
            const stts = [...(context.user_form_statuses ?? [])];
            return statuses.filter(status => stts.includes(status.id) || stts.includes('all'));
          }),
        );
      }),
    );
  }

  ngAfterViewInit(): void {
    this._formMetricsSelector = this.formMetricsSelectorComponent;
  }

  /**
   * Closes the dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this._formMetricsSelector === undefined) {
      return;
    }
    const metricKeys: string[] = Object.keys(this._formMetricsSelector.formMetrics.value);
    const formMetricsSelectorValue: {[key: string]: string | null} = {
      created_at: this._formMetricsSelector.formDate.value['created_at'],
      form_status_ref_id: this._formMetricsSelector.formStatus.value['form_status_ref_id'],
    };
    for (let key of metricKeys) {
      formMetricsSelectorValue[`${key}_ref_id`] = this._formMetricsSelector.formMetrics.value[key]
        .option
        ? this._formMetricsSelector.formMetrics.value[key].option.id
        : null;
    }
    this.dialogRef.close(formMetricsSelectorValue);
  }

  ngOnDestroy(): void {
    return;
  }
}
