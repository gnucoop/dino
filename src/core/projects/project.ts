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
import {Metric} from '@dewco/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';

/**
 * This model is used to store Projects.
 * @title Project
 */
export interface Project extends Metric {
  /**
   * The project Code identifier
   */
  code: string;

  /**
   * The project sectors of intervention
   */
  sectors_of_intervention: string|null;

  /**
   * The project Donors
   */
  donors: string|null;

  /**
   * Project start date timestamp.
   */
  start_date: string|null;

  /**
   * Project end date timestamp.
   */
  end_date: string|null;
}

export const VERSION = 1;

export const migrationStrategies: MigrationStrategies = {
  1: (doc: RxDocument) => doc,
};
