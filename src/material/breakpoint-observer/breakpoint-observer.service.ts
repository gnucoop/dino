/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {BreakpointObserverModule} from './breakpoint-observer.module';

/**
 * Service that checks the layout breakpoint changes, emitting
 * when such changes happen.
 */
@Injectable({providedIn: BreakpointObserverModule})
export class BreakpointObserverService {
  /**
   * Small screens
   */
  small: Observable<boolean>;
  /**
   * Medium screens
   */
  medium: Observable<boolean>;
  /**
   * Large screens
   */
  large: Observable<boolean>;

  constructor(private _breakPointObserver: BreakpointObserver) {
    this.small = this._breakPointObserver
      .observe([Breakpoints.Handset])
      .pipe(map(result => result.matches));

    this.medium = this._breakPointObserver
      .observe([Breakpoints.Tablet])
      .pipe(map(result => result.matches));

    this.large = this._breakPointObserver
      .observe([Breakpoints.Web])
      .pipe(map(result => result.matches));
  }
}
