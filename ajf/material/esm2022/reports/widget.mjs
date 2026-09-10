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
import { AjfBaseWidgetComponent, AjfReportWidget as CoreComponent, AjfWidgetService as CoreService, AjfWidgetType as wt, } from '@ajf/core/reports';
import { ChangeDetectionStrategy, Component, EventEmitter, Injectable, Output, TemplateRef, ViewChild, ViewEncapsulation, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AjfChartWidgetComponent } from './chart-widget';
import { AjfFormulaWidgetComponent } from './formula-widget';
import { AjfGraphWidgetComponent } from './graph-widget';
import { AjfHeatMapWidgetComponent } from './heat-map-widget';
import { AjfImageContainerWidgetComponent } from './image-container-widget';
import { AjfImageWidgetComponent } from './image-widget';
import { AjfMapWidgetComponent } from './map-widget';
import { AjfPageBreakWidgetComponent } from './page-break-widget';
import { AjfTableWidgetComponent } from './table-widget';
import { AjfTextWidgetComponent } from './text-widget';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@ajf/core/reports";
import * as i3 from "./filter-widget";
import * as i4 from "@angular/material/dialog";
import * as i5 from "@ajf/core/table";
import * as i6 from "@angular/material/form-field";
import * as i7 from "@angular/material/select";
import * as i8 from "@angular/material/core";
import * as i9 from "@ngneat/transloco";
function AjfReportWidget_ajf_filter_widget_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ajf-filter-widget", 2);
    i0.ɵɵlistener("filteredInstance", function AjfReportWidget_ajf_filter_widget_0_Template_ajf_filter_widget_filteredInstance_0_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.instance = $event); })("filterWidgetChange", function AjfReportWidget_ajf_filter_widget_0_Template_ajf_filter_widget_filterWidgetChange_0_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.filterWidgetChanged($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("instance", ctx_r1.instance);
} }
function AjfReportWidget_ng_template_1_Template(rf, ctx) { }
function AjfColumnWidgetComponent_div_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "ajf-widget", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const w_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("instance", w_r1);
} }
function AjfColumnWidgetComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, AjfColumnWidgetComponent_div_0_ng_container_1_Template, 2, 1, "ng-container", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.content);
} }
const _c0 = (a0, a1) => ({ "flex-grow": a0, "flex-basis": a1 });
function AjfLayoutWidgetComponent_div_0_div_1_ng_container_1_ajf_widget_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-widget", 6);
} if (rf & 2) {
    const cc_r1 = ctx.ngIf;
    i0.ɵɵproperty("instance", cc_r1);
} }
function AjfLayoutWidgetComponent_div_0_div_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfLayoutWidgetComponent_div_0_div_1_ng_container_1_ajf_widget_1_Template, 1, 1, "ajf-widget", 5);
    i0.ɵɵpipe(2, "ajfGetColumnContent");
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const idx_r2 = i0.ɵɵnextContext().index;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind2(2, 1, ctx_r2.instance, idx_r2));
} }
function AjfLayoutWidgetComponent_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 3);
    i0.ɵɵtemplate(1, AjfLayoutWidgetComponent_div_0_div_1_ng_container_1_Template, 3, 4, "ng-container", 4);
    i0.ɵɵpipe(2, "async");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const column_r4 = ctx.$implicit;
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngStyle", i0.ɵɵpureFunction2(4, _c0, column_r4 > -1 ? 1 : null, column_r4 > -1 ? column_r4 * 100 + "%" : null));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(2, 2, ctx_r2.allcolumnsRendered$));
} }
function AjfLayoutWidgetComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, AjfLayoutWidgetComponent_div_0_div_1_Template, 3, 7, "div", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r2.instance.widget.columns);
} }
const _c1 = ["dialogContent"];
function AjfDialogWidgetComponent_a_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "a", 2);
    i0.ɵɵlistener("click", function AjfDialogWidgetComponent_a_0_Template_a_click_0_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.openDialog()); });
    i0.ɵɵelement(1, "ajf-widget", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("instance", ctx_r1.instance.toggle);
} }
function AjfDialogWidgetComponent_ng_template_1_ng_container_0_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "ajf-widget", 3);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("instance", item_r3);
} }
function AjfDialogWidgetComponent_ng_template_1_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfDialogWidgetComponent_ng_template_1_ng_container_0_ng_container_1_Template, 2, 1, "ng-container", 5);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.content);
} }
function AjfDialogWidgetComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfDialogWidgetComponent_ng_template_1_ng_container_0_Template, 2, 1, "ng-container", 4);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r1.instance);
} }
function AjfPaginatedListWidgetComponent_div_0_div_13_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 12);
    i0.ɵɵelement(1, "ajf-widget", 13);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const item_r3 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("instance", item_r3);
} }
function AjfPaginatedListWidgetComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 1)(1, "div", 2)(2, "div", 3);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "div", 4);
    i0.ɵɵelementStart(5, "div", 5)(6, "a", 6);
    i0.ɵɵlistener("click", function AjfPaginatedListWidgetComponent_div_0_Template_a_click_6_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToPage("previous")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "div", 7);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(9, "div", 8);
    i0.ɵɵelementStart(10, "div", 9);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "a", 10);
    i0.ɵɵlistener("click", function AjfPaginatedListWidgetComponent_div_0_Template_a_click_12_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.goToPage("next")); });
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(13, AjfPaginatedListWidgetComponent_div_0_div_13_Template, 2, 1, "div", 11);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.instance.widget.title);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("ajf-paginated-list-btn-disabled", ctx_r1.canGoBackward === false);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.currentPage);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.pages);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("ajf-paginated-list-btn-disabled", ctx_r1.canGoForward === false);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.currentContent);
} }
function AjfPaginatedTableWidgetComponent_div_0_div_1_mat_option_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 17);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const pageSizeOpt_r3 = ctx.$implicit;
    i0.ɵɵproperty("value", pageSizeOpt_r3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", pageSizeOpt_r3, " ");
} }
function AjfPaginatedTableWidgetComponent_div_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 5)(1, "div", 6)(2, "mat-label", 7);
    i0.ɵɵtext(3);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "mat-select", 8);
    i0.ɵɵlistener("selectionChange", function AjfPaginatedTableWidgetComponent_div_0_div_1_Template_mat_select_selectionChange_5_listener($event) { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.onPageSizeChange($event.value)); });
    i0.ɵɵtemplate(6, AjfPaginatedTableWidgetComponent_div_0_div_1_mat_option_6_Template, 2, 2, "mat-option", 9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelement(7, "div", 10);
    i0.ɵɵelementStart(8, "div", 11)(9, "a", 12);
    i0.ɵɵlistener("click", function AjfPaginatedTableWidgetComponent_div_0_div_1_Template_a_click_9_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.goToPage("previous")); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "div", 13);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelement(12, "div", 14);
    i0.ɵɵelementStart(13, "div", 15);
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "a", 16);
    i0.ɵɵlistener("click", function AjfPaginatedTableWidgetComponent_div_0_div_1_Template_a_click_15_listener() { i0.ɵɵrestoreView(_r1); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.goToPage("next")); });
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 9, "Items per page:"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("value", ctx_r1.paginatorConfig.pageSize);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.paginatorConfig.pageSizeOptions);
    i0.ɵɵadvance(3);
    i0.ɵɵclassProp("ajf-paginated-table-btn-disabled", ctx_r1.canGoBackward === false);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.currentPage);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.pages);
    i0.ɵɵadvance();
    i0.ɵɵclassProp("ajf-paginated-table-btn-disabled", ctx_r1.canGoForward === false);
} }
function AjfPaginatedTableWidgetComponent_div_0_ajf_widget_export_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ajf-widget-export", 18)(1, "ajf-table", 19);
    i0.ɵɵlistener("sortSelected", function AjfPaginatedTableWidgetComponent_div_0_ajf_widget_export_3_Template_ajf_table_sortSelected_1_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.sortPaginatedData($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("widgetType", ctx_r1.instance.widgetType)("data", ctx_r1.exportableContent())("enable", ctx_r1.instance.exportable);
    i0.ɵɵadvance();
    i0.ɵɵproperty("data", ctx_r1.currentContent);
} }
function AjfPaginatedTableWidgetComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, AjfPaginatedTableWidgetComponent_div_0_div_1_Template, 16, 11, "div", 2);
    i0.ɵɵelementStart(2, "div", 3);
    i0.ɵɵtemplate(3, AjfPaginatedTableWidgetComponent_div_0_ajf_widget_export_3_Template, 2, 4, "ajf-widget-export", 4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.pages > 0);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.instance);
} }
const defaultWidgetsFactory = () => {
    const defaultWidgets = {};
    defaultWidgets[wt.Layout] = { component: AjfLayoutWidgetComponent };
    defaultWidgets[wt.PageBreak] = { component: AjfPageBreakWidgetComponent };
    defaultWidgets[wt.Image] = { component: AjfImageWidgetComponent };
    defaultWidgets[wt.Text] = { component: AjfTextWidgetComponent };
    defaultWidgets[wt.Chart] = { component: AjfChartWidgetComponent };
    defaultWidgets[wt.Table] = { component: AjfTableWidgetComponent };
    defaultWidgets[wt.DynamicTable] = { component: AjfTableWidgetComponent };
    defaultWidgets[wt.Map] = { component: AjfMapWidgetComponent };
    defaultWidgets[wt.Column] = { component: AjfColumnWidgetComponent };
    defaultWidgets[wt.Formula] = { component: AjfFormulaWidgetComponent };
    defaultWidgets[wt.ImageContainer] = { component: AjfImageContainerWidgetComponent };
    defaultWidgets[wt.Graph] = { component: AjfGraphWidgetComponent };
    defaultWidgets[wt.PaginatedList] = { component: AjfPaginatedListWidgetComponent };
    defaultWidgets[wt.PaginatedTable] = { component: AjfPaginatedTableWidgetComponent };
    defaultWidgets[wt.Dialog] = { component: AjfDialogWidgetComponent };
    defaultWidgets[wt.HeatMap] = { component: AjfHeatMapWidgetComponent };
    return defaultWidgets;
};
export class AjfWidgetService extends CoreService {
    constructor() {
        super(defaultWidgetsFactory());
    }
    static { this.ɵfac = function AjfWidgetService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfWidgetService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AjfWidgetService, factory: AjfWidgetService.ɵfac, providedIn: 'root' }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfWidgetService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], () => [], null); })();
