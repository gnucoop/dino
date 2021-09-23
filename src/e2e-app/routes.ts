import {Routes} from '@angular/router';
import {AuthGuard} from '@dewco/core/auth';

import {MatAreasE2E} from './mat-areas/areas-e2e.component';
import {MatCollectE2E} from './mat-collect/collect-e2e.component';
import {MatCreateE2E} from './mat-create/create-e2e.component';
import {MatDashboardE2E} from './mat-dashboard/dashboard-e2e.component';
import {MatEditE2E} from './mat-edit/edit-e2e.component';
import {MatGroupsListE2E} from './mat-groups/groups-e2e-list.component';
import {MatListE2E} from './mat-list/list-e2e';
import {MatLocationsE2E} from './mat-locations/locations-e2e.component';
import {MatLoginE2E} from './mat-login/login-e2e';
import {MatUsersListE2E} from './mat-manage-users/users-list-e2e.component';
import {MatMetricsE2E} from './mat-metrics/metrics-e2e.component';
import {MatOrganizationsE2E} from './mat-organizations/organizations-e2e.component';
import {MatProjectsE2E} from './mat-projects/projects-e2e.component';
import {MatUsersE2E} from './mat-users/users-e2e.component';
import {additionalConfig} from './mockconfig';

const authGuard = additionalConfig.authGuard ? [AuthGuard] : undefined;
export const E2E_APP_ROUTES: Routes = [
  {
    path: 'edit',
    canActivate: authGuard,
    children: [
      {
        path: ':form_id',
        component: MatEditE2E,
      },
      {
        path: 'details/:form_id',
        component: MatEditE2E,
        data: {isDetails: true},
      },
    ],
  },
  {
    path: 'view',
    canActivate: authGuard,
    data: {isView: true},
    children: [
      {
        path: ':form_id',
        component: MatEditE2E,
      },
      {
        path: 'details/:form_id',
        component: MatEditE2E,
        data: {isDetails: true},
      },
    ],
  },
  {
    path: 'create',
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
    path: 'list',
    canActivate: authGuard,
    children: [
      {
        path: ':form_schema_id',
        component: MatListE2E,
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
    ]
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
    path: 'collect',
    canActivate: authGuard,
    component: MatCollectE2E,
  },
  {
    path: 'dashboard',
    canActivate: authGuard,
    component: MatDashboardE2E,
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
];
