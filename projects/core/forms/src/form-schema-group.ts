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

/**
 * A thematic group a form schema belongs to. Groups work like tags: a form schema can
 * belong to several of them, and there is no catalogue of groups of its own. Every form
 * schema carries the full definition of its groups, and the catalogue is derived by
 * merging them across all form schemas, by name.
 * @title FormSchemaGroup
 */
export interface FormSchemaGroup {
  /**
   * The group name. It is the identity of the group, compared trimmed and case-insensitively.
   */
  name: string;

  /**
   * An optional description of the group.
   */
  description?: string;

  /**
   * The group color, as a `#RRGGBB` hex string.
   */
  color?: string;
}

/**
 * Returns the key identifying a group by its name: trimmed and lower cased.
 */
export function formSchemaGroupKey(name: string | null | undefined): string {
  return (name ?? '').trim().toLocaleLowerCase();
}

/**
 * The colors offered for a group. They are picked to read on both the light and the dark
 * theme, and the last one is the neutral used for a group without a color.
 */
export const FORM_SCHEMA_GROUP_COLORS: readonly string[] = [
  '#4fd1d9',
  '#f2b84b',
  '#7fb2f5',
  '#c09bf5',
  '#6fdc8c',
  '#e58a8a',
  '#a3abb5',
];

/**
 * The color used for a group that has none.
 */
export const FORM_SCHEMA_GROUP_DEFAULT_COLOR = '#a3abb5';

/**
 * Derives the catalogue of groups from a list of form schemas.
 *
 * Groups are merged by name. When two form schemas describe the same group differently, the
 * definition of the most recently updated one wins, so an edit made on a form schema becomes
 * the reference for the group once saved, without rewriting the others.
 * The result is sorted by name.
 */
export function formSchemaGroupsCatalogue(
  formSchemas: {form_schema_groups?: FormSchemaGroup[] | null; updated_at?: string}[],
): FormSchemaGroup[] {
  const byKey = new Map<string, {group: FormSchemaGroup; updatedAt: string}>();
  for (const formSchema of formSchemas) {
    const updatedAt = formSchema.updated_at ?? '';
    for (const group of formSchema.form_schema_groups ?? []) {
      const key = formSchemaGroupKey(group?.name);
      if (key.length === 0) {
        continue;
      }
      const current = byKey.get(key);
      if (current == null || new Date(updatedAt) > new Date(current.updatedAt)) {
        byKey.set(key, {group: {...group, name: group.name.trim()}, updatedAt});
      }
    }
  }
  return [...byKey.values()]
    .map(entry => entry.group)
    .sort((a, b) => a.name.localeCompare(b.name));
}
