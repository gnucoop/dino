import * as i2 from '@ajf/core/reports';
import { AjfBaseWidgetComponent, widgetToWidgetInstance, AjfWidgetType, AjfWidgetService as AjfWidgetService$1, AjfReportWidget as AjfReportWidget$1, AjfReportRenderer as AjfReportRenderer$1, AjfReportsModule as AjfReportsModule$1 } from '@ajf/core/reports';
import * as i0 from '@angular/core';
import { ViewEncapsulation, ChangeDetectionStrategy, Component, EventEmitter, Output, Injectable, TemplateRef, ViewChild, NgModule } from '@angular/core';
import * as i1 from '@ajf/core/chart';
import { AjfChartModule } from '@ajf/core/chart';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2$1 from '@ajf/core/forms';
import { AjfFormRendererService } from '@ajf/core/forms';
import { evaluateExpression } from '@ajf/core/models';
import { filter, switchMap, distinctUntilChanged, map } from 'rxjs/operators';
import * as i1$2 from '@ajf/core/transloco';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import * as i3 from '@ajf/material/forms';
import { AjfFormsModule } from '@ajf/material/forms';
import * as i1$3 from '@ajf/core/text';
import { AjfTextModule } from '@ajf/core/text';
import * as i1$4 from '@ajf/core/heat-map';
import { AjfHeatMapModule } from '@ajf/core/heat-map';
import { AjfImageType } from '@ajf/core/image';
import * as i1$5 from '@ajf/core/common';
import { AjfCommonModule } from '@ajf/core/common';
import * as i2$2 from '@ajf/material/image';
import { AjfImageModule } from '@ajf/material/image';
import * as i1$6 from '@ajf/core/map';
import { AjfMapModule } from '@ajf/core/map';
import * as i1$7 from '@ajf/core/page-break';
import { AjfPageBreakModule } from '@ajf/core/page-break';
import { BehaviorSubject } from 'rxjs';
import * as i1$8 from '@ajf/core/graph';
import { AjfGraphModule } from '@ajf/core/graph';
import * as i1$9 from '@ajf/core/table';
import { AjfTableModule } from '@ajf/core/table';
import * as i3$1 from '@ngneat/transloco';
import * as i4 from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import * as i6 from '@angular/material/form-field';
import * as i7 from '@angular/material/select';
import { MatSelectModule } from '@angular/material/select';
import * as i8 from '@angular/material/core';

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
function AjfChartWidgetComponent_ajf_widget_export_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ajf-widget-export", 1);
    i0.ɵɵelement(1, "ajf-chart", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("widgetType", ctx_r0.instance.widgetType)("data", ctx_r0.instance.data)("enable", ctx_r0.instance.exportable);
    i0.ɵɵadvance();
    i0.ɵɵproperty("chartType", ctx_r0.instance.chartType)("options", ctx_r0.instance.widget.options)("data", ctx_r0.instance.data)("mainDataNumberThreshold", ctx_r0.instance.mainDataNumberThreshold)("removeZeroValues", ctx_r0.instance.removeZeroValues)("instance", ctx_r0.instance);
} }
class AjfChartWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfChartWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfChartWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfChartWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "widgetType", "data", "enable", 4, "ngIf"], [3, "widgetType", "data", "enable"], [3, "chartType", "options", "data", "mainDataNumberThreshold", "removeZeroValues", "instance"]], template: function AjfChartWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfChartWidgetComponent_ajf_widget_export_0_Template, 2, 9, "ajf-widget-export", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1.AjfChartComponent, i1$1.NgIf, i2.AjfWidgetExport], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfChartWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-widget-export *ngIf=\"instance\"\n    [widgetType]=\"instance.widgetType\"\n    [data]=\"instance.data\"\n    [enable]=\"instance.exportable\">\n  <ajf-chart\n      [chartType]=\"instance.chartType\"\n      [options]=\"instance.widget.options\"\n      [data]=\"instance.data\"\n      [mainDataNumberThreshold]=\"instance.mainDataNumberThreshold\"\n      [removeZeroValues]=\"instance.removeZeroValues\"\n      [instance]=\"instance\">\n  </ajf-chart>\n</ajf-widget-export>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfChartWidgetComponent, { className: "AjfChartWidgetComponent", filePath: "chart-widget.ts", lineNumber: 38 }); })();

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
function AjfFilterWidgetComponent_ng_container_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵelement(1, "ajf-form", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const filter_r1 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("form", filter_r1.form)("hasStartMessage", false)("hasEndMessage", false)("hideTopToolbar", true)("hideBottomToolbar", true)("hideNavigationButtons", true);
} }
function AjfFilterWidgetComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFilterWidgetComponent_ng_container_0_div_1_Template, 2, 6, "div", 1);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.instance.filter);
} }
class AjfFilterWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el, _ts, _formRenderer) {
        super(cdr, el);
        this._ts = _ts;
        this._formRenderer = _formRenderer;
        this.filterWidgetChange = new EventEmitter();
        this.filteredInstance = this._formRenderer.formGroup.pipe(filter(fg => this.instance != null && this.instance.filter != null && fg != null), switchMap(formGroup => formGroup.valueChanges), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), map(filterContext => {
            const instance = this.instance;
            const filter = instance.filter;
            const newContext = { ...(filter.context || {}), ...filterContext };
            for (const variable of filter.variables || []) {
                newContext[variable.name] = evaluateExpression(variable.formula.formula, newContext);
            }
            this.instance = widgetToWidgetInstance(instance.widget, newContext, this._ts, filter.variables);
            this.filterWidgetChange.emit({ context: filterContext, widget: this.instance });
            return this.instance;
        }));
    }
    static { this.ɵfac = function AjfFilterWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFilterWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i1$2.TranslocoService), i0.ɵɵdirectiveInject(i2$1.AjfFormRendererService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFilterWidgetComponent, selectors: [["ajf-filter-widget"]], outputs: { filteredInstance: "filteredInstance", filterWidgetChange: "filterWidgetChange" }, features: [i0.ɵɵProvidersFeature([AjfFormRendererService]), i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], ["class", "ajf-filter-container", 4, "ngIf"], [1, "ajf-filter-container"], [3, "form", "hasStartMessage", "hasEndMessage", "hideTopToolbar", "hideBottomToolbar", "hideNavigationButtons"]], template: function AjfFilterWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfFilterWidgetComponent_ng_container_0_Template, 2, 1, "ng-container", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i3.AjfFormRenderer, i1$1.NgIf], styles: ["ajf-filter-widget .ajf-filter-container ajf-page-slider-item{flex:auto!important}ajf-filter-widget .ajf-filter-container ajf-page-slider-item .ajf-page-slider-item-content{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container .mat-mdc-card-header{display:none}ajf-filter-widget .ajf-field-entry{width:unset!important;min-width:200px}ajf-filter-widget mat-card{min-height:50px!important}ajf-filter-widget mat-card-content{padding:15px 15px 0!important}ajf-filter-widget mat-card-actions{display:none!important}ajf-filter-widget .mat-mdc-select-value{box-shadow:0 5px 5px -5px #0003}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFilterWidgetComponent, [{
        type: Component,
        args: [{ selector: 'ajf-filter-widget', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, providers: [AjfFormRendererService], template: "<ng-container *ngIf=\"instance\">\n  <div *ngIf=\"instance.filter as filter\" class=\"ajf-filter-container\">\n    <ajf-form\n      [form]=\"filter.form\"\n      [hasStartMessage]=\"false\"\n      [hasEndMessage]=\"false\"\n      [hideTopToolbar]=\"true\"\n      [hideBottomToolbar]=\"true\"\n      [hideNavigationButtons]=\"true\"\n    ></ajf-form>\n  </div>\n</ng-container>\n", styles: ["ajf-filter-widget .ajf-filter-container ajf-page-slider-item{flex:auto!important}ajf-filter-widget .ajf-filter-container ajf-page-slider-item .ajf-page-slider-item-content{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container{position:relative}ajf-filter-widget .ajf-filter-container .ajf-form-container .mat-mdc-card-header{display:none}ajf-filter-widget .ajf-field-entry{width:unset!important;min-width:200px}ajf-filter-widget mat-card{min-height:50px!important}ajf-filter-widget mat-card-content{padding:15px 15px 0!important}ajf-filter-widget mat-card-actions{display:none!important}ajf-filter-widget .mat-mdc-select-value{box-shadow:0 5px 5px -5px #0003}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i1$2.TranslocoService }, { type: i2$1.AjfFormRendererService }], { filteredInstance: [{
            type: Output
        }], filterWidgetChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFilterWidgetComponent, { className: "AjfFilterWidgetComponent", filePath: "filter-widget.ts", lineNumber: 54 }); })();

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
function AjfFormulaWidgetComponent_ajf_text_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-text", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("htmlText", ctx_r0.instance.formula);
} }
class AjfFormulaWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfFormulaWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormulaWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFormulaWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "htmlText", 4, "ngIf"], [3, "htmlText"]], template: function AjfFormulaWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfFormulaWidgetComponent_ajf_text_0_Template, 1, 1, "ajf-text", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1$3.AjfTextComponent, i1$1.NgIf], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormulaWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-text *ngIf=\"instance\" [htmlText]=\"instance.formula\"></ajf-text>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFormulaWidgetComponent, { className: "AjfFormulaWidgetComponent", filePath: "formula-widget.ts", lineNumber: 38 }); })();

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
function AjfHeatMapWidgetComponent_ajf_heat_map_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-heat-map", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("idProp", ctx_r0.instance.idProp)("features", ctx_r0.instance.features)("values", ctx_r0.instance.values)("startColor", ctx_r0.instance.startColor)("endColor", ctx_r0.instance.endColor)("highlightColor", ctx_r0.instance.highlightColor)("showVisualMap", ctx_r0.instance.showVisualMap)("action", ctx_r0.instance.action);
} }
class AjfHeatMapWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfHeatMapWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfHeatMapWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfHeatMapWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "idProp", "features", "values", "startColor", "endColor", "highlightColor", "showVisualMap", "action", 4, "ngIf"], [3, "idProp", "features", "values", "startColor", "endColor", "highlightColor", "showVisualMap", "action"]], template: function AjfHeatMapWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfHeatMapWidgetComponent_ajf_heat_map_0_Template, 1, 8, "ajf-heat-map", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1$4.AjfHeatMap, i1$1.NgIf], styles: ["ajf-widget ajf-heat-map{flex:1;height:100%}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfHeatMapWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-heat-map\n  *ngIf=\"instance\"\n  [idProp]=\"instance.idProp\"\n  [features]=\"instance.features\"\n  [values]=\"instance.values\"\n  [startColor]=\"instance.startColor\"\n  [endColor]=\"instance.endColor\"\n  [highlightColor]=\"instance.highlightColor\"\n  [showVisualMap]=\"instance.showVisualMap\"\n  [action]=\"instance.action\"\n></ajf-heat-map>\n", styles: ["ajf-widget ajf-heat-map{flex:1;height:100%}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfHeatMapWidgetComponent, { className: "AjfHeatMapWidgetComponent", filePath: "heat-map-widget.ts", lineNumber: 38 }); })();

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
function AjfImageContainerWidgetComponent_div_0_ng_template_1_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ajf-image", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const icw_r1 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("type", ctx_r1.instance.widget.imageType)("imageUrl", icw_r1)("icon", null)("flag", null)("applyStyles", ctx_r1.instance.widget.styles);
} }
function AjfImageContainerWidgetComponent_div_0_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfImageContainerWidgetComponent_div_0_ng_template_1_div_0_Template, 2, 5, "div", 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.urls);
} }
function AjfImageContainerWidgetComponent_div_0_ng_template_2_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ajf-image", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const icw_r3 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("type", ctx_r1.instance.widget.imageType)("imageUrl", null)("icon", null)("flag", icw_r3)("applyStyles", ctx_r1.instance.widget.styles);
} }
function AjfImageContainerWidgetComponent_div_0_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfImageContainerWidgetComponent_div_0_ng_template_2_div_0_Template, 2, 5, "div", 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.flags);
} }
function AjfImageContainerWidgetComponent_div_0_ng_template_3_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵelement(1, "ajf-image", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const icw_r4 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("type", ctx_r1.instance.widget.imageType)("imageUrl", null)("icon", icw_r4)("flag", null)("applyStyles", ctx_r1.instance.widget.styles);
} }
function AjfImageContainerWidgetComponent_div_0_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfImageContainerWidgetComponent_div_0_ng_template_3_div_0_Template, 2, 5, "div", 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.icons);
} }
function AjfImageContainerWidgetComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵtemplate(1, AjfImageContainerWidgetComponent_div_0_ng_template_1_Template, 1, 1, "ng-template", 2)(2, AjfImageContainerWidgetComponent_div_0_ng_template_2_Template, 1, 1, "ng-template", 2)(3, AjfImageContainerWidgetComponent_div_0_ng_template_3_Template, 1, 1, "ng-template", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngSwitch", ctx_r1.instance.widget.imageType);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", ctx_r1.imageTypes.Image);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", ctx_r1.imageTypes.Flag);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngSwitchCase", ctx_r1.imageTypes.Icon);
} }
class AjfImageContainerWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
        this.imageTypes = AjfImageType;
    }
    static { this.ɵfac = function AjfImageContainerWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfImageContainerWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfImageContainerWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["class", "ajf-image-container ajf-columns", 3, "ngSwitch", 4, "ngIf"], [1, "ajf-image-container", "ajf-columns", 3, "ngSwitch"], [3, "ngSwitchCase"], ["class", "ajf-column", 4, "ngFor", "ngForOf"], [1, "ajf-column"], [3, "type", "imageUrl", "icon", "flag", "applyStyles"]], template: function AjfImageContainerWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfImageContainerWidgetComponent_div_0_Template, 4, 4, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1$5.ApplyStylesDirective, i2$2.AjfImage, i1$1.NgForOf, i1$1.NgIf, i1$1.NgSwitch, i1$1.NgSwitchCase], styles: [".ajf-image-container img{max-width:none;max-height:none}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfImageContainerWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-image-container ajf-columns\" [ngSwitch]=\"instance.widget.imageType\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <div *ngFor=\"let icw of instance.urls; let idx = index\" class=\"ajf-column\">\n      <ajf-image\n          [type]=\"instance.widget.imageType\"\n          [imageUrl]=\"icw\"\n          [icon]=\"null\"\n          [flag]=\"null\"\n          [applyStyles]=\"instance.widget!.styles\"\n      ></ajf-image>\n    </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Flag\">\n      <div *ngFor=\"let icw of instance.flags; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"null\"\n            [flag]=\"icw\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n      <div *ngFor=\"let icw of instance.icons; let idx = index\" class=\"ajf-column\">\n        <ajf-image\n            [type]=\"instance.widget.imageType\"\n            [imageUrl]=\"null\"\n            [icon]=\"icw\"\n            [flag]=\"null\"\n            [applyStyles]=\"instance.widget!.styles\"\n        ></ajf-image>\n      </div>\n  </ng-template>\n</div>\n", styles: [".ajf-image-container img{max-width:none;max-height:none}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfImageContainerWidgetComponent, { className: "AjfImageContainerWidgetComponent", filePath: "image-container-widget.ts", lineNumber: 39 }); })();

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
function AjfImageWidgetComponent_ajf_image_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-image", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("type", ctx_r0.instance.widget.imageType)("imageUrl", ctx_r0.instance.url)("icon", ctx_r0.instance.icon)("flag", ctx_r0.instance.flag);
} }
class AjfImageWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfImageWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfImageWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfImageWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "type", "imageUrl", "icon", "flag", 4, "ngIf"], [3, "type", "imageUrl", "icon", "flag"]], template: function AjfImageWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfImageWidgetComponent_ajf_image_0_Template, 1, 4, "ajf-image", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i2$2.AjfImage, i1$1.NgIf], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfImageWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-image *ngIf=\"instance\"\n    [type]=\"instance.widget.imageType\"\n    [imageUrl]=\"instance.url\"\n    [icon]=\"instance.icon\"\n    [flag]=\"instance.flag\"\n></ajf-image>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfImageWidgetComponent, { className: "AjfImageWidgetComponent", filePath: "image-widget.ts", lineNumber: 38 }); })();

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
function AjfMapWidgetComponent_ajf_map_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-map", 1);
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("coordinate", ctx_r0.instance.coordinate)("tileLayer", ctx_r0.instance.widget.tileLayer)("attribution", ctx_r0.instance.widget.attribution)("disabled", ctx_r0.instance.widget.disabled);
} }
class AjfMapWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfMapWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfMapWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfMapWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "coordinate", "tileLayer", "attribution", "disabled", 4, "ngIf"], [3, "coordinate", "tileLayer", "attribution", "disabled"]], template: function AjfMapWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfMapWidgetComponent_ajf_map_0_Template, 1, 4, "ajf-map", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1$6.AjfMapComponent, i1$1.NgIf], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfMapWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-map *ngIf=\"instance\"\n    [coordinate]=\"instance.coordinate\"\n    [tileLayer]=\"instance.widget.tileLayer\"\n    [attribution]=\"instance.widget.attribution\"\n    [disabled]=\"instance.widget.disabled\"\n></ajf-map>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfMapWidgetComponent, { className: "AjfMapWidgetComponent", filePath: "map-widget.ts", lineNumber: 38 }); })();

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
class AjfPageBreakWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfPageBreakWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfPageBreakWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfPageBreakWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 0, template: function AjfPageBreakWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelement(0, "ajf-page-break");
        } }, dependencies: [i1$7.AjfPageBreakComponent], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfPageBreakWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-page-break></ajf-page-break>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfPageBreakWidgetComponent, { className: "AjfPageBreakWidgetComponent", filePath: "page-break-widget.ts", lineNumber: 38 }); })();

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
function AjfGraphWidgetComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 1);
    i0.ɵɵelement(1, "ajf-graph", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("nodes", ctx_r0.instance.nodes);
} }
class AjfGraphWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfGraphWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfGraphWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfGraphWidgetComponent, selectors: [["ajf-graph-widget"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["class", "ajf-graph-container", 4, "ngIf"], [1, "ajf-graph-container"], [3, "nodes"]], template: function AjfGraphWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfGraphWidgetComponent_div_0_Template, 2, 1, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1$8.AjfGraphComponent, i1$1.NgIf], styles: ["ajf-graph-widget{width:100%;height:600px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfGraphWidgetComponent, [{
        type: Component,
        args: [{ selector: 'ajf-graph-widget', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-graph-container\">\n  <ajf-graph [nodes]=\"instance.nodes\"></ajf-graph>\n</div>\n", styles: ["ajf-graph-widget{width:100%;height:600px}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfGraphWidgetComponent, { className: "AjfGraphWidgetComponent", filePath: "graph-widget.ts", lineNumber: 39 }); })();

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
function AjfTableWidgetComponent_ajf_widget_export_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "ajf-widget-export", 1);
    i0.ɵɵelement(1, "ajf-table", 2);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("widgetType", ctx_r0.instance.widgetType)("data", ctx_r0.instance.data)("enable", ctx_r0.instance.exportable);
    i0.ɵɵadvance();
    i0.ɵɵproperty("data", ctx_r0.instance.data);
} }
class AjfTableWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfTableWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTableWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTableWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "widgetType", "data", "enable", 4, "ngIf"], [3, "widgetType", "data", "enable"], [3, "data"]], template: function AjfTableWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfTableWidgetComponent_ajf_widget_export_0_Template, 2, 4, "ajf-widget-export", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1$9.AjfTable, i1$1.NgIf, i2.AjfWidgetExport], styles: ["table{border-spacing:0}table tr th,table tr td{padding:10px}table tr td .read_more_cell{cursor:pointer;margin:0;white-space:nowrap;display:inline-block}table tr td .read_more_text{padding-right:5px;margin:0;display:inline-block;white-space:nowrap}table tr td .material-icons{vertical-align:middle;cursor:pointer}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTableWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-widget-export\n  *ngIf=\"instance\"\n  [widgetType]=\"instance.widgetType\"\n  [data]=\"instance.data\"\n  [enable]=\"instance.exportable\"\n>\n  <ajf-table [data]=\"instance.data\"></ajf-table>\n</ajf-widget-export>\n", styles: ["table{border-spacing:0}table tr th,table tr td{padding:10px}table tr td .read_more_cell{cursor:pointer;margin:0;white-space:nowrap;display:inline-block}table tr td .read_more_text{padding-right:5px;margin:0;display:inline-block;white-space:nowrap}table tr td .material-icons{vertical-align:middle;cursor:pointer}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTableWidgetComponent, { className: "AjfTableWidgetComponent", filePath: "table-widget.ts", lineNumber: 38 }); })();

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
function AjfTextWidgetComponent_ajf_text_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-text", 1);
    i0.ɵɵpipe(1, "transloco");
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵproperty("htmlText", i0.ɵɵpipeBind1(1, 1, ctx_r0.instance.htmlText));
} }
class AjfTextWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfTextWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTextWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfTextWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "htmlText", 4, "ngIf"], [3, "htmlText"]], template: function AjfTextWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfTextWidgetComponent_ajf_text_0_Template, 2, 3, "ajf-text", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1$3.AjfTextComponent, i1$1.NgIf, i3$1.TranslocoPipe], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTextWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-text *ngIf=\"instance\" [htmlText]=\"instance.htmlText | transloco\"></ajf-text>\n" }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfTextWidgetComponent, { className: "AjfTextWidgetComponent", filePath: "text-widget.ts", lineNumber: 38 }); })();

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
    defaultWidgets[AjfWidgetType.Layout] = { component: AjfLayoutWidgetComponent };
    defaultWidgets[AjfWidgetType.PageBreak] = { component: AjfPageBreakWidgetComponent };
    defaultWidgets[AjfWidgetType.Image] = { component: AjfImageWidgetComponent };
    defaultWidgets[AjfWidgetType.Text] = { component: AjfTextWidgetComponent };
    defaultWidgets[AjfWidgetType.Chart] = { component: AjfChartWidgetComponent };
    defaultWidgets[AjfWidgetType.Table] = { component: AjfTableWidgetComponent };
    defaultWidgets[AjfWidgetType.DynamicTable] = { component: AjfTableWidgetComponent };
    defaultWidgets[AjfWidgetType.Map] = { component: AjfMapWidgetComponent };
    defaultWidgets[AjfWidgetType.Column] = { component: AjfColumnWidgetComponent };
    defaultWidgets[AjfWidgetType.Formula] = { component: AjfFormulaWidgetComponent };
    defaultWidgets[AjfWidgetType.ImageContainer] = { component: AjfImageContainerWidgetComponent };
    defaultWidgets[AjfWidgetType.Graph] = { component: AjfGraphWidgetComponent };
    defaultWidgets[AjfWidgetType.PaginatedList] = { component: AjfPaginatedListWidgetComponent };
    defaultWidgets[AjfWidgetType.PaginatedTable] = { component: AjfPaginatedTableWidgetComponent };
    defaultWidgets[AjfWidgetType.Dialog] = { component: AjfDialogWidgetComponent };
    defaultWidgets[AjfWidgetType.HeatMap] = { component: AjfHeatMapWidgetComponent };
    return defaultWidgets;
};
class AjfWidgetService extends AjfWidgetService$1 {
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
class AjfReportWidget extends AjfReportWidget$1 {
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
        } }, dependencies: [i1$1.NgIf, i2.AjfWidgetHost, AjfFilterWidgetComponent], styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box;flex-direction:column}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportWidget, [{
        type: Component,
        args: [{ selector: 'ajf-widget', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ajf-filter-widget\n  *ngIf=\"instance && instance.filter\"\n  [instance]=\"instance\"\n  (filteredInstance)=\"instance = $event\"\n  (filterWidgetChange)=\"filterWidgetChanged($event)\"\n>\n</ajf-filter-widget>\n<ng-template ajf-widget-host></ng-template>\n", styles: ["ajf-widget{display:flex;flex:1 1 auto;box-sizing:border-box;flex-direction:column}ajf-widget>ng-component{flex:1 1 auto;display:flex;align-items:center;box-sizing:border-box;background-color:transparent}\n"] }]
    }], () => [{ type: i0.Renderer2 }, { type: AjfWidgetService }], { filterWidgetChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfReportWidget, { className: "AjfReportWidget", filePath: "widget.ts", lineNumber: 106 }); })();
