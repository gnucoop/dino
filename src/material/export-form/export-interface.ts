/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {AjfField as AjfFieldCore, AjfNode, AjfNodeType} from '@ajf/core/forms';

export interface AjfField extends AjfFieldCore {
  slideIndex?: number;
  slideName?: string;
  slideNodeType?: AjfNodeType;
}

export interface ExportModel {
  schemaName: string;
  slideLabels: string[];
  slides: AjfNode[][];
}

export interface Context {
  [name: string]: any;
}

export interface Data extends Context {
  data: Context;
}

export interface ExportData extends Context {
  dewco: Context;
}

export type ExportFormat = 'csv' | 'xlsx' | 'splitted-xlsx';

export const MAX_SHEETNAME_LENGTH = 31;
