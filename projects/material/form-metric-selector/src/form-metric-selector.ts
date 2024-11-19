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
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {DataModelManager, DataQuerySelector, Metric, MetricsService} from '@dino/core/data';
import {FormData, FormSchemaManager, FormStatus} from '@dino/core/forms';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {UserGroupManager} from '@dino/core/users';
import {MetricEditor, MetricFormField} from '@dino/material/metric-editor';
import {parse} from 'date-fns';
import {isRxDocument, RxDocument} from 'rxdb';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  Observable,
  of as obsOf,
  Subject,
  Subscription,
} from 'rxjs';
import {debounceTime, filter, map, shareReplay, startWith, switchMap, take} from 'rxjs/operators';

import {RequireMetricMatch, RequireNotNullMetricMatch} from './form-metric-selector-validator';
import {ActivatedRoute, Params} from '@angular/router';
import {DateAdapter} from '@angular/material/core';
import {TranslocoService} from '@ajf/core/transloco';

/**
 * This component allows the selection and association of Metrics to the created or edited Form.
 */
@Component({
  selector: 'dino-form-metric-selector',
  styleUrls: ['form-metric-selector.scss'],
  templateUrl: 'form-metric-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormMetricSelector implements OnDestroy, AfterViewInit {
  /**
   * Determines the context in which the Metric Selector is inserted (form / report / bulkFormEdit)
   */
  @Input() context: 'form' | 'report' | 'bulkFormEdit' | 'shareUrl' = 'form';

  /**
   * Activated route params can be passed as an input (when this is inside a Form Metric Selector Dialog)
   */
  @Input() set setDialogActRouteParams(actRouteParams: Params) {
    if (actRouteParams != null) {
      this._dialogActRouteParams.next(actRouteParams);
    }
  }

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
    if (fields != null) {
      this._secondaryMetricFieldsDisplayed = fields;
    }
  }

  /**
   * The list of all the Form Statuses available to the active User
   */
  @Input() availableStatuses: FormStatus[] | null = null;

  /**
   * Metrics of the types specified in the array can be created directly from the metric fields
   */
  @Input() allowMetricCreationFor: string[] = [];

  /**
   * Emitted when the user wants to move to the Form Data step of the Form Editor.
   */
  @Output() goToFormDataEvt: EventEmitter<void> = new EventEmitter<void>();

  /**
   * The Selector metrics form group.
   */
  formMetrics: UntypedFormGroup;
  get selectedMetrics(): {
    [key: string]: {
      option: Metric;
      secondaryMetricFieldsDisplayed: {[metricName: string]: string};
      metricType: string;
    };
  } {
    return this.formMetrics.value;
  }

  /**
   * The Selector Form Status form group.
   */
  formStatus: UntypedFormGroup;

  /**
   * The Selector metrics valueChanges
   */
  get selectedMetricsChanges(): Observable<{
    [key: string]: {
      option: RxDocument<Metric>;
      secondaryMetricFieldsDisplayed: {[metricName: string]: any} | null;
      metricType: string;
    };
  }> {
    return this.formMetrics.valueChanges;
  }

  /**
   * The Selector date form group.
   */
  formDate: UntypedFormGroup;

  /**
   * The form creation date
   */
  formCreationDate: Observable<Date>;

  /**
   * The Selector form fields.
   */
  formMetricsFields: Observable<MetricFormField[]>;

  /**
   * All the metrics fields values
   */
  formMetricsValues: {[key: string]: Observable<Metric | string>} = {};

  /**
   * All the metrics fields valuechanges subscriptions
   */
  formMetricsSubs: {[key: string]: Subscription} = {};

  /**
   * All the metrics autocomplete options.
   */
  formMetricsOptions: {
    [key: string]: BehaviorSubject<
      RxDocument<Metric & {level?: number} & {[key: string]: any}, {}>[]
    >;
  } = {};

  /**
   * True if the Form is in view mode.
   */
  isView: Subject<boolean> = new Subject<boolean>();

  /**
   * The activate route when this component is inside a Form Metric Selector Dialog
   */
  private _dialogActRouteParams: BehaviorSubject<Params | null> =
    new BehaviorSubject<Params | null>(null);

  /**
   * True if the Form/Report can have one or more null Metrics.
   * Defaults to false.
   */
  private _hasOptionalMetrics: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * The names of the Metric types required.
   */
  private _requiredMetrics: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /**
   * Emits when a new metric has been created by the user
   * via Form Metric Selector
   */
  private _newMetric: BehaviorSubject<RxDocument<Metric> | null> =
    new BehaviorSubject<RxDocument<Metric> | null>(null);

  @Input()
  set hasOptionalMetrics(allowed: boolean) {
    if (allowed == null) {
      return;
    }
    this._hasOptionalMetrics.next(allowed);
  }

  @Input()
  set requiredMetrics(metrics: string[] | null) {
    if (metrics != null) {
      this._requiredMetrics.next(metrics);
    } else {
      this._requiredMetrics.next([]);
    }
  }

  /**
   * The Form Data object of the edited / viewed form.
   */
  private _formData: Subject<{[key: string]: any}> = new Subject<{[key: string]: any}>();

  private _startingValuesSub: Subscription = Subscription.EMPTY;

  /**
   * A reference to the MatDialog that contains the Metric Editor component
   */
  private _dialogRef?: MatDialogRef<MetricEditor>;

  private _metricDialogSub: Subscription = Subscription.EMPTY;

  /**
   * A Dictionary of all the optional Metrics managers
   */
  private _metricManagers: {[metricType: string]: DataModelManager<Metric> | null};

  /**
   * The form schema available metric types
   */
  private _formSchemaAvailableMetrics: Observable<string[] | null>;

  constructor(
    private _userGroupManager: UserGroupManager,
    private _metricService: MetricsService,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _fs: FormSchemaManager,
    private _ts: TranslocoService,
    private _adapter: DateAdapter<any>,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _caseManager: CaseManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
  ) {
    this._adapter.setLocale(this._getCurrentLocale());

    this._formSchemaAvailableMetrics = combineLatest([
      this._route.params,
      this._dialogActRouteParams,
    ]).pipe(
      map(([params, dialogParams]) => {
        const routeparams = dialogParams ?? params;
        return {
          form_schema_id: routeparams['form_schema_id'],
          report_schema_id: routeparams['report_schema_id'],
        };
      }),
      filter(ids => ids.form_schema_id != null || ids.report_schema_id != null),
      switchMap(ids => {
        if (ids.report_schema_id) {
          return obsOf([]);
        }
        return this._fs.get(ids.form_schema_id).pipe(
          map(doc => {
            if (doc == null) {
              return null;
            }
            return doc.form_schema_metrics ?? [];
          }),
        );
      }),
      shareReplay(1),
    );

    this.formCreationDate = this._formData.pipe(
      map(data => {
        return parse(data['created_at'], 'yyyy-MM-dd', new Date());
      }),
      take(1),
    );
    this.formCreationDate.subscribe(date => this.formDate.get('created_at')?.setValue(date));
    this.formDate = new UntypedFormGroup({
      'created_at': new UntypedFormControl(new Date(), Validators.required),
    });
    this.formStatus = new UntypedFormGroup({
      'form_status_ref_id': new UntypedFormControl(null),
    });
    const group: {[key: string]: UntypedFormControl} = {};
    const validatorFn: ValidationErrors | null = this._hasOptionalMetrics.getValue()
      ? RequireMetricMatch
      : RequireNotNullMetricMatch;

    this._metricManagers = {
      area: this._areaManager,
      case: this._caseManager,
      location: this._locationManager,
      organization: this._organizationManager,
      project: this._projectManager,
    } as {[metricType: string]: DataModelManager<Metric> | null};

    if (this._areaManager != null) {
      group['area'] = new UntypedFormControl('', this._getMetricValidator('area', validatorFn));
      this.formMetricsValues['area'] = group['area'].valueChanges.pipe(map(vc => vc.option ?? vc));
    }
    if (this._caseManager != null) {
      group['case'] = new UntypedFormControl('', this._getMetricValidator('case', validatorFn));
      this.formMetricsValues['case'] = group['case'].valueChanges.pipe(
        map(vc => {
          return vc.option ?? vc;
        }),
      );
    }

    if (this._projectManager != null) {
      group['project'] = new UntypedFormControl(
        '',
        this._getMetricValidator('project', validatorFn),
      );
      this.formMetricsValues['project'] = group['project'].valueChanges.pipe(
        map(vc => vc.option ?? vc),
      );
    }

    if (this._locationManager != null) {
      group['location'] = new UntypedFormControl(
        '',
        this._getMetricValidator('location', validatorFn),
      );
      this.formMetricsValues['location'] = group['location'].valueChanges.pipe(
        map(vc => vc.option ?? vc),
      );
    }

    if (this._organizationManager != null) {
      group['organization'] = new UntypedFormControl(
        '',
        this._getMetricValidator('organization', validatorFn),
      );
      this.formMetricsValues['organization'] = group['organization'].valueChanges.pipe(
        map(vc => vc.option ?? vc),
      );
    }

    const formGroup = new UntypedFormGroup(group);

    this.formMetrics = formGroup;

    this.formMetricsFields = combineLatest([
      this._hasOptionalMetrics,
      this._formSchemaAvailableMetrics,
      this._requiredMetrics,
    ]).pipe(
      //this._formSchemaAvailableMetrics.pipe(
      map(([optMetrics, availableMetrics, reqMetrics]) => {
        const fmf: MetricFormField[] = [];
        if (this._areaManager != null && this._isMetricAvailable(availableMetrics, 'area')) {
          const field = {
            fieldName: 'area',
            hint: `Thematic Area of the form`,
            placeholder: 'Thematic Area' + (optMetrics && !reqMetrics.includes('area') ? '' : ' *'),
            icon: 'volunteer_activism',
          };
          fmf.push(field);
          this._addFormMetricsOptions('area');
        }
        if (this._caseManager != null && this._isMetricAvailable(availableMetrics, 'case')) {
          const field = {
            fieldName: 'case',
            hint: `Case of the form`,
            placeholder:
              'Case management' + (optMetrics && !reqMetrics.includes('case') ? '' : ' *'),
            icon: 'people',
          };
          fmf.push(field);
          this._addFormMetricsOptions('case');
        }

        if (this._projectManager != null && this._isMetricAvailable(availableMetrics, 'project')) {
          const field = {
            fieldName: 'project',
            hint: `Project associated with the form`,
            placeholder: 'Project' + (optMetrics && !reqMetrics.includes('project') ? '' : ' *'),
            icon: 'assignment',
          };
          fmf.push(field);
          this._addFormMetricsOptions('project');
        }

        if (
          this._locationManager != null &&
          this._isMetricAvailable(availableMetrics, 'location')
        ) {
          const field = {
            fieldName: 'location',
            hint: `Location of the collected data`,
            placeholder: 'Location' + (optMetrics && !reqMetrics.includes('location') ? '' : ' *'),
            icon: 'place',
          };
          fmf.push(field);
          this._addFormMetricsOptions('location');
        }

        if (
          this._organizationManager != null &&
          this._isMetricAvailable(availableMetrics, 'organization')
        ) {
          const field = {
            fieldName: 'organization',
            hint: `Organization associated with the form`,
            placeholder:
              'Organization' + (optMetrics && !reqMetrics.includes('organization') ? '' : ' *'),
            icon: 'public',
          };
          fmf.push(field);
          this._addFormMetricsOptions('organization');
        }
        return fmf;
      }),
    );

    this._setStartingValues();
    this._setFieldInitialStatus();
  }

  ngAfterViewInit(): void {
    if (this.context === 'bulkFormEdit') {
      this.formDate = new UntypedFormGroup({
        'created_at': new UntypedFormControl(null),
      });
    }

    combineLatest([this._hasOptionalMetrics, this._formSchemaAvailableMetrics])
      .pipe(take(1))
      .subscribe(([optMetrics, availableMetrics]) => {
        const defaultValidatorFn: ValidationErrors | null = optMetrics
          ? RequireMetricMatch
          : RequireNotNullMetricMatch;

        Object.keys(this.formMetrics.controls).forEach(key => {
          this.formMetrics.controls[key].setValidators(
            !availableMetrics || !availableMetrics.length || availableMetrics.includes(key)
              ? (this._getMetricValidator(key, defaultValidatorFn) as ValidatorFn)
              : RequireMetricMatch,
          );
          this.formMetrics.controls[key].updateValueAndValidity();
        });
      });
    this._adapter.setLocale(this._getCurrentLocale());
  }

  /**
   * Return the metric validator: required if metric is in _requiredMetrics list, default otherwise
   * @param metricName
   * @param defaultValidatorFn
   * @returns Validator for the metric
   */
  private _getMetricValidator(
    metricName: string,
    defaultValidatorFn: ValidationErrors | null,
  ): ValidationErrors | null {
    return this._requiredMetrics.getValue().includes(metricName)
      ? RequireNotNullMetricMatch
      : defaultValidatorFn;
  }

  private _getCurrentLocale(): string {
    const lang = this._ts.getActiveLang();
    switch (lang) {
      case 'ESP':
        return 'es-ES';
      case 'FRA':
        return 'fr-FR';
      case 'ITA':
        return 'it-IT';
      case 'PRT':
        return 'pt-PT';
      default:
        return 'en-US';
    }
  }

  /**
   * Triggers an event to move forward to the Form Data step of the Form Editor
   */
  goToFormData() {
    this.goToFormDataEvt.emit();
  }

  /**
   * Checks the form validation
   */
  isFormMetricsValid(): Observable<boolean> {
    return combineLatest([this.formMetrics.statusChanges, this.formDate.statusChanges]).pipe(
      map(([statusMetrics, statusDate]) => {
        return statusMetrics === 'VALID' && statusDate == 'VALID' ? true : false;
      }),
      startWith(this.formMetrics.valid),
    );
  }

  /**
   * Displays the Metric Name only in the Metric
   * autocomplete field.
   */
  displayMetricName(obj: {
    option: Metric & {[key: string]: any};
    secondaryMetricFieldsDisplayed: {[metricName: string]: any} | null;
    metricType: string;
  }): string {
    if (obj == null || obj.option == null || obj.metricType == null) {
      return '';
    }
    let displayed = obj.option && obj.option.name && obj.option.id ? obj.option.name : '';
    if (
      obj.secondaryMetricFieldsDisplayed != null &&
      obj.secondaryMetricFieldsDisplayed[obj.metricType] != null
    ) {
      if (obj.secondaryMetricFieldsDisplayed[obj.metricType].includes('metric_data')) {
        const metricDataKey =
          obj.secondaryMetricFieldsDisplayed[obj.metricType].split('metric_data ')[1];
        const metricDataValue =
          obj.option['metric_data'] != null ? obj.option['metric_data'][metricDataKey] : null;
        if (metricDataValue != null) {
          displayed = `${displayed} - (${metricDataValue})`;
        }
      } else if (
        obj.secondaryMetricFieldsDisplayed[obj.metricType] != null &&
        obj.option[obj.secondaryMetricFieldsDisplayed[obj.metricType]] != null
      ) {
        displayed = `${displayed} - (${
          obj.option[obj.secondaryMetricFieldsDisplayed[obj.metricType]]
        })`;
      }
    }
    return displayed;
  }

  /**
   * If true, this type of Metric can be created directly in the form metric selector
   */
  isMetricCreationAllowed(metricType: string): boolean {
    return (
      this.allowMetricCreationFor.includes(metricType) ||
      this.allowMetricCreationFor.includes('all')
    );
  }

  /**
   * Adds the FormData and the mode(edit/view) of the form.
   * @param formData The edited Form data.
   */
  addFormData(formData: {[key: string]: any}, isView: boolean = false): void {
    if (formData == null) {
      return;
    }
    this._formData.next(formData as FormData);
    this.isView.next(isView);
  }

  /**
   * Opens a dialog for the creation of a Metric
   * @param event The click/pointer event
   * @param metricType The type string identifier of the metric to be created
   */
  openCreateMetricDialog(event: Event, metricType: string): void {
    event.preventDefault();
    event.stopPropagation();
    const manager = this._metricManagers[metricType];
    if (manager != null) {
      this._dialogRef = this._dialog.open(MetricEditor, {
        data: {
          metricManager: manager,
          metricAction: 'create',
          readOnlyFields: this._getReadonlyFields(metricType),
        },
      });
      this._metricDialogSub = this._dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe(res => {
          if (res && isRxDocument(res)) {
            const formControl = this.formMetrics.get(metricType);
            if (formControl) {
              formControl.setValue({
                option: res,
                secondaryMetricFieldsDisplayed: this._secondaryMetricFieldsDisplayed,
                metricType,
              });
              this._newMetric.next(res);
            }
          }
        });
    }
  }

  /**
   * Gets the readonly fields of the metric editor dialog, based on the metric type.
   * @param metricType The metric type string
   * @returns The readonly fields or null if none are found
   */
  private _getReadonlyFields(metricType: string): string[] | null {
    switch (metricType) {
      case 'case':
        return ['code'];
      case 'project':
        return ['code_auto'];
      default:
        return null;
    }
  }

  /**
   * Retrieves the existing values (if present) of the Form Metrics and
   * sets the form control values accordingly.
   */
  private _setStartingValues(): void {
    this._startingValuesSub = combineLatest([
      this._formData,
      this._userGroupManager.getGroupsAllMetrics(),
    ])
      .pipe(
        switchMap(([formData, groupMetrics]) => {
          const activeMetrics = this._metricService.activeMetrics.getValue();
          const values: Observable<RxDocument<Metric, {}> | null>[] = activeMetrics.map(
            activeMetric => {
              const allowedMetrics = groupMetrics[activeMetric.metricName];
              const manager = this._metricManagers[activeMetric.metricName];
              const startingValueId = formData[`${activeMetric.metricName}_ref_id`];
              if (
                allowedMetrics == null ||
                startingValueId == null ||
                !(allowedMetrics.includes(startingValueId) || allowedMetrics.includes('all')) ||
                manager == null
              ) {
                return obsOf(null);
              }
              return manager.get(startingValueId);
            },
          );
          return forkJoin(values).pipe(filter(val => val != null));
        }),
        shareReplay(1),
      )
      .subscribe(startingValues => {
        if (startingValues == null) {
          return;
        }
        startingValues.forEach(startValue => {
          if (startValue != null) {
            const formControl = this.formMetrics.get(startValue?.collection.name);
            if (formControl != null) {
              formControl.setValue({
                option: startValue,
                secondaryMetricFieldsDisplayed: this._secondaryMetricFieldsDisplayed,
                metricType: startValue.collection.name,
              });
            }
          }
        });
        const strValue = startingValues.find(val => val != null);
        if (strValue != null) {
          const formControl = this.formMetrics.get(strValue?.collection.name);
          if (formControl != null) {
            formControl.setValue({
              option: strValue,
              secondaryMetricFieldsDisplayed: this._secondaryMetricFieldsDisplayed,
              metricType: strValue.collection.name,
            });
          }
        }
      });
  }

  /**
   * Retrieves the available options for all Metrics and populates the formMetricsOptions array.
   *
   * @param metricType The type identifier of the metric.
   */
  private _addFormMetricsOptions(metricType: string): void {
    if (this._metricManagers[metricType] == null) {
      return;
    }
    let mtOptSource = combineLatest([
      this._metricManagers[metricType]!.query({
        selector: {is_deleted: {$ne: true}},
        sort: [{'name': 'asc'}],
      }),
      this.formMetricsValues[metricType].pipe(debounceTime(800)),
      this._newMetric,
    ]).pipe(
      map(([metricOptions, metricValue, newMetric]) => {
        if (typeof metricValue !== 'string' && isRxDocument(metricValue)) {
          metricValue = '';
        }
        if (
          newMetric != null &&
          newMetric.collection.name === metricType &&
          !metricOptions.includes(newMetric)
        ) {
          metricOptions.push(newMetric);
        }
        if (metricOptions != null && metricValue != null && typeof metricValue === 'string') {
          const mtrName = metricValue.toLowerCase();
          const metricsMatchingByName = metricOptions.filter(option => {
            return (
              option.name.toLowerCase().includes(mtrName) &&
              option.name != this.formMetrics.get('name')?.value
            );
          });

          const metricsMatchingBySecondaryField: RxDocument<Metric>[] =
            this._filteredOptionsBySecondaryMetricField(metricOptions, mtrName, metricType);

          const matchingMetricsParentsIDs = [
            ...new Set(metricsMatchingByName.map(mt => mt.parent_id)),
          ];
          const metricsMatchingParents =
            this._metricManagers[metricType] != null
              ? this._metricManagers[metricType]!.findMatchingAncestors(
                  metricOptions,
                  matchingMetricsParentsIDs,
                )
              : [];
          return {
            metricOptions: [
              ...new Set([
                ...metricsMatchingByName,
                ...metricsMatchingParents,
                ...metricsMatchingBySecondaryField,
              ]),
            ],
            metricValue,
          };
        }
        return {metricOptions: [], metricValue};
      }),
    );

    // Cases can be very numerous and their filtering is treated differently
    if (metricType === 'case') {
      mtOptSource = combineLatest([
        this.formMetricsValues[metricType].pipe(debounceTime(800)).pipe(
          switchMap(metricValue => {
            if (typeof metricValue !== 'string' && isRxDocument(metricValue)) {
              metricValue = '';
            }
            let querySelector: DataQuerySelector = {
              name: {$regex: metricValue, $options: 'i'},
              is_deleted: {$ne: true},
            };
            if (this._metricManagers[metricType] == null) {
              return [];
            }
            querySelector = this._addSecondaryMetricFieldQuery(
              querySelector,
              metricValue as string,
              metricType,
            );

            let metricsObs: Observable<RxDocument<Metric, {}>[]> = this._metricManagers[
              metricType
            ]!.query({
              selector: querySelector,
              sort: [{'name': 'asc'}],
              limit: 50,
            });

            return metricsObs;
          }),
        ),
        this._newMetric,
      ]).pipe(
        map(([metricOptions, newMetric]) => {
          if (
            newMetric != null &&
            newMetric.collection.name === metricType &&
            !metricOptions.includes(newMetric)
          ) {
            metricOptions.push(newMetric);
          }

          return {metricOptions, metricValue: ''};
        }),
      );
    }

    this.formMetricsSubs[metricType] = mtOptSource.subscribe(metricObj => {
      let parentIds = metricObj.metricOptions
        .filter(mo => mo.parent_id != null)
        .map(mt => mt.parent_id);
      parentIds = [...new Set(parentIds)];
      let organizedMetricOptions = metricObj.metricOptions;
      if (parentIds.length && this._metricManagers[metricType] != null) {
        organizedMetricOptions = this._metricManagers[metricType]!.organizeDocsHierarchy(
          metricObj.metricOptions,
          parentIds,
        );
      }
      this.formMetricsOptions[metricType]
        ? this.formMetricsOptions[metricType].next(organizedMetricOptions)
        : (this.formMetricsOptions[metricType] = new BehaviorSubject<
            RxDocument<Metric & {level?: number}, {}>[]
          >(organizedMetricOptions));

      if (organizedMetricOptions.length === 1 && !this._hasOptionalMetrics.value) {
        const firstMetric = organizedMetricOptions[0];
        const formControl = this.formMetrics.get(firstMetric.collection.name);
        const selectedMetricId =
          this.formMetrics &&
          this.formMetrics.value[firstMetric.collection.name] &&
          this.formMetrics.value[firstMetric.collection.name].option != null
            ? this.formMetrics.value[firstMetric.collection.name].option.id
            : null;
        if (formControl != null && firstMetric != null && selectedMetricId != firstMetric.id) {
          formControl.setValue({
            option: firstMetric,
            secondaryMetricFieldsDisplayed: this._secondaryMetricFieldsDisplayed,
            metricType: firstMetric.collection.name,
          });
        }
      }
    });
  }

  /**
   * Add secondary metric field as filter in case metric query
   * @param metricNameQuerySelector
   * @param metricValue
   * @param metricType
   * @returns the data query selector with the base metric name filter and the new secondary filter
   */
  private _addSecondaryMetricFieldQuery(
    metricNameQuerySelector: DataQuerySelector,
    metricValue: string,
    metricType: string,
  ): DataQuerySelector {
    if (
      metricValue &&
      metricValue.length &&
      this.secondaryMetricFieldsDisplayed &&
      this.secondaryMetricFieldsDisplayed[metricType]
    ) {
      const secondaryDisplayedProp: string[] =
        this.secondaryMetricFieldsDisplayed[metricType].split(' ');
      const props: {[key: string]: any} =
        this._metricManagers[metricType]?.collectionSchema.properties || {};

      if (secondaryDisplayedProp[0] && props[secondaryDisplayedProp[0]]) {
        const secondaryQueryOpt: DataQuerySelector = {};
        if (props[secondaryDisplayedProp[0]].type === 'number') {
          if (+metricValue) {
            secondaryQueryOpt[secondaryDisplayedProp[0]] = {
              $eq: +metricValue,
            };
          }
        } else {
          secondaryQueryOpt[secondaryDisplayedProp.join('.')] = {
            $regex: metricValue,
            $options: 'i',
          };
        }

        if (Object.keys(secondaryQueryOpt).length) {
          return {
            $or: [{name: metricNameQuerySelector['name']}, secondaryQueryOpt],
            is_deleted: {$ne: true},
          };
        }
      }
    }
    return metricNameQuerySelector;
  }

  /**
   * Return filtered metric options by secondary metric field
   * @param metricOptions
   * @param metricValue
   * @param metricType
   * @returns
   */
  private _filteredOptionsBySecondaryMetricField(
    metricOptions: RxDocument<Metric>[],
    metricValue: string,
    metricType: string,
  ): RxDocument<Metric>[] {
    let metricsMatchingBySecondaryField: RxDocument<Metric>[] = [];
    if (
      metricValue &&
      metricValue.length &&
      this.secondaryMetricFieldsDisplayed &&
      this.secondaryMetricFieldsDisplayed[metricType]
    ) {
      const secondaryDisplayedProp: string[] =
        this.secondaryMetricFieldsDisplayed[metricType].split(' ');
      const props: {[key: string]: any} =
        this._metricManagers[metricType]?.collectionSchema.properties || {};

      if (secondaryDisplayedProp[0] && props[secondaryDisplayedProp[0]]) {
        if (props[secondaryDisplayedProp[0]].type === 'number') {
          if (+metricValue) {
            metricsMatchingBySecondaryField = metricOptions.filter(
              (option: {[key: string]: any}) => {
                return (
                  +option[secondaryDisplayedProp[0]] === +metricValue &&
                  option['name'] != this.formMetrics.get('name')?.value
                );
              },
            );
          }
        } else {
          metricsMatchingBySecondaryField = metricOptions.filter((option: {[key: string]: any}) => {
            let propValue =
              option[secondaryDisplayedProp[0]] &&
              typeof option[secondaryDisplayedProp[0]] === 'string'
                ? option[secondaryDisplayedProp[0]].toLowerCase()
                : '';
            if (
              secondaryDisplayedProp[0] === 'metric_data' &&
              secondaryDisplayedProp[1] &&
              secondaryDisplayedProp[1].length
            ) {
              propValue =
                option[secondaryDisplayedProp[0]] &&
                option[secondaryDisplayedProp[0]][secondaryDisplayedProp[1]]
                  ? option[secondaryDisplayedProp[0]][secondaryDisplayedProp[1]].toLowerCase()
                  : '';
            }
            return (
              propValue.includes(metricValue) &&
              option['name'] != this.formMetrics.get('name')?.value
            );
          });
        }
      }
    }
    return metricsMatchingBySecondaryField;
  }

  /**
   * Disables all Metric Selector fields if the Form mode is 'view'
   */
  private _setFieldInitialStatus(): void {
    this.isView.pipe(take(1)).subscribe(isView => {
      if (isView) {
        Object.keys(this.formMetrics.controls).forEach(key => this.formMetrics.get(key)?.disable());
        this.formDate.get('created_at')?.disable();
        this.formStatus.get('form_status_ref_id')?.disable();
      }
    });
  }

  private _isMetricAvailable(metrics: string[] | null, metricType: string) {
    if (!metrics || !metrics.length || metrics.includes(metricType)) {
      return true;
    }
    return false;
  }

  ngOnDestroy(): void {
    this._startingValuesSub.unsubscribe();
    this._metricDialogSub.unsubscribe();
    Object.keys(this.formMetricsSubs).forEach(metricType => {
      this.formMetricsSubs[metricType].unsubscribe();
    });
  }
}
