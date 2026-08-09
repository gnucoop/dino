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

/**
 * The language the translation keys are written in: a key is the english source
 * string, so the entry of this language is the origin of every other translation.
 */
export const SOURCE_LANG = 'ENG';

/**
 * The languages written right to left.
 */
export const RTL_LANGS = ['AR'];

export function isRtlLang(lang: string): boolean {
  return RTL_LANGS.indexOf(lang) > -1;
}

/**
 * Matches the interpolation placeholders used by transloco, ie {{language}}.
 */
export const VARIABLE_RE = /\{\{.*?\}\}/g;

/**
 * Returns the list of {{variable}} placeholders contained in text, without duplicates.
 */
export function extractVariables(text: string): string[] {
  const matches = (text || '').match(VARIABLE_RE);
  return matches ? Array.from(new Set(matches)) : [];
}

/**
 * A piece of a translation key, either plain text or a {{variable}} placeholder.
 */
export interface KeySegment {
  text: string;
  variable: boolean;
}

/**
 * Splits text into its plain and {{variable}} parts, so that the placeholders can
 * be rendered as chips.
 */
export function splitVariables(text: string): KeySegment[] {
  const segments: KeySegment[] = [];
  const re = new RegExp(VARIABLE_RE.source, 'g');
  let last = 0;
  let match = re.exec(text || '');
  while (match != null) {
    if (match.index > last) {
      segments.push({text: (text || '').slice(last, match.index), variable: false});
    }
    segments.push({text: match[0], variable: true});
    last = match.index + match[0].length;
    match = re.exec(text || '');
  }
  if (last < (text || '').length) {
    segments.push({text: (text || '').slice(last), variable: false});
  }
  return segments;
}

/**
 * The locale of every language known to dino. Unlike getCurrentLocale it does not
 * fall back to english, so that an unknown language can be told apart.
 */
export const LANG_LOCALES: Dic = {
  AR: 'ar',
  ENG: 'en',
  ESP: 'es',
  FRA: 'fr',
  ITA: 'it',
  PRT: 'pt',
  UGA: 'it',
  UKR: 'uk',
};

/**
 * The name of a language written in the language itself, ie ITA -> Italiano.
 * Falls back to the language code when the language is not a known one.
 */
export function langLabel(lang: string): string {
  const locale = LANG_LOCALES[lang];
  if (locale == null || typeof Intl === 'undefined' || Intl.DisplayNames == null) {
    return lang;
  }
  try {
    const label = new Intl.DisplayNames([locale], {type: 'language'}).of(locale);
    return label ? label.charAt(0).toUpperCase() + label.slice(1) : lang;
  } catch (_err) {
    return lang;
  }
}

/**
 * How many of langs have a non blank translation on row.
 */
export function langRowCompletion(
  row: Dic,
  langs: string[],
): {filled: number; total: number; pct: number} {
  const total = langs.length;
  const filled = langs.filter(lang => (row[lang] || '').trim() !== '').length;
  return {filled, total, pct: total === 0 ? 0 : Math.round((filled / total) * 100)};
}

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
