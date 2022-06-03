import {Component} from '@angular/core';
import {ReportDataManager} from '@dino/core/reports';
import {additionalConfig} from '../mockconfig';

@Component({
  selector: 'app-create-report-data',
  templateUrl: './create-report-data-e2e.component.html',
})
export class MatCreateReportDataE2E {
  readonly manager: ReportDataManager;
  readonly optionalMetrics: boolean = additionalConfig.optionalReportMetrics;

  constructor(private _reportDataManager: ReportDataManager) {
    this.manager = this._reportDataManager;
  }
}
