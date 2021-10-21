import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormData, FormDataManager, FormSchema, FormSchemaManager} from '@dewco/core/forms';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dewco/core/list';
import {ListDataSource, SelectionList} from '@dewco/material/list';
import {Observable, of as obsOf} from 'rxjs';
import {filter, map, shareReplay, switchMap, take} from 'rxjs/operators';

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
    {column: 'user_id', label: 'User', sortable: true},
    {column: 'created_at', label: 'Creation Date', sortable: true},
  ];
  readonly onClickRowActions: ActionType[] = ['select', 'expand'];
  readonly listRowActions: ListAction[] = [
    {
      actionType: 'view',
      matIcon: 'visibility',
    },
    {
      actionType: 'edit',
      matIcon: 'create',
    },
    {
      actionType: 'delete',
      matIcon: 'delete',
      askConfirm: true,
    },
  ];

  constructor(
    readonly filtersService: FiltersService,
    readonly formDataManager: FormDataManager,
    readonly formSchemaManager: FormSchemaManager,
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
