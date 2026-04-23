import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateFormComponent} from './components/create-form.component';

const routes: Routes = [
  {
    path: '',
    component: CreateFormComponent,
    data: {isFormData: true, breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class CreateFormRoutingModule {}
