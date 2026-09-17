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

import * as XLSX from 'xlsx';

/**
 * The columns and the parsed rows read from an imported file.
 */
export interface ParsedWorkbook {
  /**
   * The rows parsed from the file, keyed by the file column names.
   */
  rows: {[key: string]: any}[];

  /**
   * The non empty column names found in the file header.
   */
  columns: string[];
}

/**
 * Clamp a bloated declared range to the actually populated cells.
 * Some files declare a huge used range (e.g. A1:XFD1048576) caused by stray
 * formatting on empty cells, and sheet_to_json would iterate all of it.
 * @param ws The worksheet, modified in place
 */
function trimSheetRange(ws: XLSX.WorkSheet): void {
  if (!ws || !ws['!ref']) {
    return;
  }
  const declared = XLSX.utils.decode_range(ws['!ref']);
  let maxRow = -1;
  let maxCol = -1;
  Object.keys(ws).forEach(key => {
    if (key.charAt(0) === '!') {
      return;
    }
    const cell = XLSX.utils.decode_cell(key);
    if (cell.r > maxRow) {
      maxRow = cell.r;
    }
    if (cell.c > maxCol) {
      maxCol = cell.c;
    }
  });
  if (maxRow < 0 || maxCol < 0) {
    // No data cells: nothing to import
    return;
  }
  if (maxRow < declared.e.r || maxCol < declared.e.c) {
    ws['!ref'] = XLSX.utils.encode_range({s: declared.s, e: {r: maxRow, c: maxCol}});
  }
}

/**
 * Read the first sheet of an imported file into rows keyed by the file columns.
 * @param bufferArray The file content
 * @returns The parsed rows and the non empty column names
 */
export function parseWorkbook(bufferArray: any): ParsedWorkbook {
  const wb = XLSX.read(bufferArray, {type: 'buffer'});
  const wsname = wb.SheetNames[0];
  const ws = wb.Sheets[wsname];
  trimSheetRange(ws);
  const rows: {[key: string]: any}[] = XLSX.utils.sheet_to_json(ws);
  const headerRows: any[][] = XLSX.utils.sheet_to_json(ws, {header: 1});
  const columns = (headerRows.length ? headerRows[0] : [])
    .map(column => `${column}`)
    .filter(column => column.length > 0);
  return {rows, columns};
}
