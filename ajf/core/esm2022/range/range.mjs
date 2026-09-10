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
import { AJF_WARNING_ALERT_SERVICE, AjfBaseFieldComponent, } from '@ajf/core/forms';
import { Directive, Inject, Input } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@ajf/core/forms";
export class AjfRange extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        this.cdr = cdr;
        this._appearance = '';
        this._end = 10;
        this._name = '';
        this._onChangeCallback = _ => { };
        this._onTouchedCallback = () => { };
        this._start = 1;
        this._step = 1;
        this._value = 1;
    }
    get appearance() {
        return this._appearance;
    }
    set appearance(newAppearance) {
        if (newAppearance != null && this._appearance != newAppearance) {
            this._appearance = newAppearance;
            this.cdr.detectChanges();
        }
    }
    get end() {
        return this._end;
    }
    set end(newEnd) {
        if (newEnd != null && this._end != newEnd) {
            this._end = newEnd;
            this.cdr.detectChanges();
        }
    }
    get name() {
        return this._name;
    }
    set name(newName) {
        if (newName != null && this._name != newName) {
            this._name = newName;
            this.cdr.detectChanges();
        }
    }
    get start() {
        return this._start;
    }
    set start(newStart) {
        if (newStart != null && this._start != newStart) {
            this._start = newStart;
            this.cdr.detectChanges();
        }
    }
    get step() {
        return this._step;
    }
    set step(newStep) {
        if (newStep != null && this._step !== newStep) {
            this._step = newStep;
            this.cdr.detectChanges();
        }
    }
    get value() {
        return this._value;
    }
    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            this._onChangeCallback(newValue);
            this.cdr.detectChanges();
        }
    }
    ngOnInit() {
        super.ngOnInit();
        if (this.instance != null && this.instance.node != null) {
            const node = this.instance.node;
            if (node.appearance != null) {
                this.appearance = node.appearance;
            }
            if (node.end != null) {
                this.end = node.end;
            }
            if (node.start != null) {
                this.start = node.start;
            }
            if (node.step != null) {
                this.step = node.step;
            }
            if (node.name != null) {
                this.name = node.name;
            }
            if (this.instance != null && this.instance.value != null) {
                this.value = this.instance.value;
            }
        }
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    reset() {
        this.value = 0;
        this._onTouchedCallback();
    }
    writeValue(value) {
        this.value = value;
    }
    /**
     * Handles rating star clicks by updating the form control value
     * @param starValue The rating value (1-5) to set
     */
    onRatingClick(starValue) {
        this._value = starValue;
        this._onChangeCallback(starValue);
        this._onTouchedCallback();
        this.cdr.detectChanges();
    }
    static { this.ɵfac = function AjfRange_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfRange)(i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i1.AjfFormRendererService), i0.ɵɵdirectiveInject(AJF_WARNING_ALERT_SERVICE)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfRange, inputs: { appearance: "appearance", end: "end", name: "name", start: "start", step: "step" }, features: [i0.ɵɵInheritDefinitionFeature] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfRange, [{
        type: Directive
    }], () => [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                type: Inject,
                args: [AJF_WARNING_ALERT_SERVICE]
            }] }], { appearance: [{
            type: Input
        }], end: [{
            type: Input
        }], name: [{
            type: Input
        }], start: [{
            type: Input
        }], step: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3JhbmdlL3NyYy9yYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLHFCQUFxQixHQUl0QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBb0IsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQVMsTUFBTSxlQUFlLENBQUM7OztBQUlsRixNQUFNLE9BQWdCLFFBQ3BCLFNBQVEscUJBQTRDO0lBY3BELFlBQ1MsR0FBc0IsRUFDN0IsT0FBK0IsRUFDSSxHQUEyQjtRQUU5RCxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUpsQixRQUFHLEdBQUgsR0FBRyxDQUFtQjtRQVp2QixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUN6QixTQUFJLEdBQVcsRUFBRSxDQUFDO1FBQ2xCLFVBQUssR0FBVyxFQUFFLENBQUM7UUFDbkIsc0JBQWlCLEdBQXlCLENBQUMsQ0FBQyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRWxELHVCQUFrQixHQUFlLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUUxQyxXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLFVBQUssR0FBVyxDQUFDLENBQUM7UUFDbEIsV0FBTSxHQUFXLENBQUMsQ0FBQztJQVEzQixDQUFDO0lBRUQsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFDRCxJQUNJLFVBQVUsQ0FBQyxhQUFxQjtRQUNsQyxJQUFJLGFBQWEsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUMvRCxJQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQztZQUNqQyxJQUFJLENBQUMsR0FBRyxD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UixRQUFRO2NBRDdCLFNBQVM7O3NCQW1CTCxNQUFNO3VCQUFDLHlCQUF5QjtxQkFTL0IsVUFBVTtrQkFEYixLQUFLO1lBWUYsR0FBRztrQkFETixLQUFLO1lBWUYsSUFBSTtrQkFEUCxLQUFLO1lBWUYsS0FBSztrQkFEUixLQUFLO1lBWUYsSUFBSTtrQkFEUCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLFxuICBBamZCYXNlRmllbGRDb21wb25lbnQsXG4gIEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gIEFqZlJhbmdlRmllbGRJbnN0YW5jZSxcbiAgQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgSW5qZWN0LCBJbnB1dCwgT25Jbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmUmFuZ2VcbiAgZXh0ZW5kcyBBamZCYXNlRmllbGRDb21wb25lbnQ8QWpmUmFuZ2VGaWVsZEluc3RhbmNlPlxuICBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXRcbntcbiAgcHJpdmF0ZSBfYXBwZWFyYW5jZTogc3RyaW5nID0gJyc7XG4gIHByaXZhdGUgX2VuZDogbnVtYmVyID0gMTA7XG4gIHByaXZhdGUgX25hbWU6IHN0cmluZyA9ICcnO1xuICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9IF8gPT4ge307XG5cbiAgcHJpdmF0ZSBfb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIF9zdGFydDogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBfdmFsdWU6IG51bWJlciA9IDE7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuICB9XG5cbiAgZ2V0IGFwcGVhcmFuY2UoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwZWFyYW5jZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgYXBwZWFyYW5jZShuZXdBcHBlYXJhbmNlOiBzdHJpbmcpIHtcbiAgICBpZiAobmV3QXBwZWFyYW5jZSAhPSBudWxsICYmIHRoaXMuX2FwcGVhcmFuY2UgIT0gbmV3QXBwZWFyYW5jZSkge1xuICAgICAgdGhpcy5fYXBwZWFyYW5jZSA9IG5ld0FwcGVhcmFuY2U7XG4gICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGVuZCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9lbmQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGVuZChuZXdFbmQ6IG51bWJlciB8IHVuZGVmaW5lZCkge1xuICAgIGlmIChuZXdFbmQgIT0gbnVsbCAmJiB0aGlzLl9lbmQgIT0gbmV3RW5kKSB7XG4gICAgICB0aGlzLl9lbmQgPSBuZXdFbmQgYXMgbnVtYmVyO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBuYW1lKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG5hbWUobmV3TmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKG5ld05hbWUgIT0gbnVsbCAmJiB0aGlzLl9uYW1lICE9IG5ld05hbWUpIHtcbiAgICAgIHRoaXMuX25hbWUgPSBuZXdOYW1lO1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzdGFydCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9zdGFydDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc3RhcnQobmV3U3RhcnQ6IG51bWJlciB8IHVuZGVmaW5lZCkge1xuICAgIGlmIChuZXdTdGFydCAhPSBudWxsICYmIHRoaXMuX3N0YXJ0ICE9IG5ld1N0YXJ0KSB7XG4gICAgICB0aGlzLl9zdGFydCA9IG5ld1N0YXJ0O1xuICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBzdGVwKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHN0ZXAobmV3U3RlcDogbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gICAgaWYgKG5ld1N0ZXAgIT0gbnVsbCAmJiB0aGlzLl9zdGVwICE9PSBuZXdTdGVwKSB7XG4gICAgICB0aGlzLl9zdGVwID0gbmV3U3RlcDtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBzZXQgdmFsdWUobmV3VmFsdWU6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl92YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gbmV3VmFsdWU7XG4gICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKG5ld1ZhbHVlKTtcbiAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIGlmICh0aGlzLmluc3RhbmNlICE9IG51bGwgJiYgdGhpcy5pbnN0YW5jZS5ub2RlICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLmluc3RhbmNlLm5vZGU7XG4gICAgICBpZiAobm9kZS5hcHBlYXJhbmNlICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5hcHBlYXJhbmNlID0gbm9kZS5hcHBlYXJhbmNlO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUuZW5kICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5lbmQgPSBub2RlLmVuZDtcbiAgICAgIH1cbiAgICAgIGlmIChub2RlLnN0YXJ0ICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdGFydCA9IG5vZGUuc3RhcnQ7XG4gICAgICB9XG4gICAgICBpZiAobm9kZS5zdGVwICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5zdGVwID0gbm9kZS5zdGVwO1xuICAgICAgfVxuICAgICAgaWYgKG5vZGUubmFtZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5vZGUubmFtZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLmluc3RhbmNlICE9IG51bGwgJiYgdGhpcy5pbnN0YW5jZS52YWx1ZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmluc3RhbmNlLnZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IDA7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHJhdGluZyBzdGFyIGNsaWNrcyBieSB1cGRhdGluZyB0aGUgZm9ybSBjb250cm9sIHZhbHVlXG4gICAqIEBwYXJhbSBzdGFyVmFsdWUgVGhlIHJhdGluZyB2YWx1ZSAoMS01KSB0byBzZXRcbiAgICovXG4gIG9uUmF0aW5nQ2xpY2soc3RhclZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl92YWx1ZSA9IHN0YXJWYWx1ZTtcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHN0YXJWYWx1ZSk7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cbn1cbiJdfQ==