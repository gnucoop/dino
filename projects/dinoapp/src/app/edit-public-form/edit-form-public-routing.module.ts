import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditPublicFormComponent} from './components/edit-public-form.component';

const routes: Routes = [
  {
    path: ':form_schema_id',
    component: EditPublicFormComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class EditPublicFormRoutingModule {}
