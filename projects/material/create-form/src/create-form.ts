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
  AjfChoice,
  AjfChoicesOrigin,
  AjfForm,
  AjfFormActionEvent,
  AjfFormRendererService,
  AjfFormSerializer,
} from '@ajf/core/forms';
import {deepCopy} from '@ajf/core/utils';
import {Location} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {NetworkStatusService} from '@dino/core/auth';
import {FileUploadService, StorageUploadResponse} from '@dino/core/file-upload';
import {
  FormData,
  FormSchema,
  FormSchemaDeps,
  FormSchemaManager,
  FormStatus,
  FormStatusManager,
} from '@dino/core/forms';
import {UserDataManager} from '@dino/core/users';
import {FormMetricSelector} from '@dino/material/form-metric-selector';
import {isRxDocument, RxDocument} from 'rxdb';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  Observable,
  of as obsOf,
  Subject,
  Subscription,
  throwError,
  zip,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  take,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import {
  ActionTrigger,
  ActionTriggerData,
  DataQueryOptions,
  DataModelManager,
  MetricsService,
  Metric,
  Model,
} from '@dino/core/data';
import {format} from 'date-fns';
import {FormControl} from '@angular/forms';

/**
 * The Form Edit component.
 * Forms' data can be viewed or edited and saved here.
 * The form is rendered by the Ajf AjfFormRenderer
 */
