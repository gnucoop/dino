import {Component} from '@angular/core';
import {NetworkStatusService} from '@dino/core/auth';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard-e2e.component.html',
})
export class MatDashboardE2E {
  readonly collectItems = [
    {
      name: 'forms',
      label: 'Forms',
      icon: 'list_alt',
      url: '/forms',
    },
    {
      name: 'reports',
      label: 'Reports',
      icon: 'stacked_bar_chart',
      url: '/reports',
    },
    {
      name: 'users',
      label: 'Users',
      icon: 'people',
      url: '/users',
    },
    {
      name: 'metrics',
      label: 'Metrics',
      icon: 'bookmarks',
      url: '/metrics',
    },
  ];

  constructor(
    readonly breakpointObserver: BreakpointObserverService,
    readonly networkStatus: NetworkStatusService,
  ) {}
}
