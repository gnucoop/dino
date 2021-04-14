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

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {EventEmitter, Inject, Injectable} from '@angular/core';
import {Observable, of as obsOf, throwError} from 'rxjs';
import {catchError, debounceTime, map, switchMap} from 'rxjs/operators';

import {AuthService} from './auth-service';
import {AUTH_SERVICE_CONFIG, AuthServiceConfig} from './auth-service-config';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  /**
   * Emits when a http request returns a 401 error response after
   * a refresh token attempt.
   */
  handleRefreshEvt: EventEmitter<[HttpRequest<any>, HttpHandler]> =
      new EventEmitter<[HttpRequest<any>, HttpHandler]>();

  constructor(
      private _authService: AuthService,
      @Inject(AUTH_SERVICE_CONFIG) private _config: AuthServiceConfig,
  ) {
    this.handleRefreshEvt
        .pipe(
            debounceTime(this._config.retryRefreshTime ?? 5000),
            map(([request, next]) => this._authService.refreshToken().pipe(
                    switchMap(() => next.handle(request)),
                    )),
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
                 if (error instanceof HttpErrorResponse && error.status === 401 &&
                     !this._isLoginRequest(request)) {
                   this.handleRefreshEvt.emit([request, next]);
                   return obsOf(null);
                 }
                 return throwError(error);
               }),
               ) as Observable<HttpEvent<any>>;
  }

  /**
   * Checks wether a http request is a Login request, by checking its url and
   * matching it with the api login endpoint url.
   * @param request the Http request.
   * @returns true if it's a Login request.
   */
  private _isLoginRequest(request: HttpRequest<any>): boolean {
    const loginEndpoint = this._config.loginEndpoint;
    if (loginEndpoint && request.url.includes(loginEndpoint)) {
      return true;
    }
    if (request.url.includes('api/login')) {
      return true;
    }
    return false;
  }
}
