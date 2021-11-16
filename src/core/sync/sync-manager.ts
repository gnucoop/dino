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

import {Injectable, Optional} from '@angular/core';
import {FormSchemaManager} from '@dino/core/forms';
import {ReportSchemaManager} from '@dino/core/reports';
import {UserDataManager, UserGroupManager, UserRoleManager} from '@dino/core/users';
import {AreaManager} from '@dino/core/areas';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {SyncModule} from './sync.module';
import {combineLatest, Observable} from 'rxjs';
import {shareReplay, skipWhile, switchMap, take} from 'rxjs/operators';
import {AuthService} from '@dino/core/auth';

/**
 * Service that manages the Initialization of rxCollections
 */
@Injectable({providedIn: SyncModule})
export class SyncManager {
  /**
   * Array of manager initalizations
   */
  private _managersInit: Observable<boolean>[];

  constructor(
    private _auth: AuthService,
    private _fs: FormSchemaManager,
    private _rs: ReportSchemaManager,
    private _um: UserDataManager,
    private _ur: UserRoleManager,
    private _ug: UserGroupManager,
    @Optional() private _ar: AreaManager | null,
    @Optional() private _pj: ProjectManager | null,
    @Optional() private _lc: LocationManager | null,
    @Optional() private _og: OrganizationManager | null,
  ) {
    this._managersInit = [
      this._fs.init(),
      this._rs.init(),
      this._um.init(),
      this._ur.init(),
      this._ug.init(),
    ];
    if (this._ar != null) {
      this._managersInit.push(this._ar.init());
    }
    if (this._pj != null) {
      this._managersInit.push(this._pj.init());
    }
    if (this._lc != null) {
      this._managersInit.push(this._lc.init());
    }
    if (this._og != null) {
      this._managersInit.push(this._og.init());
    }
  }

  /**
   * Initializes all collections
   *
   * @returns An observable of all managers initializations
   */
  initializeCollections(): Observable<boolean[]> {
    return combineLatest([this._auth.authenticated, this._auth.authToken]).pipe(
      skipWhile(([auth, token]) => auth === false || token == null),
      switchMap(() => combineLatest([...this._managersInit]).pipe(shareReplay(1), take(1))),
    );
  }
}
