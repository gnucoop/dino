import {AjfForm, createFormPdf} from '@ajf/core/forms';
import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {MetricsService, PermissionContextService} from '@dino/core/data';
import {FormData, FormDataManager, FormSchema, FormSchemaManager} from '@dino/core/forms';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {FormCreatorHub} from '@dino/material/form-creator-hub';
import {ListDataSource, SelectionList} from '@dino/material/list';
import {BehaviorSubject, Observable, of as obsOf, Subject, throwError} from 'rxjs';
import {catchError, filter, map, switchMap, take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-aggregation-list-e2e',
  templateUrl: 'aggregation-list-e2e.html',
})
export class MatAggregationListE2E implements AfterViewInit, OnDestroy {
  @ViewChild(SelectionList) list!: SelectionList;

  readonly additionalBasicFilters = [
    'project',
    'location',
    'area',
    'case',
    'organization',
    'form_status',
    'unavailableFilter',
  ];
  readonly additionalDataSchema: Observable<FormSchema | null>;
  readonly formSchemaId: BehaviorSubject<string | null>;
  readonly baseUrl = 'forms';
  readonly dataSource: ListDataSource<FormData>;
  readonly headers: BehaviorSubject<ListHeader<FormData>[]> = new BehaviorSubject<
    ListHeader<FormData>[]
  >([]);
  readonly onClickRowActions: ActionType[] = ['select', 'expand'];
  readonly listRowActionsIcons: {[key: string]: string} = {
    view: 'visibility',
    edit: 'create',
    print: 'printer',
    delete: 'delete',
  };
  readonly listRowActions: Observable<ListAction[] | null>;

  /**
   * A reference to the MatDialog that contains the Form Creator Hub
   */
  private _formCreatorRef?: MatDialogRef<FormCreatorHub>;

  /**
   * Main unsub subject.
   * Used for unsubscribing all subscriptions.
   */
  private _mainUnsubscribe: Subject<void> = new Subject();

  constructor(
    readonly filtersService: FiltersService,
    readonly metricService: MetricsService,
    readonly formDataManager: FormDataManager,
    readonly formSchemaManager: FormSchemaManager,
    private _dialog: MatDialog,
    private _pcs: PermissionContextService,
  ) {
    this.formSchemaId = new BehaviorSubject<string | null>(null);

    this.additionalDataSchema = this.formSchemaId.pipe(
      switchMap(schemaId => {
        if (schemaId != null) {
          return this.formSchemaManager.get(schemaId);
        }
        return obsOf(null);
      }),
      filter(schema => schema != null),
    );

    this.listRowActions = this.formSchemaId.pipe(
      map(schemaId => {
        if (schemaId == null) {
          return [];
        }
        return this._pcs.getAllowedActions('form_schema', schemaId, true).pipe(
          map(actions => {
            const displayedActions = actions.filter(
              action => Object.keys(this.listRowActionsIcons).indexOf(action) >= 0,
            );
            return displayedActions.map(action => ({
              actionType: action as ActionType,
              matIcon: this.listRowActionsIcons[action],
              askConfirm: ['delete', 'print'].includes(action) ? true : false,
              customAction:
                action === 'print'
                  ? (dataRow: FormData | null) => {
                      if (dataRow != null) {
                        this.printPdf(dataRow);
                      }
                    }
                  : undefined,
            }));
          }),
        );
      }),
      switchMap(actions => actions),
      catchError(_ => obsOf([])),
    );

    this.dataSource = new ListDataSource(
      this.formDataManager,
      this.filtersService,
      undefined,
      null,
      'form',
    );
  }

  /**
   * Opens a dialog with the Form Creator Hub
   * Subscribes to Dialog closing event to re-route to Create Form component.
   */
  openFormCreatorDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'form-creator-dialog';
    dialogConfig.data = {};
    this._formCreatorRef = this._dialog.open(FormCreatorHub, dialogConfig);
    this._formCreatorRef
      .afterClosed()
      .pipe(
        catchError(err => throwError(() => err) as Observable<string>),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe((schemaId: string) => {
        if (!schemaId) {
          return;
        }
        this.list.createAction(schemaId);
      });
  }

  printPdf(formData: FormData): void {
    if (formData == null) {
      return;
    }
    this.additionalDataSchema.pipe(take(1)).subscribe(schema => {
      if (schema != null) {
        const header: any = [
          {
            text: schema.label,
            fontSize: 22,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10],
          },
        ];
        createFormPdf(schema.schema as AjfForm, undefined, undefined, header, formData.data).open();
      }
    });
  }

  emitSchemaId(evt: any): void {
    if (evt == null || evt.form_schema_ref_id == null) {
      return;
    }
    this.formSchemaId.next(evt.form_schema_ref_id);
  }
  ngAfterViewInit(): void {
    this.headers.next([
      {column: 'id', label: 'ID', displayed: false},
      {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
      {
        column: 'user_data_ref_id',
        label: 'User',
        populateWith: 'full_name',
        displayed: false,
      },
      {
        column: 'form_schema_ref_id',
        label: 'Form Schema',
        populateWith: 'label',
        displayed: true,
      },
      {
        column: 'form_status_ref_id',
        external_ref: `form_status_ref_id`,
        label: 'Status',
        populateWith: 'label',
        displayed: true,
        icon: 'account_tree',
      },
      ...this.formSchemaManager.generateMetricsHeaders(),
    ]);
  }

  ngOnDestroy(): void {
    this._mainUnsubscribe.next();
    this._mainUnsubscribe.complete();
  }
}
