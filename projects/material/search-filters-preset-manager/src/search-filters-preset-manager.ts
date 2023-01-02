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
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {FiltersService} from '@dino/core/list';
import {BehaviorSubject, Observable, of as obsOf, throwError} from 'rxjs';
import {catchError, map, shareReplay, startWith, take, withLatestFrom} from 'rxjs/operators';

/**
 * Shows a list of active filters and allows the deletion of any one of those
 *
 */
@Component({
  selector: 'dino-search-filters-preset-manager',
  styleUrls: ['search-filters-preset-manager.scss'],
  templateUrl: 'search-filters-preset-manager.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SearchFiltersPresetManager implements OnDestroy, OnInit {
  presetData: Observable<any> = obsOf({});
  presetName: Observable<string> = obsOf('');
  canLoadPreset: Observable<boolean> = obsOf(false);
  filteredOptions: Observable<string[]> = obsOf([]);
  presetControl = new UntypedFormControl();
  private _presetOptions: Observable<string[]> = obsOf([]);
  private _presets = new BehaviorSubject<string[]>([]);
  private _presetSaveData: Observable<any> = obsOf({});

  constructor(private _route: ActivatedRoute, private _fs: FiltersService) {}

  /**
   * Saves a filterPreset into the localstorage
   */
  savePreset() {
    const saveSub = this._presetSaveData
      .pipe(catchError(err => throwError(() => err) as Observable<[string, any]>))
      .subscribe(([pName, pData]) => {
        if (pName != '' && pData != null) {
          localStorage.setItem('filters_preset_' + pName, pData);
          this._presets.next(Object.keys(localStorage));
        }
      });
    saveSub.unsubscribe();
  }

  /**
   * Loads a filterPreset from the localstorage
   */
  loadPreset() {
    const loadSub = this.canLoadPreset
      .pipe(
        withLatestFrom(this.presetName),
        catchError(err => throwError(() => err) as Observable<[boolean, string]>),
      )
      .subscribe(([canLoad, pName]) => {
        if (canLoad && pName != '') {
          const preset = localStorage.getItem(`filters_preset_${pName}`);
          if (preset) {
            this._fs.loadPreset(preset);
          }
        }
      });
    loadSub.unsubscribe();
  }

  ngOnInit() {
    this.presetName = this.presetControl.valueChanges.pipe(startWith(''), shareReplay(1));
    this.presetData = this._route.queryParams.pipe(map(f => f['filters']));
    this._presetSaveData = this.presetName.pipe(withLatestFrom(this.presetData), take(1));

    this._presets = new BehaviorSubject<string[]>(Object.keys(localStorage));
    this._presetOptions = this._presets.pipe(
      map(keys =>
        keys
          .filter(k => k.includes('filters_preset_'))
          .map(str => str.replace('filters_preset_', '')),
      ),
      catchError(err => throwError(() => err) as Observable<string[]>),
    );

    this.canLoadPreset = this.presetName.pipe(
      withLatestFrom(this._presetOptions),
      map(([pName, options]) => {
        return options.some(option => pName && option === pName);
      }),
      startWith(false),
      catchError(err => throwError(() => err) as Observable<boolean>),
    );

    this.filteredOptions = this.presetName.pipe(
      withLatestFrom(this._presetOptions),
      map(([value, options]) => {
        return this._filter(value, options);
      }),
    );
  }

  private _filter(value: string, options: string[]): string[] {
    const filterValue = value.toLowerCase();
    return options.filter(option => option.toLowerCase().includes(filterValue));
  }

  ngOnDestroy() {
    this._presets.complete();
  }
}
