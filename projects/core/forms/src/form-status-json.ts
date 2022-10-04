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

import {FormStatus} from './form-status';

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
    "_deleted": {
      "type": "boolean",
      "description": "Pouchdb delete flag"
    },
    "name": {
      "type": "string",
      "description": "The logical name of the Status"
    },
    "label": {
      "type": "string",
      "description": "The displayed label of the Status"
    },
    "status_level": {
      "type": "number",
      "description": "An arbitrary number identifying the Priority level or the position of the status in a sequential pipeline. The default status of a form is the one with the lowest status level among the available statuses."
    },
    "color": {
      "type": "string",
      "description": "The optional color associated with the Status label"
    }
  },
  "required": [
    "created_at",
    "id",
    "label",
    "name",
    "status_level",
    "updated_at"
  ],
  "additionalProperties": false,
  "description": "This model is used to store Form Statuses, associated with Form Schemas and Datas.",
  "title": "FormStatus",
  "indexes": [
    "created_at",
    "updated_at",
    "name"
  ],
  "primaryKey": "id",
  "version": 0
} as RxJsonSchema<FormStatus>;
