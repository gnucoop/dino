import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportsCollectComponent} from './components/reports-collect.component';

const routes: Routes = [
  {
    path: 'schema',
    data: {breadcrumbs: [{label: 'Schema'}]},
    loadChildren: () =>
      import('../edit-report-schema/edit-report-schema.module').then(m => m.EditReportSchemaModule),
  },
  {
    path: ':report_schema_id',
    data: {breadcrumbs: null},
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../reports-list/reports-list.module').then(m => m.ReportsListModule),
        data: {breadcrumbs: [{label: ':report_schema_id', parametrical: true}]},
      },
      {
        path: 'view',
        loadChildren: () =>
          import('../edit-report/edit-report.module').then(m => m.EditReportModule),
        data: {
          isView: true,
          breadcrumbs: [{label: ':report_schema_id', parametrical: true}, {label: 'View'}],
        },
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('../edit-report/edit-report.module').then(m => m.EditReportModule),
        data: {breadcrumbs: [{label: ':report_schema_id', parametrical: true}, {label: 'Edit'}]},
      },
      {
        path: 'create',
        loadChildren: () =>
          import('../create-report/create-report.module').then(m => m.CreateReportModule),
        data: {
          breadcrumbs: [{label: ':report_schema_id', parametrical: true}, {label: 'Create'}],
        },
      },
    ],
  },
  {path: '', component: ReportsCollectComponent, data: {breadcrumbs: null}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsCollectRoutingModule {}
