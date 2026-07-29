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

import {Injectable, EventEmitter} from '@angular/core';
import {AuthService} from '@dino/core/auth';
import {
  ActionTrigger,
  ActionTriggerData,
  DataModelManager,
  DataService,
  PermissionContextService,
  boundedRetry,
} from '@dino/core/data';
import {Observable, of as obsOf} from 'rxjs';
import {
  catchError,
  map,
  shareReplay,
  skipWhile,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import {migrationStrategies, UserData} from './user-data';
import {schema} from './user-data-json';
import {UserSelfExclude} from './user-admin-check-permissions';

/**
 * Service that manages User Data
 */
@Injectable({providedIn: 'root'})
export class UserDataManager extends DataModelManager<UserData> {
  /**
   * Event emitted as an Action hook
   */
  readonly emitActionTrigger: EventEmitter<ActionTrigger<UserData>> = new EventEmitter<
    ActionTrigger<UserData>
  >();

  constructor(
    private _authService: AuthService,
    dataService: DataService,
    permissionContextService: PermissionContextService,
  ) {
    super(
      {name: 'user_data', collection: {schema, migrationStrategies}},
      dataService,
      permissionContextService,
      [new UserSelfExclude(_authService)],
    );
  }

  /**
   * Gets the UserData of the active user.
   * @returns The user data
   */
  getActiveUserData(): Observable<UserData | null> {
    return this._authService.authenticated.pipe(
      skipWhile(authEvt => authEvt.auth != true),
      switchMap(() => {
        const newUser = this._authService.getNewUser();
        this._authService.resetNewUser();
        if (newUser != null) {
          return this.create({
            full_name: newUser.displayName,
            email: newUser.email,
            user_group_ids: [],
            user_auth_ref_id: newUser.id,
            created_at: new Date().toISOString(),
          }).pipe(
            tap(ud => {
              if (ud) {
                const trigData: ActionTriggerData<UserData> = {doc: ud};
                const trigger: ActionTrigger<UserData> = {
                  name: 'User Signup',
                  triggerType: 'on_signup',
                  triggerData: trigData,
                };
                this.emitActionTrigger.emit(trigger);
              }
            }),
          );
        } else {
          const userId = this._authService.getUserInfo()?.id;
          if (userId == null) {
            return obsOf(null);
          }
          return this.query({selector: {user_auth_ref_id: {$eq: userId}}}).pipe(
            map(docs => {
              if (!docs.length || docs[0] == null) {
                return null;
              }
              return docs[0];
            }),
            shareReplay(1),
          );
        }
      }),
      map(ud => {
        if (ud == null) {
          throw new Error('User Data not found');
        }
        return ud;
      }),
      // The user data may not be replicated yet, so retry - but bounded, instead
      // of looping forever. This waits on the local database, so a momentarily
      // expired token is no reason to give up.
      boundedRetry<UserData>({label: 'getActiveUserData'}),
      tap(userData => {
        this.addToContext({user_data: userData});
      }),
      take(1),
      // Giving up yields null: callers already handle a missing user data,
      // whereas a hanging stream leaves the UI on a spinner.
      catchError(() => obsOf(null)),
      shareReplay(1),
    );
  }
}
