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
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {
  buildMetricLookupSelector,
  collectParentRefs,
  DataModelManager,
  getBooleanFromRow,
  getValueFromRow,
  ImportableMetric,
  importMetricTree,
  InsertModel,
  MetricsService,
  MetricTreeResult,
  splitMetricsByParent,
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
 * One entry of a result group: the file row it comes from, when known, and its text
 */
export interface ImportIssue {
  /**
   * The row number in the imported file, when the entry belongs to one
   */
  row?: number;

  /**
   * The entry text: a reason, an identifier or a metric name
   */
  text: string;
}

/**
 * A group of related warnings shown in the import result step
 */
export interface ImportWarning {
  /**
   * The localized label of the group
   */
  label: string;

  /**
   * The total number of warnings of this group, before the list is capped
   */
  count: number;

  /**
   * The warnings to be listed, capped
   */
  items: ImportIssue[];

  /**
   * How the group is rendered: one row per file row, or a grid of identifiers
   */
  kind: 'rows' | 'values';
}

/**
 * Why a metric could not be created, by metric type and metric name
 */
export type MetricFailures = {[metricType: string]: {[metricName: string]: string}};

/**
 * The counters shown at the top of the import result step
 */
export interface ImportCounts {
  /**
   * The data rows of the file, the label header row excluded
   */
  fileRows: number;

  /**
   * The form data actually saved
   */
  imported: number;

  /**
   * The data rows that did not make it
   */
  rejected: number;

  /**
   * The metrics created, all types and all tree levels
   */
  metricsCreated: number;
}

/**
 * How an import ended: everything imported, only part of it, or nothing
 */
export type ImportOutcomeStatus = 'success' | 'partial' | 'error';

/**
 * The outcome of an import, shown in the last step of the wizard
 */
export interface ImportOutcome {
  /**
   * How the import ended
   */
  status: ImportOutcomeStatus;

  /**
   * The headline message
   */
  message: string;

  /**
   * The explanation shown under the counters
   */
  detail?: string;

  /**
   * How many rows and metrics the import dealt with
   */
  counts: ImportCounts;

  /**
   * What could not be imported
   */
  warnings: ImportWarning[];
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
   * Parent ids referenced by the new metrics, by metric type.
   */
  requiredParentIdsByType: {[key: string]: string[]};

  /**
   * Parent names referenced by the new metrics, by metric type.
   */
  requiredParentNamesByType: {[key: string]: string[]};

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
   * The current wizard step: 1 = upload file, 2 = map fields, 3 = result.
   */
  step: 1 | 2 | 3 = 1;

  /**
   * The outcome of the import, shown in the last step. Null until the import ends.
   */
  outcome: ImportOutcome | null = null;

  /**
   * Live search filter applied to the rows listed in the result step.
   */
  issueSearch = '';

  /**
   * The counters of the running import, filled in as the pipeline progresses and
   * snapshotted into the outcome. Kept on the component so that an import failing
   * early still reports the numbers it already knows.
   */
  private _counts: Omit<ImportCounts, 'rejected'> = {fileRows: 0, imported: 0, metricsCreated: 0};

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
    [cellKey: string]: {
      tableName: string;
      tableLabel: string;
      rowLabel: string;
      columnLabel: string;
    };
  } = {};

  /**
   * The label of every form schema field, by field name.
   */
  private _fieldLabels: {[fieldName: string]: string} = {};

  /**
   * The mapping targets contributed by each metric type, used to tell a form
   * schema field from a metric one.
   */
  private _metricFields: {[metric: string]: string[]} = {};

  /**
   * The metric types allowed by the form schema. Null until a file has been read.
   */
  private _schemaMetrics: string[] | null = null;

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
   * The metric types to be imported: the ones declared by the form schema, or
   * all the active ones until the schema has been read.
   */
  private get _activeMetrics(): string[] {
    return (
      this._schemaMetrics ??
      this.metricsService.activeMetrics.value.map(metric => metric.metricName)
    );
  }

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
   * The subtitle shown under the page title: what to do in the current step, or
   * the name of the imported file once the wizard shows the result.
   */
  get stepSubtitle(): string {
    if (this.step === 3) {
      return this.fileName;
    }
    return this.step === 2
      ? this._ts.translate('Match the columns in your file to the fields of the form.')
      : this._ts.translate('Choose the file with the data to be imported.');
  }

  /**
   * Navigates to a wizard step. Step 2 is reachable only once a file has been
   * parsed (there are column mappings to show).
   * @param step The target step
   */
  goToStep(step: 1 | 2 | 3): void {
    if (step === 2 && !this.columnMappings.length) {
      return;
    }
    if (step === 3 && this.outcome == null) {
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
      m =>
        m.column.toLowerCase().includes(q) ||
        (m.field ?? '').toLowerCase().includes(q) ||
        this.fieldLabel(m.field).toLowerCase().includes(q),
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
   * Starts the column mapping over from the automatic proposal: every column is
   * rebuilt as it was right after the file was read, which also restores the
   * repeating-slide columns written as `field__<index>`, and the columns still
   * uncovered are then guessed by name or label. Any manual choice is discarded.
   */
  autoMatch(): void {
    this.columnMappings = this.columnMappings.map(mapping =>
      this._buildColumnMapping(mapping.column),
    );
    this.openedMapping = null;
    const normalize = (value: string): string =>
      value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
    const isFree = (field: string): boolean =>
      this.isRepeatingField(field) || !this.columnMappings.some(m => m.field === field);
    this.columnMappings.forEach(mapping => {
      if (mapping.field != null) {
        return;
      }
      const src = mapping.column.toLowerCase();
      const normalizedSrc = normalize(mapping.column);
      // An exact match on the name or on the label first: with labels that are
      // whole sentences a substring match alone is too noisy
      const match =
        this.availableFields.find(
          f =>
            isFree(f) &&
            (normalize(f) === normalizedSrc || normalize(this.fieldLabel(f)) === normalizedSrc),
        ) ??
        this.availableFields.find(
          f =>
            isFree(f) &&
            (src.includes(f.toLowerCase()) || src.includes(this.fieldLabel(f).toLowerCase())),
        );
      if (match) {
        this.onMappingChange(mapping, match);
        if (mapping.control) {
          mapping.control.setValue(match);
        }
      }
    });
    this._updateDuplicateFields();
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
   * Whether a field option matches the current search input, which is matched
   * against the field name, the value shown in the option. Non matching options
   * are hidden (not removed) so each select keeps its selected value even while
   * another select is being filtered.
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
   * The field key shown in the select options and trigger. It is the key written
   * by the export, so it is what the user matches the file columns against; the
   * readable label is in the tooltip.
   * @param field The field name (or the ignore sentinel / null)
   * @returns The field key
   */
  fieldName(field: string | null): string {
    if (field === this.ignoreFieldValue) {
      return this._ts.translate('Ignore column');
    }
    if (field == null) {
      return '';
    }
    // Keep the repeating marker: it explains the repetition input next to the row
    return this.isRepeatingField(field) ? `${field} (${this._ts.translate('repeating')})` : field;
  }

  /**
   * The readable label of a field, shown in the option tooltip.
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
      const tableLabel = this._plainLabel(cell.tableLabel) || cell.tableName;
      const rowLabel = this._ts.translate(cell.rowLabel);
      const columnLabel = this._ts.translate(cell.columnLabel);
      return `${tableLabel} [${rowLabel} / ${columnLabel}]`;
    }
    // Dino and metric fields have no schema label: they keep their raw key,
    // which is also the column name written by the export.
    return this._plainLabel(this._fieldLabels[field]) || field;
  }

  /**
   * Translate a form schema label and strip the markup left by the rich text editor.
   * @param label The raw schema label
   * @returns The label to be shown, empty when there is none
   */
  private _plainLabel(label: string | undefined): string {
    if (label == null || !label.length) {
      return '';
    }
    // Strip the markup left by the rich text editor before translating: the
    // dictionary holds the plain text, so a label carrying tags would never match
    const plain = label
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return plain.length ? this._ts.translate(plain) : '';
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
  private _setImportStatus(
    msg: string,
    warnings: ImportWarning[] = [],
    status: ImportOutcomeStatus = 'error',
    detail: string = '',
  ): void {
    this.importStatus = msg;
    // The empty (clearing) message and the in-progress "Importing file..."
    // message are not terminal: they keep the spinner visible.
    if (msg === '' || msg === this._ts.translate('Importing file...')) {
      this._cdr.markForCheck();
      return;
    }
    this.isLoading = false;
    this._processing = false;
    // Every outcome is shown in the result step, and the wizard is left by hand:
    // a snackbar would disappear while the page navigates away.
    this.outcome = {
      status,
      message: msg,
      detail: detail.length ? detail : undefined,
      // Whatever did not make it was rejected, however early the import stopped
      counts: {...this._counts, rejected: this._counts.fileRows - this._counts.imported},
      warnings,
    };
    this.step = 3;
    this._cdr.markForCheck();
  }

  /**
   * Build a result group, capping the listed entries so that a file failing on
   * thousands of rows does not flood the result step. The count always reports
   * the real total, so the template can show how many entries are not listed.
   * @param label The localized group label
   * @param items The entries of the group
   * @param kind How the group is rendered
   * @param max The maximum number of entries to be listed
   * @returns The group
   */
  private _warningGroup(
    label: string,
    items: ImportIssue[],
    kind: 'rows' | 'values',
    max: number = kind === 'rows' ? 50 : 10,
  ): ImportWarning {
    return {label, count: items.length, items: items.slice(0, max), kind};
  }

  /**
   * The sentence about the rows the database refused. Only those are worth a
   * sentence: they cannot be traced back to a file row, so they are the one
   * thing the counters and the table of rejected rows do not already say.
   * @param refused How many rows the database refused
   * @returns The localized sentence, empty when the database refused nothing
   */
  private _refusedDetail(refused: number): string {
    return refused
      ? this._ts.translate('{{n}} rows not imported: refused on save', {n: refused})
      : '';
  }

  /**
   * The entries of a group that are not listed because of the cap.
   * @param warning The result group
   * @returns How many entries are hidden
   */
  hiddenItems(warning: ImportWarning): number {
    return warning.count - warning.items.length;
  }

  /**
   * The rows of a group matching the result step search filter.
   * @param warning The result group
   * @returns The entries to be listed
   */
  filteredItems(warning: ImportWarning): ImportIssue[] {
    const search = this.issueSearch.trim().toLowerCase();
    if (!search) {
      return warning.items;
    }
    return warning.items.filter(
      item =>
        item.text.toLowerCase().includes(search) ||
        (item.row != null && `${item.row}`.includes(search)),
    );
  }

  /**
   * Leaves the wizard from the result step.
   */
  closeOutcome(): void {
    if (this.outcome && this.outcome.status !== 'error') {
      this.imported.emit();
    } else {
      this.cancelled.emit();
    }
  }

  /**
   * Goes back from the result step to the column mapping, keeping the parsed
   * file, so that a failed import can be corrected and retried.
   */
  backToMapping(): void {
    this.outcome = null;
    this.importStatus = '';
    this.step = this.columnMappings.length ? 2 : 1;
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
   * Whether a field belongs to the form schema, as opposed to the Dino columns
   * and the metric ones: a file mapping only those would create form data with
   * no answer inside.
   * @param field The field name
   * @returns true if the field is a form schema field
   */
  private _isSchemaField(field: string): boolean {
    if (this._importService.dinoImportFields.includes(field)) {
      return false;
    }
    return !Object.keys(this._metricFields).some(metric =>
      this._metricFields[metric].includes(field),
    );
  }

  /**
   * Whether the import can start: at least one column has to be mapped to a form
   * schema field, or the file would only create form data with no answer, and no
   * field can be mapped twice.
   */
  get canApply(): boolean {
    if (this.duplicateFields.length) {
      return false;
    }
    return this.columnMappings.some(
      mapping => this.isMapped(mapping) && this._isSchemaField(mapping.field as string),
    );
  }

  /**
   * Why the import cannot start yet, shown next to the disabled Apply button.
   */
  get applyHint(): string {
    if (this.duplicateFields.length) {
      return this._ts.translate('Field mapped to more than one column');
    }
    return this.canApply ? '' : this._ts.translate('Map at least one form field to import');
  }

  /**
   * Start processing the Xlsx file
   */
  apply(): void {
    if (this._file == null || !this.canApply) {
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
    this._fieldLabels = {};
    this._metricFields = {};
    this._schemaMetrics = null;
    this.outcome = null;
    this.issueSearch = '';
    this._counts = {fileRows: 0, imported: 0, metricsCreated: 0};
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
   * One query per metric type fetching, in a single round trip, both the metrics
   * to be reused by name (only when _metricMustBeUnique is true) and the metrics
   * needed to resolve the parents of the new metrics, referenced by id or by name.
   * @param newMetrics the new metrics to be created
   * @param requiredParentIdsByType the parent ids referenced by the new metrics
   * @param requiredParentNamesByType the parent names referenced by the new metrics
   * @returns per metric type, the metrics to be reused and the ones usable as parent
   */
  private _queryMetricsForImport(
    newMetrics: {[key: string]: {[key: string]: any}[]},
    requiredParentIdsByType: {[key: string]: string[]},
    requiredParentNamesByType: {[key: string]: string[]},
  ): Observable<{[metricType: string]: {reused: any[]; parentPool: any[]}}> {
    const queries: {[metricType: string]: Observable<any[]>} = {};
    const reusedNamesByType: {[metricType: string]: Set<string>} = {};
    const metricTypes = new Set([
      ...Object.keys(newMetrics),
      ...Object.keys(requiredParentIdsByType),
      ...Object.keys(requiredParentNamesByType),
    ]);

    metricTypes.forEach(metricType => {
      const manager = this._metricManagers[metricType];
      if (manager == null) {
        return;
      }
      const reusedNames = this._metricMustBeUnique
        ? (newMetrics[metricType] ?? []).map(m => m['name']).filter(name => !!name)
        : [];
      reusedNamesByType[metricType] = new Set(reusedNames);
      const options = buildMetricLookupSelector(requiredParentIdsByType[metricType] ?? [], [
        ...reusedNames,
        ...(requiredParentNamesByType[metricType] ?? []),
      ]);
      if (options == null) {
        return;
      }
      queries[metricType] = manager.query(options).pipe(
        take(1),
        catchError(err => {
          this._ehms.captureErrorMessage(
            `Error while searching for already existing metrics: ${JSON.stringify(err)}`,
            'error',
          );
          return obsOf([]);
        }),
      );
    });

    if (!Object.keys(queries).length) {
      return obsOf({});
    }
    return forkJoin(queries).pipe(
      map(res => {
        const result: {[metricType: string]: {reused: any[]; parentPool: any[]}} = {};
        Object.keys(res).forEach(metricType => {
          const docs = res[metricType];
          result[metricType] = {
            // Only the metrics matched by their own name can be reused: a metric
            // fetched because it is a parent must not end up in metricsIdByName
            reused: docs.filter(doc => reusedNamesByType[metricType].has(doc.name)),
            parentPool: docs,
          };
        });
        return result;
      }),
    );
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
    const requiredParentIdsByType: {[key: string]: string[]} = {};
    const requiredParentNamesByType: {[key: string]: string[]} = {};
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

          // The parents of the new metrics must be fetched to be resolved
          const parentRefs = collectParentRefs(newMetrics[metric] ?? []);
          if (parentRefs.parentIds.length) {
            requiredParentIdsByType[metric] = parentRefs.parentIds;
          }
          if (parentRefs.parentNames.length) {
            requiredParentNamesByType[metric] = parentRefs.parentNames;
          }
        }
      });
    }
    return {
      newMetrics,
      requiredMetricIdsByType,
      requiredParentIdsByType,
      requiredParentNamesByType,
      missingMetrics: [...new Set(missingMetrics)],
    };
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
   * Create all the new metrics, parents first: one bulk creation for the metrics
   * without a parent, then one per tree level for the others, so that a parent
   * defined by another row of the same file is resolved whatever the row order is.
   * @param newMetricsByType The new metrics to be created, by metric type
   * @param parentPoolByType The already existing metrics usable as parent, by metric type
   * @returns The outcome of the import, by metric type
   */
  private _importMetricTrees(
    newMetricsByType: {[key: string]: {[key: string]: any}[]},
    parentPoolByType: {[key: string]: any[]},
  ): Observable<{[metricType: string]: MetricTreeResult<any>}> {
    const metricsObs: {[metricType: string]: Observable<MetricTreeResult<any>>} = {};
    Object.keys(newMetricsByType).forEach(metricType => {
      const manager = this._metricManagers[metricType];
      const metrics = newMetricsByType[metricType];
      if (manager == null || !metrics || !metrics.length) {
        return;
      }
      const {roots, withParent} = splitMetricsByParent(metrics);
      const rootBulk = roots.length
        ? manager.bulkCreate(roots).pipe(
            catchError(err => {
              this._ehms.captureErrorMessage(
                `Could not create new imported metrics: ${JSON.stringify(err)}`,
                'error',
              );
              return obsOf({success: [] as RxDocument<any>[], error: [{msg: err}]});
            }),
          )
        : obsOf({success: [] as RxDocument<any>[], error: [] as any[]});

      metricsObs[metricType] = rootBulk.pipe(
        take(1),
        switchMap(rootRes => {
          if (rootRes.error.length) {
            // The children are not attempted when their level failed
            return obsOf({
              success: rootRes.success,
              error: rootRes.error,
              deferred: withParent as ImportableMetric[],
            });
          }
          // A metric created from the file wins over an existing one with the
          // same name, so it is prepended to the pool
          const pool = [...rootRes.success, ...(parentPoolByType[metricType] ?? [])];
          return importMetricTree(manager, withParent, pool, {
            onError: err =>
              this._ehms.captureErrorMessage(
                `Could not create new imported metrics: ${JSON.stringify(err)}`,
                'error',
              ),
          }).pipe(
            map(treeRes => ({
              success: [...rootRes.success, ...treeRes.success],
              error: treeRes.error,
              deferred: treeRes.deferred,
            })),
          );
        }),
      );
    });
    return Object.keys(metricsObs).length ? forkJoin(metricsObs) : obsOf({});
  }

  /**
   * Insert all the rows into Dino
   * @param rows The rows to be imported
   * @param activeMetrics The list of the currently active metric type
   * @param userDataId the logged user data id
   * @param metricsIdByName
   * @param statusDictionary all available status for the schema
   * @param failedByType why each metric could not be created, by type and name
   */
  private _importFormData(
    rows: {[key: string]: any}[],
    activeMetrics: string[],
    userDataId: string | null,
    isAdmin: boolean,
    metricsIdByName: {[key: string]: {[key: string]: any}} | null,
    statuses: FormStatus[],
    failedByType: MetricFailures = {},
  ): void {
    const forms: InsertModel<FormData>[] = [];
    // The rows naming a metric that could not be created nor linked: they are
    // not imported, so that no form data is saved with an empty metric
    const skippedRows: ImportIssue[] = [];
    const createdAtKey = 'created_at';
    const userDataKey = 'user_data_ref_id';

    const defaultFormStatus = statuses.length ? statuses[0].id : null;

    rows.forEach((row: {[key: string]: any}, rowIdx: number) => {
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
            if (key === 'dinoinvalid') {
              // A boolean flag: like the form editors, the key is written only when true
              return getBooleanFromRow(row[key]) ? {...obj, dinoinvalid: true} : {...obj};
            }
            const value = getValueFromRow(row[key], key);
            if (value !== null) {
              return {...obj, [key]: value};
            } else {
              return {...obj};
            }
          }, {});

        const unlinkedMetrics: string[] = [];
        Object.keys(this._metricManagers).forEach(metric => {
          if (activeMetrics.length && activeMetrics.includes(metric)) {
            newItem[metric + '_ref_id'] = row[metric + '_id'] ? row[metric + '_id'] : null;
            const rawMetricName = row[metric + '_name'];
            const metricName = rawMetricName != null ? (rawMetricName as string).trim() : null;
            const hasMetricName = metricName !== null && metricName.length > 0;
            if (
              newItem[metric + '_ref_id'] === null &&
              hasMetricName &&
              metricsIdByName &&
              metricsIdByName[metric] &&
              metricsIdByName[metric][metricName as string] !== undefined
            ) {
              newItem[metric + '_ref_id'] = metricsIdByName[metric][metricName as string];
            }
            // The row asked for a metric by name and it could not be created:
            // importing it with an empty metric would silently lose the value
            if (newItem[metric + '_ref_id'] === null && hasMetricName) {
              const reason =
                failedByType[metric]?.[metricName as string] ??
                this._ts.translate('metric not created');
              unlinkedMetrics.push(`${metric} "${metricName}": ${reason}`);
            }
          } else {
            newItem[metric + '_ref_id'] = null;
          }
        });
        if (unlinkedMetrics.length) {
          // The header row is the first one of the file, so the imported rows start at 2
          skippedRows.push({row: rowIdx + 2, text: unlinkedMetrics.join(', ')});
          return;
        }
        forms.push(newItem as InsertModel<FormData>);
      }
    });

    // Every non label row either became a form or was skipped, so this is the
    // authoritative row count for this path, whoever called it
    this._counts.fileRows = forms.length + skippedRows.length;

    const allWarnings = skippedRows.length
      ? [this._warningGroup(this._ts.translate('Rows not imported'), skippedRows, 'rows')]
      : [];

    if (!forms.length) {
      this._setImportStatus(this._ts.translate('File not imported!'), allWarnings, 'error');
      return;
    }

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
          // Some of the data rows may not have made it, either because their
          // metric was missing or because the creation failed: say so, and show
          // how many of them were imported
          const totalRows = forms.length + skippedRows.length;
          const partial = totalRows > bulkRes.success.length;
          const created = partial
            ? `${bulkRes.success.length}/${totalRows}`
            : `${bulkRes.success.length}`;
          const headline = partial ? 'File partially imported' : 'File imported successfully';
          this._counts.imported = bulkRes.success.length;
          this._setImportStatus(
            `${this._ts.translate(headline)}: ${created} ${this._ts.translate('forms created')}!`,
            allWarnings,
            partial ? 'partial' : 'success',
            partial
              ? this._refusedDetail(forms.length - bulkRes.success.length)
              : this._ts.translate('All the rows of the file have been saved.'),
          );
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
          this._setImportStatus(errMsg, allWarnings, 'error', this._refusedDetail(forms.length));
        }
      });
  }

  /**
   * Add into metricsIdByName object the metric name and id
   * @param metricType the metric type
   * @param metric the metric document
   * @param metricsIdByName object with metrics id by metric name and metric
   * type
   */
  private _addMetricDetails(
    metricType: string,
    metric: {id?: string | null; name: string},
    metricsIdByName: {[key: string]: {[key: string]: string}},
  ): void {
    if (!(metricType in metricsIdByName)) {
      metricsIdByName[metricType] = {};
    }
    metricsIdByName[metricType][metric.name] = metric.id as string;
  }

  /**
   * Add existing metrics id/name to the new metricts object list
   * @param metricsIdByName object with metrics id by metric name and metric
   * type
   * @param existingMetricsByType already existing metrics, by metric type
   */
  private _addExistingMetricsIntoList(
    metricsIdByName: {[key: string]: {[key: string]: string}},
    existingMetricsByType: {[metricType: string]: any[]},
  ): void {
    Object.keys(existingMetricsByType).forEach(metricType => {
      existingMetricsByType[metricType].forEach(metric => {
        this._addMetricDetails(metricType, metric, metricsIdByName);
      });
    });
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
   * @returns the reason, by type and metric name, of every metric that cannot be created
   */
  private _getInvalidNewMetrics(newMetricsByType: {
    [key: string]: {[key: string]: any}[];
  }): MetricFailures {
    const failures: MetricFailures = {};
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
          failures[metricType] = failures[metricType] ?? {};
          failures[metricType][label] = this._ts.translate('missing required fields: {{fields}}', {
            fields: missing.join(', '),
          });
        }
      });
    });
    return failures;
  }

  /**
   * Import all the rows and all new metrics into Dino
   * @param rows The rows to be imported
   * @param metricsInfo the new metrics found in the rows and their parent references
   * @param isAdminUser true if active user has admin role
   * @param statuses all available Form Statuses associated with the Form Schema
   */
  private _importFormDataRows(
    rows: {[key: string]: any}[],
    metricsInfo: MetricInfoInRows,
    isAdminUser: boolean,
    statuses: FormStatus[],
  ): void {
    const activeMetrics = this._activeMetrics;
    const {newMetrics, requiredParentIdsByType, requiredParentNamesByType} = metricsInfo;
    if (!Object.keys(newMetrics).length) {
      this._userDataSub = this._udm.getActiveUserData().subscribe(ud => {
        const userDataId = ud ? ud.id : null;
        this._importFormData(rows, activeMetrics, userDataId, isAdminUser, null, statuses);
      });
      return;
    }

    this._userDataSub = this._queryMetricsForImport(
      newMetrics,
      requiredParentIdsByType,
      requiredParentNamesByType,
    )
      .pipe(
        switchMap(lookup => {
          const newMetricsRequested: {[key: string]: {[key: string]: any}[]} = deepCopy(newMetrics);
          Object.keys(newMetricsRequested).forEach(metricType => {
            const reusedNames = (lookup[metricType]?.reused ?? []).map(metric => metric.name);
            if (reusedNames.length) {
              newMetricsRequested[metricType] = newMetricsRequested[metricType].filter(
                m => !reusedNames.includes(m['name']),
              );
            }
          });
          // Only the metrics that will actually be created must carry all
          // their required fields: an already existing metric reused by name
          // is filtered out above, so the user does not have to re-enter them.
          // A metric missing one is not created, like a metric with an
          // unresolvable parent: the rows naming it are reported one by one and
          // the rest of the file is imported.
          const failures = this._getInvalidNewMetrics(newMetricsRequested);
          Object.keys(failures).forEach(metricType => {
            newMetricsRequested[metricType] = newMetricsRequested[metricType].filter(
              metric => failures[metricType][metric['name']] === undefined,
            );
          });
          const parentPoolByType: {[metricType: string]: any[]} = {};
          Object.keys(lookup).forEach(
            metricType => (parentPoolByType[metricType] = lookup[metricType].parentPool),
          );
          return this._importMetricTrees(newMetricsRequested, parentPoolByType).pipe(
            map(created => ({created, lookup, requested: newMetricsRequested, failures})),
          );
        }),
        catchError(err => {
          this._ehms.captureErrorMessage(
            `Could not import form data rows: ${JSON.stringify(err)}`,
            'error',
          );
          this._setImportStatus(this._ts.translate('File not imported! Error on import metrics.'));
          return obsOf(null);
        }),
        withLatestFrom(this._udm.getActiveUserData()),
      )
      .subscribe(([r, ud]) => {
        if (r == null) {
          // The status message is already set
          return;
        }
        const userDataId = ud ? ud.id : null;
        const metricsError: string[] = [];
        const metricsIdByName: {[key: string]: {[key: string]: string}} = {};
        // Why each metric could not be created: a missing required field or an
        // unresolvable parent. The rows naming them are reported one by one.
        const failedByType: MetricFailures = deepCopy(r.failures);

        // The reused metrics go in first: the created ones must win on a name clash
        const reusedByType: {[metricType: string]: any[]} = {};
        Object.keys(r.lookup).forEach(
          metricType => (reusedByType[metricType] = r.lookup[metricType].reused),
        );
        this._addExistingMetricsIntoList(metricsIdByName, reusedByType);

        Object.keys(r.created).forEach(metricType => {
          const res = r.created[metricType];
          if (res.error.length) {
            const detailedErrors = res.error[0].msg?.parameters?.errors;
            if (isDevMode()) {
              console.log('Import metric error: ' + res.error[0].msg?.parameters);
            }
            metricsError.push(
              detailedErrors && detailedErrors.length ? JSON.stringify(detailedErrors[0]) : '-',
            );
            return;
          }
          if (res.success.length + res.deferred.length !== (r.requested[metricType] ?? []).length) {
            metricsError.push(metricType);
            return;
          }
          this._counts.metricsCreated += res.success.length;
          res.success.forEach(metric =>
            this._addMetricDetails(metricType, metric, metricsIdByName),
          );
          res.deferred.forEach(metric => {
            failedByType[metricType] = failedByType[metricType] ?? {};
            failedByType[metricType][`${metric['name']}`] = this._ts.translate(
              'metric with invalid parent',
            );
          });
        });

        if (metricsError.length) {
          this._setImportStatus(
            `${this._ts.translate(
              'File not imported! Error during create new metrics',
            )}: ${metricsError}`,
          );
          return;
        }
        this._importFormData(
          rows,
          activeMetrics,
          userDataId,
          isAdminUser,
          metricsIdByName,
          statuses,
          failedByType,
        );
      });
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
    const warnings: ImportWarning[] = [];
    const asIssues = (values: string[]): ImportIssue[] => values.map(value => ({text: value}));

    if (requiredUserIds.length && existingUsers != null) {
      const existingUserIds = existingUsers.map(u => u.id);
      const missingUserIds = requiredUserIds.filter(id => !existingUserIds.includes(id));
      if (missingUserIds.length) {
        warnings.push(
          this._warningGroup(
            this._ts.translate('Invalid user ids'),
            asIssues(missingUserIds),
            'values',
          ),
        );
      }
    }

    Object.keys(requiredMetricIdsByType).forEach(metricType => {
      const requiredIds = requiredMetricIdsByType[metricType];
      if (!requiredIds.length) {
        return;
      }
      const existingMetrics =
        existingMetricsByType?.find(
          metricsByType => metricsByType.length && metricsByType[0].collection.name === metricType,
        ) ?? [];
      const existingMetricIds = existingMetrics.map((m: any) => m.id);
      const missingMetricIds = requiredIds.filter(id => !existingMetricIds.includes(id));
      if (missingMetricIds.length) {
        warnings.push(
          this._warningGroup(
            `${this._ts.translate('Invalid metric ids')} (${metricType})`,
            asIssues(missingMetricIds),
            'values',
          ),
        );
      }
    });

    if (requiredFormStatusNames.length) {
      const existingFormStatusNames = allSchemaStatus.map(fst => fst.name);
      const missingStatus = requiredFormStatusNames.filter(
        st => !existingFormStatusNames.includes(st),
      );
      if (missingStatus.length) {
        warnings.push(
          this._warningGroup(
            this._ts.translate('Invalid form status'),
            asIssues(missingStatus),
            'values',
          ),
        );
      }
    }

    if (warnings.length) {
      this._setImportStatus(this._ts.translate('File not imported!'), warnings, 'error');
    }
    return warnings.length > 0;
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
    this._fieldLabels = {};
    this._metricFields = {};
    this._schemaMetrics = null;
    this.outcome = null;
    this.issueSearch = '';
    this._counts = {fileRows: 0, imported: 0, metricsCreated: 0};
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
        this._schemaMetrics = this._importService.getSchemaMetrics(formSchema);
        this.availableFields = this._importService.getAvailableFields(formSchema);
        this._repeatingFields = this._importService.getRepeatingSlideFields(formSchema);
        this._tableFields = this._importService.getTableFields(formSchema);
        this._fieldLabels = this._importService.getFieldLabels(formSchema);
        this._metricFields = this._importService.getMetricFields(formSchema);
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
    const activeMetrics = this._activeMetrics;
    // The label header row of a dino export is not a data row
    this._counts.fileRows = data.filter(row => !this._isLabelHeader(row)).length;
    const metricsInfo = this._getMetricsToBeCreated(data, activeMetrics);
    const {requiredMetricIdsByType, missingMetrics} = metricsInfo;
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
            // activeMetrics is already restricted to the metrics of the form schema
            const requiredMetrics = activeMetrics;

            if (requiredMetrics && requiredMetrics.length && missingMetrics.length) {
              missingRequiredMetrics = requiredMetrics.some(reqMetric =>
                missingMetrics.includes(reqMetric),
              );
              if (missingRequiredMetrics) {
                this._setImportStatus(
                  `${this._ts.translate(
                    'File not imported! These metrics are mandatory',
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
            this._importFormDataRows(data, metricsInfo, isAdminUser, allSchemaStatus);
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
