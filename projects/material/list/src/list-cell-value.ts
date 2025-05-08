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

import {TranslocoService} from '@ajf/core/transloco';
import {Pipe, PipeTransform} from '@angular/core';
import {Model} from '@dino/core/data';
import {ListHeader} from '@dino/core/list';
import {parse, parseISO} from 'date-fns';
import {isFileColumn} from './list-cell-file';
import {ChoicesDicitionary} from './list-datasource';
import {transformDateByLocale} from '@dino/core/langs';

@Pipe({name: 'dinoListCellValue', pure: false})
export class ListCellValue implements PipeTransform {
  constructor(private _ts: TranslocoService) {}

  transform<T extends Model = Model>(
    element: T,
    header: ListHeader<T>,
    choices: ChoicesDicitionary | null | undefined,
  ): string {
    if (header == null || element == null) return '';
    const headerName = header.column.toString();
    const dataEl = element as Model & {data?: {[key: string]: any}};
    const col = header.column.toString() as keyof typeof dataEl;
    let val = header.dataColumn ? (dataEl.data || {})[col] : dataEl[col];
    let isValNaN = Number.isNaN(val);
    let dt = parseISO(isValNaN ? val : {});
    if (!isNaN(dt.valueOf())) {
      return transformDateByLocale(dt, this._ts.getActiveLang(), 'short');
    }
    dt = parse(val, 'yyyy-MM-dd', new Date());
    if (!isNaN(dt.valueOf())) {
      return transformDateByLocale(dt, this._ts.getActiveLang(), 'shortDate');
    }
    if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3,}.*$/.test(val)) {
      dt = new Date(val);
      if (!isNaN(dt.valueOf())) {
        return transformDateByLocale(dt, this._ts.getActiveLang(), 'short');
      }
    }
    if (header.dataColumn && choices && choices[headerName]) {
      let labelItem = choices[headerName].find(ch => ch.value == val);
      if (!labelItem && Array.isArray(val)) {
        const labelItems = val
          .map(v => {
            labelItem = choices[headerName].find(ch => ch.value == v);
            // TODO Slice the label to 30 chars? .slice(0, 30) ?
            return labelItem ? labelItem.label : v;
          })
          .filter(v => v != undefined);
        val = labelItems.length ? labelItems.join(', ') : val;
      } else {
        val = labelItem ? labelItem.label : val;
      }
    }
    if (typeof val === 'object' && !isFileColumn(val) && val != null) {
      val = JSON.stringify(val, null, 2).replace('{', '').replace('}', '');
    }
    return val == null ? '' : val;
  }
}
