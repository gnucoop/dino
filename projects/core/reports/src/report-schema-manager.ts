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
  DataQueryOptions,
  DataService,
  PermissionContextService,
} from '@dino/core/data';

import {migrationStrategies, ReportSchema} from './report-schema';
import {schema} from './report-schema-json';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {RxDocument} from 'rxdb';
import {ReportDataManager} from './report-data-manager';
@Injectable({providedIn: 'root'})
export class ReportSchemaManager extends DataModelManager<ReportSchema> {
  constructor(
    dataService: DataService,
    permissionContextService: PermissionContextService,
    private _rdm: ReportDataManager,
  ) {
    super(
      {name: 'report_schema', collection: {schema, migrationStrategies}},
      dataService,
      permissionContextService,
      [],
      [{checkName: 'user_report_schemas'}],
    );
  }

  /**
   * Checks if an Automatic Report associated to a given Form Schema already exists
   * @param fsName The form schema name
   * @param fsId The id of the form schema
   */
  checkAutoReportExists(fsName: string, fsId: string): Observable<RxDocument<ReportSchema> | null> {
    const query: DataQueryOptions = {
      selector: {
        name: {$eq: `${fsName}_auto_report`},
        form_schema_ids: {$eq: [fsId]},
      },
      limit: 1,
    };
    return this.query(query).pipe(
      map(docs => {
        if (!docs.length) {
          return null;
        }
        return docs[0];
      }),
    );
  }

  /**
   * Returns true if any Report Data with this Report Schema ID exists
   * @param reportSchemaId The id of the Report Schema
   */
  hasAnyData(reportSchemaId: string): Observable<boolean> {
    const queryOptions: DataQueryOptions = {
      selector: {
        report_schema_ref_id: {$eq: reportSchemaId},
        is_deleted: {$ne: true},
      },
      limit: 1,
    };
    return this._rdm.query(queryOptions).pipe(map(res => res.length > 0));
  }

  /**
   * Returns true if the Form Schema id is used by any Report Schema
   * @param formSchemaId The id of the Form Schema
   */
  isUsedByAnyReports(formSchemaId: string): Observable<boolean> {
    const queryOptions: DataQueryOptions = {
      selector: {
        form_schema_ids: formSchemaId,
        is_deleted: {$ne: true},
      },
      limit: 1,
    };
    return this.query(queryOptions).pipe(map(res => res.length > 0));
  }
}
