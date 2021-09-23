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

import {RxJsonSchema} from 'rxdb';

import {Location} from './location';

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
    "is_deleted": {
      "type": "boolean",
      "description": "Soft delete flag"
    },
    "name": {
      "type": "string",
      "description": "The metric name."
    },
    "parent_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The optional ID and Name of this metric Parent. (ex. Africa - Tanzania, Project - Sub-project etc.)"
    },
    "parent_name": {
      "type": [
        "string",
        "null"
      ]
    },
    "coordinates": {
      "$ref": "#/definitions/Coordinates",
      "description": "The optional location map coordinates"
    }
  },
  "additionalProperties": false,
  "required": [
    "created_at",
    "id",
    "name",
    "parent_id",
    "parent_name",
    "updated_at"
  ],
  "description": "This model is used to store Locations.",
  "title": "Location",
  "primaryKey": "id",
  "version": 1
} as RxJsonSchema<Location>;
