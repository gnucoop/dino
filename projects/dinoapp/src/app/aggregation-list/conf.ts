import {FormData} from '@dino/core/forms';
import {ActionType} from '@dino/core/list';
import {ListHeader} from '@dino/core/list';
import {environment} from 'src/environments/environment';

export const hasFilterBar = false;
export const baseUrl = 'forms';

export const aggregationFormCreator: boolean =
  environment.formsConfig.aggregationFormCreator !== undefined
    ? environment.formsConfig.aggregationFormCreator
    : true;

export const headers: ListHeader<FormData>[] = [
  {column: 'id', label: 'ID', displayed: false},
  {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
  {column: 'updated_at', label: 'Update Date', sortable: true, displayed: false},
  {
    column: 'user_data_ref_id',
    label: 'User',
    populateWith: 'full_name',
    displayed: false,
  },
  {
    column: 'form_schema_ref_id',
    label: 'Form Schema',
    populateWith: 'label',
    displayed: true,
  },
  {
    column: 'form_status_ref_id',
    external_ref: `form_status_ref_id`,
    label: 'Status',
    populateWith: 'label',
    displayed: true,
    icon: 'account_tree',
  },
];

export const listRowActionsIcons: {[key: string]: string} = {
  view: 'visibility',
  edit: 'create',
  print: 'printer',
  delete: 'delete',
};

export const additionalBasicFilters = [
  'area',
  'case',
  'case_code',
  'location',
  'organization',
  'project',
  'form_status',
  'user_data',
];

export const onClickRowActions: ActionType[] = ['select', 'expand'];
export const listHeaders: ListHeader<FormData>[] = [
  {column: 'id', label: 'ID', displayed: false},
  {column: 'user_data_ref_id', label: 'User', populateWith: 'full_name'},
  {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
];

export const secondaryMetricFieldsDisplayed: {
  [metricName: string]: string | string [];
} | null = environment.metricsConfig.secondaryMetricFieldsDisplayed;
