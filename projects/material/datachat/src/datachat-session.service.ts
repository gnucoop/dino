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
import {HttpClient} from '@angular/common/http';
import {Injectable, isDevMode} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {AuthService} from '@dino/core/auth';
import {BehaviorSubject} from 'rxjs';
import {filter, take} from 'rxjs/operators';

import {DataChatConversation, DataChatStore} from './datachat-store';
import {DataChatQA} from './datachat.interfaces';

/**
 * The maximum length of a conversation title, built from its first question.
 */
const TITLE_MAX_LENGTH = 60;

/**
 * How long to wait, after the last chat entry, before writing the conversation
 * to the store. Collapses the several entries of a single answer into one write.
 */
const SAVE_DEBOUNCE = 300;

/**
 * A live PandasAI agent, kept alive while the User navigates inside the form
 * section it belongs to.
 */
export interface DataChatLiveSession {
  /**
   * The Form Schema the agent was created for
   */
  schemaId: string;
  /**
   * The validated DataChat api key
   */
  apiKey: string;
  /**
   * The base url of the DataChat (Pandino) API
   */
  baseUrl: string;
  /**
   * The name of the agent destruction endpoint
   */
  endEndpoint: string;
  /**
   * The name of the User the agent was created for
   */
  userName: string;
  /**
   * The email of the User the agent was created for
   */
  userEmail: string;
}

/**
 * Owns everything of a DataChat conversation that must outlive the DataChat
 * component instance:
 * - the live PandasAI agent, so that moving between the Data, Map and AI views
 *   of a form does not destroy and recreate it (which would re-upload the whole
 *   csv and consume credits). The agent is destroyed as soon as the User leaves
 *   the form section it belongs to;
 * - the conversations of the current Form Schema, permanently stored by the
 *   DataChatStore, and the one currently displayed.
 */
@Injectable({providedIn: 'root'})
export class DataChatSessionService {
  /**
   * The currently live agent, if any.
   */
  private _live: DataChatLiveSession | null = null;

  /**
   * The api key of the currently live agent.
   */
  get apiKey(): string | null {
    return this._live?.apiKey ?? null;
  }

  /**
   * The live agent a new chat inherits, with the User it was created for.
   */
  get liveSession(): DataChatLiveSession | null {
    return this._live;
  }

  /**
   * The conversations of the currently open scope, most recent first.
   */
  readonly conversations: BehaviorSubject<DataChatConversation[]> = new BehaviorSubject<
    DataChatConversation[]
  >([]);

  /**
   * The conversation currently displayed by the chat.
   */
  readonly activeConversation: BehaviorSubject<DataChatConversation | null> =
    new BehaviorSubject<DataChatConversation | null>(null);

  /**
   * The scope (`<userId>|<formSchemaId>`) of the currently open conversations.
   */
  private _scope: string | null = null;

  /**
   * Pending debounced saves, by conversation id. One per conversation: the
   * late answer of a chat left meanwhile must not cancel the save of the
   * conversation now displayed.
   */
  private _saveTimeouts: Map<string, ReturnType<typeof setTimeout>> = new Map();

