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
import { AjfFormRendererService } from '@ajf/core/forms';
import { AjfContext } from '@ajf/core/common';
import { AjfBaseWidgetComponent, AjfWidgetInstance } from '@ajf/core/reports';
import { TranslocoService } from '@ajf/core/transloco';
import { ChangeDetectorRef, ElementRef, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import * as i0 from "@angular/core";
export declare class AjfFilterWidgetComponent extends AjfBaseWidgetComponent<AjfWidgetInstance> {
    private _ts;
    private _formRenderer;
    readonly filteredInstance: Observable<AjfWidgetInstance>;
    filterWidgetChange: EventEmitter<{
        context: AjfContext;
        widget: AjfWidgetInstance;
    }>;
    constructor(cdr: ChangeDetectorRef, el: ElementRef, _ts: TranslocoService, _formRenderer: AjfFormRendererService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFilterWidgetComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFilterWidgetComponent, "ajf-filter-widget", never, {}, { "filteredInstance": "filteredInstance"; "filterWidgetChange": "filterWidgetChange"; }, never, never, false, never>;
}
//# sourceMappingURL=filter-widget.d.ts.map