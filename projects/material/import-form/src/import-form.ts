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

import {TranslocoService} from '@ajf/core/transloco';
import {deepCopy} from '@ajf/core/utils';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormGroupDirective,
  NgForm,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {
  DataModelManager,
  getValueFromRow,
  InsertModel,
  Metric,
  MetricsService,
} from '@dino/core/data';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {
  FormData,
  FormDataImportService,
  FormDataManager,
  FormSchema,
  FormSchemaManager,
  FormStatus,
  FormStatusManager,
} from '@dino/core/forms';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {UserData, UserDataManager, UserGroupManager} from '@dino/core/users';
import {format} from 'date-fns';
import {RxDocument} from 'rxdb';
import {forkJoin, Observable, of as obsOf, Subscription, zip} from 'rxjs';
import {catchError, map, shareReplay, switchMap, take, withLatestFrom} from 'rxjs/operators';

/**
 * The mapping between a file column and a target field
 */
export interface ColumnMapping {
  /**
   * The column name found in the file
   */
  column: string;

  /**
   * The target field name. If null, the column will be ignored.
   */
  field: string | null;

  /**
   * The form control bound to the field select, used to drive the mat-error
   * state when the field is mapped by more than one column.
   */
  control?: UntypedFormControl;

  /**
   * For a column mapped to a repeating-slide field, the repetition order chosen
   * by the user. Columns of the same repeating field are sorted by this value
   * and then compacted into contiguous indices (`field__0`, `field__1`, ...).
   * Undefined for non-repeating fields.
   */
  repetition?: number;
}

/**
 * The data passed to the Import Form dialog
 */
export interface ImportFormDialogData {
  /**
   * The id of the form schema the data will be imported into
   */
  formSchema: string;

  /**
   * Whether the form schema can have one or more null metrics
   */
  hasOptionalMetrics: boolean;
}

/**
 * All metric details found in rows
 */
interface MetricInfoInRows {
  /**
   * Metrics to be created by name
   */
  newMetrics: {[key: string]: {[key: string]: any}[]};

  /**
   * Metric ids found in rows, which must exist.
   */
  requiredMetricIdsByType: {[key: string]: string[]};

  /**
   * Type of missing metrics in rows
   */
  missingMetrics: string[];
}

/**
 * The Form Data import component.
 * Allows importing of Xls or Csv file with form data, which will be processed
 * and saved as Form Datas.
 */
