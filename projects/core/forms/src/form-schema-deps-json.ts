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

import {FormSchemaDeps} from './form-schema-deps';

// tslint:disable
export const schema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "UUID v4 identifier.",
      "maxLength": 200
    },
    "created_at": {
      "type": "string",
      "description": "Creation timestamp.",
      "maxLength": 200
    },
    "updated_at": {
      "type": "string",
      "description": "Update timestamp.",
      "maxLength": 200
    },
    "is_deleted": {
      "type": "boolean",
      "description": "Soft delete flag"
    },
    "_deleted": {
      "type": "boolean",
      "description": "Pouchdb delete flag"
    },
    "deps_origin": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/FormSchemaDepsOrigin"
      },
      "description": "A list with external form dependencies info"
    },
    "metric_data_to_show": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The metrics that have data to show in the schema"
    }
  },
  "additionalProperties": false,
  "required": [
    "created_at",
    "id",
    "updated_at"
  ],
  "description": "This model is used to store the Ajf form schema dependencies info.",
  "title": "FormSchemaDeps",
  "indexes": [
    "created_at",
    "updated_at"
  ],
  "primaryKey": "id",
  "version": 0
} as RxJsonSchema<FormSchemaDeps>;
