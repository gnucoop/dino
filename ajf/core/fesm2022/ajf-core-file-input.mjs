import * as i0 from '@angular/core';
import { Directive, EventEmitter, forwardRef, ViewEncapsulation, ChangeDetectionStrategy, Component, Output, Input, ViewChild, ContentChildren, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i1 from '@angular/platform-browser';
import * as i2 from '@ajf/core/common';
import { AjfCommonModule } from '@ajf/core/common';
import * as i3 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4 from '@ngneat/transloco';
import { AjfTranslocoModule } from '@ajf/core/transloco';

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
 * Default size limit for file input fields.
 */
const AjfFileSizeLimit = 52428800;

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
const _c0 = ["nativeInput"];
const _c1 = [[["", "ajfDropMessage", ""]], [["", "ajfFilePreview", ""]]];
const _c2 = ["[ajfDropMessage]", "[ajfFilePreview]"];
function AjfFileInput_div_1_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵprojection(1);
    i0.ɵɵelementContainerEnd();
} }
function AjfFileInput_div_1_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵtext(0);
    i0.ɵɵpipe(1, "transloco");
} if (rf & 2) {
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(1, 1, "Drop your file here or click to select"));
} }
function AjfFileInput_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r2 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 7);
    i0.ɵɵlistener("click", function AjfFileInput_div_1_Template_div_click_0_listener() { i0.ɵɵrestoreView(_r2); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.triggerNativeInput()); });
    i0.ɵɵtemplate(1, AjfFileInput_div_1_ng_container_1_Template, 2, 0, "ng-container", 8)(2, AjfFileInput_div_1_ng_template_2_Template, 2, 3, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const defaultDropMessage_r4 = i0.ɵɵreference(3);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2._dropMessageChildren == null ? null : ctx_r2._dropMessageChildren.length)("ngIfElse", defaultDropMessage_r4);
} }
function AjfFileInput_ng_template_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵprojection(1, 1);
    i0.ɵɵelementContainerEnd();
} }
function AjfFileInput_ng_template_2_ng_template_2_div_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 18);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r2.sizeLabel);
} }
function AjfFileInput_ng_template_2_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 14);
    i0.ɵɵelement(1, "img", 15);
    i0.ɵɵelementStart(2, "div", 16);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(4, AjfFileInput_ng_template_2_ng_template_2_div_4_Template, 2, 1, "div", 17);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵproperty("src", ctx_r2.fileIcon, i0.ɵɵsanitizeUrl);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r2.value == null ? null : ctx_r2.value.name);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2.sizeLabel);
} }
function AjfFileInput_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9);
    i0.ɵɵtemplate(1, AjfFileInput_ng_template_2_ng_container_1_Template, 2, 0, "ng-container", 8)(2, AjfFileInput_ng_template_2_ng_template_2_Template, 5, 3, "ng-template", null, 3, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div", 10)(5, "button", 11);
    i0.ɵɵlistener("click", function AjfFileInput_ng_template_2_Template_button_click_5_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.triggerNativeInput()); });
    i0.ɵɵtext(6);
    i0.ɵɵpipe(7, "transloco");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "button", 12);
    i0.ɵɵlistener("click", function AjfFileInput_ng_template_2_Template_button_click_8_listener() { i0.ɵɵrestoreView(_r5); const ctx_r2 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r2.resetValue()); });
    i0.ɵɵtext(9);
    i0.ɵɵpipe(10, "transloco");
    i0.ɵɵelementStart(11, "div", 13);
    i0.ɵɵtext(12);
    i0.ɵɵpipe(13, "transloco");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const defaultFilePreview_r6 = i0.ɵɵreference(3);
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r2._filePreviewChildren == null ? null : ctx_r2._filePreviewChildren.length)("ngIfElse", defaultFilePreview_r6);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(7, 5, "Replace"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", i0.ɵɵpipeBind1(10, 7, "Remove"), " ");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(13, 9, "Delete"));
} }
class AjfDropMessage {
    static { this.ɵfac = function AjfDropMessage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfDropMessage)(); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfDropMessage, selectors: [["", "ajfDropMessage", ""]] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfDropMessage, [{
        type: Directive,
        args: [{ selector: '[ajfDropMessage]' }]
    }], null, null); })();
