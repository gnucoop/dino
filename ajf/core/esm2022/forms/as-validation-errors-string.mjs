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
 * It casts an AjfNodeInstance as a string of all validation errors of an AjfFieldInstance.
 */
export class AjfAsFieldInstanceErrorsPipe {
    transform(instance) {
        const fieldInstance = instance;
        if (fieldInstance.valid || !fieldInstance.validationResults)
            return null;
        const errors = fieldInstance.validationResults.filter(res => !res.result);
        return errors.map(vr => vr.error).join(', ');
    }
    static { this.ɵfac = function AjfAsFieldInstanceErrorsPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfAsFieldInstanceErrorsPipe)(); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfAsFieldInstanceErrors", type: AjfAsFieldInstanceErrorsPipe, pure: false }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfAsFieldInstanceErrorsPipe, [{
        type: Pipe,
        args: [{ name: 'ajfAsFieldInstanceErrors', pure: false }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXMtdmFsaWRhdGlvbi1lcnJvcnMtc3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvYXMtdmFsaWRhdGlvbi1lcnJvcnMtc3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDOztBQUtsRDs7R0FFRztBQUVILE1BQU0sT0FBTyw0QkFBNEI7SUFDdkMsU0FBUyxDQUFDLFFBQXlCO1FBQ2pDLE1BQU0sYUFBYSxHQUFHLFFBQTRCLENBQUM7UUFDbkQsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQjtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3pFLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7NkhBTlUsNEJBQTRCO2tHQUE1Qiw0QkFBNEI7O2lGQUE1Qiw0QkFBNEI7Y0FEeEMsSUFBSTtlQUFDLEVBQUMsSUFBSSxFQUFFLDBCQUEwQixFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuXG4vKipcbiAqIEl0IGNhc3RzIGFuIEFqZk5vZGVJbnN0YW5jZSBhcyBhIHN0cmluZyBvZiBhbGwgdmFsaWRhdGlvbiBlcnJvcnMgb2YgYW4gQWpmRmllbGRJbnN0YW5jZS5cbiAqL1xuQFBpcGUoe25hbWU6ICdhamZBc0ZpZWxkSW5zdGFuY2VFcnJvcnMnLCBwdXJlOiBmYWxzZX0pXG5leHBvcnQgY2xhc3MgQWpmQXNGaWVsZEluc3RhbmNlRXJyb3JzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IGZpZWxkSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkIHx8ICFmaWVsZEluc3RhbmNlLnZhbGlkYXRpb25SZXN1bHRzKSByZXR1cm4gbnVsbDtcbiAgICBjb25zdCBlcnJvcnMgPSBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb25SZXN1bHRzLmZpbHRlcihyZXMgPT4gIXJlcy5yZXN1bHQpO1xuICAgIHJldHVybiBlcnJvcnMubWFwKHZyID0+IHZyLmVycm9yKS5qb2luKCcsICcpO1xuICB9XG59XG4iXX0=