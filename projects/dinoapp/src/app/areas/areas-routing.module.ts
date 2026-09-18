import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AreasComponent} from './components/areas.component';

const routes: Routes = [
  {
    path: 'import',
    loadChildren: () =>
      import('../metric-import-page/metric-import-page.module').then(m => m.MetricImportPageModule),
    data: {metricType: 'area', breadcrumbs: [{label: 'Import'}]},
  },
  {
    path: '',
    component: AreasComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class AreasRoutingModule {}
