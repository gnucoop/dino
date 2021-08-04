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

import {AjfFormCreate} from '@ajf/core/forms';
import {Model} from '@dewco/core/data';
import {KeyFunctionMap, RxDocument} from 'rxdb';

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
   * JSON definition of the Ajf form schema.
   * It must be valid against the [non-scrict
   * version](https://ajf.rocks/schemas/ajf-form-schema.json).
   * @asType object
   */
  schema: AjfFormCreate;
}

export const VERSION = 1;

export const migrationStrategies: KeyFunctionMap = {
  1: (doc: RxDocument) => doc,
};
