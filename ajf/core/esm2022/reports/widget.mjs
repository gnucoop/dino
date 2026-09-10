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
import { Directive, Input, isDevMode, ViewChild } from '@angular/core';
import { AjfWidgetHost } from './widget-host';
import * as i0 from "@angular/core";
export class AjfReportWidget {
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            if (this._init) {
                this._loadComponent();
            }
        }
    }
    constructor(_renderer) {
        this._renderer = _renderer;
        this._init = false;
    }
    ngOnInit() {
        this._init = true;
        this._loadComponent();
    }
    _loadComponent() {
        if (!this._init ||
            this._instance == null ||
            this.widgetHost == null ||
            !this._instance.visible) {
            return;
        }
        const componentDef = this.widgetsMap[this._instance.widget.widgetType];
        if (componentDef == null) {
            return;
        }
        const component = componentDef.component;
        if (component === this._currentComponentType && this._currentComponentRef != null) {
            this._currentComponentRef.instance.instance = this._instance;
            return;
        }
        const vcr = this.widgetHost.viewContainerRef;
        vcr.clear();
        this._currentComponentType = component;
        try {
            const componentRef = vcr.createComponent(component);
            this._currentComponentRef = componentRef;
            const componentInstance = componentRef.instance;
            Object.keys(this._instance.widget.styles).forEach((style) => {
                try {
                    this._renderer.setStyle(componentInstance.el.nativeElement, style, `${this._instance.widget.styles[style]}`);
                }
                catch (e) {
                    if (isDevMode()) {
                        console.log(e);
                    }
                }
            });
            componentInstance.instance = this._instance;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach(key => {
                    if (key in componentInstance) {
                        componentInstance[key] = componentDef.inputs[key];
                    }
                });
            }
        }
        catch (e) {
            if (isDevMode()) {
                console.log(e);
            }
            this._currentComponentRef = undefined;
            this._currentComponentType = undefined;
        }
    }
    static { this.ɵfac = function AjfReportWidget_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfReportWidget)(i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfReportWidget, viewQuery: function AjfReportWidget_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(AjfWidgetHost, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.widgetHost = _t.first);
        } }, inputs: { instance: "instance" } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfReportWidget, [{
        type: Directive
    }], () => [{ type: i0.Renderer2 }], { widgetHost: [{
            type: ViewChild,
            args: [AjfWidgetHost, { static: true }]
        }], instance: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy93aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFlLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUEyQixTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFLNUcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFHNUMsTUFBTSxPQUFnQixlQUFlO0lBSW5DLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFDSSxRQUFRLENBQUMsUUFBdUM7UUFDbEQsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNmLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN4QixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFRRCxZQUFvQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBSmhDLFVBQUssR0FBRyxLQUFLLENBQUM7SUFJcUIsQ0FBQztJQUU1QyxRQUFRO1FBQ04sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxjQUFjO1FBQ3BCLElBQ0UsQ0FBQyxJQUFJLENBQUMsS0FBSztZQUNYLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSTtZQUN0QixJQUFJLENBQUMsVUFBVSxJQUFJLElBQUk7WUFDdkIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFDdkIsQ0FBQztZQUNELE9BQU87UUFDVCxDQUFDO1FBRUQsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN2RSxJQUFJLFlBQVksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN6QixPQUFPO1FBQ1QsQ0FBQztRQUNELE1BQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFFekMsSUFBSSxTQUFTLEtBQUssSUFBSSxDQUFDLHFCQUFxQixJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNsRixJQUFJLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdELE9BQU87UUFDVCxDQUFDO1FBRUQsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQztRQUM3QyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDWixJQUFJLENBQUMscUJBQXFCLEdBQUcsU0FBUyxDQUFDO1FBRXZDLElBQUksQ0FBQztZQUNILE1BQU0sWUFBWSxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLFlBQVksQ0FBQztZQUN6QyxNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUM7WUFFaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRTtnQkFDbEUsSUFBSSxDQUFDO29CQUNILElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixpQkFBaUIsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUNsQyxLQUFLLEVBQ0wsR0FBRyxJQUFJLENBQUMsU0FBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FDMUMsQ0FBQztnQkFDSixDQUFDO2dCQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7b0JBQ1gsSUFBSSxTQUFTLEVBQUUsRUFBRSxDQUFDO3dCQUNoQixPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILGlCQUFpQixDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzVDLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQzdDLElBQUksR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7d0JBQzVCLGlCQUF5QixDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzlELENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDWCxJQUFJLFNBQVMsRUFBRSxFQUFFLENBQUM7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQztZQUNELElBQUksQ0FBQyxvQkFBb0IsR0FBRyxTQUFTLENBQUM7WUFDdEMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLFNBQVMsQ0FBQztRQUN6QyxDQUFDO0lBQ0gsQ0FBQztnSEF6Rm1CLGVBQWU7b0VBQWYsZUFBZTsyQkFDeEIsYUFBYTs7Ozs7O2lGQURKLGVBQWU7Y0FEcEMsU0FBUzswQ0FFa0MsVUFBVTtrQkFBbkQsU0FBUzttQkFBQyxhQUFhLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO1lBT3BDLFFBQVE7a0JBRFgsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDb21wb25lbnRSZWYsIERpcmVjdGl2ZSwgSW5wdXQsIGlzRGV2TW9kZSwgT25Jbml0LCBSZW5kZXJlcjIsIFR5cGUsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQmFzZVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZXaWRnZXRDb21wb25lbnRzTWFwfSBmcm9tICcuL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC1jb21wb25lbnRzLW1hcCc7XG5pbXBvcnQge0FqZldpZGdldEhvc3R9IGZyb20gJy4vd2lkZ2V0LWhvc3QnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZSZXBvcnRXaWRnZXQgaW1wbGVtZW50cyBPbkluaXQge1xuICBAVmlld0NoaWxkKEFqZldpZGdldEhvc3QsIHtzdGF0aWM6IHRydWV9KSB3aWRnZXRIb3N0ITogQWpmV2lkZ2V0SG9zdDtcblxuICBwcml2YXRlIF9pbnN0YW5jZTogQWpmV2lkZ2V0SW5zdGFuY2UgfCB1bmRlZmluZWQ7XG4gIGdldCBpbnN0YW5jZSgpOiBBamZXaWRnZXRJbnN0YW5jZSB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpbnN0YW5jZShpbnN0YW5jZTogQWpmV2lkZ2V0SW5zdGFuY2UgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UgIT09IGluc3RhbmNlKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgICAgdGhpcy5fbG9hZENvbXBvbmVudCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCB3aWRnZXRzTWFwOiBBamZXaWRnZXRDb21wb25lbnRzTWFwO1xuXG4gIHByaXZhdGUgX2luaXQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfY3VycmVudENvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPEFqZkJhc2VXaWRnZXRDb21wb25lbnQ+IHwgdW5kZWZpbmVkO1xuICBwcml2YXRlIF9jdXJyZW50Q29tcG9uZW50VHlwZTogVHlwZTxBamZCYXNlV2lkZ2V0Q29tcG9uZW50PiB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuICAgIHRoaXMuX2xvYWRDb21wb25lbnQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xvYWRDb21wb25lbnQoKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgIXRoaXMuX2luaXQgfHxcbiAgICAgIHRoaXMuX2luc3RhbmNlID09IG51bGwgfHxcbiAgICAgIHRoaXMud2lkZ2V0SG9zdCA9PSBudWxsIHx8XG4gICAgICAhdGhpcy5faW5zdGFuY2UudmlzaWJsZVxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbXBvbmVudERlZiA9IHRoaXMud2lkZ2V0c01hcFt0aGlzLl9pbnN0YW5jZS53aWRnZXQud2lkZ2V0VHlwZV07XG4gICAgaWYgKGNvbXBvbmVudERlZiA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNvbXBvbmVudCA9IGNvbXBvbmVudERlZi5jb21wb25lbnQ7XG5cbiAgICBpZiAoY29tcG9uZW50ID09PSB0aGlzLl9jdXJyZW50Q29tcG9uZW50VHlwZSAmJiB0aGlzLl9jdXJyZW50Q29tcG9uZW50UmVmICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRDb21wb25lbnRSZWYuaW5zdGFuY2UuaW5zdGFuY2UgPSB0aGlzLl9pbnN0YW5jZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2Y3IgPSB0aGlzLndpZGdldEhvc3Qudmlld0NvbnRhaW5lclJlZjtcbiAgICB2Y3IuY2xlYXIoKTtcbiAgICB0aGlzLl9jdXJyZW50Q29tcG9uZW50VHlwZSA9IGNvbXBvbmVudDtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB2Y3IuY3JlYXRlQ29tcG9uZW50KGNvbXBvbmVudCk7XG4gICAgICB0aGlzLl9jdXJyZW50Q29tcG9uZW50UmVmID0gY29tcG9uZW50UmVmO1xuICAgICAgY29uc3QgY29tcG9uZW50SW5zdGFuY2UgPSBjb21wb25lbnRSZWYuaW5zdGFuY2U7XG5cbiAgICAgIE9iamVjdC5rZXlzKHRoaXMuX2luc3RhbmNlLndpZGdldC5zdHlsZXMpLmZvckVhY2goKHN0eWxlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICAgIGNvbXBvbmVudEluc3RhbmNlLmVsLm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICAgICBzdHlsZSxcbiAgICAgICAgICAgIGAke3RoaXMuX2luc3RhbmNlIS53aWRnZXQuc3R5bGVzW3N0eWxlXX1gLFxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbXBvbmVudEluc3RhbmNlLmluc3RhbmNlID0gdGhpcy5faW5zdGFuY2U7XG4gICAgICBpZiAoY29tcG9uZW50RGVmLmlucHV0cykge1xuICAgICAgICBPYmplY3Qua2V5cyhjb21wb25lbnREZWYuaW5wdXRzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgaWYgKGtleSBpbiBjb21wb25lbnRJbnN0YW5jZSkge1xuICAgICAgICAgICAgKGNvbXBvbmVudEluc3RhbmNlIGFzIGFueSlba2V5XSA9IGNvbXBvbmVudERlZi5pbnB1dHMhW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9jdXJyZW50Q29tcG9uZW50UmVmID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5fY3VycmVudENvbXBvbmVudFR5cGUgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=