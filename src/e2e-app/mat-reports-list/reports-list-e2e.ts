import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MetricsService, PermissionContextService} from '@dino/core/data';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {ReportData, ReportDataManager, ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {ListDataSource, SelectionList} from '@dino/material/list';
import {Observable, of as obsOf} from 'rxjs';
import {catchError, filter, map, shareReplay, switchMap, take} from 'rxjs/operators';

@Component({
  selector: 'mat-reports-list-e2e',
  templateUrl: 'reports-list-e2e.html',
})
export class MatReportsListE2E implements OnDestroy, OnInit {
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
  readonly additionalDataSchema: Observable<ReportSchema | null>;
  readonly reportSchemaId: Observable<string | null>;
  readonly baseViewUrl = 'view-report/';
  readonly dataSource: ListDataSource<ReportData, ReportSchema>;
  readonly headers: ListHeader<ReportData>[] = [
    {column: 'id', label: 'ID', sortable: true, displayed: false},
    {column: 'user_id', label: 'User', sortable: true},
    {column: 'date_start', label: 'Collected Since', sortable: true},
    {column: 'date_end', label: 'Collected Until', sortable: true},
    {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
  ];
  readonly onClickRowActions: ActionType[] = ['select', 'expand'];
  readonly listRowActionsIcons: {[key: string]: string} = {
    view: 'visibility',
    delete: 'delete',
  };
  readonly listRowActions: Observable<ListAction[] | null>;

  constructor(
    readonly filtersService: FiltersService,
    readonly metricsService: MetricsService,
    readonly reportDataManager: ReportDataManager,
    readonly reportSchemaManager: ReportSchemaManager,
    private _route: ActivatedRoute,
    private _pcs: PermissionContextService,
  ) {
    this.reportSchemaId = this._route.params.pipe(map(params => params.form_schema_id));
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

    this.listRowActions = this.reportSchemaId.pipe(
      map(schemaId => {
        if (schemaId == null) {
          return [];
        }
        return this._pcs.getAllowedActions('report_schema', schemaId, true).pipe(
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
      take(1),
    );

    this.dataSource = new ListDataSource(
      this.reportDataManager,
      this.filtersService,
      this.reportSchemaManager,
      this.isFormDataList,
    );
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
