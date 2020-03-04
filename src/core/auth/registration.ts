/**
 * @license
 * Copyright (C) 2020 Gnucoop soc. coop.
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

import {UsernameStatus} from './username-status';

export interface Registration {
  /**
   * The Id of this registration.
   */
  id: string;

  /**
   * The Id of the Application that this registration is for.
   */
  applicationId: string;

  /**
   * The instant that the membership was created.
   */
  insertInstant: number;

  /**
   * The instant that the User last logged into the Application for this registration.
   */
  lastLoginInstant: number;

  /**
   * The username of the User for this registration only.
   */
  username: string;

  /**
   * The current status of the username. The possible values are:
   * ACTIVE - the username is active
   * PENDING - the username is pending approval/moderation
   * REJECTED - the username was rejected during moderation
   */
  usernameStatus: UsernameStatus;

  /**
   * The User’s preferred timezone for this registration.
   * The string will be in an IANA time zone format.
   */
  timezone: string;

  /**
   * The list of roles that the User has for this registration.
   */
  roles: string[];

  /**
   * An array of locale strings that give, in order, the User’s preferred languages
   * for this registration. These are important for email templates and other localizable text.
   */
  preferredLanguages: string[];
}