export class AjfReportWidget extends CoreComponent {
    constructor(renderer, widgetService) {
        super(renderer);
        this.filterWidgetChange = new EventEmitter();
        this.widgetsMap = widgetService.componentsMap;
    }
    filterWidgetChanged(changes) {
        this.filterWidgetChange.emit(changes);
    }
    static { this.ɵfac = function AjfReportWidget_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReportWidget)(i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(AjfWidgetService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfReportWidget, selectors: [["ajf-widget"]], outputs: { filterWidgetChange: "filterWidgetChange" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 1, consts: [[3, "instance", "filteredInstance", "filterWidgetChange", 4, "ngIf"], ["ajf-widget-host", ""], [3, "filteredInstance", "filterWidgetChange", "instance"]], template: function AjfReportWidget_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfReportWidget_ajf_filter_widget_0_Template, 1, 1, "ajf-filter-widget", 0)(1, AjfReportWidget_ng_template_1_Template, 0, 0, "ng-template", 1);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance && ctx.instance.filter);
        } }, dependencies: [i1.NgIf, i2.AjfWidgetHost, i3.AjfFilterWidgetComponent], styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box;flex-direction:column}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportWidget, [{
        type: Component,
        args: [{ selector: 'ajf-widget', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ajf-filter-widget\n  *ngIf=\"instance && instance.filter\"\n  [instance]=\"instance\"\n  (filteredInstance)=\"instance = $event\"\n  (filterWidgetChange)=\"filterWidgetChanged($event)\"\n>\n</ajf-filter-widget>\n<ng-template ajf-widget-host></ng-template>\n", styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box;flex-direction:column}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"] }]
    }], () => [{ type: i0.Renderer2 }, { type: AjfWidgetService }], { filterWidgetChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfReportWidget, { className: "AjfReportWidget", filePath: "widget.ts", lineNumber: 106 }); })();
export class AjfColumnWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfColumnWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfColumnWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfColumnWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["class", "ajf-column-container", 4, "ngIf"], [1, "ajf-column-container"], [4, "ngFor", "ngForOf"], [3, "instance"]], template: function AjfColumnWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfColumnWidgetComponent_div_0_Template, 2, 1, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1.NgForOf, i1.NgIf, AjfReportWidget], styles: [".ajf-column-container{width:100%}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfColumnWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n", styles: [".ajf-column-container{width:100%}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfColumnWidgetComponent, { className: "AjfColumnWidgetComponent", filePath: "widget.ts", lineNumber: 126 }); })();
export class AjfLayoutWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
        this._allcolumnsRendered$ = new BehaviorSubject(false);
        this.allcolumnsRendered$ = this
            ._allcolumnsRendered$;
    }
    ngAfterContentChecked() {
        this._allcolumnsRendered$.next(true);
    }
    static { this.ɵfac = function AjfLayoutWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfLayoutWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfLayoutWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["class", "ajf-columns", 4, "ngIf"], [1, "ajf-columns"], ["class", "ajf-column", 3, "ngStyle", 4, "ngFor", "ngForOf"], [1, "ajf-column", 3, "ngStyle"], [4, "ngIf"], [3, "instance", 4, "ngIf"], [3, "instance"]], template: function AjfLayoutWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfLayoutWidgetComponent_div_0_Template, 2, 1, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1.NgForOf, i1.NgIf, i1.NgStyle, AjfReportWidget, i1.AsyncPipe, i2.AjfGetColumnContentPipe], styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfLayoutWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n  <ng-container *ngIf=\"allcolumnsRendered$|async\">\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </ng-container>\n </div>\n</div>\n", styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfLayoutWidgetComponent, { className: "AjfLayoutWidgetComponent", filePath: "widget.ts", lineNumber: 138 }); })();
export class AjfDialogWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el, _dialog) {
        super(cdr, el);
        this._dialog = _dialog;
    }
    openDialog() {
        this._dialog.open(this.dialogContent);
    }
    static { this.ɵfac = function AjfDialogWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfDialogWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i4.MatDialog)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfDialogWidgetComponent, selectors: [["ng-component"]], viewQuery: function AjfDialogWidgetComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c1, 5, TemplateRef);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.dialogContent = _t.first);
        } }, features: [i0.ɵɵInheritDefinitionFeature], decls: 3, vars: 1, consts: [["dialogContent", ""], ["class", "ajf-dialog-toggle", 3, "click", 4, "ngIf"], [1, "ajf-dialog-toggle", 3, "click"], [3, "instance"], [4, "ngIf"], [4, "ngFor", "ngForOf"]], template: function AjfDialogWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfDialogWidgetComponent_a_0_Template, 2, 1, "a", 1)(1, AjfDialogWidgetComponent_ng_template_1_Template, 1, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1.NgForOf, i1.NgIf, AjfReportWidget], styles: [".ajf-dialog-toggle{display:block;cursor:pointer}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfDialogWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<a *ngIf=\"instance\" class=\"ajf-dialog-toggle\" (click)=\"openDialog()\">\n  <ajf-widget [instance]=\"instance.toggle\"></ajf-widget>\n</a>\n<ng-template #dialogContent>\n  <ng-container *ngIf=\"instance\">\n    <ng-container *ngFor=\"let item of instance.content\">\n      <ajf-widget [instance]=\"item\"></ajf-widget>\n    </ng-container>\n  </ng-container>\n</ng-template>\n", styles: [".ajf-dialog-toggle{display:block;cursor:pointer}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i4.MatDialog }], { dialogContent: [{
            type: ViewChild,
            args: ['dialogContent', { read: TemplateRef }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfDialogWidgetComponent, { className: "AjfDialogWidgetComponent", filePath: "widget.ts", lineNumber: 160 }); })();