class AjfColumnWidgetComponent extends AjfBaseWidgetComponent {
    constructor(cdr, el) {
        super(cdr, el);
    }
    static { this.ɵfac = function AjfColumnWidgetComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfColumnWidgetComponent)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.ElementRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfColumnWidgetComponent, selectors: [["ng-component"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["class", "ajf-column-container", 4, "ngIf"], [1, "ajf-column-container"], [4, "ngFor", "ngForOf"], [3, "instance"]], template: function AjfColumnWidgetComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfColumnWidgetComponent_div_0_Template, 2, 1, "div", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1$1.NgForOf, i1$1.NgIf, AjfReportWidget], styles: [".ajf-column-container{width:100%}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfColumnWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-column-container\">\n  <ng-container *ngFor=\"let w of instance.content\">\n    <ajf-widget [instance]=\"w\">\n    </ajf-widget>\n  </ng-container>\n</div>\n", styles: [".ajf-column-container{width:100%}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfColumnWidgetComponent, { className: "AjfColumnWidgetComponent", filePath: "widget.ts", lineNumber: 126 }); })();
class AjfLayoutWidgetComponent extends AjfBaseWidgetComponent {
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
        } }, dependencies: [i1$1.NgForOf, i1$1.NgIf, i1$1.NgStyle, AjfReportWidget, i1$1.AsyncPipe, i2.AjfGetColumnContentPipe], styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfLayoutWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"instance\" class=\"ajf-columns\">\n  <div\n      *ngFor=\"let column of instance.widget.columns; let idx = index\"\n      [ngStyle]=\"{'flex-grow': column > -1 ? 1 : null, 'flex-basis' : column > -1 ? (column * 100) + '%' : null}\"\n      class=\"ajf-column\"\n  >\n  <ng-container *ngIf=\"allcolumnsRendered$|async\">\n    <ajf-widget *ngIf=\"(instance|ajfGetColumnContent:idx) as cc\" [instance]=\"cc!\">\n    </ajf-widget>\n  </ng-container>\n </div>\n</div>\n", styles: [".ajf-columns{flex:1 1 auto;display:flex;align-items:inherit;box-sizing:border-box}.ajf-columns>.ajf-column{box-sizing:border-box;display:flex;align-items:inherit;flex-shrink:1}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfLayoutWidgetComponent, { className: "AjfLayoutWidgetComponent", filePath: "widget.ts", lineNumber: 138 }); })();
class AjfDialogWidgetComponent extends AjfBaseWidgetComponent {
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
        } }, dependencies: [i1$1.NgForOf, i1$1.NgIf, AjfReportWidget], styles: [".ajf-dialog-toggle{display:block;cursor:pointer}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfDialogWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<a *ngIf=\"instance\" class=\"ajf-dialog-toggle\" (click)=\"openDialog()\">\n  <ajf-widget [instance]=\"instance.toggle\"></ajf-widget>\n</a>\n<ng-template #dialogContent>\n  <ng-container *ngIf=\"instance\">\n    <ng-container *ngFor=\"let item of instance.content\">\n      <ajf-widget [instance]=\"item\"></ajf-widget>\n    </ng-container>\n  </ng-container>\n</ng-template>\n", styles: [".ajf-dialog-toggle{display:block;cursor:pointer}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i4.MatDialog }], { dialogContent: [{
            type: ViewChild,
            args: ['dialogContent', { read: TemplateRef }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfDialogWidgetComponent, { className: "AjfDialogWidgetComponent", filePath: "widget.ts", lineNumber: 160 }); })();
class AjfPaginatedListWidgetComponent extends AjfBaseWidgetComponent {
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
        } }, dependencies: [i1$1.NgForOf, i1$1.NgIf, AjfReportWidget], styles: [".ajf-paginated-list-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-list-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-list-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-list-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-list-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-list-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-list-back-btn:after{content:\"<\"}.ajf-paginated-list-forward-btn:after{content:\">\"}.ajf-paginated-list-paginator{display:flex;align-items:center}.ajf-paginated-list-paginator>*{margin:0 .5em}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfPaginatedListWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-paginated-list\" *ngIf=\"instance && pages > 0\">\n  <div class=\"ajf-paginated-list-title-container\">\n    <div class=\"ajf-paginated-list-title\">{{ instance.widget.title }}</div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-list-paginator\">\n      <a (click)=\"goToPage('previous')\" class=\"ajf-paginated-list-btn ajf-paginated-list-back-btn\"\n          [class.ajf-paginated-list-btn-disabled]=\"canGoBackward === false\"></a>\n      <div class=\"ajf-paginated-list-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-list-paginator-separator\"></div>\n      <div class=\"ajf-paginated-list-paginator-pages\">{{ pages }}</div>\n      <a (click)=\"goToPage('next')\" class=\"ajf-paginated-list-btn ajf-paginated-list-forward-btn\"\n        [class.ajf-paginated-list-btn-disabled]=\"canGoForward === false\"></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-list-item\" *ngFor=\"let item of currentContent\">\n    <ajf-widget [instance]=\"item\"></ajf-widget>\n  </div>\n</div>\n", styles: [".ajf-paginated-list-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-list-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-list-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-list-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-list-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-list-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-list-back-btn:after{content:\"<\"}.ajf-paginated-list-forward-btn:after{content:\">\"}.ajf-paginated-list-paginator{display:flex;align-items:center}.ajf-paginated-list-paginator>*{margin:0 .5em}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfPaginatedListWidgetComponent, { className: "AjfPaginatedListWidgetComponent", filePath: "widget.ts", lineNumber: 178 }); })();
class AjfPaginatedTableWidgetComponent extends AjfBaseWidgetComponent {
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
        } }, dependencies: [i1$9.AjfTable, i1$1.NgForOf, i1$1.NgIf, i2.AjfWidgetExport, i6.MatLabel, i7.MatSelect, i8.MatOption, i3$1.TranslocoPipe], styles: ["table{border-spacing:0}table td{padding:10px}.ajf-paginated-table{width:100%;overflow-x:auto}.ajf-paginated-table table{min-width:100%}.ajf-paginated-table-page-selector{display:flex;align-items:baseline}.ajf-paginated-table-page-selector .ajf-paginated-table-page-selector-label{white-space:nowrap;margin-right:4px;font-size:.9em}.ajf-paginated-table-page-selector .mat-mdc-select{width:70px;font-size:.9em}.ajf-paginated-table-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-table-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-table-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-table-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-table-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-table-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-table-back-btn:after{content:\"<\"}.ajf-paginated-table-forward-btn:after{content:\">\"}.ajf-paginated-table-paginator{display:flex;align-items:center;font-size:.9em}.ajf-paginated-table-paginator>*{margin:0 .5em}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfPaginatedTableWidgetComponent, [{
        type: Component,
        args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"ajf-paginated-table\" *ngIf=\"instance\">\n  <div class=\"ajf-paginated-table-title-container\" *ngIf=\"pages > 0\">\n    <div class=\"ajf-paginated-table-page-selector\">\n      <mat-label class=\"ajf-paginated-table-page-selector-label\"\n        >{{'Items per page:'|transloco}}</mat-label\n      >\n      <mat-select\n        [value]=\"paginatorConfig.pageSize\"\n        (selectionChange)=\"onPageSizeChange($event.value)\"\n      >\n        <mat-option\n          [value]=\"pageSizeOpt\"\n          *ngFor=\"let pageSizeOpt of paginatorConfig.pageSizeOptions\"\n        >\n          {{ pageSizeOpt }}\n        </mat-option>\n      </mat-select>\n    </div>\n    <div class=\"ajf-spacer\"></div>\n    <div class=\"ajf-paginated-table-paginator\">\n      <a\n        (click)=\"goToPage('previous')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-back-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoBackward === false\"\n      ></a>\n      <div class=\"ajf-paginated-table-paginator-page\">{{ currentPage }}</div>\n      <div class=\"ajf-paginated-table-paginator-separator\"></div>\n      <div class=\"ajf-paginated-table-paginator-pages\">{{ pages }}</div>\n      <a\n        (click)=\"goToPage('next')\"\n        class=\"ajf-paginated-table-btn ajf-paginated-table-forward-btn\"\n        [class.ajf-paginated-table-btn-disabled]=\"canGoForward === false\"\n      ></a>\n    </div>\n  </div>\n  <div class=\"ajf-paginated-table-item\">\n    <ajf-widget-export\n      *ngIf=\"instance\"\n      [widgetType]=\"instance.widgetType\"\n      [data]=\"exportableContent()\"\n      [enable]=\"instance.exportable\"\n    >\n      <ajf-table [data]=\"currentContent\" (sortSelected)=\"sortPaginatedData($event)\"></ajf-table>\n    </ajf-widget-export>\n  </div>\n</div>\n", styles: ["table{border-spacing:0}table td{padding:10px}.ajf-paginated-table{width:100%;overflow-x:auto}.ajf-paginated-table table{min-width:100%}.ajf-paginated-table-page-selector{display:flex;align-items:baseline}.ajf-paginated-table-page-selector .ajf-paginated-table-page-selector-label{white-space:nowrap;margin-right:4px;font-size:.9em}.ajf-paginated-table-page-selector .mat-mdc-select{width:70px;font-size:.9em}.ajf-paginated-table-title-container{display:flex;align-items:center}.ajf-spacer{flex:1 0 auto}.ajf-paginated-table-btn{cursor:pointer;display:block;width:32px;height:32px;position:relative}.ajf-paginated-table-btn:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center}.ajf-paginated-table-paginator-separator{width:16px;height:32px;position:relative}.ajf-paginated-table-paginator-separator:after{width:100%;height:100%;display:flex;justify-content:center;align-items:center;content:\"/\"}.ajf-paginated-table-btn-disabled{opacity:.5;cursor:default}.ajf-paginated-table-back-btn:after{content:\"<\"}.ajf-paginated-table-forward-btn:after{content:\">\"}.ajf-paginated-table-paginator{display:flex;align-items:center;font-size:.9em}.ajf-paginated-table-paginator>*{margin:0 .5em}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfPaginatedTableWidgetComponent, { className: "AjfPaginatedTableWidgetComponent", filePath: "widget.ts", lineNumber: 267 }); })();

function AjfReportRenderer_ng_template_0_div_0_ng_template_1_ajf_widget_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-widget", 7);
} if (rf & 2) {
    const instance_r1 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("instance", instance_r1);
} }
function AjfReportRenderer_ng_template_0_div_0_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfReportRenderer_ng_template_0_div_0_ng_template_1_ajf_widget_0_Template, 1, 1, "ajf-widget", 6);
} if (rf & 2) {
    const instance_r1 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", instance_r1.visible);
} }
function AjfReportRenderer_ng_template_0_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4);
    i0.ɵɵtemplate(1, AjfReportRenderer_ng_template_0_div_0_ng_template_1_Template, 1, 1, "ng-template", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("@.disabled", undefined)("applyStyles", ctx_r1.instance.header.styles);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.header.content);
} }
function AjfReportRenderer_ng_template_0_div_1_ajf_widget_export_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-widget-export", 10);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("overlay", false)("widgets", ctx_r1.instance.content.content)("enable", true);
} }
function AjfReportRenderer_ng_template_0_div_1_ng_template_2_ajf_widget_0_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ajf-widget", 12);
    i0.ɵɵlistener("filterWidgetChange", function AjfReportRenderer_ng_template_0_div_1_ng_template_2_ajf_widget_0_Template_ajf_widget_filterWidgetChange_0_listener($event) { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.filterWidgetChanged($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const instance_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("instance", instance_r4);
} }
function AjfReportRenderer_ng_template_0_div_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfReportRenderer_ng_template_0_div_1_ng_template_2_ajf_widget_0_Template, 1, 1, "ajf-widget", 11);
} if (rf & 2) {
    const instance_r4 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", instance_r4.visible);
} }
function AjfReportRenderer_ng_template_0_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8);
    i0.ɵɵtemplate(1, AjfReportRenderer_ng_template_0_div_1_ajf_widget_export_1_Template, 1, 3, "ajf-widget-export", 9)(2, AjfReportRenderer_ng_template_0_div_1_ng_template_2_Template, 1, 1, "ng-template", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("@.disabled", undefined)("applyStyles", ctx_r1.instance.content.styles);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.enableExportAll);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.content.content);
} }
function AjfReportRenderer_ng_template_0_div_2_ng_template_1_ajf_widget_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-widget", 7);
} if (rf & 2) {
    const instance_r5 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵproperty("instance", instance_r5);
} }
function AjfReportRenderer_ng_template_0_div_2_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfReportRenderer_ng_template_0_div_2_ng_template_1_ajf_widget_0_Template, 1, 1, "ajf-widget", 6);
} if (rf & 2) {
    const instance_r5 = ctx.$implicit;
    i0.ɵɵproperty("ngIf", instance_r5.visible);
} }
function AjfReportRenderer_ng_template_0_div_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 13);
    i0.ɵɵtemplate(1, AjfReportRenderer_ng_template_0_div_2_ng_template_1_Template, 1, 1, "ng-template", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("@.disabled", undefined)("applyStyles", ctx_r1.instance.footer.styles);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.instance.footer.content);
} }
function AjfReportRenderer_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfReportRenderer_ng_template_0_div_0_Template, 2, 3, "div", 1)(1, AjfReportRenderer_ng_template_0_div_1_Template, 3, 4, "div", 2)(2, AjfReportRenderer_ng_template_0_div_2_Template, 2, 3, "div", 3);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", ctx_r1.instance.header);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.instance.content);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.instance.footer);
} }
class AjfReportRenderer extends AjfReportRenderer$1 {
    constructor(cdr) {
        super(cdr);
        this.filterWidgetChange = new EventEmitter();
    }
    filterWidgetChanged(changes) {
        const report = this.instance;
        if (report.content.content.length === 1) {
            // Report likely has 1 global layout widget with a filter,
            // create a copy of the report with the updated layout widget
            const layout = changes.widget;
            const contentContent = [layout];
            const content = { ...report.content, content: contentContent };
            const newReport = { ...report, content };
            this.filterWidgetChange.emit({ context: changes.context, report: newReport });
        }
        else {
            this.filterWidgetChange.emit({ context: changes.context });
        }
    }
    static { this.ɵfac = function AjfReportRenderer_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReportRenderer)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfReportRenderer, selectors: [["ajf-report"]], outputs: { filterWidgetChange: "filterWidgetChange" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "ngIf"], ["class", "ajf-report-header", 3, "applyStyles", 4, "ngIf"], ["class", "ajf-report-content", 3, "applyStyles", 4, "ngIf"], ["class", "ajf-report-footer", 3, "applyStyles", 4, "ngIf"], [1, "ajf-report-header", 3, "applyStyles"], ["ngFor", "", 3, "ngForOf"], [3, "instance", 4, "ngIf"], [3, "instance"], [1, "ajf-report-content", 3, "applyStyles"], [3, "overlay", "widgets", "enable", 4, "ngIf"], [3, "overlay", "widgets", "enable"], [3, "instance", "filterWidgetChange", 4, "ngIf"], [3, "filterWidgetChange", "instance"], [1, "ajf-report-footer", 3, "applyStyles"]], template: function AjfReportRenderer_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfReportRenderer_ng_template_0_Template, 3, 3, "ng-template", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.instance);
        } }, dependencies: [i1$5.ApplyStylesDirective, i1$1.NgForOf, i1$1.NgIf, i2.AjfWidgetExport, AjfReportWidget], styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;inset:0;min-height:300px;padding:100px;text-align:center;background-color:#f0f0f066;display:flex;justify-content:center}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportRenderer, [{
        type: Component,
        args: [{ selector: 'ajf-report', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"instance\">\n  <div *ngIf=\"instance.header\" @.disabled [applyStyles]=\"instance.header.styles\" class=\"ajf-report-header\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.header.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.content\" @.disabled [applyStyles]=\"instance.content.styles\" class=\"ajf-report-content\">\n    <ajf-widget-export *ngIf=\"enableExportAll\"\n      [overlay]=\"false\"\n      [widgets]=\"instance.content.content\"\n      [enable]=\"true\"></ajf-widget-export>\n    <ng-template ngFor let-instance [ngForOf]=\"instance.content.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"\n        (filterWidgetChange)=\"filterWidgetChanged($event)\">\n      </ajf-widget>\n    </ng-template>\n  </div>\n  <div *ngIf=\"instance.footer\" @.disabled [applyStyles]=\"instance.footer.styles\" class=\"ajf-report-footer\">\n    <ng-template ngFor let-instance [ngForOf]=\"instance.footer.content\">\n      <ajf-widget *ngIf=\"instance.visible\" [instance]=\"instance\"></ajf-widget>\n    </ng-template>\n  </div>\n</ng-template>\n", styles: ["ajf-report{display:flex;flex-direction:column;align-items:stretch;box-sizing:border-box;position:relative;width:100%}ajf-report h1,ajf-report h2,ajf-report h3,ajf-report h4,ajf-report h5,ajf-report h6,ajf-report p{padding:0;margin:0}ajf-report .ajf-loading{position:absolute;inset:0;min-height:300px;padding:100px;text-align:center;background-color:#f0f0f066;display:flex;justify-content:center}\n"] }]
    }], () => [{ type: i0.ChangeDetectorRef }], { filterWidgetChange: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfReportRenderer, { className: "AjfReportRenderer", filePath: "report.ts", lineNumber: 45 }); })();

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
class AjfReportsModule {
    static { this.ɵfac = function AjfReportsModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReportsModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfReportsModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [AjfChartModule,
            AjfCommonModule,
            AjfImageModule,
            AjfFormsModule,
            AjfGraphModule,
            AjfHeatMapModule,
            AjfMapModule,
            AjfPageBreakModule,
            AjfTableModule,
            AjfTextModule,
            AjfTranslocoModule,
            CommonModule,
            AjfReportsModule$1,
            MatDialogModule,
            MatSelectModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    AjfChartModule,
                    AjfCommonModule,
                    AjfImageModule,
                    AjfFormsModule,
                    AjfGraphModule,
                    AjfHeatMapModule,
                    AjfMapModule,
                    AjfPageBreakModule,
                    AjfTableModule,
                    AjfTextModule,
                    AjfTranslocoModule,
                    CommonModule,
                    AjfReportsModule$1,
                    MatDialogModule,
                    MatSelectModule,
                ],
                declarations: [
                    AjfChartWidgetComponent,
                    AjfColumnWidgetComponent,
                    AjfDialogWidgetComponent,
                    AjfFilterWidgetComponent,
                    AjfFormulaWidgetComponent,
                    AjfHeatMapWidgetComponent,
                    AjfImageContainerWidgetComponent,
                    AjfImageWidgetComponent,
                    AjfGraphWidgetComponent,
                    AjfLayoutWidgetComponent,
                    AjfMapWidgetComponent,
                    AjfPageBreakWidgetComponent,
                    AjfPaginatedListWidgetComponent,
                    AjfPaginatedTableWidgetComponent,
                    AjfReportRenderer,
                    AjfReportWidget,
                    AjfTableWidgetComponent,
                    AjfTextWidgetComponent,
                ],
                exports: [AjfReportRenderer, AjfReportWidget],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfReportsModule, { declarations: [AjfChartWidgetComponent,
        AjfColumnWidgetComponent,
        AjfDialogWidgetComponent,
        AjfFilterWidgetComponent,
        AjfFormulaWidgetComponent,
        AjfHeatMapWidgetComponent,
        AjfImageContainerWidgetComponent,
        AjfImageWidgetComponent,
        AjfGraphWidgetComponent,
        AjfLayoutWidgetComponent,
        AjfMapWidgetComponent,
        AjfPageBreakWidgetComponent,
        AjfPaginatedListWidgetComponent,
        AjfPaginatedTableWidgetComponent,
        AjfReportRenderer,
        AjfReportWidget,
        AjfTableWidgetComponent,
        AjfTextWidgetComponent], imports: [AjfChartModule,
        AjfCommonModule,
        AjfImageModule,
        AjfFormsModule,
        AjfGraphModule,
        AjfHeatMapModule,
        AjfMapModule,
        AjfPageBreakModule,
        AjfTableModule,
        AjfTextModule,
        AjfTranslocoModule,
        CommonModule,
        AjfReportsModule$1,
        MatDialogModule,
        MatSelectModule], exports: [AjfReportRenderer, AjfReportWidget] }); })();

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

export { AjfChartWidgetComponent, AjfColumnWidgetComponent, AjfDialogWidgetComponent, AjfFilterWidgetComponent, AjfFormulaWidgetComponent, AjfHeatMapWidgetComponent, AjfImageContainerWidgetComponent, AjfImageWidgetComponent, AjfLayoutWidgetComponent, AjfMapWidgetComponent, AjfPageBreakWidgetComponent, AjfPaginatedListWidgetComponent, AjfPaginatedTableWidgetComponent, AjfReportRenderer, AjfReportWidget, AjfReportsModule, AjfTableWidgetComponent, AjfTextWidgetComponent, AjfWidgetService };
//# sourceMappingURL=ajf-material-reports.mjs.map
