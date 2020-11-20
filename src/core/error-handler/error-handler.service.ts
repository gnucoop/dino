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

import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

/**
 * Service that manages errors, providing methods to log and handle them depending on the error type
 */
@Injectable({providedIn: 'root'})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private _injector: Injector) {}

  /**
   * Handle an uncaught exception
   * @param error The exception
   * @returns The exception handler stream
   */
  handleError<T>(error: any): Observable<T> {
    const router = this._injector.get(Router);

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        console.warn('NO CONNECTION AVAILABLE!');
      }
      console.error(`DEWCO HTTP ERROR \n Backend returned status code: ${
          error.status} \n Response body: ${error.message} \n URL: ${router.url}`);

    } else {
      console.error(`DEWCO ERROR: ${error.message} \n URL: ${router.url}`);
    }

    const safeValue = new Observable<T>();
    return safeValue;
  }
}
