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
import { AjfField } from '../../interface/fields/field';
import { AjfFieldWithChoices } from '../../interface/fields/field-with-choices';
/**
 * It is true if the field type is a SingleChoice or MultipleChoice.
 */
export declare function isFieldWithChoices<T = any>(field: AjfField): field is AjfFieldWithChoices<T>;
//# sourceMappingURL=is-field-with-choices.d.ts.map