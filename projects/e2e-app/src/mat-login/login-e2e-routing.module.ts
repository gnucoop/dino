import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MatLoginE2E} from './login-e2e';

const routes: Routes = [
  {path: '', component: MatLoginE2E},
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
