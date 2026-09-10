import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { ViewEncapsulation, ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import * as i3 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { AjfImage as AjfImage$1 } from '@ajf/core/image';
import * as i1 from '@angular/platform-browser';

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
function AjfImage_ng_template_2_img_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 4);
} if (rf & 2) {
    const iu_r1 = ctx.ngIf;
    i0.ɵɵproperty("src", iu_r1, i0.ɵɵsanitizeUrl);
} }
function AjfImage_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfImage_ng_template_2_img_0_Template, 1, 1, "img", 3);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx_r1.url));
} }
function AjfImage_ng_template_3_mat_icon_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "mat-icon", 6);
} if (rf & 2) {
    const io_r3 = ctx.ngIf;
    i0.ɵɵproperty("fontSet", io_r3.fontSet)("fontIcon", io_r3.fontIcon);
} }
function AjfImage_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfImage_ng_template_3_mat_icon_0_Template, 1, 2, "mat-icon", 5);
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(1, 1, ctx_r1.iconObj));
} }
function AjfImage_span_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span");
    i0.ɵɵpipe(1, "async");
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵclassMap(i0.ɵɵpipeBind1(1, 2, ctx_r1.flagName));
} }
class AjfImage extends AjfImage$1 {
    constructor(el, renderer, ds) {
        super(el, renderer, ds);
    }
    static { this.ɵfac = function AjfImage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfImage)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.DomSanitizer)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfImage, selectors: [["ajf-image"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 5, vars: 6, consts: [[3, "ngSwitch"], [3, "ngSwitchCase"], [3, "class", 4, "ngSwitchCase"], ["alt", "", 3, "src", 4, "ngIf"], ["alt", "", 3, "src"], [3, "fontSet", "fontIcon", 4, "ngIf"], [3, "fontSet", "fontIcon"]], template: function AjfImage_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementContainerStart(0, 0);
            i0.ɵɵpipe(1, "async");
            i0.ɵɵtemplate(2, AjfImage_ng_template_2_Template, 2, 3, "ng-template", 1)(3, AjfImage_ng_template_3_Template, 2, 3, "ng-template", 1)(4, AjfImage_span_4_Template, 2, 4, "span", 2);
            i0.ɵɵelementContainerEnd();
        } if (rf & 2) {
            i0.ɵɵproperty("ngSwitch", i0.ɵɵpipeBind1(1, 4, ctx.imageType));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngSwitchCase", ctx.imageTypes.Image);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.imageTypes.Icon);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", ctx.imageTypes.Flag);
        } }, dependencies: [i2.NgIf, i2.NgSwitch, i2.NgSwitchCase, i3.MatIcon, i2.AsyncPipe], styles: ["ajf-image{display:flex;box-sizing:border-box;align-items:center;position:relative;font-size:inherit;width:inherit;height:inherit}ajf-image img{vertical-align:middle;position:relative;max-height:100%;max-width:100%;height:auto;width:auto}ajf-image span{height:inherit;width:inherit}ajf-image .mat-icon{font-size:inherit}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfImage, [{
        type: Component,
        args: [{ selector: 'ajf-image', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container [ngSwitch]=\"imageType|async\">\n  <ng-template [ngSwitchCase]=\"imageTypes.Image\">\n    <img *ngIf=\"url|async as iu\" [src]=\"iu\" alt=\"\">\n  </ng-template>\n  <ng-template [ngSwitchCase]=\"imageTypes.Icon\">\n    <mat-icon *ngIf=\"iconObj|async as io\"\n        [fontSet]=\"io!.fontSet\"\n        [fontIcon]=\"io!.fontIcon\">\n    </mat-icon>\n  </ng-template>\n  <span *ngSwitchCase=\"imageTypes.Flag\" [class]=\"flagName|async\"></span>\n</ng-container>\n", styles: ["ajf-image{display:flex;box-sizing:border-box;align-items:center;position:relative;font-size:inherit;width:inherit;height:inherit}ajf-image img{vertical-align:middle;position:relative;max-height:100%;max-width:100%;height:auto;width:auto}ajf-image span{height:inherit;width:inherit}ajf-image .mat-icon{font-size:inherit}\n"] }]
    }], () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.DomSanitizer }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfImage, { className: "AjfImage", filePath: "image.ts", lineNumber: 40 }); })();

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
class AjfImageModule {
    static { this.ɵfac = function AjfImageModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfImageModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfImageModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, MatIconModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfImageModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, MatIconModule],
                declarations: [AjfImage],
                exports: [AjfImage],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfImageModule, { declarations: [AjfImage], imports: [CommonModule, MatIconModule], exports: [AjfImage] }); })();

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

export { AjfImage, AjfImageModule };
//# sourceMappingURL=ajf-material-image.mjs.map
