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

/**
 * Display the User Editor form validation errors
 * @param formControl The formgroup control to be checked
 * @param placeholder The field placeholder
 * @returns The error message to be displayed
 */
export function showValidationErrors(
  formControl: AbstractControl | null,
  placeholder: string | null,
): string {
  if (formControl == null || placeholder == null) {
    return '';
  }
  let errorMessages: string[] = [];
  if (formControl.hasError('required')) {
    errorMessages.push(`Please enter ${placeholder}`);
  }
  if (formControl.hasError('email')) {
    errorMessages.push(`Please enter a valid Email`);
  }
  if (formControl.hasError('minlength')) {
    errorMessages.push(
      `Minimum length: ${formControl.getError('minlength').requiredLength} characters`,
    );
  }
  if (formControl.hasError('password_not_matching')) {
    errorMessages.push(`Password values do not match`);
  }
  return errorMessages.toString().replace(',', ', ');
}
