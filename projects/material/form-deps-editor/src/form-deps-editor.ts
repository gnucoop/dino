import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Optional,
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
  throwError,
  withLatestFrom,
} from 'rxjs';
import {DataModelManager, Metric, MetricsService} from '@dino/core/data';
import {isRxDocument, RxDocument} from 'rxdb';
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
 * Metrics selection for data and for choices
 */
export interface SelectedMetrics {
  metrics_for_data: string[];
}

/**
 * Dialog component that allows the editing of a Form Status.
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
   * The Form schema object
   */
  readonly formSchema: Observable<FormSchema | null>;

  /**
   * The Form schema deps object
   */
  private _formSchemaDeps: Observable<FormSchemaDeps | null>;

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
   * Emits the Save status event
   */
  private _saveEvt: EventEmitter<SelectedMetrics> = new EventEmitter<SelectedMetrics>();

  /**
   * Subscribes to the save status event.
   */
  private _saveSub: Subscription = Subscription.EMPTY;

  /**
   * Subscribes to the form schema
   */
  private _depsSub: Subscription = Subscription.EMPTY;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  readonly displayedColumns = [
    'delete',
    'form_schema_ref_id',
    'fields_to_update',
    'filter_by_metric',
    'is_choice',
    'choice_label_fields',
    'choice_extra_value_key',
  ];

  readonly displayedMetricsColumns = [
    'delete',
    'metric_name',
    'choice_extra_value_key',
    'filter_by',
    'query_selector_str',
  ];

  readonly dataSource: MatTableDataSource<DepsOrigin> = new MatTableDataSource<DepsOrigin>();

  readonly metricDataSource: MatTableDataSource<MetricOrigin> =
    new MatTableDataSource<MetricOrigin>();

  /**
   * A Dictionary of all the optional Metrics managers
   */
  private _metricManagers: {[metricType: string]: DataModelManager<Metric> | null};

  constructor(
    public dialogRef: MatDialogRef<FormDepsEditorData>,
    @Inject(MAT_DIALOG_DATA) public data: FormDepsEditorData,
    private _fs: FormSchemaManager,
    private _fsd: FormSchemaDepsManager,
    private _cdr: ChangeDetectorRef,
    readonly metricsService: MetricsService,
    readonly snackbar: MatSnackBar,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _caseManager: CaseManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
  ) {
    this.formSchema = data.formSchema;
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

    this._formSchemaDeps = data.formSchema.pipe(
      map(fschema => {
        if (fschema.form_schema_deps_ref_id) {
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
          }

          this.metricDataSource.data = [...metricDataSourceRows];
        }
        this.currentMetricsForData = this.getRequiredMetrics(
          this.dataSource.data,
          fschemadeps.metric_data_to_show,
        );
      }
    });
  }

  ngOnInit(): void {
    this._saveSub = this._saveEvt
      .pipe(
        withLatestFrom(this.formSchema, this._formSchemaDeps),
        switchMap(([selMetrics, fschema, fschemadeps]) => {
          const allRequiredMetricsData = this.getRequiredMetrics(
            this.dataSource.data,
            selMetrics.metrics_for_data,
          );

          const depsOrigin = this.dataSource.data.filter(
            metricDep =>
              metricDep.form_schema_ref_id != null &&
              metricDep.form_schema_ref_id.length &&
              metricDep.fields_to_update &&
              metricDep.fields_to_update.length,
          );

          const metricChoicesOrigin = this.metricDataSource.data
            .filter(metricDep => metricDep.metric_name != null && metricDep.metric_name.length)
            .map(metricDep => {
              if (metricDep.filter_by && metricDep.filter_by.length) {
                this.getQueryForMetric(metricDep);
                if (
                  metricDep.query_selector &&
                  Object.keys(metricDep.query_selector).includes('error')
                ) {
                  metricDep.query_selector = undefined;
                }
              } else {
                metricDep.query_selector = undefined;
              }
              return metricDep as MetricOrigin;
            });

          if (fschema && fschemadeps) {
            const fsdeps = deepCopy(fschemadeps) as FormSchemaDeps;
            fsdeps.metric_data_to_show = allRequiredMetricsData;
            fsdeps.deps_origin = depsOrigin;
            fsdeps.deps_origin.push(...metricChoicesOrigin);
            return combineLatest([this._fsd.update(fsdeps), obsOf('edit'), obsOf(fschema)]);
          } else {
            const fsdeps = {
              deps_origin: [...depsOrigin, ...metricChoicesOrigin],
              metric_data_to_show: allRequiredMetricsData,
            } as FormSchemaDeps;
            return combineLatest([this._fsd.create(fsdeps), obsOf('create'), obsOf(fschema)]);
          }
        }),
        switchMap(res => {
          let fschemaUpdate: Observable<RxDocument<FormSchema, {}> | null> = obsOf(null);
          if (res[0] != null && res[1] === 'create') {
            if (res[2] != null) {
              const fschema = deepCopy(res[2]) as FormSchema;
              fschema.form_schema_deps_ref_id = res[0].toJSON().id;
              fschemaUpdate = this._fs.update(fschema);
            }
          }
          return combineLatest([obsOf(res[0]), obsOf(res[1]), fschemaUpdate]);
        }),
      )
      .subscribe(res => {
        const fschemadeps = res[0];
        const action = res[1];
        const fschema = res[2];
        if (fschemadeps == null || (action === 'create' && fschema == null)) {
          this.snackbar.open(
            `Oops! Something went wrong while saving relationships.`,
            'SAVE ERROR',
            {
              duration: 10000,
            },
          );
        } else {
          this.snackbar.open('Relationships created', 'SAVE', {duration: 10000});
          if (fschema != null && isRxDocument(fschema)) {
            const resObj = fschema.toJSON();
            this.updateAndCloseDialog(resObj);
          } else {
            this.closeDialog();
          }
        }
      });
  }

  /**
   * Parse javascript formula to graphql query
   * @param row
   */
  getQueryForMetric(row: MetricOrigin) {
    if (row.filter_by && row.filter_by.length) {
      if (!row.metric_name) {
        row.query_selector = {error: 'Select a metric'};
      }
      const metricManager = this._metricManagers[row.metric_name];
      if (metricManager !== null) {
        const props = metricManager.collectionSchema.properties;
        row.query_selector = jsConditionToQuery(row.filter_by, props);
      }
    } else {
      row.query_selector = undefined;
    }
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

  /**
   * Save and closes the dialog
   */
  updateAndCloseDialog(fschema: {[key: string]: any} | null) {
    this.dialogRef.close(fschema);
  }

  /**
   * Closes the dialog
   */
  closeDialog() {
    this.dialogRef.close(null);
  }

  /**
   * Emits the save event with metrics selection for
   * data and for choices
   */
  saveDeps(metricsForData: string[]) {
    const metricsSel = {
      metrics_for_data: metricsForData,
    } as SelectedMetrics;
    this._saveEvt.emit(metricsSel);
  }

  ngOnDestroy(): void {
    this._depsSub.unsubscribe();
    this._saveSub.unsubscribe();
    this._saveEvt.complete();
  }
}
