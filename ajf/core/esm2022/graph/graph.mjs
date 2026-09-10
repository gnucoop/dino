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
import { ChangeDetectionStrategy, Component, Input, isDevMode, ViewChild, ViewEncapsulation, } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as dagre from 'dagre';
import * as svgPanZoom from 'svg-pan-zoom';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
export class Edge {
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
export class AjfGraphComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2dyYXBoL3NyYy9ncmFwaC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZ3JhcGgvc3JjL2dyYXBoLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBRVQsS0FBSyxFQUNMLFNBQVMsRUFHVCxTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDckMsT0FBTyxLQUFLLEtBQUssTUFBTSxPQUFPLENBQUM7QUFDL0IsT0FBTyxLQUFLLFVBQVUsTUFBTSxjQUFjLENBQUM7Ozs7OztJQ2xDdkMseUJBQXFDO0lBQ25DLDBCQUE0RjtJQUM5RixpQkFBSTs7O0lBRGlCLGNBQW9COzs7OztJQWlCdkMsNkJBQW1FO0lBQ2pFLCtCQU1DO0lBQ0MsWUFDRjtJQUFBLGlCQUFPOzs7Ozs7SUFOTCxjQUFnQjs7SUFLaEIsY0FDRjtJQURFLHdDQUNGOzs7O0lBeEJKLDRCQU1DO0lBQ0MsMEJBT0U7SUFDRixrR0FBbUU7SUFXckUsaUJBQUk7Ozs7O0lBbEJBLGNBQStCOztJQU9GLGNBQW9CO0lBQXBCLG9EQUFvQjs7QURrQnpELE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNwQixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBRXRCLE1BQU0sVUFBVSxHQUFHLENBQUUsVUFBa0IsQ0FBQyxPQUFPLElBQUksVUFBVSxDQUFzQixDQUFDO0FBb0JwRixNQUFNLE9BQU8sSUFBSTtJQUNmLFlBQW9CLE1BQWdCO1FBQWhCLFdBQU0sR0FBTixNQUFNLENBQVU7SUFBRyxDQUFDO0lBRXhDLElBQVcs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QWIsS0FBSztZQUM4QixZQUFZO2tCQUEvQyxTQUFTO21CQUFDLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7O2tGQUZ2QixpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBpc0Rldk1vZGUsXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWpmR3JhcGhOb2RlfSBmcm9tICcuL2dyYXBoLW5vZGUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0ICogYXMgZGFncmUgZnJvbSAnZGFncmUnO1xuaW1wb3J0ICogYXMgc3ZnUGFuWm9vbSBmcm9tICdzdmctcGFuLXpvb20nO1xuXG5jb25zdCBURVhUX0VORCA9IDIwO1xuY29uc3QgTElORV9IRUlHSFQgPSA0MDtcbmNvbnN0IEJPWF9XSURUSCA9IDE3MDtcblxuY29uc3QgU3ZnUGFuWm9vbSA9ICgoc3ZnUGFuWm9vbSBhcyBhbnkpLmRlZmF1bHQgfHwgc3ZnUGFuWm9vbSkgYXMgdHlwZW9mIHN2Z1Bhblpvb207XG5cbmludGVyZmFjZSBCb3gge1xuICBncmVlbjogYm9vbGVhbjtcbiAgaGVpZ2h0OiBudW1iZXI7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbiAgcmVkOiBib29sZWFuO1xuICB3aWR0aDogbnVtYmVyO1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgeWVsbG93OiBib29sZWFuO1xuICBjb2xvcj86IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIElQb2ludCB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgRWRnZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcG9pbnRzOiBJUG9pbnRbXSkge31cblxuICBwdWJsaWMgZ2V0IHBhdGgoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5wb2ludHMubGVuZ3RoIDwgMikge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBsZXQgcmVzdWx0ID0gJ00gJztcbiAgICB0aGlzLnBvaW50cy5mb3JFYWNoKHB0ID0+IHtcbiAgICAgIHJlc3VsdCArPSBgJHtwdC54fSAke3B0Lnl9IExgO1xuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQuc3Vic3RyKDAsIHJlc3VsdC5sZW5ndGggLSAyKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZ3JhcGgnLFxuICB0ZW1wbGF0ZVVybDogJ2dyYXBoLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZ3JhcGguc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmR3JhcGhDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoKSBub2Rlcz86IEFqZkdyYXBoTm9kZVtdO1xuICBAVmlld0NoaWxkKCdncmFwaCcsIHtzdGF0aWM6IHRydWV9KSBncmFwaEVsZW1lbnQhOiBFbGVtZW50UmVmO1xuICBib3hlcyQ6IEJlaGF2aW9yU3ViamVjdDxCb3hbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEJveFtdPihbXSk7XG4gIGVkZ2VzJDogQmVoYXZpb3JTdWJqZWN0PEVkZ2VbXT4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEVkZ2VbXT4oW10pO1xuICBncmFwaDogZGFncmUuZ3JhcGhsaWIuR3JhcGg8e30+ID0gbmV3IGRhZ3JlLmdyYXBobGliLkdyYXBoKCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLmdyYXBoLnNldEdyYXBoKHttYXJnaW54OiBCT1hfV0lEVEggLyAyLCBtYXJnaW55OiBMSU5FX0hFSUdIVH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGRhdGEgdW5hIHN0cmluZ2EgY3JlYSB1biBhcnJheSBkaSBzdHJpbmdoZSBpbiBiYXNlIGFkIHVuIFRFWFRfRU5EXG4gICAqIHNlIGxhIHJpcGFydGl6aW9uZSByaWNhZGUgYWxsJ2ludGVybm8gZGkgdW5hIHBhcm9sYSBzaGlmdGEgaWwgZGVsaW1pdGVyIGZpbm8gYSB0cm92YXJlIHVub1xuICAgKiBzcGF6aW8gYmlhbmNvLlxuICAgKi9cbiAgbGluZXModGV4dDogc3RyaW5nKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGxpbmVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHdoaWxlICh0ZXh0ICE9IG51bGwgJiYgdGV4dC5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgdGV4dEVuZCA9IFRFWFRfRU5EO1xuICAgICAgd2hpbGUgKHRleHRbdGV4dEVuZCAtIDFdICE9PSAnICcgJiYgdGV4dC5sZW5ndGggPiBURVhUX0VORCkge1xuICAgICAgICB0ZXh0RW5kLS07XG4gICAgICB9XG4gICAgICBjb25zdCBsaW5lID0gdGV4dC5zbGljZSgwLCB0ZXh0RW5kKTtcbiAgICAgIHRleHQgPSB0ZXh0LnNwbGl0KGxpbmUpWzFdO1xuICAgICAgbGluZXMucHVzaChsaW5lKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmVzO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubm9kZXMgIT0gbnVsbCkge1xuICAgICAgY29uc3Qgd2lkZ2V0Tm9kZXM6IEFqZkdyYXBoTm9kZVtdID0gdGhpcy5ub2RlcztcblxuICAgICAgd2lkZ2V0Tm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgdGhpcy5ncmFwaC5zZXROb2RlKG5vZGUuaWQsIHtcbiAgICAgICAgICB3aWR0aDogQk9YX1dJRFRILFxuICAgICAgICAgIGhlaWdodDogdGhpcy5fY2FsY3VsYXRlSGVpZ2h0KG5vZGUubGFiZWwpLFxuICAgICAgICAgIGxhYmVsOiBub2RlLmxhYmVsLFxuICAgICAgICAgIHJlZDogbm9kZS5yZWQsXG4gICAgICAgICAgeWVsbG93OiBub2RlLnllbGxvdyxcbiAgICAgICAgICBncmVlbjogbm9kZS5ncmVlbixcbiAgICAgICAgICBjb2xvcjogbm9kZS5jb2xvciB8fCB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobm9kZS5wYXJlbnRJZCAhPSBudWxsKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG5vZGUucGFyZW50SWQgPSBKU09OLnBhcnNlKG5vZGUucGFyZW50SWQgYXMgc3RyaW5nKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBpZiAoaXNEZXZNb2RlKCkpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHBhcmVudHM6IHN0cmluZ1tdID0gQXJyYXkuaXNBcnJheShub2RlLnBhcmVudElkKVxuICAgICAgICAgICAgPyBub2RlLnBhcmVudElkXG4gICAgICAgICAgICA6IFtub2RlLnBhcmVudElkIGFzIHN0cmluZ107XG4gICAgICAgICAgcGFyZW50cy5mb3JFYWNoKHBhcmVudCA9PiB7XG4gICAgICAgICAgICB0aGlzLmdyYXBoLnNldEVkZ2UoYCR7cGFyZW50fWAsIG5vZGUuaWQsIHt9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICB0cnkge1xuICAgICAgICBTdmdQYW5ab29tKHRoaXMuZ3JhcGhFbGVtZW50Lm5hdGl2ZUVsZW1lbnQsIHtjb250cm9sSWNvbnNFbmFibGVkOiB0cnVlfSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRhZ3JlLmxheW91dCh0aGlzLmdyYXBoKTtcbiAgICBjb25zdCBib3hlczogQm94W10gPSBbXTtcbiAgICB0aGlzLmdyYXBoLm5vZGVzKCkuZm9yRWFjaCgobm9kZUlkOiBhbnkpID0+IHtcbiAgICAgIGNvbnN0IG46IGFueSA9IHRoaXMuZ3JhcGgubm9kZShub2RlSWQpO1xuICAgICAgaWYgKG4pIHtcbiAgICAgICAgYm94ZXMucHVzaCh7Li4ubn0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuYm94ZXMkLm5leHQoYm94ZXMpO1xuICAgIGNvbnN0IGVkZ2VzOiBFZGdlW10gPSBbXTtcbiAgICB0aGlzLmdyYXBoLmVkZ2VzKCkuZm9yRWFjaCgoZWRnZTogYW55KSA9PiB7XG4gICAgICBlZGdlcy5wdXNoKG5ldyBFZGdlKHRoaXMuZ3JhcGguZWRnZShlZGdlKS5wb2ludHMpKTtcbiAgICB9KTtcbiAgICB0aGlzLmVkZ2VzJC5uZXh0KGVkZ2VzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZUhlaWdodCh0ZXh0OiBzdHJpbmcpOiBudW1iZXIge1xuICAgIGNvbnN0IGxpbmVzTGVuZ3RoID0gdGhpcy5saW5lcyh0ZXh0KS5sZW5ndGg7XG4gICAgaWYgKGxpbmVzTGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gTElORV9IRUlHSFQgKiAxLjU7XG4gICAgfVxuICAgIHJldHVybiBsaW5lc0xlbmd0aCAqIExJTkVfSEVJR0hUO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwid3JhcHBlclwiPlxuICA8c3ZnICNncmFwaCB2aWV3Qm94PVwiMCAwIDEwMDAgMjAwMFwiIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMCVcIj5cbiAgICA8ZyAqbmdGb3I9XCJsZXQgZWRnZSBvZiBlZGdlcyR8YXN5bmNcIj5cbiAgICAgIDxwYXRoIGNsYXNzPVwiZWRnZVwiIFthdHRyLmRdPVwiZWRnZS5wYXRoXCIgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCJncmF5XCIgc3Ryb2tlLXdvZHRoPVwiMnB4XCI+PC9wYXRoPlxuICAgIDwvZz5cbiAgICA8Z1xuICAgICAgKm5nRm9yPVwibGV0IGJveCBvZiBib3hlcyR8YXN5bmNcIlxuICAgICAgW2F0dHIuZmlsbF09XCJib3guY29sb3I/IGJveC5jb2xvcjonI2Q5NTk4OSdcIlxuICAgICAgW2F0dHIuc3Ryb2tlXT1cImJveC5jb2xvciAhPT0gJ3doaXRlJyA/ICd3aGl0ZScgOiAnYmxhY2snXCJcbiAgICAgIHN0cm9rZS13aWR0aD1cIjFweFwiXG4gICAgICB0cmFuc2l0aW9uPVwiZmlsbCAwLjJzXCJcbiAgICA+XG4gICAgICA8cmVjdFxuICAgICAgICBbYXR0ci54XT1cImJveC54IC0oYm94LndpZHRoLzIpXCJcbiAgICAgICAgW2F0dHIueV09XCJib3gueSAtIChib3guaGVpZ2h0LzIpXCJcbiAgICAgICAgW2F0dHIud2lkdGhdPVwiYm94LndpZHRoXCJcbiAgICAgICAgW2F0dHIuaGVpZ2h0XT1cImJveC5oZWlnaHRcIlxuICAgICAgICBbYXR0ci5zdHJva2VdPVwiYm94LnJlZCA9PT0gdHJ1ZSA/ICdyZWQnIDogYm94LnllbGxvdyA9PT0gdHJ1ZSA/ICd5ZWxsb3cnIDogYm94LmdyZWVuID09PSB0cnVlID8gJ2dyZWVuJyA6ICdibGFjaydcIlxuICAgICAgICBzdHlsZT1cInN0cm9rZS13aWR0aDo2XCJcbiAgICAgIC8+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBsaW5lIG9mIGxpbmVzKGJveC5sYWJlbCk7bGV0IGlkeD0gaW5kZXhcIj5cbiAgICAgICAgPHRleHRcbiAgICAgICAgICBjbGFzcz1cInRleHRcIlxuICAgICAgICAgIFthdHRyLnhdPVwiYm94LnhcIlxuICAgICAgICAgIFthdHRyLnldPVwiYm94LnkgLSAoYm94LmhlaWdodC8yKSArIDMwICsoMzAqaWR4KVwiXG4gICAgICAgICAgZG9taW5hbnQtYmFzZWxpbmU9XCJtaWRkbGVcIlxuICAgICAgICAgIHRleHQtYW5jaG9yPVwibWlkZGxlXCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IGxpbmUgfX1cbiAgICAgICAgPC90ZXh0PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9nPlxuICA8L3N2Zz5cbjwvZGl2PlxuIl19