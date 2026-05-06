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
import {Pipe, PipeTransform} from '@angular/core';
import {transformDateByLocale} from '@dino/core/langs';
import {parse, parseISO} from 'date-fns';

/**
 * If the value is a date, this pipe formats the date according to the locale, otherwise it returns the initial value.
 */
@Pipe({name: 'dinoDateValue', pure: false})
export class DateValue implements PipeTransform {
  constructor(private _ts: TranslocoService) {}

  transform(val: any): string {
    if (val == null) return '';
    let isValNaN = Number.isNaN(val);
    let dt = parseISO(isValNaN ? val : {});
    if (!isNaN(dt.valueOf())) {
      return transformDateByLocale(dt, this._ts.getActiveLang(), 'shortDate');
    }
    dt = parse(val, 'yyyy-MM-dd', new Date());
    if (!isNaN(dt.valueOf())) {
      return transformDateByLocale(dt, this._ts.getActiveLang(), 'shortDate');
    }
    if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,}.*$/.test(val)) {
      dt = new Date(val);
      if (!isNaN(dt.valueOf())) {
        return transformDateByLocale(dt, this._ts.getActiveLang(), 'shortDate');
      }
    }
    if (typeof val === 'object' && !isNaN(val.valueOf())) {
      return transformDateByLocale(val, this._ts.getActiveLang(), 'shortDate');
    }
    return val == null ? '' : val;
  }
}
