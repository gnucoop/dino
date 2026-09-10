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
import { ChangeDetectorRef, ElementRef, OnDestroy, QueryList, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AjfFile } from './file';
import * as i0 from "@angular/core";
export declare class AjfDropMessage {
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfDropMessage, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfDropMessage, "[ajfDropMessage]", never, {}, {}, never, never, false, never>;
}
export declare class AjfFilePreview implements OnDestroy {
    private _value;
    get value(): AjfFile | undefined;
    private _valueSub;
    constructor(vcr: ViewContainerRef);
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFilePreview, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfFilePreview, "[ajfFilePreview]", ["ajfFilePreview"], {}, {}, never, never, false, never>;
}
/**
 * It allows the upload of a file inside an AjfForm.
 *
 * @export
 * @class AjfFileInput
 */
export declare class AjfFileInput implements ControlValueAccessor {
    private _cdr;
    _dropMessageChildren: QueryList<AjfDropMessage>;
    _filePreviewChildren: QueryList<AjfFilePreview>;
    _nativeInput: ElementRef<HTMLInputElement>;
    readonly fileIcon: SafeResourceUrl;
    readonly removeIcon: SafeResourceUrl;
    /**
     * Enable drop for a new file to upload
     */
    private _emptyFile;
    get emptyFile(): boolean;
    /**
     * Accepted MimeType
     * Es. "image/*" or "application/pdf"
     */
    accept: string | undefined;
    private _value;
    get value(): any;
    set value(value: any);
    /**
     * The held file's size, ready to show next to its name. Sizes only reach the
     * value when the file was picked in this session, so it can legitimately be
     * missing for a file loaded from a saved form.
     */
    get sizeLabel(): string | null;
    private _valueChange;
    readonly valueChange: Observable<AjfFile | undefined>;
    /**
     * Event emitter for the delete file action
     */
    private _deleteFile;
    readonly deleteFile: Observable<string>;
    /**
     * The method to be called in order to update ngModel.
     */
    _controlValueAccessorChangeFn: (value: any) => void;
    /**
     * onTouch function registered via registerOnTouch (ControlValueAccessor).
     */
    _onTouched: () => any;
    constructor(domSanitizer: DomSanitizer, _cdr: ChangeDetectorRef);
    onFileDrop(files: FileList): void;
    onSelectFile(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    resetValue(): void;
    triggerNativeInput(): void;
    writeValue(value: any): void;
    private _processFileUpload;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFileInput, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFileInput, "ajf-file-input", never, { "accept": { "alias": "accept"; "required": false; }; "value": { "alias": "value"; "required": false; }; }, { "valueChange": "valueChange"; "deleteFile": "deleteFile"; }, ["_dropMessageChildren", "_filePreviewChildren"], ["[ajfDropMessage]", "[ajfFilePreview]"], false, never>;
}
export declare const fileIcon: string;
//# sourceMappingURL=file-input.d.ts.map