import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckoutE2E} from './checkout-e2e.component';

const routes: Routes = [
  {path: ':session_id', component: CheckoutE2E, data: {breadcrumbs: null}},
  {
    path: '',
    component: CheckoutE2E,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class CheckoutRoutingModule {}
