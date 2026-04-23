import {environment} from 'src/environments/environment';

export const formInfoMessage: string | undefined = environment.formsConfig.formInfoMessage;

export const secondaryMetricFieldsDisplayed: {
  [metricName: string]: string | string [];
} | null = environment.metricsConfig.secondaryMetricFieldsDisplayed;
