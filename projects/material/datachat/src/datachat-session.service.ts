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
import {UserDataManager} from '@dino/core/users';
import {BehaviorSubject, of as obsOf} from 'rxjs';
import {filter, switchMap, take} from 'rxjs/operators';

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
   * Pending debounced save of the active conversation.
   */
  private _saveTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private _http: HttpClient,
    private _udm: UserDataManager,
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
   */
  endSession(): void {
    const session = this._live;
    this._live = null;
    if (session == null) {
      return;
    }
    this._udm
      .getActiveUserData()
      .pipe(
        switchMap(activeUserData => {
          if (!activeUserData) {
            return obsOf(null);
          }
          const headers = {
            'X-API-KEY': session.apiKey,
            'X-USER-NAME': activeUserData.full_name,
            'X-USER-EMAIL': activeUserData.email,
          };
          return this._http.post<any>(`${session.baseUrl}/${session.endEndpoint}`, {}, {headers});
        }),
        take(1),
      )
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
    this._cancelPendingSave();
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
   * Stores the chat entries of the active conversation, giving it a title on
   * its first question. Debounced: the several entries of a single answer
   * result in a single write.
   * @param messages The current chat entries
   */
  saveActive(messages: DataChatQA[]): void {
    const active = this.activeConversation.value;
    if (active == null) {
      return;
    }
    // The component instance of a table cannot be stored - its rows are, in
    // tableData - and an export link dies with the chat session.
    active.messages = messages.map(qa =>
      this._withoutFields(qa, ['componentData', 'downloadUrl', 'downloadFilename']),
    );
    this._cancelPendingSave();
    this._saveTimeout = setTimeout(() => {
      this._saveTimeout = null;
      this._flush(active);
    }, SAVE_DEBOUNCE);
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
   * Cancels a pending debounced save, if any.
   */
  private _cancelPendingSave(): void {
    if (this._saveTimeout != null) {
      clearTimeout(this._saveTimeout);
      this._saveTimeout = null;
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
