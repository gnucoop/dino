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
import {FormSchemaManager, FormData} from '@dino/core/forms';
import {Observable, of as obsOf} from 'rxjs';

import {Log} from './log';
import {schema} from './log-json';
import {LogModule} from './log.module';

/**
 * Service that manages Logs
 */
@Injectable({providedIn: LogModule})
export class LogManager extends DataModelManager<Log> {
  constructor(
    private _fsm: FormSchemaManager,
    dataService: DataService,
    permissionContextService: PermissionContextService,
  ) {
    super(
      {name: 'log', collection: {schema}},
      dataService,
      permissionContextService,
      [],
      [{checkName: 'user_form_schemas', checkKey: 'form_schema_ref_id'}],
    );
  }

  /**
   * Generates a Log document
   * @param changes The changes to be recorded in the log
   * @param form_data_ref_id The id of the Form Data
   * @param form_schema_ref_id The id of the Form Schema
   * @param author string,
   * @returns The generated log
   */
  generateLog(
    changes: {
      [key: string]: any;
    }[],
    form_data_ref_id: string,
    form_schema_ref_id: string,
    author: string,
  ): Observable<Log | null> {
    const logMessage = this.generateLogText(author, changes);

    if (logMessage) {
      return this.create({
        text: logMessage,
        form_data_ref_id,
        form_schema_ref_id,
        author,
        created_at: new Date().toISOString(),
      });
    }
    return obsOf(null);
  }

  /**
   * Generates a Log text message
   * @param author The active user
   * @param changes The changes to be recorded in the log
   * @returns The log text message
   */
  generateLogText(
    author: string,
    changes: {
      [key: string]: any;
    }[],
  ): string | null {
    if (author == null || !changes.length) {
      return null;
    }
    const changeDictionary: {
      [key: string]: any;
    } = Object.assign({}, ...changes);
    let logText: string = `<b>${author}</b><br/> `;
    if (changes.length > 10) {
      logText += `changed ${changes.length} settings`;
    } else {
      for (let key in changeDictionary) {
        const changeContent =
          typeof changeDictionary[key] === 'object' &&
          changeDictionary[key] != null &&
          'content' in changeDictionary[key]
            ? `<img style="width: 200px; height: auto;" src=${changeDictionary[key].content}>`
            : changeDictionary[key];
        logText += `<span><i>${(key.charAt(0).toUpperCase() + key.slice(1)).replace(
          '_',
          ' ',
        )}</i>: "${changeContent}</span>"<br/>`;
      }
    }
    return logText;
  }

  /**
   * Generates an array of "attributeChange" objects to be fed to the Log Manager to generate a log.
   * @param formData The form data doc
   * @param diff The changed attributes arrays
   * @returns The "change" objects array
   */
  generateChangesArray(
    formData: FormData & {
      [key: string]: any;
    },
    diff: {
      attributes: string[];
      dataAttributes: string[];
    },
  ): {
    [key: string]: any;
  }[] {
    const attributesChanges: {
      [key: string]: any;
    }[] = diff.attributes.map(attribute => {
      if (attribute.includes('_ref_id')) {
        const populatedAttributeName = attribute.replace('_ref_id', '');
        return {
          [populatedAttributeName]:
            formData[populatedAttributeName]['label'] ?? formData[populatedAttributeName]['name'],
        };
      }
      return {[attribute]: formData[attribute]};
    });

    let dataFieldsChanges: {
      [key: string]: any;
    }[] = [];

    let changes: {
      [key: string]: any;
    }[];

    if (diff.dataAttributes.length) {
      dataFieldsChanges = diff.dataAttributes
        .map(field => {
          const dataFieldLabel = this._fsm.getLabelFromFieldName(field, formData['form_schema']);
          if (dataFieldLabel) {
            return {[dataFieldLabel]: formData['data'][field]};
          }
          return null;
        })
        .filter(ch => ch != null) as {
        [key: string]: any;
      }[];
    }

    changes = [...attributesChanges, ...dataFieldsChanges];
    return changes;
  }
}
