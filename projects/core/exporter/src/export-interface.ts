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

import {AjfBaseField as AjfFieldCore, AjfNodeType} from '@ajf/core/forms';
import {FormSchema} from '@dino/core/forms';
import {NodeVisibility} from '@dino/core/list';
import {Observable} from 'rxjs';

export interface AjfField extends AjfFieldCore {
  slideIndex?: number;
  slideName?: string;
  slideNodeType?: AjfNodeType;
}

export interface SelOption {
  value: string;
  label: string;
}

export interface Context {
  [name: string]: any;
}

export interface Data extends Context {
  data: Context;
}

export interface ExportData extends Context {
  dino: Context;
  externalRefs: Context;
}

/**
 * Represents the Types of list objects
 */
export type ExportListType = 'forms' | 'reports' | 'metrics' | 'users' | 'groups';

/**
 * The export options interface
 */
export interface ExportOptions {
  /**
   * The desired export format
   */
  exportFormat?: 'xlsx' | 'csv';
  /**
   * If true, all fields are automatically selected when the
   * dialog is opened.
   */
  selectAll?: boolean;
  /**
   * The type of the list that is being exported
   */
  listType?: ExportListType;
  /**
   * If true, the file download window/prompt appears
   */
  downloadFile?: boolean;
}

/**
 * The export list data interface
 */
export interface ExportListData extends ExportOptions {
  /**
   * The Ajf Form Nodes Visibility observable.
   */
  nodesVisibility: Observable<NodeVisibility[]>;

  /**
   * The Form Schema
   */
  formSchema: FormSchema;
}

export type ExportFormat = 'csv' | 'xlsx' | 'splitted-xlsx';
export type ExportFilters = 'filtered' | 'not-filtered' | 'displayed' | 'add-filters';

export const MAX_SHEETNAME_LENGTH = 31;
