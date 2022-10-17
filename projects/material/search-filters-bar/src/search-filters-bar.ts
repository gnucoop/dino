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

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {DataModelManager, Metric, MetricsService} from '@dino/core/data';
import {FilterItem, FilterListType, FiltersService, SearchFiltersComponent} from '@dino/core/list';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {ExportBottomSheet} from '@dino/material/export-form';
import {SearchFiltersDialog} from '@dino/material/search-filters-dialog';
import {isRxDocument, RxDocument} from 'rxdb';
import {Observable, of as obsOf, Subject, Subscription, throwError} from 'rxjs';
import {catchError, map, switchMap, take, takeUntil, withLatestFrom} from 'rxjs/operators';

/**
 * Opt-in component that handles all SelectionList filters.
 * The filters are obtained by parsing the RxJsonSchema of the model and the ajfFormSchema,
 * if present as a model property.
 * It may contain two child components:
 * dino-search-filters-chips and dino-search-filters-dialog.
 */
@Component({
  selector: 'dino-search-filters-bar',
  styleUrls: ['search-filters-bar.scss'],
  templateUrl: 'search-filters-bar.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: SearchFiltersComponent, useExisting: SearchFiltersBar}],
})
export class SearchFiltersBar extends SearchFiltersComponent implements OnInit, OnDestroy {
  /**
   * All the metrics filters autocomplete options.
   */
  metricFiltersOptions: {[key: string]: Observable<Metric[]>} = {};

  /**
   * Date Picker input filtering methods.
   */
  minDatePicker: (d: Date | null) => boolean;
  maxDatePicker: (d: Date | null) => boolean;

  /**
   * If true, the search filters bar is associated to an aggregation list.
   * Filters availability and disposition in the template will change
   * accordingly.
   */
  @Input() aggregationFilters: boolean = false;

  /**
   * If true, the Preset Manager is available and displayed.
   * Defaults to false.
   */
  private _presetManager: boolean = false;
  get presetManager(): boolean {
    return this._presetManager;
  }
  @Input()
  set presetManager(state: boolean) {
    this._presetManager = state;
  }

  private _exportable = false;
  get exportable() {
    return this._exportable;
  }
  @Input()
  set exportable(state: boolean) {
    this._exportable = state;
  }
  /**
   * If true, the Additional Filters button and dialog
   * are available and displayed.
   * Defaults to true.
   */
  private _additionalFilters: boolean = true;
  get additionalFilters(): boolean {
    return this._additionalFilters;
  }
  @Input()
  set additionalFilters(state: boolean) {
    this._additionalFilters = state;
  }

  /**
   * Allows the customization of the filters dialog width
   */
  private _filtersDialogWidth: number = 95;
  @Input()
  set filtersDialogWidth(w: number) {
    if (w != null && w > 0) {
      this._filtersDialogWidth = w;
    }
  }
  /**
   * A reference to the MatDialog that contains the additionalFilters
   */
  private _dialogRef?: MatDialogRef<SearchFiltersDialog>;

  /**
   * Subscribes to the value returned by the MatDialog on its closing event
   */
  private _dialogSub: Subscription = Subscription.EMPTY;

  /**
   * Main unsub subject.
   * Used for unsubscribing all subscriptions.
   */
  private _mainUnsubscribe: Subject<void> = new Subject();

