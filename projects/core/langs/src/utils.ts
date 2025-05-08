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

import {InsertModel} from '@dino/core/data';
import {Lang} from './lang';
import {DatePipe} from '@angular/common';

/**
 * key is the string used by translator.
 * The other attributes of langrow are the language/translation associations.
 *
 * example:
 * {key: 'name', ENG: 'name', SPA: 'NOMBRE'}
 *
 */
export interface LangRow {
  key: string;
  [lang: string]: string;
}
/**
 * It represents the interface of a dictionary
 */
export interface Dic {
  [key: string]: string;
}

export const defaultLangs: {[lang: string]: Lang} = {};

export type LangCreate = InsertModel<Lang>;

export function getCurrentLocale(lang: string): string {
  switch (lang) {
    case 'ESP':
      return 'es';
    case 'FRA':
      return 'fr';
    case 'ITA':
      return 'it';
    case 'PRT':
      return 'pt';
    case 'UGA':
      return 'it';
    default:
      return 'en';
  }
}

export function transformDateByLocale(dt: Date, lang: string, format: string): string {
  const datePipe = new DatePipe(getCurrentLocale(lang));
  return datePipe.transform(dt, format) as string;
}
