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

import {Permission, CanViewData, CanDeleteData, CanModifyData} from '@dino/core/data';
import {AuthService} from '@dino/core/auth';
import {UserData} from './user-data';
import {UserGroup} from './user-group';

/**
 * Permission that forbids the Active user account to perform operations on itself.
 * (Usually the Admin, which is the only one having access to the Users section).
 */
export class UserSelfExclude implements Permission<UserData> {
  constructor(private _authService: AuthService) {}

  canDelete(data: CanDeleteData<UserData>): boolean {
    return this._checkSelf(data);
  }
  /**
   * Makes sure the UserData does not correspond to the Active user data.
   * @param data The UserData to be checked
   * @returns True if the data does NOT correspond.
   */
  private _checkSelf(
    data: CanViewData<UserData> | CanModifyData<UserData> | CanDeleteData<UserData>,
  ): boolean {
    const isItThisUser = this._authService.getUserInfo()?.id == data.object.user_auth_ref_id;
    return !isItThisUser;
  }
}

/**
 * Permission that forbids the modification of the default Admin user group.
 */
export class AdminGroupExclude implements Permission<UserGroup> {
  canModify(data: CanModifyData<UserGroup>): boolean {
    return data.object.groupName.toLowerCase() != 'admin';
  }
  canDelete(data: CanDeleteData<UserGroup>): boolean {
    return data.object.groupName.toLowerCase() != 'admin';
  }
}
