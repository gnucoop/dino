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
import { buildStringIdentifier, buildStringIdentifierOpts, } from '@ajf/core/common';
import { isFieldWithChoices } from '../fields/is-field-with-choices';
import { isMultipleChoiceField } from '../fields/is-multiple-choice-field';
import { isSingleChoiceField } from '../fields/is-single-choice-field';
import { flattenNodes } from '../nodes/flatten-nodes';
import { isField } from '../nodes/is-field';
/**
 * It builds a string that contains information preview about the form and its context.
 */
export const buildFormStringIdentifier = (form, context, opts) => {
    if (form == null) {
        return '';
    }
    const stringIdentifier = form.stringIdentifier || [];
    if (stringIdentifier.length === 0) {
        return '';
    }
    const fields = flattenNodes(form.nodes).filter(n => isField(n) && isFieldWithChoices(n));
    if (fields.length > 0) {
        context = { ...context };
        fields.forEach(field => {
            const value = context[field.name];
            if (value == null) {
                return;
            }
            if (isSingleChoiceField(field)) {
                const choice = field.choicesOrigin.choices.find(c => c.value === value);
                if (choice == null) {
                    return;
                }
                context[field.name] = choice.label;
            }
            else if (isMultipleChoiceField(field) && Array.isArray(value) && value.length > 0) {
                const strings = buildStringIdentifierOpts(opts);
                const choices = field.choicesOrigin.choices.filter(c => value.indexOf(c.value) > -1);
                context[field.name] = choices.map(c => c.label).join(strings.valuesDivider);
            }
        });
    }
    return buildStringIdentifier(stringIdentifier, context, opts);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtZm9ybS1zdHJpbmctaWRlbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL3V0aWxzL2Zvcm1zL2J1aWxkLWZvcm0tc3RyaW5nLWlkZW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUVMLHFCQUFxQixFQUNyQix5QkFBeUIsR0FFMUIsTUFBTSxrQkFBa0IsQ0FBQztBQUkxQixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTFDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsQ0FDdkMsSUFBYSxFQUNiLE9BQW1CLEVBQ25CLElBQWdDLEVBQ3hCLEVBQUU7SUFDVixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNqQixPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFDRCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7SUFDckQsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLENBQUM7UUFDbEMsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0QsTUFBTSxNQUFNLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQzVDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUNQLENBQUM7SUFDcEMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1FBQ3RCLE9BQU8sR0FBRyxFQUFDLEdBQUcsT0FBTyxFQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUNsQixPQUFPO1lBQ1QsQ0FBQztZQUNELElBQUksbUJBQW1CLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztnQkFDL0IsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQztnQkFDeEUsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ25CLE9BQU87Z0JBQ1QsQ0FBQztnQkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7WUFDckMsQ0FBQztpQkFBTSxJQUFJLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDcEYsTUFBTSxPQUFPLEdBQUcseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JGLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzlFLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxPQUFPLHFCQUFxQixDQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNoRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkNvbnRleHQsXG4gIGJ1aWxkU3RyaW5nSWRlbnRpZmllcixcbiAgYnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cyxcbiAgQnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cyxcbn0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5cbmltcG9ydCB7QWpmRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZm9ybXMvZm9ybSc7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi4vZmllbGRzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge2lzTXVsdGlwbGVDaG9pY2VGaWVsZH0gZnJvbSAnLi4vZmllbGRzL2lzLW11bHRpcGxlLWNob2ljZS1maWVsZCc7XG5pbXBvcnQge2lzU2luZ2xlQ2hvaWNlRmllbGR9IGZyb20gJy4uL2ZpZWxkcy9pcy1zaW5nbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzfSBmcm9tICcuLi9ub2Rlcy9mbGF0dGVuLW5vZGVzJztcbmltcG9ydCB7aXNGaWVsZH0gZnJvbSAnLi4vbm9kZXMvaXMtZmllbGQnO1xuXG4vKipcbiAqIEl0IGJ1aWxkcyBhIHN0cmluZyB0aGF0IGNvbnRhaW5zIGluZm9ybWF0aW9uIHByZXZpZXcgYWJvdXQgdGhlIGZvcm0gYW5kIGl0cyBjb250ZXh0LlxuICovXG5leHBvcnQgY29uc3QgYnVpbGRGb3JtU3RyaW5nSWRlbnRpZmllciA9IChcbiAgZm9ybTogQWpmRm9ybSxcbiAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgb3B0cz86IEJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHMsXG4pOiBzdHJpbmcgPT4ge1xuICBpZiAoZm9ybSA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGNvbnN0IHN0cmluZ0lkZW50aWZpZXIgPSBmb3JtLnN0cmluZ0lkZW50aWZpZXIgfHwgW107XG4gIGlmIChzdHJpbmdJZGVudGlmaWVyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBjb25zdCBmaWVsZHMgPSBmbGF0dGVuTm9kZXMoZm9ybS5ub2RlcykuZmlsdGVyKFxuICAgIG4gPT4gaXNGaWVsZChuKSAmJiBpc0ZpZWxkV2l0aENob2ljZXMobiksXG4gICkgYXMgQWpmRmllbGRXaXRoQ2hvaWNlczx1bmtub3duPltdO1xuICBpZiAoZmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICBjb250ZXh0ID0gey4uLmNvbnRleHR9O1xuICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY29udGV4dFtmaWVsZC5uYW1lXTtcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChpc1NpbmdsZUNob2ljZUZpZWxkKGZpZWxkKSkge1xuICAgICAgICBjb25zdCBjaG9pY2UgPSBmaWVsZC5jaG9pY2VzT3JpZ2luLmNob2ljZXMuZmluZChjID0+IGMudmFsdWUgPT09IHZhbHVlKTtcbiAgICAgICAgaWYgKGNob2ljZSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHRbZmllbGQubmFtZV0gPSBjaG9pY2UubGFiZWw7XG4gICAgICB9IGVsc2UgaWYgKGlzTXVsdGlwbGVDaG9pY2VGaWVsZChmaWVsZCkgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBzdHJpbmdzID0gYnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cyhvcHRzKTtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IGZpZWxkLmNob2ljZXNPcmlnaW4uY2hvaWNlcy5maWx0ZXIoYyA9PiB2YWx1ZS5pbmRleE9mKGMudmFsdWUpID4gLTEpO1xuICAgICAgICBjb250ZXh0W2ZpZWxkLm5hbWVdID0gY2hvaWNlcy5tYXAoYyA9PiBjLmxhYmVsKS5qb2luKHN0cmluZ3MudmFsdWVzRGl2aWRlcik7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGJ1aWxkU3RyaW5nSWRlbnRpZmllcihzdHJpbmdJZGVudGlmaWVyLCBjb250ZXh0LCBvcHRzKTtcbn07XG4iXX0=