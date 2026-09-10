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
import { ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AjfGraphNode } from './graph-node';
import { BehaviorSubject } from 'rxjs';
import * as dagre from 'dagre';
import * as i0 from "@angular/core";
interface Box {
    green: boolean;
    height: number;
    label: string;
    name: string;
    red: boolean;
    width: number;
    x: number;
    y: number;
    yellow: boolean;
    color?: string;
}
interface IPoint {
    x: number;
    y: number;
}
export declare class Edge {
    private points;
    constructor(points: IPoint[]);
    get path(): string;
}
export declare class AjfGraphComponent implements OnInit {
    private _el;
    private _renderer;
    nodes?: AjfGraphNode[];
    graphElement: ElementRef;
    boxes$: BehaviorSubject<Box[]>;
    edges$: BehaviorSubject<Edge[]>;
    graph: dagre.graphlib.Graph<{}>;
    constructor(_el: ElementRef, _renderer: Renderer2);
    /**
     * data una stringa crea un array di stringhe in base ad un TEXT_END
     * se la ripartizione ricade all'interno di una parola shifta il delimiter fino a trovare uno
     * spazio bianco.
     */
    lines(text: string): string[];
    ngOnInit(): void;
    private _calculateHeight;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfGraphComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfGraphComponent, "ajf-graph", never, { "nodes": { "alias": "nodes"; "required": false; }; }, {}, never, never, false, never>;
}
export {};
//# sourceMappingURL=graph.d.ts.map