import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CheckoutComponent} from './components/checkout.component';

const routes: Routes = [
  {path: ':session_id', component: CheckoutComponent, data: {breadcrumbs: null}},
  {
    path: '',
    component: CheckoutComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class CheckoutRoutingModule {}
