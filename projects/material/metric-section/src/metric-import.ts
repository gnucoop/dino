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

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormControl} from '@angular/forms';
import {
  buildMetricLookupSelector,
  collectParentRefs,
  DataModelManager,
  getValueFromRow,
  importMetricTree,
  Metric,
  MetricTreeResult,
  splitMetricsByParent,
} from '@dino/core/data';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {
  ColumnMapping,
  ImportField,
  ImportIssue,
  ImportOutcome,
  ImportOutcomeStatus,
  ImportWarning,
  applyMappings,
  warningGroup,
} from '@dino/material/import-wizard';
import {UserGroupManager} from '@dino/core/users';
import {TranslocoService} from '@ngneat/transloco';
import {RxDocument, RxJsonSchema} from 'rxdb';
import {
  catchError,
  combineLatest,
  Observable,
  of as obsOf,
  Subscription,
  switchMap,
  take,
} from 'rxjs';

/**
 * Metric properties Dino generates by itself, never mapped by the user.
 */
const AUTO_METRIC_PROPS = ['id', 'created_at', 'updated_at', 'is_deleted', '_deleted'];

/**
 * All metric details found in the mapped rows
 */
interface MetricInfoInRows {
  /**
   * Metrics to be created, with no parent
   */
  newMetrics: Metric[];

  /**
   * Metrics to be created, referencing a parent
   */
  newMetricsWithParent: Metric[];

  /**
   * The rows that cannot be imported, with the reason
   */
  invalidRows: ImportIssue[];

  /**
   * Parent ids referenced by the new metrics
   */
  requiredMetricParentIds: string[];

  /**
   * Parent names referenced by the new metrics
   */
  requiredMetricParentNames: string[];
}

/**
 * The Metric import component.
 * Declares the metric properties as the mappable fields and imports the rows
 * the wizard hands over, resolving the parents recursively.
 */
