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
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  DataModelManager,
  DataQueryOptions,
  DataQuerySelector,
  getValueFromRow,
  Metric,
} from '@dino/core/data';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {UserGroupManager} from '@dino/core/users';
import {TranslocoService} from '@ngneat/transloco';
import {RxDocument, RxJsonSchema} from 'rxdb';
import {
  catchError,
  combineLatest,
  Observable,
  of as obsOf,
  Subscription,
  switchMap,
  take,
  zip,
} from 'rxjs';

import * as XLSX from 'xlsx';

/**
 * This Dialog is opened to ask the user a confirmation
 * of a delete metric/metrics action, after check if there are no related forms or metric's children
 */
export interface MetricImportDialogData<T extends Metric = Metric> {
  /**
   * The manager passed to the dialog.
   */
  metricManager: DataModelManager<T>;

  /**
   * The Metric name.
   */
  metricName: string;

  /**
   * The dialog custom text
   */
  customContent?: string;
}

/**
 * All metric details found in rows
 */
interface MetricInfoInRows {
  /**
   * Metrics to be created
   */
  newMetrics: {[key: string]: any}[];

  /**
   * Metrics with parent to be created
   */
  newMetricsWithParent: {[key: string]: any}[];

  /**
   * Invalid metrics in rows
   */
  invalidMetrics: {[key: string]: any}[];

  /**
   * Parent Metric ids found in rows, which must exist.
   */
  requiredMetricParentIds: string[];

  /**
   * Parent Metric names found in rows, which must exist.
   */
  requiredMetricParentNames: string[];
}

/**
 * Dino Metric Import component.
 * Allows the Admin to import entries for metric.
 * The generic type refers to the model of the Metric to be imported.
 */
