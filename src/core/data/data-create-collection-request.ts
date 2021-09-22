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

import {RxCollectionCreator} from 'rxdb';

import {PullQueryExtraParams} from './pull-query-extra-params';
import {PushQueryExtraParams} from './push-query-extra-params';

/**
 * Data create collection request parameters.
 */
export interface DataCreateCollectionRequest {
  /**
   * The collection name
   */
  name: string;

  /**
   * The collection to create.
   */
  collection: RxCollectionCreator;

  /**
   * Extra parameters to add to the sync pull query.
   */
  pullQueryExtraParams?: PullQueryExtraParams;

  /**
   * Extra parameters to add to the sync push query.
   */
  pushQueryExtraParams?: PushQueryExtraParams;
}
