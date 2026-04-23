import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {NetworkStatusService} from '@dino/core/auth';
import {MetricsService} from '@dino/core/data';
import {CollectItem} from '@dino/material/collect';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
  selector: 'dinoapp-metrics',
  templateUrl: 'metrics.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MetricsComponent {
  readonly metricItems: Observable<CollectItem[]>;

  constructor(
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
