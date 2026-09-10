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
import { evaluateExpression } from '@ajf/core/models';
/**
 * It updates instance.verifiedBranch with the idx of the last branch verified.
 * If instance.verifiedBranch value changes return true
 */
export function updateConditionalBranches(instance, context) {
    const conditionalBranches = instance.conditionalBranches;
    if (conditionalBranches != null) {
        const oldBranch = instance.verifiedBranch;
        let idx = 0;
        let found = false;
        while (idx < conditionalBranches.length && !found) {
            let verified = evaluateExpression(conditionalBranches[idx].condition, context);
            if (verified) {
                found = true;
                if (idx !== instance.verifiedBranch) {
                    instance.verifiedBranch = idx;
                }
            }
            idx++;
        }
        if (oldBranch !== instance.verifiedBranch) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWNvbmRpdGlvbmFsLWJyYW5jaGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS1jb25kaXRpb25hbC1icmFuY2hlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWEsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUloRTs7O0dBR0c7QUFDSCxNQUFNLFVBQVUseUJBQXlCLENBQUMsUUFBeUIsRUFBRSxPQUFtQjtJQUN0RixNQUFNLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQztJQUV6RCxJQUFJLG1CQUFtQixJQUFJLElBQUksRUFBRSxDQUFDO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUM7UUFDMUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLE9BQU8sR0FBRyxHQUFHLG1CQUFtQixDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2xELElBQUksUUFBUSxHQUFZLGtCQUFrQixDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN4RixJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUNiLEtBQUssR0FBRyxJQUFJLENBQUM7Z0JBQ2IsSUFBSSxHQUFHLEtBQUssUUFBUSxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUNwQyxRQUFRLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQztnQkFDaEMsQ0FBQztZQUNILENBQUM7WUFDRCxHQUFHLEVBQUUsQ0FBQztRQUNSLENBQUM7UUFFRCxJQUFJLFNBQVMsS0FBSyxRQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDMUMsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0LCBldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcblxuLyoqXG4gKiBJdCB1cGRhdGVzIGluc3RhbmNlLnZlcmlmaWVkQnJhbmNoIHdpdGggdGhlIGlkeCBvZiB0aGUgbGFzdCBicmFuY2ggdmVyaWZpZWQuXG4gKiBJZiBpbnN0YW5jZS52ZXJpZmllZEJyYW5jaCB2YWx1ZSBjaGFuZ2VzIHJldHVybiB0cnVlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKGluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGNvbnRleHQ6IEFqZkNvbnRleHQpOiBib29sZWFuIHtcbiAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlcyA9IGluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXM7XG5cbiAgaWYgKGNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCkge1xuICAgIGNvbnN0IG9sZEJyYW5jaCA9IGluc3RhbmNlLnZlcmlmaWVkQnJhbmNoO1xuICAgIGxldCBpZHggPSAwO1xuICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgIHdoaWxlIChpZHggPCBjb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCAmJiAhZm91bmQpIHtcbiAgICAgIGxldCB2ZXJpZmllZDogYm9vbGVhbiA9IGV2YWx1YXRlRXhwcmVzc2lvbihjb25kaXRpb25hbEJyYW5jaGVzW2lkeF0uY29uZGl0aW9uLCBjb250ZXh0KTtcbiAgICAgIGlmICh2ZXJpZmllZCkge1xuICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgIGlmIChpZHggIT09IGluc3RhbmNlLnZlcmlmaWVkQnJhbmNoKSB7XG4gICAgICAgICAgaW5zdGFuY2UudmVyaWZpZWRCcmFuY2ggPSBpZHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlkeCsrO1xuICAgIH1cblxuICAgIGlmIChvbGRCcmFuY2ggIT09IGluc3RhbmNlLnZlcmlmaWVkQnJhbmNoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=