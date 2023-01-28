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

import {Injectable, isDevMode, Optional} from '@angular/core';
import {
  FormDataManager,
  FormSchemaDepsManager,
  FormSchemaManager,
  FormStatusManager,
} from '@dino/core/forms';
import {ReportDataManager, ReportSchemaManager} from '@dino/core/reports';
import {UserDataManager, UserGroupManager, UserRoleManager} from '@dino/core/users';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {SyncModule} from './sync.module';
import {combineLatest, Observable} from 'rxjs';
import {take} from 'rxjs/operators';
import {LangManager} from '@dino/core/langs';
import {DataModelManager} from '@dino/core/data';
import {NotificationManager} from '@dino/core/notifications';

/**
 * Service that manages the Initialization of rxCollections
 */
@Injectable({providedIn: SyncModule})
export class SyncManager {
  /**
   * All the data managers
   */
  readonly managers: {[key: string]: DataModelManager<any> | null};
  /**
   * Array of manager initalizations
   */
  private _managersInit: Observable<boolean>[];

  /**
   * Array of contextual managers initalizations
   */
  private _contextualManagersInit: Observable<boolean>[];

  constructor(
    private _fst: FormStatusManager,
    private _fd: FormDataManager,
    private _fs: FormSchemaManager,
    private _fsdeps: FormSchemaDepsManager,
    private _rs: ReportSchemaManager,
    private _um: UserDataManager,
    private _ur: UserRoleManager,
    private _ug: UserGroupManager,
    private _lm: LangManager,
    private _ntm: NotificationManager,
    private _rd: ReportDataManager,
    @Optional() private _ar: AreaManager | null,
    @Optional() private _cs: CaseManager | null,
    @Optional() private _pj: ProjectManager | null,
    @Optional() private _lc: LocationManager | null,
    @Optional() private _og: OrganizationManager | null,
  ) {
    this.managers = {
      'form_status': this._fst,
      'form_schema': this._fs,
      'form_data': this._fd,
      'report_schema': this._rs,
      'user_data': this._um,
      'user_role': this._ur,
      'user_group': this._ug,
      'lang': this._lm,
      'notification': this._ntm,
      'area': this._ar,
      'case': this._cs,
      'project': this._pj,
      'location': this._lc,
      'organization': this._og,
      'form_schema_deps': this._fsdeps,
    };

    this._managersInit = [
      this._lm.init(),
      this._fst.init(),
      this._fsdeps.init(),
      this._ur.init(),
      this._um.init(),
      this._ug.init(),
    ];

    this._contextualManagersInit = [
      this._fs.init(),
      this._rs.init(),
      this._fd.init(),
      this._rd.init(),
      this._ntm.init(),
    ];

    if (this._ar != null) {
      this._contextualManagersInit.unshift(this._ar.init());
    }
    if (this._cs != null) {
      this._contextualManagersInit.unshift(this._cs.init());
    }
    if (this._pj != null) {
      this._contextualManagersInit.unshift(this._pj.init());
    }
    if (this._lc != null) {
      this._contextualManagersInit.unshift(this._lc.init());
    }
    if (this._og != null) {
      this._contextualManagersInit.unshift(this._og.init());
    }
  }

  /**
   * Initializes all collections without a context
   *
   * @returns An observable of all managers initializations
   */
  initializeMainCollections(): Observable<boolean[]> {
    if (isDevMode()) {
      console.log('INITIALIZING COLLECTIONS');
    }
    return combineLatest(this._managersInit).pipe(take(1));
  }

  /**
   * Initializes all collections that need a full context
   *
   * @returns An observable of all managers initializations
   */
  initializeContextualCollections(): Observable<boolean[]> {
    if (isDevMode()) {
      console.log('INITIALIZING CONTEXTUAL COLLECTIONS');
    }
    return combineLatest(this._contextualManagersInit).pipe(take(1));
  }
}
