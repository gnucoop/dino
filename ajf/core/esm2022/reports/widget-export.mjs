import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { format } from 'date-fns';
import { utils, writeFile } from 'xlsx';
import { AjfWidgetType } from './interface/widgets/widget-type';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
const _c0 = ["*"];
function AjfWidgetExport_ng_container_2_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 4)(1, "button", 5);
    i0.ɵɵlistener("click", function AjfWidgetExport_ng_container_2_div_1_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.exportAll()); });
    i0.ɵɵtext(2, "EXPORT XLSX");
    i0.ɵɵelementEnd()();
} }
function AjfWidgetExport_ng_container_2_ng_template_2_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7)(1, "button", 5);
    i0.ɵɵlistener("click", function AjfWidgetExport_ng_container_2_ng_template_2_div_0_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.export("csv")); });
    i0.ɵɵtext(2, "CSV");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "button", 5);
    i0.ɵɵlistener("click", function AjfWidgetExport_ng_container_2_ng_template_2_div_0_Template_button_click_3_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.export("xlsx")); });
    i0.ɵɵtext(4, "XLSX");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵclassProp("ajf-export-menu-overlay", ctx_r1.overlay);
} }
function AjfWidgetExport_ng_container_2_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfWidgetExport_ng_container_2_ng_template_2_div_0_Template, 5, 2, "div", 6);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const single_r4 = i0.ɵɵreference(3);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", !ctx_r1.widgets)("ngIfElse", single_r4);
} }
function AjfWidgetExport_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfWidgetExport_ng_container_2_div_1_Template, 3, 0, "div", 3)(2, AjfWidgetExport_ng_container_2_ng_template_2_Template, 1, 2, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const single_r4 = i0.ɵɵreference(3);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.widgets)("ngIfElse", single_r4);
} }
/**
 * Export all widgets data in Xlsx format, one per sheet
 * @param report the ajf report instance
 * @param iconsMap
 */
export function exportReportXlsx(report, iconsMap) {
    iconsMap = iconsMap ? iconsMap : {};
    const widgetInstances = report && report.content ? report.content.content : undefined;
    return exportAllWidgets(widgetInstances, iconsMap);
}
/**
 * Checks if p is a {x, y, r?} point and eventually formats it as string.
 */
function formatPointData(p) {
    if (typeof p === 'object' && p !== null && p.x !== undefined && p.y !== undefined) {
        if (p.r === undefined) {
            return `(${p.x}, ${p.y})`;
        }
        return `(${p.x}, ${p.y}, ${p.r})`;
    }
    return p;
}
/**
 * Build xlsx data for export
 * @param widgetType
 * @param data
 * @param iconsMap
 */
function buildXlsxData(widgetType, data, iconsMap) {
    let xlsxData = [];
    let labels = [];
    switch (widgetType) {
        default:
        case AjfWidgetType.Chart:
            data = data;
            const datasets = data.datasets || [];
            labels = ['name'].concat(data.labels);
            xlsxData.push(labels);
            for (let i = 0; i < datasets.length; i++) {
                const row = [];
                const data = datasets[i].data || [];
                row.push(datasets[i].label);
                for (let j = 0; j < data.length; j++) {
                    row.push(formatPointData(data[j]));
                }
                xlsxData.push(row);
            }
            break;
        case AjfWidgetType.DynamicTable:
        case AjfWidgetType.Table:
        case AjfWidgetType.PaginatedTable:
            const tableData = data;
            if (tableData.length > 1) {
                xlsxData = [];
                const nextRows = [];
                let nextRow = [];
                let totRowSpan = 0;
                let nextRowspanNum = 0;
                for (let i = 0; i < tableData.length; i++) {
                    let isNewRowAfterRowspan = false;
                    let res = [];
                    nextRow = [];
                    if (totRowSpan > 0) {
                        res = [...nextRows[nextRowspanNum - 1]];
                        isNewRowAfterRowspan = true;
                    }
                    tableData[i].forEach((elem, idxElem) => {
                        let val = elem.value?.changingThisBreaksApplicationSecurity;
                        if (val === undefined) {
                            if (Array.isArray(elem.value)) {
                                val = String(elem.value);
                            }
                            else {
                                val = elem.value;
                            }
                        }
                        if (val != null && iconsMap[val]) {
                            val = iconsMap[val];
                        }
                        res.push(val);
                        if (elem.colspan && elem.colspan > 1) {
                            for (let j = 1; j < elem.colspan; j++) {
                                res.push(' ');
                            }
                        }
                        if (isNewRowAfterRowspan) {
                            if (elem.rowspan && elem.rowspan > 1) {
                                for (let idx = 1; idx < elem.rowspan; idx++) {
                                    nextRow.push(' ');
                                    nextRows[nextRowspanNum] = nextRows[nextRowspanNum].concat(nextRow);
                                }
                            }
                            if (idxElem === tableData[i].length - 1 && nextRowspanNum > 0) {
                                nextRowspanNum++;
                                if (nextRowspanNum === totRowSpan) {
                                    totRowSpan = 0;
                                    nextRowspanNum = 0;
                                }
                            }
                        }
                        else {
                            if (elem.rowspan && elem.rowspan > 1) {
                                totRowSpan = elem.rowspan;
                                nextRowspanNum = 1;
                                for (let idx = 1; idx < elem.rowspan; idx++) {
                                    nextRow.push(' ');
                                    nextRows[idx - 1] = nextRow;
                                }
                            }
                        }
                    });
                    xlsxData.push(res);
                }
            }
            break;
    }
    return xlsxData;
}
function addExportableWidgetsToSheets(widget, iconsMap, sheets) {
    const idx = Object.keys(sheets).length;
    const sheetName = `${idx}_${AjfWidgetType[widget.widgetType]}`;
    switch (widget.widget.widgetType) {
        case AjfWidgetType.Layout:
            const lw = widget;
            lw.content.map(w => addExportableWidgetsToSheets(w, iconsMap, sheets));
            break;
        case AjfWidgetType.Column:
            const cw = widget;
            cw.content.map(w => addExportableWidgetsToSheets(w, iconsMap, sheets));
            break;
        case AjfWidgetType.Chart:
            const chartInstance = widget;
            sheets[sheetName] = utils.aoa_to_sheet(buildXlsxData(chartInstance.widgetType, chartInstance.data, iconsMap));
            break;
        case AjfWidgetType.Text:
            const tw = widget;
            sheets[sheetName] = utils.aoa_to_sheet([[tw.htmlText]]);
            break;
        case AjfWidgetType.Table:
        case AjfWidgetType.DynamicTable:
        case AjfWidgetType.PaginatedTable:
            const tableInstance = widget;
            sheets[sheetName] = utils.aoa_to_sheet(buildXlsxData(tableInstance.widgetType, tableInstance.data, iconsMap));
            break;
    }
}
/**
 * Export all exportable widgets in Xlsx format, one per sheet
 */
