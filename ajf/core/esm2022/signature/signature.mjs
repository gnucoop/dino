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
import { Directive, HostListener, ViewChild } from '@angular/core';
import * as i0 from "@angular/core";
const _c0 = ["sigPad"];
export class AjfSignature {
    get value() {
        return this._signatureValue;
    }
    set value(value) {
        if (this._signatureValue !== value) {
            this._signatureValue = value;
            this._cdr.detectChanges();
            this._onChangeCallback(value);
        }
    }
    constructor(_cdr, _renderer) {
        this._cdr = _cdr;
        this._renderer = _renderer;
        this.sigPadElement = null;
        this.context = null;
        this.isDrawing = false;
        this.isDrawn = false;
        /**
         * implements the control form value.
         * represents the signature value.
         *
         * @memberof AjfSignature
         */
        this._signatureValue = null;
        this._onChangeCallback = (_) => { };
        this._onTouchedCallback = () => { };
    }
    onMouseUp(_e) {
        this.isDrawing = false;
    }
    onMouseDown(e) {
        this.isDrawing = true;
        const coords = this.relativeCoords(e);
        if (this.context != null && coords) {
            this.context.moveTo(coords.x, coords.y);
        }
    }
    onMouseMove(e) {
        e.preventDefault();
        e.stopPropagation();
        if (this.isDrawing) {
            const coords = this.relativeCoords(e);
            if (this.context != null && coords) {
                this.context.lineTo(coords.x, coords.y);
                this.context.stroke();
            }
            this.isDrawn = true;
        }
    }
    /** ControlValueAccessor implements */
    writeValue(value) {
        this._signatureValue = value;
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    relativeCoords(event) {
        if (event.target != null) {
            const evtType = event.type;
            const bounds = event.target.getBoundingClientRect();
            const x = (evtType.includes('touch') ? event.touches[0].clientX : event.clientX) - bounds.left;
            const y = (evtType.includes('touch') ? event.touches[0].clientY : event.clientY) - bounds.top;
            return { x: x, y: y };
        }
        return null;
    }
    static { this.ɵfac = function AjfSignature_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSignature)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfSignature, viewQuery: function AjfSignature_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.sigPad = _t.first);
        } }, hostBindings: function AjfSignature_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("mouseup", function AjfSignature_mouseup_HostBindingHandler($event) { return ctx.onMouseUp($event); }, false, i0.ɵɵresolveDocument)("touchend", function AjfSignature_touchend_HostBindingHandler($event) { return ctx.onMouseUp($event); }, false, i0.ɵɵresolveDocument);
        } } }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSignature, [{
        type: Directive
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }], { sigPad: [{
            type: ViewChild,
            args: ['sigPad']
        }], onMouseUp: [{
            type: HostListener,
            args: ['document:mouseup', ['$event']]
        }, {
            type: HostListener,
            args: ['document:touchend', ['$event']]
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmF0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9zaWduYXR1cmUvc3JjL3NpZ25hdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQW9CLFNBQVMsRUFBRSxZQUFZLEVBQWEsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDOzs7QUFLL0YsTUFBTSxPQUFnQixZQUFZO0lBYWhDLElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBcUI7UUFDN0IsSUFBSSxJQUFJLENBQUMsZUFBZSxLQUFLLEtBQUssRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0lBS0QsWUFBc0IsSUFBdUIsRUFBVSxTQUFvQjtRQUFyRCxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUF6QjNFLGtCQUFhLEdBQTZCLElBQUksQ0FBQztRQUMvQyxZQUFPLEdBQW9DLElBQUksQ0FBQztRQUNoRCxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFDaEI7Ozs7O1dBS0c7UUFDSyxvQkFBZSxHQUFtQixJQUFJLENBQUM7UUFZdkMsc0JBQWlCLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNuQyx1QkFBa0IsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFFd0MsQ0FBQztJQUkvRSxTQUFTLENBQUMsRUFBUztRQUNqQixJQUFJLENBQUMs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ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBIb3N0TGlzdGVuZXIsIFJlbmRlcmVyMiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QWpmRmlsZX0gZnJvbSAnQGFqZi9jb3JlL2ZpbGUtaW5wdXQnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZTaWduYXR1cmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBWaWV3Q2hpbGQoJ3NpZ1BhZCcpIHNpZ1BhZDogYW55O1xuICBzaWdQYWRFbGVtZW50OiBIVE1MQ2FudmFzRWxlbWVudCB8IG51bGwgPSBudWxsO1xuICBjb250ZXh0OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgfCBudWxsID0gbnVsbDtcbiAgaXNEcmF3aW5nID0gZmFsc2U7XG4gIGlzRHJhd24gPSBmYWxzZTtcbiAgLyoqXG4gICAqIGltcGxlbWVudHMgdGhlIGNvbnRyb2wgZm9ybSB2YWx1ZS5cbiAgICogcmVwcmVzZW50cyB0aGUgc2lnbmF0dXJlIHZhbHVlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmU2lnbmF0dXJlXG4gICAqL1xuICBwcml2YXRlIF9zaWduYXR1cmVWYWx1ZTogQWpmRmlsZSB8IG51bGwgPSBudWxsO1xuICBnZXQgdmFsdWUoKTogQWpmRmlsZSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl9zaWduYXR1cmVWYWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWU6IEFqZkZpbGUgfCBudWxsKSB7XG4gICAgaWYgKHRoaXMuX3NpZ25hdHVyZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fc2lnbmF0dXJlVmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2Nkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgX29uVG91Y2hlZENhbGxiYWNrID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50Om1vdXNldXAnLCBbJyRldmVudCddKVxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDp0b3VjaGVuZCcsIFsnJGV2ZW50J10pXG4gIG9uTW91c2VVcChfZTogRXZlbnQpIHtcbiAgICB0aGlzLmlzRHJhd2luZyA9IGZhbHNlO1xuICB9XG5cbiAgb25Nb3VzZURvd24oZTogRXZlbnQpIHtcbiAgICB0aGlzLmlzRHJhd2luZyA9IHRydWU7XG4gICAgY29uc3QgY29vcmRzID0gdGhpcy5yZWxhdGl2ZUNvb3JkcyhlKTtcbiAgICBpZiAodGhpcy5jb250ZXh0ICE9IG51bGwgJiYgY29vcmRzKSB7XG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKGNvb3Jkcy54LCBjb29yZHMueSk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZU1vdmUoZTogRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5pc0RyYXdpbmcpIHtcbiAgICAgIGNvbnN0IGNvb3JkcyA9IHRoaXMucmVsYXRpdmVDb29yZHMoZSk7XG4gICAgICBpZiAodGhpcy5jb250ZXh0ICE9IG51bGwgJiYgY29vcmRzKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oY29vcmRzLngsIGNvb3Jkcy55KTtcbiAgICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgICAgfVxuICAgICAgdGhpcy5pc0RyYXduID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBBamZGaWxlIHwgbnVsbCkge1xuICAgIHRoaXMuX3NpZ25hdHVyZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHByaXZhdGUgcmVsYXRpdmVDb29yZHMoZXZlbnQ6IGFueSkge1xuICAgIGlmIChldmVudC50YXJnZXQgIT0gbnVsbCkge1xuICAgICAgY29uc3QgZXZ0VHlwZTogc3RyaW5nID0gZXZlbnQudHlwZTtcbiAgICAgIGNvbnN0IGJvdW5kcyA9IGV2ZW50LnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIGNvbnN0IHggPVxuICAgICAgICAoZXZ0VHlwZS5pbmNsdWRlcygndG91Y2gnKSA/IGV2ZW50LnRvdWNoZXNbMF0uY2xpZW50WCA6IGV2ZW50LmNsaWVudFgpIC0gYm91bmRzLmxlZnQ7XG4gICAgICBjb25zdCB5ID0gKGV2dFR5cGUuaW5jbHVkZXMoJ3RvdWNoJykgPyBldmVudC50b3VjaGVzWzBdLmNsaWVudFkgOiBldmVudC5jbGllbnRZKSAtIGJvdW5kcy50b3A7XG4gICAgICByZXR1cm4ge3g6IHgsIHk6IHl9O1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuIl19