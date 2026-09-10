/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { ChangeDetectorRef, EventEmitter, OnDestroy, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { AjfTableCell } from './table-cell';
import * as i0 from "@angular/core";
export declare class AjfTable implements OnDestroy {
    private _cdr;
    private _domSanitizer;
    private _dialog;
    /**
     * data to be shown in the table
     */
    private _data;
    get data(): AjfTableCell[][];
    set data(data: AjfTableCell[][]);
    /**
     * sorted data to be shown in the table
     */
    private _sortedData;
    get sortedData(): AjfTableCell[][];
    /**
     * cellpadding for all rows, include header
     */
    private _cellpadding;
    get cellpadding(): string;
    set cellpadding(cellpadding: string);
    /**
     * Emit an event when sort arrows are selected
     */
    readonly sortSelected: EventEmitter<Sort>;
    dialogContent: TemplateRef<HTMLElement>;
    /**
     * Creates an instance of TableComponent.
     *
     *
     * @memberOf TableComponent
     */
    constructor(_cdr: ChangeDetectorRef, _domSanitizer: DomSanitizer, _dialog: MatDialog);
    private _fixData;
    /**
     * Sort visible data and emit an event to use for paginated table
     * @param sort
     * @returns
     */
    sortData(sort: Sort): void;
    private _compare;
    /**
     * open a dialog when click on cell, if dialogHtmlContent is valid
     * @param dialogHtmlContent the html to show in the dialog
     */
    openDialog(dialogHtmlContent: string | undefined): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTable, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfTable, "ajf-table", never, { "data": { "alias": "data"; "required": false; }; "cellpadding": { "alias": "cellpadding"; "required": false; }; }, { "sortSelected": "sortSelected"; }, never, never, false, never>;
}
//# sourceMappingURL=table.d.ts.map