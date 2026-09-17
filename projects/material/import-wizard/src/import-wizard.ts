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
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  isDevMode,
  OnDestroy,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {AbstractControl, FormGroupDirective, NgForm, UntypedFormControl} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {parseWorkbook} from '@dino/core/data';
import {Subscription} from 'rxjs';

import {
  ColumnMapping,
  IGNORE_FIELD,
  ImportField,
  ImportIssue,
  ImportOutcome,
  ImportWarning,
} from './import-model';

/**
 * The import wizard: upload a file, map its columns onto the target fields, read
 * the result. It owns the whole interaction and knows nothing about what is being
 * imported: the host declares the fields and receives the mapped rows.
 */
@Component({
  selector: 'dino-import-wizard',
  styleUrls: ['import-wizard.scss'],
  templateUrl: 'import-wizard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ImportWizard implements OnDestroy, ErrorStateMatcher {
  /**
   * The page title.
   */
  @Input() title = '';

  /**
   * The fields the file columns can be mapped onto.
   */
  @Input()
  set fields(fields: ImportField[]) {
    this._fields = fields ?? [];
    this.availableFields = this._fields.map(field => field.name);
    this._byName = {};
    this._fields.forEach(field => (this._byName[field.name] = field));
  }
  get fields(): ImportField[] {
    return this._fields;
  }
  private _fields: ImportField[] = [];
  private _byName: {[name: string]: ImportField} = {};

  /**
   * The outcome of the import. As soon as the host sets it the wizard shows the
   * result step; setting it back to null returns to the mapping.
   */
  @Input()
  set outcome(outcome: ImportOutcome | null) {
    this._outcome = outcome;
    if (outcome != null) {
      this.isLoading = false;
      this._processing = false;
      this.step = 3;
    }
  }
  get outcome(): ImportOutcome | null {
    return this._outcome;
  }
  private _outcome: ImportOutcome | null = null;

  /**
   * Set by the host while it is running the import, to keep the spinner up.
   */
  @Input()
  set busy(busy: boolean) {
    this.isLoading = busy;
    this._processing = busy;
  }

  /**
   * Emitted when the user starts the import, with the parsed rows and the mappings.
   */
  @Output() apply = new EventEmitter<{rows: {[key: string]: any}[]; mappings: ColumnMapping[]}>();

  /**
   * Emitted when the user leaves the wizard before importing.
   */
  @Output() cancelled = new EventEmitter<void>();

  /**
   * Emitted when the user closes the result step.
   */
  @Output() closed = new EventEmitter<void>();

  /**
   * Emitted when the selected file cannot be parsed, so the host can report it
   * as an outcome in the result step.
   */
  @Output() unreadableFile = new EventEmitter<void>();

  /**
   * The current wizard step: 1 = upload file, 2 = map fields, 3 = result.
   */
  step: 1 | 2 | 3 = 1;

  /**
   * The name of the selected file, shown in the upload success chip.
   */
  fileName = '';

  /**
   * Live search filter applied to the mapping rows.
   */
  search = '';

  /**
   * Live search filter applied to the rows listed in the result step.
   */
  issueSearch = '';

  /**
   * The columns found in the selected file, each one with the mapped target field.
   */
  columnMappings: ColumnMapping[] = [];

  /**
   * All the available target field names, in the order declared by the host.
   */
  availableFields: string[] = [];

  /**
   * The "Ignore column" option value, exposed to the template.
   */
  readonly ignoreFieldValue = IGNORE_FIELD;

  /**
   * Control bound to the search input used to filter the available fields
   */
  readonly fieldFilterCtrl = new UntypedFormControl('');

  /**
   * Fields mapped by more than one column
   */
  duplicateFields: string[] = [];

  /**
   * The column mapping whose field select is currently open. The full option
   * list is rendered only for this one, so the wizard does not instantiate one
   * mat-option per field for every column at once.
   */
  openedMapping: ColumnMapping | null = null;

  /**
   * True while the file is being read, or while the host is importing.
   */
  isLoading = false;

  /**
   * Reference to the native file input, used to reset the selection.
   */
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  private _file?: Blob;
  private _rows: {[key: string]: any}[] = [];
  private _processing = true;
  get processing(): boolean {
    return this._processing;
  }

  private _fieldFilterSub: Subscription = Subscription.EMPTY;

  constructor(private _cdr: ChangeDetectorRef, private _ts: TranslocoService) {
    this._fieldFilterSub = this.fieldFilterCtrl.valueChanges.subscribe(() =>
      this._cdr.markForCheck(),
    );
  }

  ngOnDestroy(): void {
    this._fieldFilterSub.unsubscribe();
    this.apply.complete();
    this.cancelled.complete();
    this.closed.complete();
    this.unreadableFile.complete();
  }

  // ---- Navigation & derived view data ---------------------------------------

  /**
   * The subtitle under the title: what to do in the current step, or the name of
   * the imported file once the wizard shows the result.
   */
  get stepSubtitle(): string {
    if (this.step === 3) {
      return this.fileName;
    }
    return this.step === 2
      ? this._ts.translate('Match the columns in your file to the target fields.')
      : this._ts.translate('Choose the file with the data to be imported.');
  }

  /**
   * Navigates to a step. Step 2 needs a parsed file, step 3 an outcome.
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
   * The mapping rows matching the current search filter.
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
   * Whether a mapping is explicitly skipped.
   * @param mapping The column mapping
   */
  isIgnored(mapping: ColumnMapping): boolean {
    return mapping.field === this.ignoreFieldValue;
  }

  /**
   * Whether a mapping targets a real field.
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
   * Whether the field accepts more than one column.
   * @param field The field name
   */
  isRepeatingField(field: string | null): boolean {
    return field != null && this._byName[field]?.repeatable === true;
  }

  /**
   * The field key shown in the options and in the trigger: it is the key written
   * by the export, so it is what the user matches the file columns against. The
   * readable label goes in the tooltip.
   * @param field The field name, the ignore sentinel or null
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
   * @param field The field name, the ignore sentinel or null
   */
  fieldLabel(field: string | null): string {
    if (field === this.ignoreFieldValue) {
      return this._ts.translate('Ignore column');
    }
    if (field == null) {
      return '';
    }
    return this._byName[field]?.label || field;
  }

  /**
   * Whether a field option matches the field search, which runs on the name, the
   * value shown in the option. Non matching options are hidden and not removed,
   * so every select keeps its selected value while another one is filtered.
   * @param field The field option
   */
  isFieldVisible(field: string): boolean {
    const search = (this.fieldFilterCtrl.value || '').toLowerCase().trim();
    return !search || field.toLowerCase().includes(search);
  }

  /**
   * Track the field options by value so Angular reuses the mat-option nodes.
   * @param _index The option index
   * @param field The field option
   */
  trackByField(_index: number, field: string): string {
    return field;
  }

  /**
   * Update the repetition order of a column mapped to a repeatable field.
   * @param mapping The column mapping
   * @param event The number input change event
   */
  onRepetitionChange(mapping: ColumnMapping, event: Event): void {
    const value = parseInt((event.target as HTMLInputElement).value, 10);
    mapping.repetition = isNaN(value) ? 0 : Math.max(0, value);
    this._cdr.markForCheck();
  }

  /**
   * Render the full option list for the opened select only, and reset the field
   * search when it closes.
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
   * Update the column mapping with the selected field.
   * @param mapping The column mapping to be updated
   * @param field The selected target field
   */
  onMappingChange(mapping: ColumnMapping, field: string | null): void {
    mapping.field = field;
    if (this.isRepeatingField(field)) {
      // Default the repetition to the next free slot, so mapping several columns
      // to the same repeatable field auto numbers them
      mapping.repetition = this.columnMappings.filter(m => m.field === field).length - 1;
    } else {
      mapping.repetition = undefined;
    }
    this._updateDuplicateFields();
    this._cdr.markForCheck();
  }

  /**
   * ErrorStateMatcher: a field select is in error when its field is mapped twice.
   * @param control The select form control
   */
  isErrorState(
    control: AbstractControl | null,
    _form: FormGroupDirective | NgForm | null,
  ): boolean {
    return control != null && control.value != null && this.duplicateFields.includes(control.value);
  }

  /**
   * Whether the import can start: no field mapped twice, and at least one column
   * mapped to an essential field when the host declares any.
   */
  get canApply(): boolean {
    if (this.duplicateFields.length) {
      return false;
    }
    const essential = this._fields.filter(field => field.essential);
    if (!essential.length) {
      return this.columnMappings.some(mapping => this.isMapped(mapping));
    }
    return this.columnMappings.some(
      mapping => this.isMapped(mapping) && this._byName[mapping.field as string]?.essential,
    );
  }

  /**
   * Why the import cannot start yet, shown in the mapping toolbar.
   */
  get applyHint(): string {
    if (this.duplicateFields.length) {
      return this._ts.translate('Field mapped to more than one column');
    }
    return this.canApply ? '' : this._ts.translate('Map at least one field to import');
  }

  // ---- File handling --------------------------------------------------------

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
   * Allows dropping by preventing the browser's default behavior.
   * @param event The drag over event
   */
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  /**
   * Reads the selected file and builds the column mappings.
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

  // ---- Actions --------------------------------------------------------------

  /**
   * Hands the parsed rows and the chosen mappings over to the host.
   */
  applyImport(): void {
    if (this._file == null || !this.canApply) {
      return;
    }
    this._processing = true;
    this.isLoading = true;
    this._cdr.markForCheck();
    this.apply.emit({rows: this._rows, mappings: this.columnMappings});
  }

  /**
   * Starts the mapping over from the automatic proposal: every column goes back
   * to what it was right after the file was read, which also restores the columns
   * written as `field__<index>`, then the ones still uncovered are guessed by name
   * or label. Any manual choice is discarded.
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
   * Footer "Back": from the mapping step return to the upload step, from the
   * upload step leave the wizard.
   */
  onBack(): void {
    if (this.step === 2) {
      this.back();
    } else {
      this.cancelled.emit();
    }
  }

  /**
   * Goes back to the file selection, dropping the parsed file and the mappings.
   */
  back(): void {
    this._file = undefined;
    this.fileName = '';
    this._rows = [];
    this.columnMappings = [];
    this._outcome = null;
    this.issueSearch = '';
    this.fieldFilterCtrl.setValue('');
    this.search = '';
    this.duplicateFields = [];
    this.openedMapping = null;
    this.isLoading = false;
    this._processing = true;
    this.step = 1;
    if (this.fileInput) {
      // Clear the input value so re-selecting the same file fires the change event
      this.fileInput.nativeElement.value = '';
    }
    this._cdr.markForCheck();
  }

  /**
   * Goes back from the result step to the mapping, keeping the parsed file, so
   * that a failed import can be corrected and retried.
   */
  backToMapping(): void {
    this._outcome = null;
    this.step = this.columnMappings.length ? 2 : 1;
    this._cdr.markForCheck();
  }

  /**
   * Leaves the wizard from the result step.
   */
  closeOutcome(): void {
    this.closed.emit();
  }

  // ---- Result step ----------------------------------------------------------

  /**
   * The entries of a group that are not listed because of the cap.
   * @param warning The result group
   */
  hiddenItems(warning: ImportWarning): number {
    return warning.count - warning.items.length;
  }

  /**
   * The rows of a group matching the result step search filter.
   * @param warning The result group
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

  // ---- Internals ------------------------------------------------------------

  /**
   * Reads the file and builds one column mapping per file column.
   * @param file The selected file
   */
  private _readFile(file: Blob): void {
    this._processing = true;
    this.isLoading = true;
    this._rows = [];
    this.columnMappings = [];
    this._outcome = null;
    this.issueSearch = '';
    this.duplicateFields = [];
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onerror = () => {
      this.isLoading = false;
      this._processing = false;
      this._cdr.markForCheck();
    };
    fileReader.onload = (e: any) => {
      let rows: {[key: string]: any}[];
      let columns: string[];
      try {
        ({rows, columns} = parseWorkbook(e?.target.result));
      } catch (err) {
        if (isDevMode()) {
          console.log('Could not read the import file:', err);
        }
        this.isLoading = false;
        this._processing = false;
        this.unreadableFile.emit();
        this._cdr.markForCheck();
        return;
      }
      this._rows = rows;
      this.fieldFilterCtrl.setValue('');
      this.columnMappings = columns.map(column => this._buildColumnMapping(column));
      this._updateDuplicateFields();
      this._processing = false;
      this.isLoading = false;
      this.step = 2;
      this._cdr.markForCheck();
    };
  }

  /**
   * Builds the mapping of a file column, pre-filling the target field when the
   * column name matches a field, or a repeatable field written as
   * `base__<index>`, in which case the repetition comes from the index.
   * @param column The file column name
   */
  private _buildColumnMapping(column: string): ColumnMapping {
    let field: string | null = null;
    let repetition: number | undefined;
    if (this._byName[column] !== undefined) {
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
   * Recomputes the fields mapped by more than one column. Repeatable fields are
   * excluded: they are meant to be mapped by several columns.
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
}
