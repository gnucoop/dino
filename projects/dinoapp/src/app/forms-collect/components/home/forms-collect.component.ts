import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'dinoapp-forms-collect',
  templateUrl: './forms-collect.component.html',
  styleUrls: ['./forms-collect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormsCollectComponent {
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string [];
  } | null = environment.metricsConfig.secondaryMetricFieldsDisplayed;
  readonly noFormsMessage =
    'There are not any Forms currently available. Please add a Form to start collecting data.';

  readonly optionalMetrics: boolean = environment.metricsConfig.optionalFormMetrics;

  constructor() {}
}
