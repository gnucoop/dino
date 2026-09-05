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
 * The User Area tabs. Doubles as the ':tab' route segment, so the values are URL slugs.
 * 'ai' covers what used to be two separate panels, API Keys and Credits.
 */
export type UserAreaPanelType = 'password' | 'ai' | 'theme' | 'backup' | 'tutorial';

/**
 * Every tab slug, in display order.
 */
export const USER_AREA_PANEL_TYPES: UserAreaPanelType[] = [
  'password',
  'ai',
  'theme',
  'backup',
  'tutorial',
];

/**
 * True if the value names a tab. Lets the host reject a hand typed url segment before it
 * reaches the page.
 * @param value The candidate slug
 */
export function isUserAreaPanelType(value: string | null): value is UserAreaPanelType {
  return value != null && (USER_AREA_PANEL_TYPES as string[]).includes(value);
}

/**
 * A User Area tab: the slug plus the copy for its tab label and its panel heading. The
 * tabs are built as data rather than as a fixed list of elements, so that hiding one
 * cannot desynchronise the tab index from the route slug.
 */
export interface UserAreaTab {
  /**
   * The tab identity, and its ':tab' route segment.
   */
  id: UserAreaPanelType;
  /**
   * The label on the tab itself, as a translation key.
   */
  label: string;
  /**
   * The heading at the top of the panel, as a translation key.
   */
  title: string;
  /**
   * The one line description under the heading, as a translation key.
   */
  description: string;
}
