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
import { Inject, Optional, Pipe } from '@angular/core';
import { AjfFieldType } from './interface/fields/field-type';
import { AJF_SEARCH_ALERT_THRESHOLD } from './search-alert-threshold';
import * as i0 from "@angular/core";
const NAMES = {
    [AjfFieldType.String]: 'text',
    [AjfFieldType.Text]: 'formatted text',
    [AjfFieldType.Number]: 'number',
    [AjfFieldType.Boolean]: 'yes/no',
    [AjfFieldType.SingleChoice]: 'single choice',
    [AjfFieldType.MultipleChoice]: 'multiple choice',
    [AjfFieldType.Formula]: 'calculated',
    [AjfFieldType.Empty]: 'note',
    [AjfFieldType.DateRange]: 'date range',
    [AjfFieldType.DateInput]: 'date',
    [AjfFieldType.Range]: 'range',
    [AjfFieldType.Time]: 'time',
    [AjfFieldType.Table]: 'table',
    [AjfFieldType.Geolocation]: 'position',
    [AjfFieldType.Barcode]: 'barcode',
    [AjfFieldType.File]: 'attachment',
    [AjfFieldType.Image]: 'image',
    [AjfFieldType.VideoUrl]: 'video',
    [AjfFieldType.Signature]: 'signature',
    [AjfFieldType.Audio]: 'audio',
};
const DEFAULT_SEARCH_THRESHOLD = 6;
/**
 * The digit bound of a validation, whether it was given as a plain number or
 * built by `maxDigitsValidation` / `minDigitsValidation`, whose conditions read
 * `$value ? $value.toString().length <= 16 : false`.
 */
const digitBound = (validation) => {
    if (validation == null) {
        return null;
    }
    if (typeof validation === 'number') {
        return validation;
    }
    const match = /length\s*[<>]=\s*(\d+)/.exec(validation.condition || '');
    return match != null ? parseInt(match[1], 10) : null;
};
/** The bound of a min/max value validation, when it was given as a plain number. */
const valueBound = (validation) => typeof validation === 'number' ? validation : null;
/** `16` for a single bound or two that agree, `8–16` for two that differ. */
const digits = (min, max) => {
    if (min != null && max != null) {
        return min === max ? String(max) : `${min}–${max}`;
    }
    const only = max != null ? max : min;
    return only != null ? String(only) : undefined;
};
/**
 * Resolve the type line of a field row.
 *
 * Takes the instance rather than the node because two of the names depend on how
 * the field actually ends up rendering: a choice field reads as `choice with
 * search` once its choices outgrow the search threshold, and a range field with
 * the `rating` appearance is a different thing from a slider.
 */
