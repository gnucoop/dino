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
import {Inject, Injectable} from '@angular/core';
import {TranslationsConfig, TRANSLATIONS_CONFIG} from '@dino/core/translations';

/**
 * The local storage key holding the language selected by the user.
 */
const LANG_STORAGE_KEY = 'lang';

/**
 * Owns the active Dino language: applies it to Transloco and persists the user
 * choice in the local storage.
 *
 * Shared by every surface that can change the language (the language selector
 * component and the user menu in the app shell), so the persistence behaviour is
 * defined in a single place.
 */
@Injectable({providedIn: 'root'})
export class LangService {
  constructor(
    private _ts: TranslocoService,
    @Inject(TRANSLATIONS_CONFIG) private _config: TranslationsConfig,
  ) {
    this._ts.setDefaultLang(this._config.defaultLanguage);
    this._ts.setActiveLang(this.currentLang);
  }

  /**
   * The language currently active: the one stored for this user, or the configured default.
   */
  get currentLang(): string {
    return localStorage.getItem(LANG_STORAGE_KEY) || this._config.defaultLanguage;
  }

  /**
   * Applies a language and persists the choice.
   * @param lang The Dino language code, eg. 'ITA'
   */
  setLang(lang: string): void {
    if (lang == null) {
      return;
    }
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    this._ts.setActiveLang(lang);
  }
}
