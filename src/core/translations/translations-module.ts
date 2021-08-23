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
import {ModuleWithProviders, NgModule} from '@angular/core';
import {dewcoTranslations} from './translations';

@NgModule({})
export class DewcoTranslationsModule {
  constructor(ts: TranslocoService) {
    const langs = ts.getAvailableLangs() as string[];
    langs.forEach((lang) => {
      if (dewcoTranslations[lang] != null) {
        ts.setTranslation(dewcoTranslations[lang], lang);
      }
    });
  }
  static forRoot(): ModuleWithProviders<DewcoTranslationsModule> {
    return {ngModule: DewcoTranslationsModule};
  }
}
