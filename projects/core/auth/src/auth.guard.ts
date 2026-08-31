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

import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {combineLatest, Observable, of as obsOf} from 'rxjs';
import {map, switchMap, take} from 'rxjs/operators';
import {AuthService} from './auth-service';
import {NetworkStatusService} from './network-status.service';

/**
 * A route guard that grants authorized access to a route,
 * checking if the user has a valid auth and/or refresh JWT token.
 * With no session at all it redirects to the login component.
 *
 * While offline the guard never blocks navigation nor redirects to the login
 * page: the refresh is attempted in background so the app keeps working on
 * cached data. Same for a session whose token cannot be renewed: the redirect
 * would be cancelled by `LoginGuard` anyway, leaving the user stuck.
 */
@Injectable({providedIn: 'root'})
export class AuthGuard {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _nss: NetworkStatusService,
  ) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // checkToken() is resubscribed on every activation so the token expiry is
    // re-evaluated, instead of reusing the value computed at bootstrap.
    return combineLatest([
      this._authService.authenticated,
      this._authService.checkToken(),
      this._nss.isOnline$,
    ]).pipe(
      take(1),
      switchMap(([authenticated, validated, isOnline]) => {
        // `validated` is an object: check its `token` property explicitly,
        // otherwise the condition is always truthy and an expired token passes.
        if (validated.token && (authenticated.auth || !isOnline)) {
          return obsOf(true);
        }
        if (!isOnline) {
          // Offline: refresh in background, never block or redirect.
          this._authService.refreshToken('init refresh').subscribe();
          return obsOf(true);
        }
        return this._authService.refreshToken('init refresh').pipe(
          take(1),
          map(refreshed => {
            if (refreshed) {
              return true;
            }
            if (authenticated.auth) {
              // A session that cannot renew its token right now keeps navigating
              // on local data, exactly as it does offline.
              return true;
            }
            // No session at all: the login page is where this belongs, and it is
            // reachable because `LoginGuard` agrees there is nothing to protect.
            return this._router.createUrlTree([this._authService.authConfig.failedAuthRedirect]);
          }),
        );
      }),
    );
  }
}
