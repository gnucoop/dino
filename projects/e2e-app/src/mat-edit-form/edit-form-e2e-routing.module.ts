import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatEditFormE2E} from './edit-form-e2e.component';

const routes: Routes = [
  {
    path: ':form_id',
    component: MatEditFormE2E,
    data: {breadcrumbs: null},
  },
  {
    path: 'details/:form_id',
    component: MatEditFormE2E,
    data: {isDetails: true, breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class EditFormRoutingModule {}
