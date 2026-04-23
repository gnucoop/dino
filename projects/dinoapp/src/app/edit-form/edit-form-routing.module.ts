import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditFormComponent} from './components/edit-form.component';

const routes: Routes = [
  {
    path: ':form_id',
    component: EditFormComponent,
    data: {breadcrumbs: null},
  },
  {
    path: 'details/:form_id',
    component: EditFormComponent,
    data: {isDetails: true, breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class EditFormRoutingModule {
}
