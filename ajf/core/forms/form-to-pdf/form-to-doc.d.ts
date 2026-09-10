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
import { Paragraph, Table } from 'docx';
import { AjfForm } from '../interface/forms/form';
type TranslateFunc = (text: string) => string;
export declare function downloadFormDoc(form: AjfForm, translate?: TranslateFunc, header?: SectionChild[], context?: AjfContext): void;
export declare function createFormDoc(form: AjfForm, translate?: TranslateFunc, header?: SectionChild[], context?: AjfContext): Promise<Blob>;
type SectionChild = Paragraph | Table;
export {};
//# sourceMappingURL=form-to-doc.d.ts.map