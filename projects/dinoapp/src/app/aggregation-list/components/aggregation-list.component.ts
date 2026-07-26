import {createFormPdf, AjfForm} from '@ajf/core/forms';
import {TranslocoService} from '@ajf/core/transloco';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {Metric, MetricsService, PermissionContextService} from '@dino/core/data';
import {FormData, FormDataManager, FormSchema, FormSchemaManager} from '@dino/core/forms';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {FormCreatorHub} from '@dino/material/form-creator-hub';
import {ListDataSource, SelectionList} from '@dino/material/list';
import {RxDocument} from 'rxdb';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  Observable,
  of as obsOf,
  Subject,
  throwError,
} from 'rxjs';
import {catchError, filter, map, switchMap, take, takeUntil} from 'rxjs/operators';

import * as conf from '../conf';

@Component({
  selector: 'dinoapp-aggregation-list',
  styleUrls: ['aggregation-list.component.scss'],
  templateUrl: './aggregation-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AggregationListComponent implements OnDestroy, AfterViewInit {
  @ViewChild(SelectionList) list: SelectionList | undefined;

  /**
   * If true, this is a list of simple form datas.
   */
  readonly isFormDataList = true;
  readonly additionalBasicFilters = conf.additionalBasicFilters;
  readonly aggregationFormCreator = conf.aggregationFormCreator;
  readonly additionalDataSchema: Observable<FormSchema | null>;
  readonly formSchemaId: BehaviorSubject<string | null>;
  readonly baseUrl = conf.baseUrl;
  readonly dataSource: ListDataSource<FormData>;
  readonly headers: BehaviorSubject<ListHeader<FormData>[]> = new BehaviorSubject<
    ListHeader<FormData>[]
  >([]);
  readonly onClickRowActions: ActionType[] = conf.onClickRowActions;
  readonly listRowActionsIcons: {[key: string]: string} = conf.listRowActionsIcons;
  readonly listRowActions: Observable<ListAction[] | null>;
  readonly secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string[];
  } | null = conf.secondaryMetricFieldsDisplayed;

  /**
   * A reference to the MatDialog that contains the Form Creator Hub
   */
  private _formCreatorRef?: MatDialogRef<FormCreatorHub>;

  /**
   * Main unsub subject.
   * Used for unsubscribing all subscriptions.
   */
  private _mainUnsubscribe: Subject<void> = new Subject();

  constructor(
    readonly filtersService: FiltersService,
    readonly metricService: MetricsService,
    readonly formDataManager: FormDataManager,
    readonly formSchemaManager: FormSchemaManager,
    private _translateService: TranslocoService,
    private _dialog: MatDialog,
    private _pcs: PermissionContextService,
  ) {
    this.formSchemaId = new BehaviorSubject<string | null>(null);

    this.additionalDataSchema = this.formSchemaId.pipe(
      filter(schemaId => schemaId != null),
      switchMap(schemaId => this.formSchemaManager.get(schemaId)),
      // A requested schema that comes back null is a failure, not "not yet":
      // filtering it out left the list waiting on this stream forever.
      switchMap(schema =>
        schema == null
          ? throwError(() => new Error('The form schema could not be loaded'))
          : obsOf(schema),
      ),
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
    );

    this.dataSource = new ListDataSource(
      this.formDataManager,
      this.filtersService,
      undefined,
      null,
      'form',
    );
  }

  /**
   * Opens a dialog with the Form Creator Hub
   * Subscribes to Dialog closing event to re-route to Create Form component.
   */
  openFormCreatorDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'form-creator-dialog';
    dialogConfig.data = {};
    this._formCreatorRef = this._dialog.open(FormCreatorHub, dialogConfig);
    this._formCreatorRef
      .afterClosed()
      .pipe(
        catchError(err => throwError(() => err) as Observable<string>),
        takeUntil(this._mainUnsubscribe),
      )
      .subscribe((schemaId: string) => {
        if (!schemaId || this.list == null) {
          return;
        }
        this.list.createAction(schemaId);
      });
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

          createFormPdf(
            schema.schema as AjfForm,
            undefined,
            undefined,
            header,
            formData['data'],
          ).open();
        }
      });
  }

  emitSchemaId(evt: any): void {
    if (evt == null || evt.form_schema_ref_id == null) {
      return;
    }
    this.formSchemaId.next(evt.form_schema_ref_id);
  }
  ngAfterViewInit(): void {
    this.headers.next([...conf.headers, ...this.formSchemaManager.generateMetricsHeaders()]);
  }
  ngOnDestroy() {
    this._mainUnsubscribe.next();
    this._mainUnsubscribe.complete();
  }
}
