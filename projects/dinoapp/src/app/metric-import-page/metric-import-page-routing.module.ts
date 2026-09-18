import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MetricImportPageComponent} from './components/metric-import-page.component';

const routes: Routes = [
  {
    path: '',
    component: MetricImportPageComponent,
    // Breadcrumbs are declared on the parent `metrics/<section>/import` route;
    // redeclaring them here would duplicate the trail.
    data: {breadcrumbs: null},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetricImportPageRoutingModule {}
