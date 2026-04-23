import {ActionType, ListHeader} from '@dino/core/list';
import {UserGroup} from '@dino/core/users';

export const headers: ListHeader<UserGroup>[] = [
  {column: 'id', label: 'ID', displayed: false},
  {column: 'groupName', label: 'Group Name', displayed: true},
  {
    column: 'created_at',
    label: 'Creation Date',
    sortable: true,
    displayed: false,
  },
];

export const onClickRowActions: ActionType[] = ['select', 'expand'];

export const additionalBasicFilters = [
  'project',
  'location',
  'area',
  'case',
  'organization',
  'unavailableFilter',
];
