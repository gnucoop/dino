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
import {
  DataModelManager,
  DataService,
  PermissionContextService,
  PullQueryContextChecks,
} from '@dino/core/data';
import {delay, forkJoin, from, isObservable, map, Observable, of as obsOf, retryWhen} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {RxDocument} from 'rxdb';

import {FormData, indexes, migrationStrategies} from './form-data';
import {schema} from './form-data-json';
@Injectable({providedIn: 'root'})
export class FormDataManager extends DataModelManager<FormData> {
  constructor(dataService: DataService, permissionContextService: PermissionContextService) {
    const pullQueryContextChecks: PullQueryContextChecks = [
      {checkName: 'user_form_schemas', checkKey: 'form_schema_ref_id'},
      {checkName: 'user_metrics'},
    ];
    schema.indexes = [...(schema.indexes || []), ...indexes];
    const collection = {name: 'form_data', collection: {schema, migrationStrategies}};
    super(collection, dataService, permissionContextService, [], pullQueryContextChecks);
  }

  /**
   * Populates all references to external collections in a FormData
   * @param doc The unpopulated RxDoc FormData
   * @returns The populated FormData
   */
  populateFormData(doc: RxDocument<FormData>): RxDocument<
    FormData & {
      [key: string]: any;
    }
  > {
    let refProps = {};
    for (let prop in doc) {
      if (prop.includes('_ref_id')) {
        const propKey = prop.replace('_ref_id', '') as keyof RxDocument<FormData>;
        let refProp;
        try {
          refProp = {[propKey]: from(doc.populate(prop)).pipe(shareReplay(1))};
        } catch (_) {
          refProp = {[propKey]: obsOf(null)};
        }
        refProps = {...refProps, ...refProp};
      }
    }
    const popDoc = {...deepCopy(doc), ...refProps};
    return popDoc;
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
   * Compares two FormDatas of the same Form Schema and returns the changed attributes keys
   * @param formData_1 The first formData
   * @param formData_2 The second formData
   * @returns The diff attributes keys
   */
  compareFormDatas(
    formData_1: FormData,
    formData_2: FormData,
  ): {attributes: string[]; dataAttributes: string[]} {
    if (
      formData_1 == null ||
      formData_2 == null ||
      formData_1.form_schema_ref_id != formData_2.form_schema_ref_id
    ) {
      return {attributes: [], dataAttributes: []};
    }
    const changedAttributes: string[] = [];
    let changedDataAttributes: string[] = [];
    for (let key in formData_2) {
      const fdKey = key as keyof FormData;
      if (fdKey === 'data') {
        changedDataAttributes = this.compareFormDatasData(formData_1.data, formData_2.data);
      } else if (
        formData_1[fdKey] !== undefined &&
        formData_1[fdKey] != formData_2[fdKey] &&
        fdKey !== 'updated_at'
      ) {
        changedAttributes.push(fdKey);
      }
    }
    return {attributes: changedAttributes, dataAttributes: changedDataAttributes};
  }

  /**
   * Compares the Data attribute of two FormDatas of the same Form Schema and returns the changed data attributes keys
   * @param data_1 The Data of the first form
   * @param data_2 The Data of the second form
   * @returns The diff attributes keys
   */
  compareFormDatasData(data_1: {[key: string]: any}, data_2: {[key: string]: any}): string[] {
    const changedAttributes: string[] = [];
    for (let key in data_2) {
      if (data_1[key] != data_2[key] && !key.startsWith('$')) {
        if (!Array.isArray(data_2[key]) && !Array.isArray(data_1[key])) {
          changedAttributes.push(key);
        } else if (!this._areArraysEquivalent(data_1[key], data_2[key])) {
          changedAttributes.push(key);
        }
      }
    }
    return changedAttributes;
  }

  /**
   * Generates an observable of the populated Form Data.
   * @param formData A populated form data
   * @returns An observable with all the attributes of the populated Form Data
   */
  generatePopulatedFormObservable(
    formData: FormData & {[key: string]: any},
  ): Observable<FormData & {[key: string]: any}> {
    const refsStreams: Observable<{[key: string]: any}>[] = [];
    for (let key in formData) {
      if (isObservable(formData[key])) {
        refsStreams.push(
          formData[key].pipe(
            map(val => {
              return {[key]: val};
            }),
          ),
        );
      } else {
        refsStreams.push(obsOf({[key]: formData[key]}));
      }
    }
    return forkJoin(refsStreams).pipe(map(objs => Object.assign({}, ...objs)));
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

  /**
   * Compares two arrays of primitive values and returns true if they have the same element values.
   * @param arr_1
   * @param arr_2
   * @returns True if the arrays have the same elements
   */
  private _areArraysEquivalent(arr_1: any[] | null, arr_2: any[] | null): boolean {
    if ((arr_1 == null && arr_2 != null) || (arr_1 != null && arr_2 == null)) {
      return false;
    } else if (arr_1 != null && arr_2 != null) {
      return JSON.stringify(arr_1.sort()) === JSON.stringify(arr_2.sort());
    }
    return true;
  }
}
