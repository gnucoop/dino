import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {
  FormSchema,
  FormSchemaDeps,
  FormSchemaDepsManager,
  FormSchemaDepsOrigin,
  FormSchemaManager,
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
import {MetricsService} from '@dino/core/data';
import {isRxDocument, RxDocument} from 'rxdb';
import {MatTableDataSource} from '@angular/material/table';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {AjfContainerNode, AjfField, AjfNode, isContainerNode} from '@ajf/core/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {deepCopy} from '@ajf/core/utils';

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
   * The edited Form Schema Deps current metrics
   */
  currentMetrics: string[] | null;

  /**
   * All fields list for each form schema
   */
  readonly schemaFields$: {[key: string]: string[]} = {};

  /**
   * Emits the Save status event
   */
  private _saveEvt: EventEmitter<string[]> = new EventEmitter<string[]>();

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
    'form_schema_ref_id',
    'fields_to_update',
    'filter_by_metric',
    'delete',
  ];

  readonly dataSource: MatTableDataSource<FormSchemaDepsOrigin> =
    new MatTableDataSource<FormSchemaDepsOrigin>();

  constructor(
    public dialogRef: MatDialogRef<FormDepsEditorData>,
    @Inject(MAT_DIALOG_DATA) public data: FormDepsEditorData,
    private _fs: FormSchemaManager,
    private _fsd: FormSchemaDepsManager,
    private _cdr: ChangeDetectorRef,
    readonly metricsService: MetricsService,
    readonly snackbar: MatSnackBar,
  ) {
    this.formSchema = data.formSchema;
    this.currentMetrics = [];

    this.activeMetrics = this.metricsService.activeMetrics.value.map(metric => metric.metricName);

    this.availableSchemas = this._fs.list().pipe(
      withLatestFrom(this.formSchema),
      switchMap(([avSchemas, schema]) => {
        if (schema !== null) {
          return obsOf(avSchemas.filter(s => s.id !== schema.id));
        }
        return obsOf(avSchemas);
      }),
      map(schemas => {
        if (schemas) {
          schemas.forEach(fschema => {
            const nodes = fschema.schema.nodes;
            let orderedFields: string[] = [];
            if (nodes) {
              const flatNodes = this._flattenNodes(nodes);
              const fields = <AjfField[]>flatNodes.filter(n => !isContainerNode(n));
              orderedFields = fields
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
      if (fschemadeps && fschemadeps.deps_origin) {
        this.dataSource.data = deepCopy(fschemadeps).deps_origin as FormSchemaDepsOrigin[];
        this.currentMetrics = fschemadeps.metric_data_to_show
          ? fschemadeps.metric_data_to_show
          : [];
      } else {
        this.dataSource.data = [];
      }
    });
  }

  ngOnInit(): void {
    this._saveSub = this._saveEvt
      .pipe(
        withLatestFrom(this.formSchema, this._formSchemaDeps),
        switchMap(([selMetrics, fschema, fschemadeps]) => {
          if (fschema && fschemadeps) {
            const fsdeps = deepCopy(fschemadeps) as FormSchemaDeps;
            fsdeps.deps_origin = this.dataSource.data;
            fsdeps.metric_data_to_show = selMetrics;
            return combineLatest([this._fsd.update(fsdeps), obsOf('edit'), obsOf(fschema)]);
          } else {
            const fsdeps = {
              deps_origin: this.dataSource.data,
              metric_data_to_show: selMetrics,
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

  addRow(): void {
    this.dataSource.data = [
      ...this.dataSource.data,
      {form_schema_ref_id: '', fields_to_update: [], filter_by_metric: []},
    ];
  }

  deleteRow(rowIdx: number): void {
    this.dataSource.data = [
      ...this.dataSource.data.slice(0, rowIdx),
      ...this.dataSource.data.slice(rowIdx + 1),
    ];
  }

  addValue(row: FormSchemaDepsOrigin, evt: MatChipInputEvent, valueInput: HTMLInputElement): void {
    if (evt.value.length === 0) {
      return;
    }
    row.fields_to_update = [...row.fields_to_update, evt.value];
    valueInput.value = '';
    this._cdr.markForCheck();
  }

  removeValue(row: FormSchemaDepsOrigin, value: string): void {
    const idx = row.fields_to_update.indexOf(value);
    if (idx > -1) {
      row.fields_to_update = [
        ...row.fields_to_update.slice(0, idx),
        ...row.fields_to_update.slice(idx + 1),
      ];
      this._cdr.markForCheck();
    }
  }

  selected(row: FormSchemaDepsOrigin, evt: MatAutocompleteSelectedEvent): void {
    row.fields_to_update = [...row.fields_to_update, evt.option.value];
    this._cdr.markForCheck();
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
   * Emits the save event
   */
  saveDeps(metrics: string[]) {
    this._saveEvt.emit(metrics);
  }

  ngOnDestroy(): void {
    this._depsSub.unsubscribe();
    this._saveSub.unsubscribe();
    this._saveEvt.complete();
  }
}
