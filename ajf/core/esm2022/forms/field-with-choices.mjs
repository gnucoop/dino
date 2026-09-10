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
import { AjfBaseFieldComponent } from './base-field';
/**
 * It rappresents the base componet for every ajf fields with choiches.
 *
 * @export
 * @abstract
 * @class AjfFieldWithChoicesComponent
 * @template T
 */
export class AjfFieldWithChoicesComponent extends AjfBaseFieldComponent {
    /**
     * It represents the threshold below which the choices are displayed
     * in expanded mode.
     *
     * @readonly
     */
    get searchThreshold() {
        return this._searchThreshold;
    }
    constructor(cdr, service, warningAlertService, searchThreshold) {
        super(cdr, service, warningAlertService);
        this._searchThreshold = 6;
        if (searchThreshold != null) {
            this._searchThreshold = searchThreshold;
        }
    }
    /**
     * Whether the field holds a selection, which is what the clear action is
     * offered for. A multiple choice value is an array and a single choice value a
     * scalar, and an empty array is as empty as a null.
     */
    hasValue(ctrl) {
        const value = ctrl != null ? ctrl.value : null;
        if (value == null || value === '') {
            return false;
        }
        return Array.isArray(value) ? value.length > 0 : true;
    }
    /**
     * Reset the field to no selection. Neither presentation can do this on its own:
     * a radio cannot be unpicked, and clearing a multi-select one chip at a time is
     * tedious.
     */
    clearValue(ctrl, event) {
        if (event != null) {
            // Stop the click reaching a select trigger, which would open the panel.
            event.stopPropagation();
            event.preventDefault();
        }
        ctrl.setValue(null);
        ctrl.markAsDirty();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtd2l0aC1jaG9pY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvZmllbGQtd2l0aC1jaG9pY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUtILE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUtuRDs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFnQiw0QkFBZ0MsU0FBUSxxQkFFN0Q7SUFHQzs7Ozs7T0FLRztJQUNILElBQUksZUFBZTtRQUNqQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztJQUMvQixDQUFDO0lBRUQsWUFDRSxHQUFzQixFQUN0QixPQUErQixFQUMvQixtQkFBMkMsRUFDM0MsZUFBdUI7UUFFdkIsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQWxCbkMscUJBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBbUJuQyxJQUFJLGVBQWUsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO1FBQzFDLENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFFBQVEsQ0FBQyxJQUFxQjtRQUM1QixNQUFNLEtBQUssR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDL0MsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFLEVBQUUsQ0FBQztZQUNsQyxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDeEQsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxVQUFVLENBQUMsSUFBcUIsRUFBRSxLQUFhO1FBQzdDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2xCLHdFQUF3RTtZQUN4RSxLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHtBamZCYXNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFzZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbi8qKlxuICogSXQgcmFwcHJlc2VudHMgdGhlIGJhc2UgY29tcG9uZXQgZm9yIGV2ZXJ5IGFqZiBmaWVsZHMgd2l0aCBjaG9pY2hlcy5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzcyBBamZGaWVsZFdpdGhDaG9pY2VzQ29tcG9uZW50XG4gKiBAdGVtcGxhdGUgVFxuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmRmllbGRXaXRoQ2hvaWNlc0NvbXBvbmVudDxUPiBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPFQ+XG4+IHtcbiAgcHJpdmF0ZSBfc2VhcmNoVGhyZXNob2xkOiBudW1iZXIgPSA2O1xuXG4gIC8qKlxuICAgKiBJdCByZXByZXNlbnRzIHRoZSB0aHJlc2hvbGQgYmVsb3cgd2hpY2ggdGhlIGNob2ljZXMgYXJlIGRpc3BsYXllZFxuICAgKiBpbiBleHBhbmRlZCBtb2RlLlxuICAgKlxuICAgKiBAcmVhZG9ubHlcbiAgICovXG4gIGdldCBzZWFyY2hUaHJlc2hvbGQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fc2VhcmNoVGhyZXNob2xkO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIHdhcm5pbmdBbGVydFNlcnZpY2U6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICAgc2VhcmNoVGhyZXNob2xkOiBudW1iZXIsXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FybmluZ0FsZXJ0U2VydmljZSk7XG4gICAgaWYgKHNlYXJjaFRocmVzaG9sZCAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zZWFyY2hUaHJlc2hvbGQgPSBzZWFyY2hUaHJlc2hvbGQ7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgdGhlIGZpZWxkIGhvbGRzIGEgc2VsZWN0aW9uLCB3aGljaCBpcyB3aGF0IHRoZSBjbGVhciBhY3Rpb24gaXNcbiAgICogb2ZmZXJlZCBmb3IuIEEgbXVsdGlwbGUgY2hvaWNlIHZhbHVlIGlzIGFuIGFycmF5IGFuZCBhIHNpbmdsZSBjaG9pY2UgdmFsdWUgYVxuICAgKiBzY2FsYXIsIGFuZCBhbiBlbXB0eSBhcnJheSBpcyBhcyBlbXB0eSBhcyBhIG51bGwuXG4gICAqL1xuICBoYXNWYWx1ZShjdHJsOiBBYnN0cmFjdENvbnRyb2wpOiBib29sZWFuIHtcbiAgICBjb25zdCB2YWx1ZSA9IGN0cmwgIT0gbnVsbCA/IGN0cmwudmFsdWUgOiBudWxsO1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZS5sZW5ndGggPiAwIDogdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldCB0aGUgZmllbGQgdG8gbm8gc2VsZWN0aW9uLiBOZWl0aGVyIHByZXNlbnRhdGlvbiBjYW4gZG8gdGhpcyBvbiBpdHMgb3duOlxuICAgKiBhIHJhZGlvIGNhbm5vdCBiZSB1bnBpY2tlZCwgYW5kIGNsZWFyaW5nIGEgbXVsdGktc2VsZWN0IG9uZSBjaGlwIGF0IGEgdGltZSBpc1xuICAgKiB0ZWRpb3VzLlxuICAgKi9cbiAgY2xlYXJWYWx1ZShjdHJsOiBBYnN0cmFjdENvbnRyb2wsIGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQgIT0gbnVsbCkge1xuICAgICAgLy8gU3RvcCB0aGUgY2xpY2sgcmVhY2hpbmcgYSBzZWxlY3QgdHJpZ2dlciwgd2hpY2ggd291bGQgb3BlbiB0aGUgcGFuZWwuXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGN0cmwuc2V0VmFsdWUobnVsbCk7XG4gICAgY3RybC5tYXJrQXNEaXJ0eSgpO1xuICB9XG59XG4iXX0=