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

import {Injectable, Optional} from '@angular/core';
import {
  DataModelManager,
  DataQueryOptions,
  DataService,
  Metric,
  MetricsService,
  PermissionContextService,
  populateDocRefs,
} from '@dino/core/data';
import {FilterGroup, ListHeader} from '@dino/core/list';

import * as baseFsm from './base-form-schema-manager';
import {DepsOrigin, FormSchemaDeps} from './form-schema-deps';
import {FormData} from './form-data';
import {FormDataManager} from './form-data-manager';
import {FormSchema} from './form-schema';
import {
  AjfChoice,
  AjfChoicesOrigin,
  AjfField,
  AjfFieldType,
  AjfNode,
  isContainerNode,
  isField,
  isFieldWithChoices,
} from '@ajf/core/forms';
import {RxDocument} from 'rxdb';
import {Project, ProjectManager} from '@dino/core/projects';
import {deepCopy} from '@ajf/core/utils';
import {
  Observable,
  catchError,
  forkJoin,
  map,
  of as obsOf,
  switchMap,
  take,
  throwError,
  zip,
} from 'rxjs';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

@Injectable({providedIn: 'root'})
export class FormSchemaManager extends DataModelManager<FormSchema> {
  /**
   * A Dictionary of all the optional Metrics managers
   */
  private _metricManagers: {[metricType: string]: DataModelManager<Metric> | null};

