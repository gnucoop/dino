import {Component} from '@angular/core';
import {additionalConfig} from '../mockconfig';
import {syncGraphQLUrl} from '../mocks';

@Component({
  selector: 'app-edit-report',
  templateUrl: './edit-report-e2e.component.html',
})
export class MatEditReportE2E {
  readonly gptCompletionUrl = 'https://gptserv.herokuapp.com/completion.json';
  readonly graphqlUrl = syncGraphQLUrl;
  readonly optionalMetrics: boolean = additionalConfig.optionalReportMetrics;
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string;
  } | null = additionalConfig.secondaryMetricFieldsDisplayed;
}
