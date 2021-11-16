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

import {AjfChoicesOrigin} from '@ajf/core/forms';
import {Injectable} from '@angular/core';
import {DataModelManager, DataService, PermissionContextService} from '@dino/core/data';
import {FilterGroup, FilterItem} from '@dino/core/list';

import {FormSchema, migrationStrategies} from './form-schema';
import {schema} from './form-schema-json';
import {FormsModule} from './forms.module';

@Injectable({providedIn: FormsModule})
export class FormSchemaManager extends DataModelManager<FormSchema> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService) {
    super(
      {name: 'form_schema', collection: {schema, migrationStrategies}},
      dataService,
      permissionContextService,
    );
  }

  /**
   * Generates a group of filters from an AjfFormSchema
   * @param formSchema The form schema definition
   * @returns The generated FilterGroup
   */
  override generateAdditionalFilters(formSchema?: FormSchema): FilterGroup[] {
    if (!formSchema) {
      return [];
    }
    const slides = formSchema.schema.nodes;
    const choicesOrigins = formSchema.schema.choicesOrigins as AjfChoicesOrigin<any>[];
    const nodes: FilterGroup[] = [];
    if (slides) {
      for (let i = 0; i < slides.length; i++) {
        let additionalFilters = slides[i].nodes as FilterItem[];
        nodes.push({
          filterGroupName: slides[i].label,
          filterGroupAdditionalFilters: additionalFilters.map(f => {
            f.choicesOrigin = f.choicesOriginRef
              ? this._getChoiceOriginFromRef(choicesOrigins, f.choicesOriginRef)
              : undefined;
            f.isAdditionalFilter = true;
            return f;
          }),
        } as FilterGroup);
      }
    }
    return nodes;
  }

  private _getChoiceOriginFromRef(
    choicesOrigins: AjfChoicesOrigin<any>[],
    choicesOriginRef: string,
  ): AjfChoicesOrigin<any> {
    return choicesOrigins.filter(f => f.name === choicesOriginRef)[0] || [];
  }
}
