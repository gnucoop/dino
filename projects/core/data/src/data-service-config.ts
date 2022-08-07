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

import {InjectionToken} from '@angular/core';
import {RxDatabaseCreator, SyncOptionsGraphQL} from 'rxdb';

import {Model} from './model';

/**
 * Data service GraphQL sync options.
 */
export interface DataServiceSyncOptions<T extends Model = Model>
  extends Omit<SyncOptionsGraphQL<T>, 'headers' | 'pull' | 'push' | 'deletedFlag'> {
  /**
   * The number of documents synced in each pull request.
   */
  batchSizePull?: number;

  /**
   * The number of documents synced in each push request.
   */
  batchSizePush?: number;

  /**
   * GraphQL WebSocket endpoint used for live sync.
   */
  wsUrl?: string;

  /**
   * WebSocket implementation class. Used mainly for testing.
   */
  webSocketImpl?: any;

  /**
   * Error message returned by the webSocket endpoint for signaling
   * the JWT token expiration
   */
  authErrorMessage?: string;
}

/**
 * Data service configuration.
 */
export interface DataServiceConfig<T extends Model = Model> {
  /**
   * Options used to create the RxDB database.
   */
  databaseCreateOptions: RxDatabaseCreator;

  /**
   * Options used to set up the GraphQL sync.
   */
  syncOptions: DataServiceSyncOptions<T>;
}

/**
 * DataServiceConfig injection token
 */
export const DATA_SERVICE_CONFIG = new InjectionToken<DataServiceConfig>(
  'dino-data-service-config',
);
