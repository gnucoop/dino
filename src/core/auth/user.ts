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

import {Registration} from './registration';
import {TwoFactorDelivery} from './two-factor-delivery';
import {UsernameStatus} from './username-status';

/**
 * The FusionAuth user.
 */
export interface User {
  /**
   * The User’s unique Id.
   */
  id: string;

  /**
   * The User’s email address.
   */
  email: string;

  /**
   * The User’s first name.
   */
  firstName: string;

  /**
   * The User’s last name.
   */
  lastName: string;

  /**
   * True if the User is active. False if the User has been deactivated. Deactivated Users will
   * not be able to login.
   */
  active: boolean;

  /**
   * Whether or not the User’s email has been verified.
   */
  verified: boolean;

  /**
   * The Id of the Tenant that this User belongs to.
   */
  tenantId: string;

  /**
   * The instant when user was created.
   */
  insertInstant: number;

  /**
   * The instant when the User logged in last.
   */
  lastLoginInstant: number;

  /**
   * ndicates that the User’s password needs to be changed during their next login attempt.
   */
  passwordChangeRequired: boolean;

  /**
   * The instant that the User last changed their password.
   */
  passwordLastUpdateInstant: number;

  /**
   * Determines if the User has two factor authentication enabled for their account or not.
   */
  twoFactorEnabled: boolean;

  /**
   * The User’s preferred delivery for verification codes during a two factor login request.
   * The possible values are:
   * - None
   * - TextMessage
   */
  twoFactorDelivery: TwoFactorDelivery;

  /**
   * The current status of the username. The possible values are:
   * ACTIVE - the username is active
   * PENDING - the username is pending approval/moderation
   * REJECTED - the username was rejected during moderation
   */
  usernameStatus: UsernameStatus;

  /**
   * The list of registrations for the User.
   */
  registrations: Registration[];
}
