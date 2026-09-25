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

import {
  buildChips,
  buildGroups,
  buildSections,
  filterByGroups,
  groupIdsOf,
  PUBLIC_GROUP_ID,
  tagsOf,
  UNGROUPED_GROUP_ID,
} from './collect-groups';
import {CollectItem} from './collect-item-interface';

const item = (name: string, groups: string[], isPublic = false): CollectItem => ({
  name,
  label: name,
  isPublic,
  groups: groups.map(g => ({name: g, color: '#123456'})),
});

const items: CollectItem[] = [
  item('assessment', ['Health'], true),
  item('baseline', ['M&E']),
  item('enrollment', ['Health', 'Education'], true),
  item('survey', [], true),
  item('needs', []),
];

describe('collect groups', () => {
  it('should put a public form in the public group as well as in its own groups', () => {
    expect(groupIdsOf(items[0])).toEqual([PUBLIC_GROUP_ID, 'health']);
  });

  it('should put a form with no thematic group in the ungrouped group', () => {
    expect(groupIdsOf(items[3])).toEqual([PUBLIC_GROUP_ID, UNGROUPED_GROUP_ID]);
    expect(groupIdsOf(items[4])).toEqual([UNGROUPED_GROUP_ID]);
  });

  it('should list thematic groups by name, then public, then ungrouped', () => {
    expect(buildGroups(items).map(g => g.id)).toEqual([
      'education',
      'health',
      'm&e',
      PUBLIC_GROUP_ID,
      UNGROUPED_GROUP_ID,
    ]);
  });

  it('should leave out an automatic group no item falls in', () => {
    const ids = buildGroups([item('baseline', ['M&E'])]).map(g => g.id);
    expect(ids).toEqual(['m&e']);
  });

  it('should count every item of a chip, over all the items', () => {
    const counts = buildChips(items).map(c => [c.id, c.count]);
    expect(counts).toEqual([
      ['education', 1],
      ['health', 2],
      ['m&e', 1],
      [PUBLIC_GROUP_ID, 3],
      [UNGROUPED_GROUP_ID, 2],
    ]);
  });

  it('should keep the items of any selected group (OR)', () => {
    expect(filterByGroups(items, ['m&e', UNGROUPED_GROUP_ID]).map(i => i.name)).toEqual([
      'baseline',
      'survey',
      'needs',
    ]);
    expect(filterByGroups(items, []).length).toBe(items.length);
  });

  it('should show a form in every section of its groups', () => {
    const sections = buildSections(buildGroups(items), items, []);
    const enrollmentIn = sections
      .filter(s => s.items.some(i => i.name === 'enrollment'))
      .map(s => s.group.id);
    expect(enrollmentIn).toEqual(['education', 'health', PUBLIC_GROUP_ID]);
  });

  it('should only build the sections of the selected groups', () => {
    const sections = buildSections(buildGroups(items), items, ['health']);
    expect(sections.map(s => s.group.id)).toEqual(['health']);
  });

  it('should drop the sections left empty by the search', () => {
    const visible = items.filter(i => i.name.includes('base'));
    const sections = buildSections(buildGroups(items), visible, []);
    expect(sections.map(s => s.group.id)).toEqual(['m&e']);
  });

  it('should resolve the tags of an item against the groups', () => {
    const tags = tagsOf(items[2], buildGroups(items)).map(t => t.name);
    expect(tags).toEqual(['Public forms', 'Health', 'Education']);
  });
});
