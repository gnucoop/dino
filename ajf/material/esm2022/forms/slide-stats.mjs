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
import { AjfFieldType, isFieldInstance, isRepeatingSlideInstance, nodeInstanceCompleteName, } from '@ajf/core/forms';
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The fields a slide header counts. `slideNodes` is indexed per repetition, and
 * a non-repeating slide keeps its only set of nodes at index 0, so both kinds of
 * slide are read the same way.
 */
const countableFields = (slide, idx) => {
    const nodes = (slide.slideNodes && slide.slideNodes[idx]) || slide.flatNodes || [];
    return nodes.filter(n => n.visible && isFieldInstance(n) && n.node.fieldType !== AjfFieldType.Empty);
};
/**
 * Whether a field holds anything.
 *
 * The value is read off the form group, not off `AjfFieldInstance.value`: the
 * instance's own `value` is only written at initialisation and by formulas, so it
 * does not follow what the user types. The group is flat and keyed by each
 * instance's complete name, which is how `AjfFormRendererService.getControl`
 * resolves a control too.
 */
const isFilled = (field, formGroup) => {
    const name = nodeInstanceCompleteName(field);
    const control = formGroup != null && formGroup.contains(name) ? formGroup.controls[name] : null;
    const value = control != null ? control.value : field.value;
    if (value == null || value === '') {
        return false;
    }
    if (Array.isArray(value)) {
        return value.length > 0;
    }
    return true;
};
/**
 * How many of a slide's fields carry a value, out of how many are on it. Notes
 * (`AjfFieldType.Empty`) hold no value and are left out of both numbers.
 *
 * Impure because it reads mutable instance state, in the same way as
 * `ajfValidSlide` and `ajfAsFieldInstanceErrors`. Returns a memoized object; see
 * the note inside.
 */
export class AjfSlideCompletionPipe {
    constructor() {
        this._last = null;
    }
    transform(slide, idx = 0, formGroup = null) {
        const fields = countableFields(slide, idx);
        const done = fields.filter(f => isFilled(f, formGroup)).length;
        const total = fields.length;
        // Hand back the same object while the counts hold, or the fresh identity on
        // every check would trip Angular's "expression has changed" guard.
        if (this._last != null && this._last.done === done && this._last.total === total) {
            return this._last;
        }
        this._last = { done, total };
        return this._last;
    }
    static { this.ɵfac = function AjfSlideCompletionPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSlideCompletionPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfSlideCompletion", type: AjfSlideCompletionPipe, pure: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSlideCompletionPipe, [{
        type: Pipe,
        args: [{ name: 'ajfSlideCompletion', pure: false }]
    }], null, null); })();
/**
 * How many of a slide's visible fields are failing validation.
 */
export class AjfSlideIssuesPipe {
    transform(slide, idx = 0) {
        return countableFields(slide, idx).filter(f => !f.valid).length;
    }
    static { this.ɵfac = function AjfSlideIssuesPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfSlideIssuesPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfSlideIssues", type: AjfSlideIssuesPipe, pure: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfSlideIssuesPipe, [{
        type: Pipe,
        args: [{ name: 'ajfSlideIssues', pure: false }]
    }], null, null); })();
/**
 * The form's outstanding work in one place. A per-slide count only tells the
 * reader about the slide they are already looking at, which is the one place
 * they can see the failing fields for themselves.
 *
 * Counted here rather than taken from `AjfFormRendererService.errors`, which
 * counts invalid slide pages and says nothing about how many fields are behind
 * them.
 *
 * Impure and memoized, like its neighbours above.
 */
