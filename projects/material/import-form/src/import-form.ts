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

import {AjfContainerNode, AjfField, AjfNode, AjfNodeType, isContainerNode} from '@ajf/core/forms';
import {deepCopy} from '@ajf/core/utils';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  isDevMode,
  OnDestroy,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {DataModelManager, InsertModel, Metric, MetricsService} from '@dino/core/data';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormSchemaManager,
  FormStatusManager,
} from '@dino/core/forms';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {UserData, UserDataManager} from '@dino/core/users';
import {format} from 'date-fns';
import {JsonSchemaTypes, RxDocument} from 'rxdb';
import {forkJoin, Observable, of as obsOf, Subscription, zip} from 'rxjs';
import {catchError, map, shareReplay, switchMap, take, withLatestFrom} from 'rxjs/operators';
import * as XLSX from 'xlsx';

/**
 * All metric details found in rows
 */
interface MetricInfoInRows {
  /**
   * Metrics to be created by name
   */
  newMetrics: {[key: string]: {[key: string]: any}[]};

  /**
   * Metric ids found in rows, which must exist.
   */
  requiredMetricIdsByType: {[key: string]: string[]};
}

/**
 * The Form Data import component.
 * Allows importing of Xls or Csv file with form data, which will be processed
 * and saved as Form Datas.
 */
