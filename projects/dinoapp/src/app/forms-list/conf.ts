import {openFormPdf as ajfOpenFormPdf} from '@ajf/core/forms';
import {FormData} from '@dino/core/forms';
import {ActionType, ListAction} from '@dino/core/list';
import {ListHeader} from '@dino/core/list';
import {environment} from 'src/environments/environment';
import {ajfCustomFunctions} from 'src/ajf-functions/ajf-functions.custom';

export const hasFilterBar = false;
export const baseUrl = 'forms';

export const detailsListRowActions: ListAction[] = [
  {
    actionType: 'view',
    matIcon: 'visibility',
  },
  {
    actionType: 'edit',
    matIcon: 'create',
  },
];

export const listRowActionsIcons: {[key: string]: string} = {
  view: 'visibility',
  edit: 'create',
  print: 'printer',
  docx: 'description',
  delete: 'delete',
  'print badge': 'badge',
};

if (
  environment.formsConfig.duplicateAction === undefined ||
  environment.formsConfig.duplicateAction
) {
  listRowActionsIcons['duplicate'] = 'file_copy';
}

if (environment.optionalModulesConfig.logsModule) {
  listRowActionsIcons['viewlog'] = 'history';
}

export const additionalBasicFilters = [
  'area',
  'case',
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

export const limitedForms: string[] = [];

export const bulkActions: boolean =
  environment.layoutConfig.bulkActions === undefined ? true : environment.layoutConfig.bulkActions;

export const formImport: boolean =
  environment.formsConfig.formImport === undefined ? true : environment.formsConfig.formImport;

export const formCreationUserLimits = environment.formsConfig.formCreationUserLimits;

const customOpenFormPdf = ajfCustomFunctions.openFormPdf as (typeof ajfOpenFormPdf | undefined);
export const openFormPdf = customOpenFormPdf || ajfOpenFormPdf;

export const secondaryMetricFieldsDisplayed: {
  [metricName: string]: string | string [];
} | null = environment.metricsConfig.secondaryMetricFieldsDisplayed;

export const booleanQuickEdit: string[] = environment.formsConfig.booleanQuickEdit ?? [];
