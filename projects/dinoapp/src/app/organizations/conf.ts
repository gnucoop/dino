import {Organization} from '@dino/core/organizations';
import {ActionType, ListHeader} from '@dino/core/list';

export const headers: ListHeader<Organization>[] = [
  {column: 'id', label: 'ID', displayed: false},
  {column: 'name', label: 'Organization Name', displayed: true, sortable: true},
  {column: 'parent_name', label: 'Parent Organization', displayed: true},
  {
    column: 'created_at',
    label: 'Creation Date',
    sortable: true,
    displayed: false,
  },
  {column: 'logo_path', label: 'Logo path', displayed: false},
  {column: 'website_url', label: 'Website url', displayed: false},
  {column: 'metric_data', label: 'Additional Attributes', displayed: false},
];

export const onClickRowActions: ActionType[] = ['select', 'expand'];