  constructor(
    readonly metricsService: MetricsService,
    protected _fts: FiltersService,
    public dialog: MatDialog,
    private _cdr: ChangeDetectorRef,
    private _bottomSheet: MatBottomSheet,
    readonly breakpointObserver: BreakpointObserverService,
    @Optional() private _areaManager: AreaManager | null,
    @Optional() private _caseManager: CaseManager | null,
    @Optional() private _projectManager: ProjectManager | null,
    @Optional() private _locationManager: LocationManager | null,
    @Optional() private _organizationManager: OrganizationManager | null,
  ) {
    super();
    this.minDatePicker = (d: Date | null): boolean => {
      const minDate = this.dateSearchFilters.get('dateStart')?.value
        ? new Date(this.dateSearchFilters.get('dateStart')?.value)
        : null;
      if (minDate != null && d != null) {
        return d > minDate;
      }
      return true;
    };
    this.maxDatePicker = (d: Date | null): boolean => {
      const maxDate = this.dateSearchFilters.get('dateEnd')?.value
        ? new Date(this.dateSearchFilters.get('dateEnd')?.value)
        : null;
      if (maxDate != null && d != null) {
        return d < maxDate;
      }
      return true;
    };
  }
  @Output()
  readonly exportEvt: EventEmitter<'XLSX' | 'CSV' | 'dialog'> = new EventEmitter<
    'XLSX' | 'CSV' | 'dialog'
  >();

  ngOnInit() {
    this._initFilters();
    if (this._areaManager != null) {
      this._populateMetricsOptions('area', this._areaManager);
      this._setupMetricDescendants('area', this._areaManager);
    }
    if (this._caseManager != null) {
      this._populateMetricsOptions('case', this._caseManager);
      this._setupMetricDescendants('case', this._caseManager);
    }
    if (this._projectManager != null) {
      this._populateMetricsOptions('project', this._projectManager);
      this._setupMetricDescendants('project', this._projectManager);
    }
    if (this._locationManager != null) {
      this._populateMetricsOptions('location', this._locationManager);
      this._setupMetricDescendants('location', this._locationManager);
    }
    if (this._organizationManager != null) {
      this._populateMetricsOptions('organization', this._organizationManager);
      this._setupMetricDescendants('organization', this._organizationManager);
    }
  }

  /**
   * Opens a dialog with dino-search-filters-dialog component.
   * Aligns the temporary filters list to the additional filters list.
   * Subscribes to Dialog closing event, updating the Additional Filters when
   * the Dialog closing event value is true.
   */
  openDialog() {
    this._fts.resetTemporaryFilters();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = 'dino-search-filters-dialog';
    dialogConfig.minWidth = `${this._filtersDialogWidth}vw`;
    dialogConfig.maxWidth = `${this._filtersDialogWidth}vw`;
    this._dialogRef = this.dialog.open(SearchFiltersDialog, dialogConfig);
    this._dialogSub = this._dialogRef
      .afterClosed()
      .pipe(catchError(err => throwError(() => err) as Observable<boolean>))
      .subscribe((searchFilters: {search: boolean; logic?: 'and' | 'or'}) => {
        if (searchFilters && searchFilters.search) {
          this._fts.updateAdditionalFilters(searchFilters.logic);
        }
      });
  }

  /**
   * Open export dialog
   */
  openExportDialog(): void {
    this.exportEvt.emit('CSV');
  }

  /**
   * Open bottom sheet with export options
   */
  openExportBottomSheet(): void {
    this._bottomSheet
      .open(ExportBottomSheet)
      .afterDismissed()
      .subscribe((ev: 'XLSX' | 'CSV' | 'dialog' | null) => {
        if (ev != null) {
          this.exportEvt.emit(ev);
        }
      });
  }

  /**
   * Asks the FilterService to remove a FilterItem from the selected filter lists
   * @param filterItem The filter item to remove
   * @param listType The list/lists to remove the filter from
   */
  removeFilter(filterItem: FilterItem, listType: FilterListType[] | FilterListType): void {
    this._fts.removeFilter(filterItem, listType);
  }

  /**
   * Returns true if the Form Group refers to an active Metric
   *
   * @param group The FormGroup of the filter
   */
  isMetric(group: FormGroup): boolean {
    if (group == null) {
      return false;
    }
    const groupControlKey = this.getControlKey(group);
    if (groupControlKey == null) {
      return false;
    }
    const activeMetrics = this.metricsService.activeMetrics.value.map(metric => metric.metricName);

    return activeMetrics.indexOf(groupControlKey) >= 0;
  }

  getControlKey(group: FormGroup): string {
    if (group == null) {
      return '';
    }
    const groupControl = Object.keys(group.controls)[0];
    return groupControl;
  }

