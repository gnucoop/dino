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
 * Read the file content, decoding text files as UTF-8 when they are valid UTF-8.
 * xlsx reads a CSV without BOM as Latin-1; XLSX (zip) and XLS (OLE) files carry
 * their own encoding, and text that is not valid UTF-8 keeps the Latin-1 reading.
 * @param bufferArray The file content
 */
function readWorkbook(bufferArray: any): XLSX.WorkBook {
  // Not instanceof: an ArrayBuffer from another realm (e.g. jsdom) fails it
  const bytes = ArrayBuffer.isView(bufferArray)
    ? new Uint8Array(bufferArray.buffer, bufferArray.byteOffset, bufferArray.byteLength)
    : Object.prototype.toString.call(bufferArray) === '[object ArrayBuffer]'
    ? new Uint8Array(bufferArray)
    : null;
  const isZip = bytes != null && bytes[0] === 0x50 && bytes[1] === 0x4b;
  const isOle = bytes != null && bytes[0] === 0xd0 && bytes[1] === 0xcf;
  let text: string | null = null;
  if (bytes != null && !isZip && !isOle) {
    try {
      text = new TextDecoder('utf-8', {fatal: true}).decode(bytes);
    } catch {
      // Not valid UTF-8: keep the Latin-1 reading
    }
  }
  return text != null
    ? XLSX.read(text, {type: 'string'})
    : XLSX.read(bufferArray, {type: 'buffer'});
}

/**
 * Read the first sheet of an imported file into rows keyed by the file columns.
 * @param bufferArray The file content
 * @returns The parsed rows and the non empty column names
 */
export function parseWorkbook(bufferArray: any): ParsedWorkbook {
  const wb = readWorkbook(bufferArray);
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
