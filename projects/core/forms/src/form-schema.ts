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

import {AjfFormCreate} from '@ajf/core/forms';
import {Model} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';

import {FormSchemaVisibility} from './form-schema-visibility';

/**
 * This model is used to store the Ajf form schemas.
 * @title FormSchema
 */
export interface FormSchema extends Model {
  /**
   * The form schema name.
   */
  name: string;

  /**
   * The form schema displayed label.
   */
  label?: string;

  /**
   * The form schema icon identifier.
   */
  icon?: string;

  /**
   * The UUIDs of the optional associated Form Statuses.
   */
  form_status_ref_id?: string[];

  /**
   * The form schema visibility
   * @asType number
   */
  visibility: FormSchemaVisibility;

  /**
   * JSON definition of the Ajf form schema.
   * It must be valid against the [non-scrict
   * version](https://ajf.rocks/schemas/ajf-form-schema.json).
   * @asType object
   */
  schema: AjfFormCreate;

  /**
   * The related form schema deps id.
   */
  form_schema_deps_ref_id?: string | null;
}

export const VERSION = 3;

export const migrationStrategies: MigrationStrategies = {
  1: (doc: RxDocument) => doc,
  2: (doc: RxDocument<FormSchema>) => ({...doc, visibility: FormSchemaVisibility.Private}),
  3: (doc: RxDocument<FormSchema>) => ({...doc, form_status_ref_id: undefined}),
};
