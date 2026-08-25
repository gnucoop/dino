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

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of as obsOf, throwError} from 'rxjs';
import {catchError, filter, skip, switchMap, take} from 'rxjs/operators';

import {AuthService} from './auth-service';
import {buildAuthorizationHeader, hasJwtAuthError} from './auth-utils';
import {NetworkStatusService} from './network-status.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  /**
   * Emits when a http request fails authentication and a refresh token attempt
   * is started. Informational: the retry is handled inline by `intercept`, so
   * that the refreshed response is delivered back to the original caller.
   */
  handleRefreshEvt: EventEmitter<[HttpRequest<any>, HttpHandler]> = new EventEmitter<
    [HttpRequest<any>, HttpHandler]
  >();

  /**
   * Emits when the counter reaches the retry attempts max
   * and asks user to log in again
   */
  private _logoutEvt: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Counter of the retry attemps for refreshing the token.
   * If the counter reaches the retry attempts max, the user is
   * redirected to the login page, and asked to log in again.
   * Reset on every successful refresh, so that a later idle cycle starts over.
   */
  private _retryAttempts: number = 0;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _nss: NetworkStatusService,
  ) {
    // A successful refresh clears the budget: without this the second idle
    // cycle of a session exhausts the attempts and logs the user out.
    this._authService.tokenRefreshedEvt.subscribe(() => (this._retryAttempts = 0));

    this._logoutEvt.pipe(switchMap(() => this._authService.logout())).subscribe(res => {
      if (res) {
        this._router.navigate([this._authService.authConfig.failedAuthRedirect, 'expired']);
      }
    });

    this._nss.isOnline$
      .pipe(
        filter(res => res === true),
        skip(1),
        // Re-evaluate the token on each reconnection instead of reusing the
        // check built when the interceptor was constructed.
        switchMap(() => this._authService.checkToken().pipe(take(1))),
        switchMap(check => {
          // `check` is an object: test its `token` property, or the condition
          // is always false and the reconnection refresh never happens.
          if (!check.token) {
            return this._authService.refreshToken().pipe(
              take(1),
              switchMap(refreshed => {
                if (refreshed) {
                  return obsOf(true);
                }
                // No logout here. The `online` event fires on link-up, not on
                // working connectivity, so the first refresh after a long
                // offline stretch is a prime candidate for a transient failure -
                // and the refresh reports the same negative result for a 5xx, a
                // timeout and a revoked refresh token. Tearing the session down
                // would destroy the local database, with the data collected
                // offline and not pushed yet. The reactive paths retry: the
                // guard on the next navigation, the sync on the next cycle.
                this._authService.authenticated.next({auth: false, evt: 'refresh failed'});
                return obsOf(false);
              }),
            );
          }
          return obsOf(false);
        }),
      )
      .subscribe();
  }

  /**
   * Intercepts http requests from angular http client.
   * A request failing authentication - either with a 401/400 status or with a
   * GraphQL `invalid-jwt`/`JWTExpired` error inside a 200 response - triggers a
   * token refresh and is then replayed, so the caller receives the real
   * response instead of a null one.
   * @param request the Http request.
   * @param next the request handler.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      switchMap(event => {
        // Hasura answers HTTP 200 with an `errors` array when the JWT is
        // expired, so a successful response has to be inspected too.
        if (
          event instanceof HttpResponse &&
          hasJwtAuthError(event.body) &&
          !this._isAllowedRequest(request)
        ) {
          return this._handleAuthFailure(request, next);
        }
        return obsOf(event);
      }),
      catchError(error => {
        if (
          error instanceof HttpErrorResponse &&
          (error.status === 401 || error.status === 400) &&
          !this._isAllowedRequest(request)
        ) {
          return this._handleAuthFailure(request, next);
        }
        return throwError(() => error);
      }),
    ) as Observable<HttpEvent<any>>;
  }

  /**
   * Refreshes the auth token and replays the failed request.
   * The refresh call is shared by the auth service, so concurrent failures
   * result in a single refresh request.
   * @param request the Http request that failed authentication.
   * @param next the request handler.
   * @returns the response of the replayed request.
   */
  private _handleAuthFailure(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this.handleRefreshEvt.emit([request, next]);
    return this._nss.isOnline$.pipe(
      take(1),
      switchMap(isOnline => {
        if (!isOnline) {
          // Offline: do not refresh, do not log out. Surface the failure to the
          // caller, which falls back to the local data.
          return throwError(() => new Error('Offline: could not authenticate the request'));
        }
        // A refresh already in flight is joined, not started: it has already
        // spent its attempt. Counting it again turns several requests failing
        // inside one refresh round trip - a handful of parallel uploads with an
        // expired token, say - into a logout, because the budget is 1 in every
        // environment, and the logout destroys the local database.
        if (!this._authService.isRefreshing) {
          if (this._retryAttempts >= this._authService.authConfig.retryAttemptsMax) {
            this._authService.authenticated.next({auth: false, evt: 'refresh failed'});
            if (this._authService.getAuthToken() != null) {
              this._logoutEvt.emit();
            }
            return throwError(() => new Error('Auth token refresh attempts exhausted'));
          }
          this._retryAttempts++;
        }
        return this._authService.refreshToken().pipe(
          take(1),
          switchMap(refreshed => {
            if (!refreshed) {
              return throwError(() => new Error('Could not refresh the auth token'));
            }
            return next.handle(this._withCurrentToken(request));
          }),
        );
      }),
    );
  }

  /**
   * Rebuilds a request with the token currently stored, so that a replay after a
   * refresh does not reuse the expired one it was built with.
   * Only a Bearer header is replaced: a request carrying no Authorization, or one
   * authenticated with a static api key, is replayed untouched.
   * @param request the request to be replayed.
   * @returns the request to hand to the next handler.
   */
  private _withCurrentToken(request: HttpRequest<any>): HttpRequest<any> {
    const current = request.headers.get('Authorization');
    if (current == null || !current.startsWith('Bearer ')) {
      return request;
    }
    const token = this._authService.getAuthToken();
    if (token == null) {
      return request;
    }
    return request.clone({setHeaders: {Authorization: buildAuthorizationHeader(token)}});
  }

  /**
   * Checks wether a http request should trigger the Refresh handling.
   * @param request the Http request.
   * @returns true if it's an allowed request.
   */
  private _isAllowedRequest(request: HttpRequest<any>): boolean {
    const defaultLoginEndpoint = this._authService.authConfig.nHostAuth
      ? 'signin/email-password'
      : 'api/login';
    const loginEndpoint = this._authService.authConfig.loginEndpoint ?? defaultLoginEndpoint;
    if (loginEndpoint && request.url.includes(loginEndpoint)) {
      return true;
    }
    if (request.url.includes('api/login') || request.url.includes('instances')) {
      return true;
    }
    if (request.url.includes('/signup/email-password')) {
      // Signup error, like:
      // {"status": 400, "message": "\"email\" must be a valid email", "error": "invalid-request"}
      return true;
    }
    const refreshEndpoint =
      this._authService.authConfig.refreshEndpoint ??
      (this._authService.authConfig.nHostAuth ? 'token' : 'api/jwt/refresh');
    if (this._matchesEndpoint(request.url, refreshEndpoint)) {
      // A failing refresh must never trigger another refresh.
      return true;
    }
    return false;
  }

  /**
   * Checks whether a request url targets the given endpoint.
   * Matches on the url path, so short endpoint names such as the nHost `token`
   * one do not match unrelated urls that merely contain the word.
   * @param url the request url.
   * @param endpoint the endpoint path.
   * @returns true if the url path ends with the endpoint.
   */
  private _matchesEndpoint(url: string, endpoint: string): boolean {
    const normalized = endpoint.replace(/^\/+|\/+$/g, '');
    if (!normalized) {
      return false;
    }
    const path = url.split('?')[0].replace(/\/+$/, '');
    return path.endsWith(`/${normalized}`);
  }
}
