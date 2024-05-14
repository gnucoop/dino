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

import {AjfFieldType} from '@ajf/core/forms';

export interface ListHeader<T> {
  /**
   * The object key corresponding to the header.
   */
  column: keyof T;
  /**
   * The header label.
   */
  label: string;
  /**
   * If true, the column is sortable.
   */
  sortable?: boolean;
  /**
   * If true, the column can't be displayed.
   */
  hidden?: boolean;
  /**
   * Determines if the column is displayed.
   */
  displayed?: boolean;
  /**
   * The external object reference key (eg. area_ref_id)
   */
  external_ref?: string;
  /**
   * Specifies if the column must be populated by referring to
   * an external collection's property.
   * The reference string will be equal to the "column" property.
   */
  populateWith?: string;
  /**
   * If true, the content displayed in the list cell will be retrieved
   * from the Data attribute of the document. (eg. FormData.data)
   */
  dataColumn?: boolean;
  /**
   * If header of an Ajf Field column, this matches the Ajf Field Type of the corresponding field
   */
  fieldType?: AjfFieldType;
  /**
   * If true, the content of the list cell is retrieved from fields inside
   * a repeating slide.
   */
  repeatingSlideColumn?: boolean;
  /**
   * The name identifier of the repeating slide the header belongs to
   */
  repeatingSlideName?: string;
  /**
   * Optional header icon identifier
   */
  icon?: string;
  /**
   * Method needed to evaluate the editability of a cell.
   * If true and if the active user has the proper permissions,
   * the column cells can be edited directly from the list view.
   * A custom editor must be provided.
   */
  isEditable?: (rowData: {[key: string]: any}) => boolean;
  /**
   * The edit method provided for editable cells
   */
  editMethod?: (rowData: {[key: string]: any}) => void;
}
