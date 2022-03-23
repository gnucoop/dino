import {AjfForm, createFormPdf} from '@ajf/core/forms';
import {AfterViewInit, Component, OnDestroy, ViewChild} from '@angular/core';
import {MetricsService, PermissionContextService} from '@dino/core/data';
import {FormData, FormDataManager, FormSchema, FormSchemaManager} from '@dino/core/forms';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {ListDataSource, SelectionList} from '@dino/material/list';
import {BehaviorSubject, Observable, of as obsOf} from 'rxjs';
import {catchError, filter, map, switchMap, take} from 'rxjs/operators';

@Component({
  selector: 'mat-aggregation-list-e2e',
  templateUrl: 'aggregation-list-e2e.html',
})
export class MatAggregationListE2E implements OnDestroy, AfterViewInit {
  @ViewChild(SelectionList) list: SelectionList;

  /**
   * If true, this is a list of simple form datas.
   */
  readonly isFormDataList = true;
  readonly additionalBasicFilters = [
    'project',
    'location',
    'area',
    'case',
    'organization',
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

  constructor(
    readonly filtersService: FiltersService,
    readonly metricService: MetricsService,
    readonly formDataManager: FormDataManager,
    readonly formSchemaManager: FormSchemaManager,
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
      false,
      'form',
    );
  }

  addForm(): void {
    this.formSchemaId
      .pipe(
        map(schemaId => {
          if (schemaId != null) {
            return this.list.createAction(schemaId);
          }
        }),
        take(1),
      )
      .subscribe();
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
      ...this.formSchemaManager.generateMetricsHeaders(),
    ]);
  }
  ngOnDestroy() {}
}
