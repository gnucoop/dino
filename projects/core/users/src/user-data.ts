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
import {User} from '@dino/core/auth';
import {Model} from '@dino/core/data';
import {MigrationStrategies, RxDocument} from 'rxdb';

/**
 * This model is used to store Users.
 * @title UserData
 */
export interface UserData extends Omit<User<{}>, 'id'>, Model {
  /**
   * The User fullname.
   */
  full_name: string;

  /**
   * The Permission Groups (by ID) associated with the User.
   */
  user_group_ids: string[];

  /**
   * The UUID of the authenticated user on the authentication server.
   */
  user_auth_ref_id: string | null;

  /**
   * If true, the user authentication is temporarily Disabled
   */
  disabled?: boolean;
}

export const VERSION = 1;

export const migrationStrategies: MigrationStrategies = {
  1: (doc: RxDocument<UserData>) => ({...doc, disabled: false}),
};
