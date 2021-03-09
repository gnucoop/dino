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

import {HttpClient, HttpParams} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthResponse} from './auth-response';

import {AUTH_SERVICE_CONFIG, AuthServiceConfig} from './auth-service-config';
import {Credentials} from './credentials';
import {JwtToken} from './jwt-token';
import {LoginResponse} from './login-response';
import {User} from './user';

const defaultAuthTokenKey = 'dewco_auth_token';
const defaultRefreshTokenKey = 'dewco_refresh_token';
const defaultUserInfoKey = 'dewco_user_info';

function removeSlashes(uri: string): string {
  return uri.replace(/^\/+|\/+$/g, '');
}

/**
 * Injectable service used to authenticate against a FusionAuth backend.
 * Stores the authentication token and the logged in user info.
 */
@Injectable({providedIn: 'root'})
export class AuthService {
  private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  /**
   * True if a valid JWT access token is available.
   */
  readonly authenticated: Observable<boolean> = this._authenticated as Observable<boolean>;

  /**
   * The current JWT auth token
   */
  readonly authToken: BehaviorSubject<string|null>;

  private _baseUrl: string;

  constructor(
      private _httpClient: HttpClient,
      @Inject(AUTH_SERVICE_CONFIG) private _config: AuthServiceConfig) {
    this._baseUrl = removeSlashes(_config.host);
    this.authToken = new BehaviorSubject<string|null>(this.getAuthToken());
    this._initAuthentication();
  }

  /**
   * Make a login request to the FusionAuth server and stores the
   * authentication token and the logged in user info.
   * @returns True if the user has been authenticated otherwise false
   */
  login(credentials: Credentials): Observable<boolean> {
    const req = {
      loginId: credentials.email,
      password: credentials.password,
      applicationId: this._config.applicationId,
    };
    const url = this._generateUrl(this._config.loginEndpoint ?? 'api/login');
    const headers = this._config.apiKey != null ? {Authorization: this._config.apiKey} : undefined;
    return this._httpClient.post<LoginResponse>(url, req, {headers})
               .pipe(
                   map(res => {
                     this._authenticated.next(true);
                     this._storeAuthToken(res.token);
                     this._storeRefreshToken(res.refreshToken);
                     this._storeUserInfo(res.user);
                     return true;
                   }),
                   catchError(() => {
                     this._authenticated.next(false);
                     return obsOf(false);
                   }),
                   ) as Observable<boolean>;
  }

  /**
   * Make a logout request to the FusionAuth server and removes the
   * authentication token and the logged in user info stored.
   * @param allDevices Whether to invalidate all the refresh token issued for this user.
   * @returns True if the user has been logged out otherwise false
   */
  logout(allDevices = false): Observable<boolean> {
    const refreshToken = this.getRefreshToken()!;
    const global = this._stringifyBooleanParam(allDevices);
    const params = new HttpParams({fromObject: {global, refreshToken}});
    const url =
        `${this._generateUrl(this._config.logoutEndpoint ?? 'api/logout')}?${params.toString()}`;
    return this._httpClient.post(url, {}).pipe(
               map(() => {
                 this._authenticated.next(false);
                 this._storeAuthToken(null);
                 this._storeRefreshToken(null);
                 this._storeUserInfo(null);
                 return true;
               }),
               catchError(() => obsOf(false)),
               ) as Observable<boolean>;
  }

  /**
   * Checks if the user currently has a Jwt auth token
   * @returns True if there is a JWT Auth token stored locally
   */
  hasAuthToken(): boolean {
    return !!this.getAuthToken();
  }

  /**
   * @returns The last stored JWT auth token.
   */
  getAuthToken(): string|null {
    if (this._config.retrieveAuthToken != null) {
      return this._config.retrieveAuthToken();
    }
    return localStorage.getItem(this._getAuthTokenLocaleStorageKey());
  }

  /**
   * @returns The last stored JWT refresh token.
   */
  getRefreshToken(): string|null {
    if (this._config.retrieveRefreshToken != null) {
      return this._config.retrieveRefreshToken();
    }
    return localStorage.getItem(this._getRefreshTokenLocaleStorageKey());
  }

  /**
   * @returns The last stored logged in user info.
   */
  getUserInfo(): User|null {
    if (this._config.retrieveUserInfo != null) {
      return this._config.retrieveUserInfo();
    }
    const userInfo = localStorage.getItem(this._getUserInfoLocaleStorageKey());
    return userInfo == null ? null : JSON.parse(userInfo) as User;
  }

