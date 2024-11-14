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
 * This model is used to store the data collected through an Ajf report.
 * @title ReportData
 */
export interface ReportData extends Model {
  /**
   * The collector user identifier.
   */
  user_data_ref_id: string;

  /**
   * The report data name.
   */
  name: string;

  /**
   * The schema identifier.
   */
  report_schema_ref_id: string;

  /**
   * Additional metadata json that can be provided to build the
   * report based on the desired conditions.
   */
  metadata: {[key: string]: any};

  /**
   * The starting date of the collected form data used by
   * the Report.
   */
  date_start: string | null;

  /**
   * The ending date of the collected form data used by
   * the Report.
   */
  date_end: string | null;

  /**
   * The Report Data area id.
   */
  area_ref_id: string | null;

  /**
   * The Report Data case id.
   */
  case_ref_id: string | null;

  /**
   * The Report Data project id.
   */
  project_ref_id: string | null;

  /**
   * The Report Data location id.
   */
  location_ref_id: string | null;

  /**
   * The Report Data organization id.
   */
  organization_ref_id: string | null;

  /**
   * The Form Status of the collected form data used by
   * the Report.
   */
  form_status_ref_id: string | null;

  /**
   * A plain object containing additional data for the report.
   * Text generated with AI is stored here.
   */
  data: {[key: string]: any};
}

export const VERSION = 1;

export const migrationStrategies: MigrationStrategies = {
  1: (doc: RxDocument) => {
    return {...doc, form_status_ref_id: null};
  },
};

export const indexes = ['report_schema_ref_id'];
