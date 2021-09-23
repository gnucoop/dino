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
import {User} from '@dewco/core/auth';
import {Model} from '@dewco/core/data';
import {KeyFunctionMap} from 'rxdb';

/**
 * This model is used to store Users.
 * @title UserModel
 */
export interface UserModel extends Omit<User<{}>, 'id'>, Model {
  /**
   * The User fullname.
   */
  full_name: string;

  /**
   * The Permission Groups (by ID) associated with the User.
   */
  user_group_ids: string[];
}

export const VERSION = 0;

export const migrationStrategies: KeyFunctionMap = {};
