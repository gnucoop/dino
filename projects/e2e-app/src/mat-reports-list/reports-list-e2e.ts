import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MetricsService, PermissionContextService} from '@dino/core/data';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {ReportData, ReportDataManager, ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {ListDataSource, SelectionList} from '@dino/material/list';
import {BehaviorSubject, combineLatest, Observable, of as obsOf} from 'rxjs';
import {catchError, filter, map, shareReplay, switchMap, take} from 'rxjs/operators';
import {instanceName} from '../mocks';
import {additionalConfig} from '../mockconfig';

@Component({
  selector: 'app-reports-list-e2e',
  templateUrl: 'reports-list-e2e.html',
})
export class MatReportsListE2E {
  @ViewChild(SelectionList) list!: SelectionList;

  readonly isDataList = 'report';
  readonly additionalBasicFilters = [
    'project',
    'location',
    'area',
    'case',
    'organization',
    'unavailableFilter',
  ];
  readonly additionalDataSchema: Observable<ReportSchema | null>;
  readonly reportSchemaId: Observable<string | null>;
  readonly currentRowId: BehaviorSubject<string | null>;
  readonly baseUrl = 'reports';
  readonly instName = instanceName;
  readonly dataSource: ListDataSource<ReportData, ReportSchema>;
  readonly headers: ListHeader<ReportData>[] = [
    {column: 'id', label: 'ID', displayed: false},
    {column: 'user_data_ref_id', label: 'User', populateWith: 'full_name'},
    {
      column: 'area_ref_id',
      label: 'Area',

      populateWith: 'name',
      hidden: !this.metricsService.isActiveMetric('area'),
    },
    {
      column: 'case_ref_id',
      label: 'Case',

      populateWith: 'name',
      hidden: !this.metricsService.isActiveMetric('case'),
    },
    {
      column: 'location_ref_id',
      label: 'Location',

      populateWith: 'name',
      hidden: !this.metricsService.isActiveMetric('location'),
    },
    {
      column: 'organization_ref_id',
      label: 'Organization',

      populateWith: 'name',
      hidden: !this.metricsService.isActiveMetric('organization'),
    },
    {
      column: 'project_ref_id',
      label: 'Project',

      populateWith: 'name',
      hidden: !this.metricsService.isActiveMetric('project'),
    },
    {column: 'date_start', label: 'Collected Since'},
    {column: 'date_end', label: 'Collected Until'},
    {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
  ];
  readonly onClickRowActions: ActionType[] = ['select', 'expand'];
  readonly listRowActionsIcons: {[key: string]: string} = {
    view: 'visibility',
    delete: 'delete',
    addFavorite: 'bookmark_add',
    removeFavorite: 'bookmark_remove',
  };
  readonly listRowActions: Observable<ListAction[] | null>;
  readonly displayAddButton: Observable<boolean>;
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string;
  } | null = additionalConfig.secondaryMetricFieldsDisplayed;

  constructor(
    readonly filtersService: FiltersService,
    readonly metricsService: MetricsService,
    readonly reportDataManager: ReportDataManager,
    readonly reportSchemaManager: ReportSchemaManager,
    private _route: ActivatedRoute,
    private _pcs: PermissionContextService,
  ) {
    this.currentRowId = new BehaviorSubject<string | null>(null);
    this.reportSchemaId = this._route.params.pipe(map(params => params['report_schema_id']));
    this.additionalDataSchema = this.reportSchemaId.pipe(
      switchMap(schemaId => {
        if (schemaId != null) {
          return this.reportSchemaManager.get(schemaId);
        }
        return obsOf(null);
      }),
      filter(id => id != null),
      shareReplay(1),
    );

    this.listRowActions = combineLatest([this.reportSchemaId, this.currentRowId]).pipe(
      map(([schemaId, currentRowId]) => {
        if (schemaId == null || currentRowId == null) {
          return [];
        }
        return this._pcs
          .getAllowedActions('report_schema', schemaId, true, this.instName, currentRowId, true)
          .pipe(
            map(actions => {
              const displayedActions = actions.filter(
                action => Object.keys(this.listRowActionsIcons).indexOf(action) >= 0,
              );
              return displayedActions.map(action => ({
                actionType: action as ActionType,
                matIcon: this.listRowActionsIcons[action],
                askConfirm: ['delete', 'print'].includes(action) ? true : false,
              }));
            }),
          );
      }),
      switchMap(actions => actions),
      catchError(_ => obsOf([])),
    );

    this.displayAddButton = combineLatest([this._pcs.permissionContext, this.reportSchemaId]).pipe(
      map(([context, schemaId]) => {
        if (schemaId == null) {
          return false;
        }
        return this._pcs.checkPermission(schemaId, 'report_data', 'create', context, true);
      }),
    );

    this.dataSource = new ListDataSource(
      this.reportDataManager,
      this.filtersService,
      this.reportSchemaManager,
      this.isDataList,
    );
  }

  emitRowId(evt: any): void {
    if (evt == null || evt.id == null) {
      return;
    }
    this.currentRowId.next(evt.id);
  }

  addReport(): void {
    this.reportSchemaId
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
}
