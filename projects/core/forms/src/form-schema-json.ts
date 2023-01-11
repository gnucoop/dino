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

import {RxJsonSchema} from 'rxdb';

import {FormSchema} from './form-schema';

// tslint:disable
export const schema = {
  'type': 'object',
  'properties': {
    'id': {
      'type': 'string',
      'description': 'UUID v4 identifier.',
      'maxLength': 200,
    },
    'created_at': {
      'type': 'string',
      'description': 'Creation timestamp.',
      'maxLength': 200,
    },
    'updated_at': {
      'type': 'string',
      'description': 'Update timestamp.',
      'maxLength': 200,
    },
    'is_deleted': {
      'type': 'boolean',
      'description': 'Soft delete flag',
    },
    '_deleted': {
      'type': 'boolean',
      'description': 'Pouchdb delete flag',
    },
    'name': {
      'type': 'string',
      'description': 'The form schema name.',
      'maxLength': 200,
    },
    'label': {
      'type': 'string',
      'description': 'The form schema displayed label.',
      'maxLength': 200,
    },
    'icon': {
      'type': 'string',
      'description': 'The form schema icon identifier.',
      'maxLength': 200,
    },
    'form_status_ref_id': {
      'type': 'array',
      'items': {
        'type': 'string',
      },
      'description': 'The UUIDs of the optional associated Form Statuses.',
      'ref': 'form_status',
    },
    'visibility': {
      'description': 'The form schema visibility',
      'type': 'number',
    },
    'schema': {
      'description':
        'JSON definition of the Ajf form schema. It must be valid against the [non-scrict version](https://ajf.rocks/schemas/ajf-form-schema.json).',
      'type': 'object',
    },
    'form_schema_deps_ref_id': {
      'type': ['string', 'null'],
      'description': 'The related form schema deps id',
      'ref': 'form_schema_deps',
    },
  },
  'required': ['created_at', 'id', 'name', 'schema', 'updated_at', 'visibility'],
  'additionalProperties': false,
  'description': 'This model is used to store the Ajf form schemas.',
  'title': 'FormSchema',
  'indexes': ['created_at', 'updated_at'],
  'primaryKey': 'id',
  'version': 3,
} as RxJsonSchema<FormSchema>;
