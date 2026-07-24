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
import {Inject, Injectable} from '@angular/core';
import {DATA_SERVICE, IDataService} from '@dino/core/data';
import {
  DataListOptions,
  DataModelManager,
  DataQueryOptions,  PermissionContextService,
} from '@dino/core/data';
import {RxDocument} from 'rxdb';
import {Observable, of as obsOf} from 'rxjs';
import {delay, map, switchMap, withLatestFrom} from 'rxjs/operators';

import {Notification} from './notification';
import {schema} from './notification-json';
import {NotificationModule} from './notification.module';

/**
 * Service that manages Notifications
 */
@Injectable({providedIn: NotificationModule})
export class NotificationManager extends DataModelManager<Notification> {
  constructor(
    @Inject(DATA_SERVICE) dataService: IDataService,
    permissionContextService: PermissionContextService,
  ) {
    super(
      {name: 'notification', collection: {schema}},
      dataService,
      permissionContextService,
      [],
      [{checkName: 'user_data', checkKey: 'notification'}],
    );
  }

  /**
   * Overrides the base List method by adding recipients filtering
   * @param options? a list of DataListOptions options.
   * @returns The documents selected.
   */
  override list(options?: DataListOptions): Observable<RxDocument<Notification, {}>[]> {
    return super.list(options).pipe(
      withLatestFrom(this.permissionContext),
      map(([notifications, context]) =>
        notifications.filter(
          notification =>
            notification.recipients.includes('all') ||
            notification.recipients.includes(context.user_data['id']),
        ),
      ),
    );
  }

  /**
   * Overrides the base Query method by adding recipients filtering
   * @param options? a list of DataQueryOptions options.
   * @returns The documents selected.
   */
  override query(options: DataQueryOptions): Observable<RxDocument<Notification, {}>[]> {
    return super.query(options).pipe(
      withLatestFrom(this.permissionContext),
      map(([notifications, context]) =>
        notifications.filter(
          notification =>
            notification.recipients.includes('all') ||
            notification.recipients.includes(context.user_data['id']),
        ),
      ),
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
        this.query({
          selector: {
            $or: [
              {recipients: {$elemMatch: {$eq: userDataId}}},
              {recipients: {$elemMatch: {$eq: 'all'}}},
            ],
          },
        }).pipe(
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
        return this.query({
          selector: {
            $or: [
              {recipients: {$elemMatch: {$eq: userDataId}}},
              {recipients: {$elemMatch: {$eq: 'all'}}},
            ],
          },
          sort: [{created_at: 'desc', updated_at: 'desc', id: 'desc'}],
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

  /**
   * Marks a notification as 'read' by the user and updates the notification readers attribute
   * @param notification The notification to update
   */
  markNotificationAsRead(
    notification: Notification,
    userDataId: string | null,
  ): Observable<RxDocument<Notification, {}> | null> {
    if (notification == null || userDataId == null) {
      return obsOf(null);
    }
    const updNotification: Partial<Notification> & {id: string} = {
      readers: [...notification.readers, userDataId],
      id: notification.id,
    };
    return this.patch(updNotification);
  }
}
