import * as XLSX from 'xlsx';

import {parseWorkbook} from './workbook-utils';

const NAMES = ['Caffè 😀', 'مرحبا', 'Привет'];

/** The file content as the import wizard reads it. */
function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

function utf8Csv(names: string[], bom: boolean): ArrayBuffer {
  const body = new TextEncoder().encode(`name\n${names.join('\n')}\n`);
  if (!bom) {
    return toArrayBuffer(body);
  }
  const bytes = new Uint8Array(body.length + 3);
  bytes.set([0xef, 0xbb, 0xbf]);
  bytes.set(body, 3);
  return toArrayBuffer(bytes);
}

function latin1Csv(names: string[]): ArrayBuffer {
  const text = `name\n${names.join('\n')}\n`;
  return toArrayBuffer(Uint8Array.from(text, char => char.charCodeAt(0)));
}

describe('parseWorkbook', () => {
  it('reads a UTF-8 CSV without BOM as UTF-8', () => {
    const {rows, columns} = parseWorkbook(utf8Csv(NAMES, false));
    expect(columns).toEqual(['name']);
    expect(rows.map(row => row['name'])).toEqual(NAMES);
  });

  it('reads a UTF-8 CSV with BOM as UTF-8', () => {
    const {rows, columns} = parseWorkbook(utf8Csv(NAMES, true));
    expect(columns).toEqual(['name']);
    expect(rows.map(row => row['name'])).toEqual(NAMES);
  });

  it('still reads a Latin-1 CSV as Latin-1', () => {
    const names = ['Caffè', 'Niño'];
    const {rows} = parseWorkbook(latin1Csv(names));
    expect(rows.map(row => row['name'])).toEqual(names);
  });

  it('reads an XLSX file', () => {
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(NAMES.map(name => ({name}))), 's');
    const bytes: ArrayBuffer = XLSX.write(wb, {type: 'array', bookType: 'xlsx'});
    const {rows} = parseWorkbook(toArrayBuffer(new Uint8Array(bytes)));
    expect(rows.map(row => row['name'])).toEqual(NAMES);
  });
});
