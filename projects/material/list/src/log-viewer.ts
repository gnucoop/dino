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
import {TranslocoService} from '@ajf/core/transloco';
import {Log, LogManager} from '@dino/core/logs';
import {Observable, of as obsOf} from 'rxjs';
import {map} from 'rxjs/operators';
import {formatInTimeZone} from 'date-fns-tz';
import {deepCopy} from '@ajf/core/utils';

/**
 * A dialog component that displays the logs associated with a form
 */
@Component({
  selector: 'dino-log-viewer',
  styleUrls: ['log-viewer.scss'],
  templateUrl: 'log-viewer.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LogViewer {
  logs: Observable<Log[]>;

  constructor(
    public dialogRef: MatDialogRef<LogViewer>,
    @Inject(MAT_DIALOG_DATA) public data: {docId: string},
    private _ts: TranslocoService,
    private _logManager: LogManager,
  ) {
    this.logs = this.data.docId
      ? this._logManager
          .query({
            selector: {form_data_ref_id: {$eq: this.data.docId}},
            sort: [{created_at: 'desc'}],
          })
          .pipe(
            map(logs =>
              logs.map(log => {
                const logCopy = deepCopy(log);
                logCopy.created_at = formatInTimeZone(
                  logCopy.created_at,
                  Intl.DateTimeFormat().resolvedOptions().timeZone ?? '',
                  'yyyy-MM-dd HH:mm:ss zzz',
                );
                return logCopy;
              }),
            ),
          )
      : obsOf([]);
  }

  /**
   * Closes the dialog
   */
  close() {
    this.dialogRef.close();
  }
}
