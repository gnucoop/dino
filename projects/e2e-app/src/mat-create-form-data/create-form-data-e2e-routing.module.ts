import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatCreateFormDataE2E} from './create-form-data-e2e.component';

const routes: Routes = [
  {
    path: '',
    component: MatCreateFormDataE2E,
    data: {isFormData: true, breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class CreateFormRoutingModule {}
