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
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataQuerySelector, Metric, MetricsService} from '@dino/core/data';
import {FormData, FormDataManager, FormSchemaManager} from '@dino/core/forms';
import {ReportData, ReportDataManager, ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {UserData} from '@dino/core/users';
import {FormMetricSelector} from '@dino/material/form-metric-selector';
import {RxDocument} from 'rxdb';
import {combineLatest, forkJoin, from, Observable, of as obsOf, Subject, zip} from 'rxjs';
import {filter, map, shareReplay, startWith, switchMap, take, tap} from 'rxjs/operators';

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
  styleUrls: ['edit-report.css'],
  templateUrl: 'edit-report.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditReport implements OnInit, AfterViewInit {
  /**
   * The Report Metrics Selector
   */
  @ViewChildren(FormMetricSelector) reportMetricsSelectorComponent: QueryList<FormMetricSelector>;

  /**
   * The Report data id
   */
  reportId: Observable<string>;

  /**
   * The Report instance used for rendering the Report
   */
  reportInstance: Observable<AjfReportInstance | null>;
  private _currentReportInstance: AjfReportInstance | null = null;

  /**
   * True if no validation errors are encountered in the Report Metrics selector form
   */
  isReportMetricsSelectorValid: Observable<boolean>;

  /**
   * True if the Report can have one or more null Metrics.
   * Defaults to false.
   */
  @Input()
  hasOptionalMetrics: boolean = false;

  /**
   * The Report schema id
   */
  private _reportSchemaId: Observable<string | null>;

  /**
   * The Report data object
   */
  private _reportData: Observable<ReportData | null>;
  get reportData(): Observable<ReportData | null> {
    return this._reportData;
  }

  /**
   * The Report schema object
   */
  private _reportSchema: Observable<ReportSchema>;
  get reportSchema(): Observable<ReportSchema> {
    return this._reportSchema;
  }

  /**
   * The Form Datas that are the source of data for the Report creation.
   */
  private _sourceFormData: Observable<RxDocument<FormData>[]>;

  /**
   * The current Report Data object
   */
  private _currentReport: Subject<ReportData> = new Subject<ReportData>();

  /**
   * The Form Metric Selector
   */
  private _reportMetricsSelector: Observable<FormMetricSelector | null>;

  /**
   * True if the Report is in readonly mode
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
    this.isView = this._route.data.pipe(
      map(data => {
        if (data != null && data.isView != null) {
          return data.isView;
        }
        return false;
      }),
    );

    this.reportId = this._route.params.pipe(
      map(params => params.report_id),
      tap(id => {
        if (id == null) {
          this._router.navigateByUrl('/');
        }
      }),
      filter(id => id != null),
      shareReplay(1),
    );
  }

  ngOnInit(): void {
    this._reportData = this.reportId.pipe(
      switchMap(id => {
        return this._reportDataManager.get(id).pipe(
          map(repData => {
            if (repData == null) {
              this._router.navigateByUrl('');
              return null;
            }
            this._currentReport.next(repData);
            return repData;
          }),
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
          map(doc => {
            if (doc == null) {
              return null;
            }
            const item = doc.toJSON();
            return item;
          }),
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
          querySelector['created_at'] = {$lte: rData.date_end};
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
      startWith([]),
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
          const data = sfData
            .filter(fdata => fdata.form_schema_ref_id === formSchemaId)
            .map(fd => this._populateData(fd));
          populatedData.push(...data);
        }
        const ctxSchemas = this._formSchemaManager.query({selector: {id: {$in: formSchemaIds}}});
        return zip(forkJoin(populatedData), ctxSchemas, obsOf(rData), obsOf(rSchema));
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
        metrics.forEach(metricType => {
          populatedMetrics.push(from(formData.populate(`${metricType}_ref_id`)));
        });
        return zip(forkJoin(populatedMetrics), populatedUser);
      }),
      map(([mts, usr]) => {
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
        return [...addedMetrics, addedUserData];
      }),
      map(addedDatas => {
        let addData = {};
        addedDatas.forEach(data => (addData = {...addData, ...data}));
        return {...formData.data, ...addData, form_schema_ref_id: formData.form_schema_ref_id};
      }),
      take(1),
    );
  }

  ngAfterViewInit(): void {
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
        return reportMetricsSelector.isFormMetricsValid();
      }),
    );
  }
}
