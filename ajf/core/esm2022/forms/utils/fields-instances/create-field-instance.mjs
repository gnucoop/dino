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
import { EventEmitter } from '@angular/core';
import { createNodeInstance } from '../nodes-instances/create-node-instance';
import { nodeInstanceCompleteName } from '../nodes-instances/node-instance-complete-name';
/**
 * Create a field instance and init the value of the field by cascade conditions.
 *
 * First check if the value is in the context by node name.
 * Second check if the value is in the context by complete name.
 * Third check if the field has a default value (only if field is visible and its container is visible).
 * Else value is null.
 *
 * If instance validationResultsis is not defined assign empty array.
 * If instance warningResults is not defined assign empty array.
 * Init valid with false.
 */
export function createFieldInstance(instance, context, containerNode) {
    const nodeInstance = createNodeInstance(instance);
    let value = null;
    if (nodeInstance.node != null && context != null) {
        const completeName = nodeInstanceCompleteName(nodeInstance);
        if (context[nodeInstance.node.name] != null) {
            value = context[nodeInstance.node.name];
        }
        else if (context[completeName] != null) {
            value = context[completeName];
        }
        else if (instance.node.defaultValue != null) {
            let visibility = nodeInstance.node.visibility
                ? evaluateExpression(nodeInstance.node.visibility.condition, context)
                : nodeInstance.visible;
            if (visibility && containerNode && containerNode.visibility) {
                visibility = evaluateExpression(containerNode.visibility.condition, context);
            }
            if (visibility) {
                if (instance.node.defaultValue.formula != null) {
                    context[completeName] = evaluateExpression(instance.node.defaultValue.formula, context);
                }
                else {
                    context[completeName] = instance.node.defaultValue;
                }
            }
            value = context[completeName];
        }
    }
    let isFieldEditable = instance.editable;
    if (isFieldEditable == null) {
        isFieldEditable = instance.node.editable != null ? instance.node.editable : true;
    }
    return {
        ...nodeInstance,
        editable: isFieldEditable,
        node: instance.node,
        value,
        valid: false,
        validationResults: instance.validationResults || [],
        warningResults: instance.warningResults || [],
        warningTrigger: new EventEmitter(),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZpZWxkLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdXRpbHMvZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtZmllbGQtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFhLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUkzQyxPQUFPLEVBQXdCLGtCQUFrQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDbEcsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFJeEY7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFFBQWdDLEVBQ2hDLE9BQW1CLEVBQ25CLGFBQThCO0lBRTlCLE1BQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELElBQUksS0FBSyxHQUFRLElBQUksQ0FBQztJQUN0QixJQUFJLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUNqRCxNQUFNLFlBQVksR0FBRyx3QkFBd0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUM1RCxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzVDLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDO2FBQU0sSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7WUFDekMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoQyxDQUFDO2FBQU0sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUM5QyxJQUFJLFVBQVUsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVU7Z0JBQzNDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDO2dCQUNyRSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztZQUV6QixJQUFJLFVBQVUsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFVBQVUsRUFBRSxDQUFDO2dCQUM1RCxVQUFVLEdBQUcsa0JBQWtCLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDL0UsQ0FBQztZQUNELElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQ2YsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQy9DLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzFGLENBQUM7cUJBQU0sQ0FBQztvQkFDTixPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7Z0JBQ3JELENBQUM7WUFDSCxDQUFDO1lBQ0QsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksZUFBZSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7SUFDeEMsSUFBSSxlQUFlLElBQUksSUFBSSxFQUFFLENBQUM7UUFDNUIsZUFBZSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNuRixDQUFDO0lBQ0QsT0FBTztRQUNMLEdBQUcsWUFBWTtRQUNmLFFBQVEsRUFBRSxlQUFlO1FBQ3pCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtRQUNuQixLQUFLO1FBQ0wsS0FBSyxFQUFFLEtBQUs7UUFDWixpQkFBaUIsRUFBRSxRQUFRLENBQUMsaUJBQWlCLElBQUksRUFBRTtRQUNuRCxjQUFjLEVBQUUsUUFBUSxDQUFDLGNBQWMsSUFBSSxFQUFFO1FBQzdDLGNBQWMsRUFBRSxJQUFJLFlBQVksRUFBUTtLQUN6QyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0LCBldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2VDcmVhdGUsIGNyZWF0ZU5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vbm9kZXMtaW5zdGFuY2VzL2NyZWF0ZS1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1jb21wbGV0ZS1uYW1lJztcblxuZXhwb3J0IHR5cGUgQWpmRmllbGRJbnN0YW5jZUNyZWF0ZSA9IEFqZk5vZGVJbnN0YW5jZUNyZWF0ZSAmIFBhcnRpYWw8QWpmRmllbGRJbnN0YW5jZT47XG5cbi8qKlxuICogQ3JlYXRlIGEgZmllbGQgaW5zdGFuY2UgYW5kIGluaXQgdGhlIHZhbHVlIG9mIHRoZSBmaWVsZCBieSBjYXNjYWRlIGNvbmRpdGlvbnMuXG4gKlxuICogRmlyc3QgY2hlY2sgaWYgdGhlIHZhbHVlIGlzIGluIHRoZSBjb250ZXh0IGJ5IG5vZGUgbmFtZS5cbiAqIFNlY29uZCBjaGVjayBpZiB0aGUgdmFsdWUgaXMgaW4gdGhlIGNvbnRleHQgYnkgY29tcGxldGUgbmFtZS5cbiAqIFRoaXJkIGNoZWNrIGlmIHRoZSBmaWVsZCBoYXMgYSBkZWZhdWx0IHZhbHVlIChvbmx5IGlmIGZpZWxkIGlzIHZpc2libGUgYW5kIGl0cyBjb250YWluZXIgaXMgdmlzaWJsZSkuXG4gKiBFbHNlIHZhbHVlIGlzIG51bGwuXG4gKlxuICogSWYgaW5zdGFuY2UgdmFsaWRhdGlvblJlc3VsdHNpcyBpcyBub3QgZGVmaW5lZCBhc3NpZ24gZW1wdHkgYXJyYXkuXG4gKiBJZiBpbnN0YW5jZSB3YXJuaW5nUmVzdWx0cyBpcyBub3QgZGVmaW5lZCBhc3NpZ24gZW1wdHkgYXJyYXkuXG4gKiBJbml0IHZhbGlkIHdpdGggZmFsc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWVsZEluc3RhbmNlKFxuICBpbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZUNyZWF0ZSxcbiAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgY29udGFpbmVyTm9kZT86IEFqZk5vZGUgfCBudWxsLFxuKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gIGNvbnN0IG5vZGVJbnN0YW5jZSA9IGNyZWF0ZU5vZGVJbnN0YW5jZShpbnN0YW5jZSk7XG4gIGxldCB2YWx1ZTogYW55ID0gbnVsbDtcbiAgaWYgKG5vZGVJbnN0YW5jZS5ub2RlICE9IG51bGwgJiYgY29udGV4dCAhPSBudWxsKSB7XG4gICAgY29uc3QgY29tcGxldGVOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSk7XG4gICAgaWYgKGNvbnRleHRbbm9kZUluc3RhbmNlLm5vZGUubmFtZV0gIT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSBjb250ZXh0W25vZGVJbnN0YW5jZS5ub2RlLm5hbWVdO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dFtjb21wbGV0ZU5hbWVdICE9IG51bGwpIHtcbiAgICAgIHZhbHVlID0gY29udGV4dFtjb21wbGV0ZU5hbWVdO1xuICAgIH0gZWxzZSBpZiAoaW5zdGFuY2Uubm9kZS5kZWZhdWx0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgbGV0IHZpc2liaWxpdHkgPSBub2RlSW5zdGFuY2Uubm9kZS52aXNpYmlsaXR5XG4gICAgICAgID8gZXZhbHVhdGVFeHByZXNzaW9uKG5vZGVJbnN0YW5jZS5ub2RlLnZpc2liaWxpdHkuY29uZGl0aW9uLCBjb250ZXh0KVxuICAgICAgICA6IG5vZGVJbnN0YW5jZS52aXNpYmxlO1xuXG4gICAgICBpZiAodmlzaWJpbGl0eSAmJiBjb250YWluZXJOb2RlICYmIGNvbnRhaW5lck5vZGUudmlzaWJpbGl0eSkge1xuICAgICAgICB2aXNpYmlsaXR5ID0gZXZhbHVhdGVFeHByZXNzaW9uKGNvbnRhaW5lck5vZGUudmlzaWJpbGl0eS5jb25kaXRpb24sIGNvbnRleHQpO1xuICAgICAgfVxuICAgICAgaWYgKHZpc2liaWxpdHkpIHtcbiAgICAgICAgaWYgKGluc3RhbmNlLm5vZGUuZGVmYXVsdFZhbHVlLmZvcm11bGEgIT0gbnVsbCkge1xuICAgICAgICAgIGNvbnRleHRbY29tcGxldGVOYW1lXSA9IGV2YWx1YXRlRXhwcmVzc2lvbihpbnN0YW5jZS5ub2RlLmRlZmF1bHRWYWx1ZS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb250ZXh0W2NvbXBsZXRlTmFtZV0gPSBpbnN0YW5jZS5ub2RlLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFsdWUgPSBjb250ZXh0W2NvbXBsZXRlTmFtZV07XG4gICAgfVxuICB9XG5cbiAgbGV0IGlzRmllbGRFZGl0YWJsZSA9IGluc3RhbmNlLmVkaXRhYmxlO1xuICBpZiAoaXNGaWVsZEVkaXRhYmxlID09IG51bGwpIHtcbiAgICBpc0ZpZWxkRWRpdGFibGUgPSBpbnN0YW5jZS5ub2RlLmVkaXRhYmxlICE9IG51bGwgPyBpbnN0YW5jZS5ub2RlLmVkaXRhYmxlIDogdHJ1ZTtcbiAgfVxuICByZXR1cm4ge1xuICAgIC4uLm5vZGVJbnN0YW5jZSxcbiAgICBlZGl0YWJsZTogaXNGaWVsZEVkaXRhYmxlLFxuICAgIG5vZGU6IGluc3RhbmNlLm5vZGUsXG4gICAgdmFsdWUsXG4gICAgdmFsaWQ6IGZhbHNlLFxuICAgIHZhbGlkYXRpb25SZXN1bHRzOiBpbnN0YW5jZS52YWxpZGF0aW9uUmVzdWx0cyB8fCBbXSxcbiAgICB3YXJuaW5nUmVzdWx0czogaW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMgfHwgW10sXG4gICAgd2FybmluZ1RyaWdnZXI6IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKSxcbiAgfTtcbn1cbiJdfQ==