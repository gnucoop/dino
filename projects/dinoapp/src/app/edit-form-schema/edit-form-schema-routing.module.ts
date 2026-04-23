import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditFormSchemaComponent} from './components/edit-form-schema.component';

const routes: Routes = [
  {
    path: 'create',
    component: EditFormSchemaComponent,
    data: {breadcrumbs: [{label: 'Create'}]},
  },
  {
    path: ':form_schema_id/edit',
    component: EditFormSchemaComponent,
    data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Edit'}]},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class EditFormSchemaRoutingModule {}
