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

import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {TranslocoService} from '@ngneat/transloco';
import {Subject} from 'rxjs';

const defaultLabels = {
  itemsPerPageLabel: 'Items per page:',
  nextPageLabel: 'Next page',
  previousPageLabel: 'Previous page',
  firstPageLabel: 'First page',
  lastPageLabel: 'Last page',
};

@Injectable()
export class PaginatorIntl implements MatPaginatorIntl {
  readonly changes = new Subject<void>();

  itemsPerPageLabel: string;
  nextPageLabel: string;
  previousPageLabel: string;
  firstPageLabel: string;
  lastPageLabel: string;

  constructor(private ts: TranslocoService) {
    this.getCurrentLabels();
    ts.langChanges$.subscribe(() => {
      this.getCurrentLabels();
      this.changes.next();
    });
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    let amountPages = 1;
    let currentPage = 1;
    if (length > 0) {
      amountPages = Math.ceil(length / pageSize);
      currentPage = page + 1;
    }
    return this.ts.translate(`Page {{page}} of {{pages}}`, {page: currentPage, pages: amountPages});
  }

  private getCurrentLabels(): void {
    for (const k in defaultLabels) {
      const key = k as keyof typeof defaultLabels;
      const label = defaultLabels[key];
      this[key] = this.ts.translate(label);
    }
  }
}
