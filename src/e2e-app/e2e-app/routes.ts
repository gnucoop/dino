import {Routes} from '@angular/router';
import {Home} from './e2e-app-layout';
import {MatLoginE2E} from '../mat-login/login-e2e';
import {IonLoginE2E} from '../ion-login/login-e2e';


export const E2E_APP_ROUTES: Routes = [
  {path: '', component: Home},
  {path: 'mat-login', component: MatLoginE2E},
  {path: 'ion-login', component: IonLoginE2E},
];
