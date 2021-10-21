import {Component} from '@angular/core';
import {NetworkStatusService} from '@dewco/core/auth';
import {MetricsService} from '@dewco/core/data';
import {BreakpointObserverService} from '@dewco/material/breakpoint-observer';
import {CollectItem} from '@dewco/material/collect';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-metrics',
  templateUrl: 'metrics-e2e.component.html',
})
export class MatMetricsE2E {
  readonly metricItems: Observable<CollectItem[]>;

  constructor(
    readonly breakpointObserver: BreakpointObserverService,
    readonly networkStatus: NetworkStatusService,
    readonly metricService: MetricsService,
  ) {
    this.metricItems = this.metricService.activeMetrics.pipe(
      map(metrics => {
        if (metrics != null) {
          const collectItems: CollectItem[] = [];
          metrics.map(metric => {
            const item = {
              name: metric.label.toLowerCase().replace(' ', '_'),
              label: metric.label,
              icon: metric.icon,
              url: metric.label.toLowerCase().replace(' ', '_'),
            };
            collectItems.push(item);
          });
          return collectItems;
        }
        return [];
      }),
    );
  }
}
