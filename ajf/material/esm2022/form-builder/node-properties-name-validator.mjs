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
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { finalize, map, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "./form-builder-service";
/**
 * Custom validator service that checks for an already existing
 * Node with the given name.
 */
export class AjfNodePropertiesNameMatchValidator {
    constructor(_fbs) {
        this._fbs = _fbs;
    }
    /**
     * Custom async validator method.
     * Checks if a Node with the same Name exists, in order to
     * validate the Node Entry properties form.
     * @param cdr The editor changeDetectionRef
     * @param currentId The current node entry id
     */
    sameValueCheck(cdr, currentId) {
        return (control) => {
            const flatNodes$ = this._fbs.flatNodes ?? of([]);
            return flatNodes$.pipe(map(nodes => {
                const sameNameNode = nodes.find(n => n.name.toLowerCase() === control.value.toLowerCase() && n.id !== currentId);
                return sameNameNode ? { name_exists: true } : null;
            }), take(1), finalize(() => {
                control.markAsTouched();
                cdr.detectChanges();
            }));
        };
    }
    static { this.ɵfac = function AjfNodePropertiesNameMatchValidator_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfNodePropertiesNameMatchValidator)(i0.ɵɵinject(i1.AjfFormBuilderService)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AjfNodePropertiesNameMatchValidator, factory: AjfNodePropertiesNameMatchValidator.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfNodePropertiesNameMatchValidator, [{
        type: Injectable
    }], () => [{ type: i1.AjfFormBuilderService }], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1wcm9wZXJ0aWVzLW5hbWUtdmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9ub2RlLXByb3BlcnRpZXMtbmFtZS12YWxpZGF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsT0FBTyxFQUFvQixVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFNUQsT0FBTyxFQUFhLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNwQyxPQUFPLEVBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7O0FBR25EOzs7R0FHRztBQUVILE1BQU0sT0FBTyxtQ0FBbUM7SUFDOUMsWUFBb0IsSUFBMkI7UUFBM0IsU0FBSSxHQUFKLElBQUksQ0FBdUI7SUFBRyxDQUFDO0lBRW5EOzs7Ozs7T0FNRztJQUNILGNBQWMsQ0FBQyxHQUFzQixFQUFFLFNBQWlCO1FBQ3RELE9BQU8sQ0FBQyxPQUF3QixFQUF1QyxFQUFFO1lBQ3ZFLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqRCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQ3BCLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDVixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUM3QixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssT0FBTyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FDaEYsQ0FBQztnQkFDRixPQUFPLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNuRCxDQUFDLENBQUMsRUFDRixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ1AsUUFBUSxDQUFDLEdBQUcsRUFBRTtnQkFDWixPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3hCLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN0QixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0osQ0FBQyxDQUFDO0lBQ0osQ0FBQztvSUEzQlUsbUNBQW1DO3VFQUFuQyxtQ0FBbUMsV0FBbkMsbUNBQW1DOztpRkFBbkMsbUNBQW1DO2NBRC9DLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBBc3luY1ZhbGlkYXRvckZuLCBWYWxpZGF0aW9uRXJyb3JzfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge09ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmluYWxpemUsIG1hcCwgdGFrZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtBamZGb3JtQnVpbGRlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1idWlsZGVyLXNlcnZpY2UnO1xuXG4vKipcbiAqIEN1c3RvbSB2YWxpZGF0b3Igc2VydmljZSB0aGF0IGNoZWNrcyBmb3IgYW4gYWxyZWFkeSBleGlzdGluZ1xuICogTm9kZSB3aXRoIHRoZSBnaXZlbiBuYW1lLlxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmTm9kZVByb3BlcnRpZXNOYW1lTWF0Y2hWYWxpZGF0b3Ige1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9mYnM6IEFqZkZvcm1CdWlsZGVyU2VydmljZSkge31cblxuICAvKipcbiAgICogQ3VzdG9tIGFzeW5jIHZhbGlkYXRvciBtZXRob2QuXG4gICAqIENoZWNrcyBpZiBhIE5vZGUgd2l0aCB0aGUgc2FtZSBOYW1lIGV4aXN0cywgaW4gb3JkZXIgdG9cbiAgICogdmFsaWRhdGUgdGhlIE5vZGUgRW50cnkgcHJvcGVydGllcyBmb3JtLlxuICAgKiBAcGFyYW0gY2RyIFRoZSBlZGl0b3IgY2hhbmdlRGV0ZWN0aW9uUmVmXG4gICAqIEBwYXJhbSBjdXJyZW50SWQgVGhlIGN1cnJlbnQgbm9kZSBlbnRyeSBpZFxuICAgKi9cbiAgc2FtZVZhbHVlQ2hlY2soY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgY3VycmVudElkOiBudW1iZXIpOiBBc3luY1ZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IE9ic2VydmFibGU8VmFsaWRhdGlvbkVycm9ycyB8IG51bGw+ID0+IHtcbiAgICAgIGNvbnN0IGZsYXROb2RlcyQgPSB0aGlzLl9mYnMuZmxhdE5vZGVzID8/IG9mKFtdKTtcbiAgICAgIHJldHVybiBmbGF0Tm9kZXMkLnBpcGUoXG4gICAgICAgIG1hcChub2RlcyA9PiB7XG4gICAgICAgICAgY29uc3Qgc2FtZU5hbWVOb2RlID0gbm9kZXMuZmluZChcbiAgICAgICAgICAgIG4gPT4gbi5uYW1lLnRvTG93ZXJDYXNlKCkgPT09IGNvbnRyb2wudmFsdWUudG9Mb3dlckNhc2UoKSAmJiBuLmlkICE9PSBjdXJyZW50SWQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gc2FtZU5hbWVOb2RlID8ge25hbWVfZXhpc3RzOiB0cnVlfSA6IG51bGw7XG4gICAgICAgIH0pLFxuICAgICAgICB0YWtlKDEpLFxuICAgICAgICBmaW5hbGl6ZSgoKSA9PiB7XG4gICAgICAgICAgY29udHJvbC5tYXJrQXNUb3VjaGVkKCk7XG4gICAgICAgICAgY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH07XG4gIH1cbn1cbiJdfQ==