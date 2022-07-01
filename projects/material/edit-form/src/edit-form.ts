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
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {
  ActionTrigger,
  ActionTriggerData,
  DataModelManager,
  DataQueryOptions,
  Metric,
  MetricsService,
  Model,
} from '@dino/core/data';
import {FormData, FormSchema, FormSchemaDeps, FormSchemaManager} from '@dino/core/forms';
import {FormMetricSelector} from '@dino/material/form-metric-selector';
import {format} from 'date-fns';
import {RxDocument} from 'rxdb';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  from,
  Observable,
  of as obsOf,
  Subject,
  Subscription,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

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
   * The Form Schema Deps object
   */
  private _formSchemaDeps: Observable<FormSchemaDeps> = obsOf();
  get formSchemaDeps(): Observable<FormSchemaDeps> {
    return this._formSchemaDeps;
  }

  /**
   * All the metric changes in the metric selector
   */
  private _metricChangesSub: Subscription = Subscription.EMPTY;
  readonly metricChanges: BehaviorSubject<{[key: string]: RxDocument<Metric>} | null> =
    new BehaviorSubject<{
      [key: string]: RxDocument<Metric>;
    } | null>(null);

  /**
   * The Form data object
   */
  private _formData: Observable<{data: FormData; schemaId: string}> = obsOf();
  get formData(): Observable<{data: FormData; schemaId: string}> {
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
   * Emitted when a user tries to save a form
   */
  private _saveFormEvt: EventEmitter<AjfFormActionEvent> = new EventEmitter<AjfFormActionEvent>();

  /**
   * Subscribes to the populated form data object with dependencies
   */
  private _populatedFormDataSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the save form event
   */
  private _saveFormSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the update form event
   */
  private _updateFormDataSub: Subscription = Subscription.EMPTY;

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
   * The Ajf Form Renderer
   */
  @ViewChild(AjfFormRenderer, {static: true}) formCmp!: AjfFormRenderer;

  /**
   * The Form Metrics Selector
   */
  @ViewChildren(FormMetricSelector) formMetricsSelectorComponent!: QueryList<FormMetricSelector>;

  constructor(
    private _route: ActivatedRoute,
    private _fs: FormSchemaManager,
    private _rendererService: AjfFormRendererService,
    private _location: Location,
    readonly snackbar: MatSnackBar,
    readonly metricsService: MetricsService,
  ) {
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
              };
              return formDataObj;
            }
            return null;
          }),
        );
      }),
      switchMap(data => data as Observable<{data: FormData; schemaId: string}>),
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
            const item = this._populateDocRefs(doc);
            return item;
          }),
        ),
      ),
      switchMap(schema => schema as Observable<FormSchema>),
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

    this._populatedFormDataSub = combineLatest([this._formSchemaDeps, this.metricChanges])
      .pipe(
        withLatestFrom(this._rendererService.formGroup),
        map(([[fschemadeps, metricSel], formGroup]) => {
          let depsCtx: {[key: string]: any} = {};
          let extFormDataObs: Observable<any>[] = [];

          if (fschemadeps) {
            if (metricSel != null) {
              Object.keys(metricSel).forEach(metricName => {
                if (
                  metricSel[metricName] &&
                  fschemadeps.metric_data_to_show &&
                  fschemadeps.metric_data_to_show.includes(metricName)
                ) {
                  const metricProps = metricSel[metricName].toJSON();
                  for (let prop in metricProps) {
                    if (!this._dinoBaseModelFields.includes(prop)) {
                      depsCtx[`${metricName}_${prop}`] = (metricProps as {[key: string]: any})[
                        prop
                      ];
                    }
                  }
                }
              });
              if (Object.keys(depsCtx).length) {
                formGroup?.patchValue(depsCtx);
              }

              if (fschemadeps.deps_origin) {
                extFormDataObs = this._getExternalFormData(fschemadeps, metricSel);
                if (extFormDataObs.length) {
                  return forkJoin(extFormDataObs).pipe(
                    map(extDatas => {
                      let extCtx: {[key: string]: any} = {};
                      extDatas.forEach(extData => {
                        if (extData !== null) {
                          const item = extData.toJSON() as {[key: string]: any} as FormData;
                          extCtx[item.form_schema_ref_id] = item['data'];
                        }
                      });
                      return extCtx;
                    }),
                  );
                }
              }
            }
          }
          return obsOf({});
        }),
        switchMap(data => {
          return data as Observable<{[key: string]: any}>;
        }),
        shareReplay(1),
        withLatestFrom(this._rendererService.formGroup, this._formSchemaDeps),
      )
      .subscribe(([changes, formGroup, fschemadeps]) => {
        if (fschemadeps && fschemadeps.deps_origin && changes) {
          let extCtx: {[key: string]: any} = {};
          fschemadeps.deps_origin.forEach(depsOrigin => {
            if (depsOrigin.form_schema_ref_id && depsOrigin.fields_to_update) {
              let extFormData: {[key: string]: any} = {};
              if (depsOrigin.form_schema_ref_id in changes) {
                extFormData = changes[depsOrigin.form_schema_ref_id];
              }
              depsOrigin.fields_to_update.forEach(field => {
                if (extFormData && field in extFormData) {
                  extCtx[field] = extFormData[field];
                } else {
                  extCtx[field] = null;
                }
              });
            }
          });
          if (Object.keys(extCtx).length) {
            formGroup?.patchValue(extCtx);
          }
        }
      });

    this._form = this._formSchema.pipe(
      withLatestFrom(this._formData),
      map(([fschema, fdata]) => {
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
        return AjfFormSerializer.fromJson(fschema.schema, fdata.data);
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

    combineLatest([this._formMetricsSelector, this._currentDoc, this.isView])
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

    this._formMetricsSelector
      .pipe(
        map(fmSelector => {
          if (fmSelector != null) {
            return fmSelector.selectedMetricsChanges.pipe(
              withLatestFrom(this._formSchemaDeps),
              map(([metricSel, fschemadeps]) => {
                if (fschemadeps && fschemadeps.metric_data_to_show) {
                  let setNextMetricValue = false;
                  Object.keys(metricSel).forEach(metricName => {
                    if (
                      metricSel[metricName] &&
                      fschemadeps.metric_data_to_show &&
                      fschemadeps.metric_data_to_show.includes(metricName)
                    ) {
                      setNextMetricValue = true;
                    }
                  });
                  if (setNextMetricValue) {
                    this.metricChanges.next(metricSel);
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

    this._saveFormSub = combineLatest([
      this._saveFormEvt as Observable<AjfFormActionEvent>,
      this._currentDoc,
      this._formMetricsSelector,
    ])
      .pipe(
        filter(() => this._dataModelManager != null),
        map(([_, item, formMetricsSelector]) => {
          return {
            doc: item,
            formValue: this._rendererService.getFormValue(),
            fmSelector: formMetricsSelector,
          };
        }),
        withLatestFrom(this.isDetails),
        switchMap(([formObj, isDetails]) => {
          let newItem = {...formObj.doc} as {[key: string]: any};
          newItem['data'].data != null
            ? (newItem['data'].data = formObj.formValue)
            : (newItem['data'] = formObj.formValue);

          if (formObj.fmSelector != null) {
            const selectedMetrics = formObj.fmSelector.selectedMetrics;
            const creationDate = formObj.fmSelector.formDate.value.created_at;
            for (let key of Object.keys(selectedMetrics)) {
              if (selectedMetrics[key].id != null) {
                const saveKey = `${key}_ref_id`;
                newItem[saveKey] = selectedMetrics[key].id;
              }
            }
            const dateFmt = 'yyyy-MM-dd';
            const formattedDate = format(creationDate, dateFmt);
            newItem['created_at'] = formattedDate;
          }

          const dmm = this._dataModelManager as DataModelManager<T>;
          const dm: DataModelManager<T> =
            isDetails && dmm.detailsManager != null ? dmm.detailsManager : dmm;
          return dm.update(newItem as T).pipe(
            tap(fd => {
              if (fd && fd.collection.name === 'form_data') {
                const trigData: ActionTriggerData<T> = {
                  doc: fd,
                  previousValue: formObj.doc,
                  newValue: fd,
                };
                const trigger: ActionTrigger<T> = {
                  name: 'Form Data Changed',
                  triggerType: 'on_form_data_change',
                  triggerData: trigData,
                };
                this.emitActionTrigger.emit(trigger);
              }
            }),
          );
        }),
        catchError(err => {
          this._location.back();
          this.snackbar.open(err, 'ERROR', {duration: 5000});
          return obsOf(err);
        }),
      )
      .subscribe(_ => {
        this._location.back();
        this.snackbar.open('Document saved', 'SAVE', {duration: 5000});
      });

    this.isAjfFormValid = this._rendererService.errors
      .pipe(
        map((errors: number) => errors === 0),
        shareReplay(1),
      )
      .pipe(
        map(ajfFormValid => {
          return ajfFormValid;
        }),
      );

    this.isFormMetricsSelectorValid = this._formMetricsSelector.pipe(
      switchMap(formMetricsSelector => {
        if (formMetricsSelector == null) {
          return obsOf(false);
        }
        return formMetricsSelector.formMetrics.statusChanges.pipe(
          switchMap(() => formMetricsSelector.isFormMetricsValid()),
        );
      }),
    );
  }

  ngOnDestroy() {
    this._saveFormSub.unsubscribe();
    this._metricChangesSub.unsubscribe();
    this._updateFormDataSub.unsubscribe();
    this._populatedFormDataSub.unsubscribe();
    this._saveFormEvt.complete();
    this._currentDoc.complete();
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
          refProp = {[propKey]: from(doc.populate(prop)).pipe(shareReplay(1))};
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
      [key: string]: RxDocument<Metric>;
    },
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
          depsOrigin.filter_by_metric &&
          depsOrigin.filter_by_metric.length
        ) {
          const opt: DataQueryOptions = {
            selector: {form_schema_ref_id: {$eq: depsOrigin.form_schema_ref_id}},
          };

          let missingMetric = false;
          depsOrigin.filter_by_metric.forEach(metric => {
            if (activeMetrics.includes(metric) && metricSel[metric]) {
              const metricProps = metricSel[metric].toJSON();
              opt['selector'][metric + '_ref_id'] = metricProps.id;
            } else {
              missingMetric = true;
            }
          });

          if (!missingMetric) {
            extFormDataObs.push(
              dmm.query(opt).pipe(
                map(docs => {
                  if (!docs.length || docs[0] == null) {
                    return null;
                  }
                  return docs[0];
                }),
                shareReplay(1),
              ),
            );
          }
        }
      });
    }
    return extFormDataObs;
  }
}
