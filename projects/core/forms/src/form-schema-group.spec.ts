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

import {formSchemaGroupKey, formSchemaGroupsCatalogue} from './form-schema-group';

describe('formSchemaGroupsCatalogue', () => {
  it('should merge groups by trimmed, case-insensitive name', () => {
    const catalogue = formSchemaGroupsCatalogue([
      {form_schema_groups: [{name: 'Health'}], updated_at: '2026-01-01T00:00:00Z'},
      {form_schema_groups: [{name: ' health '}, {name: 'M&E'}], updated_at: '2026-01-02T00:00:00Z'},
    ]);
    expect(catalogue.map(g => formSchemaGroupKey(g.name))).toEqual(['health', 'm&e']);
  });

  it('should keep the definition of the most recently updated form schema', () => {
    const catalogue = formSchemaGroupsCatalogue([
      {form_schema_groups: [{name: 'Health', color: '#new'}], updated_at: '2026-03-01T00:00:00Z'},
      {form_schema_groups: [{name: 'Health', color: '#old'}], updated_at: '2026-01-01T00:00:00Z'},
    ]);
    expect(catalogue).toEqual([{name: 'Health', color: '#new'}]);
  });

  it('should skip groups without a name and form schemas without groups', () => {
    const catalogue = formSchemaGroupsCatalogue([
      {form_schema_groups: [{name: '  '}]},
      {form_schema_groups: null},
      {},
    ]);
    expect(catalogue).toEqual([]);
  });

  it('should sort the groups by name', () => {
    const catalogue = formSchemaGroupsCatalogue([
      {form_schema_groups: [{name: 'Training'}, {name: 'Education'}]},
    ]);
    expect(catalogue.map(g => g.name)).toEqual(['Education', 'Training']);
  });
});
