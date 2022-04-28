import {Component} from '@angular/core';
import {NetworkStatusService} from '@dino/core/auth';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';

@Component({
  selector: 'app-forms',
  templateUrl: 'forms-e2e.component.html',
})
export class MatFormsE2E {
  constructor(
    readonly breakpointObserver: BreakpointObserverService,
    readonly networkStatus: NetworkStatusService,
  ) {}
}
