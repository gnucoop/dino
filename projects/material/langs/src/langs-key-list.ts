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
import {UntypedFormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

import {LangsFilter, LangsStore, TranslationKeyVm} from './langs-store';

@Component({
  selector: 'dino-langs-key-list',
  templateUrl: 'langs-key-list.html',
  styleUrls: ['langs-key-list.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LangsKeyListComponent implements OnDestroy {
  readonly rows$: Observable<TranslationKeyVm[]> = this._store.visibleRows$;
  readonly selectedKey$: Observable<string | null> = this._store.selected$.pipe(
    map(selected => (selected != null ? selected.key : null)),
  );
  readonly filter$: Observable<LangsFilter> = this._store.filter$;
  readonly searchField: UntypedFormControl = new UntypedFormControl('');

  private _searchSub: Subscription = Subscription.EMPTY;

  constructor(private _store: LangsStore) {
    this._searchSub = this.searchField.valueChanges.subscribe(value => this._store.setQuery(value));
  }

  ngOnDestroy(): void {
    this._searchSub.unsubscribe();
  }

  setFilter(filter: LangsFilter): void {
    this._store.setFilter(filter);
  }

  select(row: TranslationKeyVm): void {
    this._store.select(row.key);
  }

  /**
   * The completion ring is drawn as a conic gradient filled up to pct.
   */
  ringGradient(row: TranslationKeyVm): string {
    return (
      `conic-gradient(var(--dino-langs-${row.status}) ${row.pct * 3.6}deg,` +
      ` var(--dino-langs-ring-track) 0)`
    );
  }

  trackByKey(_: number, row: TranslationKeyVm): string {
    return row.key;
  }
}
