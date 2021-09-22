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

import {Injectable} from '@angular/core';
import {DataModelManager, DataService, PermissionContextService} from '@dewco/core/data';

import {Area} from './area';
import {schema} from './area-json';
import {AreasModule} from './areas.module';

/**
 * Service that manages FormData Locations
 */
@Injectable({providedIn: AreasModule})
export class AreaManager extends DataModelManager<Area> {
  constructor(
      dataService: DataService,
      permissionContextService: PermissionContextService,
  ) {
    super(
        {name: 'area', collection: {schema}},
        dataService,
        permissionContextService,
    );
  }
}
