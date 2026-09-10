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
import { deepCopy } from '@ajf/core/utils';
import { AjfAttachmentsOriginSerializer } from './attachments-origin-serializer';
import { AjfChoicesOriginSerializer } from './choices-origin-serializer';
import { AjfNodeSerializer } from './node-serializer';
/**
 *  Create an AjfForm by json schema, apply a default value for stringIdentifier and initContext
 */
export class AjfFormSerializer {
    static fromJson(form, context) {
        /**
         * create choicesOrigins by serializer
         */
        const choicesOrigins = (form.choicesOrigins || []).map(c => AjfChoicesOriginSerializer.fromJson(c));
        /**
         * create attachmentsOrigins by serializer
         */
        const attachmentsOrigins = (form.attachmentsOrigins || []).map(a => AjfAttachmentsOriginSerializer.fromJson(a));
        /**
         * create nodes by serializer
         */
        const nodes = (form.nodes || []).map(n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins));
        return {
            ...form,
            choicesOrigins,
            attachmentsOrigins,
            nodes,
            stringIdentifier: form.stringIdentifier || [],
            initContext: deepCopy(context || {}),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvc2VyaWFsaXplcnMvZm9ybS1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUl6QyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVwRDs7R0FFRztBQUNILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFzQixFQUFFLE9BQW9CO1FBQzFEOztXQUVHO1FBQ0gsTUFBTSxjQUFjLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUN6RCwwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQ3ZDLENBQUM7UUFDRjs7V0FFRztRQUNILE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ2pFLDhCQUE4QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FDM0MsQ0FBQztRQUNGOztXQUVHO1FBQ0gsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUN2QyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUM5QixDQUFDO1FBQ3RDLE9BQU87WUFDTCxHQUFHLElBQUk7WUFDUCxjQUFjO1lBQ2Qsa0JBQWtCO1lBQ2xCLEtBQUs7WUFDTCxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLElBQUksRUFBRTtZQUM3QyxXQUFXLEVBQUUsUUFBUSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7U0FDckMsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4uL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGV9IGZyb20gJy4uL2ludGVyZmFjZS9zbGlkZXMvcmVwZWF0aW5nLXNsaWRlJztcbmltcG9ydCB7QWpmU2xpZGV9IGZyb20gJy4uL2ludGVyZmFjZS9zbGlkZXMvc2xpZGUnO1xuaW1wb3J0IHtBamZBdHRhY2htZW50c09yaWdpblNlcmlhbGl6ZXJ9IGZyb20gJy4vYXR0YWNobWVudHMtb3JpZ2luLXNlcmlhbGl6ZXInO1xuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2luU2VyaWFsaXplcn0gZnJvbSAnLi9jaG9pY2VzLW9yaWdpbi1zZXJpYWxpemVyJztcbmltcG9ydCB7QWpmTm9kZVNlcmlhbGl6ZXJ9IGZyb20gJy4vbm9kZS1zZXJpYWxpemVyJztcblxuLyoqXG4gKiAgQ3JlYXRlIGFuIEFqZkZvcm0gYnkganNvbiBzY2hlbWEsIGFwcGx5IGEgZGVmYXVsdCB2YWx1ZSBmb3Igc3RyaW5nSWRlbnRpZmllciBhbmQgaW5pdENvbnRleHRcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZkZvcm1TZXJpYWxpemVyIHtcbiAgc3RhdGljIGZyb21Kc29uKGZvcm06IFBhcnRpYWw8QWpmRm9ybT4sIGNvbnRleHQ/OiBBamZDb250ZXh0KTogQWpmRm9ybSB7XG4gICAgLyoqXG4gICAgICogY3JlYXRlIGNob2ljZXNPcmlnaW5zIGJ5IHNlcmlhbGl6ZXJcbiAgICAgKi9cbiAgICBjb25zdCBjaG9pY2VzT3JpZ2lucyA9IChmb3JtLmNob2ljZXNPcmlnaW5zIHx8IFtdKS5tYXAoYyA9PlxuICAgICAgQWpmQ2hvaWNlc09yaWdpblNlcmlhbGl6ZXIuZnJvbUpzb24oYyksXG4gICAgKTtcbiAgICAvKipcbiAgICAgKiBjcmVhdGUgYXR0YWNobWVudHNPcmlnaW5zIGJ5IHNlcmlhbGl6ZXJcbiAgICAgKi9cbiAgICBjb25zdCBhdHRhY2htZW50c09yaWdpbnMgPSAoZm9ybS5hdHRhY2htZW50c09yaWdpbnMgfHwgW10pLm1hcChhID0+XG4gICAgICBBamZBdHRhY2htZW50c09yaWdpblNlcmlhbGl6ZXIuZnJvbUpzb24oYSksXG4gICAgKTtcbiAgICAvKipcbiAgICAgKiBjcmVhdGUgbm9kZXMgYnkgc2VyaWFsaXplclxuICAgICAqL1xuICAgIGNvbnN0IG5vZGVzID0gKGZvcm0ubm9kZXMgfHwgW10pLm1hcChuID0+XG4gICAgICBBamZOb2RlU2VyaWFsaXplci5mcm9tSnNvbihuLCBjaG9pY2VzT3JpZ2lucywgYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICApIGFzIChBamZSZXBlYXRpbmdTbGlkZSB8IEFqZlNsaWRlKVtdO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5mb3JtLFxuICAgICAgY2hvaWNlc09yaWdpbnMsXG4gICAgICBhdHRhY2htZW50c09yaWdpbnMsXG4gICAgICBub2RlcyxcbiAgICAgIHN0cmluZ0lkZW50aWZpZXI6IGZvcm0uc3RyaW5nSWRlbnRpZmllciB8fCBbXSxcbiAgICAgIGluaXRDb250ZXh0OiBkZWVwQ29weShjb250ZXh0IHx8IHt9KSxcbiAgICB9O1xuICB9XG59XG4iXX0=