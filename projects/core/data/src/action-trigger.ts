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

import {RxDocument} from 'rxdb';
import {DataModelManager} from './data-model-manager';

/**
 * The type of the Trigger event
 */
export type TriggerType =
  | 'on_status_change'
  | 'on_signup'
  | 'on_form_data_creation'
  | 'on_form_data_change'
  | 'on_form_data_export'
  | 'on_list_item_selection'
  | 'on_user_data_creation'
  | 'on_user_data_change'
  | 'on_custom_trigger';

/**
 * Represents optional info relative to an ActionTrigger
 */
export interface ActionTriggerData<T = {}> {
  /**
   * Previous value, specified in case of 'change' triggers
   */
  previousValue?: any;

  /**
   * New value, specified in case of 'change' triggers
   */
  newValue?: any;

  /**
   * The Edited or Created RxDocument
   */
  doc?: RxDocument<T>;

  /**
   * Any additional info provided
   */
  additional_info?: {[key: string]: any};
}

/**
 * Represent a trigger output event that is emitted as an Action hook
 */
export interface ActionTrigger<T = {}> {
  /**
   * The name identifier of the trigger
   */
  name: string;

  /**
   * The type of the trigger
   */
  triggerType: TriggerType;

  /**
   * The trigger optional data info
   */
  triggerData: ActionTriggerData<T> | null;
}

/**
 * Represents the automatic actions performed by the app
 * when triggering conditions are met
 */
export type Actions = {
  [trigger in TriggerType]?: {
    <T = {}>(
      trigger: ActionTrigger<T>,
      managers: {[key: string]: DataModelManager<any> | null},
      ...args: any[]
    ): any;
  } | null;
};