export class AjfFormIssuesPipe {
    constructor() {
        this._last = { fields: 0, slides: 0 };
    }
    transform(slides) {
        let fields = 0;
        let slideCount = 0;
        (slides || [])
            .filter(slide => slide.visible !== false)
            .forEach(slide => {
            // Every repetition of a repeating slide carries its own set of fields,
            // and any of them can be the one failing.
            const reps = isRepeatingSlideInstance(slide)
                ? Math.max(1, slide.reps)
                : 1;
            let slideFields = 0;
            for (let idx = 0; idx < reps; idx++) {
                slideFields += countableFields(slide, idx).filter(f => !f.valid).length;
            }
            if (slideFields > 0) {
                fields += slideFields;
                slideCount++;
            }
        });
        if (this._last.fields === fields && this._last.slides === slideCount) {
            return this._last;
        }
        this._last = { fields, slides: slideCount };
        return this._last;
    }
    static { this.ɵfac = function AjfFormIssuesPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormIssuesPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfFormIssues", type: AjfFormIssuesPipe, pure: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormIssuesPipe, [{
        type: Pipe,
        args: [{ name: 'ajfFormIssues', pure: false }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUtc3RhdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3Jtcy9zcmMvc2xpZGUtc3RhdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUdMLFlBQVksRUFJWixlQUFlLEVBQ2Ysd0JBQXdCLEVBQ3hCLHdCQUF3QixHQUN6QixNQUFNLGlCQUFpQixDQUFDO0FBQ3pCLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDOztBQVNsRDs7OztHQUlHO0FBQ0gsTUFBTSxlQUFlLEdBQUcsQ0FBQyxLQUEyQixFQUFFLEdBQVcsRUFBc0IsRUFBRTtJQUN2RixNQUFNLEtBQUssR0FDVCxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDO0lBQ3ZFLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FDakIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsS0FBSyxDQUMxRCxDQUFDO0FBQzFCLENBQUMsQ0FBQztBQUVGOzs7Ozs7OztHQVFHO0FBQ0gsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUF1QixFQUFFLFNBQWtDLEVBQVcsRUFBRTtJQUN4RixNQUFNLElBQUksR0FBRyx3QkFBd0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxNQUFNLE9BQU8sR0FBRyxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUks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QUcsQ0FBQyxDQUFDLEVBQUcsS0FBbUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hELENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDTixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUM7WUFDcEIsS0FBSyxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO2dCQUNwQyxXQUFXLElBQUksZUFBZSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDMUUsQ0FBQztZQUNELElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxDQUFDO2dCQUNwQixNQUFNLElBQUksV0FBVyxDQUFDO2dCQUN0QixVQUFVLEVBQUUsQ0FBQztZQUNmLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ3JFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFDLENBQUM7UUFDMUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7a0hBNUJVLGlCQUFpQjt1RkFBakIsaUJBQWlCOztpRkFBakIsaUJBQWlCO2NBRDdCLElBQUk7ZUFBQyxFQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQmFzZVNsaWRlSW5zdGFuY2UsXG4gIEFqZkZpZWxkSW5zdGFuY2UsXG4gIEFqZkZpZWxkVHlwZSxcbiAgQWpmTm9kZUluc3RhbmNlLFxuICBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLFxuICBBamZTbGlkZUluc3RhbmNlLFxuICBpc0ZpZWxkSW5zdGFuY2UsXG4gIGlzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSxcbiAgbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lLFxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VW50eXBlZEZvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG4vKiogVGhlIGZpbGxlZC90b3RhbCBjb3VudGVyIHNob3duIGFzIGEgY2hpcCBpbiB0aGUgc2xpZGUgaGVhZGVyLiAqL1xuZXhwb3J0IGludGVyZmFjZSBBamZTbGlkZUNvbXBsZXRpb24ge1xuICBkb25lOiBudW1iZXI7XG4gIHRvdGFsOiBudW1iZXI7XG59XG5cbi8qKlxuICogVGhlIGZpZWxkcyBhIHNsaWRlIGhlYWRlciBjb3VudHMuIGBzbGlkZU5vZGVzYCBpcyBpbmRleGVkIHBlciByZXBldGl0aW9uLCBhbmRcbiAqIGEgbm9uLXJlcGVhdGluZyBzbGlkZSBrZWVwcyBpdHMgb25seSBzZXQgb2Ygbm9kZXMgYXQgaW5kZXggMCwgc28gYm90aCBraW5kcyBvZlxuICogc2xpZGUgYXJlIHJlYWQgdGhlIHNhbWUgd2F5LlxuICovXG5jb25zdCBjb3VudGFibGVGaWVsZHMgPSAoc2xpZGU6IEFqZkJhc2VTbGlkZUluc3RhbmNlLCBpZHg6IG51bWJlcik6IEFqZkZpZWxkSW5zdGFuY2VbXSA9PiB7XG4gIGNvbnN0IG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9XG4gICAgKHNsaWRlLnNsaWRlTm9kZXMgJiYgc2xpZGUuc2xpZGVOb2Rlc1tpZHhdKSB8fCBzbGlkZS5mbGF0Tm9kZXMgfHwgW107XG4gIHJldHVybiBub2Rlcy5maWx0ZXIoXG4gICAgbiA9PiBuLnZpc2libGUgJiYgaXNGaWVsZEluc3RhbmNlKG4pICYmIG4ubm9kZS5maWVsZFR5cGUgIT09IEFqZkZpZWxkVHlwZS5FbXB0eSxcbiAgKSBhcyBBamZGaWVsZEluc3RhbmNlW107XG59O1xuXG4vKipcbiAqIFdoZXRoZXIgYSBmaWVsZCBob2xkcyBhbnl0aGluZy5cbiAqXG4gKiBUaGUgdmFsdWUgaXMgcmVhZCBvZmYgdGhlIGZvcm0gZ3JvdXAsIG5vdCBvZmYgYEFqZkZpZWxkSW5zdGFuY2UudmFsdWVgOiB0aGVcbiAqIGluc3RhbmNlJ3Mgb3duIGB2YWx1ZWAgaXMgb25seSB3cml0dGVuIGF0IGluaXRpYWxpc2F0aW9uIGFuZCBieSBmb3JtdWxhcywgc28gaXRcbiAqIGRvZXMgbm90IGZvbGxvdyB3aGF0IHRoZSB1c2VyIHR5cGVzLiBUaGUgZ3JvdXAgaXMgZmxhdCBhbmQga2V5ZWQgYnkgZWFjaFxuICogaW5zdGFuY2UncyBjb21wbGV0ZSBuYW1lLCB3aGljaCBpcyBob3cgYEFqZkZvcm1SZW5kZXJlclNlcnZpY2UuZ2V0Q29udHJvbGBcbiAqIHJlc29sdmVzIGEgY29udHJvbCB0b28uXG4gKi9cbmNvbnN0IGlzRmlsbGVkID0gKGZpZWxkOiBBamZGaWVsZEluc3RhbmNlLCBmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXAgfCBudWxsKTogYm9vbGVhbiA9PiB7XG4gIGNvbnN0IG5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGQpO1xuICBjb25zdCBjb250cm9sID0gZm9ybUdyb3VwICE9IG51bGwgJiYgZm9ybUdyb3VwLmNvbnRhaW5zKG5hbWUpID8gZm9ybUdyb3VwLmNvbnRyb2xzW25hbWVdIDogbnVsbDtcbiAgY29uc3QgdmFsdWUgPSBjb250cm9sICE9IG51bGwgPyBjb250cm9sLnZhbHVlIDogZmllbGQudmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUubGVuZ3RoID4gMDtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogSG93IG1hbnkgb2YgYSBzbGlkZSdzIGZpZWxkcyBjYXJyeSBhIHZhbHVlLCBvdXQgb2YgaG93IG1hbnkgYXJlIG9uIGl0LiBOb3Rlc1xuICogKGBBamZGaWVsZFR5cGUuRW1wdHlgKSBob2xkIG5vIHZhbHVlIGFuZCBhcmUgbGVmdCBvdXQgb2YgYm90aCBudW1iZXJzLlxuICpcbiAqIEltcHVyZSBiZWNhdXNlIGl0IHJlYWRzIG11dGFibGUgaW5zdGFuY2Ugc3RhdGUsIGluIHRoZSBzYW1lIHdheSBhc1xuICogYGFqZlZhbGlkU2xpZGVgIGFuZCBgYWpmQXNGaWVsZEluc3RhbmNlRXJyb3JzYC4gUmV0dXJucyBhIG1lbW9pemVkIG9iamVjdDsgc2VlXG4gKiB0aGUgbm90ZSBpbnNpZGUuXG4gKi9cbkBQaXBlKHtuYW1lOiAnYWpmU2xpZGVDb21wbGV0aW9uJywgcHVyZTogZmFsc2V9KVxuZXhwb3J0IGNsYXNzIEFqZlNsaWRlQ29tcGxldGlvblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgcHJpdmF0ZSBfbGFzdDogQWpmU2xpZGVDb21wbGV0aW9uIHwgbnVsbCA9IG51bGw7XG5cbiAgdHJhbnNmb3JtKFxuICAgIHNsaWRlOiBBamZCYXNlU2xpZGVJbnN0YW5jZSxcbiAgICBpZHg6IG51bWJlciA9IDAsXG4gICAgZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbCA9IG51bGwsXG4gICk6IEFqZlNsaWRlQ29tcGxldGlvbiB7XG4gICAgY29uc3QgZmllbGRzID0gY291bnRhYmxlRmllbGRzKHNsaWRlLCBpZHgpO1xuICAgIGNvbnN0IGRvbmUgPSBmaWVsZHMuZmlsdGVyKGYgPT4gaXNGaWxsZWQoZiwgZm9ybUdyb3VwKSkubGVuZ3RoO1xuICAgIGNvbnN0IHRvdGFsID0gZmllbGRzLmxlbmd0aDtcbiAgICAvLyBIYW5kIGJhY2sgdGhlIHNhbWUgb2JqZWN0IHdoaWxlIHRoZSBjb3VudHMgaG9sZCwgb3IgdGhlIGZyZXNoIGlkZW50aXR5IG9uXG4gICAgLy8gZXZlcnkgY2hlY2sgd291bGQgdHJpcCBBbmd1bGFyJ3MgXCJleHByZXNzaW9uIGhhcyBjaGFuZ2VkXCIgZ3VhcmQuXG4gICAgaWYgKHRoaXMuX2xhc3QgIT0gbnVsbCAmJiB0aGlzLl9sYXN0LmRvbmUgPT09IGRvbmUgJiYgdGhpcy5fbGFzdC50b3RhbCA9PT0gdG90YWwpIHtcbiAgICAgIHJldHVybiB0aGlzLl9sYXN0O1xuICAgIH1cbiAgICB0aGlzLl9sYXN0ID0ge2RvbmUsIHRvdGFsfTtcbiAgICByZXR1cm4gdGhpcy5fbGFzdDtcbiAgfVxufVxuXG4vKipcbiAqIEhvdyBtYW55IG9mIGEgc2xpZGUncyB2aXNpYmxlIGZpZWxkcyBhcmUgZmFpbGluZyB2YWxpZGF0aW9uLlxuICovXG5AUGlwZSh7bmFtZTogJ2FqZlNsaWRlSXNzdWVzJywgcHVyZTogZmFsc2V9KVxuZXhwb3J0IGNsYXNzIEFqZlNsaWRlSXNzdWVzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oc2xpZGU6IEFqZkJhc2VTbGlkZUluc3RhbmNlLCBpZHg6IG51bWJlciA9IDApOiBudW1iZXIge1xuICAgIHJldHVybiBjb3VudGFibGVGaWVsZHMoc2xpZGUsIGlkeCkuZmlsdGVyKGYgPT4gIWYudmFsaWQpLmxlbmd0aDtcbiAgfVxufVxuXG4vKiogV2hhdCBpcyBsZWZ0IHRvIGZpeCBpbiB0aGUgd2hvbGUgZm9ybSwgZm9yIHRoZSBoZWFkZXIgYW5kIGZvb3RlciBhbGVydHMuICovXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1Jc3N1ZXMge1xuICAvKiogVmlzaWJsZSBmaWVsZHMgZmFpbGluZyB2YWxpZGF0aW9uLCBhY3Jvc3MgZXZlcnkgc2xpZGUgYW5kIHJlcGV0aXRpb24uICovXG4gIGZpZWxkczogbnVtYmVyO1xuICAvKiogSG93IG1hbnkgc2xpZGVzIGhvbGQgYXQgbGVhc3Qgb25lIG9mIHRoZW0uICovXG4gIHNsaWRlczogbnVtYmVyO1xufVxuXG4vKipcbiAqIFRoZSBmb3JtJ3Mgb3V0c3RhbmRpbmcgd29yayBpbiBvbmUgcGxhY2UuIEEgcGVyLXNsaWRlIGNvdW50IG9ubHkgdGVsbHMgdGhlXG4gKiByZWFkZXIgYWJvdXQgdGhlIHNsaWRlIHRoZXkgYXJlIGFscmVhZHkgbG9va2luZyBhdCwgd2hpY2ggaXMgdGhlIG9uZSBwbGFjZVxuICogdGhleSBjYW4gc2VlIHRoZSBmYWlsaW5nIGZpZWxkcyBmb3IgdGhlbXNlbHZlcy5cbiAqXG4gKiBDb3VudGVkIGhlcmUgcmF0aGVyIHRoYW4gdGFrZW4gZnJvbSBgQWpmRm9ybVJlbmRlcmVyU2VydmljZS5lcnJvcnNgLCB3aGljaFxuICogY291bnRzIGludmFsaWQgc2xpZGUgcGFnZXMgYW5kIHNheXMgbm90aGluZyBhYm91dCBob3cgbWFueSBmaWVsZHMgYXJlIGJlaGluZFxuICogdGhlbS5cbiAqXG4gKiBJbXB1cmUgYW5kIG1lbW9pemVkLCBsaWtlIGl0cyBuZWlnaGJvdXJzIGFib3ZlLlxuICovXG5AUGlwZSh7bmFtZTogJ2FqZkZvcm1Jc3N1ZXMnLCBwdXJlOiBmYWxzZX0pXG5leHBvcnQgY2xhc3MgQWpmRm9ybUlzc3Vlc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgcHJpdmF0ZSBfbGFzdDogQWpmRm9ybUlzc3VlcyA9IHtmaWVsZHM6IDAsIHNsaWRlczogMH07XG5cbiAgdHJhbnNmb3JtKHNsaWRlczogQWpmU2xpZGVJbnN0YW5jZVtdIHwgbnVsbCk6IEFqZkZvcm1Jc3N1ZXMge1xuICAgIGxldCBmaWVsZHMgPSAwO1xuICAgIGxldCBzbGlkZUNvdW50ID0gMDtcbiAgICAoc2xpZGVzIHx8IFtdKVxuICAgICAgLmZpbHRlcihzbGlkZSA9PiBzbGlkZS52aXNpYmxlICE9PSBmYWxzZSlcbiAgICAgIC5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgLy8gRXZlcnkgcmVwZXRpdGlvbiBvZiBhIHJlcGVhdGluZyBzbGlkZSBjYXJyaWVzIGl0cyBvd24gc2V0IG9mIGZpZWxkcyxcbiAgICAgICAgLy8gYW5kIGFueSBvZiB0aGVtIGNhbiBiZSB0aGUgb25lIGZhaWxpbmcuXG4gICAgICAgIGNvbnN0IHJlcHMgPSBpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2Uoc2xpZGUpXG4gICAgICAgICAgPyBNYXRoLm1heCgxLCAoc2xpZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSkucmVwcylcbiAgICAgICAgICA6IDE7XG4gICAgICAgIGxldCBzbGlkZUZpZWxkcyA9IDA7XG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHJlcHM7IGlkeCsrKSB7XG4gICAgICAgICAgc2xpZGVGaWVsZHMgKz0gY291bnRhYmxlRmllbGRzKHNsaWRlLCBpZHgpLmZpbHRlcihmID0+ICFmLnZhbGlkKS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNsaWRlRmllbGRzID4gMCkge1xuICAgICAgICAgIGZpZWxkcyArPSBzbGlkZUZpZWxkcztcbiAgICAgICAgICBzbGlkZUNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIGlmICh0aGlzLl9sYXN0LmZpZWxkcyA9PT0gZmllbGRzICYmIHRoaXMuX2xhc3Quc2xpZGVzID09PSBzbGlkZUNvdW50KSB7XG4gICAgICByZXR1cm4gdGhpcy5fbGFzdDtcbiAgICB9XG4gICAgdGhpcy5fbGFzdCA9IHtmaWVsZHMsIHNsaWRlczogc2xpZGVDb3VudH07XG4gICAgcmV0dXJuIHRoaXMuX2xhc3Q7XG4gIH1cbn1cbiJdfQ==