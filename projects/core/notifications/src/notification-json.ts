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

import {Notification} from './notification';

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
    "recipients": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Specifies the Dino User IDS able to see and read this notification"
    },
    "readers": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "Specifies the Dino User IDS of users that have read this notification"
    },
    "text": {
      "type": [
        "string",
        "null"
      ],
      "description": "The notification's text message"
    },
    "type": {
      "anyOf": [
        {
          "$ref": "#/definitions/NotificationType"
        },
        {
          "type": "null"
        }
      ],
      "description": "Specifies the Type of the notification message"
    },
    "icon": {
      "type": "string",
      "description": "The notification optional icon identifier",
      "maxLength": 200
    },
    "redirect_url": {
      "type": "string",
      "description": "The optional URL where the user is redirected upon clicking",
      "maxLength": 200
    }
  },
  "required": [
    "created_at",
    "id",
    "readers",
    "recipients",
    "text",
    "type",
    "updated_at"
  ],
  "additionalProperties": false,
  "description": "This model is used to store Notifications.",
  "title": "Notification",
  "indexes": [
    "created_at",
    "updated_at"
  ],
  "primaryKey": "id",
  "version": 0
} as RxJsonSchema<Notification>;
