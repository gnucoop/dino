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
import { alwaysCondition, createCondition, createFormula, renameArguments, } from '@ajf/core/models';
import { AjfFileSizeLimit } from '@ajf/core/file-input';
import { AjfFieldType } from '../../interface/fields/field-type';
import { AjfNodeType } from '../../interface/nodes/node-type';
import { createFieldInstance } from '../fields-instances/create-field-instance';
import { createFieldWithChoicesInstance } from '../fields-instances/create-field-with-choices-instance';
import { createTableFieldInstance } from '../fields-instances/create-table-field-instance';
import { isFieldWithChoicesInstance } from '../fields-instances/is-field-with-choices-instance';
import { componentsMap } from '../fields/fields-map';
import { createNodeGroupInstance } from '../nodes-instances/create-node-group-instance';
import { createRepeatingSlideInstance } from '../slides-instances/create-repeating-slide-instance';
import { createSlideInstance } from '../slides-instances/create-slide-instance';
import { createValidationGroup } from '../validation/create-validation-group';
import { createWarningGroup } from '../warning/create-warning-group';
import { getAncestorRepeatingNodesNames } from './get-ancestor-repeating-nodes-names';
import { getContainerNode } from './get-container-node';
import { getInstanceCondition } from './get-instance-condition';
import { getInstanceConditions } from './get-instance-conditions';
import { getInstanceFormula } from './get-instance-formula';
import { getInstanceValidations } from './get-instance-validations';
import { getInstanceWarnings } from './get-instance-warnings';
import { isFieldInstance } from './is-field-instance';
import { isNodeGroupInstance } from './is-node-group-instance';
import { isRepeatingSlideInstance } from './is-repeating-slide-instance';
import { isSlideInstance } from './is-slide-instance';
/**
 * It creates a nodeInstance relative to a node.
 * To create the instance it calls relative create builder by nodeType.
 * If the prefix is ​​defined all formulas and conditions are calculated based on it.
 */
