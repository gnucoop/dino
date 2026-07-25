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

import {Metric} from './metric';
import {Permission} from './data-permission';
import {CanViewData} from './data-permission-interface';
import {RxDocument} from 'rxdb';

/**
 * Permission that checks if the Active User can see or perform operation on a Metric on their metric list.
 */
export class CheckMetricPermission<T extends Metric = Metric> implements Permission<T> {
  /**
   * @param _collectionName Optional collection name, used when the checked
   * document does not carry one. Offline documents are RxDocuments exposing
   * `collection.name`, but a plain or copied object (online results are plain
   * objects, and `deepCopy` drops the compatibility shim's non-enumerable
   * members) does not, so the owning manager can supply it explicitly.
   */
  constructor(private _collectionName?: string) {}
  canView(data: CanViewData<T>): boolean {
    return this._canViewMetric(data);
  }

  /**
   * Verifies a metric presence in the Active User permission context.
   * @param data The Metric and context to be checked
   * @returns True if the Metric can be viewed
   */
  private _canViewMetric(data: CanViewData<T>): boolean {
    if (data.context == null || data.context['user_metrics'] == null || data.object == null) {
      return false;
    }
    const doc = data.object as RxDocument<T>;
    const collectionName = doc.collection?.name ?? this._collectionName;
    if (collectionName == null) {
      // Without a collection name the metric type cannot be resolved; do not
      // throw, and leave the decision to the other permission checks.
      return false;
    }
    const userMetrics = data.context['user_metrics'];
    const metricsByType: string[] = userMetrics[collectionName];
    if (metricsByType != null) {
      return metricsByType.includes(doc.id) || metricsByType.includes('all');
    }
    return false;
  }
}
