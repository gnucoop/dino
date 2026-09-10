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
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AjfFormRendererService } from './form-renderer';
import { AjfVideoUrlFieldComponent } from './video-url-field';
import { AjfWarningAlertService } from './warning-alert-service';
import * as i0 from "@angular/core";
/**
 * This component allows you to show the video related to url contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyVideoUrlFieldComponent
 */
export declare class AjfReadOnlyVideoUrlFieldComponent extends AjfVideoUrlFieldComponent {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, domSanitizer: DomSanitizer, httpClient: HttpClient);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReadOnlyVideoUrlFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReadOnlyVideoUrlFieldComponent, "ajf-read-only-video-url-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=read-only-video-url-field.d.ts.map