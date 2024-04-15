import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatFormsMapE2E} from './forms-map-e2e';

const routes: Routes = [
  {path: '', component: MatFormsMapE2E, data: {breadcrumbs: null, isFormData: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsMapRoutingModule {}
