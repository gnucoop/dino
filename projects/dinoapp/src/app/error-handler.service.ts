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

import {HttpErrorResponse} from '@angular/common/http';
import {ErrorHandler, Injectable, isDevMode} from '@angular/core';
import {Router} from '@angular/router';
import {Observable, take} from 'rxjs';
import * as Sentry from '@sentry/angular-ivy';
import {UserDataManager} from '@dino/core/users';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {environment} from 'src/environments/environment';
import {SeverityLevel} from '@sentry/angular-ivy';

const ngsw = require('../../ngsw-config.json');

/**
 * Service that manages errors, providing custom methods to log and handle them
 * depending on the error type.
 */
@Injectable({providedIn: 'root'})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private _router: Router,
    private _udm: UserDataManager,
    private _ehms: ErrorHandlerMessageService,
  ) {
    if (environment.remoteTrackingConfig.errors) {
      Sentry.init({
        dsn:
          environment.remoteTrackingConfig.errorsUrl ??
          'https://4c1a9d7b191258aa4df8bfc222272486@o4506349092077568.ingest.sentry.io/4506349097844736',
        transport: environment.remoteTrackingConfig.errorsOffline
          ? Sentry.makeBrowserOfflineTransport(Sentry.makeFetchTransport)
          : undefined,
        environment: environment.dataConfig.instanceName,
        maxBreadcrumbs: 50,
        integrations: [
          new Sentry.BrowserTracing({
            // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
            // tracePropagationTargets: ['localhost', 'dinoapp', 'vercel'],
            routingInstrumentation: Sentry.routingInstrumentation,
          }),
          new Sentry.Replay(),
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0, // Capture 100% of the transactions
        // Session Replay
        replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
        replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
      });

      Sentry.setContext('App-version', {
        version: ngsw.appData.version,
        sw_version: ngsw.appData.sw_version,
      });

      this._udm
        .getActiveUserData()
        .pipe(take(1))
        .subscribe(userData => {
          Sentry.configureScope(scope => {
            scope.setUser({
              id: userData?.id,
              email: userData?.email,
              username: userData?.full_name,
            });
          });
        });

      this._ehms.capturedEvt.subscribe(err =>
        this.captureMessage(err.message, err.level ?? 'debug'),
      );
    }
  }

  /**
   * Handle an uncaught exception
   * @param error The exception
   * @returns The exception handler stream
   */
  handleError<T>(error: Error | HttpErrorResponse): Observable<T> {
    const {url} = this._router;

    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine && isDevMode()) {
        console.error('NO CONNECTION AVAILABLE!');
      }
      const errMessage = `DINO HTTP ERROR \n Backend returned status code: ${error.status} \n Response body: ${error.message} \n URL: ${url}`;
      if (isDevMode()) {
        console.error(errMessage);
      }
      if (environment.remoteTrackingConfig.errors) {
        Sentry.captureMessage(errMessage, 'log');
      }
    } else {
      if (isDevMode()) {
        console.error(`DINO ERROR: ${error.message} \n URL: ${url}`);
        // Log the full error object so the originating stack frames are visible.
        console.error(error);
      }
      if (environment.remoteTrackingConfig.errors) {
        Sentry.captureException(error);
      }
    }

    const safeValue = new Observable<T>();
    return safeValue;
  }

  /**
   * Sends a message to the remote Sentry service
   * @param message The message to be sent
   * @param level The severity level of the message (eg. fatal, error, warning etc.)
   */
  captureMessage(message: string, level: SeverityLevel) {
    Sentry.captureMessage(message, level);
  }
}
