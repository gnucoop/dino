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

import {Inject, Injectable} from '@angular/core';
import {DATA_SERVICE, IDataService} from '@dino/core/data';
import {
  CheckMetricPermission,
  DataModelManager,  PermissionContextService,
} from '@dino/core/data';

import {migrationStrategies, Project} from './project';
import {schema} from './project-json';
import {ProjectModule} from './projects.module';

/**
 * Service that manages FormData Projects
 */
@Injectable({providedIn: ProjectModule})
export class ProjectManager extends DataModelManager<Project> {
  constructor(
    @Inject(DATA_SERVICE) dataService: IDataService,
    permissionContextService: PermissionContextService,
  ) {
    super(
      {name: 'project', collection: {schema, migrationStrategies}},
      dataService,
      permissionContextService,
      [new CheckMetricPermission<Project>('project')],
      [{checkName: 'user_metrics', checkKey: 'project'}],
    );
  }
}
