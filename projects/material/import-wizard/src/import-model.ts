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

import {UntypedFormControl} from '@angular/forms';

/**
 * Sentinel used as the "Ignore column" option value. A non null value is needed
 * for the mat-select to show the selected option: Angular Material treats a null
 * value as no selection. It is mapped back to "no field" when the rows are read.
 */
export const IGNORE_FIELD = '__dino_ignore_column__';

/**
 * A field the file columns can be mapped onto.
 */
export interface ImportField {
  /**
   * The data key the mapped column is written to
   */
  name: string;

  /**
   * The readable label, shown in the option tooltip. Already translated and
   * free of markup: the wizard shows it as it is.
   */
  label?: string;

  /**
   * Whether the field accepts more than one column, each with its own
   * repetition order. Also enables the `name__<index>` prefill.
   */
  repeatable?: boolean;

  /**
   * Whether mapping at least one field of this kind is required to import.
   */
  essential?: boolean;
}

/**
 * The mapping between a file column and a target field
 */
export interface ColumnMapping {
  /**
   * The column name found in the file
   */
  column: string;

  /**
   * The target field name. Null when the column is not mapped yet, the ignore
   * sentinel when the user chose to skip it.
   */
  field: string | null;

  /**
   * The form control bound to the field select, used to drive the mat-error
   * state when the field is mapped by more than one column.
   */
  control?: UntypedFormControl;

  /**
   * For a column mapped to a repeatable field, the repetition order chosen by
   * the user. Undefined for the other fields.
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
   * The entry text: a reason, an identifier or a name
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
 * One of the counters shown at the top of the import result step
 */
export interface ImportCount {
  /**
   * The localized label under the number
   */
  label: string;

  /**
   * The number itself
   */
  value: number;

  /**
   * How the number is coloured; neutral when absent
   */
  tone?: 'ok' | 'warn' | 'ko';
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
   * The counters shown as tiles
   */
  counts: ImportCount[];

  /**
   * What could not be imported
   */
  warnings: ImportWarning[];
}

/**
 * What the wizard hands over when the user starts the import.
 */
export interface ImportRequest {
  /**
   * The rows parsed from the file, still keyed by the file columns
   */
  rows: {[key: string]: any}[];

  /**
   * The column mappings chosen by the user
   */
  mappings: ColumnMapping[];
}

/**
 * Rename the row keys with the mapped field names, dropping the columns that
 * are unmapped or ignored. Repeatable fields are left to the caller, which
 * knows how their repetitions have to be laid out.
 * @param rows The rows parsed from the file
 * @param mappings The column mappings
 * @param skip Fields handled by the caller instead of here
 * @returns The rows with the mapped field names as keys
 */
export function applyMappings(
  rows: {[key: string]: any}[],
  mappings: ColumnMapping[],
  skip: (mapping: ColumnMapping) => boolean = () => false,
): {[key: string]: any}[] {
  const direct = mappings.filter(
    mapping => mapping.field != null && mapping.field !== IGNORE_FIELD && !skip(mapping),
  );
  return rows.map(row => {
    const mapped: {[key: string]: any} = {};
    direct.forEach(mapping => {
      if (row[mapping.column] !== undefined) {
        mapped[mapping.field as string] = row[mapping.column];
      }
    });
    return mapped;
  });
}

/**
 * Build a result group, capping the listed entries so that a file failing on
 * thousands of rows does not flood the result step. The count always reports the
 * real total, so the wizard can show how many entries are not listed.
 * @param label The localized group label
 * @param items The entries of the group
 * @param kind How the group is rendered
 * @param max The maximum number of entries to be listed
 * @returns The group
 */
export function warningGroup(
  label: string,
  items: ImportIssue[],
  kind: 'rows' | 'values',
  max: number = kind === 'rows' ? 50 : 10,
): ImportWarning {
  return {label, count: items.length, items: items.slice(0, max), kind};
}
