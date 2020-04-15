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
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from '@dewco/core/auth';
import {Observable, of as obsOf, throwError} from 'rxjs';

@Injectable()
export class DemoHttpInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService) {}

  private _loginToken = 'login_Token';
  private _loginRefreshToken = 'login_RefreshToken';
  private _newToken = 'new_Token';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url === 'http://auth-backend/api/login') {
      const body = (req.body || {loginId: '', password: ''}) as {
        loginId: string;
        password: string;
      };
      if (body.loginId === 'user@dewco.io' && body.password === 'dewco') {
        return obsOf(new HttpResponse({
          status: 200,
          body: {
            token: this._loginToken,
            refreshToken: this._loginRefreshToken,
            user: {email: body.loginId},
          },
        }));
      }
      return throwError(new HttpErrorResponse({status: 400}));
    }
    if (req.url === 'http://auth-backend/api/jwt/refresh') {
      if (this._authService.getRefreshToken() === this._loginRefreshToken) {
        return obsOf(new HttpResponse({
          status: 200,
          body: {token: this._newToken},
        }));
      }
      return throwError(new HttpErrorResponse({status: 400}));
    }
    if (req.url === 'http://auth-backend/access_data') {
      if (this._authService.getAuthToken() === this._newToken) {
        return obsOf(new HttpResponse({
          status: 200,
          body: {data: 'Here is the data!'},
        }));
      }
      return throwError(new HttpErrorResponse({status: 401}));
    }
    return next.handle(req);
  }
}
