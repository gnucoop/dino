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

import {ChangeDetectionStrategy, Component, Inject, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

/**
 * What the dialog is asking about.
 *
 * - `logout`: the user tapped the logout icon. The choice that matters is whether
 *   the local data goes with the session.
 * - `session-expired`: the sync is stopped because the token cannot be renewed.
 *   Only a new login fixes it, and reaching the login page means ending the
 *   session first.
 * - `data-refused`: the server keeps refusing the documents of a collection. There
 *   is nothing to choose - neither a login nor a sync helps - so the dialog only
 *   says what happened and what the way out is.
 */
export type SessionDialogKind = 'logout' | 'session-expired' | 'data-refused';

export interface SessionDialogData {
  kind: SessionDialogKind;
}

/**
 * What the user decided.
 *
 * - `logout`: end the session and delete the local data.
 * - `end-session`: end the session, keep the data on this device.
 * - `undefined`: do nothing - cancelled, postponed, or just closed. Also what a
 *   dismissal by backdrop or escape produces, which is why it is the outcome that
 *   touches nothing.
 */
export type SessionDialogResult = 'logout' | 'end-session' | undefined;

/**
 * Asks the user before the session ends.
 *
 * Both ways out of a session used to be taken without a question: the logout icon
 * always destroyed the local database, and the sync icon with the error badge went
 * straight to the login page. On a device that collects data offline for days, the
 * first is the one action that can lose it, so the choice has to be the user's.
 */
@Component({
  selector: 'dino-session-dialog',
  templateUrl: 'session-dialog.html',
  styleUrls: ['session-dialog.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SessionDialog {
  constructor(
    public dialogRef: MatDialogRef<SessionDialog, SessionDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: SessionDialogData,
  ) {}

  /**
   * Closes the dialog with the user's decision.
   * @param result The decision, undefined when there is nothing to do.
   */
  respond(result: SessionDialogResult): void {
    this.dialogRef.close(result);
  }
}
