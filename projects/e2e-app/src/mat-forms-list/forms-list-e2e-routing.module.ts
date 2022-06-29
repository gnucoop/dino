import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatFormsListE2E} from './forms-list-e2e';

const routes: Routes = [
  {path: '', component: MatFormsListE2E, data: {breadcrumbs: null, isFormData: true}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsListRoutingModule {}
