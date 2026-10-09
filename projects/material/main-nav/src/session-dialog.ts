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

import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  ViewEncapsulation,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BehaviorSubject, Observable, of as obsOf, Subscription} from 'rxjs';

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

/**
 * Why deleting the local data is not offered right now.
 *
 * - `syncing`: a sync is running, and the data it has not sent yet would be lost.
 * - `offline`: the logout request cannot reach the server, so nothing would be deleted anyway.
 * - `null`: nothing stands in the way.
 */
export type SessionDeleteBlock = 'syncing' | 'offline' | null;

export interface SessionDialogData {
  kind: SessionDialogKind;
  /**
   * For a `logout`, whether the destructive choice is blocked and why. Live, so the
   * choice becomes available as soon as the sync ends or the connection comes back
   * while the dialog is open. Keeping the data is never blocked: it deletes nothing,
   * so it is a safe way out whatever the sync is doing.
   */
  deleteBlocked?: Observable<SessionDeleteBlock>;
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
  standalone: false,
})
export class SessionDialog implements OnDestroy {
  /**
   * The latest {@link SessionDialogData.deleteBlocked}, null when none was given.
   */
  readonly deleteBlocked: BehaviorSubject<SessionDeleteBlock> =
    new BehaviorSubject<SessionDeleteBlock>(null);

  private readonly _deleteBlockedSub: Subscription;

  constructor(
    public dialogRef: MatDialogRef<SessionDialog, SessionDialogResult>,
    @Inject(MAT_DIALOG_DATA) public data: SessionDialogData,
  ) {
    this._deleteBlockedSub = (data.deleteBlocked ?? obsOf(null)).subscribe(block =>
      this.deleteBlocked.next(block),
    );
  }

  ngOnDestroy(): void {
    this._deleteBlockedSub.unsubscribe();
  }

  /**
   * Closes the dialog with the user's decision.
   * @param result The decision, undefined when there is nothing to do.
   */
  respond(result: SessionDialogResult): void {
    // Checked here too, not only through the disabled button: deleting the data
    // while it is blocked is exactly the loss the block exists to prevent.
    if (result === 'logout' && this.deleteBlocked.value != null) {
      return;
    }
    this.dialogRef.close(result);
  }
}
