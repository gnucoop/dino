import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {ReportData, ReportDataManager, ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {ListDataSource, SelectionList} from '@dino/material/list';
import {Observable, of as obsOf} from 'rxjs';
import {filter, map, shareReplay, switchMap, take} from 'rxjs/operators';

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
  readonly formSchemaId: Observable<string | null>;
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
  readonly listRowActions: ListAction[] = [
    {
      actionType: 'view',
      matIcon: 'visibility',
    },
    {
      actionType: 'delete',
      matIcon: 'delete',
      askConfirm: true,
    },
  ];

  constructor(
    readonly filtersService: FiltersService,
    readonly formDataManager: ReportDataManager,
    readonly formSchemaManager: ReportSchemaManager,
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

  ngOnInit() {}

  ngOnDestroy() {}
}
