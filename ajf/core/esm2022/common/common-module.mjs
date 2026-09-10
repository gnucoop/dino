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
import { NgModule } from '@angular/core';
import { ApplyStylesDirective } from './apply-styles-directive';
import { AutofocusDirective } from './auto-focus.directive';
import { AjfDndDirective } from './dnd-directive';
import { FormatIfNumber } from './format-if-number';
import { TranslateIfString } from './translate-if-string';
import { SafeHtmlPipe } from './safe-html';
import * as i0 from "@angular/core";
export class AjfCommonModule {
    static { this.ɵfac = function AjfCommonModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfCommonModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfCommonModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({}); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfCommonModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    AjfDndDirective,
                    ApplyStylesDirective,
                    AutofocusDirective,
                    FormatIfNumber,
                    SafeHtmlPipe,
                    TranslateIfString,
                ],
                exports: [
                    AjfDndDirective,
                    ApplyStylesDirective,
                    AutofocusDirective,
                    FormatIfNumber,
                    SafeHtmlPipe,
                    TranslateIfString,
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfCommonModule, { declarations: [AjfDndDirective,
        ApplyStylesDirective,
        AutofocusDirective,
        FormatIfNumber,
        SafeHtmlPipe,
        TranslateIfString], exports: [AjfDndDirective,
        ApplyStylesDirective,
        AutofocusDirective,
        FormatIfNumber,
        SafeHtmlPipe,
        TranslateIfString] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvY29tbW9uL3NyYy9jb21tb24tbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDOztBQW9CekMsTUFBTSxPQUFPLGVBQWU7Z0hBQWYsZUFBZTttRUFBZixlQUFlOzs7aUZBQWYsZUFBZTtjQWxCM0IsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWixlQUFlO29CQUNmLG9CQUFvQjtvQkFDcEIsa0JBQWtCO29CQUNsQixjQUFjO29CQUNkLFlBQVk7b0JBQ1osaUJBQWlCO2lCQUNsQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsZUFBZTtvQkFDZixvQkFBb0I7b0JBQ3BCLGtCQUFrQjtvQkFDbEIsY0FBYztvQkFDZCxZQUFZO29CQUNaLGlCQUFpQjtpQkFDbEI7YUFDRjs7d0ZBQ1ksZUFBZSxtQkFoQnhCLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLGNBQWM7UUFDZCxZQUFZO1FBQ1osaUJBQWlCLGFBR2pCLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLGNBQWM7UUFDZCxZQUFZO1FBQ1osaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBcHBseVN0eWxlc0RpcmVjdGl2ZX0gZnJvbSAnLi9hcHBseS1zdHlsZXMtZGlyZWN0aXZlJztcbmltcG9ydCB7QXV0b2ZvY3VzRGlyZWN0aXZlfSBmcm9tICcuL2F1dG8tZm9jdXMuZGlyZWN0aXZlJztcbmltcG9ydCB7QWpmRG5kRGlyZWN0aXZlfSBmcm9tICcuL2RuZC1kaXJlY3RpdmUnO1xuaW1wb3J0IHtGb3JtYXRJZk51bWJlcn0gZnJvbSAnLi9mb3JtYXQtaWYtbnVtYmVyJztcbmltcG9ydCB7VHJhbnNsYXRlSWZTdHJpbmd9IGZyb20gJy4vdHJhbnNsYXRlLWlmLXN0cmluZyc7XG5pbXBvcnQge1NhZmVIdG1sUGlwZX0gZnJvbSAnLi9zYWZlLWh0bWwnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZEbmREaXJlY3RpdmUsXG4gICAgQXBwbHlTdHlsZXNEaXJlY3RpdmUsXG4gICAgQXV0b2ZvY3VzRGlyZWN0aXZlLFxuICAgIEZvcm1hdElmTnVtYmVyLFxuICAgIFNhZmVIdG1sUGlwZSxcbiAgICBUcmFuc2xhdGVJZlN0cmluZyxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFqZkRuZERpcmVjdGl2ZSxcbiAgICBBcHBseVN0eWxlc0RpcmVjdGl2ZSxcbiAgICBBdXRvZm9jdXNEaXJlY3RpdmUsXG4gICAgRm9ybWF0SWZOdW1iZXIsXG4gICAgU2FmZUh0bWxQaXBlLFxuICAgIFRyYW5zbGF0ZUlmU3RyaW5nLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZDb21tb25Nb2R1bGUge31cbiJdfQ==