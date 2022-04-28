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
  AjfBaseField,
  AjfChoice,
  AjfChoicesOrigin,
  AjfFieldType,
  AjfForm,
  AjfValidationGroup,
} from '@ajf/core/forms';

/**
 * Group of Filters (equivalent to a Slide in a Dialog)
 */
export interface FilterGroup {
  /**
   * Name of the Group.
   */
  filterGroupName: string;
  /**
   * Basic Filters contained in the Group, displayed in the main filter component
   */
  filterGroupBasicFilters?: FilterItem[];
  /**
   * Additional Filters contained in the Group, displayed in a secondary filter component
   */
  filterGroupAdditionalFilters?: FilterItem[];
  /**
   * Indicates if the FilterGroup refers to a details list (in exandable tables)
   */
  isFilterGroupDetails?: boolean;
}

/**
 * Filter with value
 */
export interface FilterItem extends Partial<AjfBaseField> {
  /**
   * Name of the filter.
   */
  name: string;
  /**
   * Filter operator
   */
  operator?: Operator;
  /**
   * Filter value
   */
  value?: any;
  /**
   * Name of the FormControl object
   */
  formControlName?: string;
  /**
   * Choices origin for single/multiple choice filters
   */
  choicesOrigin?: AjfChoicesOrigin<any>;
  /**
   * Reference to the ChoicesOrigin
   */
  choicesOriginRef?: string;
  /**
   * Actual options for single/multiple choice filters
   */
  choices?: AjfChoice<any>[];
  /**
   * Specifies if this is an additional filter relative to the content of the model 'data' property
   */
  isAdditionalFilter?: boolean;
  /**
   * Specifies if this filter refers to a field belonging to a Repeating Slide
   */
  isRepeatingSlideFilter?: boolean;
  /**
   * States the validation state of the filter
   */
  isValid?: boolean;
  /**
   * Indicates if the FilterItem refers to a details list (in exandable tables)
   */
  isFilterItemDetails?: boolean;
}

/**
 * Data necessary to generate a WidgetFilter
 */
export interface WidgetData {
  /**
   * The widgetFilter AjfForm
   */
  form: AjfForm;
  /**
   * Query comparison operator
   */
  operator: Operator;
  /**
   * If true, the WidgetFilter is active and is actually contributing to the ListDataSource query
   */
  active: boolean;
  /**
   * WidgetFilter validation conditions
   */
  validationConditions?: AjfValidationGroup;
}

/**
 * Conversion object from string to AjfFieldType
 */
export const FIELD_TYPES: {[key: string]: AjfFieldType} = {
  'string': 0,
  'text': 1,
  'number': 2,
  'boolean': 3,
  'singlechoice': 4,
  'multiplechoice': 5,
  'formula': 6,
  'empty': 7,
  'date': 8,
  'dateInput': 9,
  'time': 10,
  'table': 11,
  'geolocation': 12,
  'barcode': 13,
  'file': 14,
  'image': 15,
  'videoUrl': 16,
};

/**
 * Mongodb operators
 */
export interface Operator {
  /**
   * Operator label
   */
  label:
    | '<'
    | '>'
    | '<='
    | '>='
    | '=='
    | '!='
    | 'exists'
    | 'includes'
    | 'not includes'
    | 'is'
    | 'not'
    | 'Like'
    | 'Not like';
  /**
   * Operator value
   */
  value:
    | '$lt'
    | '$gt'
    | '$lte'
    | '$gte'
    | '$eq'
    | '$ne'
    | '$exist'
    | '$in'
    | '$nin'
    | '$in'
    | '$regex';
  /**
   * Operator options
   */
  options?: string;
}

/**
 * Mongodb operators for numerical conditions
 */
export const NUMBER_CONDITION_OPERATORS: Operator[] = [
  {label: '<', value: '$lt'},
  {label: '>', value: '$gt'},
  {label: '<=', value: '$lte'},
  {label: '>=', value: '$gte'},
  {label: '==', value: '$eq'},
  {label: '!=', value: '$ne'},
];

/**
 * Mongodb operators for single/multiple choice conditions
 */
export const CHOICES_CONDITION_OPERATORS: Operator[] = [
  {label: 'is', value: '$in'},
  {label: 'not', value: '$nin'},
];

export const ALL_CONDITION_OPERATORS: Operator[] = [
  ...NUMBER_CONDITION_OPERATORS,
  ...CHOICES_CONDITION_OPERATORS,
];

/**
 * Mongodb default operators for different field types
 */
export const DEFAULT_OPERATORS: {[key: number]: Operator} = {
  [AjfFieldType.String]: {label: 'Like', value: '$regex', options: 'i'},
  [AjfFieldType.Text]: {label: 'Like', value: '$regex', options: 'i'},
  [AjfFieldType.Number]: {label: '==', value: '$eq'},
  [AjfFieldType.DateInput]: {label: '==', value: '$eq'},
  [AjfFieldType.Date]: {label: '==', value: '$eq'},
  [AjfFieldType.MultipleChoice]: {label: 'is', value: '$in'},
};

/**
 * Keys of all models base properties.
 */
export const DEFAULT_MODEL_KEYS: string[] = ['id', 'data', 'created_at', 'updated_at'];

/**
 * Type of a list of filterItems.
 * (Basic: displayed in the main filter component)
 * (Additional: displayed in a secondary filter component)
 * (Dialog: displayed in a dialog)
 * (All: a list of basic and additional filterItems)
 */
export type FilterListType = 'basic' | 'additional' | 'temporary' | 'all';
