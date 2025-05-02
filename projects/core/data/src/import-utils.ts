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

import {format} from 'date-fns';
import {JsonSchemaTypes} from 'rxdb';

/**
 * Return the input value casted to the correct type (string, list or Date)
 * @param rowValue the initial value found in xls/csv file
 * @param rowColumn the xls/csv column name
 * @param type required type/types for this value
 * @returns
 */
export function getValueFromRow(
  rowValue: any,
  rowColumn: string,
  requiredType?: JsonSchemaTypes | JsonSchemaTypes[] | readonly JsonSchemaTypes[] | undefined,
): any {
  let value = rowValue === undefined ? null : rowValue;
  if (value !== null) {
    if (typeof value === 'string') {
      value = value.trim();
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value
          .slice(1, -1)
          .split(',')
          .filter((v: string) => v.length)
          .map((v: string) => v.trim());
      }
    } else if (typeof value === 'object') {
      try {
        // Try if the object is a date
        value = format(new Date(value), 'yyyy-MM-dd');
      } catch (e) {}
    } else if (
      typeof value === 'number' &&
      (rowColumn.indexOf('_date') > 0 ||
        rowColumn.indexOf('date_') > -1 ||
        rowColumn.indexOf('created_at') > -1 ||
        rowColumn.indexOf('updated_at') > -1 ||
        rowColumn.indexOf('data_') > -1)
    ) {
      // Try if the number is a valid date
      value = excelDateToJSDate(value);
    }

    if (requiredType) {
      const requiredTypes = Array.isArray(requiredType) ? requiredType : [requiredType];
      if (requiredTypes.includes('string')) {
        value = value.toString();
      } else if (requiredTypes.includes('number')) {
        value = !isNaN(value) ? +value : value;
      }
    }
  }
  return value;
}

/**
 * Convert and Format date as 'YYYY-MM-DD'
 * @param serial
 * @returns
 */
export function excelDateToJSDate(serial: number): string | number {
  if (serial >= 1) {
    try {
      const utc_days = Math.floor(serial - 25569);
      // Convert to milliseconds
      const date = new Date(utc_days * 86400000);
      // Format as 'YYYY-MM-DD'
      if (!isNaN(date.getTime())) {
        const dateStr = date.toISOString().split('T')[0];
        return dateStr;
      }
    } catch (e) {}
  }
  return serial;
}
