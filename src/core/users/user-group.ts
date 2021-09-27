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

import {Model} from '@dewco/core/data';
import {MigrationStrategies} from 'rxdb';

/**
 * Metric basic info for a User Group.
 */
export type MetricBasicInfo = {
  /**
   * The type of the Metric
   */
  metricType: string,

  /**
   * The Metric name
   */
  metricName: string;

  /**
   * The Metric UUID
   */
  metricId: string
};

/**
 * This model is used to store UserGroups.
 * @title UserGroup
 */
export interface UserGroup extends Model {
  /**
   * The Name identifier for the User Group
   */
  groupName: string;

  /**
   * The Role (by ID) granted by the User Group
   */
  userRoleId: string;

  /**
   * The Metrics to which the User Group Role permissions apply
   */
  groupMetrics: MetricBasicInfo[];

  /**
   * The specific Form Schemas (by ID) to which the User Group Role permissions apply.
   */
  groupFormSchemaIds: string[];

  /**
   * The specific Report Schemas (by ID) to which the User Group Role permissions apply.
   */
  groupReportSchemaIds: string[];
}

export const VERSION = 0;

export const migrationStrategies: MigrationStrategies = {};
