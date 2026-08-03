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

import {Inject, Injectable, isDevMode} from '@angular/core';
import {OnlineDataModelManager, OnlineDataService, PermissionContextService} from '@dino/core/data';
import {TranslationsConfig, TRANSLATIONS_CONFIG} from '@dino/core/translations';
import {TranslocoService} from '@ngneat/transloco';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

import {Lang, migrationStrategies} from './lang';
import {schema} from './lang-json';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';

const collectionDef = {name: 'lang', collection: {schema, migrationStrategies}};

@Injectable({providedIn: 'root'})
export class OnlineLangManager extends OnlineDataModelManager<Lang> {
  constructor(
    dataService: OnlineDataService,
    permissionContextService: PermissionContextService,
    private _ts: TranslocoService,
    private _ehms: ErrorHandlerMessageService,
    @Inject(TRANSLATIONS_CONFIG) private _config: TranslationsConfig,
  ) {
    super(collectionDef, dataService, permissionContextService);
  }

  /**
   * Fetches langs from the backend via GQL, registers them in TranslocoService
   * and re-applies the active language so the view picks up the new translations.
   * Intended for anonymous/online-only contexts where localStorage is unavailable.
   */
  loadLangs(): Observable<void> {
    // An empty selector is passed on purpose: the default one (`is_deleted: {$ne:
    // true}`) is a Mango operator with no Hasura equivalent (`_ne` does not
    // exist), and even `_eq: false` would drop the rows where `is_deleted` is
    // NULL. Soft-deleted langs are filtered client-side below instead.
    return this.query({selector: {}}).pipe(
      take(1),
      map(langs => {
        langs
          .filter(l => !l.is_deleted)
          .forEach(l => {
            try {
              this._ts.setTranslation(l.schema, l.name);
            } catch (err) {
              if (isDevMode()) {
                console.log(`Could not set Translations for lang ${l.name}: ${err}`);
              }
              this._ehms.captureErrorMessage(
                `Could not set Translations for lang ${l.name}: ${err}`,
                'error',
              );
            }
          });
        // Re-apply the language that is already active instead of forcing the
        // default one: by the time the langs arrive the user's language may have
        // been restored (LangSelector reads it from localStorage), and resetting
        // it here would leave the selector showing one language while the form
        // renders in another. `setActiveLang` always emits on `langChanges$`,
        // even with the same value, so the re-render still happens.
        this._ts.setActiveLang(this._ts.getActiveLang() || this._config.defaultLanguage);
      }),
    );
  }
}
