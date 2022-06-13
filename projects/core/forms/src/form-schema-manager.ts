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
  MetricsService,
  PermissionContextService,
} from '@dino/core/data';
import {FilterGroup, ListHeader} from '@dino/core/list';

import * as baseFsm from './base-form-schema-manager';
import {FormSchema} from './form-schema';
import {FormsModule} from './forms.module';

@Injectable({providedIn: FormsModule})
export class FormSchemaManager extends DataModelManager<FormSchema> {
  constructor(
    dataService: DataService,
    permissionContextService: PermissionContextService,
    private _metricService: MetricsService,
  ) {
    super(
      baseFsm.creationParams,
      dataService,
      permissionContextService,
      [],
      [{checkName: 'user_form_schemas'}],
    );
  }

  override generateAdditionalFilters(formSchema?: FormSchema): FilterGroup[] {
    return baseFsm.generateAdditionalFilters(formSchema);
  }

  generateMetricsHeaders(): ListHeader<any>[] {
    return baseFsm.generateMetricsHeaders(this._metricService);
  }

  generateSchemaListHeaders(formSchema?: FormSchema): ListHeader<any>[] {
    return baseFsm.generateSchemaListHeaders(this._metricService, formSchema);
  }
}
