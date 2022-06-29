import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatProjectsE2E} from './projects-e2e.component';

const routes: Routes = [
  {
    path: '',
    component: MatProjectsE2E,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class ProjectsRoutingModule {}
