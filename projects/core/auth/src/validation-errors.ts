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

import {AbstractControl} from '@angular/forms';
import {HashMap, TranslocoService} from '@ngneat/transloco';

/**
 * Translates a key, replacing the `{{param}}` placeholders with the given params.
 */
export type ValidationErrorsTranslate = (key: string, params?: HashMap) => string;

/**
 * Fills the `{{param}}` placeholders of a key without translating it.
 */
const untranslated: ValidationErrorsTranslate = (key, params) =>
  key.replace(/{{\s*(\w+)\s*}}/g, (match, name) => (params?.[name] ?? match).toString());

/**
 * Display the form validation errors of a field
 * @param formControl The formgroup control to be checked
 * @param placeholder The field label, as a translation key
 * @param translate Translates the messages and the label; without it they stay in English
 * @returns The error message to be displayed
 */
export function showValidationErrors(
  formControl: AbstractControl | null,
  placeholder: string | null,
  translate: ValidationErrorsTranslate = untranslated,
): string {
  if (formControl == null || placeholder == null) {
    return '';
  }
  let errorMessages: string[] = [];
  if (formControl.hasError('required')) {
    errorMessages.push(translate('Please enter {{field}}', {field: translate(placeholder)}));
  }
  if (formControl.hasError('email')) {
    errorMessages.push(translate('Please enter a valid Email'));
  }
  if (formControl.hasError('minlength')) {
    errorMessages.push(
      translate('Minimum length: {{count}} characters', {
        count: formControl.getError('minlength').requiredLength,
      }),
    );
  }
  if (formControl.hasError('password_not_matching')) {
    errorMessages.push(translate('Password values do not match'));
  }
  return errorMessages.join(', ');
}

/**
 * @param ts The service the messages are translated with
 * @returns `showValidationErrors` with the messages translated in the active language
 */
export function translatedValidationErrors(
  ts: TranslocoService,
): (formControl: AbstractControl | null, placeholder: string | null) => string {
  return (formControl, placeholder) =>
    showValidationErrors(formControl, placeholder, (key, params) => ts.translate(key, params));
}
