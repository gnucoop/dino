/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco Core (dewco).
 *
 * Dewco Core (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco Core (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco Core (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Lang, LangRow, LangManager} from '@dino/core/langs';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import {LangsAddDialog} from './langs-add-dialog';
import {LangsExportDialog} from './langs-export-dialog';
import {LangsSettingsDialog} from './langs-settings-dialog';
import {LangsUpdateDialog} from './langs-update-dialog';

@Component({
  selector: 'dino-langs',
  templateUrl: 'langs.html',
  styleUrls: ['langs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LangsComponent implements OnDestroy {
  readonly allLangNames$: Observable<string[]> = this._langSvc.allLangsNames$;
  readonly items$: Observable<LangRow[]>;
  readonly langsShowed$: Observable<Lang[]>;
  readonly loading$: Observable<boolean>;
  readonly searchField: FormControl = new FormControl();
  readonly searchKeyStream$: Observable<string>;
  readonly searchLangField: FormControl = new FormControl('key');
  readonly searchLangKeyStream$: Observable<string>;

  private _dialogAddSub: Subscription = Subscription.EMPTY;
  private _dialogUpdateSub: Subscription = Subscription.EMPTY;
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private _dialog: MatDialog,
    private _langSvc: LangManager,
    private _snackBar: MatSnackBar,
    private _ts: TranslocoService,
  ) {
    this.loading$ = this._loading$ as Observable<boolean>;
    this.langsShowed$ = this._langSvc.langsShowed$;

    this.searchKeyStream$ = this.searchField.valueChanges.pipe(
      debounceTime(250),
      map(v => (v || '').trim()),
      distinctUntilChanged(),
      startWith(''),
      shareReplay(1),
    );
    this.searchLangKeyStream$ = this.searchLangField.valueChanges.pipe(
      startWith('key'),
      shareReplay(1),
    );
    this.items$ = this._langSvc.langRows$.pipe(tap(_ => this._loading$.next(false)));
  }

  ngOnDestroy(): void {
    this._dialogUpdateSub.unsubscribe();
    this._dialogAddSub.unsubscribe();
  }

  openAddLanguage(): void {
    this._dialog.open(LangsSettingsDialog, {width: '100%', data: this.langsShowed$});
  }

  openAddTranslation(): void {
    this._dialogAddSub = this._dialog
      .open(LangsAddDialog, {width: '100%'})
      .afterClosed()
      .pipe(
        switchMap((updates: {[key: string]: string}) =>
          this._langSvc.updateLang(updates, updates.key),
        ),
      )
      .subscribe(res => {
        this._snackBar.open(res, this._ts.translate('Ok'), {duration: 2000});
      });
  }

  openExportLanguage(): void {
    this._dialog.open(LangsExportDialog, {width: '100%', data: this.langsShowed$});
  }

  openUpdate(lang: LangRow): void {
    this._dialogUpdateSub = this._dialog
      .open(LangsUpdateDialog, {width: '100%', data: lang})
      .afterClosed()
      .pipe(
        filter(updates => updates),
        switchMap((updates: {[key: string]: string}) =>
          this._langSvc.updateLang(updates, lang.key),
        ),
      )
      .subscribe(res => {
        this._snackBar.open(res, this._ts.translate('Ok'), {duration: 2000});
      });
  }
}
