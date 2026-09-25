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

import {shareUrlWithMetrics} from './collect-share-dialog';

describe('shareUrlWithMetrics', () => {
  const base = 'https://dino.example/f/fs1';

  it('should leave the link alone when no metric is picked', () => {
    expect(shareUrlWithMetrics(base, null)).toBe(base);
    expect(shareUrlWithMetrics(base, {location: null, project: ''})).toBe(base);
  });

  it('should append every picked metric', () => {
    const url = shareUrlWithMetrics(base, {
      location: {option: {id: 'loc1'}},
      project: {option: {id: 'prj1'}},
    });
    expect(url).toBe(`${base}?location=loc1&project=prj1`);
  });

  it('should skip a metric that is still being typed or has no option', () => {
    const url = shareUrlWithMetrics(base, {
      location: 'Rom',
      project: {option: null},
      area: {option: {id: 'ar1'}},
    });
    expect(url).toBe(`${base}?area=ar1`);
  });
});
