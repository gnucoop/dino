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
import {AjfFile} from '@ajf/core/file-input';
import {
  AjfChoicesOrigin,
  AjfForm,
  AjfFormActionEvent,
  AjfFormRenderer,
  AjfFormRendererService,
  AjfFormSerializer,
  AjfSlideInstance,
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
  FormData,
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
import {TranslocoService} from '@ngneat/transloco';

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
  throttleTime,
  withLatestFrom,
} from 'rxjs/operators';
import {UserData, UserDataManager, UserGroup, UserGroupManager} from '@dino/core/users';
import {UntypedFormGroup} from '@angular/forms';
import {MatStepper} from '@angular/material/stepper';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';

/**
 * The Form Edit component.
 * Forms' data can be viewed or edited and saved here.
 * The form is rendered by the Ajf AjfFormRenderer
 */
@Component({
  selector: 'dino-edit-form',
  styleUrls: ['edit-form.scss'],
  templateUrl: 'edit-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditForm<T extends Model = Model> implements AfterViewInit, OnInit, OnDestroy {
  /**
   * The Ajf Form Renderer
   */
  @ViewChildren('ajfFormRenderer') formRenderers?: QueryList<AjfFormRenderer>;
  private _formRenderer: BehaviorSubject<AjfFormRenderer | null> =
    new BehaviorSubject<AjfFormRenderer | null>(null);
  get formRenderer(): Observable<AjfFormRenderer | null> {
    return this._formRenderer.asObservable();
  }

  /**
   * The Form Metrics Selector
   */
  @ViewChildren(FormMetricSelector)
  formMetricsSelectorComponent!: QueryList<FormMetricSelector>;

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
   * The Form data id
   */
  readonly formId: Observable<string>;

  /**
   * True if the form is in readonly mode
   */
  readonly isView: Observable<boolean>;

  /**
   * True if the form has a parent (is in a nested details list row)
   */
  readonly isDetails: Observable<boolean>;

  /**
   * The Form Metric Selector
   */
  private _formMetricsSelector: Observable<FormMetricSelector | null> = obsOf(null);

  /**
   * The current document object
   */
  private _currentDoc: Subject<T> = new Subject<T>();

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
   * The Ajf Form Renderer slide instances
   */
  private _slides: Observable<AjfSlideInstance[] | null> = obsOf(null);
  get slides(): Observable<AjfSlideInstance[] | null> {
    return this._slides;
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
   * The Form data current status
   */
  private _formDataStatus: Observable<FormStatus | null> = obsOf(null);
  get formDataStatus(): Observable<FormStatus | null> {
    return this._formDataStatus;
  }

  /**
   * The Form data creator userdata
   */
  private _formDataUser: Observable<UserData | null> = obsOf(null);
  get formDataUser(): Observable<UserData | null> {
    return this._formDataUser;
  }

  /**
   * The Form data creator permission groups
   */
  private _formDataUserGroups: Observable<UserGroup[] | null> = obsOf(null);
  get formDataUserGroups(): Observable<UserGroup[] | null> {
    return this._formDataUserGroups;
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
   * The Form data object
   */
  private _formData: Observable<{
    data: FormData;
    schemaId: string;
    userId: string;
    statusId: string | null;
    id: string;
    createdAt: string;
  }> = obsOf();
  get formData(): Observable<{
    data: FormData;
    schemaId: string;
    userId: string;
    statusId: string | null;
    id: string;
    createdAt: string;
  }> {
    return this._formData;
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
   * Extra form control (dino_form_info and dino_form_metrics) to be added to the form group
   */
  private _extraFormControls: {[key: string]: {[key: string]: any}} = {};

  /**
   * Set the extra form control to add to the form group
   */
  readonly setFormControls: BehaviorSubject<{[key: string]: {[key: string]: any}} | null> =
    new BehaviorSubject<{[key: string]: {[key: string]: any}} | null>(null);

  /**
   * True if a Form Data of this schema, with the same set of metrics already exists.
   */
  private _uniqueMetricsSetAlreadyExists: Observable<boolean> = obsOf(false);
  get uniqueMetricsSetAlreadyExists(): Observable<boolean> {
    return this._uniqueMetricsSetAlreadyExists;
  }

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
   * Emitted when the Pipeline stepper emits its step position
   */
  private _stepperPositionEvt: EventEmitter<number> = new EventEmitter<number>();

  private _deleteFiles: BehaviorSubject<AjfFile[]> = new BehaviorSubject<AjfFile[]>([]);

  /**
   * Subscribes to the ajf validation state to save the form
   */
  private _saveValidFormSub: Subscription = Subscription.EMPTY;

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
    readonly breakpointObserver: BreakpointObserverService,
  ) {
    this.isFormInizialized.next(false);
    this.formId = this._route.params.pipe(
      map(params => params['form_id']),
      tap(id => {
        if (id == null) {
          this._location.back();
        }
      }),
      filter(id => id != null),
      shareReplay(1),
    );

    this.isView = this._route.data.pipe(
      map(data => {
        if (data != null && data['isView'] != null) {
          return data['isView'];
        }
        return false;
      }),
    );

    this.isDetails = this._route.data.pipe(
      map(data => {
        if (data != null && data['isDetails'] != null) {
          return data['isDetails'];
        }
        return false;
      }),
    );

    this._stepperPositionEvt
      .pipe(takeUntil(this._mainUnsubscribe))
      .subscribe(pos => this.scrollToSlide(pos));
  }

  /**
   * Triggers the Stepper to move forward to the Form Data step.
   */
  goToDataStep(stepper: MatStepper) {
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

  /**
   * Scrolls the ajfForm to the slide at the provided index
   * @param index
   */
  scrollToSlide(index: number): void {
    this._formRenderer.pipe(take(1)).subscribe(frenderer => {
      if (frenderer != null) {
        frenderer.formSlider.slide({to: index});
      }
    });
  }

  ngOnInit() {
    if (this._dataModelManager == null) {
      this._location.back();
      this.snackbar.open('Oops! Something went wrong opening the form', 'ERROR', {duration: 5000});
      throw new Error('No Data manager was provided');
    }

    this._formData = this.formId.pipe(
      withLatestFrom(this.isDetails),
      filter(() => this._dataModelManager != null),
      map(([id, isDetails]) => {
        const dmm = this._dataModelManager as DataModelManager<T>;
        const dm: DataModelManager<T> =
          isDetails && dmm.detailsManager != null ? dmm.detailsManager : dmm;

        return dm.get(id).pipe(
          map(doc => {
            if (doc == null) {
              this._location.back();
              return null;
            }
            const item: {[key: string]: any} = doc.toJSON();
            this._currentDoc.next(item as T);
            if ('data' in item && item['data'] != null) {
              const formDataObj = {
                data: item['data']['data'] ?? item['data'] ?? null,
                schemaId: item['data']['form_schema_ref_id'] ?? item['form_schema_ref_id'] ?? null,
                statusId: item['form_status_ref_id'] ?? null,
                userId: item['user_data_ref_id'],
                id: item['id'],
                createdAt: item['created_at'],
              };
              return formDataObj;
            }
            return null;
          }),
        );
      }),
      switchMap(
        data =>
          data as Observable<{
            data: FormData;
            schemaId: string;
            statusId: string | null;
            userId: string;
            id: string;
            createdAt: string;
          }>,
      ),
      shareReplay(1),
    );

    this._formSchemaId = this._formData.pipe(
      map(formDataObj => formDataObj.schemaId),
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

    this._formDataStatus = combineLatest([this._formData, this._formSchemaStatuses]).pipe(
      map(([formData, statuses]) => {
        if (formData == null || formData.statusId == null || statuses == null) {
          return null;
        }
        return statuses.find(status => status.id == formData.statusId) ?? null;
      }),
      shareReplay(1),
    );

    this._formDataUser = this._formData.pipe(
      switchMap(formData => {
        if (formData == null || !formData.userId) {
          return obsOf(null);
        }
        return this._udm.get(formData.userId);
      }),
      shareReplay(1),
    );

    this._formDataUserGroups = this._formDataUser.pipe(
      switchMap(userData => {
        if (
          userData == null ||
          userData.user_group_ids == null ||
          !userData.user_group_ids.length
        ) {
          return obsOf(null);
        }
        return this._ugm.query({
          selector: {id: {$in: userData.user_group_ids}},
        });
      }),
      shareReplay(1),
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
              const {extFormDataRes, metricOptSource} = this._fs.getExternalData(
                fschemadeps,
                false,
                metricSel,
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
          const metricsDocs = originData[1] as RxDocument<Metric, {}>[][];

          const newChoicesOrigins: AjfChoicesOrigin<string>[] = [];
          const newFormSchema: FormSchema = deepCopy(fschema);
          let extCtx: {[key: string]: any} = {};

          let extDocsIdx = 0;
          fschemadeps.deps_origin
            .filter(depsOrigin => 'form_schema_ref_id' in depsOrigin)
            .map(depsOrigin => depsOrigin as DepsOrigin)
            .forEach(depsOrigin => {
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

          if (metricsDocs && metricsDocs.length) {
            metricsDocs.forEach(metricDocs => {
              if (metricDocs.length) {
                const choicesOriginName = metricDocs[0].collection.name + '_metric_choice';
                newChoicesOrigins.push({
                  type: 'fixed',
                  name: choicesOriginName,
                  label: choicesOriginName,
                  choices: this._fs.getChoicesFromMetrics(
                    metricDocs,
                    metricDocs[0].collection.name,
                    fschemadeps,
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
      this._formDataStatus,
      this._formSchemaStatuses,
      this._formDataUser,
      this._formDataUserGroups,
      this._udm.getActiveUserData(),
      this._ugm.getActiveUserGroups(),
    ]).pipe(
      withLatestFrom(this._formData),
      map(
        ([
          [
            fschema,
            schemaChanges,
            status,
            allStatuses,
            user,
            userGroups,
            activeUser,
            activeUserGroups,
          ],
          fdata,
        ]) => {
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
          const ajfFormData = deepCopy(fdata.data);
          const createdAt = fdata != null && fdata.createdAt != null ? fdata.createdAt : null;
          const id = fdata != null && fdata.id != null ? fdata.id : null;
          const dinoFormInfo = {
            status,
            allStatuses,
            user,
            userGroups,
            activeUser,
            activeUserGroups,
            createdAt,
            id,
          };
          this._extraFormControls['dino_form_info'] = dinoFormInfo;
          ajfFormData['dino_form_info'] = dinoFormInfo;
          return AjfFormSerializer.fromJson(fschema.schema, ajfFormData);
        },
      ),
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
      this._formRenderer.pipe(switchMap(fr => fr?.formGroup ?? obsOf(null))),
      this._formDataStatus,
      this._formSchemaStatuses,
      this._formDataUser,
      this._formDataUserGroups,
      this._udm.getActiveUserData(),
      this._ugm.getActiveUserGroups(),
      this._formMetricsSelector.pipe(
        switchMap(fsm =>
          fsm != null
            ? fsm.formDate.valueChanges.pipe(startWith(fsm != null ? fsm.formDate.value : null))
            : obsOf(null),
        ),
      ),
      this.formId,
    ])
      .pipe(withLatestFrom(this.isFormInizialized), takeUntil(this._mainUnsubscribe))
      .subscribe(
        ([
          [
            frGroup,
            status,
            allStatuses,
            user,
            userGroups,
            activeUser,
            activeUserGroups,
            frDate,
            frId,
          ],
          _,
        ]) => {
          if (frGroup != null) {
            const createdAt =
              frDate != null && frDate.created_at != null ? frDate.created_at : null;
            // User changes the createdAt date in metrics tab
            const dinoFormInfo = {
              status,
              allStatuses,
              user,
              userGroups,
              activeUser,
              activeUserGroups,
              createdAt,
              id: frId,
            };
            this._extraFormControls['dino_form_info'] = dinoFormInfo;
            this._fs.setNewControlsInForm(frGroup, this._extraFormControls);
          }
        },
      );

    if (this.formRenderers) {
      this.formRenderers.changes
        .pipe(
          map((formRenderers: QueryList<AjfFormRenderer>) => formRenderers.first ?? null),
          take(1),
        )
        .subscribe(fr => {
          this._formRenderer.next(fr);
        });
    }

    this._slides = this._formRenderer.pipe(
      switchMap(fr => fr?.slides ?? obsOf(null)),
      shareReplay(1),
    );

    combineLatest([this._formMetricsSelector, this._currentDoc, this.isView])
      .pipe(
        switchMap(([fms, currentDoc, isView]) => {
          if (fms == null) {
            return obsOf(false);
          }
          fms.addFormData(currentDoc, isView);
          return isView ? this.isAjfFormValid : obsOf(true);
        }),
        take(1),
      )
      .subscribe();

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

    this._uniqueMetricsSetAlreadyExists = combineLatest([
      this._formSchema,
      this._formData,
      this._formMetricsSelector.pipe(
        switchMap(fmSelector => fmSelector?.selectedMetricsChanges ?? obsOf(null)),
      ),
    ]).pipe(
      switchMap(([fschema, fdata, fsmChanges]) => {
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
        const selector = {
          form_schema_ref_id: {$eq: fschema.id},
          id: {$ne: fdata.id},
          ...querySelectorObj,
        };
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

    combineLatest([
      this._saveFormEvt as Observable<AjfFormActionEvent>,
      this._currentDoc,
      this._formMetricsSelector,
    ])
      .pipe(
        throttleTime(1000),
        filter(() => this._dataModelManager != null),
        map(([evt, item, formMetricsSelector]) => {
          this.isLoading.next(true);
          const fValue = this._rendererService.getFormValue();
          delete fValue['dino_form_info'];
          delete fValue['dino_form_metrics'];
          return {
            doc: item,
            formValue: fValue,
            fmSelector: formMetricsSelector,
            evt: evt && evt.action ? evt.action : null,
          };
        }),
        withLatestFrom(this._nss.isOnline$),
        switchMap(([formObj, isOnline]) => {
          const apiCall: Observable<any>[] = [];
          const {filesToUpload, filesToDelete, invalidFileKeys} = this.uploadService.getFilesInForm(
            formObj.formValue,
          );
          invalidFileKeys.forEach(k => {
            formObj.formValue[k] = null;
          });
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
          if (filesToDelete && filesToDelete.length && isOnline) {
            this._deleteFiles.next(filesToDelete);
          }
          return zip(apiCall);
        }),
        withLatestFrom(this.isDetails, this._formSchemaStatuses),
        switchMap(([res, isDetails, formStatuses]) => {
          if (res.length) {
            const formObj = res[0];
            let formValue = {...formObj.formValue};
            if (formObj.evt && formObj.evt === 'draft') {
              formValue['dinoinvalid'] = true;
            } else if (formValue['dinoinvalid'] || formValue['$invalid']) {
              delete formValue['dinoinvalid'];
            }
            delete formValue['$invalid'];
            if (res.length > 1) {
              for (let i = 1; i < res.length; i++) {
                formValue = this.uploadService.replaceUploadedFile(
                  formValue,
                  res[i] as StorageUploadResponse,
                );
              }
            }
            let newItem = {...formObj.doc} as {[key: string]: any};
            newItem['data'].data != null
              ? (newItem['data'].data = formValue)
              : (newItem['data'] = formValue);

            if (formObj.evt !== 'draft' && newItem['form_status_ref_id'] == null) {
              let defaultFormStatus: string | null =
                formStatuses && formStatuses.length
                  ? formStatuses.reduce((prev, curr) =>
                      prev.status_level < curr.status_level ? prev : curr,
                    ).id
                  : null;
              if (defaultFormStatus) {
                newItem['form_status_ref_id'] = defaultFormStatus;
              }
            }

            if (formObj.fmSelector != null) {
              const selectedMetrics = formObj.fmSelector.selectedMetrics;
              const creationDate = formObj.fmSelector.formDate.value.created_at;
              for (let key of Object.keys(selectedMetrics)) {
                if (
                  selectedMetrics[key] != null &&
                  selectedMetrics[key].option != null &&
                  selectedMetrics[key].option.id != null
                ) {
                  const saveKey = `${key}_ref_id`;
                  newItem[saveKey] = selectedMetrics[key].option.id;
                }
              }
              let formattedDate = creationDate;
              if (creationDate && typeof creationDate === 'object') {
                const dateFmt = 'yyyy-MM-dd';
                try {
                  formattedDate = format(creationDate, dateFmt);
                } catch (e) {
                  if (isDevMode()) console.log(e);
                }
              }
              newItem['created_at'] = formattedDate;
            }

            const dmm = this._dataModelManager as DataModelManager<T>;
            const dm: DataModelManager<T> =
              isDetails && dmm.detailsManager != null ? dmm.detailsManager : dmm;
            return dm
              .update(newItem as T)
              .pipe(
                withLatestFrom(
                  this._formDataStatus,
                  this._formSchemaStatuses,
                  this._formDataUser,
                  this._formDataUserGroups,
                  this._udm.getActiveUserData(),
                  this._ugm.getActiveUserGroups(),
                  obsOf(formObj),
                ),
              );
          } else {
            return throwError(() => new Error('No data found'));
          }
        }),
        catchError(err => {
          this.isLoading.next(false);
          if (isDevMode()) {
            console.log(err);
          }
          this._ehms.captureErrorMessage(`Could not edit form: ${JSON.stringify(err)}`, 'error');
          this._location.back();
          this.snackbar.open(err, 'ERROR', {duration: 5000});
          return obsOf(err);
        }),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe(
        ([fd, status, allStatuses, user, userGroups, activeUser, activeUserGroups, formObj]) => {
          this.isLoading.next(false);
          if (fd && fd.collection.name === 'form_data') {
            this._location.back();
            this.snackbar.open('Document saved', 'SAVE', {duration: 5000});
            const trigData: ActionTriggerData<T> = {
              doc: fd,
              previousValue: formObj.doc,
              newValue: fd,
              additional_info: {
                status,
                allStatuses,
                user,
                userGroups,
                activeUser,
                activeUserGroups,
              },
            };

            let trigger: ActionTrigger<T> = {
              name: 'Form Data Changed',
              triggerType: 'on_form_data_change',
              triggerData: trigData,
            };
            if (formObj.evt === 'draft') {
              trigger.name = 'Form Data Draft Changed';
              trigger.triggerType = 'on_form_data_save_draft';
            }
            this.emitActionTrigger.emit(trigger);
          }
        },
      );

    this._deleteFiles
      .pipe(
        switchMap(files => zip(this.uploadService.deleteFiles(files))),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe();

    this.isAjfFormValid = this._rendererService.formInitEvent.pipe(
      withLatestFrom(this._formData),
      switchMap(([_, fd]) => {
        const invalidForm = (fd.data as any)['dinoinvalid'] || (fd.data as any)['$invalid'];
        const startErrors = invalidForm === true ? 1 : 0;
        return this._rendererService.errors.pipe(
          startWith(startErrors),
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
      this.isLoading,
    ]).pipe(
      map(
        ([ajfValid, uniqueExists, loading]) =>
          ajfValid === false || uniqueExists === true || loading === true,
      ),
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

    this._saveFormEvt.complete();
    this._currentDoc.complete();
  }
}
