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
import {EventEmitter, Inject, Injectable, isDevMode, OnDestroy, Optional} from '@angular/core';
import {ConfigService} from '@dino/core/config';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {
  catchError,
  finalize,
  map,
  mapTo,
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
import {
  buildAuthorizationHeader,
  decodeJwt,
  isTokenExpired,
  PREEMPTIVE_REFRESH_RATIO,
  tokenExpiresAt,
  tokenIssuedAt,
} from './auth-utils';
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
 * Lower bound, in milliseconds, for the pre-emptive refresh timer.
 * Prevents a token with an already elapsed 75% lifetime from scheduling
 * back-to-back refreshes.
 */
const MIN_PREEMPTIVE_REFRESH_DELAY = 10000;

/**
 * Lower bound, in milliseconds, used when the pre-emptive refresh is re-armed
 * after a refresh that could not run because the app was offline.
 * Longer than {@link MIN_PREEMPTIVE_REFRESH_DELAY}: an offline session would
 * otherwise poll itself every few seconds for as long as the connection is
 * missing.
 */
const OFFLINE_PREEMPTIVE_RETRY_DELAY = 60000;

/**
 * Injectable service used to authenticate against an external authentication backend.
 * Stores the authentication token and the logged in user info.
 */
@Injectable({providedIn: 'root'})
export class AuthService implements OnDestroy {
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
   * Emits when the current User actively logs out.
   *
   * Only that: the data service answers this event by destroying the local
   * database, so a session the app gave up on by itself must go through
   * {@link endSession} instead, which leaves the data alone.
   */
  readonly logoutEvt: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /**
   * Emits when a User logs in
   */
  readonly loginEvt: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  /**
   * Emits every time a new auth token is successfully obtained through a refresh.
   * Consumers waiting on the token (interceptor, retry counters) can reset
   * their state when this fires.
   */
  readonly tokenRefreshedEvt: EventEmitter<void> = new EventEmitter<void>();

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

  /**
   * The refresh call currently in flight, shared by every concurrent requester
   * so that interceptor, guard and pre-emptive timer never fire parallel
   * refresh requests.
   *
   * One shared call rather than one per requester because: on a slow link the
   * requests would queue behind each other for no gain; every response emits
   * `authToken`, and every emission makes the data service reconfigure each
   * running replication; and a backend that treats refresh tokens as single-use
   * would see the parallel calls invalidate each other. The current backend does
   * not rotate at all - verified by hand, see SYNC.md - but that is its
   * configuration and not a contract, so do not rely on the parallel calls being
   * harmless.
   */
  private _refreshInFlight: Observable<boolean> | null = null;

  /**
   * Handle of the pending pre-emptive refresh timer.
   */
  private _preemptiveRefreshTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * True while a token refresh is in flight.
   * Consumers budgeting refresh attempts must not spend one on a refresh they
   * merely join: the call is shared, so several requests failing inside the same
   * round trip are one attempt, not one each.
   */
  get isRefreshing(): boolean {
    return this._refreshInFlight != null;
  }

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
    this._initAuthentication();
    // A session resumed from local storage needs its pre-emptive refresh armed
    // too, otherwise the token silently dies while the app sits idle.
    this._schedulePreemptiveRefresh(this.getAuthToken());
    if (this._configService != null) {
      this._setDynamicConfigSub();
    }
  }

  ngOnDestroy(): void {
    this._clearPreemptiveRefresh();
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
    // Persist everything BEFORE notifying subscribers: an `authenticated`
    // emission wakes up queries that read the token straight from the storage,
    // and they would otherwise still find the previous (expired) one.
    const authToken = session?.accessToken ?? token ?? null;
    this._storeRefreshToken(session?.refreshToken ?? refreshToken);
    this._storeUserInfo(userInfo);
    this._persistAuthToken(authToken);
    if (clearNhostTokens) {
      this.clearNhostTokens();
    }
    // The auth state goes out before the token stream: consumers sample
    // `authenticated` when `authToken` emits.
    this.authenticated.next({auth: true, evt: 'login'});
    this.authToken.next(authToken);
  }

  /**
   * Ends the session locally: drops the stored tokens, cancels the pending
   * pre-emptive refresh and reports the user as not authenticated. The server is
   * not told, so this also works offline - unlike {@link logout}, which needs a
   * round trip.
   *
   * This is what the paths that give up on renewing the token by themselves must
   * call. They used to call {@link logout}, which the data service answers by
   * destroying the local database, taking with it the data collected offline and
   * never pushed: a failed refresh is not proof that the session is dead, and
   * the same negative result covers a network blip and a revoked credential.
   *
   * What survives is the data, not the credentials: the next login starts from a
   * new refresh token, then resumes the replications from their stored checkpoint
   * and pushes the backlog. Not the user info either, for the record: the login
   * page runs {@link resetAuth} on every visit, so what names the account whose
   * data is on the device is the owner record the data service keeps next to the
   * database.
   *
   * @param evt The authentication event to report. Defaults to `expired`.
   */
  endSession(evt: AuthEvt = 'expired'): void {
    // Storage first, then the auth state, then the token stream: consumers
    // sample `authenticated` when `authToken` emits, and read the token back
    // from the storage.
    this._persistAuthToken(null);
    this._storeRefreshToken(null);
    this.authenticated.next({auth: false, evt});
    this.authToken.next(null);
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

    // A password reset consumes a one-off ticket: it must neither share nor be
    // satisfied by a pending regular refresh.
    if (authEvt === 'reset password') {
      return this._requestTokenRefresh(authEvt, refreshToken);
    }

    if (this._refreshInFlight == null) {
      this._refreshInFlight = this._requestTokenRefresh(authEvt, refreshToken).pipe(
        finalize(() => (this._refreshInFlight = null)),
        shareReplay({bufferSize: 1, refCount: false}),
      );
    }
    return this._refreshInFlight;
  }

  /**
   * Checks the validity of the JWT auth token.
   * The token and its expiry are read on every emission, so a long lived
   * subscription keeps reporting the current state instead of the one captured
   * when the stream was built.
   * @returns A stream of the token validity and the related auth event.
   */
  checkToken(): Observable<{token: boolean; evt: AuthEvt}> {
    return this._nss.isOnline$.pipe(
      withLatestFrom(this._nss.statusHistory$),
      map(([isOnline, statusHistory]) => {
        const token = this.getAuthToken();
        if (!token) {
          return {token: false, evt: 'no auth token'} as {token: boolean; evt: AuthEvt};
        }
        const tokenCheck = !isTokenExpired(token);
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
   * Synchronously checks whether a non expired JWT auth token is stored,
   * applying the expiry tolerance window.
   * @returns True if the stored token can still be used.
   */
  hasValidAuthToken(): boolean {
    return !isTokenExpired(this.getAuthToken());
  }

  /**
   * @returns The expiry of the stored auth token as epoch milliseconds,
   * or null when it cannot be determined.
   */
  getAuthTokenExpiry(): number | null {
    return tokenExpiresAt(this.getAuthToken());
  }

  /**
   * Performs the actual refresh http call. Always go through
   * {@link refreshToken}, which shares the call between concurrent requesters.
   * @param authEvt The authentication event string identifier
   * @param refreshToken? An optional refresh token provided
   * @returns True if the token was successfully refreshed.
   */
  private _requestTokenRefresh(authEvt: AuthEvt, refreshToken?: string): Observable<boolean> {
    return this._authConfig.pipe(
      take(1),
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
            tap(res => {
              // Persist the new tokens BEFORE emitting the auth event: the
              // subscribers woken up by it read the token from the storage, and
              // would otherwise reuse the expired one.
              this._storeRefreshToken(res.refreshToken);
              this._persistAuthToken(res.accessToken ?? res.token ?? null);
              // Then the auth state, and only afterwards the token stream: the
              // sync setup samples `authenticated` when `authToken` emits, so a
              // token emitted while the state still says "not authenticated"
              // stops the replications instead of starting them.
              if (authEvt !== 'reset password') {
                this.authenticated.next({auth: true, evt: authEvt});
              }
              this.tokenRefreshedEvt.emit();
              this.authToken.next(res.accessToken ?? res.token ?? null);
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
              // The authentication state is deliberately left alone. One failed
              // refresh is a transient event, and reporting it as "not
              // authenticated" used to reset the permission context, stop every
              // replication and empty the menu - a whole session dismantled by a
              // single 401 that the next attempt may well recover from. Whoever
              // decides the session is over calls `endSession`; the callers that
              // budget their attempts do it when they run out.
              return obsOf(false);
            }),
          );

        return this._nss.isOnline$.pipe(
          take(1),
          switchMap(isOnline => {
            if (!isOnline) {
              // Offline there is nothing to refresh: report success so that
              // callers keep working on cached data instead of logging out.
              // The pre-emptive timer that led here has been consumed, and no
              // new token will be stored to re-arm it: without this the session
              // would run to expiry with no timer armed at all, leaving the
              // refresh to the reactive paths only.
              this._schedulePreemptiveRefresh(this.getAuthToken(), OFFLINE_PREEMPTIVE_RETRY_DELAY);
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
   * Schedules a pre-emptive refresh at 75% of the token lifetime, replacing any
   * previously scheduled one. Called every time a new auth token is stored.
   * @param token The freshly stored JWT auth token.
   * @param minDelay The lower bound for the timer, in milliseconds. Raised by
   * the callers that re-arm a timer whose refresh could not run, so that the
   * retry is not immediate.
   */
  private _schedulePreemptiveRefresh(
    token: string | null,
    minDelay: number = MIN_PREEMPTIVE_REFRESH_DELAY,
  ): void {
    this._clearPreemptiveRefresh();
    if (token == null || decodeJwt(token) == null) {
      return;
    }
    const expiresAt = tokenExpiresAt(token);
    if (expiresAt == null || isTokenExpired(token)) {
      // Nothing to pre-empt: the reactive paths (interceptor, guard) take over.
      return;
    }
    const now = new Date().getTime();
    const issuedAt = tokenIssuedAt(token) ?? now;
    const lifetime = expiresAt - issuedAt;
    if (lifetime <= 0) {
      return;
    }
    const delay = Math.max(minDelay, issuedAt + lifetime * PREEMPTIVE_REFRESH_RATIO - now);
    this._preemptiveRefreshTimeout = setTimeout(() => {
      this._preemptiveRefreshTimeout = null;
      if (this.getRefreshToken() == null) {
        return;
      }
      this.refreshToken().subscribe();
    }, delay);
  }

  /**
   * Cancels the pending pre-emptive refresh timer, if any.
   */
  private _clearPreemptiveRefresh(): void {
    if (this._preemptiveRefreshTimeout != null) {
      clearTimeout(this._preemptiveRefreshTimeout);
      this._preemptiveRefreshTimeout = null;
    }
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
   * Write the JWT auth token to the storage and re-arm the pre-emptive refresh,
   * without notifying the `authToken` subscribers.
   * Callers that also change the authentication state must emit `authenticated`
   * between this call and {@link authToken}, because consumers sample the auth
   * state when the token emits.
   * @param token The JWT auth token
   */
  private _persistAuthToken(token: string | null): void {
    if (this._authConfig.value.storeAuthToken != null) {
      this._authConfig.value.storeAuthToken(token);
    } else if (token == null) {
      localStorage.removeItem(this._getAuthTokenLocaleStorageKey());
    } else {
      localStorage.setItem(this._getAuthTokenLocaleStorageKey(), token);
    }
    this._schedulePreemptiveRefresh(token);
  }

  /**
   * Store the JWT auth token.
   * If a custom function is not provided, the JWT auth token will be stored in the local storage.
   * @param token The JWT auth token
   */
  private _storeAuthToken(token: string | null): void {
    // Write the token to the storage FIRST, then notify: `authToken`
    // subscribers (sync setup, queries) read the token back from the storage,
    // so emitting first makes them pick up the old, expired token.
    this._persistAuthToken(token);
    this.authToken.next(token);
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
      if (!check.token && this.getRefreshToken() != null) {
        // An expired access token with a refresh token in hand is a session to
        // be renewed, not one that ended. This subscription outlives the whole
        // service and re-runs on every network transition, so reporting it as
        // "not authenticated" tore the session down at every reconnection - and
        // a device coming back after days offline always holds an expired token.
        // What decides is the refresh: it reports its own success, and the paths
        // that give up on it call `endSession`.
        return;
      }
      this.authenticated.next({auth: check.token, evt: check.evt});
    });
  }

  /**
   * Decodes and parses a Jwt token.
   * Malformed tokens yield null instead of throwing a synchronous error that
   * would tear down the calling stream.
   * @param token The token to be decoded.
   * @returns The decoded token, or null if it could not be decoded.
   */
  decodeAuthToken(token: string | null = this.getAuthToken()): JwtToken | null {
    return decodeJwt(token);
  }
}
