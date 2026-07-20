import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImportFormPageComponent} from './components/import-form-page.component';

const routes: Routes = [
  {
    path: '',
    component: ImportFormPageComponent,
    data: {breadcrumbs: [{label: ':form_schema_id', parametrical: true}, {label: 'Import'}]},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportFormPageRoutingModule {}