class AjfFilePreview {
    get value() {
        return this._value;
    }
    constructor(vcr) {
        this._valueSub = Subscription.EMPTY;
        const input = vcr.injector.get(AjfFileInput, null);
        const isValueGuard = (value) => value != null;
        if (input) {
            this._value = input.value;
            this._valueSub = input.valueChange.pipe(filter(isValueGuard)).subscribe(value => {
                this._value = value;
            });
        }
    }
    ngOnDestroy() {
        this._valueSub.unsubscribe();
    }
    static { this.ɵfac = function AjfFilePreview_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFilePreview)(i0.ɵɵdirectiveInject(i0.ViewContainerRef)); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfFilePreview, selectors: [["", "ajfFilePreview", ""]], exportAs: ["ajfFilePreview"] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFilePreview, [{
        type: Directive,
        args: [{
                selector: '[ajfFilePreview]',
                exportAs: 'ajfFilePreview',
            }]
    }], () => [{ type: i0.ViewContainerRef }], null); })();
/**
 * It allows the upload of a file inside an AjfForm.
 *
 * @export
 * @class AjfFileInput
 */
class AjfFileInput {
    get emptyFile() {
        return this._emptyFile;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (value instanceof File) {
            this._processFileUpload(value);
        }
        else if (value instanceof FileList) {
            if (value.length === 1) {
                this._processFileUpload(value[0]);
            }
        }
        else if (value == null || (isAjfFile(value) && isValidMimeType(value.type, this.accept))) {
            this._value = value;
            if (isAjfFile(value)) {
                this._emptyFile = false;
            }
            this._valueChange.emit(this._value);
            if (this._controlValueAccessorChangeFn != null) {
                this._controlValueAccessorChangeFn(this.value);
            }
            this._cdr.detectChanges();
        }
    }
    /**
     * The held file's size, ready to show next to its name. Sizes only reach the
     * value when the file was picked in this session, so it can legitimately be
     * missing for a file loaded from a saved form.
     */
    get sizeLabel() {
        const size = this._value?.size;
        if (size == null) {
            return null;
        }
        if (size < 1024) {
            return `${size} B`;
        }
        if (size < 1024 * 1024) {
            return `${Math.round(size / 1024)} KB`;
        }
        return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    }
    constructor(domSanitizer, _cdr) {
        this._cdr = _cdr;
        this._valueChange = new EventEmitter();
        this.valueChange = this._valueChange;
        /**
         * Event emitter for the delete file action
         */
        this._deleteFile = new EventEmitter();
        this.deleteFile = this._deleteFile;
        /**
         * The method to be called in order to update ngModel.
         */
        this._controlValueAccessorChangeFn = () => { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         */
        this._onTouched = () => { };
        this._emptyFile = true;
        this.fileIcon = domSanitizer.bypassSecurityTrustResourceUrl(fileIcon);
        this.removeIcon = domSanitizer.bypassSecurityTrustResourceUrl(trashIcon);
    }
    onFileDrop(files) {
        if (files.length !== 1) {
            return;
        }
        const file = files[0];
        this._processFileUpload(file);
    }
    onSelectFile() {
        const files = this._nativeInput.nativeElement.files;
        if (files == null) {
            return;
        }
        const file = files.item(0);
        if (file == null) {
            return;
        }
        this._processFileUpload(files.item(0));
    }
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    resetValue() {
        if (this.value !== null) {
            if (this.value.url && this.value.url.length) {
                this._deleteFile.emit(this.value.url);
                this.value.deleteUrl = true;
                this.value.content = null;
                this.value.name = null;
                this.value.size = 0;
            }
            else {
                this.value = null;
            }
        }
        this._nativeInput.nativeElement.value = '';
        this._emptyFile = true;
        this._cdr.markForCheck();
    }
    triggerNativeInput() {
        if (!this._nativeInput) {
            return;
        }
        this._nativeInput.nativeElement.click();
    }
    writeValue(value) {
        this.value = value;
        if (value == null || value == undefined || (value !== null && value.deleteUrl)) {
            this._emptyFile = true;
        }
        else {
            this._emptyFile = false;
        }
        this._cdr.markForCheck();
    }
    _processFileUpload(file) {
        const reader = new FileReader();
        const { name, size, type } = file;
        // URL is kept in the field value, and used to delete the old file when it's replaced.
        const url = this.value && this.value.url ? this.value.url : undefined;
        if (!isValidMimeType(type, this.accept)) {
            return;
        }
        if (size >= AjfFileSizeLimit) {
            this.value = { name, size, type, url, content: 'File too large' };
            this._emptyFile = false;
            return;
        }
        reader.onload = (_) => {
            const content = reader.result;
            if (typeof content !== 'string') {
                return;
            }
            this.value = { name, size, type, url, content };
            this._emptyFile = false;
        };
        reader.readAsDataURL(file);
    }
    static { this.ɵfac = function AjfFileInput_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFileInput)(i0.ɵɵdirectiveInject(i1.DomSanitizer), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: AjfFileInput, selectors: [["ajf-file-input"]], contentQueries: function AjfFileInput_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
            i0.ɵɵcontentQuery(dirIndex, AjfDropMessage, 4);
            i0.ɵɵcontentQuery(dirIndex, AjfFilePreview, 4);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._dropMessageChildren = _t);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._filePreviewChildren = _t);
        } }, viewQuery: function AjfFileInput_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, 5);
        } if (rf & 2) {
            let _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._nativeInput = _t.first);
        } }, hostVars: 2, hostBindings: function AjfFileInput_HostBindings(rf, ctx) { if (rf & 2) {
            i0.ɵɵclassProp("ajf-file-input", true);
        } }, inputs: { accept: "accept", value: "value" }, outputs: { valueChange: "valueChange", deleteFile: "deleteFile" }, features: [i0.ɵɵProvidersFeature([
                {
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => AjfFileInput),
                    multi: true,
                },
            ])], ngContentSelectors: _c2, decls: 6, vars: 3, consts: [["fileInfo", ""], ["nativeInput", ""], ["defaultDropMessage", ""], ["defaultFilePreview", ""], ["ajfDnd", "", 1, "ajf-drop-zone", 3, "file"], ["class", "ajf-drop-message", 3, "click", 4, "ngIf", "ngIfElse"], ["name", "", "aria-label", "file input", "type", "file", 3, "change", "accept"], [1, "ajf-drop-message", 3, "click"], [4, "ngIf", "ngIfElse"], [1, "ajf-file-info"], [1, "ajf-file-actions"], ["type", "button", 1, "ajf-replace-file", 3, "click"], ["type", "button", 1, "ajf-remove-file", 3, "click"], [1, "ajf-screen-reader-only"], [1, "ajf-file-info-content"], ["alt", "", 3, "src"], [1, "ajf-file-name"], ["class", "ajf-file-size", 4, "ngIf"], [1, "ajf-file-size"]], template: function AjfFileInput_Template(rf, ctx) { if (rf & 1) {
            const _r1 = i0.ɵɵgetCurrentView();
            i0.ɵɵprojectionDef(_c1);
            i0.ɵɵelementStart(0, "div", 4);
            i0.ɵɵlistener("file", function AjfFileInput_Template_div_file_0_listener($event) { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onFileDrop($event)); });
            i0.ɵɵtemplate(1, AjfFileInput_div_1_Template, 4, 2, "div", 5)(2, AjfFileInput_ng_template_2_Template, 14, 11, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "input", 6, 1);
            i0.ɵɵlistener("change", function AjfFileInput_Template_input_change_4_listener() { i0.ɵɵrestoreView(_r1); return i0.ɵɵresetView(ctx.onSelectFile()); });
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            const fileInfo_r7 = i0.ɵɵreference(3);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.emptyFile)("ngIfElse", fileInfo_r7);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("accept", ctx.accept);
        } }, dependencies: [i2.AjfDndDirective, i3.NgIf, i4.TranslocoPipe], styles: [".ajf-file-input{position:relative;display:flex;align-items:stretch;overflow:hidden;width:100%}.ajf-file-input .ajf-drop-zone{display:flex;flex:1 1 auto;align-items:center;gap:12px;box-sizing:border-box;min-height:var(--ajf-control-h, 44px);padding:0 12px;border:1px dashed var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}.ajf-file-input .ajf-drop-zone.ajf-dnd-over{border-color:var(--ajf-accent, #0f4c5c);background:var(--ajf-accent-soft, #e8f1f5)}.ajf-file-input .ajf-drop-message{flex:1 1 auto;align-self:stretch;color:var(--ajf-text-muted, #7a736a);font-size:13px;line-height:calc(var(--ajf-control-h, 44px) - 2px);cursor:pointer}.ajf-file-input .ajf-file-info{display:flex;flex:1 1 auto;align-items:center;min-width:0}.ajf-file-input .ajf-file-info-content{display:flex;align-items:center;gap:10px;min-width:0}.ajf-file-input .ajf-file-info-content img{width:20px;height:20px}.ajf-file-input .ajf-file-name{overflow:hidden;color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:13px;text-overflow:ellipsis;white-space:nowrap}.ajf-file-input .ajf-file-size{color:var(--ajf-text-muted, #7a736a);font-size:12px;white-space:nowrap}.ajf-file-input .ajf-file-actions{display:flex;flex:0 0 auto;align-items:center;gap:12px}.ajf-file-input .ajf-replace-file,.ajf-file-input .ajf-remove-file{padding:0;border:0;background:none;font-family:inherit;font-size:13px;cursor:pointer}.ajf-file-input .ajf-replace-file:hover,.ajf-file-input .ajf-remove-file:hover{text-decoration:underline}.ajf-file-input .ajf-replace-file{color:var(--ajf-accent-ink, #2d6b7f)}.ajf-file-input .ajf-remove-file{color:var(--ajf-danger, #b8362b)}.ajf-file-input .ajf-image-preview img{max-width:56px;max-height:40px;border-radius:3px}.ajf-file-input input{position:absolute;top:-9999px;left:-9999px;z-index:-1;opacity:0}.ajf-file-input .ajf-screen-reader-only{display:none}\n"], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFileInput, [{
        type: Component,
        args: [{ selector: 'ajf-file-input', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                    '[class.ajf-file-input]': 'true',
                }, providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AjfFileInput),
                        multi: true,
                    },
                ], template: "<div ajfDnd (file)=\"onFileDrop($event)\" class=\"ajf-drop-zone\">\n  <div *ngIf=\"emptyFile; else fileInfo\" class=\"ajf-drop-message\" (click)=\"triggerNativeInput()\">\n    <ng-container *ngIf=\"_dropMessageChildren?.length; else defaultDropMessage\">\n      <ng-content select=\"[ajfDropMessage]\"></ng-content>\n    </ng-container>\n    <ng-template #defaultDropMessage>{{\n      'Drop your file here or click to select' | transloco\n    }}</ng-template>\n  </div>\n  <ng-template #fileInfo>\n    <div class=\"ajf-file-info\">\n      <ng-container *ngIf=\"_filePreviewChildren?.length; else defaultFilePreview\">\n        <ng-content select=\"[ajfFilePreview]\"></ng-content>\n      </ng-container>\n      <ng-template #defaultFilePreview>\n        <div class=\"ajf-file-info-content\">\n          <img [src]=\"fileIcon\" alt=\"\" />\n          <div class=\"ajf-file-name\">{{ value?.name }}</div>\n          <div class=\"ajf-file-size\" *ngIf=\"sizeLabel\">{{ sizeLabel }}</div>\n        </div>\n      </ng-template>\n    </div>\n    <div class=\"ajf-file-actions\">\n      <button type=\"button\" class=\"ajf-replace-file\" (click)=\"triggerNativeInput()\">\n        {{ 'Replace' | transloco }}\n      </button>\n      <button type=\"button\" class=\"ajf-remove-file\" (click)=\"resetValue()\">\n        {{ 'Remove' | transloco }}\n        <div class=\"ajf-screen-reader-only\">{{ 'Delete' | transloco }}</div>\n      </button>\n    </div>\n  </ng-template>\n</div>\n<input\n  #nativeInput\n  [accept]=\"accept\"\n  name=\"\"\n  aria-label=\"file input\"\n  type=\"file\"\n  (change)=\"onSelectFile()\"\n/>\n", styles: [".ajf-file-input{position:relative;display:flex;align-items:stretch;overflow:hidden;width:100%}.ajf-file-input .ajf-drop-zone{display:flex;flex:1 1 auto;align-items:center;gap:12px;box-sizing:border-box;min-height:var(--ajf-control-h, 44px);padding:0 12px;border:1px dashed var(--ajf-border-strong, #d5cfc6);border-radius:var(--ajf-radius, 4px);background:var(--ajf-surface, #fff)}.ajf-file-input .ajf-drop-zone.ajf-dnd-over{border-color:var(--ajf-accent, #0f4c5c);background:var(--ajf-accent-soft, #e8f1f5)}.ajf-file-input .ajf-drop-message{flex:1 1 auto;align-self:stretch;color:var(--ajf-text-muted, #7a736a);font-size:13px;line-height:calc(var(--ajf-control-h, 44px) - 2px);cursor:pointer}.ajf-file-input .ajf-file-info{display:flex;flex:1 1 auto;align-items:center;min-width:0}.ajf-file-input .ajf-file-info-content{display:flex;align-items:center;gap:10px;min-width:0}.ajf-file-input .ajf-file-info-content img{width:20px;height:20px}.ajf-file-input .ajf-file-name{overflow:hidden;color:var(--ajf-text, #1c1a17);font-family:var(--ajf-font-mono, monospace);font-size:13px;text-overflow:ellipsis;white-space:nowrap}.ajf-file-input .ajf-file-size{color:var(--ajf-text-muted, #7a736a);font-size:12px;white-space:nowrap}.ajf-file-input .ajf-file-actions{display:flex;flex:0 0 auto;align-items:center;gap:12px}.ajf-file-input .ajf-replace-file,.ajf-file-input .ajf-remove-file{padding:0;border:0;background:none;font-family:inherit;font-size:13px;cursor:pointer}.ajf-file-input .ajf-replace-file:hover,.ajf-file-input .ajf-remove-file:hover{text-decoration:underline}.ajf-file-input .ajf-replace-file{color:var(--ajf-accent-ink, #2d6b7f)}.ajf-file-input .ajf-remove-file{color:var(--ajf-danger, #b8362b)}.ajf-file-input .ajf-image-preview img{max-width:56px;max-height:40px;border-radius:3px}.ajf-file-input input{position:absolute;top:-9999px;left:-9999px;z-index:-1;opacity:0}.ajf-file-input .ajf-screen-reader-only{display:none}\n"] }]
    }], () => [{ type: i1.DomSanitizer }, { type: i0.ChangeDetectorRef }], { _dropMessageChildren: [{
            type: ContentChildren,
            args: [AjfDropMessage, { descendants: false }]
        }], _filePreviewChildren: [{
            type: ContentChildren,
            args: [AjfFilePreview, { descendants: false }]
        }], _nativeInput: [{
            type: ViewChild,
            args: ['nativeInput']
        }], accept: [{
            type: Input
        }], value: [{
            type: Input
        }], valueChange: [{
            type: Output
        }], deleteFile: [{
            type: Output
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(AjfFileInput, { className: "AjfFileInput", filePath: "file-input.ts", lineNumber: 101 }); })();
/**
 * Test if a value is an AjfFile interface.
 * The AjfFile is valid if it contains the name and
 * the content or the url of the file
 */
function isAjfFile(value) {
    if (value == null || typeof value !== 'object') {
        return false;
    }
    if ('name' in value && ('content' in value || 'url' in value)) {
        return true;
    }
    return false;
}
function isValidMimeType(mimeType, accept) {
    if (accept == null) {
        return true;
    }
    let terminate = true;
    if (accept.endsWith('*')) {
        accept = accept.slice(0, accept.length - 1);
        terminate = false;
    }
    const regExStr = '^' + accept + (terminate ? '$' : '');
    const regEx = new RegExp(regExStr);
    return regEx.test(mimeType);
}
const fileIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwM' +
    'C9zdmciIHdpZHRoPSIxNzA2LjY2NyIgaGVpZ2h0PSIxNzA2LjY2NyIgdmlld0JveD0iMCAwIDEyODAgMTI4MCIgcHJl' +
    'c2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+PHBhdGggZD0iTTI4MyAxMDNjLTE3LjcgMi40LTMzLjkgMTM' +
    'uOC00Mi4yIDI5LjYtNy40IDE0LTYuOC0zMi41LTYuOCA0OTcuNHMtLjYgNDgzLjQgNi44IDQ5Ny40YzYuOCAxMy4xID' +
    'E4LjYgMjIuNyAzMy43IDI3LjhsNyAyLjNoNzE3bDctMi4zYzE1LjEtNS4xIDI2LjktMTQuNyAzMy43LTI3LjggNy40L' +
    'TE0IDYuOCAxOS4yIDYuOC0zNzYuNlYzOTQuMWwtMTExLjItLjMtMTExLjMtLjQtOC41LTIuM2MtMjMuOC02LjUtNDMt' +
    'MjEuMy01Mi40LTQwLjUtNy41LTE1LjMtNy02LTcuMy0xMzMuOWwtLjQtMTE0LjctMjMzLjIuMS0yMzguNy45em01MTI' +
    'gMTA5LjhjMCAxMjAuNS0uMyAxMTQuOSA2IDEyNC40IDMuNiA1LjUgMTEuNiAxMS4yIDE5LjcgMTQuMSA1LjggMi4yID' +
    'YuNCAyLjIgMTE1LjggMi41bDExMCAuMy0xMjUtMTI1LjQtMTI1LjctMTI1LjVjLS41LS4xLS44IDQ5LjItLjggMTA5L' +
    'jZ6Ii8+PC9zdmc+';
const trashIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmc' +
    'iIHZpZXdCb3g9IjAgLTI1NiAxNzkyIDE3OTIiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxwYXRoIGQ9Ik03MD' +
    'kuNDI0IDQ1NS4wNXY1NzZxMCAxNC05IDIzLTkgOS0yMyA5aC02NHEtMTQgMC0yMy05LTktOS05LTIzdi01NzZxMC0xN' +
    'CA5LTIzIDktOSAyMy05aDY0cTE0IDAgMjMgOSA5IDkgOSAyM3ptMjU2IDB2NTc2cTAgMTQtOSAyMy05IDktMjMgOWgt' +
    'NjRxLTE0IDAtMjMtOS05LTktOS0yM3YtNTc2cTAtMTQgOS0yMyA5LTkgMjMtOWg2NHExNCAwIDIzIDkgOSA5IDkgMjN' +
    '6bTI1NiAwdjU3NnEwIDE0LTkgMjMtOSA5LTIzIDloLTY0cS0xNCAwLTIzLTktOS05LTktMjN2LTU3NnEwLTE0IDktMj' +
    'MgOS05IDIzLTloNjRxMTQgMCAyMyA5IDkgOSA5IDIzem0xMjggNzI0di05NDhoLTg5NnY5NDhxMCAyMiA3IDQwLjUgN' +
    'yAxOC41IDE0LjUgMjcgNy41IDguNSAxMC41IDguNWg4MzJxMyAwIDEwLjUtOC41IDcuNS04LjUgMTQuNS0yNyA3LTE4' +
    'LjUgNy00MC41em0tNjcyLTEwNzZoNDQ4bC00OC0xMTdxLTctOS0xNy0xMWgtMzE3cS0xMCAyLTE3IDExem05MjggMzJ' +
    '2NjRxMCAxNC05IDIzLTkgOS0yMyA5aC05NnY5NDhxMCA4My00NyAxNDMuNS00NyA2MC41LTExMyA2MC41aC04MzJxLT' +
    'Y2IDAtMTEzLTU4LjUtNDctNTguNS00Ny0xNDEuNXYtOTUyaC05NnEtMTQgMC0yMy05LTktOS05LTIzdi02NHEwLTE0I' +
    'DktMjMgOS05IDIzLTloMzA5bDcwLTE2N3ExNS0zNyA1NC02MyAzOS0yNiA3OS0yNmgzMjBxNDAgMCA3OSAyNiAzOSAy' +
    'NiA1NCA2M2w3MCAxNjdoMzA5cTE0IDAgMjMgOSA5IDkgOSAyM3oiLz48L3N2Zz4=';

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
class AjfFileInputModule {
    static { this.ɵfac = function AjfFileInputModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFileInputModule)(); }; }
    static { this.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AjfFileInputModule }); }
    static { this.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [AjfCommonModule, CommonModule, AjfTranslocoModule] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFileInputModule, [{
        type: NgModule,
        args: [{
                declarations: [AjfDropMessage, AjfFileInput, AjfFilePreview],
                exports: [AjfDropMessage, AjfFileInput, AjfFilePreview],
                imports: [AjfCommonModule, CommonModule, AjfTranslocoModule],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AjfFileInputModule, { declarations: [AjfDropMessage, AjfFileInput, AjfFilePreview], imports: [AjfCommonModule, CommonModule, AjfTranslocoModule], exports: [AjfDropMessage, AjfFileInput, AjfFilePreview] }); })();

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

export { AjfDropMessage, AjfFileInput, AjfFileInputModule, AjfFilePreview, AjfFileSizeLimit, fileIcon };
//# sourceMappingURL=ajf-core-file-input.mjs.map
