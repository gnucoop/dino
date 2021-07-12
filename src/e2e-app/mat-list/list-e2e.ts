import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {
  FormData,
  FormDataManager,
  FormSchema,
  FormSchemaManager,
} from '@dewco/core/forms';
import {
  ActionType,
  FiltersService,
  ListAction,
  ListHeader,
} from '@dewco/core/list';
import {ListDataSource} from '@dewco/material/list';
import {Observable, of as obsOf} from 'rxjs';
import {filter, shareReplay, switchMap} from 'rxjs/operators';

@Component({
  selector: 'mat-list-e2e',
  templateUrl: 'list-e2e.html',
})
export class MatListE2E implements OnDestroy, OnInit {
  readonly additionalBasicFilters = [
    'project',
    'location',
    'area',
    'organization',
    'unavailableFilter',
  ];
  readonly additionalDataSchema: Observable<FormSchema|null>;
  readonly baseEditUrl = 'edit/';
  readonly dataSource: ListDataSource<FormData, FormSchema>;
  readonly headers: ListHeader<FormData>[] = [
    {column: 'id', label: 'ID', sortable: true, displayed: false},
    {column: 'user_id', label: 'User', sortable: true},
    {column: 'created_at', label: 'Creation Date', sortable: true},
  ];
  readonly onClickRowActions: ActionType[] = ['select'];
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
    this.additionalDataSchema = this._route.params.pipe(
        switchMap(params => {
          if (params.form_schema_id != null) {
            return this.formSchemaManager.get(params.form_schema_id);
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
        true,
    );
  }

  ngOnInit() {}


  ngOnDestroy() {}
}
