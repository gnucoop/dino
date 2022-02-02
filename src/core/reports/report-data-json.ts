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

import {ReportData} from './report-data';

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
    "schema_id": {
      "type": "string",
      "description": "The schema identifier."
    },
    "metadata": {
      "type": "object",
      "description": "Additional metadata json that can be provided to build the report based on the desired conditions."
    },
    "date_start": {
      "type": [
        "string",
        "null"
      ],
      "description": "The starting date of the collected form data used by the Report."
    },
    "date_end": {
      "type": [
        "string",
        "null"
      ],
      "description": "The ending date of the collected form data used by the Report."
    },
    "area_ref_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Report Data area id.",
      "ref": "area"
    },
    "case_ref_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Report Data case id.",
      "ref": "case"
    },
    "project_ref_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Report Data project id.",
      "ref": "project"
    },
    "location_ref_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Report Data location id.",
      "ref": "location"
    },
    "organization_ref_id": {
      "type": [
        "string",
        "null"
      ],
      "description": "The Report Data organization id.",
      "ref": "organization"
    }
  },
  "required": [
    "area_ref_id",
    "case_ref_id",
    "created_at",
    "date_end",
    "date_start",
    "id",
    "location_ref_id",
    "metadata",
    "organization_ref_id",
    "project_ref_id",
    "schema_id",
    "updated_at",
    "user_data_ref_id"
  ],
  "additionalProperties": false,
  "description": "This model is used to store the data collected through an Ajf report.",
  "title": "ReportData",
  "primaryKey": "id",
  "version": 0
} as RxJsonSchema<ReportData>;