  /**
   * Displays the Metric Name only in the Metric
   * autocomplete field.
   */
  displayMetricName(metric: Metric): string {
    if (metric == null) {
      return '';
    }
    return metric.name && metric.id ? metric.name : '';
  }

  showOptions(group: FormGroup) {
    const metricType = Object.keys(group.controls)[0];
    const inputControl = this.additionalBasicFilters.find(grp => grp.get(metricType) != null);
    if (inputControl && inputControl.value[metricType] == null) {
      inputControl.setValue({[metricType]: ''});
    }
  }

  /**
   * Sorts Metric options alphabetically by their name property.
   * @param a Prev item
   * @param b Next Item
   * @returns Sort order
   */
  private _sortMetricsAlphabetically(a: RxDocument<Metric>, b: RxDocument<Metric>): number {
    let textA = a.name.toUpperCase();
    let textB = b.name.toUpperCase();
    const less = textA < textB;
    const more = textA > textB;
    if (less) {
      return -1;
    } else if (more) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Populates the autocomplete panels of metric filters with options
   * @param metricType The type of metric
   * @param metricManager The related metric manager
   */
  private _populateMetricsOptions(metricType: string, metricManager: DataModelManager<any>): void {
    if (metricType == null || metricManager == null) {
      return;
    }
    const inputControl = this.additionalBasicFilters.find(group => group.get(metricType) != null);
    const inputValue = inputControl?.get(metricType)?.valueChanges;
    if (inputValue != null) {
      this.metricFiltersOptions[metricType] = inputValue.pipe(
        switchMap(val => {
          if (typeof val === 'string') {
            return metricManager
              .query({selector: {name: {$regex: new RegExp(val, 'i')}, is_deleted: {$ne: true}}})
              .pipe(map(results => results.sort((a, b) => this._sortMetricsAlphabetically(a, b))));
          }
          return [];
        }),
      );
    }
  }

  /**
   * Sets up the subscription to the Metric Fields inputs valuechanges,
   * then sets the value of the field as an array of ids of the selected metric
   * and all of its descendants.
   * @param metricType The type of metric
   * @param metricManager The related metric manager
   */
  private _setupMetricDescendants(metricType: string, metricManager: DataModelManager<any>): void {
    if (metricType == null || metricManager == null) {
      return;
    }
    const inputControl = this.additionalBasicFilters.find(group => group.get(metricType) != null);
    const inputValue = inputControl?.get(metricType)?.valueChanges;
    if (inputControl != null && inputValue != null) {
      inputValue
        .pipe(
          switchMap(inputVal => {
            if (typeof inputVal === 'object' && isRxDocument(inputVal)) {
              return metricManager
                .findDescendants(inputVal.id)
                .pipe(map(desc => desc?.map(d => d.id)))
                .pipe(withLatestFrom(obsOf(inputVal)));
            }
            return obsOf([null, null]);
          }),
          takeUntil(this._mainUnsubscribe),
        )
        .subscribe(([allDescendants, parentMetric]) => {
          if (allDescendants != null && parentMetric != null) {
            inputControl
              ?.get(metricType)
              ?.setValue({id: [parentMetric.id, ...allDescendants], name: parentMetric.name});
          }
        });
    }
  }

  /**
   * Asks the FilterService to initialize the filters and load them from the route
   * queryParams
   */
  private _initFilters() {
    this._fts
      .initializeFilters(this.basicFilters)
      .pipe(
        take(1),
        catchError(err => throwError(() => err) as Observable<FormGroup[]>),
      )
      .subscribe(formGroups => {
        this.basicFilters = [...this.basicFilters, ...formGroups];
        this.additionalBasicFilters = formGroups;
        this.additionalBasicFiltersLabels = this.additionalBasicFilters.map(
          group => Object.keys(group.controls)[0],
        );
        this._cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this._dialogSub.unsubscribe();
    this._mainUnsubscribe.next();
    this._mainUnsubscribe.complete();
  }
}
