import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {environment} from 'src/environments/environment';
import * as conf from '../conf';

@Component({
  selector: 'dinoapp-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditReportComponent {
  readonly lightSpinnerPath: string =
    environment.customImagesConfig?.spinnerLight ?? 'assets/icons/logos/spinnerdino.png';
  readonly allowMetricCreationFor: string[] | undefined =
    environment.metricsConfig.allowMetricCreationFor;
  readonly optionalMetrics: boolean = environment.metricsConfig.optionalReportMetrics;
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string [];
  } | null = conf.secondaryMetricFieldsDisplayed;
  readonly baseDataChatAPIurl = environment.pandinoConfig.pandinoUrl;
}
