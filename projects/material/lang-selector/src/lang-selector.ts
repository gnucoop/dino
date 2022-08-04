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
import {TranslocoService} from '@ajf/core/transloco';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import {TranslationsConfig, TRANSLATIONS_CONFIG} from '@dino/core/translations';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'dino-lang-selector',
  styleUrls: ['lang-selector.scss'],
  templateUrl: 'lang-selector.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LangSelector implements AfterViewInit {
  /**
   * Custom languages to be shown in the Language Selector
   */
  @Input() customLanguages: string[] | undefined;
  currentLang: string;
  readonly langsShowed$: BehaviorSubject<string[]>;

  constructor(
    private _ts: TranslocoService,
    @Inject(TRANSLATIONS_CONFIG) private _config: TranslationsConfig,
  ) {
    this.langsShowed$ = new BehaviorSubject<string[]>(['ENG']);
    this.currentLang = localStorage.getItem('lang') || this._config.defaultLanguage;
    this._ts.setDefaultLang(this._config.defaultLanguage);
    this._ts.setActiveLang(this.currentLang);
  }

  ngAfterViewInit(): void {
    if (this.customLanguages) {
      this.langsShowed$.next(this.customLanguages);
    }
  }

  setLang(lang: string) {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
    this._ts.setActiveLang(this.currentLang);
  }
}
