import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatEditFormSchemaE2E} from './edit-form-schema-e2e.component';

const routes: Routes = [
  {
    path: 'create',
    component: MatEditFormSchemaE2E,
    data: {breadcrumbs: [{label: 'Create'}]},
  },
  {
    path: ':form_schema_id/edit',
    component: MatEditFormSchemaE2E,
    data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Edit'}]},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class EditFormSchemaRoutingModule {}
