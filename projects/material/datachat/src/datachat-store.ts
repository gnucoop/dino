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
import {Injectable} from '@angular/core';

import {DataChatQA} from './datachat.interfaces';

/**
 * The name of the IndexedDB database holding the DataChat conversations.
 * It is a standalone database, unrelated to the RxDB one: it is never
 * registered as a DataService collection, so it is never synced with the
 * backend and it is not destroyed when the User logs out.
 */
const DB_NAME = 'dino_datachat';

/**
 * The version of the IndexedDB database.
 */
const DB_VERSION = 1;

/**
 * The name of the object store holding the conversations.
 */
const STORE_NAME = 'conversations';

/**
 * The name of the index used to list the conversations of a scope.
 */
const SCOPE_INDEX = 'by_scope';

/**
 * A stored DataChat conversation.
 */
export interface DataChatConversation {
  /**
   * The unique id of the conversation
   */
  id: string;
  /**
   * The `<userId>|<formSchemaId>` the conversation belongs to
   */
  scope: string;
  /**
   * The title of the conversation, built from its first question.
   * Empty until the User asks something.
   */
  title: string;
  /**
   * Creation timestamp
   */
  createdAt: number;
  /**
   * Last update timestamp, used to sort the conversations list
   */
  updatedAt: number;
  /**
   * The chat entries of the conversation
   */
  messages: DataChatQA[];
}

/**
 * Persists the DataChat conversations in a dedicated IndexedDB database, so
 * that a User can leave the AI view - or close the browser - and find the
 * conversations again.
 *
 * This store is deliberately kept outside of the RxDB database:
 * - it is not a DataService collection, so it is never picked up by the
 *   GraphQL replication and never leaves the browser;
 * - it is not destroyed by DataService.destroyAllCollections() on logout,
 *   which is what makes the history permanent. Conversations are scoped by
 *   user id so that two Users of the same browser never see each other's chats.
 *
 * When IndexedDB is unavailable (private browsing, tests) the store silently
 * degrades to an in-memory map: the chat keeps working, the history just does
 * not survive the reload.
 */
@Injectable({providedIn: 'root'})
export class DataChatStore {
  /**
   * The database connection, opened lazily.
   */
  private _db: Promise<IDBDatabase | null> | null = null;

  /**
   * In-memory fallback, used when IndexedDB is not available.
   */
  private _memory: Map<string, DataChatConversation> = new Map();

  /**
   * Builds the scope of the conversations of a User on a Form Schema.
   * @param userId The active user id
   * @param schemaId The Form Schema id
   */
  scope(userId: string, schemaId: string): string {
    return `${userId}|${schemaId}`;
  }

  /**
   * Lists the conversations of a scope, most recently updated first.
   * @param scope The conversations scope
   */
  async list(scope: string): Promise<DataChatConversation[]> {
    const db = await this._open();
    if (db == null) {
      return [...this._memory.values()]
        .filter(conv => conv.scope === scope)
        .sort((a, b) => b.updatedAt - a.updatedAt);
    }
    const conversations = await this._request<DataChatConversation[]>(store =>
      store.index(SCOPE_INDEX).getAll(scope),
    );
    return (conversations ?? []).sort((a, b) => b.updatedAt - a.updatedAt);
  }

  /**
   * Reads a single conversation.
   * @param id The conversation id
   */
  async get(id: string): Promise<DataChatConversation | null> {
    const db = await this._open();
    if (db == null) {
      return this._memory.get(id) ?? null;
    }
    const conversation = await this._request<DataChatConversation | undefined>(store =>
      store.get(id),
    );
    return conversation ?? null;
  }

  /**
   * Inserts or updates a conversation.
   * @param conversation The conversation to store
   */
  async put(conversation: DataChatConversation): Promise<void> {
    const db = await this._open();
    if (db == null) {
      this._memory.set(conversation.id, conversation);
      return;
    }
    await this._request(store => store.put(conversation), 'readwrite');
  }

  /**
   * Deletes a conversation.
   * @param id The conversation id
   */
  async remove(id: string): Promise<void> {
    const db = await this._open();
    if (db == null) {
      this._memory.delete(id);
      return;
    }
    await this._request(store => store.delete(id), 'readwrite');
  }

  /**
   * Deletes every conversation of a scope.
   * @param scope The conversations scope
   */
  async clearScope(scope: string): Promise<void> {
    const conversations = await this.list(scope);
    for (const conversation of conversations) {
      await this.remove(conversation.id);
    }
  }

  /**
   * Opens the database, creating the object store on first use.
   * Resolves to null when IndexedDB is not usable: every public method then
   * falls back to the in-memory map.
   */
  private _open(): Promise<IDBDatabase | null> {
    if (this._db != null) {
      return this._db;
    }
    this._db = new Promise<IDBDatabase | null>(resolve => {
      if (typeof indexedDB === 'undefined') {
        resolve(null);
        return;
      }
      try {
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            const store = db.createObjectStore(STORE_NAME, {keyPath: 'id'});
            store.createIndex(SCOPE_INDEX, 'scope', {unique: false});
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
        request.onblocked = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
    return this._db;
  }

  /**
   * Runs an operation on the conversations object store.
   * @param operation The operation to run
   * @param mode The transaction mode
   * @returns The result of the operation, or null on failure
   */
  private async _request<T>(
    operation: (store: IDBObjectStore) => IDBRequest,
    mode: IDBTransactionMode = 'readonly',
  ): Promise<T | null> {
    const db = await this._open();
    if (db == null) {
      return null;
    }
    return new Promise<T | null>(resolve => {
      try {
        const transaction = db.transaction(STORE_NAME, mode);
        const request = operation(transaction.objectStore(STORE_NAME));
        request.onsuccess = () => resolve(request.result as T);
        request.onerror = () => resolve(null);
        transaction.onabort = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  }
}
