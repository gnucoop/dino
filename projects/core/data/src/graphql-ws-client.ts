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

import {Client, createClient, SubscribePayload} from 'graphql-ws';
import {Observable, of as obsOf} from 'rxjs';
import {EventEmitter, isDevMode} from '@angular/core';

/**
 * Creates a new Graphql-ws client
 * @param wsUrl The websocket url
 * @param authToken The current authentication jwt token
 * @param refreshEvt The event to be emitted when a token refresh is needed
 * @param socketJwtExpiredCode The error code the websocket server returns when the Jwt token expires
 * @returns The Grapqhl-ws client
 */
export function newClient(
  wsUrl: string | null,
  authToken: string | null,
  refreshEvt: EventEmitter<void>,
  socketJwtExpiredCode?: number,
): Client | null {
  if (wsUrl == null || authToken == null || socketJwtExpiredCode == null) {
    return null;
  }
  return createClient({
    url: wsUrl,
    lazy: true,
    keepAlive: 30 * 1000,
    connectionAckWaitTimeout: 240 * 1000,
    connectionParams: {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
    shouldRetry(errOrCloseEvent) {
      if (isDevMode()) {
        console.log(errOrCloseEvent);
      }
      const event = errOrCloseEvent as {[key: string]: any};
      if (event['code'] === socketJwtExpiredCode) {
        return false;
      }
      return true;
    },
    on: {
      'error': evt => console.log(evt),
      'closed': evt => {
        const event = evt as {[key: string]: any};
        if (isDevMode()) {
          console.log(evt);
        }
        if (event['code'] === socketJwtExpiredCode) {
          refreshEvt.emit();
        }
      },
      'connected': evt => {
        if (isDevMode()) {
          console.log(evt);
        }
      },
      'opened': evt => {
        if (isDevMode()) {
          console.log(evt);
        }
      },
    },
  });
}

/**
 * Adds a new graphql subscription to be sent to the backend
 * @param client The graphql-ws client
 * @param operation The query/subscription to be sent
 * @returns An observable of the subscription
 */
export function newClientSubscription(
  client: Client | null,
  operation: SubscribePayload,
): Observable<any> {
  if (client == null) {
    return obsOf(null);
  }
  return new Observable(observer =>
    client.subscribe(operation, {
      next: data => observer.next(data),
      error: err => observer.error(err),
      complete: () => observer.complete(),
    }),
  );
}
