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
 * Prefix of the local storage key holding the owner of a local database. The
 * database name completes it, because the claim is about one database and the app
 * can be configured with more than one name.
 *
 * The record is kept outside the database so that it can be read without opening
 * one, and it survives everything but the removal of the data it describes - in
 * particular {@link AuthService.resetAuth}, which the login page runs on every
 * visit and which takes the tokens and the user info with it.
 */
export const DB_OWNER_STORAGE_KEY_PREFIX = 'dino_db_owner:';

/**
 * The owner of a local database.
 */
export interface LocalDataOwner {
  /**
   * The user id, used to tell whether the person logging in is the same one.
   */
  id: string;

  /**
   * How to name the account to a human - an email, a display name - or null when
   * nothing was available when the record was written.
   *
   * Stored next to the id on purpose: the login page has to name the account
   * whose data is sitting on the device, and by the time it renders there is no
   * session, no user info and no auth config left to ask.
   */
  label: string | null;
}

/**
 * @param databaseName The name of the local database.
 * @returns The local storage key holding the owner of that database.
 */
export function dbOwnerStorageKey(databaseName: string): string {
  return `${DB_OWNER_STORAGE_KEY_PREFIX}${databaseName}`;
}

/**
 * Parses a stored owner record.
 *
 * A plain string is accepted as the id: that is what the first version of this
 * record wrote, and a device upgrading must not look unowned.
 *
 * @param raw The stored value.
 * @returns The owner, or null when there is nothing usable.
 */
function parseOwner(raw: string | null): LocalDataOwner | null {
  if (raw == null || raw === '') {
    return null;
  }
  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed === 'string') {
      return {id: parsed, label: null};
    }
    if (parsed != null && typeof parsed.id === 'string' && parsed.id !== '') {
      return {id: parsed.id, label: typeof parsed.label === 'string' ? parsed.label : null};
    }
    return null;
  } catch {
    // Not json: the legacy record, a bare user id.
    return {id: raw, label: null};
  }
}

/**
 * @param databaseName The name of the local database.
 * @returns The owner of that database, or null when no owner is recorded - either
 * because nobody ever logged in on this device, or because the database was
 * removed.
 */
export function localDataOwner(databaseName: string): LocalDataOwner | null {
  return parseOwner(localStorage.getItem(dbOwnerStorageKey(databaseName)));
}

/**
 * Records who a local database belongs to.
 *
 * @param databaseName The name of the local database.
 * @param owner The owner to record.
 */
export function storeLocalDataOwner(databaseName: string, owner: LocalDataOwner): void {
  localStorage.setItem(dbOwnerStorageKey(databaseName), JSON.stringify(owner));
}

/**
 * Forgets who a local database belonged to. To be called when its data is gone,
 * so that the record does not claim data that no longer exists.
 *
 * @param databaseName The name of the local database.
 */
export function removeLocalDataOwner(databaseName: string): void {
  localStorage.removeItem(dbOwnerStorageKey(databaseName));
}

/**
 * Every owner recorded on this device.
 *
 * For the callers that have no database configuration to read a name from: the
 * login page shows the warning about data left behind before anything has been
 * configured for a session.
 *
 * @returns The recorded owners, empty when this device holds no data.
 */
export function localDataOwners(): LocalDataOwner[] {
  const owners: LocalDataOwner[] = [];
  for (let index = 0; index < localStorage.length; index++) {
    const key = localStorage.key(index);
    if (key == null || !key.startsWith(DB_OWNER_STORAGE_KEY_PREFIX)) {
      continue;
    }
    const owner = parseOwner(localStorage.getItem(key));
    if (owner != null) {
      owners.push(owner);
    }
  }
  return owners;
}
