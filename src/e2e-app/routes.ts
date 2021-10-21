import {Routes} from '@angular/router';
import {AuthGuard} from '@dewco/core/auth';

import {MatAreasE2E} from './mat-areas/areas-e2e.component';
import {MatCreateE2E} from './mat-create/create-e2e.component';
import {MatDashboardE2E} from './mat-dashboard/dashboard-e2e.component';
import {MatEditFormSchemaE2E} from './mat-edit-form-schema/edit-form-schema-e2e.component';
import {MatEditFormE2E} from './mat-edit-form/edit-form-e2e.component';
import {MatEditReportE2E} from './mat-edit-report/edit-report-e2e.component';
import {MatFormsListE2E} from './mat-forms-list/forms-list-e2e';
import {MatCollectE2E} from './mat-forms/collect-e2e.component';
import {MatGroupsListE2E} from './mat-groups/groups-e2e-list.component';
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

const authGuard = additionalConfig.authGuard ? [AuthGuard] : undefined;
export const E2E_APP_ROUTES: Routes = [
  {
    path: 'edit-form',
    canActivate: authGuard,
    children: [
      {
        path: ':form_id',
        component: MatEditFormE2E,
      },
      {
        path: 'details/:form_id',
        component: MatEditFormE2E,
        data: {isDetails: true},
      },
    ],
  },
  {
    path: 'view-form',
    canActivate: authGuard,
    data: {isView: true},
    children: [
      {
        path: ':form_id',
        component: MatEditFormE2E,
      },
      {
        path: 'details/:form_id',
        component: MatEditFormE2E,
        data: {isDetails: true},
      },
    ],
  },
  {
    path: 'create-form',
    canActivate: authGuard,
    children: [
      {
        path: ':form_schema_id',
        component: MatCreateE2E,
        data: {isFormData: false},
      },
      {
        path: 'form/:form_schema_id',
        component: MatCreateE2E,
        data: {isFormData: true},
      },
    ],
  },
  {
    path: 'edit-form-schema',
    canActivate: authGuard,
    children: [
      {
        path: ':form_schema_id',
        component: MatEditFormSchemaE2E,
      },
    ],
  },
  {
    path: 'add-form-schema',
    canActivate: authGuard,
    component: MatEditFormSchemaE2E,
  },
  {
    path: 'form-list',
    canActivate: authGuard,
    children: [
      {
        path: ':form_schema_id',
        component: MatFormsListE2E,
      },
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
    ],
  },
  {
    path: 'view-report',
    canActivate: authGuard,
    data: {isView: true},
    children: [
      {
        path: ':report_id',
        component: MatEditReportE2E,
      },
    ],
  },
  {
    path: 'report-list',
    canActivate: authGuard,
    children: [
      {
        path: ':form_schema_id',
        component: MatReportsListE2E,
      },
      {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
      {path: '**', redirectTo: '/dashboard', pathMatch: 'full'},
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
        path: '',
        component: MatLoginE2E,
      },
    ],
  },
  {
    path: 'metrics',
    canActivate: authGuard,
    children: [
      {
        path: 'thematic_areas',
        component: MatAreasE2E,
      },
      {
        path: 'projects',
        component: MatProjectsE2E,
      },
      {
        path: 'locations',
        component: MatLocationsE2E,
      },
      {
        path: 'organizations',
        component: MatOrganizationsE2E,
      },
      {
        path: '',
        component: MatMetricsE2E,
      },
    ],
  },
  {
    path: 'users',
    canActivate: authGuard,
    children: [
      {
        path: 'roles',
        component: MatUsersE2E,
      },
      {
        path: 'groups',
        component: MatGroupsListE2E,
      },
      {
        path: 'list',
        component: MatUsersListE2E,
      },
      {
        path: '',
        component: MatUsersE2E,
      },
    ],
  },
  {
    path: 'forms',
    canActivate: authGuard,
    component: MatCollectE2E,
  },
  {
    path: 'reports',
    canActivate: authGuard,
    component: MatReportsE2E,
  },
  {
    path: 'dashboard',
    canActivate: authGuard,
    component: MatDashboardE2E,
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
];
