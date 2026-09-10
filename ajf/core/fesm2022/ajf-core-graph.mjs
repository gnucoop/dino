import * as i0 from '@angular/core';
import { isDevMode, ViewEncapsulation, ChangeDetectionStrategy, Component, ViewChild, Input, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as dagre from 'dagre';
import * as svgPanZoom from 'svg-pan-zoom';
import * as i1 from '@angular/common';
import { CommonModule } from '@angular/common';

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
const _c0 = ["graph"];
function AjfGraphComponent__svg_g_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g");
    i0.ɵɵelement(1, "path", 5);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const edge_r1 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵattribute("d", edge_r1.path);
} }
function AjfGraphComponent__svg_g_5__svg_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "text", 8);
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const line_r2 = ctx.$implicit;
    const idx_r3 = ctx.index;
    const box_r4 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵattribute("x", box_r4.x)("y", box_r4.y - box_r4.height / 2 + 30 + 30 * idx_r3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", line_r2, " ");
} }
function AjfGraphComponent__svg_g_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵnamespaceSVG();
    i0.ɵɵelementStart(0, "g", 6);
    i0.ɵɵelement(1, "rect", 7);
    i0.ɵɵtemplate(2, AjfGraphComponent__svg_g_5__svg_ng_container_2_Template, 3, 3, "ng-container", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const box_r4 = ctx.$implicit;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵattribute("fill", box_r4.color ? box_r4.color : "#d95989")("stroke", box_r4.color !== "white" ? "white" : "black");
    i0.ɵɵadvance();
    i0.ɵɵattribute("x", box_r4.x - box_r4.width / 2)("y", box_r4.y - box_r4.height / 2)("width", box_r4.width)("height", box_r4.height)("stroke", box_r4.red === true ? "red" : box_r4.yellow === true ? "yellow" : box_r4.green === true ? "green" : "black");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r4.lines(box_r4.label));
} }
const TEXT_END = 20;
const LINE_HEIGHT = 40;
const BOX_WIDTH = 170;
const SvgPanZoom = (svgPanZoom.default || svgPanZoom);
class Edge {
    constructor(points) {
        this.points = points;
    }
    get path() {
        if (this.points.length < 2) {
            return '';
        }
        let result = 'M ';
        this.points.forEach(pt => {
            result += `${pt.x} ${pt.y} L`;
        });
        return result.substr(0, result.length - 2);
    }
}
class AjfGraphComponent {
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this.boxes$ = new BehaviorSubject([]);
        this.edges$ = new BehaviorSubject([]);
        this.graph = new dagre.graphlib.Graph();
        this.graph.setGraph({ marginx: BOX_WIDTH / 2, marginy: LINE_HEIGHT });
    }
    /**
     * data una stringa crea un array di stringhe in base ad un TEXT_END
     * se la ripartizione ricade all'interno di una parola shifta il delimiter fino a trovare uno
     * spazio bianco.
     */
    lines(text) {
        const lines = [];
        while (text != null && text.length > 0) {
            let textEnd = TEXT_END;
            while (text[textEnd - 1] !== ' ' && text.length > TEXT_END) {
                textEnd--;
            }
            const line = text.slice(0, textEnd);
            text = text.split(line)[1];
            lines.push(line);
        }
        return lines;
    }
    ngOnInit() {
        if (this.nodes != null) {
            const widgetNodes = this.nodes;
            widgetNodes.forEach(node => {
                this.graph.setNode(node.id, {
                    width: BOX_WIDTH,
                    height: this._calculateHeight(node.label),
                    label: node.label,
                    red: node.red,
                    yellow: node.yellow,
                    green: node.green,
                    color: node.color || undefined,
                });
                if (node.parentId != null) {
                    try {
                        node.parentId = JSON.parse(node.parentId);
                    }
                    catch (e) {
                        if (isDevMode()) {
                            console.log(e);
                        }
                    }
                    const parents = Array.isArray(node.parentId)
                        ? node.parentId
                        : [node.parentId];
                    parents.forEach(parent => {
                        this.graph.setEdge(`${parent}`, node.id, {});
                    });
                }
            });
            try {
                SvgPanZoom(this.graphElement.nativeElement, { controlIconsEnabled: true });
            }
            catch (e) {
                console.log(e);
            }
        }
        dagre.layout(this.graph);
        const boxes = [];
        this.graph.nodes().forEach((nodeId) => {
            const n = this.graph.node(nodeId);
            if (n) {
                boxes.push({ ...n });
            }
        });
        this.boxes$.next(boxes);
        const edges = [];
        this.graph.edges().forEach((edge) => {
            edges.push(new Edge(this.graph.edge(edge).points));
        });
        this.edges$.next(edges);
    }
    _calculateHeight(text) {
        const linesLength = this.lines(text).length;
        if (linesLength === 1) {
            return LINE_HEIGHT * 1.5;
        }
        return linesLength * LINE_HEIGHT;
    }
    static { this.ɵfac = function AjfGraphComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfGraphComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfGraphComponent, selectors: [["ajf-graph"]], viewQuery: function AjfGraphComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.graphElement = _t.first);
        } }, inputs: { nodes: "nodes" }, decls: 7, vars: 6, consts: [["graph", ""], [1, "wrapper"], ["viewBox", "0 0 1000 2000", "width", "100%", "height", "100%"], [4, "ngFor", "ngForOf"], ["stroke-width", "1px", "transition", "fill 0.2s", 4, "ngFor", "ngForOf"], ["fill", "none", "stroke", "gray", "stroke-wodth", "2px", 1, "edge"], ["stroke-width", "1px", "transition", "fill 0.2s"], [2, "stroke-width", "6"], ["dominant-baseline", "middle", "text-anchor", "middle", 1, "text"]], template: function AjfGraphComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1);
            i0.ɵɵnamespaceSVG();
            i0.ɵɵelementStart(1, "svg", 2, 0);
            i0.ɵɵtemplate(3, AjfGraphComponent__svg_g_3_Template, 2, 1, "g", 3);
            i0.ɵɵpipe(4, "async");
            i0.ɵɵtemplate(5, AjfGraphComponent__svg_g_5_Template, 3, 8, "g", 4);
            i0.ɵɵpipe(6, "async");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(4, 2, ctx.edges$));
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(6, 4, ctx.boxes$));
        } }, dependencies: [i1.NgForOf, i1.AsyncPipe], styles: ["ajf-graph{width:100%;height:600px}ajf-graph .buttons{position:absolute;z-index:100}ajf-graph .wrapper{position:absolute;left:0;top:0;width:100%;height:600px;overflow:scroll}ajf-graph svg{display:block;cursor:move;height:600px}ajf-graph svg .edge{fill:none;stroke:gray;stroke-width:2px}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfGraphComponent, [{
        type: Component,
        args: [{ selector: 'ajf-graph', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div class=\"wrapper\">\n  <svg #graph viewBox=\"0 0 1000 2000\" width=\"100%\" height=\"100%\">\n    <g *ngFor=\"let edge of edges$|async\">\n      <path class=\"edge\" [attr.d]=\"edge.path\" fill=\"none\" stroke=\"gray\" stroke-wodth=\"2px\"></path>\n    </g>\n    <g\n      *ngFor=\"let box of boxes$|async\"\n      [attr.fill]=\"box.color? box.color:'#d95989'\"\n      [attr.stroke]=\"box.color !== 'white' ? 'white' : 'black'\"\n      stroke-width=\"1px\"\n      transition=\"fill 0.2s\"\n    >\n      <rect\n        [attr.x]=\"box.x -(box.width/2)\"\n        [attr.y]=\"box.y - (box.height/2)\"\n        [attr.width]=\"box.width\"\n        [attr.height]=\"box.height\"\n        [attr.stroke]=\"box.red === true ? 'red' : box.yellow === true ? 'yellow' : box.green === true ? 'green' : 'black'\"\n        style=\"stroke-width:6\"\n      />\n      <ng-container *ngFor=\"let line of lines(box.label);let idx= index\">\n        <text\n          class=\"text\"\n          [attr.x]=\"box.x\"\n          [attr.y]=\"box.y - (box.height/2) + 30 +(30*idx)\"\n          dominant-baseline=\"middle\"\n          text-anchor=\"middle\"\n        >\n          {{ line }}\n        </text>\n      </ng-container>\n    </g>\n  </svg>\n</div>\n", styles: ["ajf-graph{width:100%;height:600px}ajf-graph .buttons{position:absolute;z-index:100}ajf-graph .wrapper{position:absolute;left:0;top:0;width:100%;height:600px;overflow:scroll}ajf-graph svg{display:block;cursor:move;height:600px}ajf-graph svg .edge{fill:none;stroke:gray;stroke-width:2px}\n"] }]
    }], () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], { nodes: [{
            type: Input
        }], graphElement: [{
            type: ViewChild,
            args: ['graph', { static: true }]
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfGraphComponent, { className: "AjfGraphComponent", filePath: "graph.ts", lineNumber: 85 }); })();

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
class AjfGraphModule {
    static { this.ɵfac = function AjfGraphModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfGraphModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfGraphModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfGraphModule, [{
        type: NgModule,
        args: [{
                declarations: [AjfGraphComponent],
                exports: [AjfGraphComponent],
                imports: [CommonModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfGraphModule, { declarations: [AjfGraphComponent], imports: [CommonModule], exports: [AjfGraphComponent] }); })();

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfGraphComponent, AjfGraphModule, Edge };
//# sourceMappingURL=ajf-core-graph.mjs.map
