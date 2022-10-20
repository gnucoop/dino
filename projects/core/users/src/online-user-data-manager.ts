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
import {
  ActionTrigger,
  OnlineDataModelManager,
  OnlineDataService,
  PermissionContextService,
} from '@dino/core/data';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

import {migrationStrategies, UserData} from './user-data';
import {schema} from './user-data-json';

/**
 * Service that manages User Data
 */
@Injectable({providedIn: 'root'})
export class OnlineUserDataManager extends OnlineDataModelManager<UserData> {
  /**
   * Event emitted as an Action hook
   */
  readonly emitActionTrigger: EventEmitter<ActionTrigger<UserData>> = new EventEmitter<
    ActionTrigger<UserData>
  >();

  constructor(dataService: OnlineDataService, permissionContextService: PermissionContextService) {
    super(
      {name: 'user_data', collection: {schema, migrationStrategies}},
      dataService,
      permissionContextService,
    );
  }

  /**
   * Gets the default Dino Anonymous User userData.
   * @returns The anonymous user userData
   */
  getDefaultAnonymousUser(): Observable<UserData | null> {
    return this.query({selector: {full_name: {$eq: 'dino_anonymous_user'}}, limit: 1}).pipe(
      map(docs => {
        if (!docs.length || docs[0] == null) {
          return null;
        }
        return docs[0];
      }),
      take(1),
    );
  }
}
