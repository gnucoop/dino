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
import {AuthService} from '@dino/core/auth';
import {DataModelManager, DataService, PermissionContextService} from '@dino/core/data';
import {Observable, of as obsOf} from 'rxjs';
import {shareReplay, switchMap, take, tap} from 'rxjs/operators';

import {migrationStrategies, UserData} from './user-data';
import {schema} from './user-data-json';
import {UsersModule} from './users.module';

/**
 * Service that manages User Roles
 */
@Injectable({providedIn: UsersModule})
export class UserDataManager extends DataModelManager<UserData> {
  constructor(
    private _authService: AuthService,
    dataService: DataService,
    permissionContextService: PermissionContextService,
  ) {
    super(
      {name: 'user_data', collection: {schema, migrationStrategies}},
      dataService,
      permissionContextService,
    );
  }

  /**
   * Gets the UserData of the active user.
   * @returns The user data
   */
  getActiveUserData(): Observable<UserData | null> {
    return this._authService.authenticated.pipe(
      switchMap(_ => {
        const userId = this._authService.getUserInfo()?.id;
        if (userId == null) {
          return obsOf(null);
        }
        return this.get(userId).pipe(shareReplay(1));
      }),
      tap(userData => {
        this.addToContext({userData: userData});
      }),
      take(1),
    );
  }
}
