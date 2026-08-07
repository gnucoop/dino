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
import {Pipe, PipeTransform} from '@angular/core';
import {TranslocoService} from '@ajf/core/transloco';
import {transformDateByLocale} from '@dino/core/langs';
import {differenceInCalendarDays} from 'date-fns';

/**
 * Formats a timestamp as a short, human readable distance from today:
 * 'Today', 'Yesterday', '3 days ago', 'Last week', or the localized short date
 * for anything older.
 */
@Pipe({name: 'dinoRelativeDate', pure: false})
export class RelativeDatePipe implements PipeTransform {
  constructor(private _ts: TranslocoService) {}

  transform(value: number | string | Date | null | undefined): string {
    if (value == null) {
      return '';
    }
    const date = value instanceof Date ? value : new Date(value);
    if (isNaN(date.getTime())) {
      return '';
    }
    const days = differenceInCalendarDays(new Date(), date);
    if (days <= 0) {
      return this._ts.translate('Today');
    }
    if (days === 1) {
      return this._ts.translate('Yesterday');
    }
    if (days < 7) {
      return this._ts.translate('{{days}} days ago', {days});
    }
    if (days < 14) {
      return this._ts.translate('Last week');
    }
    return transformDateByLocale(date, this._ts.getActiveLang(), 'shortDate');
  }
}
