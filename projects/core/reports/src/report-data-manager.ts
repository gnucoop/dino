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
import {
  DataModelManager,
  DataService,
  PermissionContextService,
  PullQueryContextChecks,
} from '@dino/core/data';

import {indexes, migrationStrategies, ReportData} from './report-data';
import {schema} from './report-data-json';
import {ReportsModule} from './reports.module';

@Injectable({providedIn: ReportsModule})
export class ReportDataManager extends DataModelManager<ReportData> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService) {
    const pullQueryContextChecks: PullQueryContextChecks = [
      {checkName: 'user_report_schemas', checkKey: 'report_schema_ref_id'},
      {checkName: 'user_metrics'},
    ];
    schema.indexes = [...(schema.indexes || []), ...indexes];
    const collection = {name: 'report_data', collection: {schema, migrationStrategies}};
    super(collection, dataService, permissionContextService, [], pullQueryContextChecks);
  }
}
