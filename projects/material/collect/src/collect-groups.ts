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
  FORM_SCHEMA_GROUP_DEFAULT_COLOR,
  FormSchemaGroup,
  formSchemaGroupKey,
  formSchemaGroupsCatalogue,
} from '@dino/core/forms';

import {CollectItem} from './collect-item-interface';

/**
 * The id of the automatic group holding every public form.
 */
export const PUBLIC_GROUP_ID = '__public';

/**
 * The id of the automatic group holding the forms that belong to no thematic group.
 */
export const UNGROUPED_GROUP_ID = '__ungrouped';

/**
 * A group as shown by the collect: a thematic group of the form schemas, or one of the two
 * automatic ones. The name and description of an automatic group are translation keys.
 */
export interface CollectGroup {
  id: string;
  name: string;
  description?: string;
  color: string;
  kind: 'group' | 'public' | 'ungrouped';
}

/**
 * A group of the tag bar, with the number of items it holds.
 */
export interface CollectChip extends CollectGroup {
  count: number;
}

/**
 * A section of the collect: a group and the visible items it holds.
 */
export interface CollectSection {
  group: CollectGroup;
  items: CollectItem[];
}

const PUBLIC_GROUP: CollectGroup = {
  id: PUBLIC_GROUP_ID,
  name: 'Public forms',
  description: 'Anyone can fill them in through the public link, without logging in.',
  color: '#6fdc8c',
  kind: 'public',
};

const UNGROUPED_GROUP: CollectGroup = {
  id: UNGROUPED_GROUP_ID,
  name: 'Ungrouped',
  description: 'Not assigned to any group yet.',
  color: FORM_SCHEMA_GROUP_DEFAULT_COLOR,
  kind: 'ungrouped',
};

/**
 * Returns the ids of the groups an item appears in: the public group if the item is public,
 * then its thematic groups, or the ungrouped group when it has none.
 */
export function groupIdsOf(item: CollectItem): string[] {
  const own = (item.groups ?? [])
    .map(group => formSchemaGroupKey(group.name))
    .filter(key => key.length > 0);
  return [...(item.isPublic ? [PUBLIC_GROUP_ID] : []), ...(own.length ? own : [UNGROUPED_GROUP_ID])];
}

/**
 * Returns the groups of the given items, in display order: the thematic groups by name,
 * then the public forms, then the ungrouped ones. An automatic group is listed only when
 * at least one item falls in it.
 */
export function buildGroups(items: CollectItem[]): CollectGroup[] {
  const thematic = formSchemaGroupsCatalogue(
    items.map(item => ({form_schema_groups: item.groups, updated_at: item.updatedAt})),
  ).map(
    (group: FormSchemaGroup): CollectGroup => ({
      id: formSchemaGroupKey(group.name),
      name: group.name,
      description: group.description,
      color: group.color || FORM_SCHEMA_GROUP_DEFAULT_COLOR,
      kind: 'group',
    }),
  );
  const ids = items.map(groupIdsOf);
  const automatic = [PUBLIC_GROUP, UNGROUPED_GROUP].filter(group =>
    ids.some(itemIds => itemIds.includes(group.id)),
  );
  return [...thematic, ...automatic];
}

/**
 * Returns the chips of the tag bar. Counts are taken over all the items, so they do not
 * follow the search.
 */
export function buildChips(items: CollectItem[]): CollectChip[] {
  const ids = items.map(groupIdsOf);
  return buildGroups(items).map(group => ({
    ...group,
    count: ids.filter(itemIds => itemIds.includes(group.id)).length,
  }));
}

/**
 * Keeps the items that belong to at least one of the selected groups, or all of them when
 * no group is selected.
 */
export function filterByGroups(items: CollectItem[], selected: string[]): CollectItem[] {
  if (selected.length === 0) {
    return items;
  }
  return items.filter(item => groupIdsOf(item).some(id => selected.includes(id)));
}

/**
 * Splits the visible items into one section per group. An item in several groups appears
 * in each of their sections. Only the selected groups get a section when any is selected,
 * and a section with no item is dropped.
 * @param groups All the groups, in display order (see `buildGroups`).
 * @param visible The items left by the search and the group filter.
 * @param selected The ids of the selected groups.
 */
export function buildSections(
  groups: CollectGroup[],
  visible: CollectItem[],
  selected: string[],
): CollectSection[] {
  const ids = visible.map(groupIdsOf);
  return groups
    .filter(group => selected.length === 0 || selected.includes(group.id))
    .map(group => ({group, items: visible.filter((_, i) => ids[i].includes(group.id))}))
    .filter(section => section.items.length > 0);
}

/**
 * Returns the tags of an item, resolved against the groups so that a group looks the same
 * on every item, whatever definition the item carries.
 */
export function tagsOf(item: CollectItem, groups: CollectGroup[]): CollectGroup[] {
  return groupIdsOf(item)
    .map(id => groups.find(group => group.id === id))
    .filter((group): group is CollectGroup => group != null);
}
