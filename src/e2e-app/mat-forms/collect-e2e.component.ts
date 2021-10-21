import {Component} from '@angular/core';
import {NetworkStatusService} from '@dino/core/auth';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';

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
