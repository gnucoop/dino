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
} from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, of as obsOf, throwError} from 'rxjs';
import {catchError, debounceTime, filter, skip, switchMap, withLatestFrom} from 'rxjs/operators';

import {AuthService} from './auth-service';
import {NetworkStatusService} from './network-status.service';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  /**
   * Emits when a http request returns a 401 error response after
   * a refresh token attempt.
   */
  handleRefreshEvt: EventEmitter<[HttpRequest<any>, HttpHandler]> = new EventEmitter<
    [HttpRequest<any>, HttpHandler]
  >();

  /**
   * Counter of the retry attemps for refreshing the token.
   * If the counter reaches the retry attempts max, the user is
   * redirected to the login page, and asked to log in again.
   */
  private _retryAttempts: number = 0;

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _nss: NetworkStatusService,
  ) {
    this.handleRefreshEvt
      .pipe(
        withLatestFrom(this._nss.isOnline$),
        debounceTime(this._authService.authConfig.retryRefreshTime),
        switchMap(([[request, next], isOnline]) => {
          if (!isOnline) {
            return obsOf(true);
          }
          if (this._retryAttempts < this._authService.authConfig.retryAttemptsMax) {
            this._retryAttempts++;
            return this._authService.refreshToken().pipe(switchMap(() => next.handle(request)));
          } else {
            this._authService.authenticated.next({auth: false, evt: 'refresh failed'});
            if (this._authService.getAuthToken() != null) {
              this._router.navigate([this._authService.authConfig.failedAuthRedirect, 'expired']);
            }
            return obsOf(false);
          }
        }),
      )
      .subscribe();

    this._nss.isOnline$
      .pipe(
        filter(res => res === true),
        skip(1),
        withLatestFrom(this._authService.checkToken()),
        switchMap(([_, check]) => {
          if (!check) {
            return this._authService.refreshToken().pipe(
              switchMap(refreshed => {
                if (refreshed) {
                  return obsOf(true);
                } else {
                  this._authService.authenticated.next({auth: false, evt: 'refresh failed'});
                  if (this._authService.getAuthToken() != null) {
                    this._router.navigate([
                      this._authService.authConfig.failedAuthRedirect,
                      'expired',
                    ]);
                  }
                  return obsOf(false);
                }
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
   * If the response is a status 401 'Unauthorized', and is not a Login request,
   * it handles it by emitting a refreshEvent.
   * @param request the Http request.
   * @param next the request handler.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (
          error instanceof HttpErrorResponse &&
          (error.status === 401 || error.status === 400) &&
          !this._isAllowedRequest(request)
        ) {
          this.handleRefreshEvt.emit([request, next]);
          return obsOf(null);
        }
        return throwError(() => error);
      }),
    ) as Observable<HttpEvent<any>>;
  }

  /**
   * Checks wether a http request should trigger the Refresh handling.
   * @param request the Http request.
   * @returns true if it's an allowed request.
   */
  private _isAllowedRequest(request: HttpRequest<any>): boolean {
    const defaultLoginEndpoint = this._authService.authConfig.nHostAuth
      ? 'v1/auth/signin/email-password'
      : 'api/login';
    const loginEndpoint = this._authService.authConfig.loginEndpoint ?? defaultLoginEndpoint;
    if (loginEndpoint && request.url.includes(loginEndpoint)) {
      return true;
    }
    if (request.url.includes('api/login') || request.url.includes('instances')) {
      return true;
    }
    return false;
  }
}
