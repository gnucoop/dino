import {Component} from '@angular/core';
import {NetworkStatusService} from '@dewco/core/auth';
import {BreakpointObserverService} from '@dewco/material/breakpoint-observer';

@Component({
  selector: 'app-reports',
  templateUrl: 'reports-e2e.component.html',
})
export class MatReportsE2E {
  constructor(
    readonly breakpointObserver: BreakpointObserverService,
    readonly networkStatus: NetworkStatusService,
  ) {}
}
