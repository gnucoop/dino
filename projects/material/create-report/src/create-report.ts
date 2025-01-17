/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import {Location} from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {MetricsService, PermissionContextService} from '@dino/core/data';
import {ReportData, ReportDataManager, ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {UserDataManager} from '@dino/core/users';
import {FormMetricSelector} from '@dino/material/form-metric-selector';
import {BehaviorSubject, combineLatest, Observable, of as obsOf, Subscription} from 'rxjs';
import {filter, map, shareReplay, startWith, switchMap, withLatestFrom} from 'rxjs/operators';
import {format} from 'date-fns';
import {FormStatus, FormStatusManager} from '@dino/core/forms';
import {TokensService} from '@dino/material/stripe-payment';
import {MatStepper} from '@angular/material/stepper';

/**
 * The Report data creation component.
 * Reports data can be created here.
 */
@Component({
  selector: 'dino-create-report',
  styleUrls: ['create-report.scss'],
  templateUrl: 'create-report.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CreateReport implements AfterViewInit, OnInit, OnDestroy {
  /**
   * Metrics of the types specified in the array can be created directly from the metric fields
   */
  @Input() allowMetricCreationFor: string[] = ['all'];

  /**
   * Secondary metric field to display in the Form Metric Selector and Filters
   */
  private _secondaryMetricFieldsDisplayed: {
    [metricName: string]: string;
  } | null = null;
  get secondaryMetricFieldsDisplayed(): {
    [metricName: string]: string;
  } | null {
    return this._secondaryMetricFieldsDisplayed;
  }
  @Input()
  set secondaryMetricFieldsDisplayed(
    fields: {
      [metricName: string]: string;
    } | null,
  ) {
    this._secondaryMetricFieldsDisplayed = fields;
  }

  /**
   * True if no validation errors are encountered in the Metrics selector form
   */
  isFormMetricsSelectorValid: Observable<boolean> = obsOf(false);

  /**
   * The Form Group representing the optional report time interval (from/to)
   */
  dateIntervalForm: UntypedFormGroup;

  /**
   * True if the Report can have one or more null Metrics.
   * Defaults to false.
   */
  @Input()
  hasOptionalMetrics: boolean = false;

  /**
   * The Metric Selector
   */
  private _formMetricsSelector: Observable<FormMetricSelector | null> = obsOf(null);

  /**
   * The Report schema id
   */
  private _reportSchemaId: Observable<string> = obsOf();

  /**
   * The Report schema object
   */
  private _reportSchema: Observable<ReportSchema> = obsOf();
  get reportSchema(): Observable<ReportSchema> {
    return this._reportSchema;
  }

  /**
   * Emitted when a user tries to save a Report Data
   */
  private _saveReportEvt: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Subscribes to the save form event
   */
  private _saveReportSub: Subscription = Subscription.EMPTY;

  /**
   * The list of all the Form Statuses available to the active User
   */
  readonly availableStatuses: Observable<FormStatus[] | null>;

  /**
   *The names of the Metric types required.
   */
  readonly requiredMetrics: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /**
   * The Form Metrics Selector
   */
  @ViewChildren(FormMetricSelector) formMetricsSelectorComponent!: QueryList<FormMetricSelector>;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _rs: ReportSchemaManager,
    private _rd: ReportDataManager,
    private _udm: UserDataManager,
    private _location: Location,
    readonly snackbar: MatSnackBar,
    readonly metricsService: MetricsService,
    private _fstm: FormStatusManager,
    private _pcs: PermissionContextService,
    private _tokensService: TokensService,
  ) {
    this.dateIntervalForm = new UntypedFormGroup({
      'name': new UntypedFormControl('', Validators.required),
      'date_start': new UntypedFormControl(),
      'date_end': new UntypedFormControl(),
    });

    this.availableStatuses = combineLatest([this._fstm.list(), this._pcs.permissionContext]).pipe(
      map(([statuses, context]) => {
        if (statuses == null || context == null) {
          return [];
        }
        const stts = [...(context.user_form_statuses ?? [])];
        return statuses.filter(status => stts.includes(status.id) || stts.includes('all'));
      }),
    );
  }
  ngOnInit() {
    if (this._rd == null) {
      this._location.back();
      this.snackbar.open('Oops! Something went wrong opening the form', 'ERROR', {duration: 5000});
      throw new Error('No Data manager was provided');
    }

    this._reportSchemaId = this._route.params.pipe(
      map(params => params['report_schema_id']),
      filter(id => id != null),
      shareReplay(1),
    );

    this._reportSchema = this._reportSchemaId.pipe(
      map(schemaId =>
        this._rs.get(schemaId).pipe(
          map(doc => {
            if (doc == null) {
              return null;
            }
            const item = doc.toJSON();
            this.requiredMetrics.next((item.required_metrics as string[]) || []);
            return item;
          }),
        ),
      ),
      switchMap(schema => schema as Observable<ReportSchema>),
      shareReplay(1),
    );
  }

  ngAfterViewInit() {
    this._formMetricsSelector = this.metricsService.hasActiveMetrics.pipe(
      switchMap(active => {
        if (!active) {
          return obsOf(null);
        }
        return this.formMetricsSelectorComponent.changes.pipe(
          map((comps: QueryList<FormMetricSelector>) => comps.first),
        );
      }),
    );

    this._saveReportSub = this._saveReportEvt
      .pipe(
        withLatestFrom(
          this._reportSchemaId,
          this._reportSchema,
          this._formMetricsSelector,
          this._udm.getActiveUserData(),
        ),
        switchMap(([_, reportSchemaId, reportSchema, formMetricsSelector, userData]) => {
          const promptVariables = this._rs.getAIPromptVariablesFromSchema(reportSchema);
          const dateIntervalValue = this.dateIntervalForm.value;
          let newItem: {[key: string]: any} = {};
          newItem['report_schema_ref_id'] = reportSchemaId;
          newItem['user_data_ref_id'] = userData?.id;
          newItem['area_ref_id'] = null;
          newItem['case_ref_id'] = null;
          newItem['location_ref_id'] = null;
          newItem['organization_ref_id'] = null;
          newItem['project_ref_id'] = null;
          newItem['metadata'] = {};

          const dateFmt = 'yyyy-MM-dd';
          newItem['date_start'] = dateIntervalValue.date_start
            ? format(dateIntervalValue.date_start, dateFmt)
            : null;
          newItem['date_end'] = dateIntervalValue.date_end
            ? format(dateIntervalValue.date_end, dateFmt)
            : null;
          newItem['name'] = dateIntervalValue.name;
          if (formMetricsSelector != null) {
            const selectedMetrics = formMetricsSelector.selectedMetrics;
            const creationDate = formMetricsSelector.formDate.value.created_at;
            const formStatusRefId = formMetricsSelector.formStatus.value.form_status_ref_id;
            for (let key of Object.keys(selectedMetrics)) {
              const saveKey = `${key}_ref_id`;
              if (
                selectedMetrics[key] != null &&
                selectedMetrics[key].option != null &&
                selectedMetrics[key].option.id != null
              ) {
                newItem[saveKey] = selectedMetrics[key].option.id;
              }
            }

            let formattedDate = creationDate;
            if (creationDate && typeof creationDate === 'object') {
              const dateFmt = 'yyyy-MM-dd';
              try {
                formattedDate = format(creationDate, dateFmt);
              } catch (e) {}
            }
            newItem['created_at'] = formattedDate;

            if (formStatusRefId != null) {
              newItem['form_status_ref_id'] = formStatusRefId;
            }
          }
          if (promptVariables && promptVariables.length) {
            return this._tokensService.buyPandinoAIPromptReport(promptVariables).pipe(
              switchMap(pandinoResponse => {
                if (!pandinoResponse) return obsOf(null);
                if (pandinoResponse.error && !pandinoResponse.response) {
                  return obsOf(pandinoResponse.error);
                }
                if (pandinoResponse.response && pandinoResponse.message) {
                  this._tokensService.refreshPandinoTokensEvt.emit();
                  this.snackbar.open('AI Report created successfully', 'AI REPORT CREATED', {
                    duration: 5000,
                  });
                  return this._rd.create(newItem as ReportData);
                }
                return obsOf(null);
              }),
            );
          } else {
            this.snackbar.open('Document created', 'SAVE', {duration: 5000});
            return this._rd.create(newItem as ReportData);
          }
        }),
      )
      .subscribe(_ => {
        this._location.back();
      });

    this.isFormMetricsSelectorValid = this._formMetricsSelector.pipe(
      switchMap(formMetricsSelector => {
        if (formMetricsSelector == null) {
          return obsOf(false);
        }
        return formMetricsSelector.formMetrics.statusChanges.pipe(
          startWith(true),
          switchMap(() => formMetricsSelector.isFormMetricsValid()),
        );
      }),
    );
  }

  /**
   * Triggers the Stepper to move forward to the Form Data step.
   */
  goToDataStep(stepper: MatStepper) {
    stepper.next();
  }

  /**
   * Emits a Report Save event
   */
  saveReport(): void {
    this._saveReportEvt.emit();
  }

  ngOnDestroy() {
    this._saveReportSub.unsubscribe();
    this._saveReportEvt.complete();
  }
}
