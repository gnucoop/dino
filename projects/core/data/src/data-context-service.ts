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
import {AuthService, DinoUserInfo, User} from '@dino/core/auth';
import {BehaviorSubject, combineLatest, Observable, of as obsOf} from 'rxjs';
import {delay, distinctUntilKeyChanged, filter, map, retryWhen, take} from 'rxjs/operators';
import {PermissionContext, PermissionContextDataUpdate} from './data-permission-interface';
import {MetricsService} from './metrics.service';

/**
 * How many times to retry reading the user permissions before giving up.
 * Bounded so a reset/incomplete context cannot retry indefinitely.
 */
const MAX_PERMISSION_RETRIES = 5;

/**
 * Service that provides a Context for the DataModelManager and is augmented by the
 * concrete Managers inheriting from DataModelManager
 */
@Injectable({providedIn: 'root'})
export class PermissionContextService {
  readonly permissionContext: Observable<PermissionContext>;

  readonly fullContext: BehaviorSubject<PermissionContext | null>;
  private _basePermissionContext: Observable<PermissionContext>;
  private _permissionContextDataUpdate: BehaviorSubject<PermissionContextDataUpdate> =
    new BehaviorSubject<PermissionContextDataUpdate>({});

  private _currentUser: User<DinoUserInfo> | null = null;
  private _emptyContext: PermissionContext = {
    user: null,
    user_data: null,
    user_form_schemas: null,
    user_report_schemas: null,
    user_form_statuses: null,
    user_metrics: null,
    user_permissions: null,
  };

