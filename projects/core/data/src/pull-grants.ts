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

import {PermissionContext} from './data-permission-interface';

/**
 * Prefix of the local storage key holding the grants a local database was last
 * synchronised for. The database name completes it, as it does for the owner record.
 *
 * Kept outside the database for the same reason as the owner record: it describes the
 * data rather than belonging to it, and it must survive a session ending - which is
 * exactly the case it exists for.
 */
export const PULL_GRANTS_STORAGE_KEY_PREFIX = 'dino_pull_grants:';

/**
 * What the active user was allowed to pull at the end of a session.
 *
 * The pull asks for documents changed after a checkpoint, so a document that has been
 * on the backend for months and was granted today does not come back on its own: it did
 * not change, it became visible. Comparing this record with the grants of the new
 * session is what says which ids to ask for explicitly.
 *
 * Ids are stored as arrays rather than sets so the record survives `JSON.stringify`.
 */
export interface PullGrants {
  /**
   * Form schema ids, or `['all']`.
   */
  formSchemas: string[];

  /**
   * Report schema ids, or `['all']`.
   */
  reportSchemas: string[];

  /**
   * Metric ids by metric type - `project`, `area`, `case` and the others - each list
   * possibly being `['all']`.
   */
  metrics: {[metricType: string]: string[]};
}

/**
 * The ids granted since the recorded session, by dimension. Empty lists mean nothing
 * was added on that dimension, and an empty diff means there is nothing to backfill.
 */
export interface PullGrantsDiff {
  formSchemas: string[];
  reportSchemas: string[];
  metrics: {[metricType: string]: string[]};
}

/**
 * @param databaseName The name of the local database.
 * @returns The local storage key holding the grants recorded for that database.
 */
export function pullGrantsStorageKey(databaseName: string): string {
  return `${PULL_GRANTS_STORAGE_KEY_PREFIX}${databaseName}`;
}

/**
 * Normalises a stored or computed list of ids: unique, sorted, strings only.
 *
 * Sorted so that two records of the same grants compare equal whatever order the
 * groups were read in.
 */
function normalizeIds(ids: Iterable<unknown> | null | undefined): string[] {
  if (ids == null) {
    return [];
  }
  const out = new Set<string>();
  for (const id of ids) {
    if (typeof id === 'string' && id !== '') {
      out.add(id);
    }
  }
  return [...out].sort();
}

/**
 * Reads the grants recorded for a database.
 *
 * @param databaseName The name of the local database.
 * @returns The recorded grants, or null when there is no usable record - a device that
 * never completed a session, or one upgrading to a version that writes this.
 */
export function pullGrants(databaseName: string): PullGrants | null {
  const raw = localStorage.getItem(pullGrantsStorageKey(databaseName));
  if (raw == null || raw === '') {
    return null;
  }
  try {
    const parsed = JSON.parse(raw);
    if (parsed == null || typeof parsed !== 'object') {
      return null;
    }
    const metrics: {[metricType: string]: string[]} = {};
    const storedMetrics = parsed.metrics;
    if (storedMetrics != null && typeof storedMetrics === 'object') {
      for (const metricType of Object.keys(storedMetrics)) {
        metrics[metricType] = normalizeIds(storedMetrics[metricType]);
      }
    }
    return {
      formSchemas: normalizeIds(parsed.formSchemas),
      reportSchemas: normalizeIds(parsed.reportSchemas),
      metrics,
    };
  } catch {
    return null;
  }
}

/**
 * Records the grants a database is now synchronised for.
 *
 * To be called only once the backfill those grants required has actually gone through:
 * a record written too early would make the next login believe the documents are here.
 *
 * @param databaseName The name of the local database.
 * @param grants The grants to record.
 */
export function storePullGrants(databaseName: string, grants: PullGrants): void {
  localStorage.setItem(pullGrantsStorageKey(databaseName), JSON.stringify(grants));
}

/**
 * Forgets the grants recorded for a database. To be called when its data is gone,
 * alongside the owner record: a record kept without the data would suppress the
 * backfill for documents that are no longer here.
 *
 * @param databaseName The name of the local database.
 */
export function removePullGrants(databaseName: string): void {
  localStorage.removeItem(pullGrantsStorageKey(databaseName));
}

/**
 * The grants a permission context describes, in the shape this record stores.
 *
 * @param context The permission context of the current session.
 * @returns The current grants.
 */
export function grantsFromContext(context: PermissionContext): PullGrants {
  const metrics: {[metricType: string]: string[]} = {};
  const userMetrics = context.user_metrics;
  if (userMetrics != null) {
    for (const metricType of Object.keys(userMetrics)) {
      metrics[metricType] = normalizeIds(userMetrics[metricType]);
    }
  }
  return {
    formSchemas: normalizeIds(context.user_form_schemas),
    reportSchemas: normalizeIds(context.user_report_schemas),
    metrics,
  };
}

/**
 * The ids granted in `current` that `previous` did not have.
 *
 * A dimension that is now `all` yields nothing: the filter for it is empty, so every
 * document already comes down and there is nothing to ask for by id. A dimension that
 * *was* `all` and is now a list is a restriction, which never backfills.
 *
 * @param current The grants of this session.
 * @param previous The grants recorded at the end of the last one, or null when none
 * was ever recorded.
 * @returns The diff, or null when there is nothing to backfill.
 */
export function pullGrantsDiff(
  current: PullGrants,
  previous: PullGrants | null,
): PullGrantsDiff | null {
  // No record: this is the first session of a version that keeps one. Register the
  // current grants and ask for nothing extra - backfilling every device at once, on the
  // same day, over a connection that is often the problem, would cost more than the
  // permissions it fixes. The first change after this one is backfilled normally.
  if (previous == null) {
    return null;
  }

  const added = (now: string[], before: string[]): string[] => {
    if (now.includes('all')) {
      return [];
    }
    const had = new Set(before);
    return now.filter(id => id !== 'all' && !had.has(id));
  };

  const metrics: {[metricType: string]: string[]} = {};
  for (const metricType of Object.keys(current.metrics)) {
    const ids = added(current.metrics[metricType], previous.metrics[metricType] ?? []);
    if (ids.length) {
      metrics[metricType] = ids;
    }
  }
  const formSchemas = added(current.formSchemas, previous.formSchemas);
  const reportSchemas = added(current.reportSchemas, previous.reportSchemas);

  if (!formSchemas.length && !reportSchemas.length && !Object.keys(metrics).length) {
    return null;
  }
  return {formSchemas, reportSchemas, metrics};
}
