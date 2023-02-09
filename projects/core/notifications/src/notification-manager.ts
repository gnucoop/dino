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

import {deepCopy} from '@ajf/core/utils';
import {Injectable} from '@angular/core';
import {DataModelManager, DataService, PermissionContextService} from '@dino/core/data';
import {Observable, of as obsOf} from 'rxjs';
import {delay, map, switchMap} from 'rxjs/operators';

import {Notification} from './notification';
import {schema} from './notification-json';
import {NotificationModule} from './notification.module';

/**
 * Service that manages Notifications
 */
@Injectable({providedIn: NotificationModule})
export class NotificationManager extends DataModelManager<Notification> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService) {
    super(
      {name: 'notification', collection: {schema}},
      dataService,
      permissionContextService,
      [],
      [{checkName: 'user_data', checkKey: 'notification'}],
    );
  }

  /**
   * Returns the notifications currently unread by the user
   * @param userDataId The active user data id
   * @returns The amount of unread Notifications
   */
  getUnreadNotificationsNumber(userDataId: string | null): Observable<number> {
    if (userDataId == null) {
      return obsOf(0);
    }
    return this.init().pipe(
      delay(3000),
      switchMap(() =>
        this.list().pipe(
          map(notifications => notifications.filter(nt => !nt.readers.includes(userDataId)).length),
        ),
      ),
    );
  }

  /**
   * Returns the last N notifications received by the active user
   * @param userDataId The active user data id
   * @param num The amount of notfications to fetch. Defaults to 20.
   * @returns The requested amount of notifications
   */
  getLastNotifications(
    userDataId: string | null,
    num: number = 20,
  ): Observable<(Notification & {read: boolean})[]> {
    if (userDataId == null) {
      return obsOf([]);
    }
    return this.init().pipe(
      delay(3000),
      switchMap(() => {
        return this.list({
          sort: [{created_at: 'desc', id: 'desc'}],
          limit: num,
        }).pipe(
          map(notifications => {
            const newNotifications = notifications.map(ntf => {
              const read = userDataId != null ? ntf.readers.includes(userDataId) : false;
              const newNotification: Notification & {read: boolean} = {...deepCopy(ntf), read};
              return newNotification;
            });
            return newNotifications;
          }),
        );
      }),
    );
  }
}
