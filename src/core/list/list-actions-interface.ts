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

import {Model} from '../data';

/**
 * Type that identifies an action performed on a List item
 */
export type ActionType = 'delete'|'print'|'download'|'edit'|'view'|'select'|'expand';

/**
 * Action performed on a List item
 */
export interface ListAction {
  /**
   * The type of the action
   */
  actionType: ActionType;

  /**
   * The Material Icon for the action
   */
  matIcon?: string;

  /**
   * A custom action to be performed
   */
  customAction?: (row: any) => void;

  /**
   * User confirmation is needed if set to true
   */
  askConfirm?: boolean;
}
