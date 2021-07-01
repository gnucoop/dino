import {Component} from '@angular/core';
import {NetworkStatusService} from '@dewco/core/auth';
import {BreakpointObserverService} from '@dewco/material/breakpoint-observer';


@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard-e2e.component.html',
})
export class MatDashboardE2E {
  readonly collectItems = [
    {
      name: 'list',
      label: 'Collect Forms',
      icon: 'list_alt',
      url: '/collect',
    },
  ];

  constructor(
      readonly breakpointObserver: BreakpointObserverService,
      readonly networkStatus: NetworkStatusService,
  ) {}
}
