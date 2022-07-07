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

import {deepCopy} from '@ajf/core/utils';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {DataModelManager, Metric, PermissionContextService} from '@dino/core/data';
import {UserGroup, UserGroupManager} from '@dino/core/users';
import {format} from 'date-fns';
import {RxDocument, RxJsonSchema} from 'rxdb';
import {combineLatest, Observable, of as obsOf, Subscription, zip} from 'rxjs';
import {filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {RequireMatch} from './metric-autocomplete-validator';

import {METRIC_DEFAULT_PROPERTIES} from './metric-defaults';
import {
  FormControlControlWithWarnings,
  FormGroupWithWarnings,
  NameMatchValidator,
} from './metric-name-validator';

/**
 * Represents the data to be passed to a MetricEditor dialog.
 */
export interface MetricDialogData<T extends Metric = Metric> {
  /**
   * The manager passed to the dialog.
   */
  metricManager: DataModelManager<T>;

  /**
   * The selected Metric item.
   */
  metricItem?: T;

  /**
   * The dialog mode.
   */
  metricAction?: 'view' | 'edit' | 'create';

  /**
   * List of the names of fields that cannot be edited by the user
   */
  readOnlyFields?: string[];
}

/**
 * Represents a single Metric Form Field.
 */
export interface MetricFormField {
  /**
   * The field name.
   */
  fieldName: string;
  /**
   * The field hint.
   */
  hint?: string;
  /**
   * The field placeholder.
   */
  placeholder?: string;
  /**
   * The field starting value.
   */
  value?: any;
  /**
   * The field icon identifier.
   */
  icon?: string;
}

/**
 * Represents a Parent Metric field value object
 */
export interface ParentMetric {
  /**
   * The Parent metric name
   */
  parent_name: string | null;
  /**
   * The Parent metric uuid
   */
  parent_id: string | null;
}

/**
 * Dino Metric Editor component.
 * Allows the Admin to add and edit entries for any optional metric.
 * The generic type refers to the model of the Metric to be edited.
 */
@Component({
  selector: 'dino-metric-editor',
  templateUrl: 'metric-editor.html',
  styleUrls: ['metric-editor.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MetricEditor<T extends Metric = Metric> implements OnInit, OnDestroy {
  /**
   * The name of the Metric
   */
  metricName?: string;

  /**
   * The form group derived from the Metric Schema.
   */
  metricForm?: FormGroupWithWarnings;

  /**
   * The editor form fields
   */
  metricFormFields?: MetricFormField[];

  /**
   * The value of the Parent metric name (autcomplete)
   */
  metricParentValue: Observable<string | ParentMetric> = new Observable<string | ParentMetric>();

  /**
   * The available Parent options
   */
  parentOptions?: Observable<ParentMetric[]>;

  /**
   * The data model manager used to retrieve and edit the items of
   * the relative Metric.
   */
  private _metricManager?: DataModelManager<T>;

  /**
   * Emits when a metric is created or edited.
   */
  private _saveEvt: EventEmitter<T> = new EventEmitter<T>();

  /**
   * Subscribes to the save event.
   */
  private _saveSub: Subscription = Subscription.EMPTY;

  constructor(
    private _router: Router,
    readonly snackbar: MatSnackBar,
    private _userGroupManager: UserGroupManager,
    private _contextService: PermissionContextService,
    public dialogRef: MatDialogRef<MetricEditor>,
    @Inject(MAT_DIALOG_DATA) public data: MetricDialogData<T>,
    private _nameMatchValidator: NameMatchValidator<T>,
    private _cdr: ChangeDetectorRef,
  ) {
    if (data != null && data.metricManager != null) {
      this._metricManager = data.metricManager;
      this.metricName = this._metricManager.collectionName.toUpperCase();
    }
  }

  /**
   * Closes the editor without saving
   *
   */
  closeEditor(): void {
    this.dialogRef.close();
  }

  /**
   * Saves the metric and closes the editor
   */
  saveMetric(): void {
    if (this.metricForm == null) {
      return;
    }
    const formValue = this.metricForm.value;
    if (formValue != null && this.isFormValid() && this._metricManager != null) {
      let obj = {...formValue};
      if (this.data.metricItem != null && this.data.metricAction === 'edit') {
        const editedItem: T = this.data.metricItem;
        obj = {...editedItem, ...formValue};
      }
      delete obj.parent;
      obj['parent_id'] = formValue.parent.parent_id;
      obj['parent_name'] = formValue.parent.parent_name;

      for (let key of Object.keys(obj)) {
        if (key.includes('date') && obj[key] != null && typeof obj[key] === 'object') {
          try {
            obj[key] = format(new Date(obj[key]), 'yyyy-MM-dd');
          } catch (e) {}
        }
      }
      this._saveEvt.emit(obj);
    }
  }

  /**
   * Displays the parent Name only in the Parent
   * autocomplete field.
   */
  displayParentName(parent: ParentMetric): string {
    return parent.parent_name && parent.parent_id ? parent.parent_name : '';
  }

  /**
   * Checks the form validation
   */
  isFormValid(): boolean {
    return this.metricForm != null && this.metricForm.valid;
  }

  /**
   * Generates and populates the editor form based on the metric schema.
   * @param schema
   * @param metricItem? The selected Metric Item to open
   */
  private _schemaToForm(schema: RxJsonSchema<T>, metricItem?: T): void {
    if (schema == null || this._metricManager == null) {
      return;
    }
    const currentMetricItem = metricItem || ({} as {[key: string]: any});
    const group: {[key: string]: FormControlControlWithWarnings} = {};
    const fields: MetricFormField[] = [
      {
        fieldName: 'name',
        hint: `The name of the ${this.metricName}`,
        placeholder: 'Name',
        value: currentMetricItem['name'] ?? '',
      },
      {
        fieldName: 'parent',
        hint: `The parent ${this.metricName}`,
        placeholder: 'Parent',
        value: {
          parent_name: currentMetricItem['parent_name'] ?? null,
          parent_id: currentMetricItem['parent_id'] ?? null,
        },
      },
    ];

    group['name'] = new FormControl(
      currentMetricItem['name'] ?? '',
      Validators.required,
      this._nameMatchValidator.nameCheck(
        this._metricManager,
        this._cdr,
        currentMetricItem['name'],
        this.data.metricAction,
      ),
    ) as FormControlControlWithWarnings;
    group['parent'] = new FormControl(
      {
        parent_name: currentMetricItem['parent_name'] ?? null,
        parent_id: currentMetricItem['parent_id'] ?? null,
      },
      RequireMatch,
    ) as FormControlControlWithWarnings;

    this.metricParentValue = group['parent'].valueChanges;

    for (let propK in schema.properties) {
      if (this.data.readOnlyFields && this.data.readOnlyFields.includes(propK)) {
        continue;
      }
      const propKey = propK as Extract<keyof T, string>;
      const propValue = schema.properties[propKey];
      const propRequired =
        schema.required!.indexOf(propKey) >= 0 &&
        !(propValue.type?.length && propValue.type.indexOf('null') > 0);
      if (METRIC_DEFAULT_PROPERTIES.indexOf(propKey) < 0) {
        group[propKey] = new FormControl(
          currentMetricItem != null ? currentMetricItem![propKey] : null,
          propRequired ? Validators.required : null,
        ) as FormControlControlWithWarnings;
        const field: MetricFormField = {
          fieldName: propKey,
          hint: `${propValue['description']} ${propRequired ? '' : '  (optional)'}`,
          placeholder:
            propKey.replace('0', ' ').charAt(0).toUpperCase() + propKey.replace('_', ' ').slice(1),
        };
        fields.push(field);
      }
    }
    const formGroup = new FormGroup(group) as FormGroupWithWarnings;

    this.metricForm = formGroup;
    this.metricFormFields = fields;
  }

  /**
   * Updates the current user permission groups by adding the just created metric
   * to those groups.
   * @param metricDoc The created Metric
   * @param groups The currente active user permission Groups
   */
  private _updateUserGroups(
    metricDoc: RxDocument<T> | null,
    groups: RxDocument<UserGroup>[],
  ): Observable<RxDocument<UserGroup> | null>[] {
    if (metricDoc == null || groups == null || !groups.length) {
      return [];
    }
    const metricKey = `${metricDoc.collection.name}_ref_id` as keyof UserGroup;
    const groupUpdates: Observable<RxDocument<UserGroup> | null>[] = [];
    groups.forEach(group => {
      const groupClone = deepCopy(group);
      const groupMetricIds: string[] = groupClone[metricKey] as string[];
      if (groupMetricIds && !groupMetricIds.includes('all')) {
        groupMetricIds.push(metricDoc.id);
        groupUpdates.push(this._userGroupManager.update(groupClone));
      }
    });
    return groupUpdates;
  }

  ngOnInit(): void {
    if (this.data != null && this._metricManager != null) {
      this._schemaToForm(this._metricManager.collectionSchema, this.data.metricItem);
    }

    if (this._metricManager == null) {
      this._router.navigateByUrl('');
      this.snackbar.open('Oops! Something went wrong opening the Metric', 'ERROR', {
        duration: 5000,
      });
      throw new Error('No metric manager was provided');
    }

    this._saveSub = this._saveEvt
      .pipe(
        filter(() => this._metricManager != null),
        switchMap(item => {
          const metricManager = this._metricManager as DataModelManager<T>;
          let metricDoc: Observable<RxDocument<T> | null>;
          if (this.data.metricAction === 'edit') {
            metricDoc = metricManager.update(item);
          } else {
            metricDoc = metricManager.create(item);
          }
          return combineLatest([metricDoc, this._userGroupManager.getActiveUserGroups()]);
        }),
        switchMap(([res, userGroups]) => {
          const updatedUserGroups = this._updateUserGroups(res, userGroups);
          let groupUpdates = updatedUserGroups.length ? zip(updatedUserGroups) : obsOf(false);
          return combineLatest([
            obsOf(res),
            this._contextService.permissionContext.pipe(take(1)),
            groupUpdates,
          ]);
        }),
      )
      .subscribe(([res, context, _]) => {
        const contextUserMetrics: {[metricKey: string]: string[]} | null = context['user_metrics'];
        if (
          contextUserMetrics != null &&
          res != null &&
          !contextUserMetrics[res.collection.name].includes('all')
        ) {
          contextUserMetrics[res.collection.name].push(res.id);
          this._userGroupManager.addToContext({user_metrics: contextUserMetrics});
        }
        this.dialogRef.close(res);
        if (res == null) {
          this.snackbar.open(`Oops! Something went wrong while saving the Metric.`, 'SAVE ERROR', {
            duration: 10000,
          });
        } else {
          this.snackbar.open(`Metric saved`, 'METRIC SAVED', {duration: 10000});
        }
      });

    this.parentOptions = this.metricParentValue.pipe(
      withLatestFrom(
        this._metricManager.list().pipe(
          map(docs =>
            docs.map(doc => {
              return {parent_id: doc.id, parent_name: doc.name};
            }),
          ),
        ),
      ),
      map(([parent, parentOptions]) => {
        if (parent != null && typeof parent === 'string') {
          const parentName = parent.toLowerCase();
          return parentOptions.filter(option => {
            return (
              option.parent_name.toLowerCase().includes(parentName) &&
              this.metricForm != null &&
              option.parent_name != this.metricForm.get('name')?.value
            );
          });
        }
        return [];
      }),
    );
  }

  ngOnDestroy(): void {
    this._saveSub.unsubscribe();
  }
}
