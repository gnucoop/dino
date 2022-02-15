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
    "is_deleted": {
      "type": "boolean",
      "description": "Soft delete flag"
    },
    "_deleted": {
      "type": "boolean",
      "description": "Pouchdb delete flag"
    },
    "groupName": {
      "type": "string",
      "description": "The Name identifier for the User Group"
    },
    "user_role_ref_id": {
      "type": "string",
      "description": "The Role (by ID) granted by the User Group",
      "ref": "user_role"
    },
    "area_ref_id": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The Areas to which the User Group Role permissions apply",
      "ref": "area"
    },
    "case_ref_id": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The Cases to which the User Group Role permissions apply",
      "ref": "case"
    },
    "location_ref_id": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The Locations to which the User Group Role permissions apply",
      "ref": "location"
    },
    "organization_ref_id": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The Organizations to which the User Group Role permissions apply",
      "ref": "organization"
    },
    "project_ref_id": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "description": "The Projects to which the User Group Role permissions apply",
      "ref": "project"
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
    "area_ref_id",
    "case_ref_id",
    "created_at",
    "groupFormSchemaIds",
    "groupName",
    "groupReportSchemaIds",
    "id",
    "location_ref_id",
    "organization_ref_id",
    "project_ref_id",
    "updated_at",
    "user_role_ref_id"
  ],
  "additionalProperties": false,
  "description": "This model is used to store UserGroups.",
  "title": "UserGroup",
  "indexes": [
    "created_at",
    "updated_at"
  ],
  "primaryKey": "id",
  "version": 0
} as RxJsonSchema<UserGroup>;
