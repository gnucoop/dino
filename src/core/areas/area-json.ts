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

// tslint:disable
export const schema = {
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "UUID v4 identifier.",
      "primary": true
    },
    "created_at": {
      "type": "string",
      "description": "Creation timestamp."
    },
    "updated_at": {
      "type": "string",
      "description": "Update timestamp."
    },
    "name": {
      "type": "string",
      "description": "The Area name identifier"
    },
    "parent_id": {
      "type": ["string", "null"],
      "description": "Optional parent area ID"
    },
    "parent_name": {
      "type": ["string", "null"],
      "description": "Optional parent area Name"
    },
    "is_deleted": {
      "type": "boolean",
      "description": "The soft deletion flag."
    }
  },
  "required": [
    "created_at",
    "id",
    "name",
    "updated_at"
  ],
  "additionalProperties": false,
  "description": "This model is used to store Areas.",
  "title": "Area",
  "version": 0
} as RxJsonSchema;