export class AjfPaginatedListWidgetComponent extends AjfBaseWidgetComponent {
    get currentPage() {
        return this._currentPage;
    }
    get pages() {
        return this._pages;
    }
    get currentContent() {
        return this._currentContent;
    }
    get canGoForward() {
        return this._canGoForward;
    }
    get canGoBackward() {
        return this._canGoBackward;
    }
    constructor(cdr, el) {
        super(cdr, el);
        this._currentPage = 0;
        this._pages = 0;
        this._currentContent = [];
        this._canGoForward = false;
        this._canGoBackward = false;
    }
    ngOnChanges(changes) {
        if (changes['instance']) {
            this._updateCurrentContent();
        }
    }
    ngOnInit() {
        this._updateCurrentContent();
    }
    goToPage(direction) {
        const diff = direction === 'next' ? 1 : -1;
        const newPage = this._currentPage + diff;
        if (newPage <= 0 || newPage > this._pages) {
            return;
        }
        this._currentPage = newPage;
        this._canGoForward = newPage < this._pages;
        this._canGoBackward = newPage > 1;
        this._fillCurrentContent();
    }
    _updateCurrentContent() {
        this._canGoBackward = false;
        if (this.instance == null || this.instance.content.length === 0) {
            this._currentPage = 0;
            this._pages = 0;
        }
        else {
            this._currentPage = 1;
            const { content } = this.instance;
            const { pageSize } = this.instance.widget;
            this._pages = Math.ceil(content.length / pageSize);
            this._canGoForward = this._pages > 1;
        }
        this._fillCurrentContent();
    }
    _fillCurrentContent() {
        if (this.instance == null || this.instance.content.length === 0) {
            this._currentContent = [];
            return;
        }
        const { content } = this.instance;
        const { pageSize } = this.instance.widget;
        const start = (this._currentPage - 1) * pageSize;
        this._currentContent = content.slice(start, start + pageSize);
        this._cdr.markForCheck();
    }
    static { this.ɵfac = function AjfPaginatedListWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfPaginatedListWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfPaginatedListWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "ajf-paginated-list", 4, "ngIf"], [1, "ajf-paginated-list"], [1, "ajf-paginated-list-title-container"], [1, "ajf-paginated-list-title"], [1, "ajf-spacer"], [1, "ajf-paginated-list-paginator"], [1, "ajf-paginated-list-btn", "ajf-paginated-list-back-btn", 3, "click"], [1, "ajf-paginated-list-paginator-page"], [1, "ajf-paginated-list-paginator-separator"], [1, "ajf-paginated-list-paginator-pages"], [1, "ajf-paginated-list-btn", "ajf-paginated-list-forward-btn", 3, "click"], ["class", "ajf-paginated-list-item", 4, "ngFor", "ngForOf"], [1, "ajf-paginated-list-item"], [3, "instance"]], template: function AjfPaginatedListWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfPaginatedListWidgetComponent_div_0_Template, 14, 8, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance && ctx.pages > 0);
        } }, dependencies: [i1.NgForOf, i1.NgIf, AjfReportWidget], styles: [".ajf-paginated-list-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-list-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-list-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-list-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-list-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-list-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-list-back-btn:after{content:\"<\"}.ajf-paginated-list-forward-btn:after{content:\">\"}.ajf-paginated-list-paginator{display:flex;align-items:center}.ajf-paginated-list-paginator>*{margin:0 .5em}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfPaginatedListWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-paginated-list\" *ngIf=\"instance && pages > 0\">\n  <div class=\"ajf-paginated-list-title-container\">\n    <div class=\"ajf-paginated-list-title\">{{ instance.widget.title }}</div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-list-paginator\">\n      <a (click)=\"goToPage('previous')\" class=\"ajf-paginated-list-btn ajf-paginated-list-back-btn\"\n          [class.ajf-paginated-list-btn-disabled]=\"canGoBackward === false\"></a>\n      <div class=\"ajf-paginated-list-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-list-paginator-separator\"></div>\n      <div class=\"ajf-paginated-list-paginator-pages\">{{ pages }}</div>\n      <a (click)=\"goToPage('next')\" class=\"ajf-paginated-list-btn ajf-paginated-list-forward-btn\"\n        [class.ajf-paginated-list-btn-disabled]=\"canGoForward === false\"></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-list-item\" *ngFor=\"let item of currentContent\">\n    <ajf-widget [instance]=\"item\"></ajf-widget>\n  </div>\n</div>\n", styles: [".ajf-paginated-list-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-list-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-list-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-list-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-list-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-list-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-list-back-btn:after{content:\"<\"}.ajf-paginated-list-forward-btn:after{content:\">\"}.ajf-paginated-list-paginator{display:flex;align-items:center}.ajf-paginated-list-paginator>*{margin:0 .5em}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfPaginatedListWidgetComponent, { className: "AjfPaginatedListWidgetComponent", filePath: "widget.ts", lineNumber: 178 }); })();
export class AjfPaginatedTableWidgetComponent extends AjfBaseWidgetComponent {
    get currentPage() {
        return this._currentPage;
    }
    get pages() {
        return this._pages;
    }
    get orderBy() {
        return this._orderBy;
    }
    get currentContent() {
        return this._currentContent;
    }
    get headerContent() {
        return this._headerContent;
    }
    get canGoForward() {
        return this._canGoForward;
    }
    get canGoBackward() {
        return this._canGoBackward;
    }
    constructor(cdr, el) {
        super(cdr, el);
        this.paginatorConfig = {
            pageSize: 10,
            pageSizeOptions: [5, 10, 15, 20, 25, 30, 50, 100, 500],
        };
        this._currentPage = 0;
        this._pages = 0;
        this._orderBy = 0;
        this._currentContent = [];
        /**
         * full data table
         */
        this._allDataContent = [];
        /**
         * full sorted data table
         */
        this._sortedAllDataContent = [];
        this._headerContent = [];
        this._canGoForward = false;
        this._canGoBackward = false;
    }
    /**
     * Set initial data for the table on instance changes
     * @param changes
     */
    ngOnChanges(changes) {
        if (changes['instance']) {
            if (this.instance != null &&
                this.instance.widget.pageSize &&
                this.instance.widget.pageSize > 0) {
                this.paginatorConfig.pageSize = this.instance.widget.pageSize;
            }
            this._updateCurrentContent();
        }
    }
    ngOnInit() {
        if (this.instance != null &&
            this.instance.widget.pageSize &&
            this.instance.widget.pageSize > 0) {
            this.paginatorConfig.pageSize = this.instance.widget.pageSize;
        }
        this._updateCurrentContent();
    }
    /**
     * Got to next or previous page
     * @param direction
     * @returns
     */
    goToPage(direction) {
        const diff = direction === 'next' ? 1 : -1;
        const newPage = this._currentPage + diff;
        if (newPage <= 0 || newPage > this._pages) {
            return;
        }
        this._currentPage = newPage;
        this._canGoForward = newPage < this._pages;
        this._canGoBackward = newPage > 1;
        this._fillCurrentContent();
    }
    onPageSizeChange(_pageSize) {
        this.paginatorConfig.pageSize = _pageSize;
        this._updateCurrentContent();
    }
    /**
     * Sort all data for the table, not only current page data
     * @param sort
     * @returns
     */
    sortPaginatedData(sort) {
        if (this._allDataContent.length > 1) {
            if (!sort.active || sort.direction === '') {
                this._sortedAllDataContent = this._allDataContent.slice();
            }
            else {
                this._currentPage = 1;
                this._canGoForward = this._currentPage < this._pages;
                this._canGoBackward = false;
                const columnIdx = parseInt(sort.active.replace(/^\D+/, '')) || 0;
                this._sortedAllDataContent = this._sortedAllDataContent.slice().sort((a, b) => {
                    const isAsc = sort.direction === 'asc';
                    return this._compare(a[columnIdx], b[columnIdx], isAsc);
                });
            }
            this._fillCurrentContent();
        }
    }
    exportableContent() {
        return [this._headerContent, ...this._sortedAllDataContent];
    }
    _compare(a, b, isAsc) {
        return (a.value < b.value ? -1 : 1) * (isAsc ? 1 : -1);
    }
    /**
     * Set current header and data for the table, starting from page 1
     */
    _updateCurrentContent() {
        this._canGoBackward = false;
        if (this.instance == null || this.instance.data.length === 0) {
            this._currentPage = 0;
            this._pages = 0;
            this._headerContent = [];
            this._currentContent = [];
            this._allDataContent = [];
            this._sortedAllDataContent = [];
        }
        else {
            this._headerContent = this.instance.data[0];
            this._allDataContent = this.instance.data.slice(1);
            this._sortedAllDataContent = [...this._allDataContent];
            this._currentPage = 1;
            this._pages = Math.ceil(this._allDataContent.length / this.paginatorConfig.pageSize);
            this._canGoForward = this._pages > 1;
        }
        this._fillCurrentContent();
    }
    /**
     * Update current data for the table, using page and sorted data
     */
    _fillCurrentContent() {
        if (this._sortedAllDataContent.length === 0 && this._headerContent.length > 0) {
            this._currentContent = [this._headerContent];
        }
        else {
            const start = (this._currentPage - 1) * this.paginatorConfig.pageSize;
            this._currentContent = [
                this._headerContent,
                ...this._sortedAllDataContent.slice(start, start + this.paginatorConfig.pageSize),
            ];
        }
        this._cdr.markForCheck();
    }
    static { this.ɵfac = function AjfPaginatedTableWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfPaginatedTableWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfPaginatedTableWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature, i0.ɵɵNgOnChangesFeature], decls: 1, vars: 1, consts: [["class", "ajf-paginated-table", 4, "ngIf"], [1, "ajf-paginated-table"], ["class", "ajf-paginated-table-title-container", 4, "ngIf"], [1, "ajf-paginated-table-item"], [3, "widgetType", "data", "enable", 4, "ngIf"], [1, "ajf-paginated-table-title-container"], [1, "ajf-paginated-table-page-selector"], [1, "ajf-paginated-table-page-selector-label"], [3, "selectionChange", "value"], [3, "value", 4, "ngFor", "ngForOf"], [1, "ajf-spacer"], [1, "ajf-paginated-table-paginator"], [1, "ajf-paginated-table-btn", "ajf-paginated-table-back-btn", 3, "click"], [1, "ajf-paginated-table-paginator-page"], [1, "ajf-paginated-table-paginator-separator"], [1, "ajf-paginated-table-paginator-pages"], [1, "ajf-paginated-table-btn", "ajf-paginated-table-forward-btn", 3, "click"], [3, "value"], [3, "widgetType", "data", "enable"], [3, "sortSelected", "data"]], template: function AjfPaginatedTableWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfPaginatedTableWidgetComponent_div_0_Template, 4, 2, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i5.AjfTable, i1.NgForOf, i1.NgIf, i2.AjfWidgetExport, i6.MatLabel, i7.MatSelect, i8.MatOption, i9.TranslocoPipe], styles: ["table{border-spacing:0}table td{padding:10px}.ajf-paginated-table{width:100%;overflow-x:auto}.ajf-paginated-table table{min-width:100%}.ajf-paginated-table-page-selector{display:flex;align-items:baseline}.ajf-paginated-table-page-selector .ajf-paginated-table-page-selector-label{white-space:nowrap;margin-right:4px;font-size:.9em}.ajf-paginated-table-page-selector .mat-mdc-select{width:70px;font-size:.9em}.ajf-paginated-table-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-table-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-table-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-table-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-table-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-table-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-table-back-btn:after{content:\"<\"}.ajf-paginated-table-forward-btn:after{content:\">\"}.ajf-paginated-table-paginator{display:flex;align-items:center;font-size:.9em}.ajf-paginated-table-paginator>*{margin:0 .5em}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfPaginatedTableWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-paginated-table\" *ngIf=\"instance\">\n  <div class=\"ajf-paginated-table-title-container\" *ngIf=\"pages > 0\">\n    <div class=\"ajf-paginated-table-page-selector\">\n      <mat-label class=\"ajf-paginated-table-page-selector-label\"\n        >{{'Items per page:'|transloco}}</mat-label\n      >\n      <mat-select\n        [value]=\"paginatorConfig.pageSize\"\n        (selectionChange)=\"onPageSizeChange($event.value)\"\n      >\n        <mat-option\n          [value]=\"pageSizeOpt\"\n          *ngFor=\"let pageSizeOpt of paginatorConfig.pageSizeOptions\"\n        >\n          {{ pageSizeOpt }}\n        </mat-option>\n      </mat-select>\n    </div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-table-paginator\">\n      <a\n        (click)=\"goToPage('previous')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-back-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoBackward === false\"\n      ></a>\n      <div class=\"ajf-paginated-table-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-table-paginator-separator\"></div>\n      <div class=\"ajf-paginated-table-paginator-pages\">{{ pages }}</div>\n      <a\n        (click)=\"goToPage('next')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-forward-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoForward === false\"\n      ></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-table-item\">\n    <ajf-widget-export\n      *ngIf=\"instance\"\n      [widgetType]=\"instance.widgetType\"\n      [data]=\"exportableContent()\"\n      [enable]=\"instance.exportable\"\n    >\n      <ajf-table [data]=\"currentContent\" (sortSelected)=\"sortPaginatedData($event)\"></ajf-table>\n    </ajf-widget-export>\n  </div>\n</div>\n", styles: ["table{border-spacing:0}table td{padding:10px}.ajf-paginated-table{width:100%;overflow-x:auto}.ajf-paginated-table table{min-width:100%}.ajf-paginated-table-page-selector{display:flex;align-items:baseline}.ajf-paginated-table-page-selector .ajf-paginated-table-page-selector-label{white-space:nowrap;margin-right:4px;font-size:.9em}.ajf-paginated-table-page-selector .mat-mdc-select{width:70px;font-size:.9em}.ajf-paginated-table-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-table-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-table-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-table-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-table-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-table-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-table-back-btn:after{content:\"<\"}.ajf-paginated-table-forward-btn:after{content:\">\"}.ajf-paginated-table-paginator{display:flex;align-items:center;font-size:.9em}.ajf-paginated-table-paginator>*{margin:0 .5em}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfPaginatedTableWidgetComponent, { className: "AjfPaginatedTableWidgetComponent", filePath: "widget.ts", lineNumber: 267 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvd2lkZ2V0LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvcmVwb3J0cy9zcmMvd2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9jb2x1bW4td2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9sYXlvdXQtd2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9kaWFsb2ctd2lkZ2V0Lmh0bWwiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9yZXBvcnRzL3NyYy9wYWdpbmF0ZWQtbGlzdC13aWRnZXQuaHRtbCIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL3JlcG9ydHMvc3JjL3BhZ2luYXRlZC10YWJsZS13aWRnZXQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsc0JBQXNCLEVBTXRCLGVBQWUsSUFBSSxhQUFhLEVBR2hDLGdCQUFnQixJQUFJLFdBQVcsRUFDL0IsYUFBYSxJQUFJLEVBQUUsR0FDcEIsTUFBTSxtQkFBbUIsQ0FBQztBQUczQixPQUFPLEVBRUwsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osVUFBVSxFQUdWLE1BQU0sRUFHTixXQUFXLEVBQ1gsU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUd2QixPQUFPLEVBQUMsZUFBZSxFQUFhLE1BQU0sTUFBTSxDQUFDO0FBRWpELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFN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O2tDQUdTLHVCQUF1QixDQUFDLE1BQU0saUJBQ2hDLGlCQUFpQixDQUFDLElBQUk7O2tGQUUxQixnQ0FBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkJhc2VXaWRnZXRDb21wb25lbnQsXG4gIEFqZkNvbHVtbldpZGdldEluc3RhbmNlLFxuICBBamZEaWFsb2dXaWRnZXRJbnN0YW5jZSxcbiAgQWpmTGF5b3V0V2lkZ2V0SW5zdGFuY2UsXG4gIEFqZlBhZ2luYXRlZExpc3RXaWRnZXRJbnN0YW5jZSxcbiAgQWpmUGFnaW5hdGVkVGFibGVXaWRnZXRJbnN0YW5jZSxcbiAgQWpmUmVwb3J0V2lkZ2V0IGFzIENvcmVDb21wb25lbnQsXG4gIEFqZldpZGdldENvbXBvbmVudHNNYXAsXG4gIEFqZldpZGdldEluc3RhbmNlLFxuICBBamZXaWRnZXRTZXJ2aWNlIGFzIENvcmVTZXJ2aWNlLFxuICBBamZXaWRnZXRUeXBlIGFzIHd0LFxufSBmcm9tICdAYWpmL2NvcmUvcmVwb3J0cyc7XG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0IHtBamZUYWJsZUNlbGx9IGZyb20gJ0BhamYvY29yZS90YWJsZSc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbmplY3RhYmxlLFxuICBPbkNoYW5nZXMsXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFRlbXBsYXRlUmVmLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7TWF0RGlhbG9nfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHtTb3J0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZDaGFydFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9jaGFydC13aWRnZXQnO1xuaW1wb3J0IHtBamZGb3JtdWxhV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL2Zvcm11bGEtd2lkZ2V0JztcbmltcG9ydCB7QWpmR3JhcGhXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vZ3JhcGgtd2lkZ2V0JztcbmltcG9ydCB7QWpmSGVhdE1hcFdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9oZWF0LW1hcC13aWRnZXQnO1xuaW1wb3J0IHtBamZJbWFnZUNvbnRhaW5lcldpZGdldENvbXBvbmVudH0gZnJvbSAnLi9pbWFnZS1jb250YWluZXItd2lkZ2V0JztcbmltcG9ydCB7QWpmSW1hZ2VXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vaW1hZ2Utd2lkZ2V0JztcbmltcG9ydCB7QWpmTWFwV2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL21hcC13aWRnZXQnO1xuaW1wb3J0IHtBamZQYWdlQnJlYWtXaWRnZXRDb21wb25lbnR9IGZyb20gJy4vcGFnZS1icmVhay13aWRnZXQnO1xuaW1wb3J0IHtBamZUYWJsZVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi90YWJsZS13aWRnZXQnO1xuaW1wb3J0IHtBamZUZXh0V2lkZ2V0Q29tcG9uZW50fSBmcm9tICcuL3RleHQtd2lkZ2V0JztcblxuY29uc3QgZGVmYXVsdFdpZGdldHNGYWN0b3J5ID0gKCk6IEFqZldpZGdldENvbXBvbmVudHNNYXAgPT4ge1xuICBjb25zdCBkZWZhdWx0V2lkZ2V0czogQWpmV2lkZ2V0Q29tcG9uZW50c01hcCA9IHt9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5MYXlvdXRdID0ge2NvbXBvbmVudDogQWpmTGF5b3V0V2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuUGFnZUJyZWFrXSA9IHtjb21wb25lbnQ6IEFqZlBhZ2VCcmVha1dpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LkltYWdlXSA9IHtjb21wb25lbnQ6IEFqZkltYWdlV2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuVGV4dF0gPSB7Y29tcG9uZW50OiBBamZUZXh0V2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuQ2hhcnRdID0ge2NvbXBvbmVudDogQWpmQ2hhcnRXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5UYWJsZV0gPSB7Y29tcG9uZW50OiBBamZUYWJsZVdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LkR5bmFtaWNUYWJsZV0gPSB7Y29tcG9uZW50OiBBamZUYWJsZVdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0Lk1hcF0gPSB7Y29tcG9uZW50OiBBamZNYXBXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5Db2x1bW5dID0ge2NvbXBvbmVudDogQWpmQ29sdW1uV2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuRm9ybXVsYV0gPSB7Y29tcG9uZW50OiBBamZGb3JtdWxhV2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuSW1hZ2VDb250YWluZXJdID0ge2NvbXBvbmVudDogQWpmSW1hZ2VDb250YWluZXJXaWRnZXRDb21wb25lbnR9O1xuICBkZWZhdWx0V2lkZ2V0c1t3dC5HcmFwaF0gPSB7Y29tcG9uZW50OiBBamZHcmFwaFdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LlBhZ2luYXRlZExpc3RdID0ge2NvbXBvbmVudDogQWpmUGFnaW5hdGVkTGlzdFdpZGdldENvbXBvbmVudH07XG4gIGRlZmF1bHRXaWRnZXRzW3d0LlBhZ2luYXRlZFRhYmxlXSA9IHtjb21wb25lbnQ6IEFqZlBhZ2luYXRlZFRhYmxlV2lkZ2V0Q29tcG9uZW50fTtcblxuICBkZWZhdWx0V2lkZ2V0c1t3dC5EaWFsb2ddID0ge2NvbXBvbmVudDogQWpmRGlhbG9nV2lkZ2V0Q29tcG9uZW50fTtcbiAgZGVmYXVsdFdpZGdldHNbd3QuSGVhdE1hcF0gPSB7Y29tcG9uZW50OiBBamZIZWF0TWFwV2lkZ2V0Q29tcG9uZW50fTtcbiAgcmV0dXJuIGRlZmF1bHRXaWRnZXRzO1xufTtcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQWpmV2lkZ2V0U2VydmljZSBleHRlbmRzIENvcmVTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoZGVmYXVsdFdpZGdldHNGYWN0b3J5KCkpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi13aWRnZXQnLFxuICB0ZW1wbGF0ZVVybDogJ3dpZGdldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3dpZGdldC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRXaWRnZXQgZXh0ZW5kcyBDb3JlQ29tcG9uZW50IHtcbiAgQE91dHB1dCgpIGZpbHRlcldpZGdldENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8e2NvbnRleHQ6IEFqZkNvbnRleHQsIHdpZGdldDogQWpmV2lkZ2V0SW5zdGFuY2V9PigpO1xuICByZWFkb25seSB3aWRnZXRzTWFwOiBBamZXaWRnZXRDb21wb25lbnRzTWFwO1xuXG4gIGNvbnN0cnVjdG9yKHJlbmRlcmVyOiBSZW5kZXJlcjIsIHdpZGdldFNlcnZpY2U6IEFqZldpZGdldFNlcnZpY2UpIHtcbiAgICBzdXBlcihyZW5kZXJlcik7XG4gICAgdGhpcy53aWRnZXRzTWFwID0gd2lkZ2V0U2VydmljZS5jb21wb25lbnRzTWFwO1xuICB9XG5cbiAgZmlsdGVyV2lkZ2V0Q2hhbmdlZChjaGFuZ2VzOiB7Y29udGV4dDogQWpmQ29udGV4dCwgd2lkZ2V0OiBBamZXaWRnZXRJbnN0YW5jZX0pIHtcbiAgICB0aGlzLmZpbHRlcldpZGdldENoYW5nZS5lbWl0KGNoYW5nZXMpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ2NvbHVtbi13aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydjb2x1bW4td2lkZ2V0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNvbHVtbldpZGdldENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VXaWRnZXRDb21wb25lbnQ8QWpmQ29sdW1uV2lkZ2V0SW5zdGFuY2U+IHtcbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjZHIsIGVsKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgdGVtcGxhdGVVcmw6ICdsYXlvdXQtd2lkZ2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbGF5b3V0LXdpZGdldC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZMYXlvdXRXaWRnZXRDb21wb25lbnRcbiAgZXh0ZW5kcyBBamZCYXNlV2lkZ2V0Q29tcG9uZW50PEFqZkxheW91dFdpZGdldEluc3RhbmNlPlxuICBpbXBsZW1lbnRzIEFmdGVyQ29udGVudENoZWNrZWRcbntcbiAgcHJpdmF0ZSBfYWxsY29sdW1uc1JlbmRlcmVkJDogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gIHJlYWRvbmx5IGFsbGNvbHVtbnNSZW5kZXJlZCQ6IE9ic2VydmFibGU8Ym9vbGVhbj4gPSB0aGlzXG4gICAgLl9hbGxjb2x1bW5zUmVuZGVyZWQkIGFzIE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjZHIsIGVsKTtcbiAgfVxuICBuZ0FmdGVyQ29udGVudENoZWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fYWxsY29sdW1uc1JlbmRlcmVkJC5uZXh0KHRydWUpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICB0ZW1wbGF0ZVVybDogJ2RpYWxvZy13aWRnZXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWydkaWFsb2ctd2lkZ2V0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkRpYWxvZ1dpZGdldENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VXaWRnZXRDb21wb25lbnQ8QWpmRGlhbG9nV2lkZ2V0SW5zdGFuY2U+IHtcbiAgQFZpZXdDaGlsZCgnZGlhbG9nQ29udGVudCcsIHtyZWFkOiBUZW1wbGF0ZVJlZn0pIGRpYWxvZ0NvbnRlbnQhOiBUZW1wbGF0ZVJlZjxIVE1MRWxlbWVudD47XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nKSB7XG4gICAgc3VwZXIoY2RyLCBlbCk7XG4gIH1cblxuICBvcGVuRGlhbG9nKCk6IHZvaWQge1xuICAgIHRoaXMuX2RpYWxvZy5vcGVuKHRoaXMuZGlhbG9nQ29udGVudCk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAncGFnaW5hdGVkLWxpc3Qtd2lkZ2V0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnaW5hdGVkLWxpc3Qtd2lkZ2V0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlBhZ2luYXRlZExpc3RXaWRnZXRDb21wb25lbnRcbiAgZXh0ZW5kcyBBamZCYXNlV2lkZ2V0Q29tcG9uZW50PEFqZlBhZ2luYXRlZExpc3RXaWRnZXRJbnN0YW5jZT5cbiAgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdFxue1xuICBnZXQgY3VycmVudFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2U7XG4gIH1cbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2UgPSAwO1xuXG4gIGdldCBwYWdlcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9wYWdlcztcbiAgfVxuICBwcml2YXRlIF9wYWdlcyA9IDA7XG5cbiAgZ2V0IGN1cnJlbnRDb250ZW50KCk6IEFqZldpZGdldEluc3RhbmNlW10ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q29udGVudDtcbiAgfVxuICBwcml2YXRlIF9jdXJyZW50Q29udGVudDogQWpmV2lkZ2V0SW5zdGFuY2VbXSA9IFtdO1xuXG4gIGdldCBjYW5Hb0ZvcndhcmQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbkdvRm9yd2FyZDtcbiAgfVxuICBwcml2YXRlIF9jYW5Hb0ZvcndhcmQgPSBmYWxzZTtcblxuICBnZXQgY2FuR29CYWNrd2FyZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2FuR29CYWNrd2FyZDtcbiAgfVxuICBwcml2YXRlIF9jYW5Hb0JhY2t3YXJkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihjZHIsIGVsKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1snaW5zdGFuY2UnXSkge1xuICAgICAgdGhpcy5fdXBkYXRlQ3VycmVudENvbnRlbnQoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVDdXJyZW50Q29udGVudCgpO1xuICB9XG5cbiAgZ29Ub1BhZ2UoZGlyZWN0aW9uOiAnbmV4dCcgfCAncHJldmlvdXMnKTogdm9pZCB7XG4gICAgY29uc3QgZGlmZiA9IGRpcmVjdGlvbiA9PT0gJ25leHQnID8gMSA6IC0xO1xuICAgIGNvbnN0IG5ld1BhZ2UgPSB0aGlzLl9jdXJyZW50UGFnZSArIGRpZmY7XG4gICAgaWYgKG5ld1BhZ2UgPD0gMCB8fCBuZXdQYWdlID4gdGhpcy5fcGFnZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFBhZ2UgPSBuZXdQYWdlO1xuICAgIHRoaXMuX2NhbkdvRm9yd2FyZCA9IG5ld1BhZ2UgPCB0aGlzLl9wYWdlcztcbiAgICB0aGlzLl9jYW5Hb0JhY2t3YXJkID0gbmV3UGFnZSA+IDE7XG4gICAgdGhpcy5fZmlsbEN1cnJlbnRDb250ZW50KCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVDdXJyZW50Q29udGVudCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jYW5Hb0JhY2t3YXJkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCB8fCB0aGlzLmluc3RhbmNlLmNvbnRlbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IDA7XG4gICAgICB0aGlzLl9wYWdlcyA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gMTtcbiAgICAgIGNvbnN0IHtjb250ZW50fSA9IHRoaXMuaW5zdGFuY2U7XG4gICAgICBjb25zdCB7cGFnZVNpemV9ID0gdGhpcy5pbnN0YW5jZS53aWRnZXQ7XG4gICAgICB0aGlzLl9wYWdlcyA9IE1hdGguY2VpbChjb250ZW50Lmxlbmd0aCAvIHBhZ2VTaXplKTtcbiAgICAgIHRoaXMuX2NhbkdvRm9yd2FyZCA9IHRoaXMuX3BhZ2VzID4gMTtcbiAgICB9XG4gICAgdGhpcy5fZmlsbEN1cnJlbnRDb250ZW50KCk7XG4gIH1cblxuICBwcml2YXRlIF9maWxsQ3VycmVudENvbnRlbnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCB8fCB0aGlzLmluc3RhbmNlLmNvbnRlbnQubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50Q29udGVudCA9IFtdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7Y29udGVudH0gPSB0aGlzLmluc3RhbmNlO1xuICAgIGNvbnN0IHtwYWdlU2l6ZX0gPSB0aGlzLmluc3RhbmNlLndpZGdldDtcbiAgICBjb25zdCBzdGFydCA9ICh0aGlzLl9jdXJyZW50UGFnZSAtIDEpICogcGFnZVNpemU7XG4gICAgdGhpcy5fY3VycmVudENvbnRlbnQgPSBjb250ZW50LnNsaWNlKHN0YXJ0LCBzdGFydCArIHBhZ2VTaXplKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHRlbXBsYXRlVXJsOiAncGFnaW5hdGVkLXRhYmxlLXdpZGdldC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2luYXRlZC10YWJsZS13aWRnZXQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUGFnaW5hdGVkVGFibGVXaWRnZXRDb21wb25lbnRcbiAgZXh0ZW5kcyBBamZCYXNlV2lkZ2V0Q29tcG9uZW50PEFqZlBhZ2luYXRlZFRhYmxlV2lkZ2V0SW5zdGFuY2U+XG4gIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXRcbntcbiAgcmVhZG9ubHkgcGFnaW5hdG9yQ29uZmlnID0ge1xuICAgIHBhZ2VTaXplOiAxMCxcbiAgICBwYWdlU2l6ZU9wdGlvbnM6IFs1LCAxMCwgMTUsIDIwLCAyNSwgMzAsIDUwLCAxMDAsIDUwMF0sXG4gIH07XG5cbiAgZ2V0IGN1cnJlbnRQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlO1xuICB9XG4gIHByaXZhdGUgX2N1cnJlbnRQYWdlID0gMDtcblxuICBnZXQgcGFnZXMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fcGFnZXM7XG4gIH1cbiAgcHJpdmF0ZSBfcGFnZXMgPSAwO1xuXG4gIGdldCBvcmRlckJ5KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX29yZGVyQnk7XG4gIH1cbiAgcHJpdmF0ZSBfb3JkZXJCeSA9IDA7XG5cbiAgZ2V0IGN1cnJlbnRDb250ZW50KCk6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50Q29udGVudDtcbiAgfVxuICBwcml2YXRlIF9jdXJyZW50Q29udGVudDogQWpmVGFibGVDZWxsW11bXSA9IFtdO1xuXG4gIC8qKlxuICAgKiBmdWxsIGRhdGEgdGFibGVcbiAgICovXG4gIHByaXZhdGUgX2FsbERhdGFDb250ZW50OiBBamZUYWJsZUNlbGxbXVtdID0gW107XG5cbiAgLyoqXG4gICAqIGZ1bGwgc29ydGVkIGRhdGEgdGFibGVcbiAgICovXG4gIHByaXZhdGUgX3NvcnRlZEFsbERhdGFDb250ZW50OiBBamZUYWJsZUNlbGxbXVtdID0gW107XG5cbiAgZ2V0IGhlYWRlckNvbnRlbnQoKTogQWpmVGFibGVDZWxsW10ge1xuICAgIHJldHVybiB0aGlzLl9oZWFkZXJDb250ZW50O1xuICB9XG4gIHByaXZhdGUgX2hlYWRlckNvbnRlbnQ6IEFqZlRhYmxlQ2VsbFtdID0gW107XG5cbiAgZ2V0IGNhbkdvRm9yd2FyZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY2FuR29Gb3J3YXJkO1xuICB9XG4gIHByaXZhdGUgX2NhbkdvRm9yd2FyZCA9IGZhbHNlO1xuXG4gIGdldCBjYW5Hb0JhY2t3YXJkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9jYW5Hb0JhY2t3YXJkO1xuICB9XG4gIHByaXZhdGUgX2NhbkdvQmFja3dhcmQgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihjZHI6IENoYW5nZURldGVjdG9yUmVmLCBlbDogRWxlbWVudFJlZikge1xuICAgIHN1cGVyKGNkciwgZWwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBpbml0aWFsIGRhdGEgZm9yIHRoZSB0YWJsZSBvbiBpbnN0YW5jZSBjaGFuZ2VzXG4gICAqIEBwYXJhbSBjaGFuZ2VzXG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKGNoYW5nZXNbJ2luc3RhbmNlJ10pIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5pbnN0YW5jZSAhPSBudWxsICYmXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uud2lkZ2V0LnBhZ2VTaXplICYmXG4gICAgICAgIHRoaXMuaW5zdGFuY2Uud2lkZ2V0LnBhZ2VTaXplID4gMFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMucGFnaW5hdG9yQ29uZmlnLnBhZ2VTaXplID0gdGhpcy5pbnN0YW5jZS53aWRnZXQucGFnZVNpemU7XG4gICAgICB9XG4gICAgICB0aGlzLl91cGRhdGVDdXJyZW50Q29udGVudCgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMuaW5zdGFuY2UgIT0gbnVsbCAmJlxuICAgICAgdGhpcy5pbnN0YW5jZS53aWRnZXQucGFnZVNpemUgJiZcbiAgICAgIHRoaXMuaW5zdGFuY2Uud2lkZ2V0LnBhZ2VTaXplID4gMFxuICAgICkge1xuICAgICAgdGhpcy5wYWdpbmF0b3JDb25maWcucGFnZVNpemUgPSB0aGlzLmluc3RhbmNlLndpZGdldC5wYWdlU2l6ZTtcbiAgICB9XG4gICAgdGhpcy5fdXBkYXRlQ3VycmVudENvbnRlbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHb3QgdG8gbmV4dCBvciBwcmV2aW91cyBwYWdlXG4gICAqIEBwYXJhbSBkaXJlY3Rpb25cbiAgICogQHJldHVybnNcbiAgICovXG4gIGdvVG9QYWdlKGRpcmVjdGlvbjogJ25leHQnIHwgJ3ByZXZpb3VzJyk6IHZvaWQge1xuICAgIGNvbnN0IGRpZmYgPSBkaXJlY3Rpb24gPT09ICduZXh0JyA/IDEgOiAtMTtcbiAgICBjb25zdCBuZXdQYWdlID0gdGhpcy5fY3VycmVudFBhZ2UgKyBkaWZmO1xuICAgIGlmIChuZXdQYWdlIDw9IDAgfHwgbmV3UGFnZSA+IHRoaXMuX3BhZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gbmV3UGFnZTtcbiAgICB0aGlzLl9jYW5Hb0ZvcndhcmQgPSBuZXdQYWdlIDwgdGhpcy5fcGFnZXM7XG4gICAgdGhpcy5fY2FuR29CYWNrd2FyZCA9IG5ld1BhZ2UgPiAxO1xuICAgIHRoaXMuX2ZpbGxDdXJyZW50Q29udGVudCgpO1xuICB9XG5cbiAgb25QYWdlU2l6ZUNoYW5nZShfcGFnZVNpemU6IG51bWJlcikge1xuICAgIHRoaXMucGFnaW5hdG9yQ29uZmlnLnBhZ2VTaXplID0gX3BhZ2VTaXplO1xuICAgIHRoaXMuX3VwZGF0ZUN1cnJlbnRDb250ZW50KCk7XG4gIH1cblxuICAvKipcbiAgICogU29ydCBhbGwgZGF0YSBmb3IgdGhlIHRhYmxlLCBub3Qgb25seSBjdXJyZW50IHBhZ2UgZGF0YVxuICAgKiBAcGFyYW0gc29ydFxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgc29ydFBhZ2luYXRlZERhdGEoc29ydDogU29ydCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9hbGxEYXRhQ29udGVudC5sZW5ndGggPiAxKSB7XG4gICAgICBpZiAoIXNvcnQuYWN0aXZlIHx8IHNvcnQuZGlyZWN0aW9uID09PSAnJykge1xuICAgICAgICB0aGlzLl9zb3J0ZWRBbGxEYXRhQ29udGVudCA9IHRoaXMuX2FsbERhdGFDb250ZW50LnNsaWNlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IDE7XG4gICAgICAgIHRoaXMuX2NhbkdvRm9yd2FyZCA9IHRoaXMuX2N1cnJlbnRQYWdlIDwgdGhpcy5fcGFnZXM7XG4gICAgICAgIHRoaXMuX2NhbkdvQmFja3dhcmQgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBjb2x1bW5JZHggPSBwYXJzZUludChzb3J0LmFjdGl2ZS5yZXBsYWNlKC9eXFxEKy8sICcnKSkgfHwgMDtcbiAgICAgICAgdGhpcy5fc29ydGVkQWxsRGF0YUNvbnRlbnQgPSB0aGlzLl9zb3J0ZWRBbGxEYXRhQ29udGVudC5zbGljZSgpLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICBjb25zdCBpc0FzYyA9IHNvcnQuZGlyZWN0aW9uID09PSAnYXNjJztcbiAgICAgICAgICByZXR1cm4gdGhpcy5fY29tcGFyZShhW2NvbHVtbklkeF0sIGJbY29sdW1uSWR4XSwgaXNBc2MpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2ZpbGxDdXJyZW50Q29udGVudCgpO1xuICAgIH1cbiAgfVxuXG4gIGV4cG9ydGFibGVDb250ZW50KCk6IEFqZlRhYmxlQ2VsbFtdW10ge1xuICAgIHJldHVybiBbdGhpcy5faGVhZGVyQ29udGVudCwgLi4udGhpcy5fc29ydGVkQWxsRGF0YUNvbnRlbnRdO1xuICB9XG5cbiAgcHJpdmF0ZSBfY29tcGFyZShhOiBBamZUYWJsZUNlbGwsIGI6IEFqZlRhYmxlQ2VsbCwgaXNBc2M6IGJvb2xlYW4pIHtcbiAgICByZXR1cm4gKGEudmFsdWUgPCBiLnZhbHVlID8gLTEgOiAxKSAqIChpc0FzYyA/IDEgOiAtMSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0IGN1cnJlbnQgaGVhZGVyIGFuZCBkYXRhIGZvciB0aGUgdGFibGUsIHN0YXJ0aW5nIGZyb20gcGFnZSAxXG4gICAqL1xuICBwcml2YXRlIF91cGRhdGVDdXJyZW50Q29udGVudCgpOiB2b2lkIHtcbiAgICB0aGlzLl9jYW5Hb0JhY2t3YXJkID0gZmFsc2U7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCB8fCB0aGlzLmluc3RhbmNlLmRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgICB0aGlzLl9jdXJyZW50UGFnZSA9IDA7XG4gICAgICB0aGlzLl9wYWdlcyA9IDA7XG4gICAgICB0aGlzLl9oZWFkZXJDb250ZW50ID0gW107XG4gICAgICB0aGlzLl9jdXJyZW50Q29udGVudCA9IFtdO1xuICAgICAgdGhpcy5fYWxsRGF0YUNvbnRlbnQgPSBbXTtcbiAgICAgIHRoaXMuX3NvcnRlZEFsbERhdGFDb250ZW50ID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hlYWRlckNvbnRlbnQgPSB0aGlzLmluc3RhbmNlLmRhdGFbMF07XG4gICAgICB0aGlzLl9hbGxEYXRhQ29udGVudCA9IHRoaXMuaW5zdGFuY2UuZGF0YS5zbGljZSgxKTtcbiAgICAgIHRoaXMuX3NvcnRlZEFsbERhdGFDb250ZW50ID0gWy4uLnRoaXMuX2FsbERhdGFDb250ZW50XTtcbiAgICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gMTtcblxuICAgICAgdGhpcy5fcGFnZXMgPSBNYXRoLmNlaWwodGhpcy5fYWxsRGF0YUNvbnRlbnQubGVuZ3RoIC8gdGhpcy5wYWdpbmF0b3JDb25maWcucGFnZVNpemUpO1xuICAgICAgdGhpcy5fY2FuR29Gb3J3YXJkID0gdGhpcy5fcGFnZXMgPiAxO1xuICAgIH1cbiAgICB0aGlzLl9maWxsQ3VycmVudENvbnRlbnQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgY3VycmVudCBkYXRhIGZvciB0aGUgdGFibGUsIHVzaW5nIHBhZ2UgYW5kIHNvcnRlZCBkYXRhXG4gICAqL1xuICBwcml2YXRlIF9maWxsQ3VycmVudENvbnRlbnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NvcnRlZEFsbERhdGFDb250ZW50Lmxlbmd0aCA9PT0gMCAmJiB0aGlzLl9oZWFkZXJDb250ZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRDb250ZW50ID0gW3RoaXMuX2hlYWRlckNvbnRlbnRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBzdGFydCA9ICh0aGlzLl9jdXJyZW50UGFnZSAtIDEpICogdGhpcy5wYWdpbmF0b3JDb25maWcucGFnZVNpemU7XG4gICAgICB0aGlzLl9jdXJyZW50Q29udGVudCA9IFtcbiAgICAgICAgdGhpcy5faGVhZGVyQ29udGVudCxcbiAgICAgICAgLi4udGhpcy5fc29ydGVkQWxsRGF0YUNvbnRlbnQuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgdGhpcy5wYWdpbmF0b3JDb25maWcucGFnZVNpemUpLFxuICAgICAgXTtcbiAgICB9XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG59XG4iLCI8YWpmLWZpbHRlci13aWRnZXRcbiAgKm5nSWY9XCJpbnN0YW5jZSAmJiBpbnN0YW5jZS5maWx0ZXJcIlxuICBbaW5zdGFuY2VdPVwiaW5zdGFuY2VcIlxuICAoZmlsdGVyZWRJbnN0YW5jZSk9XCJpbnN0YW5jZSA9ICRldmVudFwiXG4gIChmaWx0ZXJXaWRnZXRDaGFuZ2UpPVwiZmlsdGVyV2lkZ2V0Q2hhbmdlZCgkZXZlbnQpXCJcbj5cbjwvYWpmLWZpbHRlci13aWRnZXQ+XG48bmctdGVtcGxhdGUgYWpmLXdpZGdldC1ob3N0PjwvbmctdGVtcGxhdGU+XG4iLCI8ZGl2ICpuZ0lmPVwiaW5zdGFuY2VcIiBjbGFzcz1cImFqZi1jb2x1bW4tY29udGFpbmVyXCI+XG4gIDxuZy1jb250YWluZXIgKm5nRm9yPVwibGV0IHcgb2YgaW5zdGFuY2UuY29udGVudFwiPlxuICAgIDxhamYtd2lkZ2V0IFtpbnN0YW5jZV09XCJ3XCI+XG4gICAgPC9hamYtd2lkZ2V0PlxuICA8L25nLWNvbnRhaW5lcj5cbjwvZGl2PlxuIiwiPGRpdiAqbmdJZj1cImluc3RhbmNlXCIgY2xhc3M9XCJhamYtY29sdW1uc1wiPlxuICA8ZGl2XG4gICAgICAqbmdGb3I9XCJsZXQgY29sdW1uIG9mIGluc3RhbmNlLndpZGdldC5jb2x1bW5zOyBsZXQgaWR4ID0gaW5kZXhcIlxuICAgICAgW25nU3R5bGVdPVwieydmbGV4LWdyb3cnOiBjb2x1bW4gPiAtMSA/IDEgOiBudWxsLCAnZmxleC1iYXNpcycgOiBjb2x1bW4gPiAtMSA/IChjb2x1bW4gKiAxMDApICsgJyUnIDogbnVsbH1cIlxuICAgICAgY2xhc3M9XCJhamYtY29sdW1uXCJcbiAgPlxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiYWxsY29sdW1uc1JlbmRlcmVkJHxhc3luY1wiPlxuICAgIDxhamYtd2lkZ2V0ICpuZ0lmPVwiKGluc3RhbmNlfGFqZkdldENvbHVtbkNvbnRlbnQ6aWR4KSBhcyBjY1wiIFtpbnN0YW5jZV09XCJjYyFcIj5cbiAgICA8L2FqZi13aWRnZXQ+XG4gIDwvbmctY29udGFpbmVyPlxuIDwvZGl2PlxuPC9kaXY+XG4iLCI8YSAqbmdJZj1cImluc3RhbmNlXCIgY2xhc3M9XCJhamYtZGlhbG9nLXRvZ2dsZVwiIChjbGljayk9XCJvcGVuRGlhbG9nKClcIj5cbiAgPGFqZi13aWRnZXQgW2luc3RhbmNlXT1cImluc3RhbmNlLnRvZ2dsZVwiPjwvYWpmLXdpZGdldD5cbjwvYT5cbjxuZy10ZW1wbGF0ZSAjZGlhbG9nQ29udGVudD5cbiAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImluc3RhbmNlXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgaXRlbSBvZiBpbnN0YW5jZS5jb250ZW50XCI+XG4gICAgICA8YWpmLXdpZGdldCBbaW5zdGFuY2VdPVwiaXRlbVwiPjwvYWpmLXdpZGdldD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy1jb250YWluZXI+XG48L25nLXRlbXBsYXRlPlxuIiwiPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtbGlzdFwiICpuZ0lmPVwiaW5zdGFuY2UgJiYgcGFnZXMgPiAwXCI+XG4gIDxkaXYgY2xhc3M9XCJhamYtcGFnaW5hdGVkLWxpc3QtdGl0bGUtY29udGFpbmVyXCI+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtbGlzdC10aXRsZVwiPnt7IGluc3RhbmNlLndpZGdldC50aXRsZSB9fTwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhamYtc3BhY2VyXCI+PC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtbGlzdC1wYWdpbmF0b3JcIj5cbiAgICAgIDxhIChjbGljayk9XCJnb1RvUGFnZSgncHJldmlvdXMnKVwiIGNsYXNzPVwiYWpmLXBhZ2luYXRlZC1saXN0LWJ0biBhamYtcGFnaW5hdGVkLWxpc3QtYmFjay1idG5cIlxuICAgICAgICAgIFtjbGFzcy5hamYtcGFnaW5hdGVkLWxpc3QtYnRuLWRpc2FibGVkXT1cImNhbkdvQmFja3dhcmQgPT09IGZhbHNlXCI+PC9hPlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtbGlzdC1wYWdpbmF0b3ItcGFnZVwiPnt7IGN1cnJlbnRQYWdlIH19PC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC1saXN0LXBhZ2luYXRvci1zZXBhcmF0b3JcIj48L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhamYtcGFnaW5hdGVkLWxpc3QtcGFnaW5hdG9yLXBhZ2VzXCI+e3sgcGFnZXMgfX08L2Rpdj5cbiAgICAgIDxhIChjbGljayk9XCJnb1RvUGFnZSgnbmV4dCcpXCIgY2xhc3M9XCJhamYtcGFnaW5hdGVkLWxpc3QtYnRuIGFqZi1wYWdpbmF0ZWQtbGlzdC1mb3J3YXJkLWJ0blwiXG4gICAgICAgIFtjbGFzcy5hamYtcGFnaW5hdGVkLWxpc3QtYnRuLWRpc2FibGVkXT1cImNhbkdvRm9yd2FyZCA9PT0gZmFsc2VcIj48L2E+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC1saXN0LWl0ZW1cIiAqbmdGb3I9XCJsZXQgaXRlbSBvZiBjdXJyZW50Q29udGVudFwiPlxuICAgIDxhamYtd2lkZ2V0IFtpbnN0YW5jZV09XCJpdGVtXCI+PC9hamYtd2lkZ2V0PlxuICA8L2Rpdj5cbjwvZGl2PlxuIiwiPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGVcIiAqbmdJZj1cImluc3RhbmNlXCI+XG4gIDxkaXYgY2xhc3M9XCJhamYtcGFnaW5hdGVkLXRhYmxlLXRpdGxlLWNvbnRhaW5lclwiICpuZ0lmPVwicGFnZXMgPiAwXCI+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtcGFnZS1zZWxlY3RvclwiPlxuICAgICAgPG1hdC1sYWJlbCBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtcGFnZS1zZWxlY3Rvci1sYWJlbFwiXG4gICAgICAgID57eydJdGVtcyBwZXIgcGFnZTonfHRyYW5zbG9jb319PC9tYXQtbGFiZWxcbiAgICAgID5cbiAgICAgIDxtYXQtc2VsZWN0XG4gICAgICAgIFt2YWx1ZV09XCJwYWdpbmF0b3JDb25maWcucGFnZVNpemVcIlxuICAgICAgICAoc2VsZWN0aW9uQ2hhbmdlKT1cIm9uUGFnZVNpemVDaGFuZ2UoJGV2ZW50LnZhbHVlKVwiXG4gICAgICA+XG4gICAgICAgIDxtYXQtb3B0aW9uXG4gICAgICAgICAgW3ZhbHVlXT1cInBhZ2VTaXplT3B0XCJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgcGFnZVNpemVPcHQgb2YgcGFnaW5hdG9yQ29uZmlnLnBhZ2VTaXplT3B0aW9uc1wiXG4gICAgICAgID5cbiAgICAgICAgICB7eyBwYWdlU2l6ZU9wdCB9fVxuICAgICAgICA8L21hdC1vcHRpb24+XG4gICAgICA8L21hdC1zZWxlY3Q+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1zcGFjZXJcIj48L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiYWpmLXBhZ2luYXRlZC10YWJsZS1wYWdpbmF0b3JcIj5cbiAgICAgIDxhXG4gICAgICAgIChjbGljayk9XCJnb1RvUGFnZSgncHJldmlvdXMnKVwiXG4gICAgICAgIGNsYXNzPVwiYWpmLXBhZ2luYXRlZC10YWJsZS1idG4gYWpmLXBhZ2luYXRlZC10YWJsZS1iYWNrLWJ0blwiXG4gICAgICAgIFtjbGFzcy5hamYtcGFnaW5hdGVkLXRhYmxlLWJ0bi1kaXNhYmxlZF09XCJjYW5Hb0JhY2t3YXJkID09PSBmYWxzZVwiXG4gICAgICA+PC9hPlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtcGFnaW5hdG9yLXBhZ2VcIj57eyBjdXJyZW50UGFnZSB9fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtcGFnaW5hdG9yLXNlcGFyYXRvclwiPjwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1wYWdpbmF0ZWQtdGFibGUtcGFnaW5hdG9yLXBhZ2VzXCI+e3sgcGFnZXMgfX08L2Rpdj5cbiAgICAgIDxhXG4gICAgICAgIChjbGljayk9XCJnb1RvUGFnZSgnbmV4dCcpXCJcbiAgICAgICAgY2xhc3M9XCJhamYtcGFnaW5hdGVkLXRhYmxlLWJ0biBhamYtcGFnaW5hdGVkLXRhYmxlLWZvcndhcmQtYnRuXCJcbiAgICAgICAgW2NsYXNzLmFqZi1wYWdpbmF0ZWQtdGFibGUtYnRuLWRpc2FibGVkXT1cImNhbkdvRm9yd2FyZCA9PT0gZmFsc2VcIlxuICAgICAgPjwvYT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJhamYtcGFnaW5hdGVkLXRhYmxlLWl0ZW1cIj5cbiAgICA8YWpmLXdpZGdldC1leHBvcnRcbiAgICAgICpuZ0lmPVwiaW5zdGFuY2VcIlxuICAgICAgW3dpZGdldFR5cGVdPVwiaW5zdGFuY2Uud2lkZ2V0VHlwZVwiXG4gICAgICBbZGF0YV09XCJleHBvcnRhYmxlQ29udGVudCgpXCJcbiAgICAgIFtlbmFibGVdPVwiaW5zdGFuY2UuZXhwb3J0YWJsZVwiXG4gICAgPlxuICAgICAgPGFqZi10YWJsZSBbZGF0YV09XCJjdXJyZW50Q29udGVudFwiIChzb3J0U2VsZWN0ZWQpPVwic29ydFBhZ2luYXRlZERhdGEoJGV2ZW50KVwiPjwvYWpmLXRhYmxlPlxuICAgIDwvYWpmLXdpZGdldC1leHBvcnQ+XG4gIDwvZGl2PlxuPC9kaXY+XG4iXX0=