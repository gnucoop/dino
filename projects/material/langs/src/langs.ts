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

import {ChangeDetectionStrategy, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LangManager} from '@dino/core/langs';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {filter, map, switchMap, tap} from 'rxjs/operators';

import {LangsAddDialog} from './langs-add-dialog';
import {LangsSettingsDialog} from './langs-settings-dialog';
import {LangsStore} from './langs-store';

@Component({
  selector: 'dino-langs',
  templateUrl: 'langs.html',
  styleUrls: ['langs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [LangsStore],
})
export class LangsComponent implements OnDestroy {
  readonly loading$: Observable<boolean>;
  readonly keysCount$: Observable<number>;
  readonly donePct$: Observable<number> = this._store.donePct$;

  private _dialogAddSub: Subscription = Subscription.EMPTY;
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(
    private _dialog: MatDialog,
    private _langSvc: LangManager,
    private _snackBar: MatSnackBar,
    private _ts: TranslocoService,
    private _store: LangsStore,
  ) {
    this.loading$ = this._loading$ as Observable<boolean>;
    // The first emission of the rows means the local db has been read.
    this.keysCount$ = this._store.keysCount$.pipe(tap(_ => this._loading$.next(false)));
  }

  ngOnDestroy(): void {
    this._dialogAddSub.unsubscribe();
  }

  openAddLanguage(): void {
    this._dialog.open(LangsSettingsDialog, {
      panelClass: 'dino-langs-dialog-panel',
      width: '1040px',
      maxWidth: '95vw',
      height: '740px',
      maxHeight: '92vh',
    });
  }

  openAddTranslation(): void {
    this._dialogAddSub = this._dialog
      .open(LangsAddDialog, {
        panelClass: 'dino-langs-dialog-panel',
        width: '720px',
        maxWidth: '95vw',
        height: '760px',
        maxHeight: '92vh',
      })
      .afterClosed()
      .pipe(
        filter(updates => updates != null && !!updates['key']),
        switchMap((updates: {[key: string]: string}) =>
          this._langSvc.updateLang(updates, updates['key']).pipe(map(res => ({res, updates}))),
        ),
      )
      .subscribe(({res, updates}) => {
        this._store.select(updates['key']);
        this._snackBar.open(res, this._ts.translate('Ok'), {duration: 2000});
      });
  }
}