  /**
   * The Maui conversation ids, by Dino conversation id, of the conversations
   * held in memory by the live agent. They are valid only as long as that
   * agent lives, so they are never stored: a conversation resumed on another
   * agent starts over on Maui, without the context of its previous questions.
   */
  private _mauiConversations: Map<string, string> = new Map();

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private _auth: AuthService,
    private _store: DataChatStore,
  ) {
    this._router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      if (this._live && !this.isInsideForm(this._router.url, this._live.schemaId)) {
        this.endSession();
      }
    });
  }

  /**
   * Returns true if the given url belongs to the section of the given Form Schema.
   * @param url The url to test
   * @param schemaId The Form Schema id
   */
  isInsideForm(url: string, schemaId: string): boolean {
    const path = url.split('?')[0];
    return path === `/forms/${schemaId}` || path.startsWith(`/forms/${schemaId}/`);
  }

  /**
   * Returns true if an agent created for the given Form Schema is still alive.
   * @param schemaId The Form Schema id
   */
  isAliveFor(schemaId: string): boolean {
    return this._live != null && this._live.schemaId === schemaId;
  }

  /**
   * Registers an agent as live, so that it is not destroyed when the DataChat
   * component is destroyed.
   * @param session The live session data
   */
  keepAlive(session: DataChatLiveSession): void {
    this._live = session;
  }

  /**
   * Destroys the live agent, if any. The stored conversations are kept:
   * they are permanent and are restored on the next visit.
   *
   * The User the agent belongs to is read from the session and not from the
   * local data: the session also ends on logout, when that data is being
   * destroyed, and an agent left alive keeps consuming the credits of the User.
   */
  endSession(): void {
    const session = this._live;
    this._live = null;
    this._mauiConversations.clear();
    if (session == null) {
      return;
    }
    const headers = {
      'X-API-KEY': session.apiKey,
      'X-USER-NAME': session.userName,
      'X-USER-EMAIL': session.userEmail,
    };
    this._http
      .post<any>(`${session.baseUrl}/${session.endEndpoint}`, {}, {headers})
      .pipe(take(1))
      .subscribe({
        next: res => {
          if (isDevMode()) {
            console.log(res);
          }
        },
        error: err => {
          if (isDevMode()) {
            console.log(err);
          }
        },
      });
  }

  /**
   * Forgets the live agent without destroying it: to be used when the API
   * reports that the agent does not exist anymore.
   */
  discardSession(): void {
    this._live = null;
    this._mauiConversations.clear();
  }

  /**
   * Returns the Maui conversation id of a conversation, if the live agent
   * holds its memory.
   * @param id The Dino conversation id
   */
  mauiConversationId(id: string): string | null {
    return this._mauiConversations.get(id) ?? null;
  }

  /**
   * Sets, or clears, the Maui conversation id of a conversation.
   * @param id The Dino conversation id
   * @param mauiId The Maui conversation id, or null when there is none
   */
  setMauiConversationId(id: string, mauiId: string | null): void {
    if (mauiId != null) {
      this._mauiConversations.set(id, mauiId);
    } else {
      this._mauiConversations.delete(id);
    }
  }

  /**
   * Forgets every Maui conversation id, i.e. when the agent holding them
   * has been destroyed.
   */
  clearMauiConversations(): void {
    this._mauiConversations.clear();
  }

  /**
   * Loads the conversations of the active User on a Form Schema and activates
   * the most recent one, or a new empty conversation if there is none.
   * @param schemaId The Form Schema id
   * @returns The chat entries of the activated conversation
   */
  async openScope(schemaId: string): Promise<DataChatQA[]> {
    const userId = this._auth.getUserInfo()?.id ?? 'anonymous';
    const scope = this._store.scope(`${userId}`, schemaId);
    if (this._scope === scope && this.activeConversation.value != null) {
      return this.activeConversation.value.messages;
    }
    this._scope = scope;
    const conversations = await this._store.list(scope);
    this.conversations.next(conversations);
    const active = conversations.length ? conversations[0] : this._createConversation(scope);
    this.activeConversation.next(active);
    return active.messages;
  }

  /**
   * Activates a new, empty conversation. It is stored only once it holds a
   * message, so that repeatedly asking for a new chat does not fill the list.
   * @returns The chat entries of the new conversation (always empty)
   */
  newConversation(): DataChatQA[] {
    if (this._scope == null) {
      return [];
    }
    const active = this.activeConversation.value;
    if (active != null && !this._hasQuestions(active)) {
      return active.messages;
    }
    const conversation = this._createConversation(this._scope);
    this.activeConversation.next(conversation);
    return conversation.messages;
  }

  /**
   * Activates a stored conversation.
   * @param id The conversation id
   * @returns Its chat entries, or null if it is gone
   */
  async openConversation(id: string): Promise<DataChatQA[] | null> {
    const conversation = await this._store.get(id);
    if (conversation == null) {
      return null;
    }
    this.activeConversation.next(conversation);
    return conversation.messages;
  }

  /**
   * Deletes a stored conversation. When it is the active one, a new empty
   * conversation - or the most recent of the remaining ones - is activated.
   * @param id The conversation id
   * @returns The chat entries to display after the deletion
   */
  async removeConversation(id: string): Promise<DataChatQA[]> {
    this._cancelPendingSave(id);
    this._mauiConversations.delete(id);
    await this._store.remove(id);
    const conversations = this._scope != null ? await this._store.list(this._scope) : [];
    this.conversations.next(conversations);
    if (this.activeConversation.value?.id !== id) {
      return this.activeConversation.value?.messages ?? [];
    }
    const active =
      conversations.length > 0
        ? conversations[0]
        : this._createConversation(this._scope ?? 'anonymous');
    this.activeConversation.next(active);
    return active.messages;
  }

  /**
   * Stores the chat entries of a conversation, giving it a title on its first
   * question. Debounced: the several entries of a single answer result in a
   * single write.
   *
   * The conversation is the one the chat is writing to, and not the active
   * one: an answer can arrive after the User has left that chat for another,
   * and must not end up in the conversation activated meanwhile.
   * @param conversation The conversation the entries belong to
   * @param messages The current chat entries
   */
  saveConversation(conversation: DataChatConversation, messages: DataChatQA[]): void {
    // The component instance of a table cannot be stored - its rows are, in
    // tableData - and an export link dies with the chat session.
    conversation.messages = messages.map(qa =>
      this._withoutFields(qa, ['componentData', 'downloadUrl', 'downloadFilename']),
    );
    this._cancelPendingSave(conversation.id);
    this._saveTimeouts.set(
      conversation.id,
      setTimeout(() => {
        this._saveTimeouts.delete(conversation.id);
        this._flush(conversation);
      }, SAVE_DEBOUNCE),
    );
  }

  /**
   * Writes a conversation and refreshes the conversations list.
   * A conversation is stored only once the User has asked something, so that
   * merely opening the chat - or the greeting of the completion mode - does
   * not fill the conversations list with empty entries.
   * @param conversation The conversation to write
   */
  private async _flush(conversation: DataChatConversation): Promise<void> {
    if (!this._hasQuestions(conversation)) {
      return;
    }
    if (!conversation.title) {
      conversation.title = this._buildTitle(conversation.messages);
    }
    conversation.updatedAt = new Date().getTime();
    await this._store.put(conversation);
    if (this._scope != null) {
      this.conversations.next(await this._store.list(this._scope));
    }
  }

  /**
   * Cancels the pending debounced save of a conversation, if any.
   * @param id The conversation id
   */
  private _cancelPendingSave(id: string): void {
    const timeout = this._saveTimeouts.get(id);
    if (timeout != null) {
      clearTimeout(timeout);
      this._saveTimeouts.delete(id);
    }
  }

  /**
   * Returns true if the User has asked something in the given conversation.
   * @param conversation The conversation to check
   */
  private _hasQuestions(conversation: DataChatConversation): boolean {
    return conversation.messages.some(qa => qa.question);
  }

  /**
   * Builds a new, empty conversation of a scope.
   * @param scope The conversations scope
   */
  private _createConversation(scope: string): DataChatConversation {
    const now = new Date().getTime();
    return {
      id: this._createId(),
      scope,
      title: '',
      createdAt: now,
      updatedAt: now,
      messages: [],
    };
  }

  /**
   * Builds a conversation title from its first question.
   * @param messages The chat entries of the conversation
   */
  private _buildTitle(messages: DataChatQA[]): string {
    const firstQuestion = messages.find(qa => qa.question)?.question ?? '';
    return firstQuestion.length > TITLE_MAX_LENGTH
      ? `${firstQuestion.slice(0, TITLE_MAX_LENGTH).trim()}…`
      : firstQuestion;
  }

  /**
   * Builds a unique conversation id.
   */
  private _createId(): string {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return `${new Date().getTime()}-${Math.round(Math.random() * 1e9)}`;
  }

  /**
   * Returns a copy of the given chat entry without the given fields.
   * Dynamic components (the generated tables, the progress bar of a pending
   * answer) cannot be stored and are dropped this way.
   */
  private _withoutFields(qa: DataChatQA, fields: (keyof DataChatQA)[]): DataChatQA {
    const copy: DataChatQA = {...qa};
    for (const field of fields) {
      delete copy[field];
    }
    return copy;
  }
}
