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

import {ChangeDetectionStrategy, Component, Optional, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AreaManager} from '@dino/core/areas';
import {MetricsService} from '@dino/core/data';
import {FormData} from '@dino/core/forms';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {MetricBasicInfo, UserGroupManager} from '@dino/core/users';
import {MetricFormField} from '@dino/material/metric-editor';
import {combineLatest, Observable, of as obsOf, Subject} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';

import {RequireMetricMatch} from './form-metric-selector-validator';

/**
 * This component allows the selection and association of Metrics to the created or edited Form.
 */
@Component({
  selector: 'dino-form-metric-selector',
  styleUrls: ['form-metric-selector.css'],
  templateUrl: 'form-metric-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormMetricSelector {
  /**
   * The Selector form group.
   */
  formMetrics: FormGroup;
  get selectedMetrics(): {[key: string]: MetricBasicInfo} {
    return this.formMetrics.value;
  }

  /**
   * The Selector form fields.
   */
  formMetricsFields: MetricFormField[] = [];

  /**
   * All the metrics fields values
   */
  formMetricsValues: {[key: string]: Observable<MetricBasicInfo | string>} = {};

  /**
   * All the metrics autocomplete options.
   */
  formMetricsOptions: {[key: string]: Observable<MetricBasicInfo[]>} = {};

  /**
   * True if the Form is in view mode
   */
  isView: Subject<boolean> = new Subject<boolean>();

  /**
   * The Form Data object of the edited / viewed form.
   */
  private _formData: Subject<{[key: string]: any}> = new Subject<{[key: string]: any}>();

  constructor(
    private _userGroupManager: UserGroupManager,
    private _metricService: MetricsService,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
  ) {
    const group: {[key: string]: FormControl} = {};

    if (this._areaManager != null) {
      const field = {
        fieldName: 'area',
        hint: `Thematic Area of the form`,
        placeholder: 'Thematic Area *',
        icon: 'volunteer_activism',
      };
      this.formMetricsFields.push(field);
      group['area'] = new FormControl(
        {
          metricName: null,
          metricId: null,
        },
        RequireMetricMatch,
      );
      this.formMetricsValues['area'] = group['area'].valueChanges;
      this._addFormMetricsOptions('area');
    }

    if (this._projectManager != null) {
      const field = {
        fieldName: 'project',
        hint: `Project associated with the form`,
        placeholder: 'Project *',
        icon: 'assignment',
      };
      this.formMetricsFields.push(field);
      group['project'] = new FormControl(
        {
          metricName: null,
          metricId: null,
        },
        RequireMetricMatch,
      );
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
      group['location'] = new FormControl(
        {
          metricName: null,
          metricId: null,
        },
        RequireMetricMatch,
      );
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
      group['organization'] = new FormControl(
        {
          metricName: null,
          metricId: null,
        },
        RequireMetricMatch,
      );
      this.formMetricsValues['organization'] = group['organization'].valueChanges;
      this._addFormMetricsOptions('organization');
    }

    const formGroup = new FormGroup(group);

    this.formMetrics = formGroup;

    this._setStartingValues();
    this._setFieldInitialStatus();
  }

  /**
   * Checks the form validation
   */
  isFormMetricsValid(): Observable<boolean> {
    return this.formMetrics.statusChanges.pipe(
      map(status => {
        return status === 'VALID' ? true : false;
      }),
    );
  }

  /**
   * Displays the Metric Name only in the Metric
   * autocomplete field.
   */
  displayMetricName(metric: MetricBasicInfo): string {
    return metric.metricName && metric.metricId ? metric.metricName : '';
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
   * Retrieves the existing values (if present) of the Form Metrics and
   * sets the form control values accordingly.
   */
  private _setStartingValues(): void {
    combineLatest([this._formData, this._userGroupManager.getActiveUserGroups()])
      .pipe(
        map(([formData, userGroups]) => {
          const startingValues: {[key: string]: MetricBasicInfo} = {};
          for (let activeMetric of this._metricService.activeMetrics.value) {
            if (formData[`${activeMetric.metricName}_id`] != null) {
              const availableMetrics: MetricBasicInfo[] = [];
              userGroups.map(group =>
                group.groupMetrics.map(metric =>
                  metric.metricType === activeMetric.metricName
                    ? availableMetrics.push(metric)
                    : null,
                ),
              );
              const startingMetric = availableMetrics.find(
                mtr => mtr.metricId === formData[`${activeMetric.metricName}_id`],
              );
              if (startingMetric != null) {
                startingValues[activeMetric.metricName] = {
                  metricName: startingMetric.metricName ?? null,
                  metricId: startingMetric.metricId ?? null,
                  metricType: startingMetric.metricType ?? null,
                };
              }
            }
          }
          return startingValues;
        }),
        take(1),
      )
      .subscribe(startingValues => {
        if (startingValues == null || Object.keys(startingValues).length <= 0) {
          return;
        }
        for (let sv in startingValues) {
          const strValue = startingValues[sv];
          const formControl = this.formMetrics.get(strValue.metricType);
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
    this.formMetricsOptions[metricType] = this._userGroupManager.getActiveUserGroups().pipe(
      switchMap(userGroups => {
        const availableMetrics: MetricBasicInfo[] = [];
        userGroups.map(group =>
          group.groupMetrics.map(metric =>
            metric.metricType === metricType ? availableMetrics.push(metric) : null,
          ),
        );

        return combineLatest([this.formMetricsValues[metricType], obsOf(availableMetrics)]);
      }),
      map(([metricValue, metricOptions]) => {
        if (metricValue != null && typeof metricValue === 'string') {
          const mtrName = metricValue.toLowerCase();
          return metricOptions.filter(option => {
            return (
              option.metricName.toLowerCase().includes(mtrName) &&
              option.metricName != this.formMetrics.get('name')?.value
            );
          });
        }
        return [];
      }),
    );
  }

  /**
   * Disables all Metric Selector fields if the Form mode is 'view'
   */
  private _setFieldInitialStatus(): void {
    this.isView.pipe(take(1)).subscribe(isView => {
      if (isView) {
        Object.keys(this.formMetrics.controls).forEach(key => this.formMetrics.get(key)?.disable());
      }
    });
  }
}
