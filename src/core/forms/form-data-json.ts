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

import {FormData} from './form-data';

// tslint:disable
export const schema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "UUID v4 identifier."
    },
    "created_at": {
      "type": "string",
      "description": "Creation timestamp."
    },
    "updated_at": {
      "type": "string",
      "description": "Update timestamp."
    },
    "_deleted": {
      "type": "boolean",
      "description": "Soft delete flag"
    },
    "user_id": {
      "type": "string",
      "description": "The collector user identifier."
    },
    "schema_id": {
      "type": "string",
      "description": "The schema identifier"
    },
    "data": {
      "type": "object",
      "description": "A plain object containing the data collected."
    },
    "area_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Form Data area id."
    },
    "project_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Form Data project id."
    },
    "location_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Form Data location id."
    },
    "organization_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Form Data organization id."
    }
  },
  "required": [
    "area_id",
    "created_at",
    "data",
    "id",
    "location_id",
    "organization_id",
    "project_id",
    "schema_id",
    "updated_at",
    "user_id"
  ],
  "additionalProperties": false,
  "description": "This model is used to store the data collected through an Ajf form.",
  "title": "FormData",
  "primaryKey": "id",
  "version": 1
} as RxJsonSchema<FormData>;
