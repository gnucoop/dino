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
import { ChangeDetectionStrategy, Component, ContentChildren, Directive, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AjfFileSizeLimit } from './file';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@ajf/core/common";
import * as i3 from "@angular/common";
import * as i4 from "@ngneat/transloco";
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
export class AjfDropMessage {
    static { this.ɵfac = function AjfDropMessage_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfDropMessage)(); }; }
    static { this.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AjfDropMessage, selectors: [["", "ajfDropMessage", ""]] }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfDropMessage, [{
        type: Directive,
        args: [{ selector: '[ajfDropMessage]' }]
    }], null, null); })();
export class AjfFilePreview {
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
export class AjfFileInput {
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
export const fileIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwM' +
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZmlsZS1pbnB1dC9zcmMvZmlsZS1pbnB1dC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZmlsZS1pbnB1dC9zcmMvZmlsZS1pbnB1dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBRVQsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsTUFBTSxFQUVOLFNBQVMsRUFFVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXRDLE9BQU8sRUFBVSxnQkFBZ0IsRUFBQyxNQUFNLFFBQVEsQ0FBQzs7Ozs7Ozs7OztJQzFDN0MsNkJBQTRFO0lBQzFFLGtCQUFtRDs7OztJQUVwQixZQUUvQjs7O0lBRitCLG9GQUUvQjs7OztJQU5KLDhCQUE4RjtJQUEvQixxS0FBUywyQkFBb0IsS0FBQztJQUkzRixBQUhBLHFGQUE0RSx1R0FHM0M7SUFHbkMsaUJBQU07Ozs7SUFOVyxjQUFvQztJQUFBLEFBQXBDLHNHQUFvQyxtQ0FBdUI7OztJQVN4RSw2QkFBNEU7SUFDMUUscUJBQW1EOzs7O0lBTWpELCtCQUE2QztJQUFBLFlBQWU7SUFBQSxpQkFBTTs7O0lBQXJCLGNBQWU7SUFBZixzQ0FBZTs7O0lBSDlELCtCQUFtQztJQUNqQywwQkFBK0I7SUFDL0IsK0JBQTJCO0lBQUEsWUFBaUI7SUFBQSxpQkFBTTtJQUNsRCwwRkFBNkM7SUFDL0MsaUJBQU07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QUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2RCxNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FDbkIseUVBQXlFO0lBQ3pFLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsaUJBQWlCLENBQUM7QUFFcEIsTUFBTSxTQUFTLEdBQ2IsK0VBQStFO0lBQy9FLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0Ysa0VBQWtFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZpbGUsIEFqZkZpbGVTaXplTGltaXR9IGZyb20gJy4vZmlsZSc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2FqZkRyb3BNZXNzYWdlXSd9KVxuZXhwb3J0IGNsYXNzIEFqZkRyb3BNZXNzYWdlIHt9XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thamZGaWxlUHJldmlld10nLFxuICBleHBvcnRBczogJ2FqZkZpbGVQcmV2aWV3Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmlsZVByZXZpZXcgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF92YWx1ZTogQWpmRmlsZSB8IHVuZGVmaW5lZDtcbiAgZ2V0IHZhbHVlKCk6IEFqZkZpbGUgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHZjcjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIGNvbnN0IGlucHV0ID0gdmNyLmluamVjdG9yLmdldChBamZGaWxlSW5wdXQsIG51bGwpO1xuICAgIGNvbnN0IGlzVmFsdWVHdWFyZCA9ICh2YWx1ZTogQWpmRmlsZSB8IHVuZGVmaW5lZCk6IHZhbHVlIGlzIEFqZkZpbGUgPT4gdmFsdWUgIT0gbnVsbDtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICB0aGlzLl92YWx1ZVN1YiA9IGlucHV0LnZhbHVlQ2hhbmdlLnBpcGUoZmlsdGVyKGlzVmFsdWVHdWFyZCkpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl92YWx1ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG5cbi8qKlxuICogSXQgYWxsb3dzIHRoZSB1cGxvYWQgb2YgYSBmaWxlIGluc2lkZSBhbiBBamZGb3JtLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBBamZGaWxlSW5wdXRcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZpbGUtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlsZS1pbnB1dC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsZS1pbnB1dC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hamYtZmlsZS1pbnB1dF0nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmRmlsZUlucHV0KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZpbGVJbnB1dCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQENvbnRlbnRDaGlsZHJlbihBamZEcm9wTWVzc2FnZSwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pXG4gIF9kcm9wTWVzc2FnZUNoaWxkcmVuITogUXVlcnlMaXN0PEFqZkRyb3BNZXNzYWdlPjtcblxuICBAQ29udGVudENoaWxkcmVuKEFqZkZpbGVQcmV2aWV3LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSlcbiAgX2ZpbGVQcmV2aWV3Q2hpbGRyZW4hOiBRdWVyeUxpc3Q8QWpmRmlsZVByZXZpZXc+O1xuXG4gIEBWaWV3Q2hpbGQoJ25hdGl2ZUlucHV0JykgX25hdGl2ZUlucHV0ITogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICByZWFkb25seSBmaWxlSWNvbjogU2FmZVJlc291cmNlVXJsO1xuICByZWFkb25seSByZW1vdmVJY29uOiBTYWZlUmVzb3VyY2VVcmw7XG5cbiAgLyoqXG4gICAqIEVuYWJsZSBkcm9wIGZvciBhIG5ldyBmaWxlIHRvIHVwbG9hZFxuICAgKi9cbiAgcHJpdmF0ZSBfZW1wdHlGaWxlOiBib29sZWFuO1xuICBnZXQgZW1wdHlGaWxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9lbXB0eUZpbGU7XG4gIH1cblxuICAvKipcbiAgICogQWNjZXB0ZWQgTWltZVR5cGVcbiAgICogRXMuIFwiaW1hZ2UvKlwiIG9yIFwiYXBwbGljYXRpb24vcGRmXCJcbiAgICovXG4gIEBJbnB1dCgpIGFjY2VwdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlsZUxpc3QpIHtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc0ZpbGVVcGxvYWQodmFsdWVbMF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gbnVsbCB8fCAoaXNBamZGaWxlKHZhbHVlKSAmJiBpc1ZhbGlkTWltZVR5cGUodmFsdWUudHlwZSwgdGhpcy5hY2NlcHQpKSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIGlmIChpc0FqZkZpbGUodmFsdWUpKSB7XG4gICAgICAgIHRoaXMuX2VtcHR5RmlsZSA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgdGhpcy5fdmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZSk7XG4gICAgICBpZiAodGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4odGhpcy52YWx1ZSk7XG4gICAgICB9XG4gICAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaGVsZCBmaWxlJ3Mgc2l6ZSwgcmVhZHkgdG8gc2hvdyBuZXh0IHRvIGl0cyBuYW1lLiBTaXplcyBvbmx5IHJlYWNoIHRoZVxuICAgKiB2YWx1ZSB3aGVuIHRoZSBmaWxlIHdhcyBwaWNrZWQgaW4gdGhpcyBzZXNzaW9uLCBzbyBpdCBjYW4gbGVnaXRpbWF0ZWx5IGJlXG4gICAqIG1pc3NpbmcgZm9yIGEgZmlsZSBsb2FkZWQgZnJvbSBhIHNhdmVkIGZvcm0uXG4gICAqL1xuICBnZXQgc2l6ZUxhYmVsKCk6IHN0cmluZyB8IG51bGwge1xuICAgIGNvbnN0IHNpemUgPSB0aGlzLl92YWx1ZT8uc2l6ZTtcbiAgICBpZiAoc2l6ZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHNpemUgPCAxMDI0KSB7XG4gICAgICByZXR1cm4gYCR7c2l6ZX0gQmA7XG4gICAgfVxuICAgIGlmIChzaXplIDwgMTAyNCAqIDEwMjQpIHtcbiAgICAgIHJldHVybiBgJHtNYXRoLnJvdW5kKHNpemUgLyAxMDI0KX0gS0JgO1xuICAgIH1cbiAgICByZXR1cm4gYCR7KHNpemUgLyAoMTAyNCAqIDEwMjQpKS50b0ZpeGVkKDEpfSBNQmA7XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmRmlsZSB8IHVuZGVmaW5lZD4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBPYnNlcnZhYmxlPEFqZkZpbGUgfCB1bmRlZmluZWQ+ID0gdGhpcy5fdmFsdWVDaGFuZ2UgYXMgT2JzZXJ2YWJsZTxcbiAgICBBamZGaWxlIHwgdW5kZWZpbmVkXG4gID47XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkZWxldGUgZmlsZSBhY3Rpb25cbiAgICovXG4gIHByaXZhdGUgX2RlbGV0ZUZpbGUgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGRlbGV0ZUZpbGU6IE9ic2VydmFibGU8c3RyaW5nPiA9IHRoaXMuX2RlbGV0ZUZpbGUgYXMgT2JzZXJ2YWJsZTxzdHJpbmc+O1xuXG4gIC8qKlxuICAgKiBUaGUgbWV0aG9kIHRvIGJlIGNhbGxlZCBpbiBvcmRlciB0byB1cGRhdGUgbmdNb2RlbC5cbiAgICovXG4gIF9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKlxuICAgKiBvblRvdWNoIGZ1bmN0aW9uIHJlZ2lzdGVyZWQgdmlhIHJlZ2lzdGVyT25Ub3VjaCAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLlxuICAgKi9cbiAgX29uVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLl9lbXB0eUZpbGUgPSB0cnVlO1xuICAgIHRoaXMuZmlsZUljb24gPSBkb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKGZpbGVJY29uKTtcbiAgICB0aGlzLnJlbW92ZUljb24gPSBkb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHRyYXNoSWNvbik7XG4gIH1cblxuICBvbkZpbGVEcm9wKGZpbGVzOiBGaWxlTGlzdCk6IHZvaWQge1xuICAgIGlmIChmaWxlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmlsZSA9IGZpbGVzWzBdO1xuICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKGZpbGUpO1xuICB9XG5cbiAgb25TZWxlY3RGaWxlKCk6IHZvaWQge1xuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5fbmF0aXZlSW5wdXQubmF0aXZlRWxlbWVudC5maWxlcztcbiAgICBpZiAoZmlsZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmaWxlID0gZmlsZXMuaXRlbSgwKTtcbiAgICBpZiAoZmlsZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKGZpbGVzLml0ZW0oMCkgYXMgRmlsZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICByZXNldFZhbHVlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnZhbHVlICE9PSBudWxsKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZS51cmwgJiYgdGhpcy52YWx1ZS51cmwubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuX2RlbGV0ZUZpbGUuZW1pdCh0aGlzLnZhbHVlLnVybCk7XG4gICAgICAgIHRoaXMudmFsdWUuZGVsZXRlVXJsID0gdHJ1ZTtcbiAgICAgICAgdGhpcy52YWx1ZS5jb250ZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy52YWx1ZS5uYW1lID0gbnVsbDtcbiAgICAgICAgdGhpcy52YWx1ZS5zaXplID0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9uYXRpdmVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgdGhpcy5fZW1wdHlGaWxlID0gdHJ1ZTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICB0cmlnZ2VyTmF0aXZlSW5wdXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9uYXRpdmVJbnB1dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9uYXRpdmVJbnB1dC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUgPT0gdW5kZWZpbmVkIHx8ICh2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZS5kZWxldGVVcmwpKSB7XG4gICAgICB0aGlzLl9lbXB0eUZpbGUgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9lbXB0eUZpbGUgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvY2Vzc0ZpbGVVcGxvYWQoZmlsZTogRmlsZSk6IHZvaWQge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgY29uc3Qge25hbWUsIHNpemUsIHR5cGV9ID0gZmlsZTtcblxuICAgIC8vIFVSTCBpcyBrZXB0IGluIHRoZSBmaWVsZCB2YWx1ZSwgYW5kIHVzZWQgdG8gZGVsZXRlIHRoZSBvbGQgZmlsZSB3aGVuIGl0J3MgcmVwbGFjZWQuXG4gICAgY29uc3QgdXJsID0gdGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLnVybCA/IHRoaXMudmFsdWUudXJsIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKCFpc1ZhbGlkTWltZVR5cGUodHlwZSwgdGhpcy5hY2NlcHQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzaXplID49IEFqZkZpbGVTaXplTGltaXQpIHtcbiAgICAgIHRoaXMudmFsdWUgPSB7bmFtZSwgc2l6ZSwgdHlwZSwgdXJsLCBjb250ZW50OiAnRmlsZSB0b28gbGFyZ2UnfTtcbiAgICAgIHRoaXMuX2VtcHR5RmlsZSA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZWFkZXIub25sb2FkID0gKF86IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSByZWFkZXIucmVzdWx0O1xuICAgICAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnZhbHVlID0ge25hbWUsIHNpemUsIHR5cGUsIHVybCwgY29udGVudH07XG4gICAgICB0aGlzLl9lbXB0eUZpbGUgPSBmYWxzZTtcbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICB9XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIEFqZkZpbGUgaW50ZXJmYWNlLlxuICogVGhlIEFqZkZpbGUgaXMgdmFsaWQgaWYgaXQgY29udGFpbnMgdGhlIG5hbWUgYW5kXG4gKiB0aGUgY29udGVudCBvciB0aGUgdXJsIG9mIHRoZSBmaWxlXG4gKi9cbmZ1bmN0aW9uIGlzQWpmRmlsZSh2YWx1ZTogYW55KTogdmFsdWUgaXMgQWpmRmlsZSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCduYW1lJyBpbiB2YWx1ZSAmJiAoJ2NvbnRlbnQnIGluIHZhbHVlIHx8ICd1cmwnIGluIHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZE1pbWVUeXBlKG1pbWVUeXBlOiBzdHJpbmcsIGFjY2VwdDogc3RyaW5nIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gIGlmIChhY2NlcHQgPT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGxldCB0ZXJtaW5hdGUgPSB0cnVlO1xuICBpZiAoYWNjZXB0LmVuZHNXaXRoKCcqJykpIHtcbiAgICBhY2NlcHQgPSBhY2NlcHQuc2xpY2UoMCwgYWNjZXB0Lmxlbmd0aCAtIDEpO1xuICAgIHRlcm1pbmF0ZSA9IGZhbHNlO1xuICB9XG4gIGNvbnN0IHJlZ0V4U3RyID0gJ14nICsgYWNjZXB0ICsgKHRlcm1pbmF0ZSA/ICckJyA6ICcnKTtcbiAgY29uc3QgcmVnRXggPSBuZXcgUmVnRXhwKHJlZ0V4U3RyKTtcbiAgcmV0dXJuIHJlZ0V4LnRlc3QobWltZVR5cGUpO1xufVxuXG5leHBvcnQgY29uc3QgZmlsZUljb24gPVxuICAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd00nICtcbiAgJ0M5emRtY2lJSGRwWkhSb1BTSXhOekEyTGpZMk55SWdhR1ZwWjJoMFBTSXhOekEyTGpZMk55SWdkbWxsZDBKdmVEMGlNQ0F3SURFeU9EQWdNVEk0TUNJZ2NISmwnICtcbiAgJ2MyVnlkbVZCYzNCbFkzUlNZWFJwYnowaWVFMXBaRmxOYVdRZ2JXVmxkQ0krUEhCaGRHZ2daRDBpVFRJNE15QXhNRE5qTFRFM0xqY2dNaTQwTFRNekxqa2dNVE0nICtcbiAgJ3VPQzAwTWk0eUlESTVMall0Tnk0MElERTBMVFl1T0Mwek1pNDFMVFl1T0NBME9UY3VOSE10TGpZZ05EZ3pMalFnTmk0NElEUTVOeTQwWXpZdU9DQXhNeTR4SUQnICtcbiAgJ0U0TGpZZ01qSXVOeUF6TXk0M0lESTNMamhzTnlBeUxqTm9OekUzYkRjdE1pNHpZekUxTGpFdE5TNHhJREkyTGprdE1UUXVOeUF6TXk0M0xUSTNMamdnTnk0MEwnICtcbiAgJ1RFMElEWXVPQ0F4T1M0eUlEWXVPQzB6TnpZdU5sWXpPVFF1TVd3dE1URXhMakl0TGpNdE1URXhMak10TGpRdE9DNDFMVEl1TTJNdE1qTXVPQzAyTGpVdE5ETXQnICtcbiAgJ01qRXVNeTAxTWk0MExUUXdMalV0Tnk0MUxURTFMak10TnkwMkxUY3VNeTB4TXpNdU9Xd3RMalF0TVRFMExqY3RNak16TGpJdU1TMHlNemd1Tnk0NWVtMDFNVEknICtcbiAgJ2dNVEE1TGpoak1DQXhNakF1TlMwdU15QXhNVFF1T1NBMklERXlOQzQwSURNdU5pQTFMalVnTVRFdU5pQXhNUzR5SURFNUxqY2dNVFF1TVNBMUxqZ2dNaTR5SUQnICtcbiAgJ1l1TkNBeUxqSWdNVEUxTGpnZ01pNDFiREV4TUNBdU15MHhNalV0TVRJMUxqUXRNVEkxTGpjdE1USTFMalZqTFM0MUxTNHhMUzQ0SURRNUxqSXRMamdnTVRBNUwnICtcbiAgJ2paNklpOCtQQzl6ZG1jKyc7XG5cbmNvbnN0IHRyYXNoSWNvbiA9XG4gICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtYycgK1xuICAnaUlIWnBaWGRDYjNnOUlqQWdMVEkxTmlBeE56a3lJREUzT1RJaUlIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaVBqeHdZWFJvSUdROUlrMDNNRCcgK1xuICAna3VOREkwSURRMU5TNHdOWFkxTnpaeE1DQXhOQzA1SURJekxUa2dPUzB5TXlBNWFDMDJOSEV0TVRRZ01DMHlNeTA1TFRrdE9TMDVMVEl6ZGkwMU56WnhNQzB4TicgK1xuICAnQ0E1TFRJeklEa3RPU0F5TXkwNWFEWTBjVEUwSURBZ01qTWdPU0E1SURrZ09TQXlNM3B0TWpVMklEQjJOVGMyY1RBZ01UUXRPU0F5TXkwNUlEa3RNak1nT1dndCcgK1xuICAnTmpSeExURTBJREF0TWpNdE9TMDVMVGt0T1MweU0zWXROVGMyY1RBdE1UUWdPUzB5TXlBNUxUa2dNak10T1dnMk5IRXhOQ0F3SURJeklEa2dPU0E1SURrZ01qTicgK1xuICAnNmJUSTFOaUF3ZGpVM05uRXdJREUwTFRrZ01qTXRPU0E1TFRJeklEbG9MVFkwY1MweE5DQXdMVEl6TFRrdE9TMDVMVGt0TWpOMkxUVTNObkV3TFRFMElEa3RNaicgK1xuICAnTWdPUzA1SURJekxUbG9OalJ4TVRRZ01DQXlNeUE1SURrZ09TQTVJREl6ZW0weE1qZ2dOekkwZGkwNU5EaG9MVGc1Tm5ZNU5EaHhNQ0F5TWlBM0lEUXdMalVnTicgK1xuICAneUF4T0M0MUlERTBMalVnTWpjZ055NDFJRGd1TlNBeE1DNDFJRGd1TldnNE16SnhNeUF3SURFd0xqVXRPQzQxSURjdU5TMDRMalVnTVRRdU5TMHlOeUEzTFRFNCcgK1xuICAnTGpVZ055MDBNQzQxZW0wdE5qY3lMVEV3Tnpab05EUTRiQzAwT0MweE1UZHhMVGN0T1MweE55MHhNV2d0TXpFM2NTMHhNQ0F5TFRFM0lERXhlbTA1TWpnZ016SicgK1xuICAnMk5qUnhNQ0F4TkMwNUlESXpMVGtnT1MweU15QTVhQzA1Tm5ZNU5EaHhNQ0E0TXkwME55QXhORE11TlMwME55QTJNQzQxTFRFeE15QTJNQzQxYUMwNE16SnhMVCcgK1xuICAnWTJJREF0TVRFekxUVTRMalV0TkRjdE5UZ3VOUzAwTnkweE5ERXVOWFl0T1RVeWFDMDVObkV0TVRRZ01DMHlNeTA1TFRrdE9TMDVMVEl6ZGkwMk5IRXdMVEUwSScgK1xuICAnRGt0TWpNZ09TMDVJREl6TFRsb016QTViRGN3TFRFMk4zRXhOUzB6TnlBMU5DMDJNeUF6T1MweU5pQTNPUzB5Tm1nek1qQnhOREFnTUNBM09TQXlOaUF6T1NBeScgK1xuICAnTmlBMU5DQTJNMnczTUNBeE5qZG9NekE1Y1RFMElEQWdNak1nT1NBNUlEa2dPU0F5TTNvaUx6NDhMM04yWno0PSc7XG4iLCI8ZGl2IGFqZkRuZCAoZmlsZSk9XCJvbkZpbGVEcm9wKCRldmVudClcIiBjbGFzcz1cImFqZi1kcm9wLXpvbmVcIj5cbiAgPGRpdiAqbmdJZj1cImVtcHR5RmlsZTsgZWxzZSBmaWxlSW5mb1wiIGNsYXNzPVwiYWpmLWRyb3AtbWVzc2FnZVwiIChjbGljayk9XCJ0cmlnZ2VyTmF0aXZlSW5wdXQoKVwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJfZHJvcE1lc3NhZ2VDaGlsZHJlbj8ubGVuZ3RoOyBlbHNlIGRlZmF1bHREcm9wTWVzc2FnZVwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2FqZkRyb3BNZXNzYWdlXVwiPjwvbmctY29udGVudD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHREcm9wTWVzc2FnZT57e1xuICAgICAgJ0Ryb3AgeW91ciBmaWxlIGhlcmUgb3IgY2xpY2sgdG8gc2VsZWN0JyB8IHRyYW5zbG9jb1xuICAgIH19PC9uZy10ZW1wbGF0ZT5cbiAgPC9kaXY+XG4gIDxuZy10ZW1wbGF0ZSAjZmlsZUluZm8+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1maWxlLWluZm9cIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJfZmlsZVByZXZpZXdDaGlsZHJlbj8ubGVuZ3RoOyBlbHNlIGRlZmF1bHRGaWxlUHJldmlld1wiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbYWpmRmlsZVByZXZpZXddXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRGaWxlUHJldmlldz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1maWxlLWluZm8tY29udGVudFwiPlxuICAgICAgICAgIDxpbWcgW3NyY109XCJmaWxlSWNvblwiIGFsdD1cIlwiIC8+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1maWxlLW5hbWVcIj57eyB2YWx1ZT8ubmFtZSB9fTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhamYtZmlsZS1zaXplXCIgKm5nSWY9XCJzaXplTGFiZWxcIj57eyBzaXplTGFiZWwgfX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJhamYtZmlsZS1hY3Rpb25zXCI+XG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImFqZi1yZXBsYWNlLWZpbGVcIiAoY2xpY2spPVwidHJpZ2dlck5hdGl2ZUlucHV0KClcIj5cbiAgICAgICAge3sgJ1JlcGxhY2UnIHwgdHJhbnNsb2NvIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYWpmLXJlbW92ZS1maWxlXCIgKGNsaWNrKT1cInJlc2V0VmFsdWUoKVwiPlxuICAgICAgICB7eyAnUmVtb3ZlJyB8IHRyYW5zbG9jbyB9fVxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLXNjcmVlbi1yZWFkZXItb25seVwiPnt7ICdEZWxldGUnIHwgdHJhbnNsb2NvIH19PC9kaXY+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvZGl2PlxuPGlucHV0XG4gICNuYXRpdmVJbnB1dFxuICBbYWNjZXB0XT1cImFjY2VwdFwiXG4gIG5hbWU9XCJcIlxuICBhcmlhLWxhYmVsPVwiZmlsZSBpbnB1dFwiXG4gIHR5cGU9XCJmaWxlXCJcbiAgKGNoYW5nZSk9XCJvblNlbGVjdEZpbGUoKVwiXG4vPlxuIl19