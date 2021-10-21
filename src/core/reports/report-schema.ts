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

import {AjfReport} from '@ajf/core/reports';
import {Model} from '@dino/core/data';
import {MigrationStrategies} from 'rxdb';

/**
 * This model is used to store the Ajf report schemas.
 * @title ReportSchema
 */
export interface ReportSchema extends Model {
  /**
   * The report schema name.
   */
  name: string;

  /**
   * List of Form Schemas (by id) from where to fetch the necessary
   * data to build and display the report.
   */
  form_schema_ids: string[];

  /**
   * The report schema displayed label.
   */
  label?: string;

  /**
   * The report schema icon identifier.
   */
  icon?: string;

  /**
   * JSON definition of the Ajf report schema.
   * It must be valid against the [non-scrict
   * version](https://ajf.rocks/schemas/ajf-report-schema.json).
   * @asType object
   */
  schema: Partial<AjfReport>;
}

export const VERSION = 0;

export const migrationStrategies: MigrationStrategies = {};
