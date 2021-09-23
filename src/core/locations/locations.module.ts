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

import {NgModule} from '@angular/core';
import {ActiveMetric, MetricsService} from '@dewco/core/data';
import {FiltersService} from '@dewco/core/list';

/**
 * Optional module augmenting Forms that provides the LocationManager service
 */
@NgModule({})
export class LocationModule {
  readonly locationsMetric: ActiveMetric = {
    label: 'Locations',
    icon: 'place',
    metricName: 'location',
  };
  constructor(
      private _filtersService: FiltersService,
      private _metricsService: MetricsService,
  ) {
    this._filtersService.addAvailableFilterLabel('location');
    this._metricsService.activateMetric(this.locationsMetric);
  }
}
