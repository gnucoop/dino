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
  Component,
  Inject,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LangManager} from '@dino/core/langs';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';

import {LangsConfirmDialog} from './langs-confirm-dialog';

@Component({
  selector: 'dino-langs-update-dialog',
  templateUrl: './langs-update-dialog.html',
  styleUrls: ['./langs-update-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LangsUpdateDialog implements OnDestroy {
  readonly form: FormGroup;
  readonly loading$: Observable<boolean>;

  private _deleteSub: Subscription = Subscription.EMPTY;
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _langSvc: LangManager,
    public dialogRef: MatDialogRef<LangsUpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    private _ts: TranslocoService,
  ) {
    const initForm: {[key: string]: any[]} = {};
    Object.keys(data).forEach(k => (initForm[k] = [data[k]]));
    this.form = fb.group(initForm);
    this.loading$ = this._loading$ as Observable<boolean>;
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this._deleteSub.unsubscribe();
  }

  remove(key: string): void {
    this._deleteSub = this._dialog
      .open(LangsConfirmDialog)
      .afterClosed()
      .pipe(
        filter((sure: boolean) => sure),
        switchMap(_ => {
          this._loading$.next(true);
          return this._langSvc.removeKey(key);
        }),
      )
      .subscribe(r => {
        this._snackBar.open(r, this._ts.translate('Ok'), {duration: 2000});
        this._loading$.next(false);
        this.dialogRef.close();
      });
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }
}
