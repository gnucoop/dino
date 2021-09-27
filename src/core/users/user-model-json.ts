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

import {UserModel} from './user-model';

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
    "email": {
      "type": "string",
      "description": "The User’s email address."
    },
    "full_name": {
      "type": "string",
      "description": "The User fullname."
    },
    "user_group_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The Permission Groups (by ID) associated with the User."
    }
  },
  "required": [
    "created_at",
    "email",
    "full_name",
    "id",
    "updated_at",
    "user_group_ids"
  ],
  "additionalProperties": false,
  "description": "This model is used to store Users.",
  "title": "UserModel",
  "primaryKey": "id",
  "version": 0
} as RxJsonSchema<UserModel>;
