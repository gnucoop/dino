import {AjfForm, createFormPdf} from '@ajf/core/forms';
import {Component, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {MetricsService, PermissionContextService} from '@dino/core/data';
import {FormData, FormDataManager, FormSchema, FormSchemaManager} from '@dino/core/forms';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {FormStatusEditor, FormStatusEditorData} from '@dino/material/form-status-editor';
import {ListDataSource, SelectionList} from '@dino/material/list';
import {BehaviorSubject, combineLatest, Observable, of as obsOf} from 'rxjs';
import {catchError, filter, map, shareReplay, startWith, switchMap, take} from 'rxjs/operators';

@Component({
  selector: 'app-forms-list-e2e',
  templateUrl: 'forms-list-e2e.html',
})
export class MatFormsListE2E {
  @ViewChild(SelectionList) list!: SelectionList;

  readonly isDataList = 'form';
  readonly additionalBasicFilters = [
    'project',
    'location',
    'area',
    'case',
    'organization',
    'unavailableFilter',
  ];
  readonly additionalDataSchema: Observable<FormSchema | null>;
  readonly formSchemaId: Observable<string | null>;
  readonly formRowData: BehaviorSubject<FormData | null>;
  readonly baseUrl = 'forms';
  readonly dataSource: ListDataSource<FormData, FormSchema>;
  readonly headers: Observable<ListHeader<FormData>[]>;
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
  readonly showStatusEditButton: Observable<boolean>;

  constructor(
    readonly filtersService: FiltersService,
    readonly metricService: MetricsService,
    readonly formDataManager: FormDataManager,
    readonly formSchemaManager: FormSchemaManager,
    private _pcs: PermissionContextService,
    private _route: ActivatedRoute,
    private _dialog: MatDialog,
  ) {
    this.formRowData = new BehaviorSubject<FormData | null>(null);
    this.formSchemaId = this._route.params.pipe(map(params => params['form_schema_id']));
    this.additionalDataSchema = this.formSchemaId.pipe(
      switchMap(schemaId => {
        if (schemaId != null) {
          return this.formSchemaManager.get(schemaId);
        }
        return obsOf(null);
      }),
      filter(schema => schema != null),
      shareReplay(1),
    );

    this.headers = this.additionalDataSchema.pipe(
      map(schema => {
        if (schema == null) {
          return [];
        }
        const statusHeaders: ListHeader<any>[] = [];
        if (schema.form_status_ref_id != null && schema.form_status_ref_id.length) {
          statusHeaders.push({
            column: 'form_status_ref_id',
            label: 'Status',
            populateWith: 'label',
            displayed: true,
            isEditable: _ => true,
            editMethod: elem => {
              this.openStatusEditor(elem as FormData & {form_schema: Observable<FormSchema>});
            },
          });
        }
        return [...statusHeaders, ...this.formSchemaManager.generateSchemaListHeaders(schema)];
      }),
      startWith([]),
    );

    this.showStatusEditButton = this.formRowData.pipe(
      switchMap(rowData => {
        if (rowData == null) {
          return obsOf(false);
        }
        return this.formDataManager.hasAllowedFormStatus(rowData);
      }),
    );

    this.listRowActions = combineLatest([this.formSchemaId, this.showStatusEditButton]).pipe(
      map(([schemaId, allowedStatus]) => {
        if (schemaId == null) {
          return [];
        }
        return this._pcs.getAllowedActions('form_schema', schemaId, true).pipe(
          map(actions => {
            let displayedActions = actions.filter(
              action => Object.keys(this.listRowActionsIcons).indexOf(action) >= 0,
            );
            if (!allowedStatus) {
              displayedActions = displayedActions.filter(
                action => action !== 'delete' && action !== 'edit',
              );
            }
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
      this.isDataList,
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

  openImportForms(): void {
    this.formSchemaId
      .pipe(
        map(schemaId => {
          if (schemaId != null) {
            return this.list.openImportForms(schemaId);
          }
        }),
        take(1),
      )
      .subscribe();
  }

  openStatusEditor(element: FormData & {form_schema: Observable<FormSchema>}): void {
    if (!element.form_status_ref_id) {
      return;
    }
    const dialogConfig = new MatDialogConfig();
    const dialogData: FormStatusEditorData = {formData: element};
    dialogConfig.data = dialogData;
    this._dialog.open(FormStatusEditor, dialogConfig);
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

  emitRowData(evt: FormData): void {
    if (evt == null) {
      return;
    }
    this.formRowData.next(evt);
  }
}
