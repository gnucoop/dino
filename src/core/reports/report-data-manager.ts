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
import {DataModelManager, DataService, PermissionContextService} from '@dewco/core/data';

import {migrationStrategies, ReportData} from './report-data';
import {schema} from './report-data-json';
import {ReportsModule} from './reports.module';

@Injectable({providedIn: ReportsModule})
export class ReportDataManager extends DataModelManager<ReportData> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService) {
    const collection = {name: 'report_data', collection: {schema, migrationStrategies}};
    super(collection, dataService, permissionContextService);
  }
}
