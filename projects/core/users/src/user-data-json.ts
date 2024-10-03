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

import {UserData} from './user-data';

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
    "email": {
      "type": "string",
      "description": "The User’s email address.",
      "maxLength": 200
    },
    "full_name": {
      "type": "string",
      "description": "The User fullname.",
      "maxLength": 200
    },
    "user_group_ids": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The Permission Groups (by ID) associated with the User."
    },
    "user_auth_ref_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The UUID of the authenticated user on the authentication server.",
      "ref": "user_auth"
    },
    "disabled": {
      "type": "boolean",
      "description": "If true, the user authentication is temporarily Disabled"
    }
  },
  "required": [
    "created_at",
    "email",
    "full_name",
    "id",
    "updated_at",
    "user_auth_ref_id",
    "user_group_ids"
  ],
  "additionalProperties": false,
  "description": "This model is used to store Users.",
  "title": "UserData",
  "indexes": [
    "created_at",
    "updated_at"
  ],
  "primaryKey": "id",
  "version": 1
} as RxJsonSchema<UserData>;
