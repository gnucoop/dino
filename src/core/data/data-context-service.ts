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
import {AuthService} from '@dino/core/auth';
import {RxDocument} from 'rxdb';
import {BehaviorSubject, combineLatest, Observable, of as obsOf} from 'rxjs';
import {delay, map, retryWhen} from 'rxjs/operators';
import {MetricsService} from './metrics.service';

import {PermissionContext, PermissionContextDataUpdate} from './data-permission-interface';
import {Model} from './model';

/**
 * Service that provides a Context for the DataModelManager and is augmented by the
 * concrete Managers inheriting from DataModelManager
 */
@Injectable({providedIn: 'root'})
export class PermissionContextService {
  readonly permissionContext: Observable<PermissionContext>;

  private _basePermissionContext: Observable<PermissionContext>;
  private _permissionContextDataUpdate: BehaviorSubject<PermissionContextDataUpdate> =
    new BehaviorSubject<PermissionContextDataUpdate>({});

  constructor(authService: AuthService, private _ms: MetricsService) {
    this._basePermissionContext = authService.authenticated.pipe(
      map(auth => {
        if (auth) {
          return {user: authService.getUserInfo()};
        }
        this.resetContext();
        return {user: null};
      }),
    );

    this.permissionContext = combineLatest([
      this._basePermissionContext,
      this._permissionContextDataUpdate,
    ]).pipe(map(([baseContext, updatedContext]) => ({...baseContext, ...updatedContext})));
  }

  /**
   * Adds additional data to the Context, which will be globally available
   */
  addToContext(param: PermissionContextDataUpdate): void {
    const currentVal = this._permissionContextDataUpdate.value;
    this._permissionContextDataUpdate.next({...currentVal, ...param});
  }

  /**
   * Resets the current Context to its inital state
   */
  resetContext(): void {
    this._permissionContextDataUpdate.next({});
  }

  /**
   * Checks the User permissions for a specific action on a specific element
   *
   * @param docId The id of the Document to be checked
   * @param collectionName The name of the Collection to be checked
   * @param action The action the user wishes to perform
   * @param context? The permissions context
   * @param isData? True if the actions refer to list data
   * @returns True if the permission is granted
   */
  checkPermission<T extends Model = Model>(
    docId: string,
    collectionName: string,
    action: string,
    context?: PermissionContext<T>,
    isData?: boolean,
  ): boolean {
    if (docId == null || collectionName == null || context == null || action == null) {
      return false;
    }
    const permissions = context.user_permissions;
    if (permissions == null) {
      return false;
    }
    for (let group in permissions) {
      let allowedDocs: string[] = permissions[group][collectionName];
      let actionsCollectionName = collectionName;
      if (isData) {
        actionsCollectionName = collectionName.replace('_schema', '_data');
      }
      let allowedActions: string[] = permissions[group].actions[actionsCollectionName];
      if (allowedDocs == null) {
        return true;
      }
      if (
        allowedDocs.some(doc => doc === docId || doc === 'all') &&
        allowedActions.some(act => act === action || act === 'all')
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Retrieves the actions allowed to the Active User for the specified document/model.
   *
   * @param collectionName The name of the Collection to be checked
   * @param docId? The id of the Document to be checked
   * @param isData? True if the actions refer to list data
   * @returns The actions allowed to the user
   */
  getAllowedActions(
    collectionName: string,
    docId?: string,
    isData?: boolean,
  ): Observable<string[]> {
    if (collectionName == null) {
      return obsOf([]);
    }

    return this.permissionContext.pipe(
      map(context => {
        const permissions = context.user_permissions;
        if (permissions == null) {
          throw new Error('User Permissions not found');
        }
        return permissions;
      }),
      retryWhen(err => err.pipe(delay(2000))),
      map(permissions => {
        if (permissions == null) {
          return [];
        }
        const actions = [];
        for (let group in permissions) {
          let allowedDocs: string[] = permissions[group][collectionName];
          let actionsCollectionName = collectionName;
          if (isData) {
            actionsCollectionName = collectionName.replace('_schema', '_data');
          }
          if (
            docId == null ||
            allowedDocs.indexOf(docId) >= 0 ||
            allowedDocs.some(dc => dc === 'all')
          ) {
            actions.push(...permissions[group].actions[actionsCollectionName]);
          }
        }
        let uniqueActions = actions.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
        if (uniqueActions.some(act => act === 'all')) {
          uniqueActions = ['create', 'edit', 'delete', 'view', 'export', 'print'];
        }
        return uniqueActions;
      }),
    );
  }

  getMatchingMetric<T>(doc: RxDocument<T>, context?: PermissionContext<T>): boolean {
    const contextMetrics: {[metricType: string]: string[]} = context?.user_metrics;
    if (contextMetrics == null || doc == null) {
      return true;
    }
    const activeMetrics = this._ms.activeMetrics.value;
    const jsonDoc = doc.toJSON() as {[key: string]: any};
    let ret = true;
    for (let mt of activeMetrics) {
      const docMetric = jsonDoc[`${mt.metricName}_ref_id`];
      if (
        docMetric != null &&
        !Array.isArray(docMetric) &&
        !Object.keys(contextMetrics).find(
          metType =>
            contextMetrics[metType].includes(docMetric) || contextMetrics[metType].includes('all'),
        )
      ) {
        ret = false;
        break;
      }
    }
    return ret;
  }
}
