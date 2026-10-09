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

import {collectAge} from './collect-age.pipe';

describe('collectAge', () => {
  const now = new Date(2026, 8, 25, 10, 0);

  it('should say today for a time earlier the same day', () => {
    expect(collectAge(new Date(2026, 8, 25, 0, 5).toISOString(), now)).toEqual({key: 'today'});
  });

  it('should count calendar days, not 24 hour periods', () => {
    expect(collectAge(new Date(2026, 8, 24, 23, 0).toISOString(), now)).toEqual({key: 'yesterday'});
    expect(collectAge(new Date(2026, 8, 22, 12, 0).toISOString(), now)).toEqual({
      key: '{{n}} days ago',
      params: {n: 3},
    });
  });

  it('should give the date from a week on', () => {
    const date = new Date(2026, 8, 12, 9, 0);
    expect(collectAge(date.toISOString(), now)).toEqual({date});
  });

  it('should ignore a missing or invalid timestamp', () => {
    expect(collectAge(undefined, now)).toBeNull();
    expect(collectAge('', now)).toBeNull();
    expect(collectAge('not a date', now)).toBeNull();
  });
});
