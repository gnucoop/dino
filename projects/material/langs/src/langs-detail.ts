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
import {KeySegment, LangManager, isRtlLang, langLabel, splitVariables} from '@dino/core/langs';
import {TranslocoService} from '@ngneat/transloco';
import {BehaviorSubject, Observable, Subscription, combineLatest} from 'rxjs';
import {filter, map, switchMap, take} from 'rxjs/operators';

import {LangsConfirmDialog} from './langs-confirm-dialog';
import {LangsSaveState, LangsStore, TranslationKeyVm} from './langs-store';

/**
 * A single language of the selected translation key, as rendered by a card.
 */
export interface LangsDetailRow {
  lang: string;
  label: string;
  value: string;
  filled: boolean;
  rtl: boolean;
}

@Component({
  selector: 'dino-langs-detail',
  templateUrl: 'langs-detail.html',
  styleUrls: ['langs-detail.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LangsDetailComponent implements OnDestroy {
  readonly selected$: Observable<TranslationKeyVm | null> = this._store.selected$;
  readonly segments$: Observable<KeySegment[]> = this.selected$.pipe(
    map(selected => (selected != null ? splitVariables(selected.key) : [])),
  );
  readonly rows$: Observable<LangsDetailRow[]> = combineLatest([
    this.selected$,
    this._store.langs$,
  ]).pipe(
    map(([selected, langs]) =>
      selected == null
        ? []
        : langs.map(lang => {
            const value = selected.values[lang] || '';
            return {
              lang,
              label: langLabel(lang),
              value,
              filled: value.trim() !== '',
              rtl: isRtlLang(lang),
            };
          }),
    ),
  );
  readonly saveState$: Observable<LangsSaveState> = combineLatest([
    this.selected$,
    this._store.saveStates$,
  ]).pipe(map(([selected, states]) => (selected != null ? states[selected.key] : null) ?? 'idle'));

  private readonly _renaming$ = new BehaviorSubject<boolean>(false);
  readonly renaming$: Observable<boolean> = this._renaming$;

  private _removeSub: Subscription = Subscription.EMPTY;
  private _renameSub: Subscription = Subscription.EMPTY;

  constructor(
    private _store: LangsStore,
    private _dialog: MatDialog,
    private _langSvc: LangManager,
    private _snackBar: MatSnackBar,
    private _ts: TranslocoService,
  ) {}

  ngOnDestroy(): void {
    this._removeSub.unsubscribe();
    this._renameSub.unsubscribe();
  }

  setValue(key: string, lang: string, value: string): void {
    this._store.setValue(key, lang, value);
  }

  startRename(): void {
    this._renaming$.next(true);
  }

  cancelRename(): void {
    this._renaming$.next(false);
  }

  /**
   * Renaming the key rewrites the entry on every language document, so unlike the
   * translations it is not saved while typing.
   */
  rename(key: string, newKey: string): void {
    const trimmed = (newKey || '').trim();
    if (!this._renaming$.value) {
      return;
    }
    this._renaming$.next(false);
    if (trimmed === '' || trimmed === key) {
      return;
    }
    this._renameSub = this._langSvc
      .updateLang({key: trimmed}, key)
      .pipe(take(1))
      .subscribe(res => {
        this._store.select(trimmed);
        this._snackBar.open(res, this._ts.translate('Ok'), {duration: 2000});
      });
  }

  remove(key: string): void {
    this._removeSub = this._dialog
      .open(LangsConfirmDialog)
      .afterClosed()
      .pipe(
        filter((sure: boolean) => sure),
        switchMap(_ => this._langSvc.removeKey(key)),
        take(1),
      )
      .subscribe(res => {
        this._store.discard(key);
        this._snackBar.open(res, this._ts.translate('Ok'), {duration: 2000});
      });
  }

  trackByLang(_: number, row: LangsDetailRow): string {
    return row.lang;
  }
}
