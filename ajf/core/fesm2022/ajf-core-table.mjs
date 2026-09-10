import * as i3 from '@ajf/core/common';
import { AjfCommonModule } from '@ajf/core/common';
import * as i4 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i5 from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import * as i0 from '@angular/core';
import { EventEmitter, SecurityContext, TemplateRef, ViewEncapsulation, ChangeDetectionStrategy, Component, ViewChild, Output, Input, NgModule } from '@angular/core';
import * as i1 from '@angular/platform-browser';
import * as i2 from '@angular/material/dialog';

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
const _c0 = ["dialogContent"];
const _c1 = a0 => ({ "padding": a0 });
function AjfTable_table_0_tr_1_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "th", 7);
    i0.ɵɵelement(2, "span", 8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    const headerCell_r4 = ctx_r2.$implicit;
    const idx_r5 = ctx_r2.index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("applyStyles", headerCell_r4.style)("ngStyle", i0.ɵɵpureFunction1(6, _c1, ctx_r1.cellpadding))("mat-sort-header", "column" + idx_r5);
    i0.ɵɵattribute("colspan", headerCell_r4.colspan)("rowspan", headerCell_r4.rowspan);
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", headerCell_r4.value, i0.ɵɵsanitizeHtml);
} }
function AjfTable_table_0_tr_1_ng_container_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "th", 9);
    i0.ɵɵelement(1, "span", 8);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const headerCell_r4 = i0.ɵɵnextContext().$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("applyStyles", headerCell_r4.style)("ngStyle", i0.ɵɵpureFunction1(5, _c1, ctx_r1.cellpadding));
    i0.ɵɵattribute("colspan", headerCell_r4.colspan)("rowspan", headerCell_r4.rowspan);
    i0.ɵɵadvance();
    i0.ɵɵproperty("innerHTML", headerCell_r4.value, i0.ɵɵsanitizeHtml);
} }
function AjfTable_table_0_tr_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfTable_table_0_tr_1_ng_container_1_ng_container_1_Template, 3, 8, "ng-container", 6)(2, AjfTable_table_0_tr_1_ng_container_1_ng_template_2_Template, 2, 7, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const headerCell_r4 = ctx.$implicit;
    const noSortedHeader_r6 = i0.ɵɵreference(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", headerCell_r4.sorted)("ngIfElse", noSortedHeader_r6);
} }
function AjfTable_table_0_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, AjfTable_table_0_tr_1_ng_container_1_Template, 4, 2, "ng-container", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.sortedData[0]);
} }
function AjfTable_table_0_ng_container_2_tr_1_td_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "td", 11);
    i0.ɵɵlistener("click", function AjfTable_table_0_ng_container_2_tr_1_td_1_Template_td_click_0_listener() { const cell_r8 = i0.ɵɵrestoreView(_r7).$implicit; const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.openDialog(cell_r8.dialogHtml)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cell_r8 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("applyStyles", cell_r8.style)("ngStyle", i0.ɵɵpureFunction1(5, _c1, ctx_r1.cellpadding))("innerHTML", cell_r8.value, i0.ɵɵsanitizeHtml);
    i0.ɵɵattribute("colspan", cell_r8.colspan)("rowspan", cell_r8.rowspan);
} }
function AjfTable_table_0_ng_container_2_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr");
    i0.ɵɵtemplate(1, AjfTable_table_0_ng_container_2_tr_1_td_1_Template, 1, 7, "td", 10);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const row_r9 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", row_r9);
} }
function AjfTable_table_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfTable_table_0_ng_container_2_tr_1_Template, 2, 1, "tr", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.sortedData.slice(1));
} }
function AjfTable_table_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "table", 3);
    i0.ɵɵlistener("matSortChange", function AjfTable_table_0_Template_table_matSortChange_0_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.sortData($event)); });
    i0.ɵɵtemplate(1, AjfTable_table_0_tr_1_Template, 2, 1, "tr", 4)(2, AjfTable_table_0_ng_container_2_Template, 2, 1, "ng-container", 4);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.sortedData.length > 0);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.sortedData.length > 1);
} }
function AjfTable_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 8);
} if (rf & 2) {
    const data_r10 = ctx.$implicit;
    i0.ɵɵproperty("innerHTML", data_r10.content, i0.ɵɵsanitizeHtml);
} }
class AjfTable {
    get data() {
        return this._data;
    }
    set data(data) {
        this._data = this._fixData(data);
        this._sortedData = [...this._data];
        this._cdr.markForCheck();
    }
    get sortedData() {
        return this._sortedData;
    }
    get cellpadding() {
        return this._cellpadding;
    }
    set cellpadding(cellpadding) {
        this._cellpadding = cellpadding;
        this._cdr.markForCheck();
    }
    /**
     * Creates an instance of TableComponent.
     *
     *
     * @memberOf TableComponent
     */
    constructor(_cdr, _domSanitizer, _dialog) {
        this._cdr = _cdr;
        this._domSanitizer = _domSanitizer;
        this._dialog = _dialog;
        /**
         * data to be shown in the table
         */
        this._data = [];
        /**
         * sorted data to be shown in the table
         */
        this._sortedData = [];
        /**
         * cellpadding for all rows, include header
         */
        this._cellpadding = '';
        /**
         * Emit an event when sort arrows are selected
         */
        this.sortSelected = new EventEmitter();
    }
    _fixData(data) {
        (data || []).forEach(elem => {
            (elem || []).forEach(subElem => {
                subElem.value = this._domSanitizer.sanitize(SecurityContext.HTML, this._domSanitizer.bypassSecurityTrustHtml(subElem.value));
            });
        });
        return data;
    }
    /**
     * Sort visible data and emit an event to use for paginated table
     * @param sort
     * @returns
     */
    sortData(sort) {
        if (!sort.active || sort.direction === '') {
            this._sortedData = [...this._data];
        }
        else {
            const columnIdx = parseInt(sort.active.replace(/^\D+/, '')) || 0;
            const sortedData = this._sortedData.slice(1).sort((a, b) => {
                const isAsc = sort.direction === 'asc';
                return this._compare(a[columnIdx], b[columnIdx], isAsc);
            });
            this._sortedData = [this._data[0], ...sortedData];
        }
        this.sortSelected.emit(sort);
    }
    _compare(a, b, isAsc) {
        return (a.value < b.value ? -1 : 1) * (isAsc ? 1 : -1);
    }
    /**
     * open a dialog when click on cell, if dialogHtmlContent is valid
     * @param dialogHtmlContent the html to show in the dialog
     */
    openDialog(dialogHtmlContent) {
        if (dialogHtmlContent) {
            const dialogConfig = {
                data: {
                    content: dialogHtmlContent,
                },
            };
            this._dialog.open(this.dialogContent, dialogConfig);
        }
    }
    ngOnDestroy() {
        this.sortSelected.complete();
    }
    static { this.ɵfac = function AjfTable_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTable)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.DomSanitizer), i0.ɵɵdirectiveInject(i2.MatDialog)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTable, selectors: [["ajf-table"]], viewQuery: function AjfTable_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5, TemplateRef);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dialogContent = _t.first);
        } }, inputs: { data: "data", cellpadding: "cellpadding" }, outputs: { sortSelected: "sortSelected" }, decls: 3, vars: 1, consts: [["dialogContent", ""], ["noSortedHeader", ""], ["matSort", "", 3, "matSortChange", 4, "ngIf"], ["matSort", "", 3, "matSortChange"], [4, "ngIf"], [4, "ngFor", "ngForOf"], [4, "ngIf", "ngIfElse"], [3, "applyStyles", "ngStyle", "mat-sort-header"], [3, "innerHTML"], [3, "applyStyles", "ngStyle"], [3, "applyStyles", "ngStyle", "innerHTML", "click", 4, "ngFor", "ngForOf"], [3, "click", "applyStyles", "ngStyle", "innerHTML"]], template: function AjfTable_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfTable_table_0_Template, 3, 2, "table", 2)(1, AjfTable_ng_template_1_Template, 1, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.sortedData);
        } }, dependencies: [i3.ApplyStylesDirective, i4.NgForOf, i4.NgIf, i4.NgStyle, i5.MatSort, i5.MatSortHeader], styles: ["ajf-table{display:block;width:100%;overflow-x:auto}ajf-table table{min-width:100%}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTable, [{
        type: Component,
        args: [{ selector: 'ajf-table', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table *ngIf=\"sortedData\" matSort (matSortChange)=\"sortData($event)\">\n  <tr *ngIf=\"sortedData.length > 0\">\n    <ng-container *ngFor=\"let headerCell of sortedData[0]; let idx = index\">\n      <ng-container *ngIf=\"headerCell.sorted; else noSortedHeader\">\n        <th\n          [applyStyles]=\"headerCell.style\"\n          [ngStyle]=\"{'padding': cellpadding}\"\n          [attr.colspan]=\"headerCell.colspan\"\n          [attr.rowspan]=\"headerCell.rowspan\"\n          [mat-sort-header]=\"'column' + idx\"\n        ><span [innerHTML]=\"headerCell.value\"></span></th>\n      </ng-container>\n      <ng-template #noSortedHeader>\n        <th\n          [applyStyles]=\"headerCell.style\"\n          [ngStyle]=\"{'padding': cellpadding}\"\n          [attr.colspan]=\"headerCell.colspan\"\n          [attr.rowspan]=\"headerCell.rowspan\"\n        ><span [innerHTML]=\"headerCell.value\"></span></th>\n      </ng-template>\n    </ng-container>\n  </tr>\n  <ng-container *ngIf=\"sortedData.length > 1\">\n    <tr *ngFor=\"let row of sortedData.slice(1)\">\n      <td\n        *ngFor=\"let cell of row\"\n        [applyStyles]=\"cell.style\"\n        [ngStyle]=\"{'padding': cellpadding}\"\n        [attr.colspan]=\"cell.colspan\"\n        [attr.rowspan]=\"cell.rowspan\"\n        [innerHTML]=\"cell.value\"\n        (click)=\"openDialog(cell.dialogHtml)\"\n      ></td>\n    </tr>\n  </ng-container>\n</table>\n\n<ng-template #dialogContent let-data>\n  <div [innerHTML]=\"data.content\"></div>\n</ng-template>\n", styles: ["ajf-table{display:block;width:100%;overflow-x:auto}ajf-table table{min-width:100%}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.DomSanitizer }, { type: i2.MatDialog }], { data: [{
            type: Input
        }], cellpadding: [{
            type: Input
        }], sortSelected: [{
            type: Output
        }], dialogContent: [{
            type: ViewChild,
            args: ['dialogContent', { read: TemplateRef }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTable, { className: "AjfTable", filePath: "table.ts", lineNumber: 48 }); })();

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
class AjfTableModule {
    static { this.ɵfac = function AjfTableModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTableModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfTableModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [AjfCommonModule, CommonModule, MatSortModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTableModule, [{
        type: NgModule,
        args: [{
                imports: [AjfCommonModule, CommonModule, MatSortModule],
                declarations: [AjfTable],
                exports: [AjfTable],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfTableModule, { declarations: [AjfTable], imports: [AjfCommonModule, CommonModule, MatSortModule], exports: [AjfTable] }); })();

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfTable, AjfTableModule };
//# sourceMappingURL=ajf-core-table.mjs.map
