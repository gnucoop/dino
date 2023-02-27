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
import {MigrationStrategies, RxDocument} from 'rxdb';

/**
 * This model is used to store the data collected through an Ajf form.
 * @title FormData
 */
export interface FormData extends Model {
  /**
   * The collector user identifier.
   */
  user_data_ref_id: string;

  /**
   * The schema identifier
   */
  form_schema_ref_id: string;

  /**
   * A plain object containing the data collected.
   */
  data: {$invalid?: boolean; [key: string]: any};

  /**
   * The Form Data area id.
   */
  area_ref_id: string | null;

  /**
   * The Form Data case id.
   */
  case_ref_id: string | null;

  /**
   * The Form Data project id.
   */
  project_ref_id: string | null;

  /**
   * The Form Data location id.
   */
  location_ref_id: string | null;

  /**
   * The Form Data organization id.
   */
  organization_ref_id: string | null;

  /**
   * The UUID of the optional associated Form Status.
   */
  form_status_ref_id: string | null;
}

export const VERSION = 1;

export const migrationStrategies: MigrationStrategies = {
  1: (doc: RxDocument) => doc,
};

export const indexes = ['form_schema_ref_id'];
