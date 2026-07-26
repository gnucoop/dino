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
import {
  BehaviorSubject,
  fromEvent,
  merge,
  NEVER,
  Observable,
  of as obsOf,
  Subscription,
  throwError,
  timer,
} from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  mapTo,
  retry,
  share,
  shareReplay,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
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
import {ErrorHandlerMessageService} from '@dino/core/error-handler';

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
 * Safety margin applied when deciding whether the auth token is expired, so a
 * request is never sent with a token that dies while in flight.
 *
 * Deliberately small: it only needs to cover request latency. A larger margin
 * starts classifying legitimately short-lived tokens as already expired.
 */
const DEFAULT_TOKEN_SKEW_SECONDS = 10;

/**
 * Fraction of the token's remaining lifetime after which it is refreshed
 * pro-actively (0.75 = at three quarters of the way to expiry).
 */
const PREEMPTIVE_REFRESH_RATIO = 0.75;

/**
 * Skew used when revalidating on resume. Larger than the per-request skew: a
 * token that is about to die is refreshed straight away, so the burst of queries
 * a returning app fires cannot race the expiry.
 */
const RESUME_TOKEN_SKEW_SECONDS = 60;

/**
 * Total attempts (not retries) for a single token refresh, including the first.
 * Small on purpose: every trigger that needs a refresh has a user waiting on it.
 */
const MAX_REFRESH_ATTEMPTS = 3;

