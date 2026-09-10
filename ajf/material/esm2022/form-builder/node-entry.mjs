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
import { isContainerNode, isSlidesNode } from '@ajf/core/forms';
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, Input, ViewChildren, ViewEncapsulation, } from '@angular/core';
import { Subscription, of as obsOf } from 'rxjs';
import { AjfFbBranchLine } from './branch-line';
import { disableFieldDropPredicate, disableSlideDropPredicate, onDropProcess, } from './form-builder-utils';
import * as i0 from "@angular/core";
import * as i1 from "./form-builder-service";
import * as i2 from "@ajf/material/node-icon";
import * as i3 from "@angular/common";
import * as i4 from "@angular/cdk/drag-drop";
import * as i5 from "@angular/material/button";
import * as i6 from "@angular/material/card";
import * as i7 from "@angular/material/icon";
import * as i8 from "@angular/material/expansion";
import * as i9 from "./branch-line";
import * as i10 from "@ngneat/transloco";
const _c0 = a0 => ({ "ajf-title-row-error": a0 });
function AjfFbNodeEntry_ng_container_0_ng_template_1_ajf_fb_branch_line_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-fb-branch-line", 11);
} if (rf & 2) {
    const idx_r1 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("offset", idx_r1)("color", ctx_r1.branchColors[idx_r1]);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfFbNodeEntry_ng_container_0_ng_template_1_ajf_fb_branch_line_0_Template, 1, 2, "ajf-fb-branch-line", 10);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.realNodeEntry.children);
} }
function AjfFbNodeEntry_ng_container_0_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "div", 12);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵstyleProp("margin-left", ctx_r1.originLeftMargin)("border-color", ctx_r1.firstBranchColor);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_container_0_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_container_0_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "mat-card", 13);
    i0.ɵɵtemplate(2, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_container_0_ng_container_2_Template, 1, 0, "ng-container", 14)(3, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_container_0_ng_container_3_Template, 1, 0, "ng-container", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const cardTitle_r3 = i0.ɵɵreference(8);
    const cardContent_r4 = i0.ɵɵreference(10);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngTemplateOutlet", cardTitle_r3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", cardContent_r4);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_1_ng_container_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_1_ng_container_1_ng_container_1_Template, 1, 0, "ng-container", 14);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵnextContext(2);
    const slidePanel_r5 = i0.ɵɵreference(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", slidePanel_r5);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-card", 15);
    i0.ɵɵtemplate(1, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_1_ng_container_1_Template, 2, 1, "ng-container", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const fieldPanel_r6 = i0.ɵɵreference(6);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("cdkDragData", ctx_r1.realNodeEntry);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isSlide(ctx_r1.realNodeEntry.node))("ngIfElse", fieldPanel_r6);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-expansion-panel", 16);
    i0.ɵɵpipe(1, "async");
    i0.ɵɵlistener("opened", function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_Template_mat_expansion_panel_opened_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateExpandedStatus(true)); })("closed", function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_Template_mat_expansion_panel_closed_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.updateExpandedStatus(false)); });
    i0.ɵɵelementStart(2, "mat-expansion-panel-header");
    i0.ɵɵtemplate(3, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_ng_container_3_Template, 1, 0, "ng-container", 14);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_ng_container_4_Template, 1, 0, "ng-container", 14);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    i0.ɵɵnextContext();
    const cardTitle_r3 = i0.ɵɵreference(8);
    const cardContent_r4 = i0.ɵɵreference(10);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("expanded", i0.ɵɵpipeBind1(1, 3, ctx_r1.isExpanded()));
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngTemplateOutlet", cardTitle_r3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", cardContent_r4);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_5_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_5_ng_container_0_Template, 1, 0, "ng-container", 14)(1, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_5_ng_container_1_Template, 1, 0, "ng-container", 14);
} if (rf & 2) {
    i0.ɵɵnextContext();
    const cardTitle_r3 = i0.ɵɵreference(8);
    const cardContent_r4 = i0.ɵɵreference(10);
    i0.ɵɵproperty("ngTemplateOutlet", cardTitle_r3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngTemplateOutlet", cardContent_r4);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_7_span_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "span", 24);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("innerHTML", "Condition: (" + ctx_r1.realNodeEntry.node.visibility.condition + ")", i0.ɵɵsanitizeHtml);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17);
    i0.ɵɵelement(1, "ajf-node-icon", 18);
    i0.ɵɵtext(2, " \u00A0 ");
    i0.ɵɵelement(3, "span", 19);
    i0.ɵɵpipe(4, "transloco");
    i0.ɵɵtemplate(5, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_7_span_5_Template, 1, 1, "span", 20);
    i0.ɵɵelementStart(6, "span", 21)(7, "button", 22);
    i0.ɵɵpipe(8, "async");
    i0.ɵɵlistener("click", function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_7_Template_button_click_7_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.edit($event)); });
    i0.ɵɵelementStart(9, "mat-icon");
    i0.ɵɵtext(10, "edit");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "button", 23);
    i0.ɵɵlistener("click", function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_7_Template_button_click_11_listener($event) { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(3); return i0.ɵɵresetView(ctx_r1.delete($event)); });
    i0.ɵɵelementStart(12, "mat-icon");
    i0.ɵɵtext(13, "delete");
    i0.ɵɵelementEnd()()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngClass", i0.ɵɵpureFunction1(9, _c0, ctx_r1.isInvalid(ctx_r1.realNodeEntry.node)));
    i0.ɵɵadvance();
    i0.ɵɵproperty("node", ctx_r1.realNodeEntry.node);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("innerHTML", i0.ɵɵpipeBind1(4, 5, ctx_r1.realNodeEntry.node.label || ctx_r1.realNodeEntry.node.name), i0.ɵɵsanitizeHtml);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.realNodeEntry.node.visibility && (ctx_r1.realNodeEntry.node.visibility == null ? null : ctx_r1.realNodeEntry.node.visibility.condition) !== "true");
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", i0.ɵɵpipeBind1(8, 7, ctx_r1.currentEditedNode) === ctx_r1.nodeEntry);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_ajf_fb_node_entry_1_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ajf-fb-node-entry", 28);
    i0.ɵɵlistener("cdkDropListDropped", function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_ajf_fb_node_entry_1_Template_ajf_fb_node_entry_cdkDropListDropped_0_listener($event) { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.onDrop($event, true)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const contentEntry_r10 = ctx.$implicit;
    const isFirstChild_r11 = ctx.first;
    const idx_r12 = ctx.index;
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("id", ctx_r1.assignId())("level", ctx_r1.level + 1)("isFirst", isFirstChild_r11)("firstBranchColor", ctx_r1.branchColors[idx_r12])("nodeEntry", contentEntry_r10)("cdkDropListEnterPredicate", ctx_r1.disableSlideDrop);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_mat_card_2_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "mat-card", 29);
    i0.ɵɵlistener("cdkDropListDropped", function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_mat_card_2_Template_mat_card_cdkDropListDropped_0_listener($event) { i0.ɵɵrestoreView(_r13); const ctx_r1 = i0.ɵɵnextContext(5); return i0.ɵɵresetView(ctx_r1.onDrop($event, true)); });
    i0.ɵɵelementStart(1, "mat-card-title");
    i0.ɵɵtext(2, "Drop your fields here");
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵproperty("id", ctx_r1.assignId(true))("cdkDropListEnterPredicate", ctx_r1.disableSlideDrop);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div");
    i0.ɵɵtemplate(1, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_ajf_fb_node_entry_1_Template, 1, 6, "ajf-fb-node-entry", 26)(2, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_mat_card_2_Template, 3, 2, "mat-card", 27);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.realNodeEntry.content);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.realNodeEntry.content.length === 0);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_div_0_Template, 3, 2, "div", 25);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("ngIf", ctx_r1.hasContent);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_container_0_Template, 4, 2, "ng-container", 6)(1, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_1_Template, 2, 3, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor)(3, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_3_Template, 5, 5, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor)(5, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_5_Template, 2, 2, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor)(7, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_7_Template, 14, 11, "ng-template", null, 4, i0.ɵɵtemplateRefExtractor)(9, AjfFbNodeEntry_ng_container_0_ng_template_5_ng_template_9_Template, 1, 1, "ng-template", null, 5, i0.ɵɵtemplateRefExtractor);
} if (rf & 2) {
    const draggable_r14 = i0.ɵɵreference(2);
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.isDraggable)("ngIfElse", draggable_r14);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_6_ng_container_0_ajf_fb_node_entry_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "ajf-fb-node-entry", 32);
} if (rf & 2) {
    const ctx_r14 = i0.ɵɵnextContext();
    const childNodeEntry_r16 = ctx_r14.$implicit;
    const idx_r17 = ctx_r14.index;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵproperty("level", ctx_r1.level)("originOffset", idx_r17)("firstBranchColor", ctx_r1.branchColors[idx_r17])("nodeEntry", childNodeEntry_r16);
} }
function AjfFbNodeEntry_ng_container_0_ng_template_6_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFbNodeEntry_ng_container_0_ng_template_6_ng_container_0_ajf_fb_node_entry_1_Template, 1, 4, "ajf-fb-node-entry", 31);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.isLastNode());
} }
function AjfFbNodeEntry_ng_container_0_ng_template_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtemplate(0, AjfFbNodeEntry_ng_container_0_ng_template_6_ng_container_0_Template, 2, 1, "ng-container", 30);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵproperty("ngForOf", ctx_r1.realNodeEntry.children);
} }
function AjfFbNodeEntry_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFbNodeEntry_ng_container_0_ng_template_1_Template, 1, 1, "ng-template", 7);
    i0.ɵɵelementStart(2, "div", 8);
    i0.ɵɵpipe(3, "async");
    i0.ɵɵtemplate(4, AjfFbNodeEntry_ng_container_0_div_4_Template, 1, 4, "div", 9)(5, AjfFbNodeEntry_ng_container_0_ng_template_5_Template, 11, 2, "ng-template", 7);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(6, AjfFbNodeEntry_ng_container_0_ng_template_6_Template, 1, 1, "ng-template", 7);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isNodeEntry && !ctx_r1.isLastNode());
    i0.ɵɵadvance();
    i0.ɵɵclassProp("ajf-highlighted-formbuilder-node", i0.ɵɵpipeBind1(3, 6, ctx_r1.currentEditedNode) === ctx_r1.nodeEntry);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", !ctx_r1.isFirst);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isNodeEntry);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.isNodeEntry);
} }
function AjfFbNodeEntry_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 8)(1, "mat-card", 33);
    i0.ɵɵlistener("cdkDropListDropped", function AjfFbNodeEntry_ng_template_1_Template_mat_card_cdkDropListDropped_1_listener($event) { i0.ɵɵrestoreView(_r18); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onDrop($event)); });
    i0.ɵɵelementStart(2, "mat-card-title");
    i0.ɵɵtext(3, "Drop your slides here");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("cdkDropListEnterPredicate", ctx_r1.emptyAreaDropPredicate());
} }
const branchColors = [
    '#C62828', // RED
    '#4CAF50', // GREEN
    '#3F51B5', // INDIGO
    '#FFC107', // AMBER
    '#795548', // BROWN
];
export class AjfFbNodeEntry {
    get hasContent() {
        return this._hasContent;
    }
    get isFirst() {
        return this._isFirst;
    }
    set isFirst(isFirst) {
        this._isFirst = isFirst;
    }
    get isNodeEntry() {
        return this._isNodeEntry;
    }
    get nodeEntry() {
        return this._nodeEntry;
    }
    set nodeEntry(nodeEntry) {
        this._nodeEntry = nodeEntry;
        if (nodeEntry != null && nodeEntry.node !== void 0) {
            const ne = nodeEntry;
            this._isNodeEntry = true;
            const node = ne.node;
            this._hasContent = node != null && isContainerNode(node);
        }
        else {
            this._isNodeEntry = false;
            this._hasContent = false;
        }
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
    }
    get isDraggable() {
        return this._isDraggable;
    }
    set isDraggable(draggable) {
        this._isDraggable = draggable;
    }
    get realNodeEntry() {
        return this._nodeEntry;
    }
    get branchColors() {
        return this._branchColors;
    }
    get dropZones() {
        return this._dropZones;
    }
    get slideDropZones() {
        return this._slideDropZones;
    }
    get originOffset() {
        return this._originOffset;
    }
    set originOffset(originOffset) {
        this._originOffset = originOffset;
        this._originLeftMargin = `${this._originOffset * 4}px`;
    }
    get originLeftMargin() {
        return this._originLeftMargin;
    }
    get firstBranchColor() {
        return this._firstBranchColor;
    }
    set firstBranchColor(firstBranchColor) {
        const idx = branchColors.indexOf(firstBranchColor);
        if (idx > 0) {
            this._firstBranchColor = firstBranchColor;
            this._branchColors = branchColors.slice(idx).concat(branchColors.slice(0, idx));
        }
        else {
            this._firstBranchColor = branchColors[0];
            this._branchColors = branchColors.slice(0);
        }
    }
    get currentEditedNode() {
        return this._currentEditedNode;
    }
    constructor(_service) {
        this._service = _service;
        this._hasContent = false;
        this._isFirst = false;
        this._isNodeEntry = false;
        this._level = 0;
        this._isDraggable = true;
        this._branchColors = branchColors.slice(0);
        this._dropZones = ['fbdz-node'];
        this._slideDropZones = ['fbdz-slide'];
        this._originOffset = 0;
        this._originLeftMargin = '0';
        this._firstBranchColor = branchColors[0];
        this._branchLinesSubscription = Subscription.EMPTY;
        this._childEntriesSubscription = Subscription.EMPTY;
        this._currentEditedNode = this._service.editedNodeEntry;
    }
    onResize() { }
    edit(evt) {
        evt.stopPropagation();
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.editNodeEntry(this.nodeEntry);
    }
    delete(evt) {
        evt.stopPropagation();
        if (this.nodeEntry == null || !this.isNodeEntry) {
            return;
        }
        this._service.cancelNodeEntryEdit();
        this._service.deleteNodeEntry(this.nodeEntry);
    }
    isInvalid(node) {
        return !this._service.isNodeValid(node.name);
    }
    isLastNode() {
        if (!this.realNodeEntry || !this.realNodeEntry.children) {
            return false;
        }
        return !this.realNodeEntry.children[0].children;
    }
    isSlide(node) {
        return isSlidesNode(node);
    }
    isExpanded() {
        if (this._nodeEntry && 'node' in this._nodeEntry) {
            return this._service.getExpandedStatus(this._nodeEntry.node.name);
        }
        return obsOf(false);
    }
    ngAfterViewInit() {
        this.updateBranchHeights();
        this._childEntriesSubscription = this.childEntries.changes.subscribe(() => {
            this.updateBranchHeights();
        });
    }
    ngOnDestroy() {
        this._branchLinesSubscription.unsubscribe();
        this._childEntriesSubscription.unsubscribe();
    }
    /**
     * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
     * @param event The drop event.
     * @param content True if the current nodeEntry contains other nodeEntries.
     */
    onDrop(event, content = false) {
        if (this._nodeEntry == null) {
            return;
        }
        onDropProcess(event, this._service, this._nodeEntry, content);
    }
    /**
     * Assigns a progressive id to the dropList, to connect it to the FormBuilder source list.
     * @param empty True if the list is marked as empty.
     */
    assignId(empty = false) {
        return this._service.assignListId(this.realNodeEntry.node, empty);
    }
    disableSlideDrop(item) {
        return disableSlideDropPredicate(item);
    }
    disableFieldDrop(item) {
        return disableFieldDropPredicate(item);
    }
    emptyAreaDropPredicate() {
        return (item, _drop) => {
            if (this._level > 0) {
                return !item.data.isSlide;
            }
            return item.data.isSlide || false;
        };
    }
    updateBranchHeights(delay = 0) {
        setTimeout(() => {
            if (this.nodeEntry == null ||
                !this.isNodeEntry ||
                this.branchLines == null ||
                this.childEntries == null) {
                return;
            }
            const nodeEntry = this.nodeEntry;
            const branchLines = this.branchLines.toArray();
            const sliceIdx = nodeEntry.content != null ? nodeEntry.content.length : 0;
            const childEntries = this.childEntries.toArray().slice(sliceIdx);
            if (branchLines.length != childEntries.length) {
                return;
            }
            branchLines.forEach((bl, idx) => {
                const ce = childEntries[idx];
                bl.height = ce.nativeElement.offsetTop;
            });
        }, delay);
    }
    updateExpandedStatus(expanded) {
        if (this._nodeEntry && 'node' in this._nodeEntry) {
            this._service.updateExpandedStatus(this._nodeEntry.node.name, expanded);
            this.updateBranchHeights(400);
        }
    }
    static { this.ɵfac = function AjfFbNodeEntry_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFbNodeEntry)(i0.ɵɵdirectiveInject(i1.AjfFormBuilderService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFbNodeEntry, selectors: [["ajf-fb-node-entry"]], viewQuery: function AjfFbNodeEntry_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(AjfFbBranchLine, 5);
            i0.ɵɵviewQuery(AjfFbNodeEntry, 5, ElementRef);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.branchLines = _t);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.childEntries = _t);
        } }, hostBindings: function AjfFbNodeEntry_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("window.resize", function AjfFbNodeEntry_window_resize_HostBindingHandler() { return ctx.onResize(); });
        } }, inputs: { isFirst: "isFirst", nodeEntry: "nodeEntry", level: "level", isDraggable: "isDraggable", originOffset: "originOffset", firstBranchColor: "firstBranchColor" }, decls: 3, vars: 2, consts: [["rootEmpty", ""], ["draggable", ""], ["slidePanel", ""], ["fieldPanel", ""], ["cardTitle", ""], ["cardContent", ""], [4, "ngIf", "ngIfElse"], [3, "ngIf"], [1, "mat-card-container"], ["class", "ajf-origin-line", 3, "margin-left", "border-color", 4, "ngIf"], [3, "offset", "color", 4, "ngFor", "ngForOf"], [3, "offset", "color"], [1, "ajf-origin-line"], ["appearance", "outlined"], [4, "ngTemplateOutlet"], ["appearance", "outlined", "cdkDrag", "", 1, "ajf-draggable-box", 3, "cdkDragData"], [1, "mat-elevation-z", 3, "opened", "closed", "expanded"], [1, "ajf-title-row", 3, "ngClass"], [3, "node"], [1, "ajf-title", 3, "innerHTML"], ["class", "ajf-visibility-condition", 3, "innerHTML", 4, "ngIf"], [1, "ajf-actions"], ["mat-icon-button", "", 3, "click", "disabled"], ["mat-icon-button", "", 3, "click"], [1, "ajf-visibility-condition", 3, "innerHTML"], [4, "ngIf"], ["cdkDropList", "", "class", "ajf-fields-list", 3, "id", "level", "isFirst", "firstBranchColor", "nodeEntry", "cdkDropListEnterPredicate", "cdkDropListDropped", 4, "ngFor", "ngForOf"], ["appearance", "outlined", "class", "ajf-empty", "cdkDropList", "", 3, "id", "cdkDropListEnterPredicate", "cdkDropListDropped", 4, "ngIf"], ["cdkDropList", "", 1, "ajf-fields-list", 3, "cdkDropListDropped", "id", "level", "isFirst", "firstBranchColor", "nodeEntry", "cdkDropListEnterPredicate"], ["appearance", "outlined", "cdkDropList", "", 1, "ajf-empty", 3, "cdkDropListDropped", "id", "cdkDropListEnterPredicate"], [4, "ngFor", "ngForOf"], [3, "level", "originOffset", "firstBranchColor", "nodeEntry", 4, "ngIf"], [3, "level", "originOffset", "firstBranchColor", "nodeEntry"], ["appearance", "outlined", "cdkDropList", "", 1, "ajf-empty", 3, "cdkDropListDropped", "cdkDropListEnterPredicate"]], template: function AjfFbNodeEntry_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, AjfFbNodeEntry_ng_container_0_Template, 7, 8, "ng-container", 6)(1, AjfFbNodeEntry_ng_template_1_Template, 4, 1, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
        } if (rf & 2) {
            const rootEmpty_r19 = i0.ɵɵreference(2);
            i0.ɵɵproperty("ngIf", ctx.nodeEntry)("ngIfElse", rootEmpty_r19);
        } }, dependencies: [i2.AjfNodeIcon, i3.NgClass, i3.NgForOf, i3.NgIf, i3.NgTemplateOutlet, i4.CdkDropList, i4.CdkDrag, i5.MatIconButton, i6.MatCard, i6.MatCardTitle, i7.MatIcon, i8.MatExpansionPanel, i8.MatExpansionPanelHeader, i9.AjfFbBranchLine, AjfFbNodeEntry, i3.AsyncPipe, i10.TranslocoPipe], styles: ["ajf-fb-node-entry{display:block;position:relative}ajf-fb-node-entry .mat-card-container{position:relative}ajf-fb-node-entry .mat-card-container .ajf-origin-line{position:absolute;top:0;left:25px;width:25px;height:25px;border-bottom:2px solid;border-left:2px solid;border-bottom-left-radius:.5em}ajf-fb-node-entry .mat-card-container .mat-mdc-card{margin-left:50px;padding:.5em 1em}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row{display:flex;flex:1 1 auto;flex-direction:row wrap;align-items:center}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row>.ajf-title{flex:1 1 auto;max-width:25vw;margin-right:10px}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row>.ajf-visibility-condition{flex:1 1 auto;font-size:10px;color:color-mix(in srgb,currentColor 60%,transparent);max-height:100px;max-width:25vw;overflow:hidden;text-overflow:ellipsis}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row>.ajf-actions{flex:1 1 auto;display:flex;justify-content:flex-end;white-space:nowrap;justify-self:flex-end}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row-error{color:rgb(var(--palette-warn-500, 198 40 40))}ajf-fb-node-entry .mat-card-container .mat-mdc-card.ajf-empty{line-height:36px;border:2px dashed;box-shadow:none;box-sizing:border-box;text-align:center;color:color-mix(in srgb,currentColor 40%,transparent)}ajf-fb-node-entry .mat-card-container .mat-mdc-card.ajf-draggable-box{padding:5px;border-bottom:solid 1px color-mix(in srgb,currentColor 12%,transparent);border-right:solid 1px color-mix(in srgb,currentColor 12%,transparent);box-sizing:border-box;cursor:move;font-size:14px}ajf-fb-node-entry .mat-card-container.ajf-highlighted-formbuilder-node>.mat-mdc-card{outline:2px solid currentColor;outline-offset:-1px}ajf-fb-node-entry.ajf-fields-list{max-width:80%;min-height:60px;display:block;background:color-mix(in srgb,currentColor 4%,transparent);border-radius:4px;overflow:hidden}ajf-fb-node-entry .cdk-drag-placeholder{opacity:.4;min-height:60px;margin-left:50px;border:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:4px;background-color:color-mix(in srgb,currentColor 12%,transparent)}ajf-fb-node-entry .ajf-fields-list.cdk-drop-list-dragging .ajf-draggable-box:not(.cdk-drag-placeholder),ajf-fb-node-entry .cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFbNodeEntry, [{
        type: Component,
        args: [{ selector: 'ajf-fb-node-entry', host: { '(window.resize)': 'onResize()' }, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-container *ngIf=\"nodeEntry; else rootEmpty\">\n  <ng-template [ngIf]=\"isNodeEntry && !isLastNode()\">\n    <ajf-fb-branch-line\n      *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\"\n      [offset]=\"idx\"\n      [color]=\"branchColors[idx]\"\n    ></ajf-fb-branch-line>\n  </ng-template>\n\n  <div\n    class=\"mat-card-container\"\n    [class.ajf-highlighted-formbuilder-node]=\"(currentEditedNode|async) === nodeEntry\"\n  >\n    <div\n      *ngIf=\"!isFirst\"\n      class=\"ajf-origin-line\"\n      [style.margin-left]=\"originLeftMargin\"\n      [style.border-color]=\"firstBranchColor\"\n    ></div>\n    <ng-template [ngIf]=\"isNodeEntry\">\n      <ng-container *ngIf=\"!isDraggable; else draggable\">\n        <mat-card appearance=\"outlined\">\n          <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n          <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n        </mat-card>\n      </ng-container>\n\n      <ng-template #draggable>\n        <mat-card\n          appearance=\"outlined\"\n          cdkDrag\n          [cdkDragData]=\"realNodeEntry\"\n          class=\"ajf-draggable-box\"\n        >\n          <ng-container *ngIf=\"isSlide(realNodeEntry.node); else fieldPanel\">\n            <ng-container *ngTemplateOutlet=\"slidePanel\"></ng-container>\n          </ng-container>\n        </mat-card>\n      </ng-template>\n\n      <ng-template #slidePanel>\n        <mat-expansion-panel\n          [expanded]=\"isExpanded()|async\"\n          (opened)=\"updateExpandedStatus(true)\"\n          (closed)=\"updateExpandedStatus(false)\"\n          class=\"mat-elevation-z\"\n        >\n          <mat-expansion-panel-header>\n            <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n          </mat-expansion-panel-header>\n          <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n        </mat-expansion-panel>\n      </ng-template>\n\n      <ng-template #fieldPanel>\n        <ng-container *ngTemplateOutlet=\"cardTitle\"></ng-container>\n        <ng-container *ngTemplateOutlet=\"cardContent\"></ng-container>\n      </ng-template>\n\n      <ng-template #cardTitle>\n        <div class=\"ajf-title-row\" [ngClass]=\"{ 'ajf-title-row-error': isInvalid(realNodeEntry.node) }\">\n          <ajf-node-icon [node]=\"realNodeEntry.node\"></ajf-node-icon>\n          &nbsp;\n          <span\n            class=\"ajf-title\"\n            [innerHTML]=\"(realNodeEntry.node.label || realNodeEntry.node.name)  | transloco\"\n          ></span>\n          <span\n            *ngIf=\"realNodeEntry.node.visibility && realNodeEntry.node.visibility?.condition !== 'true'\"\n            class=\"ajf-visibility-condition\"\n            [innerHTML]=\"'Condition: (' + realNodeEntry.node.visibility.condition + ')'\"\n          >\n          </span>\n          <span class=\"ajf-actions\">\n            <button\n              [disabled]=\"(currentEditedNode|async) === nodeEntry\"\n              (click)=\"edit($event)\"\n              mat-icon-button\n            >\n              <mat-icon>edit</mat-icon>\n            </button>\n            <button (click)=\"delete($event)\" mat-icon-button>\n              <mat-icon>delete</mat-icon>\n            </button>\n          </span>\n        </div>\n      </ng-template>\n\n      <ng-template #cardContent>\n        <div *ngIf=\"hasContent\">\n          <ajf-fb-node-entry\n            cdkDropList\n            class=\"ajf-fields-list\"\n            *ngFor=\"let contentEntry of realNodeEntry.content; let isFirstChild = first; let idx = index\"\n            [id]=\"assignId()\"\n            [level]=\"level + 1\"\n            [isFirst]=\"isFirstChild\"\n            [firstBranchColor]=\"branchColors[idx]\"\n            [nodeEntry]=\"contentEntry\"\n            [cdkDropListEnterPredicate]=\"disableSlideDrop\"\n            (cdkDropListDropped)=\"onDrop($event, true)\"\n          ></ajf-fb-node-entry>\n          <mat-card\n            appearance=\"outlined\"\n            class=\"ajf-empty\"\n            *ngIf=\"realNodeEntry.content.length === 0\"\n            cdkDropList\n            [id]=\"assignId(true)\"\n            [cdkDropListEnterPredicate]=\"disableSlideDrop\"\n            (cdkDropListDropped)=\"onDrop($event, true)\"\n            ><mat-card-title>Drop your fields here</mat-card-title></mat-card\n          >\n        </div>\n      </ng-template>\n    </ng-template>\n  </div>\n\n  <ng-template [ngIf]=\"isNodeEntry\">\n    <ng-container *ngFor=\"let childNodeEntry of realNodeEntry.children; let idx = index\">\n      <ajf-fb-node-entry\n        *ngIf=\"!isLastNode()\"\n        [level]=\"level\"\n        [originOffset]=\"idx\"\n        [firstBranchColor]=\"branchColors[idx]\"\n        [nodeEntry]=\"childNodeEntry\"\n      ></ajf-fb-node-entry>\n    </ng-container>\n  </ng-template>\n</ng-container>\n\n<ng-template #rootEmpty>\n  <div class=\"mat-card-container\">\n    <mat-card\n      appearance=\"outlined\"\n      class=\"ajf-empty\"\n      cdkDropList\n      [cdkDropListEnterPredicate]=\"emptyAreaDropPredicate()\"\n      (cdkDropListDropped)=\"onDrop($event)\"\n      ><mat-card-title>Drop your slides here</mat-card-title>\n    </mat-card>\n  </div>\n</ng-template>\n", styles: ["ajf-fb-node-entry{display:block;position:relative}ajf-fb-node-entry .mat-card-container{position:relative}ajf-fb-node-entry .mat-card-container .ajf-origin-line{position:absolute;top:0;left:25px;width:25px;height:25px;border-bottom:2px solid;border-left:2px solid;border-bottom-left-radius:.5em}ajf-fb-node-entry .mat-card-container .mat-mdc-card{margin-left:50px;padding:.5em 1em}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row{display:flex;flex:1 1 auto;flex-direction:row wrap;align-items:center}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row>.ajf-title{flex:1 1 auto;max-width:25vw;margin-right:10px}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row>.ajf-visibility-condition{flex:1 1 auto;font-size:10px;color:color-mix(in srgb,currentColor 60%,transparent);max-height:100px;max-width:25vw;overflow:hidden;text-overflow:ellipsis}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row>.ajf-actions{flex:1 1 auto;display:flex;justify-content:flex-end;white-space:nowrap;justify-self:flex-end}ajf-fb-node-entry .mat-card-container .mat-mdc-card .ajf-title-row-error{color:rgb(var(--palette-warn-500, 198 40 40))}ajf-fb-node-entry .mat-card-container .mat-mdc-card.ajf-empty{line-height:36px;border:2px dashed;box-shadow:none;box-sizing:border-box;text-align:center;color:color-mix(in srgb,currentColor 40%,transparent)}ajf-fb-node-entry .mat-card-container .mat-mdc-card.ajf-draggable-box{padding:5px;border-bottom:solid 1px color-mix(in srgb,currentColor 12%,transparent);border-right:solid 1px color-mix(in srgb,currentColor 12%,transparent);box-sizing:border-box;cursor:move;font-size:14px}ajf-fb-node-entry .mat-card-container.ajf-highlighted-formbuilder-node>.mat-mdc-card{outline:2px solid currentColor;outline-offset:-1px}ajf-fb-node-entry.ajf-fields-list{max-width:80%;min-height:60px;display:block;background:color-mix(in srgb,currentColor 4%,transparent);border-radius:4px;overflow:hidden}ajf-fb-node-entry .cdk-drag-placeholder{opacity:.4;min-height:60px;margin-left:50px;border:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:4px;background-color:color-mix(in srgb,currentColor 12%,transparent)}ajf-fb-node-entry .ajf-fields-list.cdk-drop-list-dragging .ajf-draggable-box:not(.cdk-drag-placeholder),ajf-fb-node-entry .cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}\n"] }]
    }], () => [{ type: i1.AjfFormBuilderService }], { branchLines: [{
            type: ViewChildren,
            args: [AjfFbBranchLine]
        }], childEntries: [{
            type: ViewChildren,
            args: [forwardRef(() => AjfFbNodeEntry), { read: ElementRef }]
        }], isFirst: [{
            type: Input
        }], nodeEntry: [{
            type: Input
        }], level: [{
            type: Input
        }], isDraggable: [{
            type: Input
        }], originOffset: [{
            type: Input
        }], firstBranchColor: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFbNodeEntry, { className: "AjfFbNodeEntry", filePath: "node-entry.ts", lineNumber: 68 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1lbnRyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zcmMvbm9kZS1lbnRyeS50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL21hdGVyaWFsL2Zvcm0tYnVpbGRlci9zcmMvbm9kZS1lbnRyeS5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVSxlQUFlLEVBQUUsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFdkUsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFVBQVUsRUFDVixLQUFLLEVBR0wsWUFBWSxFQUNaLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFFLEVBQUUsSUFBSSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFFM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQU85QyxPQUFPLEVBQ0wseUJBQXlCLEVBQ3pCLHlCQUF5QixFQUN6QixhQUFhLEdBQ2QsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7SUMvQzFCLHlDQUlzQjs7OztJQURwQixBQURBLCtCQUFjLHNDQUNhOzs7SUFIN0IsMkhBSUM7OztJQUg0Qix1REFBMkI7OztJQVV4RCwwQkFLTzs7O0lBREwsQUFEQSxzREFBc0MseUNBQ0M7OztJQUtuQyx3QkFBMkQ7OztJQUMzRCx3QkFBNkQ7OztJQUhqRSw2QkFBbUQ7SUFDakQsb0NBQWdDO0lBRTlCLEFBREEsOEhBQTRDLGlIQUNFO0lBQ2hELGlCQUFXOzs7Ozs7SUFGTSxlQUEyQjtJQUEzQiwrQ0FBMkI7SUFDM0IsY0FBNkI7SUFBN0IsaURBQTZCOzs7SUFZMUMsd0JBQTREOzs7SUFEOUQsNkJBQW1FO0lBQ2pFLDRJQUE2Qzs7Ozs7SUFBOUIsY0FBNEI7SUFBNUIsZ0RBQTRCOzs7SUFQL0Msb0NBS0M7SUFDQyw0SEFBbUU7SUFHckUsaUJBQVc7Ozs7O0lBTlQsa0RBQTZCO0lBR2QsY0FBbUM7SUFBQSxBQUFuQyxnRUFBbUMsMkJBQWU7OztJQWMvRCx3QkFBMkQ7OztJQUU3RCx3QkFBNkQ7Ozs7SUFUL0QsK0NBS0M7O0lBRkMsQUFEQSwrTkFBVSw0QkFBcUIsSUFBSSxDQUFDLEtBQUMsa05BQzNCLDRCQUFxQixLQUFLLENBQUMsS0FBQztJQUd0QyxrREFBNEI7SUFDMUIsNkhBQTRDO0lBQzlDLGlCQUE2QjtJQUM3Qiw2SEFBOEM7SUFDaEQsaUJBQXNCOzs7Ozs7SUFUcEIsb0VBQStCO0lBTWQsZUFBMkI7SUFBM0IsK0NBQTJCO0lBRTdCLGNBQTZCO0lBQTdCLGlEQUE2Qjs7O0lBSzlDLHdCQUEyRDs7O0lBQzNELHdCQUE2RDs7O0lBQTdELEFBREEsNkhBQTRDLGdIQUNFOzs7OztJQUQvQiwrQ0FBMkI7SUFDM0IsY0FBNkI7SUFBN0IsaURBQTZCOzs7SUFXMUMsMkJBS087OztJQUZMLG9IQUE0RTs7OztJQVZoRiwrQkFBZ0c7SUFDOUYsb0NBQTJEO0lBQzNELHdCQUNBO0lBQUEsMkJBR1E7O0lBQ1IsNkdBSUM7SUFHQyxBQURGLGdDQUEwQixpQkFLdkI7O0lBRkMsc05BQVMsbUJBQVksS0FBQztJQUd0QixnQ0FBVTtJQUFBLHFCQUFJO0lBQ2hCLEFBRGdCLGlCQUFXLEVBQ2xCO0lBQ1QsbUNBQWlEO0lBQXpDLHVOQUFTLHFCQUFjLEtBQUM7SUFDOUIsaUNBQVU7SUFBQSx1QkFBTTtJQUd0QixBQURFLEFBREUsQUFEa0IsaUJBQVcsRUFDcEIsRUFDSixFQUNIOzs7SUF6QnFCLGlHQUFvRTtJQUM5RSxjQUEyQjtJQUEzQixnREFBMkI7SUFJeEMsZUFBZ0Y7SUFBaEYsc0lBQWdGO0lBRy9FLGVBQTBGO0lBQTFGLGdMQUEwRjtJQU96RixlQUFvRDtJQUFwRCw4RkFBb0Q7Ozs7SUFleEQsNkNBV0M7SUFEQyxxUkFBc0Isc0JBQWUsSUFBSSxDQUFDLEtBQUM7SUFDNUMsaUJBQW9COzs7Ozs7SUFGbkIsQUFEQSxBQURBLEFBREEsQUFEQSxBQURBLHNDQUFpQiwyQkFDRSw2QkFDSyxrREFDYywrQkFDWixzREFDb0I7Ozs7SUFHaEQsb0NBUUc7SUFERCxvUUFBc0Isc0JBQWUsSUFBSSxDQUFDLEtBQUM7SUFDMUMsc0NBQWdCO0lBQUEscUNBQXFCO0lBQWlCLEFBQWpCLGlCQUFpQixFQUN4RDs7O0lBSEMsQUFEQSwwQ0FBcUIsc0RBQ3lCOzs7SUFuQmxELDJCQUF3QjtJQWF0QixBQVpBLDZJQVdDLDhHQVNFO0lBRUwsaUJBQU07OztJQW5CdUIsY0FBMEI7SUFBMUIsc0RBQTBCO0lBWWxELGNBQXdDO0lBQXhDLGdFQUF3Qzs7O0lBaEI3QywyR0FBd0I7OztJQUFsQix3Q0FBZ0I7OztJQUR4QixBQTdCQSxBQUxBLEFBZEEsQUFiQSxBQVBBLDhHQUFtRCxnSUFPM0IsZ0lBYUMsZ0lBY0Esa0lBS0QsZ0lBNkJFOzs7O0lBcEVTLEFBQXBCLDBDQUFvQiwyQkFBYzs7O0lBbUdqRCx3Q0FNcUI7Ozs7OztJQURuQixBQURBLEFBREEsQUFEQSxvQ0FBZSx5QkFDSyxrREFDa0IsaUNBQ1Y7OztJQU5oQyw2QkFBcUY7SUFDbkYsd0lBTUM7Ozs7SUFMRSxjQUFtQjtJQUFuQiwyQ0FBbUI7OztJQUZ4QiwrR0FBcUY7OztJQUE1Qyx1REFBMkI7OztJQXRIeEUsNkJBQWdEO0lBQzlDLDhGQUFtRDtJQVFuRCw4QkFHQzs7SUFPQyxBQU5BLDhFQUtDLGtGQUNpQztJQWdHcEMsaUJBQU07SUFFTiw4RkFBa0M7Ozs7SUFwSHJCLGNBQXFDO0lBQXJDLGlFQUFxQztJQVVoRCxjQUFrRjtJQUFsRix1SEFBa0Y7SUFHL0UsZUFBYztJQUFkLHNDQUFjO0lBS0osY0FBb0I7SUFBcEIseUNBQW9CO0lBa0d0QixjQUFvQjtJQUFwQix5Q0FBb0I7Ozs7SUFlL0IsQUFERiw4QkFBZ0MsbUJBTzNCO0lBREQscU5BQXNCLHFCQUFjLEtBQUM7SUFDcEMsc0NBQWdCO0lBQUEscUNBQXFCO0lBRTFDLEFBREUsQUFEd0MsaUJBQWlCLEVBQzlDLEVBQ1A7OztJQUpGLGNBQXNEO0lBQXRELDJFQUFzRDs7QURyRjVELE1BQU0sWUFBWSxHQUFhO0lBQzdCLFNBQVMsRUFBRSxNQUFNO0lBQ2pCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLFNBQVMsRUFBRSxTQUFTO0lBQ3BCLFNBQVMsRUFBRSxRQUFRO0lBQ25CLFNBQVMsRUFBRSxRQUFRO0NBQ3BCLENBQUM7QUFVRixNQUFNLE9BQU8sY0FBYztJQU16QixJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQztJQUdELElBQUksT0FBTztRQUNULE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFDSSxPQUFPLENBQUMsT0FBZ0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFDMUIsQ0FBQztJQUdELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBR0QsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFDRCxJQUNJLFNBQVMsQ0FBQyxTQUF5QztRQUNyRCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztRQUM1QixJQUFJLFNBQVMsSUFBSSxJQUFJLElBQThCLFNBQVUsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQztZQUM5RSxNQUFNLEVBQUUsR0FBNEIsU0FBUyxDQUFDO1lBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQzNCLENBQUM7SUFDSCxDQUFDO0lBR0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxJQUNJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCxJQUFJLFdBQVc7UUFDYixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQztJQUNELElBQ0ksV0FBVyxDQUFDLFNBQWtCO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxJQUFJLGFBQWE7UUFDZixPQUFPLElBQUksQ0FBQyxVQUFxQyxDQUFDO0lBQ3BELENBQUM7SUFHRCxJQUFJLFlBQVk7UUFDZCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQztJQUdELElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDO0lBR0QsSUFBSSxjQUFjO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUM5QixDQUFDO0lBR0QsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFDRCxJQUNJLFlBQVksQ0FBQyxZQUFvQjtRQUNuQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUNsQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsR0FBRyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsSUFBSSxDQUFDO0lBQ3pELENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBR0QsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQUNELElBQ0ksZ0JBQWdCLENBQUMsZ0JBQXdCO1FBQzNDLE1BQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNuRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNaLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxnQkFBZ0IsQ0FBQztZQUMxQyxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDbEYsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsaUJBQWlCLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QyxDQUFDO0lBQ0gsQ0FBQztJQUdELElBQUksaUJBQWlCO1FBQ25CLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ2pDLENBQUM7SUFLRCxZQUFvQixRQUErQjtRQUEvQixhQUFRLEdBQVIsUUFBUSxDQUF1QjtRQS9HM0MsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFLcEIsYUFBUSxHQUFHLEtBQUssQ0FBQztRQVNqQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQXVCckIsV0FBTSxHQUFHLENBQUMsQ0FBQztRQVFYLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBYTdCLGtCQUFhLEdBQWEsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUtoRCxlQUFVLEdBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUtyQyxvQkFBZSxHQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFLM0Msa0JBQWEsR0FBRyxDQUFDLENBQUM7UUFTbEIsc0JBQWlCLEdBQUcsR0FBRyxDQUFDO1FBS3hCLHNCQUFpQixHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQXFCcEMsNkJBQXdCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDNUQsOEJBQXlCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFHbkUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDO0lBQzFELENBQUM7SUFFRCxRQUFRLEtBQVUsQ0FBQztJQUVuQixJQUFJLENBQUMsR0FBVTtRQUNiLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN0QixJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ2hELE9BQU87UUFDVCxDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQTBCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsTUFBTSxDQUFDLEdBQVU7UUFDZixHQUFHLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDdEIsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoRCxPQUFPO1FBQ1QsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBMEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFFRCxTQUFTLENBQUMsSUFBYTtRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ3hELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDbEQsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUFhO1FBQ25CLE9BQU8sWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDakQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFDRCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyx5QkFBeUIsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQ3hFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsd0JBQXdCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRDs7OztPQUlHO0lBQ0gsTUFBTSxDQUNKLEtBQXNGLEVBQ3RGLE9BQU8sR0FBRyxLQUFLO1FBRWYsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQzVCLE9BQU87UUFDVCxDQUFDO1FBQ0QsYUFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxRQUFpQixLQUFLO1FBQzdCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQTBDO1FBQ3pELE9BQU8seUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELGdCQUFnQixDQUFDLElBQTBDO1FBQ3pELE9BQU8seUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixPQUFPLENBQUMsSUFBYSxFQUFFLEtBQWtCLEVBQVcsRUFBRTtZQUNwRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUM1QixDQUFDO1lBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUM7UUFDcEMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUFtQixDQUFDLFFBQWdCLENBQUM7UUFDbkMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQ0UsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJO2dCQUN0QixDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUNqQixJQUFJLENBQUMsV0FBVyxJQUFJLElBQUk7Z0JBQ3hCLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxFQUN6QixDQUFDO2dCQUNELE9BQU87WUFDVCxDQUFDO1lBQ0QsTUFBTSxTQUFTLEdBQTRCLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDMUQsTUFBTSxXQUFXLEdBQXNCLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbEUsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUUsTUFBTSxZQUFZLEdBQWlCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRS9FLElBQUksV0FBVyxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzlDLE9BQU87WUFDVCxDQUFDO1lBRUQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQW1CLEVBQUUsR0FBVyxFQUFFLEVBQUU7Z0JBQ3ZELE1BQU0sRUFBRSxHQUFlLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekMsRUFBRSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQztZQUN6QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxRQUFpQjtRQUNwQyxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNqRCxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN4RSxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEMsQ0FBQztJQUNILENBQUM7K0dBcFBVLGNBQWM7b0VBQWQsY0FBYzsyQkFDWCxlQUFlOzJCQUNFLGNBQWMsS0FBVSxVQUFVOzs7Ozs7WUFGdEQsbUdBQUEsY0FBVSxJQUFJOztZQytEM0IsQUFsSUEsaUZBQWdELG1HQWtJeEI7OztZQWxJUSxBQUFqQixvQ0FBaUIsMkJBQWM7K1BEbUVqQyxjQUFjOztpRkFBZCxjQUFjO2NBUjFCLFNBQVM7MkJBQ0UsbUJBQW1CLFFBR3ZCLEVBQUMsaUJBQWlCLEVBQUUsWUFBWSxFQUFDLGlCQUN4QixpQkFBaUIsQ0FBQyxJQUFJLG1CQUNwQix1QkFBdUIsQ0FBQyxNQUFNO3NEQUdoQixXQUFXO2tCQUF6QyxZQUFZO21CQUFDLGVBQWU7WUFFN0IsWUFBWTtrQkFEWCxZQUFZO21CQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUM7WUFhOUQsT0FBTztrQkFEVixLQUFLO1lBZUYsU0FBUztrQkFEWixLQUFLO1lBbUJGLEtBQUs7a0JBRFIsS0FBSztZQVNGLFdBQVc7a0JBRGQsS0FBSztZQTZCRixZQUFZO2tCQURmLEtBQUs7WUFlRixnQkFBZ0I7a0JBRG5CLEtBQUs7O2tGQWhHSyxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZk5vZGUsIGlzQ29udGFpbmVyTm9kZSwgaXNTbGlkZXNOb2RlfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtDZGtEcmFnLCBDZGtEcmFnRHJvcCwgQ2RrRHJvcExpc3R9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGRyZW4sXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9uLCBvZiBhcyBvYnNPZn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmRmJCcmFuY2hMaW5lfSBmcm9tICcuL2JyYW5jaC1saW5lJztcbmltcG9ydCB7XG4gIEFqZkZvcm1CdWlsZGVyTm9kZSxcbiAgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnksXG4gIEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSxcbiAgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxufSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7XG4gIGRpc2FibGVGaWVsZERyb3BQcmVkaWNhdGUsXG4gIGRpc2FibGVTbGlkZURyb3BQcmVkaWNhdGUsXG4gIG9uRHJvcFByb2Nlc3MsXG59IGZyb20gJy4vZm9ybS1idWlsZGVyLXV0aWxzJztcblxuY29uc3QgYnJhbmNoQ29sb3JzOiBzdHJpbmdbXSA9IFtcbiAgJyNDNjI4MjgnLCAvLyBSRURcbiAgJyM0Q0FGNTAnLCAvLyBHUkVFTlxuICAnIzNGNTFCNScsIC8vIElORElHT1xuICAnI0ZGQzEwNycsIC8vIEFNQkVSXG4gICcjNzk1NTQ4JywgLy8gQlJPV05cbl07XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1mYi1ub2RlLWVudHJ5JyxcbiAgdGVtcGxhdGVVcmw6ICdub2RlLWVudHJ5Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnbm9kZS1lbnRyeS5zY3NzJ10sXG4gIGhvc3Q6IHsnKHdpbmRvdy5yZXNpemUpJzogJ29uUmVzaXplKCknfSxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZiTm9kZUVudHJ5IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZHJlbihBamZGYkJyYW5jaExpbmUpIGJyYW5jaExpbmVzITogUXVlcnlMaXN0PEFqZkZiQnJhbmNoTGluZT47XG4gIEBWaWV3Q2hpbGRyZW4oZm9yd2FyZFJlZigoKSA9PiBBamZGYk5vZGVFbnRyeSksIHtyZWFkOiBFbGVtZW50UmVmfSlcbiAgY2hpbGRFbnRyaWVzITogUXVlcnlMaXN0PEVsZW1lbnRSZWY+O1xuXG4gIHByaXZhdGUgX2hhc0NvbnRlbnQgPSBmYWxzZTtcbiAgZ2V0IGhhc0NvbnRlbnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0NvbnRlbnQ7XG4gIH1cblxuICBwcml2YXRlIF9pc0ZpcnN0ID0gZmFsc2U7XG4gIGdldCBpc0ZpcnN0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc0ZpcnN0O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpc0ZpcnN0KGlzRmlyc3Q6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc0ZpcnN0ID0gaXNGaXJzdDtcbiAgfVxuXG4gIHByaXZhdGUgX2lzTm9kZUVudHJ5ID0gZmFsc2U7XG4gIGdldCBpc05vZGVFbnRyeSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNOb2RlRW50cnk7XG4gIH1cblxuICBwcml2YXRlIF9ub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZSB8IHVuZGVmaW5lZDtcbiAgZ2V0IG5vZGVFbnRyeSgpOiBBamZGb3JtQnVpbGRlck5vZGUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cnk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG5vZGVFbnRyeShub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZSB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX25vZGVFbnRyeSA9IG5vZGVFbnRyeTtcbiAgICBpZiAobm9kZUVudHJ5ICE9IG51bGwgJiYgKDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT5ub2RlRW50cnkpLm5vZGUgIT09IHZvaWQgMCkge1xuICAgICAgY29uc3QgbmUgPSA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+bm9kZUVudHJ5O1xuICAgICAgdGhpcy5faXNOb2RlRW50cnkgPSB0cnVlO1xuICAgICAgY29uc3Qgbm9kZSA9IG5lLm5vZGU7XG4gICAgICB0aGlzLl9oYXNDb250ZW50ID0gbm9kZSAhPSBudWxsICYmIGlzQ29udGFpbmVyTm9kZShub2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5faXNOb2RlRW50cnkgPSBmYWxzZTtcbiAgICAgIHRoaXMuX2hhc0NvbnRlbnQgPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9sZXZlbCA9IDA7XG4gIGdldCBsZXZlbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9sZXZlbDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbGV2ZWwodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2xldmVsID0gdmFsdWU7XG4gIH1cbiAgcHJpdmF0ZSBfaXNEcmFnZ2FibGU6IGJvb2xlYW4gPSB0cnVlO1xuICBnZXQgaXNEcmFnZ2FibGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzRHJhZ2dhYmxlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBpc0RyYWdnYWJsZShkcmFnZ2FibGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc0RyYWdnYWJsZSA9IGRyYWdnYWJsZTtcbiAgfVxuXG4gIGdldCByZWFsTm9kZUVudHJ5KCk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJ5IGFzIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5O1xuICB9XG5cbiAgcHJpdmF0ZSBfYnJhbmNoQ29sb3JzOiBzdHJpbmdbXSA9IGJyYW5jaENvbG9ycy5zbGljZSgwKTtcbiAgZ2V0IGJyYW5jaENvbG9ycygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2JyYW5jaENvbG9ycztcbiAgfVxuXG4gIHByaXZhdGUgX2Ryb3Bab25lczogc3RyaW5nW10gPSBbJ2ZiZHotbm9kZSddO1xuICBnZXQgZHJvcFpvbmVzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZHJvcFpvbmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVEcm9wWm9uZXM6IHN0cmluZ1tdID0gWydmYmR6LXNsaWRlJ107XG4gIGdldCBzbGlkZURyb3Bab25lcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NsaWRlRHJvcFpvbmVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3JpZ2luT2Zmc2V0ID0gMDtcbiAgZ2V0IG9yaWdpbk9mZnNldCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW5PZmZzZXQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG9yaWdpbk9mZnNldChvcmlnaW5PZmZzZXQ6IG51bWJlcikge1xuICAgIHRoaXMuX29yaWdpbk9mZnNldCA9IG9yaWdpbk9mZnNldDtcbiAgICB0aGlzLl9vcmlnaW5MZWZ0TWFyZ2luID0gYCR7dGhpcy5fb3JpZ2luT2Zmc2V0ICogNH1weGA7XG4gIH1cbiAgcHJpdmF0ZSBfb3JpZ2luTGVmdE1hcmdpbiA9ICcwJztcbiAgZ2V0IG9yaWdpbkxlZnRNYXJnaW4oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZ2luTGVmdE1hcmdpbjtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpcnN0QnJhbmNoQ29sb3IgPSBicmFuY2hDb2xvcnNbMF07XG4gIGdldCBmaXJzdEJyYW5jaENvbG9yKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3I7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZpcnN0QnJhbmNoQ29sb3IoZmlyc3RCcmFuY2hDb2xvcjogc3RyaW5nKSB7XG4gICAgY29uc3QgaWR4ID0gYnJhbmNoQ29sb3JzLmluZGV4T2YoZmlyc3RCcmFuY2hDb2xvcik7XG4gICAgaWYgKGlkeCA+IDApIHtcbiAgICAgIHRoaXMuX2ZpcnN0QnJhbmNoQ29sb3IgPSBmaXJzdEJyYW5jaENvbG9yO1xuICAgICAgdGhpcy5fYnJhbmNoQ29sb3JzID0gYnJhbmNoQ29sb3JzLnNsaWNlKGlkeCkuY29uY2F0KGJyYW5jaENvbG9ycy5zbGljZSgwLCBpZHgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmlyc3RCcmFuY2hDb2xvciA9IGJyYW5jaENvbG9yc1swXTtcbiAgICAgIHRoaXMuX2JyYW5jaENvbG9ycyA9IGJyYW5jaENvbG9ycy5zbGljZSgwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jdXJyZW50RWRpdGVkTm9kZTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+O1xuICBnZXQgY3VycmVudEVkaXRlZE5vZGUoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEVkaXRlZE5vZGU7XG4gIH1cblxuICBwcml2YXRlIF9icmFuY2hMaW5lc1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9jaGlsZEVudHJpZXNTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zZXJ2aWNlOiBBamZGb3JtQnVpbGRlclNlcnZpY2UpIHtcbiAgICB0aGlzLl9jdXJyZW50RWRpdGVkTm9kZSA9IHRoaXMuX3NlcnZpY2UuZWRpdGVkTm9kZUVudHJ5O1xuICB9XG5cbiAgb25SZXNpemUoKTogdm9pZCB7fVxuXG4gIGVkaXQoZXZ0OiBFdmVudCk6IHZvaWQge1xuICAgIGV2dC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodGhpcy5ub2RlRW50cnkgPT0gbnVsbCB8fCAhdGhpcy5pc05vZGVFbnRyeSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXJ2aWNlLmVkaXROb2RlRW50cnkoPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnRoaXMubm9kZUVudHJ5KTtcbiAgfVxuXG4gIGRlbGV0ZShldnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgZXZ0LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGlmICh0aGlzLm5vZGVFbnRyeSA9PSBudWxsIHx8ICF0aGlzLmlzTm9kZUVudHJ5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3NlcnZpY2UuY2FuY2VsTm9kZUVudHJ5RWRpdCgpO1xuICAgIHRoaXMuX3NlcnZpY2UuZGVsZXRlTm9kZUVudHJ5KDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT50aGlzLm5vZGVFbnRyeSk7XG4gIH1cblxuICBpc0ludmFsaWQobm9kZTogQWpmTm9kZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5fc2VydmljZS5pc05vZGVWYWxpZChub2RlLm5hbWUpO1xuICB9XG5cbiAgaXNMYXN0Tm9kZSgpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMucmVhbE5vZGVFbnRyeSB8fCAhdGhpcy5yZWFsTm9kZUVudHJ5LmNoaWxkcmVuKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiAhdGhpcy5yZWFsTm9kZUVudHJ5LmNoaWxkcmVuWzBdLmNoaWxkcmVuO1xuICB9XG5cbiAgaXNTbGlkZShub2RlOiBBamZOb2RlKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzU2xpZGVzTm9kZShub2RlKTtcbiAgfVxuXG4gIGlzRXhwYW5kZWQoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgaWYgKHRoaXMuX25vZGVFbnRyeSAmJiAnbm9kZScgaW4gdGhpcy5fbm9kZUVudHJ5KSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VydmljZS5nZXRFeHBhbmRlZFN0YXR1cyh0aGlzLl9ub2RlRW50cnkubm9kZS5uYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIG9ic09mKGZhbHNlKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUJyYW5jaEhlaWdodHMoKTtcbiAgICB0aGlzLl9jaGlsZEVudHJpZXNTdWJzY3JpcHRpb24gPSB0aGlzLmNoaWxkRW50cmllcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUJyYW5jaEhlaWdodHMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX2JyYW5jaExpbmVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fY2hpbGRFbnRyaWVzU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgd2hlbiBhIGZpZWxkIG9yIHNsaWRlIG5vZGUgaXMgbW92ZWQgb3IgaW5zZXJ0ZWQgYnkgZHJhZyZkcm9wcGluZyBpbiB0aGUgZm9ybWJ1aWxkZXIuXG4gICAqIEBwYXJhbSBldmVudCBUaGUgZHJvcCBldmVudC5cbiAgICogQHBhcmFtIGNvbnRlbnQgVHJ1ZSBpZiB0aGUgY3VycmVudCBub2RlRW50cnkgY29udGFpbnMgb3RoZXIgbm9kZUVudHJpZXMuXG4gICAqL1xuICBvbkRyb3AoXG4gICAgZXZlbnQ6IENka0RyYWdEcm9wPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PiB8IENka0RyYWdEcm9wPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT4sXG4gICAgY29udGVudCA9IGZhbHNlLFxuICApOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fbm9kZUVudHJ5ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25Ecm9wUHJvY2VzcyhldmVudCwgdGhpcy5fc2VydmljZSwgdGhpcy5fbm9kZUVudHJ5LCBjb250ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBc3NpZ25zIGEgcHJvZ3Jlc3NpdmUgaWQgdG8gdGhlIGRyb3BMaXN0LCB0byBjb25uZWN0IGl0IHRvIHRoZSBGb3JtQnVpbGRlciBzb3VyY2UgbGlzdC5cbiAgICogQHBhcmFtIGVtcHR5IFRydWUgaWYgdGhlIGxpc3QgaXMgbWFya2VkIGFzIGVtcHR5LlxuICAgKi9cbiAgYXNzaWduSWQoZW1wdHk6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3NlcnZpY2UuYXNzaWduTGlzdElkKHRoaXMucmVhbE5vZGVFbnRyeS5ub2RlLCBlbXB0eSk7XG4gIH1cblxuICBkaXNhYmxlU2xpZGVEcm9wKGl0ZW06IENka0RyYWc8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5Pik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBkaXNhYmxlU2xpZGVEcm9wUHJlZGljYXRlKGl0ZW0pO1xuICB9XG5cbiAgZGlzYWJsZUZpZWxkRHJvcChpdGVtOiBDZGtEcmFnPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGlzYWJsZUZpZWxkRHJvcFByZWRpY2F0ZShpdGVtKTtcbiAgfVxuXG4gIGVtcHR5QXJlYURyb3BQcmVkaWNhdGUoKTogKGl0ZW06IENka0RyYWcsIF9kcm9wOiBDZGtEcm9wTGlzdCkgPT4gYm9vbGVhbiB7XG4gICAgcmV0dXJuIChpdGVtOiBDZGtEcmFnLCBfZHJvcDogQ2RrRHJvcExpc3QpOiBib29sZWFuID0+IHtcbiAgICAgIGlmICh0aGlzLl9sZXZlbCA+IDApIHtcbiAgICAgICAgcmV0dXJuICFpdGVtLmRhdGEuaXNTbGlkZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpdGVtLmRhdGEuaXNTbGlkZSB8fCBmYWxzZTtcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlQnJhbmNoSGVpZ2h0cyhkZWxheTogbnVtYmVyID0gMCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLm5vZGVFbnRyeSA9PSBudWxsIHx8XG4gICAgICAgICF0aGlzLmlzTm9kZUVudHJ5IHx8XG4gICAgICAgIHRoaXMuYnJhbmNoTGluZXMgPT0gbnVsbCB8fFxuICAgICAgICB0aGlzLmNoaWxkRW50cmllcyA9PSBudWxsXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgbm9kZUVudHJ5ID0gPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PnRoaXMubm9kZUVudHJ5O1xuICAgICAgY29uc3QgYnJhbmNoTGluZXM6IEFqZkZiQnJhbmNoTGluZVtdID0gdGhpcy5icmFuY2hMaW5lcy50b0FycmF5KCk7XG4gICAgICBjb25zdCBzbGljZUlkeCA9IG5vZGVFbnRyeS5jb250ZW50ICE9IG51bGwgPyBub2RlRW50cnkuY29udGVudC5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgY2hpbGRFbnRyaWVzOiBFbGVtZW50UmVmW10gPSB0aGlzLmNoaWxkRW50cmllcy50b0FycmF5KCkuc2xpY2Uoc2xpY2VJZHgpO1xuXG4gICAgICBpZiAoYnJhbmNoTGluZXMubGVuZ3RoICE9IGNoaWxkRW50cmllcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBicmFuY2hMaW5lcy5mb3JFYWNoKChibDogQWpmRmJCcmFuY2hMaW5lLCBpZHg6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBjZTogRWxlbWVudFJlZiA9IGNoaWxkRW50cmllc1tpZHhdO1xuICAgICAgICBibC5oZWlnaHQgPSBjZS5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcDtcbiAgICAgIH0pO1xuICAgIH0sIGRlbGF5KTtcbiAgfVxuXG4gIHVwZGF0ZUV4cGFuZGVkU3RhdHVzKGV4cGFuZGVkOiBib29sZWFuKSB7XG4gICAgaWYgKHRoaXMuX25vZGVFbnRyeSAmJiAnbm9kZScgaW4gdGhpcy5fbm9kZUVudHJ5KSB7XG4gICAgICB0aGlzLl9zZXJ2aWNlLnVwZGF0ZUV4cGFuZGVkU3RhdHVzKHRoaXMuX25vZGVFbnRyeS5ub2RlLm5hbWUsIGV4cGFuZGVkKTtcbiAgICAgIHRoaXMudXBkYXRlQnJhbmNoSGVpZ2h0cyg0MDApO1xuICAgIH1cbiAgfVxufVxuIiwiPG5nLWNvbnRhaW5lciAqbmdJZj1cIm5vZGVFbnRyeTsgZWxzZSByb290RW1wdHlcIj5cbiAgPG5nLXRlbXBsYXRlIFtuZ0lmXT1cImlzTm9kZUVudHJ5ICYmICFpc0xhc3ROb2RlKClcIj5cbiAgICA8YWpmLWZiLWJyYW5jaC1saW5lXG4gICAgICAqbmdGb3I9XCJsZXQgY2hpbGROb2RlRW50cnkgb2YgcmVhbE5vZGVFbnRyeS5jaGlsZHJlbjsgbGV0IGlkeCA9IGluZGV4XCJcbiAgICAgIFtvZmZzZXRdPVwiaWR4XCJcbiAgICAgIFtjb2xvcl09XCJicmFuY2hDb2xvcnNbaWR4XVwiXG4gICAgPjwvYWpmLWZiLWJyYW5jaC1saW5lPlxuICA8L25nLXRlbXBsYXRlPlxuXG4gIDxkaXZcbiAgICBjbGFzcz1cIm1hdC1jYXJkLWNvbnRhaW5lclwiXG4gICAgW2NsYXNzLmFqZi1oaWdobGlnaHRlZC1mb3JtYnVpbGRlci1ub2RlXT1cIihjdXJyZW50RWRpdGVkTm9kZXxhc3luYykgPT09IG5vZGVFbnRyeVwiXG4gID5cbiAgICA8ZGl2XG4gICAgICAqbmdJZj1cIiFpc0ZpcnN0XCJcbiAgICAgIGNsYXNzPVwiYWpmLW9yaWdpbi1saW5lXCJcbiAgICAgIFtzdHlsZS5tYXJnaW4tbGVmdF09XCJvcmlnaW5MZWZ0TWFyZ2luXCJcbiAgICAgIFtzdHlsZS5ib3JkZXItY29sb3JdPVwiZmlyc3RCcmFuY2hDb2xvclwiXG4gICAgPjwvZGl2PlxuICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc05vZGVFbnRyeVwiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFpc0RyYWdnYWJsZTsgZWxzZSBkcmFnZ2FibGVcIj5cbiAgICAgICAgPG1hdC1jYXJkIGFwcGVhcmFuY2U9XCJvdXRsaW5lZFwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjYXJkVGl0bGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FyZENvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tYXQtY2FyZD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgICA8bmctdGVtcGxhdGUgI2RyYWdnYWJsZT5cbiAgICAgICAgPG1hdC1jYXJkXG4gICAgICAgICAgYXBwZWFyYW5jZT1cIm91dGxpbmVkXCJcbiAgICAgICAgICBjZGtEcmFnXG4gICAgICAgICAgW2Nka0RyYWdEYXRhXT1cInJlYWxOb2RlRW50cnlcIlxuICAgICAgICAgIGNsYXNzPVwiYWpmLWRyYWdnYWJsZS1ib3hcIlxuICAgICAgICA+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzU2xpZGUocmVhbE5vZGVFbnRyeS5ub2RlKTsgZWxzZSBmaWVsZFBhbmVsXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwic2xpZGVQYW5lbFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L21hdC1jYXJkPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPG5nLXRlbXBsYXRlICNzbGlkZVBhbmVsPlxuICAgICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbFxuICAgICAgICAgIFtleHBhbmRlZF09XCJpc0V4cGFuZGVkKCl8YXN5bmNcIlxuICAgICAgICAgIChvcGVuZWQpPVwidXBkYXRlRXhwYW5kZWRTdGF0dXModHJ1ZSlcIlxuICAgICAgICAgIChjbG9zZWQpPVwidXBkYXRlRXhwYW5kZWRTdGF0dXMoZmFsc2UpXCJcbiAgICAgICAgICBjbGFzcz1cIm1hdC1lbGV2YXRpb24telwiXG4gICAgICAgID5cbiAgICAgICAgICA8bWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FyZFRpdGxlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FyZENvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9tYXQtZXhwYW5zaW9uLXBhbmVsPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPG5nLXRlbXBsYXRlICNmaWVsZFBhbmVsPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FyZFRpdGxlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjYXJkQ29udGVudFwiPjwvbmctY29udGFpbmVyPlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPG5nLXRlbXBsYXRlICNjYXJkVGl0bGU+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtdGl0bGUtcm93XCIgW25nQ2xhc3NdPVwieyAnYWpmLXRpdGxlLXJvdy1lcnJvcic6IGlzSW52YWxpZChyZWFsTm9kZUVudHJ5Lm5vZGUpIH1cIj5cbiAgICAgICAgICA8YWpmLW5vZGUtaWNvbiBbbm9kZV09XCJyZWFsTm9kZUVudHJ5Lm5vZGVcIj48L2FqZi1ub2RlLWljb24+XG4gICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIGNsYXNzPVwiYWpmLXRpdGxlXCJcbiAgICAgICAgICAgIFtpbm5lckhUTUxdPVwiKHJlYWxOb2RlRW50cnkubm9kZS5sYWJlbCB8fCByZWFsTm9kZUVudHJ5Lm5vZGUubmFtZSkgIHwgdHJhbnNsb2NvXCJcbiAgICAgICAgICA+PC9zcGFuPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAqbmdJZj1cInJlYWxOb2RlRW50cnkubm9kZS52aXNpYmlsaXR5ICYmIHJlYWxOb2RlRW50cnkubm9kZS52aXNpYmlsaXR5Py5jb25kaXRpb24gIT09ICd0cnVlJ1wiXG4gICAgICAgICAgICBjbGFzcz1cImFqZi12aXNpYmlsaXR5LWNvbmRpdGlvblwiXG4gICAgICAgICAgICBbaW5uZXJIVE1MXT1cIidDb25kaXRpb246ICgnICsgcmVhbE5vZGVFbnRyeS5ub2RlLnZpc2liaWxpdHkuY29uZGl0aW9uICsgJyknXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWpmLWFjdGlvbnNcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgW2Rpc2FibGVkXT1cIihjdXJyZW50RWRpdGVkTm9kZXxhc3luYykgPT09IG5vZGVFbnRyeVwiXG4gICAgICAgICAgICAgIChjbGljayk9XCJlZGl0KCRldmVudClcIlxuICAgICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPG1hdC1pY29uPmVkaXQ8L21hdC1pY29uPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIChjbGljayk9XCJkZWxldGUoJGV2ZW50KVwiIG1hdC1pY29uLWJ1dHRvbj5cbiAgICAgICAgICAgICAgPG1hdC1pY29uPmRlbGV0ZTwvbWF0LWljb24+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgPG5nLXRlbXBsYXRlICNjYXJkQ29udGVudD5cbiAgICAgICAgPGRpdiAqbmdJZj1cImhhc0NvbnRlbnRcIj5cbiAgICAgICAgICA8YWpmLWZiLW5vZGUtZW50cnlcbiAgICAgICAgICAgIGNka0Ryb3BMaXN0XG4gICAgICAgICAgICBjbGFzcz1cImFqZi1maWVsZHMtbGlzdFwiXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgY29udGVudEVudHJ5IG9mIHJlYWxOb2RlRW50cnkuY29udGVudDsgbGV0IGlzRmlyc3RDaGlsZCA9IGZpcnN0OyBsZXQgaWR4ID0gaW5kZXhcIlxuICAgICAgICAgICAgW2lkXT1cImFzc2lnbklkKClcIlxuICAgICAgICAgICAgW2xldmVsXT1cImxldmVsICsgMVwiXG4gICAgICAgICAgICBbaXNGaXJzdF09XCJpc0ZpcnN0Q2hpbGRcIlxuICAgICAgICAgICAgW2ZpcnN0QnJhbmNoQ29sb3JdPVwiYnJhbmNoQ29sb3JzW2lkeF1cIlxuICAgICAgICAgICAgW25vZGVFbnRyeV09XCJjb250ZW50RW50cnlcIlxuICAgICAgICAgICAgW2Nka0Ryb3BMaXN0RW50ZXJQcmVkaWNhdGVdPVwiZGlzYWJsZVNsaWRlRHJvcFwiXG4gICAgICAgICAgICAoY2RrRHJvcExpc3REcm9wcGVkKT1cIm9uRHJvcCgkZXZlbnQsIHRydWUpXCJcbiAgICAgICAgICA+PC9hamYtZmItbm9kZS1lbnRyeT5cbiAgICAgICAgICA8bWF0LWNhcmRcbiAgICAgICAgICAgIGFwcGVhcmFuY2U9XCJvdXRsaW5lZFwiXG4gICAgICAgICAgICBjbGFzcz1cImFqZi1lbXB0eVwiXG4gICAgICAgICAgICAqbmdJZj1cInJlYWxOb2RlRW50cnkuY29udGVudC5sZW5ndGggPT09IDBcIlxuICAgICAgICAgICAgY2RrRHJvcExpc3RcbiAgICAgICAgICAgIFtpZF09XCJhc3NpZ25JZCh0cnVlKVwiXG4gICAgICAgICAgICBbY2RrRHJvcExpc3RFbnRlclByZWRpY2F0ZV09XCJkaXNhYmxlU2xpZGVEcm9wXCJcbiAgICAgICAgICAgIChjZGtEcm9wTGlzdERyb3BwZWQpPVwib25Ecm9wKCRldmVudCwgdHJ1ZSlcIlxuICAgICAgICAgICAgPjxtYXQtY2FyZC10aXRsZT5Ecm9wIHlvdXIgZmllbGRzIGhlcmU8L21hdC1jYXJkLXRpdGxlPjwvbWF0LWNhcmRcbiAgICAgICAgICA+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L25nLXRlbXBsYXRlPlxuICA8L2Rpdj5cblxuICA8bmctdGVtcGxhdGUgW25nSWZdPVwiaXNOb2RlRW50cnlcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjaGlsZE5vZGVFbnRyeSBvZiByZWFsTm9kZUVudHJ5LmNoaWxkcmVuOyBsZXQgaWR4ID0gaW5kZXhcIj5cbiAgICAgIDxhamYtZmItbm9kZS1lbnRyeVxuICAgICAgICAqbmdJZj1cIiFpc0xhc3ROb2RlKClcIlxuICAgICAgICBbbGV2ZWxdPVwibGV2ZWxcIlxuICAgICAgICBbb3JpZ2luT2Zmc2V0XT1cImlkeFwiXG4gICAgICAgIFtmaXJzdEJyYW5jaENvbG9yXT1cImJyYW5jaENvbG9yc1tpZHhdXCJcbiAgICAgICAgW25vZGVFbnRyeV09XCJjaGlsZE5vZGVFbnRyeVwiXG4gICAgICA+PC9hamYtZmItbm9kZS1lbnRyeT5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvbmctY29udGFpbmVyPlxuXG48bmctdGVtcGxhdGUgI3Jvb3RFbXB0eT5cbiAgPGRpdiBjbGFzcz1cIm1hdC1jYXJkLWNvbnRhaW5lclwiPlxuICAgIDxtYXQtY2FyZFxuICAgICAgYXBwZWFyYW5jZT1cIm91dGxpbmVkXCJcbiAgICAgIGNsYXNzPVwiYWpmLWVtcHR5XCJcbiAgICAgIGNka0Ryb3BMaXN0XG4gICAgICBbY2RrRHJvcExpc3RFbnRlclByZWRpY2F0ZV09XCJlbXB0eUFyZWFEcm9wUHJlZGljYXRlKClcIlxuICAgICAgKGNka0Ryb3BMaXN0RHJvcHBlZCk9XCJvbkRyb3AoJGV2ZW50KVwiXG4gICAgICA+PG1hdC1jYXJkLXRpdGxlPkRyb3AgeW91ciBzbGlkZXMgaGVyZTwvbWF0LWNhcmQtdGl0bGU+XG4gICAgPC9tYXQtY2FyZD5cbiAgPC9kaXY+XG48L25nLXRlbXBsYXRlPlxuIl19