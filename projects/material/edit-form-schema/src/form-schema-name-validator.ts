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
import {ChangeDetectorRef, Injectable} from '@angular/core';
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {DataModelManager} from '@dino/core/data';
import {FormSchema} from '@dino/core/forms';
import {Observable, of} from 'rxjs';
import {debounceTime, finalize, map, take} from 'rxjs/operators';

/**
 * Custom validator service that checks for an already existing
 * Form Schema with the given name.
 */
@Injectable()
export class FormSchemaNameMatchValidator<T extends FormSchema = FormSchema> {
  constructor() {}

  /**
   * Custom async validator method.
   * Checks if a Form Schema with the same Name exists, in order to
   * validate the Form Schema Creation/Editing form.
   * @param manager The Metric manager
   * @param cdr The editor changeDetectionRef
   * @param currentName The current metric name
   * @param action The action performed on the metric
   */
  nameCheck(
    manager: DataModelManager<T>,
    cdr: ChangeDetectorRef,
    currentName?: string,
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      // Names are compared trimmed and case-insensitively: "Dup Name" and " dup name "
      // look like the same form to a user.
      const name = normalizeSchemaName(control.value);
      if (name === '' || (currentName != null && name === normalizeSchemaName(currentName))) {
        return of(null);
      }
      const pattern = `^\\s*${escapeRegExp(name)}\\s*$`;
      return manager.query({selector: {name: {$regex: pattern, $options: 'i'}}}).pipe(
        debounceTime(300),
        map(docs => {
          if (docs.length) {
            return {incorrect: true};
          } else {
            return null;
          }
        }),
        finalize(() => {
          control.markAsTouched();
          cdr.detectChanges();
        }),
        take(1),
      );
    };
  }
}

/**
 * The name as it is compared: without the spaces around it and in lower case.
 */
function normalizeSchemaName(name: unknown): string {
  return typeof name === 'string' ? name.trim().toLowerCase() : '';
}

/**
 * Escapes the characters that have a meaning in a regular expression.
 */
function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
