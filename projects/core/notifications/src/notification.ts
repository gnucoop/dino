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
import {Model} from '@dino/core/data';
import {MigrationStrategies} from 'rxdb';

/**
 * Represents types of notification messages
 */
export type NotificationType = 'info' | 'warning' | 'alert';

/**
 * This model is used to store Notifications.
 * @title Notification
 */
export interface Notification extends Model {
  /**
   * Specifies the Dino User IDS able to see and read this notification
   */
  recipients: string[];

  /**
   * Specifies the Dino User IDS of users that have read this notification
   */
  readers: string[];

  /**
   * The notification's text message
   */
  text: string | null;

  /**
   * Specifies the Type of the notification message
   */
  type: NotificationType | null;

  /**
   * The notification optional icon identifier
   */
  icon?: string;

  /**
   * The optional URL where the user is redirected upon clicking
   */
  redirect_url?: string;
}

export const VERSION = 0;

export const migrationStrategies: MigrationStrategies = {};
