import {Routes} from '@angular/router';

import {MatLoginE2E} from '../mat-login/login-e2e';
import {ExampleFormCollect} from '../example-form-collect/example-form-collect';
import {ExampleFormSelect} from '../example-form-select/example-form-select';

import {Home} from './e2e-app-layout';

export const E2E_APP_ROUTES: Routes = [
  {path: '', component: Home},
  {path: 'mat-login', component: MatLoginE2E},
  {path: 'c', component: ExampleFormSelect},
  {path: 't', component: ExampleFormCollect},
];
