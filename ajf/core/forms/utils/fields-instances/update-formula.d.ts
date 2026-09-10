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
import { AjfContext } from '@ajf/core/models';
import { AjfFieldInstance } from '../../interface/fields-instances/field-instance';
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
export declare function updateFormula(instance: AjfFieldInstance, context: AjfContext, updateDefault?: boolean): {
    changed: boolean;
    value: any;
};
//# sourceMappingURL=update-formula.d.ts.map