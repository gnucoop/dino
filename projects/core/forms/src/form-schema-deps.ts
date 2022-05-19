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

/**
 * This model is used to store the Ajf form schema dependencies info.
 * @title FormSchemaDeps
 */
export interface FormSchemaDeps extends Model {
  /**
   * A list with dependencies origin info
   */
  deps_origin?: FormSchemaDepsOrigin[];

  /**
   * The metrics that have data to show in the schema
   */
  metric_data_to_show?: string[];
}

export interface FormSchemaDepsOrigin {
  /**
   * The form schema that have choices and/or fields that this schema needs to show
   */
  form_schema_ref_id: string;

  /**
   * All the fields to be updated in the context form, when the select value change
   * or when the value is only one.
   * Add here also fields to show in label_key.
   */
  fields_to_update: string[];

  /**
   * The name of the choicesOrigins to be added or replaced in the form schema
   */
  choices_origin_name?: string;

  /**
   * The formula for the labels in the select options
   */
  label_key?: AjfFormula;

  /**
   * The value to used in the select options
   */
  value_key?: string;

  /**
   * Order by field for the select option values
   */
  orderBy?: string;

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
  extra_value_key?: string;

  /**
   * If true, populate only fieldsToUpdate. No choice origin needs to be created.
   */
  // updateFieldsOnly?: boolean;
}
