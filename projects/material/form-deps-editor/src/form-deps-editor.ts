import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  DepsOrigin,
  FormSchema,
  FormSchemaDeps,
  FormSchemaDepsManager,
  FormSchemaManager,
  MetricOrigin,
} from '@dino/core/forms';
import {
  catchError,
  combineLatest,
  map,
  Observable,
  of as obsOf,
  shareReplay,
  Subscription,
  switchMap,
  take,
  throwError,
} from 'rxjs';
import {DataModelManager, Metric, MetricsService} from '@dino/core/data';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {RxDocument} from 'rxdb';
import {MatTableDataSource} from '@angular/material/table';
import {AjfContainerNode, AjfField, AjfNode, isContainerNode} from '@ajf/core/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {deepCopy} from '@ajf/core/utils';
import {MatSelectChange} from '@angular/material/select';
import {jsConditionToQuery} from './query-parser';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {ProjectManager} from '@dino/core/projects';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';

/**
 * Represents data to be passed to the Form Status editor
 */
export interface FormDepsEditorData {
  /**
   * The Observable Form Schema whose relationships will be edited
   */
  formSchema: Observable<FormSchema>;
}

/**
 * What a save has to do with the FormSchemaDeps document.
 * `create` is the only kind the schema write depends on: the schema needs the id
 * of the document being created. An `update` targets a document the schema
 * already points at, so the two writes are independent and the schema can go
 * first.
 */
export type RelationshipsWrite = 'none' | 'create' | 'update';

/**
 * The relationships state to be persisted into a FormSchemaDeps document,
 * collected from the editor's tables.
 */
interface RelationshipsPayload {
  /** The relationship rows worth persisting (a form and at least one field). */
  depsOrigin: DepsOrigin[];
  /** The metric-choices rows worth persisting (a metric name). */
  metricRows: MetricOrigin[];
  /** The metrics whose data the schema needs. */
  metricDataToShow: string[];
}

/**
 * Component that allows the editing of a Form Schema's relationships.
 */
