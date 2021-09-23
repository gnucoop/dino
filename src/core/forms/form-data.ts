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
import {MigrationStrategies, RxDocument} from 'rxdb';

/**
 * This model is used to store the data collected through an Ajf form.
 * @title FormData
 */
export interface FormData extends Model {
  /**
   * The collector user identifier.
   */
  user_id: string;

  /**
   * The schema identifier
   */
  schema_id: string;

  /**
   * A plain object containing the data collected.
   */
  data: {[key: string]: any};

  /**
   * The Form Data area id.
   */
  area_id?: string;

  /**
   * The Form Data project id.
   */
  project_id?: string;

  /**
   * The Form Data location id.
   */
  location_id?: string;

  /**
   * The Form Data organization id.
   */
  organization_id?: string;
}

export const VERSION = 1;

export const migrationStrategies: MigrationStrategies = {
  1: (doc: RxDocument) => doc,
};