  constructor(
    dataService: DataService,
    permissionContextService: PermissionContextService,
    private _metricService: MetricsService,
    private _fdm: FormDataManager,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _caseManager: CaseManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
  ) {
    super(
      baseFsm.creationParams,
      dataService,
      permissionContextService,
      [],
      [{checkName: 'user_form_schemas'}],
    );

    this._metricManagers = {
      area: this._areaManager,
      case: this._caseManager,
      location: this._locationManager,
      organization: this._organizationManager,
      project: this._projectManager,
    } as {[metricType: string]: DataModelManager<Metric> | null};
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
   * Populate the choice origins in the FormSchema
   * adding the external values taken via the relationships
   * @param formSchema
   * @returns the populated form schema
   */
  getSchemaWithRelationships(
    formSchema: RxDocument<FormSchema> | null,
    isList: boolean,
    metricSel: {
      [key: string]: Metric;
    } | null,
  ): Observable<FormSchema | null> {
    if (formSchema) {
      const populatedFormSchema = populateDocRefs<FormSchema>(formSchema);

      return (populatedFormSchema as any)['form_schema_deps'].pipe(
        switchMap((doc: RxDocument<FormSchemaDeps>) => {
          if (doc == null) {
            return obsOf(null);
          }
          return obsOf(doc.toJSON()) as Observable<FormSchemaDeps>;
        }),
        switchMap((fschemadeps: FormSchemaDeps) => {
          if (fschemadeps == null || fschemadeps.deps_origin == null) {
            return zip(obsOf(null), obsOf(null), obsOf(fschemadeps));
          }

          const extFormDataRes = this.getExternalFormData(fschemadeps, isList, metricSel);

          const metricsChoicesOrigin = (fschemadeps.deps_origin as DepsOrigin[]).find(
            deps => deps.metrics_choices_origin != null && deps.metrics_choices_origin.length,
          );
          const metricOptSource = this.getAllFormMetricsByTypes(
            metricsChoicesOrigin?.metrics_choices_origin,
          );

          return zip(extFormDataRes, metricOptSource, obsOf(fschemadeps));
        }),
        map((originData: any[]) => {
          if (originData && originData.length > 2) {
            const changes: RxDocument<FormData>[][] | null = originData[0];
            const metricsOrigin: RxDocument<Metric>[][] | null = originData[1];
            const fschemadeps = originData[2] as FormSchemaDeps;

            const newChoicesOrigins: AjfChoicesOrigin<string>[] = [];
            const newFormSchema: FormSchema = deepCopy(formSchema);
            if (fschemadeps && fschemadeps.deps_origin && newFormSchema.schema.nodes) {
              let extDocsIdx = 0;
              fschemadeps.deps_origin.forEach(depsOrigin => {
                if (
                  depsOrigin.form_schema_ref_id &&
                  depsOrigin.fields_to_update &&
                  depsOrigin.fields_to_update.length
                ) {
                  if (depsOrigin.is_choice && changes && changes.length > extDocsIdx) {
                    const field = depsOrigin.fields_to_update[0];
                    const choicesOriginName = field + '_choice';
                    const formDataForChoices =
                      changes && changes.length > extDocsIdx ? changes[extDocsIdx] : null;
                    newChoicesOrigins.push({
                      type: 'fixed',
                      name: choicesOriginName,
                      label: choicesOriginName,
                      choices: this.getChoicesFromDocs(depsOrigin, formDataForChoices),
                    });
                    extDocsIdx++;
                  } else {
                    depsOrigin.fields_to_update.forEach(field => {
                      // Replace the field type for all fields that have a
                      // choice origin based on a One-to-One Relationship
                      const choicesOriginName = field + '_choice';
                      this.findFieldsWithChoicesByChoicesName(
                        newFormSchema,
                        choicesOriginName,
                        true,
                      );
                    });
                  }
                }
              });
            }

            if (metricsOrigin && metricsOrigin.length) {
              metricsOrigin.forEach(metricOrigin => {
                if (metricOrigin.length) {
                  const choicesOriginName = metricOrigin[0].collection.name + '_metric_choice';
                  newChoicesOrigins.push({
                    type: 'fixed',
                    name: choicesOriginName,
                    label: choicesOriginName,
                    choices: this.getChoicesFromMetrics(
                      metricOrigin,
                      metricOrigin[0].collection.name,
                    ),
                  });
                }
              });
            }

            if (newChoicesOrigins.length) {
              const schemaWithNewChoices = this.addChoiceOriginToFormSchema(
                newFormSchema,
                newChoicesOrigins,
              );
              return schemaWithNewChoices;
            }
            return newFormSchema;
          }
          return formSchema;
        }),
      );
    }
    return obsOf(null);
  }

  /**
   * Return the queries for the external datas for relationships
   * @param fschemadeps The form schema dependencies info
   * @param isList true if is a list datasource, false if is a create/edit single form
   * @param metricSel The selected metrics for the edited formdata if isList false
   * @returns A forkJoin for all the queries for the relationships data
   */
  getExternalFormData(
    fschemadeps: FormSchemaDeps,
    isList: boolean,
    metricSel: {
      [key: string]: Metric;
    } | null,
  ): Observable<RxDocument<FormData>[][] | null> {
    let extFormDataRes: Observable<RxDocument<FormData>[][] | null> = obsOf(null);
    const extFormDataObs: Observable<any>[] = [];
    if (fschemadeps.deps_origin) {
      const activeMetrics = this._metricService.activeMetrics.value.map(
        metric => metric.metricName,
      );
      fschemadeps.deps_origin
        .filter(
          deps =>
            deps.form_schema_ref_id != null &&
            deps.fields_to_update &&
            deps.fields_to_update.length,
        )
        .forEach(depsOrigin => {
          let addRelationshipQuery = true;
          const opt: DataQueryOptions = {
            selector: {
              form_schema_ref_id: {$eq: depsOrigin.form_schema_ref_id},
              is_deleted: {$ne: true},
            },
            sort: [{created_at: 'desc'}],
          };
          if (!isList) {
            if (!depsOrigin.is_choice) {
              opt['limit'] = 1;
            }

            if (depsOrigin.filter_by_metric) {
              depsOrigin.filter_by_metric.forEach(metric => {
                if (activeMetrics.includes(metric) && metricSel && metricSel[metric]) {
                  opt['selector'][metric + '_ref_id'] = {
                    $eq: metricSel[metric].id,
                  };
                } else {
                  addRelationshipQuery = false;
                }
              });
            }
          } else {
            // For relationships in list datasource, add only choices relationships
            if (!depsOrigin.is_choice) {
              addRelationshipQuery = false;
            }
          }

          if (addRelationshipQuery) {
            const query = this._fdm.query(opt).pipe(
              take(1),
              catchError(err => throwError(() => err) as Observable<RxDocument<FormData>[]>),
            );
            extFormDataObs.push(query);
          }
        });
    }
    if (extFormDataObs.length) {
      extFormDataRes = forkJoin(extFormDataObs).pipe(
        map((extDatas: RxDocument<FormData>[][]) => {
          return extDatas;
        }),
      );
    }
    return extFormDataRes;
  }

  /**
   * Retrieves all values for the requested metric types
   * @param metricTypes The Metric types
   * @returns A forkJoin for all the queries for all metrics grouped by metric type
   */
  getAllFormMetricsByTypes(
    metricsTypes: string[] | null | undefined,
  ): Observable<RxDocument<Metric>[][] | null> {
    let metricOptSourceObs: Observable<RxDocument<Metric, {}>[]>[] = [];
    let metricOptSource: Observable<RxDocument<Metric>[][] | null> = obsOf(null);
    if (metricsTypes) {
      metricsTypes.forEach(metricType => {
        if (metricType && this._metricManagers[metricType] != null) {
          let mtOptSource = this._metricManagers[metricType]!.query({
            selector: {is_deleted: {$ne: true}},
            sort: [{'name': 'asc'}],
          });
          metricOptSourceObs.push(mtOptSource);
        }
      });
    }
    if (metricOptSourceObs.length) {
      metricOptSource = forkJoin(metricOptSourceObs).pipe(
        map((mData: RxDocument<Metric>[][]) => {
          return mData;
        }),
      );
    }
    return metricOptSource;
  }

  /**
   * If a choices origin with the input name exists in the schema, with a size of 0 or 1 element, this is a relationship choices orign.
   * In that case, find and return all form schema fields than using this input choice origin name.
   * @param nodes the form schema
   * @param choicesOriginName the choices origin name to be found
   * @param replaceFieldType if true replaces the type with type String, for the field found.
   * This is used by the advanced search for relationships repeating slide fields.
   * @returns true if the choicesOriginName is used by some fields
   */
  findFieldsWithChoicesByChoicesName(
    formSchema: FormSchema,
    choicesOriginName: string,
    replaceFieldType: boolean,
  ): boolean {
    let hasRelationshipsChoiceField = false;
    const choicesOriginSize = formSchema.schema?.choicesOrigins?.find(
      co => co.name === choicesOriginName,
    )?.choices.length;

    const nodes = formSchema.schema?.nodes;
    if (nodes && choicesOriginSize && choicesOriginSize <= 1) {
      nodes.forEach((ctnNode: AjfNode) => {
        if (isContainerNode(ctnNode)) {
          ctnNode.nodes.forEach((n: AjfNode) => {
            if (
              isField(n) &&
              isFieldWithChoices(n) &&
              (n as any).choicesOriginRef === choicesOriginName
            ) {
              hasRelationshipsChoiceField = true;
              if (replaceFieldType) {
                (n as AjfField).fieldType = AjfFieldType.String;
              }
            }
          });
        }
      });
    }
    return hasRelationshipsChoiceField;
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
  getChoicesFromFieldReps(
    fieldName: string,
    ctx: {[key: string]: any} | null,
  ): AjfChoice<string>[] {
    const choices: AjfChoice<string>[] = [];
    if (ctx) {
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
    }
    if (choices.length === 0) {
      choices.push({label: 'None', value: 'none'});
    }
    return choices;
  }

  /**
   * Return a list of Choice Origin options with values taken from a list of Form Data documents
   * to be added into choicesOrigins in the formschema
   * @param depsOrigin containing info for labels and values to be used in the choice options
   * @param docs the list of Form Data to be used for the choices
   * @returns new Choice Origins to add into a Form Schema
   */
  getChoicesFromDocs(
    depsOrigin: DepsOrigin,
    docs: RxDocument<FormData>[] | null,
  ): AjfChoice<string>[] {
    const choices: AjfChoice<string>[] = [];
    const fieldName = depsOrigin.fields_to_update ? depsOrigin.fields_to_update[0] : null;

    if (fieldName && docs) {
      docs.forEach(doc => {
        const extFormData = doc.toJSON();
        if (
          fieldName in extFormData.data &&
          extFormData.data[fieldName] != null &&
          extFormData.data[fieldName].toString().length
        ) {
          const newChoice = {
            label:
              this.getLabelForChoice(depsOrigin, extFormData) ||
              extFormData.data[fieldName].toString(),
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
    if (choices.length === 0) {
      choices.push({label: 'None', value: 'none'});
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
          extFormData.data[fieldName].toString().trim().length
        ) {
          choiceLabel.push(extFormData.data[fieldName].toString().trim());
        }
      });
      return choiceLabel && choiceLabel.length ? choiceLabel.join(' ') : null;
    }
    return null;
  }

  /**
   * Set new additional Controls in Form Group or update value if control exist
   * @param formGroup
   * @param additionalFormControls form controls to be set into form
   */
  setNewControlsInForm(
    formGroup: UntypedFormGroup | null,
    additionalFormControls: {[key: string]: {[key: string]: any}},
  ): void {
    if (
      formGroup &&
      formGroup.controls &&
      additionalFormControls &&
      Object.keys(additionalFormControls).length
    ) {
      const controlsToAdd: string[] = [];
      const patchVal: {[key: string]: any} = {};
      Object.keys(additionalFormControls).forEach(fcName => {
        const fcCtx = additionalFormControls[fcName];
        if (fcCtx) {
          if (fcName in formGroup.controls) {
            patchVal[fcName] = fcCtx;
          } else {
            patchVal[fcName] = null;
            controlsToAdd.push(fcName);
          }
        }
      });
      if (Object.keys(patchVal).length) {
        // Update value in formgroup
        formGroup.patchValue(patchVal);
      }
      controlsToAdd.forEach(fcName => {
        // Add control in formgroup
        const fcCtx = additionalFormControls[fcName];
        formGroup.setControl(fcName, new UntypedFormControl(fcCtx));
      });
    }
  }

  /**
   * Returns true if any Form Data with this Form Schema ID exists
   */
  hasAnyData(formSchemaId: string): Observable<boolean> {
    const queryOptions: DataQueryOptions = {
      selector: {
        form_schema_ref_id: {$eq: formSchemaId},
        is_deleted: {$ne: true},
      },
      limit: 1,
    };
    return this._fdm.query(queryOptions).pipe(map(res => res.length > 0));
  }

  /**
   * Removes a single Form Schema by id. Updates its name with the current timestamp
   * before deleting it.
   * @param schemaId
   * @returns an observable of the deleted object
   */
  override delete(schemaId: string): Observable<RxDocument<FormSchema> | null> {
    const now = Date.now().toString();
    return this.get(schemaId).pipe(
      switchMap(schema => {
        if (schema == null) return obsOf(null);
        const newSchema = {
          id: schema.id,
          created_at: schema.created_at,
          updated_at: schema.updated_at,
          name: `${schema.name}_${now}`,
          label: schema.label,
          icon: schema.icon,
          form_status_ref_id: schema.form_status_ref_id,
          form_schema_metrics: schema.form_schema_metrics,
          visibility: schema.visibility,
          schema: schema.schema,
          form_schema_deps_ref_id: schema.form_schema_deps_ref_id,
          is_deleted: true,
          _deleted: true,
        };
        return this.update(newSchema);
      }),
    );
  }
}
