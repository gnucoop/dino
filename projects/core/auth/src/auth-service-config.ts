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

import {DinoUserInfo, User} from './user';

import {ExternalAuthProvider} from './external-auth-type';

/**
 * Auth service configuration
 */
export interface AuthServiceConfig<T = DinoUserInfo> {
  /**
   * Authorization service host (needs leading protocol).
   * eg. http://localhost:9011
   */
  host: string;

  /**
   * Authorization external service application id.
   */
  applicationId: string | null;

  /**
   * API key used to call the external authorization service login endpoint.
   */
  apiKey?: string;

  /**
   * If true, the Authentication process is performed against a nHost backend.
   */
  nHostAuth?: boolean;

  /**
   * If true, users can create their own account from the sign-up form in the
   * login view
   */
  signUp?: boolean;

  /**
   * If true, users can signin with external authentication (Azure/Google) in the
   * login view
   */
  externalAuthAvailable?: ExternalAuthProvider[];

  /**
   * If true, users can reset their password from the change-password form in the login view.
   */
  resetPassword?: boolean;

  /**
   * Optional custom User Password reset endpoint
   */
  resetPasswordEndpoint?: string;

  /**
   * Custom login credential key to be sent in the login request to the api.
   */
  userCredential?: string;

  /**
   * Custom password credential key to be sent in the login request to the api.
   */
  passwordCredential?: string;

  /**
   * User info key returned by the auth endpoint
   */
  userAuthInfo?: string;

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
   * Optional custom User signup endpoint
   */
  signupEndpoint?: string;

  /**
   * Optional custom User Password change endpoint
   */
  changePasswordEndpoint?: string;

  /**
   * Time interval to retry refresh token calls in milliseconds.
   */
  retryRefreshTime: number;

  /**
   * Path to be redirected to in case of failed Authentication Check, Refresh Attempt
   * or successful Logout.
   */
  failedAuthRedirect: string;

  /**
   * The maximum number of the JWT interceptor attempts to refresh the jwt token, before
   * logging the user out.
   */
  retryAttemptsMax: number;

  /**
   * If true, an expired token blocks route activation: navigation waits for a
   * refresh and redirects to `failedAuthRedirect` when it fails. Set this when
   * every read needs the server, so continuing would only show empty screens.
   *
   * If false/omitted (local-first deployments), an expired token triggers a
   * background refresh but never blocks navigation — cached data is still usable.
   */
  enforceTokenExpiry?: boolean;

  /**
   * Function used to store the current JWT token.
   * The token will be stored in local storage if not specified.
   */
  storeAuthToken?: (token: string | null) => void;

  /**
   * Function used to retrieve the current JWT token.
   * The token will be retrieved from the local storage if not specified.
   */
  retrieveAuthToken?: () => string | null;

  /**
   * Name of the locale storage entry where the JWT token will be stored.
   * Defaults to dino_auth_token
   */
  authTokenLocalStorageKey?: string;

  /**
   * Function used to store the current JWT refresh token.
   * The token will be stored in local storage if not specified.
   */
  storeRefreshToken?: (token: string | null) => void;

  /**
   * Function used to retrieve the current JWT refresh token.
   * The token will be retrieved from the local storage if not specified.
   */
  retrieveRefreshToken?: () => string | null;

  /**
   * Name of the locale storage entry where the JWT refresh token will be stored.
   * Defaults to dino_auth_refresh_token
   */
  refreshTokenLocalStorageKey?: string;

  /**
   * Function used to store the logged in user info.
   * The token will be stored in local storage if not specified.
   */
  storeUserInfo?: (userInfo: User<T> | null) => void;

  /**
   * Function used to retrieve the logged in user info.
   * The token will be retrieved from the local storage if not specified.
   */
  retrieveUserInfo?: () => User<T> | null;

  /**
   * Name of the locale storage entry where the logged in user info will be stored.
   * Defaults to dino_auth_user_info
   */
  userInfoLocalStorageKey?: string;
}

export const AUTH_SERVICE_CONFIG = new InjectionToken<AuthServiceConfig>(
  'dino-auth-service-config',
);
