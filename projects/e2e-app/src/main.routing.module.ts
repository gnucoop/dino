import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@dino/core/auth';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./mat-dashboard/dashboard-e2e.module').then(m => m.MaterialDashboardE2eModule),
    canActivate: [AuthGuard],
    data: {breadcrumbs: [{label: 'Dashboard', url: '', icon: 'apps'}]},
  },
  {
    path: 'login',
    loadChildren: () => import('./mat-login/login-e2e.module').then(m => m.MaterialLoginE2eModule),
  },
  {
    path: 'forms',
    loadChildren: () => import('./mat-forms/forms-e2e.module').then(m => m.MaterialFormsE2eModule),
    canActivate: [AuthGuard],
    data: {breadcrumbs: [{label: 'Forms', url: 'forms', icon: 'list_alt'}]},
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./mat-reports/reports-e2e.module').then(m => m.MaterialReportsE2eModule),
    canActivate: [AuthGuard],
    data: {breadcrumbs: [{label: 'Reports', url: 'reports', icon: 'stacked_bar_chart'}]},
  },
  {
    path: 'aggregation',
    loadChildren: () =>
      import('./mat-aggregation/aggregation-list-e2e.module').then(
        m => m.MaterialAggregationListE2eModule,
      ),
    canActivate: [AuthGuard],
    data: {breadcrumbs: [{label: 'Aggregation', url: 'aggregation', icon: 'zoom_in'}]},
  },
  {
    path: 'languages',
    loadChildren: () => import('./mat-langs/langs-e2e.module').then(m => m.MaterialLangsE2eModule),
    canActivate: [AuthGuard],
    data: {breadcrumbs: [{label: 'Languages', url: 'languages', icon: 'translate'}]},
  },
  {
    path: 'metrics',
    loadChildren: () =>
      import('./mat-metrics/metrics-e2e.module').then(m => m.MaterialMetricsE2eModule),
    canActivate: [AuthGuard],
    data: {breadcrumbs: [{label: 'Metrics', url: 'metrics', icon: 'bookmarks'}]},
  },
  {
    path: 'users',
    loadChildren: () => import('./mat-users/users-e2e.module').then(m => m.MaterialUsersE2eModule),
    canActivate: [AuthGuard],
    data: {breadcrumbs: [{label: 'Users', url: 'users', icon: 'people'}]},
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class DinoRoutingModule {}
