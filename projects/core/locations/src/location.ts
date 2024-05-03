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
import {Metric} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';

/**
 * This model is used to store Locations.
 * @title Location
 */
export interface Location extends Metric {
  /**
   * The optional location map coordinates
   */
  coordinates?: string;
}

export const VERSION = 2;

export const migrationStrategies: MigrationStrategies = {
  1: (doc: RxDocument) => doc,
  2: (doc: RxDocument) => {
    return {...doc, metric_data: null};
  },
};
