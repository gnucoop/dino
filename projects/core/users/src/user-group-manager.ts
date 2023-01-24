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

import {Injectable, isDevMode} from '@angular/core';
import {
  DataModelManager,
  DataService,
  MetricsService,
  PermissionContextService,
} from '@dino/core/data';
import {RxDocument} from 'rxdb';
import {forkJoin, from, Observable, of as obsOf} from 'rxjs';
import {delay, filter, map, retryWhen, shareReplay, switchMap, take, tap} from 'rxjs/operators';

import {migrationStrategies, UserGroup} from './user-group';
import {schema} from './user-group-json';
import {UserData} from './user-data';
import {UserDataManager} from './user-data-manager';
import {UserRole} from './user-role';
import {AdminGroupExclude} from './user-admin-check-permissions';

/**
 * Service that manages User Groups
 */
@Injectable({providedIn: 'root'})
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
      [new AdminGroupExclude()],
    );

    dataService.collectionsInitialized
      .pipe(
        filter(evt => evt === 'started'),
        switchMap(() => this.isActiveUserAdmin()),
      )
      .subscribe();
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
        return this.query({selector: querySelector}).pipe(shareReplay(1));
      }),
    );
  }

  /**
   * Gets the Users belonging to a list of groups
   * @param userGroupsIds
   * @returns The users
   */
  getUsersByGroups(userGroupsIds: string[]): Observable<RxDocument<UserData>[]> {
    return this._userModelManager
      .query({selector: {user_group_ids: {$all: userGroupsIds}}})
      .pipe(shareReplay(1));
  }

  /**
   * Gets the Users belonging to a list of groups, using group names
   * @param userGroupNames
   * @returns The users
   */
  getUsersByGroupNames(userGroupNames: string[]): Observable<RxDocument<UserData, {}>[]> {
    return this.query({selector: {groupName: {$in: userGroupNames}}}).pipe(
      switchMap(groupsData => {
        if (groupsData == null || groupsData.length === 0) {
          return obsOf([]);
        }
        const groupIds = groupsData.map(group => group.id);
        return this.getUsersByGroups(groupIds);
      }),
      shareReplay(1),
    );
  }

  /**
   * Gets the User Groups details
   * @param userDatas the users list
   * @returns A list of tuple with the user and his groups
   */
  getUserGroups(
    userDatas: RxDocument<UserData, {}>[],
  ): Observable<[RxDocument<UserGroup, {}>[], RxDocument<UserData, {}>]>[] {
    const ug: Observable<[RxDocument<UserGroup, {}>[], RxDocument<UserData, {}>]>[] = userDatas.map(
      ud => {
        const udgr = this.query({selector: {id: {$in: ud.user_group_ids}}});
        return forkJoin([udgr, obsOf(ud)]).pipe(shareReplay(1));
      },
    );
    return ug;
  }

  /**
   * Gets the Permissions associated with the active user.
   * @returns The permissions of the active user
   */
  getActiveUserPermissions(): Observable<{[role_name: string]: {}}> {
    return forkJoin([this.getActiveUserGroups(), this.getGroupsAllMetrics()]).pipe(
      switchMap(([userGroups, userMetrics]) => {
        const ug: Observable<[RxDocument<UserRole, {}>, RxDocument<UserGroup, {}>]>[] =
          userGroups.map(gr => {
            let refProp: Observable<RxDocument<UserRole>>;
            refProp = from(gr.populate('user_role_ref_id'));
            return forkJoin([refProp, obsOf(gr)]).pipe(
              tap(([role, group]) => {
                if (role == null || group == null) {
                  if (isDevMode()) {
                    console.log(
                      `No Role found for Group ${group.groupName}: ${gr['user_role_ref_id']}`,
                    );
                  }
                  throw new Error('No Role or Group found');
                }
              }),
              retryWhen(err => err.pipe(delay(2000))),
            );
          });
        return (ug.length ? forkJoin(ug) : obsOf([])).pipe(
          map(privileges => {
            let prvs: {[role_name: string]: any} = {};
            const allFormSchemas: string[] = [];
            const allFormStatuses: string[] = [];
            const allReportSchemas: string[] = [];
            for (let prv of privileges) {
              if (prv[0] == null || prv[1] == null) {
                continue;
              }
              const role = prv[0];
              const group = prv[1];

              if (role.roleName && prvs[role.roleName] == null) {
                prvs[role.roleName] = {};
              }
              if (prvs[role.roleName]['form_schema'] == null) {
                prvs[role.roleName]['form_schema'] = [];
              }
              if (prvs[role.roleName]['form_status'] == null) {
                prvs[role.roleName]['form_status'] = [];
              }
              if (prvs[role.roleName]['report_schema'] == null) {
                prvs[role.roleName]['report_schema'] = [];
              }
              if (prvs[role.roleName]['actions'] == null) {
                prvs[role.roleName]['actions'] = {};
              }

              prvs[role.roleName]['form_schema'] = [
                ...prvs[role.roleName]['form_schema'],
                ...group.groupFormSchemaIds,
              ];
              prvs[role.roleName]['form_status'] = [
                ...prvs[role.roleName]['form_status'],
                ...group.form_status_ref_id,
              ];
              prvs[role.roleName]['report_schema'] = [
                ...prvs[role.roleName]['report_schema'],
                ...group.groupReportSchemaIds,
              ];

              prvs[role.roleName]['actions'] = role.rolePermissions;

              allFormSchemas.push(...group.groupFormSchemaIds);
              allFormStatuses.push(...group.form_status_ref_id);
              allReportSchemas.push(...group.groupReportSchemaIds);

              Object.keys(prvs[role.roleName]['actions']).forEach(
                k =>
                  prvs[role.roleName]['actions'][k] === undefined &&
                  delete prvs[role.roleName]['actions'][k],
              );
            }
            this.addToContext({user_metrics: userMetrics});
            this.addToContext({user_permissions: prvs});
            this.addToContext({
              user_form_schemas: new Set(allFormSchemas),
            });
            this.addToContext({user_form_statuses: new Set(allFormStatuses)});
            this.addToContext({
              user_report_schemas: new Set(allReportSchemas),
            });
            return prvs;
          }),
        );
      }),
    );
  }

  /**
   * Checks if the active user is an Admin
   * @param roles The roles granting admin permissions
   * @returns true if the active user is an Admin
   */
  isActiveUserAdmin(roles: string[] = ['admin']): Observable<boolean> {
    return this.getActiveUserPermissions().pipe(
      map(prvs => {
        return Object.keys(prvs).some(key => roles.includes(key));
      }),
      take(1),
    );
  }

  /**
   * Gets the available metrics of the specified type from the Permission Groups associated
   * with the active user
   * @param metricType The string type of the Metric (eg. 'area', 'organization'...)
   * @returns The available Metrics of the Groups.
   */
  getGroupsMetricsByType(metricType: string): Observable<string[]> {
    const activeMetrics = this._metricService.activeMetrics.value.map(metric => metric.metricName);
    if (activeMetrics.indexOf(metricType) < 0) {
      return obsOf([]);
    }
    const refKey = (metricType + '_ref_id') as keyof RxDocument<UserGroup>;
    return this.getActiveUserGroups().pipe(
      map(groups => groups.map(gr => gr[refKey] as string[])),
      map(mts => mts.flat()),
    );
  }

  /**
   * Gets the available metrics from the Permission Groups associated
   * with the active user.
   * @returns The available Metrics of the Groups.
   */
  getGroupsAllMetrics(): Observable<{[metricType: string]: string[]}> {
    const activeMetrics = this._metricService.activeMetrics.value.map(metric => metric.metricName);
    if (!activeMetrics.length) {
      return obsOf({});
    }
    const groupMetrics: Observable<{[metricType: string]: string[]}>[] = [];
    activeMetrics.forEach(mt => {
      groupMetrics.push(this.getGroupsMetricsByType(mt).pipe(map(gmts => ({[mt]: gmts}))));
    });

    return forkJoin(groupMetrics).pipe(
      map(mts => {
        let obj: {[metricType: string]: string[]} = {};
        for (let mt of mts) {
          obj = {...obj, ...mt};
        }
        return obj;
      }),
    );
  }
}
