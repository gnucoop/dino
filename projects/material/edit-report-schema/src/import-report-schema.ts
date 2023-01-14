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

import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Observable, of as obsOf} from 'rxjs';
import {map} from 'rxjs/operators';
import {AjfReport, AjfReportSerializer, xlsReport} from '@ajf/core/reports';
import {HttpClient} from '@angular/common/http';

/**
 * The Report Schema Xlsform import component.
 * Allows importing of Xlsform docs, which will be processed and saved
 * as Report Schemas.
 */
@Component({
  selector: 'dino-import-report-schema',
  styleUrls: ['import-report-schema.scss'],
  templateUrl: 'import-report-schema.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ImportReportSchema {
  /**
   * The Import dialog form group
   */
  readonly importReport: UntypedFormGroup;

  /**
   * The converted XlsReportSchema
   */
  private _xlsReportSchema: Observable<AjfReport | null> = obsOf(null);

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _httpClient: HttpClient,
    public dialogRef: MatDialogRef<ImportReportSchema>, // @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.importReport = this._formBuilder.group({});
  }

  /**
   * Calls the Form Conv endpoint to convert the selected xls file into a json.
   * @param event The input file selection event
   */
  onExcelfileSelected(event: any): void {
    if (event.target.files.length === 0 || event.target.files[0] == null) {
      return;
    }
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      if (data != null) {
        this._xlsReportSchema = xlsReport(data, this._httpClient).pipe(
          map(ajfReport => {
            if (ajfReport == null) {
              return null;
            }
            return AjfReportSerializer.fromJson(ajfReport);
          }),
        );
      }
    };
    reader.readAsBinaryString(file);
  }

  /**
   * Applies the converted form schema to the Builder
   */
  apply(): void {
    this.dialogRef.close(this._xlsReportSchema);
  }

  /**
   * Closes the Import form schema dialog
   */
  closeDialog(): void {
    this.dialogRef.close(obsOf(null));
  }
}
