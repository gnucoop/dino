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
import {DataModelManager, DataService, PermissionContextService} from '@dino/core/data';
import {Observable, of as obsOf} from 'rxjs';
import {FormSchema} from './form-schema';

import {FormStatus, indexes, migrationStrategies} from './form-status';
import {schema} from './form-status-json';

@Injectable({providedIn: 'root'})
export class FormStatusManager extends DataModelManager<FormStatus> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService) {
    schema.indexes = [...(schema.indexes || []), ...indexes];
    const collection = {name: 'form_status', collection: {schema, migrationStrategies}};
    super(collection, dataService, permissionContextService);
  }

  /**
   * Finds all available Form Statuses associated with a Form Schema
   * @param schema The Form Schema object
   * @returns The associated Form Statuses or null if no status is associated
   */
  formStatusesOfSchema(schema: FormSchema): Observable<FormStatus[] | null> {
    if (!schema || !schema.form_status_ref_id) {
      return obsOf(null);
    }
    const statusIds: string[] = schema.form_status_ref_id;
    return this.query({selector: {id: {$in: statusIds}}});
  }
}
