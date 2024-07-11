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
import {Observable} from 'rxjs';
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
      return manager.query({selector: {name: {$eq: control.value}}}).pipe(
        debounceTime(300),
        map(docs => {
          if (currentName != null) {
            docs = docs.filter(doc => doc.name != currentName);
          }
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
