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

import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ErrorSeverityLevel} from './error-severity-level';
import {ErrorCapturedMessage} from './error-message';

/**
 * Service that manages errors, providing custom methods to log and handle them
 * depending on the error type.
 */
@Injectable({providedIn: 'root'})
export class ErrorHandlerMessageService {
  private _errorMessageCapturedEvt: EventEmitter<ErrorCapturedMessage> =
    new EventEmitter<ErrorCapturedMessage>();

  public capturedEvt: Observable<ErrorCapturedMessage> =
    this._errorMessageCapturedEvt.asObservable();

  constructor() {}

  /**
   * Emits the event to send a message to the remote Error service
   * @param message The message to be sent
   * @param level? The optional severity level of the message (eg. fatal, error, warning etc.)
   */
  captureErrorMessage(message: string, level?: ErrorSeverityLevel) {
    this._errorMessageCapturedEvt.emit({message, level});
  }
}
