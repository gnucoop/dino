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

import {InsertModel} from './insert-model';
import {Model} from './model';

/**
 * The Context of the Permission
 */
export interface PermissionContext {
  /**
   * The User performing the operation
   */
  user: User | null;

  /**
   * The additional context info
   */
  [contextDataKey: string]: any;
}

/**
 * The data used to update the Context
 */
export interface PermissionContextDataUpdate {
  [prop: string]: any;
}

/**
 * The data used to evaluate Visualization permissions
 */
export interface CanViewData<M extends Model = Model> {
  /**
   * The document to be viewed
   */
  object: M;

  /**
   * The Context of the operation
   */
  context?: PermissionContext;
}

/**
 * The data used to evaluate Creation permissions
 */
export interface CanCreateData<M extends Model = Model> {
  /**
   * The document to be created
   */
  object: InsertModel<M>;

  /**
   * The Context of the operation
   */
  context?: PermissionContext;
}

/**
 * The data used to evaluate Modification permissions
 */
export interface CanModifyData<M extends Model = Model> {
  /**
   * The data used to modify the document
   */
  data: Partial<M> & {id: string};

  /**
   * The document to be modified
   */
  object: M;

  /**
   * The Context of the operation
   */
  context?: PermissionContext;
}

/**
 * The data used to evaluate Deletion permissions
 */
export interface CanDeleteData<M extends Model = Model> {
  /**
   * The document to be deleted
   */
  object: M;

  /**
   * The Context of the operation
   */
  context?: PermissionContext;
}
