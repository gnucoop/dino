import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from './components/projects.component';

const routes: Routes = [
  {
    path: 'import',
    loadChildren: () =>
      import('../metric-import-page/metric-import-page.module').then(m => m.MetricImportPageModule),
    data: {metricType: 'project', breadcrumbs: [{label: 'Import'}]},
  },
  {
    path: '',
    component: ProjectsComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class ProjectsRoutingModule {}
