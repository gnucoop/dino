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

/**
 * Type of the Function that parses and transforms the data received from
 * the config API into a config response.
 */
export type ConfigTransformFunction = (configs: any) => ConfigResponse;

/**
 * Response of the login api.
 */
export type ConfigSet = {
  /**
   * The configuration set name identifier
   */
  name: string;
  authConfig: {[key: string]: any};
  dataConfig: {[key: string]: any};
  additionalConfig?: {[key: string]: any};
};

/**
 * The type of the config API response.
 */
export type ConfigResponse = {
  configSets: ConfigSet[];
};
