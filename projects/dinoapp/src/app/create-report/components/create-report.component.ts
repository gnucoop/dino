import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {environment} from 'src/environments/environment';
import * as conf from '../conf';

@Component({
  selector: 'dinoapp-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CreateReportComponent {
  readonly allowMetricCreationFor: string[] | undefined =
    environment.metricsConfig.allowMetricCreationFor;
  readonly optionalMetrics: boolean = environment.metricsConfig.optionalReportMetrics;
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string [];
  } | null = conf.secondaryMetricFieldsDisplayed;

  constructor() {}
}
