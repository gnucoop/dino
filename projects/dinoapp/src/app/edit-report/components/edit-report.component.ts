import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ThemeService} from '@dino/material/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import * as conf from '../conf';
import {loadingSpinner, themedImagePath} from '../../themed-images';

@Component({
  selector: 'dinoapp-edit-report',
  templateUrl: './edit-report.component.html',
  styleUrls: ['./edit-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class EditReportComponent {
  readonly lightSpinnerPath: string = loadingSpinner.light;
  readonly spinnerImagePath: Observable<string>;
  readonly allowMetricCreationFor: string[] | undefined =
    environment.metricsConfig.allowMetricCreationFor;
  readonly optionalMetrics: boolean = environment.metricsConfig.optionalReportMetrics;
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string [];
  } | null = conf.secondaryMetricFieldsDisplayed;
  readonly baseDataChatAPIurl = environment.pandinoConfig.pandinoUrl;

  constructor(ts: ThemeService) {
    this.spinnerImagePath = themedImagePath(ts, loadingSpinner);
  }
}