@Component({
  selector: 'dino-import-form',
  styleUrls: ['import-form.scss'],
  templateUrl: 'import-form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ImportForm implements OnInit, OnDestroy, ErrorStateMatcher {
  /**
   * The id of the form schema the data will be imported into.
   */
  @Input() formSchemaId: string | null = null;

  /**
   * Whether the form schema can have one or more null metrics.
   */
  @Input() hasOptionalMetrics: boolean = false;

  /**
   * Emitted when the user leaves the wizard without importing (Close / Back on
   * the first step). The host navigates back to the form-data list.
   */
  @Output() cancelled = new EventEmitter<void>();

  /**
   * Emitted once the import has completed successfully. The host navigates back
   * to the form-data list.
   */
  @Output() imported = new EventEmitter<void>();

  /**
   * The current wizard step: 1 = upload file, 2 = map fields.
   */
  step: 1 | 2 = 1;

  /**
   * The name of the selected file, shown in the upload success chip.
   */
  fileName = '';

  /**
   * Live search filter applied to the mapping rows (by file column name or
   * mapped field label).
   */
  search = '';

  /**
   * Current status message of the Import Form
   */
  importStatus = '';

  /**
   * The Import dialog form group
   */
  readonly importForm: UntypedFormGroup;

  /**
   * The columns found in the selected file, each one with the mapped target
   * field. A null field means the column will be ignored during import.
   */
  columnMappings: ColumnMapping[] = [];

  /**
   * All the available target fields for the column mapping
   */
  availableFields: string[] = [];

  /**
   * Maps each repeating-slide field (offered in the select as a single base
   * entry) to the name of its repeating slide, used to assign the repetition
   * indices and to store the repetition count at import time.
   */
  private _repeatingFields: {[fieldName: string]: string} = {};

  /**
   * Maps each table cell (offered in the select by its data key
   * `name__<row>__<column>`) to its table name and row/column labels, used to
   * show a readable label for the cell in the field select.
   */
  private _tableFields: {
    [cellKey: string]: {tableName: string; rowLabel: string; columnLabel: string};
  } = {};

  /**
   * Sentinel value used as the "Ignore column" select option. A non-null value
   * is required so the mat-select shows the selected option (Angular Material
   * treats a null value as no selection, leaving the trigger blank). It is
   * mapped back to "no field" when the rows are imported.
   */
  readonly ignoreFieldValue = '__dino_ignore_column__';

  /**
   * Control bound to the search input used to filter the available fields
   */
  readonly fieldFilterCtrl = new UntypedFormControl('');

  /**
   * Fields mapped by more than one column
   */
  duplicateFields: string[] = [];

  /**
   * The column mapping whose field select is currently open. The full list of
   * available field options is rendered only for this mapping: every other
   * (closed) select renders just its selected option, so the dialog does not
   * instantiate one mat-option per available field for every column at once.
   */
  openedMapping: ColumnMapping | null = null;

  /**
   * True while the selected file is being read and its columns parsed.
   * Used to show a loading spinner.
   */
  isLoading: boolean = false;

  /**
   * Reference to the native file input, used to reset the selection
   * when going back to the file selection step.
   */
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  /**
   * The Form schema object
   */
  private _formSchema: Observable<FormSchema | null>;

  /**
   * The selected file
   */
  private _file?: Blob;

  /**
   * The rows parsed from the selected file
   */
  private _rows: {[key: string]: any}[] = [];

  /**
   * True if the form is currently being processed.
   * Defaults to true.
   */
  private _processing: boolean = true;
  get processing(): boolean {
    return this._processing;
  }

  /**
   * Dino fields that should not be included in the data field
   */
  private _dinoFields: string[] = [
    'id',
    'created_at',
    'user_data_ref_id',
    'area_ref_id',
    'case_ref_id',
    'location_ref_id',
    'organization_ref_id',
    'project_ref_id',
    'form_status_ref_id',
  ];

  /**
   * The roles granting Admin permissions
   */
  private adminRoles = ['admin'];

  /**
   * If true, metric name must be unique
   */
  private _metricMustBeUnique: boolean = false;

  /**
   * All metric managers
   */
  private _metricManagers: {[key: string]: DataModelManager<any> | null} = {
    area: this._ar,
    case: this._cs,
    project: this._pj,
    location: this._lc,
    organization: this._og,
  };

  /**
   * Subscribes to the userData
   */
  private _userDataSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the validate xlsx data function
   */
  private _validateDataSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the form schema to build the column mappings
   */
  private _columnMappingsSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the field search input to filter the available fields
   */
  private _fieldFilterSub: Subscription = Subscription.EMPTY;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _formBuilder: UntypedFormBuilder,
    private _formDataManager: FormDataManager,
    private _formSchemaManager: FormSchemaManager,
    private _udm: UserDataManager,
    private _ugm: UserGroupManager,
    private _ts: TranslocoService,
    private _fsm: FormStatusManager,
    private _ehms: ErrorHandlerMessageService,
    readonly metricsService: MetricsService,
    private _importService: FormDataImportService,
    private _snackbar: MatSnackBar,
    @Optional() private _ar: AreaManager | null,
    @Optional() private _cs: CaseManager | null,
    @Optional() private _pj: ProjectManager | null,
    @Optional() private _lc: LocationManager | null,
    @Optional() private _og: OrganizationManager | null,
  ) {
    this._formSchema = obsOf(null);

    this.importForm = this._formBuilder.group({
      reuseMetricName: [true],
    });

    this._fieldFilterSub = this.fieldFilterCtrl.valueChanges.subscribe(() =>
      this._cdr.markForCheck(),
    );
  }

  ngOnInit(): void {
    if (this.formSchemaId) {
      this._formSchema = this._formSchemaManager.get(this.formSchemaId).pipe(
        map(doc => (doc == null ? null : (doc.toJSON() as FormSchema))),
        shareReplay(1),
      );
    } else {
      this._formSchema = obsOf(null);
    }
  }

  // ---- Wizard navigation & derived view data --------------------------------

  /**
   * Navigates to a wizard step. Step 2 is reachable only once a file has been
   * parsed (there are column mappings to show).
   * @param step The target step
   */
  goToStep(step: 1 | 2): void {
    if (step === 2 && !this.columnMappings.length) {
      return;
    }
    this.step = step;
    this._cdr.markForCheck();
  }

  /**
   * The mapping rows matching the current search filter (by file column name or
   * mapped field label). Used to render the mapping table.
   */
  get filteredMappings(): ColumnMapping[] {
    const q = this.search.trim().toLowerCase();
    if (!q) {
      return this.columnMappings;
    }
    return this.columnMappings.filter(
      m => m.column.toLowerCase().includes(q) || this.fieldLabel(m.field).toLowerCase().includes(q),
    );
  }

  /**
   * Whether a mapping is ignored (explicitly skipped or mapped to the ignore
   * sentinel).
   * @param mapping The column mapping
   */
  isIgnored(mapping: ColumnMapping): boolean {
    return mapping.field === this.ignoreFieldValue;
  }

  /**
   * Whether a mapping targets a real field (mapped, not ignored).
   * @param mapping The column mapping
   */
  isMapped(mapping: ColumnMapping): boolean {
    return mapping.field != null && mapping.field !== this.ignoreFieldValue;
  }

  /**
   * Summary counts shown as chips in the mapping toolbar.
   */
  get summary(): {total: number; mapped: number; ignored: number} {
    let mapped = 0;
    let ignored = 0;
    this.columnMappings.forEach(m => {
      if (this.isIgnored(m)) {
        ignored++;
      } else if (this.isMapped(m)) {
        mapped++;
      }
    });
    return {total: this.columnMappings.length, mapped, ignored};
  }

  /**
   * The status pill descriptor for a mapping row.
   * @param mapping The column mapping
   */
  statusOf(mapping: ColumnMapping): {label: string; kind: 'mapped' | 'unmapped' | 'ignored'} {
    if (this.isIgnored(mapping)) {
      return {label: this._ts.translate('Ignored'), kind: 'ignored'};
    }
    if (this.isMapped(mapping)) {
      return {label: this._ts.translate('Mapped'), kind: 'mapped'};
    }
    return {label: this._ts.translate('Not mapped'), kind: 'unmapped'};
  }

  /**
   * Toggles a column between ignored and unmapped.
   * @param mapping The column mapping
   */
  toggleIgnore(mapping: ColumnMapping): void {
    const nowIgnored = !this.isIgnored(mapping);
    this.onMappingChange(mapping, nowIgnored ? this.ignoreFieldValue : null);
    if (mapping.control) {
      mapping.control.setValue(mapping.field);
    }
  }

  /**
   * Guesses a target field for every still-unmapped, non-ignored column by a
   * case-insensitive substring match between the file column name and each
   * field name or its label, then assigns it.
   */
  autoMatch(): void {
    this.columnMappings.forEach(mapping => {
      if (mapping.field != null) {
        return;
      }
      const src = mapping.column.toLowerCase();
      const match = this.availableFields.find(
        f => src.includes(f.toLowerCase()) || src.includes(this.fieldLabel(f).toLowerCase()),
      );
      if (match) {
        this.onMappingChange(mapping, match);
        if (mapping.control) {
          mapping.control.setValue(match);
        }
      }
    });
    this._cdr.markForCheck();
  }

  /**
   * Handles a file dropped onto the upload drop zone.
   * @param event The drag drop event
   */
  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this._file = file;
      this.fileName = file.name;
      this._readFile(file);
    }
  }

  /**
   * Allows dropping by preventing the browser's default (open file) behavior.
   * @param event The drag over event
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  /**
   * Whether a field option matches the current search input. Non matching
   * options are hidden (not removed) so each select keeps its selected value
   * even while another select is being filtered.
   * @param field The field option
   * @returns true if the option should be visible
   */
  isFieldVisible(field: string): boolean {
    const search = (this.fieldFilterCtrl.value || '').toLowerCase().trim();
    return !search || field.toLowerCase().includes(search);
  }

  /**
   * Track the field options by their value so Angular reuses the mat-option
   * DOM nodes while the user filters the list.
   * @param _index The option index
   * @param field The field option
   * @returns The field itself as tracking key
   */
  trackByField(_index: number, field: string): string {
    return field;
  }

  /**
   * Whether the given field is a repeating-slide field (offered as a single
   * base entry that can be mapped by more than one column).
   * @param field The field name
   * @returns true if the field belongs to a repeating slide
   */
  isRepeatingField(field: string | null): boolean {
    return field != null && this._repeatingFields[field] !== undefined;
  }

  /**
   * Whether the given field is a table cell (offered as a single entry per cell,
   * identified by its `name__<row>__<column>` data key).
   * @param field The field name
   * @returns true if the field is a table cell
   */
  isTableField(field: string | null): boolean {
    return field != null && this._tableFields[field] !== undefined;
  }

  /**
   * The label shown for a field option / select trigger.
   * @param field The field name (or the ignore sentinel / null)
   * @returns The localized, user facing label
   */
  fieldLabel(field: string | null): string {
    if (field === this.ignoreFieldValue) {
      return this._ts.translate('Ignore column');
    }
    if (field == null) {
      return '';
    }
    if (this.isTableField(field)) {
      const cell = this._tableFields[field];
      const rowLabel = this._ts.translate(cell.rowLabel);
      const columnLabel = this._ts.translate(cell.columnLabel);
      return `${cell.tableName} [${rowLabel} / ${columnLabel}]`;
    }
    return this.isRepeatingField(field) ? `${field} (${this._ts.translate('repeating')})` : field;
  }

  /**
   * Update the repetition order of a column mapped to a repeating field.
   * @param mapping The column mapping
   * @param event The number input change event
   */
  onRepetitionChange(mapping: ColumnMapping, event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    mapping.repetition = isNaN(value) ? 0 : Math.max(0, value);
    this._cdr.markForCheck();
  }

  /**
   * Render the full field list for the opened select only, and reset the field
   * search when it is closed, so its trigger keeps showing the selected value
   * and the next dropdown opens with the full list.
   * @param opened The select opened state
   * @param mapping The column mapping owning the select
   */
  onFieldSelectOpenedChange(opened: boolean, mapping: ColumnMapping): void {
    this.openedMapping = opened ? mapping : null;
    if (!opened && this.fieldFilterCtrl.value) {
      this.fieldFilterCtrl.setValue('');
    }
    this._cdr.markForCheck();
  }

  /**
   * Updates the status message of the Import Form
   * @param msg The message string
   */
  private _setImportStatus(msg: string): void {
    this.importStatus = msg;
    // Hide the loading spinner as soon as a terminal status message is shown.
    // The empty (clearing) message and the in-progress "Importing file..."
    // message keep the spinner visible.
    if (msg !== '' && msg !== this._ts.translate('Importing file...')) {
      this.isLoading = false;
      // Surface the terminal outcome as a snackbar (per the redesign), colored
      // green for a successful import and red otherwise.
      const success = msg.startsWith(this._ts.translate('File imported successfully'));
      this._snackbar.open(msg, this._ts.translate('DISMISS'), {
        duration: success ? 5000 : 10000,
        panelClass: success ? 'dino-import-snack-success' : 'dino-import-snack-error',
      });
    }
    this._cdr.markForCheck();
  }

  /**
   * Save the input file and read its columns to build the column mappings
   * @param event The input file selection event
   */
  onExcelfileSelected(event: any): void {
    if (event.target.files.length === 0) {
      return;
    }
    this._file = event.target.files[0];
    this.fileName = (this._file as File).name ?? '';
    this._readFile(this._file as Blob);
  }

  /**
   * Update the column mapping with the selected field
   * @param mapping The column mapping to be updated
   * @param field The selected target field
   */
  onMappingChange(mapping: ColumnMapping, field: string | null): void {
    mapping.field = field;
    if (this.isRepeatingField(field)) {
      // Default the repetition order to the next free slot for this field, so
      // mapping several columns to the same repeating field auto-numbers them
      mapping.repetition = this.columnMappings.filter(m => m.field === field).length - 1;
    } else {
      mapping.repetition = undefined;
    }
    this._updateDuplicateFields();
    this._cdr.markForCheck();
  }

  /**
   * ErrorStateMatcher implementation: a field select is in error state when its
   * selected field is mapped by more than one column.
   * @param control The select form control
   * @returns true if the control's field is a duplicate
   */
  isErrorState(
    control: AbstractControl | null,
    _form: FormGroupDirective | NgForm | null,
  ): boolean {
    return control != null && control.value != null && this.duplicateFields.includes(control.value);
  }

  /**
   * Start processing the Xlsx file
   */
  apply(): void {
    if (this._file == null || this.duplicateFields.length > 0) {
      return;
    }
    this._processing = true;
    this.isLoading = true;
    this._cdr.markForCheck();
    this._metricMustBeUnique = this.importForm.controls['reuseMetricName'].value;
    this._processData(this._applyColumnMappings(this._rows));
  }

  /**
   * Go back to the file selection step, resetting the parsed file and the
   * column mappings so the user can choose a different file.
   */
  back(): void {
    this._file = undefined;
    this.fileName = '';
    this._rows = [];
    this.columnMappings = [];
    this.availableFields = [];
    this._repeatingFields = {};
    this._tableFields = {};
    this.fieldFilterCtrl.setValue('');
    this.search = '';
    this.duplicateFields = [];
    this.openedMapping = null;
    this.isLoading = false;
    this._processing = true;
    this.step = 1;
    this._setImportStatus('');
    if (this.fileInput) {
      // Clear the input value so re-selecting the same file fires the change event
      this.fileInput.nativeElement.value = '';
    }
    this._cdr.markForCheck();
  }

  /**
   * Footer "Back" action: from the mapping step return to the upload step;
   * from the upload step leave the wizard.
   */
  onBack(): void {
    if (this.step === 2) {
      this.back();
    } else {
      this.cancel();
    }
  }

  /**
   * Leaves the wizard without importing (host navigates back to the list).
   */
  cancel(): void {
    this.cancelled.emit();
  }

  /**
   * Check and return, if unique enabled (_metricMustBeUnique must be true),
   * the existing metrics, that have the same name of the new metrics
   * @param newMetrics the new metrics to be created
   * @returns the existing list of metrics by name
   */
  private _checkIfMetricsAlreadyExist(newMetrics: {
    [key: string]: {[key: string]: any}[];
  }): Observable<any[][]> {
    const metricsObs: Observable<any[]>[] = [];
    if (this._metricMustBeUnique) {
      Object.keys(newMetrics).forEach(metricType => {
        const manager = this._metricManagers[metricType];
        if (manager !== null) {
          if (newMetrics[metricType] && newMetrics[metricType].length) {
            const allMetricNames: string[] = newMetrics[metricType].map(m => m['name']);
            const selector = {
              selector: {name: {$in: allMetricNames}, is_deleted: {$ne: true}},
            };
            metricsObs.push(
              manager.query(selector).pipe(
                take(1),
                catchError(err => {
                  this._ehms.captureErrorMessage(
                    `Error while searching for already existing metrics with the same name: ${JSON.stringify(
                      err,
                    )}`,
                    'error',
                  );
                  return obsOf([]);
                }),
              ),
            );
          }
        }
      });
    }
    return metricsObs.length ? forkJoin(metricsObs) : obsOf([]);
  }

  /**
   * Return requested metrics by ids
   * @param metricIdsByType
   * @returns the existing list of metrics by ids
   */
  private _getMetricsIfExist(metricIdsByType: {[key: string]: string[]}): Observable<any[][]> {
    const metricsObs: Observable<any[]>[] = [];
    Object.keys(metricIdsByType).forEach(metricType => {
      const manager = this._metricManagers[metricType];
      if (manager !== null) {
        if (metricIdsByType[metricType] && metricIdsByType[metricType].length) {
          const selector = {
            selector: {id: {$in: metricIdsByType[metricType]}, is_deleted: {$ne: true}},
          };
          metricsObs.push(
            manager.query(selector).pipe(
              take(1),
              catchError(_ => obsOf([])),
            ),
          );
        }
      }
    });
    return metricsObs.length ? forkJoin(metricsObs) : obsOf([]);
  }

  /**
   * Get from rows all new metrics to be created and all ids for required metrics:
   * newMetrics: {
   *  project: [
   *   {name: 'Proj1', code: 'code01'},
   *   {name: 'Proj2', code: 'code02'},
   *  ],
   *  area: [
   *   {name: 'Area1'},
   *   {name: 'Area2'},
   *  ], ...
   * },
   * requiredMetricIdsByType: {
   *  project: [uuid1, uuid2],
   *  area: [uuid3, uuid4], ...
   * },
   * @param rows The new FormData rows
   * @param activeMetrics The list of the currently active metrics
   * @returns An object with all metric info to be created and to be check
   */
  private _getMetricsToBeCreated(
    rows: {[key: string]: any}[],
    activeMetrics: string[],
  ): MetricInfoInRows {
    const newMetrics: {[key: string]: {[key: string]: any}[]} = {};
    const requiredMetricIdsByType: {[key: string]: string[]} = {};
    let missingMetrics: string[] = [];

    if (activeMetrics.length) {
      activeMetrics.forEach(metric => {
        const manager = this._metricManagers[metric];
        if (manager !== null) {
          const newMetricNames: string[] = [];
          const metricIdKey = metric + '_id';
          const metricNameKey = metric + '_name';

          const requiredProps = manager.collectionSchema.required
            ? manager.collectionSchema.required
            : ['name'];
          const props = manager.collectionSchema.properties;
          // Exclude the auto-generated props from the mapping targets without
          // mutating the shared collection schema
          const propKeys = Object.keys(props).filter(prop => {
            if (metric === 'case' && prop === 'code') {
              return false;
            }
            if (metric === 'project' && prop === 'code_auto') {
              return false;
            }
            return true;
          });

          rows.forEach((row: {[key: string]: any}) => {
            // Check if is not a second header
            if (!this._isLabelHeader(row)) {
              const rawNewMetricName = row[metricNameKey];
              const newMetricName = rawNewMetricName ? (rawNewMetricName as string).trim() : null;
              if (newMetricName && !row[metricIdKey]) {
                // Metric by name
                if (!newMetricNames.includes(newMetricName)) {
                  // Metric already in the new metric list to be created
                  newMetricNames.push(newMetricName);
                  let newMetric: {[key: string]: any} = {};

                  // TODO se required deve esserci e not null e not empty!
                  for (let prop of propKeys) {
                    const propKey = `${metric}_${prop}`;
                    if (requiredProps.includes(prop) || row[propKey]) {
                      if (prop === 'metric_data') {
                        newMetric[prop as string] = JSON.parse(row[propKey]);
                      } else {
                        newMetric[prop as string] = getValueFromRow(
                          row[propKey],
                          propKey,
                          props[prop].type,
                        );
                      }
                    }
                  }

                  if (!(metric in newMetrics)) {
                    newMetrics[metric] = [];
                  }
                  newMetrics[metric].push(newMetric);
                }
              } else if (row[metricIdKey]) {
                // Metric by id
                if (!(metric in requiredMetricIdsByType)) {
                  requiredMetricIdsByType[metric] = [];
                }
                if (!requiredMetricIdsByType[metric].includes(row[metricIdKey])) {
                  requiredMetricIdsByType[metric].push(row[metricIdKey]);
                }
              } else {
                // No metric for this row
                missingMetrics.push(metric);
              }
            }
          });
        }
      });
    }
    return {newMetrics, requiredMetricIdsByType, missingMetrics: [...new Set(missingMetrics)]};
  }

  /**
   * Return the list of all possible values for the specified key (distinct values)
   * @param rows all file rows to be imported
   * @param key the key to be find in rows
   * @returns All values list
   */
  private _allValuesForKey(rows: {[key: string]: any}[], key: string): string[] {
    const requiredValues: string[] = [];
    rows.forEach((row: {[key: string]: any}) => {
      if (!this._isLabelHeader(row)) {
        if (row[key]) {
          if (!requiredValues.includes(row[key])) {
            requiredValues.push(row[key]);
          }
        }
      }
    });
    return requiredValues;
  }

  /**
   * Import all new metric
   * @param newMetrics The list of the new metrics to be created
   * @returns
   */
  private _importMetrics(newMetrics: {
    [key: string]: {[key: string]: any}[];
  }): Observable<{success: RxDocument<any>[]; error: any[]}[]> {
    const metricsObs: Observable<{success: RxDocument<any>[]; error: any[]}>[] = [];
    Object.keys(newMetrics).forEach(metricType => {
      const manager = this._metricManagers[metricType];
      if (manager !== null) {
        if (newMetrics[metricType] && newMetrics[metricType].length) {
          metricsObs.push(
            manager.bulkCreate(newMetrics[metricType]).pipe(
              catchError(err => {
                this._ehms.captureErrorMessage(
                  `Could not create new imported metrics: ${JSON.stringify(err)}`,
                  'error',
                );
                return obsOf({success: [], error: []});
              }),
            ),
          );
        }
      }
    });
    return metricsObs.length ? forkJoin(metricsObs) : obsOf([]);
  }

  /**
   * Insert all the rows into Dino
   * @param rows The rows to be imported
   * @param activeMetrics The list of the currently active metric type
   * @param userDataId the logged user data id
   * @param metricsIdByName
   * @param statusDictionary all available status for the schema
   */
  private _importFormData(
    rows: {[key: string]: any}[],
    activeMetrics: string[],
    userDataId: string | null,
    isAdmin: boolean,
    metricsIdByName: {[key: string]: {[key: string]: any}} | null,
    statuses: FormStatus[],
  ): void {
    const forms: InsertModel<FormData>[] = [];
    const createdAtKey = 'created_at';
    const userDataKey = 'user_data_ref_id';

    const defaultFormStatus = statuses.length ? statuses[0].id : null;

    rows.forEach((row: {[key: string]: any}) => {
      // Check if is not a second header
      if (!this._isLabelHeader(row)) {
        let newItem: {[key: string]: any} = {};
        newItem['form_schema_ref_id'] = this.formSchemaId;
        if (row[createdAtKey] && row[createdAtKey].length && row[createdAtKey] !== createdAtKey) {
          try {
            const rowDate = format(new Date(row[createdAtKey]), 'yyyy-MM-dd');
            newItem[createdAtKey] = rowDate;
          } catch (e) {
            if (isDevMode()) console.log(e);
          }
        }

        newItem[userDataKey] = userDataId;
        if (isAdmin && row[userDataKey] && row[userDataKey].length) {
          newItem[userDataKey] = row[userDataKey];
        }

        const rowFormStatus = row['form_status_name']
          ? statuses.find(st => st.name === row['form_status_name'])
          : null;
        newItem['form_status_ref_id'] = rowFormStatus ? rowFormStatus.id : defaultFormStatus;

        newItem['data'] = Object.keys(row)
          .filter(field => !this._dinoFields.includes(field))
          .reduce((obj, key) => {
            const value = getValueFromRow(row[key], key);
            if (value !== null) {
              return {...obj, [key]: value};
            } else {
              return {...obj};
            }
          }, {});

        Object.keys(this._metricManagers).forEach(metric => {
          if (activeMetrics.length && activeMetrics.includes(metric)) {
            newItem[metric + '_ref_id'] = row[metric + '_id'] ? row[metric + '_id'] : null;
            const rawMetricName = row[metric + '_name'];
            const metricName = rawMetricName != null ? (rawMetricName as string).trim() : null;
            if (
              newItem[metric + '_ref_id'] === null &&
              metricName !== null &&
              metricName.length > 0 &&
              metricsIdByName &&
              metricsIdByName[metric] &&
              metricsIdByName[metric][metricName] !== undefined
            ) {
              newItem[metric + '_ref_id'] = metricsIdByName[metric][metricName];
            }
          } else {
            newItem[metric + '_ref_id'] = null;
          }
        });
        forms.push(newItem as InsertModel<FormData>);
      }
    });

    this._formDataManager
      .bulkCreate(forms)
      .pipe(
        catchError(err => {
          this._ehms.captureErrorMessage(
            `Could not bulkCreate new imported form data: ${JSON.stringify(err)}`,
            'error',
          );
          return obsOf(null);
        }),
        take(1),
      )
      .subscribe(bulkRes => {
        if (bulkRes && bulkRes.success.length) {
          this._setImportStatus(
            `${this._ts.translate('File imported successfully')}: ${
              bulkRes.success.length
            } ${this._ts.translate('forms created')}!`,
          );
          this.imported.emit();
        } else {
          let errMsg = 'File not imported! ';
          if (bulkRes?.error.length) {
            console.log('Import form error: ' + bulkRes.error[0].msg);
            if (
              bulkRes?.error[0].msg?.parameters?.errors &&
              bulkRes?.error[0].msg?.parameters?.errors.length
            ) {
              errMsg = errMsg + JSON.stringify(bulkRes?.error[0].msg?.parameters?.errors[0]);
            }
          }
          this._setImportStatus(errMsg);
        }
      });
  }

  /**
   * Add into metricsIdByName object the metric name and id
   * @param metric the metric document
   * @param metricsIdByName object with metrics id by metric name and metric
   * type
   */
  private _addMetricDetails(
    metric: RxDocument<Metric>,
    metricsIdByName: {[key: string]: {[key: string]: string}},
  ): void {
    const metricCollection = metric.collection.name;
    if (!(metricCollection in metricsIdByName)) {
      metricsIdByName[metricCollection] = {};
    }
    metricsIdByName[metricCollection][metric.name] = metric.id as string;
  }

  /**
   * Add existing metrics id/name to the new metricts object list
   * @param metricsIdByName object with metrics id by metric name and metric
   * type
   * @param existingMetrics list of already existing metrics
   */
  private _addExistingMetricsIntoList(
    metricsIdByName: {[key: string]: {[key: string]: string}},
    existingMetrics: any[][],
  ): void {
    if (existingMetrics.length > 0) {
      existingMetrics.forEach((queryRes: any[]) => {
        queryRes.forEach(metric => {
          this._addMetricDetails(metric, metricsIdByName);
        });
      });
    }
  }

  /**
   * Properties managed by Dino itself, never provided by the user.
   */
  private _autoMetricProps: string[] = ['id', 'created_at', 'updated_at', 'is_deleted', '_deleted'];

  /**
   * Whether the property schema accepts a null value. The collection schema
   * lists nullable props (e.g. `["string", "null"]`) among the `required` ones
   * only to force the key to be present: an empty value is still valid, so such
   * props must not be treated as user-mandatory.
   * @param propSchema The json schema of a single property
   * @returns true if a null value is allowed
   */
  private _propAllowsNull(propSchema: any): boolean {
    if (propSchema == null) {
      return true;
    }
    if (Array.isArray(propSchema.type)) {
      return propSchema.type.includes('null');
    }
    if (propSchema.type === 'null') {
      return true;
    }
    if (Array.isArray(propSchema.anyOf)) {
      return propSchema.anyOf.some(
        (s: any) => s?.type === 'null' || (Array.isArray(s?.type) && s.type.includes('null')),
      );
    }
    return false;
  }

  /**
   * Check that every new metric to be created has a value for its mandatory
   * fields. A field is mandatory only when it is in the schema `required` list,
   * does not accept a null value, and is not auto-generated (id/created_at/...,
   * case `code`, project `code_auto`). Nullable "required" props only need the
   * key to exist, so they are not enforced here.
   * @param newMetricsByType the metrics that will actually be created, by type
   * @returns one error entry per metric missing mandatory fields, empty if valid
   */
  private _getMissingRequiredMetricFields(newMetricsByType: {
    [key: string]: {[key: string]: any}[];
  }): string[] {
    const errors: string[] = [];
    Object.keys(newMetricsByType).forEach(metricType => {
      const manager = this._metricManagers[metricType];
      const metrics = newMetricsByType[metricType];
      if (manager == null || !metrics || !metrics.length) {
        return;
      }
      const props = manager.collectionSchema.properties;
      const requiredProps = (
        manager.collectionSchema.required && manager.collectionSchema.required.length
          ? manager.collectionSchema.required
          : ['name']
      ).filter(prop => {
        if (this._autoMetricProps.includes(prop)) {
          return false;
        }
        if (metricType === 'case' && prop === 'code') {
          return false;
        }
        if (metricType === 'project' && prop === 'code_auto') {
          return false;
        }
        return prop in props && !this._propAllowsNull(props[prop]);
      });
      metrics.forEach(metric => {
        const missing = requiredProps.filter(prop => {
          const value = metric[prop];
          return (
            value === undefined ||
            value === null ||
            (typeof value === 'string' && value.trim().length === 0)
          );
        });
        if (missing.length) {
          const label = metric['name'] != null && `${metric['name']}`.length ? metric['name'] : '?';
          errors.push(`${metricType} "${label}" (${missing.join(', ')})`);
        }
      });
    });
    return errors;
  }

  /**
   * Import all the rows and all new metrics into Dino
   * @param rows The rows to be imported
   * @param newMetrics the list of the new metrics required to be created
   * @param isAdminUser true if active user has admin role
   * @param statuses all available Form Statuses associated with the Form Schema
   */
  private _importFormDataRows(
    rows: {[key: string]: any}[],
    newMetrics: {
      [key: string]: {
        [key: string]: any;
      }[];
    },
    isAdminUser: boolean,
    statuses: FormStatus[],
  ): void {
    const activeMetrics = this.metricsService.activeMetrics.value.map(metric => metric.metricName);
    if (Object.keys(newMetrics).length) {
      this._userDataSub = this._checkIfMetricsAlreadyExist(newMetrics)
        .pipe(
          switchMap(existingMetrics => {
            const newMetricsRequested: {[key: string]: {[key: string]: any}[]} =
              deepCopy(newMetrics);
            if (existingMetrics.length > 0) {
              existingMetrics.forEach((queryRes: any[]) => {
                if (queryRes.length) {
                  const metricCollection = queryRes[0].collection.name;
                  const metricNames = queryRes.map(metric => metric.name);
                  newMetricsRequested[metricCollection] = newMetrics[metricCollection].filter(
                    m => !metricNames.includes(m['name']),
                  );
                }
              });
            }
            // Only the metrics that will actually be created must carry all
            // their required fields: an already existing metric reused by name
            // is filtered out above, so the user does not have to re-enter them.
            const missingRequired = this._getMissingRequiredMetricFields(newMetricsRequested);
            if (missingRequired.length) {
              this._setImportStatus(
                `${this._ts.translate(
                  'File not imported! Missing required fields for new metrics',
                )}: ${missingRequired.join('; ')}`,
              );
              return obsOf(null);
            }
            return obsOf({newMetricsRequested, existingMetrics});
          }),
          switchMap(r => {
            if (r == null) {
              return obsOf(null);
            }
            return zip(
              this._importMetrics(r.newMetricsRequested),
              obsOf(r.newMetricsRequested),
              obsOf(r.existingMetrics),
            );
          }),
          catchError(err => {
            this._ehms.captureErrorMessage(
              `Could not import form data rows: ${JSON.stringify(err)}`,
              'error',
            );
            return obsOf([], [], []);
          }),
          withLatestFrom(this._udm.getActiveUserData()),
        )
        .subscribe(([r, ud]) => {
          if (r == null) {
            // Missing required fields: the status message is already set
            return;
          }
          const createdMetrics = r[0];
          const requiredNewMetrics = r[1];
          const existingMetrics = r[2];
          const userDataId = ud ? ud.id : null;
          let metricsError: string[] = [];
          let metricsIdByName: {[key: string]: {[key: string]: string}} = {};
          if (createdMetrics) {
            createdMetrics.forEach(metrics => {
              if (metrics && metrics.success.length) {
                if (
                  metrics.success.length ===
                  requiredNewMetrics[metrics.success[0].collection.name].length
                ) {
                  metrics.success.forEach(metric => {
                    this._addMetricDetails(metric, metricsIdByName);
                  });
                } else {
                  metricsError.push(metrics.success[0].collection.name);
                }
              } else {
                if (metrics && metrics.error.length && metrics.error[0].msg) {
                  if (isDevMode()) {
                    console.log('Import metric error: ' + metrics.error[0].msg?.parameters);
                  }
                  if (
                    metrics.error[0].msg?.parameters?.errors &&
                    metrics.error[0].msg?.parameters?.errors.length
                  ) {
                    metricsError.push(JSON.stringify(metrics.error[0].msg?.parameters?.errors[0]));
                  }
                } else {
                  metricsError.push('-');
                }
              }
            });

            if (metricsError.length === 0) {
              this._addExistingMetricsIntoList(metricsIdByName, existingMetrics);
              this._importFormData(
                rows,
                activeMetrics,
                userDataId,
                isAdminUser,
                metricsIdByName,
                statuses,
              );
            } else {
              this._setImportStatus(
                `${this._ts.translate(
                  'File not imported! Error during create new metrics',
                )}: ${metricsError}`,
              );
            }
          } else {
            this._setImportStatus(
              this._ts.translate('File not imported! Error on import metrics.'),
            );
          }
        });
    } else {
      this._userDataSub = this._udm.getActiveUserData().subscribe(ud => {
        const userDataId = ud ? ud.id : null;
        this._importFormData(rows, activeMetrics, userDataId, isAdminUser, null, statuses);
      });
    }
  }

  /**
   * Check if the first row is the label header with no data
   * @param data
   * @returns true if is a label header
   */
  private _isLabelHeader(row: {[key: string]: any}): boolean {
    const rowVals = Object.values(row);
    return this._importService.containsAtLeastOne(rowVals, this._dinoFields);
  }

  /**
   * Check if requested ids in rows exist in the db
   * @param requiredUserIds the list of the requested user ids
   * @param existingUsers the list of the existing user ids
   * @param requiredMetricIdsByType the list of the requested metric ids
   * @param existingMetricsByType the list of the existing metric ids
   * @returns true if not all ids exist
   */
  private _checkIfMissingIds(
    requiredUserIds: string[],
    existingUsers: RxDocument<UserData>[],
    requiredMetricIdsByType: {
      [key: string]: string[];
    },
    existingMetricsByType: any[][],
    requiredFormStatusNames: string[],
    allSchemaStatus: FormStatus[],
  ): boolean {
    let idsNotMatch = false;
    let idsNotMatchMessage = '';
    const maxIdsInResponse = 5;

    if (requiredUserIds.length) {
      if (existingUsers == null || existingUsers.length != requiredUserIds.length) {
        idsNotMatch = true;
        const existingUserIds = existingUsers.map(u => u.id);
        let missingUserIds = requiredUserIds
          .filter(id => !existingUserIds.includes(id))
          .map(i => '\n' + i);
        console.log('File not imported! These user ids not exist:' + missingUserIds);
        if (missingUserIds.length > maxIdsInResponse) {
          missingUserIds = missingUserIds.slice(0, maxIdsInResponse);
          missingUserIds.push(`\n${this._ts.translate('and more')}...`);
        }
        idsNotMatchMessage = `\n${this._ts.translate(
          'Check that these user ids exist',
        )}: ${missingUserIds}`;
      }
    }

    if (Object.keys(requiredMetricIdsByType).length) {
      Object.keys(requiredMetricIdsByType).forEach(reqMetricType => {
        if (requiredMetricIdsByType[reqMetricType].length) {
          const existingMetrics = existingMetricsByType
            ? existingMetricsByType.find(metricsByType => {
                if (metricsByType.length) {
                  return metricsByType[0].collection.name === reqMetricType;
                }
                return false;
              })
            : [];
          if (
            existingMetrics == undefined ||
            existingMetrics.length != requiredMetricIdsByType[reqMetricType].length
          ) {
            idsNotMatch = true;
            const existingMetricIds = existingMetrics ? existingMetrics.map(u => u.id) : [];
            let missingMetricIds = requiredMetricIdsByType[reqMetricType]
              .filter(id => !existingMetricIds.includes(id))
              .map(i => '\n' + i);
            console.log(
              'File not imported! These ' + reqMetricType + ' ids not exist:' + missingMetricIds,
            );
            if (missingMetricIds.length > maxIdsInResponse) {
              missingMetricIds = missingMetricIds.slice(0, maxIdsInResponse);
              missingMetricIds.push(`\n${this._ts.translate('and more')}...`);
            }
            idsNotMatchMessage = `
              ${idsNotMatchMessage} \n${this._ts.translate(
              'Check that these metric ids exist for',
            )} ${reqMetricType}: ${missingMetricIds}`;
          }
        }
      });
    }

    if (requiredFormStatusNames.length) {
      const existingFormStatusNames = allSchemaStatus.map(fst => fst.name);
      const missingStatus = requiredFormStatusNames.filter(
        st => !existingFormStatusNames.includes(st),
      );
      if (missingStatus.length) {
        idsNotMatch = true;
        let missingStatusNames = missingStatus.map(i => '\n' + i);
        console.log('File not imported! These form status names not exist:' + missingStatusNames);

        idsNotMatchMessage = `\n${this._ts.translate(
          'Check that these form status names exist',
        )}: ${missingStatusNames}`;
      }
    }

    if (idsNotMatch) {
      this._setImportStatus(`${this._ts.translate('File not imported')}! ${idsNotMatchMessage}`);
    }
    return idsNotMatch;
  }

  /**
   * Convert the xls file into a json, read the file columns and build the
   * column mappings, prefilled with the available fields with the same name
   * @param file The Xlsx file to be read
   */
  private _readFile(file: Blob): void {
    this._processing = true;
    this.isLoading = true;
    this._rows = [];
    this.columnMappings = [];
    this.availableFields = [];
    this.duplicateFields = [];
    this._setImportStatus('');
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onerror = () => {
      this.isLoading = false;
      this._processing = false;
      this._cdr.markForCheck();
    };
    fileReader.onload = (e: any) => {
      const bufferArray = e?.target.result;
      let rows: {[key: string]: any}[];
      let columns: string[];
      try {
        ({rows, columns} = this._importService.parseWorkbook(bufferArray));
      } catch (err) {
        if (isDevMode()) {
          console.log('Could not read the import file:', err);
        }
        this.isLoading = false;
        this._processing = false;
        this._setImportStatus(this._ts.translate('File not imported! Could not read the file.'));
        return;
      }
      this._rows = rows;
      this._columnMappingsSub.unsubscribe();
      this._columnMappingsSub = this._formSchema.pipe(take(1)).subscribe(formSchema => {
        this.availableFields = this._importService.getAvailableFields(formSchema);
        this._repeatingFields = this._importService.getRepeatingSlideFields(formSchema);
        this._tableFields = this._importService.getTableFields(formSchema);
        this.fieldFilterCtrl.setValue('');
        this.columnMappings = columns.map(column => this._buildColumnMapping(column));
        this._updateDuplicateFields();
        this._processing = false;
        this.isLoading = false;
        // Advance to the mapping step now that the file has been parsed.
        this.step = 2;
        this._cdr.markForCheck();
      });
    };
  }

  /**
   * Build the column mapping for a file column, pre-filling the target field
   * when the column name matches an available field, or a repeating-slide field
   * written as `base__<index>` (in which case the repetition order is taken
   * from the index found in the column name).
   * @param column The file column name
   * @returns The column mapping
   */
  private _buildColumnMapping(column: string): ColumnMapping {
    let field: string | null = null;
    let repetition: number | undefined;
    if (this.availableFields.includes(column)) {
      field = column;
    } else {
      const repMatch = column.match(/^(.+)__(\d+)$/);
      if (repMatch && this.isRepeatingField(repMatch[1])) {
        field = repMatch[1];
        repetition = +repMatch[2];
      }
    }
    return {column, field, repetition, control: new UntypedFormControl(field)};
  }

  /**
   * Rename the row keys with the mapped field names, dropping the unmapped
   * columns. Columns mapped to a repeating-slide field are grouped by their
   * slide, ordered by the chosen repetition, and turned into contiguous
   * `field__<index>` keys; per row, repetitions with no value at all are
   * dropped (no gaps) and the slide name key gets the repetition count.
   * @param rows The rows parsed from the file
   * @returns The rows with the mapped field names as keys
   */
  private _applyColumnMappings(rows: {[key: string]: any}[]): {[key: string]: any}[] {
    const directMappings = this.columnMappings.filter(
      mapping =>
        mapping.field != null &&
        mapping.field !== this.ignoreFieldValue &&
        !this.isRepeatingField(mapping.field),
    );
    // slide name -> field base -> the columns mapped to it, ordered by repetition
    const slides: {[slide: string]: {[base: string]: ColumnMapping[]}} = {};
    this.columnMappings.forEach(mapping => {
      if (!this.isRepeatingField(mapping.field)) {
        return;
      }
      const base = mapping.field as string;
      const slide = this._repeatingFields[base];
      const slideBases = slides[slide] || (slides[slide] = {});
      (slideBases[base] || (slideBases[base] = [])).push(mapping);
    });
    Object.keys(slides).forEach(slide => {
      Object.keys(slides[slide]).forEach(base => {
        slides[slide][base].sort(
          (a, b) =>
            (a.repetition ?? 0) - (b.repetition ?? 0) ||
            this.columnMappings.indexOf(a) - this.columnMappings.indexOf(b),
        );
      });
    });

    return rows.map(row => {
      const mappedRow: {[key: string]: any} = {};
      directMappings.forEach(mapping => {
        if (row[mapping.column] !== undefined) {
          mappedRow[mapping.field as string] = row[mapping.column];
        }
      });
      Object.keys(slides).forEach(slide => {
        const bases = slides[slide];
        const slots = Math.max(...Object.keys(bases).map(base => bases[base].length));
        let keptIndex = 0;
        for (let slot = 0; slot < slots; slot++) {
          const slotValues: {[base: string]: any} = {};
          let hasValue = false;
          Object.keys(bases).forEach(base => {
            const mapping = bases[base][slot];
            const value = mapping ? row[mapping.column] : undefined;
            if (
              value !== undefined &&
              value !== null &&
              !(typeof value === 'string' && value.trim().length === 0)
            ) {
              slotValues[base] = value;
              hasValue = true;
            }
          });
          if (hasValue) {
            Object.keys(slotValues).forEach(base => {
              mappedRow[`${base}__${keptIndex}`] = slotValues[base];
            });
            keptIndex++;
          }
        }
        // The slide name key holds the number of repetitions for this row
        mappedRow[slide] = keptIndex;
      });
      return mappedRow;
    });
  }

  /**
   * Update the list of the fields mapped by more than one column. Repeating
   * fields are excluded: they are meant to be mapped by several columns.
   */
  private _updateDuplicateFields(): void {
    const mappedFields = this.columnMappings
      .map(mapping => mapping.field)
      .filter(
        field => field != null && field !== this.ignoreFieldValue && !this.isRepeatingField(field),
      ) as string[];
    this.duplicateFields = [
      ...new Set(mappedFields.filter((field, idx) => mappedFields.indexOf(field) !== idx)),
    ];
  }

  /**
   * Validate the mapped rows and start import all the rows
   * No update for form data, all form data will be imported as new
   * @param data The mapped rows to be imported
   */
  private _processData(data: {[key: string]: any}[]): void {
    const startMessage = this._ts.translate('Importing file...');
    this._setImportStatus(startMessage);
    let requiredFormStatusNames = this._allValuesForKey(data, 'form_status_name');
    let requiredUserIds = this._allValuesForKey(data, 'user_data_ref_id');
    const activeMetrics = this.metricsService.activeMetrics.value.map(metric => metric.metricName);
    const {newMetrics, requiredMetricIdsByType, missingMetrics} = this._getMetricsToBeCreated(
      data,
      activeMetrics,
    );
    let queryRequiredUsers: Observable<RxDocument<UserData>[]> = requiredUserIds.length
      ? this._udm
          .query({
            selector: {id: {$in: requiredUserIds}, is_deleted: {$ne: true}},
          })
          .pipe(
            take(1),
            catchError(_ => obsOf([])),
          )
      : obsOf([]);

    this._validateDataSub = this._formSchema
      .pipe(
        switchMap(formSchema => {
          let missingRequiredMetrics = false;
          if (!this.hasOptionalMetrics) {
            const requiredMetrics =
              formSchema?.form_schema_metrics && formSchema.form_schema_metrics.length
                ? formSchema.form_schema_metrics
                : activeMetrics;

            if (requiredMetrics && requiredMetrics.length && missingMetrics.length) {
              missingRequiredMetrics = requiredMetrics.some(reqMetric =>
                missingMetrics.includes(reqMetric),
              );
              if (missingRequiredMetrics) {
                this._setImportStatus(
                  `${this._ts.translate(
                    'File not imported! This metrics are mandatory',
                  )}: ${requiredMetrics.join(',')}.`,
                );
                return obsOf([]);
              }
            }
          }
          // TODO We don't need this anymore.. the xlsx file is free
          // if (!this._importService.isValidXlsxData(data, formSchema)) {
          //   this._setImportStatus(
          //     this._ts.translate('File not imported! Columns must match formschema fields.'),
          //   );
          // }
          return zip([obsOf(formSchema), this._ugm.isActiveUserAdmin(this.adminRoles)]);
        }),
        switchMap(([fmSchema, isAdminUser]) => {
          if (fmSchema) {
            if (!isAdminUser) {
              queryRequiredUsers = obsOf([]);
              requiredUserIds = [];
            }
            return zip([
              queryRequiredUsers,
              this._getMetricsIfExist(requiredMetricIdsByType),
              obsOf(isAdminUser),
              this._fsm.formStatusesOfSchema(fmSchema),
            ]);
          }
          return obsOf(null);
        }),
      )
      .subscribe(res => {
        if (res && res.length > 1) {
          const existingUsers = res[0];
          const existingMetricsByType = res[1];
          const isAdminUser = res[2];
          const allSchemaStatus = res[3] || [];
          const idsNotMatch = this._checkIfMissingIds(
            requiredUserIds,
            existingUsers,
            requiredMetricIdsByType,
            existingMetricsByType,
            requiredFormStatusNames,
            allSchemaStatus,
          );

          if (!idsNotMatch) {
            this._importFormDataRows(data, newMetrics, isAdminUser, allSchemaStatus);
          }
        } else {
          if (
            !this.importStatus ||
            !this.importStatus.length ||
            this.importStatus === startMessage
          ) {
            this._setImportStatus(this._ts.translate('File not imported!'));
          }
        }
      });
  }

  ngOnDestroy() {
    this._userDataSub.unsubscribe();
    this._validateDataSub.unsubscribe();
    this._columnMappingsSub.unsubscribe();
    this._fieldFilterSub.unsubscribe();
    this.cancelled.complete();
    this.imported.complete();
  }
}