  constructor(private _authService: AuthService, private _ms: MetricsService) {
    this.fullContext = new BehaviorSubject<PermissionContext | null>(null);

    this._authService.authenticated
      .pipe(
        distinctUntilKeyChanged('evt'),
        filter(authEvt => {
          if (authEvt.auth !== false) {
            return false;
          }
          // A failed refresh is NOT a reason to wipe the context where the cached
          // data is still usable (offline mode). Doing so left the app running
          // half-authorised — `user_permissions: null`, so row action buttons
          // vanished and no form could be created — with nothing to rebuild it,
          // because the only rebuild trigger fires on login alone. A real logout
          // still resets, and online mode still resets since nothing works there
          // without a token anyway.
          if (
            authEvt.evt === 'refresh failed' &&
            this._authService.config.enforceTokenExpiry !== true
          ) {
            return false;
          }
          return true;
        }),
      )
      .subscribe(() => this.resetContext());

    this._basePermissionContext = this._authService.authenticated.pipe(
      map(authEvt => {
        if (authEvt.auth) {
          this._currentUser = this._authService.getUserInfo();
          const baseContext: PermissionContext = {
            user: this._authService.getUserInfo(),
            user_data: null,
            user_form_schemas: null,
            user_report_schemas: null,
            user_form_statuses: null,
            user_metrics: null,
            user_permissions: null,
          };
          return baseContext;
        } else {
          return this._emptyContext;
        }
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
    const fullContextKeys = Object.keys(currentVal);
    if (!fullContextKeys.some(cckey => Object.keys(param).includes(cckey))) {
      this._permissionContextDataUpdate.next({...currentVal, ...param});
      const fullContext = {
        ...this._emptyContext,
        user: this._currentUser,
        ...this._permissionContextDataUpdate.value,
      };
      if (!Object.values(fullContext).some(val => val == null)) {
        this.fullContext.next(fullContext as PermissionContext);
        if (isDevMode()) {
          console.log('FULL CONTEXT', fullContext);
        }
      }
    }
  }

  /**
   * Resets the current Context to its inital state
   */
  resetContext(): void {
    this._permissionContextDataUpdate.next({});
    this.fullContext.next(null);
    if (isDevMode()) {
      console.log('Context RESET');
    }
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
  checkPermission(
    docId: string,
    collectionName: string,
    action: string,
    context?: PermissionContext,
    isData?: boolean,
  ): boolean {
    if (docId == null || collectionName == null || context == null || action == null) {
      return false;
    }
    const permissions = context['user_permissions'];
    if (permissions == null || !Object.keys(permissions).length) {
      return true;
    }
    for (let group in permissions) {
      let allowedDocs: string[] = permissions[group][collectionName];
      let actionsCollectionName = collectionName;
      if (isData) {
        actionsCollectionName = collectionName.replace('_schema', '_data');
      }
      let allowedActions: string[] = permissions[group].actions[actionsCollectionName];
      if (allowedDocs == null || allowedActions == null) {
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
   * @param instanceName? The name identifier of the Dino instance
   * @param rowId? The id of the item displayed in the currently highlighted row
   * @param favorites? If true, "favorites" actions are added
   * @returns The actions allowed to the user
   */
  getAllowedActions(
    collectionName: string,
    docId?: string,
    isData?: boolean,
    instanceName?: string,
    rowId?: string | null,
    favorites?: boolean,
  ): Observable<string[]> {
    if (collectionName == null) {
      return obsOf([]);
    }
    return this.permissionContext.pipe(
      map(context => {
        const permissions = context['user_permissions'];
        if (permissions == null) {
          throw new Error('User Permissions not found');
        }
        return permissions;
      }),
      // Bounded: this is called for every row's action buttons, so an unbounded
      // 2s retry (which is what an expired token or a reset context produces)
      // multiplied into a permanent storm of failing requests.
      retryWhen(err => err.pipe(delay(2000), take(MAX_PERMISSION_RETRIES))),
      map(permissions => {
        if (permissions == null) {
          return [];
        }
        const actions: string[] = [];
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
          uniqueActions = [
            'create',
            'edit',
            'delete',
            'view',
            'export',
            'print',
            'docx',
            'status edit',
            'duplicate',
            'viewlog',
            'print badge',
          ];
        }
        if (collectionName === 'report_schema' && isData === true && favorites) {
          uniqueActions.push(
            localStorage.getItem(`dino_favorite_report_${instanceName}`) != rowId
              ? 'addFavorite'
              : 'removeFavorite',
          );
        }
        return uniqueActions;
      }),
    );
  }

  /**
   * If true, the metric passed as an argument matches with one in the current
   * permission context
   * @param doc The metric to check
   * @param context The current permission context
   * @returns True if it matches
   */
  getMatchingMetric<T>(doc: T, context?: PermissionContext): boolean {
    const contextMetrics: {[metricType: string]: string[]} | null =
      context && context.user_metrics ? context.user_metrics : null;
    if (contextMetrics == null || doc == null) {
      return true;
    }
    const activeMetrics = this._ms.activeMetrics.value;
    let ret = true;
    for (let mt of activeMetrics) {
      const docMetric = doc[`${mt.metricName}_ref_id` as keyof T] as unknown as string;
      if (
        docMetric != null &&
        !Array.isArray(docMetric) &&
        !contextMetrics[mt.metricName].includes(docMetric) &&
        !contextMetrics[mt.metricName].includes('all')
      ) {
        ret = false;
        break;
      }
    }
    return ret;
  }

  /**
   * Returns the Form Schema ids on which the active user has
   * creation permissions.
   * @returns The ids of the Form Schemas on which the user has creation permission
   */
  getWhichFormCanBeCreated(): Observable<string[]> {
    return this.fullContext.pipe(
      map(ctx => {
        if (ctx == null || ctx.user_permissions == null) {
          return [];
        }
        const schemaIds: string[] = [];
        const userPermissionRoleKeys: string[] = Object.keys(ctx.user_permissions);
        for (let roleKey of userPermissionRoleKeys) {
          const formDataActions: string[] | null =
            ctx.user_permissions[roleKey].actions['form_data'];
          const formSchemas: string[] = ctx.user_permissions[roleKey].form_schema;
          const canCreate =
            formDataActions != null &&
            (formDataActions.includes('all') || formDataActions.includes('create'));
          if (canCreate) {
            schemaIds.push(...formSchemas);
          }
        }
        if (schemaIds.includes('all')) {
          return ['all'];
        }
        return [...new Set(schemaIds)];
      }),
    );
  }

  /**
   * Checks if the active user is a Guest Only user
   * @param permissions The current user permissions
   * @returns True if the user is Guest only
   */
  isActiveUserGuestOnly(permissions: {[key: string]: any}): boolean {
    if (permissions == null) {
      return true;
    }
    return !Object.keys(permissions).some(key => key.toLowerCase() !== 'guest');
  }
}
