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
   * and sets the active language to the configured default.
   * Intended for anonymous/online-only contexts where localStorage is unavailable.
   */
  loadLangs(): Observable<void> {
    return this.list().pipe(
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
        this._ts.setActiveLang(this._config.defaultLanguage);
      }),
    );
  }
}
