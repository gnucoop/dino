import {Routes} from '@angular/router';
import {AuthGuard} from '@dewco/core/auth';

import {MatCollectE2E} from './mat-collect/collect-e2e.component';
import {MatDashboardE2E} from './mat-dashboard/dashboard-e2e.component';
import {MatEditE2E} from './mat-edit/edit-e2e.component';
import {MatListE2E} from './mat-list/list-e2e';
import {MatLoginE2E} from './mat-login/login-e2e';
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
