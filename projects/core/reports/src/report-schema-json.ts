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

import {ReportSchema} from './report-schema';

// tslint:disable
export const schema = {
  'type': 'object',
  'properties': {
    'id': {
      'type': 'string',
      'description': 'UUID v4 identifier.',
      'maxLength': 200,
    },
    'created_at': {
      'type': 'string',
      'description': 'Creation timestamp.',
      'maxLength': 200,
    },
    'updated_at': {
      'type': 'string',
      'description': 'Update timestamp.',
      'maxLength': 200,
    },
    'is_deleted': {
      'type': 'boolean',
      'description': 'Soft delete flag',
    },
    '_deleted': {
      'type': 'boolean',
      'description': 'Pouchdb delete flag',
    },
    'name': {
      'type': 'string',
      'description': 'The report schema name.',
      'maxLength': 200,
    },
    'required_metrics': {
      'type': 'array',
      'items': {
        'type': 'string',
      },
      'description':
        'The names of the Metric types required for this schema.',
    },
    'form_schema_ids': {
      'type': 'array',
      'items': {
        'type': 'string',
      },
      'description':
        'List of Form Schemas (by id) from where to fetch the necessary data to build and display the report.',
    },
    'label': {
      'type': 'string',
      'description': 'The report schema displayed label.',
      'maxLength': 200,
    },
    'icon': {
      'type': 'string',
      'description': 'The report schema icon identifier.',
      'maxLength': 200,
    },
    'schema': {
      'type': 'object',
      'properties': {
        'header': {
          '$ref': '#/definitions/AjfReportContainer',
        },
        'content': {
          '$ref': '#/definitions/AjfReportContainer',
        },
        'footer': {
          '$ref': '#/definitions/AjfReportContainer',
        },
        'styles': {
          '$ref': '#/definitions/AjfStyles',
        },
        'forms': {
          'type': 'array',
          'items': {
            '$ref': '#/definitions/AjfForm',
          },
        },
        'variables': {
          'type': 'array',
          'items': {
            '$ref': '#/definitions/AjfReportVariable',
          },
        },
        'stringIdentifier': {
          'type': 'array',
          'items': {
            '$ref': '#/definitions/AjfReportStringIdentifier',
          },
        },
      },
      'additionalProperties': false,
      'description':
        'JSON definition of the Ajf report schema. It must be valid against the [non-scrict version](https://ajf.rocks/schemas/ajf-report-schema.json).',
    },
  },
  'required': ['created_at', 'form_schema_ids', 'id', 'name', 'schema', 'updated_at'],
  'additionalProperties': false,
  'description': 'This model is used to store the Ajf report schemas.',
  'title': 'ReportSchema',
  'indexes': ['created_at', 'updated_at'],
  'primaryKey': 'id',
  'version': 1,
} as RxJsonSchema<ReportSchema>;
