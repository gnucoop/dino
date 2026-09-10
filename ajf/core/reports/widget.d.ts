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
import { OnInit, Renderer2 } from '@angular/core';
import { AjfWidgetInstance } from './interface/widgets-instances/widget-instance';
import { AjfWidgetComponentsMap } from './interface/widgets/widget-components-map';
import { AjfWidgetHost } from './widget-host';
import * as i0 from "@angular/core";
export declare abstract class AjfReportWidget implements OnInit {
    private _renderer;
    widgetHost: AjfWidgetHost;
    private _instance;
    get instance(): AjfWidgetInstance | undefined;
    set instance(instance: AjfWidgetInstance | undefined);
    protected abstract widgetsMap: AjfWidgetComponentsMap;
    private _init;
    private _currentComponentRef;
    private _currentComponentType;
    constructor(_renderer: Renderer2);
    ngOnInit(): void;
    private _loadComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReportWidget, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfReportWidget, never, never, { "instance": { "alias": "instance"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=widget.d.ts.map