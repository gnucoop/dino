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
import {catchError, mapTo, switchMap, tap} from 'rxjs/operators';

import {AuthResponse} from './auth-response';
import {AUTH_SERVICE_CONFIG, AuthServiceConfig} from './auth-service-config';
import {Credentials} from './credentials';
import {JwtToken} from './jwt-token';
import {LoginResponse} from './login-response';
import {NetworkStatusService} from './network-status.service';
import {User} from './user';

function removeSlashes(uri: string): string {
  return uri.replace(/^\/+|\/+$/g, '');
}

/**
 * Default Credentials and Token keys
 */
export const DEFAULT_AUTH_OPTIONS = {
  authTokenKey: 'dewco_auth_token',
  refreshTokenKey: 'dewco_refresh_token',
  userInfoKey: 'dewco_user_info',
  userCredentialKey: 'loginId',
  passwordCredentialKey: 'password',
  userAuthInfo: 'user',
};

/**
 * Injectable service used to authenticate against an external authentication backend.
 * Stores the authentication token and the logged in user info.
 */
@Injectable({providedIn: 'root'})
export class AuthService {
  /**
   * True if a valid JWT access token is available.
   */
  readonly authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * The current JWT auth token
   */
  readonly authToken: BehaviorSubject<string|null>;

  private _baseUrl: string;

  constructor(
      private _nss: NetworkStatusService,
      private _httpClient: HttpClient,
      @Inject(AUTH_SERVICE_CONFIG) readonly config: AuthServiceConfig,
  ) {
    this._baseUrl = removeSlashes(config.host);
    this.authToken = new BehaviorSubject<string|null>(this.getAuthToken());
    this._initAuthentication();
  }

  /**
   * Make a login request to the authentication server and stores the
   * authentication token and the logged in user info.
   * @returns True if the user has been authenticated otherwise false
   */
  login(credentials: Credentials): Observable<boolean> {
    if (credentials == null) {
      return obsOf(false);
    }
    const req: {[key: string]: string} = {
      [this.config.userCredential ?? DEFAULT_AUTH_OPTIONS.userCredentialKey]: credentials.email,
      [this.config.passwordCredential ?? DEFAULT_AUTH_OPTIONS.passwordCredentialKey]:
          credentials.password,
      applicationId: this.config.applicationId,
    };

    const url = this._generateUrl(this.config.loginEndpoint ?? 'api/login');
    const headers = this.config.apiKey != null ? {Authorization: this.config.apiKey} : undefined;
    return this._httpClient.post<LoginResponse>(url, req, {headers})
        .pipe(
            tap(res => {
              this.authenticated.next(true);
              this._storeAuthToken(res.token);
              this._storeRefreshToken(res.refreshToken);
              let userInfo = res[DEFAULT_AUTH_OPTIONS.userAuthInfo];
              if (this.config.userAuthInfo != null) {
                const userAuthInfo = res[this.config.userAuthInfo];
                userInfo = userAuthInfo;
              }
              this._storeUserInfo(userInfo);
            }),
            mapTo(true),
            catchError(() => {
              this.authenticated.next(false);
              return obsOf(false);
            }),
        );
  }

  /**
   * Make a logout request to the authentication server and removes the
   * authentication token and the logged in user info stored.
   * @param allDevices Whether to invalidate all the refresh token issued for this user.
   * @returns True if the user has been logged out otherwise false
   */
  logout(allDevices = false): Observable<boolean> {
    const refreshToken = this.getRefreshToken()!;
    const global = this._stringifyBooleanParam(allDevices);
    const params = new HttpParams({fromObject: {global, refreshToken}});
    const headers = this.config.apiKey != null ? {Authorization: this.config.apiKey} :
                                                 {Authorization: `Bearer ${this.getAuthToken()}`};
    const url =
        `${this._generateUrl(this.config.logoutEndpoint ?? 'api/logout')}?${params.toString()}`;
    return this._httpClient.post(url, {}, {headers})
        .pipe(
            tap(() => {
              this.authenticated.next(false);
              this._storeAuthToken(null);
              this._storeRefreshToken(null);
              this._storeUserInfo(null);
            }),
            mapTo(true),
            catchError(() => obsOf(false)),
        );
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
    if (this.config.retrieveAuthToken != null) {
      return this.config.retrieveAuthToken();
    }
    return localStorage.getItem(this._getAuthTokenLocaleStorageKey());
  }

