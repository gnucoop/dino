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
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Params} from '@angular/router';
import {FormMetricSelector} from './form-metric-selector';
import {combineLatest, forkJoin, Observable, of as obsOf} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormStatus,
  FormStatusManager,
} from '@dino/core/forms';
import {PermissionContextService} from '@dino/core/data';
import {Clipboard} from '@angular/cdk/clipboard';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

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
   * The list of all the Form Statuses available to the active User
   */
  readonly availableStatuses: Observable<FormStatus[] | null>;
  /**
   * Metrics of the types specified in the array can be created directly from the metric fields
   */
  allowMetricCreationFor: string[] = [];
  /**
   * The Form Metrics Selector
   */
  @ViewChild(FormMetricSelector)
  formMetricsSelectorComponent: FormMetricSelector | undefined;
  /**
   * The Form Metric Selector
   */
  private _formMetricsSelector: FormMetricSelector | undefined = undefined;

  /**
   * True if the selected metrics combination already exists in the database.
   */
  readonly uniqueMetricsSetAlreadyExists$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );

  readonly numMetrics$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private readonly _unsubscribe = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<FormMetricSelectorDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      routeParams: Params;
      formSchema: Observable<FormSchema | null>;
      formDatas: FormData[];
      statusEditable: boolean;
      hasOptionalMetrics: boolean;
      secondaryMetricFieldsDisplayed: {
        [metricName: string]: string | string[];
      } | null;
      context: 'form' | 'report' | 'bulkFormEdit' | 'shareUrl';
    },
    private _fstm: FormStatusManager,
    private _fdm: FormDataManager,
    private _pcs: PermissionContextService,
    private _clipboard: Clipboard,
    private _snackbar: MatSnackBar,
    private _ts: TranslocoService,
  ) {
    this.availableStatuses = combineLatest([
      data.formSchema,
      forkJoin(data.formDatas.map(data => this._fdm.hasAllowedFormStatus(data))),
    ]).pipe(
      switchMap(([fschema, statusChangesAllowed]) => {
        if (fschema == null || !data.statusEditable || statusChangesAllowed.includes(false)) {
          return obsOf([]);
        }

        const invalidElem = data.formDatas.some(
          data => !data.data || data.data['dinoinvalid'] === true || data.data['$invalid'] === true,
        );
        if (invalidElem) {
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

    if (this._formMetricsSelector) {
      this.data.formSchema
        .pipe(
          switchMap(fschema => {
            if (fschema == null || !fschema.schema.uniqueMetricsSet) {
              return obsOf(null);
            }
            return this._formMetricsSelector!.selectedMetricsChanges.pipe(
              map(fsmChanges => ({fschema, fsmChanges})),
              filter(({fsmChanges}) => {
                const values = Object.values(fsmChanges);
                const hasValidSelection = values.some(
                  v => v != null && typeof v === 'object' && v.option != null,
                );
                const hasTypingState = values.some(
                  v => typeof v === 'string' && (v as string).length > 0,
                );
                return hasValidSelection && !hasTypingState;
              }),
            );
          }),
          switchMap(res => {
            if (res == null) {
              this.uniqueMetricsSetAlreadyExists$.next(false);
              return obsOf(false);
            }
            const {fschema, fsmChanges} = res;
            const numMetrics = fschema.form_schema_metrics?.length || 0;
            this.numMetrics$.next(numMetrics);

            const querySelectorObj: {[key: string]: {$eq: any}} = {};
            for (let key in fsmChanges) {
              if (
                !fschema.form_schema_metrics?.length ||
                (fschema.form_schema_metrics && fschema.form_schema_metrics.includes(key))
              ) {
                if (fsmChanges[key].option?.id != null) {
                  querySelectorObj[`${key}_ref_id`] = {$eq: fsmChanges[key].option?.id};
                }
              }
            }

            if (Object.keys(querySelectorObj).length === 0) {
              this.uniqueMetricsSetAlreadyExists$.next(false);
              return obsOf(false);
            }

            // Project the target metrics for each selected record
            const targetSets = this.data.formDatas.map(formData =>
              this._getTargetMetrics(formData, fsmChanges, fschema),
            );

            // Check for internal duplicates within the selection
            if (this.data.formDatas.length > 1) {
              const seen = new Set<string>();
              const hasInternalDuplicate = targetSets.some(set => {
                const s = this._buildMetricsKey(set, fschema);
                if (seen.has(s)) return true;
                seen.add(s);
                return false;
              });

              if (hasInternalDuplicate) {
                this.uniqueMetricsSetAlreadyExists$.next(true);
                return obsOf(true);
              }
            }

            if (this.data.formDatas.length === 1 && numMetrics > 1) {
              // Only one formdata selected, query only for that one
              fschema.form_schema_metrics?.forEach(key => {
                if (!querySelectorObj[`${key}_ref_id`]) {
                  querySelectorObj[`${key}_ref_id`] = {
                    $eq: (this.data.formDatas[0] as any)[`${key}_ref_id`],
                  };
                }
              });
            }

            const selector = {
              form_schema_ref_id: {$eq: fschema.id},
              id: {$nin: this.data.formDatas.map(d => d.id)},
              ...querySelectorObj,
            };
            return this._fdm.query({selector}).pipe(
              map(docs => {
                const targetKeys = new Set(
                  targetSets.map(set => this._buildMetricsKey(set, fschema)),
                );

                const exists = docs.some(doc => {
                  const docKey = this._buildMetricsKey(doc, fschema);
                  return targetKeys.has(docKey);
                });

                this.uniqueMetricsSetAlreadyExists$.next(exists);
                return exists;
              }),
            );
          }),
          takeUntil(this._unsubscribe),
        )
        .subscribe();
    }
  }

  /**
   * Calculates the target metrics for a record after applying dialog changes
   * @param formData The original form data
   * @param fsmChanges The changes from the metric selector
   * @param fschema The form schema
   * @returns An object containing the final metrics (including _ref_id suffix)
   */
  private _getTargetMetrics(
    formData: FormData,
    fsmChanges: any,
    fschema: FormSchema,
  ): {[key: string]: string | null} {
    const target: {[key: string]: string | null} = {};
    fschema.form_schema_metrics?.forEach(key => {
      const changeId = fsmChanges[key]?.option?.id;
      target[`${key}_ref_id`] = changeId != null ? changeId : (formData as any)[`${key}_ref_id`];
    });
    return target;
  }

  /**
   * Builds a unique key for a set of metrics
   * @param doc The object containing the metrics
   * @param fschema The form schema
   * @returns A unique key for the set of metrics
   */
  private _buildMetricsKey(doc: Record<string, any>, fschema: FormSchema): string {
    return (fschema.form_schema_metrics ?? []).map(key => doc[`${key}_ref_id`] ?? 'null').join('|');
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

  /**
   * Generates a Public Form Url to be copied into the user's clipboard
   */
  shareUrl(): void {
    if (this._formMetricsSelector === undefined) {
      return;
    }
    let shareUrl: string = `${window.location.origin}/f/${this.data.routeParams['form_schema_id']}`;
    const metricKeys: string[] = Object.keys(this._formMetricsSelector.formMetrics.value);
    const metricValues: string[] = Object.values(this._formMetricsSelector.formMetrics.value);
    if (metricKeys.length && metricValues.some(v => v != null)) {
      shareUrl += '?';
    }
    const formMetricsSelectorValue: {[key: string]: string | null} = {};
    for (let key of metricKeys) {
      formMetricsSelectorValue[key] = this._formMetricsSelector.formMetrics.value[key].option
        ? this._formMetricsSelector.formMetrics.value[key].option.id
        : null;
    }
    for (let idx = 0; idx < metricKeys.length; idx++) {
      const key: string = metricKeys[idx];
      const value: string | null = formMetricsSelectorValue[key];
      if (value != null) {
        if (idx > 0 && shareUrl.slice(-1) !== '?') {
          shareUrl += `&`;
        }
        shareUrl += `${key}=${value}`;
      }
    }
    this._clipboard.copy(shareUrl);
    this._snackbar.open(
      this._ts.translate(`Public Form Url copied in your clipboard!`),
      this._ts.translate('URL COPIED'),
      {duration: 10000},
    );
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
