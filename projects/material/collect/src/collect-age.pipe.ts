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

/**
 * How long ago an item was updated: a translation key with its parameters for the last
 * week, the date itself before that.
 */
export interface CollectAge {
  key?: string;
  params?: {[name: string]: number};
  date?: Date;
}

/**
 * Returns how long ago a timestamp was, in calendar days of the local time zone.
 * @param timestamp The timestamp to describe.
 * @param now The current time, for tests.
 */
export function collectAge(timestamp: string | null | undefined, now = new Date()): CollectAge | null {
  if (timestamp == null || timestamp.length === 0) {
    return null;
  }
  const date = new Date(timestamp);
  if (isNaN(date.getTime())) {
    return null;
  }
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((startOfDay(now) - startOfDay(date)) / 86400000);
  if (days <= 0) {
    return {key: 'today'};
  }
  if (days === 1) {
    return {key: 'yesterday'};
  }
  if (days < 7) {
    return {key: '{{n}} days ago', params: {n: days}};
  }
  return {date};
}

@Pipe({name: 'dinoCollectAge'})
export class CollectAgePipe implements PipeTransform {
  transform(timestamp: string | null | undefined): CollectAge | null {
    return collectAge(timestamp);
  }
}
