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
 * This model is used to store the data collected through an Ajf report.
 * @title ReportData
 */
export interface ReportData extends Model {
  /**
   * The collector user identifier.
   */
  user_id: string;

  /**
   * The schema identifier.
   */
  schema_id: string;

  /**
   * Additional metadata json that can be provided to build the
   * report based on the desired conditions.
   */
  metadata: {[key: string]: any};

  /**
   * The Report Data area id.
   */
  area_id: string|null;

  /**
   * The Report Data project id.
   */
  project_id: string|null;

  /**
   * The Report Data location id.
   */
  location_id: string|null;

  /**
   * The Report Data organization id.
   */
  organization_id: string|null;
}

export const VERSION = 0;

export const migrationStrategies: MigrationStrategies = {};
