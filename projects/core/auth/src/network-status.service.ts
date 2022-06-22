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
import {fromEvent, merge, Observable} from 'rxjs';
import {mapTo, startWith} from 'rxjs/operators';

/**
 * Service that detects the current Network connection status.
 */
@Injectable({providedIn: 'root'})
export class NetworkStatusService {
  /**
   * The current Network connection status stream.
   */
  protected _isOnline$: Observable<boolean>;
  get isOnline$(): Observable<boolean> {
    return this._isOnline$;
  }

  constructor() {
    this._isOnline$ = merge(
      fromEvent(window, 'offline').pipe(mapTo(false)),
      fromEvent(window, 'online').pipe(mapTo(true)),
    ).pipe(startWith(navigator.onLine));
  }
}
