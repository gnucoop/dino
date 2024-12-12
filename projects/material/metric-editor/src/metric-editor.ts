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
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  UntypedFormArray,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {NetworkStatusService} from '@dino/core/auth';
import {DataModelManager, Metric, PermissionContextService} from '@dino/core/data';
import {FileUploadService, StorageUploadResponse} from '@dino/core/file-upload';
import {UserGroup, UserGroupManager} from '@dino/core/users';
import {TranslocoService} from '@ngneat/transloco';
import {format} from 'date-fns';
import {RxDocument, RxJsonSchema} from 'rxdb';
import {combineLatest, forkJoin, Observable, of as obsOf, Subscription, zip} from 'rxjs';
import {filter, map, switchMap, take, withLatestFrom} from 'rxjs/operators';
import {RequireMatch} from './metric-autocomplete-validator';

import {METRIC_DEFAULT_PROPERTIES} from './metric-defaults';
import {
  FormControlControlWithWarnings,
  FormGroupWithWarnings,
  NameMatchValidator,
} from './metric-name-validator';
import {ImageCapture} from '@dino/material/image-capture';

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
  metricAction?: 'View' | 'Edit' | 'Create';

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
 * Represents a Metric Data Attribute
 */
export interface MetricDataAttribute {
  attribute_name: string;
  attribute_value: string;
}

/**
 * Represents a Parent Metric field value object
 */
export interface ParentMetric {
  /**
   * The Parent metric parent id
   */
  parent_parent_id: string | null;
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
   * The Image Campture component
   */
  @ViewChild('imageCaptureComponent') imageCaptureComponent!: ImageCapture;

  /**
   * The name of the Metric
   */
  metricName?: string;

  /**
   * The form group derived from the Metric Schema.
   */
  metricForm?: FormGroupWithWarnings;

  /**
   * The form group of the metric additional attributes.
   */
  metricDataForm: UntypedFormGroup;

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
  private _saveEvt: EventEmitter<{metric: T; nameChanged: boolean}> = new EventEmitter<{
    metric: T;
    nameChanged: boolean;
  }>();

  /**
   * Subscribes to the save event.
   */
  private _saveSub: Subscription = Subscription.EMPTY;

  /**
   * The selected file
   */
  private _file?: File;

  /**
   * The selected file preview
   */
  preview?: string;

  /**
   * The max size for the case image
   */
  readonly maxImageFileSize = 1000000;

  constructor(
    private _router: Router,
    readonly snackbar: MatSnackBar,
    private _userGroupManager: UserGroupManager,
    private _contextService: PermissionContextService,
    public dialogRef: MatDialogRef<MetricEditor>,
    @Inject(MAT_DIALOG_DATA) public data: MetricDialogData<T>,
    private _nameMatchValidator: NameMatchValidator<T>,
    private _cdr: ChangeDetectorRef,
    private _ts: TranslocoService,
    private _fb: UntypedFormBuilder,
    private _nss: NetworkStatusService,
    readonly uploadService: FileUploadService,
  ) {
    if (data != null && data.metricManager != null) {
      this._metricManager = data.metricManager;
      const collName = this._metricManager.collectionName;
      this.metricName = collName.charAt(0).toUpperCase() + collName.slice(1);
    }

    this.metricDataForm = this._fb.group({attributes: this._fb.array([])}, null);
  }

  /**
   * Gets the attributes from metricDataForm
   * @returns The attributes FormArray
   */
  attributes(): UntypedFormArray {
    return this.metricDataForm.get('attributes') as UntypedFormArray;
  }

  /**
   * Creates a new formGroup attribute
   * @param attribute The new attribute
   * @returns the attribute group
   */
  newAttribute(attribute?: MetricDataAttribute): UntypedFormGroup {
    return this._fb.group({
      attribute_name: attribute && attribute.attribute_name ? attribute.attribute_name : '',
      attribute_value: attribute && attribute.attribute_value ? attribute.attribute_value : '',
    });
  }

  /**
   * Adds a new attribute to the attributes formgroup
   * @param attribute The attribute to be added
   */
  addAttribute(attribute?: MetricDataAttribute) {
    this.attributes().push(this.newAttribute(attribute));
  }

