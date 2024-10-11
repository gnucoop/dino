import {Routes} from '@angular/router';
import {AuthGuard} from '@dino/core/auth';

import {MatAggregationListE2E} from './mat-aggregation/aggregation-list-e2e';
import {MatAreasE2E} from './mat-areas/areas-e2e.component';
import {MatCasesE2E} from './mat-cases/cases-e2e.component';
import {MatCreateFormDataE2E} from './mat-create-form-data/create-form-data-e2e.component';
import {MatCreateReportDataE2E} from './mat-create-report-data/create-report-data-e2e.component';
import {MatDashboardMenuE2E} from './mat-dashboard/dashboard-menu-e2e.component';
import {MatEditFormSchemaE2E} from './mat-edit-form-schema/edit-form-schema-e2e.component';
import {MatEditFormE2E} from './mat-edit-form/edit-form-e2e.component';
import {MatEditReportE2E} from './mat-edit-report/edit-report-e2e.component';
import {MatEditReportSchemaE2E} from './mat-edit-report-schema/edit-report-schema-e2e.component';
import {MatFormsListE2E} from './mat-forms-list/forms-list-e2e';
import {MatFormsMapE2E} from './mat-forms-map/forms-map-e2e';
import {MatFormsE2E} from './mat-forms/forms-e2e.component';
import {MatGroupsListE2E} from './mat-groups/groups-e2e-list.component';
import {MatLangsE2e} from './mat-langs/langs-e2e.component';
import {MatLocationsE2E} from './mat-locations/locations-e2e.component';
import {MatLoginE2E} from './mat-login/login-e2e';
import {MatUsersListE2E} from './mat-manage-users/users-list-e2e.component';
import {MatMetricsE2E} from './mat-metrics/metrics-e2e.component';
import {MatOrganizationsE2E} from './mat-organizations/organizations-e2e.component';
import {MatProjectsE2E} from './mat-projects/projects-e2e.component';
import {MatReportsListE2E} from './mat-reports-list/reports-list-e2e';
import {MatReportsE2E} from './mat-reports/reports-e2e.component';
import {MatUsersE2E} from './mat-users/users-e2e.component';
import {additionalConfig} from './mockconfig';
import {DataChatE2E} from './mat-datachat/datachat-e2e.component';
import {GptE2E} from './mat-gpt/gpt-e2e.component';