  /**
   * @returns The last stored JWT refresh token.
   */
  getRefreshToken(): string|null {
    if (this.config.retrieveRefreshToken != null) {
      return this.config.retrieveRefreshToken();
    }
    return localStorage.getItem(this._getRefreshTokenLocaleStorageKey());
  }

  /**
   * @returns The last stored logged in user info.
   */
  getUserInfo(): User|null {
    if (this.config.retrieveUserInfo != null) {
      return this.config.retrieveUserInfo();
    }
    const userInfo = localStorage.getItem(this._getUserInfoLocaleStorageKey());
    return userInfo == null ? null : JSON.parse(userInfo);
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

    const url = this._generateUrl(this.config.refreshEndpoint ?? 'api/jwt/refresh');
    const headers = this.config.apiKey != null ? {Authorization: this.config.apiKey} :
                                                 {Authorization: `Bearer ${this.getAuthToken()}`};

    const refreshHttpCall: Observable<boolean> =
        this._httpClient.post<AuthResponse>(url, req, {headers})
            .pipe(
                tap(res => {
                  this.authenticated.next(true);
                  this._storeRefreshToken(res.refreshToken);
                  this._storeAuthToken(res.token);
                }),
                mapTo(true),
                catchError(
                    () => {
                      this.authenticated.next(false);
                      return obsOf(false);
                    },
                    ),
            );

    return this._nss.isOnline$.pipe(
        switchMap(isOnline => {
          if (!isOnline) {
            return obsOf(true);
          } else {
            return refreshHttpCall;
          }
        }),
    );
  }

  /**
   * Checks the validity of the JWT auth token.
   * @returns True if the token is valid.
   */
  checkToken(): Observable<boolean> {
    const token = this.getAuthToken();
    if (!token) {
      return obsOf(false);
    }

    const decodedToken = this._decodeJwt(token);
    const tokenCheck = decodedToken.exp != null && decodedToken.exp > (new Date().getTime() / 1000);

    return this._nss.isOnline$.pipe(
        switchMap(isOnline => {
          if (!isOnline) {
            return obsOf(true);
          } else {
            return obsOf(tokenCheck);
          }
        }),
    );
  }

  /**
   * @returns The local storage key used to store the JWT token
   */
  private _getAuthTokenLocaleStorageKey(): string {
    return this.config.authTokenLocalStorageKey || DEFAULT_AUTH_OPTIONS.authTokenKey;
  }

  /**
   * @returns The local storage key used to store the JWT refresh token
   */
  private _getRefreshTokenLocaleStorageKey(): string {
    return this.config.refreshTokenLocalStorageKey || DEFAULT_AUTH_OPTIONS.refreshTokenKey;
  }

  /**
   * @returns The local storage key used to store the logged in user info
   */
  private _getUserInfoLocaleStorageKey(): string {
    return this.config.userInfoLocalStorageKey || DEFAULT_AUTH_OPTIONS.userInfoKey;
  }

  /**
   * Store the JWT auth token.
   * If a custom function is not provided, the JWT auth token will be stored in the local storage.
   * @param token The JWT auth token
   */
  private _storeAuthToken(token: string|null): void {
    this.authToken.next(token);
    if (this.config.storeAuthToken != null) {
      this.config.storeAuthToken(token);
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
    if (this.config.storeRefreshToken != null) {
      this.config.storeRefreshToken(token);
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
    if (this.config.storeUserInfo != null) {
      this.config.storeUserInfo(user);
      return;
    }
    if (user == null) {
      localStorage.removeItem(this._getUserInfoLocaleStorageKey());
    } else {
      localStorage.setItem(this._getUserInfoLocaleStorageKey(), JSON.stringify(user));
    }
  }

  /**
   * Generate a full URL given an authentication endpoint.
   * @param endpoint The authentication endpoint.
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
      const checkTokenSub = this.checkToken().subscribe(check => {
        this.authenticated.next(check);
        if (checkTokenSub) {
          checkTokenSub.unsubscribe();
        }
      });
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
