import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatEditPublicFormE2E} from './edit-public-form-e2e.component';

const routes: Routes = [
  {
    path: ':form_schema_id',
    component: MatEditPublicFormE2E,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class EditPublicFormRoutingModule {}
