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
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Case} from '@dino/core/cases';
import {DataModelManager, Metric} from '@dino/core/data';
import {ActionType, FiltersService, ListAction, ListHeader} from '@dino/core/list';
import {ListDataSource} from '@dino/material/list';
import {MetricEditor} from '@dino/material/metric-editor';
import JsBarcode from 'jsbarcode';

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
export class MetricSection<T extends Metric = Metric> implements OnInit, AfterViewInit {
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
   * The Label of the Metric
   */
  metricLabel: string = '';

  /**
   * The Metrics List data sourcev
   */
  dataSource?: ListDataSource<T>;

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
   * Get an image in base64
   * @param url image url
   * @param callback callback function
   */
  private toDataURL(url: string, callback: any) {
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
    // TODO .....
    const logoImagePath = 'assets/icons/logos/logodino.png';
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
  private getCaseImage(metric: Case | null, logo: string | null): void {
    if (metric == null) {
      return;
    }
    // TODO ....
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
  createCardPdf(metric: Case, logo: string | null, caseImage: string | null): void {
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
        table: {
          widths: ['*', '*'],
          body: [
            [
              {image: caseImage, width: 50, border: [false, false, false, false]},
              {image: logo, width: 50, border: [false, false, false, false]},
            ],
          ],
        },
      },
      {
        text: metric.name,
        fontSize: 8,
        bold: true,
        margin: [0, 4, 0, 0],
      },
      {
        text: codeText + ': ' + cardCode,
        fontSize: 7,
        bold: true,
        margin: [0, 0, 0, 4],
      },
      {
        table: {
          widths: ['*', '*'],
          body: [
            [
              {
                image: this.textToBase64Barcode(cardCode),
                width: 80,
                border: [false, false, false, false],
              },
              {qr: cardCode, fit: 50, border: [false, false, false, false]},
            ],
          ],
        },
      },
    ];
    this.createMetricPdf(content, 'landscape').open();
  }

  /**
   * Create and open the pdf card
   * @param content the odf content
   * @param orientation
   */
  private createMetricPdf(content: Content[], orientation?: PageOrientation): TCreatedPdf {
    const pdfDef: TDocumentDefinitions = {
      content,
      pageOrientation: orientation,
      pageSize: 'C8',
      pageMargins: [10, 10, 10, 10],
    };
    return createPdf(pdfDef);
  }
}
