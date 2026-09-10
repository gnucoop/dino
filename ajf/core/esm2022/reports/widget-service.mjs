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
import { componentsMap } from './utils/widgets/widgets-map';
export class AjfWidgetService {
    constructor(defaultWidgets) {
        this.componentsMap = componentsMap;
        if (defaultWidgets != null) {
            for (const key in defaultWidgets) {
                const nKey = parseInt(key, 10);
                this.componentsMap[nKey] = defaultWidgets[key];
            }
        }
    }
    registerCustomWidget(widget) {
        const { widgetType, component } = widget;
        if (widgetType < 100) {
            throw new Error('Invalid custom widget type, it must be greater than 100');
        }
        if (component == null) {
            throw new Error('Invalid custom widget component');
        }
        this.componentsMap[widgetType] = widget;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3JlcG9ydHMvc3JjL3dpZGdldC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQU1ILE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRCxNQUFNLE9BQWdCLGdCQUFnQjtJQUdwQyxZQUFZLGNBQXNDO1FBRnpDLGtCQUFhLEdBQTJCLGFBQWEsQ0FBQztRQUc3RCxJQUFJLGNBQWMsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUMzQixLQUFLLE1BQU0sR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO2dCQUNqQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqRCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxNQUlwQjtRQUNDLE1BQU0sRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ3ZDLElBQUksVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBQ0QsSUFBSSxTQUFTLElBQUksSUFBSSxFQUFFLENBQUM7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUMxQyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQmFzZVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldENvbXBvbmVudHNNYXB9IGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LWNvbXBvbmVudHMtbWFwJztcbmltcG9ydCB7Y29tcG9uZW50c01hcH0gZnJvbSAnLi91dGlscy93aWRnZXRzL3dpZGdldHMtbWFwJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZldpZGdldFNlcnZpY2Uge1xuICByZWFkb25seSBjb21wb25lbnRzTWFwOiBBamZXaWRnZXRDb21wb25lbnRzTWFwID0gY29tcG9uZW50c01hcDtcblxuICBjb25zdHJ1Y3RvcihkZWZhdWx0V2lkZ2V0czogQWpmV2lkZ2V0Q29tcG9uZW50c01hcCkge1xuICAgIGlmIChkZWZhdWx0V2lkZ2V0cyAhPSBudWxsKSB7XG4gICAgICBmb3IgKGNvbnN0IGtleSBpbiBkZWZhdWx0V2lkZ2V0cykge1xuICAgICAgICBjb25zdCBuS2V5ID0gcGFyc2VJbnQoa2V5LCAxMCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50c01hcFtuS2V5XSA9IGRlZmF1bHRXaWRnZXRzW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVnaXN0ZXJDdXN0b21XaWRnZXQod2lkZ2V0OiB7XG4gICAgd2lkZ2V0VHlwZTogbnVtYmVyO1xuICAgIGNvbXBvbmVudDogVHlwZTxBamZCYXNlV2lkZ2V0Q29tcG9uZW50PjtcbiAgICBpbnB1dHM/OiB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IHt3aWRnZXRUeXBlLCBjb21wb25lbnR9ID0gd2lkZ2V0O1xuICAgIGlmICh3aWRnZXRUeXBlIDwgMTAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3VzdG9tIHdpZGdldCB0eXBlLCBpdCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAxMDAnKTtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3VzdG9tIHdpZGdldCBjb21wb25lbnQnKTtcbiAgICB9XG4gICAgdGhpcy5jb21wb25lbnRzTWFwW3dpZGdldFR5cGVdID0gd2lkZ2V0O1xuICB9XG59XG4iXX0=