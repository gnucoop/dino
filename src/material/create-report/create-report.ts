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
import {FormControl, FormGroup} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';
import {MetricsService} from '@dino/core/data';
import {ReportData, ReportDataManager, ReportSchema, ReportSchemaManager} from '@dino/core/reports';
import {UserDataManager} from '@dino/core/users';
import {FormMetricSelector} from '@dino/material/form-metric-selector';
import {Observable, of as obsOf, Subscription} from 'rxjs';
import {filter, map, shareReplay, switchMap, withLatestFrom} from 'rxjs/operators';

/**
 * The Report data creation component.
 * Reports data can be created here.
 */
@Component({
  selector: 'dino-create-report',
  styleUrls: ['create-report.css'],
  templateUrl: 'create-report.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CreateReport implements AfterViewInit, OnInit, OnDestroy {
  /**
   * True if no validation errors are encountered in the Metrics selector form
   */
  isFormMetricsSelectorValid: Observable<boolean>;

  /**
   * The Form Group representing the optional report time interval (from/to)
   */
  dateIntervalForm: FormGroup;

  /**
   * True if the Report can have one or more null Metrics.
   * Defaults to false.
   */
  @Input()
  hasOptionalMetrics: boolean = false;

  /**
   * The Metric Selector
   */
  private _formMetricsSelector: Observable<FormMetricSelector | null>;

  /**
   * The Report schema id
   */
  private _reportSchemaId: Observable<string>;

  /**
   * The Report schema object
   */
  private _reportSchema: Observable<ReportSchema>;
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
   * The Form Metrics Selector
   */
  @ViewChildren(FormMetricSelector) formMetricsSelectorComponent: QueryList<FormMetricSelector>;

  constructor(
    private _route: ActivatedRoute,
    private _rs: ReportSchemaManager,
    private _rd: ReportDataManager,
    private _udm: UserDataManager,
    private _location: Location,
    readonly snackbar: MatSnackBar,
    readonly metricsService: MetricsService,
  ) {
    this.dateIntervalForm = new FormGroup({
      'date_start': new FormControl(),
      'date_end': new FormControl(),
    });
  }
  ngOnInit() {
    if (this._rd == null) {
      this._location.back();
      this.snackbar.open('Oops! Something went wrong opening the form', 'ERROR', {duration: 5000});
      throw new Error('No Data manager was provided');
    }

    this._reportSchemaId = this._route.params.pipe(
      map(params => params.report_schema_id),
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
          this._formMetricsSelector,
          this._udm.getActiveUserData(),
        ),
        switchMap(([_, reportSchemaId, formMetricsSelector, userData]) => {
          const dateIntervalValue = this.dateIntervalForm.value;
          let newItem: {[key: string]: any} = {};
          newItem.report_schema_ref_id = reportSchemaId;
          newItem.user_data_ref_id = userData?.id;
          newItem.area_ref_id = null;
          newItem.case_ref_id = null;
          newItem.location_ref_id = null;
          newItem.organization_ref_id = null;
          newItem.project_ref_id = null;
          newItem.metadata = {};
          newItem.date_start = dateIntervalValue.date_start
            ? new Date(dateIntervalValue.date_start).toISOString().split('T')[0]
            : null;
          newItem.date_end = dateIntervalValue.date_end
            ? new Date(dateIntervalValue.date_end).toISOString().split('T')[0]
            : null;
          if (formMetricsSelector != null) {
            const selectedMetrics = formMetricsSelector.selectedMetrics;
            const creationDate = formMetricsSelector.formDate.value.created_at;
            for (let key of Object.keys(selectedMetrics)) {
              const saveKey = `${key}_ref_id`;
              if (selectedMetrics[key].id != null) {
                newItem[saveKey] = selectedMetrics[key].id;
              }
            }
            const formattedDate = new Date(creationDate).toISOString().split('T')[0];
            newItem['created_at'] = formattedDate;
          }
          return this._rd.create(newItem as ReportData);
        }),
      )
      .subscribe(_ => {
        this._location.back();
        this.snackbar.open('Document created', 'SAVE', {duration: 5000});
      });

    this.isFormMetricsSelectorValid = this._formMetricsSelector.pipe(
      switchMap(formMetricsSelector => {
        if (formMetricsSelector == null) {
          return obsOf(false);
        }
        return formMetricsSelector.isFormMetricsValid();
      }),
    );
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
