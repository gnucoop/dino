import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MetricsComponent} from './components/metrics.component';

const routes: Routes = [
  {
    path: 'thematic_areas',
    loadChildren: () => import('../areas/areas.module').then(m => m.AreasModule),
    data: {
      breadcrumbs: [
        {label: 'Thematic Areas', url: 'metrics/thematic_areas', icon: 'volunteer_activism'},
      ],
    },
  },
  {
    path: 'cases',
    loadChildren: () => import('../cases/cases.module').then(m => m.CasesModule),
    data: {
      breadcrumbs: [
        {label: 'Cases', url: 'metrics/cases', icon: 'people'},
      ],
    },
  },
  {
    path: 'locations',
    loadChildren: () => import('../locations/locations.module').then(m => m.LocationsModule),
    data: {breadcrumbs: [{label: 'Locations', url: 'metrics/locations', icon: 'place'}]},
  },
  {
    path: 'organizations',
    loadChildren: () =>
      import('../organizations/organizations.module').then(m => m.OrganizationsModule),
    data: {breadcrumbs: [{label: 'Organizations', url: 'metrics/organizations', icon: 'public'}]},
  },
  {
    path: 'projects',
    loadChildren: () => import('../projects/projects.module').then(m => m.ProjectsModule),
    data: {breadcrumbs: [{label: 'Projects', url: 'metrics/projects', icon: 'assignment'}]},
  },
  {
    path: '',
    component: MetricsComponent,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class MetricsRoutingModule {}
