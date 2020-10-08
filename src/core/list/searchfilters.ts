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
import {FormControl, FormGroup} from '@angular/forms';
import {FiltersService} from './public-api';

/**
 * Abstract base component inherited by FiltersComponents
 */
export abstract class SearchFiltersComponent {
  readonly textSearchFilters: FormGroup;
  readonly dateSearchFilters: FormGroup;
  readonly basicFilters: FormGroup[];

  constructor(protected _fts: FiltersService) {
    this.textSearchFilters = new FormGroup({keyword: new FormControl()});
    this.dateSearchFilters = new FormGroup({
      dateStart: new FormControl(),
      dateEnd: new FormControl(),
    });
    this.basicFilters = [this.textSearchFilters, this.dateSearchFilters];
  }
}
