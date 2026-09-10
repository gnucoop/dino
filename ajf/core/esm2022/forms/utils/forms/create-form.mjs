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
/**
 * It creates an Ajf form.
 * Any missing mandatory attributes are initialized with the respective
 * empty object
 *
 * @export
 * @param [form={}]
 * @return {*}
 */
export function createForm(form = {}) {
    return {
        nodes: form.nodes || [],
        choicesOrigins: form.choicesOrigins || [],
        attachmentsOrigins: form.attachmentsOrigins || [],
        initContext: form.initContext || {},
        stringIdentifier: form.stringIdentifier || [],
        supplementaryInformations: form.supplementaryInformations,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy91dGlscy9mb3Jtcy9jcmVhdGUtZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFNSDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUMsT0FBc0IsRUFBRTtJQUNqRCxPQUFPO1FBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN2QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsSUFBSSxFQUFFO1FBQ3pDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxFQUFFO1FBQ2pELFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUU7UUFDbkMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEVBQUU7UUFDN0MseUJBQXlCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QjtLQUMxRCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZm9ybXMvZm9ybSc7XG5cbmV4cG9ydCB0eXBlIEFqZkZvcm1DcmVhdGUgPSBQYXJ0aWFsPEFqZkZvcm0+O1xuXG4vKipcbiAqIEl0IGNyZWF0ZXMgYW4gQWpmIGZvcm0uXG4gKiBBbnkgbWlzc2luZyBtYW5kYXRvcnkgYXR0cmlidXRlcyBhcmUgaW5pdGlhbGl6ZWQgd2l0aCB0aGUgcmVzcGVjdGl2ZVxuICogZW1wdHkgb2JqZWN0XG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIFtmb3JtPXt9XVxuICogQHJldHVybiB7Kn1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZvcm0oZm9ybTogQWpmRm9ybUNyZWF0ZSA9IHt9KTogQWpmRm9ybSB7XG4gIHJldHVybiB7XG4gICAgbm9kZXM6IGZvcm0ubm9kZXMgfHwgW10sXG4gICAgY2hvaWNlc09yaWdpbnM6IGZvcm0uY2hvaWNlc09yaWdpbnMgfHwgW10sXG4gICAgYXR0YWNobWVudHNPcmlnaW5zOiBmb3JtLmF0dGFjaG1lbnRzT3JpZ2lucyB8fCBbXSxcbiAgICBpbml0Q29udGV4dDogZm9ybS5pbml0Q29udGV4dCB8fCB7fSxcbiAgICBzdHJpbmdJZGVudGlmaWVyOiBmb3JtLnN0cmluZ0lkZW50aWZpZXIgfHwgW10sXG4gICAgc3VwcGxlbWVudGFyeUluZm9ybWF0aW9uczogZm9ybS5zdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zLFxuICB9O1xufVxuIl19