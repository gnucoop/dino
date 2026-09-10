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
import { AjfChoicesOrigin, AjfForm } from '@ajf/core/forms';
import { BooleanInput } from '@angular/cdk/coercion';
import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import { AfterContentInit, AfterViewChecked, ChangeDetectorRef, ElementRef, EventEmitter, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { AjfFormBuilderNodeEntry, AjfFormBuilderNodeTypeEntry, AjfFormBuilderService, AjfFormBuilderValidation } from './form-builder-service';
import * as i0 from "@angular/core";
export declare class AjfFormBuilder implements AfterViewChecked, AfterContentInit, OnDestroy {
    private _service;
    private _dialog;
    private _cdr;
    designerCont: ElementRef;
    private _form;
    get form(): AjfForm | undefined;
    set form(form: AjfForm | undefined);
    /**
     * True when the slides of the designer are kept expanded. Slides added later
     * follow this state as well.
     * It drives the "expand slides" toggle of the toolbar and can be set by the
     * host, both one-way (`[expandSlides]="true"`) and two-way
     * (`[(expandSlides)]="expanded"`).
     */
    private _expandSlides;
    get expandSlides(): boolean;
    set expandSlides(expandSlides: boolean);
    /**
     * Emits whenever the slides expansion state is changed from inside the form
     * builder, i.e. by the toolbar controls.
     */
    readonly expandSlidesChange: EventEmitter<boolean>;
    /**
     * When true the form builder fills the whole height of its container: the
     * field types palette, the designer and the properties panel stretch to the
     * available height and scroll internally, instead of growing with their
     * content. Requires the container to have a definite height.
     */
    private _fillHeight;
    get fillHeight(): boolean;
    set fillHeight(fillHeight: boolean);
    static ngAcceptInputType_expandSlides: BooleanInput;
    static ngAcceptInputType_fillHeight: BooleanInput;
    /**
     * Called to set form builder validation errors
     */
    private _formBuilderValidation;
    readonly formBuilderValidation: Observable<AjfFormBuilderValidation>;
    private _nodeTypes;
    get nodeTypes(): AjfFormBuilderNodeTypeEntry[];
    private _nodeEntriesTree;
    get nodeEntriesTree(): Observable<AjfFormBuilderNodeEntry[]>;
    private _choicesOrigins;
    get choicesOrigins(): Observable<AjfChoicesOrigin<any>[]>;
    /**
     * The list of the ids of all the dropLists connected to the formbuilder source list.
     */
    private _connectedDropLists;
    get connectedDropLists(): Observable<string[]>;
    searchTerm: string;
    private _vc;
    private _init;
    private _editConditionSub;
    private _editConditionDialog;
    private _beforeNodesUpdateSub;
    private _editChoicesOriginSub;
    private _editNodesValidationSub;
    private _editChoicesOriginDialog;
    private _stringIdentifierDialog;
    private _stringIdentifierSub;
    private _lastScrollTop;
    xlsformDownloading: boolean;
    constructor(_service: AjfFormBuilderService, _dialog: MatDialog, _cdr: ChangeDetectorRef);
    ngAfterViewChecked(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    createChoicesOrigin(): void;
    disableDrop(): boolean;
    disableFieldDrop(item: CdkDrag<AjfFormBuilderNodeTypeEntry>): boolean;
    /**
     * Triggers when a field or slide node is moved or inserted by drag&dropping in the formbuilder.
     * @param event The drop event.
     * @param content True if the current nodeEntry contains other nodeEntries.
     */
    onDrop(event: CdkDragDrop<AjfFormBuilderNodeEntry> | CdkDragDrop<AjfFormBuilderNodeTypeEntry>, content?: boolean): void;
    editChoicesOrigin(choicesOrigin: AjfChoicesOrigin<any>): void;
    editStringIdentifier(): void;
    /**
     * Expands all the slides of the designer and keeps the slides added later expanded.
     */
    expandAll(): void;
    /**
     * Collapses all the slides of the designer and keeps the slides added later collapsed.
     */
    collapseAll(): void;
    expandToggle(evt: MatSlideToggleChange): void;
    /**
     * Applies the slides expansion state to the service.
     * @param expanded True to keep the slides expanded
     * @param notify True to emit expandSlidesChange when the state changes
     */
    private _setSlidesExpanded;
    downloadAsXlsform(): Promise<void>;
    private _setCurrentForm;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormBuilder, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFormBuilder, "ajf-form-builder", never, { "form": { "alias": "form"; "required": false; }; "expandSlides": { "alias": "expandSlides"; "required": false; }; "fillHeight": { "alias": "fillHeight"; "required": false; }; }, { "expandSlidesChange": "expandSlidesChange"; "formBuilderValidation": "formBuilderValidation"; }, never, never, false, never>;
}
//# sourceMappingURL=form-builder.d.ts.map