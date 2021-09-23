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
import {DataModelManager, DataService, PermissionContextService} from '@dewco/core/data';
import {Observable, of as obsOf} from 'rxjs';
import {shareReplay, switchMap, take, tap} from 'rxjs/operators';

import {migrationStrategies, UserModel} from './user-model';
import {schema} from './user-model-json';
import {UsersModule} from './users.module';

/**
 * Service that manages User Roles
 */
@Injectable({providedIn: UsersModule})
export class UserModelManager extends DataModelManager<UserModel> {
  constructor(
      private _authService: AuthService,
      dataService: DataService,
      permissionContextService: PermissionContextService,
  ) {
    super(
        {collection: {name: 'user_model', schema, migrationStrategies}}, dataService,
        permissionContextService);
  }

  /**
   * Gets the UserModel of the active user.
   * @returns The user model data
   */
  getActiveUserModel(): Observable<UserModel|null> {
    return this._authService.authenticated.pipe(
        switchMap(_ => {
          const userId = this._authService.getUserInfo()?.id;
          if (userId == null) {
            return obsOf(null);
          }
          return this.get(userId).pipe(shareReplay(1));
        }),
        tap(userModel => {
          this.addToContext({userModel: userModel});
        }),
        take(1),
    );
  }
}
