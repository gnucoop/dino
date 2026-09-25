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

import {migrationStrategies, VERSION} from './form-schema';
import {schema} from './form-schema-json';

describe('FormSchema', () => {
  it('should bump the json schema version together with the model version', () => {
    expect(schema.version).toBe(VERSION);
  });

  it('should have a migration strategy for every version', () => {
    for (let version = 1; version <= VERSION; version++) {
      expect(migrationStrategies[version]).withContext(`version ${version}`).toBeDefined();
    }
  });

  it('should keep a v4 document unchanged when migrating to v5', () => {
    const doc = {
      id: 'fs1',
      name: 'assessment',
      visibility: 1,
      form_schema_metrics: ['location'],
      schema: {nodes: []},
    };
    expect(migrationStrategies[5]({...doc} as any, null as any)).toEqual(doc);
  });

  it('should declare the groups as an array of named objects', () => {
    const groups = (schema.properties as any)['form_schema_groups'];
    expect(groups.type).toBe('array');
    expect(groups.items.required).toEqual(['name']);
  });
});
