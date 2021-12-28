import {AjfForm, createFormPdf} from '@ajf/core/forms';
import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MetricsService, PermissionContextService} from '@dino/core/data';
import {FormData, FormDataManager, FormSchema, FormSchemaManager} from '@dino/core/forms';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {ListDataSource, SelectionList} from '@dino/material/list';
import {combineLatest, Observable, of as obsOf} from 'rxjs';
import {catchError, filter, map, shareReplay, switchMap, take} from 'rxjs/operators';

@Component({
  selector: 'mat-forms-list-e2e',
  templateUrl: 'forms-list-e2e.html',
})
export class MatFormsListE2E implements OnDestroy, OnInit {
  @ViewChild(SelectionList) list: SelectionList;

  /**
   * If true, this is a list of simple form datas.
   */
  readonly isFormDataList = true;
  readonly additionalBasicFilters = [
    'project',
    'location',
    'area',
    'organization',
    'unavailableFilter',
  ];
  readonly additionalDataSchema: Observable<FormSchema | null>;
  readonly formSchemaId: Observable<string | null>;
  readonly baseEditUrl = 'edit-form/';
  readonly baseViewUrl = 'view-form/';
  readonly baseCreateUrl = 'create-form/';
  readonly dataSource: ListDataSource<FormData, FormSchema>;
  readonly headers: ListHeader<FormData>[] = [
    {column: 'id', label: 'ID', sortable: true, displayed: false},
    {column: 'user_data_ref_id', label: 'User', sortable: true, populateWith: 'full_name'},
    {
      column: 'area_ref_id',
      label: 'Area',
      sortable: true,
      populateWith: 'name',
      hidden: !this.isActiveMetric('area'),
    },
    {
      column: 'location_ref_id',
      label: 'Location',
      sortable: true,
      populateWith: 'name',
      hidden: !this.isActiveMetric('location'),
    },
    {
      column: 'organization_ref_id',
      label: 'Organization',
      sortable: true,
      populateWith: 'name',
      hidden: !this.isActiveMetric('organization'),
    },
    {
      column: 'project_ref_id',
      label: 'Project',
      sortable: true,
      populateWith: 'name',
      hidden: !this.isActiveMetric('project'),
    },
    {column: 'created_at', label: 'Creation Date', sortable: true},
  ];
  readonly onClickRowActions: ActionType[] = ['select', 'expand'];
  readonly listRowActionsIcons: {[key: string]: string} = {
    view: 'visibility',
    edit: 'create',
    print: 'printer',
    delete: 'delete',
  };
  readonly displayAddButton: Observable<boolean>;
  readonly displayExportButton: Observable<boolean>;
  readonly listRowActions: Observable<ListAction[] | null>;

  constructor(
    readonly filtersService: FiltersService,
    readonly metricService: MetricsService,
    readonly formDataManager: FormDataManager,
    readonly formSchemaManager: FormSchemaManager,
    private _pcs: PermissionContextService,
    private _route: ActivatedRoute,
  ) {
    this.formSchemaId = this._route.params.pipe(map(params => params.form_schema_id));
    this.additionalDataSchema = this.formSchemaId.pipe(
      switchMap(schemaId => {
        if (schemaId != null) {
          return this.formSchemaManager.get(schemaId);
        }
        return obsOf(null);
      }),
      filter(id => id != null),
      shareReplay(1),
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
      take(1),
    );

    this.displayAddButton = combineLatest([this._pcs.permissionContext, this.formSchemaId]).pipe(
      map(([context, schemaId]) => {
        if (schemaId == null) {
          return false;
        }
        return this._pcs.checkPermission(schemaId, 'form_schema', 'create', context, true);
      }),
    );

    this.displayExportButton = combineLatest([this._pcs.permissionContext, this.formSchemaId]).pipe(
      map(([context, schemaId]) => {
        if (schemaId == null) {
          return false;
        }
        return this._pcs.checkPermission(schemaId, 'form_schema', 'export', context, true);
      }),
    );

    this.dataSource = new ListDataSource(
      this.formDataManager,
      this.filtersService,
      this.formSchemaManager,
      this.isFormDataList,
    );
  }

  addForm(): void {
    this.formSchemaId
      .pipe(
        map(schemaId => {
          if (schemaId != null) {
            return this.list.createAction(schemaId, this.isFormDataList);
          }
        }),
        take(1),
      )
      .subscribe();
  }

  isActiveMetric(metricType: string): boolean {
    const activeMetrics = this.metricService.activeMetrics.getValue();
    const isMetricActive = activeMetrics.find(mt => mt.metricName === metricType) != null;
    return isMetricActive;
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

  ngOnInit() {}

  ngOnDestroy() {}
}
