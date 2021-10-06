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
import {AjfReportInstance, createReportInstance} from '@ajf/core/reports';
import {TranslocoService} from '@ajf/core/transloco';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DataQuerySelector, MetricsService} from '@dewco/core/data';
import {FormData, FormDataManager} from '@dewco/core/forms';
import {
  ReportData,
  ReportDataManager,
  ReportSchema,
  ReportSchemaManager
} from '@dewco/core/reports';
import {FormMetricSelector} from '@dewco/material/form-metric-selector';
import {combineLatest, from, Observable, of as obsOf, Subject} from 'rxjs';
import {filter, map, shareReplay, switchMap, take, tap} from 'rxjs/operators';

export type PrintLayout = 'landscape'|'portrait';

/**
 * Represents the context data of the forms necessary
 * for creating a Report Instance.
 */
export interface ReportContext {
  [form_schema_id: string]: {[key: string]: any}[],
}

/**
 * The Report Edit component.
 * Reports' data can be viewed or saved here.
 */
@Component({
  selector: 'dewco-edit-report',
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
  reportInstance: Observable<AjfReportInstance|null>;

  /**
   * True if no validation errors are encountered in the Report Metrics selector form
   */
  isReportMetricsSelectorValid: Observable<boolean>;

  /**
   * The Report schema id
   */
  private _reportSchemaId: Observable<string|null>;

  /**
   * The Report data object
   */
  private _reportData: Observable<ReportData|null>;
  get reportData(): Observable<ReportData|null> {
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
  private _sourceFormData: Observable<FormData[]>;

  /**
   * The current Report Data object
   */
  private _currentReport: Subject<ReportData> = new Subject<ReportData>();

  /**
   * The Form Metric Selector
   */
  private _reportMetricsSelector: Observable<FormMetricSelector|null>;

  /**
   * True if the Report is in readonly mode
   */
  readonly isView: Observable<boolean>;

  constructor(
      private _translateService: TranslocoService,
      private _route: ActivatedRoute,
      private _router: Router,
      private _formDataManager: FormDataManager,
      private _reportDataManager: ReportDataManager,
      private _reportSchemaManager: ReportSchemaManager,
      readonly metricsService: MetricsService,

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
        map(reportDataObj => reportDataObj != null ? reportDataObj.schema_id : null),
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

    this._sourceFormData =
        combineLatest([this._reportSchema, this._reportData, this.metricsService.activeMetrics])
            .pipe(
                switchMap(([rSchema, rData, activeMetrics]) => {
                  if (rSchema.form_schema_ids == null || rSchema.form_schema_ids.length <= 0 ||
                      rData == null) {
                    return obsOf([]);
                  }
                  const querySelector:
                      DataQuerySelector = {schema_id: {$in: rSchema.form_schema_ids}};
                  if (rData.date_start != null) {
                    querySelector['created_at'] = {$gte: rData.date_start};
                  }
                  if (rData.date_end != null) {
                    querySelector['created_at'] = {$lte: rData.date_end};
                  }
                  if (activeMetrics != null && activeMetrics.length > 0) {
                    for (let metric of activeMetrics) {
                      const metricKey = `${metric.metricName}_id`;
                      const rDataObject = rData as {[key: string]: any};
                      if (rDataObject[metricKey] != null) {
                        querySelector[metricKey] = {$eq: rDataObject[metricKey]};
                      }
                    }
                  }
                  return this._formDataManager.query({selector: querySelector})
                      .pipe(
                          switchMap(qry => from(qry.exec())),
                          map(docs => docs.map(doc => doc.toJSON())),
                      );
                }),
            );

    this.reportInstance =
        combineLatest([this._reportData, this._reportSchema, this._sourceFormData])
            .pipe(
                filter(([rData, rSchema, _]) => rData != null && rSchema != null),
                map(([rData, rSchema, sfData]) => {
                  const formSchemaIds = rSchema.form_schema_ids;
                  const contextForms: ReportContext = {};
                  for (let formSchemaId of formSchemaIds) {
                    const data =
                        sfData.filter(fdata => fdata.schema_id === formSchemaId).map(fd => fd.data);
                    contextForms[formSchemaId] = data;
                  }
                  const context = {forms: contextForms, report_data: rData};
                  return createReportInstance(rSchema.schema, context, this._translateService);
                }),
            );
  }

  ngAfterViewInit(): void {
    this._reportMetricsSelector = this.metricsService.hasActiveMetrics.pipe(switchMap(active => {
      if (!active) {
        return obsOf(null);
      }
      return this.reportMetricsSelectorComponent.changes.pipe(
          map((comps: QueryList<FormMetricSelector>) => comps.first));
    }));

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

    this.isReportMetricsSelectorValid =
        this._reportMetricsSelector.pipe(switchMap(reportMetricsSelector => {
          if (reportMetricsSelector == null) {
            return obsOf(false);
          }
          return reportMetricsSelector.isFormMetricsValid();
        }));
  }
}
