/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

/**
 * Represents an Active optional metric.
 */
export interface ActiveMetric {
  /**
   * The metric label.
   */
  label: string;

  /**
   * The metric icon identifier.
   */
  icon: string;

  /**
   * The metric name identifier
   */
  metricName: string;
}

/**
 * Service that keeps track of the active optional Metrics.
 */
@Injectable({providedIn: 'root'})
export class MetricsService {
  /**
   * The list of the currently active optional Metrics.
   */
  readonly activeMetrics: BehaviorSubject<ActiveMetric[]> = new BehaviorSubject<ActiveMetric[]>([]);

  /**
   * True if one or more optional metrics are activated.
   */
  readonly hasActiveMetrics: Observable<boolean> = this.activeMetrics.pipe(
    map(metrics => metrics.length > 0),
  );

  /**
   * Adds an optional Metric to the list when it's activated.
   */
  activateMetric(metric: ActiveMetric): void {
    if (metric == null) {
      return;
    }
    const findMetric = this.activeMetrics.getValue().find(mt => mt.label === metric.label);
    if (findMetric == null) {
      this.activeMetrics.next([...this.activeMetrics.getValue(), metric]);
    }
  }

  /**
   * Checks if a Metric module is Active
   * @param metricType  The Metric type
   * @returns True if the Metric module is active
   */
  isActiveMetric(metricType: string): boolean {
    const activeMetrics = this.activeMetrics.getValue();
    const isMetricActive = activeMetrics.find(mt => mt.metricName === metricType) != null;
    return isMetricActive;
  }
}
