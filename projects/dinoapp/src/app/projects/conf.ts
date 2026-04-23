import {ActionType, ListHeader} from '@dino/core/list';
import {Project} from '@dino/core/projects';

export const headers: ListHeader<Project>[] = [
  {column: 'id', label: 'ID', displayed: false},
  {column: 'name', label: 'Project Name', displayed: true, sortable: true},
  {column: 'parent_name', label: 'Parent Project', displayed: true},
  {
    column: 'created_at',
    label: 'Creation Date',
    sortable: true,
    displayed: false,
  },
  {column: 'code', label: 'Code', displayed: true},
  {column: 'code_auto', label: 'Auto Code', displayed: true},
  {column: 'sectors_of_intervention', label: 'Sectors of Intervention', displayed: true},
  {column: 'donors', label: 'Donors', displayed: true},
  {column: 'start_date', label: 'Start Date', displayed: true},
  {column: 'end_date', label: 'End Date', displayed: true},
  {column: 'metric_data', label: 'Additional Attributes', displayed: false},
];

export const onClickRowActions: ActionType[] = ['select', 'expand'];
export const readOnlyFields: string[] = ['code_auto'];
