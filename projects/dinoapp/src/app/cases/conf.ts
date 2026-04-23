import {Case} from '@dino/core/cases';
import {ActionType, ListHeader} from '@dino/core/list';

export const headers: ListHeader<Case>[] = [
  {column: 'id', label: 'ID', displayed: false},
  {column: 'name', label: 'Case Name', displayed: true, sortable: true},
  {column: 'code', label: 'Code', displayed: true},
  {column: 'image_file', label: 'Case Image', displayed: true},
  {column: 'parent_name', label: 'Parent case', displayed: true},
  {column: 'notes', label: 'Notes', displayed: false},
  {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
  {column: 'metric_data', label: 'Additional Attributes', displayed: false},
];

export const onClickRowActions: ActionType[] = ['select', 'expand'];

export const readOnlyFields: string[] = ['code'];