@Component({
  selector: 'dino-import-form',
  styleUrls: ['import-form.scss'],
  templateUrl: 'import-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ImportForm implements OnDestroy {
  /**
   * Current status message of the Import Form
   */
  importStatus = '';

  /**
   * The Import dialog form group
   */
  readonly importForm: UntypedFormGroup;

  /**
   * The edited form schema id
   */
  private _formSchemaId: string | null;

  /**
   * The Form schema object
   */
  private _formSchema: Observable<FormSchema | null>;

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
   * Dino fields that should not be included in the data field
   */
  private _dinoFields: string[] = [
    'id',
    'created_at',
    'user_data_ref_id',
    'area_ref_id',
    'case_ref_id',
    'location_ref_id',
    'organization_ref_id',
    'project_ref_id',
    'form_status_ref_id',
  ];

  /**
   * Not importable fields
   */
  private _notImportableMetricFields: string[] = [
    'id',
    'created_at',
    'user_data_ref_id',
    'area_ref_id',
    'case_ref_id',
    'location_ref_id',
    'organization_ref_id',
    'project_ref_id',
    'form_status_ref_id',
  ];

  /**
   * The row id key
   */
  private _idKey = 'id';

  /**
   * If true, metric name must be unique
   */
  private _metricMustBeUnique: boolean = false;

  /**
   * All metric managers
   */
  private _metricManagers: {[key: string]: DataModelManager<any> | null} = {
    area: this._ar,
    case: this._cs,
    project: this._pj,
    location: this._lc,
    organization: this._og,
  };

  /**
   * Subscribes to the userData
   */
  private _userDataSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the validate xlsx data function
   */
  private _validateDataSub: Subscription = Subscription.EMPTY;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,
    private _formDataManager: FormDataManager,
    private _formSchemaManager: FormSchemaManager,
    private _udm: UserDataManager,
    private _fsm: FormStatusManager,
    private _ehms: ErrorHandlerMessageService,
    readonly metricsService: MetricsService,
    public dialogRef: MatDialogRef<ImportForm>,
    @Optional() private _ar: AreaManager | null,
    @Optional() private _cs: CaseManager | null,
    @Optional() private _pj: ProjectManager | null,
    @Optional() private _lc: LocationManager | null,
    @Optional() private _og: OrganizationManager | null,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this._formSchemaId = this.data.formSchema;

    if (this._formSchemaId) {
      this._formSchema = this._formSchemaManager.get(this._formSchemaId).pipe(
        map(doc => {
          if (doc == null) {
            return null;
          }
          const item = doc.toJSON();
          return item as FormSchema;
        }),
        shareReplay(1),
      );
    } else {
      this._formSchema = obsOf(null);
    }

    this.importForm = this._formBuilder.group({
      reuseMetricName: [false],
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
    if (event.target.files.length === 0) {
      return;
    }
    this._file = event.target.files[0];
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
    this._metricMustBeUnique = this.importForm.controls['reuseMetricName'].value;
    this._importXlsx(this._file);
  }

  /**
   * Closes the Import form data dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Check and return, if unique enabled (_metricMustBeUnique must be true),
   * the existing metrics, that have the same name of the new metrics
   * @param newMetrics the new metrics to be created
   * @returns the existing list of metrics by name
   */
  private _checkIfMetricsAlreadyExist(newMetrics: {
    [key: string]: {[key: string]: any}[];
  }): Observable<any[][]> {
    const metricsObs: Observable<any[]>[] = [];
    if (this._metricMustBeUnique) {
      Object.keys(newMetrics).forEach(metricType => {
        const manager = this._metricManagers[metricType];
        if (manager !== null) {
          if (newMetrics[metricType] && newMetrics[metricType].length) {
            const allMetricNames: string[] = newMetrics[metricType].map(m => m['name']);
            const selector = {
              selector: {name: {$in: allMetricNames}, is_deleted: {$ne: true}},
            };
            metricsObs.push(
              manager.query(selector).pipe(
                take(1),
                catchError(err => {
                  this._ehms.captureErrorMessage(
                    `Error while searching for already existing metrics with the same name: ${JSON.stringify(
                      err,
                    )}`,
                    'error',
                  );
                  return obsOf([]);
                }),
              ),
            );
          }
        }
      });
    }
    return metricsObs.length ? forkJoin(metricsObs) : obsOf([]);
  }

  /**
   * Return requested metrics by ids
   * @param metricIdsByType
   * @returns the existing list of metrics by ids
   */
  private _getMetricsIfExist(metricIdsByType: {[key: string]: string[]}): Observable<any[][]> {
    const metricsObs: Observable<any[]>[] = [];
    Object.keys(metricIdsByType).forEach(metricType => {
      const manager = this._metricManagers[metricType];
      if (manager !== null) {
        if (metricIdsByType[metricType] && metricIdsByType[metricType].length) {
          const selector = {
            selector: {id: {$in: metricIdsByType[metricType]}, is_deleted: {$ne: true}},
          };
          metricsObs.push(
            manager.query(selector).pipe(
              take(1),
              catchError(_ => obsOf([])),
            ),
          );
        }
      }
    });
    return metricsObs.length ? forkJoin(metricsObs) : obsOf([]);
  }

  /**
   * Get from rows all new metrics to be created and all ids for required metrics:
   * newMetrics: {
   *  project: [
   *   {name: 'Proj1', code: 'code01'},
   *   {name: 'Proj2', code: 'code02'},
   *  ],
   *  area: [
   *   {name: 'Area1'},
   *   {name: 'Area2'},
   *  ], ...
   * },
   * requiredMetricIdsByType: {
   *  project: [uuid1, uuid2],
   *  area: [uuid3, uuid4], ...
   * },
   * @param rows The new FormData rows
   * @param activeMetrics The list of the currently active metrics
   * @returns An object with all metric info to be created and to be check
   */
  private _getMetricsToBeCreated(
    rows: {[key: string]: any}[],
    activeMetrics: string[],
  ): MetricInfoInRows {
    const newMetrics: {[key: string]: {[key: string]: any}[]} = {};
    const requiredMetricIdsByType: {[key: string]: string[]} = {};
    if (activeMetrics.length) {
      activeMetrics.forEach(metric => {
        const manager = this._metricManagers[metric];
        if (manager !== null) {
          const newMetricNames: string[] = [];
          const metricIdKey = metric + '_id';
          const metricNameKey = metric + '_name';

          rows.forEach((row: {[key: string]: any}) => {
            // Check if is not a second header
            if (!this._isLabelHeader(row)) {
              const newMetricName = row[metricNameKey] ? (row[metricNameKey] as string) : null;
              if (
                newMetricName &&
                newMetricName.length &&
                !row[metricIdKey] &&
                !newMetricNames.includes(newMetricName)
              ) {
                newMetricNames.push(newMetricName);
                let newMetric: {[key: string]: any} = {};

                const requiredProps = manager.collectionSchema.required
                  ? manager.collectionSchema.required
                  : ['name'];

                const props = manager.collectionSchema.properties;
                if (metric === 'case') {
                  delete props['code'];
                  delete row['case_code'];
                }
                if (metric === 'project') {
                  delete props['code_auto'];
                  delete row['project_code_auto'];
                }
                for (let prop in props) {
                  const propKey = metric + '_' + (prop as string);
                  if (prop in requiredProps || row[propKey]) {
                    if (prop === 'metric_data') {
                      newMetric[prop as string] = JSON.parse(row[propKey]);
                    } else {
                      newMetric[prop as string] = this._getValueFromRow(
                        row[propKey],
                        props[prop].type,
                      );
                    }
                  }
                }

                if (!(metric in newMetrics)) {
                  newMetrics[metric] = [];
                }
                newMetrics[metric].push(newMetric);
              } else if (row[metricIdKey]) {
                if (!(metric in requiredMetricIdsByType)) {
                  requiredMetricIdsByType[metric] = [];
                }
                if (!requiredMetricIdsByType[metric].includes(row[metricIdKey])) {
                  requiredMetricIdsByType[metric].push(row[metricIdKey]);
                }
              }
            }
          });
        }
      });
    }
    return {newMetrics, requiredMetricIdsByType};
  }

  /**
   * Return the list of the required user ids for the new forms
   * @param rows
   * @returns The user_data_ref_id list (distinct values)
   */
  private _getRequiredUsers(rows: {[key: string]: any}[]): string[] {
    const requiredUserIds: string[] = [];
    const userIdKey = 'user_data_ref_id';
    rows.forEach((row: {[key: string]: any}) => {
      if (!this._isLabelHeader(row)) {
        if (row[userIdKey]) {
          if (!requiredUserIds.includes(row[userIdKey])) {
            requiredUserIds.push(row[userIdKey]);
          }
        }
      }
    });
    return requiredUserIds;
  }

  /**
   * Import all new metric
   * @param newMetrics The list of the new metrics to be created
   * @returns
   */
  private _importMetrics(newMetrics: {
    [key: string]: {[key: string]: any}[];
  }): Observable<{success: RxDocument<any>[]; error: any[]}[]> {
    const metricsObs: Observable<{success: RxDocument<any>[]; error: any[]}>[] = [];
    Object.keys(newMetrics).forEach(metricType => {
      const manager = this._metricManagers[metricType];
      if (manager !== null) {
        if (newMetrics[metricType] && newMetrics[metricType].length) {
          metricsObs.push(
            manager.bulkCreate(newMetrics[metricType]).pipe(
              catchError(err => {
                this._ehms.captureErrorMessage(
                  `Could not create new imported metrics: ${JSON.stringify(err)}`,
                  'error',
                );
                return obsOf({success: [], error: []});
              }),
            ),
          );
        }
      }
    });
    return metricsObs.length ? forkJoin(metricsObs) : obsOf([]);
  }

  /**
   * Return the input value casted to the correct type (string, list or Date)
   * @param rowValue the initial value found in xls file
   * @param type required type for this value
   * @returns
   */
  private _getValueFromRow(
    rowValue: any,
    requiredType?: JsonSchemaTypes | JsonSchemaTypes[] | undefined,
  ): any {
    let value = rowValue === undefined ? null : rowValue;
    if (value !== null) {
      if (typeof value === 'string') {
        value = value.trim();
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value
            .slice(1, -1)
            .split(',')
            .map((v: string) => v.trim());
        }
      } else if (typeof value === 'object') {
        try {
          value = format(new Date(value), 'yyyy-MM-dd');
        } catch (e) {}
      }

      if (requiredType) {
        switch (requiredType) {
          case 'string':
            value = value.toString();
            break;
          case 'number':
            value = !isNaN(value) ? +value : value;
        }
      }
    }
    return value;
  }

  /**
   * Insert all the rows into Dino
   * @param rows The rows to be imported
   * @param activeMetrics The list of the currently active metrics
   */
  private _importFormData(
    rows: {[key: string]: any}[],
    activeMetrics: string[],
    userDataId: string | null,
    metricsIdByName: {[key: string]: {[key: string]: any}} | null,
    statusDictionary: {[key: string]: string | null} | null,
  ): void {
    const forms: InsertModel<FormData>[] = [];
    const createdAtKey = 'created_at';
    const userDataKey = 'user_data_ref_id';

    rows.forEach((row: {[key: string]: any}) => {
      // Check if is not a second header
      if (!this._isLabelHeader(row)) {
        let newItem: {[key: string]: any} = {};
        newItem['form_schema_ref_id'] = this._formSchemaId;
        if (row[createdAtKey] && row[createdAtKey].length && row[createdAtKey] !== createdAtKey) {
          try {
            const rowDate = format(new Date(row[createdAtKey]), 'yyyy-MM-dd');
            newItem[createdAtKey] = rowDate;
          } catch (e) {}
        }

        newItem[userDataKey] = userDataId;
        if (row[userDataKey] && row[userDataKey].length) {
          newItem[userDataKey] = row[userDataKey];
        }
        newItem['form_status_ref_id'] = statusDictionary
          ? statusDictionary[row['form_status_name']]
          : null;
        newItem['data'] = Object.keys(row)
          .filter(field => !this._dinoFields.includes(field))
          .reduce((obj, key) => {
            const value = this._getValueFromRow(row[key]);
            if (value !== null) {
              return {...obj, [key]: value};
            } else {
              return {...obj};
            }
          }, {});

        Object.keys(this._metricManagers).forEach(metric => {
          if (activeMetrics.length && activeMetrics.includes(metric)) {
            newItem[metric + '_ref_id'] = row[metric + '_id'] ? row[metric + '_id'] : null;
            const metricName = row[metric + '_name'] ? (row[metric + '_name'] as string) : null;
            if (
              newItem[metric + '_ref_id'] === null &&
              metricName !== null &&
              metricName.length > 0 &&
              metricsIdByName &&
              metricsIdByName[metric] &&
              metricsIdByName[metric][metricName] !== undefined
            ) {
              newItem[metric + '_ref_id'] = metricsIdByName[metric][metricName];
            }
          } else {
            newItem[metric + '_ref_id'] = null;
          }
        });
        forms.push(newItem as InsertModel<FormData>);
      }
    });

    this._formDataManager
      .bulkCreate(forms)
      .pipe(
        catchError(err => {
          this._ehms.captureErrorMessage(
            `Could not bulkCreate new imported form data: ${JSON.stringify(err)}`,
            'error',
          );
          return obsOf(null);
        }),
        take(1),
      )
      .subscribe(bulkRes => {
        if (bulkRes && bulkRes.success.length) {
          this._setImportStatus(
            'File imported successfully: ' + bulkRes.success.length + ' forms created!',
          );
          setTimeout(() => this.closeDialog(), 3000);
        } else {
          let errMsg = 'File not imported! ';
          if (bulkRes?.error.length) {
            console.log('Import form error: ' + bulkRes.error[0].msg);
            if (
              bulkRes?.error[0].msg?.parameters?.errors &&
              bulkRes?.error[0].msg?.parameters?.errors.length
            ) {
              errMsg = errMsg + JSON.stringify(bulkRes?.error[0].msg?.parameters?.errors[0]);
            }
          }
          this._setImportStatus(errMsg);
        }
      });
  }

  /**
   * Add into metricsIdByName object the metric name and id
   * @param metric the metric document
   * @param metricsIdByName object with metrics id by metric name and metric
   * type
   */
  private _addMetricDetails(
    metric: RxDocument<Metric>,
    metricsIdByName: {[key: string]: {[key: string]: string}},
  ): void {
    const metricCollection = metric.collection.name;
    if (!(metricCollection in metricsIdByName)) {
      metricsIdByName[metricCollection] = {};
    }
    metricsIdByName[metricCollection][metric.name] = metric.id as string;
  }

  /**
   * Add existing metrics id/name to the new metricts object list
   * @param metricsIdByName object with metrics id by metric name and metric
   * type
   * @param existingMetrics list of already existing metrics
   */
  private _addExistingMetricsIntoList(
    metricsIdByName: {[key: string]: {[key: string]: string}},
    existingMetrics: any[][],
  ): void {
    if (existingMetrics.length > 0) {
      existingMetrics.forEach((queryRes: any[]) => {
        queryRes.forEach(metric => {
          this._addMetricDetails(metric, metricsIdByName);
        });
      });
    }
  }

  private _getStatusDictionary(
    statuses:
      | {
          [key: string]: Observable<string | null>;
        }
      | undefined,
  ): Observable<{[key: string]: string | null} | null> {
    if (!statuses || !Object.keys(statuses) || !Object.keys(statuses).length) {
      return obsOf(null);
    }
    const statusKeys: string[] = Object.keys(statuses);
    const statusIds = forkJoin(statusKeys.map(key => statuses[key]));
    return statusIds.pipe(
      map(ids => {
        const dictionary: {[key: string]: string | null} = {};
        for (let idx = 0; idx < ids.length; idx++) {
          dictionary[statusKeys[idx]] = ids[idx];
        }
        return dictionary;
      }),
    );
  }

  /**
   * Import all the rows and all new metrics into Dino
   * @param rows The rows to be imported
   * @param newMetrics the list of the new metrics required to be created
   * @param statuses
   */
  private _importFormDataRows(
    rows: {[key: string]: any}[],
    newMetrics: {
      [key: string]: {
        [key: string]: any;
      }[];
    },
    statuses?: {[key: string]: Observable<string | null>},
  ): void {
    const activeMetrics = this.metricsService.activeMetrics.value.map(metric => metric.metricName);
    if (Object.keys(newMetrics).length) {
      this._userDataSub = forkJoin([
        this._checkIfMetricsAlreadyExist(newMetrics).pipe(
          switchMap(existingMetrics => {
            const newMetricsRequested: {[key: string]: {[key: string]: any}[]} =
              deepCopy(newMetrics);
            if (existingMetrics.length > 0) {
              existingMetrics.forEach((queryRes: any[]) => {
                if (queryRes.length) {
                  const metricCollection = queryRes[0].collection.name;
                  const metricNames = queryRes.map(metric => metric.name);
                  newMetricsRequested[metricCollection] = newMetrics[metricCollection].filter(
                    m => !metricNames.includes(m['name']),
                  );
                }
              });
            }
            return obsOf({newMetricsRequested, existingMetrics});
          }),
          switchMap(r => {
            return zip(
              this._importMetrics(r.newMetricsRequested),
              obsOf(r.newMetricsRequested),
              obsOf(r.existingMetrics),
            );
          }),
          catchError(err => {
            this._ehms.captureErrorMessage(
              `Could not import form data rows: ${JSON.stringify(err)}`,
              'error',
            );
            return obsOf([], [], []);
          }),
          withLatestFrom(this._udm.getActiveUserData()),
        ),
        this._getStatusDictionary(statuses),
      ]).subscribe(([[r, ud], stDict]) => {
        const createdMetrics = r[0];
        const requiredNewMetrics = r[1];
        const existingMetrics = r[2];
        const userDataId = ud ? ud.id : null;
        let metricsError: string[] = [];
        let metricsIdByName: {[key: string]: {[key: string]: string}} = {};
        if (createdMetrics) {
          createdMetrics.forEach(metrics => {
            if (metrics && metrics.success.length) {
              if (
                metrics.success.length ===
                requiredNewMetrics[metrics.success[0].collection.name].length
              ) {
                metrics.success.forEach(metric => {
                  this._addMetricDetails(metric, metricsIdByName);
                });
              } else {
                metricsError.push(metrics.success[0].collection.name);
              }
            } else {
              if (metrics && metrics.error.length && metrics.error[0].msg) {
                if (isDevMode()) {
                  console.log('Import metric error: ' + metrics.error[0].msg?.parameters);
                }
                if (
                  metrics.error[0].msg?.parameters?.errors &&
                  metrics.error[0].msg?.parameters?.errors.length
                ) {
                  metricsError.push(JSON.stringify(metrics.error[0].msg?.parameters?.errors[0]));
                }
              } else {
                metricsError.push('-');
              }
            }
          });

          if (metricsError.length === 0) {
            this._addExistingMetricsIntoList(metricsIdByName, existingMetrics);
            this._importFormData(rows, activeMetrics, userDataId, metricsIdByName, stDict);
          } else {
            this._setImportStatus(
              'File not imported! Error during create new metrics: ' + metricsError,
            );
          }
        }
      });
    } else {
      this._userDataSub = forkJoin([
        this._udm.getActiveUserData(),
        this._getStatusDictionary(statuses),
      ]).subscribe(([ud, stDict]) => {
        const userDataId = ud ? ud.id : null;
        this._importFormData(rows, activeMetrics, userDataId, null, stDict);
      });
    }
  }

  /**
   * Get flatten nodes for an ajf formschema
   * @param nodes
   * @returns an ajfNode list for the schema
   */
  private _flattenNodes(nodes: AjfNode[], isRepSlide: boolean = false): AjfNode[] {
    let flatNodes: AjfNode[] = [];
    nodes.forEach((node: AjfNode) => {
      if (isContainerNode(node)) {
        const isRepSlide = node.nodeType === AjfNodeType.AjfRepeatingSlide;
        flatNodes = flatNodes.concat(
          this._flattenNodes((<AjfContainerNode>node).nodes, isRepSlide),
        );
      }
      if (isRepSlide) {
        flatNodes.push({...node, name: node.name + '__[0-9]+'});
      } else {
        flatNodes.push(node);
      }
    });

    return flatNodes;
  }

  /**
   * Get all fields name for an ajf formschema
   * @param fschema
   * @returns All field names
   */
  private _getFieldsNameFromFormSchema(fschema: FormSchema): string[] {
    const nodes = fschema.schema.nodes;
    let schemaFields: string[] = [];
    if (nodes) {
      const flatNodes = this._flattenNodes(nodes);
      const fields = <AjfField[]>flatNodes.filter(n => !isContainerNode(n));
      schemaFields = fields
        .filter(f => f.name != null)
        .map(f => f.name)
        .filter(f => f.length > 0);
    }
    return schemaFields;
  }

  /**
   * Check if the first row is the label header with no data
   * @param data
   * @returns true if is a label header
   */
  private _isLabelHeader(row: {[key: string]: any}): boolean {
    const rowVals = Object.values(row);
    return this._containsAtLeastOne(rowVals, this._dinoFields);
  }

  /**
   * Check if the row keys contain at least one field
   * @param rowKeys row keys
   * @param fields fields to be check
   * @returns true if exist
   */
  private _containsAtLeastOne(rowKeys: string[], fields: string[]): boolean {
    return fields.some(f => {
      if (f.indexOf('__') > -1) {
        const fieldNameRegex = new RegExp(`^${f}$`, 'g');
        return rowKeys.some(k => fieldNameRegex.test(k));
      } else {
        return rowKeys.indexOf(f) > -1;
      }
    });
  }

  /**
   * Check if imported xls file is valid for dino and for the selected form schema
   * @param data json data contained into the xlsx file
   * @param formSchema ajf form schema
   * @returns true if xls colomns contains at least one field from the schema
   */
  private _isValidXlsxData(data: {[key: string]: any}[], formSchema: FormSchema | null): boolean {
    if (formSchema && data && data.length) {
      const rowKeys = Object.keys(data[0]);
      if (this._containsAtLeastOne(rowKeys, this._dinoFields)) {
        const schemaFields = this._getFieldsNameFromFormSchema(formSchema);
        return this._containsAtLeastOne(rowKeys, schemaFields);
      }
    }
    return false;
  }

  /**
   * Check if requested ids in rows exist in the db
   * @param requiredUserIds the list of the requested user ids
   * @param existingUsers the list of the existing user ids
   * @param requiredMetricIdsByType the list of the requested metric ids
   * @param existingMetricsByType the list of the existing metric ids
   * @returns true if not all ids exist
   */
  private _checkIfMissingIds(
    requiredUserIds: string[],
    existingUsers: RxDocument<UserData>[],
    requiredMetricIdsByType: {
      [key: string]: string[];
    },
    existingMetricsByType: any[][],
  ): boolean {
    let idsNotMatch = false;
    let idsNotMatchMessage = '';
    const maxIdsInResponse = 10;

    if (requiredUserIds.length) {
      if (existingUsers == null || existingUsers.length != requiredUserIds.length) {
        idsNotMatch = true;
        const existingUserIds = existingUsers.map(u => u.id);
        let missingUserIds = requiredUserIds
          .filter(id => !existingUserIds.includes(id))
          .map(i => '\n' + i);
        console.log('File not imported! These user ids not exist:' + missingUserIds);
        if (missingUserIds.length > maxIdsInResponse) {
          missingUserIds = missingUserIds.slice(0, maxIdsInResponse);
          missingUserIds.push('\nand more...');
        }
        idsNotMatchMessage = '\nCheck that these user ids exist:' + missingUserIds;
      }
    }

    if (Object.keys(requiredMetricIdsByType).length) {
      Object.keys(requiredMetricIdsByType).forEach(reqMetricType => {
        if (requiredMetricIdsByType[reqMetricType].length) {
          const existingMetrics = existingMetricsByType
            ? existingMetricsByType.find(metricsByType => {
                if (metricsByType.length) {
                  return metricsByType[0].collection.name === reqMetricType;
                }
                return false;
              })
            : [];
          if (
            existingMetrics == undefined ||
            existingMetrics.length != requiredMetricIdsByType[reqMetricType].length
          ) {
            idsNotMatch = true;
            const existingMetricIds = existingMetrics ? existingMetrics.map(u => u.id) : [];
            let missingMetricIds = requiredMetricIdsByType[reqMetricType]
              .filter(id => !existingMetricIds.includes(id))
              .map(i => '\n' + i);
            console.log(
              'File not imported! These ' + reqMetricType + ' ids not exist:' + missingMetricIds,
            );
            if (missingMetricIds.length > maxIdsInResponse) {
              missingMetricIds = missingMetricIds.slice(0, maxIdsInResponse);
              missingMetricIds.push('\nand more...');
            }
            idsNotMatchMessage =
              idsNotMatchMessage +
              '\nCheck that these ' +
              reqMetricType +
              ' ids exist:' +
              missingMetricIds;
          }
        }
      });
    }

    if (idsNotMatch) {
      this._setImportStatus('File not imported! ' + idsNotMatchMessage);
    }
    return idsNotMatch;
  }

  /**
   * Convert the xls file into a json and start import all the rows
   * No update for form data, all form data will be imported as new
   * @param file The Xlsx file to be imported
   */
  private _importXlsx(file: Blob): void {
    this._setImportStatus('Importing file...');
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e: any) => {
      const bufferArray = e?.target.result;
      const wb = XLSX.read(bufferArray, {type: 'buffer'});
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data: {[key: string]: any}[] = XLSX.utils.sheet_to_json(ws);

      const requiredUserIds = this._getRequiredUsers(data);
      const activeMetrics = this.metricsService.activeMetrics.value.map(
        metric => metric.metricName,
      );
      const {newMetrics, requiredMetricIdsByType} = this._getMetricsToBeCreated(
        data,
        activeMetrics,
      );

      const queryRequiredUsers: Observable<RxDocument<UserData>[]> = requiredUserIds.length
        ? this._udm
            .query({
              selector: {id: {$in: requiredUserIds}, is_deleted: {$ne: true}},
            })
            .pipe(
              take(1),
              catchError(_ => obsOf([])),
            )
        : obsOf([]);

      this._validateDataSub = this._formSchema
        .pipe(
          map(formSchema => this._isValidXlsxData(data, formSchema)),
          switchMap(isValidXlsData => {
            if (isValidXlsData) {
              return zip([queryRequiredUsers, this._getMetricsIfExist(requiredMetricIdsByType)]);
            }
            return obsOf(null);
          }),
        )
        .subscribe(res => {
          if (res && res.length > 1) {
            const existingUsers = res[0];
            const existingMetricsByType = res[1];
            const idsNotMatch = this._checkIfMissingIds(
              requiredUserIds,
              existingUsers,
              requiredMetricIdsByType,
              existingMetricsByType,
            );

            if (!idsNotMatch) {
              if (this._fsm) {
                const statusDictionary: {[key: string]: Observable<string | null>} = {};
                data.forEach(row => {
                  if (row['form_status_name'] && !statusDictionary[row['form_status_name']]) {
                    statusDictionary[row['form_status_name']] = this._fsm
                      .query({
                        selector: {name: {$eq: row['form_status_name']}, is_deleted: {$ne: true}},
                      })
                      .pipe(
                        map(docs => (docs[0] ? docs[0].id : null)),
                        take(1),
                      );
                  }
                });
                this._importFormDataRows(data, newMetrics, statusDictionary);
              } else {
                this._importFormDataRows(data, newMetrics);
              }
            }
          } else {
            this._setImportStatus(
              'File not imported! Check if columns match fields of the formschema.',
            );
          }
        });
    };
  }

  ngOnDestroy() {
    this._userDataSub.unsubscribe();
    this._validateDataSub.unsubscribe();
  }
}