@Component({
  selector: 'dino-form-deps-editor',
  templateUrl: 'form-deps-editor.html',
  styleUrls: ['form-deps-editor.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class FormDepsEditor implements OnInit, OnDestroy {
  /**
   * The Form schema object whose relationships are edited.
   * Provided either via this @Input (when embedded inline, e.g. as a tab) or via
   * the MAT_DIALOG_DATA when opened as a dialog.
   */
  @Input() formSchema!: Observable<FormSchema | null>;

  /**
   * The editor's two halves, exposed as templates so a host can render them in
   * different places (the form editor puts the metric sections in its Metrics tab
   * and the relationships section in its Relationships tab).
   *
   * They are templates rather than two components on purpose: the sections share
   * mutable state — `changeMetrics()` writes `currentMetricsForData` from the
   * relationships table, and `getRequiredMetrics()` unions both — and
   * `persistRelationships()` saves them into a single FormSchemaDeps document. Two
   * instances would each persist half the document and delete the other half.
   *
   * `static: true` is required: the host reads them during its first update pass.
   * That in turn is why the templates sit at the top level of the markup, with no
   * enclosing *ngIf.
   */
  @ViewChild('metricsSections', {static: true}) metricsSections!: TemplateRef<unknown>;
  @ViewChild('relationsSection', {static: true}) relationsSection!: TemplateRef<unknown>;

  /**
   * The Form schema deps object
   */
  private _formSchemaDeps!: Observable<FormSchemaDeps | null>;

  /**
   * The list of all the Form Schemas available
   */
  readonly availableSchemas: Observable<RxDocument<FormSchema, {}>[]>;

  /**
   * The list of all active metrics
   */
  readonly activeMetrics: string[];

  /**
   * The edited Form Schema Deps current required metrics for data
   */
  currentMetricsForData: string[] | null;

  /**
   * The edited Form Schema Deps current required metrics for choices
   */
  currentMetricsForChoices: string[] | null;

  /**
   * All fields list for each form schema
   */
  readonly schemaFields$: {[key: string]: string[]} = {};

  /**
   * Subscribes to the form schema
   */
  private _depsSub: Subscription = Subscription.EMPTY;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  readonly displayedColumns = [
    'form_schema_ref_id',
    'fields_to_update',
    'filter_by_metric',
    'is_choice',
    'choice_label_fields',
    'choice_extra_value_key',
    'delete',
  ];

  readonly displayedMetricsColumns = [
    'metric_name',
    'choice_extra_value_key',
    'filter_by',
    'delete',
  ];

  readonly dataSource: MatTableDataSource<DepsOrigin> = new MatTableDataSource<DepsOrigin>();

  readonly metricDataSource: MatTableDataSource<MetricOrigin> =
    new MatTableDataSource<MetricOrigin>();

  /**
   * A Dictionary of all the optional Metrics managers
   */
  private _metricManagers: {[metricType: string]: DataModelManager<Metric> | null};

  /**
   * Signature of the relationships payload as the tables held it right after the
   * FormSchemaDeps document was loaded (or written). Compared against the current
   * payload to skip a save that would store the very same content — see
   * {@link persistRelationships}.
   */
  private _pristineSignature: string | null = null;

  /**
   * True when the loaded document still stores the deprecated
   * `metrics_choices_origin` and the tables hold the converted format. The
   * conversion only exists in memory, so the next save has to write it even if
   * the user changed nothing.
   */
  private _legacyConverted = false;

  constructor(
    @Optional() public dialogRef: MatDialogRef<FormDepsEditorData> | null,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: FormDepsEditorData | null,
    private _fs: FormSchemaManager,
    private _fsd: FormSchemaDepsManager,
    private _ehms: ErrorHandlerMessageService,
    private _cdr: ChangeDetectorRef,
    readonly metricsService: MetricsService,
    readonly snackbar: MatSnackBar,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _caseManager: CaseManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
  ) {
    this.currentMetricsForData = [];
    this.currentMetricsForChoices = [];

    this.dataSource.data = [];
    this.metricDataSource.data = [];

    this.activeMetrics = this.metricsService.activeMetrics.value.map(metric => metric.metricName);

    this._metricManagers = {
      area: this._areaManager,
      case: this._caseManager,
      location: this._locationManager,
      organization: this._organizationManager,
      project: this._projectManager,
    } as {[metricType: string]: DataModelManager<Metric> | null};

    this.availableSchemas = this._fs.list().pipe(
      map(schemas => {
        if (schemas) {
          schemas.forEach(fschema => {
            const nodes = fschema.schema.nodes;
            let orderedFields: string[] = [];
            if (nodes) {
              const flatNodes = this._flattenNodes(nodes);
              const fields = <AjfField[]>flatNodes.filter(n => !isContainerNode(n));
              orderedFields = fields
                .filter(f => f.name != null)
                .sort((f1, f2) => f1.name.localeCompare(f2.name))
                .map(f => f.name)
                .filter(f => f.length > 0);
            }
            this.schemaFields$[fschema.id] = orderedFields;
          });
        }
        return schemas;
      }),
      catchError(err => throwError(() => err) as Observable<RxDocument<FormSchema, {}>[]>),
    );
  }

  ngOnInit(): void {
    // The source schema comes from the @Input (inline) or the dialog data.
    // Assigning here (not in the constructor) is required because @Input values
    // are only available after construction.
    this.formSchema = this.formSchema ?? (this.data ? this.data.formSchema : obsOf(null));

    this._formSchemaDeps = this.formSchema.pipe(
      map(fschema => {
        if (fschema && fschema.form_schema_deps_ref_id) {
          return this._fsd.get(fschema.form_schema_deps_ref_id).pipe(
            map(doc => {
              if (doc == null) {
                return null;
              }
              return doc.toJSON();
            }),
          );
        } else {
          return obsOf(null);
        }
      }),
      switchMap(schemadeps => schemadeps as Observable<FormSchemaDeps>),
      shareReplay(1),
    );

    this._depsSub = this._formSchemaDeps.subscribe(fschemadeps => {
      if (fschemadeps) {
        this._legacyConverted = false;
        if (fschemadeps.deps_origin) {
          this.dataSource.data = (deepCopy(fschemadeps).deps_origin as DepsOrigin[]).filter(
            deps => deps.form_schema_ref_id != null,
          );
          this.dataSource.data.forEach(dt => {
            if (dt.choices_origin == null) {
              dt.choices_origin = {label_fields: [], extra_value_key: null};
            }
          });

          const metricDataSourceRows = (deepCopy(fschemadeps).deps_origin as MetricOrigin[]).filter(
            deps => deps.metric_name != null,
          );

          if (!metricDataSourceRows.length) {
            // Check if there are old and deprecated metric choices relationships
            // and convert in new format
            const metricsChoicesOrigin = (deepCopy(fschemadeps).deps_origin as DepsOrigin[]).find(
              deps => deps.metrics_choices_origin != null && deps.metrics_choices_origin.length,
            );
            this.currentMetricsForChoices =
              metricsChoicesOrigin && metricsChoicesOrigin.metrics_choices_origin
                ? metricsChoicesOrigin.metrics_choices_origin
                : [];

            const metricDataSourceData: MetricOrigin[] = [];
            this.currentMetricsForChoices.forEach(m => {
              metricDataSourceData.push({
                metric_name: m,
                choices_origin: {
                  value_key: 'name',
                },
              });
            });
            metricDataSourceRows.push(...metricDataSourceData);
            // The converted rows exist in memory only: the document still holds the
            // deprecated field, so the next save must write the new format even if
            // the dirty check below finds the tables untouched.
            this._legacyConverted = metricDataSourceData.length > 0;
          }

          this.metricDataSource.data = [...metricDataSourceRows];
        }
        this.currentMetricsForData = this.getRequiredMetrics(
          this.dataSource.data,
          fschemadeps.metric_data_to_show,
        );
        // Baseline for the dirty check in persistRelationships(): what the tables
        // hold once the document has been loaded and normalised.
        this._pristineSignature = this._signature(this._collectPayload());
        this._cdr.markForCheck();
      }
    });
  }

  /**
   * Collects the relationships payload from the current table state: the
   * relationship rows worth persisting, the metric-choices rows, and the metrics
   * whose data the schema needs.
   *
   * Leaves the tables alone. In particular it does not compute the metric rows'
   * `query_selector`, because doing so mutates the rows (see
   * {@link getQueryForMetric}); {@link _withQuerySelectors} does that on the write
   * path only, so the dirty check can run without side effects.
   */
  private _collectPayload(): RelationshipsPayload {
    return {
      depsOrigin: this.dataSource.data.filter(
        metricDep =>
          metricDep.form_schema_ref_id != null &&
          metricDep.form_schema_ref_id.length &&
          metricDep.fields_to_update &&
          metricDep.fields_to_update.length,
      ),
      metricRows: this.metricDataSource.data.filter(
        metricDep => metricDep.metric_name != null && metricDep.metric_name.length,
      ),
      metricDataToShow: this.getRequiredMetrics(
        this.dataSource.data,
        this.currentMetricsForData ?? [],
      ),
    };
  }

  /**
   * A structural signature of a payload, used to tell whether the tables still
   * hold exactly what the document was loaded with.
   *
   * `query_selector` is left out on purpose: it is derived from `filter_by`, which
   * is part of the row, so an edit is always visible through it without having to
   * recompute the selector.
   */
  private _signature(payload: RelationshipsPayload): string {
    return JSON.stringify({
      depsOrigin: payload.depsOrigin,
      metricRows: payload.metricRows.map(({query_selector: _derived, ...row}) => row),
      metricDataToShow: payload.metricDataToShow,
    });
  }

  /**
   * The metric-choices rows with `query_selector` recomputed from `filter_by`,
   * ready to be stored. Selectors that failed to parse are dropped rather than
   * persisted as an error object. Mutates the rows, as the template does.
   */
  private _withQuerySelectors(payload: RelationshipsPayload): MetricOrigin[] {
    return payload.metricRows.map(metricDep => {
      if (metricDep.filter_by && metricDep.filter_by.length) {
        this.getQueryForMetric(metricDep);
        if (metricDep.query_selector && Object.keys(metricDep.query_selector).includes('error')) {
          metricDep.query_selector = undefined;
        }
      } else {
        metricDep.query_selector = undefined;
      }
      return metricDep;
    });
  }

  /**
   * Records what was just written as the new baseline, so a second save right
   * after does not store it again.
   */
  private _markPersisted(payload: RelationshipsPayload, id: string): string {
    this._legacyConverted = false;
    this._pristineSignature = this._signature(payload);
    return id;
  }

  /**
   * What persisting the current table state would require of the FormSchemaDeps
   * document. Pure: it decides, it does not write.
   *
   * `create` is the only outcome the schema write depends on, because only then
   * does the schema need a ref id it does not already hold.
   */
  private _writeKind(
    fschemadeps: FormSchemaDeps | null,
    payload: RelationshipsPayload,
  ): RelationshipsWrite {
    if (fschemadeps) {
      // Nothing changed since the document was loaded, so there is nothing to
      // store: writing would only bump `updated_at` and push a pointless revision
      // to sync. This editor is created along with the rest of the form editor's
      // template, so we get here even when the user never opens the Metrics or
      // Relationships tab.
      const unchanged =
        !this._legacyConverted && this._signature(payload) === this._pristineSignature;
      return unchanged ? 'none' : 'update';
    }
    const empty =
      payload.depsOrigin.length === 0 &&
      payload.metricRows.length === 0 &&
      payload.metricDataToShow.length === 0;
    return empty ? 'none' : 'create';
  }

  /**
   * Tells the host what a save would have to do with the relationships, so it can
   * order the two writes: only `create` has to precede the schema write.
   */
  pendingWrite(): Observable<RelationshipsWrite> {
    return combineLatest([this.formSchema, this._formSchemaDeps]).pipe(
      take(1),
      map(([_fschema, fschemadeps]) => this._writeKind(fschemadeps, this._collectPayload())),
      catchError(() => obsOf('none' as RelationshipsWrite)),
    );
  }

  /**
   * Removes a FormSchemaDeps document created by a save whose schema write then
   * failed. Without this the document would linger unreferenced — and a retry
   * would create another one, since the schema still has no ref id to load from.
   */
  discardCreated(id: string): Observable<unknown> {
    return this._fsd.delete(id).pipe(
      take(1),
      catchError(err => {
        this._ehms.captureErrorMessage(
          `Could not discard the orphaned form schema deps ${id}: ${JSON.stringify(err)}`,
          'error',
        );
        return obsOf(null);
      }),
    );
  }

  /**
   * Persists the relationships (the FormSchemaDeps document) from the current
   * table state and selected metrics, and returns the deps document id.
   * - Returns the existing id when updating, the new id when creating.
   * - Returns `undefined` when no write was needed: either there is nothing to
   *   persist and no deps document exists yet, or the tables still hold exactly
   *   what was loaded. Both leave the schema's ref id untouched — when a document
   *   exists the schema already points at it.
   * - Returns `null` on failure.
   * It intentionally does NOT write the FormSchema itself: the caller (the form
   * editor's Save) performs the single schema write, folding in the returned id.
   */
  persistRelationships(): Observable<string | null | undefined> {
    return combineLatest([this.formSchema, this._formSchemaDeps]).pipe(
      take(1),
      switchMap(([_fschema, fschemadeps]) => {
        const payload = this._collectPayload();
        const kind = this._writeKind(fschemadeps, payload);

        if (kind === 'none') {
          return obsOf(undefined);
        }

        if (fschemadeps) {
          const fsdeps = deepCopy(fschemadeps) as FormSchemaDeps;
          fsdeps.metric_data_to_show = payload.metricDataToShow;
          fsdeps.deps_origin = [...payload.depsOrigin, ...this._withQuerySelectors(payload)];
          return this._fsd
            .update(fsdeps)
            .pipe(
              map(res =>
                res != null ? this._markPersisted(payload, (fschemadeps as any).id) : null,
              ),
            );
        }

        const fsdeps = {
          deps_origin: [...payload.depsOrigin, ...this._withQuerySelectors(payload)],
          metric_data_to_show: payload.metricDataToShow,
        } as FormSchemaDeps;
        return this._fsd
          .create(fsdeps)
          .pipe(map(res => (res != null ? this._markPersisted(payload, res.toJSON().id) : null)));
      }),
      catchError(err => {
        // Reported here as well as returned: the host turns the null into a message
        // for the user, but without this the failure would never reach monitoring.
        this._ehms.captureErrorMessage(
          `Could not save form schema deps: ${JSON.stringify(err)}`,
          'error',
        );
        return obsOf(null);
      }),
    );
  }

  /**
   * Parse javascript formula to graphql query
   * @param row
   */
  getQueryForMetric(row: MetricOrigin) {
    if (row.filter_by && row.filter_by.length) {
      if (!row.metric_name) {
        row.query_selector = {error: 'Select a metric'};
        return;
      }
      const metricManager = this._metricManagers[row.metric_name];
      if (metricManager != null) {
        const props = metricManager.collectionSchema.properties;
        row.query_selector = jsConditionToQuery(row.filter_by, props);
      }
    } else {
      row.query_selector = undefined;
    }

    // row.hasError = row.query_selector && Object.keys(row.query_selector).includes('error');
  }

  addRow(): void {
    this.dataSource.data = [
      ...this.dataSource.data,
      {
        form_schema_ref_id: '',
        fields_to_update: [],
        filter_by_metric: [],
        is_choice: false,
        choices_origin: {label_fields: [], value_key: '', extra_value_key: null},
      },
    ];
  }

  addMetricRow(): void {
    this.metricDataSource.data = [
      ...this.metricDataSource.data,
      {
        metric_name: '',
        choices_origin: {extra_value_key: null},
      },
    ];
  }

  deleteRow(rowIdx: number): void {
    this.dataSource.data = [
      ...this.dataSource.data.slice(0, rowIdx),
      ...this.dataSource.data.slice(rowIdx + 1),
    ];
  }

  deleteMetricRow(rowIdx: number): void {
    this.metricDataSource.data = [
      ...this.metricDataSource.data.slice(0, rowIdx),
      ...this.metricDataSource.data.slice(rowIdx + 1),
    ];
  }

  /**
   * Update current required metrics for data when insert a new relationship row
   * @param evt
   */
  changeMetrics(evt: MatSelectChange) {
    if (this.currentMetricsForData) {
      this.currentMetricsForData = [...new Set(this.currentMetricsForData.concat(evt.value))];
    }
  }

  /**
   * Set is_choice to false for a row if number of selected fields > 1
   * @param evt
   * @param rowIdx
   */
  checkChoiceOption(evt: MatSelectChange, rowIdx: number) {
    if (evt.value.length > 1) {
      this.dataSource.data[rowIdx].is_choice = false;
    }
  }

  /**
   * Return metrics required by user ad metric data or required by other
   * relationship with other form schemas
   * @param depsOrigin
   * @param selMetrics
   * @returns
   */
  private getRequiredMetrics(
    depsOrigin: DepsOrigin[] | undefined,
    selMetrics: string[] | undefined,
  ): string[] {
    let requiredMetrics: string[] = [];

    if (depsOrigin) {
      depsOrigin.forEach(d => (requiredMetrics = requiredMetrics.concat(d.filter_by_metric ?? [])));
      requiredMetrics = [...new Set(requiredMetrics)];
    }
    return selMetrics ? [...new Set(requiredMetrics.concat(selMetrics))] : requiredMetrics;
  }

  private _flattenNodes(nodes: AjfNode[]): AjfNode[] {
    let flatNodes: AjfNode[] = [];

    nodes.forEach((node: AjfNode) => {
      if (isContainerNode(node)) {
        flatNodes = flatNodes.concat(this._flattenNodes((<AjfContainerNode>node).nodes));
      }
      flatNodes.push(node);
    });

    return flatNodes;
  }

  ngOnDestroy(): void {
    this._depsSub.unsubscribe();
  }
}
