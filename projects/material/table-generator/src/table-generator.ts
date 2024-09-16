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
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  isDevMode,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {Papa, ParseConfig, ParseResult} from 'ngx-papaparse';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

/**
 * Type of data received as input by TableGenerator
 */
export type JsonTableData = {[key: string]: string} | {[key: string]: string}[];

/**
 * The TableGenerator component.
 * Converts a csv or json into a Material Table
 */
@Component({
  selector: 'dino-table-generator',
  styleUrls: ['table-generator.scss'],
  templateUrl: 'table-generator.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class TableGenerator implements OnDestroy {
  /**
   * The csv file/blob to convert
   */
  private _csvFile: BehaviorSubject<File | null> = new BehaviorSubject<File | null>(null);
  get csvFile(): Observable<File | null> {
    return this._csvFile.asObservable();
  }
  @Input() set setCsvFile(file: File | null) {
    if (!file) return;
    this._csvFile.next(file);
  }

  /**
   * Json or Json Array to convert
   */
  private _jsonData: BehaviorSubject<JsonTableData | null> =
    new BehaviorSubject<JsonTableData | null>(null);
  get jsonData(): Observable<JsonTableData | null> {
    return this._jsonData.asObservable();
  }
  @Input() set setJsonData(json: JsonTableData | null) {
    if (!json) return;
    this._jsonData.next(json);
  }

  /**
   * Max number of rows displayed in the table.
   * 0 means all csv rows.
   */
  private _maxRowsDisplayed: number = 50;
  @Input() set maxRowsDisplayed(max: number) {
    this._maxRowsDisplayed = max;
  }
  /**
   * All displayed columns
   */
  displayedColumns: string[] = [];
  /**
   * The Table datasource array
   */
  dataSource: Array<object> = [];
  /**
   * The displayed columns header titles
   */
  title: Record<string, string> = {};

  /**
   * Subscribes to csvFile input and handles its data
   */
  private _handleCsvDataSub: Subscription = Subscription.EMPTY;
  /**
   * Subscribes to jsonData input and handles its data
   */
  private _handleJsonDataSub: Subscription = Subscription.EMPTY;

  constructor(private _cdr: ChangeDetectorRef, private _papa: Papa) {
    this._handleCsvDataSub = this._csvFile
      .pipe(filter(file => file != null))
      .subscribe(f => this._handleData(f));
    this._handleJsonDataSub = this._jsonData
      .pipe(filter(j => j != null))
      .subscribe(j => this._handleData(j));
  }

  /**
   * Handles the data, parsing it
   * @param data
   * @param dataType The type of the data to be parsed (file or json)
   */
  private _handleData(data: JsonTableData | File | null): void {
    if (!data) return;

    if (data instanceof File) {
      const options: ParseConfig = {
        complete: results => this._handleComplete(results),
        error: error => this._handleError(error),
        delimiter: ',',
        header: true,
        quoteChar: '"',
        preview: this._maxRowsDisplayed,
        skipEmptyLines: true,
        transformHeader: header => {
          const cleanHeader = header.replace(/['"]+/g, '');
          if (header.length <= 30) return cleanHeader;
          return cleanHeader.slice(0, 30) + '...';
        },
      };

      this._papa.parse(data as File, options);
    } else if (!(data instanceof File)) {
      if (Array.isArray(data)) {
        this._handleComplete({data, errors: []});
      } else if (typeof data === 'object') {
        const dataArray: {[key: string]: string}[] = [];
        const dataKeys = Object.keys(data);
        for (let dataKey of dataKeys) {
          dataArray.push({[dataKey]: data[dataKey]});
        }
        this._handleComplete({data: dataArray, errors: []});
      }
    }
  }

  /**
   * Handles Papa parse errors
   * @param error The errors
   */
  private _handleError(error: any) {
    if (isDevMode()) {
      console.log(error);
    }
  }

  /**
   * Handles Papa parsing completed and generates the table datasource.
   * @param results The parsed results
   */
  private _handleComplete(results: Omit<ParseResult<{[key: string]: string}[]>, 'meta'>): void {
    const {data, errors} = results;
    this._cleanData(data);

    if (data && data.length > 0) {
      const badErrors = errors.filter(error => error.type !== 'FieldMismatch');
      if (badErrors.length && isDevMode()) {
        console.error(`Parsing Errors: '${JSON.stringify(badErrors)}'!`);
      } else {
        this.displayedColumns = Object.keys(data[0]);
        this.displayedColumns.forEach(column => {
          if (column) {
            this.title[column] = this._capitalize(column.replace(/_/g, ' '));
          }
        });
        if (isDevMode()) {
          console.log(this.displayedColumns);
        }

        this.dataSource = data;
        this._cdr.detectChanges();
      }
    } else {
      if (isDevMode()) console.error(`Parsing: empty data!`);
    }
  }

  /**
   * Cleans parsed data by removing empty keys
   * @param data
   */
  private _cleanData(data: {[key: string]: string}[]): void {
    if (!data || !data.length) return;
    for (let dataRow of data) {
      const dataRowKeys = Object.keys(dataRow);
      dataRowKeys.forEach(key => {
        if (key === '') {
          delete dataRow[key];
        }
      });
    }
  }

  /**
   * Capitalizes strings
   * @param str
   * @returns
   */
  private _capitalize(str: string) {
    return str[0].toUpperCase() + str.slice(1);
  }

  ngOnDestroy(): void {
    this._csvFile.complete();
    this._jsonData.complete();
    this._handleCsvDataSub.unsubscribe();
    this._handleJsonDataSub.unsubscribe();
  }
}
