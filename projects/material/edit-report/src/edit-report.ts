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
import {deepCopy} from '@ajf/core/utils';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  isDevMode,
  Optional,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {DataModelManager, DataQuerySelector, Metric, MetricsService} from '@dino/core/data';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormSchemaDeps,
  FormSchemaManager,
  FormStatus,
} from '@dino/core/forms';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
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
   * The Report Data metrics descendants IDs.
   */
  private _reportDataMetricsDescendants: Observable<{[key: string]: string[]}>;

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
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _caseManager: CaseManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
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

    this._reportDataMetricsDescendants = this._reportData.pipe(
      switchMap(rd => {
        const rDataObject = rd as {[key: string]: any};
        const metricManagers: {[key: string]: DataModelManager<any>} = {};
        if (this._areaManager != null) {
          metricManagers['area'] = this._areaManager;
        }
        if (this._caseManager != null) {
          metricManagers['case'] = this._caseManager;
        }
        if (this._projectManager != null) {
          metricManagers['project'] = this._projectManager;
        }
        if (this._locationManager != null) {
          metricManagers['location'] = this._locationManager;
        }
        if (this._organizationManager != null) {
          metricManagers['organization'] = this._organizationManager;
        }
        const activeMetrics = this.metricsService.activeMetrics.value.map(mt => mt.metricName);

        const descendants: {[key: string]: Observable<string[]>} = {};

        activeMetrics.forEach(
          metric =>
            (descendants[`${metric}_ref_id`] = metricManagers[metric]
              .findDescendants(rDataObject[`${metric}_ref_id`])
              .pipe(map(ds => ds.map(d => d.id)))),
        );
        return forkJoin(descendants);
      }),
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
      this._reportDataMetricsDescendants,
    ]).pipe(
      switchMap(([rSchema, rData, activeMetrics, descendants]) => {
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
              querySelector[metricKey] = {
                $in: [rDataObject[metricKey], ...descendants[metricKey].filter(d => d != null)],
              };
            }
          }
        }
        querySelector['is_deleted'] = {$ne: true};
        return this._formDataManager.query({selector: querySelector});
      }),
    );

    const sourceSchemas = this._reportSchema.pipe(
      filter(rSchema => rSchema != null),
      switchMap(rSchema =>
        this._formSchemaManager.query({selector: {id: {$in: rSchema.form_schema_ids}}}),
      ),
    );

    const formSchemas = sourceSchemas.pipe(
      switchMap(ctxSchemas => {
        let populatedSchema: Observable<
          [RxDocument<FormSchema, {}>, RxDocument<FormSchemaDeps, {}>]
        >[] = [];
        if (ctxSchemas != null) {
          const data = ctxSchemas.map(fschema => {
            let refProp: Observable<RxDocument<FormSchemaDeps>>;
            refProp = from(fschema.populate('form_schema_deps_ref_id'));
            return forkJoin([obsOf(fschema), refProp]).pipe(shareReplay(1));
          });
          populatedSchema.push(...data);
        }
        let res: Observable<
          {
            [key: string]: any;
          }[]
        > = obsOf([]);
        if (populatedSchema.length) {
          res = forkJoin(populatedSchema).pipe(
            map(allSchemaProps =>
              allSchemaProps.map(schemaProps => {
                const deps = schemaProps[1]?.toJSON() || {};
                return {...deepCopy(schemaProps[0].toJSON()), form_schema_deps: deps} as {
                  [key: string]: any;
                };
              }),
            ),
          );
        }
        return res;
      }),
    );

    this.reportInstance = combineLatest([
      this._reportData,
      this._reportSchema,
      this._sourceFormData,
      formSchemas,
    ]).pipe(
      delay(300),
      filter(([rData, rSchema]) => rData != null && rSchema != null),
      switchMap(([rData, rSchema, sfData, ctxSchemas]) => {
        const formSchemaIds = rSchema.form_schema_ids;
        let populatedData: Observable<{[key: string]: any}>[] = [];
        let queryDepsSelector: DataQuerySelector = {
          is_deleted: {$ne: true},
          form_schema_ref_id: {$in: []},
          $or: [],
        };

        for (let formSchemaId of formSchemaIds) {
          if (sfData != null) {
            const dataBySchema = sfData.filter(fdata => fdata.form_schema_ref_id === formSchemaId);
            const data = dataBySchema.map(fd => this._populateData(fd));
            populatedData.push(...data);

            const fs = ctxSchemas.filter(s => (s as FormSchema).id === formSchemaId)[0];
            if (fs) {
              const fsDeps: FormSchemaDeps = fs['form_schema_deps'] || {};
              if (fsDeps.deps_origin) {
                fsDeps.deps_origin.forEach(depsOrigin => {
                  if (!depsOrigin.is_choice) {
                    queryDepsSelector = this._getRelationshipDataQuery(
                      depsOrigin.form_schema_ref_id,
                      depsOrigin.filter_by_metric,
                      dataBySchema,
                      queryDepsSelector,
                    );
                  }
                });
              }
            }
          }
        }
        let depsQuery: Observable<RxDocument<FormData>[] | null> = obsOf(null);
        if (Object.keys(queryDepsSelector['$or']).length) {
          if (Object.keys(queryDepsSelector['$or']).length === 1) {
            const metricKey = queryDepsSelector['$or'][0];
            queryDepsSelector = {...queryDepsSelector, ...metricKey};
            delete queryDepsSelector['$or'];
          }
          depsQuery = this._formDataManager.query({selector: queryDepsSelector});
        }

        return zip(
          populatedData.length ? forkJoin(populatedData) : obsOf([]),
          obsOf(ctxSchemas),
          obsOf(rData),
          obsOf(rSchema),
          depsQuery,
        );
      }),
      map(([ctx, ctxSchemas, rData, rSchema, depsSourceFormData]) => {
        const contextForms: ReportContext = {};
        const contextSchemas: {[schema_ref_id: string]: any} = {};
        ctx.forEach(fdata => {
          if (contextForms[fdata['form_schema_ref_id']] == null) {
            contextForms[fdata['form_schema_ref_id']] = [];
          }
          const extFdata = this._populateDataWithRelationships(
            fdata,
            depsSourceFormData,
            ctxSchemas,
          );
          contextForms[fdata['form_schema_ref_id']].push(extFdata);
        });
        ctxSchemas.forEach(fschema => {
          if (fschema != null) {
            contextSchemas[(fschema as FormSchema).id] = (fschema as FormSchema).schema;
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
            if (key !== 'metric_data') {
              dataJsonAdd[`dino_${metricType}_${key}`] = jsonDoc[key];
            } else if (jsonDoc['metric_data'] != null) {
              for (let dataKey in jsonDoc['metric_data']) {
                dataJsonAdd[`dino_${metricType}_metric_data_${dataKey}`] =
                  jsonDoc['metric_data'][dataKey];
              }
            }
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

  /**
   * Return a new query selector with data to retrieve related forms.
   * @param formSchemaRefId the form schema ref id of the relationship
   * @param metrics the metric names to be used for the join with the relationship
   * @param formDatas the form data for the report
   * @param querySelector the initial query selector
   * @returns a data query selector with schema ref id and required metrics ref id
   */
  private _getRelationshipDataQuery(
    formSchemaRefId: string,
    metrics: string[],
    formDatas: RxDocument<FormData>[],
    querySelector: DataQuerySelector,
  ): DataQuerySelector {
    querySelector['form_schema_ref_id']['$in'].push(formSchemaRefId);

    const metricsAllvalues: {[key: string]: string[]} = {};
    formDatas.forEach(fd => {
      const jsonFd: {[key: string]: any} = fd.toJSON();
      metrics.forEach(metric => {
        if (jsonFd[metric + '_ref_id']) {
          if (metricsAllvalues[metric] == null) {
            metricsAllvalues[metric] = [];
          }
          metricsAllvalues[metric].push(jsonFd[metric + '_ref_id']);
        }
      });
    });
    metrics.forEach(metric => {
      if (metricsAllvalues[metric] && metricsAllvalues[metric].length) {
        let metricSelector = this._findMetricInOrSelector(querySelector['$or'], metric);
        if (metricSelector == null) {
          let metricSel: {[key: string]: any} = {};
          metricSel[metric + '_ref_id'] = {$in: []};
          querySelector['$or'].push(metricSel);
        }

        metricSelector = this._findMetricInOrSelector(querySelector['$or'], metric);
        if (metricSelector != null) {
          metricSelector[metric + '_ref_id']['$in'] = [
            ...new Set([...metricSelector[metric + '_ref_id']['$in'], ...metricsAllvalues[metric]]),
          ];
        }
      }
    });
    return querySelector;
  }

  /**
   * Found, into the or selector, the object with the specified metric as key
   * @param orQuerySelector the or query selector for the query
   * @param metric the metric id condition to find
   * @returns the metric object found, i.e. {case_ref_id: {$in: [case1, case2, ...]}}
   */
  private _findMetricInOrSelector(
    orQuerySelector: {[key: string]: any}[],
    metric: string,
  ): {[key: string]: any} | null {
    const metricSelector = orQuerySelector.filter((orCondition: {[key: string]: any}) =>
      Object.keys(orCondition).includes(metric + '_ref_id'),
    );
    if (metricSelector.length) {
      return metricSelector[0];
    }
    return null;
  }

  /**
   * Return a plain data object of a FormData populated
   * with external data taken from relationships
   * @param formData The form data to be populated
   * @param depsSourceFormData All the external form datas, they must be filtered.
   *        Only one for each deps_origin.
   * @param ctxSchema the FormSchema details, with relationships info, for the formData
   * @returns an object with all the form data populated with external data
   */
  private _populateDataWithRelationships(
    formData: {[key: string]: any},
    depsSourceFormData: RxDocument<FormData>[] | null,
    ctxSchemas: {[key: string]: any}[],
  ): {[key: string]: any} {
    let extFdata: {[key: string]: any} = {...formData};
    if (depsSourceFormData != null && ctxSchemas != null) {
      const fs = ctxSchemas.filter(s => (s as FormSchema).id === formData['form_schema_ref_id'])[0];
      if (fs) {
        const fsDeps: FormSchemaDeps = fs['form_schema_deps'] || {};
        if (fsDeps.deps_origin) {
          fsDeps.deps_origin
            .filter(depsOrigin => !depsOrigin.is_choice)
            .forEach(depsOrigin => {
              // Take only one element from depsSourceFormData
              let depsFormDataBySchema = depsSourceFormData
                .map(depsFd => depsFd.toJSON() as {[key: string]: any})
                .filter(depsd => depsd['form_schema_ref_id'] === depsOrigin.form_schema_ref_id);

              depsOrigin.filter_by_metric.forEach(metric => {
                depsFormDataBySchema = depsFormDataBySchema.filter(
                  depsFd => depsFd[metric + '_ref_id'] === formData['dino_' + metric + '_id'],
                );
              });
              if (depsFormDataBySchema.length) {
                const relationshipData: {[key: string]: any} = {};
                depsOrigin.fields_to_update.forEach(
                  field => (relationshipData[field] = depsFormDataBySchema[0]['data'][field]),
                );
                extFdata = {...extFdata, ...relationshipData};
              }
            });
        }
      }
    }
    return extFdata;
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
