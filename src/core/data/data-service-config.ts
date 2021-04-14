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

import {InjectionToken} from '@angular/core';
import {RxDatabaseCreator, SyncOptionsGraphQL} from 'rxdb';

/**
 * Data service GraphQL sync options.
 */
export interface DataServiceSyncOptions extends
    Omit<SyncOptionsGraphQL, 'headers'|'pull'|'push'|'deletedFlag'> {
  /**
   * The number of documents synced in each request.
   */
  batchSize?: number;

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
export interface DataServiceConfig {
  /**
   * Options used to create the RxDB database.
   */
  databaseCreateOptions: RxDatabaseCreator;

  /**
   * Options used to set up the GraphQL sync.
   */
  syncOptions: DataServiceSyncOptions;
}

/**
 * DataServiceConfig injection token
 */
export const DATA_SERVICE_CONFIG =
    new InjectionToken<DataServiceConfig>('dewco-data-service-config');
