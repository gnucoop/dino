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
 * How long to wait for the server's pong after a keep-alive ping was sent
 * before declaring the socket dead. Must be well under `keepAlive` so at most
 * one check is ever in flight.
 */
const DEFAULT_PONG_WAIT_TIMEOUT = 5 * 1000;

/** Close code used when the liveness watchdog gives up on a socket. */
const WATCHDOG_CLOSE_CODE = 4408;

/** `WebSocket.OPEN`, without depending on the global being present. */
const WS_OPEN = 1;

/**
 * Optional behaviour for {@link newClient}. Defaults preserve the original
 * behaviour, so existing callers are unaffected by omitting them.
 */
export interface WsClientOptions {
  /**
   * Resolves the token to authenticate with, called on **every** connect.
   *
   * Without this the token is captured once when the client is created, so any
   * graphql-ws reconnect replays the original — by then expired — token and the
   * socket can never come back. Pass a getter reading the current token.
   */
  getToken?: () => string | null;
  /**
   * Milliseconds to wait for a pong before treating the connection as dead.
   * `0` disables the liveness watchdog. Defaults to
   * {@link DEFAULT_PONG_WAIT_TIMEOUT}.
   */
  pongWaitTimeout?: number;
  /**
   * Called when the watchdog concludes the socket is dead, after it has been
   * closed. Lets the owner surface a "reconnecting" state or rebuild the client.
   */
  onDead?: () => void;
}

/**
 * Creates a new Graphql-ws client
 * @param wsUrl The websocket url
 * @param authToken The current authentication jwt token
 * @param refreshEvt The event to be emitted when a token refresh is needed
 * @param socketJwtExpiredCode The error code the websocket server returns when the Jwt token expires
 * @param options Optional liveness/token behaviour, see {@link WsClientOptions}
 * @returns The Grapqhl-ws client
 */
export function newClient(
  wsUrl: string | null,
  authToken: string | null,
  refreshEvt: EventEmitter<void>,
  socketJwtExpiredCode?: number,
  options: WsClientOptions = {},
): Client | null {
  if (wsUrl == null || authToken == null || socketJwtExpiredCode == null) {
    return null;
  }
  const {getToken, pongWaitTimeout = DEFAULT_PONG_WAIT_TIMEOUT, onDead} = options;

  // Liveness watchdog. `keepAlive` only makes the client SEND pings; graphql-ws
  // does nothing if the server never pongs. When a device suspends or a carrier
  // drops the flow without a close frame the socket stays half-open — readyState
  // is still OPEN, so there is no `closed` event, no retry and no error: the
  // subscriptions simply stop delivering, silently and permanently. Timing the
  // pong is the only way to detect that.
  let activeSocket: {readyState: number; close: (code: number, reason: string) => void} | null =
    null;
  let pongTimer: ReturnType<typeof setTimeout> | null = null;
  const clearPongTimer = (): void => {
    if (pongTimer != null) {
      clearTimeout(pongTimer);
      pongTimer = null;
    }
  };

  return createClient({
    url: wsUrl,
    lazy: true,
    keepAlive: 30 * 1000,
    connectionAckWaitTimeout: 240 * 1000,
    // A function, so each connect and reconnect authenticates with the CURRENT
    // token rather than the one captured when this client was built.
    connectionParams: () => {
      const token = (getToken != null ? getToken() : null) ?? authToken;
      return {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
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
        clearPongTimer();
        activeSocket = null;
        const event = evt as {[key: string]: any};
        if (isDevMode()) {
          console.log(evt);
        }
        if (event['code'] === socketJwtExpiredCode) {
          refreshEvt.emit();
        }
      },
      'connected': socket => {
        clearPongTimer();
        activeSocket = socket as typeof activeSocket;
        if (isDevMode()) {
          console.log(socket);
        }
      },
      'opened': evt => {
        if (isDevMode()) {
          console.log(evt);
        }
      },
      'ping': received => {
        // Only time OUR pings (`received === false` means "sent by us").
        if (received || pongWaitTimeout <= 0) {
          return;
        }
        clearPongTimer();
        pongTimer = setTimeout(() => {
          pongTimer = null;
          const socket = activeSocket;
          if (socket == null || socket.readyState !== WS_OPEN) {
            return;
          }
          if (isDevMode()) {
            console.warn('graphql-ws: no pong received, closing a half-open socket');
          }
          // Closing turns the undetectable half-open state into a normal close,
          // which is what makes graphql-ws reconnect (with a fresh token, via
          // the connectionParams function above).
          socket.close(WATCHDOG_CLOSE_CODE, 'Request Timeout');
          if (onDead != null) {
            onDead();
          }
        }, pongWaitTimeout);
      },
      'pong': received => {
        if (received) {
          clearPongTimer();
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
