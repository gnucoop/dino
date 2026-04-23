import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditReportSchemaComponent} from './components/edit-report-schema.component';

const routes: Routes = [
  {
    path: 'create',
    component: EditReportSchemaComponent,
    data: {breadcrumbs: [{label: 'Create'}]},
  },
  {
    path: ':report_schema_id/edit',
    component: EditReportSchemaComponent,
    data: {breadcrumbs: [{label: ':report_schema_id', parametrical: true}, {label: 'Edit'}]},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class EditReportSchemaRoutingModule {
}
