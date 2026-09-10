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
 * Update the relative instance value and the context, only if it's visible.
 * if it's a formula field evaluate expression.
 * Flag changed to true if value is changed
 * @param instance
 * @param context
 * @param updateDefault if true, if it has a default value and current value is null,
 * initialize field with the evaluated default value. It doesn't currently know the visibility
 * of the container node, so it only re-set the default value when the node becomes
 * visible again with updateVisibilityMapEntry.
 * @returns The updated instance value and the changed flag
 */
export function updateFormula(instance, context, updateDefault) {
    const formula = instance.formula;
    const editable = instance.node.editable;
    let newValue = null;
    let changed = false;
    if (instance.visible) {
        if (formula != null && (!editable || (editable && instance.value == null))) {
            newValue = evaluateExpression(formula.formula, context);
            if (Number.isNaN(newValue)) {
                newValue = null;
            }
            changed = true;
        }
        else if (updateDefault && instance.node.defaultValue != null && instance.value == null) {
            changed = true;
            if (instance.node.defaultValue.formula != null) {
                newValue = evaluateExpression(instance.node.defaultValue.formula, context);
                if (Number.isNaN(newValue)) {
                    newValue = null;
                }
            }
            else {
                newValue = instance.node.defaultValue;
            }
        }
        if (changed && newValue !== instance.value) {
            instance.value = newValue;
            context['$value'] = instance.value;
            return { changed: true, value: newValue };
        }
    }
    return { changed: false, value: instance.value };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWZvcm11bGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1mb3JtdWxhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBYSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBSWhFOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsTUFBTSxVQUFVLGFBQWEsQ0FDM0IsUUFBMEIsRUFDMUIsT0FBbUIsRUFDbkIsYUFBdUI7SUFFdkIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUNqQyxNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN4QyxJQUFJLFFBQVEsR0FBUSxJQUFJLENBQUM7SUFDekIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3BCLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3JCLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzNFLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ3hELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO2dCQUMzQixRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ2xCLENBQUM7WUFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLENBQUM7YUFBTSxJQUFJLGFBQWEsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN6RixPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ2YsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQy9DLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzNFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO29CQUMzQixRQUFRLEdBQUcsSUFBSSxDQUFDO2dCQUNsQixDQUFDO1lBQ0gsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztZQUN4QyxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUksT0FBTyxJQUFJLFFBQVEsS0FBSyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDM0MsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUM7WUFDMUIsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDbkMsT0FBTyxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBQyxDQUFDO1FBQzFDLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQUMsQ0FBQztBQUNqRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgcmVsYXRpdmUgaW5zdGFuY2UgdmFsdWUgYW5kIHRoZSBjb250ZXh0LCBvbmx5IGlmIGl0J3MgdmlzaWJsZS5cbiAqIGlmIGl0J3MgYSBmb3JtdWxhIGZpZWxkIGV2YWx1YXRlIGV4cHJlc3Npb24uXG4gKiBGbGFnIGNoYW5nZWQgdG8gdHJ1ZSBpZiB2YWx1ZSBpcyBjaGFuZ2VkXG4gKiBAcGFyYW0gaW5zdGFuY2VcbiAqIEBwYXJhbSBjb250ZXh0XG4gKiBAcGFyYW0gdXBkYXRlRGVmYXVsdCBpZiB0cnVlLCBpZiBpdCBoYXMgYSBkZWZhdWx0IHZhbHVlIGFuZCBjdXJyZW50IHZhbHVlIGlzIG51bGwsXG4gKiBpbml0aWFsaXplIGZpZWxkIHdpdGggdGhlIGV2YWx1YXRlZCBkZWZhdWx0IHZhbHVlLiBJdCBkb2Vzbid0IGN1cnJlbnRseSBrbm93IHRoZSB2aXNpYmlsaXR5XG4gKiBvZiB0aGUgY29udGFpbmVyIG5vZGUsIHNvIGl0IG9ubHkgcmUtc2V0IHRoZSBkZWZhdWx0IHZhbHVlIHdoZW4gdGhlIG5vZGUgYmVjb21lc1xuICogdmlzaWJsZSBhZ2FpbiB3aXRoIHVwZGF0ZVZpc2liaWxpdHlNYXBFbnRyeS5cbiAqIEByZXR1cm5zIFRoZSB1cGRhdGVkIGluc3RhbmNlIHZhbHVlIGFuZCB0aGUgY2hhbmdlZCBmbGFnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVGb3JtdWxhKFxuICBpbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSxcbiAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgdXBkYXRlRGVmYXVsdD86IGJvb2xlYW4sXG4pOiB7Y2hhbmdlZDogYm9vbGVhbjsgdmFsdWU6IGFueX0ge1xuICBjb25zdCBmb3JtdWxhID0gaW5zdGFuY2UuZm9ybXVsYTtcbiAgY29uc3QgZWRpdGFibGUgPSBpbnN0YW5jZS5ub2RlLmVkaXRhYmxlO1xuICBsZXQgbmV3VmFsdWU6IGFueSA9IG51bGw7XG4gIGxldCBjaGFuZ2VkID0gZmFsc2U7XG4gIGlmIChpbnN0YW5jZS52aXNpYmxlKSB7XG4gICAgaWYgKGZvcm11bGEgIT0gbnVsbCAmJiAoIWVkaXRhYmxlIHx8IChlZGl0YWJsZSAmJiBpbnN0YW5jZS52YWx1ZSA9PSBudWxsKSkpIHtcbiAgICAgIG5ld1ZhbHVlID0gZXZhbHVhdGVFeHByZXNzaW9uKGZvcm11bGEuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgICBpZiAoTnVtYmVyLmlzTmFOKG5ld1ZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IG51bGw7XG4gICAgICB9XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHVwZGF0ZURlZmF1bHQgJiYgaW5zdGFuY2Uubm9kZS5kZWZhdWx0VmFsdWUgIT0gbnVsbCAmJiBpbnN0YW5jZS52YWx1ZSA9PSBudWxsKSB7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlLmRlZmF1bHRWYWx1ZS5mb3JtdWxhICE9IG51bGwpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBldmFsdWF0ZUV4cHJlc3Npb24oaW5zdGFuY2Uubm9kZS5kZWZhdWx0VmFsdWUuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgICAgIGlmIChOdW1iZXIuaXNOYU4obmV3VmFsdWUpKSB7XG4gICAgICAgICAgbmV3VmFsdWUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IGluc3RhbmNlLm5vZGUuZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlZCAmJiBuZXdWYWx1ZSAhPT0gaW5zdGFuY2UudmFsdWUpIHtcbiAgICAgIGluc3RhbmNlLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICBjb250ZXh0WyckdmFsdWUnXSA9IGluc3RhbmNlLnZhbHVlO1xuICAgICAgcmV0dXJuIHtjaGFuZ2VkOiB0cnVlLCB2YWx1ZTogbmV3VmFsdWV9O1xuICAgIH1cbiAgfVxuICByZXR1cm4ge2NoYW5nZWQ6IGZhbHNlLCB2YWx1ZTogaW5zdGFuY2UudmFsdWV9O1xufVxuIl19