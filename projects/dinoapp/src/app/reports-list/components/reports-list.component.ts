import {ChangeDetectionStrategy, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MetricsService, PermissionContextService} from '@dino/core/data';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {ReportData, ReportDataManager, ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {TokensService} from '@dino/material/stripe-payment';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslocoService} from '@ajf/core/transloco';
import {ListDataSource, SelectionList} from '@dino/material/list';
import {BehaviorSubject, combineLatest, Observable, of as obsOf} from 'rxjs';
import {catchError, filter, map, shareReplay, switchMap, take} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import * as conf from '../conf';

@Component({
  selector: 'dinoapp-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ReportsListComponent {
  @ViewChild(SelectionList) list: SelectionList | undefined;

  /**
   * The Pandino Tokens cost of creating the report.
   */
  readonly reportCost: Observable<number | null>;
  /**
   * The Tooltip message for the Add Report floating button
   */
  readonly tooltipMessage: Observable<string>;

  readonly isDataList = 'report';
  readonly additionalBasicFilters = conf.additionalBasicFilters;
  readonly additionalDataSchema: Observable<ReportSchema | null>;
  readonly reportSchemaId: Observable<string | null>;
  readonly currentRowId: BehaviorSubject<string | null>;
  readonly baseUrl = conf.baseUrl;
  readonly instName = conf.instanceName;
  readonly dataSource: ListDataSource<ReportData, ReportSchema>;
  readonly headers: ListHeader<ReportData>[];
  readonly onClickRowActions: ActionType[] = conf.onClickRowActions;
  readonly listRowActionsIcons: {[key: string]: string} = {
    delete: 'delete',
    view: 'visibility',
    addFavorite: 'favorite_border',
    removeFavorite: 'favorite',
  };
  readonly listRowActions: Observable<ListAction[] | null>;
  readonly displayAddButton: Observable<boolean>;
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string [];
  } | null = conf.secondaryMetricFieldsDisplayed;

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
    this.reportSchemaId = this._route.params.pipe(map(params => params.report_schema_id));
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
        )} ${cost} ${this._ts.translate('tokens')}`;
      }),
    );

    const metricHeaders: ListHeader<ReportData>[] = [
      {
        column: 'area_ref_id',
        label: 'Area',
        sortable: true,
        populateWith: 'name',
        displayed: true,
        icon: 'volunteer_activism',
        hidden: !this.metricsService.isActiveMetric('area'),
      },
      {
        column: 'location_ref_id',
        label: 'Location',
        sortable: true,
        populateWith: 'name',
        displayed: true,
        icon: 'place',
        hidden: !this.metricsService.isActiveMetric('location'),
      },
      {
        column: 'organization_ref_id',
        label: 'Organization',
        sortable: true,
        populateWith: 'name',
        displayed: true,
        icon: 'public',
        hidden: !this.metricsService.isActiveMetric('organization'),
      },
      {
        column: 'project_ref_id',
        label: 'Project',
        sortable: true,
        populateWith: 'name',
        displayed: true,
        icon: 'assignment',
        hidden: !this.metricsService.isActiveMetric('project'),
      },
      {
        column: 'case_ref_id',
        label: 'Case',
        sortable: true,
        populateWith: 'name',
        displayed: true,
        icon: 'people',
        hidden: !this.metricsService.isActiveMetric('case'),
      },
      {
        column: 'form_status_ref_id',
        external_ref: `form_status_ref_id`,
        label: 'Status',
        populateWith: 'label',
        displayed: true,
        icon: 'account_tree',
      },
    ];

    this.headers = [...conf.listHeaders, ...metricHeaders];

    this.listRowActions = combineLatest([this.reportSchemaId, this.currentRowId]).pipe(
      switchMap(([schemaId, currentRowId]) => {
        if (schemaId == null || currentRowId == null) {
          return obsOf([]);
        }
        return this._pcs
          .getAllowedActions(
            'report_schema',
            schemaId,
            true,
            this.instName,
            currentRowId,
            environment.layoutConfig.favorites ? true : false,
          )
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
          if (schema == null || this.list == null) return;
          const promptVariables = this.reportSchemaManager.getAIPromptVariablesFromSchema(schema);
          if (promptVariables.length) {
            if ((tokens !== null && promptVariables.length > tokens) || tokens == null) {
              this._snackBar.open(
                this._ts.translate(
                  'Not enough tokens! Please add more DINO-AI Tokens to your account to use this feature',
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
