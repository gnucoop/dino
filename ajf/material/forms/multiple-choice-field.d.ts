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
import { AjfChoice, AjfFieldWithChoicesComponent, AjfFormRendererService } from '@ajf/core/forms';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl, UntypedFormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AjfWarningAlertService } from './warning-alert-service';
import * as i0 from "@angular/core";
export declare class AjfMultipleChoiceFieldComponent<T> extends AjfFieldWithChoicesComponent<T> implements OnDestroy {
    readonly expandThreshold: number;
    readonly searchFilterCtrl: FormControl<string>;
    /**
     * Whether the choices collapse into a searchable dropdown. Below the search
     * threshold they are laid out as buttons instead, which reads faster for a
     * short list. `forceExpanded` wins over `forceNarrow`, so a schema can pin
     * either presentation regardless of how many choices there are.
     */
    get isNarrow(): boolean;
    filteredChoices$: Observable<AjfChoice<any>[]>;
    private readonly _choicesUpdate$;
    private _instanceUpdateForChoicesSub;
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService, searchThreshold: number);
    /** The label shown on a selection chip. */
    labelFor(value: any): string;
    /**
     * Drop one value from the selection, from the chip's own button. The click has
     * to be stopped from reaching the trigger, which would reopen the panel.
     */
    removeValue(ctrl: UntypedFormControl, value: any, event: Event): void;
    protected _onInstanceChange(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfMultipleChoiceFieldComponent<any>, [null, null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfMultipleChoiceFieldComponent<any>, "ng-component", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=multiple-choice-field.d.ts.map