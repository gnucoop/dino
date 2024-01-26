import {AjfForm, createFormPdf} from '@ajf/core/forms';
import {TranslocoService} from '@ajf/core/transloco';
import {Component, Optional, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActionTrigger, Metric, MetricsService, PermissionContextService} from '@dino/core/data';
import {FormData, FormDataManager, FormSchema, FormSchemaManager} from '@dino/core/forms';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {LogManager} from '@dino/core/logs';
import {UserDataManager} from '@dino/core/users';
import {ListDataSource, SelectionList} from '@dino/material/list';
import {RxDocument, isRxDocument} from 'rxdb';
import {BehaviorSubject, combineLatest, forkJoin, Observable, of as obsOf} from 'rxjs';
import {catchError, filter, map, shareReplay, startWith, switchMap, take} from 'rxjs/operators';
import {additionalConfig, optionalModulesConfig} from '../mockconfig';

@Component({
  selector: 'app-forms-list-e2e',
  templateUrl: 'forms-list-e2e.html',
})
export class MatFormsListE2E {
  @ViewChild(SelectionList) list!: SelectionList;

  readonly isDataList = 'form';
  readonly additionalBasicFilters: Observable<string[]>;
  readonly additionalDataSchema: Observable<FormSchema | null>;
  readonly formSchemaId: Observable<string | null>;
  readonly formRowData: BehaviorSubject<FormData | null>;
  readonly formSelectionData: BehaviorSubject<FormData[] | null>;
  readonly baseUrl = 'forms';
  readonly dataSource: ListDataSource<FormData, FormSchema>;
  readonly headers: Observable<ListHeader<FormData>[]>;
  readonly onClickRowActions: ActionType[] = ['select', 'expand'];
  readonly listRowActionsIcons: {[key: string]: string} = {
    view: 'visibility',
    edit: 'create',
    print: 'printer',
    duplicate: 'file_copy',
    delete: 'delete',
  };
  readonly displayAddButton: Observable<boolean>;
  readonly displayExportButton: Observable<boolean>;
  readonly bulkActionsAvailable: Observable<('delete' | 'bulkFormEdit')[]>;
  readonly listRowActions: Observable<ListAction[] | null>;
  readonly listSelectionActions: Observable<ListAction[] | null>;
  readonly showStatusEditButton: Observable<boolean>;
  readonly hasSelectionAllowedStatus: Observable<boolean>;
  readonly showStatusProgressBar: boolean = additionalConfig.statusType === 'progress';
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string;
  } | null = additionalConfig.secondaryMetricFieldsDisplayed;

  constructor(
    readonly filtersService: FiltersService,
    readonly metricService: MetricsService,
    readonly formDataManager: FormDataManager,
    readonly formSchemaManager: FormSchemaManager,
    private _translateService: TranslocoService,
    private _pcs: PermissionContextService,
    private _route: ActivatedRoute,
    private _udm: UserDataManager,
    private _fdm: FormDataManager,
    @Optional() private _logManager: LogManager,
  ) {
    if (optionalModulesConfig.logsModule) {
      this.listRowActionsIcons['viewlog'] = 'history';
    }
    this.formRowData = new BehaviorSubject<FormData | null>(null);
    this.formSelectionData = new BehaviorSubject<FormData[] | null>(null);
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

    this.additionalBasicFilters = this.additionalDataSchema.pipe(
      map(schema => {
        let addBasFilters = ['form_status', 'user_data', 'unavailableFilter'];
        if (schema) {
          if (!schema.form_schema_metrics || !schema.form_schema_metrics.length) {
            addBasFilters.push('project', 'location', 'area', 'case', 'organization');
          } else {
            addBasFilters.push(...schema.form_schema_metrics);
          }
        }
        return addBasFilters;
      }),
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
            external_ref: `form_status_ref_id`,
            label: 'Status',
            populateWith: 'label',
            displayed: true,
            icon: 'account_tree',
            isEditable: _ => additionalConfig.statusEditable,
            editMethod: additionalConfig.statusEditable
              ? elem => {
                  this.list.openStatusEditor(
                    elem as FormData & {form_schema: Observable<FormSchema>},
                  );
                }
              : undefined,
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

    this.hasSelectionAllowedStatus = this.formSelectionData.pipe(
      switchMap(selectionData => {
        if (selectionData == null || !selectionData.length) {
          return obsOf(false);
        }
        return forkJoin(
          selectionData.map(row => this.formDataManager.hasAllowedFormStatus(row)),
        ).pipe(map(allowedStatusArray => !allowedStatusArray.some(st => st == false)));
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

    this.listSelectionActions = combineLatest([
      this.formSchemaId,
      this.hasSelectionAllowedStatus,
    ]).pipe(
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

    this.bulkActionsAvailable = this.listSelectionActions.pipe(
      map(actions => {
        if (actions == null) {
          return [];
        }
        const bulkActions: ('delete' | 'bulkFormEdit')[] = [];
        const actionTypes = actions.map(act => act.actionType);
        for (let actType of actionTypes) {
          if (actType === 'delete') {
            bulkActions.push('delete');
          }
          if (actType === 'edit') {
            bulkActions.push('bulkFormEdit');
          }
        }
        return bulkActions;
      }),
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

  printPdf(formData: {[key: string]: any}): void {
    if (formData == null) {
      return;
    }

    const activeMetrics = this.metricService.activeMetrics.getValue();
    const values: Observable<RxDocument<Metric, {}> | null>[] = [];
    activeMetrics.forEach(activeMetric => values.push(formData[`${activeMetric.metricName}`]));
    const metricsData = forkJoin(values).pipe(filter(val => val != null));

    combineLatest([this.additionalDataSchema, metricsData])
      .pipe(take(1))
      .subscribe(res => {
        const schema = res[0];
        const metrics = res[1];

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

          metrics.forEach(metric => {
            if (metric != null) {
              const metricDetail = `${this._translateService.translate(
                metric.collection.name.charAt(0).toUpperCase() + metric.collection.name.slice(1),
              )}: ${metric.name} `;

              header.push({
                text: metricDetail,
                fontSize: 18,
                bold: true,
                alignment: 'left',
                margin: [0, 0, 0, 10],
              });
            }
          });

          let translate: (s: string) => string = s => s;
          if (this._translateService != null) {
            translate = s => {
              if (s == null || s.trim() === '') {
                return ' ';
              }
              return this._translateService.translate(s) as string;
            };
          }

          createFormPdf(
            schema.schema as AjfForm,
            translate,
            undefined,
            header,
            formData['data'],
          ).open();
        }
      });
  }

  emitRowData(evt: FormData): void {
    if (evt == null) {
      return;
    }
    this.formRowData.next(evt);
  }

  emitSelectionData(evt: FormData[]): void {
    if (evt == null) {
      return;
    }
    this.formSelectionData.next(evt);
  }

  processActionTrigger(trigger: ActionTrigger<FormData>) {
    if (
      this._logManager != null &&
      (trigger.triggerType === 'on_status_change' ||
        trigger.triggerType === 'on_form_data_change') &&
      trigger.triggerData?.doc
    ) {
      const oldDoc = trigger.triggerData?.previousValue;
      const newDoc = trigger.triggerData?.doc;
      const diff =
        trigger.triggerType === 'on_status_change'
          ? {attributes: ['form_status_ref_id'], dataAttributes: []}
          : this._fdm.compareFormDatas(oldDoc, newDoc, ['form_status_ref_id']);
      const populatedNewDoc: FormData = isRxDocument(newDoc)
        ? this.formDataManager.populateFormData(newDoc as RxDocument<FormData>)
        : (newDoc as FormData);
      combineLatest([
        this.formDataManager.generatePopulatedFormObservable(populatedNewDoc),
        this._udm.getActiveUserData(),
      ])
        .pipe(
          switchMap(([newForm, activeUserData]) => {
            if (newForm == null || activeUserData == null) {
              return obsOf(null);
            }
            const changesArray = this._logManager.generateChangesArray(newForm, diff);
            return this._logManager.generateLog(
              changesArray,
              newForm.id,
              newForm.form_schema_ref_id,
              activeUserData.full_name,
            );
          }),
          take(1),
        )
        .subscribe();
    }
  }

  processExportTrigger(trigger: ActionTrigger) {
    if (
      trigger.triggerType === 'on_form_data_export' &&
      trigger.triggerData?.newValue &&
      trigger.triggerData?.additional_info &&
      trigger.triggerData?.additional_info['bookType']
    ) {
      console.log(trigger);
    }
  }
}