/** Backoff step between refresh attempts; multiplied by the attempt number. */
const REFRESH_RETRY_BASE_DELAY_MS = 1000;

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
   * Emits when a User logs in
   */
  readonly loginEvt: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /**
   * Emits when the app returns to the foreground: the tab became visible again,
   * or the page was restored from the back/forward cache.
   *
   * This is the only reliable recovery trigger on mobile. While an app is
   * suspended its timers are throttled or stopped altogether, so the pre-emptive
   * refresh may never fire; and a suspend/resume produces no browser
   * online/offline event, so `NetworkStatusService` cannot see it either.
   * Shared, so consumers that must also revive transport (e.g. a websocket) hang
   * off the same events instead of registering their own listeners.
   *
   * Emits how many milliseconds the app spent in the background, or `Infinity`
   * when that is unknown (a page restored from the back/forward cache, where the
   * connections are gone anyway). Consumers deciding whether a connection may
   * have died in the meantime need that duration, because a suspended device
   * leaves no other trace.
   */
  readonly appResumed: Observable<number>;

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

  /**
   * The refresh request currently in flight, shared between concurrent callers.
   * Null when no refresh is running. See `refreshToken()`.
   */
  private _refreshInFlight: Observable<boolean> | null = null;

  /** The scheduled pre-emptive refresh, if any. See `_schedulePreemptiveRefresh()`. */
  private _preemptiveRefreshSub: Subscription = Subscription.EMPTY;

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
    private _ehms: ErrorHandlerMessageService,
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
    this.appResumed = this._buildAppResumed();
    this._initAuthentication();
    this._initResumeRevalidation();
    if (this._configService != null) {
      this._setDynamicConfigSub();
    }
  }

  /**
   * Builds the shared {@link appResumed} stream. Returns a never-emitting
   * observable outside a browser, so the service stays usable in tests/SSR.
   */
  private _buildAppResumed(): Observable<number> {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
      return NEVER;
    }
    let hiddenAt: number | null = document.visibilityState === 'hidden' ? Date.now() : null;
    return merge(
      fromEvent(document, 'visibilitychange').pipe(
        map(() => {
          if (document.visibilityState === 'hidden') {
            hiddenAt = Date.now();
            return null;
          }
          const hiddenForMs = hiddenAt == null ? Infinity : Date.now() - hiddenAt;
          hiddenAt = null;
          return hiddenForMs;
        }),
        filter((hiddenForMs): hiddenForMs is number => hiddenForMs != null),
      ),
      // Fired when the page is restored from the back/forward cache, where no
      // visibilitychange is guaranteed and every connection has been discarded.
      fromEvent(window, 'pageshow').pipe(map(() => Infinity)),
    ).pipe(share());
  }

  /**
   * Revalidates the session whenever the app comes back to the foreground.
   *
   * This is what actually covers the reported idle failure: the token dies while
   * the app is suspended, and without this nothing notices until a request has
   * already failed (and, before the expiry fixes, not even then).
   */
  private _initResumeRevalidation(): void {
    this.appResumed
      .pipe(
        withLatestFrom(this._nss.isOnline$),
        // Nothing to revalidate when logged out, and no point calling a refresh
        // endpoint with no connectivity.
        filter(([_, isOnline]) => isOnline === true && this.getAuthToken() != null),
        switchMap(() => {
          if (this.isTokenExpired(RESUME_TOKEN_SKEW_SECONDS)) {
            return this.refreshToken();
          }
          // The token is still good, but the pre-emptive timer was throttled or
          // suspended while hidden, so it may have been skipped or be due late.
          // Rescheduling from the real expiry puts it back on track.
          this._schedulePreemptiveRefresh();
          return obsOf(true);
        }),
      )
      .subscribe();
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
        const defaulLoginUrl = config.nHostAuth ? 'signin/email-password' : 'api/login';
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
            let userInfo =
              session && session[DEFAULT_AUTH_OPTIONS.userAuthInfo]
                ? session[DEFAULT_AUTH_OPTIONS.userAuthInfo]
                : res[DEFAULT_AUTH_OPTIONS.userAuthInfo];
            if (config.userAuthInfo != null) {
              const userAuthInfo = session[config.userAuthInfo] ?? res[config.userAuthInfo];
              userInfo = userAuthInfo;
            }
            this.storeAllAuthenticationInfo(session, res.token, res.refreshToken, userInfo);
            this.loginEvt.emit(true);
          }),
          mapTo(true),
        );
      }),
    );
  }

  /**
   * Store all authentication info: the authentication token and the logged in user info.
   * @param session
   * @param token
   * @param refreshToken
   * @param userInfo
   * @param clearNhostTokens If true, all nhost tokens and tokens info are removed from localstorage.
   */
  storeAllAuthenticationInfo(
    session: any,
    token: string | undefined,
    refreshToken: string | undefined,
    userInfo: any | null,
    clearNhostTokens?: boolean,
  ): void {
    // Store the user info BEFORE announcing the login. Both `authenticated` and
    // `authToken` synchronously wake their subscribers, and several of them read
    // `getUserInfo()` in response (e.g. the Pandino bootstrap). With the user
    // info written last, those subscribers saw an empty user and gave up, with no
    // further event to retry on — the work only happened after a page reload.
    this._storeUserInfo(userInfo);
    if (clearNhostTokens) {
      this.clearNhostTokens();
    }
    // The relative order of `authenticated` and the token storage is preserved:
    // DataService._initSync() reads the auth event via `withLatestFrom`, so it
    // must already be 'login' by the time the token emits, otherwise replication
    // would not start.
    this.authenticated.next({auth: true, evt: 'login'});
    this._storeAuthToken(session?.accessToken ?? token);
    this._storeRefreshToken(session?.refreshToken ?? refreshToken);
  }

  /**
   * Removes all nhost tokens from localstorage.
   */
  clearNhostTokens() {
    localStorage.removeItem('nhostRefreshTokenExpiresAt');
    localStorage.removeItem('nhostRefreshToken');
    localStorage.removeItem('nhostRefreshTokenId');
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
        const defaulLogoutUrl = config.nHostAuth ? 'signout' : 'api/logout';
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
            this._clearApiKeys();
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
          config.signupEndpoint ?? 'signup/email-password',
          removeSlashes(config.host),
        );
        return this._httpClient.post<NHostSignupResponse>(url, requestData).pipe(
          catchError(err => {
            this._ehms.captureErrorMessage(
              `Could not signup new user: ${JSON.stringify(err)}`,
              'error',
            );
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

    // Single-flight: several triggers can notice an expired token at once (the
    // interceptor, the route guard, the websocket, the pre-emptive timer). Without
    // this, each subscription issued its own POST — and the losers of the race then
    // refreshed with an already-rotated refresh token.
    if (this._refreshInFlight != null) {
      return this._refreshInFlight;
    }
    const refresh$ = this._buildRefreshCall(authEvt, refreshToken).pipe(
      take(1),
      finalize(() => {
        this._refreshInFlight = null;
      }),
      shareReplay(1),
    );
    this._refreshInFlight = refresh$;
    return refresh$;
  }

  /**
   * Builds the actual refresh HTTP call. Kept separate so `refreshToken()` can
   * share one in-flight request between concurrent callers.
   */
  private _buildRefreshCall(authEvt: AuthEvt, refreshToken?: string): Observable<boolean> {
    return this._authConfig.pipe(
      switchMap(config => {
        const req = {refreshToken: this.getRefreshToken() ?? refreshToken};
        const defaulRefreshUrl = config.nHostAuth ? 'token' : 'api/jwt/refresh';
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
            // Bounded retry, because a single failed attempt has consequences well
            // beyond this request: it announces `refresh failed`, which resets the
            // permission context and can force a logout. Each trigger only ever
            // calls this once (there is no other retry anywhere), and the
            // pre-emptive timer is not rescheduled on failure, so one transient
            // blip used to be enough to degrade the session until the user next
            // interacted.
            retry({
              count: MAX_REFRESH_ATTEMPTS - 1,
              delay: (err, attempt) => {
                const status = (err as HttpErrorResponse)?.status;
                // A rejected refresh token will be rejected again — retrying it is
                // pointless and only delays the honest failure. Retry transport
                // problems only (offline blip, timeout, 5xx).
                if (status != null && status >= 400 && status < 500) {
                  return throwError(() => err);
                }
                return timer(REFRESH_RETRY_BASE_DELAY_MS * attempt);
              },
            }),
            tap(res => {
              // Store the new tokens BEFORE announcing success. Subscribers react
              // to `authenticated` synchronously and re-issue their requests, and
              // the auth header is read fresh from storage per request — so
              // announcing first made those retries go out with the old, expired
              // token and fail with JWTExpired even though the refresh succeeded.
              this._storeRefreshToken(res.refreshToken);
              this._storeAuthToken(res.accessToken ?? res.token);
              if (authEvt !== 'reset password') {
                this.authenticated.next({auth: true, evt: authEvt});
              }
            }),
            mapTo(true),
            catchError(err => {
              if (isDevMode()) {
                console.log(err.error ?? err);
              }
              this._ehms.captureErrorMessage(
                `Could not refresh Auth Token: ${JSON.stringify(err)}`,
                'warning',
              );
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

    return this._nss.isOnline$.pipe(
      withLatestFrom(this._nss.statusHistory$),
      map(([isOnline, statusHistory]) => {
        // Evaluated per emission, NOT once at subscribe time: this observable is
        // long-lived (isOnline$ never completes), so a value captured up front
        // would report the token as valid forever.
        const tokenCheck = !this.isTokenExpired();
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
          const defaultChangePwdUrl = config.nHostAuth ? 'user/password' : 'api/password';
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
            const defaultChangePwdUrl = config.nHostAuth ? 'user/password' : 'api/password';
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
          `user/password/reset`,
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
    // Persist BEFORE emitting. Subscribers of `authToken` react synchronously and
    // read the token back through `getAuthToken()` (i.e. from storage), so emitting
    // first handed them the PREVIOUS value — which is how requests went out with an
    // expired token immediately after a successful refresh.
    if (this._authConfig.value.storeAuthToken != null) {
      this._authConfig.value.storeAuthToken(token);
    } else if (token == null) {
      localStorage.removeItem(this._getAuthTokenLocaleStorageKey());
    } else {
      localStorage.setItem(this._getAuthTokenLocaleStorageKey(), token);
    }
    this._schedulePreemptiveRefresh();
    this.authToken.next(token);
  }

  /**
   * (Re)schedules a refresh shortly before the current token expires, so the
   * session is renewed pro-actively instead of only after a request has already
   * failed. Rescheduled every time a token is stored; cancelled when it is cleared.
   *
   * Best-effort only: background tabs throttle timers (and mobile suspends them
   * altogether), so this complements — never replaces — revalidating when the app
   * returns to the foreground.
   */
  private _schedulePreemptiveRefresh(): void {
    this._preemptiveRefreshSub.unsubscribe();
    const expiresAt = this.tokenExpiresAt();
    if (expiresAt == null) {
      return;
    }
    const remainingMs = expiresAt * 1000 - new Date().getTime();
    if (remainingMs <= 0) {
      return;
    }
    const dueInMs = Math.max(remainingMs * PREEMPTIVE_REFRESH_RATIO, 1000);
    this._preemptiveRefreshSub = timer(dueInMs)
      .pipe(switchMap(() => this.refreshToken()))
      .subscribe();
  }

  /**
   * Removes all locally stored Dino Api Keys
   */
  private _clearApiKeys(): void {
    const storageKeys = Object.keys(localStorage);
    storageKeys.forEach(key => {
      if (key.includes('dino_api_key')) localStorage.removeItem(key);
    });
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
  private _decodeJwt(token: string): JwtToken | null {
    try {
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
    } catch (err) {
      // A malformed/truncated token used to throw synchronously out of every
      // caller (checkToken included). Treat it as undecodable instead.
      if (isDevMode()) {
        console.warn('Could not decode the auth token', err);
      }
      return null;
    }
  }

  /**
   * Seconds since the epoch at which the stored auth token expires, or null when
   * there is no token, it cannot be decoded, or it carries no `exp` claim.
   */
  tokenExpiresAt(): number | null {
    const token = this.getAuthToken();
    if (!token) {
      return null;
    }
    const decoded = this._decodeJwt(token);
    return decoded?.exp ?? null;
  }

  /**
   * True when the stored auth token is missing, undecodable or expired.
   *
   * `skewSeconds` treats a token that is about to expire as already expired, so
   * a request is not sent with a token that dies in flight. It is also what makes
   * a pre-emptive refresh possible.
   * @param skewSeconds Safety margin in seconds (default 30).
   */
  isTokenExpired(skewSeconds: number = DEFAULT_TOKEN_SKEW_SECONDS): boolean {
    const expiresAt = this.tokenExpiresAt();
    if (expiresAt == null) {
      return true;
    }
    return expiresAt <= new Date().getTime() / 1000 + skewSeconds;
  }
}
