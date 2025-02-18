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

/**
 * Type that identifies an action performed by the User
 */
export type ActionType =
  | 'delete'
  | 'print'
  | 'docx'
  | 'download'
  | 'duplicate'
  | 'bulkFormEdit'
  | 'edit'
  | 'view'
  | 'viewlog'
  | 'select'
  | 'expand'
  | 'status edit'
  | 'addFavorite'
  | 'removeFavorite'
  | 'backup'
  | 'restore'
  | 'print badge';

/**
 * The actions that are supposed to always be visible, when available.
 */
export const mainActions: ActionType[] = ['edit', 'view'];

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
