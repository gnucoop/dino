import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {additionalConfig} from '../mockconfig';
import {instanceName} from '../mocks';

@Component({
  selector: 'app-dashboard-report',
  templateUrl: 'dashboard-report-e2e.component.html',
  styleUrls: ['dashboard-report-e2e.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MatDashboardReportE2E {
  favoriteReportId: string | null;
  readonly optionalMetrics: boolean = additionalConfig.optionalReportMetrics;

  constructor() {
    this.favoriteReportId = localStorage.getItem(`dino_favorite_report_${instanceName}`);
  }
}
