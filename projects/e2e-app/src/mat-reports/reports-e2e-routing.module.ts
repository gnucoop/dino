import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatReportsE2E} from './reports-e2e.component';

const routes: Routes = [
  {
    path: 'schema',
    data: {breadcrumbs: [{label: 'Schema'}]},
    loadChildren: () =>
      import('../mat-edit-report-schema/edit-report-schema-e2e.module').then(
        m => m.MaterialEditReportSchemaE2eModule,
      ),
  },
  {
    path: ':report_schema_id',
    data: {breadcrumbs: null},
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../mat-reports-list/reports-list-e2e.module').then(
            m => m.MaterialReportsListE2eModule,
          ),
        data: {breadcrumbs: [{label: ':report_schema_id', parametrical: true}]},
      },
      {
        path: 'view',
        loadChildren: () =>
          import('../mat-edit-report/edit-report-e2e.module').then(
            m => m.MaterialEditReportE2eModule,
          ),
        data: {
          isView: true,
          breadcrumbs: [{label: ':report_schema_id', parametrical: true}, {label: 'View'}],
        },
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('../mat-edit-report/edit-report-e2e.module').then(
            m => m.MaterialEditReportE2eModule,
          ),
        data: {breadcrumbs: [{label: ':report_schema_id', parametrical: true}, {label: 'Edit'}]},
      },
      {
        path: 'create',
        loadChildren: () =>
          import('../mat-create-report-data/create-report-data-e2e.module').then(
            m => m.MaterialCreateReportDataE2eModule,
          ),
        data: {
          breadcrumbs: [{label: ':report_schema_id', parametrical: true}, {label: 'Create'}],
        },
      },
    ],
  },
  {path: '', component: MatReportsE2E, data: {breadcrumbs: null}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsCollectRoutingModule {}
