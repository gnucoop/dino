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
import { Directive, isDevMode } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { defer, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
/**
 * It rappresents the base field component, the first overlay of ajfFieldInstance.
 * It keeps a reference to the relative control of the form.
 * It manages the component update in conjunction with the instance update.
 * @export
 * @abstract
 * @class AjfBaseFieldComponent
 * @template T
 */
export class AjfBaseFieldComponent {
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (instance !== this._instance) {
            this._instance = instance;
            this._setUpInstanceUpdate();
            this._onInstanceChange();
        }
    }
    get control() {
        return this._control;
    }
    constructor(_changeDetectorRef, _service, _warningAlertService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._service = _service;
        this._warningAlertService = _warningAlertService;
        this._warningTriggerSub = Subscription.EMPTY;
        this._instanceUpdateSub = Subscription.EMPTY;
        this._control = defer(() => this._service
            .getControl(this.instance)
            .pipe(map(ctrl => (ctrl || new UntypedFormControl()))));
    }
    // Nothing left to set up: the warning machinery is untouched -- the renderer
    // still evaluates every warning group and `instance.warningTrigger` still
    // fires with `instance.warningResults` filled in -- but the confirmation
    // dialog it used to open is gone, so nothing subscribes to the trigger any
    // more. The hook itself stays, empty, because subclasses call
    // `super.ngOnInit()` -- field components in host applications included, so
    // dropping it would break them at compile time.
    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
    ngOnInit() { }
    ngOnDestroy() {
        this._warningTriggerSub.unsubscribe();
        this._instanceUpdateSub.unsubscribe();
    }
    // TODO: why?
    _onInstanceChange() { }
    _setUpInstanceUpdate() {
        this._instanceUpdateSub.unsubscribe();
        if (this._instance != null) {
            this._instanceUpdateSub = this._instance.updatedEvt.subscribe(() => {
                if (this._changeDetectorRef) {
                    try {
                        this._changeDetectorRef.detectChanges();
                    }
                    catch (e) {
                        if (isDevMode()) {
                            console.log(e);
                        }
                    }
                }
            });
        }
        else {
            this._instanceUpdateSub = Subscription.EMPTY;
        }
        this._changeDetectorRef.detectChanges();
    }
    static { this.ɵfac = function AjfBaseFieldComponent_Factory(__ngFactoryType__) { i0.ɵɵinvalidFactory(); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfBaseFieldComponent }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfBaseFieldComponent, [{
        type: Directive
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined }], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1maWVsZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Jhc2UtZmllbGQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFvQixTQUFTLEVBQUUsU0FBUyxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsS0FBSyxFQUFjLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNyRCxPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7OztBQU1uQzs7Ozs7Ozs7R0FRRztBQUVILE1BQU0sT0FBZ0IscUJBQXFCO0lBSXpDLElBQUksUUFBUTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBQ0QsSUFBSSxRQUFRLENBQUMsUUFBdUI7UUFDbEMsSUFBSSxRQUFRLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQzNCLENBQUM7SUFDSCxDQUFDO0lBR0QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFLRCxZQUNZLGtCQUFxQyxFQUN2QyxRQUFnQyxFQUNoQyxvQkFBNEM7UUFGMUMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUN2QyxhQUFRLEdBQVIsUUFBUSxDQUF3QjtRQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXdCO1FBTjlDLHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3RELHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBTzVELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUN6QixJQUFJLENBQUMsUUFBUTthQUNWLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLGtCQUFrQixFQUFFLENBQXVCLENBQUMsQ0FBQyxDQUN0QyxDQUFDO0lBQzdDLENBQUM7SUFFRCw2RUFBNkU7SUFDN0UsMEVBQTBFO0lBQzFFLHlFQUF5RTtJQUN6RSwyRUFBMkU7SUFDM0UsOERBQThEO0lBQzlELDJFQUEyRTtJQUMzRSxnREFBZ0Q7SUFDaEQscUVBQXFFO0lBQ3JFLFFBQVEsS0FBVSxDQUFDO0lBRW5CLFdBQVc7UUFDVCxJQUFJLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7SUFDRCxhQUFhO0lBQ0gsaUJBQWlCLEtBQVUsQ0FBQztJQUU5QixvQkFBb0I7UUFDMUIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUMzQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDakUsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDO3dCQUNILElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDMUMsQ0FBQztvQkFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO3dCQUNYLElBQUksU0FBUyxFQUFFLEVBQUUsQ0FBQzs0QkFDaEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLGtCQUFrQixHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDL0MsQ0FBQztRQUNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUMxQyxDQUFDOztvRUF0RW1CLHFCQUFxQjs7aUZBQXJCLHFCQUFxQjtjQUQxQyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIGlzRGV2TW9kZSwgT25EZXN0cm95LCBPbkluaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtVbnR5cGVkRm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7ZGVmZXIsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbi8qKlxuICogSXQgcmFwcHJlc2VudHMgdGhlIGJhc2UgZmllbGQgY29tcG9uZW50LCB0aGUgZmlyc3Qgb3ZlcmxheSBvZiBhamZGaWVsZEluc3RhbmNlLlxuICogSXQga2VlcHMgYSByZWZlcmVuY2UgdG8gdGhlIHJlbGF0aXZlIGNvbnRyb2wgb2YgdGhlIGZvcm0uXG4gKiBJdCBtYW5hZ2VzIHRoZSBjb21wb25lbnQgdXBkYXRlIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIGluc3RhbmNlIHVwZGF0ZS5cbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICogQGNsYXNzIEFqZkJhc2VGaWVsZENvbXBvbmVudFxuICogQHRlbXBsYXRlIFRcbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmQmFzZUZpZWxkQ29tcG9uZW50PFQgZXh0ZW5kcyBBamZGaWVsZEluc3RhbmNlID0gQWpmRmllbGRJbnN0YW5jZT5cbiAgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdFxue1xuICBwcml2YXRlIF9pbnN0YW5jZTogVCB8IHVuZGVmaW5lZDtcbiAgZ2V0IGluc3RhbmNlKCk6IFQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgfVxuICBzZXQgaW5zdGFuY2UoaW5zdGFuY2U6IFQgfCB1bmRlZmluZWQpIHtcbiAgICBpZiAoaW5zdGFuY2UgIT09IHRoaXMuX2luc3RhbmNlKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZSA9IGluc3RhbmNlO1xuICAgICAgdGhpcy5fc2V0VXBJbnN0YW5jZVVwZGF0ZSgpO1xuICAgICAgdGhpcy5fb25JbnN0YW5jZUNoYW5nZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NvbnRyb2w6IE9ic2VydmFibGU8VW50eXBlZEZvcm1Db250cm9sIHwgbnVsbD47XG4gIGdldCBjb250cm9sKCk6IE9ic2VydmFibGU8VW50eXBlZEZvcm1Db250cm9sIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9jb250cm9sO1xuICB9XG5cbiAgcHJpdmF0ZSBfd2FybmluZ1RyaWdnZXJTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfaW5zdGFuY2VVcGRhdGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX3dhcm5pbmdBbGVydFNlcnZpY2U6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICkge1xuICAgIHRoaXMuX2NvbnRyb2wgPSBkZWZlcigoKSA9PlxuICAgICAgdGhpcy5fc2VydmljZVxuICAgICAgICAuZ2V0Q29udHJvbCh0aGlzLmluc3RhbmNlKVxuICAgICAgICAucGlwZShtYXAoY3RybCA9PiAoY3RybCB8fCBuZXcgVW50eXBlZEZvcm1Db250cm9sKCkpIGFzIFVudHlwZWRGb3JtQ29udHJvbCkpLFxuICAgICkgYXMgT2JzZXJ2YWJsZTxVbnR5cGVkRm9ybUNvbnRyb2wgfCBudWxsPjtcbiAgfVxuXG4gIC8vIE5vdGhpbmcgbGVmdCB0byBzZXQgdXA6IHRoZSB3YXJuaW5nIG1hY2hpbmVyeSBpcyB1bnRvdWNoZWQgLS0gdGhlIHJlbmRlcmVyXG4gIC8vIHN0aWxsIGV2YWx1YXRlcyBldmVyeSB3YXJuaW5nIGdyb3VwIGFuZCBgaW5zdGFuY2Uud2FybmluZ1RyaWdnZXJgIHN0aWxsXG4gIC8vIGZpcmVzIHdpdGggYGluc3RhbmNlLndhcm5pbmdSZXN1bHRzYCBmaWxsZWQgaW4gLS0gYnV0IHRoZSBjb25maXJtYXRpb25cbiAgLy8gZGlhbG9nIGl0IHVzZWQgdG8gb3BlbiBpcyBnb25lLCBzbyBub3RoaW5nIHN1YnNjcmliZXMgdG8gdGhlIHRyaWdnZXIgYW55XG4gIC8vIG1vcmUuIFRoZSBob29rIGl0c2VsZiBzdGF5cywgZW1wdHksIGJlY2F1c2Ugc3ViY2xhc3NlcyBjYWxsXG4gIC8vIGBzdXBlci5uZ09uSW5pdCgpYCAtLSBmaWVsZCBjb21wb25lbnRzIGluIGhvc3QgYXBwbGljYXRpb25zIGluY2x1ZGVkLCBzb1xuICAvLyBkcm9wcGluZyBpdCB3b3VsZCBicmVhayB0aGVtIGF0IGNvbXBpbGUgdGltZS5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1lbXB0eS1saWZlY3ljbGUtbWV0aG9kXG4gIG5nT25Jbml0KCk6IHZvaWQge31cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl93YXJuaW5nVHJpZ2dlclN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbiAgLy8gVE9ETzogd2h5P1xuICBwcm90ZWN0ZWQgX29uSW5zdGFuY2VDaGFuZ2UoKTogdm9pZCB7fVxuXG4gIHByaXZhdGUgX3NldFVwSW5zdGFuY2VVcGRhdGUoKTogdm9pZCB7XG4gICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5faW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgdGhpcy5faW5zdGFuY2VVcGRhdGVTdWIgPSB0aGlzLl9pbnN0YW5jZS51cGRhdGVkRXZ0LnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZikge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgaWYgKGlzRGV2TW9kZSgpKSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlVXBkYXRlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgIH1cbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cbiJdfQ==