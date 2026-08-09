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

import {Injectable, OnDestroy} from '@angular/core';
import {Dic, LangManager, LangRow, extractVariables, langRowCompletion} from '@dino/core/langs';
import {BehaviorSubject, Observable, Subject, Subscription, combineLatest, of as obsOf} from 'rxjs';
import {
  catchError,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  groupBy,
  map,
  mergeMap,
  shareReplay,
  tap,
} from 'rxjs/operators';

export type LangsFilter = 'all' | 'missing';
export type LangsSaveState = 'idle' | 'saving' | 'saved' | 'error';
export type LangsStatus = 'ok' | 'warn' | 'danger';

/**
 * A translation key as rendered by the key list and the detail pane: the stored
 * LangRow with the pending edits already layered on top, plus its completion.
 */
export interface TranslationKeyVm {
  key: string;
  values: Dic;
  variables: string[];
  filled: number;
  total: number;
  pct: number;
  status: LangsStatus;
}

/**
 * The pending, not yet stored, values. Indexed by translation key and language.
 */
export interface LangsEdits {
  [key: string]: Dic;
}

const SAVE_DEBOUNCE = 500;

/**
 * Holds the whole state of the translations page: search, filter, selection and
 * the buffer of the edits that are being saved.
 *
 * It is provided by LangsComponent, not in root, so that the state is dropped
 * when the user leaves the page.
 */
@Injectable()
export class LangsStore implements OnDestroy {
  readonly langs$: Observable<string[]> = this._langSvc.allLangsNames$;

  /**
   * The translation keys stored on dino, shared so that the pivot done by
   * LangManager.langRows$ runs once for the whole page.
   */
  private readonly _storedRows$: Observable<LangRow[]> = this._langSvc.langRows$.pipe(
    shareReplay({bufferSize: 1, refCount: true}),
  );

  private readonly _edits$ = new BehaviorSubject<LangsEdits>({});
  readonly edits$: Observable<LangsEdits> = this._edits$;

  private readonly _saveStates$ = new BehaviorSubject<{[key: string]: LangsSaveState}>({});
  readonly saveStates$: Observable<{[key: string]: LangsSaveState}> = this._saveStates$;

  private readonly _query$ = new BehaviorSubject<string>('');
  /**
   * The debounced search text. It is a subject, and not a pipe on _query$, so that
   * a late subscriber gets the search that is in effect instead of replaying the
   * debounce from scratch.
   */
  private readonly _debouncedQuery$ = new BehaviorSubject<string>('');
  private readonly _filter$ = new BehaviorSubject<LangsFilter>('all');
  readonly filter$: Observable<LangsFilter> = this._filter$;

  private readonly _selectedKey$ = new BehaviorSubject<string | null>(null);
  readonly selectedKey$: Observable<string | null> = this._selectedKey$;

  readonly rows$: Observable<TranslationKeyVm[]> = combineLatest([
    this._storedRows$,
    this.langs$,
    this._edits$,
  ]).pipe(
    map(([rows, langs, edits]) => rows.map(row => buildVm(row, langs, edits[row.key]))),
    shareReplay({bufferSize: 1, refCount: true}),
  );

  readonly visibleRows$: Observable<TranslationKeyVm[]> = combineLatest([
    this.rows$,
    this._debouncedQuery$,
    this._filter$,
  ]).pipe(
    map(([rows, query, filter]) =>
      rows.filter(row => matchesQuery(row, query) && (filter === 'all' || row.pct < 100)),
    ),
    shareReplay({bufferSize: 1, refCount: true}),
  );

  /**
   * The key rendered by the detail pane. It is looked up among all the rows, and
   * not among the visible ones, so that searching does not change the selection.
   */
  readonly selected$: Observable<TranslationKeyVm | null> = combineLatest([
    this.rows$,
    this.visibleRows$,
    this._selectedKey$,
  ]).pipe(
    map(([rows, visibleRows, selectedKey]) => {
      const selected = selectedKey != null ? rows.find(row => row.key === selectedKey) : undefined;
      return selected ?? visibleRows[0] ?? null;
    }),
    shareReplay({bufferSize: 1, refCount: true}),
  );

  /**
   * The mean completion of all the translation keys, as shown by the page subtitle.
   */
  readonly donePct$: Observable<number> = this.rows$.pipe(
    map(rows =>
      rows.length === 0 ? 0 : Math.round(rows.reduce((acc, row) => acc + row.pct, 0) / rows.length),
    ),
  );

