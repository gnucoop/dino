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
 * Prefix of the local storage key holding the id of the user a local database
 * belongs to. The database name completes it, because the claim is about one
 * database and the app can be configured with more than one name.
 *
 * The record is kept outside the database so that it can be read without opening
 * one - the login page does exactly that, before any session exists.
 */
export const DB_OWNER_STORAGE_KEY_PREFIX = 'dino_db_owner:';

/**
 * @param databaseName The name of the local database.
 * @returns The local storage key holding the owner of that database.
 */
export function dbOwnerStorageKey(databaseName: string): string {
  return `${DB_OWNER_STORAGE_KEY_PREFIX}${databaseName}`;
}

/**
 * @param databaseName The name of the local database.
 * @returns The id of the user that database belongs to, or null when no owner is
 * recorded - either because nobody ever logged in on this device, or because the
 * database was removed.
 */
export function localDataOwner(databaseName: string): string | null {
  return localStorage.getItem(dbOwnerStorageKey(databaseName));
}

/**
 * Every user id recorded as the owner of a local database on this device.
 *
 * For the callers that have no database configuration to read a name from: the
 * login page shows the warning about data left behind before anything has been
 * configured for a session.
 *
 * @returns The recorded owners, empty when this device holds no data.
 */
export function localDataOwners(): string[] {
  const owners: string[] = [];
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (key == null || !key.startsWith(DB_OWNER_STORAGE_KEY_PREFIX)) {
      continue;
    }
    const owner = localStorage.getItem(key);
    if (owner != null && owner !== '') {
      owners.push(owner);
    }
  }
  return owners;
}