const authGuard = additionalConfig.authGuard ? [AuthGuard] : undefined;
export const E2E_APP_ROUTES: Routes = [
  {
    path: 'create',
    canActivate: authGuard,
    children: [
      {
        path: ':form_schema_id',
        component: MatCreateFormDataE2E,
      },
    ],
  },
  {
    path: 'login',
    children: [
      {
        path: 'expired',
        component: MatLoginE2E,
        data: {isExpired: true},
      },
      {
        path: 'sync_error',
        component: MatLoginE2E,
        data: {syncError: true},
      },
      {
        path: 'external_auth',
        component: MatLoginE2E,
        data: {isExternalAuth: true},
      },
      {
        path: '',
        component: MatLoginE2E,
      },
    ],
  },
  {
    path: 'metrics',
    canActivate: authGuard,
    data: {breadcrumbs: [{label: 'Metrics', url: 'metrics', icon: 'bookmarks'}]},
    children: [
      {
        path: 'thematic_areas',
        component: MatAreasE2E,
        data: {
          breadcrumbs: [
            {label: 'Thematic Areas', url: 'metrics/thematic_areas', icon: 'volunteer_activism'},
          ],
        },
      },
      {
        path: 'cases',
        component: MatCasesE2E,
        data: {
          breadcrumbs: [{label: 'Cases', url: 'metrics/cases', icon: 'people'}],
        },
      },
      {
        path: 'projects',
        component: MatProjectsE2E,
        data: {breadcrumbs: [{label: 'Projects', url: 'metrics/projects', icon: 'assignment'}]},
      },
      {
        path: 'locations',
        component: MatLocationsE2E,
        data: {breadcrumbs: [{label: 'Locations', url: 'metrics/locations', icon: 'place'}]},
      },
      {
        path: 'organizations',
        component: MatOrganizationsE2E,
        data: {
          breadcrumbs: [{label: 'Organizations', url: 'metrics/organizations', icon: 'public'}],
        },
      },
      {
        path: '',
        component: MatMetricsE2E,
        data: {breadcrumbs: null},
      },
    ],
  },
  {
    path: 'users',
    canActivate: authGuard,
    data: {breadcrumbs: [{label: 'Users', url: 'users', icon: 'people'}]},
    children: [
      {
        path: 'groups',
        component: MatGroupsListE2E,
        data: {breadcrumbs: [{label: 'Groups', url: 'users/groups', icon: 'badge'}]},
      },
      {
        path: 'list',
        component: MatUsersListE2E,
        data: {breadcrumbs: [{label: 'List', url: 'users/list', icon: 'groups'}]},
      },
      {
        path: '',
        component: MatUsersE2E,
        data: {breadcrumbs: null},
      },
    ],
  },
  {
    path: 'aggregation',
    canActivate: authGuard,
    data: {breadcrumbs: [{label: 'Aggregation', url: 'aggregation', icon: 'manage_search'}]},
    children: [
      {
        path: '',
        component: MatAggregationListE2E,
        data: {breadcrumbs: null},
      },
    ],
  },
  {
    path: 'forms',
    canActivate: authGuard,
    data: {isFormData: true, breadcrumbs: [{label: 'Forms', url: 'forms', icon: 'list_alt'}]},
    children: [
      {
        path: 'schema',
        data: {breadcrumbs: [{label: 'Schema'}]},
        children: [
          {
            path: 'create',
            component: MatEditFormSchemaE2E,
            data: {breadcrumbs: [{label: 'Create'}]},
          },
          {
            path: ':form_schema_id/edit',
            component: MatEditFormSchemaE2E,
            data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Edit'}]},
          },
        ],
      },
      {
        path: ':form_schema_id',
        data: {breadcrumbs: null},
        children: [
          {
            path: '',
            component: MatFormsListE2E,
            data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}]},
          },
          {
            path: 'map',
            component: MatFormsMapE2E,
            data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Map'}]},
          },
          {
            path: 'datachat',
            component: DataChatE2E,
            data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Map'}]},
          },
          {
            path: 'view',
            data: {
              isView: true,
              breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'View'}],
            },
            children: [
              {
                path: ':form_id',
                component: MatEditFormE2E,
                data: {breadcrumbs: null},
              },
              {
                path: 'details/:form_id',
                component: MatEditFormE2E,
                data: {isDetails: true, breadcrumbs: null},
              },
            ],
          },
          {
            path: 'edit',
            data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Edit'}]},
            children: [
              {
                path: ':form_id',
                component: MatEditFormE2E,
                data: {breadcrumbs: null},
              },
              {
                path: 'details/:form_id',
                component: MatEditFormE2E,
                data: {isDetails: true, breadcrumbs: null},
              },
            ],
          },
          {
            path: 'create',
            data: {
              breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Create'}],
            },
            component: MatCreateFormDataE2E,
          },
        ],
      },
      {
        path: '',
        component: MatFormsE2E,
        data: {breadcrumbs: null},
      },
      {path: '**', redirectTo: '/forms', pathMatch: 'full'},
    ],
  },
  {
    path: 'reports',
    canActivate: authGuard,
    data: {
      isReportData: true,
      breadcrumbs: [{label: 'Reports', url: 'reports', icon: 'stacked_bar_chart'}],
    },
    children: [
      {
        path: 'schema',
        data: {breadcrumbs: [{label: 'Schema'}]},
        children: [
          {
            path: 'create',
            component: MatEditReportSchemaE2E,
            data: {breadcrumbs: [{label: 'Create'}]},
          },
          {
            path: ':report_schema_id/edit',
            component: MatEditReportSchemaE2E,
            data: {
              breadcrumbs: [{label: ':report_schema_id', parametrical: true}, {label: 'Edit'}],
            },
          },
        ],
      },
      {
        path: ':report_schema_id',
        data: {breadcrumbs: null},
        children: [
          {
            path: '',
            component: MatReportsListE2E,
            data: {breadcrumbs: [{label: ':report_schema_id', parametrical: true}]},
          },
          {
            path: 'view',
            data: {
              isView: true,
              breadcrumbs: [{label: ':report_schema_id', parametrical: true}, {label: 'View'}],
            },
            children: [
              {
                path: ':report_id',
                component: MatEditReportE2E,
                data: {breadcrumbs: null},
              },
            ],
          },
          {
            path: 'edit',
            data: {
              breadcrumbs: [{label: ':report_schema_id', parametrical: true}, {label: 'Edit'}],
            },
            children: [
              {
                path: ':report_id',
                component: MatEditReportE2E,
                data: {breadcrumbs: null},
              },
            ],
          },
          {
            path: 'create',
            data: {
              breadcrumbs: [{label: ':report_schema_id', parametrical: true}, {label: 'Create'}],
            },
            component: MatCreateReportDataE2E,
          },
        ],
      },
      {path: '', component: MatReportsE2E, data: {breadcrumbs: null}},
      {path: '**', redirectTo: '/reports', pathMatch: 'full'},
    ],
  },
  {
    path: 'gpt',
    canActivate: authGuard,
    data: {breadcrumbs: [{label: 'GPT', url: 'gpt', icon: 'chat'}]},
    component: GptE2E,
  },
  {
    path: 'dashboard',
    canActivate: authGuard,
    data: {breadcrumbs: [{label: 'Dashboard', url: 'dashboard', icon: 'apps'}]},
    component: MatDashboardMenuE2E,
  },
  {
    path: 'langs',
    canActivate: authGuard,
    component: MatLangsE2e,
    data: {breadcrumbs: [{label: 'Languages', url: 'langs', icon: 'translate'}]},
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
];
