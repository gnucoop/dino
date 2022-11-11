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
  Input,
  OnDestroy,
  Optional,
  ViewEncapsulation,
} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {DataModelManager, Metric, MetricsService} from '@dino/core/data';
import {FormData} from '@dino/core/forms';
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
  of,
  Subject,
  Subscription,
} from 'rxjs';
import {filter, map, shareReplay, startWith, switchMap, take} from 'rxjs/operators';

import {RequireMetricMatch, RequireNotNullMetricMatch} from './form-metric-selector-validator';

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
   * If true, Metrics can be created directly from the metric fields
   */
  @Input() allowMetricCreation: boolean = true;

  /**
   * The Selector metrics form group.
   */
  formMetrics: FormGroup;
  get selectedMetrics(): {[key: string]: Metric} {
    return this.formMetrics.value;
  }

  /**
   * The Selector metrics valueChanges
   */
  get selectedMetricsChanges(): Observable<{[key: string]: RxDocument<Metric>}> {
    return this.formMetrics.valueChanges;
  }

  /**
   * The Selector date form group.
   */
  formDate: FormGroup;

  /**
   * The form creation date
   */
  formCreationDate: Observable<Date>;

  /**
   * The Selector form fields.
   */
  formMetricsFields: MetricFormField[] = [];

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
  formMetricsOptions: {[key: string]: BehaviorSubject<Metric[]>} = {};

  /**
   * True if the Form is in view mode.
   */
  isView: Subject<boolean> = new Subject<boolean>();

  /**
   * True if the Form/Report can have one or more null Metrics.
   * Defaults to false.
   */
  private _hasOptionalMetrics: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  constructor(
    private _userGroupManager: UserGroupManager,
    private _metricService: MetricsService,
    private _dialog: MatDialog,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _caseManager: CaseManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
  ) {
    this.formCreationDate = this._formData.pipe(
      map(data => {
        return parse(data['created_at'], 'yyyy-MM-dd', new Date());
      }),
      take(1),
    );
    this.formCreationDate.subscribe(date => this.formDate.get('created_at')?.setValue(date));
    this.formDate = new FormGroup({'created_at': new FormControl(new Date(), Validators.required)});
    const group: {[key: string]: FormControl} = {};
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
      const field = {
        fieldName: 'area',
        hint: `Thematic Area of the form`,
        placeholder: 'Thematic Area *',
        icon: 'volunteer_activism',
      };
      this.formMetricsFields.push(field);
      group['area'] = new FormControl('', validatorFn);
      this.formMetricsValues['area'] = group['area'].valueChanges;
      this._addFormMetricsOptions('area');
    }
    if (this._caseManager != null) {
      const field = {
        fieldName: 'case',
        hint: `Case of the form`,
        placeholder: 'Case management *',
        icon: 'people',
      };
      this.formMetricsFields.push(field);
      group['case'] = new FormControl('', validatorFn);
      this.formMetricsValues['case'] = group['case'].valueChanges;
      this._addFormMetricsOptions('case');
    }

    if (this._projectManager != null) {
      const field = {
        fieldName: 'project',
        hint: `Project associated with the form`,
        placeholder: 'Project *',
        icon: 'assignment',
      };
      this.formMetricsFields.push(field);
      group['project'] = new FormControl('', validatorFn);
      this.formMetricsValues['project'] = group['project'].valueChanges;
      this._addFormMetricsOptions('project');
    }

    if (this._locationManager != null) {
      const field = {
        fieldName: 'location',
        hint: `Location of the collected data`,
        placeholder: 'Location *',
        icon: 'place',
      };
      this.formMetricsFields.push(field);
      group['location'] = new FormControl('', validatorFn);
      this.formMetricsValues['location'] = group['location'].valueChanges;
      this._addFormMetricsOptions('location');
    }

    if (this._organizationManager != null) {
      const field = {
        fieldName: 'organization',
        hint: `Organization associated with the form`,
        placeholder: 'Organization *',
        icon: 'public',
      };
      this.formMetricsFields.push(field);
      group['organization'] = new FormControl('', validatorFn);
      this.formMetricsValues['organization'] = group['organization'].valueChanges;
      this._addFormMetricsOptions('organization');
    }

    const formGroup = new FormGroup(group);

    this.formMetrics = formGroup;

    this._setStartingValues();
    this._setFieldInitialStatus();
  }

  ngAfterViewInit(): void {
    this._hasOptionalMetrics.pipe(take(1)).subscribe(optMetrics => {
      Object.keys(this.formMetrics.controls).forEach(key => {
        this.formMetrics.controls[key].setValidators(
          optMetrics ? RequireMetricMatch : RequireNotNullMetricMatch,
        );
        this.formMetrics.controls[key].updateValueAndValidity();
      });
    });
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
  displayMetricName(metric: Metric): string {
    if (metric == null) {
      return '';
    }
    return metric.name && metric.id ? metric.name : '';
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
          if (res) {
            const formControl = this.formMetrics.get(metricType);
            if (formControl) {
              formControl.setValue(res);
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
                return of(null);
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
              formControl.setValue(startValue);
            }
          }
        });
        const strValue = startingValues.find(val => val != null);
        if (strValue != null) {
          const formControl = this.formMetrics.get(strValue?.collection.name);
          if (formControl != null) {
            formControl.setValue(strValue);
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
    this.formMetricsSubs[metricType] = combineLatest([
      this._userGroupManager.getGroupsMetricsByType(metricType).pipe(
        switchMap(metricsIds => {
          const querySelector = {id: {$in: metricsIds}, is_deleted: {$ne: true}};
          if (this._metricManagers[metricType] == null) {
            return [];
          }
          if (metricsIds.includes('all')) {
            return this._metricManagers[metricType]!.query({
              selector: {is_deleted: {$ne: true}},
              sort: [{'name': 'asc'}],
            });
          }
          return this._metricManagers[metricType]!.query({selector: querySelector});
        }),
      ),
      this.formMetricsValues[metricType],
      this._newMetric,
    ])
      .pipe(
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
            return metricOptions.filter(option => {
              return (
                option.name.toLowerCase().includes(mtrName) &&
                option.name != this.formMetrics.get('name')?.value
              );
            });
          }
          return [];
        }),
      )
      .subscribe(metricOptions =>
        this.formMetricsOptions[metricType]
          ? this.formMetricsOptions[metricType].next(metricOptions)
          : (this.formMetricsOptions[metricType] = new BehaviorSubject<Metric[]>(metricOptions)),
      );
  }

  /**
   * Disables all Metric Selector fields if the Form mode is 'view'
   */
  private _setFieldInitialStatus(): void {
    this.isView.pipe(take(1)).subscribe(isView => {
      if (isView) {
        Object.keys(this.formMetrics.controls).forEach(key => this.formMetrics.get(key)?.disable());
        this.formDate.get('created_at')?.disable();
      }
    });
  }

  ngOnDestroy(): void {
    this._startingValuesSub.unsubscribe();
    this._metricDialogSub.unsubscribe();
    Object.keys(this.formMetricsSubs).forEach(metricType => {
      this.formMetricsSubs[metricType].unsubscribe();
    });
  }
}
