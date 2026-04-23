import {environment} from 'src/environments/environment';

export const secondaryMetricFieldsDisplayed: {
  [metricName: string]: string | string [];
} | null = environment.metricsConfig.secondaryMetricFieldsDisplayed;
