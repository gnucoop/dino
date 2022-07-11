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

import {Component, isDevMode, ViewEncapsulation} from '@angular/core';
import {AuthService} from '@dino/core/auth';
import {PermissionContextService} from '@dino/core/data';
import {SyncManager} from '@dino/core/sync';
import {distinctUntilKeyChanged, filter, skipWhile, switchMap, tap} from 'rxjs/operators';

/** Root component for the e2e-app demos. */
@Component({
  selector: 'e2e-app',
  template: '<app-main><router-outlet></router-outlet></app-main>',
  styles: [
    `
    body, html {
      height: 100%;
      width: 100%;
      position: relative;
    }
    e2e-app {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
  `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class E2eApp {
  constructor(
    private _sync: SyncManager,
    private _auth: AuthService,
    private _pcs: PermissionContextService,
  ) {
    this._auth.authenticated
      .pipe(
        skipWhile(authEvt => !authEvt.auth),
        distinctUntilKeyChanged('evt'),
        filter(
          authEvt =>
            authEvt.auth === true &&
            authEvt.evt != 'back online' &&
            authEvt.evt != 'gone offline' &&
            authEvt.evt != 'refresh successful',
        ),
        tap(authEvt => {
          if (isDevMode()) {
            console.log(authEvt);
          }
        }),
        switchMap(() => this._sync.initializeMainCollections()),
      )
      .subscribe();

    this._auth.authenticated
      .pipe(
        skipWhile(authEvt => !authEvt.auth),
        distinctUntilKeyChanged('evt'),
        filter(
          authEvt =>
            authEvt.auth === true &&
            authEvt.evt != 'back online' &&
            authEvt.evt != 'gone offline' &&
            authEvt.evt != 'refresh successful',
        ),
        tap(authEvt => {
          if (isDevMode()) {
            console.log(authEvt);
          }
        }),
        switchMap(() =>
          this._pcs.fullContext.pipe(
            filter(ctx => ctx != null),
            switchMap(() => this._sync.initializeContextualCollections()),
          ),
        ),
      )
      .subscribe();
  }
}