  /**
   * Removes an attribute from the attributes formgroup by index
   * @param i the index of the attribute to be removed
   */
  removeAttribute(i: number) {
    this.attributes().removeAt(i);
  }

  /**
   * Generates the metric_data metric field from the attributes formgroup value
   */
  generateMetricData(groupValue: {
    attributes: [{attribute_name: string; attribute_value: string}];
  }): {[key: string]: string} | null {
    if (groupValue == null) {
      return null;
    }
    const metric_data: {[key: string]: string} = {};
    groupValue.attributes.forEach(attr => {
      if (
        attr.attribute_name != null &&
        attr.attribute_value != null &&
        attr.attribute_name.length &&
        attr.attribute_value.length
      ) {
        metric_data[attr.attribute_name] = attr.attribute_value;
      }
    });
    return Object.keys(metric_data).length ? metric_data : null;
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
    const attributesFormValue = this.metricDataForm.value;
    const metric_data = this.generateMetricData(attributesFormValue);
    let hasMetricNameChanged: boolean = false;
    if (formValue != null && this.isFormValid() && this._metricManager != null) {
      let obj = {...formValue, metric_data};
      if (this.data.metricItem != null && this.data.metricAction === 'Edit') {
        const editedItem: T = this.data.metricItem;
        hasMetricNameChanged = !(editedItem.name === formValue['name']);
        obj = {...editedItem, ...formValue, metric_data};
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
      this._saveEvt.emit({metric: obj, nameChanged: hasMetricNameChanged});
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
        hint: this._ts.translate(`${this.metricName} Name`),
        placeholder: this._ts.translate(`${this.metricName} Name`),
        value: currentMetricItem['name'] ?? '',
      },
      {
        fieldName: 'parent',
        hint: this._ts.translate(`Parent ${this.metricName}`),
        placeholder: this._ts.translate(`Parent ${this.metricName}`),
        value: {
          parent_name: currentMetricItem['parent_name'] ?? null,
          parent_id: currentMetricItem['parent_id'] ?? null,
        },
      },
    ];

    group['name'] = new UntypedFormControl(
      currentMetricItem['name'] ?? '',
      Validators.required,
      this._nameMatchValidator.nameCheck(
        this._metricManager,
        this._cdr,
        currentMetricItem['name'],
        this.data.metricAction,
      ),
    ) as FormControlControlWithWarnings;
    group['parent'] = new UntypedFormControl(
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
        group[propKey] = new UntypedFormControl(
          currentMetricItem != null ? currentMetricItem![propKey] : null,
          propRequired ? Validators.required : null,
        ) as FormControlControlWithWarnings;
        const field: MetricFormField = {
          fieldName: propKey,
          hint: `${propValue['description']}${propRequired ? '' : ' (optional)'}`,
          placeholder: this._ts.translate(
            propKey.replace('0', ' ').charAt(0).toUpperCase() + propKey.replace('_', ' ').slice(1),
          ),
        };
        if (currentMetricItem[propKey]) {
          field['value'] = currentMetricItem[propKey];
        }
        fields.push(field);
      }
    }

    if (currentMetricItem['metric_data'] != null) {
      for (let attribute_name in currentMetricItem['metric_data']) {
        const attribute_value = currentMetricItem['metric_data'][attribute_name];
        this.addAttribute({attribute_name, attribute_value});
      }
    }

    const formGroup = new UntypedFormGroup(group) as FormGroupWithWarnings;

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

