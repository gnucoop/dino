import {Component} from '@angular/core';
import {additionalConfig} from '../mockconfig';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report-e2e.component.html',
})
export class MatEditReportE2E {
  readonly baseDataChatAPIurl = 'http://localhost:5000'; // additionalConfig.gptPostUrl;
  readonly optionalMetrics: boolean = additionalConfig.optionalReportMetrics;
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string[];
  } | null = additionalConfig.secondaryMetricFieldsDisplayed;
}
