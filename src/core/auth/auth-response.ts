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
 * FusionAuth api response
 */
export interface AuthResponse {
  /**
   * The access token, this string is an encoded JSON Web Token (JWT).
   */
  token: string;

  /**
   * The refresh token that can be used to obtain a new access token once the provide
   * one has expired.
   */
  refreshToken: string;
}

/**
 * Nhost Refresh api response
 */
export interface NHostRefreshResponse {
  /**
   * The access token, this string is an encoded JSON Web Token (JWT).
   */
  accessToken: string;

  /**
   * The access token expiry time
   */
  accessTokenExpiresIn: number;

  /**
   * The refresh token that can be used to obtain a new access token once the provide
   * one has expired.
   */
  refreshToken: string;

  /**
   * The NHost user info object
   */
  user: {[key: string]: any};
}

/**
 * Request to the nHost signup api.
 */
export type NHostSignupRequest = {
  /**
   * User email
   */
  email: string;
  /**
   * User password
   */
  password: string;
  /**
   * User displayed name options
   */
  options: {displayName: string};
};

/**
 * Response of the nHost signup api.
 */
export type NHostSignupResponse = {
  /**
   * The NHost session, including the created user info.
   */
  session: {user: {id: string; displayName: string; email: string}};
};
