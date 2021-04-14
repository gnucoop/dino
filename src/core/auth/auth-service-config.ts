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

import {User} from './user';

/**
 * Auth service configuration
 */
export interface AuthServiceConfig {
  /**
   * Authorization service host (needs leading protocol).
   * eg. http://localhost:9011
   */
  host: string;

  /**
   * Authorization external service application id.
   */
  applicationId: string;

  /**
   * API key used to call the external authorization service login endpoint.
   */
  apiKey?: string;

  /**
   * Custom login credential key to be sent in the login request to the api.
   */
  userCredential?: string;

  /**
   * Custom password credential key to be sent in the login request to the api.
   */
  passwordCredential?: string;

  /**
   * Optional custom login endpoint url. Defaults to 'api/login',
   */
  loginEndpoint?: string;

  /**
   * Optional custom logout endpoint url. Defaults to 'api/logout',
   */
  logoutEndpoint?: string;

  /**
   * Optional custom jwt token refresh endpoint url. Defaults to 'api/jwt/refresh',
   */
  refreshEndpoint?: string;

  /**
   * Time interval to retry refresh token calls in milliseconds. Defaults to 5000.
   */
  retryRefreshTime?: number;

  /**
   * Function used to store the current JWT token.
   * The token will be stored in local storage if not specified.
   */
  storeAuthToken?: (token: string|null) => void;

  /**
   * Function used to retrieve the current JWT token.
   * The token will be retrieved from the local storage if not specified.
   */
  retrieveAuthToken?: () => string | null;

  /**
   * Name of the locale storage entry where the JWT token will be stored.
   * Defaults to dewco_auth_token
   */
  authTokenLocalStorageKey?: string;

  /**
   * Function used to store the current JWT refresh token.
   * The token will be stored in local storage if not specified.
   */
  storeRefreshToken?: (token: string|null) => void;

  /**
   * Function used to retrieve the current JWT refresh token.
   * The token will be retrieved from the local storage if not specified.
   */
  retrieveRefreshToken?: () => string | null;

  /**
   * Name of the locale storage entry where the JWT refresh token will be stored.
   * Defaults to dewco_auth_refresh_token
   */
  refreshTokenLocalStorageKey?: string;

  /**
   * Function used to store the logged in user info.
   * The token will be stored in local storage if not specified.
   */
  storeUserInfo?: (userInfo: User|null) => void;

  /**
   * Function used to retrieve the logged in user info.
   * The token will be retrieved from the local storage if not specified.
   */
  retrieveUserInfo?: () => User | null;

  /**
   * Name of the locale storage entry where the logged in user info will be stored.
   * Defaults to dewco_auth_user_info
   */
  userInfoLocalStorageKey?: string;
}

export const AUTH_SERVICE_CONFIG =
    new InjectionToken<AuthServiceConfig>('dewco-auth-service-config');
