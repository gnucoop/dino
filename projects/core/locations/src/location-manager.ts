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

import {Injectable} from '@angular/core';
import {
  CheckMetricPermission,
  DataModelManager,
  DataService,
  PermissionContextService,
} from '@dino/core/data';

import {Location, migrationStrategies} from './location';
import {schema} from './location-json';
import {LocationModule} from './locations.module';

/**
 * Service that manages FormData Locations
 */
@Injectable({providedIn: LocationModule})
export class LocationManager extends DataModelManager<Location> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService) {
    super(
      {name: 'location', collection: {schema, migrationStrategies}},
      dataService,
      permissionContextService,
      [new CheckMetricPermission<Location>()],
      [{checkName: 'user_metrics', checkKey: 'location'}],
    );
  }
}
