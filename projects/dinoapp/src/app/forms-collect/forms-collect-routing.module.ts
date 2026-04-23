import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormsCollectComponent} from './components/home/forms-collect.component';
const routes: Routes = [
  {
    path: 'schema',
    data: {breadcrumbs: [{label: 'Schema'}]},
    loadChildren: () =>
      import('../edit-form-schema/edit-form-schema.module').then(m => m.EditFormSchemaModule),
  },
  {
    path: ':form_schema_id',
    data: {breadcrumbs: null},
    children: [
      {
        path: '',
        loadChildren: () => import('../forms-list/forms-list.module').then(m => m.FormsListModule),
        data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}]},
      },
      {
        path: 'map',
        loadChildren: () =>
          import('../forms-map/forms-map.module').then(m => m.FormsMapModule),
        data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Map'}]},
      },
      {
        path: 'datachat',
        loadChildren: () =>
          import('../datachat/datachat.module').then(m => m.DataChatModule),
        data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'DataChat'}]},
      },
      {
        path: 'view',
        loadChildren: () => import('../edit-form/edit-form.module').then(m => m.EditFormModule),
        data: {
          isView: true,
          breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'View'}],
        },
      },
      {
        path: 'edit',
        loadChildren: () => import('../edit-form/edit-form.module').then(m => m.EditFormModule),
        data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Edit'}]},
      },
      {
        path: 'create',
        loadChildren: () =>
          import('../create-form/create-form.module').then(m => m.CreateFormModule),
        data: {
          breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Create'}],
        },
      },
    ],
  },
  {path: '', component: FormsCollectComponent, data: {breadcrumbs: null}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormsCollectRoutingModule {}
