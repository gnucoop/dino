/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import {TranslocoService} from '@ajf/core/transloco';
import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'dewco-lang-selector',
  styleUrls: ['lang-selector.scss'],
  templateUrl: 'lang-selector.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LangSelector {
  currentLang: string;
  readonly langsShowed$: Observable<string[]>;

  constructor(private _ts: TranslocoService) {
    this.langsShowed$ = of(['ITA', 'ENG', 'FRA', 'PRT', 'ESP']);
    this.currentLang = localStorage.getItem('lang') || 'ENG';
    this._ts.setDefaultLang(this.currentLang);
  }

  setLang(lang: string) {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    this._ts.setActiveLang(this.currentLang);
  }
}
