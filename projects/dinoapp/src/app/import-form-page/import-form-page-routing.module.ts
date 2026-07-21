import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ImportFormPageComponent} from './components/import-form-page.component';

const routes: Routes = [
  {
    path: '',
    component: ImportFormPageComponent,
    // Breadcrumbs are declared on the parent `forms/:form_schema_id/import`
    // route (forms-collect); redeclaring them here would duplicate the trail.
    data: {breadcrumbs: null},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportFormPageRoutingModule {}
