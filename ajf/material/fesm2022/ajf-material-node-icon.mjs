import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i0 from '@angular/core';
import { ChangeDetectionStrategy, ViewEncapsulation, Component, NgModule } from '@angular/core';
import * as i2 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { AjfNodeType, AjfFieldType } from '@ajf/core/forms';
import { AjfNodeIcon as AjfNodeIcon$1 } from '@ajf/core/node-icon';

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
function AjfNodeIcon_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-icon");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r0.matIcon(ctx_r0.node));
} }
class AjfNodeIcon extends AjfNodeIcon$1 {
    matIcon(node) {
        if (node.nodeType === AjfNodeType.AjfSlide) {
            return 'folder';
        }
        if (node.nodeType === AjfNodeType.AjfRepeatingSlide) {
            return 'create_new_folder';
        }
        if (node.nodeType !== AjfNodeType.AjfField) {
            return 'broken_image';
        }
        switch (node.fieldType) {
            case AjfFieldType.String:
            case AjfFieldType.Text:
                return 'abc';
            case AjfFieldType.Number:
            case AjfFieldType.Range:
                return 'pin';
            case AjfFieldType.Boolean:
                return 'toggle_off';
            case AjfFieldType.SingleChoice:
                return 'format_list_bulleted';
            case AjfFieldType.MultipleChoice:
                return 'format_list_numbered';
            case AjfFieldType.Formula:
                return 'code';
            case AjfFieldType.Empty:
                return 'html';
            case AjfFieldType.DateRange:
            case AjfFieldType.DateInput:
                return 'calendar_month';
            case AjfFieldType.Time:
                return 'access_time';
            case AjfFieldType.Table:
                return 'grid_on';
            case AjfFieldType.Geolocation:
                return 'location_on';
            case AjfFieldType.Barcode:
                return 'qr_code_2';
            case AjfFieldType.File:
                return 'attach_file';
            case AjfFieldType.Image:
                return 'image';
            case AjfFieldType.VideoUrl:
                return 'videocam';
            case AjfFieldType.Signature:
                return 'draw';
            default:
                return 'broken_image';
        }
    }
    static { this.ɵfac = /*@__PURE__*/ (() => { let ɵAjfNodeIcon_BaseFactory; return function AjfNodeIcon_Factory(__ngFactoryType__) { return (ɵAjfNodeIcon_BaseFactory || (ɵAjfNodeIcon_BaseFactory = i0.ɵɵgetInheritedFactory(AjfNodeIcon)))(__ngFactoryType__ || AjfNodeIcon); }; })(); }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfNodeIcon, selectors: [["ajf-node-icon"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "ngIf"]], template: function AjfNodeIcon_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfNodeIcon_ng_template_0_Template, 2, 1, "ng-template", 0);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", ctx.node);
        } }, dependencies: [i1.NgIf, i2.MatIcon], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfNodeIcon, [{
        type: Component,
        args: [{ selector: 'ajf-node-icon', encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"node\">\n  <mat-icon>{{matIcon(node)}}</mat-icon>\n</ng-template>\n" }]
    }], null, null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfNodeIcon, { className: "AjfNodeIcon", filePath: "node-icon.ts", lineNumber: 34 }); })();

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
class AjfNodeIconModule {
    static { this.ɵfac = function AjfNodeIconModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfNodeIconModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfNodeIconModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, MatIconModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfNodeIconModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, MatIconModule],
                declarations: [AjfNodeIcon],
                exports: [AjfNodeIcon],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfNodeIconModule, { declarations: [AjfNodeIcon], imports: [CommonModule, MatIconModule], exports: [AjfNodeIcon] }); })();

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

export { AjfNodeIcon, AjfNodeIconModule };
//# sourceMappingURL=ajf-material-node-icon.mjs.map
