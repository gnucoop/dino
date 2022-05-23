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

import {deepCopy} from '@ajf/core/utils';
import {Injectable} from '@angular/core';
import {DataModelManager, DataService, PermissionContextService} from '@dino/core/data';
import {delay, map, Observable, of as obsOf, retryWhen} from 'rxjs';

import {FormData, indexes, migrationStrategies} from './form-data';
import {schema} from './form-data-json';
import {FormsModule} from './forms.module';

@Injectable({providedIn: FormsModule})
export class FormDataManager extends DataModelManager<FormData> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService) {
    schema.indexes = [...(schema.indexes || []), ...indexes];
    const collection = {name: 'form_data', collection: {schema, migrationStrategies}};
    super(collection, dataService, permissionContextService);
  }

  /**
   * Removes all population objects from a populated FormData
   * @param formData The Form Data to be depopulated
   * @returns The depopulated form data
   */
  depopulateFormData(formData: FormData): FormData {
    const formDataClone: {[key: string]: any} = deepCopy(formData);
    const refKeys: string[] = Object.keys(schema.properties).filter(key => key.includes('_ref_id'));
    const populationKeys: string[] = refKeys.map(key => key.replace('_ref_id', ''));
    populationKeys.forEach(key => delete formDataClone[key]);
    return formDataClone as FormData;
  }

  /**
   * Returns true if the FormData passed does not have a form status or if
   * it has one matching with a form status in the active user permissions.
   * @param formData  The Form Data to be checked
   * @returns True if there is a match
   */
  hasAllowedFormStatus(formData: FormData | null): Observable<boolean> {
    if (formData == null) {
      return obsOf(false);
    }
    if (formData.form_status_ref_id == null) {
      return obsOf(true);
    }
    return this.permissionContext.pipe(
      map(context => {
        const permissions = context['user_permissions'];
        if (permissions == null) {
          throw new Error('User Permissions not found');
        }
        return permissions;
      }),
      retryWhen(err => err.pipe(delay(2000))),
      map(permissions => {
        if (permissions == null) {
          return false;
        }
        let allowedStatus = false;
        for (let groupName in permissions) {
          const group = permissions[groupName];
          const groupActions: string[] | null = group['actions']['form_data'];
          const groupSchemas: string[] | null = group['form_schema'];
          const groupStatuses: string[] | null = group['form_status'];
          const hasSchema: boolean =
            groupSchemas != null &&
            (groupSchemas.includes('all') || groupSchemas.includes(formData.form_schema_ref_id));
          const hasEditPermission: boolean =
            groupActions != null && (groupActions.includes('all') || groupActions.includes('edit'));
          const hasStatus: boolean =
            groupStatuses != null &&
            formData.form_status_ref_id != null &&
            (groupStatuses.includes('all') || groupStatuses.includes(formData.form_status_ref_id));
          if (hasSchema && hasStatus && hasEditPermission) {
            allowedStatus = true;
          }
        }
        return allowedStatus;
      }),
    );
  }
}
