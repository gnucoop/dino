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
import {TokensService} from '@dino/material/stripe-payment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ajf/core/transloco';

@Component({
  selector: 'app-reports-list-e2e',
  templateUrl: 'reports-list-e2e.html',
})
export class MatReportsListE2E {
  @ViewChild(SelectionList) list!: SelectionList;

  /**
   * The Pandino Tokens cost of creating the report.
   */
  readonly reportCost: Observable<number | null>;

  /**
   * The Tooltip message for the Add Report floating button
   */
  readonly tooltipMessage: Observable<string>;

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
    {column: 'user_data_ref_id', label: 'User', populateWith: 'full_name', displayed: true},
    {column: 'name', label: 'Name', displayed: true},
    {
      column: 'area_ref_id',
      label: 'Area',
      displayed: true,
      populateWith: 'name',
      icon: 'volunteer_activism',
      hidden: !this.metricsService.isActiveMetric('area'),
    },
    {
      column: 'case_ref_id',
      label: 'Case',
      displayed: true,
      populateWith: 'name',
      icon: 'people',
      hidden: !this.metricsService.isActiveMetric('case'),
    },
    {
      column: 'location_ref_id',
      label: 'Location',
      displayed: true,
      populateWith: 'name',
      icon: 'place',
      hidden: !this.metricsService.isActiveMetric('location'),
    },
    {
      column: 'organization_ref_id',
      label: 'Organization',
      displayed: true,
      populateWith: 'name',
      icon: 'public',
      hidden: !this.metricsService.isActiveMetric('organization'),
    },
    {
      column: 'project_ref_id',
      label: 'Project',
      displayed: true,
      populateWith: 'name',
      icon: 'assignment',
      hidden: !this.metricsService.isActiveMetric('project'),
    },
    {
      column: 'form_status_ref_id',
      external_ref: `form_status_ref_id`,
      label: 'Status',
      populateWith: 'label',
      displayed: true,
      icon: 'account_tree',
    },
    {column: 'date_start', label: 'Collected Since', displayed: true},
    {column: 'date_end', label: 'Collected Until', displayed: true},
    {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
  ];
  readonly onClickRowActions: ActionType[] = ['select', 'expand'];
  readonly listRowActionsIcons: {[key: string]: string} = {
    delete: 'delete',
    view: 'visibility',
    addFavorite: 'bookmark_add',
    removeFavorite: 'bookmark_remove',
  };
  readonly listRowActions: Observable<ListAction[] | null>;
  readonly displayAddButton: Observable<boolean>;
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string[];
  } | null = additionalConfig.secondaryMetricFieldsDisplayed;

  constructor(
    readonly filtersService: FiltersService,
    readonly metricsService: MetricsService,
    readonly reportDataManager: ReportDataManager,
    readonly reportSchemaManager: ReportSchemaManager,
    private _route: ActivatedRoute,
    private _pcs: PermissionContextService,
    private _tokensService: TokensService,
    private _snackBar: MatSnackBar,
    private _ts: TranslocoService,
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

    this.reportCost = this.additionalDataSchema.pipe(
      map(schema => {
        if (!schema) return null;
        return this.reportSchemaManager.getAIPromptVariablesFromSchema(schema).length;
      }),
      shareReplay(1),
    );

    this.tooltipMessage = this.reportCost.pipe(
      map(cost => {
        if (!cost) return this._ts.translate('Add New Report');
        return `${this._ts.translate('Add New Report')}. ${this._ts.translate(
          'Once the Report is created, you will use',
        )} ${cost} ${this._ts.translate('credits')}`;
      }),
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
    this._tokensService.refreshPandinoTokensEvt.emit();
    combineLatest([this.additionalDataSchema, this._tokensService.availableTokens])
      .pipe(
        map(([schema, tokens]) => {
          if (schema == null) return;
          const promptVariables = this.reportSchemaManager.getAIPromptVariablesFromSchema(schema);
          if (promptVariables.length) {
            if ((tokens !== null && promptVariables.length > tokens) || tokens == null) {
              this._snackBar.open(
                this._ts.translate(
                  'Not enough credits! Please add more DINO-AI Credits to your account to use this feature',
                ),
                'OOPS!',
                {duration: 10000},
              );
              return;
            }
          }
          return this.list.createAction(schema.id);
        }),
        take(1),
      )
      .subscribe();
  }
}
