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
  AjfChoicesOrigin,
  AjfForm,
  AjfFormActionEvent,
  AjfFormRenderer,
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
import {
  ActionTrigger,
  ActionTriggerData,
  DataModelManager,
  Metric,
  MetricsService,
  Model,
  populateDocRefs,
} from '@dino/core/data';
import {
  DepsOrigin,
  FormSchema,
  FormSchemaDeps,
  FormSchemaManager,
  FormStatus,
  FormStatusManager,
} from '@dino/core/forms';
import {FormMetricSelector} from '@dino/material/form-metric-selector';
import {format} from 'date-fns';
import {isRxDocument, RxDocument} from 'rxdb';
import {NetworkStatusService} from '@dino/core/auth';
import {FileUploadService, StorageUploadResponse} from '@dino/core/file-upload';

import {
  BehaviorSubject,
  combineLatest,
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
import {UserDataManager, UserGroupManager} from '@dino/core/users';
import {UntypedFormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {TranslocoService} from '@ngneat/transloco';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';

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
   * If true, the content of the Ajf Form Fields is centered
   */
  @Input() centeredFieldsContent: boolean = false;

  /**
   * The max number of columns on which the Ajf Form Fields are spread
   */
  @Input() maxColumns: 1 | 2 | 3 = 1;

  /**
   * Metrics of the types specified in the array can be created directly from the metric fields
   */
  @Input() allowMetricCreationFor: string[] = ['all'];

  /**
   * If true, Forms can be saved as drafts, bypassing validation.
   */
  @Input() allowSaveDraft: boolean = false;

  /**
   * Secondary metric field to display in the Form Metric Selector and Filters
   */
  private _secondaryMetricFieldsDisplayed: {
    [metricName: string]: string;
  } | null = null;
  get secondaryMetricFieldsDisplayed(): {
    [metricName: string]: string;
  } | null {
    return this._secondaryMetricFieldsDisplayed;
  }
  @Input()
  set secondaryMetricFieldsDisplayed(
    fields: {
      [metricName: string]: string;
    } | null,
  ) {
    this._secondaryMetricFieldsDisplayed = fields;
  }

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
   * True if the Save button should be disabled
   */
  isSaveDisabled: Observable<boolean> = obsOf(false);

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
  private _formSchemaStatuses: Observable<FormStatus[] | null> = obsOf([]);
  get formSchemaStatuses(): Observable<FormStatus[] | null> {
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
   * Extra form control (dino_form_info and dino_form_metrics) to be added to the form group
   */
  private _extraFormControls: {[key: string]: {[key: string]: any}} = {};

  /**
   * True if a Form Data of this schema, with the same set of metrics already exists.
   */
  private _uniqueMetricsSetAlreadyExists: Observable<boolean> = obsOf(false);
  get uniqueMetricsSetAlreadyExists(): Observable<boolean> {
    return this._uniqueMetricsSetAlreadyExists;
  }

  /**
   * Set the extra form control to add to the form group
   */
  readonly setFormControls: BehaviorSubject<{[key: string]: {[key: string]: any}} | null> =
    new BehaviorSubject<{[key: string]: {[key: string]: any}} | null>(null);

  /**
   * The loading state of the upload file
   */
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * True if form is initialized
   */
  isFormInizialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    private _ugm: UserGroupManager,
    private _ehms: ErrorHandlerMessageService,
    private _ts: TranslocoService,
    readonly snackbar: MatSnackBar,
    readonly metricsService: MetricsService,
    readonly uploadService: FileUploadService,
  ) {
    this.isFormInizialized.next(false);
  }

  /**
   * Triggers the Stepper to move forward to the Form Data step.
   */
  goToFormDataStep(stepper: MatStepper) {
    stepper.next();
  }

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
    const evt: AjfFormActionEvent = {
      source: null as unknown as AjfFormRenderer,
      value: {},
      action: 'draft',
    };
    this._saveFormEvt.emit(evt);
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
            const item = populateDocRefs<FormSchema>(doc);
            return item;
          }),
        ),
      ),
      switchMap(schema => schema as Observable<FormSchema>),
      shareReplay(1),
    );

    this._isPipeline = combineLatest([this._formSchema, this._pipelineSchemas]).pipe(
      map(([schema, pipelines]) => pipelines.includes(schema.name)),
      shareReplay(1),
    );

    this._formSchemaStatuses = this._formSchema.pipe(
      switchMap(schema => this._fst.formStatusesOfSchema(schema)),
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

    combineLatest([this._formSchemaDeps, this.metricChanges, this.isFormInizialized])
      .pipe(
        withLatestFrom(this._rendererService.formGroup),
        map(([[fschemadeps, metricSel, isFormInizializedVal], formGroup]) => {
          let metricsCtx: {[key: string]: any} = {};
          if (isFormInizializedVal && fschemadeps && formGroup) {
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
                this._extraFormControls['dino_form_metrics'] = metricsCtx;
                this._fs.setNewControlsInForm(formGroup, this._extraFormControls);
              }
            }

            if (fschemadeps.deps_origin) {
              const extFormDataRes = this._fs.getExternalFormData(fschemadeps, false, metricSel);

              const metricsChoicesOrigin = (fschemadeps.deps_origin as DepsOrigin[]).find(
                deps => deps.metrics_choices_origin != null && deps.metrics_choices_origin.length,
              );
              const metricOptSource = this._fs.getAllFormMetricsByTypes(
                metricsChoicesOrigin?.metrics_choices_origin,
              );
              return zip(extFormDataRes, metricOptSource);
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
      .subscribe(([originData, formGroup, fschemadeps, fschema]) => {
        if (fschemadeps && fschemadeps.deps_origin && originData) {
          const changes = originData[0];
          const metricsOrigin = originData[1] as RxDocument<Metric, {}>[][];

          const newChoicesOrigins: AjfChoicesOrigin<string>[] = [];
          const newFormSchema: FormSchema = deepCopy(fschema);
          let extCtx: {[key: string]: any} = {};

          let extDocsIdx = 0;
          fschemadeps.deps_origin.forEach(depsOrigin => {
            if (
              depsOrigin.form_schema_ref_id &&
              depsOrigin.fields_to_update &&
              depsOrigin.fields_to_update.length
            ) {
              if (depsOrigin.is_choice) {
                const field = depsOrigin.fields_to_update[0];
                const choicesOriginName = field + '_choice';
                const formDataForChoices =
                  changes && changes.length > extDocsIdx ? changes[extDocsIdx] : null;
                newChoicesOrigins.push({
                  type: 'fixed',
                  name: choicesOriginName,
                  label: choicesOriginName,
                  choices: this._fs.getChoicesFromDocs(depsOrigin, formDataForChoices),
                });
              } else {
                const extFormData =
                  changes && changes[extDocsIdx] !== null && changes[extDocsIdx].length
                    ? changes[extDocsIdx][0].toJSON().data
                    : null;

                depsOrigin.fields_to_update.forEach(field => {
                  extCtx[field] = null;
                  const choicesOriginName = field + '_choice';

                  const hasChoiceField = this._fs.findFieldsWithChoicesByChoicesName(
                    newFormSchema,
                    choicesOriginName,
                    false,
                  );

                  if (extFormData && field in extFormData) {
                    extCtx[field] = extFormData[field];
                  } else if ((extFormData && field + '__0' in extFormData) || hasChoiceField) {
                    newChoicesOrigins.push({
                      type: 'fixed',
                      name: choicesOriginName,
                      label: choicesOriginName,
                      choices: this._fs.getChoicesFromFieldReps(field, extFormData),
                    });
                  }
                });
              }
              extDocsIdx++;
            }
          });

          if (metricsOrigin && metricsOrigin.length) {
            metricsOrigin.forEach(metricOrigin => {
              if (metricOrigin.length) {
                const choicesOriginName = metricOrigin[0].collection.name + '_metric_choice';
                newChoicesOrigins.push({
                  type: 'fixed',
                  name: choicesOriginName,
                  label: choicesOriginName,
                  choices: this._fs.getChoicesFromMetrics(
                    metricOrigin,
                    metricOrigin[0].collection.name,
                  ),
                });
              }
            });
          }

          if (formGroup && formGroup.value) {
            if (newChoicesOrigins.length) {
              const schemaWithNewChoices = this._fs.addChoiceOriginToFormSchema(
                newFormSchema,
                newChoicesOrigins,
              );
              if (schemaWithNewChoices) {
                const ajfFormSerialized = AjfFormSerializer.fromJson(schemaWithNewChoices.schema, {
                  ...formGroup.value,
                  ...extCtx,
                });
                this.formChanges.next(ajfFormSerialized);
              }
            } else if (Object.keys(extCtx).length) {
              formGroup.patchValue(extCtx);
            }
          }
        }
      });

    this._form = combineLatest([
      this._formSchema,
      this.formChanges,
      this._udm.getActiveUserData(),
      this._ugm.getActiveUserGroups(),
    ]).pipe(
      map(([fschema, schemaChanges, activeUser, activeUserGroups]) => {
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
        const dinoFormInfo = {
          activeUser,
          activeUserGroups,
        };
        this._extraFormControls['dino_form_info'] = dinoFormInfo;
        const fdata = {dino_form_info: dinoFormInfo};
        return AjfFormSerializer.fromJson(fschema.schema, fdata);
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

    combineLatest([
      this._rendererService.formGroup,
      this._udm.getActiveUserData(),
      this._ugm.getActiveUserGroups(),
      this._formMetricsSelector.pipe(
        switchMap(fsm =>
          fsm != null
            ? fsm.formDate.valueChanges.pipe(startWith(fsm != null ? fsm.formDate.value : null))
            : obsOf(null),
        ),
      ),
    ])
      .pipe(withLatestFrom(this.isFormInizialized), takeUntil(this._mainUnsubscribe))
      .subscribe(([[frGroup, activeUser, activeUserGroups, frDate], _]) => {
        if (frGroup != null && frDate != null && frDate.created_at != null) {
          // User changes the createdAt date in metrics tab
          const dinoFormInfo = {
            activeUser,
            activeUserGroups,
            createdAt: frDate.created_at,
          };
          this._extraFormControls['dino_form_info'] = dinoFormInfo;
          this._fs.setNewControlsInForm(frGroup, this._extraFormControls);
        }
      });

    this._uniqueMetricsSetAlreadyExists = combineLatest([
      this._formSchema,
      this._formMetricsSelector.pipe(
        switchMap(fmSelector => fmSelector?.selectedMetricsChanges ?? obsOf(null)),
      ),
    ]).pipe(
      switchMap(([fschema, fsmChanges]) => {
        if (!fschema.schema.uniqueMetricsSet || fsmChanges == null) {
          return obsOf(false);
        }
        const querySelectorObj: {[key: string]: {$eq: string}} = {};
        for (let key in fsmChanges) {
          if (
            !fschema.form_schema_metrics?.length ||
            (fschema.form_schema_metrics && fschema.form_schema_metrics.includes(key))
          ) {
            querySelectorObj[`${key}_ref_id`] = {$eq: fsmChanges[key].option?.id ?? null};
          }
        }
        if (Object.keys(querySelectorObj).length === 0 || !this._dataModelManager) {
          return obsOf(false);
        }
        const selector = {form_schema_ref_id: {$eq: fschema.id}, ...querySelectorObj};
        return this._dataModelManager.query({selector}).pipe(map(docs => docs.length > 0));
      }),
      shareReplay(1),
    );

    this._uniqueMetricsSetAlreadyExists
      .pipe(
        filter(exists => exists),
        withLatestFrom(this._formMetricsSelector, this._formSchema),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe(([_, fms, schema]) => {
        if (fms && fms.formMetrics) {
          fms.formMetrics.setErrors({uniqueMetricsSetAlreadyExists: true});
        }
        this.snackbar.open(
          this._ts.translate(
            `A {{schema_name}} Form with this exact set of Metrics already exists. Please choose different Metrics`,
            {schema_name: `"${schema.name}"`},
          ),
          this._ts.translate('UNIQUE FORM ALREADY EXISTS'),
          {duration: 10000},
        );
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
                      isRxDocument(metricSel[metricName].option) &&
                      fschemadeps.metric_data_to_show &&
                      fschemadeps.metric_data_to_show.includes(metricName)
                    ) {
                      const metricProps = metricSel[metricName].option.toJSON();
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
                    // Set new metrics values required for relationships
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
        switchMap(data => data),
        shareReplay(1),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe();

    this._saveFormEvt
      .pipe(
        withLatestFrom(this._nss.isOnline$),
        switchMap(([evt, isOnline]) => {
          const fValue = this._rendererService.getFormValue();
          delete fValue['dino_form_info'];
          delete fValue['dino_form_metrics'];
          const formObj = {
            formValue: fValue,
            evt: evt && evt.action ? evt.action : null,
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
          this._formSchemaStatuses,
        ),
        switchMap(
          ([res, isFormData, formSchemaId, formMetricsSelector, userData, formStatuses]) => {
            this.isLoading.next(false);
            if (res.length) {
              const formObj = res[0];
              let formValue = {...formObj.formValue};
              if (formObj.evt && formObj.evt === 'draft') {
                formValue['$invalid'] = true;
              }
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
                let defaultFormStatus: string | null =
                  formStatuses && formStatuses.length
                    ? formStatuses.reduce((prev, curr) =>
                        prev.status_level < curr.status_level ? prev : curr,
                      ).id
                    : null;
                if (formObj.evt && formObj.evt === 'draft') {
                  defaultFormStatus = null;
                }
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
                    if (
                      selectedMetrics[key] != null &&
                      selectedMetrics[key].option != null &&
                      selectedMetrics[key].option.id != null
                    ) {
                      newItem[saveKey] = selectedMetrics[key].option.id;
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
              return this._dataModelManager
                .create(newItem as T)
                .pipe(
                  withLatestFrom(
                    this._udm.getActiveUserData(),
                    this._ugm.getActiveUserGroups(),
                    obsOf(formObj),
                  ),
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
          this._ehms.captureErrorMessage(`Could not create form: ${JSON.stringify(err)}`, 'error');
          this._location.back();
          this.snackbar.open(err, 'ERROR', {duration: 5000});
          return obsOf([null, null]);
        }),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe(([fd, activeUser, activeUserGroups, formObj]) => {
        if (fd && fd.collection.name === 'form_data') {
          this.isLoading.next(false);
          this._location.back();
          this.snackbar.open('Document created', 'SAVE', {duration: 5000});
          if (formObj.evt != 'draft') {
            const trigData: ActionTriggerData<T> = {
              doc: fd,
              additional_info: {
                activeUser,
                activeUserGroups,
              },
            };
            const trigger: ActionTrigger<T> = {
              name: 'Form Data Created',
              triggerType: 'on_form_data_creation',
              triggerData: trigData,
            };
            this.emitActionTrigger.emit(trigger);
          }
        }
      });

    this.isAjfFormValid = this._rendererService.formInitEvent.pipe(
      switchMap(_ => {
        return this._rendererService.errors.pipe(
          map((errors: number) => errors === 0),
          shareReplay(1),
        );
      }),
      shareReplay(1),
    );

    this._rendererService.formInitEvent
      .pipe(
        withLatestFrom(this._rendererService.formGroup),
        map(([fdStatus, formGroup]) => {
          if (fdStatus === 1) {
            // Re-set dino_form_info and dino_form_metrics each time the renderer service has finished rendering a form
            this._fs.setNewControlsInForm(formGroup, this._extraFormControls);
            if (!this.isFormInizialized.value) {
              this.isFormInizialized.next(true);
            }
          }
        }),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe();

    this.isSaveDisabled = combineLatest([
      this.isAjfFormValid,
      this._uniqueMetricsSetAlreadyExists,
    ]).pipe(
      map(([ajfValid, uniqueExists]) => ajfValid === false || uniqueExists === true),
      shareReplay(1),
    );

    this.isFormMetricsSelectorValid = combineLatest([
      this._formMetricsSelector,
      this._uniqueMetricsSetAlreadyExists,
    ]).pipe(
      switchMap(([formMetricsSelector, uniqueExists]) => {
        if (formMetricsSelector == null || uniqueExists) {
          return obsOf(false);
        }
        return formMetricsSelector.formMetrics.statusChanges.pipe(
          startWith(true),
          switchMap(() => formMetricsSelector.isFormMetricsValid()),
        );
      }),
    );
  }

  /**
   * Reset to null all additional control added in formgroup
   * @param formGroup
   * @param formControls
   */
  private _removeControlsInForm(
    formGroup: UntypedFormGroup | null,
    formControls: {[key: string]: {[key: string]: any}},
  ): void {
    if (formGroup && formControls && Object.keys(formControls).length) {
      const patchValEmpty: {[key: string]: any} = {};
      Object.keys(formControls).forEach(fcName => {
        patchValEmpty[fcName] = null;
      });
      formGroup.patchValue(patchValEmpty);
    }
  }

  ngOnDestroy() {
    this._mainUnsubscribe.next();
    this._mainUnsubscribe.complete();

    this._saveValidFormSub.unsubscribe();
    this._saveFormEvt.complete();
  }
}
