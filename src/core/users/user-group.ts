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

import {Model} from '@dino/core/data';
import {MigrationStrategies} from 'rxdb';

/**
 * This model is used to store UserGroups.
 * @title UserGroup
 */
export interface UserGroup extends Model {
  /**
   * The Name identifier for the User Group
   */
  groupName: string;

  /**
   * The Role (by ID) granted by the User Group
   */
  user_role_ref_id: string;

  /**
   * The Areas to which the User Group Role permissions apply
   */
  area_ref_id: string[];

  /**
   * The Locations to which the User Group Role permissions apply
   */
  location_ref_id: string[];

  /**
   * The Organizations to which the User Group Role permissions apply
   */
  organization_ref_id: string[];

  /**
   * The Projects to which the User Group Role permissions apply
   */
  project_ref_id: string[];

  /**
   * The specific Form Schemas (by ID) to which the User Group Role permissions apply.
   */
  groupFormSchemaIds: string[];

  /**
   * The specific Report Schemas (by ID) to which the User Group Role permissions apply.
   */
  groupReportSchemaIds: string[];
}

export const VERSION = 0;

export const migrationStrategies: MigrationStrategies = {};
