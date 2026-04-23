import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './components/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: 'expired',
    component: LoginComponent,
    data: {isExpired: true},
  },
  {
    path: 'sync_error',
    component: LoginComponent,
    data: {syncError: true},
  },
  {
    path: 'external_auth',
    component: LoginComponent,
    data: {isExternalAuth: true},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
