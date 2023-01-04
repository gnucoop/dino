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
  Renderer2,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA, MatLegacyDialog as MatDialog, MatLegacyDialogRef as MatDialogRef} from '@angular/material/legacy-dialog';
import {MatLegacySnackBar as MatSnackBar} from '@angular/material/legacy-snack-bar';
import {Lang, LangManager} from '@dino/core/langs';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {filter, switchMap} from 'rxjs/operators';

import {LangsConfirmDialog} from './langs-confirm-dialog';

@Component({
  selector: 'dino-langs-export-dialog',
  templateUrl: './langs-export-dialog.html',
  styleUrls: ['./langs-export-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LangsExportDialog implements OnDestroy {
  readonly currentLang$: Observable<Lang>;
  readonly form: UntypedFormGroup;

  private _addLangSub: Subscription = Subscription.EMPTY;
  private _currentLang$: BehaviorSubject<Lang> = new BehaviorSubject<Lang>({} as Lang);
  private _updateLangSub: Subscription = Subscription.EMPTY;

  constructor(
    public dialogRef: MatDialogRef<LangsExportDialog>,
    @Inject(MAT_DIALOG_DATA) public langs: Observable<Lang[]>,
    fb: UntypedFormBuilder,
    private _dialog: MatDialog,
    private _langSvc: LangManager,
    private _snackBar: MatSnackBar,
    private _renderer: Renderer2,
    private _ts: TranslocoService,
  ) {
    this.form = fb.group({key: [null, [Validators.required]], dictionary: [null]});
    this.currentLang$ = (this._currentLang$ as Observable<Lang>).pipe(
      filter(l => Object.keys(l).length > 0),
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  currentLang(lang: Lang): void {
    this._currentLang$.next(lang);
  }

  download(lang: Lang): void {
    const filename = lang.name;
    const blob = new Blob([JSON.stringify(lang.schema)], {type: 'text/csv;charset=utf-8'});
    const link = this._renderer.createElement('a');

    this._renderer.setAttribute(link, 'href', URL.createObjectURL(blob));
    this._renderer.setStyle(link, 'position', 'absolute');
    this._renderer.setStyle(link, 'top', '-3000');
    this._renderer.setStyle(link, 'left', '-3000');
    this._renderer.setAttribute(link, 'download', filename + '.json');
    link.click();
  }

  ngOnDestroy(): void {
    this._addLangSub.unsubscribe();
    this._updateLangSub.unsubscribe();
  }

  remove(lang: Lang): void {
    this._updateLangSub = this._dialog
      .open(LangsConfirmDialog)
      .afterClosed()
      .pipe(
        filter((sure: boolean) => sure),
        switchMap(_ => this._langSvc.removeLang(lang)),
      )
      .subscribe(r => {
        this._snackBar.open(r, this._ts.translate('Ok'), {
          duration: 2000,
        });
      });
  }
}