@Component({
  selector: 'dino-create-form',
  styleUrls: ['create-form.scss'],
  templateUrl: 'create-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CreateForm<T extends Model = Model> implements AfterViewInit, OnInit, OnDestroy {
  /**
   * If true, Metrics can be created directly from the metric fields
   */
  @Input() allowMetricCreation: boolean = true;

  /**
   * Event emitted as an Action hook
   */
  @Output() readonly emitActionTrigger: EventEmitter<ActionTrigger<T>> = new EventEmitter<
    ActionTrigger<T>
  >();

  /**
   * True if no validation errors are encountered in the AjfForm
   */
  isAjfFormValid: Observable<boolean> = obsOf(false);

  /**
   * True if no validation errors are encountered in the Form Metrics selector form
   */
  isFormMetricsSelectorValid: Observable<boolean> = obsOf(false);

  /**
   * True if the Form can have one or more null Metrics.
   * Defaults to false.
   */
  @Input()
  hasOptionalMetrics: boolean = false;

  /**
   * True if the files selected in the form must be saved into local formdata
   * Defaults to false.
   */
  @Input()
  offlineFileUpload: boolean = false;

  /**
   * The Form Metric Selector
   */
  private _formMetricsSelector: Observable<FormMetricSelector | null> = obsOf(null);

  /**
   * The Form schema id
   */
  private _formSchemaId: Observable<string> = obsOf();

  /**
   * The Form schema object
   */
  private _formSchema: Observable<FormSchema> = obsOf();
  get formSchema(): Observable<FormSchema> {
    return this._formSchema;
  }

  /**
   * If true, this Form Schema follows a Pipeline structure
   */
  private _isPipeline: Observable<boolean> = obsOf();
  get isPipeline(): Observable<boolean> {
    return this._isPipeline;
  }

  /**
   * Form Schemas (by name) that follow a Pipeline structure
   */
  private _pipelineSchemas: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  @Input()
  set setPipelines(schemaNames: string[]) {
    this._pipelineSchemas.next(schemaNames);
  }

  /**
   * The Form schema Statuses
   */
  private _formSchemaStatuses: Observable<FormStatus[]> = obsOf([]);
  get formSchemaStatuses(): Observable<FormStatus[]> {
    return this._formSchemaStatuses;
  }

  /**
   * The Form Schema Deps object
   */
  private _formSchemaDeps: Observable<FormSchemaDeps> = obsOf();
  get formSchemaDeps(): Observable<FormSchemaDeps> {
    return this._formSchemaDeps;
  }

  /**
   * All the metric changes in the metric selector
   */
  readonly metricChanges: BehaviorSubject<{[key: string]: Metric} | null> = new BehaviorSubject<{
    [key: string]: Metric;
  } | null>(null);

  /**
   * The Form schema statuses
   */
  private _formStatuses: Observable<FormStatus[] | null> = obsOf(null);
  get formStatuses(): Observable<FormStatus[] | null> {
    return this._formStatuses;
  }

  /**
   * The Ajf Form object
   */
  private _form: Observable<AjfForm> = new Observable<AjfForm>();
  get form(): Observable<AjfForm> {
    return this._form;
  }

  /**
   * The new AjfForm, with data and choices taken from external relationships
   */
  readonly formChanges: BehaviorSubject<AjfForm | null> = new BehaviorSubject<AjfForm | null>(null);

  /**
   * The loading state of the upload file
   */
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Emitted when a user tries to save a form
   */
  private _saveFormEvt: EventEmitter<AjfFormActionEvent> = new EventEmitter<AjfFormActionEvent>();

  /**
   * Subscribes to the ajf validation state to save the form
   */
  private _saveValidFormSub: Subscription = Subscription.EMPTY;

  /**
   * If true, a form data is being created.
   * If false, a generic document is being created.
   */
  private _isFormData: Observable<boolean> = obsOf(false);

  /**
   * The data model manager used to retrieve the data to be edited
   */
  private _dataModelManager?: DataModelManager<T>;
  @Input()
  set dataModelManager(dmm: DataModelManager<T>) {
    if (dmm == null) {
      return;
    }
    this._dataModelManager = dmm;
  }

  private _dinoBaseModelFields: string[] = ['_deleted', 'is_deleted', 'updated_at', 'created_at'];

  /**
   * The Form Metrics Selector
   */
  @ViewChildren(FormMetricSelector)
  formMetricsSelectorComponent!: QueryList<FormMetricSelector>;

  /**
   * Main unsub subject.
   * Used for unsubscribing all subscriptions.
   */
  private _mainUnsubscribe: Subject<void> = new Subject();

  constructor(
    private _nss: NetworkStatusService,
    private _route: ActivatedRoute,
    private _fs: FormSchemaManager,
    private _fst: FormStatusManager,
    private _rendererService: AjfFormRendererService,
    private _location: Location,
    private _udm: UserDataManager,
    readonly snackbar: MatSnackBar,
    readonly metricsService: MetricsService,
    readonly uploadService: FileUploadService,
  ) {}

  /**
   * Saves the form
   */
  saveForm() {
    this._saveValidFormSub = this.isAjfFormValid
      .pipe(
        tap(valid => {
          if (valid) {
            this._saveFormEvt.emit();
          } else {
            if (isDevMode()) {
              console.log('Invalid form');
            }
          }
        }),
        take(1),
      )
      .subscribe();

    this._saveValidFormSub.unsubscribe();
  }

  /**
   * Saves the form as draft, without validations
   */
  saveDraft() {
    this._saveFormEvt.emit();
  }

  /**
   * Called whenever the user invokes an action on a row item.
   * @param evt The user action event
   */
  onFormAction(evt: AjfFormActionEvent): void {
    if (evt.action === 'save') {
      this._saveFormEvt.emit(evt);
    }
  }

  ngOnInit() {
    if (this._dataModelManager == null) {
      this._location.back();
      this.snackbar.open('Oops! Something went wrong opening the form', 'ERROR', {duration: 5000});
      throw new Error('No Data manager was provided');
    }

    this._isFormData = this._route.data.pipe(
      map(data => data['isFormData']),
      filter(isFormData => isFormData != null),
      shareReplay(1),
    );

    this._formSchemaId = this._route.params.pipe(
      map(params => params['form_schema_id']),
      filter(id => id != null),
      shareReplay(1),
    );

    this._formSchema = this._formSchemaId.pipe(
      map(schemaId =>
        this._fs.get(schemaId).pipe(
          map(doc => {
            if (doc == null) {
              return null;
            }
            const item = this._populateDocRefs(doc);
            return item;
          }),
        ),
      ),
      switchMap(schema => schema as Observable<FormSchema>),
      shareReplay(1),
    );

    this._isPipeline = combineLatest([this._formSchema, this._pipelineSchemas]).pipe(
      map(([schema, pipelines]) => pipelines.includes(schema.name)),
    );

    this._formSchemaStatuses = this._formSchema.pipe(
      switchMap(schema => {
        if (schema == null || !schema['form_status_ref_id']?.length) {
          return obsOf([]);
        }
        return this._fst.query({selector: {id: {$in: schema['form_status_ref_id']}}}).pipe(
          map(statuses => {
            return statuses.sort((a, b) => (a.status_level > b.status_level ? 1 : -1));
          }),
        );
      }),
    );

    this._formSchemaDeps = this._formSchema.pipe(
      map(fschema =>
        (fschema as any)['form_schema_deps'].pipe(
          map((doc: RxDocument<FormSchemaDeps>) => {
            if (doc == null) {
              return null;
            }
            return doc.toJSON();
          }),
        ),
      ),
      switchMap(fschemadeps => fschemadeps as Observable<FormSchemaDeps>),
      shareReplay(1),
    );

    combineLatest([this._formSchemaDeps, this.metricChanges])
      .pipe(
        withLatestFrom(this._rendererService.formGroup),
        map(([[fschemadeps, metricSel], formGroup]) => {
          let metricsCtx: {[key: string]: any} = {};

          if (fschemadeps && formGroup) {
            if (metricSel != null) {
              Object.keys(metricSel).forEach(metricName => {
                if (metricSel[metricName]) {
                  for (let prop in metricSel[metricName]) {
                    if (!this._dinoBaseModelFields.includes(prop)) {
                      metricsCtx[`${metricName}_${prop}`] = (
                        metricSel[metricName] as {[key: string]: any}
                      )[prop];
                    }
                  }
                }
              });
              if (Object.keys(metricsCtx).length) {
                formGroup.patchValue(metricsCtx);
                formGroup.setControl('dino_form_metrics', new FormControl(metricsCtx));
              }
            }

            if (fschemadeps.deps_origin) {
              const extFormDataObs = this._getExternalFormData(fschemadeps, metricSel);

              let extFormDataRes: Observable<RxDocument<FormData>[][] | null> = obsOf(null);
              if (extFormDataObs.length) {
                extFormDataRes = forkJoin(extFormDataObs).pipe(
                  map((extDatas: RxDocument<FormData>[][]) => {
                    return extDatas;
                  }),
                );
              }
              return extFormDataRes;
            }
          }
          return obsOf(null);
        }),
        switchMap(data => {
          return data;
        }),
        shareReplay(1),
        withLatestFrom(this._rendererService.formGroup, this._formSchemaDeps, this._formSchema),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe(([changes, formGroup, fschemadeps, fschema]) => {
        if (fschemadeps && fschemadeps.deps_origin && changes) {
          const newChoicesOrigins: AjfChoicesOrigin<string>[] = [];
          const newFormSchema: FormSchema = deepCopy(fschema);
          let extCtx: {[key: string]: any} = {};

          if (changes.length) {
            let extDocsIdx = 0;
            fschemadeps.deps_origin.forEach(depsOrigin => {
              if (
                depsOrigin.form_schema_ref_id &&
                depsOrigin.fields_to_update &&
                depsOrigin.fields_to_update.length &&
                changes.length > extDocsIdx
              ) {
                if (depsOrigin.is_choice) {
                  const field = depsOrigin.fields_to_update[0];
                  const choicesOriginName = field + '_choice';
                  newChoicesOrigins.push({
                    type: 'fixed',
                    name: choicesOriginName,
                    label: choicesOriginName,
                    choices: this._getChoicesFromDocs(field, changes[extDocsIdx]),
                  });
                } else {
                  if (changes[extDocsIdx] !== null && changes[extDocsIdx].length) {
                    const extFormData = changes[extDocsIdx][0].toJSON();
                    depsOrigin.fields_to_update.forEach(field => {
                      extCtx[field] = null;
                      if (field in extFormData.data) {
                        extCtx[field] = extFormData.data[field];
                      } else if (field + '__0' in extFormData.data) {
                        const choicesOriginName = field + '_choice';
                        newChoicesOrigins.push({
                          type: 'fixed',
                          name: choicesOriginName,
                          label: choicesOriginName,
                          choices: this._getChoicesFromFieldReps(field, extFormData.data),
                        });
                      }
                    });
                  }
                }
                extDocsIdx++;
              }
            });
          }

          if (formGroup && formGroup.value) {
            if (newChoicesOrigins.length) {
              this._addChoiceOriginToFormSchema(newFormSchema, newChoicesOrigins, {
                ...formGroup.value,
                ...extCtx,
              });
            } else if (Object.keys(extCtx).length) {
              formGroup.patchValue(extCtx);
            }
          }
        }
      });

    this._formStatuses = this._formSchema.pipe(
      switchMap(schema => this._fst.formStatusesOfSchema(schema)),
    );

    this._form = combineLatest([this._formSchema, this.formChanges]).pipe(
      map(([fschema, schemaChanges]) => {
        if (schemaChanges) {
          return schemaChanges;
        }
        if (fschema == null) {
          this._location.back();
          this.snackbar.open('Oops! We could not find this Form Schema', 'FORM NOT FOUND', {
            duration: 5000,
          });
          return AjfFormSerializer.fromJson({});
        }
        if (fschema.schema.choicesOrigins == null) {
          fschema.schema.choicesOrigins = [];
        }
        return AjfFormSerializer.fromJson(fschema.schema);
      }),
      shareReplay(1),
    );
  }

  ngAfterViewInit() {
    this._formMetricsSelector = this.metricsService.hasActiveMetrics.pipe(
      switchMap(active => {
        if (!active) {
          return obsOf(null);
        }
        return this.formMetricsSelectorComponent.changes.pipe(
          map((comps: QueryList<FormMetricSelector>) => comps.first),
        );
      }),
    );

    this._formMetricsSelector
      .pipe(
        switchMap(fsm =>
          fsm != null
            ? fsm.formDate.valueChanges.pipe(startWith(fsm != null ? fsm.formDate.value : null))
            : obsOf(null),
        ),
        withLatestFrom(this._rendererService.formGroup),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe(([frDate, frGroup]) => {
        if (frGroup != null && frDate != null && frDate.created_at != null) {
          const dinoFormInfo = {
            createdAt: frDate.created_at,
          };
          frGroup.setControl('dino_form_info', new FormControl(dinoFormInfo));
        }
      });

    this._formMetricsSelector
      .pipe(
        map(fmSelector => {
          if (fmSelector != null) {
            return fmSelector.selectedMetricsChanges.pipe(
              withLatestFrom(this._formSchemaDeps),
              map(([metricSel, fschemadeps]) => {
                if (fschemadeps && fschemadeps.metric_data_to_show) {
                  let setNextMetricValue = false;
                  const requiredMetrics = this.metricChanges.getValue() || {};
                  Object.keys(metricSel).forEach(metricName => {
                    if (
                      metricSel[metricName] &&
                      isRxDocument(metricSel[metricName]) &&
                      fschemadeps.metric_data_to_show &&
                      fschemadeps.metric_data_to_show.includes(metricName)
                    ) {
                      const metricProps = metricSel[metricName].toJSON();
                      if (
                        !(metricName in requiredMetrics) ||
                        (metricName in requiredMetrics &&
                          requiredMetrics[metricName].id !== metricProps.id)
                      ) {
                        requiredMetrics[metricName] = metricProps;
                        setNextMetricValue = true;
                      }
                    }
                  });
                  if (setNextMetricValue) {
                    this.metricChanges.next(requiredMetrics);
                  }
                }
                return metricSel;
              }),
              distinctUntilChanged((x, y) => {
                return JSON.stringify(x).localeCompare(JSON.stringify(y)) === 0;
              }),
            );
          } else {
            return obsOf(null);
          }
        }),
        switchMap(data => data as Observable<{[key: string]: Metric}>),
        shareReplay(1),
      )
      .subscribe();

    this._saveFormEvt
      .pipe(
        withLatestFrom(this._nss.isOnline$),
        switchMap(([_, isOnline]) => {
          const fValue = this._rendererService.getFormValue();
          delete fValue['dino_form_info'];
          delete fValue['dino_form_metrics'];
          const formObj = {
            formValue: fValue,
          };
          const apiCall: Observable<any>[] = [];
          const {filesToUpload} = this.uploadService.getFilesInForm(formObj.formValue);
          if (filesToUpload && filesToUpload.length) {
            if (!isOnline) {
              if (!this.offlineFileUpload) {
                this.snackbar.open('You are offline. The files will not be uploaded', 'WARNING', {
                  duration: 5000,
                });
                let formValue = {...formObj.formValue};
                formValue = this.uploadService.removeAllFiles(formValue);
                formObj.formValue = {...formValue};
              }
              apiCall.push(obsOf(formObj));
            } else {
              apiCall.push(obsOf(formObj));
              const uploadedFilesObs = this.uploadService.uploadFiles(filesToUpload);
              apiCall.push(...uploadedFilesObs);
              this.snackbar.open('Wait until uploading documents...', 'WAIT', {
                duration: 5000,
              });
            }
          } else {
            apiCall.push(obsOf(formObj));
          }
          this.isLoading.next(true);
          return zip(apiCall);
        }),
        withLatestFrom(
          this._isFormData,
          this._formSchemaId,
          this._formMetricsSelector,
          this._udm.getActiveUserData(),
          this._formStatuses,
        ),
        switchMap(
          ([res, isFormData, formSchemaId, formMetricsSelector, userData, formStatuses]) => {
            this.isLoading.next(false);
            if (res.length) {
              const formObj = res[0];
              let formValue = {...formObj.formValue};
              if (res.length > 1) {
                for (let i = 1; i < res.length; i++) {
                  formValue = this.uploadService.replaceUploadedFile(
                    formValue,
                    res[i] as StorageUploadResponse,
                  );
                }
              }
              let newItem: {[key: string]: any} = {};
              if (isFormData) {
                const defaultFormStatus: string | null =
                  formStatuses && formStatuses.length
                    ? formStatuses.reduce((prev, curr) =>
                        prev.status_level < curr.status_level ? prev : curr,
                      ).id
                    : null;
                newItem['data'] = formValue;
                newItem['form_schema_ref_id'] = formSchemaId;
                newItem['user_data_ref_id'] = userData?.id;
                newItem['form_status_ref_id'] = defaultFormStatus;
                newItem['area_ref_id'] = null;
                newItem['case_ref_id'] = null;
                newItem['location_ref_id'] = null;
                newItem['organization_ref_id'] = null;
                newItem['project_ref_id'] = null;
                if (formMetricsSelector != null) {
                  const selectedMetrics = formMetricsSelector.selectedMetrics;
                  const creationDate = formMetricsSelector.formDate.value.created_at;
                  for (let key of Object.keys(selectedMetrics)) {
                    const saveKey = `${key}_ref_id`;
                    if (selectedMetrics[key].id != null) {
                      newItem[saveKey] = selectedMetrics[key].id;
                    }
                  }

                  let formattedDate = creationDate;
                  if (creationDate && typeof creationDate === 'object') {
                    const dateFmt = 'yyyy-MM-dd';
                    try {
                      formattedDate = format(creationDate, dateFmt);
                    } catch (e) {}
                  }
                  newItem['created_at'] = formattedDate;
                }
              } else {
                newItem['data'].data = formValue;
                newItem['data'].form_schema_ref_id = formSchemaId;
                newItem['data'].user_data_ref_id = userData?.id;
              }

              if (this._dataModelManager == null) {
                return throwError(() => new Error('No data model manager'));
              }
              return this._dataModelManager.create(newItem as T).pipe(
                tap(fd => {
                  if (fd && fd.collection.name === 'form_data') {
                    const trigData: ActionTriggerData<T> = {doc: fd};
                    const trigger: ActionTrigger<T> = {
                      name: 'Form Data Created',
                      triggerType: 'on_form_data_creation',
                      triggerData: trigData,
                    };
                    this.emitActionTrigger.emit(trigger);
                  }
                }),
              );
            } else {
              return throwError(() => new Error('No data found'));
            }
          },
        ),
        catchError(err => {
          this.isLoading.next(false);
          if (isDevMode()) {
            console.log(err);
          }
          this._location.back();
          this.snackbar.open(err, 'ERROR', {duration: 5000});
          return obsOf(err);
        }),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe(_ => {
        this.isLoading.next(false);
        this._location.back();
        this.snackbar.open('Document created', 'SAVE', {duration: 5000});
      });

    this.isAjfFormValid = this._rendererService.formInitEvent.pipe(
      switchMap(() =>
        this._rendererService.errors.pipe(
          map((errors: number) => errors === 0),
          shareReplay(1),
        ),
      ),
      shareReplay(1),
    );

    this.isFormMetricsSelectorValid = this._formMetricsSelector.pipe(
      switchMap(formMetricsSelector => {
        if (formMetricsSelector == null) {
          return obsOf(false);
        }
        return formMetricsSelector.formMetrics.statusChanges.pipe(
          startWith(true),
          switchMap(() => formMetricsSelector.isFormMetricsValid()),
        );
      }),
    );
  }

  ngOnDestroy() {
    this._mainUnsubscribe.next();
    this._mainUnsubscribe.complete();

    this._saveValidFormSub.unsubscribe();
    this._saveFormEvt.complete();
  }

  /**
   * Populates all references to external collections in RxDocument
   * @param doc RxDocument
   * @returns The document with populated refs
   */
  private _populateDocRefs(doc: RxDocument<FormSchema>): RxDocument<FormSchema> {
    let refProps = {};
    for (let prop in doc) {
      if (prop.includes('_ref_id')) {
        const propKey = prop.replace('_ref_id', '') as keyof RxDocument<T>;
        let refProp;
        try {
          refProp = {
            [propKey]: from(doc.populate(prop)).pipe(shareReplay(1)),
          };
        } catch (e) {
          refProp = {[propKey]: obsOf(null)};
        }
        refProps = {...refProps, ...refProp};
      }
    }
    const popDoc = {...deepCopy(doc), ...refProps} as RxDocument<FormSchema>;
    return popDoc;
  }

  /**
   *
   * @param fschemadeps The Ajf form schema dependencies info
   * @param metricSel The selected metrics
   * @returns An array of observable with queries for the external form data
   */
  private _getExternalFormData(
    fschemadeps: FormSchemaDeps,
    metricSel: {
      [key: string]: Metric;
    } | null,
  ): Observable<any>[] {
    const extFormDataObs: Observable<any>[] = [];
    if (fschemadeps.deps_origin) {
      const activeMetrics = this.metricsService.activeMetrics.value.map(
        metric => metric.metricName,
      );
      const dmm = this._dataModelManager as DataModelManager<T>;
      fschemadeps.deps_origin.forEach(depsOrigin => {
        if (
          depsOrigin.form_schema_ref_id &&
          depsOrigin.fields_to_update &&
          depsOrigin.fields_to_update.length
        ) {
          let missingMetric = false;
          const opt: DataQueryOptions = {
            selector: {
              form_schema_ref_id: {$eq: depsOrigin.form_schema_ref_id},
              is_deleted: {$ne: true},
            },
            sort: [{created_at: 'desc'}],
          };
          if (!depsOrigin.is_choice) {
            opt['limit'] = 1;
          }

          if (depsOrigin.filter_by_metric) {
            depsOrigin.filter_by_metric.forEach(metric => {
              if (activeMetrics.includes(metric) && metricSel && metricSel[metric]) {
                opt['selector'][metric + '_ref_id'] = {
                  $eq: metricSel[metric].id,
                };
              } else {
                missingMetric = true;
              }
            });
          }

          if (!missingMetric) {
            const query = dmm.query(opt).pipe(
              take(1),
              catchError(err => throwError(() => err) as Observable<RxDocument<T, {}>[]>),
            );
            extFormDataObs.push(query);
          }
        }
      });
    }
    return extFormDataObs;
  }

  /**
   * Add new dynamic choices origins to form schema
   * @param formSchema the form schema to update
   * @param newChoicesOrigins
   * @param ctx the context for the form
   */
  private _addChoiceOriginToFormSchema(
    formSchema: FormSchema,
    newChoicesOrigins: AjfChoicesOrigin<string>[],
    ctx: {[key: string]: any},
  ): void {
    formSchema.schema.choicesOrigins = formSchema.schema.choicesOrigins ?? [];
    if (newChoicesOrigins.length) {
      newChoicesOrigins.forEach(choice => {
        formSchema.schema.choicesOrigins = formSchema.schema.choicesOrigins ?? [];
        formSchema.schema.choicesOrigins = formSchema.schema.choicesOrigins.filter(
          (c: any) => c.name !== choice.name,
        );
      });

      formSchema.schema.choicesOrigins = formSchema.schema.choicesOrigins.concat(newChoicesOrigins);
      this.formChanges.next(AjfFormSerializer.fromJson(formSchema.schema, ctx));
    }
  }

  private _getChoicesFromFieldReps(
    fieldName: string,
    ctx: {[key: string]: any},
  ): AjfChoice<string>[] {
    const choices: AjfChoice<string>[] = [];
    Object.keys(ctx).map(key => {
      if (key.indexOf(fieldName + '__') > -1) {
        if (ctx[key] != null) {
          choices.push({
            label: ctx[key],
            value: ctx[key],
          });
        }
      }
    });
    return choices;
  }

  private _getChoicesFromDocs(
    fieldName: string,
    docs: RxDocument<FormData>[],
  ): AjfChoice<string>[] {
    const choices: AjfChoice<string>[] = [];
    docs.forEach(doc => {
      const extFormData = doc.toJSON();
      if (fieldName in extFormData.data && extFormData.data[fieldName] != null) {
        choices.push({
          label: extFormData.data[fieldName],
          value: extFormData.data[fieldName],
        });
      }
    });
    return choices.sort((c1, c2) => c1.label.localeCompare(c2.label));
  }
}
