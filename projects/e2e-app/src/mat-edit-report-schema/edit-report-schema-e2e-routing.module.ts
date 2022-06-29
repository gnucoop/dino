import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatEditReportSchemaE2E} from './edit-report-schema-e2e.component';

const routes: Routes = [
  {
    path: 'create',
    component: MatEditReportSchemaE2E,
    data: {breadcrumbs: [{label: 'Create'}]},
  },
  {
    path: ':report_schema_id/edit',
    component: MatEditReportSchemaE2E,
    data: {breadcrumbs: [{label: ':report_schema_id', parametrical: true}, {label: 'Edit'}]},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class EditReportSchemaRoutingModule {}
