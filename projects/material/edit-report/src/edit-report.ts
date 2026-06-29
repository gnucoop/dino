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
  AjfReportInstance,
  AjfReportVariable,
  createReportInstance,
  downloadReportDoc,
  evaluateReportVariables,
  exportReportXlsx,
  openReportPdf,
} from '@ajf/core/reports';
import {TranslocoService} from '@ajf/core/transloco';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  isDevMode,
  Optional,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService, NetworkStatusService, User} from '@dino/core/auth';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {
  DATA_SERVICE_CONFIG,
  DataModelManager,
  DataQuerySelector,
  DataServiceConfig,
  Metric,
  MetricsService,
  PermissionContextService,
} from '@dino/core/data';
import {
  DepsOrigin,
  FormData,
  FormDataManager,
  FormSchema,
  FormSchemaDeps,
  FormSchemaManager,
  FormStatus,
  FormStatusManager,
  Origin,
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
import {
  delay,
  filter,
  map,
  retryWhen,
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {AjfContext} from '@ajf/core/models';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {TokensService} from '@dino/material/stripe-payment';
import {MatStepper} from '@angular/material/stepper';
import {format} from 'date-fns';
import {AlignmentType, HeadingLevel, Paragraph} from 'docx';

export type PrintLayout = 'landscape' | 'portrait';

/**
 * Represents the context data of the forms necessary
 * for creating a Report Instance.
 */
export interface ReportContext {
  [form_schema_id: string]: {[key: string]: any}[];
}

function reformat(isoDate: string): string {
  if (isoDate.length !== 10) {
    return isoDate;
  }
  const year = isoDate.slice(0, 4);
  const month = isoDate.slice(5, 7);
  const day = isoDate.slice(8, 10);
  return day + '/' + month + '/' + year;
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
   * The loading state of the AI Report Prompts generation
   */
  isAILoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * The Progress Bar value during the AI Report Prompts generation
   */
  AILoadingBarValues: BehaviorSubject<{
    current: number;
    total: number;
    percent: number;
  }> = new BehaviorSubject<{current: number; total: number; percent: number}>({
    current: 1,
    total: 0,
    percent: 0,
  });

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
   * Metrics of the types specified in the array can be created directly from the metric fields
   */
  @Input() allowMetricCreationFor: string[] = ['all'];

  /**
   * Secondary metric field to display in the Form Metric Selector and Filters
   */
  private _secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string[];
  } | null = null;
  get secondaryMetricFieldsDisplayed(): {
    [metricName: string]: string | string[];
  } | null {
    return this._secondaryMetricFieldsDisplayed;
  }
  @Input()
  set secondaryMetricFieldsDisplayed(
    fields: {
      [metricName: string]: string | string[];
    } | null,
  ) {
    this._secondaryMetricFieldsDisplayed = fields;
  }

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
  @ViewChildren(FormMetricSelector)
  reportMetricsSelectorComponent!: QueryList<FormMetricSelector>;

  /**
   * The Report data id
   */
  reportId: Observable<string>;

  /**
   * The Report instance used for rendering the Report
   */
  reportInstance: Observable<AjfReportInstance | null> = obsOf(null);

  /**
   * Copy of the current report instance, used for printing
   */
  private _printableReport: AjfReportInstance | null = null;

  /**
   * Emits when the reportInstance is created
   */
  @Output() readonly reportInstanceCreatedEvt: EventEmitter<AjfReportInstance> =
    new EventEmitter<AjfReportInstance>();

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
  private _reportDataMetricsDescendants: Observable<{
    [key: string]: string[];
  }>;

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
   * The base url of the DataChat (Pandino) API
   */
  @Input() baseDataChatAPIurl?: string;

  /**
   * The endpoint names in the urls
   */
  @Input() endpointUrls?: {
    validateEndpoint: string;
    dataChatEndpoint?: string;
    completionChatEndpoint?: string;
    startEndpoint?: string;
    endEndpoint?: string;
  };

  /**
   * The base url for the graphql backend (Hasura)
   */
  private _graphqlUrl: string;

  gptPromptStatus = '';

  /**
   * The list of all the Form Statuses available to the active User
   */
  readonly availableStatuses: Observable<FormStatus[] | null>;

  /**
   *The names of the Metric types required.
   */
  readonly requiredMetrics: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /**
   * True if the Report is in readonly mode.
   * When a Report id is passed by the input, the report is automatically
   * displayed in readonly mode.
   */
  readonly isView: Observable<boolean>;

  private _aiSnackBar!: MatSnackBarRef<TextOnlySnackBar>;

  constructor(
    @Inject(DATA_SERVICE_CONFIG) private _dataConfig: DataServiceConfig,
    readonly metricsService: MetricsService,
    readonly snackbar: MatSnackBar,
    private _auth: AuthService,
    private _cdr: ChangeDetectorRef,
    private _translateService: TranslocoService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _formDataManager: FormDataManager,
    private _formSchemaManager: FormSchemaManager,
    private _reportDataManager: ReportDataManager,
    private _reportSchemaManager: ReportSchemaManager,
    private _fstm: FormStatusManager,
    private _pcs: PermissionContextService,
    private _nss: NetworkStatusService,
    private _ehms: ErrorHandlerMessageService,
    private _tokensService: TokensService,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _caseManager: CaseManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
  ) {
    this._graphqlUrl = this._dataConfig.syncOptions.url.http;
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

        activeMetrics.forEach(metric => {
          const rDataMetricId = rDataObject[`${metric}_ref_id`]
            ? [rDataObject[`${metric}_ref_id`]]
            : [];
          return (descendants[`${metric}_ref_id`] = metricManagers[metric]
            .findDescendants(rDataMetricId)
            .pipe(map(ds => ds.map(d => d.id))));
        });
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
            this.requiredMetrics.next((item.required_metrics as string[]) || []);
            return obsOf(item);
          }),
          retryWhen(err => err.pipe(delay(1000), take(10))),
        );
      }),
      switchMap(schema => schema as Observable<ReportSchema>),
      shareReplay(1),
    );

    this.availableStatuses = combineLatest([this._fstm.list(), this._pcs.permissionContext]).pipe(
      map(([statuses, context]) => {
        if (statuses == null || context == null) {
          return [];
        }
        const stts = [...(context.user_form_statuses ?? [])];
        return statuses.filter(status => stts.includes(status.id) || stts.includes('all'));
      }),
    );

    const sourceSchemas = this._reportSchema.pipe(
      filter(rSchema => rSchema != null),
      switchMap(rSchema =>
        this._formSchemaManager.query({
          selector: {id: {$in: rSchema.form_schema_ids}},
        }),
      ),
    );

    this._sourceFormData = combineLatest([
      this._reportSchema,
      this._reportData,
      this.metricsService.activeMetrics,
      this._reportDataMetricsDescendants,
      sourceSchemas,
    ]).pipe(
      switchMap(([rSchema, rData, activeMetrics, descendants, fmSchemas]) => {
        if (
          rSchema.form_schema_ids == null ||
          rSchema.form_schema_ids.length <= 0 ||
          rData == null ||
          !fmSchemas ||
          !fmSchemas.length
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
          const rDataObject = rData as {[key: string]: any};
          const metricsQuerySelector: {[key: string]: any} = {};

          for (let metric of activeMetrics) {
            const metricKey = `${metric.metricName}_ref_id`;
            if (rDataObject[metricKey] != null) {
              metricsQuerySelector[metricKey] = {
                $in: [rDataObject[metricKey], ...descendants[metricKey].filter(d => d != null)],
              };
            }
          }

          const switchToOrQuery = this.switchToOrQuery(metricsQuerySelector, fmSchemas);
          if (!switchToOrQuery) {
            Object.keys(metricsQuerySelector).forEach(metricKey => {
              querySelector[metricKey] = {
                $in: [rDataObject[metricKey], ...descendants[metricKey].filter(d => d != null)],
              };
            });
          } else {
            delete querySelector['form_schema_ref_id'];
            querySelector['$or'] = [];
            fmSchemas.forEach(fmSchema => {
              const querySelSchema: DataQuerySelector = {
                form_schema_ref_id: {$eq: fmSchema.id},
              };
              Object.keys(metricsQuerySelector).forEach(metricKey => {
                const metricName = metricKey.replace('_ref_id', '');
                if (
                  fmSchema.form_schema_metrics &&
                  fmSchema.form_schema_metrics.includes(metricName)
                ) {
                  querySelSchema[metricKey] = {
                    $in: [rDataObject[metricKey], ...descendants[metricKey].filter(d => d != null)],
                  };
                }
              });
              querySelector['$or'].push(querySelSchema);
            });
          }
        }
        querySelector['is_deleted'] = {$ne: true};
        return this._formDataManager.query({selector: querySelector});
      }),
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
                const deps = (schemaProps[1]?.toJSON() as FormSchemaDeps) || {};
                const formSchema = schemaProps[0].toJSON() as FormSchema as Partial<FormSchema> & {
                  form_schema_deps: FormSchemaDeps;
                };
                formSchema['form_schema_deps'] = deps;
                return formSchema;
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
            let dataBySchema = sfData.filter(fdata => fdata.form_schema_ref_id === formSchemaId);

            const fs = ctxSchemas.filter(s => (s as FormSchema).id === formSchemaId)[0];
            const schemaFormStatusIds: string[] =
              fs && fs['form_status_ref_id'] ? fs['form_status_ref_id'] : [];
            if (
              rData &&
              rData.form_status_ref_id != null &&
              schemaFormStatusIds.includes(rData.form_status_ref_id)
            ) {
              dataBySchema = dataBySchema.filter(
                fdata => fdata.form_status_ref_id === rData.form_status_ref_id,
              );
            }
            const data = dataBySchema.map(fd => this._populateData(fd));
            populatedData.push(...data);

            if (fs) {
              const fsDeps: FormSchemaDeps = fs['form_schema_deps'] || {};
              if (fsDeps.deps_origin) {
                fsDeps.deps_origin
                  .filter(deps => this._isFieldsToUpdateRelationship(deps, fs))
                  .map(depsOrigin => depsOrigin as DepsOrigin)
                  .forEach(depsOrigin => {
                    queryDepsSelector = this._getRelationshipDataQuery(
                      depsOrigin.form_schema_ref_id,
                      depsOrigin.filter_by_metric,
                      dataBySchema,
                      queryDepsSelector,
                    );
                  });
              }
            }
          }
        }
        let depsQuery: Observable<RxDocument<FormData>[] | null> = obsOf(null);

        if (
          queryDepsSelector['form_schema_ref_id']['$in'].length &&
          Object.keys(queryDepsSelector['$or']).length
        ) {
          if (Object.keys(queryDepsSelector['$or']).length === 1) {
            const metricKey = queryDepsSelector['$or'][0];
            queryDepsSelector = {...queryDepsSelector, ...metricKey};
            delete queryDepsSelector['$or'];
          }
          depsQuery = this._formDataManager.query({
            selector: queryDepsSelector,
          });
        }

        if (isDevMode()) {
          console.log(format(new Date(), 'HH:mm:ss') + '*** start populate...');
        }

        return zip(
          populatedData.length ? forkJoin(populatedData) : obsOf([]),
          obsOf(ctxSchemas),
          obsOf(rData),
          obsOf(rSchema),
          depsQuery,
        );
      }),
      withLatestFrom(this._nss.isOnline$),
      switchMap(([[ctx, ctxSchemas, rData, rSchema, depsSourceFormData], isOnline]) => {
        if (isDevMode()) {
          console.log(
            format(new Date(), 'HH:mm:ss') + '*** start populateDataWithRelationships...',
          );
        }

        const formDataBySchema: ReportContext = this._groupFormDataBySchema(ctx);
        const depsSourceFormDataBySchema: ReportContext =
          this._groupFormDataBySchema(depsSourceFormData);

        const contextForms: ReportContext = this._populateDataWithRelationships(
          formDataBySchema,
          depsSourceFormDataBySchema,
          ctxSchemas,
        );

        const contextSchemas: {[schema_ref_id: string]: any} = {};
        ctxSchemas.forEach(fschema => {
          if (fschema != null) {
            contextSchemas[(fschema as FormSchema).id] = (fschema as FormSchema).schema;
          }
        });
        const context = {
          forms: contextForms,
          schemas: contextSchemas,
          report_data: rData,
        };
        if (isDevMode()) {
          console.log(context);
        }

        const promptsVariable = (rSchema.schema.variables || []).filter(
          variable => variable.isAIPrompt,
        );

        let reportDataCtxObs: Observable<{[key: string]: string} | null> = obsOf(null);
        const rDataAIData = rData?.data || {};
        if (promptsVariable.length && isOnline) {
          if (promptsVariable.length > Object.keys(rDataAIData).length) {
            const variablesContext = evaluateReportVariables(rSchema.schema, {
              ...context,
            });
            reportDataCtxObs = from(
              this.generateAITextFromPrompt(promptsVariable, variablesContext, rDataAIData),
            );
            this._aiSnackBar = this.snackbar.open(
              'DINO-AI is generating the report. Please wait...',
              'WAIT',
              {duration: 5000},
            );
          }
        }
        return zip(obsOf(rSchema), obsOf(context), obsOf(rData), reportDataCtxObs);
      }),
      switchMap(([rSchema, context, rData, reportDataCtx]) => {
        let updatedRData: Observable<RxDocument<ReportData> | null> = obsOf(null);
        if (reportDataCtx && Object.keys(reportDataCtx).length && rData) {
          const rDataDoc: Partial<ReportData> & {id: string} = {
            id: rData.id,
            data: reportDataCtx,
          };
          updatedRData = this._reportDataManager.patch(rDataDoc);
        }
        return zip(obsOf(rSchema), obsOf(context), updatedRData);
      }),
      map(([rSchema, context, rData]) => {
        if (isDevMode()) {
          console.log(format(new Date(), 'HH:mm:ss') + '*** createReportInstance ');
        }

        if (rData != null) {
          context.report_data = rData;
        }
        const report = createReportInstance(
          rSchema.schema,
          context,
          this._translateService,
        );
        if (this._aiSnackBar) {
          this._aiSnackBar.dismiss();
        }
        this.reportInstanceCreatedEvt.emit(report);
        this._printableReport = report;

        if (isDevMode()) {
          console.log(format(new Date(), 'HH:mm:ss') + '*** createReportInstance end ');
        }
        return report;
      }),
      take(1),
    );
  }

  /**
   * Return true if we need an OR query, when not all requested metrics are enables for the report form schemas
   * @param metricsQuerySelector
   * @param fmSchemas
   * @returns
   */
  switchToOrQuery(metricsQuerySelector: {[key: string]: any}, fmSchemas: FormSchema[]): boolean {
    let switchToOrQuery = false;
    fmSchemas.forEach(fmSchema => {
      Object.keys(metricsQuerySelector).forEach(metricKey => {
        const metricName = metricKey.replace('_ref_id', '');
        if (!fmSchema.form_schema_metrics || !fmSchema.form_schema_metrics.includes(metricName)) {
          switchToOrQuery = true;
        }
      });
    });
    return switchToOrQuery;
  }

  /**
   * Triggers the Stepper to move forward to the Form Data step.
   */
  goToDataStep(stepper: MatStepper) {
    stepper.next();
  }

  /**
   * Update printableReport when the filter widget changes.
   */
  filterWidgetChanged(changes: {context: AjfContext, report?: AjfReportInstance}) {
    if (changes.report) {
      this._printableReport = changes.report;
    }
  }

  /**
   * Prints the current report Instance to pdf
   */
  printReport(orientation: 'portrait' | 'landscape') {
    combineLatest([this.reportSchema, this.reportData, this.reportMetrics!])
      .pipe(take(1))
      .subscribe(([schema, data, metricString]) => {
        if (schema == null || this._printableReport == null) {
          return;
        }
        const header: any = [
          {
            text: schema.label,
            fontSize: 22,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10],
          },
        ];
        if (data?.date_start) {
          header.push({
            text:
              this._translateService.translate('Collected Since') + ' ' + reformat(data.date_start),
            fontSize: 14,
            bold: true,
            alignment: 'left',
            margin: [0, 0, 0, 10],
          });
        }
        if (data?.date_end) {
          header.push({
            text:
              this._translateService.translate('Collected Until') + ' ' + reformat(data.date_end),
            fontSize: 14,
            bold: true,
            alignment: 'left',
            margin: [0, 0, 0, 10],
          });
        }
        if (metricString != null && metricString != '') {
          const metrics = metricString.split(', ');
          for (const met of metrics) {
            header.push({
              text: met,
              fontSize: 14,
              bold: true,
              alignment: 'left',
              margin: [0, 0, 0, 10],
            });
          }
        }
        openReportPdf(this._printableReport, orientation, undefined, header);
      });
  }

  /**
   * Export the current report Instance to xlsx
   */
  exportXlsx() {
    if (this._printableReport != null) {
      const iconsMap: {[html: string]: string} | undefined = {};
      const fileExported = exportReportXlsx(this._printableReport, iconsMap);
      if (!fileExported) {
        this.snackbar.open('No exportable widget found in this report', 'EXPORT', {duration: 5000});
      }
    }
  }

  /**
   * Export the current report Instance to docx
   */
  exportDocx(orientation: 'portrait' | 'landscape') {
    combineLatest([this.reportSchema, this.reportData, this.reportMetrics!])
      .pipe(take(1))
      .subscribe(([schema, data, metricString]) => {
        if (schema == null || this._printableReport == null) {
          return;
        }
        const header: Paragraph[] = [
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
            text: schema.label,
          }),
        ];
        if (data?.date_start) {
          header.push(new Paragraph({text:
            this._translateService.translate('Collected Since') + ' ' + reformat(data.date_start),
          }));
        }
        if (data?.date_end) {
          header.push(new Paragraph({text:
            this._translateService.translate('Collected Until') + ' ' + reformat(data.date_end),
          }));
        }
        if (metricString != null && metricString != '') {
          const metrics = metricString.split(', ');
          for (const met of metrics) {
            header.push(new Paragraph({text: met}));
          }
        }
        downloadReportDoc(this._printableReport, header, orientation as any);
      });
  }

  /**
   * Generate AI text from prompt
   * @param promptsVariable All isAIPrompt variables with formula
   * @param variablesContext All report variables evaluated by ajf with current formdata context
   * @param reportDataAIData Current reportData data field with ai variables with pandino generated values
   * @returns
   */
  async generateAITextFromPrompt(
    promptsVariable: AjfReportVariable[],
    variablesContext: AjfContext,
    reportDataAIData: {[key: string]: any},
  ): Promise<{[key: string]: string} | null> {
    const storedApiKey = localStorage.getItem('pandas_dino_api_key');
    if (!storedApiKey) {
      this.snackbar.open(
        this._translateService.translate('DINO-AI API Key not found.'),
        this._translateService.translate('API KEY MISSING'),
        {duration: 10000},
      );
      return null;
    }
    const aiContext: {[key: string]: string} = {};
    const validPrompts: AjfReportVariable[] = [];
    for (let i = 0; i < promptsVariable.length; i++) {
      const promptVariable = promptsVariable[i];
      const prompt = variablesContext[promptVariable.name]
        ? variablesContext[promptVariable.name].toString()
        : null;
      if (!prompt || prompt.length === 0) {
        continue;
      }
      if (
        !reportDataAIData[promptVariable.name] ||
        reportDataAIData[promptVariable.name].length === 0
      ) {
        validPrompts.push(promptVariable);
      }
    }

    if (validPrompts.length > 0) {
      const userInfo: User | null = this._auth.getUserInfo();
      if (this.gptPromptStatus !== '' || !userInfo) {
        return aiContext;
      }
      if (this.baseDataChatAPIurl == null || this._graphqlUrl == null) {
        console.warn('baseDataChatAPIurl or graphqlUrl not provided');
        return aiContext;
      }

      const gptPromptUrl = `${this.baseDataChatAPIurl}/prompt.txt`;

      const singlePromptProgressBarValue = 100 / validPrompts.length;
      this.isAILoading.next(true);
      let promptNum = 1;
      for (let i = 0; i < validPrompts.length; i++) {
        const promptVariable = validPrompts[i];
        const prompt = variablesContext[promptVariable.name]
          ? variablesContext[promptVariable.name].toString()
          : null;
        if (prompt && prompt.length > 0) {
          this.AILoadingBarValues.next({
            ...this.AILoadingBarValues.value,
            current: promptNum,
            total: validPrompts.length,
          });
          if (isDevMode()) {
            console.log(`Generazione prompt ${promptNum} di ${validPrompts.length}...`);
          }
          this._setPromptStatus(`Generazione prompt ${promptNum} di ${validPrompts.length}...`);
          promptNum++;
          const fd = new FormData();
          fd.append('graphqlUrl', this._graphqlUrl);
          fd.append('authToken', this._auth.authToken.value || '');
          fd.append('prompt', prompt);
          fd.append('username', userInfo.email);
          let text: string = '';
          const headers = {'X-API-KEY': storedApiKey};
          try {
            const resp = await fetch(gptPromptUrl, {
              method: 'POST',
              mode: 'cors',
              body: fd,
              headers,
            });
            text = await resp.text();
            if (!resp.ok) {
              this.snackbar.open(
                'DINO-AI is not responding at the moment. Please try later',
                'DINO-AI NOT RESPONDING',
                {
                  duration: 5000,
                },
              );
              if (!isDevMode()) {
                this._ehms.captureErrorMessage(
                  `DINO-AI is not responding: ${JSON.stringify(text)}`,
                  'warning',
                );
              }
              throw new Error(text);
            }
          } catch (err: any) {
            console.error(err.message);
            this._setPromptStatus('Gpt error, check the console');
            setTimeout(() => this._setPromptStatus(''), 4000);
            return aiContext;
          }
          if (text && text.length > 0) {
            aiContext[promptVariable.name] = text;
            this.AILoadingBarValues.next({
              ...this.AILoadingBarValues.value,
              percent: (promptNum - 1) * singlePromptProgressBarValue,
            });
          }
        }
      }
      this.isAILoading.next(false);
      this._setPromptStatus('');
      this._cdr.detectChanges();
    }
    if (Object.keys(aiContext).length) {
      // Return current and new ai variables with pandino generated values
      return {...reportDataAIData, ...aiContext};
    }
    return {};
  }

  private _setPromptStatus(s: string) {
    this.gptPromptStatus = s;
    this._cdr.markForCheck();
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
          dino_id: formData.id,
          dino_created_at: formData.created_at,
          dino_updated_at: formData.updated_at,
          ...formData.toJSON().data,
          ...addData,
          form_schema_ref_id: formData.form_schema_ref_id,
        };
      }),
      take(1),
    );
  }

  /**
   * Return true if deps origin input is a relationship for a fields to update operation and
   * not a choice origin (also from repeating slide). These are the only relationships that we need for report.
   * @param depsOrigin the relationship
   * @returns true if is a fields to update relationship
   */
  private _isFieldsToUpdateRelationship(depsOrigin: Origin, fs: {[key: string]: any}): boolean {
    if (
      'form_schema_ref_id' in depsOrigin &&
      depsOrigin.form_schema_ref_id &&
      depsOrigin.filter_by_metric &&
      depsOrigin.fields_to_update &&
      !depsOrigin.is_choice
    ) {
      const fieldsToUpdate: string[] = [];
      depsOrigin.fields_to_update.forEach(fieldToUpdate => {
        const choicesOriginName = fieldToUpdate + '_choice';
        const hasChoiceField = this._formSchemaManager.findFieldsWithChoicesByChoicesName(
          fs as FormSchema,
          choicesOriginName,
          false,
        );
        if (!hasChoiceField) {
          fieldsToUpdate.push(fieldToUpdate);
        }
      });
      if (fieldsToUpdate.length) {
        depsOrigin.fields_to_update = fieldsToUpdate;
        return true;
      }
      return false;
    }
    return false;
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
    formSchemaRefId: string | undefined,
    metrics: string[] | undefined,
    formDatas: RxDocument<FormData>[],
    querySelector: DataQuerySelector,
  ): DataQuerySelector {
    if (formSchemaRefId && metrics) {
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
              ...new Set([
                ...metricSelector[metric + '_ref_id']['$in'],
                ...metricsAllvalues[metric],
              ]),
            ];
          }
        }
      });
    }
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
   * Group all form data by schema id
   * @param allReportFomData
   * @returns
   */
  private _groupFormDataBySchema(
    allFomData:
      | {
          [key: string]: any;
        }[]
      | null,
  ): ReportContext {
    const formDataBySchema: ReportContext = {};
    if (allFomData) {
      allFomData.forEach(fdata => {
        if (formDataBySchema[fdata['form_schema_ref_id']] == null) {
          formDataBySchema[fdata['form_schema_ref_id']] = [];
        }
        formDataBySchema[fdata['form_schema_ref_id']].push(fdata);
      });
    }
    return formDataBySchema;
  }

  /**
   * Return a plain data object of a list of FormData populated
   * with external data taken from relationships
   * @param formDataBySchema The form data to be populated, grouped by schema
   * @param depsSourceFormDataBySchema All the external form datas, grouped by schema
   * @param ctxSchemas the FormSchema, with relationships info
   * @returns  an object with all the form data populated with external data
   */
  private _populateDataWithRelationships(
    formDataBySchema: ReportContext,
    depsSourceFormDataBySchema: ReportContext,
    ctxSchemas: {[key: string]: any}[],
  ): ReportContext {
    if (
      depsSourceFormDataBySchema != null &&
      Object.keys(depsSourceFormDataBySchema).length &&
      ctxSchemas != null
    ) {
      Object.keys(formDataBySchema).forEach(fschemaId => {
        const fdataForSchema = formDataBySchema[fschemaId];
        const fs = ctxSchemas.filter(s => (s as FormSchema).id === fschemaId)[0];
        if (fs) {
          const fsDeps: FormSchemaDeps = fs['form_schema_deps'] || {};
          if (fsDeps.deps_origin != null) {
            const fsDepsOrigins = fsDeps.deps_origin
              .filter(deps => this._isFieldsToUpdateRelationship(deps, fs))
              .map(depsOrigin => depsOrigin as DepsOrigin);

            if (fsDepsOrigins && fsDepsOrigins.length) {
              fdataForSchema.forEach(formData => {
                // For each report form data
                fsDepsOrigins.forEach(depsOrigin => {
                  let depsFormDataBySchema = (
                    depsSourceFormDataBySchema[depsOrigin.form_schema_ref_id] || []
                  ).filter(depsFd =>
                    depsOrigin.filter_by_metric?.every(
                      metric => depsFd[metric + '_ref_id'] === formData['dino_' + metric + '_id'],
                    ),
                  );

                  if (depsFormDataBySchema.length) {
                    // Take only the first result form data from the relationship,
                    // relationship for fields to update must be one-to-one.
                    depsOrigin.fields_to_update?.forEach(field => {
                      if (field in depsFormDataBySchema[0]['data']) {
                        formData[field] = depsFormDataBySchema[0]['data'][field];
                      }
                    });
                  }
                });
              });
            }
          }
        }
      });
    }
    return formDataBySchema;
  }

  ngAfterViewInit(): void {
    if (isDevMode()) {
      console.log(format(new Date(), 'HH:mm:ss') + '*** ngAfterViewInit ');
    }
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
              startWith({}),
              map(
                (vc: {
                  [key: string]: {
                    option: RxDocument<Metric>;
                    metricType: string;
                    secondaryMetricFieldsDisplayed?: {[key: string]: string | string[]};
                  };
                }) => {
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
                      )}: ${vc[key].option.name}`;
                    }
                    if (idx < metricKeys.length - 1) {
                      metricsString += ', ';
                    }
                  }
                  return metricsString;
                },
              ),
            );
          } else {
            return obsOf(null);
          }
        }),
        shareReplay(1),
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
            )}: ${metric['name']}`;

            if (idx < filteredMetrics.length - 1) {
              metricsString += ', ';
            }
          }
          return metricsString;
        }),
        shareReplay(1),
      );
    }
  }
}
