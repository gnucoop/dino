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

import {Injectable} from '@angular/core';
import {
  DataModelManager,
  DataService,
  Metric,
  MetricsService,
  PermissionContextService,
} from '@dino/core/data';
import {RxDocument} from 'rxdb';
import {from, merge, Observable, of as obsOf} from 'rxjs';
import {map, shareReplay, switchMap} from 'rxjs/operators';

import {migrationStrategies, UserGroup} from './user-group';
import {schema} from './user-group-json';
import {UserDataManager} from './user-data-manager';
import {UsersModule} from './users.module';

/**
 * Service that manages User Groups
 */
@Injectable({providedIn: UsersModule})
export class UserGroupManager extends DataModelManager<UserGroup> {
  constructor(
    private _userModelManager: UserDataManager,
    private _metricService: MetricsService,
    dataService: DataService,
    permissionContextService: PermissionContextService,
  ) {
    super(
      {name: 'user_group', collection: {schema, migrationStrategies}},
      dataService,
      permissionContextService,
    );
  }

  /**
   * Gets the Permission Groups associated with the active user.
   * @returns The associated Groups
   */
  getActiveUserGroups(): Observable<RxDocument<UserGroup>[]> {
    return this._userModelManager.getActiveUserData().pipe(
      switchMap(userData => {
        if (userData == null) {
          return [];
        }
        const userGroupIds = userData.user_group_ids;
        const querySelector = {id: {$in: userGroupIds}};
        return this.query({selector: querySelector}).pipe(
          switchMap(query => from(query.exec())),
          shareReplay(1),
        );
      }),
    );
  }

  /**
   * Gets the available metrics of the specified type from the Permission Groups associated
   * with the active user
   * @param metricType The string type of the Metric (eg. 'area', 'organization'...)
   * @returns The available Metrics of the Groups.
   */
  getGroupsMetricsByType<T extends Metric = Metric>(
    metricType: string,
  ): Observable<RxDocument<T>[]> {
    const activeMetrics = this._metricService.activeMetrics.value.map(metric => metric.metricName);
    if (activeMetrics.indexOf(metricType) < 0) {
      return obsOf([]);
    }
    const refKey = (metricType + '_ref_id') as keyof UserGroup;
    return this.getActiveUserGroups().pipe(
      map(groups =>
        groups.map(gr => {
          let refProp;
          try {
            refProp = from(gr.populate(refKey));
          } catch (err) {
            refProp = obsOf([]);
          }
          return refProp;
        }),
      ),
      switchMap(mts => merge(...mts)),
    );
  }

  /**
   * Gets the available metrics from the Permission Groups associated
   * with the active user.
   * @returns The available Metrics of the Groups.
   */
  getGroupsAllMetrics<T extends Metric = Metric>(): Observable<RxDocument<T>[]> {
    const activeMetrics = this._metricService.activeMetrics.value.map(metric => metric.metricName);
    const groupMetrics: Observable<RxDocument<T>[]>[] = [];
    activeMetrics.forEach(mt => {
      groupMetrics.push(this.getGroupsMetricsByType(mt));
    });
    return merge(...groupMetrics);
  }
}
