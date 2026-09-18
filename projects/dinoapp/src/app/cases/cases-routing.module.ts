import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CasesComponent} from './components/cases.component';

const routes: Routes = [
  {
    path: 'import',
    loadChildren: () =>
      import('../metric-import-page/metric-import-page.module').then(m => m.MetricImportPageModule),
    data: {metricType: 'case', breadcrumbs: [{label: 'Import'}]},
  },
  {
    path: '',
    component: CasesComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class CasesRoutingModule {}
