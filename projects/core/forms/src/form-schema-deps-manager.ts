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
import {FormSchemaDeps} from './form-schema-deps';
import {FormsModule} from './forms.module';

@Injectable({providedIn: FormsModule})
export class FormSchemaDepsManager extends DataModelManager<FormSchemaDeps> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService) {
    super({name: 'form_schema_deps', collection: {schema}}, dataService, permissionContextService);
  }
}
