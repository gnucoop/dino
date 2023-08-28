import {Component} from '@angular/core';
import {NetworkStatusService} from '@dino/core/auth';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {additionalConfig} from '../mockconfig';

@Component({
  selector: 'app-forms',
  templateUrl: 'forms-e2e.component.html',
})
export class MatFormsE2E {
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string;
  } | null = additionalConfig.secondaryMetricFieldsDisplayed;

  constructor(
    readonly breakpointObserver: BreakpointObserverService,
    readonly networkStatus: NetworkStatusService,
  ) {}
}
