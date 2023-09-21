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

import {AjfContainerNode, AjfField, AjfNode, isContainerNode} from '@ajf/core/forms';
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
import {UserDataManager} from '@dino/core/users';
import {format} from 'date-fns';
import {RxDocument} from 'rxdb';
import {forkJoin, Observable, of as obsOf, Subscription, zip} from 'rxjs';
import {catchError, map, shareReplay, switchMap, take, withLatestFrom} from 'rxjs/operators';
import * as XLSX from 'xlsx';

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
   * @returns the list of metrics
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
                catchError(_ => obsOf([])),
              ),
            );
          }
        }
      });
    }
    return metricsObs.length ? forkJoin(metricsObs) : obsOf([]);
  }

  /**
   * Get from rows all new metrics to be created:
   * {
   *  project: [
   *   {name: 'Proj1', code: 'code01'},
   *   {name: 'Proj2', code: 'code02'},
   *  ],
   *  area: [
   *   {name: 'Area1'},
   *   {name: 'Area2'},
   *  ], ...
   * }
   * @param rows The new FormData rows
   * @param activeMetrics The list of the currently active metrics
   * @returns An object with all metrics to be created, otherwise empty object
   */
  private _getMetricsToBeCreated(
    rows: {[key: string]: any}[],
    activeMetrics: string[],
  ): {[key: string]: {[key: string]: any}[]} {
    const newMetrics: {[key: string]: {[key: string]: any}[]} = {};
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
                for (let prop in props) {
                  const propKey = metric + '_' + (prop as string);
                  if (prop in requiredProps || row[propKey]) {
                    if (prop === 'metric_data') {
                      newMetric[prop as string] = JSON.parse(row[propKey]);
                    } else {
                      newMetric[prop as string] = this._getValueFromRow(row[propKey]);
                    }
                  }
                }

                if (!(metric in newMetrics)) {
                  newMetrics[metric] = [];
                }
                newMetrics[metric].push(newMetric);
              }
            }
          });
        }
      });
    }
    return newMetrics;
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
            manager
              .bulkCreate(newMetrics[metricType])
              .pipe(catchError(_ => obsOf({success: [], error: []}))),
          );
        }
      }
    });
    return metricsObs.length ? forkJoin(metricsObs) : obsOf([]);
  }

  /**
   * Return the input value casted to the correct type (string, list or Date)
   * @param rowValue the initial value found in xls file
   * @returns
   */
  private _getValueFromRow(rowValue: any): any {
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
        catchError(_ => obsOf(null)),
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
   */
  private _importFormDataRows(
    rows: {[key: string]: any}[],
    statuses?: {[key: string]: Observable<string | null>},
  ): void {
    const activeMetrics = this.metricsService.activeMetrics.value.map(metric => metric.metricName);
    const newMetricsInRows = this._getMetricsToBeCreated(rows, activeMetrics);
    if (Object.keys(newMetricsInRows).length) {
      this._userDataSub = forkJoin([
        this._checkIfMetricsAlreadyExist(newMetricsInRows).pipe(
          switchMap(existingMetrics => {
            const newMetrics: {[key: string]: {[key: string]: any}[]} = deepCopy(newMetricsInRows);
            if (existingMetrics.length > 0) {
              existingMetrics.forEach((queryRes: any[]) => {
                if (queryRes.length) {
                  const metricCollection = queryRes[0].collection.name;
                  const metricNames = queryRes.map(metric => metric.name);
                  newMetrics[metricCollection] = newMetricsInRows[metricCollection].filter(
                    m => !metricNames.includes(m['name']),
                  );
                }
              });
            }
            return obsOf({newMetrics, existingMetrics});
          }),
          switchMap(r => {
            return zip(
              this._importMetrics(r.newMetrics),
              obsOf(r.newMetrics),
              obsOf(r.existingMetrics),
            );
          }),
          catchError(() => {
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
  private _flattenNodes(nodes: AjfNode[]): AjfNode[] {
    let flatNodes: AjfNode[] = [];
    nodes.forEach((node: AjfNode) => {
      if (isContainerNode(node)) {
        flatNodes = flatNodes.concat(this._flattenNodes((<AjfContainerNode>node).nodes));
      }
      flatNodes.push(node);
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
    return fields.some(f => rowKeys.indexOf(f) > -1);
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
   * Convert the xls file into a json and start import all the rows
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

      this._validateDataSub = this._formSchema
        .pipe(map(formSchema => this._isValidXlsxData(data, formSchema)))
        .subscribe(isValidXlsData => {
          if (isValidXlsData) {
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
              this._importFormDataRows(data, statusDictionary);
            } else {
              this._importFormDataRows(data);
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
