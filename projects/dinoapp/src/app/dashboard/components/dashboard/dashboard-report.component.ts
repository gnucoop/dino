import {ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UITourService} from '@dino/material/ui-tour-service';
import {ThemeService} from '@dino/material/core';
import {LangManager} from '@dino/core/langs';
import {Observable, of as obsOf} from 'rxjs';
import {catchError, take} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {AjfReportInstance} from '@ajf/core/reports';
import {loadingSpinner, themedImagePath} from '../../../themed-images';

@Component({
  selector: 'dinoapp-dashboard-report',
  templateUrl: './dashboard-report.component.html',
  styleUrls: ['./dashboard-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DashboardReportComponent implements OnInit {
  favoriteReportId: string | null;
  readonly lightSpinnerPath: string = loadingSpinner.light;
  readonly spinnerImagePath: Observable<string>;
  readonly optionalMetrics: boolean = environment.metricsConfig.optionalReportMetrics;

  constructor(private _lm: LangManager, private _tourService: UITourService, ts: ThemeService) {
    this.spinnerImagePath = themedImagePath(ts, loadingSpinner);
    this.favoriteReportId = localStorage.getItem(
      `dino_favorite_report_${environment.dataConfig.instanceName}`,
    );

    this._lm.langRows$
      .pipe(
        take(1),
        catchError(_err => obsOf([])),
      )
      .subscribe();
  }

  ngOnInit(): void {
    if (!this.favoriteReportId) this._tourService.start();
  }

  startTourOnReportInstanceReady($event: AjfReportInstance) {
    if ($event) this._tourService.start();
  }
}
