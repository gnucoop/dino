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
  AjfFormRendererService,
  AjfFormSerializer,
} from '@ajf/core/forms';
import {Location} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {DataModelManager, MetricsService, Model} from '@dino/core/data';
import {FormSchema, FormSchemaManager, FormStatus, FormStatusManager} from '@dino/core/forms';
import {UserDataManager} from '@dino/core/users';
import {FormMetricSelector} from '@dino/material/form-metric-selector';
import {Observable, of as obsOf, Subscription, throwError} from 'rxjs';
import {catchError, filter, map, shareReplay, switchMap, withLatestFrom} from 'rxjs/operators';

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
   * Emitted when a user tries to save a form
   */
  private _saveFormEvt: EventEmitter<AjfFormActionEvent> = new EventEmitter<AjfFormActionEvent>();

  /**
   * Subscribes to the save form event
   */
  private _saveFormSub: Subscription = Subscription.EMPTY;

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

  /**
   * The Form Metrics Selector
   */
  @ViewChildren(FormMetricSelector) formMetricsSelectorComponent!: QueryList<FormMetricSelector>;

  constructor(
    private _route: ActivatedRoute,
    private _fs: FormSchemaManager,
    private _fst: FormStatusManager,
    private _rendererService: AjfFormRendererService,
    private _location: Location,
    private _udm: UserDataManager,
    readonly snackbar: MatSnackBar,
    readonly metricsService: MetricsService,
  ) {}

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
            const item = doc.toJSON();
            return item;
          }),
        ),
      ),
      switchMap(schema => schema as Observable<FormSchema>),
      shareReplay(1),
    );

    this._formStatuses = this._formSchema.pipe(
      switchMap(schema => this._fst.formStatusesOfSchema(schema)),
    );

    this._form = this._formSchema.pipe(
      map(fschema => {
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

    this._saveFormSub = this._saveFormEvt
      .pipe(
        withLatestFrom(
          this._isFormData,
          this._formSchemaId,
          this._formMetricsSelector,
          this._udm.getActiveUserData(),
          this._formStatuses,
        ),
        switchMap(([_, isFormData, formSchemaId, formMetricsSelector, userData, formStatuses]) => {
          const formValue = this._rendererService.getFormValue();
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
              const formattedDate = new Date(creationDate).toISOString().split('T')[0];
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
          return this._dataModelManager.create(newItem as T);
        }),
        catchError(err => {
          this._location.back();
          this.snackbar.open(err, 'ERROR', {duration: 5000});
          return obsOf(err);
        }),
      )
      .subscribe(_ => {
        this._location.back();
        this.snackbar.open('Document created', 'SAVE', {duration: 5000});
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
    this._saveFormEvt.complete();
  }
}
