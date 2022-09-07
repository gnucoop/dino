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
import {AjfReportInstance, createReportInstance, openReportPdf} from '@ajf/core/reports';
import {TranslocoService} from '@ajf/core/transloco';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  isDevMode,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataQuerySelector, Metric, MetricsService} from '@dino/core/data';
import {FormData, FormDataManager, FormSchemaManager, FormStatus} from '@dino/core/forms';
import {ReportData, ReportDataManager, ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {UserData} from '@dino/core/users';
import {FormMetricSelector} from '@dino/material/form-metric-selector';
import {RxDocument} from 'rxdb';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  Observable,
  of as obsOf,
  Subject,
  throwError,
  zip,
} from 'rxjs';
import {delay, filter, map, retryWhen, shareReplay, switchMap, take, tap} from 'rxjs/operators';

export type PrintLayout = 'landscape' | 'portrait';

/**
 * Represents the context data of the forms necessary
 * for creating a Report Instance.
 */
export interface ReportContext {
  [form_schema_id: string]: {[key: string]: any}[];
}

/**
 * The Report Edit component.
 * Reports' data can be viewed or saved here.
 */
@Component({
  selector: 'dino-edit-report',
  styleUrls: ['edit-report.scss'],
  templateUrl: 'edit-report.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditReport implements AfterViewInit {
  /**
   * If true, the report view stepper and its two
   * steps (Metric Selector and Ajf Report) are displayed.
   * Otherwise only the Ajf Report is displayed.
   */
  @Input() steps: boolean = true;

  /**
   * The Custom loading spinner image path
   */
  @Input() spinnerImagePath: string | undefined;

  /**
   * If true, Metrics can be created directly from the metric fields
   */
  @Input() allowMetricCreation: boolean = true;

  /**
   * Sets the report id with an input
   */
  @Input() set setReportId(id: string | null) {
    if (id != null) {
      this._inputReportId.next(id);
    }
  }

  /**
   * The Report Metrics Selector
   */
  @ViewChildren(FormMetricSelector) reportMetricsSelectorComponent!: QueryList<FormMetricSelector>;

  /**
   * The Report data id
   */
  reportId: Observable<string>;

  /**
   * The Report instance used for rendering the Report
   */
  reportInstance: Observable<AjfReportInstance | null> = obsOf(null);
  private _currentReportInstance: AjfReportInstance | null = null;

  /**
   * True if no validation errors are encountered in the Report Metrics selector form
   */
  isReportMetricsSelectorValid: Observable<boolean> = obsOf(false);

  /**
   * The Metrics selected in the Report Metrics Selector
   */
  reportMetrics: Observable<string | null> | undefined;

  /**
   * True if the Report can have one or more null Metrics.
   * Defaults to false.
   */
  @Input()
  hasOptionalMetrics: boolean = false;

  /**
   * Emits when a report id is passed via input
   */
  private _inputReportId: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  /**
   * The Report schema id
   */
  private _reportSchemaId: Observable<string | null> = obsOf(null);

  /**
   * The Report data object
   */
  private _reportData: Observable<RxDocument<ReportData> | null> = obsOf(null);
  get reportData(): Observable<RxDocument<ReportData> | null> {
    return this._reportData;
  }

  /**
   * The Report schema object
   */
  private _reportSchema: Observable<ReportSchema> = obsOf();
  get reportSchema(): Observable<ReportSchema> {
    return this._reportSchema;
  }

  /**
   * The Form Datas that are the source of data for the Report creation.
   */
  private _sourceFormData: Observable<RxDocument<FormData>[]>;

  get sourceFormData(): Observable<RxDocument<FormData>[]> {
    return this._sourceFormData;
  }

  /**
   * The current Report Data object
   */
  private _currentReport: Subject<ReportData> = new Subject<ReportData>();

  /**
   * The Form Metric Selector
   */
  private _reportMetricsSelector: Observable<FormMetricSelector | null> = obsOf(null);

  /**
   * True if the Report is in readonly mode.
   * When a Report id is passed by the input, the report is automatically
   * displayed in readonly mode.
   */
  readonly isView: Observable<boolean>;

  constructor(
    readonly metricsService: MetricsService,
    private _translateService: TranslocoService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formDataManager: FormDataManager,
    private _formSchemaManager: FormSchemaManager,
    private _reportDataManager: ReportDataManager,
    private _reportSchemaManager: ReportSchemaManager,
  ) {
    this.isView = combineLatest([this._route.data, this._inputReportId]).pipe(
      map(([data, inputId]) => {
        if (inputId) {
          return true;
        }
        if (data != null && data['isView'] != null) {
          return data['isView'];
        }
        return false;
      }),
    );

    this.reportId = combineLatest([this._route.params, this._inputReportId]).pipe(
      map(([params, inputId]) => (inputId ? inputId : params['report_id'])),
      tap(id => {
        if (id == null) {
          this._router.navigateByUrl('/');
        }
      }),
      filter(id => id != null),
    );

    this._reportData = this.reportId.pipe(
      switchMap(id => {
        return this._reportDataManager.get(id).pipe(
          switchMap(repData => {
            if (repData == null) {
              return throwError(() => new Error('Invalid Report Data collection'));
            }
            this._currentReport.next(repData);
            return obsOf(repData);
          }),
          retryWhen(err => err.pipe(delay(1000), take(10))),
        );
      }),
      shareReplay(1),
    );

    this._reportSchemaId = this._reportData.pipe(
      map(reportDataObj => (reportDataObj != null ? reportDataObj.report_schema_ref_id : null)),
      filter(id => id != null),
      shareReplay(1),
    );

    this._reportSchema = this._reportSchemaId.pipe(
      map(schemaId => {
        if (schemaId == null) {
          return null;
        }
        return this._reportSchemaManager.get(schemaId).pipe(
          switchMap(doc => {
            if (doc == null) {
              return throwError(() => new Error('Invalid Report Schema collection'));
            }
            const item = doc.toJSON();
            return obsOf(item);
          }),
          retryWhen(err => err.pipe(delay(1000), take(10))),
        );
      }),
      switchMap(schema => schema as Observable<ReportSchema>),
      shareReplay(1),
    );

    this._sourceFormData = combineLatest([
      this._reportSchema,
      this._reportData,
      this.metricsService.activeMetrics,
    ]).pipe(
      switchMap(([rSchema, rData, activeMetrics]) => {
        if (
          rSchema.form_schema_ids == null ||
          rSchema.form_schema_ids.length <= 0 ||
          rData == null
        ) {
          return obsOf([]);
        }
        const querySelector: DataQuerySelector = {
          form_schema_ref_id: {$in: rSchema.form_schema_ids},
        };
        if (rData.date_start != null) {
          querySelector['created_at'] = {$gte: rData.date_start};
        }
        if (rData.date_end != null) {
          const createdAt = querySelector['created_at'] || {};
          querySelector['created_at'] = {...createdAt, $lte: rData.date_end};
        }
        if (activeMetrics != null && activeMetrics.length > 0) {
          for (let metric of activeMetrics) {
            const metricKey = `${metric.metricName}_ref_id`;
            const rDataObject = rData as {[key: string]: any};
            if (rDataObject[metricKey] != null) {
              querySelector[metricKey] = {$eq: rDataObject[metricKey]};
            }
          }
        }
        querySelector['is_deleted'] = {$eq: false};
        return this._formDataManager.query({selector: querySelector});
      }),
    );

    this.reportInstance = combineLatest([
      this._reportData,
      this._reportSchema,
      this._sourceFormData,
    ]).pipe(
      filter(([rData, rSchema]) => rData != null && rSchema != null),
      switchMap(([rData, rSchema, sfData]) => {
        const formSchemaIds = rSchema.form_schema_ids;
        let populatedData: Observable<{[key: string]: any}>[] = [];
        for (let formSchemaId of formSchemaIds) {
          if (sfData != null) {
            const data = sfData
              .filter(fdata => fdata.form_schema_ref_id === formSchemaId)
              .map(fd => this._populateData(fd));
            populatedData.push(...data);
          }
        }
        const ctxSchemas = this._formSchemaManager.query({selector: {id: {$in: formSchemaIds}}});
        return zip(
          populatedData.length ? forkJoin(populatedData) : obsOf([]),
          ctxSchemas,
          obsOf(rData),
          obsOf(rSchema),
        );
      }),
      map(([ctx, ctxSchemas, rData, rSchema]) => {
        const contextForms: ReportContext = {};
        const contextSchemas: {[schema_ref_id: string]: any} = {};
        ctx.forEach(fdata => {
          if (contextForms[fdata['form_schema_ref_id']] == null) {
            contextForms[fdata['form_schema_ref_id']] = [];
          }
          contextForms[fdata['form_schema_ref_id']].push(fdata);
        });
        ctxSchemas.forEach(fschema => {
          if (fschema != null) {
            contextSchemas[fschema.id] = fschema.schema;
          }
        });
        const context = {forms: contextForms, schemas: contextSchemas, report_data: rData};
        if (isDevMode()) {
          console.log(context);
        }
        this._currentReportInstance = createReportInstance(
          rSchema.schema,
          context,
          this._translateService,
        );
        return this._currentReportInstance;
      }),
    );
  }

  /**
   * Prints the current report Instance to pdf
   * @param orientation
   */
  printReport(orientation: 'portrait' | 'landscape') {
    if (this._currentReportInstance != null) {
      openReportPdf(this._currentReportInstance, orientation);
    }
  }

  /**
   * Returns a plain data object of a Form Data populated with metrics
   * @param formData The form data to be populated
   * @returns An observable of the populated data
   */
  private _populateData(formData: RxDocument<FormData>): Observable<{[key: string]: any}> {
    return this.metricsService.activeMetrics.pipe(
      map(metrics => metrics.map(metric => metric.metricName)),
      switchMap(metrics => {
        const populatedMetrics: Observable<RxDocument<Metric>>[] = [];
        const populatedUser: Observable<RxDocument<UserData>> = from(
          formData.populate('user_data_ref_id'),
        );
        const populatedStatus: Observable<RxDocument<FormStatus>> = from(
          formData.populate('form_status_ref_id'),
        );
        metrics.forEach(metricType => {
          populatedMetrics.push(from(formData.populate(`${metricType}_ref_id`)));
        });
        return zip(forkJoin(populatedMetrics), populatedUser, populatedStatus);
      }),
      map(([mts, usr, status]) => {
        const addedMetrics = mts.map(mt => {
          if (mt == null) {
            return null;
          }
          const metricType = mt.collection.name;
          const jsonDoc: {[key: string]: any} = mt.toJSON();
          const dataJsonAdd: {[key: string]: any} = {};
          for (let key in jsonDoc) {
            dataJsonAdd[`dino_${metricType}_${key}`] = jsonDoc[key];
          }
          return dataJsonAdd;
        });
        const addedUserData: {[key: string]: any} = {};
        if (usr != null) {
          const userJsonDoc: {[key: string]: any} = usr.toJSON();
          for (let key in userJsonDoc) {
            addedUserData[`dino_user_${key}`] = userJsonDoc[key];
          }
        }
        const addedUserStatus: {[key: string]: any} = {};
        if (status != null) {
          const statusJsonDoc: {[key: string]: any} = status.toJSON();
          for (let key in statusJsonDoc) {
            addedUserData[`dino_form_status_${key}`] = statusJsonDoc[key];
          }
        }
        return [...addedMetrics, addedUserData, addedUserStatus];
      }),
      map(addedDatas => {
        let addData = {};
        addedDatas.forEach(data => (addData = {...addData, ...data}));
        return {
          dino_created_at: formData.created_at,
          dino_updated_at: formData.updated_at,
          ...formData.data,
          ...addData,
          form_schema_ref_id: formData.form_schema_ref_id,
        };
      }),
      take(1),
    );
  }

  ngAfterViewInit(): void {
    // Here we check if the template is in "steps" mode and contains a metric selector component
    if (this.steps) {
      this._reportMetricsSelector = this.metricsService.hasActiveMetrics.pipe(
        switchMap(active => {
          if (!active) {
            return obsOf(null);
          }
          return this.reportMetricsSelectorComponent.changes.pipe(
            map((comps: QueryList<FormMetricSelector>) => comps.first),
          );
        }),
      );

      this.reportMetrics = this._reportMetricsSelector.pipe(
        switchMap(rms => {
          if (rms) {
            return rms.formMetrics.valueChanges.pipe(
              map((vc: {[key: string]: RxDocument<Metric>}) => {
                let metricsString = '';
                Object.keys(vc).forEach(key => {
                  if (!vc[key]) {
                    delete vc[key];
                  }
                });
                const metricKeys = Object.keys(vc);
                for (let idx = 0; idx < metricKeys.length; idx++) {
                  const key = metricKeys[idx];
                  if (key && vc[key]) {
                    metricsString += `${this._translateService.translate(
                      key.charAt(0).toUpperCase() + key.slice(1),
                    )} : ${vc[key]['name']}  `;
                  }
                  if (idx < metricKeys.length - 1) {
                    metricsString += ', ';
                  }
                }
                return metricsString;
              }),
            );
          } else {
            return obsOf(null);
          }
        }),
      );

      combineLatest([this._reportMetricsSelector, this._currentReport, this.isView])
        .pipe(
          switchMap(([fms, currentDoc, isView]) => {
            if (fms == null) {
              return obsOf(false);
            }
            fms.addFormData(currentDoc, isView);
            return obsOf(true);
          }),
          take(1),
        )
        .subscribe();

      this.isReportMetricsSelectorValid = this._reportMetricsSelector.pipe(
        switchMap(reportMetricsSelector => {
          if (reportMetricsSelector == null) {
            return obsOf(false);
          }
          return reportMetricsSelector.formMetrics.statusChanges.pipe(
            switchMap(() => reportMetricsSelector.isFormMetricsValid()),
          );
        }),
      );
    } else {
      this.reportMetrics = this.reportData.pipe(
        switchMap(rd => {
          if (rd == null) {
            return obsOf(null);
          }
          const activeMetrics = this.metricsService.activeMetrics.value.map(am => am.metricName);
          const populatedMetrics: Observable<RxDocument<Metric>>[] = [];
          for (let mkey of activeMetrics) {
            populatedMetrics.push(from(rd.populate(`${mkey}_ref_id`)).pipe(shareReplay(1)));
          }
          return forkJoin(populatedMetrics);
        }),
        map(metrics => {
          if (metrics == null) {
            return null;
          }
          let metricsString = '';
          const filteredMetrics: RxDocument<Metric>[] = metrics.filter(mt => mt != null);
          for (let idx = 0; idx < filteredMetrics.length; idx++) {
            const metric = filteredMetrics[idx];
            metricsString += `${this._translateService.translate(
              metric.collection.name.charAt(0).toUpperCase() + metric.collection.name.slice(1),
            )} : ${metric['name']}  `;

            if (idx < filteredMetrics.length - 1) {
              metricsString += ', ';
            }
          }
          return metricsString;
        }),
      );
    }
  }
}
