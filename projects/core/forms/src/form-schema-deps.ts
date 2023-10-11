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

import {AjfFormula} from '@ajf/core/models';
import {Model} from '@dino/core/data';
import {MigrationStrategies} from 'rxdb';

/**
 * This model is used to store the Ajf form schema dependencies info.
 * @title FormSchemaDeps
 */
export interface FormSchemaDeps extends Model {
  /**
   * A list with external form dependencies info
   */
  deps_origin?: FormSchemaDepsOrigin[];

  /**
   * The metrics that have data to show in the schema
   */
  metric_data_to_show?: string[];
}

/**
 * This model is used to avoid renaming the interface,
 * otherwise it requires forcing a logout
 * @title FormSchemaDepsOrigin
 */
export interface FormSchemaDepsOrigin extends DepsOrigin {}

/**
 * This model is used to store the external form dependencies info
 * @title DepsOrigin
 */
export interface DepsOrigin {
  /**
   * The form schema that have fields that this schema needs to show
   */
  form_schema_ref_id?: string;

  /**
   * All the fields to be updated in the context form
   */
  fields_to_update?: string[];

  /**
   * The metrics to use to filter the form data
   */
  filter_by_metric?: string[];

  /**
   * True if this relationship should create a choices origin
   */
  is_choice?: boolean;

  /**
   * The name of the choicesOrigins to be added or replaced in the form schema
   */
  choices_origin?: FormSchemaChoiceOrigin | null;

  /**
   * The metrics to be included in the form schema as choice origin
   */
  metrics_choices_origin?: string[] | null;

  /**
   * Order by field for the query
   */
  order_by?: string;
}

/**
 * This model is used to store the info for the choicesOrigins
 * to be added or replaced in the form schema
 * Es.
 *   labelKey: {formula: '[[last_name]] [[first_name]]'},
 *   valueKey: 'id_family',
 * @title FormSchemaChoiceOrigin
 */
export interface FormSchemaChoiceOrigin {
  /**
   * Fields to be used for the label in the select options
   */
  label_fields?: string[];

  /**
   * The value to used in the select options
   */
  value_key?: string;

  /**
   * The name of the choicesOrigins to be added or replaced in the form schema
   * By default is equal to fieldname + '_choice'
   */
  choices_origin_name?: string;

  /**
   * The formula for the labels in the select options
   */
  label_key?: AjfFormula;

  /**
   * An optional extra value to be added in the Choice object.
   * Eg. "country":
   * "choices": [
   *  {
   *   "label": "Partner 1",
   *   "value": "partner1",
   *   "country": "ITA"
   *  }
   * ],
   */
  extra_value_key?: string | null;
}

export const VERSION = 0;

export const migrationStrategies: MigrationStrategies = {};
