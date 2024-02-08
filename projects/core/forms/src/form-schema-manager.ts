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
  Metric,
  MetricsService,
  PermissionContextService,
} from '@dino/core/data';
import {FilterGroup, ListHeader} from '@dino/core/list';

import * as baseFsm from './base-form-schema-manager';
import {FormSchema} from './form-schema';
import {FormData} from './form-data';
import {AjfChoice, AjfChoicesOrigin} from '@ajf/core/forms';
import {DepsOrigin} from './form-schema-deps';
import {RxDocument} from 'rxdb';
import {Project} from '@dino/core/projects';

@Injectable({providedIn: 'root'})
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

  generateSchemaListHeaders(
    formSchema?: FormSchema,
    sortAlphabetically?: boolean,
  ): ListHeader<any>[] {
    return baseFsm.generateSchemaListHeaders(this._metricService, formSchema, sortAlphabetically);
  }

  /**
   * Retrieves the Label of a field in the schema by its name
   * @param fieldName The field name
   * @param schema The Form Schema
   * @returns The field label
   */
  getLabelFromFieldName(fieldName: string, schema: FormSchema): string | null {
    if (
      fieldName == null ||
      schema == null ||
      schema.schema == null ||
      schema.schema.nodes == null
    ) {
      return null;
    }
    let fieldNameParts: string[] = [];
    if (fieldName.includes('__')) {
      fieldNameParts = fieldName.split('__');
      fieldName = fieldNameParts[0];
    }
    const schemaFields = [...schema.schema.nodes.map(slide => slide.nodes)].flat(1);

    const matchField = schemaFields.find(field => field.name === fieldName);
    return matchField
      ? `${matchField.label} ${fieldNameParts[1] ? '(Slide ' + (+fieldNameParts[1] + 1) + ')' : ''}`
      : null;
  }

  /**
   * Add new dynamic choices origins to form schema
   * @param formSchema the form schema to update
   * @param newChoicesOrigins
   * @returns The Form Schema with updated Choices Origins
   */
  addChoiceOriginToFormSchema(
    formSchema: FormSchema,
    newChoicesOrigins: AjfChoicesOrigin<string>[],
  ): FormSchema | null {
    formSchema.schema.choicesOrigins = formSchema.schema.choicesOrigins ?? [];
    if (newChoicesOrigins.length) {
      newChoicesOrigins.forEach(choice => {
        formSchema.schema.choicesOrigins = formSchema.schema.choicesOrigins ?? [];
        formSchema.schema.choicesOrigins = formSchema.schema.choicesOrigins.filter(
          (c: any) => c.name !== choice.name,
        );
      });
      formSchema.schema.choicesOrigins = formSchema.schema.choicesOrigins.concat(newChoicesOrigins);
      return formSchema;
    }
    return null;
  }

  /**
   * Return a list of Choice Origin options with values taken from a repeating slide field
   * @param fieldName
   * @param ctx
   * @returns new Choice Origins to add into a Form Schema
   */
  getChoicesFromFieldReps(fieldName: string, ctx: {[key: string]: any}): AjfChoice<string>[] {
    const choices: AjfChoice<string>[] = [];
    Object.keys(ctx).map(key => {
      if (key.indexOf(fieldName + '__') > -1) {
        if (ctx[key] != null) {
          choices.push({
            label: ctx[key],
            value: ctx[key],
          });
        }
      }
    });
    return choices;
  }

  /**
   * Return a list of Choice Origin options with values taken from a list of Form Data documents
   * to be added into choicesOrigins in the formschema
   * @param depsOrigin containing info for labels and values to be used in the choice options
   * @param docs the list of Form Data to be used for the choices
   * @returns new Choice Origins to add into a Form Schema
   */
  getChoicesFromDocs(depsOrigin: DepsOrigin, docs: RxDocument<FormData>[]): AjfChoice<string>[] {
    const choices: AjfChoice<string>[] = [];
    const fieldName = depsOrigin.fields_to_update ? depsOrigin.fields_to_update[0] : null;

    if (fieldName) {
      docs.forEach(doc => {
        const extFormData = doc.toJSON();
        if (
          fieldName in extFormData.data &&
          extFormData.data[fieldName] != null &&
          extFormData.data[fieldName].length
        ) {
          const newChoice = {
            label: this.getLabelForChoice(depsOrigin, extFormData) || extFormData.data[fieldName],
            value: extFormData.data[fieldName],
          };

          if (
            depsOrigin.choices_origin &&
            depsOrigin.choices_origin.extra_value_key &&
            depsOrigin.choices_origin.extra_value_key in extFormData.data &&
            extFormData.data[depsOrigin.choices_origin.extra_value_key]
          ) {
            (newChoice as any)[depsOrigin.choices_origin.extra_value_key] =
              extFormData.data[depsOrigin.choices_origin.extra_value_key];
          }
          choices.push(newChoice);
        }
      });
    }
    return choices.sort((c1, c2) => c1.label.localeCompare(c2.label));
  }

  /**
   * Return a list of Choice Origin options with values taken from a list of Metrics
   * @param docs the list of Metrics to be used for the choices
   * @param metricType metric type (project, case, organization...)
   * @returns new Choice Origins to add into a Form Schema
   */
  getChoicesFromMetrics(docs: RxDocument<Metric>[], metricType: string): AjfChoice<string>[] {
    const choices: AjfChoice<string>[] = [];
    docs.forEach(doc => {
      const newChoice = {
        label: doc.name,
        value: doc.name,
        parent_id: doc.parent_id,
        parent_name: doc.parent_name,
      };
      switch (metricType) {
        case 'project':
          const project = doc as Metric as Project;
          newChoice.label = `${project.name} - (${project.code})`;
      }
      choices.push(newChoice);
    });

    return choices;
  }

  /**
   * Extract the label to be used in the new Choice Origin option
   * @param depsOrigin contains relationships information for the labels to be used in the selection options
   * @param extFormData the Form Data containing the values to be used to construct the label
   * @returns the label for the new Choice Option
   */
  getLabelForChoice(depsOrigin: DepsOrigin, extFormData: FormData): string | null {
    if (
      depsOrigin.choices_origin &&
      depsOrigin.choices_origin.label_fields &&
      depsOrigin.choices_origin.label_fields.length
    ) {
      const choiceLabel: string[] = [];
      depsOrigin.choices_origin.label_fields.forEach(fieldName => {
        if (
          fieldName in extFormData.data &&
          extFormData.data[fieldName] != null &&
          extFormData.data[fieldName].trim().length
        ) {
          choiceLabel.push(extFormData.data[fieldName].trim());
        }
      });
      return choiceLabel && choiceLabel.length ? choiceLabel.join(' ') : null;
    }
    return null;
  }
}