  /**
   * Refreshes the JWT token by providing a refresh token to FusioAuth refresh api.
   * Stores the new authToken, if issued.
   * @returns True if the token was successfully refreshed.
   */
  refreshToken(): Observable<boolean> {
    if (!this.getAuthToken()) {
      return obsOf(false);
    }
    const req = {refreshToken: this.getRefreshToken()};
    const url = this._generateUrl(this._config.refreshEndpoint ?? 'api/jwt/refresh');
    const headers = this._config.apiKey != null ? {Authorization: this._config.apiKey} : undefined;
    return this._httpClient.post<AuthResponse>(url, req, {headers})
               .pipe(
                   map(res => {
                     this._authenticated.next(true);
                     this._storeRefreshToken(res.refreshToken);
                     this._storeAuthToken(res.token);
                     return true;
                   }),
                   catchError(
                       () => {
                         this._authenticated.next(false);
                         return obsOf(false);
                       },
                       ),
                   ) as Observable<boolean>;
  }

  /**
   * Checks the validity of the JWT auth token.
   * @returns True if the token is valid.
   */
  checkToken(): boolean {
    const token = this.getAuthToken();
    if (!token) {
      return false;
    }
    const decodedToken = this._decodeJwt(token);
    if (decodedToken.exp != null && decodedToken.exp > (new Date().getTime() / 1000)) {
      return true;
    }
    return false;
  }

  /**
   * @returns The local storage key used to store the JWT token
   */
  private _getAuthTokenLocaleStorageKey(): string {
    return this._config.authTokenLocalStorageKey || defaultAuthTokenKey;
  }

  /**
   * @returns The local storage key used to store the JWT refresh token
   */
  private _getRefreshTokenLocaleStorageKey(): string {
    return this._config.refreshTokenLocalStorageKey || defaultRefreshTokenKey;
  }

  /**
   * @returns The local storage key used to store the logged in user info
   */
  private _getUserInfoLocaleStorageKey(): string {
    return this._config.userInfoLocalStorageKey || defaultUserInfoKey;
  }

  /**
   * Store the JWT auth token.
   * If a custom function is not provided, the JWT auth token will be stored in the local storage.
   * @param token The JWT auth token
   */
  private _storeAuthToken(token: string|null): void {
    this.authToken.next(token);
    if (this._config.storeAuthToken != null) {
      this._config.storeAuthToken(token);
      return;
    }
    if (token == null) {
      localStorage.removeItem(this._getAuthTokenLocaleStorageKey());
    } else {
      localStorage.setItem(this._getAuthTokenLocaleStorageKey(), token);
    }
  }

  /**
   * Store the JWT refresh token.
   * If a custom function is not provided, the JWT refresh token will be stored in the
   * local storage.
   * @param token The JWT refresh token
   */
  private _storeRefreshToken(token: string|null): void {
    if (this._config.storeRefreshToken != null) {
      this._config.storeRefreshToken(token);
      return;
    }
    if (token == null) {
      localStorage.removeItem(this._getRefreshTokenLocaleStorageKey());
    } else {
      localStorage.setItem(this._getRefreshTokenLocaleStorageKey(), token);
    }
  }

  /**
   * Store the logged in user info.
   * If a custom function is not provided, the user info will be stored in the local storage.
   * @param user The logged in user info.
   */
  private _storeUserInfo(user: User|null): void {
    if (this._config.storeUserInfo != null) {
      this._config.storeUserInfo(user);
      return;
    }
    if (user == null) {
      localStorage.removeItem(this._getUserInfoLocaleStorageKey());
    } else {
      localStorage.setItem(this._getUserInfoLocaleStorageKey(), JSON.stringify(user));
    }
  }

  /**
   * Generate a full URL given a FusionAuth endpoint.
   * @param endpoint The FusionAuth endpoint.
   * @returns The full URL
   */
  private _generateUrl(endpoint: string): string {
    return `${this._baseUrl}/${removeSlashes(endpoint)}`;
  }

  /**
   * @returns A string representing the boolean value following FusionAuth spec
   */
  private _stringifyBooleanParam(bool: boolean): string {
    return bool ? 'true' : 'false';
  }

  /**
   * Check if a valid JWT token is stored and set the authentication status.
   */
  private _initAuthentication(): void {
    try {
      if (this.checkToken()) {
        this._authenticated.next(true);
      }
    } catch (e) {
    }
  }

  /**
   * Decodes and parses a Jwt token
   * @param token The token to be decoded.
   * @returns The decoded token.
   */
  private _decodeJwt(token: string): JwtToken {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload =
        decodeURIComponent(atob(base64)
                               .split('')
                               .map(function(c) {
                                 return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                               })
                               .join(''));

    return JSON.parse(jsonPayload);
  }
}