export function nodeToNodeInstance(allNodes, node, prefix, context) {
    let instance = null;
    const nodeType = node.nodeType;
    switch (nodeType) {
        case AjfNodeType.AjfField:
            const field = node;
            if (field.fieldType > 100) {
                if (componentsMap[field.fieldType] != null &&
                    componentsMap[field.fieldType].createInstance != null) {
                    instance = componentsMap[field.fieldType].createInstance({ node: field, prefix }, context);
                }
                else {
                    instance = createFieldInstance({ node: field, prefix }, context);
                }
            }
            else {
                const containerNode = getContainerNode(allNodes, node);
                switch (field.fieldType) {
                    case AjfFieldType.SingleChoice:
                    case AjfFieldType.MultipleChoice:
                        instance = createFieldWithChoicesInstance({ node: field, prefix }, context);
                        break;
                    case AjfFieldType.Table:
                        instance = createTableFieldInstance({ node: field, prefix }, context);
                        break;
                    case AjfFieldType.File:
                        // Set the default size limit condition for file input fields.
                        // Added in validation conditions only if no size limit condition is found.
                        const limitSizeCondition = field.validation?.conditions.find(cond => cond.condition.indexOf('.size <') || cond.condition.indexOf('.size<'));
                        if (!field.validation) {
                            field.validation = { conditions: [] };
                        }
                        if (!field.validation.conditions) {
                            field.validation.conditions = [];
                        }
                        if (!limitSizeCondition) {
                            field.validation.conditions.push({
                                'condition': `${field.name} == null || ${field.name}.size < ${AjfFileSizeLimit}`,
                                'clientValidation': true,
                                'errorMessage': `The file exceeds the ${(AjfFileSizeLimit / 1024 ** 2).toFixed(0)} MB limit`,
                            });
                        }
                        instance = createFieldInstance({ node: field, prefix }, context, containerNode);
                        break;
                    default:
                        instance = createFieldInstance({ node: field, prefix }, context, containerNode);
                        break;
                }
            }
            break;
        case AjfNodeType.AjfNodeGroup:
            instance = createNodeGroupInstance({ node: node, prefix });
            break;
        case AjfNodeType.AjfRepeatingSlide:
            instance = createRepeatingSlideInstance({ node: node, prefix });
            break;
        case AjfNodeType.AjfSlide:
            instance = createSlideInstance({ node: node, prefix });
            break;
    }
    if (instance != null) {
        const hasPrefix = prefix != null && prefix.length > 0;
        if (hasPrefix) {
            const ancestorsNames = getAncestorRepeatingNodesNames(allNodes, node);
            if (node.visibility != null) {
                const oldVisibility = node.visibility.condition;
                const newVisibility = renameArguments(oldVisibility, ancestorsNames, prefix);
                instance.visibility =
                    newVisibility !== oldVisibility
                        ? createCondition({ condition: newVisibility })
                        : node.visibility;
            }
            const conditionalBranches = instance.node.conditionalBranches != null && instance.node.conditionalBranches.length > 0
                ? instance.node.conditionalBranches
                : [alwaysCondition()];
            instance.conditionalBranches = getInstanceConditions(conditionalBranches, ancestorsNames, prefix);
            if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
                const formulaReps = instance.node.formulaReps;
                if (formulaReps != null) {
                    const oldFormula = formulaReps.formula;
                    let newFormula = renameArguments(oldFormula, ancestorsNames, prefix);
                    instance.formulaReps =
                        newFormula !== oldFormula ? createFormula({ formula: newFormula }) : formulaReps;
                }
            }
            else if (isFieldInstance(instance)) {
                instance.readonly = instance.node.readonly;
                if (instance.node.formula) {
                    instance.formula = getInstanceFormula(instance.node.formula, ancestorsNames, prefix);
                }
                if (instance.node.validation != null) {
                    const newConditions = getInstanceValidations(instance.node.validation.conditions, ancestorsNames, prefix);
                    if (newConditions !== instance.node.validation.conditions) {
                        instance.validation = createValidationGroup(instance.node.validation);
                        instance.validation.conditions = newConditions;
                    }
                    else {
                        instance.validation = instance.node.validation;
                    }
                }
                if (instance.node.warning != null) {
                    const newWarnings = getInstanceWarnings(instance.node.warning.conditions, ancestorsNames, prefix);
                    if (newWarnings !== instance.node.warning.conditions) {
                        instance.warning = createWarningGroup(instance.node.warning);
                        instance.warning.conditions = newWarnings;
                    }
                    else {
                        instance.warning = instance.node.warning;
                    }
                }
                if (instance.node.nextSlideCondition != null) {
                    instance.nextSlideCondition = getInstanceCondition(instance.node.nextSlideCondition, ancestorsNames, prefix);
                }
                if (isFieldWithChoicesInstance(instance)) {
                    if (instance.node.choicesFilter != null) {
                        instance.choicesFilter = getInstanceFormula(instance.node.choicesFilter, ancestorsNames, prefix);
                    }
                    if (instance.node.triggerConditions != null) {
                        instance.triggerConditions = getInstanceConditions(instance.node.triggerConditions, ancestorsNames, prefix);
                    }
                }
            }
        }
        else {
            instance.visibility = instance.node.visibility;
            if (isSlideInstance(instance) || isFieldInstance(instance)) {
                instance.readonly = instance.node.readonly;
            }
            const conditionalBranches = instance.node.conditionalBranches != null && instance.node.conditionalBranches.length > 0
                ? instance.node.conditionalBranches
                : [alwaysCondition()];
            instance.conditionalBranches = conditionalBranches;
            if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
                const rgInstance = instance;
                rgInstance.formulaReps = rgInstance.node.formulaReps;
            }
            else if (isFieldInstance(instance)) {
                instance.validation = instance.node.validation;
                instance.warning = instance.node.warning;
                instance.nextSlideCondition = instance.node.nextSlideCondition;
                if (isFieldWithChoicesInstance(instance)) {
                    instance.choicesFilter = instance.node.choicesFilter;
                    instance.triggerConditions = instance.node.triggerConditions;
                }
                instance.formula = instance.node.formula;
            }
        }
    }
    return instance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10by1ub2RlLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtdG8tbm9kZS1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsZUFBZSxFQUNmLGVBQWUsRUFDZixhQUFhLEVBQ2IsZUFBZSxHQUNoQixNQUFNLGtCQUFrQixDQUFDO0FBRTFCLE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxtQ0FBbUMsQ0FBQztBQUsvRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFHNUQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDOUUsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sd0RBQXdELENBQUM7QUFDdEcsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDekYsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDOUYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3RGLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQ2pHLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBRW5FLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxN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QUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUN2RCxDQUFDO2lCQUFNLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQy9DLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3pDLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2dCQUMvRCxJQUFJLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7b0JBQ3pDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7b0JBQ3JELFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUMvRCxDQUFDO2dCQUNELFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7WUFDM0MsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ29udGV4dCxcbiAgYWx3YXlzQ29uZGl0aW9uLFxuICBjcmVhdGVDb25kaXRpb24sXG4gIGNyZWF0ZUZvcm11bGEsXG4gIHJlbmFtZUFyZ3VtZW50cyxcbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmRmlsZVNpemVMaW1pdH0gZnJvbSAnQGFqZi9jb3JlL2ZpbGUtaW5wdXQnO1xuaW1wb3J0IHtBamZGaWVsZH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXB9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlLWdyb3VwJztcbmltcG9ydCB7QWpmTm9kZVR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlLXR5cGUnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3NsaWRlcy9yZXBlYXRpbmctc2xpZGUnO1xuaW1wb3J0IHtBamZTbGlkZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3NsaWRlcy9zbGlkZSc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4uL2ZpZWxkcy1pbnN0YW5jZXMvY3JlYXRlLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7Y3JlYXRlRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlfSBmcm9tICcuLi9maWVsZHMtaW5zdGFuY2VzL2NyZWF0ZS1maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtjcmVhdGVUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4uL2ZpZWxkcy1pbnN0YW5jZXMvY3JlYXRlLXRhYmxlLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7aXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2V9IGZyb20gJy4uL2ZpZWxkcy1pbnN0YW5jZXMvaXMtZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7Y29tcG9uZW50c01hcH0gZnJvbSAnLi4vZmllbGRzL2ZpZWxkcy1tYXAnO1xuaW1wb3J0IHtjcmVhdGVOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi4vbm9kZXMtaW5zdGFuY2VzL2NyZWF0ZS1ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7Y3JlYXRlUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi4vc2xpZGVzLWluc3RhbmNlcy9jcmVhdGUtcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7Y3JlYXRlU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi4vc2xpZGVzLWluc3RhbmNlcy9jcmVhdGUtc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtjcmVhdGVWYWxpZGF0aW9uR3JvdXB9IGZyb20gJy4uL3ZhbGlkYXRpb24vY3JlYXRlLXZhbGlkYXRpb24tZ3JvdXAnO1xuaW1wb3J0IHtjcmVhdGVXYXJuaW5nR3JvdXB9IGZyb20gJy4uL3dhcm5pbmcvY3JlYXRlLXdhcm5pbmctZ3JvdXAnO1xuXG5pbXBvcnQge2dldEFuY2VzdG9yUmVwZWF0aW5nTm9kZXNOYW1lc30gZnJvbSAnLi9nZXQtYW5jZXN0b3ItcmVwZWF0aW5nLW5vZGVzLW5hbWVzJztcbmltcG9ydCB7Z2V0Q29udGFpbmVyTm9kZX0gZnJvbSAnLi9nZXQtY29udGFpbmVyLW5vZGUnO1xuaW1wb3J0IHtnZXRJbnN0YW5jZUNvbmRpdGlvbn0gZnJvbSAnLi9nZXQtaW5zdGFuY2UtY29uZGl0aW9uJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VDb25kaXRpb25zfSBmcm9tICcuL2dldC1pbnN0YW5jZS1jb25kaXRpb25zJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VGb3JtdWxhfSBmcm9tICcuL2dldC1pbnN0YW5jZS1mb3JtdWxhJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VWYWxpZGF0aW9uc30gZnJvbSAnLi9nZXQtaW5zdGFuY2UtdmFsaWRhdGlvbnMnO1xuaW1wb3J0IHtnZXRJbnN0YW5jZVdhcm5pbmdzfSBmcm9tICcuL2dldC1pbnN0YW5jZS13YXJuaW5ncyc7XG5pbXBvcnQge2lzRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pcy1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vaXMtbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pcy1yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vaXMtc2xpZGUtaW5zdGFuY2UnO1xuXG4vKipcbiAqIEl0IGNyZWF0ZXMgYSBub2RlSW5zdGFuY2UgcmVsYXRpdmUgdG8gYSBub2RlLlxuICogVG8gY3JlYXRlIHRoZSBpbnN0YW5jZSBpdCBjYWxscyByZWxhdGl2ZSBjcmVhdGUgYnVpbGRlciBieSBub2RlVHlwZS5cbiAqIElmIHRoZSBwcmVmaXggaXMg4oCL4oCLZGVmaW5lZCBhbGwgZm9ybXVsYXMgYW5kIGNvbmRpdGlvbnMgYXJlIGNhbGN1bGF0ZWQgYmFzZWQgb24gaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub2RlVG9Ob2RlSW5zdGFuY2UoXG4gIGFsbE5vZGVzOiBBamZOb2RlW10gfCBBamZOb2RlSW5zdGFuY2VbXSxcbiAgbm9kZTogQWpmTm9kZSxcbiAgcHJlZml4OiBudW1iZXJbXSxcbiAgY29udGV4dDogQWpmQ29udGV4dCxcbik6IEFqZk5vZGVJbnN0YW5jZSB8IG51bGwge1xuICBsZXQgaW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSB8IG51bGwgPSBudWxsO1xuICBjb25zdCBub2RlVHlwZSA9IG5vZGUubm9kZVR5cGU7XG4gIHN3aXRjaCAobm9kZVR5cGUpIHtcbiAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZkZpZWxkOlxuICAgICAgY29uc3QgZmllbGQgPSBub2RlIGFzIEFqZkZpZWxkO1xuICAgICAgaWYgKGZpZWxkLmZpZWxkVHlwZSA+IDEwMCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY29tcG9uZW50c01hcFtmaWVsZC5maWVsZFR5cGVdICE9IG51bGwgJiZcbiAgICAgICAgICBjb21wb25lbnRzTWFwW2ZpZWxkLmZpZWxkVHlwZV0uY3JlYXRlSW5zdGFuY2UgIT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICBpbnN0YW5jZSA9IGNvbXBvbmVudHNNYXBbZmllbGQuZmllbGRUeXBlXS5jcmVhdGVJbnN0YW5jZSEoe25vZGU6IGZpZWxkLCBwcmVmaXh9LCBjb250ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnN0YW5jZSA9IGNyZWF0ZUZpZWxkSW5zdGFuY2Uoe25vZGU6IGZpZWxkLCBwcmVmaXh9LCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyTm9kZSA9IGdldENvbnRhaW5lck5vZGUoYWxsTm9kZXMsIG5vZGUpO1xuICAgICAgICBzd2l0Y2ggKGZpZWxkLmZpZWxkVHlwZSkge1xuICAgICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZTpcbiAgICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZTpcbiAgICAgICAgICAgIGluc3RhbmNlID0gY3JlYXRlRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKHtub2RlOiBmaWVsZCwgcHJlZml4fSwgY29udGV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UYWJsZTpcbiAgICAgICAgICAgIGluc3RhbmNlID0gY3JlYXRlVGFibGVGaWVsZEluc3RhbmNlKHtub2RlOiBmaWVsZCwgcHJlZml4fSwgY29udGV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5GaWxlOlxuICAgICAgICAgICAgLy8gU2V0IHRoZSBkZWZhdWx0IHNpemUgbGltaXQgY29uZGl0aW9uIGZvciBmaWxlIGlucHV0IGZpZWxkcy5cbiAgICAgICAgICAgIC8vIEFkZGVkIGluIHZhbGlkYXRpb24gY29uZGl0aW9ucyBvbmx5IGlmIG5vIHNpemUgbGltaXQgY29uZGl0aW9uIGlzIGZvdW5kLlxuICAgICAgICAgICAgY29uc3QgbGltaXRTaXplQ29uZGl0aW9uID0gZmllbGQudmFsaWRhdGlvbj8uY29uZGl0aW9ucy5maW5kKFxuICAgICAgICAgICAgICBjb25kID0+IGNvbmQuY29uZGl0aW9uLmluZGV4T2YoJy5zaXplIDwnKSB8fCBjb25kLmNvbmRpdGlvbi5pbmRleE9mKCcuc2l6ZTwnKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoIWZpZWxkLnZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgICAgZmllbGQudmFsaWRhdGlvbiA9IHtjb25kaXRpb25zOiBbXX07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWZpZWxkLnZhbGlkYXRpb24uY29uZGl0aW9ucykge1xuICAgICAgICAgICAgICBmaWVsZC52YWxpZGF0aW9uLmNvbmRpdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbGltaXRTaXplQ29uZGl0aW9uKSB7XG4gICAgICAgICAgICAgIGZpZWxkLnZhbGlkYXRpb24uY29uZGl0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgICAgICAnY29uZGl0aW9uJzogYCR7ZmllbGQubmFtZX0gPT0gbnVsbCB8fCAke2ZpZWxkLm5hbWV9LnNpemUgPCAke0FqZkZpbGVTaXplTGltaXR9YCxcbiAgICAgICAgICAgICAgICAnY2xpZW50VmFsaWRhdGlvbic6IHRydWUsXG4gICAgICAgICAgICAgICAgJ2Vycm9yTWVzc2FnZSc6IGBUaGUgZmlsZSBleGNlZWRzIHRoZSAkeyhBamZGaWxlU2l6ZUxpbWl0IC8gMTAyNCAqKiAyKS50b0ZpeGVkKFxuICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICApfSBNQiBsaW1pdGAsXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5zdGFuY2UgPSBjcmVhdGVGaWVsZEluc3RhbmNlKHtub2RlOiBmaWVsZCwgcHJlZml4fSwgY29udGV4dCwgY29udGFpbmVyTm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaW5zdGFuY2UgPSBjcmVhdGVGaWVsZEluc3RhbmNlKHtub2RlOiBmaWVsZCwgcHJlZml4fSwgY29udGV4dCwgY29udGFpbmVyTm9kZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXA6XG4gICAgICBpbnN0YW5jZSA9IGNyZWF0ZU5vZGVHcm91cEluc3RhbmNlKHtub2RlOiBub2RlIGFzIEFqZk5vZGVHcm91cCwgcHJlZml4fSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlOlxuICAgICAgaW5zdGFuY2UgPSBjcmVhdGVSZXBlYXRpbmdTbGlkZUluc3RhbmNlKHtub2RlOiBub2RlIGFzIEFqZlJlcGVhdGluZ1NsaWRlLCBwcmVmaXh9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmU2xpZGU6XG4gICAgICBpbnN0YW5jZSA9IGNyZWF0ZVNsaWRlSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmU2xpZGUsIHByZWZpeH0pO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaWYgKGluc3RhbmNlICE9IG51bGwpIHtcbiAgICBjb25zdCBoYXNQcmVmaXggPSBwcmVmaXggIT0gbnVsbCAmJiBwcmVmaXgubGVuZ3RoID4gMDtcbiAgICBpZiAoaGFzUHJlZml4KSB7XG4gICAgICBjb25zdCBhbmNlc3RvcnNOYW1lcyA9IGdldEFuY2VzdG9yUmVwZWF0aW5nTm9kZXNOYW1lcyhhbGxOb2Rlcywgbm9kZSk7XG5cbiAgICAgIGlmIChub2RlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBvbGRWaXNpYmlsaXR5ID0gbm9kZS52aXNpYmlsaXR5LmNvbmRpdGlvbjtcbiAgICAgICAgY29uc3QgbmV3VmlzaWJpbGl0eSA9IHJlbmFtZUFyZ3VtZW50cyhvbGRWaXNpYmlsaXR5LCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgaW5zdGFuY2UudmlzaWJpbGl0eSA9XG4gICAgICAgICAgbmV3VmlzaWJpbGl0eSAhPT0gb2xkVmlzaWJpbGl0eVxuICAgICAgICAgICAgPyBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbjogbmV3VmlzaWJpbGl0eX0pXG4gICAgICAgICAgICA6IG5vZGUudmlzaWJpbGl0eTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlcyA9XG4gICAgICAgIGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsICYmIGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGggPiAwXG4gICAgICAgICAgPyBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXNcbiAgICAgICAgICA6IFthbHdheXNDb25kaXRpb24oKV07XG4gICAgICBpbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzID0gZ2V0SW5zdGFuY2VDb25kaXRpb25zKFxuICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzLFxuICAgICAgICBhbmNlc3RvcnNOYW1lcyxcbiAgICAgICAgcHJlZml4LFxuICAgICAgKTtcblxuICAgICAgaWYgKGlzTm9kZUdyb3VwSW5zdGFuY2UoaW5zdGFuY2UpIHx8IGlzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgICAgY29uc3QgZm9ybXVsYVJlcHMgPSBpbnN0YW5jZS5ub2RlLmZvcm11bGFSZXBzO1xuICAgICAgICBpZiAoZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IG9sZEZvcm11bGEgPSBmb3JtdWxhUmVwcy5mb3JtdWxhO1xuICAgICAgICAgIGxldCBuZXdGb3JtdWxhID0gcmVuYW1lQXJndW1lbnRzKG9sZEZvcm11bGEsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICAgIGluc3RhbmNlLmZvcm11bGFSZXBzID1cbiAgICAgICAgICAgIG5ld0Zvcm11bGEgIT09IG9sZEZvcm11bGEgPyBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBuZXdGb3JtdWxhfSkgOiBmb3JtdWxhUmVwcztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChpc0ZpZWxkSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICAgIGluc3RhbmNlLnJlYWRvbmx5ID0gaW5zdGFuY2Uubm9kZS5yZWFkb25seTtcblxuICAgICAgICBpZiAoaW5zdGFuY2Uubm9kZS5mb3JtdWxhKSB7XG4gICAgICAgICAgaW5zdGFuY2UuZm9ybXVsYSA9IGdldEluc3RhbmNlRm9ybXVsYShpbnN0YW5jZS5ub2RlLmZvcm11bGEsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluc3RhbmNlLm5vZGUudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q29uZGl0aW9ucyA9IGdldEluc3RhbmNlVmFsaWRhdGlvbnMoXG4gICAgICAgICAgICBpbnN0YW5jZS5ub2RlLnZhbGlkYXRpb24uY29uZGl0aW9ucyxcbiAgICAgICAgICAgIGFuY2VzdG9yc05hbWVzLFxuICAgICAgICAgICAgcHJlZml4LFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKG5ld0NvbmRpdGlvbnMgIT09IGluc3RhbmNlLm5vZGUudmFsaWRhdGlvbi5jb25kaXRpb25zKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS52YWxpZGF0aW9uID0gY3JlYXRlVmFsaWRhdGlvbkdyb3VwKGluc3RhbmNlLm5vZGUudmFsaWRhdGlvbik7XG4gICAgICAgICAgICBpbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMgPSBuZXdDb25kaXRpb25zO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnN0YW5jZS52YWxpZGF0aW9uID0gaW5zdGFuY2Uubm9kZS52YWxpZGF0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnN0YW5jZS5ub2RlLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IG5ld1dhcm5pbmdzID0gZ2V0SW5zdGFuY2VXYXJuaW5ncyhcbiAgICAgICAgICAgIGluc3RhbmNlLm5vZGUud2FybmluZy5jb25kaXRpb25zLFxuICAgICAgICAgICAgYW5jZXN0b3JzTmFtZXMsXG4gICAgICAgICAgICBwcmVmaXgsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobmV3V2FybmluZ3MgIT09IGluc3RhbmNlLm5vZGUud2FybmluZy5jb25kaXRpb25zKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS53YXJuaW5nID0gY3JlYXRlV2FybmluZ0dyb3VwKGluc3RhbmNlLm5vZGUud2FybmluZyk7XG4gICAgICAgICAgICBpbnN0YW5jZS53YXJuaW5nLmNvbmRpdGlvbnMgPSBuZXdXYXJuaW5ncztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5zdGFuY2Uud2FybmluZyA9IGluc3RhbmNlLm5vZGUud2FybmluZztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5zdGFuY2Uubm9kZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgIGluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbiA9IGdldEluc3RhbmNlQ29uZGl0aW9uKFxuICAgICAgICAgICAgaW5zdGFuY2Uubm9kZS5uZXh0U2xpZGVDb25kaXRpb24sXG4gICAgICAgICAgICBhbmNlc3RvcnNOYW1lcyxcbiAgICAgICAgICAgIHByZWZpeCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICAgIGlmIChpbnN0YW5jZS5ub2RlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgaW5zdGFuY2UuY2hvaWNlc0ZpbHRlciA9IGdldEluc3RhbmNlRm9ybXVsYShcbiAgICAgICAgICAgICAgaW5zdGFuY2Uubm9kZS5jaG9pY2VzRmlsdGVyLFxuICAgICAgICAgICAgICBhbmNlc3RvcnNOYW1lcyxcbiAgICAgICAgICAgICAgcHJlZml4LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGluc3RhbmNlLm5vZGUudHJpZ2dlckNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgaW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgPSBnZXRJbnN0YW5jZUNvbmRpdGlvbnMoXG4gICAgICAgICAgICAgIGluc3RhbmNlLm5vZGUudHJpZ2dlckNvbmRpdGlvbnMsXG4gICAgICAgICAgICAgIGFuY2VzdG9yc05hbWVzLFxuICAgICAgICAgICAgICBwcmVmaXgsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0YW5jZS52aXNpYmlsaXR5ID0gaW5zdGFuY2Uubm9kZS52aXNpYmlsaXR5O1xuICAgICAgaWYgKGlzU2xpZGVJbnN0YW5jZShpbnN0YW5jZSkgfHwgaXNGaWVsZEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICBpbnN0YW5jZS5yZWFkb25seSA9IGluc3RhbmNlLm5vZGUucmVhZG9ubHk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb25kaXRpb25hbEJyYW5jaGVzID1cbiAgICAgICAgaW5zdGFuY2Uubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzICE9IG51bGwgJiYgaW5zdGFuY2Uubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCA+IDBcbiAgICAgICAgICA/IGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlc1xuICAgICAgICAgIDogW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgICAgIGluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMgPSBjb25kaXRpb25hbEJyYW5jaGVzO1xuICAgICAgaWYgKGlzTm9kZUdyb3VwSW5zdGFuY2UoaW5zdGFuY2UpIHx8IGlzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgICAgY29uc3QgcmdJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZTtcbiAgICAgICAgcmdJbnN0YW5jZS5mb3JtdWxhUmVwcyA9IHJnSW5zdGFuY2Uubm9kZS5mb3JtdWxhUmVwcztcbiAgICAgIH0gZWxzZSBpZiAoaXNGaWVsZEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICBpbnN0YW5jZS52YWxpZGF0aW9uID0gaW5zdGFuY2Uubm9kZS52YWxpZGF0aW9uO1xuICAgICAgICBpbnN0YW5jZS53YXJuaW5nID0gaW5zdGFuY2Uubm9kZS53YXJuaW5nO1xuICAgICAgICBpbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gPSBpbnN0YW5jZS5ub2RlLm5leHRTbGlkZUNvbmRpdGlvbjtcbiAgICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICAgIGluc3RhbmNlLmNob2ljZXNGaWx0ZXIgPSBpbnN0YW5jZS5ub2RlLmNob2ljZXNGaWx0ZXI7XG4gICAgICAgICAgaW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgPSBpbnN0YW5jZS5ub2RlLnRyaWdnZXJDb25kaXRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGluc3RhbmNlLmZvcm11bGEgPSBpbnN0YW5jZS5ub2RlLmZvcm11bGE7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBpbnN0YW5jZTtcbn1cbiJdfQ==