  readonly keysCount$: Observable<number> = this.rows$.pipe(map(rows => rows.length));

  private readonly _save$ = new Subject<string>();
  private _saveSub: Subscription = Subscription.EMPTY;
  private _reconcileSub: Subscription = Subscription.EMPTY;
  private _querySub: Subscription = Subscription.EMPTY;

  constructor(private _langSvc: LangManager) {
    this._querySub = this._query$
      .pipe(
        map(query => (query || '').trim().toLowerCase()),
        debounceTime(250),
        distinctUntilChanged(),
      )
      .subscribe(query => this._debouncedQuery$.next(query));

    // One flush per key, debounced, and every flush serialized: updateLang rewrites
    // a whole language document starting from a snapshot of the stored langs, so two
    // overlapping calls would make the second one drop the changes of the first.
    this._saveSub = this._save$
      .pipe(
        groupBy(key => key),
        mergeMap(keyEdits => keyEdits.pipe(debounceTime(SAVE_DEBOUNCE))),
        concatMap(key => this._flush(key)),
      )
      .subscribe();

    // Drop the edits that the reloaded rows already carry. Clearing them on the
    // save response instead would show the previous value until the reload lands.
    this._reconcileSub = this._storedRows$.subscribe(rows => this._reconcile(rows));
  }

  ngOnDestroy(): void {
    this._saveSub.unsubscribe();
    this._reconcileSub.unsubscribe();
    this._querySub.unsubscribe();
  }

  setQuery(query: string): void {
    this._query$.next(query);
  }

  setFilter(filter: LangsFilter): void {
    this._filter$.next(filter);
  }

  select(key: string): void {
    this._selectedKey$.next(key);
  }

  /**
   * Buffers a translation and schedules its save.
   */
  setValue(key: string, lang: string, value: string): void {
    const edits = this._edits$.value;
    this._edits$.next({...edits, [key]: {...edits[key], [lang]: value}});
    this._setSaveState(key, 'idle');
    this._save$.next(key);
  }

  /**
   * Forgets the buffered edits of a key, used when the key gets deleted.
   */
  discard(key: string): void {
    const edits = {...this._edits$.value};
    delete edits[key];
    this._edits$.next(edits);
    if (this._selectedKey$.value === key) {
      this._selectedKey$.next(null);
    }
  }

  private _flush(key: string): Observable<unknown> {
    const updates = {...this._edits$.value[key]};
    if (Object.keys(updates).length === 0) {
      return obsOf(null);
    }
    this._setSaveState(key, 'saving');
    return this._langSvc.updateLang(updates, key).pipe(
      tap(() => this._setSaveState(key, 'saved')),
      catchError(() => {
        this._setSaveState(key, 'error');
        return obsOf(null);
      }),
    );
  }

  private _reconcile(rows: LangRow[]): void {
    const edits = this._edits$.value;
    const keys = Object.keys(edits);
    if (keys.length === 0) {
      return;
    }
    const storedByKey: {[key: string]: LangRow} = {};
    rows.forEach(row => (storedByKey[row.key] = row));

    let changed = false;
    const next: LangsEdits = {};
    keys.forEach(key => {
      const stored = storedByKey[key];
      const pending: Dic = {};
      Object.keys(edits[key]).forEach(lang => {
        if (stored != null && (stored[lang] || '') === edits[key][lang]) {
          changed = true;
        } else {
          pending[lang] = edits[key][lang];
        }
      });
      if (Object.keys(pending).length > 0) {
        next[key] = pending;
      }
    });
    if (changed) {
      this._edits$.next(next);
    }
  }

  private _setSaveState(key: string, state: LangsSaveState): void {
    this._saveStates$.next({...this._saveStates$.value, [key]: state});
  }
}

function buildVm(row: LangRow, langs: string[], edits: Dic | undefined): TranslationKeyVm {
  const values: Dic = {};
  langs.forEach(lang => (values[lang] = (edits && edits[lang]) ?? row[lang] ?? ''));
  const {filled, total, pct} = langRowCompletion(values, langs);
  return {
    key: row.key,
    values,
    variables: extractVariables(row.key),
    filled,
    total,
    pct,
    status: pct === 100 ? 'ok' : pct >= 40 ? 'warn' : 'danger',
  };
}

function matchesQuery(row: TranslationKeyVm, query: string): boolean {
  if (query === '') {
    return true;
  }
  if (row.key.toLowerCase().includes(query)) {
    return true;
  }
  return Object.keys(row.values).some(lang => row.values[lang].toLowerCase().includes(query));
}
