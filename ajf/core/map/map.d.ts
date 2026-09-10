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
import { AfterViewInit, OnDestroy } from '@angular/core';
import { Map } from 'leaflet';
import { AjfMapContainerDirective } from './map-container-directive';
import * as i0 from "@angular/core";
export declare class AjfMapComponent implements AfterViewInit, OnDestroy {
    mapContainer: AjfMapContainerDirective;
    private _coordinate;
    set coordinate(coordinate: number[]);
    private _tileLayer;
    set tileLayer(tl: string | undefined);
    private _attribution;
    set attribution(attribution: string);
    private _disabled;
    set disabled(disabled: boolean);
    private _map;
    get map(): Map | undefined;
    private _columnWidthChanged;
    ngAfterViewInit(): void;
    redraw(): void;
    ngOnDestroy(): void;
    private _initMap;
    private _setMapView;
    private _addTileLayerToMap;
    private _disableMap;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfMapComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfMapComponent, "ajf-map", never, { "coordinate": { "alias": "coordinate"; "required": false; }; "tileLayer": { "alias": "tileLayer"; "required": false; }; "attribution": { "alias": "attribution"; "required": false; }; "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, false, never>;
}
//# sourceMappingURL=map.d.ts.map