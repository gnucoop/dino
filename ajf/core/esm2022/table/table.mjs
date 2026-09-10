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
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SecurityContext, TemplateRef, ViewChild, ViewEncapsulation, } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@ajf/core/common";
import * as i4 from "@angular/common";
import * as i5 from "@angular/material/sort";
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
export class AjfTable {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3RhYmxlL3NyYy90YWJsZS50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdGFibGUvc3JjL3RhYmxlLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sZUFBZSxFQUNmLFdBQVcsRUFDWCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDOzs7Ozs7Ozs7O0lDL0JqQiw2QkFBNkQ7SUFDM0QsNkJBTUM7SUFBQSwwQkFBNEM7SUFBQSxpQkFBSzs7Ozs7OztJQUxoRCxjQUFnQztJQUloQyxBQUhBLEFBREEsaURBQWdDLDJEQUNJLHNDQUdGOztJQUM3QixjQUE4QjtJQUE5QixrRUFBOEI7OztJQUdyQyw2QkFLQztJQUFBLDBCQUE0QztJQUFBLGlCQUFLOzs7O0lBSGhELEFBREEsaURBQWdDLDJEQUNJOztJQUcvQixjQUE4QjtJQUE5QixrRUFBOEI7OztJQWhCekMsNkJBQXdFO0lBVXRFLEFBVEEsdUdBQTZELHlIQVNoQzs7Ozs7SUFUZCxjQUF5QjtJQUFBLEFBQXpCLDJDQUF5QiwrQkFBbUI7OztJQUYvRCwwQkFBa0M7SUFDaEMsd0ZBQXdFO0lBbUIxRSxpQkFBSzs7O0lBbkJrQyxjQUFrQjtJQUFsQiw4Q0FBa0I7Ozs7SUFzQnJELDhCQVFDO0lBREMsc05BQVMscUNBQTJCLEtBQUM7SUFDdEMsaUJBQUs7Ozs7SUFGSixBQUhBLEFBREEsMkNBQTBCLDJEQUNVLCtDQUdaOzs7O0lBUDVCLDBCQUE0QztJQUMxQyxvRkFRQztJQUNILGlCQUFLOzs7SUFSZ0IsY0FBTTtJQUFOLGdDQUFNOzs7SUFIN0IsNkJBQTRDO0lBQzFDLDhFQUE0Qzs7OztJQUF4Qixj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LFdBQVcsbUJBR0osdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSTtxR0FXakMsSUFBSTtrQkFEUCxLQUFLO1lBdUJGLFdBQVc7a0JBRGQsS0FBSztZQVVHLFlBQVk7a0JBRHBCLE1BQU07WUFHMEMsYUFBYTtrQkFBN0QsU0FBUzttQkFBQyxlQUFlLEVBQUUsRUFBQyxJQUFJLEVBQUUsV0FBVyxFQUFDOztrRkExQ3BDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgU2VjdXJpdHlDb250ZXh0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge01hdERpYWxvZywgTWF0RGlhbG9nQ29uZmlnfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtTb3J0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICcuL3RhYmxlLWNlbGwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtdGFibGUnLFxuICB0ZW1wbGF0ZVVybDogJ3RhYmxlLmh0bWwnLFxuICBzdHlsZVVybHM6IFsndGFibGUuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmVGFibGUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICAvKipcbiAgICogZGF0YSB0byBiZSBzaG93biBpbiB0aGUgdGFibGVcbiAgICovXG4gIHByaXZhdGUgX2RhdGE6IEFqZlRhYmxlQ2VsbFtdW10gPSBbXTtcbiAgZ2V0IGRhdGEoKTogQWpmVGFibGVDZWxsW11bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2RhdGE7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRhdGEoZGF0YTogQWpmVGFibGVDZWxsW11bXSkge1xuICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9maXhEYXRhKGRhdGEpO1xuICAgIHRoaXMuX3NvcnRlZERhdGEgPSBbLi4udGhpcy5fZGF0YV07XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNvcnRlZCBkYXRhIHRvIGJlIHNob3duIGluIHRoZSB0YWJsZVxuICAgKi9cbiAgcHJpdmF0ZSBfc29ydGVkRGF0YTogQWpmVGFibGVDZWxsW11bXSA9IFtdO1xuICBnZXQgc29ydGVkRGF0YSgpOiBBamZUYWJsZUNlbGxbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5fc29ydGVkRGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjZWxscGFkZGluZyBmb3IgYWxsIHJvd3MsIGluY2x1ZGUgaGVhZGVyXG4gICAqL1xuICBwcml2YXRlIF9jZWxscGFkZGluZzogc3RyaW5nID0gJyc7XG4gIGdldCBjZWxscGFkZGluZygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9jZWxscGFkZGluZztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY2VsbHBhZGRpbmcoY2VsbHBhZGRpbmc6IHN0cmluZykge1xuICAgIHRoaXMuX2NlbGxwYWRkaW5nID0gY2VsbHBhZGRpbmc7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXQgYW4gZXZlbnQgd2hlbiBzb3J0IGFycm93cyBhcmUgc2VsZWN0ZWRcbiAgICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBzb3J0U2VsZWN0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFNvcnQ+KCk7XG5cbiAgQFZpZXdDaGlsZCgnZGlhbG9nQ29udGVudCcsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pIGRpYWxvZ0NvbnRlbnQhOiBUZW1wbGF0ZVJlZjxIVE1MRWxlbWVudD47XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgVGFibGVDb21wb25lbnQuXG4gICAqXG4gICAqXG4gICAqIEBtZW1iZXJPZiBUYWJsZUNvbXBvbmVudFxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICBwcml2YXRlIF9kaWFsb2c6IE1hdERpYWxvZyxcbiAgKSB7fVxuXG4gIHByaXZhdGUgX2ZpeERhdGEoZGF0YTogQWpmVGFibGVDZWxsW11bXSk6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICAgIChkYXRhIHx8IFtdKS5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgKGVsZW0gfHwgW10pLmZvckVhY2goc3ViRWxlbSA9PiB7XG4gICAgICAgIHN1YkVsZW0udmFsdWUgPSB0aGlzLl9kb21TYW5pdGl6ZXIuc2FuaXRpemUoXG4gICAgICAgICAgU2VjdXJpdHlDb250ZXh0LkhUTUwsXG4gICAgICAgICAgdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKHN1YkVsZW0udmFsdWUpLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICAvKipcbiAgICogU29ydCB2aXNpYmxlIGRhdGEgYW5kIGVtaXQgYW4gZXZlbnQgdG8gdXNlIGZvciBwYWdpbmF0ZWQgdGFibGVcbiAgICogQHBhcmFtIHNvcnRcbiAgICogQHJldHVybnNcbiAgICovXG4gIHNvcnREYXRhKHNvcnQ6IFNvcnQpOiB2b2lkIHtcbiAgICBpZiAoIXNvcnQuYWN0aXZlIHx8IHNvcnQuZGlyZWN0aW9uID09PSAnJykge1xuICAgICAgdGhpcy5fc29ydGVkRGF0YSA9IFsuLi50aGlzLl9kYXRhXTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgY29sdW1uSWR4ID0gcGFyc2VJbnQoc29ydC5hY3RpdmUucmVwbGFjZSgvXlxcRCsvLCAnJykpIHx8IDA7XG4gICAgICBjb25zdCBzb3J0ZWREYXRhID0gdGhpcy5fc29ydGVkRGF0YS5zbGljZSgxKS5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgIGNvbnN0IGlzQXNjID0gc29ydC5kaXJlY3Rpb24gPT09ICdhc2MnO1xuICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZShhW2NvbHVtbklkeF0sIGJbY29sdW1uSWR4XSwgaXNBc2MpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9zb3J0ZWREYXRhID0gW3RoaXMuX2RhdGFbMF0sIC4uLnNvcnRlZERhdGFdO1xuICAgIH1cbiAgICB0aGlzLnNvcnRTZWxlY3RlZC5lbWl0KHNvcnQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGFyZShhOiBBamZUYWJsZUNlbGwsIGI6IEFqZlRhYmxlQ2VsbCwgaXNBc2M6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gKGEudmFsdWUgPCBiLnZhbHVlID8gLTEgOiAxKSAqIChpc0FzYyA/IDEgOiAtMSk7XG4gIH1cblxuICAvKipcbiAgICogb3BlbiBhIGRpYWxvZyB3aGVuIGNsaWNrIG9uIGNlbGwsIGlmIGRpYWxvZ0h0bWxDb250ZW50IGlzIHZhbGlkXG4gICAqIEBwYXJhbSBkaWFsb2dIdG1sQ29udGVudCB0aGUgaHRtbCB0byBzaG93IGluIHRoZSBkaWFsb2dcbiAgICovXG4gIG9wZW5EaWFsb2coZGlhbG9nSHRtbENvbnRlbnQ6IHN0cmluZyB8IHVuZGVmaW5lZCk6IHZvaWQge1xuICAgIGlmIChkaWFsb2dIdG1sQ29udGVudCkge1xuICAgICAgY29uc3QgZGlhbG9nQ29uZmlnID0ge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgY29udGVudDogZGlhbG9nSHRtbENvbnRlbnQsXG4gICAgICAgIH0sXG4gICAgICB9IGFzIE1hdERpYWxvZ0NvbmZpZztcbiAgICAgIHRoaXMuX2RpYWxvZy5vcGVuKHRoaXMuZGlhbG9nQ29udGVudCwgZGlhbG9nQ29uZmlnKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLnNvcnRTZWxlY3RlZC5jb21wbGV0ZSgpO1xuICB9XG59XG4iLCI8dGFibGUgKm5nSWY9XCJzb3J0ZWREYXRhXCIgbWF0U29ydCAobWF0U29ydENoYW5nZSk9XCJzb3J0RGF0YSgkZXZlbnQpXCI+XG4gIDx0ciAqbmdJZj1cInNvcnRlZERhdGEubGVuZ3RoID4gMFwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IGhlYWRlckNlbGwgb2Ygc29ydGVkRGF0YVswXTsgbGV0IGlkeCA9IGluZGV4XCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaGVhZGVyQ2VsbC5zb3J0ZWQ7IGVsc2Ugbm9Tb3J0ZWRIZWFkZXJcIj5cbiAgICAgICAgPHRoXG4gICAgICAgICAgW2FwcGx5U3R5bGVzXT1cImhlYWRlckNlbGwuc3R5bGVcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsncGFkZGluZyc6IGNlbGxwYWRkaW5nfVwiXG4gICAgICAgICAgW2F0dHIuY29sc3Bhbl09XCJoZWFkZXJDZWxsLmNvbHNwYW5cIlxuICAgICAgICAgIFthdHRyLnJvd3NwYW5dPVwiaGVhZGVyQ2VsbC5yb3dzcGFuXCJcbiAgICAgICAgICBbbWF0LXNvcnQtaGVhZGVyXT1cIidjb2x1bW4nICsgaWR4XCJcbiAgICAgICAgPjxzcGFuIFtpbm5lckhUTUxdPVwiaGVhZGVyQ2VsbC52YWx1ZVwiPjwvc3Bhbj48L3RoPlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctdGVtcGxhdGUgI25vU29ydGVkSGVhZGVyPlxuICAgICAgICA8dGhcbiAgICAgICAgICBbYXBwbHlTdHlsZXNdPVwiaGVhZGVyQ2VsbC5zdHlsZVwiXG4gICAgICAgICAgW25nU3R5bGVdPVwieydwYWRkaW5nJzogY2VsbHBhZGRpbmd9XCJcbiAgICAgICAgICBbYXR0ci5jb2xzcGFuXT1cImhlYWRlckNlbGwuY29sc3BhblwiXG4gICAgICAgICAgW2F0dHIucm93c3Bhbl09XCJoZWFkZXJDZWxsLnJvd3NwYW5cIlxuICAgICAgICA+PHNwYW4gW2lubmVySFRNTF09XCJoZWFkZXJDZWxsLnZhbHVlXCI+PC9zcGFuPjwvdGg+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvbmctY29udGFpbmVyPlxuICA8L3RyPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwic29ydGVkRGF0YS5sZW5ndGggPiAxXCI+XG4gICAgPHRyICpuZ0Zvcj1cImxldCByb3cgb2Ygc29ydGVkRGF0YS5zbGljZSgxKVwiPlxuICAgICAgPHRkXG4gICAgICAgICpuZ0Zvcj1cImxldCBjZWxsIG9mIHJvd1wiXG4gICAgICAgIFthcHBseVN0eWxlc109XCJjZWxsLnN0eWxlXCJcbiAgICAgICAgW25nU3R5bGVdPVwieydwYWRkaW5nJzogY2VsbHBhZGRpbmd9XCJcbiAgICAgICAgW2F0dHIuY29sc3Bhbl09XCJjZWxsLmNvbHNwYW5cIlxuICAgICAgICBbYXR0ci5yb3dzcGFuXT1cImNlbGwucm93c3BhblwiXG4gICAgICAgIFtpbm5lckhUTUxdPVwiY2VsbC52YWx1ZVwiXG4gICAgICAgIChjbGljayk9XCJvcGVuRGlhbG9nKGNlbGwuZGlhbG9nSHRtbClcIlxuICAgICAgPjwvdGQ+XG4gICAgPC90cj5cbiAgPC9uZy1jb250YWluZXI+XG48L3RhYmxlPlxuXG48bmctdGVtcGxhdGUgI2RpYWxvZ0NvbnRlbnQgbGV0LWRhdGE+XG4gIDxkaXYgW2lubmVySFRNTF09XCJkYXRhLmNvbnRlbnRcIj48L2Rpdj5cbjwvbmctdGVtcGxhdGU+XG4iXX0=