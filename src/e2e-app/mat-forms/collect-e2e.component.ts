import {Component} from '@angular/core';
import {NetworkStatusService} from '@dewco/core/auth';
import {BreakpointObserverService} from '@dewco/material/breakpoint-observer';


@Component({
  selector: 'app-collect',
  templateUrl: 'collect-e2e.component.html',
})
export class MatCollectE2E {
  constructor(
      readonly breakpointObserver: BreakpointObserverService,
      readonly networkStatus: NetworkStatusService,
  ) {}
}
