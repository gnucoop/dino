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

import {Pipe, PipeTransform} from '@angular/core';
import {Model} from '@dino/core/data';

/**
 * Type representing a file field
 */
export type listCellFile = {
  type: string;
  url: string;
  name: string;
  size: string;
  content: string;
  deleteUrl?: boolean;
};

/**
 * Pipe that checks if a list column displays files
 */
@Pipe({name: 'dinoListCellIsFile', pure: false})
export class ListCellIsFile implements PipeTransform {
  constructor() {}

  transform<T extends Model = Model>(element: T | {[key: string]: any} | string): boolean {
    if (element == null || element === undefined || typeof element !== 'object') return false;
    if (typeof element === 'string') return false;
    return isFileColumn(element);
  }
}

/**
 * Pipe that checks if a list cell has a deleted file as value
 */
@Pipe({name: 'dinoListCellIsDeletedFile', pure: false})
export class ListCellIsDeletedFile implements PipeTransform {
  constructor() {}

  transform(element: {[key: string]: any}): boolean {
    if (typeof element === 'string') return false;
    return element['size'] <= 0 || element['name'] == null || element['deleteUrl'];
  }
}

/**
 * Pipe that checks if a list cell has a storage image url as content.
 */
@Pipe({name: 'dinoListCellIsStorageImageUrl', pure: false})
export class ListCellIsStorageImageUrl implements PipeTransform {
  constructor() {}

  transform<T extends Model = Model>(element: T | {[key: string]: any} | string | null): boolean {
    if (element == null || element === undefined || typeof element !== 'string') return false;
    return element.includes('run/v1/files/');
  }
}

/**
 * Pipe that returns the info of the file in the list cell
 */
@Pipe({name: 'dinoListCellGetFile', pure: false})
export class ListCellGetFile implements PipeTransform {
  constructor() {}

  transform<T extends Model = Model>(element: T | {[key: string]: any} | string): listCellFile {
    if (element == null || element === undefined || typeof element !== 'object')
      return {type: '', url: '', name: '', content: '', size: ''};
    if (typeof element === 'string') return {type: '', url: '', name: '', content: '', size: ''};
    const elemObj = element as listCellFile;
    return elemObj;
  }
}

/**
 * Pipe that returns the icon text descriptor of the file icon to be displayed in the cell
 */
@Pipe({name: 'dinoListCellGetFileIcon', pure: false})
export class ListCellGetFileIcon implements PipeTransform {
  constructor() {}

  transform<T extends Model = Model>(element: T | {[key: string]: any} | string): string {
    if (element == null || element === undefined || typeof element !== 'object') return '';
    if (typeof element === 'string') return '';
    const elemObj = element as {[key: string]: string};
    const fileType = elemObj['type'];

    if (fileType.includes('image')) return 'image';
    if (fileType.includes('pdf')) return 'picture_as_pdf';
    return 'insert_drive_file';
  }
}

/**
 * Function that determines if a list cell belongs to a file column (the content is an ajf file)
 * @param element The cell content
 * @returns True if the content is an ajf file upload
 */
export function isFileColumn(element: {[key: string]: any}): boolean {
  if (element == null || element === undefined || typeof element !== 'object') {
    return false;
  }
  if ('content' in element && 'size' in element && 'type' in element && 'name' in element)
    return true;
  return false;
}
