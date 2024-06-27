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
  Inject,
  ViewEncapsulation,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormSchemaManager} from '@dino/core/forms';
import {ReportSchemaManager} from '@dino/core/reports';
import {TranslocoService} from '@ngneat/transloco';
import {Observable, combineLatest, of as obsOf} from 'rxjs';
import {map} from 'rxjs/operators';

export interface DeleteSchemaDialogData {
  /**
   * The ID of the schema to be deleted
   */
  schemaId: string;
  /**
   * The Type (Report of Form) of the schema to be deleted
   */
  schemaType: 'forms' | 'reports' | null;
}

/**
 * Dino Metric Editor component.
 * Allows the Admin to add and edit entries for any optional metric.
 * The generic type refers to the model of the Metric to be edited.
 */
@Component({
  selector: 'dino-delete-schema',
  templateUrl: 'delete-schema.html',
  styleUrls: ['delete-schema.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DeleteSchema {
  dialogMessage: Observable<string> = obsOf('');
  /**
   * True if the schema can be deleted
   */
  isDeletable: Observable<boolean> = obsOf(false);

  /**
   * True if the schema to be deleted has any associated Data
   */
  private _hasAnyData: Observable<boolean> = obsOf(false);

  /**
   * True if the schema to be deleted is used by any Reports
   */
  private _isUsedByAnyReports: Observable<boolean> = obsOf(false);

  constructor(
    readonly snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteSchema>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteSchemaDialogData,
    private _ts: TranslocoService,
    private _cdr: ChangeDetectorRef,
    private _fsm: FormSchemaManager,
    private _rsm: ReportSchemaManager,
  ) {
    if (this.data.schemaId && this.data.schemaType) {
      const schemaManager = this.data.schemaType === 'forms' ? this._fsm : this._rsm;
      this._hasAnyData = schemaManager.hasAnyData(this.data.schemaId);
      const checksStreams: Observable<Boolean>[] = [this._hasAnyData];
      if (this.data.schemaType === 'forms') {
        this._isUsedByAnyReports = this._rsm.isUsedByAnyReports(this.data.schemaId);
        checksStreams.push(this._isUsedByAnyReports);
      }
      this.isDeletable = combineLatest(checksStreams).pipe(
        map(checks => {
          return !checks.some(check => check);
        }),
      );
    }
  }

  /**
   * Closes the dialog returning the user response to the action confirmation request
   * @param response The user response
   */
  confirmationResponse(response: boolean) {
    this.dialogRef.close(response);
  }
}
