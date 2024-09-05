import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatFormsE2E} from './forms-e2e.component';
const routes: Routes = [
  {
    path: 'schema',
    data: {breadcrumbs: [{label: 'Schema'}]},
    loadChildren: () =>
      import('../mat-edit-form-schema/edit-form-schema-e2e.module').then(
        m => m.MaterialEditFormSchemaE2eModule,
      ),
  },
  {
    path: ':form_schema_id',
    data: {breadcrumbs: null},
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../mat-forms-list/forms-list-e2e.module').then(m => m.MaterialFormsListE2eModule),
        data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}]},
      },
      {
        path: 'map',
        loadChildren: () =>
          import('../mat-forms-map/forms-map-e2e.module').then(m => m.MaterialFormsMapE2eModule),
        data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Map'}]},
      },
      {
        path: 'datachat',
        loadChildren: () =>
          import('../mat-datachat/datachat-e2e.module').then(m => m.MaterialDataChatE2eModule),
        data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'DataChat'}]},
      },
      {
        path: 'view',
        loadChildren: () =>
          import('../mat-edit-form/edit-form-e2e.module').then(m => m.MaterialEditFormE2eModule),
        data: {
          isView: true,
          breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'View'}],
        },
      },
      {
        path: 'edit',
        loadChildren: () =>
          import('../mat-edit-form/edit-form-e2e.module').then(m => m.MaterialEditFormE2eModule),
        data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Edit'}]},
      },
      {
        path: 'create',
        loadChildren: () =>
          import('../mat-create-form-data/create-form-data-e2e.module').then(
            m => m.MaterialCreateFormDataE2eModule,
          ),
        data: {
          breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Create'}],
        },
      },
    ],
  },
  {path: '', component: MatFormsE2E, data: {breadcrumbs: null}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsCollectRoutingModule {}
