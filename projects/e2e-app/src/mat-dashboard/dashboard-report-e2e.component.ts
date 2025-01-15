import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UITourService} from '@dino/material/ui-tour-service';
import {additionalConfig} from '../mockconfig';
import {instanceName} from '../mocks';
import {AjfReportInstance} from '@ajf/core/reports';

@Component({
  selector: 'app-dashboard-report',
  templateUrl: 'dashboard-report-e2e.component.html',
  styleUrls: ['dashboard-report-e2e.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MatDashboardReportE2E implements OnInit {
  favoriteReportId: string | null;
  readonly optionalMetrics: boolean = additionalConfig.optionalReportMetrics;

  constructor(private _tourService: UITourService) {
    this.favoriteReportId = localStorage.getItem(`dino_favorite_report_${instanceName}`);
  }

  ngOnInit(): void {
    if (!this.favoriteReportId) this._tourService.start();
  }

  startTourOnReportInstanceReady($event: AjfReportInstance) {
    if ($event) this._tourService.start();
  }
}
