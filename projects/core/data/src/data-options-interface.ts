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

export type DataQuerySortDir = 'asc' | 'desc';

export type DataQuerySort = string | {[propName: string]: DataQuerySortDir};

export interface DataListOptions {
  limit?: number;
  skip?: number;
  sort?: DataQuerySort[];
  index?: DataIndex; // @Todo
  search?: string; // @Todo
  fields?: string[]; // @Todo
}

export interface DataQueryOptions {
  selector: DataQuerySelector;
  fields?: string[]; // @Todo
  sort?: DataQuerySort[];
  limit?: number;
  skip?: number;
  joins?: DataJoinOptions[]; // @Todo
  index?: DataIndex; // @Todo
  attributes?: {
    [attributeName: string]: any;
  }; // @Todo
  group_by?: string[]; // @Todo
  distinct?: string[]; // @Todo
}

export interface DataIndex {
  name: string;
  fields: (string | DataIndexField)[];
  startKey?: string;
  endKey?: string;
}

export interface DataIndexField {
  [prop: string]: 'asc' | 'desc';
}

export type DataQuerySelector = {
  [propName: string]:
    | any
    | {
        $lt?: any;
        $gt?: any;
        $lte?: any;
        $gte?: any;
        $eq?: any;
        $ne?: any;
        $exists?: any;
        $in?: any;
        $nin?: any;
        $or?: any;
        $nor?: any;
        $not?: any;
        $regex?: any;
      };
};

export interface DataJoinOptions {
  model: string;
  property: string;
  fields?: string[];
}
