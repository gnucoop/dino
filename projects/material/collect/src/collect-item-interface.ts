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
 * Represents a single List of Forms with the same Form Schema, or a generic/mixed Item
 */
export interface CollectItem {
  /**
   * The Item name identifier
   */
  name: string;

  /**
   * The Item label
   */
  label?: string;

  /**
   * The Item svg icon filename
   */
  icon?: string;

  /**
   * The svg icon, if present
   */
  svgIcon?: string;

  /**
   * The Item custom url
   */
  url?: string;

  /**
   * The Form Schema id
   */
  schemaId?: string;

  /**
   * If true, an Edit Icon will be displayed on the item
   */
  editable?: boolean;

  /**
   * If true, a Share Url icon will be displayed on the item
   */
  shareUrl?: boolean;
}
