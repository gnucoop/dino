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
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * It returns true if AjfFieldWithChoices is forceExpanded and filteredChoices length is
 * less than equal threshold.
 */
export class AjfExpandFieldWithChoicesPipe {
    transform(instance, threshold) {
        return (!instance.node.forceNarrow &&
            (instance.node.forceExpanded ||
                (instance.filteredChoices && instance.filteredChoices.length <= threshold)));
    }
    static { this.ɵfac = function AjfExpandFieldWithChoicesPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfExpandFieldWithChoicesPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfExpandFieldWithChoices", type: AjfExpandFieldWithChoicesPipe, pure: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfExpandFieldWithChoicesPipe, [{
        type: Pipe,
        args: [{ name: 'ajfExpandFieldWithChoices' }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLWlucHV0LXdpdGgtY2hvaWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2V4cGFuZC1pbnB1dC13aXRoLWNob2ljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7O0FBSWxEOzs7R0FHRztBQUVILE1BQU0sT0FBTyw2QkFBNkI7SUFDeEMsU0FBUyxDQUFDLFFBQTBDLEVBQUUsU0FBaUI7UUFDckUsT0FBTyxDQUNMLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQzFCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhO2dCQUMxQixDQUFDLFFBQVEsQ0FBQyxlQUFlLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FDOUUsQ0FBQztJQUNKLENBQUM7OEhBUFUsNkJBQTZCO21HQUE3Qiw2QkFBNkI7O2lGQUE3Qiw2QkFBNkI7Y0FEekMsSUFBSTtlQUFDLEVBQUMsSUFBSSxFQUFFLDJCQUEyQixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuXG4vKipcbiAqIEl0IHJldHVybnMgdHJ1ZSBpZiBBamZGaWVsZFdpdGhDaG9pY2VzIGlzIGZvcmNlRXhwYW5kZWQgYW5kIGZpbHRlcmVkQ2hvaWNlcyBsZW5ndGggaXNcbiAqIGxlc3MgdGhhbiBlcXVhbCB0aHJlc2hvbGQuXG4gKi9cbkBQaXBlKHtuYW1lOiAnYWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlcyd9KVxuZXhwb3J0IGNsYXNzIEFqZkV4cGFuZEZpZWxkV2l0aENob2ljZXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnN0YW5jZTogQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT4sIHRocmVzaG9sZDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgICFpbnN0YW5jZS5ub2RlLmZvcmNlTmFycm93ICYmXG4gICAgICAoaW5zdGFuY2Uubm9kZS5mb3JjZUV4cGFuZGVkIHx8XG4gICAgICAgIChpbnN0YW5jZS5maWx0ZXJlZENob2ljZXMgJiYgaW5zdGFuY2UuZmlsdGVyZWRDaG9pY2VzLmxlbmd0aCA8PSB0aHJlc2hvbGQpKVxuICAgICk7XG4gIH1cbn1cbiJdfQ==