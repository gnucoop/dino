/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {Injectable} from '@angular/core';
import {
  DataModelManager,
  DataService,
  PermissionContextService,
} from '@dewco/core/data';

import {migrationStrategies, Project} from './project';
import {schema} from './project-json';
import {ProjectModule} from './projects.module';

/**
 * Service that manages FormData Projects
 */
@Injectable({providedIn: ProjectModule})
export class ProjectManager extends DataModelManager<Project> {
  constructor(
      dataService: DataService,
      permissionContextService: PermissionContextService,
  ) {
    super(
        {collection: {name: 'projects', schema, migrationStrategies}},
        dataService,
        permissionContextService,
    );
  }
}
