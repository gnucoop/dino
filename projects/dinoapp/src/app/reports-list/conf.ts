import {ActionType, ListAction, ListHeader} from '@dino/core/list';
import {ReportData} from '@dino/core/reports';
import {environment} from 'src/environments/environment';

export const instanceName = environment.dataConfig.instanceName;
export const hasFilterBar = false;
export const baseUrl = 'reports';
export const detailsListRowActions: ListAction[] = [
  {
    actionType: 'view',
    matIcon: 'visibility',
  },
];
export const listRowActions: ListAction[] = [
  {
    actionType: 'view',
    matIcon: 'visibility',
  },
  {
    actionType: 'delete',
    matIcon: 'delete',
    askConfirm: true,
  },
];

export const additionalBasicFilters = ['project', 'location', 'area', 'organization', 'case'];

export const onClickRowActions: ActionType[] = ['select', 'expand'];
export const listHeaders: ListHeader<ReportData>[] = [
  {column: 'id', label: 'ID', displayed: false},
  {column: 'user_data_ref_id', label: 'User', populateWith: 'full_name', displayed: true},
  {column: 'name', label: 'Name', displayed: true},
  {column: 'date_start', label: 'Collected Since', displayed: true},
  {column: 'date_end', label: 'Collected Until', displayed: true},
  {
    column: 'created_at',
    label: 'Creation Date',
    displayed: false,
  },
];

export const secondaryMetricFieldsDisplayed: {
  [metricName: string]: string | string [];
} | null = environment.metricsConfig.secondaryMetricFieldsDisplayed;
