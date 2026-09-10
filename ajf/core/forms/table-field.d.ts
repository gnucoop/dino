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
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AjfTableFieldInstance } from './interface/fields-instances/table-field-instance';
import { AjfWarningAlertService } from './warning-alert-service';
import * as i0 from "@angular/core";
/**
 * This component manages the table field data.
 * It exposes methods for managing the display of controllers.
 *
 *
 * @export
 * @abstract
 * @class AjfTableFieldComponent
 */
export declare abstract class AjfTableFieldComponent extends AjfBaseFieldComponent<AjfTableFieldInstance> implements OnDestroy {
    private _instanceChangeSub;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    /**
     *  set the current cell show to false and set the next cell show to true.
     *
     * @param ev
     * @param row
     * @param column
     * @return {*}
     */
    goToNextCell(ev: Event, row: number, column: number): void;
    /**
     * It resets all control.show to false and sets the control.show
     * (identified by row and column) to true.
     *
     * @param row
     * @param column
     */
    goToCell(row: number, column: number): void;
    ngOnDestroy(): void;
    protected _onInstanceChange(): void;
    /**
     * it sets all controls show to false.
     *
     * @private
     */
    private _resetControls;
    /**
     * It sets the control.show (identified by row and column) to true.
     *
     * @private
     * @param row
     * @param column
     * @return {*}
     */
    private _showCell;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfTableFieldComponent, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfTableFieldComponent, never, never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=table-field.d.ts.map