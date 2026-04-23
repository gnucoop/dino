import {Area} from '@dino/core/areas';
import {ActionType, ListHeader} from '@dino/core/list';

export const headers: ListHeader<Area>[] = [
  {column: 'id', label: 'ID', displayed: false},
  {column: 'name', label: 'Area Name', displayed: true, sortable: true},
  {column: 'parent_name', label: 'Parent Area', displayed: true},
  {
    column: 'created_at',
    label: 'Creation Date',
    sortable: true,
    displayed: false,
  },
  {column: 'metric_data', label: 'Additional Attributes', displayed: false},
];

export const onClickRowActions: ActionType[] = ['select', 'expand'];
