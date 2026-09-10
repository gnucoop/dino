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
import { Content, PageOrientation, TCreatedPdf } from '@ajf/core/pdfmake';
import { AjfForm } from '../interface/forms/form';
export declare function openFormPdf(form: AjfForm, translate?: (_: string) => string, orientation?: PageOrientation, header?: Content[], context?: AjfContext): void;
export declare function createFormPdf(form: AjfForm, translate?: (_: string) => string, orientation?: PageOrientation, header?: Content[], context?: AjfContext): Promise<TCreatedPdf>;
//# sourceMappingURL=form-to-pdf.d.ts.map