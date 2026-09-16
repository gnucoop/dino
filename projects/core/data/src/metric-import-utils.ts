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

import {RxDocument} from 'rxdb';
import {Observable, of as obsOf} from 'rxjs';
import {catchError, concatMap, map} from 'rxjs/operators';

import {DataModelManager} from './data-model-manager';
import {DataQueryOptions, DataQuerySelector} from './data-options-interface';
import {InsertModel} from './insert-model';
import {Metric} from './metric';

/**
 * A metric being imported: a plain object built from a file row, or a metric document.
 */
export type ImportableMetric = {[key: string]: any};

/**
 * The parent identifiers referenced by a list of metrics to be imported.
 */
export interface MetricParentRefs {
  parentIds: string[];
  parentNames: string[];
}

/**
 * Metrics to be imported, split by the presence of a parent reference.
 */
export interface MetricParentSplit {
  roots: ImportableMetric[];
  withParent: ImportableMetric[];
}

/**
 * Metrics to be imported, split by the resolution of their parent reference.
 */
export interface MetricParentFill {
  readyToInsert: ImportableMetric[];
  deferred: ImportableMetric[];
}

/**
 * The outcome of a recursive metric tree import.
 */
export interface MetricTreeResult<T extends Metric = Metric> {
  /**
   * The metrics created by all the tree levels.
   */
  success: RxDocument<T>[];

  /**
   * The errors returned by the bulk creations.
   */
  error: any[];

  /**
   * The metrics whose parent could not be resolved.
   */
  deferred: ImportableMetric[];
}

/**
 * Optional callbacks of a recursive metric tree import.
 */
export interface MetricTreeOptions<T extends Metric = Metric> {
  /**
   * Called once per tree level, with the metrics created by that level.
   */
  onCreated?: (created: RxDocument<T>[]) => void;

  /**
   * Called when a bulk creation fails.
   */
  onError?: (err: unknown) => void;
}

/**
 * Whether a value is a usable metric identifier (a non empty string).
 * @param value The value to be checked
 * @returns True if the value can be used to look a metric up
 */
function isFilledRef(value: any): boolean {
  return typeof value === 'string' ? value.trim().length > 0 : value != null && value !== '';
}

/**
 * Whether a metric references a parent, by id or by name. Both properties are
 * required by the metric schemas, so they are always present and valued null
 * when the imported file has no column for them.
 * @param metric The metric to be imported
 * @returns True if the metric references a parent
 */
export function hasParentRef(metric: ImportableMetric): boolean {
  return isFilledRef(metric['parent_id']) || isFilledRef(metric['parent_name']);
}

/**
 * Split the metrics to be imported into the ones without a parent, which can be
 * created right away, and the ones whose parent must be resolved first.
 * @param metrics The metrics to be imported
 * @returns The metrics split by the presence of a parent reference
 */
export function splitMetricsByParent(metrics: ImportableMetric[]): MetricParentSplit {
  const roots: ImportableMetric[] = [];
  const withParent: ImportableMetric[] = [];
  metrics.forEach(metric => (hasParentRef(metric) ? withParent : roots).push(metric));
  return {roots, withParent};
}

/**
 * Collect the parent ids and the parent names referenced by the metrics to be
 * imported, so that the existing parents can be fetched in a single query.
 * @param metrics The metrics to be imported
 * @returns The deduplicated parent ids and parent names
 */
export function collectParentRefs(metrics: ImportableMetric[]): MetricParentRefs {
  const parentIds = new Set<string>();
  const parentNames = new Set<string>();
  metrics.forEach(metric => {
    if (isFilledRef(metric['parent_id'])) {
      parentIds.add(`${metric['parent_id']}`.trim());
    }
    if (isFilledRef(metric['parent_name'])) {
      parentNames.add(`${metric['parent_name']}`.trim());
    }
  });
  return {parentIds: [...parentIds], parentNames: [...parentNames]};
}

/**
 * Build the query options fetching the metrics matching any of the given ids or names.
 * @param ids The metric ids to be fetched
 * @param names The metric names to be fetched
 * @returns The query options, or null when there is nothing to fetch
 */
export function buildMetricLookupSelector(ids: string[], names: string[]): DataQueryOptions | null {
  const conditions: DataQuerySelector[] = [];
  const uniqueIds = [...new Set(ids)];
  const uniqueNames = [...new Set(names)];
  if (uniqueIds.length) {
    conditions.push({id: {$in: uniqueIds}});
  }
  if (uniqueNames.length) {
    conditions.push({name: {$in: uniqueNames}});
  }
  if (!conditions.length) {
    return null;
  }
  const selector: DataQuerySelector =
    conditions.length > 1 ? {$or: [...conditions]} : {...conditions[0]};
  selector['is_deleted'] = {$ne: true};
  return {selector};
}

