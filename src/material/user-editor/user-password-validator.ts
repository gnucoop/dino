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

import {AbstractControl, ValidationErrors} from '@angular/forms';

/**
 * Custom validator method for the User Password,
 * to check password matching.
 * @param control The form control.
 */
export function PasswordMatch(control: AbstractControl): ValidationErrors | null {
  const selection: string = control.value;
  const matchingValue: AbstractControl | null | undefined = control.parent?.get('password');

  if (
    selection === '' ||
    selection == null ||
    matchingValue == null ||
    selection != matchingValue.value
  ) {
    return {password_not_matching: true};
  }
  return null;
}
