import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription, firstValueFrom } from 'rxjs';
import { sample } from 'rxjs/operators';
import { AjfFbChoicesOriginEditorDialog } from './choices-origin-editor-dialog';
import { AjfFbConditionEditorDialog } from './condition-editor-dialog';
import { disableFieldDropPredicate, onDropProcess } from './form-builder-utils';
import { AjfFbStringIdentifierDialogComponent } from './string-identifier-dialog';
import * as i0 from "@angular/core";
import * as i1 from "./form-builder-service";
import * as i2 from "@angular/material/dialog";
import * as i3 from "@angular/common";
import * as i4 from "@angular/cdk/drag-drop";
import * as i5 from "@angular/forms";
import * as i6 from "@angular/material/button";
import * as i7 from "@angular/material/form-field";
import * as i8 from "@angular/material/icon";
import * as i9 from "@angular/material/input";
import * as i10 from "@angular/material/menu";
import * as i11 from "@angular/material/sidenav";
import * as i12 from "@angular/material/toolbar";
import * as i13 from "@angular/material/tooltip";
import * as i14 from "@angular/material/slide-toggle";
import * as i15 from "./node-entry";
import * as i16 from "./node-properties";
import * as i17 from "./node-type-entry";
import * as i18 from "@ngneat/transloco";
import * as i19 from "./node-type-filter.pipe";
import * as i20 from "./node-type-groups.pipe";
const _c0 = ["designer"];
function AjfFormBuilder_ng_container_27_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 15);
    i0.ɵɵlistener("click", function AjfFormBuilder_ng_container_27_button_1_Template_button_click_0_listener() { const choicesOrigin_r4 = i0.ɵɵrestoreView(_r3).$implicit; const ctx_r4 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r4.editChoicesOrigin(choicesOrigin_r4)); });
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const choicesOrigin_r4 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, choicesOrigin_r4.label || choicesOrigin_r4.name), " ");
} }
function AjfFormBuilder_ng_container_27_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormBuilder_ng_container_27_button_1_Template, 3, 3, "button", 30);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cos_r6 = ctx.ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", cos_r6);
} }
function AjfFormBuilder_button_39_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "button", 31);
    i0.ɵɵlistener("click", function AjfFormBuilder_button_39_Template_button_click_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.searchTerm = ""); });
    i0.ɵɵelementStart(1, "mat-icon");
    i0.ɵɵtext(2, "close");
    i0.ɵɵelementEnd()();
} }
function AjfFormBuilder_ng_container_43_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 34);
    i0.ɵɵtext(1);
    i0.ɵɵpipe(2, "transloco");
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const group_r8 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(2, 1, group_r8.category), " ");
} }
function AjfFormBuilder_ng_container_43_ajf_fb_node_type_entry_2_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ajf-fb-node-type-entry", 35);
    i0.ɵɵlistener("cdkDragStarted", function AjfFormBuilder_ng_container_43_ajf_fb_node_type_entry_2_Template_ajf_fb_node_type_entry_cdkDragStarted_0_listener() { i0.ɵɵrestoreView(_r9); i0.ɵɵnextContext(2); const leftSidenav_r2 = i0.ɵɵreference(32); return i0.ɵɵresetView(leftSidenav_r2.close()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const nodeType_r10 = ctx.$implicit;
    i0.ɵɵproperty("cdkDragData", nodeType_r10)("nodeType", nodeType_r10);
} }
function AjfFormBuilder_ng_container_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, AjfFormBuilder_ng_container_43_div_1_Template, 3, 3, "div", 32)(2, AjfFormBuilder_ng_container_43_ajf_fb_node_type_entry_2_Template, 1, 2, "ajf-fb-node-type-entry", 33);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const group_r8 = ctx.$implicit;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", group_r8.category);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", group_r8.nodeTypes);
} }
function AjfFormBuilder_ajf_fb_node_entry_48_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "ajf-fb-node-entry", 36);
    i0.ɵɵlistener("cdkDropListDropped", function AjfFormBuilder_ajf_fb_node_entry_48_Template_ajf_fb_node_entry_cdkDropListDropped_0_listener($event) { i0.ɵɵrestoreView(_r11); const ctx_r4 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r4.onDrop($event)); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const nodeEntry_r12 = ctx.$implicit;
    const isFirst_r13 = ctx.first;
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵproperty("cdkDropListEnterPredicate", ctx_r4.disableFieldDrop)("isFirst", isFirst_r13)("nodeEntry", nodeEntry_r12);
} }
export class AjfFormBuilder {
    get form() {
        return this._form;
    }
    set form(form) {
        if (this._form !== form) {
            this._form = form;
            if (this._init) {
                this._setCurrentForm();
            }
        }
    }
    get expandSlides() {
        return this._expandSlides;
    }
    set expandSlides(expandSlides) {
        this._setSlidesExpanded(coerceBooleanProperty(expandSlides));
    }
    get fillHeight() {
        return this._fillHeight;
    }
    set fillHeight(fillHeight) {
        this._fillHeight = coerceBooleanProperty(fillHeight);
        this._cdr.markForCheck();
    }
    get nodeTypes() {
        return this._nodeTypes;
    }
    get nodeEntriesTree() {
        return this._nodeEntriesTree;
    }
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    get connectedDropLists() {
        return this._connectedDropLists;
    }
    constructor(_service, _dialog, _cdr) {
        this._service = _service;
        this._dialog = _dialog;
        this._cdr = _cdr;
        /**
         * True when the slides of the designer are kept expanded. Slides added later
         * follow this state as well.
         * It drives the "expand slides" toggle of the toolbar and can be set by the
         * host, both one-way (`[expandSlides]="true"`) and two-way
         * (`[(expandSlides)]="expanded"`).
         */
        this._expandSlides = false;
        /**
         * Emits whenever the slides expansion state is changed from inside the form
         * builder, i.e. by the toolbar controls.
         */
        this.expandSlidesChange = new EventEmitter();
        /**
         * When true the form builder fills the whole height of its container: the
         * field types palette, the designer and the properties panel stretch to the
         * available height and scroll internally, instead of growing with their
         * content. Requires the container to have a definite height.
         */
        this._fillHeight = false;
        /**
         * Called to set form builder validation errors
         */
        this._formBuilderValidation = new EventEmitter();
        this.formBuilderValidation = this
            ._formBuilderValidation;
        /**
         * The list of the ids of all the dropLists connected to the formbuilder source list.
         */
        this._connectedDropLists = this._service.connectedDropLists;
        this.searchTerm = '';
        this._vc = new EventEmitter();
        this._init = false;
        this._editConditionSub = Subscription.EMPTY;
        this._editConditionDialog = null;
        this._beforeNodesUpdateSub = Subscription.EMPTY;
        this._editChoicesOriginSub = Subscription.EMPTY;
        this._editNodesValidationSub = Subscription.EMPTY;
        this._editChoicesOriginDialog = null;
        this._stringIdentifierDialog = null;
        this._stringIdentifierSub = Subscription.EMPTY;
        this._lastScrollTop = 0;
        this.xlsformDownloading = false;
        this._nodeTypes = _service.availableNodeTypes;
        this._nodeEntriesTree = _service.nodeEntriesTree;
        this._choicesOrigins = _service.choicesOrigins;
        this._editConditionSub = this._service.editedCondition.subscribe((condition) => {
            if (this._editConditionDialog != null) {
                this._editConditionDialog.close();
                this._editConditionDialog = null;
            }
            if (condition != null) {
                this._editConditionDialog = this._dialog.open(AjfFbConditionEditorDialog, {
                    disableClose: true,
                });
            }
        });
        this._editChoicesOriginSub = this._service.editedChoicesOrigin.subscribe((choicesOrigin) => {
            if (this._editChoicesOriginDialog != null) {
                this._editChoicesOriginDialog.close();
                this._editChoicesOriginDialog = null;
            }
            if (choicesOrigin != null) {
                this._editChoicesOriginDialog = this._dialog.open(AjfFbChoicesOriginEditorDialog, {
                    disableClose: true,
                });
            }
        });
        this._editNodesValidationSub = this._service.editedNodesValidation.subscribe((nodeValidation) => {
            if (nodeValidation != null) {
                this._formBuilderValidation.next(nodeValidation);
            }
        });
        this._beforeNodesUpdateSub = this._service.beforeNodesUpdate.subscribe(() => {
            if (this.designerCont == null) {
                return;
            }
            this._lastScrollTop = this.designerCont.nativeElement.scrollTop;
        });
        this.nodeEntriesTree.pipe(sample(this._vc)).subscribe(() => {
            if (this.designerCont == null) {
                return;
            }
            this.designerCont.nativeElement.scrollTop = this._lastScrollTop;
        });
        this._stringIdentifierSub = this._service.stringIdentifier.subscribe(() => { });
    }
    ngAfterViewChecked() {
        this._vc.emit();
    }
    ngAfterContentInit() {
        // The expanded status of the slides lives in the service, which outlives a
        // single form builder instance: re-apply the current state, so that a newly
        // created form builder always matches its own expandSlides value.
        this._setSlidesExpanded(this._expandSlides);
        this._setCurrentForm();
        this._init = true;
    }
    ngOnDestroy() {
        this._editConditionSub.unsubscribe();
        this._beforeNodesUpdateSub.unsubscribe();
        this._editChoicesOriginSub.unsubscribe();
        this._editNodesValidationSub.unsubscribe();
        this._stringIdentifierSub.unsubscribe();
        this._service.setForm(null);
        this._service.resetNodeEntriesTreeExpandedStatus();
        this._service.resetEmptyCounters();
    }
    createChoicesOrigin() {
        this._service.createChoicesOrigin();
    }
    disableDrop() {
        return false;
    }
    disableFieldDrop(item) {
        return disableFieldDropPredicate(item);
    }
    /**
     * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
     * @param event The drop event.
     * @param content True if the current nodeEntry contains other nodeEntries.
     */
    onDrop(event, content = false) {
        onDropProcess(event, this._service, null, content);
    }
    editChoicesOrigin(choicesOrigin) {
        this._service.editChoicesOrigin(choicesOrigin);
    }
    editStringIdentifier() {
        if (this._stringIdentifierDialog != null) {
            this._stringIdentifierDialog.close();
            this._stringIdentifierDialog = null;
        }
        this._stringIdentifierDialog = this._dialog.open(AjfFbStringIdentifierDialogComponent, {
            width: '60%',
            height: '60%',
        });
    }
    /**
     * Expands all the slides of the designer and keeps the slides added later expanded.
     */
    expandAll() {
        this._setSlidesExpanded(true, true);
    }
    /**
     * Collapses all the slides of the designer and keeps the slides added later collapsed.
     */
    collapseAll() {
        this._setSlidesExpanded(false, true);
    }
    expandToggle(evt) {
        this._setSlidesExpanded(evt.checked, true);
    }
    /**
     * Applies the slides expansion state to the service.
     * @param expanded True to keep the slides expanded
     * @param notify True to emit expandSlidesChange when the state changes
     */
    _setSlidesExpanded(expanded, notify = false) {
        const changed = this._expandSlides !== expanded;
        this._expandSlides = expanded;
        if (expanded) {
            this._service.expandAll();
        }
        else {
            this._service.collapseAll();
        }
        if (notify && changed) {
            this.expandSlidesChange.emit(expanded);
        }
        this._cdr.markForCheck();
    }
    async downloadAsXlsform() {
        this.xlsformDownloading = true;
        this._cdr.markForCheck();
        try {
            const form = await firstValueFrom(this._service.getCurrentForm());
            const json = JSON.stringify(form);
            const fileBlob = new Blob([json], { type: 'application/json' });
            const formData = new FormData();
            formData.append('jsonFile', fileBlob, 'form.json');
            const response = await fetch('https://formconv.herokuapp.com/result.xlsx', {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                const errorText = await response.text();
                window.alert(errorText);
                return;
            }
            const resultBlob = await response.blob();
            const url = URL.createObjectURL(resultBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'result.xlsx';
            a.click();
            URL.revokeObjectURL(url);
        }
        finally {
            this.xlsformDownloading = false;
            this._cdr.markForCheck();
        }
    }
    _setCurrentForm() {
        if (this._form == null) {
            return;
        }
        this._service.setForm(this._form);
    }
    static { this.ɵfac = function AjfFormBuilder_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormBuilder)(i0.ɵɵdirectiveInject(i1.AjfFormBuilderService), i0.ɵɵdirectiveInject(i2.MatDialog), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFormBuilder, selectors: [["ajf-form-builder"]], viewQuery: function AjfFormBuilder_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 7);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.designerCont = _t.first);
        } }, hostVars: 2, hostBindings: function AjfFormBuilder_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassProp("ajf-form-builder-fill-height", ctx.fillHeight);
        } }, inputs: { form: "form", expandSlides: "expandSlides", fillHeight: "fillHeight" }, outputs: { expandSlidesChange: "expandSlidesChange", formBuilderValidation: "formBuilderValidation" }, decls: 53, vars: 37, consts: [["choicesMenu", "matMenu"], ["leftSidenav", ""], ["sourceDropList", ""], ["designer", ""], ["rightSidenav", ""], [1, "ajf-formbuilder-toolbar"], ["mat-icon-button", "", "aria-label", "Toggle side navigation", 3, "click"], ["mat-button", "", 3, "matMenuTriggerFor"], ["mat-button", "", 3, "click"], [1, "ajf-toolbar-group"], ["mat-icon-button", "", "aria-label", "Collapse all slides", "matTooltip", "Keep slides collapsed", 3, "click"], ["color", "primary", "aria-label", "Toggle slide expansion", 3, "change", "checked"], ["mat-icon-button", "", "aria-label", "Expand all slides", "matTooltip", "Keep slides expanded", 3, "click"], [1, "ajf-spacer"], ["mat-button", "", 3, "click", "disabled"], ["mat-menu-item", "", 3, "click"], [4, "ngIf"], [1, "ajf-formtree-container"], ["cdkDropListGroup", "", 1, "ajf-formtree-drawer-container"], ["position", "start", "mode", "over", 1, "ajf-sidenav-modern"], [1, "ajf-drawer-header"], ["floatLabel", "auto", 1, "ajf-search-field"], ["matPrefix", ""], ["matInput", "", "type", "text", 3, "ngModelChange", "ngModel", "placeholder"], ["matSuffix", "", "mat-icon-button", "", "aria-label", "Clear", 3, "click", 4, "ngIf"], ["cdkDropList", "", 1, "ajf-drawer-content", 3, "cdkDropListConnectedTo", "cdkDropListEnterPredicate", "cdkDropListData"], [4, "ngFor", "ngForOf"], [1, "ajf-designer"], ["id", "slides-list", "cdkDropList", "", 3, "cdkDropListEnterPredicate", "isFirst", "nodeEntry", "cdkDropListDropped", 4, "ngFor", "ngForOf"], ["position", "end", "mode", "side", 1, "ajf-formtree-properties"], ["mat-menu-item", "", 3, "click", 4, "ngFor", "ngForOf"], ["matSuffix", "", "mat-icon-button", "", "aria-label", "Clear", 3, "click"], ["class", "ajf-fb-category-header", 4, "ngIf"], ["cdkDrag", "", 3, "cdkDragData", "nodeType", "cdkDragStarted", 4, "ngFor", "ngForOf"], [1, "ajf-fb-category-header"], ["cdkDrag", "", 3, "cdkDragStarted", "cdkDragData", "nodeType"], ["id", "slides-list", "cdkDropList", "", 3, "cdkDropListDropped", "cdkDropListEnterPredicate", "isFirst", "nodeEntry"]], template: function AjfFormBuilder_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵelementStart(0, "mat-toolbar", 5)(1, "button", 6);
            i0.ɵɵlistener("click", function AjfFormBuilder_Template_button_click_1_listener() { i0.ɵɵrestoreView(_r1); const leftSidenav_r2 = i0.ɵɵreference(32); return i0.ɵɵresetView(leftSidenav_r2.toggle()); });
            i0.ɵɵelementStart(2, "mat-icon");
            i0.ɵɵtext(3, "add_box");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(4, "button", 7);
            i0.ɵɵtext(5);
            i0.ɵɵpipe(6, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(7, "button", 8);
            i0.ɵɵlistener("click", function AjfFormBuilder_Template_button_click_7_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.editStringIdentifier()); });
            i0.ɵɵtext(8);
            i0.ɵɵpipe(9, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "div", 9)(11, "button", 10);
            i0.ɵɵlistener("click", function AjfFormBuilder_Template_button_click_11_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.collapseAll()); });
            i0.ɵɵelementStart(12, "mat-icon");
            i0.ɵɵtext(13, "unfold_less");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(14, "mat-slide-toggle", 11);
            i0.ɵɵlistener("change", function AjfFormBuilder_Template_mat_slide_toggle_change_14_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.expandToggle($event)); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "button", 12);
            i0.ɵɵlistener("click", function AjfFormBuilder_Template_button_click_15_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.expandAll()); });
            i0.ɵɵelementStart(16, "mat-icon");
            i0.ɵɵtext(17, "unfold_more");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelement(18, "span", 13);
            i0.ɵɵelementStart(19, "button", 14);
            i0.ɵɵlistener("click", function AjfFormBuilder_Template_button_click_19_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.downloadAsXlsform()); });
            i0.ɵɵtext(20);
            i0.ɵɵpipe(21, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "mat-menu", null, 0)(24, "button", 15);
            i0.ɵɵlistener("click", function AjfFormBuilder_Template_button_click_24_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.createChoicesOrigin()); });
            i0.ɵɵtext(25);
            i0.ɵɵpipe(26, "transloco");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(27, AjfFormBuilder_ng_container_27_Template, 2, 1, "ng-container", 16);
            i0.ɵɵpipe(28, "async");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(29, "div", 17)(30, "mat-drawer-container", 18)(31, "mat-drawer", 19, 1)(33, "div", 20)(34, "mat-form-field", 21)(35, "mat-icon", 22);
            i0.ɵɵtext(36, "search");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(37, "input", 23);
            i0.ɵɵpipe(38, "transloco");
            i0.ɵɵtwoWayListener("ngModelChange", function AjfFormBuilder_Template_input_ngModelChange_37_listener($event) { i0.ɵɵrestoreView(_r1); i0.ɵɵtwoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event); return i0.ɵɵresetView($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(39, AjfFormBuilder_button_39_Template, 3, 0, "button", 24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "div", 25, 2);
            i0.ɵɵpipe(42, "async");
            i0.ɵɵtemplate(43, AjfFormBuilder_ng_container_43_Template, 3, 2, "ng-container", 26);
            i0.ɵɵpipe(44, "nodeTypeFilter");
            i0.ɵɵpipe(45, "nodeTypeGroups");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(46, "div", 27, 3);
            i0.ɵɵtemplate(48, AjfFormBuilder_ajf_fb_node_entry_48_Template, 1, 3, "ajf-fb-node-entry", 28);
            i0.ɵɵpipe(49, "async");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(50, "div", 29, 4);
            i0.ɵɵelement(52, "ajf-fb-node-properties");
            i0.ɵɵelementEnd()();
        } if (rf & 2) {
            const choicesMenu_r14 = i0.ɵɵreference(23);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("matMenuTriggerFor", choicesMenu_r14);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(6, 16, "Choices"), " ");
            i0.ɵɵadvance(3);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(9, 18, "Default columns"), " ");
            i0.ɵɵadvance(6);
            i0.ɵɵproperty("checked", ctx.expandSlides);
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("disabled", ctx.xlsformDownloading);
            i0.ɵɵadvance();
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(21, 20, "Download as XLSForm"), " ");
            i0.ɵɵadvance(5);
            i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(26, 22, "New.."), " ");
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", i0.ɵɵpipeBind1(28, 24, ctx.choicesOrigins));
            i0.ɵɵadvance(10);
            i0.ɵɵpropertyInterpolate("placeholder", i0.ɵɵpipeBind1(38, 26, "Search elements..."));
            i0.ɵɵtwoWayProperty("ngModel", ctx.searchTerm);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("ngIf", ctx.searchTerm);
            i0.ɵɵadvance();
            i0.ɵɵproperty("cdkDropListConnectedTo", i0.ɵɵpipeBind1(42, 28, ctx.connectedDropLists))("cdkDropListEnterPredicate", ctx.disableDrop)("cdkDropListData", ctx.nodeTypes);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(45, 33, i0.ɵɵpipeBind2(44, 30, ctx.nodeTypes, ctx.searchTerm)));
            i0.ɵɵadvance(5);
            i0.ɵɵproperty("ngForOf", i0.ɵɵpipeBind1(49, 35, ctx.nodeEntriesTree));
        } }, dependencies: [i3.NgForOf, i3.NgIf, i4.CdkDropList, i4.CdkDropListGroup, i4.CdkDrag, i5.DefaultValueAccessor, i5.NgControlStatus, i5.NgModel, i6.MatButton, i6.MatIconButton, i7.MatFormField, i7.MatPrefix, i7.MatSuffix, i8.MatIcon, i9.MatInput, i10.MatMenu, i10.MatMenuItem, i10.MatMenuTrigger, i11.MatDrawer, i11.MatDrawerContainer, i12.MatToolbar, i13.MatTooltip, i14.MatSlideToggle, i15.AjfFbNodeEntry, i16.AjfFbNodeProperties, i17.AjfFbNodeTypeEntry, i3.AsyncPipe, i18.TranslocoPipe, i19.NodeTypeFilterPipe, i20.NodeTypeGroupsPipe], styles: ["ajf-form-builder{display:flex;flex-direction:column;align-items:stretch;position:relative;min-height:300px}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar{position:sticky;top:0;z-index:3;display:flex;align-items:center;height:48px;min-height:48px;padding:0 1rem;box-shadow:none;border-bottom:1px solid color-mix(in srgb,currentColor 12%,transparent);gap:.75rem}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar button[mat-icon-button] mat-icon{transition:transform .2s ease,color .2s ease}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar button[mat-icon-button]:hover mat-icon{transform:scale(1.1)}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar .ajf-toolbar-group{display:flex;align-items:center;gap:.5rem;border-radius:100vmax;padding:.25rem .5rem;background-color:color-mix(in srgb,currentColor 4%,transparent)}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar .ajf-spacer{flex:1 1 auto}ajf-form-builder .ajf-formtree-container{display:flex;flex-flow:row;align-items:flex-start;justify-content:space-between;gap:18px;padding:18px 22px;box-sizing:border-box}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container{flex:1 1 auto;min-height:47vh;border:none;border-radius:0;background:transparent;overflow:hidden;transition:box-shadow .25s ease-in-out}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer{flex:1;padding:4px 2px;overflow-y:auto}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-card-container .mat-mdc-card{border:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:10px;box-shadow:0 1px 2px #0000000d}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-expansion-panel-header{background:color-mix(in srgb,currentColor 4%,transparent)}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-expansion-panel-header:hover{background:color-mix(in srgb,currentColor 6%,transparent)}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-expansion-panel-header-title{font-size:14.5px;font-weight:600}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .mat-expansion-panel-body{padding:12px}ajf-form-builder .ajf-formtree-container .ajf-formtree-properties{flex:0 1 auto;min-width:312px;max-width:312px;max-height:70vh;overflow-y:auto;position:sticky;top:64px;border-radius:10px;border:1px solid color-mix(in srgb,currentColor 12%,transparent);padding:1rem;transition:box-shadow .3s ease,transform .3s ease}ajf-form-builder .ajf-formtree-container .ajf-formtree-properties:hover{box-shadow:0 0 14px #0000001a}ajf-form-builder .ajf-sidenav-modern{display:flex;flex-direction:column;min-width:250px;max-width:250px;border-right:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:10px 0 0 10px}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-header{position:sticky;top:0;z-index:2;padding:.5rem;border-bottom:1px solid color-mix(in srgb,currentColor 8%,transparent)}ajf-form-builder .ajf-sidenav-modern .ajf-search-field{width:100%;margin:0}ajf-form-builder .ajf-sidenav-modern .ajf-search-field input{font-size:.9rem}ajf-form-builder .ajf-sidenav-modern .ajf-search-field mat-icon{color:color-mix(in srgb,currentColor 60%,transparent)}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content{flex:1 1 auto;overflow-y:auto;padding:.5rem;display:flex;flex-direction:column;gap:.25rem;scrollbar-width:thin;scrollbar-color:color-mix(in srgb,currentColor 25%,transparent) transparent}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content::-webkit-scrollbar{width:6px}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content::-webkit-scrollbar-thumb{background:color-mix(in srgb,currentColor 25%,transparent);border-radius:4px}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content::-webkit-scrollbar-thumb:hover{background:color-mix(in srgb,currentColor 40%,transparent)}ajf-form-builder .ajf-sidenav-modern .ajf-fb-category-header{padding:14px 8px 4px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:color-mix(in srgb,currentColor 60%,transparent);-webkit-user-select:none;user-select:none;pointer-events:none}ajf-form-builder .ajf-sidenav-modern .ajf-fb-category-header:first-child{padding-top:4px}ajf-form-builder .ajf-sidenav-modern ajf-fb-node-type-entry{transition:background-color .15s ease,transform .15s ease}ajf-form-builder .ajf-sidenav-modern ajf-fb-node-type-entry:hover{background-color:color-mix(in srgb,currentColor 6%,transparent);transform:scale(1.02)}@media (max-height: 700px){ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content{padding:.25rem}}@media (max-width: 900px){ajf-form-builder .ajf-sidenav-modern{max-width:240px;min-width:180px}ajf-form-builder .ajf-sidenav-modern .ajf-search-field input{font-size:.8rem}}@media (max-width: 1024px){ajf-form-builder .ajf-formtree-container{flex-direction:column;gap:1rem}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container{min-height:40vh}ajf-form-builder .ajf-formtree-container .ajf-formtree-properties{min-width:0;max-width:100%;position:relative;top:0}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar{flex-wrap:wrap;justify-content:center}}ajf-form-builder.ajf-form-builder-fill-height{flex:1 1 auto;height:100%;min-height:0}ajf-form-builder.ajf-form-builder-fill-height .ajf-formtree-container{flex:1 1 auto;min-height:0;align-items:stretch}ajf-form-builder.ajf-form-builder-fill-height mat-drawer-container.ajf-formtree-drawer-container{min-height:0;height:100%}ajf-form-builder.ajf-form-builder-fill-height mat-drawer-container.ajf-formtree-drawer-container .ajf-designer{height:100%;box-sizing:border-box}ajf-form-builder.ajf-form-builder-fill-height .ajf-formtree-properties{position:static;top:auto;max-height:none}ajf-form-builder *{scroll-behavior:smooth}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormBuilder, [{
        type: Component,
        args: [{ selector: 'ajf-form-builder', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: { '[class.ajf-form-builder-fill-height]': 'fillHeight' }, template: "<mat-toolbar class=\"ajf-formbuilder-toolbar\">\n  <button mat-icon-button (click)=\"leftSidenav.toggle()\" aria-label=\"Toggle side navigation\">\n    <mat-icon>add_box</mat-icon>\n  </button>\n  <button mat-button [matMenuTriggerFor]=\"choicesMenu\">\n    {{ 'Choices' | transloco }}\n  </button>\n  <button mat-button (click)=\"editStringIdentifier()\">\n    {{ 'Default columns' | transloco }}\n  </button>\n\n  <div class=\"ajf-toolbar-group\">\n    <button\n      mat-icon-button\n      aria-label=\"Collapse all slides\"\n      matTooltip=\"Keep slides collapsed\"\n      (click)=\"collapseAll()\"\n    >\n      <mat-icon>unfold_less</mat-icon>\n    </button>\n\n    <mat-slide-toggle\n      color=\"primary\"\n      [checked]=\"expandSlides\"\n      (change)=\"expandToggle($event)\"\n      aria-label=\"Toggle slide expansion\"\n    ></mat-slide-toggle>\n\n    <button\n      mat-icon-button\n      aria-label=\"Expand all slides\"\n      matTooltip=\"Keep slides expanded\"\n      (click)=\"expandAll()\"\n    >\n      <mat-icon>unfold_more</mat-icon>\n    </button>\n  </div>\n\n  <span class=\"ajf-spacer\"></span>\n\n  <button mat-button (click)=\"downloadAsXlsform()\" [disabled]=\"xlsformDownloading\">\n    {{ 'Download as XLSForm' | transloco }}\n  </button>\n\n  <mat-menu #choicesMenu=\"matMenu\">\n    <button mat-menu-item (click)=\"createChoicesOrigin()\">\n      {{ 'New..' | transloco }}\n    </button>\n    <ng-container *ngIf=\"choicesOrigins | async as cos\">\n      <button\n        mat-menu-item\n        *ngFor=\"let choicesOrigin of cos\"\n        (click)=\"editChoicesOrigin(choicesOrigin)\"\n      >\n        {{ (choicesOrigin.label || choicesOrigin.name) | transloco }}\n      </button>\n    </ng-container>\n  </mat-menu>\n</mat-toolbar>\n\n<div class=\"ajf-formtree-container\">\n  <mat-drawer-container\n    cdkDropListGroup\n    class=\"ajf-formtree-drawer-container\"\n  >\n    <mat-drawer #leftSidenav position=\"start\" mode=\"over\" class=\"ajf-sidenav-modern\">\n      <div class=\"ajf-drawer-header\">\n        <mat-form-field class=\"ajf-search-field\" floatLabel=\"auto\">\n          <mat-icon matPrefix>search</mat-icon>\n          <input\n            matInput\n            type=\"text\"\n            [(ngModel)]=\"searchTerm\"\n            placeholder=\"{{ 'Search elements...' | transloco }}\"\n          />\n          <button\n            *ngIf=\"searchTerm\"\n            matSuffix\n            mat-icon-button\n            aria-label=\"Clear\"\n            (click)=\"searchTerm=''\"\n          >\n            <mat-icon>close</mat-icon>\n          </button>\n        </mat-form-field>\n      </div>\n    \n      <div\n        #sourceDropList\n        class=\"ajf-drawer-content\"\n        cdkDropList\n        [cdkDropListConnectedTo]=\"(connectedDropLists | async)!\"\n        [cdkDropListEnterPredicate]=\"disableDrop\"\n        [cdkDropListData]=\"nodeTypes\"\n      >\n        <ng-container *ngFor=\"let group of nodeTypes | nodeTypeFilter: searchTerm | nodeTypeGroups\">\n          <div class=\"ajf-fb-category-header\" *ngIf=\"group.category\">\n            {{ group.category | transloco }}\n          </div>\n          <ajf-fb-node-type-entry\n            *ngFor=\"let nodeType of group.nodeTypes\"\n            cdkDrag\n            [cdkDragData]=\"nodeType\"\n            (cdkDragStarted)=\"leftSidenav.close()\"\n            [nodeType]=\"nodeType\"\n          ></ajf-fb-node-type-entry>\n        </ng-container>\n      </div>\n    </mat-drawer>\n    \n    <div #designer class=\"ajf-designer\">\n      <ajf-fb-node-entry\n        id=\"slides-list\"\n        cdkDropList\n        (cdkDropListDropped)=\"onDrop($event)\"\n        [cdkDropListEnterPredicate]=\"disableFieldDrop\"\n        *ngFor=\"let nodeEntry of (nodeEntriesTree | async); let isFirst = first\"\n        [isFirst]=\"isFirst\"\n        [nodeEntry]=\"nodeEntry\"\n      ></ajf-fb-node-entry>\n    </div>\n  </mat-drawer-container>\n\n  <div class=\"ajf-formtree-properties\" #rightSidenav position=\"end\" mode=\"side\">\n    <ajf-fb-node-properties></ajf-fb-node-properties>\n  </div>\n</div>\n", styles: ["ajf-form-builder{display:flex;flex-direction:column;align-items:stretch;position:relative;min-height:300px}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar{position:sticky;top:0;z-index:3;display:flex;align-items:center;height:48px;min-height:48px;padding:0 1rem;box-shadow:none;border-bottom:1px solid color-mix(in srgb,currentColor 12%,transparent);gap:.75rem}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar button[mat-icon-button] mat-icon{transition:transform .2s ease,color .2s ease}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar button[mat-icon-button]:hover mat-icon{transform:scale(1.1)}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar .ajf-toolbar-group{display:flex;align-items:center;gap:.5rem;border-radius:100vmax;padding:.25rem .5rem;background-color:color-mix(in srgb,currentColor 4%,transparent)}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar .ajf-spacer{flex:1 1 auto}ajf-form-builder .ajf-formtree-container{display:flex;flex-flow:row;align-items:flex-start;justify-content:space-between;gap:18px;padding:18px 22px;box-sizing:border-box}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container{flex:1 1 auto;min-height:47vh;border:none;border-radius:0;background:transparent;overflow:hidden;transition:box-shadow .25s ease-in-out}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer{flex:1;padding:4px 2px;overflow-y:auto}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-card-container .mat-mdc-card{border:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:10px;box-shadow:0 1px 2px #0000000d}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-expansion-panel-header{background:color-mix(in srgb,currentColor 4%,transparent)}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-expansion-panel-header:hover{background:color-mix(in srgb,currentColor 6%,transparent)}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .ajf-designer .mat-expansion-panel-header-title{font-size:14.5px;font-weight:600}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container .mat-expansion-panel-body{padding:12px}ajf-form-builder .ajf-formtree-container .ajf-formtree-properties{flex:0 1 auto;min-width:312px;max-width:312px;max-height:70vh;overflow-y:auto;position:sticky;top:64px;border-radius:10px;border:1px solid color-mix(in srgb,currentColor 12%,transparent);padding:1rem;transition:box-shadow .3s ease,transform .3s ease}ajf-form-builder .ajf-formtree-container .ajf-formtree-properties:hover{box-shadow:0 0 14px #0000001a}ajf-form-builder .ajf-sidenav-modern{display:flex;flex-direction:column;min-width:250px;max-width:250px;border-right:1px solid color-mix(in srgb,currentColor 12%,transparent);border-radius:10px 0 0 10px}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-header{position:sticky;top:0;z-index:2;padding:.5rem;border-bottom:1px solid color-mix(in srgb,currentColor 8%,transparent)}ajf-form-builder .ajf-sidenav-modern .ajf-search-field{width:100%;margin:0}ajf-form-builder .ajf-sidenav-modern .ajf-search-field input{font-size:.9rem}ajf-form-builder .ajf-sidenav-modern .ajf-search-field mat-icon{color:color-mix(in srgb,currentColor 60%,transparent)}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content{flex:1 1 auto;overflow-y:auto;padding:.5rem;display:flex;flex-direction:column;gap:.25rem;scrollbar-width:thin;scrollbar-color:color-mix(in srgb,currentColor 25%,transparent) transparent}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content::-webkit-scrollbar{width:6px}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content::-webkit-scrollbar-thumb{background:color-mix(in srgb,currentColor 25%,transparent);border-radius:4px}ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content::-webkit-scrollbar-thumb:hover{background:color-mix(in srgb,currentColor 40%,transparent)}ajf-form-builder .ajf-sidenav-modern .ajf-fb-category-header{padding:14px 8px 4px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:color-mix(in srgb,currentColor 60%,transparent);-webkit-user-select:none;user-select:none;pointer-events:none}ajf-form-builder .ajf-sidenav-modern .ajf-fb-category-header:first-child{padding-top:4px}ajf-form-builder .ajf-sidenav-modern ajf-fb-node-type-entry{transition:background-color .15s ease,transform .15s ease}ajf-form-builder .ajf-sidenav-modern ajf-fb-node-type-entry:hover{background-color:color-mix(in srgb,currentColor 6%,transparent);transform:scale(1.02)}@media (max-height: 700px){ajf-form-builder .ajf-sidenav-modern .ajf-drawer-content{padding:.25rem}}@media (max-width: 900px){ajf-form-builder .ajf-sidenav-modern{max-width:240px;min-width:180px}ajf-form-builder .ajf-sidenav-modern .ajf-search-field input{font-size:.8rem}}@media (max-width: 1024px){ajf-form-builder .ajf-formtree-container{flex-direction:column;gap:1rem}ajf-form-builder .ajf-formtree-container mat-drawer-container.ajf-formtree-drawer-container{min-height:40vh}ajf-form-builder .ajf-formtree-container .ajf-formtree-properties{min-width:0;max-width:100%;position:relative;top:0}ajf-form-builder mat-toolbar.ajf-formbuilder-toolbar{flex-wrap:wrap;justify-content:center}}ajf-form-builder.ajf-form-builder-fill-height{flex:1 1 auto;height:100%;min-height:0}ajf-form-builder.ajf-form-builder-fill-height .ajf-formtree-container{flex:1 1 auto;min-height:0;align-items:stretch}ajf-form-builder.ajf-form-builder-fill-height mat-drawer-container.ajf-formtree-drawer-container{min-height:0;height:100%}ajf-form-builder.ajf-form-builder-fill-height mat-drawer-container.ajf-formtree-drawer-container .ajf-designer{height:100%;box-sizing:border-box}ajf-form-builder.ajf-form-builder-fill-height .ajf-formtree-properties{position:static;top:auto;max-height:none}ajf-form-builder *{scroll-behavior:smooth}\n"] }]
    }], () => [{ type: i1.AjfFormBuilderService }, { type: i2.MatDialog }, { type: i0.ChangeDetectorRef }], { designerCont: [{
            type: ViewChild,
            args: ['designer', { static: true }]
        }], form: [{
            type: Input
        }], expandSlides: [{
            type: Input
        }], expandSlidesChange: [{
            type: Output
        }], fillHeight: [{
            type: Input
        }], formBuilderValidation: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFormBuilder, { className: "AjfFormBuilder", filePath: "form-builder.ts", lineNumber: 65 }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbWF0ZXJpYWwvZm9ybS1idWlsZGVyL3NyYy9mb3JtLWJ1aWxkZXIudHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL2Zvcm0tYnVpbGRlci5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCQSxPQUFPLEVBQWUscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUUxRSxPQUFPLEVBR0wsdUJBQXVCLEVBRXZCLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBYSxZQUFZLEVBQUUsY0FBYyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlELE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV0QyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM5RSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQU9yRSxPQUFPLEVBQUMseUJBQXlCLEVBQUUsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDOUUsT0FBTyxFQUFDLG9DQUFvQyxFQUFDLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNMMUUsa0NBSUM7SUFEQyxpT0FBUywwQ0FBZ0MsS0FBQztJQUUxQyxZQUNGOztJQUFBLGlCQUFTOzs7SUFEUCxjQUNGO0lBREUsc0dBQ0Y7OztJQVBGLDZCQUFvRDtJQUNsRCxzRkFJQzs7OztJQUYyQixjQUFNO0lBQU4sZ0NBQU07Ozs7SUF3QjlCLGtDQU1DO0lBREMsa01BQW9CLEVBQUUsS0FBQztJQUV2QixnQ0FBVTtJQUFBLHFCQUFLO0lBQ2pCLEFBRGlCLGlCQUFXLEVBQ25COzs7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QStCO1lBQS9CLGlEQUErQjtZQUM5RSxjQUNGO1lBREUsOEVBQ0Y7WUFJSSxlQUNGO1lBREUsZ0VBQ0Y7WUFDZSxlQUE2QjtZQUE3QixpRUFBNkI7WUF5QnBDLGdCQUFvRDtZQUFwRCxxRkFBb0Q7WUFEcEQsOENBQXdCO1lBSXZCLGVBQWdCO1lBQWhCLHFDQUFnQjtZQWVyQixjQUF3RDtZQUV4RCxBQURBLEFBREEsdUZBQXdELDhDQUNmLGtDQUNaO1lBRUcsZUFBMEQ7WUFBMUQsdUdBQTBEO1lBcUJwRSxlQUE4QjtZQUE5QixxRUFBOEI7OztpRkRwRC9DLGNBQWM7Y0FSMUIsU0FBUzsyQkFDRSxrQkFBa0IsbUJBR1gsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUMvQixFQUFDLHNDQUFzQyxFQUFFLFlBQVksRUFBQzs4R0FHckIsWUFBWTtrQkFBbEQsU0FBUzttQkFBQyxVQUFVLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO1lBT2pDLElBQUk7a0JBRFAsS0FBSztZQXNCRixZQUFZO2tCQURmLEtBQUs7WUFVRyxrQkFBa0I7a0JBRDFCLE1BQU07WUFjSCxVQUFVO2tCQURiLEtBQUs7WUFlRyxxQkFBcUI7a0JBRDdCLE1BQU07O2tGQWhFSSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW4sIEFqZkZvcm19IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge0FqZkNvbmRpdGlvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge0Jvb2xlYW5JbnB1dCwgY29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDZGtEcmFnLCBDZGtEcmFnRHJvcH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2RyYWctZHJvcCc7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBBZnRlclZpZXdDaGVja2VkLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtNYXREaWFsb2csIE1hdERpYWxvZ1JlZn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7TWF0U2xpZGVUb2dnbGVDaGFuZ2V9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3NsaWRlLXRvZ2dsZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbiwgZmlyc3RWYWx1ZUZyb219IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtzYW1wbGV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2d9IGZyb20gJy4vY2hvaWNlcy1vcmlnaW4tZWRpdG9yLWRpYWxvZyc7XG5pbXBvcnQge0FqZkZiQ29uZGl0aW9uRWRpdG9yRGlhbG9nfSBmcm9tICcuL2NvbmRpdGlvbi1lZGl0b3ItZGlhbG9nJztcbmltcG9ydCB7XG4gIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5LFxuICBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksXG4gIEFqZkZvcm1CdWlsZGVyU2VydmljZSxcbiAgQWpmRm9ybUJ1aWxkZXJWYWxpZGF0aW9uLFxufSBmcm9tICcuL2Zvcm0tYnVpbGRlci1zZXJ2aWNlJztcbmltcG9ydCB7ZGlzYWJsZUZpZWxkRHJvcFByZWRpY2F0ZSwgb25Ecm9wUHJvY2Vzc30gZnJvbSAnLi9mb3JtLWJ1aWxkZXItdXRpbHMnO1xuaW1wb3J0IHtBamZGYlN0cmluZ0lkZW50aWZpZXJEaWFsb2dDb21wb25lbnR9IGZyb20gJy4vc3RyaW5nLWlkZW50aWZpZXItZGlhbG9nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZvcm0tYnVpbGRlcicsXG4gIHRlbXBsYXRlVXJsOiAnZm9ybS1idWlsZGVyLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnZm9ybS1idWlsZGVyLnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHsnW2NsYXNzLmFqZi1mb3JtLWJ1aWxkZXItZmlsbC1oZWlnaHRdJzogJ2ZpbGxIZWlnaHQnfSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRm9ybUJ1aWxkZXIgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdkZXNpZ25lcicsIHtzdGF0aWM6IHRydWV9KSBkZXNpZ25lckNvbnQhOiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX2Zvcm06IEFqZkZvcm0gfCB1bmRlZmluZWQ7XG4gIGdldCBmb3JtKCk6IEFqZkZvcm0gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9mb3JtO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmb3JtKGZvcm06IEFqZkZvcm0gfCB1bmRlZmluZWQpIHtcbiAgICBpZiAodGhpcy5fZm9ybSAhPT0gZm9ybSkge1xuICAgICAgdGhpcy5fZm9ybSA9IGZvcm07XG4gICAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgICB0aGlzLl9zZXRDdXJyZW50Rm9ybSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIHdoZW4gdGhlIHNsaWRlcyBvZiB0aGUgZGVzaWduZXIgYXJlIGtlcHQgZXhwYW5kZWQuIFNsaWRlcyBhZGRlZCBsYXRlclxuICAgKiBmb2xsb3cgdGhpcyBzdGF0ZSBhcyB3ZWxsLlxuICAgKiBJdCBkcml2ZXMgdGhlIFwiZXhwYW5kIHNsaWRlc1wiIHRvZ2dsZSBvZiB0aGUgdG9vbGJhciBhbmQgY2FuIGJlIHNldCBieSB0aGVcbiAgICogaG9zdCwgYm90aCBvbmUtd2F5IChgW2V4cGFuZFNsaWRlc109XCJ0cnVlXCJgKSBhbmQgdHdvLXdheVxuICAgKiAoYFsoZXhwYW5kU2xpZGVzKV09XCJleHBhbmRlZFwiYCkuXG4gICAqL1xuICBwcml2YXRlIF9leHBhbmRTbGlkZXMgPSBmYWxzZTtcbiAgZ2V0IGV4cGFuZFNsaWRlcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZXhwYW5kU2xpZGVzO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBleHBhbmRTbGlkZXMoZXhwYW5kU2xpZGVzOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2V0U2xpZGVzRXhwYW5kZWQoY29lcmNlQm9vbGVhblByb3BlcnR5KGV4cGFuZFNsaWRlcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIHdoZW5ldmVyIHRoZSBzbGlkZXMgZXhwYW5zaW9uIHN0YXRlIGlzIGNoYW5nZWQgZnJvbSBpbnNpZGUgdGhlIGZvcm1cbiAgICogYnVpbGRlciwgaS5lLiBieSB0aGUgdG9vbGJhciBjb250cm9scy5cbiAgICovXG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBleHBhbmRTbGlkZXNDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvKipcbiAgICogV2hlbiB0cnVlIHRoZSBmb3JtIGJ1aWxkZXIgZmlsbHMgdGhlIHdob2xlIGhlaWdodCBvZiBpdHMgY29udGFpbmVyOiB0aGVcbiAgICogZmllbGQgdHlwZXMgcGFsZXR0ZSwgdGhlIGRlc2lnbmVyIGFuZCB0aGUgcHJvcGVydGllcyBwYW5lbCBzdHJldGNoIHRvIHRoZVxuICAgKiBhdmFpbGFibGUgaGVpZ2h0IGFuZCBzY3JvbGwgaW50ZXJuYWxseSwgaW5zdGVhZCBvZiBncm93aW5nIHdpdGggdGhlaXJcbiAgICogY29udGVudC4gUmVxdWlyZXMgdGhlIGNvbnRhaW5lciB0byBoYXZlIGEgZGVmaW5pdGUgaGVpZ2h0LlxuICAgKi9cbiAgcHJpdmF0ZSBfZmlsbEhlaWdodCA9IGZhbHNlO1xuICBnZXQgZmlsbEhlaWdodCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsbEhlaWdodDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZmlsbEhlaWdodChmaWxsSGVpZ2h0OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZmlsbEhlaWdodCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShmaWxsSGVpZ2h0KTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBzdGF0aWMgbmdBY2NlcHRJbnB1dFR5cGVfZXhwYW5kU2xpZGVzOiBCb29sZWFuSW5wdXQ7XG4gIHN0YXRpYyBuZ0FjY2VwdElucHV0VHlwZV9maWxsSGVpZ2h0OiBCb29sZWFuSW5wdXQ7XG5cbiAgLyoqXG4gICAqIENhbGxlZCB0byBzZXQgZm9ybSBidWlsZGVyIHZhbGlkYXRpb24gZXJyb3JzXG4gICAqL1xuICBwcml2YXRlIF9mb3JtQnVpbGRlclZhbGlkYXRpb246IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlclZhbGlkYXRpb24+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyVmFsaWRhdGlvbj4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGZvcm1CdWlsZGVyVmFsaWRhdGlvbjogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlclZhbGlkYXRpb24+ID0gdGhpc1xuICAgIC5fZm9ybUJ1aWxkZXJWYWxpZGF0aW9uIGFzIE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJWYWxpZGF0aW9uPjtcblxuICBwcml2YXRlIF9ub2RlVHlwZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdO1xuICBnZXQgbm9kZVR5cGVzKCk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdIHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZVR5cGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJpZXNUcmVlOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+O1xuICBnZXQgbm9kZUVudHJpZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cmllc1RyZWU7XG4gIH1cblxuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT5bXT47XG4gIGdldCBjaG9pY2VzT3JpZ2lucygpOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXNPcmlnaW5zO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBsaXN0IG9mIHRoZSBpZHMgb2YgYWxsIHRoZSBkcm9wTGlzdHMgY29ubmVjdGVkIHRvIHRoZSBmb3JtYnVpbGRlciBzb3VyY2UgbGlzdC5cbiAgICovXG4gIHByaXZhdGUgX2Nvbm5lY3RlZERyb3BMaXN0czogT2JzZXJ2YWJsZTxzdHJpbmdbXT4gPSB0aGlzLl9zZXJ2aWNlLmNvbm5lY3RlZERyb3BMaXN0cztcbiAgZ2V0IGNvbm5lY3RlZERyb3BMaXN0cygpOiBPYnNlcnZhYmxlPHN0cmluZ1tdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3RlZERyb3BMaXN0cztcbiAgfVxuXG4gIHNlYXJjaFRlcm06IHN0cmluZyA9ICcnO1xuXG4gIHByaXZhdGUgX3ZjOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfaW5pdCA9IGZhbHNlO1xuICBwcml2YXRlIF9lZGl0Q29uZGl0aW9uU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2VkaXRDb25kaXRpb25EaWFsb2c6IE1hdERpYWxvZ1JlZjxBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZz4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfYmVmb3JlTm9kZXNVcGRhdGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdENob2ljZXNPcmlnaW5TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZWRpdE5vZGVzVmFsaWRhdGlvblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lZGl0Q2hvaWNlc09yaWdpbkRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiQ2hvaWNlc09yaWdpbkVkaXRvckRpYWxvZz4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllckRpYWxvZzogTWF0RGlhbG9nUmVmPEFqZkZiU3RyaW5nSWRlbnRpZmllckRpYWxvZ0NvbXBvbmVudD4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllclN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2xhc3RTY3JvbGxUb3A6IG51bWJlciA9IDA7XG5cbiAgeGxzZm9ybURvd25sb2FkaW5nID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfc2VydmljZTogQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgX2RpYWxvZzogTWF0RGlhbG9nLFxuICAgIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIHRoaXMuX25vZGVUeXBlcyA9IF9zZXJ2aWNlLmF2YWlsYWJsZU5vZGVUeXBlcztcbiAgICB0aGlzLl9ub2RlRW50cmllc1RyZWUgPSBfc2VydmljZS5ub2RlRW50cmllc1RyZWU7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnMgPSBfc2VydmljZS5jaG9pY2VzT3JpZ2lucztcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uU3ViID0gdGhpcy5fc2VydmljZS5lZGl0ZWRDb25kaXRpb24uc3Vic2NyaWJlKFxuICAgICAgKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uIHwgbnVsbCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZyAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fZWRpdENvbmRpdGlvbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX2VkaXRDb25kaXRpb25EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNvbmRpdGlvbkVkaXRvckRpYWxvZywge1xuICAgICAgICAgICAgZGlzYWJsZUNsb3NlOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gICAgdGhpcy5fZWRpdENob2ljZXNPcmlnaW5TdWIgPSB0aGlzLl9zZXJ2aWNlLmVkaXRlZENob2ljZXNPcmlnaW4uc3Vic2NyaWJlKFxuICAgICAgKGNob2ljZXNPcmlnaW46IEFqZkNob2ljZXNPcmlnaW48YW55PiB8IG51bGwpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luRGlhbG9nICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLl9lZGl0Q2hvaWNlc09yaWdpbkRpYWxvZy5jbG9zZSgpO1xuICAgICAgICAgIHRoaXMuX2VkaXRDaG9pY2VzT3JpZ2luRGlhbG9nID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hvaWNlc09yaWdpbiAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5fZWRpdENob2ljZXNPcmlnaW5EaWFsb2cgPSB0aGlzLl9kaWFsb2cub3BlbihBamZGYkNob2ljZXNPcmlnaW5FZGl0b3JEaWFsb2csIHtcbiAgICAgICAgICAgIGRpc2FibGVDbG9zZTogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuXG4gICAgdGhpcy5fZWRpdE5vZGVzVmFsaWRhdGlvblN1YiA9IHRoaXMuX3NlcnZpY2UuZWRpdGVkTm9kZXNWYWxpZGF0aW9uLnN1YnNjcmliZShcbiAgICAgIChub2RlVmFsaWRhdGlvbjogQWpmRm9ybUJ1aWxkZXJWYWxpZGF0aW9uIHwgbnVsbCkgPT4ge1xuICAgICAgICBpZiAobm9kZVZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX2Zvcm1CdWlsZGVyVmFsaWRhdGlvbi5uZXh0KG5vZGVWYWxpZGF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuXG4gICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVTdWIgPSB0aGlzLl9zZXJ2aWNlLmJlZm9yZU5vZGVzVXBkYXRlLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kZXNpZ25lckNvbnQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9sYXN0U2Nyb2xsVG9wID0gdGhpcy5kZXNpZ25lckNvbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3A7XG4gICAgfSk7XG5cbiAgICB0aGlzLm5vZGVFbnRyaWVzVHJlZS5waXBlKHNhbXBsZSg8T2JzZXJ2YWJsZTx2b2lkPj50aGlzLl92YykpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBpZiAodGhpcy5kZXNpZ25lckNvbnQgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmRlc2lnbmVyQ29udC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IHRoaXMuX2xhc3RTY3JvbGxUb3A7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyU3ViID0gdGhpcy5fc2VydmljZS5zdHJpbmdJZGVudGlmaWVyLnN1YnNjcmliZSgoKSA9PiB7fSk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgdGhpcy5fdmMuZW1pdCgpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIC8vIFRoZSBleHBhbmRlZCBzdGF0dXMgb2YgdGhlIHNsaWRlcyBsaXZlcyBpbiB0aGUgc2VydmljZSwgd2hpY2ggb3V0bGl2ZXMgYVxuICAgIC8vIHNpbmdsZSBmb3JtIGJ1aWxkZXIgaW5zdGFuY2U6IHJlLWFwcGx5IHRoZSBjdXJyZW50IHN0YXRlLCBzbyB0aGF0IGEgbmV3bHlcbiAgICAvLyBjcmVhdGVkIGZvcm0gYnVpbGRlciBhbHdheXMgbWF0Y2hlcyBpdHMgb3duIGV4cGFuZFNsaWRlcyB2YWx1ZS5cbiAgICB0aGlzLl9zZXRTbGlkZXNFeHBhbmRlZCh0aGlzLl9leHBhbmRTbGlkZXMpO1xuICAgIHRoaXMuX3NldEN1cnJlbnRGb3JtKCk7XG4gICAgdGhpcy5faW5pdCA9IHRydWU7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0Q29uZGl0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lZGl0Q2hvaWNlc09yaWdpblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2VkaXROb2Rlc1ZhbGlkYXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc2VydmljZS5zZXRGb3JtKG51bGwpO1xuICAgIHRoaXMuX3NlcnZpY2UucmVzZXROb2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cygpO1xuICAgIHRoaXMuX3NlcnZpY2UucmVzZXRFbXB0eUNvdW50ZXJzKCk7XG4gIH1cblxuICBjcmVhdGVDaG9pY2VzT3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX3NlcnZpY2UuY3JlYXRlQ2hvaWNlc09yaWdpbigpO1xuICB9XG5cbiAgZGlzYWJsZURyb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGlzYWJsZUZpZWxkRHJvcChpdGVtOiBDZGtEcmFnPEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gZGlzYWJsZUZpZWxkRHJvcFByZWRpY2F0ZShpdGVtKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyB3aGVuIGEgZmllbGQgb3Igc2xpZGUgbm9kZSBpcyBtb3ZlZCBvciBpbnNlcnRlZCBieSBkcmFnJmRyb3BwaW5nIGluIHRoZSBmb3JtYnVpbGRlci5cbiAgICogQHBhcmFtIGV2ZW50IFRoZSBkcm9wIGV2ZW50LlxuICAgKiBAcGFyYW0gY29udGVudCBUcnVlIGlmIHRoZSBjdXJyZW50IG5vZGVFbnRyeSBjb250YWlucyBvdGhlciBub2RlRW50cmllcy5cbiAgICovXG4gIG9uRHJvcChcbiAgICBldmVudDogQ2RrRHJhZ0Ryb3A8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+IHwgQ2RrRHJhZ0Ryb3A8QWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5PixcbiAgICBjb250ZW50ID0gZmFsc2UsXG4gICk6IHZvaWQge1xuICAgIG9uRHJvcFByb2Nlc3MoZXZlbnQsIHRoaXMuX3NlcnZpY2UsIG51bGwsIGNvbnRlbnQpO1xuICB9XG5cbiAgZWRpdENob2ljZXNPcmlnaW4oY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5fc2VydmljZS5lZGl0Q2hvaWNlc09yaWdpbihjaG9pY2VzT3JpZ2luKTtcbiAgfVxuXG4gIGVkaXRTdHJpbmdJZGVudGlmaWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9zdHJpbmdJZGVudGlmaWVyRGlhbG9nICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJEaWFsb2cuY2xvc2UoKTtcbiAgICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXJEaWFsb2cgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyRGlhbG9nID0gdGhpcy5fZGlhbG9nLm9wZW4oQWpmRmJTdHJpbmdJZGVudGlmaWVyRGlhbG9nQ29tcG9uZW50LCB7XG4gICAgICB3aWR0aDogJzYwJScsXG4gICAgICBoZWlnaHQ6ICc2MCUnLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEV4cGFuZHMgYWxsIHRoZSBzbGlkZXMgb2YgdGhlIGRlc2lnbmVyIGFuZCBrZWVwcyB0aGUgc2xpZGVzIGFkZGVkIGxhdGVyIGV4cGFuZGVkLlxuICAgKi9cbiAgZXhwYW5kQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuX3NldFNsaWRlc0V4cGFuZGVkKHRydWUsIHRydWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbGxhcHNlcyBhbGwgdGhlIHNsaWRlcyBvZiB0aGUgZGVzaWduZXIgYW5kIGtlZXBzIHRoZSBzbGlkZXMgYWRkZWQgbGF0ZXIgY29sbGFwc2VkLlxuICAgKi9cbiAgY29sbGFwc2VBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5fc2V0U2xpZGVzRXhwYW5kZWQoZmFsc2UsIHRydWUpO1xuICB9XG5cbiAgZXhwYW5kVG9nZ2xlKGV2dDogTWF0U2xpZGVUb2dnbGVDaGFuZ2UpOiB2b2lkIHtcbiAgICB0aGlzLl9zZXRTbGlkZXNFeHBhbmRlZChldnQuY2hlY2tlZCwgdHJ1ZSk7XG4gIH1cblxuICAvKipcbiAgICogQXBwbGllcyB0aGUgc2xpZGVzIGV4cGFuc2lvbiBzdGF0ZSB0byB0aGUgc2VydmljZS5cbiAgICogQHBhcmFtIGV4cGFuZGVkIFRydWUgdG8ga2VlcCB0aGUgc2xpZGVzIGV4cGFuZGVkXG4gICAqIEBwYXJhbSBub3RpZnkgVHJ1ZSB0byBlbWl0IGV4cGFuZFNsaWRlc0NoYW5nZSB3aGVuIHRoZSBzdGF0ZSBjaGFuZ2VzXG4gICAqL1xuICBwcml2YXRlIF9zZXRTbGlkZXNFeHBhbmRlZChleHBhbmRlZDogYm9vbGVhbiwgbm90aWZ5OiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcbiAgICBjb25zdCBjaGFuZ2VkID0gdGhpcy5fZXhwYW5kU2xpZGVzICE9PSBleHBhbmRlZDtcbiAgICB0aGlzLl9leHBhbmRTbGlkZXMgPSBleHBhbmRlZDtcbiAgICBpZiAoZXhwYW5kZWQpIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuZXhwYW5kQWxsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NlcnZpY2UuY29sbGFwc2VBbGwoKTtcbiAgICB9XG4gICAgaWYgKG5vdGlmeSAmJiBjaGFuZ2VkKSB7XG4gICAgICB0aGlzLmV4cGFuZFNsaWRlc0NoYW5nZS5lbWl0KGV4cGFuZGVkKTtcbiAgICB9XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgYXN5bmMgZG93bmxvYWRBc1hsc2Zvcm0oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy54bHNmb3JtRG93bmxvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZm9ybSA9IGF3YWl0IGZpcnN0VmFsdWVGcm9tKHRoaXMuX3NlcnZpY2UuZ2V0Q3VycmVudEZvcm0oKSk7XG4gICAgICBjb25zdCBqc29uID0gSlNPTi5zdHJpbmdpZnkoZm9ybSk7XG4gICAgICBjb25zdCBmaWxlQmxvYiA9IG5ldyBCbG9iKFtqc29uXSwge3R5cGU6ICdhcHBsaWNhdGlvbi9qc29uJ30pO1xuICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgnanNvbkZpbGUnLCBmaWxlQmxvYiwgJ2Zvcm0uanNvbicpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnaHR0cHM6Ly9mb3JtY29udi5oZXJva3VhcHAuY29tL3Jlc3VsdC54bHN4Jywge1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgYm9keTogZm9ybURhdGEsXG4gICAgICB9KTtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgY29uc3QgZXJyb3JUZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgICAgICB3aW5kb3cuYWxlcnQoZXJyb3JUZXh0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVzdWx0QmxvYiA9IGF3YWl0IHJlc3BvbnNlLmJsb2IoKTtcbiAgICAgIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwocmVzdWx0QmxvYik7XG4gICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgYS5ocmVmID0gdXJsO1xuICAgICAgYS5kb3dubG9hZCA9ICdyZXN1bHQueGxzeCc7XG4gICAgICBhLmNsaWNrKCk7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMueGxzZm9ybURvd25sb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0Q3VycmVudEZvcm0oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Zvcm0gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9zZXJ2aWNlLnNldEZvcm0odGhpcy5fZm9ybSk7XG4gIH1cbn1cbiIsIjxtYXQtdG9vbGJhciBjbGFzcz1cImFqZi1mb3JtYnVpbGRlci10b29sYmFyXCI+XG4gIDxidXR0b24gbWF0LWljb24tYnV0dG9uIChjbGljayk9XCJsZWZ0U2lkZW5hdi50b2dnbGUoKVwiIGFyaWEtbGFiZWw9XCJUb2dnbGUgc2lkZSBuYXZpZ2F0aW9uXCI+XG4gICAgPG1hdC1pY29uPmFkZF9ib3g8L21hdC1pY29uPlxuICA8L2J1dHRvbj5cbiAgPGJ1dHRvbiBtYXQtYnV0dG9uIFttYXRNZW51VHJpZ2dlckZvcl09XCJjaG9pY2VzTWVudVwiPlxuICAgIHt7ICdDaG9pY2VzJyB8IHRyYW5zbG9jbyB9fVxuICA8L2J1dHRvbj5cbiAgPGJ1dHRvbiBtYXQtYnV0dG9uIChjbGljayk9XCJlZGl0U3RyaW5nSWRlbnRpZmllcigpXCI+XG4gICAge3sgJ0RlZmF1bHQgY29sdW1ucycgfCB0cmFuc2xvY28gfX1cbiAgPC9idXR0b24+XG5cbiAgPGRpdiBjbGFzcz1cImFqZi10b29sYmFyLWdyb3VwXCI+XG4gICAgPGJ1dHRvblxuICAgICAgbWF0LWljb24tYnV0dG9uXG4gICAgICBhcmlhLWxhYmVsPVwiQ29sbGFwc2UgYWxsIHNsaWRlc1wiXG4gICAgICBtYXRUb29sdGlwPVwiS2VlcCBzbGlkZXMgY29sbGFwc2VkXCJcbiAgICAgIChjbGljayk9XCJjb2xsYXBzZUFsbCgpXCJcbiAgICA+XG4gICAgICA8bWF0LWljb24+dW5mb2xkX2xlc3M8L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuXG4gICAgPG1hdC1zbGlkZS10b2dnbGVcbiAgICAgIGNvbG9yPVwicHJpbWFyeVwiXG4gICAgICBbY2hlY2tlZF09XCJleHBhbmRTbGlkZXNcIlxuICAgICAgKGNoYW5nZSk9XCJleHBhbmRUb2dnbGUoJGV2ZW50KVwiXG4gICAgICBhcmlhLWxhYmVsPVwiVG9nZ2xlIHNsaWRlIGV4cGFuc2lvblwiXG4gICAgPjwvbWF0LXNsaWRlLXRvZ2dsZT5cblxuICAgIDxidXR0b25cbiAgICAgIG1hdC1pY29uLWJ1dHRvblxuICAgICAgYXJpYS1sYWJlbD1cIkV4cGFuZCBhbGwgc2xpZGVzXCJcbiAgICAgIG1hdFRvb2x0aXA9XCJLZWVwIHNsaWRlcyBleHBhbmRlZFwiXG4gICAgICAoY2xpY2spPVwiZXhwYW5kQWxsKClcIlxuICAgID5cbiAgICAgIDxtYXQtaWNvbj51bmZvbGRfbW9yZTwvbWF0LWljb24+XG4gICAgPC9idXR0b24+XG4gIDwvZGl2PlxuXG4gIDxzcGFuIGNsYXNzPVwiYWpmLXNwYWNlclwiPjwvc3Bhbj5cblxuICA8YnV0dG9uIG1hdC1idXR0b24gKGNsaWNrKT1cImRvd25sb2FkQXNYbHNmb3JtKClcIiBbZGlzYWJsZWRdPVwieGxzZm9ybURvd25sb2FkaW5nXCI+XG4gICAge3sgJ0Rvd25sb2FkIGFzIFhMU0Zvcm0nIHwgdHJhbnNsb2NvIH19XG4gIDwvYnV0dG9uPlxuXG4gIDxtYXQtbWVudSAjY2hvaWNlc01lbnU9XCJtYXRNZW51XCI+XG4gICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJjcmVhdGVDaG9pY2VzT3JpZ2luKClcIj5cbiAgICAgIHt7ICdOZXcuLicgfCB0cmFuc2xvY28gfX1cbiAgICA8L2J1dHRvbj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY2hvaWNlc09yaWdpbnMgfCBhc3luYyBhcyBjb3NcIj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgbWF0LW1lbnUtaXRlbVxuICAgICAgICAqbmdGb3I9XCJsZXQgY2hvaWNlc09yaWdpbiBvZiBjb3NcIlxuICAgICAgICAoY2xpY2spPVwiZWRpdENob2ljZXNPcmlnaW4oY2hvaWNlc09yaWdpbilcIlxuICAgICAgPlxuICAgICAgICB7eyAoY2hvaWNlc09yaWdpbi5sYWJlbCB8fCBjaG9pY2VzT3JpZ2luLm5hbWUpIHwgdHJhbnNsb2NvIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgPC9tYXQtbWVudT5cbjwvbWF0LXRvb2xiYXI+XG5cbjxkaXYgY2xhc3M9XCJhamYtZm9ybXRyZWUtY29udGFpbmVyXCI+XG4gIDxtYXQtZHJhd2VyLWNvbnRhaW5lclxuICAgIGNka0Ryb3BMaXN0R3JvdXBcbiAgICBjbGFzcz1cImFqZi1mb3JtdHJlZS1kcmF3ZXItY29udGFpbmVyXCJcbiAgPlxuICAgIDxtYXQtZHJhd2VyICNsZWZ0U2lkZW5hdiBwb3NpdGlvbj1cInN0YXJ0XCIgbW9kZT1cIm92ZXJcIiBjbGFzcz1cImFqZi1zaWRlbmF2LW1vZGVyblwiPlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1kcmF3ZXItaGVhZGVyXCI+XG4gICAgICAgIDxtYXQtZm9ybS1maWVsZCBjbGFzcz1cImFqZi1zZWFyY2gtZmllbGRcIiBmbG9hdExhYmVsPVwiYXV0b1wiPlxuICAgICAgICAgIDxtYXQtaWNvbiBtYXRQcmVmaXg+c2VhcmNoPC9tYXQtaWNvbj5cbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIG1hdElucHV0XG4gICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cInNlYXJjaFRlcm1cIlxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJ7eyAnU2VhcmNoIGVsZW1lbnRzLi4uJyB8IHRyYW5zbG9jbyB9fVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAqbmdJZj1cInNlYXJjaFRlcm1cIlxuICAgICAgICAgICAgbWF0U3VmZml4XG4gICAgICAgICAgICBtYXQtaWNvbi1idXR0b25cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9XCJDbGVhclwiXG4gICAgICAgICAgICAoY2xpY2spPVwic2VhcmNoVGVybT0nJ1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPG1hdC1pY29uPmNsb3NlPC9tYXQtaWNvbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9tYXQtZm9ybS1maWVsZD5cbiAgICAgIDwvZGl2PlxuICAgIFxuICAgICAgPGRpdlxuICAgICAgICAjc291cmNlRHJvcExpc3RcbiAgICAgICAgY2xhc3M9XCJhamYtZHJhd2VyLWNvbnRlbnRcIlxuICAgICAgICBjZGtEcm9wTGlzdFxuICAgICAgICBbY2RrRHJvcExpc3RDb25uZWN0ZWRUb109XCIoY29ubmVjdGVkRHJvcExpc3RzIHwgYXN5bmMpIVwiXG4gICAgICAgIFtjZGtEcm9wTGlzdEVudGVyUHJlZGljYXRlXT1cImRpc2FibGVEcm9wXCJcbiAgICAgICAgW2Nka0Ryb3BMaXN0RGF0YV09XCJub2RlVHlwZXNcIlxuICAgICAgPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBncm91cCBvZiBub2RlVHlwZXMgfCBub2RlVHlwZUZpbHRlcjogc2VhcmNoVGVybSB8IG5vZGVUeXBlR3JvdXBzXCI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1mYi1jYXRlZ29yeS1oZWFkZXJcIiAqbmdJZj1cImdyb3VwLmNhdGVnb3J5XCI+XG4gICAgICAgICAgICB7eyBncm91cC5jYXRlZ29yeSB8IHRyYW5zbG9jbyB9fVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxhamYtZmItbm9kZS10eXBlLWVudHJ5XG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgbm9kZVR5cGUgb2YgZ3JvdXAubm9kZVR5cGVzXCJcbiAgICAgICAgICAgIGNka0RyYWdcbiAgICAgICAgICAgIFtjZGtEcmFnRGF0YV09XCJub2RlVHlwZVwiXG4gICAgICAgICAgICAoY2RrRHJhZ1N0YXJ0ZWQpPVwibGVmdFNpZGVuYXYuY2xvc2UoKVwiXG4gICAgICAgICAgICBbbm9kZVR5cGVdPVwibm9kZVR5cGVcIlxuICAgICAgICAgID48L2FqZi1mYi1ub2RlLXR5cGUtZW50cnk+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPC9kaXY+XG4gICAgPC9tYXQtZHJhd2VyPlxuICAgIFxuICAgIDxkaXYgI2Rlc2lnbmVyIGNsYXNzPVwiYWpmLWRlc2lnbmVyXCI+XG4gICAgICA8YWpmLWZiLW5vZGUtZW50cnlcbiAgICAgICAgaWQ9XCJzbGlkZXMtbGlzdFwiXG4gICAgICAgIGNka0Ryb3BMaXN0XG4gICAgICAgIChjZGtEcm9wTGlzdERyb3BwZWQpPVwib25Ecm9wKCRldmVudClcIlxuICAgICAgICBbY2RrRHJvcExpc3RFbnRlclByZWRpY2F0ZV09XCJkaXNhYmxlRmllbGREcm9wXCJcbiAgICAgICAgKm5nRm9yPVwibGV0IG5vZGVFbnRyeSBvZiAobm9kZUVudHJpZXNUcmVlIHwgYXN5bmMpOyBsZXQgaXNGaXJzdCA9IGZpcnN0XCJcbiAgICAgICAgW2lzRmlyc3RdPVwiaXNGaXJzdFwiXG4gICAgICAgIFtub2RlRW50cnldPVwibm9kZUVudHJ5XCJcbiAgICAgID48L2FqZi1mYi1ub2RlLWVudHJ5PlxuICAgIDwvZGl2PlxuICA8L21hdC1kcmF3ZXItY29udGFpbmVyPlxuXG4gIDxkaXYgY2xhc3M9XCJhamYtZm9ybXRyZWUtcHJvcGVydGllc1wiICNyaWdodFNpZGVuYXYgcG9zaXRpb249XCJlbmRcIiBtb2RlPVwic2lkZVwiPlxuICAgIDxhamYtZmItbm9kZS1wcm9wZXJ0aWVzPjwvYWpmLWZiLW5vZGUtcHJvcGVydGllcz5cbiAgPC9kaXY+XG48L2Rpdj5cbiJdfQ==