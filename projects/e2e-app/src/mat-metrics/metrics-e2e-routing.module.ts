import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MatMetricsE2E} from './metrics-e2e.component';

const routes: Routes = [
  {
    path: 'thematic_areas',
    loadChildren: () => import('../mat-areas/areas-e2e.module').then(m => m.MaterialAreasE2eModule),
    data: {
      breadcrumbs: [
        {label: 'Thematic Areas', url: 'metrics/thematic_areas', icon: 'volunteer_activism'},
      ],
    },
  },
  {
    path: 'cases',
    loadChildren: () => import('../mat-cases/cases-e2e.module').then(m => m.MaterialCasesE2eModule),
    data: {
      breadcrumbs: [{label: 'Cases', url: 'metrics/cases', icon: 'people'}],
    },
  },
  {
    path: 'locations',
    loadChildren: () =>
      import('../mat-locations/locations-e2e.module').then(m => m.MaterialLocationsE2eModule),
    data: {breadcrumbs: [{label: 'Locations', url: 'metrics/locations', icon: 'place'}]},
  },
  {
    path: 'organizations',
    loadChildren: () =>
      import('../mat-organizations/organizations-e2e.module').then(
        m => m.MaterialOrganizationsE2eModule,
      ),
    data: {breadcrumbs: [{label: 'Organizations', url: 'metrics/organizations', icon: 'public'}]},
  },
  {
    path: 'projects',
    loadChildren: () =>
      import('../mat-projects/projects-e2e.module').then(m => m.MaterialProjectsE2eModule),
    data: {breadcrumbs: [{label: 'Projects', url: 'metrics/projects', icon: 'assignment'}]},
  },
  {
    path: '',
    component: MatMetricsE2E,
    data: {breadcrumbs: null},
  },
];

@NgModule({imports: [RouterModule.forChild(routes)], exports: [RouterModule]})
export class MetricsRoutingModule {}