@Component({
  selector: 'dino-metric-import',
  templateUrl: 'metric-import.html',
  styleUrls: ['metric-import.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MetricImport<T extends Metric = Metric> implements OnInit, OnDestroy {
  /**
   * The data model manager used to import the items of
   * the relative Metric.
   */
  private _metricManager?: DataModelManager<T>;

  /**
   * The metric name to be imported (location, case, project...)
   */
  metricName = '';

  /**
   * Current status message of the Import Form
   */
  importStatus = '';

  /**
   * Selected file name for import
   */
  fileName = '';

  /**
   * The Import dialog form group
   */
  readonly importMetrics: UntypedFormGroup;

  /**
   * The selected file
   */
  private _file?: Blob;

  /**
   * True if the form is currently being processed.
   * Defaults to true.
   */
  private _processing: boolean = true;
  get processing(): boolean {
    return this._processing;
  }

  /**
   * If true, metric name must be unique
   */
  private _metricMustBeUnique: boolean = false;

  /**
   * Subscribes to the validate xlsx data function
   */
  private _validateDataSub: Subscription = Subscription.EMPTY;

  /**
   * Dino importable common metric fields
   */
  private _dinoFields: string[] = ['created_at', 'name', 'parent_id', 'parent_name'];

  /**
   * Not mandatory common fields for import. Id and updated_at are not importable.
   */
  private _notMandatoryFields: string[] = ['id', 'created_at', 'updated_at'];

  /**
   * The roles granting Admin permissions
   */
  private adminRoles = ['admin'];

  constructor(
    private _formBuilder: UntypedFormBuilder,
    readonly snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<MetricImport>,
    @Inject(MAT_DIALOG_DATA) public data: MetricImportDialogData<T>,
    private _ehms: ErrorHandlerMessageService,
    private _ugm: UserGroupManager,
    private _ts: TranslocoService,
    private _cdr: ChangeDetectorRef,
  ) {
    if (data != null && data.metricManager != null && data.metricName) {
      this._metricManager = data.metricManager;
      this.metricName = data.metricName;
    }
    this.importMetrics = this._formBuilder.group({
      reuseMetricName: [true],
    });
  }

  /**
   * Updates the status message of the Import Form
   * @param msg The message string
   */
  private _setImportStatus(msg: string): void {
    this.importStatus = msg;
    this._cdr.markForCheck();
  }

  /**
   * Save the input file
   * @param event The input file selection event
   */
  onExcelfileSelected(event: any): void {
    if (event.target.files.length === 0 || !event.target.files[0].name) {
      return;
    }
    this._file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    this._processing = false;
  }

  /**
   * Start processing the Xlsx file
   */
  apply(): void {
    if (this._file == null) {
      return;
    }
    this._processing = true;
    this._metricMustBeUnique = this.importMetrics.controls['reuseMetricName'].value;
    this._importXlsx(this._file);
  }

  /**
   * Closes the Import form data dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Return requested metrics by ids or names
   * @param metricIds
   * @param metricNames
   * @returns the existing list of metrics by ids or names
   */
  private _getMetricsIfExist(metricIds: string[], metricNames: string[]): Observable<T[]> {
    let metricsObs: Observable<T[]> = obsOf([]);
    if (this._metricManager) {
      const conditions: DataQuerySelector[] = [];

      const metricSelector: DataQueryOptions = {
        selector: {},
      };
      if (metricIds.length) {
        conditions.push({id: {$in: [...new Set([...metricIds])]}});
      }
      if (metricNames.length) {
        conditions.push({name: {$in: [...new Set([...metricNames])]}});
      }
      if (conditions.length) {
        if (conditions.length > 1) {
          metricSelector.selector = {$or: [...conditions]};
        } else {
          metricSelector.selector = conditions[0];
        }
      }
      metricSelector.selector['is_deleted'] = {$ne: true};
      metricsObs = this._metricManager.query(metricSelector).pipe(
        take(1),
        catchError(_ => obsOf([])),
      );
    }
    return metricsObs;
  }

  /**
   * Get required metric properties from collectionSchema
   * @param schema
   * @returns
   */
  private _getRequiredMetricProps(collectionSchema: RxJsonSchema<T>): string[] {
    const requiredProps: string[] = [];
    const props: {[key: string]: any} = collectionSchema.properties;
    for (let propK in props) {
      const propKey = propK as Extract<keyof T, string>;
      const propValue = collectionSchema.properties[propKey];
      const propRequired =
        collectionSchema.required!.indexOf(propKey) >= 0 &&
        !(propValue.type?.length && propValue.type.indexOf('null') > 0);
      if (propRequired && !this._notMandatoryFields.includes(propK)) {
        requiredProps.push(propK);
      }
    }
    return requiredProps;
  }

  /**
   * Get from rows all new metrics to be created and all ids and names for required parent metrics
   * @param rows The new metrics rows
   * @returns An object with all new metric info
   */
  private _getMetricsToBeCreated(rows: {[key: string]: any}[]): MetricInfoInRows {
    const metricsInfo: MetricInfoInRows = {
      newMetrics: [],
      newMetricsWithParent: [],
      invalidMetrics: [],
      requiredMetricParentIds: [],
      requiredMetricParentNames: [],
    };

    if (this._metricManager) {
      const newMetricNames: string[] = [];
      const requiredProps = this._getRequiredMetricProps(this._metricManager.collectionSchema);
      const props: {[key: string]: any} = this._metricManager.collectionSchema.properties;

      delete props['id'];
      delete props[`${this.metricName}_id`];

      delete props['updated_at'];
      delete props[`${this.metricName}_updated_at`];

      if (this.metricName === 'case') {
        delete props['case_code'];
      }
      if (this.metricName === 'project') {
        delete props['project_code_auto'];
      }

      rows.forEach((row: {[key: string]: any}) => {
        let invalid = false;
        if (!this._isLabelHeader(row)) {
          const newMetricName = row[`${this.metricName}_name`] || null;
          if (newMetricName) {
            let newMetric: {[key: string]: any} = {};

            if (this._metricMustBeUnique && newMetricNames.includes(newMetricName)) {
              invalid = true;
              newMetric['name'] = `${newMetricName} (${this._ts.translate(
                'duplicated in the file',
              )})`;
            } else {
              newMetricNames.push(newMetricName);

              const missingFields = [];
              for (let prop in props) {
                const propKey = `${this.metricName}_${prop}`;
                if (requiredProps.includes(prop) || row[propKey]) {
                  if (prop === 'metric_data') {
                    try {
                      newMetric[prop] = JSON.parse(row[propKey]);
                    } catch (_e) {
                      invalid = true;
                      missingFields.push(prop);
                    }
                  } else {
                    newMetric[prop] = getValueFromRow(row[propKey], propKey, props[prop].type);
                    if (requiredProps.includes(prop) && !newMetric[prop]) {
                      invalid = true;
                      missingFields.push(prop);
                    }
                  }
                }
              }

              if (invalid) {
                newMetric['name'] = `${newMetricName} (${this._ts.translate(
                  'missing or invalid fields',
                )}: ${missingFields.join(', ')})`;
              } else {
                const parentId = row[`${this.metricName}_parent_id`];
                const parentName = row[`${this.metricName}_parent_name`];
                if (parentId || parentName) {
                  if (parentId) {
                    // Required Metric parent id
                    if (!metricsInfo.requiredMetricParentIds.includes(parentId)) {
                      metricsInfo.requiredMetricParentIds.push(parentId);
                    }
                  }
                  if (parentName) {
                    // Required Metric parent name
                    if (!metricsInfo.requiredMetricParentNames.includes(parentName)) {
                      metricsInfo.requiredMetricParentNames.push(parentName);
                    }
                  }
                  metricsInfo.newMetricsWithParent.push(newMetric);
                } else {
                  metricsInfo.newMetrics.push(newMetric);
                }
              }
            }
            if (invalid) {
              metricsInfo.invalidMetrics.push(newMetric);
            }
          }
        }
      });
    }
    return metricsInfo;
  }

  /**
   * Separate valid and invalid metrics
   * @param newMetrics
   * @param invalidMetrics
   */
  private _moveOutInvalidMetrics(newMetrics: T[], duplicatesMetrics: T[], existingMetrics: T[]) {
    const existingNames = new Set(existingMetrics.map(m => m.name));
    for (let i = newMetrics.length - 1; i >= 0; i--) {
      if (existingNames.has(newMetrics[i].name)) {
        duplicatesMetrics.push(newMetrics[i]); // Modify duplicatesMetrics in place
        newMetrics.splice(i, 1); // Remove invalid metric in place
      }
    }
  }

  /**
   * Fill in missing parent values in new metrics to be created. Return the invalid metrics.
   * @param newMetricsToFill
   * @param existingMetrics
   * @returns the invalid metrics.
   */
  private _fillInMissingParentValues(newMetricsToFill: T[], existingMetrics: T[]): T[] {
    const invalidParentMetrics: T[] = [];

    for (let idx = 0; idx < newMetricsToFill.length; idx++) {
      if (newMetricsToFill[idx].parent_id && !newMetricsToFill[idx].parent_name) {
        // Found the parent name
        const parentMetric = existingMetrics.find(
          doc => doc.id === newMetricsToFill[idx].parent_id,
        );
        if (parentMetric && parentMetric.name) {
          newMetricsToFill[idx].parent_name = parentMetric.name;
        } else {
          invalidParentMetrics.push(newMetricsToFill[idx]);
          newMetricsToFill.splice(idx, 1);
          idx--;
        }
      }

      if (newMetricsToFill[idx].parent_name && !newMetricsToFill[idx].parent_id) {
        // Found the parent id
        const parentMetric = existingMetrics.find(
          doc => doc.name === newMetricsToFill[idx].parent_name,
        );
        if (parentMetric && parentMetric.id) {
          newMetricsToFill[idx].parent_id = parentMetric.id;
        } else {
          invalidParentMetrics.push(newMetricsToFill[idx]);
          newMetricsToFill.splice(idx, 1);
          idx--;
        }
      }
    }
    return invalidParentMetrics;
  }

  /**
   * Import all new metrics
   * @param newMetrics The list of the new metrics to be created
   * @returns
   */
  private _importMetrics(
    newMetrics: T[],
  ): Observable<{success: RxDocument<T>[]; error: any[]} | null> {
    if (this._metricManager != null && newMetrics && newMetrics.length) {
      return this._metricManager.bulkCreate(newMetrics).pipe(
        catchError(err => {
          this._ehms.captureErrorMessage(
            `Could not import new metrics: ${JSON.stringify(err)}`,
            'error',
          );
          return obsOf(null);
        }),
        take(1),
      );
    }
    return obsOf({success: [], error: []});
  }

  /**
   * Import all the rows into Dino
   * @param rows The rows to be imported
   * @param newMetrics the list of the new metrics required to be created
   */
  private _importMetricRows(
    newMetrics: T[],
    newMetricsWithParent: T[],
    existingMetrics: T[],
  ): Observable<({success: RxDocument<T>[]; error: any[]} | null)[]> {
    let firstBulkNoParent: Observable<{
      success: RxDocument<T>[];
      error: any[];
    } | null> = obsOf({success: [], error: []});

    let invalidParentMetrics: T[] = [];

    if (newMetrics && newMetrics.length) {
      firstBulkNoParent = this._importMetrics(newMetrics);
    }
    return firstBulkNoParent.pipe(
      switchMap(firstBulkRes => {
        if (firstBulkRes && firstBulkRes.error.length === 0) {
          let bulkWithParent: Observable<{
            success: RxDocument<T>[];
            error: any[];
          } | null> = obsOf({success: [], error: []});

          if (newMetricsWithParent && newMetricsWithParent.length) {
            if (existingMetrics.length || firstBulkRes.success.length) {
              existingMetrics = existingMetrics.concat(firstBulkRes.success);
              invalidParentMetrics = this._fillInMissingParentValues(
                newMetricsWithParent,
                existingMetrics,
              );
            }
            bulkWithParent = this._importMetrics(newMetricsWithParent);
          }

          return zip(obsOf(firstBulkRes), bulkWithParent);
        } else {
          let errMsg = this._ts.translate('File not imported! ');
          if (firstBulkRes?.error.length) {
            console.log('Import metrics error: ' + firstBulkRes.error[0].msg);
            if (
              firstBulkRes?.error[0].msg?.parameters?.errors &&
              firstBulkRes?.error[0].msg?.parameters?.errors.length
            ) {
              errMsg = errMsg + JSON.stringify(firstBulkRes?.error[0].msg?.parameters?.errors[0]);
            }
          }
          this._setImportStatus(errMsg);
          return obsOf([null, null]);
        }
      }),
      switchMap(([firstBulkRes, bulkRes]) => {
        if (!firstBulkRes && !bulkRes) {
          return obsOf([firstBulkRes, bulkRes]);
        }
        if (
          bulkRes &&
          bulkRes.error.length === 0 &&
          firstBulkRes &&
          firstBulkRes.error.length === 0
        ) {
          let resMsg = '';
          const totalImported = bulkRes.success.length + firstBulkRes.success.length;
          if (totalImported) {
            resMsg = this._getFormattedMessage(
              firstBulkRes.success.concat(bulkRes.success),
              this._ts.translate('Imported metrics'),
            );
          } else {
            resMsg =
              this._ts.translate(
                'File not imported: no valid metrics to import found in the file.',
              ) + '\n';
          }
          if (invalidParentMetrics) {
            resMsg =
              resMsg +
              this._getFormattedMessage(
                invalidParentMetrics,
                this._ts.translate('Metrics with invalid parent'),
              );
          }

          this._setImportStatus(resMsg);

          return obsOf([firstBulkRes, bulkRes]);
        } else {
          let errMsg = '';
          if (firstBulkRes?.success.length) {
            errMsg = `${this._ts.translate('File partially imported')}:
              ${firstBulkRes?.success.length}
              ${this._ts.translate('\nOnly metrics without parents were created.')}`;
          } else {
            errMsg = this._ts.translate('File not imported! Errors in metrics with parents.');
          }

          if (bulkRes?.error.length) {
            console.log('Errors in metrics with parents: ' + bulkRes.error[0].msg);
            if (
              bulkRes?.error[0].msg?.parameters?.errors &&
              bulkRes?.error[0].msg?.parameters?.errors.length
            ) {
              errMsg = errMsg + '\n' + JSON.stringify(bulkRes?.error[0].msg?.parameters?.errors[0]);
            }
          }
          this._setImportStatus(errMsg);
          return obsOf([firstBulkRes, bulkRes]);
        }
      }),
    );
  }

  /**
   * Check if the first row is the label header with no data
   * @param data
   * @returns true if is a label header
   */
  private _isLabelHeader(row: {[key: string]: any}): boolean {
    const rowVals = Object.values(row);
    return this._dinoFields.some(f => rowVals.indexOf(`${this.metricName}_${f}`) > -1);
  }

  /**
   * Return a formatted message for a list of metrics
   * @param metrics the metric list
   * @param message the custom message
   * @returns the formatted message string
   */
  private _getFormattedMessage(metrics: T[], message: string): string {
    let notImportedMetricsMessage = '';
    const maxIdsInResponse = 15;
    let metricsNames = metrics.map(m => '\n' + m.name);
    if (metricsNames.length) {
      if (metricsNames.length > maxIdsInResponse) {
        metricsNames = metricsNames.slice(0, maxIdsInResponse);
        metricsNames.push('\nand more...');
      }
      notImportedMetricsMessage = `\n${message} (${metrics.length}):${metricsNames}\n`;
    }
    return notImportedMetricsMessage;
  }

  /**
   * Convert the xls file into a json and start import all the rows
   * No update, all data will be imported as new
   * @param file The Xlsx file to be imported
   */
  private _importXlsx(file: Blob): void {
    const startMessage = this._ts.translate('Importing file...');
    this._setImportStatus(startMessage);
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e: any) => {
      const bufferArray = e?.target.result;
      const wb = XLSX.read(bufferArray, {type: 'buffer'});
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data: {[key: string]: any}[] = XLSX.utils.sheet_to_json(ws);

      if (this._metricManager && this.metricName) {
        const {
          newMetrics,
          newMetricsWithParent,
          invalidMetrics,
          requiredMetricParentIds,
          requiredMetricParentNames,
        } = this._getMetricsToBeCreated(data);

        const duplicatedMetrics: T[] = [];

        const metricNamesToQuery = [...requiredMetricParentNames];
        if (this._metricMustBeUnique) {
          metricNamesToQuery.push(...newMetrics.map((m: {[key: string]: any}) => m['name']));
          metricNamesToQuery.push(
            ...newMetricsWithParent.map((m: {[key: string]: any}) => m['name']),
          );
        }

        this._validateDataSub = combineLatest([
          this._getMetricsIfExist(requiredMetricParentIds, metricNamesToQuery),
          this._ugm.isActiveUserAdmin(this.adminRoles),
        ])
          .pipe(
            switchMap(([existingMetrics, isAdminUser]) => {
              if (isAdminUser) {
                if (this._metricMustBeUnique && existingMetrics && existingMetrics.length) {
                  this._moveOutInvalidMetrics(
                    newMetrics as T[],
                    duplicatedMetrics,
                    existingMetrics,
                  );
                  this._moveOutInvalidMetrics(
                    newMetricsWithParent as T[],
                    duplicatedMetrics,
                    existingMetrics,
                  );
                }
                // Create new metrics
                if (newMetrics.length || newMetricsWithParent.length) {
                  return this._importMetricRows(
                    newMetrics as T[],
                    newMetricsWithParent as T[],
                    existingMetrics,
                  );
                }
                this._setImportStatus(
                  this._ts.translate(
                    'File not imported: no valid metrics to import found in the file.',
                  ) + '\n',
                );
              } else {
                this._setImportStatus(
                  this._ts.translate(
                    'File not imported: only users with the admin role can import metrics.',
                  ) + '\n',
                );
              }
              return obsOf(null);
            }),
          )
          .subscribe(_ => {
            let notImportedMetricsMessage = this._getFormattedMessage(
              invalidMetrics as T[],
              this._ts.translate('Invalid metrics'),
            );
            notImportedMetricsMessage =
              notImportedMetricsMessage +
              this._getFormattedMessage(
                duplicatedMetrics,
                this._ts.translate('Already existing metrics'),
              );

            if (
              !this.importStatus ||
              !this.importStatus.length ||
              this.importStatus === startMessage
            ) {
              this._setImportStatus(this._ts.translate('File not imported!'));
            }

            if (notImportedMetricsMessage) {
              this._setImportStatus(this.importStatus + notImportedMetricsMessage);
            }
          });
      }
    };
  }

  ngOnInit(): void {
    if (this._metricManager == null || !this.data.metricName) {
      this.snackbar.open(this._ts.translate('Oops! Something went wrong checking'), 'ERROR', {
        duration: 5000,
      });
      throw new Error(this._ts.translate('No metric manager or metric name was provided'));
    }
  }

  ngOnDestroy(): void {
    this._validateDataSub.unsubscribe();
  }
}
