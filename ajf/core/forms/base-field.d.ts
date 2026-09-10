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
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AjfFormRendererService } from './form-renderer';
import { AjfFieldInstance } from './interface/fields-instances/field-instance';
import { AjfWarningAlertService } from './warning-alert-service';
import * as i0 from "@angular/core";
/**
 * It rappresents the base field component, the first overlay of ajfFieldInstance.
 * It keeps a reference to the relative control of the form.
 * It manages the component update in conjunction with the instance update.
 * It manages the warningTrigger of the instance by displaying a confirmation
 * popup when an alert event is triggered.
 * @export
 * @abstract
 * @class AjfBaseFieldComponent
 * @template T
 */
export declare abstract class AjfBaseFieldComponent<T extends AjfFieldInstance = AjfFieldInstance> implements OnDestroy, OnInit {
    protected _changeDetectorRef: ChangeDetectorRef;
    private _service;
    private _warningAlertService;
    private _instance;
    get instance(): T | undefined;
    set instance(instance: T | undefined);
    private _control;
    get control(): Observable<UntypedFormControl | null>;
    private _warningTriggerSub;
    private _instanceUpdateSub;
    constructor(_changeDetectorRef: ChangeDetectorRef, _service: AjfFormRendererService, _warningAlertService: AjfWarningAlertService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    protected _onInstanceChange(): void;
    private _setUpInstanceUpdate;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfBaseFieldComponent<any>, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfBaseFieldComponent<any>, never, never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=base-field.d.ts.map