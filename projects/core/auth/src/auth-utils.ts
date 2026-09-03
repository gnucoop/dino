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

import {JwtToken} from './jwt-token';

export const buildAuthorizationHeader = (token: string | null): string => `Bearer ${token}`;

/**
 * Tolerance, in seconds, applied when evaluating the JWT expiry.
 * A token expiring within this window is already considered expired, so that
 * requests are not sent with a token that dies in flight.
 */
export const TOKEN_EXPIRY_SKEW_SECONDS = 10;

/**
 * Fraction of the token lifetime after which a pre-emptive refresh is scheduled.
 */
export const PREEMPTIVE_REFRESH_RATIO = 0.75;

/**
 * GraphQL/Hasura error codes and messages signalling an expired or invalid JWT.
 */
export const JWT_AUTH_ERROR_MARKERS = ['invalid-jwt', 'JWTExpired', 'invalid-headers'];

/**
 * Decodes and parses the payload of a JWT token.
 * Never throws: malformed, truncated or non-base64 tokens yield null.
 * @param token The token to be decoded.
 * @returns The decoded token, or null if it could not be decoded.
 */
export function decodeJwt(token: string | null | undefined): JwtToken | null {
  if (token == null) {
    return null;
  }
  const payload = token.split('.')[1];
  if (!payload) {
    return null;
  }
  try {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    // atob rejects unpadded base64url payloads.
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    const jsonPayload = decodeURIComponent(
      atob(padded)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );
    const decoded = JSON.parse(jsonPayload);
    return decoded != null && typeof decoded === 'object' ? (decoded as JwtToken) : null;
  } catch {
    return null;
  }
}

/**
 * @param token The JWT token.
 * @returns The token expiry as epoch milliseconds, or null when it cannot be determined.
 */
export function tokenExpiresAt(token: string | null | undefined): number | null {
  const decoded = decodeJwt(token);
  if (decoded == null || typeof decoded.exp !== 'number' || !isFinite(decoded.exp)) {
    return null;
  }
  return decoded.exp * 1000;
}

/**
 * @param token The JWT token.
 * @returns The token issue time as epoch milliseconds, or null when not present.
 */
export function tokenIssuedAt(token: string | null | undefined): number | null {
  const decoded = decodeJwt(token);
  if (decoded == null || typeof decoded.iat !== 'number' || !isFinite(decoded.iat)) {
    return null;
  }
  return decoded.iat * 1000;
}

/**
 * Checks whether a JWT token is expired, applying a tolerance window.
 * A missing or undecodable token counts as expired.
 * @param token The JWT token.
 * @param skewSeconds The tolerance in seconds. Defaults to TOKEN_EXPIRY_SKEW_SECONDS.
 * @returns True if the token is missing, malformed or expiring within the tolerance window.
 */
export function isTokenExpired(
  token: string | null | undefined,
  skewSeconds: number = TOKEN_EXPIRY_SKEW_SECONDS,
): boolean {
  const expiresAt = tokenExpiresAt(token);
  if (expiresAt == null) {
    return true;
  }
  return expiresAt - skewSeconds * 1000 <= new Date().getTime();
}

/**
 * Checks whether a response body carries a GraphQL authentication error.
 * Hasura answers with HTTP 200 and an `errors` array when the JWT is expired
 * or invalid, so a successful response has to be inspected too.
 * @param body The response body.
 * @returns True if the body reports an expired or invalid JWT.
 */
export function hasJwtAuthError(body: unknown): boolean {
  if (body == null || typeof body !== 'object') {
    return false;
  }
  const errors = (body as {errors?: unknown}).errors;
  if (!Array.isArray(errors)) {
    return false;
  }
  return errors.some(error => {
    if (error == null || typeof error !== 'object') {
      return false;
    }
    const message = (error as {message?: unknown}).message;
    const code = (error as {extensions?: {code?: unknown}}).extensions?.code;
    return JWT_AUTH_ERROR_MARKERS.some(
      marker =>
        (typeof message === 'string' && message.includes(marker)) ||
        (typeof code === 'string' && code.includes(marker)),
    );
  });
}
