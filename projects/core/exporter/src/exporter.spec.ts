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

import {NodeVisibility} from '@dino/core/list';
import {TranslocoService} from '@ngneat/transloco';
import {of as obsOf} from 'rxjs';

import {Exporter} from './exporter';

/**
 * A slide holding a group with two fields in it, plus a field of its own. The
 * renderer draws nothing for the group and lays its fields out in the slide, so
 * the export owes a column to all three.
 */
const schemaWithGroup = {
  name: 'with group',
  schema: {
    nodes: [
      {
        id: 1,
        parent: 0,
        parentNode: 0,
        name: 'slide',
        label: 'Slide',
        nodeType: 3, // AjfSlide
        nodes: [
          {
            id: 1001,
            parent: 1,
            parentNode: 0,
            name: 'group',
            label: 'Group',
            nodeType: 2, // AjfNodeGroup
            nodes: [
              {id: 1001001, parent: 1001, name: 'in_group_1', label: 'In group 1', nodeType: 0, fieldType: 0},
              {id: 1001002, parent: 1001, name: 'in_group_2', label: 'In group 2', nodeType: 0, fieldType: 2},
            ],
          },
          {id: 1002, parent: 1, name: 'outside', label: 'Outside', nodeType: 0, fieldType: 0},
        ],
      },
    ],
  },
} as any;

const allVisible: NodeVisibility[] = [
  {name: 'slide', type: 'slide', visible: true},
  {name: 'group', type: 'field', visible: true},
  {name: 'in_group_1', type: 'field', visible: true},
  {name: 'in_group_2', type: 'field', visible: true},
  {name: 'outside', type: 'field', visible: true},
];

describe('Exporter', () => {
  it('gives a column to the fields held by a group, as it does to the slide own fields', () => {
    const ts = {translate: (s: string) => s} as unknown as TranslocoService;
    const exporter = new Exporter(ts, null, null, null, null, null);

    exporter.setSetupData({
      formSchema: schemaWithGroup,
      nodesVisibility: obsOf(allVisible),
    } as any);

    const model = (exporter as any)._exportModel$.value;
    const exported = model.slides[0].map((node: {name: string}) => node.name);

    expect(exported).toEqual(['in_group_1', 'in_group_2', 'outside']);
  });
});
