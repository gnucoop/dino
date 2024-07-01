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
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormSchemaDepsManager, FormSchemaManager} from '@dino/core/forms';
import {ReportSchemaManager} from '@dino/core/reports';
import {UserGroupManager} from '@dino/core/users';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, Observable, combineLatest, of as obsOf} from 'rxjs';
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
export class DeleteSchema implements OnDestroy {
  /**
   * The Dialog title
   */
  dialogTitle: BehaviorSubject<string> = new BehaviorSubject<string>(
    `${this._ts.translate('Confirm')} ${this._ts.translate('delete')}`,
  );
  /**
   * The Dialog message
   */
  dialogMessage: BehaviorSubject<string> = new BehaviorSubject<string>(
    `${this._ts.translate('Do you want to')} ${this._ts.translate('delete')} ${this._ts.translate(
      'the selected schema',
    )}?`,
  );
  /**
   * True if the schema can be deleted
   */
  isDeletable: Observable<boolean> = obsOf(false);

  constructor(
    readonly snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteSchema>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteSchemaDialogData,
    private _ts: TranslocoService,
    private _cdr: ChangeDetectorRef,
    private _fsm: FormSchemaManager,
    private _rsm: ReportSchemaManager,
    private _fsdm: FormSchemaDepsManager,
    private _ugm: UserGroupManager,
  ) {
    if (this.data.schemaId && this.data.schemaType) {
      const schemaManager = this.data.schemaType === 'forms' ? this._fsm : this._rsm;
      const hasAnyData = schemaManager
        .hasAnyData(this.data.schemaId)
        .pipe(map(res => ({hasAnyData: res})));
      const checksStreams: Observable<{[key: string]: boolean}>[] = [hasAnyData];
      if (this.data.schemaType === 'forms') {
        const isUsedByAnyReports = this._rsm
          .isUsedByAnyReports(this.data.schemaId)
          .pipe(map(res => ({isUsedByAnyReports: res})));
        const isUsedByAnyFormDeps = this._fsdm
          .isUsedByAnyFormSchemaDeps(this.data.schemaId)
          .pipe(map(res => ({isUsedByAnyFormSchemaDeps: res})));
        checksStreams.push(isUsedByAnyReports, isUsedByAnyFormDeps);
      }
      const isUsedByAnyGroup = this._ugm
        .isUsedByAnyGroup(this.data.schemaId)
        .pipe(map(res => ({isUsedByAnyGroup: res})));
      checksStreams.push(isUsedByAnyGroup);

      this.isDeletable = combineLatest(checksStreams).pipe(
        map(checks => {
          return this._evaluateChecks(checks);
        }),
      );
    }
  }

  /**
   * Closes the dialog returning the user response to the action confirmation request
   * @param response The user response
   */
  confirmationResponse(response: boolean) {
    this.dialogRef.close(response ? this.data.schemaId : null);
  }

  /**
   * Evaluates all checks, sets the dialogMessage and returns true if the Schema is deletable
   * @param checks The "deletable" checks
   */
  private _evaluateChecks(checks: {[key: string]: boolean}[]): boolean {
    if (!checks || !checks.length) return true;
    const checksObj: {[key: string]: boolean} = Object.assign({}, ...checks);
    if (checksObj['hasAnyData']) {
      this.dialogTitle.next(this._ts.translate(`Cannot delete Schema`));
      this.dialogMessage.next(
        this._ts.translate(
          `There is Data associated with this Schema. Please delete all associated Data before deleting this Schema.`,
        ),
      );
      return false;
    }
    if (checksObj['isUsedByAnyReports']) {
      this.dialogTitle.next(this._ts.translate(`Cannot delete Schema`));
      this.dialogMessage.next(
        this._ts.translate(
          `One ore more Reports are currently using this Form Schema. Please delete those reports before deleting this Schema.`,
        ),
      );
      return false;
    }
    if (checksObj['isUsedByAnyFormSchemaDeps']) {
      this.dialogMessage.next(
        this._ts.translate(
          `Other Forms depend on this Form Schema and some of its fields. Are you sure you want to delete it?`,
        ),
      );
    }
    if (checksObj['isUsedByAnyGroup']) {
      this.dialogMessage.next(
        this._ts.translate(
          `One or more User Groups grant permissions for this Schema. Are you sure you want to delete it?`,
        ),
      );
    }
    return true;
  }

  ngOnDestroy(): void {
    this.dialogMessage.complete();
    this.dialogTitle.complete();
  }
}
