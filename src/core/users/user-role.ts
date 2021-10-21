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

import {Model} from '@dewco/core/data';
import {MigrationStrategies} from 'rxdb';

/**
 * Represents an action to be performed on a model Doc.
 */
export type ModelAction = 'create' | 'edit' | 'delete' | 'view' | 'export';

/**
 * Represents the available Model Actions for a given Model.
 */
export type ModelPermissions = {
  modelName: string;
  modelActions: ModelAction[];
};

/**
 * This model is used to store UserRoles.
 * @title UserRole
 */
export interface UserRole extends Model {
  /**
   * The Name identifier for the User Role
   */
  roleName: string;

  /**
   * The actions allowed for the User Role
   */
  rolePermissions: ModelPermissions[];
}

export const VERSION = 0;

export const migrationStrategies: MigrationStrategies = {};
