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
  createPdf,
  Content,
  PageOrientation,
  TCreatedPdf,
  TDocumentDefinitions,
} from '@ajf/core/pdfmake';
import {TranslocoService} from '@ajf/core/transloco';
import {HttpClient} from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Case} from '@dino/core/cases';
import {DataModelManager, Metric} from '@dino/core/data';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {ListDataSource, SelectionList} from '@dino/material/list';
import {MetricEditor} from '@dino/material/metric-editor';
import JsBarcode from 'jsbarcode';
import {catchError, Observable, Subscription, take, throwError} from 'rxjs';
import {MetricDelete} from './metric-delete';
import {MetricImport} from './metric-import';

/**
 * Dino Metric Section component.
 * Allows the management of a generic Metric by displaying a Metrics
 * list and a Metrics Editor dialog.
 */
@Component({
  selector: 'dino-metric-section',
  templateUrl: './metric-section.html',
  styleUrls: ['metric-section.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class MetricSection<T extends Metric = Metric> implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(SelectionList) list!: SelectionList;

  /**
   * If true, the Metrics List is displayed
   */
  @Input() showList: boolean = true;

  /**
   * If true, the Metrics Editor is available
   */
  @Input() showEditor: boolean = true;

  /**
   * List of the names of fields that cannot be edited by the user
   */
  @Input() readOnlyFields: string[] | null = null;

  /**
   * The Metrics List headers
   */
  @Input() headers: ListHeader<T>[] = [];

  /**
   * The Metrics List available row actions
   */
  @Input() listRowActions: ListAction[] = [];

  /**
   * The Metrics List actions to be performed on a row click
   */
  @Input() onClickRowActions: ActionType[] = [];

  /**
   * Path for logo image for the case card
   */
  @Input() logoImage: string | null = null;

  /**
   * Indicates which bulk actions are available
   */
  readonly bulkActionsAvailable: ('delete' | 'bulkFormEdit' | 'deleteWithCheck')[] | null = [
    'deleteWithCheck',
  ];

  /**
   * A custom action to be performed on bulk delete
   */
  readonly bulkDeleteAction: (row: any) => void = row => this.openDeleteDialog(row);

  /**
   * The Label of the Metric
   */
  metricLabel: string = '';

  /**
   * The Metrics List data sourcev
   */
  dataSource?: ListDataSource<T>;

  /**
   * Subscribes to the value returned by the Delete MatDialog on its closing event
   */
  private _dialogSub: Subscription = Subscription.EMPTY;

  /**
   * The Metric manager
   */
  private _metricManager?: DataModelManager<T>;
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
    private _httpClient: HttpClient,
    public dialog: MatDialog,
    private _ts: TranslocoService,
  ) {}

  ngOnInit(): void {
    if (this._metricManager == null) {
      return;
    }
    this.dataSource = new ListDataSource(this._metricManager, this._filtersService);
  }

  ngAfterViewInit(): void {
    if (this.dataSource == null) {
      return;
    }
    this.dataSource.dataHeaders = this.headers;
  }
  openDialog(metric?: T, action?: 'View' | 'Edit' | 'Create'): void {
    this.dialog.open(MetricEditor, {
      data: {
        metricManager: this._metricManager,
        metricItem: metric,
        metricAction: action,
        readOnlyFields: this.readOnlyFields,
      },
    });
  }

  /**
   * Loads the component to import new metric items.
   * @param metricName
   */
  openImportMetrics(): void {
    if (this.metricLabel) {
      const importDialogRef = this.dialog.open(MetricImport, {
        data: {
          metricManager: this._metricManager,
          metricName: this.metricLabel.toLowerCase(),
        },
      });
      this._dialogSub = importDialogRef
        .afterClosed()
        .pipe(
          catchError(err => throwError(() => err) as Observable<boolean>),
          take(1),
        )
        .subscribe(confirmation => {
          if (isDevMode()) {
            console.log('metrics imported ' + confirmation);
          }
        });
    }
  }

  openDeleteDialog(metrics: T | T[]): void {
    const confirmationDeleteDialogRef = this.dialog.open(MetricDelete, {
      data: {
        metricManager: this._metricManager,
        metricItems: metrics,
      },
    });
    this._dialogSub = confirmationDeleteDialogRef
      .afterClosed()
      .pipe(
        catchError(err => throwError(() => err) as Observable<boolean>),
        take(1),
      )
      .subscribe(confirmation => {
        if (confirmation && this.dataSource) {
          if (!Array.isArray(metrics)) {
            metrics = [metrics];
          }
          this.dataSource.deleteAction(metrics);
        }
      });
  }

  /**
   * Get an image in base64
   * @param url image url
   * @param callback callback function
   */
  private toDataURL(url: string, callback: any) {
    url = url + '?t=' + new Date().getTime();
    this._httpClient.get(url, {responseType: 'blob'}).subscribe(blob => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        callback(reader.result);
      };
    });
  }

  private textToBase64Barcode(text: string) {
    var canvas = document.createElement('canvas');
    JsBarcode(canvas, text, {format: 'CODE39'});
    return canvas.toDataURL('image/png');
  }

  /**
   * Retrieves all elements to print the case card pdf
   * @param metric the case metric to print
   */
  printCaseCardPdf(metric: Case | null): void {
    if (metric == null) {
      return;
    }

    let logoImagePath = 'assets/icons/logos/logodino.png';
    if (this.logoImage) {
      logoImagePath = this.logoImage;
    }
    this.toDataURL(logoImagePath, (dataUrl: any) => {
      this.getCaseImage(metric, dataUrl);
    });
  }

  /**
   * Get the case image in base64 format
   * @param metric the case metric to print
   * @param logo the logo in base64 format
   * @returns
   */
  private getCaseImage(metric: Case | null, logo: string): void {
    if (metric == null) {
      return;
    }
    let imageUrl = 'assets/icons/logos/case-placeholder.png';
    if (metric.image_file != null && metric.image_file.length > 0) {
      imageUrl = metric.image_file;
    }
    this.toDataURL(imageUrl, (dataUrl: any) => {
      this.createCardPdf(metric, logo, dataUrl);
    });
  }

  /**
   * Create the case card pdf
   * @param metric the case metric to print
   * @param logo the logo in base64 format
   * @param caseImage the case image in base64 format
   */
  createCardPdf(metric: Case, logo: string, caseImage: string | null): void {
    const primaryColor = '#1a3e70';
    let translate: (s: string) => string = s => s;
    if (this._ts != null) {
      translate = s => {
        if (s == null || s.trim() === '') {
          return ' ';
        }
        return this._ts.translate(s) as string;
      };
    }

    let cardCode: string = ' ';
    if (metric.metric_data && metric.metric_data['ext_code']) {
      cardCode = metric.metric_data['ext_code'];
    } else if (metric?.code != undefined) {
      cardCode = metric?.code.toString();
    }

    const codeText = translate('Code number');

    const content: Content[] = [
      {
        layout: 'noBorders',
        table: {
          widths: ['35%', '*'],
          heights: 68,
          body: [
            [
              {image: caseImage, fit: [58, 62], margin: [1, 5, 0, 0]},
              [
                {
                  text: metric.name,
                  fontSize: 10,
                  color: primaryColor,
                  bold: true,
                  margin: [0, 15, 0, 0],
                },
                {
                  text: codeText + ': ' + cardCode,
                  fontSize: 9,
                  color: primaryColor,
                  bold: true,
                  margin: [0, 5, 0, 0],
                },
              ],
            ],
          ],
        },
      },
      {
        layout: {
          defaultBorder: false,
        },
        table: {
          widths: ['50%', '*'],
          body: [
            [
              {
                image: this.textToBase64Barcode(cardCode),
                fit: [140, 60],
                border: [false, true, false, false],
                borderColor: ['#000', primaryColor, '#000', '#000'],
                alignment: 'left',
                margin: [0, 5, 0, 5],
              },
              {
                qr: cardCode,
                fit: 50,
                alignment: 'right',
                border: [false, true, false, false],
                borderColor: ['#000', primaryColor, '#000', '#000'],
                margin: [0, 5, 1, 0],
              },
            ],
          ],
        },
      },
      {
        image: logo,
        fit: [230, 120],
        margin: [0, 10, 0, 10],
        pageBreak: 'before',
        alignment: 'center',
      },
    ];
    this.createMetricPdf(content, 'landscape').open();
  }

  /**
   * Create and open the pdf card.
   * Credit card size: 3,375*2.125 inches (in pdf: points = inches * 72)
   * @param content the odf content
   * @param orientation
   */
  private createMetricPdf(content: Content[], orientation?: PageOrientation): TCreatedPdf {
    const pdfDef: TDocumentDefinitions = {
      content,
      pageOrientation: orientation,
      pageSize: {
        width: 243,
        height: 153,
      },
      pageMargins: [10, 5, 10, 5],
    };
    return createPdf(pdfDef);
  }

  ngOnDestroy() {
    this._dialogSub.unsubscribe();
  }
}
