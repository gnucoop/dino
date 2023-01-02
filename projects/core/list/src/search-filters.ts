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

import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

/**
 * Abstract base component inherited by any FiltersComponent.
 * Provides the default basic filters: dateStart, dateEnd and keyword search.
 */
export abstract class SearchFiltersComponent {
  /**
   * Keyword search filters.
   */
  readonly textSearchFilters: UntypedFormGroup;

  /**
   * "from Date" and "to Date" search filters.
   */
  readonly dateSearchFilters: UntypedFormGroup;

  /**
   * All the default basic filters.
   */
  basicFilters: UntypedFormGroup[];

  /**
   * All the additional and optional basic filter (eg. Project, Location etc.)
   */
  additionalBasicFilters: UntypedFormGroup[];

  /**
   * All the available additional basic filters labels.
   */
  additionalBasicFiltersLabels: string[] = [];

  constructor() {
    this.textSearchFilters = new UntypedFormGroup({keyword: new UntypedFormControl()});
    this.dateSearchFilters = new UntypedFormGroup({
      dateStart: new UntypedFormControl(),
      dateEnd: new UntypedFormControl(),
    });
    this.basicFilters = [this.textSearchFilters, this.dateSearchFilters];
    this.additionalBasicFilters = [];
  }
}
