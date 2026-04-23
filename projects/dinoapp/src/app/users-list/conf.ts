import {AjfFieldType} from '@ajf/core/forms';
import {ActionType, ListHeader} from '@dino/core/list';
import {UserData} from '@dino/core/users';

export const headers: ListHeader<UserData>[] = [
  {column: 'id', label: 'ID', sortable: true, displayed: false},
  {column: 'email', label: 'Email', sortable: true, displayed: true},
  {column: 'full_name', label: 'Full Name', sortable: true, displayed: true},
  {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
  {
    column: 'disabled',
    label: 'Disabled',
    displayed: true,
    isEditable: _ => true,
    fieldType: AjfFieldType.Boolean,
  },
];

export const onClickRowActions: ActionType[] = ['select', 'expand'];

export const additionalBasicFilters = ['user_group', 'unavailableFilter'];