export class AjfFieldTypeLabelPipe {
    constructor(searchThreshold) {
        this._searchThreshold = searchThreshold != null ? searchThreshold : DEFAULT_SEARCH_THRESHOLD;
    }
    transform(instance) {
        const node = instance?.node;
        if (node == null) {
            return { name: 'field' };
        }
        return { name: this._name(instance), ...this._detail(node.validation) };
    }
    _name(instance) {
        const node = instance.node;
        switch (node.fieldType) {
            case AjfFieldType.Range:
                return node.appearance === 'rating' ? 'rating' : 'range';
            case AjfFieldType.SingleChoice:
                return this._isNarrow(instance) ? 'choice with search' : 'single choice';
            case AjfFieldType.MultipleChoice:
                return this._isNarrow(instance) ? 'multiple choice with search' : 'multiple choice';
            default:
                return NAMES[node.fieldType] || 'field';
        }
    }
    /**
     * Whether the choices collapse into a searchable dropdown. Kept in step with
     * the `isNarrow` getter of the choice field components, `forceExpanded`
     * included, so the label never contradicts the control below it.
     */
    _isNarrow(instance) {
        const node = instance.node;
        if (node.forceExpanded) {
            return false;
        }
        const choices = instance.filteredChoices;
        return Boolean(node.forceNarrow) || (choices || []).length > this._searchThreshold;
    }
    _detail(validation) {
        if (validation == null) {
            return {};
        }
        const length = digits(digitBound(validation.minDigits), digitBound(validation.maxDigits));
        if (length != null) {
            return { detailValue: length, detailUnit: 'characters' };
        }
        // A lone bound would print a bare number with nothing to tell the reader
        // which end of the range it is, so only a closed interval is worth showing.
        const min = valueBound(validation.minValue);
        const max = valueBound(validation.maxValue);
        return min != null && max != null ? { detailValue: `${min}–${max}` } : {};
    }
    static { this.ɵfac = function AjfFieldTypeLabelPipe_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFieldTypeLabelPipe)(i0.ɵɵdirectiveInject(AJF_SEARCH_ALERT_THRESHOLD, 24)); }; }
    static { this.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "ajfFieldTypeLabel", type: AjfFieldTypeLabelPipe, pure: true }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFieldTypeLabelPipe, [{
        type: Pipe,
        args: [{ name: 'ajfFieldTypeLabel' }]
    }], () => [{ type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [AJF_SEARCH_ALERT_THRESHOLD]
            }] }], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtdHlwZS1sYWJlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2ZpZWxkLXR5cGUtbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUlwRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFLM0QsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7O0FBa0JwRSxNQUFNLEtBQUssR0FBNEI7SUFDckMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTTtJQUM3QixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxnQkFBZ0I7SUFDckMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUTtJQUMvQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRSxRQUFRO0lBQ2hDLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxFQUFFLGVBQWU7SUFDNUMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsaUJBQWlCO0lBQ2hELENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLFlBQVk7SUFDcEMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTTtJQUM1QixDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsRUFBRSxZQUFZO0lBQ3RDLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU07SUFDaEMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTztJQUM3QixDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNO0lBQzNCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU87SUFDN0IsQ0FB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QUFTLENBQUMsQ0FBQyxDQUFDO1FBQzFGLElBQUksTUFBTSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ25CLE9BQU8sRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQ0QseUVBQXlFO1FBQ3pFLDRFQUE0RTtRQUM1RSxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDNUMsT0FBTyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsV0FBVyxFQUFFLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUMxRSxDQUFDO3NIQTFEVSxxQkFBcUIsdUJBSVYsMEJBQTBCOzJGQUpyQyxxQkFBcUI7O2lGQUFyQixxQkFBcUI7Y0FEakMsSUFBSTtlQUFDLEVBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFDOztzQkFLNUIsUUFBUTs7c0JBQUksTUFBTTt1QkFBQywwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SW5qZWN0LCBPcHRpb25hbCwgUGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge0FqZlJhbmdlRmllbGR9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9yYW5nZS1maWVsZCc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb259IGZyb20gJy4vaW50ZXJmYWNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbic7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25Hcm91cH0gZnJvbSAnLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi92YWxpZGF0aW9uLWdyb3VwJztcbmltcG9ydCB7QUpGX1NFQVJDSF9BTEVSVF9USFJFU0hPTER9IGZyb20gJy4vc2VhcmNoLWFsZXJ0LXRocmVzaG9sZCc7XG5cbi8qKlxuICogV2hhdCBhIGZpZWxkIHJvdyBwcmludHMgdW5kZXIgaXRzIGxhYmVsOiB0aGUga2luZCBvZiBmaWVsZCBpdCBpcywgaW4gd29yZHMsXG4gKiBwbHVzIHRoZSBjb25zdHJhaW50IHRoZSBzY2hlbWEgcHV0cyBvbiBpdC5cbiAqXG4gKiBgbmFtZWAgYW5kIGBkZXRhaWxVbml0YCBhcmUgdHJhbnNsYXRpb24ga2V5cywgd2hpbGUgYGRldGFpbFZhbHVlYCBjYXJyaWVzIHRoZVxuICogbnVtYmVycywgd2hpY2ggcmVhZCB0aGUgc2FtZSBpbiBldmVyeSBsYW5ndWFnZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBamZGaWVsZFR5cGVMYWJlbCB7XG4gIC8qKiBUcmFuc2xhdGlvbiBrZXkgZm9yIHRoZSB0eXBlIG5hbWUsIGUuZy4gYHRleHRgLCBgc2luZ2xlIGNob2ljZWAuICovXG4gIG5hbWU6IHN0cmluZztcbiAgLyoqIFRoZSBjb25zdHJhaW50J3MgbnVtYmVycywgZS5nLiBgMTZgIG9yIGAw4oCTMTAwYC4gKi9cbiAgZGV0YWlsVmFsdWU/OiBzdHJpbmc7XG4gIC8qKiBUcmFuc2xhdGlvbiBrZXkgZm9yIHRoZSBjb25zdHJhaW50J3MgdW5pdCwgZS5nLiBgY2hhcmFjdGVyc2AuICovXG4gIGRldGFpbFVuaXQ/OiBzdHJpbmc7XG59XG5cbmNvbnN0IE5BTUVTOiB7W2tleTogbnVtYmVyXTogc3RyaW5nfSA9IHtcbiAgW0FqZkZpZWxkVHlwZS5TdHJpbmddOiAndGV4dCcsXG4gIFtBamZGaWVsZFR5cGUuVGV4dF06ICdmb3JtYXR0ZWQgdGV4dCcsXG4gIFtBamZGaWVsZFR5cGUuTnVtYmVyXTogJ251bWJlcicsXG4gIFtBamZGaWVsZFR5cGUuQm9vbGVhbl06ICd5ZXMvbm8nLFxuICBbQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZV06ICdzaW5nbGUgY2hvaWNlJyxcbiAgW0FqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZV06ICdtdWx0aXBsZSBjaG9pY2UnLFxuICBbQWpmRmllbGRUeXBlLkZvcm11bGFdOiAnY2FsY3VsYXRlZCcsXG4gIFtBamZGaWVsZFR5cGUuRW1wdHldOiAnbm90ZScsXG4gIFtBamZGaWVsZFR5cGUuRGF0ZVJhbmdlXTogJ2RhdGUgcmFuZ2UnLFxuICBbQWpmRmllbGRUeXBlLkRhdGVJbnB1dF06ICdkYXRlJyxcbiAgW0FqZkZpZWxkVHlwZS5SYW5nZV06ICdyYW5nZScsXG4gIFtBamZGaWVsZFR5cGUuVGltZV06ICd0aW1lJyxcbiAgW0FqZkZpZWxkVHlwZS5UYWJsZV06ICd0YWJsZScsXG4gIFtBamZGaWVsZFR5cGUuR2VvbG9jYXRpb25dOiAncG9zaXRpb24nLFxuICBbQWpmRmllbGRUeXBlLkJhcmNvZGVdOiAnYmFyY29kZScsXG4gIFtBamZGaWVsZFR5cGUuRmlsZV06ICdhdHRhY2htZW50JyxcbiAgW0FqZkZpZWxkVHlwZS5JbWFnZV06ICdpbWFnZScsXG4gIFtBamZGaWVsZFR5cGUuVmlkZW9VcmxdOiAndmlkZW8nLFxuICBbQWpmRmllbGRUeXBlLlNpZ25hdHVyZV06ICdzaWduYXR1cmUnLFxuICBbQWpmRmllbGRUeXBlLkF1ZGlvXTogJ2F1ZGlvJyxcbn07XG5cbmNvbnN0IERFRkFVTFRfU0VBUkNIX1RIUkVTSE9MRCA9IDY7XG5cbi8qKlxuICogVGhlIGRpZ2l0IGJvdW5kIG9mIGEgdmFsaWRhdGlvbiwgd2hldGhlciBpdCB3YXMgZ2l2ZW4gYXMgYSBwbGFpbiBudW1iZXIgb3JcbiAqIGJ1aWx0IGJ5IGBtYXhEaWdpdHNWYWxpZGF0aW9uYCAvIGBtaW5EaWdpdHNWYWxpZGF0aW9uYCwgd2hvc2UgY29uZGl0aW9ucyByZWFkXG4gKiBgJHZhbHVlID8gJHZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDw9IDE2IDogZmFsc2VgLlxuICovXG5jb25zdCBkaWdpdEJvdW5kID0gKHZhbGlkYXRpb246IEFqZlZhbGlkYXRpb24gfCBudW1iZXIgfCB1bmRlZmluZWQpOiBudW1iZXIgfCBudWxsID0+IHtcbiAgaWYgKHZhbGlkYXRpb24gPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsaWRhdGlvbiA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsaWRhdGlvbjtcbiAgfVxuICBjb25zdCBtYXRjaCA9IC9sZW5ndGhcXHMqWzw+XT1cXHMqKFxcZCspLy5leGVjKHZhbGlkYXRpb24uY29uZGl0aW9uIHx8ICcnKTtcbiAgcmV0dXJuIG1hdGNoICE9IG51bGwgPyBwYXJzZUludChtYXRjaFsxXSwgMTApIDogbnVsbDtcbn07XG5cbi8qKiBUaGUgYm91bmQgb2YgYSBtaW4vbWF4IHZhbHVlIHZhbGlkYXRpb24sIHdoZW4gaXQgd2FzIGdpdmVuIGFzIGEgcGxhaW4gbnVtYmVyLiAqL1xuY29uc3QgdmFsdWVCb3VuZCA9ICh2YWxpZGF0aW9uOiBBamZWYWxpZGF0aW9uIHwgbnVtYmVyIHwgdW5kZWZpbmVkKTogbnVtYmVyIHwgbnVsbCA9PlxuICB0eXBlb2YgdmFsaWRhdGlvbiA9PT0gJ251bWJlcicgPyB2YWxpZGF0aW9uIDogbnVsbDtcblxuLyoqIGAxNmAgZm9yIGEgc2luZ2xlIGJvdW5kIG9yIHR3byB0aGF0IGFncmVlLCBgOOKAkzE2YCBmb3IgdHdvIHRoYXQgZGlmZmVyLiAqL1xuY29uc3QgZGlnaXRzID0gKG1pbjogbnVtYmVyIHwgbnVsbCwgbWF4OiBudW1iZXIgfCBudWxsKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgaWYgKG1pbiAhPSBudWxsICYmIG1heCAhPSBudWxsKSB7XG4gICAgcmV0dXJuIG1pbiA9PT0gbWF4ID8gU3RyaW5nKG1heCkgOiBgJHttaW594oCTJHttYXh9YDtcbiAgfVxuICBjb25zdCBvbmx5ID0gbWF4ICE9IG51bGwgPyBtYXggOiBtaW47XG4gIHJldHVybiBvbmx5ICE9IG51bGwgPyBTdHJpbmcob25seSkgOiB1bmRlZmluZWQ7XG59O1xuXG4vKipcbiAqIFJlc29sdmUgdGhlIHR5cGUgbGluZSBvZiBhIGZpZWxkIHJvdy5cbiAqXG4gKiBUYWtlcyB0aGUgaW5zdGFuY2UgcmF0aGVyIHRoYW4gdGhlIG5vZGUgYmVjYXVzZSB0d28gb2YgdGhlIG5hbWVzIGRlcGVuZCBvbiBob3dcbiAqIHRoZSBmaWVsZCBhY3R1YWxseSBlbmRzIHVwIHJlbmRlcmluZzogYSBjaG9pY2UgZmllbGQgcmVhZHMgYXMgYGNob2ljZSB3aXRoXG4gKiBzZWFyY2hgIG9uY2UgaXRzIGNob2ljZXMgb3V0Z3JvdyB0aGUgc2VhcmNoIHRocmVzaG9sZCwgYW5kIGEgcmFuZ2UgZmllbGQgd2l0aFxuICogdGhlIGByYXRpbmdgIGFwcGVhcmFuY2UgaXMgYSBkaWZmZXJlbnQgdGhpbmcgZnJvbSBhIHNsaWRlci5cbiAqL1xuQFBpcGUoe25hbWU6ICdhamZGaWVsZFR5cGVMYWJlbCd9KVxuZXhwb3J0IGNsYXNzIEFqZkZpZWxkVHlwZUxhYmVsUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICBwcml2YXRlIHJlYWRvbmx5IF9zZWFyY2hUaHJlc2hvbGQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KEFKRl9TRUFSQ0hfQUxFUlRfVEhSRVNIT0xEKSBzZWFyY2hUaHJlc2hvbGQ6IG51bWJlcixcbiAgKSB7XG4gICAgdGhpcy5fc2VhcmNoVGhyZXNob2xkID0gc2VhcmNoVGhyZXNob2xkICE9IG51bGwgPyBzZWFyY2hUaHJlc2hvbGQgOiBERUZBVUxUX1NFQVJDSF9USFJFU0hPTEQ7XG4gIH1cblxuICB0cmFuc2Zvcm0oaW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpOiBBamZGaWVsZFR5cGVMYWJlbCB7XG4gICAgY29uc3Qgbm9kZSA9IGluc3RhbmNlPy5ub2RlO1xuICAgIGlmIChub2RlID09IG51bGwpIHtcbiAgICAgIHJldHVybiB7bmFtZTogJ2ZpZWxkJ307XG4gICAgfVxuICAgIHJldHVybiB7bmFtZTogdGhpcy5fbmFtZShpbnN0YW5jZSksIC4uLnRoaXMuX2RldGFpbChub2RlLnZhbGlkYXRpb24pfTtcbiAgfVxuXG4gIHByaXZhdGUgX25hbWUoaW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpOiBzdHJpbmcge1xuICAgIGNvbnN0IG5vZGUgPSBpbnN0YW5jZS5ub2RlO1xuICAgIHN3aXRjaCAobm9kZS5maWVsZFR5cGUpIHtcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlJhbmdlOlxuICAgICAgICByZXR1cm4gKG5vZGUgYXMgQWpmUmFuZ2VGaWVsZCkuYXBwZWFyYW5jZSA9PT0gJ3JhdGluZycgPyAncmF0aW5nJyA6ICdyYW5nZSc7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2U6XG4gICAgICAgIHJldHVybiB0aGlzLl9pc05hcnJvdyhpbnN0YW5jZSkgPyAnY2hvaWNlIHdpdGggc2VhcmNoJyA6ICdzaW5nbGUgY2hvaWNlJztcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgICByZXR1cm4gdGhpcy5faXNOYXJyb3coaW5zdGFuY2UpID8gJ211bHRpcGxlIGNob2ljZSB3aXRoIHNlYXJjaCcgOiAnbXVsdGlwbGUgY2hvaWNlJztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBOQU1FU1tub2RlLmZpZWxkVHlwZV0gfHwgJ2ZpZWxkJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogV2hldGhlciB0aGUgY2hvaWNlcyBjb2xsYXBzZSBpbnRvIGEgc2VhcmNoYWJsZSBkcm9wZG93bi4gS2VwdCBpbiBzdGVwIHdpdGhcbiAgICogdGhlIGBpc05hcnJvd2AgZ2V0dGVyIG9mIHRoZSBjaG9pY2UgZmllbGQgY29tcG9uZW50cywgYGZvcmNlRXhwYW5kZWRgXG4gICAqIGluY2x1ZGVkLCBzbyB0aGUgbGFiZWwgbmV2ZXIgY29udHJhZGljdHMgdGhlIGNvbnRyb2wgYmVsb3cgaXQuXG4gICAqL1xuICBwcml2YXRlIF9pc05hcnJvdyhpbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5vZGUgPSBpbnN0YW5jZS5ub2RlIGFzIEFqZkZpZWxkV2l0aENob2ljZXM8dW5rbm93bj47XG4gICAgaWYgKG5vZGUuZm9yY2VFeHBhbmRlZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBjaG9pY2VzID0gKGluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTx1bmtub3duPikuZmlsdGVyZWRDaG9pY2VzO1xuICAgIHJldHVybiBCb29sZWFuKG5vZGUuZm9yY2VOYXJyb3cpIHx8IChjaG9pY2VzIHx8IFtdKS5sZW5ndGggPiB0aGlzLl9zZWFyY2hUaHJlc2hvbGQ7XG4gIH1cblxuICBwcml2YXRlIF9kZXRhaWwodmFsaWRhdGlvbjogQWpmVmFsaWRhdGlvbkdyb3VwIHwgdW5kZWZpbmVkKTogUGFydGlhbDxBamZGaWVsZFR5cGVMYWJlbD4ge1xuICAgIGlmICh2YWxpZGF0aW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgY29uc3QgbGVuZ3RoID0gZGlnaXRzKGRpZ2l0Qm91bmQodmFsaWRhdGlvbi5taW5EaWdpdHMpLCBkaWdpdEJvdW5kKHZhbGlkYXRpb24ubWF4RGlnaXRzKSk7XG4gICAgaWYgKGxlbmd0aCAhPSBudWxsKSB7XG4gICAgICByZXR1cm4ge2RldGFpbFZhbHVlOiBsZW5ndGgsIGRldGFpbFVuaXQ6ICdjaGFyYWN0ZXJzJ307XG4gICAgfVxuICAgIC8vIEEgbG9uZSBib3VuZCB3b3VsZCBwcmludCBhIGJhcmUgbnVtYmVyIHdpdGggbm90aGluZyB0byB0ZWxsIHRoZSByZWFkZXJcbiAgICAvLyB3aGljaCBlbmQgb2YgdGhlIHJhbmdlIGl0IGlzLCBzbyBvbmx5IGEgY2xvc2VkIGludGVydmFsIGlzIHdvcnRoIHNob3dpbmcuXG4gICAgY29uc3QgbWluID0gdmFsdWVCb3VuZCh2YWxpZGF0aW9uLm1pblZhbHVlKTtcbiAgICBjb25zdCBtYXggPSB2YWx1ZUJvdW5kKHZhbGlkYXRpb24ubWF4VmFsdWUpO1xuICAgIHJldHVybiBtaW4gIT0gbnVsbCAmJiBtYXggIT0gbnVsbCA/IHtkZXRhaWxWYWx1ZTogYCR7bWlufeKAkyR7bWF4fWB9IDoge307XG4gIH1cbn1cbiJdfQ==