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

import {UserGroup} from './user-group';

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
    "groupName": {
      "type": "string",
      "description": "The Name identifier for the User Group"
    },
    "userRoleId": {
      "type": "string",
      "description": "The Role (by ID) granted by the User Group"
    },
    "groupMetrics": {
      "type": "array",
      "items": {
        "$ref": "#/definitions/MetricBasicInfo"
      },
      "description": "The Metrics to which the User Group Role permissions apply"
    },
    "groupFormSchemaIds": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The specific Form Schemas (by ID) to which the User Group Role permissions apply."
    },
    "groupReportSchemaIds": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The specific Report Schemas (by ID) to which the User Group Role permissions apply."
    }
  },
  "required": [
    "created_at",
    "groupFormSchemaIds",
    "groupMetrics",
    "groupName",
    "groupReportSchemaIds",
    "id",
    "updated_at",
    "userRoleId"
  ],
  "additionalProperties": false,
  "description": "This model is used to store UserGroups.",
  "title": "UserGroup",
  "primaryKey": "id",
  "version": 0
} as RxJsonSchema<UserGroup>;
