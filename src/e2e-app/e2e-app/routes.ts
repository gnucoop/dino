import {Routes} from '@angular/router';
import {AuthGuard} from '@dewco/core/auth';

import {MatListE2E} from '../mat-list/list-e2e';
import {MatLoginE2E} from '../mat-login/login-e2e';
import {ExampleFormCollect} from '../example-form-collect/example-form-collect';
import {ExampleFormSelect} from '../example-form-select/example-form-select';

import {Home} from './e2e-app-layout';

export const E2E_APP_ROUTES: Routes = [
  {path: '', component: Home},
  {path: 'c', component: ExampleFormSelect},
  {path: 't', component: ExampleFormCollect},
  {path: 'mat-list', component: MatListE2E, canActivate: [AuthGuard]},
  {path: 'mat-login', component: MatLoginE2E},
];
