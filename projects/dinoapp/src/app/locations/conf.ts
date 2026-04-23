import {Location} from '@dino/core/locations';
import {ActionType, ListHeader} from '@dino/core/list';

export const headers: ListHeader<Location>[] = [
  {column: 'id', label: 'ID', displayed: false},
  {column: 'name', label: 'Location Name', displayed: true, sortable: true},
  {column: 'parent_name', label: 'Parent Location', displayed: true},
  {
    column: 'created_at',
    label: 'Creation Date',
    sortable: true,
    displayed: false,
  },
  {column: 'coordinates', label: 'Coordinates', displayed: false},
  {column: 'metric_data', label: 'Additional Attributes', displayed: false},
];

export const onClickRowActions: ActionType[] = ['select', 'expand'];
