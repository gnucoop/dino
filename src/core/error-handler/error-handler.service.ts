import {HttpClient, HttpErrorResponse, HttpResponse} from '@angular/common/http';
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

import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

/**
 * Service that manages errors, providing methods to log and handle them depending on the error type
 */
@Injectable({providedIn: 'root'})
export class ErrorHandlerService implements ErrorHandler {
  private _loggingUrl: string;
  constructor(private _injector: Injector) {
    this._loggingUrl = 'https://test-logging-api/';
  }

  /**
   * Custom global error handler
   * @param {any} error
   * @returns {Observable(T)}
   */
  handleError<T>(error: any) {
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

    // this._logHandle(error);

    const safeValue = new Observable<T>();
    return safeValue;
  }

  /**
   * Sends an error message to an external logging service api
   * @param {any} error
   */
  private _logHandle<T>(error: any) {
    const http = this._injector.get(HttpClient);
    const router = this._injector.get(Router);

    const errorData = {
      'error_message': error.message,
      'error_status': error.status,
      'error_url': router.url,
    };
    http.post(this._loggingUrl, errorData)
        .subscribe(res => console.log(`Logging the error: ${res}`));
  }
}
