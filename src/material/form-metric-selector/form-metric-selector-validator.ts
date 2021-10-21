/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dewco (dewco).
 *
 * Dewco (dewco) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dewco (dewco) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dewco (dewco).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {AbstractControl, ValidationErrors} from '@angular/forms';
import {MetricBasicInfo} from '@dewco/core/users';

/**
 * Custom validator method for autocomplete field,
 * to force the selection of a suggested option.
 * @param control The form control.
 */
export function RequireMetricMatch(control: AbstractControl): ValidationErrors | null {
  const selection: string | MetricBasicInfo = control.value;
  if (
    (typeof selection === 'string' && selection !== '') ||
    selection === '' ||
    selection == null ||
    selection.metricId == null ||
    selection.metricName == null
  ) {
    return {incorrect: true};
  }
  return null;
}
