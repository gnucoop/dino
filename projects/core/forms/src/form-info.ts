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

import {FormStatus} from './form-status';
import {UserData, UserGroup} from '@dino/core/users';

/**
 * Represents all the info related to a Form Data that can be used in an AjfForm context
 */
export type FormInfo = {
  /**
   * The form data status
   */
  status: FormStatus | null;
  /**
   * All possible statuses
   */
  allStatuses: FormStatus[];
  /**
   * The creator of the form
   */
  user: UserData | null;
  /**
   * The creator permission groups
   */
  userGroups: UserGroup[] | null;
  /**
   * The currently active user
   */
  activeUser: UserData | null;
  /**
   * The active user permission groups
   */
  activeUserGroups: UserGroup[] | null;

  /**
   * The selected created_at form date
   */
  createdAt: Date | null;
};
