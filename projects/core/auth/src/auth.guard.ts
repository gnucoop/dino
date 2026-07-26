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
import {Observable} from 'rxjs';
import {map, take, withLatestFrom} from 'rxjs/operators';
import {AuthService} from './auth-service';

/**
 * A route guard that grants authorized access to a route,
 * checking if the user has a valid auth and/or refresh JWT token.
 * If the user does not, it redirects to the login component.
 */
@Injectable({providedIn: 'root'})
export class AuthGuard {
  constructor(private _router: Router, private _authService: AuthService) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authService.authenticated.pipe(
      withLatestFrom(this._authService.checkToken()),
      take(1),
      map(([authenticated, validated]) => {
        // `validated` is an object, so testing it directly was always truthy and
        // the token's expiry was never actually consulted — a route activated
        // happily with a long-expired token. Read the flag it carries.
        if (authenticated.auth && validated.token) {
          return true;
        }
        // In a local-first deployment the cached data is still usable, so a stale
        // token must not block navigation or bounce the user to the login screen;
        // refresh in the background instead. Where every read needs the server
        // (`enforceTokenExpiry`), navigation waits for the refresh and redirects
        // if it fails.
        const enforce = this._authService.config.enforceTokenExpiry === true;
        // No `debounceTime` here: `refreshToken()` emits once, so debouncing it was
        // simply a fixed delay (5s by config) before the user was let in or sent to
        // login. Bursts are now prevented properly by the single-flight guard in
        // `refreshToken()` itself.
        const refresh$ = this._authService.refreshToken('init refresh');
        if (!enforce) {
          refresh$.subscribe();
          return true;
        }
        refresh$.subscribe(res => {
          if (res) {
            this._router.navigateByUrl(state.url);
          } else {
            this._router.navigate([this._authService.config.failedAuthRedirect]);
          }
        });
        return false;
      }),
    );
  }
}
