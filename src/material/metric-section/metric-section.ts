import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DataModelManager, Metric} from '@dewco/core/data';
import {FiltersService, ListAction, ListHeader} from '@dewco/core/list';
import {ListDataSource} from '@dewco/material/list';
import {MetricEditor} from '@dewco/material/metric-editor';

/**
 * Dino Metric Section component.
 * Allows the management of a generic Metric by displaying a Metrics
 * list and a Metrics Editor dialog.
 */
@Component({
  selector: 'dewco-metric-section',
  templateUrl: './metric-section.html',
  styleUrls: ['metric-section.css']
})
export class MetricSection<T extends Metric = Metric> implements OnInit {
  /**
   * If true, the Metrics List is displayed
   */
  @Input() readonly showList: boolean = true;

  /**
   * If true, the Metrics Editor is available
   */
  @Input() readonly showEditor: boolean = true;

  /**
   * The Metrics List headers
   */
  @Input() readonly headers: ListHeader<T>[];

  /**
   * The Metrics List available row actions
   */
  @Input() readonly listRowActions: ListAction[];

  /**
   * The Label of the Metric
   */
  metricLabel: string = '';

  /**
   * The Metrics List data sourcev
   */
  dataSource: ListDataSource<T>;

  /**
   * The Metric manager
   */
  private _metricManager: DataModelManager<T>;
  @Input()
  set metricManager(mm: DataModelManager<T>) {
    if (mm == null) {
      return;
    }
    this.metricLabel = mm.collectionName.toUpperCase();
    this._metricManager = mm;
  }

  constructor(
      private _filtersService: FiltersService,
      public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.dataSource = new ListDataSource(
        this._metricManager,
        this._filtersService,
    );
  }

  openDialog(metric?: T, action?: 'view'|'edit'): void {
    this.dialog.open(MetricEditor, {
      data: {
        metricManager: this._metricManager,
        metricItem: metric,
        metricAction: action,
      },
    });
  }
}
