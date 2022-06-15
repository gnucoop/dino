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

import {Model} from './model';

/**
 * Extra parameters used to build the GraphQL push sync query.
 */
export interface PushQueryExtraParams {
  /**
   * Where condition to be added to the push query.
   */
  where?: any;

  /**
   * Function used to modify the object before pushing it to the remote database.
   */
  docModifier?: <T extends Model = Model>(doc: T) => T;
}
