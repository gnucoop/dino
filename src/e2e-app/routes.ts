import {Routes} from '@angular/router';

import {MatCollectE2E} from './mat-collect/collect-e2e.component';
import {MatDashboardE2E} from './mat-dashboard/dashboard-e2e.component';
import {MatEditE2E} from './mat-edit/edit-e2e.component';
import {MatListE2E} from './mat-list/list-e2e';
import {MatLoginE2E} from './mat-login/login-e2e';


export const E2E_APP_ROUTES: Routes = [
  {
    path: 'edit',
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
    component: MatCollectE2E,
  },
  {
    path: 'dashboard',
    component: MatDashboardE2E,
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard', pathMatch: 'full'},
];
