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
import { isRepeatingSlideInstance } from './utils/nodes-instances/is-repeating-slide-instance';
import * as i0 from "@angular/core";
/**
 * It checks if the AjfNodeInstance parameter is an isRepeatingSlideInstance.
 *
 * @export
 * @class AjfIsRepeatingSlideInstancePipe
 */
export class AjfIsRepeatingSlideInstancePipe {
    transform(instance) {
        return isRepeatingSlideInstance(instance);
    }
    static { this.ɵfac = function AjfIsRepeatingSlideInstancePipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfIsRepeatingSlideInstancePipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfIsRepeatingSlideInstance", type: AjfIsRepeatingSlideInstancePipe, pure: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfIsRepeatingSlideInstancePipe, [{
        type: Pipe,
        args: [{ name: 'ajfIsRepeatingSlideInstance' }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcmVwZWF0aW5nLXNsaWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvaXMtcmVwZWF0aW5nLXNsaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBRWxELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHFEQUFxRCxDQUFDOztBQUU3Rjs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsU0FBUyxDQUFDLFFBQXlCO1FBQ2pDLE9BQU8sd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQztnSUFIVSwrQkFBK0I7cUdBQS9CLCtCQUErQjs7aUZBQS9CLCtCQUErQjtjQUQzQyxJQUFJO2VBQUMsRUFBQyxJQUFJLEVBQUUsNkJBQTZCLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5cbi8qKlxuICogSXQgY2hlY2tzIGlmIHRoZSBBamZOb2RlSW5zdGFuY2UgcGFyYW1ldGVyIGlzIGFuIGlzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQWpmSXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZVxuICovXG5AUGlwZSh7bmFtZTogJ2FqZklzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSd9KVxuZXhwb3J0IGNsYXNzIEFqZklzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZVBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgfVxufVxuIl19