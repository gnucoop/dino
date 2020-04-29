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

import {Injectable} from '@angular/core';
import {AuthService} from '@dewco/core/auth';
import {
  combineLatest,
  Observable,
  Subject,
} from 'rxjs';
import {
  debounceTime,
  map,
  scan,
  shareReplay,
  startWith,
} from 'rxjs/operators';

import {PermissionContext, PermissionContextDataUpdate} from './data-permission-interface';

/**
 * Service that provides a Context for the DataModelManager and is augmented by the
 * concrete Managers inheriting from DataModelManager
 */
@Injectable({providedIn: 'root'})
export class PermissionContextService {
  readonly permissionContext: Observable<PermissionContext>;

  private _basePermissionContext: Observable<PermissionContext>;
  private _permissionContextDataUpdate: Subject<PermissionContextDataUpdate> =
      new Subject<PermissionContextDataUpdate>();

  constructor(authService: AuthService) {
    this._basePermissionContext = authService.authenticated.pipe(
        map(authenticated => ({user: authenticated ? authService.getUserInfo() : null})),
    );

    const ctxUpdate = this._permissionContextDataUpdate.pipe(
        scan((acc, val) => ({...acc, ...val}), {} as PermissionContextDataUpdate),
        startWith({}),
    );

    this.permissionContext =
        combineLatest(this._basePermissionContext, ctxUpdate)
            .pipe(
                map(([baseContext, contextUpdate]) => ({...baseContext, ...contextUpdate})),
                debounceTime(300),
                shareReplay(1),
            );
  }

  /**
   * Adds additional data to the Context, which will be globally available
   */
  addToContext(param: PermissionContextDataUpdate): void {
    this._permissionContextDataUpdate.next(param);
  }
}