  snapshotPreview(event: any) {
    if (event == null) return;
    const snapshotFile = this._dataURLtoFile(event);
    if (snapshotFile && snapshotFile.size < this.maxImageFileSize) {
      this._file = snapshotFile;
      if (snapshotFile) {
        // Read file for preview
        this.preview = '';
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.preview = e.target.result;
          this._cdr.markForCheck();
        };
        reader.readAsDataURL(snapshotFile);
      }
    } else {
      this.snackbar.open('The maximum file size is 1MB', 'ERROR', {
        duration: 5000,
      });
    }
  }

  /**
   * Set locally the input file
   * @param event The input file selection event
   */
  onMetricFileSelected(event: any): void {
    if (
      event != null &&
      event.target != null &&
      event.target.files != null &&
      event.target.files.length
    ) {
      const file = event.target.files[0];
      if (file && file.size < this.maxImageFileSize) {
        this._file = event.target.files[0];
        if (file) {
          // Read file for preview
          this.preview = '';
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.preview = e.target.result;
            this._cdr.markForCheck();
          };
          reader.readAsDataURL(file);
        }
      } else {
        this.snackbar.open('The maximum file size is 1MB', 'ERROR', {
          duration: 5000,
        });
      }
    }
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

    this._saveSub = combineLatest([this._saveEvt, this._nss.isOnline$])
      .pipe(
        filter(() => this._metricManager != null),
        switchMap(([evt, isOnline]) => {
          const item: T = evt.metric;
          let uploadedFileObs: Observable<StorageUploadResponse | null> = obsOf(null);
          let deleteFileObs: Observable<any> = obsOf(null);
          if (this._file != null) {
            if (!isOnline) {
              this.snackbar.open('You are offline. The image will not be uploaded', 'WARNING', {
                duration: 5000,
              });
            } else {
              let itemCopy = item as any;
              if (itemCopy && itemCopy['image_file'] != null && itemCopy['image_file'].length) {
                deleteFileObs = this.uploadService.deleteFile(itemCopy['image_file']);
              }
              uploadedFileObs = this.uploadService.uploadFileInStorage(this._file);
            }
          }
          const zipArray = [obsOf(item), uploadedFileObs, deleteFileObs];
          if (evt.nameChanged) {
            zipArray.push(this._updateChildrenParentName(item));
          }
          return zip(zipArray);
        }),
        switchMap(res => {
          const metricManager = this._metricManager as DataModelManager<T>;
          let metricDoc: Observable<RxDocument<T> | null> = obsOf(null);
          let item = res[0] as any;
          if (this._file != null && res[1] != null) {
            const imageUrl = this.uploadService.getUploadedFileUrl(res[1]);
            if (imageUrl != null) {
              item['image_file'] = imageUrl;
            } else {
              this.snackbar.open('Something went wrong while saving the image.', 'WARNING', {
                duration: 5000,
              });
            }
          }
          if (this.data.metricAction === 'Edit') {
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
              return {parent_parent_id: doc.parent_id, parent_id: doc.id, parent_name: doc.name};
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
              option.parent_name != this.data.metricItem?.name &&
              (option.parent_parent_id == null ||
                option.parent_parent_id != this.data.metricItem?.id)
            );
          });
        }
        return [];
      }),
    );
  }

  /**
   * Changes the 'parent_name' attribute of all children metrics when the parent
   * metric name changes.
   * @param metric The metric whose name has changed
   * @returns True if all children were updated
   */
  private _updateChildrenParentName(metric: T): Observable<boolean> {
    if (metric == null || this._metricManager == null) {
      return obsOf(false);
    }
    return this._metricManager.query({selector: {parent_id: {$eq: metric.id}}}).pipe(
      switchMap(children => {
        if (!children.length) {
          return obsOf([]);
        }
        const patches: Observable<RxDocument<T> | null>[] = [];
        for (let child of children) {
          const updChild = {
            parent_name: metric.name,
            id: child.id,
          } as Partial<T> & {id: string};
          patches.push(this._metricManager!.patch(updChild).pipe(take(1)));
        }
        return forkJoin(patches);
      }),
      map(docs => {
        if (!docs.length || docs.includes(null)) {
          return false;
        }
        return true;
      }),
    );
  }

  private _dataURLtoFile(dataurl: string): File | null {
    const arr = dataurl.split(',');
    const arrMatch = arr[0].match(/:(.*?);/);
    if (arr == null || !arr.length || arr[0] == null || arrMatch == null) return null;
    let mime = arrMatch[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], 'snapshot.png', {type: mime});
  }

  ngOnDestroy(): void {
    this._saveSub.unsubscribe();
  }
}
