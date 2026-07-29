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

import {isDevMode} from '@angular/core';
import {MonoTypeOperatorFunction, retry, timer} from 'rxjs';

/**
 * Default number of attempts allowed by {@link boundedRetry}.
 */
export const DEFAULT_MAX_RETRY_ATTEMPTS = 10;

/**
 * Default delay between two attempts, in milliseconds.
 */
export const DEFAULT_RETRY_DELAY = 2000;

/**
 * Options accepted by {@link boundedRetry}.
 */
export interface BoundedRetryOptions {
  /**
   * Maximum number of retries before the error is rethrown.
   */
  count?: number;

  /**
   * Delay between two attempts, in milliseconds.
   */
  delay?: number;

  /**
   * Optional label used to report the give up in dev mode.
   */
  label?: string;
}

/**
 * Retries a failing source a bounded number of times, then rethrows.
 *
 * Replaces the `retryWhen(err => err.pipe(delay(n)))` pattern, which retries
 * forever: a permanently failing source - an expired token, a missing
 * permission - turns into an endless storm of background requests and leaves
 * the UI on a spinner that never resolves.
 *
 * @param options The retry bounds.
 * @returns The rxjs operator.
 */
export function boundedRetry<T>(options: BoundedRetryOptions = {}): MonoTypeOperatorFunction<T> {
  const count = options.count ?? DEFAULT_MAX_RETRY_ATTEMPTS;
  const delayMs = options.delay ?? DEFAULT_RETRY_DELAY;
  const label = options.label ?? 'boundedRetry';
  return retry<T>({
    count,
    resetOnSuccess: true,
    delay: (error, attempt) => {
      if (isDevMode() && attempt >= count) {
        console.warn(`${label}: last of ${count} attempt(s), giving up next.`, error);
      }
      return timer(delayMs);
    },
  });
}
