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

import {HttpClient} from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormSchema} from '@dewco/core/forms';
import {Observable} from 'rxjs';
import {map, shareReplay, take} from 'rxjs/operators';

/**
 * The Form Schema Xlsform import component.
 * Allows importing of Xlsform docs, which will be processed and saved
 * as Form Schemas.
 */
@Component({
  selector: 'dewco-import-form-schema',
  styleUrls: ['import-form-schema.css'],
  templateUrl: 'import-form-schema.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ImportFormSchema {
  /**
   * Current status message of the Form Conv
   */
  convStatus = '';

  /**
   * The Import dialog form group
   */
  readonly importForm: Observable<FormGroup>;

  /**
   * The edited form schema
   */
  private _formSchema: Observable<FormSchema|null>;

  /**
   * True if the form is currently being processed.
   * Defaults to true.
   */
  private _processing: boolean = true;
  get processing(): boolean {
    return this._processing;
  }

  /**
   * FormConv endpoint url
   */
  private _formConvUrl: string;

  /**
   * The converted XlsFormSchema
   */
  private _xlsformSchema: {[key: string]: any}|null = null;

  constructor(
      private _cdr: ChangeDetectorRef,
      private _http: HttpClient,
      private _formBuilder: FormBuilder,
      public dialogRef: MatDialogRef<ImportFormSchema>,
      @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this._formSchema = this.data.formSchema;

    this._formConvUrl = this.data.formConvUrl;

    this.importForm = this._formSchema.pipe(
        map(() => this._formBuilder.group({})),
        shareReplay(1),
    );
  }

  /**
   * Updates the status message of the Form Conv
   * @param msg The message string
   */
  private _setConvStatus(msg: string): void {
    this.convStatus = msg;
    this._cdr.markForCheck();
  }

  /**
   * Calls the Form Conv endpoint to convert the selected xls file into a json.
   * @param event The input file selection event
   */
  onExcelfileSelected(event: any): void {
    if (event.target.files.length === 0) {
      return;
    }
    const file = event.target.files[0];
    this._processing = true;
    this._setConvStatus('converting file...');

    const data = new FormData();
    data.append('excelFile', file);
    this._http.post(this._formConvUrl, data)
        .pipe(
            take(1),
            )
        .subscribe(
            resp => {
              this._xlsformSchema = resp;
              this._setConvStatus('Excel file converted successfully!');
              this._processing = false;
            },
            err => {
              this._setConvStatus(err.error);
            });
  }

  /**
   * Applies the converted form schema to the Builder
   */
  apply(): void {
    this.dialogRef.close(this._xlsformSchema);
  }

  /**
   * Closes the Import form schema dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
