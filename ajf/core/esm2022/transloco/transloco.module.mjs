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
import { TRANSLOCO_CONFIG, TRANSLOCO_MISSING_HANDLER, translocoConfig, TranslocoModule, TranslocoService, TRANSLOCO_TRANSPILER, FunctionalTranspiler, } from '@ngneat/transloco';
import { langs } from './lang';
import { MissingHandler } from './transloco-missing-handler';
import * as i0 from "@angular/core";
import * as i1 from "@ngneat/transloco";
const availableLangs = ['ENG', 'ESP', 'FRA', 'ITA', 'PRT', 'ETH', 'UKR', 'ARA'];
export class AjfTranslocoModule {
    constructor(ts) {
        availableLangs.forEach(lang => {
            if (langs[lang] != null) {
                ts.setTranslation(langs[lang], lang);
            }
        });
    }
    static forRoot(config) {
        return {
            ngModule: AjfTranslocoModule,
            providers: [
                TranslocoService,
                {
                    provide: TRANSLOCO_CONFIG,
                    useValue: translocoConfig({
                        availableLangs,
                        ...config,
                        defaultLang: 'ENG',
                    }),
                },
            ],
        };
    }
    static { this.ɵfac = function AjfTranslocoModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfTranslocoModule)(i0.ɵɵinject(i1.TranslocoService)); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfTranslocoModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
            { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler },
            {
                provide: TRANSLOCO_TRANSPILER,
                useClass: FunctionalTranspiler,
            },
        ], imports: [TranslocoModule, TranslocoModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfTranslocoModule, [{
        type: NgModule,
        args: [{
                imports: [TranslocoModule],
                exports: [TranslocoModule],
                providers: [
                    { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler },
                    {
                        provide: TRANSLOCO_TRANSPILER,
                        useClass: FunctionalTranspiler,
                    },
                ],
            }]
    }], () => [{ type: i1.TranslocoService }], null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfTranslocoModule, { imports: [TranslocoModule], exports: [TranslocoModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdHJhbnNsb2NvL3NyYy90cmFuc2xvY28ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIseUJBQXlCLEVBQ3pCLGVBQWUsRUFFZixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLG9CQUFvQixFQUNwQixvQkFBb0IsR0FDckIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRTNELE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBYWhGLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBWSxFQUFvQjtRQUM5QixjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUN4QixFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN2QyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FDWixNQUE2QztRQUU3QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1QsZ0JBQWdCO2dCQUNoQjtvQkFDRSxPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixRQUFRLEVBQUUsZUFBZSxDQUFDO3dCQUN4QixjQUFjO3dCQUNkLEdBQUcsTUFBTTt3QkFDVCxXQUFXLEVBQUUsS0FBSztxQkFDbkIsQ0FBQztpQkFDSDthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7bUhBMUJVLGtCQUFrQjttRUFBbEIsa0JBQWtCO3dFQVJsQjtZQUNULEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUM7WUFDOUQ7Z0JBQ0UsT0FBTyxFQUFFLG9CQUFvQjtnQkFDN0IsUUFBUSxFQUFFLG9CQUFvQjthQUMvQjtTQUNGLFlBUlMsZUFBZSxFQUNmLGVBQWU7O2lGQVNkLGtCQUFrQjtjQVg5QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQzFCLFNBQVMsRUFBRTtvQkFDVCxFQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDO29CQUM5RDt3QkFDRSxPQUFPLEVBQUUsb0JBQW9CO3dCQUM3QixRQUFRLEVBQUUsb0JBQW9CO3FCQUMvQjtpQkFDRjthQUNGOzt3RkFDWSxrQkFBa0IsY0FWbkIsZUFBZSxhQUNmLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgVFJBTlNMT0NPX0NPTkZJRyxcbiAgVFJBTlNMT0NPX01JU1NJTkdfSEFORExFUixcbiAgdHJhbnNsb2NvQ29uZmlnLFxuICBUcmFuc2xvY29Db25maWcsXG4gIFRyYW5zbG9jb01vZHVsZSxcbiAgVHJhbnNsb2NvU2VydmljZSxcbiAgVFJBTlNMT0NPX1RSQU5TUElMRVIsXG4gIEZ1bmN0aW9uYWxUcmFuc3BpbGVyLFxufSBmcm9tICdAbmduZWF0L3RyYW5zbG9jbyc7XG5cbmltcG9ydCB7bGFuZ3N9IGZyb20gJy4vbGFuZyc7XG5pbXBvcnQge01pc3NpbmdIYW5kbGVyfSBmcm9tICcuL3RyYW5zbG9jby1taXNzaW5nLWhhbmRsZXInO1xuXG5jb25zdCBhdmFpbGFibGVMYW5ncyA9IFsnRU5HJywgJ0VTUCcsICdGUkEnLCAnSVRBJywgJ1BSVCcsICdFVEgnLCAnVUtSJywgJ0FSQSddO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbVHJhbnNsb2NvTW9kdWxlXSxcbiAgZXhwb3J0czogW1RyYW5zbG9jb01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtwcm92aWRlOiBUUkFOU0xPQ09fTUlTU0lOR19IQU5ETEVSLCB1c2VDbGFzczogTWlzc2luZ0hhbmRsZXJ9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFRSQU5TTE9DT19UUkFOU1BJTEVSLFxuICAgICAgdXNlQ2xhc3M6IEZ1bmN0aW9uYWxUcmFuc3BpbGVyLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZlRyYW5zbG9jb01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHRzOiBUcmFuc2xvY29TZXJ2aWNlKSB7XG4gICAgYXZhaWxhYmxlTGFuZ3MuZm9yRWFjaChsYW5nID0+IHtcbiAgICAgIGlmIChsYW5nc1tsYW5nXSAhPSBudWxsKSB7XG4gICAgICAgIHRzLnNldFRyYW5zbGF0aW9uKGxhbmdzW2xhbmddLCBsYW5nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBmb3JSb290KFxuICAgIGNvbmZpZz86IFBhcnRpYWw8VHJhbnNsb2NvQ29uZmlnPiB8IHVuZGVmaW5lZCxcbiAgKTogTW9kdWxlV2l0aFByb3ZpZGVyczxBamZUcmFuc2xvY29Nb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFqZlRyYW5zbG9jb01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBUcmFuc2xvY29TZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogVFJBTlNMT0NPX0NPTkZJRyxcbiAgICAgICAgICB1c2VWYWx1ZTogdHJhbnNsb2NvQ29uZmlnKHtcbiAgICAgICAgICAgIGF2YWlsYWJsZUxhbmdzLFxuICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgZGVmYXVsdExhbmc6ICdFTkcnLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9O1xuICB9XG59XG4iXX0=