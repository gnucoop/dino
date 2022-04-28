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
import {DataModelManager, DataService, PermissionContextService} from '@dino/core/data';

import {migrationStrategies, UserRole} from './user-role';
import {schema} from './user-role-json';
import {UsersModule} from './users.module';

/**
 * Service that manages User Roles
 */
@Injectable({providedIn: UsersModule})
export class UserRoleManager extends DataModelManager<UserRole> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService) {
    super(
      {name: 'user_role', collection: {schema, migrationStrategies}},
      dataService,
      permissionContextService,
    );
  }
}