@Component({
  selector: 'dino-metric-import',
  templateUrl: 'metric-import.html',
  styleUrls: ['metric-import.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MetricImport implements OnDestroy {
  /**
   * The data model manager of the metric to be imported.
   */
  @Input()
  set metricManager(manager: DataModelManager<any> | null) {
    this._metricManager = manager;
    this._buildFields();
  }
  private _metricManager: DataModelManager<any> | null = null;

  /**
   * The metric name (area, case, project...), the prefix of the file columns.
   */
  @Input()
  set metricName(name: string) {
    this._metricName = name ?? '';
    this._buildFields();
  }
  get metricName(): string {
    return this._metricName;
  }
  private _metricName = '';

  /**
   * Emitted when the user leaves the wizard without importing.
   */
  @Output() cancelled = new EventEmitter<void>();

  /**
   * Emitted once some metric has been imported.
   */
  @Output() imported = new EventEmitter<void>();

  /**
   * The fields the file columns can be mapped onto.
   */
  fields: ImportField[] = [];

  /**
   * The outcome of the import, shown in the last step of the wizard.
   */
  outcome: ImportOutcome | null = null;

  /**
   * True while the rows are being imported.
   */
  importing = false;

  /**
   * Whether an existing metric with the same name is reused instead of created.
   */
  readonly reuseMetricName = new UntypedFormControl(true);

  /**
   * If true, a metric whose name already exists is not created again.
   */
  private _metricMustBeUnique = false;

  /**
   * The data rows of the file, the label header row excluded.
   */
  private _fileRows = 0;

  /**
   * The roles granting Admin permissions
   */
  private _adminRoles = ['admin'];

  /**
   * Not mandatory common fields for import. Id and updated_at are not importable.
   */
  private _notMandatoryFields: string[] = ['id', 'created_at', 'updated_at'];

  /**
   * Dino importable common metric fields, used to spot the label header row
   */
  private _dinoFields: string[] = ['created_at', 'name', 'parent_id', 'parent_name'];

  private _importSub: Subscription = Subscription.EMPTY;

  constructor(
    private _ehms: ErrorHandlerMessageService,
    private _ugm: UserGroupManager,
    private _ts: TranslocoService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {
    this._importSub.unsubscribe();
    this.cancelled.complete();
    this.imported.complete();
  }

  /**
   * Imports the rows the wizard hands over.
   * @param request The parsed rows and the column mappings
   */
  onApply(request: {rows: {[key: string]: any}[]; mappings: ColumnMapping[]}): void {
    if (this._metricManager == null) {
      return;
    }
    this.importing = true;
    this._metricMustBeUnique = this.reuseMetricName.value;
    const rows = this._stripPrefix(applyMappings(request.rows, request.mappings));
    this._importRows(rows);
  }

  /**
   * Leaves the wizard once the result has been read.
   */
  onClosed(): void {
    if (this.outcome && this.outcome.status !== 'error') {
      this.imported.emit();
    } else {
      this.cancelled.emit();
    }
  }

  /**
   * Reports an unreadable file as an outcome.
   */
  onUnreadableFile(): void {
    this._setOutcome(this._ts.translate('File not imported! Could not read the file.'), 'error');
  }

  /**
   * Declares one mappable field per importable metric property. The field is
   * named as the export writes it, `<metric>_<prop>`, so that a file exported by
   * Dino is mapped without touching anything.
   */
  private _buildFields(): void {
    if (this._metricManager == null || !this._metricName) {
      this.fields = [];
      return;
    }
    const props = this._metricManager.collectionSchema.properties;
    this.fields = Object.keys(props)
      .filter(prop => !this._isAutoProp(prop))
      .map(prop => ({
        name: `${this._metricName}_${prop}`,
        label: prop,
        // A metric with no name cannot be created, so this is the one field
        // that has to be mapped
        essential: prop === 'name',
      }));
    this._cdr.markForCheck();
  }

  /**
   * Whether the property is generated by Dino and must not be mapped.
   * @param prop The metric property
   */
  private _isAutoProp(prop: string): boolean {
    if (AUTO_METRIC_PROPS.includes(prop)) {
      return true;
    }
    if (this._metricName === 'case' && prop === 'code') {
      return true;
    }
    return this._metricName === 'project' && prop === 'code_auto';
  }

  /**
   * Drops the `<metric>_` prefix from the mapped keys, so the rows carry the
   * metric properties and the shared helpers can work on them.
   * @param rows The mapped rows
   */
  private _stripPrefix(rows: {[key: string]: any}[]): {[key: string]: any}[] {
    const prefix = `${this._metricName}_`;
    return rows.map(row => {
      const stripped: {[key: string]: any} = {};
      Object.keys(row).forEach(key => {
        stripped[key.startsWith(prefix) ? key.slice(prefix.length) : key] = row[key];
      });
      return stripped;
    });
  }

  /**
   * Whether the row is the label header of a Dino export, whose values repeat
   * the column names instead of carrying data.
   * @param row The mapped row
   */
  private _isLabelHeader(row: {[key: string]: any}): boolean {
    const values = Object.values(row);
    return this._dinoFields.some(field => values.indexOf(`${this._metricName}_${field}`) > -1);
  }

  /**
   * The metric properties the user must provide: required by the schema, not
   * nullable and not generated by Dino.
   * @param collectionSchema The metric collection schema
   */
  private _getRequiredMetricProps(collectionSchema: RxJsonSchema<any>): string[] {
    const props: {[key: string]: any} = collectionSchema.properties;
    return Object.keys(props).filter(prop => {
      const propValue = props[prop];
      const required =
        (collectionSchema.required ?? []).indexOf(prop as any) >= 0 &&
        !(propValue.type?.length && propValue.type.indexOf('null') > 0);
      return required && !this._notMandatoryFields.includes(prop);
    });
  }

  /**
   * Turns the mapped rows into the metrics to be created, splitting the ones
   * whose parent has to be resolved and collecting the rows that cannot be
   * imported, each with its file row number.
   * @param rows The mapped rows, keyed by the metric properties
   */
  private _getMetricsToBeCreated(rows: {[key: string]: any}[]): MetricInfoInRows {
    const info: MetricInfoInRows = {
      newMetrics: [],
      newMetricsWithParent: [],
      invalidRows: [],
      requiredMetricParentIds: [],
      requiredMetricParentNames: [],
    };
    if (this._metricManager == null) {
      return info;
    }
    const schema = this._metricManager.collectionSchema;
    const props: {[key: string]: any} = schema.properties;
    const requiredProps = this._getRequiredMetricProps(schema);
    const propKeys = Object.keys(props).filter(prop => !this._isAutoProp(prop));
    const seenNames: string[] = [];
    const valid: Metric[] = [];

    rows.forEach((row, rowIdx) => {
      if (this._isLabelHeader(row)) {
        return;
      }
      this._fileRows++;
      // The row number as the user sees it: the header is the first row of the file
      const fileRow = rowIdx + 2;
      const name = row['name'] || null;
      if (!name) {
        info.invalidRows.push({row: fileRow, text: this._ts.translate('the name is missing')});
        return;
      }
      if (this._metricMustBeUnique && seenNames.includes(name)) {
        info.invalidRows.push({
          row: fileRow,
          text: `${name}: ${this._ts.translate('duplicated in the file')}`,
        });
        return;
      }
      seenNames.push(name);

      const metric: {[key: string]: any} = {};
      const invalidFields: string[] = [];
      propKeys.forEach(prop => {
        if (!requiredProps.includes(prop) && !row[prop]) {
          return;
        }
        if (prop === 'metric_data') {
          try {
            metric[prop] = JSON.parse(row[prop]);
          } catch (_e) {
            invalidFields.push(prop);
          }
          return;
        }
        metric[prop] = getValueFromRow(row[prop], prop, props[prop].type);
        if (requiredProps.includes(prop) && !metric[prop]) {
          invalidFields.push(prop);
        }
      });

      if (invalidFields.length) {
        info.invalidRows.push({
          row: fileRow,
          text: `${name}: ${this._ts.translate('missing required fields: {{fields}}', {
            fields: invalidFields.join(', '),
          })}`,
        });
        return;
      }
      valid.push(metric as Metric);
    });

    const {roots, withParent} = splitMetricsByParent(valid);
    const refs = collectParentRefs(valid);
    info.newMetrics = roots as Metric[];
    info.newMetricsWithParent = withParent as Metric[];
    info.requiredMetricParentIds = refs.parentIds;
    info.requiredMetricParentNames = refs.parentNames;
    return info;
  }

  /**
   * The metrics already stored matching the given ids or names.
   * @param metricIds The parent ids to be resolved
   * @param metricNames The names to be looked up
   */
  private _getMetricsIfExist(metricIds: string[], metricNames: string[]): Observable<Metric[]> {
    const selector = buildMetricLookupSelector(metricIds, metricNames);
    if (this._metricManager == null || selector == null) {
      return obsOf([]);
    }
    return this._metricManager.query(selector).pipe(
      take(1),
      catchError(_ => obsOf([])),
    );
  }

  /**
   * Moves the metrics whose name already exists out of the list to be created.
   * @param newMetrics The metrics to be created, filtered in place
   * @param reused The metrics found already stored, filled in place
   * @param existingMetrics The metrics returned by the lookup
   */
  private _moveOutExistingMetrics(
    newMetrics: Metric[],
    reused: Metric[],
    existingMetrics: Metric[],
  ): void {
    const existingNames = new Set(existingMetrics.map(m => m.name));
    for (let i = newMetrics.length - 1; i >= 0; i--) {
      if (existingNames.has(newMetrics[i].name)) {
        reused.push(newMetrics[i]);
        newMetrics.splice(i, 1);
      }
    }
  }

  /**
   * Creates the metrics with no parent, then the others one tree level at a time.
   * @param info The metrics found in the rows
   * @param existingMetrics The metrics usable as parent
   */
  private _importMetricRows(
    info: MetricInfoInRows,
    existingMetrics: Metric[],
  ): Observable<MetricTreeResult<Metric>> {
    const manager = this._metricManager as DataModelManager<any>;
    const rootBulk = info.newMetrics.length
      ? manager.bulkCreate(info.newMetrics as any).pipe(
          take(1),
          catchError(err => {
            this._ehms.captureErrorMessage(
              `Could not import new metrics: ${JSON.stringify(err)}`,
              'error',
            );
            return obsOf({success: [] as RxDocument<Metric>[], error: [{msg: err}]});
          }),
        )
      : obsOf({success: [] as RxDocument<Metric>[], error: [] as any[]});

    return rootBulk.pipe(
      switchMap(rootRes => {
        if (rootRes.error.length) {
          // The children are not attempted when their level failed
          return obsOf({
            success: rootRes.success,
            error: rootRes.error,
            deferred: info.newMetricsWithParent,
          });
        }
        const pool = [...rootRes.success, ...existingMetrics];
        return importMetricTree(manager, info.newMetricsWithParent, pool, {
          onError: err =>
            this._ehms.captureErrorMessage(
              `Could not import new metrics: ${JSON.stringify(err)}`,
              'error',
            ),
        }).pipe(
          switchMap(treeRes =>
            obsOf({
              success: [...rootRes.success, ...treeRes.success],
              error: treeRes.error,
              deferred: treeRes.deferred,
            }),
          ),
        );
      }),
    );
  }

  /**
   * Runs the whole import: checks the permission, resolves the parents and the
   * names already stored, creates the metrics and reports the outcome.
   * @param rows The mapped rows, keyed by the metric properties
   */
  private _importRows(rows: {[key: string]: any}[]): void {
    this._fileRows = 0;
    const info = this._getMetricsToBeCreated(rows);
    const reused: Metric[] = [];
    const namesToQuery = [...info.requiredMetricParentNames];
    if (this._metricMustBeUnique) {
      namesToQuery.push(
        ...info.newMetrics.map(m => m.name),
        ...info.newMetricsWithParent.map(m => m.name),
      );
    }

    this._importSub = combineLatest([
      this._getMetricsIfExist(info.requiredMetricParentIds, namesToQuery),
      this._ugm.isActiveUserAdmin(this._adminRoles),
    ])
      .pipe(
        switchMap(([existingMetrics, isAdminUser]) => {
          if (!isAdminUser) {
            this._setOutcome(
              this._ts.translate(
                'File not imported: only users with the admin role can import metrics.',
              ),
              'error',
            );
            return obsOf(null);
          }
          if (this._metricMustBeUnique && existingMetrics.length) {
            this._moveOutExistingMetrics(info.newMetrics, reused, existingMetrics);
            this._moveOutExistingMetrics(info.newMetricsWithParent, reused, existingMetrics);
          }
          if (!info.newMetrics.length && !info.newMetricsWithParent.length) {
            this._reportOutcome(info, reused, {success: [], error: [], deferred: []});
            return obsOf(null);
          }
          return this._importMetricRows(info, existingMetrics);
        }),
      )
      .subscribe(res => {
        if (res != null) {
          this._reportOutcome(info, reused, res);
        }
      });
  }

  /**
   * Turns the import result into the outcome shown by the wizard.
   * @param info The metrics found in the rows
   * @param reused The metrics not created because their name already exists
   * @param res The created metrics, the db errors and the unresolved parents
   */
  private _reportOutcome(
    info: MetricInfoInRows,
    reused: Metric[],
    res: MetricTreeResult<Metric>,
  ): void {
    const created = res.success.length;
    const warnings: ImportWarning[] = [];
    if (info.invalidRows.length) {
      warnings.push(
        this._warningGroup(this._ts.translate('Rows not imported'), info.invalidRows, 'rows'),
      );
    }
    if (res.deferred.length) {
      warnings.push(
        this._warningGroup(
          this._ts.translate('Metrics with invalid parent'),
          res.deferred.map(metric => ({text: `${metric['name']}`})),
          'values',
        ),
      );
    }
    if (reused.length) {
      warnings.push(
        this._warningGroup(
          this._ts.translate('Already existing metrics'),
          reused.map(metric => ({text: metric.name})),
          'values',
        ),
      );
    }

    if (res.error.length) {
      const detailed = res.error[0].msg?.parameters?.errors;
      this._setOutcome(
        `${this._ts.translate('File not imported! Error during create new metrics')}${
          detailed && detailed.length ? `: ${JSON.stringify(detailed[0])}` : ''
        }`,
        'error',
        warnings,
        created,
      );
      return;
    }

    if (!created) {
      // Nothing was written: the groups say whether the rows were invalid,
      // already stored, or waiting for a parent that never came
      const explained = info.invalidRows.length || reused.length || res.deferred.length;
      this._setOutcome(
        this._ts.translate(
          explained
            ? 'File not imported!'
            : 'File not imported: no valid metrics to import found in the file.',
        ),
        'error',
        warnings,
        0,
      );
      return;
    }

    // A reused metric produced no row, so it counts as not imported: saying
    // otherwise would contradict the rejected counter
    const partial = created < this._fileRows;
    this._setOutcome(
      `${this._ts.translate(partial ? 'File partially imported' : 'File imported successfully')}: ${
        partial ? `${created}/${this._fileRows}` : created
      } ${this._ts.translate('metrics created')}!`,
      partial ? 'partial' : 'success',
      warnings,
      created,
    );
  }

  /**
   * Builds a capped result group.
   * @param label The localized group label
   * @param items The entries of the group
   * @param kind How the group is rendered
   */
  private _warningGroup(
    label: string,
    items: ImportIssue[],
    kind: 'rows' | 'values',
  ): ImportWarning {
    return warningGroup(label, items, kind);
  }

  /**
   * Publishes the outcome, which moves the wizard to its result step.
   * @param message The headline message
   * @param status How the import ended
   * @param warnings What could not be imported
   * @param created How many metrics were created
   */
  private _setOutcome(
    message: string,
    status: ImportOutcomeStatus,
    warnings: ImportWarning[] = [],
    created: number = 0,
  ): void {
    this.importing = false;
    const rejected = Math.max(this._fileRows - created, 0);
    this.outcome = {
      status,
      message,
      counts: [
        {
          label: this._ts.translate('Metrics created'),
          value: created,
          tone: created > 0 ? 'ok' : undefined,
        },
        {
          label: this._ts.translate('Rows rejected'),
          value: rejected,
          tone: rejected > 0 ? (status === 'error' ? 'ko' : 'warn') : undefined,
        },
        {label: this._ts.translate('Rows in file'), value: this._fileRows},
      ],
      warnings,
    };
    this._cdr.markForCheck();
  }
}
