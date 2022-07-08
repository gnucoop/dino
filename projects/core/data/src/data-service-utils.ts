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

import {DataServiceConfig} from './data-service-config';

/**
 * Default data service sync options.
 */
export const DEFAULT_SYNC_OPTIONS = {
  live: true,
  liveInterval: 60 * 1000 * 10,
  batchSize: Math.pow(10, 5),
};

/**
 * Fills the data service configuration with default values if missing.
 * @param config Data service configuration.
 */
export function fillConfigDefaultValues(config: DataServiceConfig): DataServiceConfig {
  config.syncOptions = {...DEFAULT_SYNC_OPTIONS, ...config.syncOptions};
  return config;
}
