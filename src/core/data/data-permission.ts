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

import {
  CanCreateData,
  CanDeleteData,
  CanModifyData,
  CanViewData,
} from './data-permission-interface';
import {Model} from './model';


/**
 * Interface to check and manage User permissions.
 * Exposes methods for checking User permissions to create, delete, or modify a document
 * in a given Context.
 */
export interface Permission<T extends Model = Model> {
  canView?(data: CanViewData<T>): boolean;
  canCreate?(data: CanCreateData<T>): boolean;
  canModify?(data: CanModifyData<T>): boolean;
  canDelete?(data: CanDeleteData<T>): boolean;
}
