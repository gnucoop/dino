import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '@dino/core/auth';
import {AdminGuard} from '@dino/core/users';
import {environment} from 'src/environments/environment';
import {LoginGuard} from './login.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard],
    data: {
      breadcrumbs: [
        {label: 'Dashboard', url: '', icon: 'apps', svgIcon: environment.customSvgIcons?.dashboard},
      ],
    },
  },
  {
    path: 'login',
    loadChildren: environment.dataConfig.backendless
      ? () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      : () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./forms-collect/forms-collect.module').then(m => m.FormsCollectModule),
    canActivate: environment.usersConfig.adminSections?.includes('forms')
      ? [AuthGuard, AdminGuard]
      : [AuthGuard],
    data: {
      breadcrumbs: [
        {
          label: 'Forms',
          url: 'forms',
          icon: 'list_alt',
          svgIcon: environment.customSvgIcons?.forms,
        },
      ],
    },
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports-collect/reports-collect.module').then(m => m.ReportsCollectModule),
    canActivate: environment.usersConfig.adminSections?.includes('reports')
    ? [AuthGuard, AdminGuard]
    : [AuthGuard],
    data: {
      breadcrumbs: [
        {
          label: 'Reports',
          url: 'reports',
          icon: 'stacked_bar_chart',
          svgIcon: environment.customSvgIcons?.reports,
        },
      ],
    },
  },
  {
    path: 'aggregation',
    loadChildren: () =>
      import('./aggregation-list/aggregation-list.module').then(m => m.AggregationListModule),
    canActivate: environment.usersConfig.adminSections?.includes('aggregation')
    ? [AuthGuard, AdminGuard]
    : [AuthGuard],
    data: {
      breadcrumbs: [
        {
          label: 'Aggregation',
          url: 'aggregation',
          icon: 'zoom_in',
          svgIcon: environment.customSvgIcons?.aggregation,
        },
      ],
    },
  },
  {
    path: 'languages',
    loadChildren: () => import('./langs/langs.module').then(m => m.LangsModule),
    canActivate: [AuthGuard, AdminGuard],
    data: {
      breadcrumbs: [
        {
          label: 'Languages',
          url: 'languages',
          icon: 'translate',
          svgIcon: environment.customSvgIcons?.translations,
        },
      ],
      adminroles: environment.usersConfig.adminRoles,
    },
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./notifications-list/notifications-list.module').then(m => m.NotificationsListModule),
    canActivate: environment.usersConfig.adminSections?.includes('notifications')
    ? [AuthGuard, AdminGuard]
    : [AuthGuard],
    data: {breadcrumbs: [{label: 'Notifications', url: 'notifications', icon: 'notifications'}]},
  },
  {
    path: 'metrics',
    loadChildren: () => import('./metrics/metrics.module').then(m => m.MetricsModule),
    canActivate: environment.usersConfig.adminSections?.includes('metrics')
    ? [AuthGuard, AdminGuard]
    : [AuthGuard],
    data: {
      breadcrumbs: [
        {
          label: 'Metrics',
          url: 'metrics',
          icon: 'bookmarks',
          svgIcon: environment.customSvgIcons?.metrics,
        },
      ],
    },
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard, AdminGuard],
    data: {
      breadcrumbs: [
        {label: 'Users', url: 'users', icon: 'people', svgIcon: environment.customSvgIcons?.users},
      ],
      adminroles: environment.usersConfig.adminRoles,
    },
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
    canActivate: [AuthGuard],
    data: {breadcrumbs: [{label: 'Checkout ', url: 'checkout', icon: 'smart_toy'}]},
  },
  {
    path: 'f',
    loadChildren: () =>
      import('./edit-public-form/edit-form-public.module').then(m => m.EditPublicFormModule),
    data: {breadcrumbs: []},
  },
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

if (environment.optionalModulesConfig.gptModule) {
  routes.unshift({
    path: 'gpt',
    loadChildren: () => import('./gpt/gpt.module').then(m => m.GptModule),
    canActivate: environment.usersConfig.adminSections?.includes('gpt')
    ? [AuthGuard, AdminGuard]
    : [AuthGuard],
    data: {breadcrumbs: [{label: 'GPT', url: 'gpt', icon: 'chat'}]},
  }, {
    path: 'rag',
    loadChildren: () => import('./rag/rag.module').then(m => m.RagModule),
    canActivate: [AuthGuard, AdminGuard],
    data: {
      breadcrumbs: [{label: 'RAG', url: 'rag', icon: 'document_scanner'}],
      adminroles: environment.usersConfig.adminRoles,
    },
  });
}

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class DinoRoutingModule {}
