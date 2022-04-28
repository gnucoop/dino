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
    "is_deleted": {
      "type": "boolean",
      "description": "Soft delete flag"
    },
    "_deleted": {
      "type": "boolean",
      "description": "Pouchdb delete flag"
    },
    "user_data_ref_id": {
      "type": "string",
      "description": "The collector user identifier.",
      "ref": "user_data"
    },
    "form_schema_ref_id": {
      "type": "string",
      "description": "The schema identifier",
      "ref": "form_schema"
    },
    "data": {
      "type": "object",
      "description": "A plain object containing the data collected."
    },
    "area_ref_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Form Data area id.",
      "ref": "area"
    },
    "case_ref_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Form Data case id.",
      "ref": "case"
    },
    "project_ref_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Form Data project id.",
      "ref": "project"
    },
    "location_ref_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Form Data location id.",
      "ref": "location"
    },
    "organization_ref_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Form Data organization id.",
      "ref": "organization"
    }
  },
  "required": [
    "area_ref_id",
    "case_ref_id",
    "created_at",
    "data",
    "form_schema_ref_id",
    "id",
    "location_ref_id",
    "organization_ref_id",
    "project_ref_id",
    "updated_at",
    "user_data_ref_id"
  ],
  "additionalProperties": false,
  "description": "This model is used to store the data collected through an Ajf form.",
  "title": "FormData",
  "indexes": [
    "created_at",
    "updated_at"
  ],
  "primaryKey": "id",
  "version": 1
} as RxJsonSchema<FormData>;
