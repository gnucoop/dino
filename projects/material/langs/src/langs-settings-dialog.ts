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
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Dic, Lang, LangCreate, LangManager} from '@dino/core/langs';
import {TranslocoService} from '@ngneat/transloco';
import {format} from 'date-fns';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {debounceTime, filter, map} from 'rxjs/operators';

import {LangsConfirmDialog} from './langs-confirm-dialog';

@Component({
  selector: 'dino-langs-settings-dialog',
  templateUrl: './langs-settings-dialog.html',
  styleUrls: ['./langs-settings-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LangsSettingsDialog implements OnDestroy {
  readonly currentError$: Observable<string>;
  readonly currentJson$: Observable<Dic | null>;
  readonly currentLang$ = this._langSvc.currentLangShowed$;
  readonly currentLangName$: Observable<string> = this._langSvc.currentLangName$;
  readonly diff$: Observable<Dic | null> =
    this._langSvc.currentDiffBetweenStoredJsonAndCurrentUpdates$;
  readonly form: FormGroup;
  readonly langNames$ = this._langSvc.allLangsNames$;
  readonly modified$: Observable<Dic | null> =
    this._langSvc.currentModifiedBetweenStoredJsonAndCurrentUpdates$;
  readonly newLang$ = this._langSvc.newLang$;

  private _addLangSub: Subscription = Subscription.EMPTY;
  private _currentError$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _currentJson$: BehaviorSubject<Dic | null> = new BehaviorSubject<Dic | null>(null);
  private _formChangeSub: Subscription = Subscription.EMPTY;
  private _updateLangSub: Subscription = Subscription.EMPTY;

  constructor(
    public dialogRef: MatDialogRef<LangsSettingsDialog>,
    @Inject(MAT_DIALOG_DATA) public langs: Observable<Lang[]>,
    fb: FormBuilder,
    private _dialog: MatDialog,
    private _langSvc: LangManager,
    private _snackBar: MatSnackBar,
    private _ts: TranslocoService,
  ) {
    this.currentError$ = this._currentError$ as Observable<string>;
    this.currentJson$ = (this._currentJson$ as Observable<Dic | null>).pipe(filter(j => j != null));
    this.form = fb.group({key: [null, [Validators.required]]});
    this._formChangeSub = this.form.valueChanges
      .pipe(
        map((changes: {[key: string]: string}) => (changes['key'] ? changes['key'] : null)),
        filter((name: string | null) => name != null),
        debounceTime(300),
      )
      .subscribe((name: string | null) => {
        const newLang: Lang = this._langSvc.newLang as Lang;
        newLang.name = (name as string).toUpperCase();
        this._langSvc.newLang = newLang;
      });

    this._langSvc.infoAfterStoredLang$.subscribe((res: any) => {
      this._snackBar.open(res, this._ts.translate('Ok'), {
        duration: 2000,
      });
      this.close();
    });
  }

  addLang(): void {
    this._langSvc.currentLangName = '';
  }

  close(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this._langSvc.newLang = null;
    this._addLangSub.unsubscribe();
    this._updateLangSub.unsubscribe();
    this._formChangeSub.unsubscribe();
  }

  remove(): void {
    this._updateLangSub = this._dialog
      .open(LangsConfirmDialog)
      .afterClosed()
      .pipe(filter((sure: boolean) => sure))
      .subscribe(_ => {
        this._langSvc.deleteLangEvt.emit();
      });
  }

  save(): void {
    this._langSvc.saveLangEvt.emit();
    this.close();
  }

  setCurrentLang(lName: string): void {
    this._langSvc.currentLangName = lName;
  }

  setError(error: string): void {
    this._currentError$.next(error);
    this._currentJson$.next(null);
  }

  setName(name: string): void {
    this.form.controls['key'].setValue(name);
    const newLang: Lang = this._langSvc.newLang as Lang;
    newLang.name = name;
    this._langSvc.newLang = newLang;
  }

  setNewTranslation(schema: string): void {
    const jsonSchema = JSON.parse(schema);
    const newLang: LangCreate = {
      name: this.form.controls['key'].value,
      schema: jsonSchema,
      created_at: format(new Date(), 'yyyy-MM-dd'),
    };
    this._langSvc.newLang = newLang;
  }

  setUploaded(uploaded: string): void {
    const jsonSchema = JSON.parse(uploaded);
    this._langSvc.currentLangUpdateSchema = jsonSchema;
  }
}
