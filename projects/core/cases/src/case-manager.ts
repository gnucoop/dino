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

import {Inject, Injectable} from '@angular/core';
import {DATA_SERVICE, IDataService} from '@dino/core/data';
import {
  CheckMetricPermission,
  DataModelManager,  PermissionContextService,
} from '@dino/core/data';

import {Case, migrationStrategies} from './case';
import {schema} from './case-json';
import {CasesModule} from './cases.module';
import {
  Content,
  createPdf,
  PageOrientation,
  TableCell,
  TCreatedPdf,
  TDocumentDefinitions,
} from '@ajf/core/pdfmake';
import JsBarcode from 'jsbarcode';
import {HttpClient} from '@angular/common/http';
import {TranslocoService} from '@ajf/core/transloco';
import {addMonths} from 'date-fns';
import {transformDateByLocale} from '@dino/core/langs';

/**
 * Service that manages FormData Locations
 */
@Injectable({providedIn: CasesModule})
export class CaseManager extends DataModelManager<Case> {
  constructor(
    @Inject(DATA_SERVICE) dataService: IDataService,
    permissionContextService: PermissionContextService,
    private _httpClient: HttpClient,
    private _ts: TranslocoService,
  ) {
    super(
      {name: 'case', collection: {schema, migrationStrategies}},
      dataService,
      permissionContextService,
      [new CheckMetricPermission<Case>()],
      [{checkName: 'user_metrics', checkKey: 'case'}],
    );
  }

  /**
   * Retrieves all elements to print the case card pdf
   * @param metric the case metric to print
   */
  printCaseCardPdf(metric: Case | null, logoImage: string | null): void {
    if (metric == null) {
      return;
    }

    let logoImagePath = 'assets/icons/logos/logodino.png';
    if (logoImage) {
      logoImagePath = logoImage;
    }
    this.toDataURL(logoImagePath, (dataUrl: any) => {
      this.getCaseImage(metric, dataUrl);
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

    // Card code
    let cardCode: string = ' ';
    if (metric.metric_data && metric.metric_data['ext_code']) {
      cardCode = metric.metric_data['ext_code'];
    } else if (metric?.code != undefined) {
      cardCode = metric?.code.toString();
    }

    const columnWithInfo: TableCell[] = [
      {
        text: metric.name,
        fontSize: 10,
        color: primaryColor,
        bold: true,
        margin: [0, 10, 0, 0],
      },
      {
        text: `${translate('Code number')}: ${cardCode}`,
        fontSize: 9,
        color: primaryColor,
        bold: true,
        margin: [0, 5, 0, 0],
      },
    ];

    // Expire date
    let expiresOn: string | null = this._getExpiresOnDate(metric);
    if (expiresOn) {
      const expiresOnRow = {
        text: `${translate('Expires on')}: ${expiresOn}`,
        fontSize: 8,
        color: primaryColor,
        bold: true,
        margin: [0, 5, 0, 0],
      };
      columnWithInfo.push(expiresOnRow);
    }

    const content: Content[] = [
      {
        layout: 'noBorders',
        table: {
          widths: ['35%', '*'],
          heights: 68,
          body: [[{image: caseImage, fit: [58, 62], margin: [1, 5, 0, 0]}, columnWithInfo]],
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
   * Retrieves the 'expire_in_months' value from the metric_data attributes.
   * If it exists and is a valid number,
   * returns a formatted "expires on" date calculated as today + <expire_in_months> months.
   *
   * @param metric - The metric object containing metric_data.
   * @returns A formatted expiration date string or null.
   */
  private _getExpiresOnDate(metric: Case): string | null {
    let expiresOn: string | null = null;
    if (metric.metric_data && metric.metric_data['expire_in_months'] != null) {
      const expireInMonths = metric.metric_data['expire_in_months'];
      const months = Number(expireInMonths);
      const expiresOnDate = !isNaN(months) && months >= 0 ? addMonths(new Date(), months) : null;
      expiresOn = expiresOnDate
        ? transformDateByLocale(expiresOnDate, this._ts.getActiveLang(), 'shortDate')
        : null;
    }
    return expiresOn;
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
}