function exportAllWidgets(widgets, iconsMap) {
    const bookType = 'xlsx';
    const sheets = {};
    let fileName = `AllWidgets_${format(new Date(), `yyyy-MM-dd`)}`;
    if (widgets && widgets.length) {
        widgets.forEach(instance => {
            addExportableWidgetsToSheets(instance, iconsMap, sheets);
        });
    }
    if (Object.keys(sheets).length) {
        const workBook = { Sheets: sheets, SheetNames: Object.keys(sheets) };
        writeFile(workBook, `${fileName}.${bookType}`, {
            bookType,
            type: 'array',
        });
        return true;
    }
    return false;
}
export class AjfWidgetExport {
    static { this._iconsMap = {}; }
    /**
     * Allows rendering html icons as text.
     */
    static addIcons(icons) {
        AjfWidgetExport._iconsMap = { ...AjfWidgetExport._iconsMap, ...icons };
    }
    constructor() {
        this.overlay = true;
        this.enable = false;
        this.showOverlay = false;
    }
    /**
     * Export widget data in CSV format
     * @deprecated Use `AjfWidgetExport.export` with 'csv' parameter.
     * @breaking-change 13.0.0
     */
    exportCsv() {
        this.export('csv');
    }
    /**
     * Export widget data in Xlsx format
     * @deprecated Use `AjfWidgetExport.export` with 'xlsx' parameter.
     * @breaking-change 13.0.0
     */
    exportXlsx() {
        this.export('xlsx');
    }
    /**
     * Export all widgets data in Xlsx format, one per sheet
     */
    exportAll() {
        exportAllWidgets(this.widgets, AjfWidgetExport._iconsMap);
    }
    /**
     * Export widget data in CSV or Xlsx format
     */
    export(bookType) {
        if (this.widgetType == null) {
            return;
        }
        const sheetName = this._buildTitle(this.widgetType);
        const sheets = {};
        sheets[sheetName] = utils.aoa_to_sheet(buildXlsxData(this.widgetType, this.data, AjfWidgetExport._iconsMap));
        const workBook = { Sheets: sheets, SheetNames: [sheetName] };
        writeFile(workBook, `${sheetName}.${bookType}`, {
            bookType,
            type: 'array',
        });
    }
    _buildTitle(widgetType) {
        return `${AjfWidgetType[widgetType]} ${format(new Date(), `yyyy-MM-dd`)}`;
    }
    static { this.ɵfac = function AjfWidgetExport_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfWidgetExport)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfWidgetExport, selectors: [["ajf-widget-export"]], inputs: { widgetType: "widgetType", data: "data", widgets: "widgets", overlay: "overlay", enable: "enable" }, ngContentSelectors: _c0, decls: 3, vars: 3, consts: [["single", ""], [1, "ajf-widget-wrapper", 3, "mouseenter", "mouseleave"], [4, "ngIf"], ["class", "ajf-export-all", 4, "ngIf", "ngIfElse"], [1, "ajf-export-all"], [3, "click"], ["class", "ajf-export-menu", 3, "ajf-export-menu-overlay", 4, "ngIf", "ngIfElse"], [1, "ajf-export-menu"]], template: function AjfWidgetExport_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵprojectionDef();
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵlistener("mouseenter", function AjfWidgetExport_Template_div_mouseenter_0_listener() { return ctx.showOverlay = true; })("mouseleave", function AjfWidgetExport_Template_div_mouseleave_0_listener() { return ctx.showOverlay = false; });
            i0.ɵɵprojection(1);
            i0.ɵɵtemplate(2, AjfWidgetExport_ng_container_2_Template, 4, 2, "ng-container", 2);
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵclassProp("ajf-show-overlay", ctx.showOverlay);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.enable);
        } }, dependencies: [i1.NgIf], styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-all{position:absolute;right:0}ajf-widget-export .ajf-export-all button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:20px}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper.ajf-show-overlay .ajf-export-menu-overlay{display:block}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfWidgetExport, [{
        type: Component,
        args: [{ selector: 'ajf-widget-export', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<div class=\"ajf-widget-wrapper\" (mouseenter)=\"showOverlay = true\" (mouseleave)=\"showOverlay = false\"\n  [class.ajf-show-overlay]=\"showOverlay\">\n  <ng-content></ng-content>\n  <ng-container *ngIf=\"enable\">\n    <div *ngIf=\"widgets; else single\" class=\"ajf-export-all\">\n      <button (click)=\"exportAll()\">EXPORT XLSX</button>\n    </div>\n    <ng-template #single>\n      <div *ngIf=\"!widgets; else single\" class=\"ajf-export-menu\"\n        [class.ajf-export-menu-overlay]=\"overlay\">\n        <button (click)=\"export('csv')\">CSV</button>\n        <button (click)=\"export('xlsx')\">XLSX</button>\n      </div>\n    </ng-template>\n  </ng-container>\n</div>", styles: ["ajf-widget-export{width:100%;height:inherit}ajf-widget-export .ajf-widget-wrapper{position:relative;height:inherit}ajf-widget-export .ajf-export-all{position:absolute;right:0}ajf-widget-export .ajf-export-all button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-export-menu{position:absolute;right:0;top:20px}ajf-widget-export .ajf-export-menu.ajf-export-menu-overlay{display:none}ajf-widget-export .ajf-export-menu button{margin:.5em;border:none;color:#fff;background-color:#4a403f;padding:7.5px 16px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;cursor:pointer}ajf-widget-export .ajf-widget-wrapper.ajf-show-overlay .ajf-export-menu-overlay{display:block}\n"] }]
    }], () => [], { widgetType: [{
            type: Input
        }], data: [{
            type: Input
        }], widgets: [{
            type: Input
        }], overlay: [{
            type: Input
        }], enable: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfWidgetExport, { className: "AjfWidgetExport", filePath: "widget-export.ts", lineNumber: 238 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWV4cG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMvd2lkZ2V0LWV4cG9ydC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMvd2lkZ2V0LWV4cG9ydC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQUMsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxpQkFBaUIsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUUzRixPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQ2hDLE9BQU8sRUFBQyxLQUFLLEVBQXVCLFNBQVMsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQVMzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUNBQWlDLENBQUM7Ozs7OztJQzlCeEQsQUFERiw4QkFBeUQsZ0JBQ3pCO0lBQXRCLDJMQUFTLGtCQUFXLEtBQUM7SUFBQywyQkFBVztJQUMzQyxBQUQyQyxpQkFBUyxFQUM5Qzs7OztJQUlGLEFBRkYsOEJBQzRDLGdCQUNWO0lBQXhCLHlNQUFTLGNBQU8sS0FBSyxDQUFDLEtBQUM7SUFBQyxtQkFBRztJQUFBLGlCQUFTO0lBQzVDLGlDQUFpQztJQUF6Qix5TUFBUyxjQUFPLE1BQU0sQ0FBQyxLQUFDO0lBQUMsb0JBQUk7SUFDdkMsQUFEdUMsaUJBQVMsRUFDMUM7OztJQUhKLHlEQUF5Qzs7O0lBRDNDLDZGQUM0Qzs7Ozs7SUFEdEIsQUFBaEIsc0NBQWdCLHVCQUFXOzs7SUFMckMsNkJBQTZCO0lBSTNCLEFBSEEsK0VBQXlELG1IQUdwQzs7Ozs7SUFIZixjQUFlO0lBQUEsQUFBZixxQ0FBZSx1QkFBVzs7QURpQ3BDOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLE1BQXlCLEVBQ3pCLFFBQThDO0lBRTlDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ3BDLE1BQU0sZUFBZSxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3RGLE9BQU8sZ0JBQWdCLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFFRDs7R0FFRztBQUNILFNBQVMsZUFBZSxDQUFDLENBQU07SUFDN0IsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQ2xGLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUUsQ0FBQztZQUN0QixPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7UUFDNUIsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0lBQ3BDLENBQUM7SUFDRCxPQUFPLENBQUMsQ0FBQztBQUNYLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQVMsYUFBYSxDQUNwQixVQUFxQyxFQUNyQyxJQUE4QyxFQUM5QyxRQUFrQztJQUVsQyxJQUFJLFFBQVEsR0FBZ0IsRUFBRSxDQUFDO0lBQy9CLElBQUksTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUMxQixRQUFRLFVBQVUsRUFBRSxDQUFDO1FBQ25CLFFBQVE7UUFDUixLQUFLLGFBQWEsQ0FBQyxLQUFLO1lBQ3RCLElBQUksR0FBRyxJQUFpQixDQUFDO1lBQ3pCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDO1lBQ3JDLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBa0IsQ0FBQyxDQUFDO1lBQ2xELFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDekMsTUFBTSxHQUFHLEdBQWMsRUFBRSxDQUFDO2dCQUMxQixNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7Z0JBQ0QsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDO1lBQ0QsTUFBTTtRQUNSLEtBQUssYUFBYSxDQUFDLFlBQVksQ0FBQztRQUNoQyxLQUFLLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDekIsS0FBSyxhQUFhLENBQUMsY0FBYztZQUMvQixNQUFNLFNBQVMsR0FBRyxJQUF3QixDQUFDO1lBQzNDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDekIsUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDZCxNQUFNLFFBQVEsR0FBZ0IsRUFBRSxDQUFDO2dCQUNqQyxJQUFJLE9BQU8sR0FBYyxFQUFFLENBQUM7Z0JBQzVCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO2dCQUV2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUMxQyxJQUFJLG9CQUFvQixHQUFHLEtBQUssQ0FBQztvQkFDakMsSUFBSSxHQUFHLEdBQWMsRUFBRSxDQUFDO29CQUV4QixPQUFPLEdBQUcsRUFBRSxDQUFDO29CQUNiLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRSxDQUFDO3dCQUNuQixHQUFHLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDeEMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO29CQUM5QixDQUFDO29CQUNELFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFrQixFQUFFLE9BQWUsRUFBRSxFQUFFO3dCQUMzRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLHFDQUFxQyxDQUFDO3dCQUM1RCxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUUsQ0FBQzs0QkFDdEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO2dDQUM5QixHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDM0IsQ0FBQztpQ0FBTSxDQUFDO2dDQUNOLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzRCQUNuQixDQUFDO3dCQUNILENBQUM7d0JBQ0QsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDOzRCQUNqQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0QixDQUFDO3dCQUNELEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBRWQsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUM7NEJBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0NBQ3RDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQ2hCLENBQUM7d0JBQ0gsQ0FBQzt3QkFDRCxJQUFJLG9CQUFvQixFQUFFLENBQUM7NEJBQ3pCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDO2dDQUNyQyxLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO29DQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUNsQixRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDdEUsQ0FBQzs0QkFDSCxDQUFDOzRCQUNELElBQUksT0FBTyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLGNBQWMsR0FBRyxDQUFDLEVBQUUsQ0FBQztnQ0FDOUQsY0FBYyxFQUFFLENBQUM7Z0NBQ2pCLElBQUksY0FBYyxLQUFLLFVBQVUsRUFBRSxDQUFDO29DQUNsQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO29DQUNmLGNBQWMsR0FBRyxDQUFDLENBQUM7Z0NBQ3JCLENBQUM7NEJBQ0gsQ0FBQzt3QkFDSCxDQUFDOzZCQUFNLENBQUM7NEJBQ04sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0NBQ3JDLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dDQUMxQixjQUFjLEdBQUcsQ0FBQyxDQUFDO2dDQUNuQixLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO29DQUM1QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29DQUNsQixRQUFRLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztnQ0FDOUIsQ0FBQzs0QkFDSCxDQUFDO3dCQUNILENBQUM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckIsQ0FBQztZQUNILENBQUM7WUFDRCxNQUFNO0lBQ1YsQ0FBQztJQUVELE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFFRCxTQUFTLDRCQUE0QixDQUNuQyxNQUF5QixFQUN6QixRQUFrQyxFQUNsQyxNQUFvQztJQUVwQyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUN2QyxNQUFNLFNBQVMsR0FBRyxHQUFHLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDL0QsUUFBUSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2pDLEtBQUssYUFBYSxDQUFDLE1BQU07WUFDdkIsTUFBTSxFQUFFLEdBQUcsTUFBaUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLDRCQUE0QixDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUN2RSxNQUFNO1FBQ1IsS0FBSyxhQUFhLENBQUMsTUFBTTtZQUN2QixNQUFNLEVBQUUsR0FBRyxNQUFpQyxDQUFDO1lBQzdDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLE1BQU07UUFDUixLQUFLLGFBQWEsQ0FBQyxLQUFLO1lBQ3RCLE1BQU0sYUFBYSxHQUFHLE1BQWdDLENBQUM7WUFDdkQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQ3BDLGFBQWEsQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQ3RFLENBQUM7WUFDRixNQUFNO1FBQ1IsS0FBSyxhQUFhLENBQUMsSUFBSTtZQUNyQixNQUFNLEVBQUUsR0FBRyxNQUErQixDQUFDO1lBQzNDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hELE1BQU07UUFDUixLQUFLLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDekIsS0FBSyxhQUFhLENBQUMsWUFBWSxDQUFDO1FBQ2hDLEtBQUssYUFBYSxDQUFDLGNBQWM7WUFDL0IsTUFBTSxhQUFhLEdBQUcsTUFBZ0MsQ0FBQztZQUN2RCxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FDcEMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FDdEUsQ0FBQztZQUNGLE1BQU07SUFDVixDQUFDO0FBQ0gsQ0FBQztBQUVEOztHQUVHO0FBQ0gsU0FBUyxnQkFBZ0IsQ0FDdkIsT0FBd0MsRUFDeEMsUUFBa0M7SUFFbEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLE1BQU0sTUFBTSxHQUFpQyxFQUFFLENBQUM7SUFDaEQsSUFBSSxRQUFRLEdBQUcsY0FBYyxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxZQUFZLENBQUMsRUFBRSxDQUFDO0lBQ2hFLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUM5QixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ3pCLDRCQUE0QixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLE1BQU0sUUFBUSxHQUFhLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDO1FBQzdFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxRQUFRLElBQUksUUFBUSxFQUFFLEVBQUU7WUFDN0MsUUFBUTtZQUNSLElBQUksRUFBRSxPQUFPO1NBQ2QsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBU0QsTUFBTSxPQUFPLGVBQWU7YUFTWCxjQUFTLEdBQTZCLEVBQUUsQUFBL0IsQ0FBZ0M7SUFFeEQ7O09BRUc7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQStCO1FBQzdDLGVBQWUsQ0FBQyxTQUFTLEdBQUcsRUFBQyxHQUFHLGVBQWUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxLQUFLLEVBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQ7UUFkUyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2YsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUV4QixnQkFBVyxHQUFHLEtBQUssQ0FBQztJQVdMLENBQUM7SUFFaEI7Ozs7T0FJRztJQUNILFNBQVM7UUFDUCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsVUFBVTtRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUztRQUNQLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxRQUF3QjtRQUM3QixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFLENBQUM7WUFDNUIsT0FBTztRQUNULENBQUM7UUFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNwRCxNQUFNLE1BQU0sR0FBaUMsRUFBRSxDQUFDO1FBQ2hELE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUNwQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FDckUsQ0FBQztRQUNGLE1BQU0sUUFBUSxHQUFhLEVBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBQyxDQUFDO1FBQ3JFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxTQUFTLElBQUksUUFBUSxFQUFFLEVBQUU7WUFDOUMsUUFBUTtZQUNSLElBQUksRUFBRSxPQUFPO1NBQ2QsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVPLFdBQVcsQ0FBQyxVQUF5QjtRQUMzQyxPQUFPLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxFQUFFLFlBQVksQ0FBQyxFQUFFLENBQUM7SUFDNUUsQ0FBQztnSEFsRVUsZUFBZTtvRUFBZixlQUFlOztZQzdPNUIsOEJBQ3lDO1lBRHlCLEFBQWxDLHFIQUE0QixJQUFJLElBQUMsd0dBQTZCLEtBQUssSUFBQztZQUVsRyxrQkFBeUI7WUFDekIsa0ZBQTZCO1lBWS9CLGlCQUFNOztZQWRKLG1EQUFzQztZQUV2QixlQUFZO1lBQVosaUNBQVk7OztpRkQwT2hCLGVBQWU7Y0FQM0IsU0FBUzsyQkFDRSxtQkFBbUIsaUJBR2QsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTtvQkFHdEMsVUFBVTtrQkFBbEIsS0FBSztZQUNHLElBQUk7a0JBQVosS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUNHLE9BQU87a0JBQWYsS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSzs7a0ZBTEssZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZUYWJsZUNlbGx9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge0NoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0LCBWaWV3RW5jYXBzdWxhdGlvbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NoYXJ0RGF0YX0gZnJvbSAnY2hhcnQuanMnO1xuaW1wb3J0IHtmb3JtYXR9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7dXRpbHMsIFdvcmtCb29rLCBXb3JrU2hlZXQsIHdyaXRlRmlsZX0gZnJvbSAneGxzeCc7XG5pbXBvcnQge0FqZlJlcG9ydEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9yZXBvcnRzLWluc3RhbmNlcy9yZXBvcnQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZDaGFydFdpZGdldEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9jaGFydC13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZDb2x1bW5XaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvY29sdW1uLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkxheW91dFdpZGdldEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9sYXlvdXQtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGFibGVXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvdGFibGUtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGV4dFdpZGdldEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy90ZXh0LXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldpZGdldEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UnO1xuXG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuXG4vKipcbiAqIEV4cG9ydCBhbGwgd2lkZ2V0cyBkYXRhIGluIFhsc3ggZm9ybWF0LCBvbmUgcGVyIHNoZWV0XG4gKiBAcGFyYW0gcmVwb3J0IHRoZSBhamYgcmVwb3J0IGluc3RhbmNlXG4gKiBAcGFyYW0gaWNvbnNNYXBcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cG9ydFJlcG9ydFhsc3goXG4gIHJlcG9ydDogQWpmUmVwb3J0SW5zdGFuY2UsXG4gIGljb25zTWFwOiB7W2h0bWw6IHN0cmluZ106IHN0cmluZ30gfCB1bmRlZmluZWQsXG4pOiBib29sZWFuIHtcbiAgaWNvbnNNYXAgPSBpY29uc01hcCA/IGljb25zTWFwIDoge307XG4gIGNvbnN0IHdpZGdldEluc3RhbmNlcyA9IHJlcG9ydCAmJiByZXBvcnQuY29udGVudCA/IHJlcG9ydC5jb250ZW50LmNvbnRlbnQgOiB1bmRlZmluZWQ7XG4gIHJldHVybiBleHBvcnRBbGxXaWRnZXRzKHdpZGdldEluc3RhbmNlcywgaWNvbnNNYXApO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBwIGlzIGEge3gsIHksIHI/fSBwb2ludCBhbmQgZXZlbnR1YWxseSBmb3JtYXRzIGl0IGFzIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZm9ybWF0UG9pbnREYXRhKHA6IGFueSk6IGFueSB7XG4gIGlmICh0eXBlb2YgcCA9PT0gJ29iamVjdCcgJiYgcCAhPT0gbnVsbCAmJiBwLnggIT09IHVuZGVmaW5lZCAmJiBwLnkgIT09IHVuZGVmaW5lZCkge1xuICAgIGlmIChwLnIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGAoJHtwLnh9LCAke3AueX0pYDtcbiAgICB9XG4gICAgcmV0dXJuIGAoJHtwLnh9LCAke3AueX0sICR7cC5yfSlgO1xuICB9XG4gIHJldHVybiBwO1xufVxuXG4vKipcbiAqIEJ1aWxkIHhsc3ggZGF0YSBmb3IgZXhwb3J0XG4gKiBAcGFyYW0gd2lkZ2V0VHlwZVxuICogQHBhcmFtIGRhdGFcbiAqIEBwYXJhbSBpY29uc01hcFxuICovXG5mdW5jdGlvbiBidWlsZFhsc3hEYXRhKFxuICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlIHwgdW5kZWZpbmVkLFxuICBkYXRhOiBDaGFydERhdGEgfCBBamZUYWJsZUNlbGxbXVtdIHwgdW5kZWZpbmVkLFxuICBpY29uc01hcDoge1todG1sOiBzdHJpbmddOiBzdHJpbmd9LFxuKTogdW5rbm93bltdW10ge1xuICBsZXQgeGxzeERhdGE6IHVua25vd25bXVtdID0gW107XG4gIGxldCBsYWJlbHM6IHN0cmluZ1tdID0gW107XG4gIHN3aXRjaCAod2lkZ2V0VHlwZSkge1xuICAgIGRlZmF1bHQ6XG4gICAgY2FzZSBBamZXaWRnZXRUeXBlLkNoYXJ0OlxuICAgICAgZGF0YSA9IGRhdGEgYXMgQ2hhcnREYXRhO1xuICAgICAgY29uc3QgZGF0YXNldHMgPSBkYXRhLmRhdGFzZXRzIHx8IFtdO1xuICAgICAgbGFiZWxzID0gWyduYW1lJ10uY29uY2F0KGRhdGEubGFiZWxzIGFzIHN0cmluZ1tdKTtcbiAgICAgIHhsc3hEYXRhLnB1c2gobGFiZWxzKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YXNldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3Qgcm93OiB1bmtub3duW10gPSBbXTtcbiAgICAgICAgY29uc3QgZGF0YSA9IGRhdGFzZXRzW2ldLmRhdGEgfHwgW107XG4gICAgICAgIHJvdy5wdXNoKGRhdGFzZXRzW2ldLmxhYmVsKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgcm93LnB1c2goZm9ybWF0UG9pbnREYXRhKGRhdGFbal0pKTtcbiAgICAgICAgfVxuICAgICAgICB4bHN4RGF0YS5wdXNoKHJvdyk7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFqZldpZGdldFR5cGUuRHluYW1pY1RhYmxlOlxuICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5UYWJsZTpcbiAgICBjYXNlIEFqZldpZGdldFR5cGUuUGFnaW5hdGVkVGFibGU6XG4gICAgICBjb25zdCB0YWJsZURhdGEgPSBkYXRhIGFzIEFqZlRhYmxlQ2VsbFtdW107XG4gICAgICBpZiAodGFibGVEYXRhLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgeGxzeERhdGEgPSBbXTtcbiAgICAgICAgY29uc3QgbmV4dFJvd3M6IHVua25vd25bXVtdID0gW107XG4gICAgICAgIGxldCBuZXh0Um93OiB1bmtub3duW10gPSBbXTtcbiAgICAgICAgbGV0IHRvdFJvd1NwYW4gPSAwO1xuICAgICAgICBsZXQgbmV4dFJvd3NwYW5OdW0gPSAwO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGVEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgbGV0IGlzTmV3Um93QWZ0ZXJSb3dzcGFuID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHJlczogdW5rbm93bltdID0gW107XG5cbiAgICAgICAgICBuZXh0Um93ID0gW107XG4gICAgICAgICAgaWYgKHRvdFJvd1NwYW4gPiAwKSB7XG4gICAgICAgICAgICByZXMgPSBbLi4ubmV4dFJvd3NbbmV4dFJvd3NwYW5OdW0gLSAxXV07XG4gICAgICAgICAgICBpc05ld1Jvd0FmdGVyUm93c3BhbiA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRhYmxlRGF0YVtpXS5mb3JFYWNoKChlbGVtOiBBamZUYWJsZUNlbGwsIGlkeEVsZW06IG51bWJlcikgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbCA9IGVsZW0udmFsdWU/LmNoYW5naW5nVGhpc0JyZWFrc0FwcGxpY2F0aW9uU2VjdXJpdHk7XG4gICAgICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZWxlbS52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBTdHJpbmcoZWxlbS52YWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFsID0gZWxlbS52YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbCAhPSBudWxsICYmIGljb25zTWFwW3ZhbF0pIHtcbiAgICAgICAgICAgICAgdmFsID0gaWNvbnNNYXBbdmFsXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcy5wdXNoKHZhbCk7XG5cbiAgICAgICAgICAgIGlmIChlbGVtLmNvbHNwYW4gJiYgZWxlbS5jb2xzcGFuID4gMSkge1xuICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IGVsZW0uY29sc3BhbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgcmVzLnB1c2goJyAnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzTmV3Um93QWZ0ZXJSb3dzcGFuKSB7XG4gICAgICAgICAgICAgIGlmIChlbGVtLnJvd3NwYW4gJiYgZWxlbS5yb3dzcGFuID4gMSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGVsZW0ucm93c3BhbjsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICAgIG5leHRSb3cucHVzaCgnICcpO1xuICAgICAgICAgICAgICAgICAgbmV4dFJvd3NbbmV4dFJvd3NwYW5OdW1dID0gbmV4dFJvd3NbbmV4dFJvd3NwYW5OdW1dLmNvbmNhdChuZXh0Um93KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGlkeEVsZW0gPT09IHRhYmxlRGF0YVtpXS5sZW5ndGggLSAxICYmIG5leHRSb3dzcGFuTnVtID4gMCkge1xuICAgICAgICAgICAgICAgIG5leHRSb3dzcGFuTnVtKys7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRSb3dzcGFuTnVtID09PSB0b3RSb3dTcGFuKSB7XG4gICAgICAgICAgICAgICAgICB0b3RSb3dTcGFuID0gMDtcbiAgICAgICAgICAgICAgICAgIG5leHRSb3dzcGFuTnVtID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChlbGVtLnJvd3NwYW4gJiYgZWxlbS5yb3dzcGFuID4gMSkge1xuICAgICAgICAgICAgICAgIHRvdFJvd1NwYW4gPSBlbGVtLnJvd3NwYW47XG4gICAgICAgICAgICAgICAgbmV4dFJvd3NwYW5OdW0gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGVsZW0ucm93c3BhbjsgaWR4KyspIHtcbiAgICAgICAgICAgICAgICAgIG5leHRSb3cucHVzaCgnICcpO1xuICAgICAgICAgICAgICAgICAgbmV4dFJvd3NbaWR4IC0gMV0gPSBuZXh0Um93O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHhsc3hEYXRhLnB1c2gocmVzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gIH1cblxuICByZXR1cm4geGxzeERhdGE7XG59XG5cbmZ1bmN0aW9uIGFkZEV4cG9ydGFibGVXaWRnZXRzVG9TaGVldHMoXG4gIHdpZGdldDogQWpmV2lkZ2V0SW5zdGFuY2UsXG4gIGljb25zTWFwOiB7W2h0bWw6IHN0cmluZ106IHN0cmluZ30sXG4gIHNoZWV0czoge1tzaGVldDogc3RyaW5nXTogV29ya1NoZWV0fSxcbik6IHZvaWQge1xuICBjb25zdCBpZHggPSBPYmplY3Qua2V5cyhzaGVldHMpLmxlbmd0aDtcbiAgY29uc3Qgc2hlZXROYW1lID0gYCR7aWR4fV8ke0FqZldpZGdldFR5cGVbd2lkZ2V0LndpZGdldFR5cGVdfWA7XG4gIHN3aXRjaCAod2lkZ2V0LndpZGdldC53aWRnZXRUeXBlKSB7XG4gICAgY2FzZSBBamZXaWRnZXRUeXBlLkxheW91dDpcbiAgICAgIGNvbnN0IGx3ID0gd2lkZ2V0IGFzIEFqZkxheW91dFdpZGdldEluc3RhbmNlO1xuICAgICAgbHcuY29udGVudC5tYXAodyA9PiBhZGRFeHBvcnRhYmxlV2lkZ2V0c1RvU2hlZXRzKHcsIGljb25zTWFwLCBzaGVldHMpKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5Db2x1bW46XG4gICAgICBjb25zdCBjdyA9IHdpZGdldCBhcyBBamZDb2x1bW5XaWRnZXRJbnN0YW5jZTtcbiAgICAgIGN3LmNvbnRlbnQubWFwKHcgPT4gYWRkRXhwb3J0YWJsZVdpZGdldHNUb1NoZWV0cyh3LCBpY29uc01hcCwgc2hlZXRzKSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFqZldpZGdldFR5cGUuQ2hhcnQ6XG4gICAgICBjb25zdCBjaGFydEluc3RhbmNlID0gd2lkZ2V0IGFzIEFqZkNoYXJ0V2lkZ2V0SW5zdGFuY2U7XG4gICAgICBzaGVldHNbc2hlZXROYW1lXSA9IHV0aWxzLmFvYV90b19zaGVldChcbiAgICAgICAgYnVpbGRYbHN4RGF0YShjaGFydEluc3RhbmNlLndpZGdldFR5cGUsIGNoYXJ0SW5zdGFuY2UuZGF0YSwgaWNvbnNNYXApLFxuICAgICAgKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5UZXh0OlxuICAgICAgY29uc3QgdHcgPSB3aWRnZXQgYXMgQWpmVGV4dFdpZGdldEluc3RhbmNlO1xuICAgICAgc2hlZXRzW3NoZWV0TmFtZV0gPSB1dGlscy5hb2FfdG9fc2hlZXQoW1t0dy5odG1sVGV4dF1dKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5UYWJsZTpcbiAgICBjYXNlIEFqZldpZGdldFR5cGUuRHluYW1pY1RhYmxlOlxuICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5QYWdpbmF0ZWRUYWJsZTpcbiAgICAgIGNvbnN0IHRhYmxlSW5zdGFuY2UgPSB3aWRnZXQgYXMgQWpmVGFibGVXaWRnZXRJbnN0YW5jZTtcbiAgICAgIHNoZWV0c1tzaGVldE5hbWVdID0gdXRpbHMuYW9hX3RvX3NoZWV0KFxuICAgICAgICBidWlsZFhsc3hEYXRhKHRhYmxlSW5zdGFuY2Uud2lkZ2V0VHlwZSwgdGFibGVJbnN0YW5jZS5kYXRhLCBpY29uc01hcCksXG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuLyoqXG4gKiBFeHBvcnQgYWxsIGV4cG9ydGFibGUgd2lkZ2V0cyBpbiBYbHN4IGZvcm1hdCwgb25lIHBlciBzaGVldFxuICovXG5mdW5jdGlvbiBleHBvcnRBbGxXaWRnZXRzKFxuICB3aWRnZXRzOiBBamZXaWRnZXRJbnN0YW5jZVtdIHwgdW5kZWZpbmVkLFxuICBpY29uc01hcDoge1todG1sOiBzdHJpbmddOiBzdHJpbmd9LFxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IGJvb2tUeXBlID0gJ3hsc3gnO1xuICBjb25zdCBzaGVldHM6IHtbc2hlZXQ6IHN0cmluZ106IFdvcmtTaGVldH0gPSB7fTtcbiAgbGV0IGZpbGVOYW1lID0gYEFsbFdpZGdldHNfJHtmb3JtYXQobmV3IERhdGUoKSwgYHl5eXktTU0tZGRgKX1gO1xuICBpZiAod2lkZ2V0cyAmJiB3aWRnZXRzLmxlbmd0aCkge1xuICAgIHdpZGdldHMuZm9yRWFjaChpbnN0YW5jZSA9PiB7XG4gICAgICBhZGRFeHBvcnRhYmxlV2lkZ2V0c1RvU2hlZXRzKGluc3RhbmNlLCBpY29uc01hcCwgc2hlZXRzKTtcbiAgICB9KTtcbiAgfVxuICBpZiAoT2JqZWN0LmtleXMoc2hlZXRzKS5sZW5ndGgpIHtcbiAgICBjb25zdCB3b3JrQm9vazogV29ya0Jvb2sgPSB7U2hlZXRzOiBzaGVldHMsIFNoZWV0TmFtZXM6IE9iamVjdC5rZXlzKHNoZWV0cyl9O1xuICAgIHdyaXRlRmlsZSh3b3JrQm9vaywgYCR7ZmlsZU5hbWV9LiR7Ym9va1R5cGV9YCwge1xuICAgICAgYm9va1R5cGUsXG4gICAgICB0eXBlOiAnYXJyYXknLFxuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXdpZGdldC1leHBvcnQnLFxuICB0ZW1wbGF0ZVVybDogJ3dpZGdldC1leHBvcnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWyd3aWRnZXQtZXhwb3J0LnNjc3MnXSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZldpZGdldEV4cG9ydCB7XG4gIEBJbnB1dCgpIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUgfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIGRhdGE6IENoYXJ0RGF0YSB8IEFqZlRhYmxlQ2VsbFtdW10gfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIHdpZGdldHM6IEFqZldpZGdldEluc3RhbmNlW10gfCB1bmRlZmluZWQ7XG4gIEBJbnB1dCgpIG92ZXJsYXkgPSB0cnVlO1xuICBASW5wdXQoKSBlbmFibGUgPSBmYWxzZTtcblxuICBzaG93T3ZlcmxheSA9IGZhbHNlO1xuXG4gIHByaXZhdGUgc3RhdGljIF9pY29uc01hcDoge1todG1sOiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG5cbiAgLyoqXG4gICAqIEFsbG93cyByZW5kZXJpbmcgaHRtbCBpY29ucyBhcyB0ZXh0LlxuICAgKi9cbiAgc3RhdGljIGFkZEljb25zKGljb25zOiB7W2h0bWw6IHN0cmluZ106IHN0cmluZ30pIHtcbiAgICBBamZXaWRnZXRFeHBvcnQuX2ljb25zTWFwID0gey4uLkFqZldpZGdldEV4cG9ydC5faWNvbnNNYXAsIC4uLmljb25zfTtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICAvKipcbiAgICogRXhwb3J0IHdpZGdldCBkYXRhIGluIENTViBmb3JtYXRcbiAgICogQGRlcHJlY2F0ZWQgVXNlIGBBamZXaWRnZXRFeHBvcnQuZXhwb3J0YCB3aXRoICdjc3YnIHBhcmFtZXRlci5cbiAgICogQGJyZWFraW5nLWNoYW5nZSAxMy4wLjBcbiAgICovXG4gIGV4cG9ydENzdigpOiB2b2lkIHtcbiAgICB0aGlzLmV4cG9ydCgnY3N2Jyk7XG4gIH1cblxuICAvKipcbiAgICogRXhwb3J0IHdpZGdldCBkYXRhIGluIFhsc3ggZm9ybWF0XG4gICAqIEBkZXByZWNhdGVkIFVzZSBgQWpmV2lkZ2V0RXhwb3J0LmV4cG9ydGAgd2l0aCAneGxzeCcgcGFyYW1ldGVyLlxuICAgKiBAYnJlYWtpbmctY2hhbmdlIDEzLjAuMFxuICAgKi9cbiAgZXhwb3J0WGxzeCgpOiB2b2lkIHtcbiAgICB0aGlzLmV4cG9ydCgneGxzeCcpO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCBhbGwgd2lkZ2V0cyBkYXRhIGluIFhsc3ggZm9ybWF0LCBvbmUgcGVyIHNoZWV0XG4gICAqL1xuICBleHBvcnRBbGwoKTogdm9pZCB7XG4gICAgZXhwb3J0QWxsV2lkZ2V0cyh0aGlzLndpZGdldHMsIEFqZldpZGdldEV4cG9ydC5faWNvbnNNYXApO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cG9ydCB3aWRnZXQgZGF0YSBpbiBDU1Ygb3IgWGxzeCBmb3JtYXRcbiAgICovXG4gIGV4cG9ydChib29rVHlwZTogJ2NzdicgfCAneGxzeCcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy53aWRnZXRUeXBlID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc2hlZXROYW1lID0gdGhpcy5fYnVpbGRUaXRsZSh0aGlzLndpZGdldFR5cGUpO1xuICAgIGNvbnN0IHNoZWV0czoge1tzaGVldDogc3RyaW5nXTogV29ya1NoZWV0fSA9IHt9O1xuICAgIHNoZWV0c1tzaGVldE5hbWVdID0gdXRpbHMuYW9hX3RvX3NoZWV0KFxuICAgICAgYnVpbGRYbHN4RGF0YSh0aGlzLndpZGdldFR5cGUsIHRoaXMuZGF0YSwgQWpmV2lkZ2V0RXhwb3J0Ll9pY29uc01hcCksXG4gICAgKTtcbiAgICBjb25zdCB3b3JrQm9vazogV29ya0Jvb2sgPSB7U2hlZXRzOiBzaGVldHMsIFNoZWV0TmFtZXM6IFtzaGVldE5hbWVdfTtcbiAgICB3cml0ZUZpbGUod29ya0Jvb2ssIGAke3NoZWV0TmFtZX0uJHtib29rVHlwZX1gLCB7XG4gICAgICBib29rVHlwZSxcbiAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZFRpdGxlKHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUpOiBzdHJpbmcge1xuICAgIHJldHVybiBgJHtBamZXaWRnZXRUeXBlW3dpZGdldFR5cGVdfSAke2Zvcm1hdChuZXcgRGF0ZSgpLCBgeXl5eS1NTS1kZGApfWA7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJhamYtd2lkZ2V0LXdyYXBwZXJcIiAobW91c2VlbnRlcik9XCJzaG93T3ZlcmxheSA9IHRydWVcIiAobW91c2VsZWF2ZSk9XCJzaG93T3ZlcmxheSA9IGZhbHNlXCJcbiAgW2NsYXNzLmFqZi1zaG93LW92ZXJsYXldPVwic2hvd092ZXJsYXlcIj5cbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiZW5hYmxlXCI+XG4gICAgPGRpdiAqbmdJZj1cIndpZGdldHM7IGVsc2Ugc2luZ2xlXCIgY2xhc3M9XCJhamYtZXhwb3J0LWFsbFwiPlxuICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZXhwb3J0QWxsKClcIj5FWFBPUlQgWExTWDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxuZy10ZW1wbGF0ZSAjc2luZ2xlPlxuICAgICAgPGRpdiAqbmdJZj1cIiF3aWRnZXRzOyBlbHNlIHNpbmdsZVwiIGNsYXNzPVwiYWpmLWV4cG9ydC1tZW51XCJcbiAgICAgICAgW2NsYXNzLmFqZi1leHBvcnQtbWVudS1vdmVybGF5XT1cIm92ZXJsYXlcIj5cbiAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiZXhwb3J0KCdjc3YnKVwiPkNTVjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIChjbGljayk9XCJleHBvcnQoJ3hsc3gnKVwiPlhMU1g8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvbmctdGVtcGxhdGU+XG4gIDwvbmctY29udGFpbmVyPlxuPC9kaXY+Il19