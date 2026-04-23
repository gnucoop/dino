import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProjectsComponent} from './components/projects.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class ProjectsRoutingModule {
}
