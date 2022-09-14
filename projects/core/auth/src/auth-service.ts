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

import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {EventEmitter, Inject, Injectable, isDevMode, Optional} from '@angular/core';
import {ConfigService} from '@dino/core/config';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {catchError, map, mapTo, switchMap, tap, withLatestFrom} from 'rxjs/operators';
import {AuthenticationEvent, AuthEvt} from './auth-event';

import {
  AuthResponse,
  BasicUserInfo,
  NHostRefreshResponse,
  NHostSignupRequest,
  NHostSignupResponse,
} from './auth-response';
import {AUTH_SERVICE_CONFIG, AuthServiceConfig} from './auth-service-config';
import {buildAuthorizationHeader} from './auth-utils';
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
  authTokenKey: 'dino_auth_token',
  refreshTokenKey: 'dino_refresh_token',
  userInfoKey: 'dino_user_info',
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
  readonly authenticated: BehaviorSubject<AuthenticationEvent> =
    new BehaviorSubject<AuthenticationEvent>({auth: false, evt: 'no auth token'});

  /**
   * The current JWT auth token
   */
  readonly authToken: BehaviorSubject<string | null>;

  /**
   * Emits when reset auth is called, indicating the removal of all
   * stored token and config data.
   */
  readonly resetEvt: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /**
   * Emits when the current User actively logs out
   */
  readonly logoutEvt: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /**
   * When not null it holds the newly signed up User basic info.
   * The User Data Manager should create a new User Data based
   * on this, then set this to null.
   */
  private _newUser: BehaviorSubject<BasicUserInfo | null> =
    new BehaviorSubject<BasicUserInfo | null>(null);

  setNewUser(newUser: BasicUserInfo): void {
    if (!newUser) {
      return;
    }
    this._newUser.next(newUser);
  }
  getNewUser(): BasicUserInfo | null {
    return this._newUser.value;
  }
  resetNewUser(): void {
    this._newUser.next(null);
  }

  /**
   * The Auth service configuration settings stream.
   */
  private _authConfig: BehaviorSubject<AuthServiceConfig>;

  get authConfig(): AuthServiceConfig {
    return this._authConfig.value;
  }

  /**
   * The auth config currently stored in the local storage, if present.
   */
  private _currentlyStoredConfig: AuthServiceConfig | null;

  private _baseUrl: string;

  constructor(
    private _nss: NetworkStatusService,
    private _httpClient: HttpClient,
    @Inject(AUTH_SERVICE_CONFIG) readonly config: AuthServiceConfig,
    @Optional() private _configService: ConfigService | null,
  ) {
    this._authConfig = new BehaviorSubject<AuthServiceConfig>(this.config);

    this._currentlyStoredConfig = this._getAuthConfig();

    this._baseUrl = removeSlashes(this._authConfig.value.host);

    if (this._currentlyStoredConfig != null) {
      this._authConfig.next(this._currentlyStoredConfig);
    }
    this.authToken = new BehaviorSubject<string | null>(this.getAuthToken());
    this._initAuthentication();
    if (this._configService != null) {
      this._setDynamicConfigSub();
    }
  }

  /**
   * Resets the auth state, removing tokens and config from local storage.
   */
  resetAuth(): void {
    this.resetEvt.emit(true);

    this._currentlyStoredConfig = null;
    this.authenticated.next({auth: false, evt: 'no auth token'});
    this._storeAuthToken(null);
    this._storeRefreshToken(null);
    this._storeUserInfo(null);
    this._removeAuthConfig();
    if (this._configService) {
      this._configService.resetConfigurationset();
    }
  }

  /**
   * Make a login request to the authentication server and stores the
   * authentication token and the logged in user info.
   * @returns True if the user has been authenticated otherwise false
   */
  login(credentials: Credentials): Observable<boolean | HttpErrorResponse> {
    if (credentials == null) {
      return obsOf(false);
    }

    return this._authConfig.pipe(
      switchMap(config => {
        const req: {[key: string]: string | null} = {
          [config.userCredential ?? DEFAULT_AUTH_OPTIONS.userCredentialKey]: credentials.email,
          [config.passwordCredential ?? DEFAULT_AUTH_OPTIONS.passwordCredentialKey]:
            credentials.password,
        };

        if (!config.nHostAuth) {
          req['applicationId'] = config.applicationId;
        }
        const defaulLoginUrl = config.nHostAuth ? 'v1/auth/signin/email-password' : 'api/login';
        const url = this._generateUrl(
          config.loginEndpoint ?? defaulLoginUrl,
          removeSlashes(config.host),
        );
        const headers = config.apiKey != null ? {Authorization: config.apiKey} : undefined;
        return this._httpClient.post<LoginResponse>(url, req, {headers}).pipe(
          tap(res => {
            if (config.nHostAuth && res['session'] == null) {
              throw new Error(`${res['error']} - ${res['message']}`);
            }
            const session = res['session'];
            this.authenticated.next({auth: true, evt: 'login'});
            this._storeAuthToken(session?.accessToken ?? res.token);
            this._storeRefreshToken(session?.refreshToken ?? res.refreshToken);
            let userInfo =
              session && session[DEFAULT_AUTH_OPTIONS.userAuthInfo]
                ? session[DEFAULT_AUTH_OPTIONS.userAuthInfo]
                : res[DEFAULT_AUTH_OPTIONS.userAuthInfo];
            if (config.userAuthInfo != null) {
              const userAuthInfo = session[config.userAuthInfo] ?? res[config.userAuthInfo];
              userInfo = userAuthInfo;
            }
            this._storeUserInfo(userInfo);
          }),
          mapTo(true),
        );
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
    return this._authConfig.pipe(
      switchMap(config => {
        const req: {[key: string]: string | boolean} = {};
        const refreshToken = this.getRefreshToken()!;
        const global = this._stringifyBooleanParam(allDevices);
        const params = new HttpParams({fromObject: {global, refreshToken}});
        const headers: {[key: string]: any} =
          config.apiKey != null
            ? {Authorization: config.apiKey}
            : {Authorization: buildAuthorizationHeader(this.getAuthToken())};
        let options: {headers: {[key: string]: any}; responseType?: any} = {headers: headers};
        const defaulLogoutUrl = config.nHostAuth ? 'v1/auth/signout' : 'api/logout';
        let url = `${this._generateUrl(
          config.logoutEndpoint ?? defaulLogoutUrl,
          removeSlashes(config.host),
        )}?${params.toString()}`;
        if (config.nHostAuth) {
          req['refreshToken'] = refreshToken;
          req['all'] = allDevices;
          options.responseType = 'text';
        }
        return this._httpClient.post(url, req, options).pipe(
          tap(_ => {
            this.authenticated.next({auth: false, evt: 'logout'});
            this._storeAuthToken(null);
            this._storeRefreshToken(null);
            this._storeUserInfo(null);
            this._removeAuthConfig();
            this.logoutEvt.emit(true);
          }),
          mapTo(true),
          catchError(err => {
            if (isDevMode()) {
              console.log(err.error ?? err);
            }
            return obsOf(false);
          }),
        );
      }),
    );
  }

  /**
   * Make a signup request to the nHost authentication api to create a new user.
   * @param requestData The Nhost request params
   * @returns the NHost signup Api response
   */
  signupNHost(requestData: NHostSignupRequest): Observable<NHostSignupResponse | null> {
    if (requestData == null || requestData.email == null || requestData.password == null) {
      return obsOf(null);
    }

    return this._authConfig.pipe(
      switchMap(config => {
        const url = this._generateUrl(
          config.signupEndpoint ?? 'v1/auth/signup/email-password',
          removeSlashes(config.host),
        );
        return this._httpClient.post<NHostSignupResponse>(url, requestData).pipe(
          catchError(err => {
            return obsOf(err.error);
          }),
        );
      }),
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
  getAuthToken(): string | null {
    if (this._authConfig.value.retrieveAuthToken != null) {
      return this._authConfig.value.retrieveAuthToken();
    }
    return localStorage.getItem(this._getAuthTokenLocaleStorageKey());
  }

  /**
   * @returns The last stored JWT refresh token.
   */
  getRefreshToken(): string | null {
    if (this._authConfig.value.retrieveRefreshToken != null) {
      return this._authConfig.value.retrieveRefreshToken();
    }
    return localStorage.getItem(this._getRefreshTokenLocaleStorageKey());
  }

  /**
   * @returns The last stored logged in user info.
   */
  getUserInfo(): User | null {
    if (this._authConfig.value.retrieveUserInfo != null) {
      return this._authConfig.value.retrieveUserInfo();
    }
    const userInfo = localStorage.getItem(this._getUserInfoLocaleStorageKey());
    return userInfo == null ? null : JSON.parse(userInfo);
  }

  /**
   * Refreshes the JWT token by providing a refresh token to FusioAuth refresh api.
   * Stores the new authToken, if issued.
   * @param authEvt The authentication event string identifier
   * @param refreshToken? An optional refresh token provided
   * @returns True if the token was successfully refreshed.
   */
  refreshToken(
    authEvt: AuthEvt = 'refresh successful',
    refreshToken?: string,
  ): Observable<boolean> {
    if (!this.getAuthToken() && refreshToken == null) {
      return obsOf(false);
    }

    return this._authConfig.pipe(
      switchMap(config => {
        const req = {refreshToken: this.getRefreshToken() ?? refreshToken};
        const defaulRefreshUrl = config.nHostAuth ? 'v1/auth/token' : 'api/jwt/refresh';
        const url = this._generateUrl(
          config.refreshEndpoint ?? defaulRefreshUrl,
          removeSlashes(config.host),
        );
        const headers =
          config.apiKey != null
            ? {Authorization: config.apiKey}
            : {Authorization: `Bearer ${this.getAuthToken()}`};

        const refreshHttpCall: Observable<boolean> = this._httpClient
          .post<AuthResponse & NHostRefreshResponse>(url, req, {headers})
          .pipe(
            tap(res => {
              if (authEvt !== 'reset password') {
                this.authenticated.next({auth: true, evt: authEvt});
              }
              this._storeRefreshToken(res.refreshToken);
              this._storeAuthToken(res.accessToken ?? res.token);
            }),
            mapTo(true),
            catchError(err => {
              if (isDevMode()) {
                console.log(err.error ?? err);
              }
              if (authEvt !== 'reset password') {
                this.authenticated.next({auth: false, evt: 'refresh failed'});
              }
              return obsOf(false);
            }),
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
      }),
    );
  }

  /**
   * Checks the validity of the JWT auth token.
   * @returns True if the token is valid.
   */
  checkToken(): Observable<{token: boolean; evt: AuthEvt}> {
    const token = this.getAuthToken();
    if (!token) {
      return obsOf({token: false, evt: 'no auth token'});
    }

    const decodedToken = this._decodeJwt(token);
    const tokenCheck = decodedToken.exp != null && decodedToken.exp > new Date().getTime() / 1000;

    return this._nss.isOnline$.pipe(
      withLatestFrom(this._nss.statusHistory$),
      map(([isOnline, statusHistory]) => {
        let res: {token: boolean; evt: AuthEvt} = {token: tokenCheck, evt: 'init'};
        if (!isOnline) {
          if (statusHistory.length > 1 && !statusHistory[0] && statusHistory[1]) {
            res = {token: true, evt: 'gone offline'};
          } else {
            res = {token: true, evt: 'offline'};
          }
        } else if (isOnline && statusHistory.length > 1 && statusHistory[0] && !statusHistory[1]) {
          res = {token: tokenCheck, evt: 'back online'};
        }
        return res;
      }),
    );
  }

  /**
   * User Change Password method.
   * @param credentials User Credentials
   * @param newPass The new Password
   */
  changePassword(
    credentials: Credentials,
    newPass: string,
  ): Observable<boolean | HttpErrorResponse> {
    return this.login(credentials).pipe(
      withLatestFrom(this._authConfig),
      switchMap(([logRes, config]) => {
        if (logRes === true) {
          const defaultChangePwdUrl = config.nHostAuth ? 'v1/auth/user/password' : 'api/password';
          const url = this._generateUrl(
            config.changePasswordEndpoint ?? defaultChangePwdUrl,
            removeSlashes(config.host),
          );
          const headers =
            config.apiKey != null
              ? {Authorization: config.apiKey}
              : {Authorization: `Bearer ${this.getAuthToken()}`};
          return this._httpClient.post<any>(url, {newPassword: newPass}, {headers});
        } else {
          return obsOf(logRes);
        }
      }),
    );
  }

  /**
   * User Change Password method using a reset token
   * @param token The Reset password token
   * @param newPass The new Password
   */
  changePasswordWithResetTicket(
    token: string,
    newPass: string,
  ): Observable<boolean | HttpErrorResponse> {
    if (token == null || newPass == null) {
      return obsOf(false);
    }
    return this.refreshToken('reset password', token).pipe(
      switchMap(res => {
        if (!res) {
          return obsOf(false);
        }
        return this._authConfig.pipe(
          switchMap(config => {
            const defaultChangePwdUrl = config.nHostAuth ? 'v1/auth/user/password' : 'api/password';
            const url = this._generateUrl(
              config.changePasswordEndpoint ?? defaultChangePwdUrl,
              removeSlashes(config.host),
            );
            const headers =
              config.apiKey != null
                ? {Authorization: config.apiKey}
                : {Authorization: `Bearer ${this.getAuthToken()}`};
            return this._httpClient.post<any>(url, {newPassword: newPass}, {headers});
          }),
        );
      }),
    );
  }

  /**
   * User Reset Password method.
   * @param email The email address of the user that wishes to reset his/her password
   */
  resetPassword(
    email: string,
    options?: {redirectTo: string},
  ): Observable<boolean | HttpErrorResponse> {
    if (!email) {
      return obsOf(false);
    }
    return this._authConfig.pipe(
      switchMap(config => {
        if (!config.resetPasswordEndpoint && !config.host) {
          return obsOf(false);
        }
        const resetPwdUrl = this._generateUrl(
          `v1/auth/user/password/reset`,
          removeSlashes(config.resetPasswordEndpoint ?? config.host),
        );
        return this._httpClient.post<any>(resetPwdUrl, {email: email, options: options});
      }),
    );
  }

  /**
   * Subscribes to the Config Service and listens for changes
   * in the Auth configuration.
   */
  private _setDynamicConfigSub(): void {
    if (this._configService == null) {
      return;
    }
    this._configService.configurationSet.subscribe(config => {
      if (config == null) {
        return;
      }
      const authConfig = {...this._authConfig.value, ...config.authConfig};
      this._setAuthConfig(authConfig);
    });
  }

  /**
   * Dynamically sets the configuration params for the Auth Service.
   * @param config The configuration data
   */
  private _setAuthConfig(config: AuthServiceConfig): void {
    if (config == null) {
      return;
    }
    this._storeAuthConfig(config);
    this._authConfig.next(config);
  }

  /**
   * Stores an Auth service configuration object into the
   * local storage.
   * @param config The configuration data
   */
  private _storeAuthConfig(config: AuthServiceConfig): void {
    if (config == null) {
      return;
    }
    localStorage.setItem('auth_config', btoa(JSON.stringify(config)));
  }

  /**
   * Retrieves the Auth service configuration currently stored in the
   * local storage.
   */
  private _getAuthConfig(): AuthServiceConfig | null {
    const config = localStorage.getItem('auth_config');
    if (config == null) {
      return null;
    }
    return JSON.parse(atob(config));
  }

  /**
   * Removes the Auth service configuration currently stored in the
   * local storage.
   */
  private _removeAuthConfig(): void {
    localStorage.removeItem('auth_config');
  }

  /**
   * @returns The local storage key used to store the JWT token
   */
  private _getAuthTokenLocaleStorageKey(): string {
    return this._authConfig.value.authTokenLocalStorageKey || DEFAULT_AUTH_OPTIONS.authTokenKey;
  }

  /**
   * @returns The local storage key used to store the JWT refresh token
   */
  private _getRefreshTokenLocaleStorageKey(): string {
    return (
      this._authConfig.value.refreshTokenLocalStorageKey || DEFAULT_AUTH_OPTIONS.refreshTokenKey
    );
  }

  /**
   * @returns The local storage key used to store the logged in user info
   */
  private _getUserInfoLocaleStorageKey(): string {
    return this._authConfig.value.userInfoLocalStorageKey || DEFAULT_AUTH_OPTIONS.userInfoKey;
  }

  /**
   * Store the JWT auth token.
   * If a custom function is not provided, the JWT auth token will be stored in the local storage.
   * @param token The JWT auth token
   */
  private _storeAuthToken(token: string | null): void {
    this.authToken.next(token);
    if (this._authConfig.value.storeAuthToken != null) {
      this._authConfig.value.storeAuthToken(token);
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
  private _storeRefreshToken(token: string | null): void {
    if (this._authConfig.value.storeRefreshToken != null) {
      this._authConfig.value.storeRefreshToken(token);
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
  private _storeUserInfo(user: User | null): void {
    if (this._authConfig.value.storeUserInfo != null) {
      this._authConfig.value.storeUserInfo(user);
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
  private _generateUrl(endpoint: string, baseUrl?: string): string {
    return `${baseUrl ?? this._baseUrl}/${removeSlashes(endpoint)}`;
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
    this.checkToken().subscribe(check => {
      this.authenticated.next({auth: check.token, evt: check.evt});
    });
  }

  /**
   * Decodes and parses a Jwt token
   * @param token The token to be decoded.
   * @returns The decoded token.
   */
  private _decodeJwt(token: string): JwtToken {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );

    return JSON.parse(jsonPayload);
  }
}