/**
 * Resolve the parent of each metric against the given pool of known metrics,
 * filling in the missing side of the reference: the metric model keeps both the
 * parent id and the parent name, but an imported file usually carries only one.
 * The metrics are modified in place; a metric whose parent is not in the pool is
 * deferred, so that it can be retried once its parent has been created.
 * @param newMetricsToFill The metrics to be imported, all referencing a parent
 * @param existingMetrics The metrics that can be used as parents
 * @returns The metrics ready to be created and the ones still missing their parent
 */
export function fillInMissingParentValues(
  newMetricsToFill: ImportableMetric[],
  existingMetrics: ImportableMetric[],
): MetricParentFill {
  const readyToInsert: ImportableMetric[] = [];
  const deferred: ImportableMetric[] = [];

  newMetricsToFill.forEach(metric => {
    if (isFilledRef(metric['parent_id'])) {
      // Found the parent metric by id and set the parent name
      const parent = existingMetrics.find(doc => doc['id'] === metric['parent_id']);
      if (parent && parent['name']) {
        metric['parent_name'] = parent['name'];
        readyToInsert.push(metric);
      } else {
        deferred.push(metric);
      }
    } else if (isFilledRef(metric['parent_name'])) {
      // Found the parent metric by name and set the parent id
      const parent = existingMetrics.find(doc => doc['name'] === metric['parent_name']);
      if (parent && parent['id']) {
        metric['parent_id'] = parent['id'];
        readyToInsert.push(metric);
      } else {
        deferred.push(metric);
      }
    }
  });

  return {readyToInsert, deferred};
}

/**
 * Create the given metrics one tree level at a time: every pass creates the
 * metrics whose parent is already known and retries the remaining ones against
 * the enlarged pool, so that a parent defined by another row of the same file is
 * resolved whatever the row order is. A pass resolving nothing stops the
 * recursion, which is what terminates on cycles and on unknown parents.
 * @param manager The metric data model manager
 * @param newMetricsWithParent The metrics to be created, all referencing a parent
 * @param existingMetrics The metrics that can be used as parents
 * @param options Optional callbacks
 * @returns The created metrics, the bulk creation errors and the unresolved metrics
 */
export function importMetricTree<T extends Metric = Metric>(
  manager: DataModelManager<T>,
  newMetricsWithParent: ImportableMetric[],
  existingMetrics: ImportableMetric[],
  options?: MetricTreeOptions<T>,
): Observable<MetricTreeResult<T>> {
  if (!newMetricsWithParent.length) {
    return obsOf({success: [], error: [], deferred: []});
  }

  const {readyToInsert, deferred} = fillInMissingParentValues(
    newMetricsWithParent,
    existingMetrics,
  );

  if (!readyToInsert.length) {
    // No parent could be resolved: stop here and report the metrics as unresolved
    return obsOf({success: [], error: [], deferred});
  }

  return manager.bulkCreate(readyToInsert as InsertModel<T>[]).pipe(
    catchError(err => {
      if (options?.onError) {
        options.onError(err);
      }
      return obsOf({success: [] as RxDocument<T>[], error: [] as any[]});
    }),
    concatMap(bulkRes => {
      const success = bulkRes?.success || [];
      const error = bulkRes?.error || [];

      if (error.length || !success.length) {
        if (error.length && options?.onError) {
          options.onError(error);
        }
        return obsOf({success, error, deferred});
      }

      if (options?.onCreated) {
        options.onCreated(success);
      }
      // The metrics created by this level become parents for the next one
      return importMetricTree(manager, deferred, [...success, ...existingMetrics], options).pipe(
        map(nextRes => ({
          success: [...success, ...nextRes.success],
          error: [...error, ...nextRes.error],
          deferred: nextRes.deferred,
        })),
      );
    }),
  );
}

/**
 * Build the user facing list of the given metric names, truncated to a maximum.
 * @param metrics The metrics to be listed
 * @param label The label introducing the list
 * @param maxNames The maximum number of names to be listed
 * @param moreLabel The suffix appended when the list is truncated
 * @returns The message, empty when there is no metric to list
 */
export function formatMetricNamesMessage(
  metrics: {name?: any}[],
  label: string,
  maxNames: number = 15,
  moreLabel: string = '\nand more...',
): string {
  if (!metrics.length) {
    return '';
  }
  const names = metrics.slice(0, maxNames).map(metric => `\n${metric['name']}`);
  if (metrics.length > maxNames) {
    names.push(moreLabel);
  }
  return `\n${label} (${metrics.length}):${names}\n`;
}
