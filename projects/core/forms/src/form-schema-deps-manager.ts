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

import {schema} from './form-schema-deps-json';
import {FormSchemaDeps, migrationStrategies} from './form-schema-deps';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class FormSchemaDepsManager extends DataModelManager<FormSchemaDeps> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService) {
    super(
      {name: 'form_schema_deps', collection: {schema, migrationStrategies}},
      dataService,
      permissionContextService,
    );
  }

  /**
   * Returns true if the Form Schema id is used by any Form Schema Deps (Relationships to other Form Schemas)
   * @param formSchemaId The id of the Form Schema
   */
  isUsedByAnyFormSchemaDeps(formSchemaId: string): Observable<boolean> {
    return this.list().pipe(
      map(deps => {
        for (let dep of deps) {
          if (!dep.deps_origin || !dep.deps_origin.length) continue;
          for (let origin of dep.deps_origin) {
            if (
              'form_schema_ref_id' in origin &&
              origin.form_schema_ref_id &&
              origin.form_schema_ref_id === formSchemaId
            )
              return true;
          }
        }
        return false;
      }),
    );
  }
}
