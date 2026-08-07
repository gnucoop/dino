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
import {ActivatedRouteSnapshot} from '@angular/router';

/**
 * Builds the key the preferences of a list section are stored under, i.e. its
 * columns and its filters, so that they always identify a section the same way.
 * @param prefix What is stored, i.e. 'columns' or 'filters'
 * @param snapshot The route snapshot of the section
 * @param title The title of the list, for the sections that have one
 * @returns The key, or null for a section that has no identity of its own and
 * whose preferences are therefore not stored
 */
export function sectionStorageKey(
  prefix: string,
  snapshot: ActivatedRouteSnapshot,
  title?: string,
): string | null {
  if (snapshot.data['isFormData']) {
    return snapshot.params['form_schema_id'] ? `${prefix}_${snapshot.params['form_schema_id']}` : null;
  } else if (snapshot.data['isReportData']) {
    return snapshot.params['report_schema_id']
      ? `${prefix}_${snapshot.params['report_schema_id']}`
      : null;
  } else if (title) {
    return `${prefix}_${title}`;
  } else if (snapshot.data['aggregation']) {
    return `${prefix}_aggregation`;
  }
  return null;
}
