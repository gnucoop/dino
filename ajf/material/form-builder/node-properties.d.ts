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
import { AjfChoicesOrigin, AjfEmptyField, AjfFieldWithChoices, AjfNode, AjfNumberField, AjfRangeField, AjfTableField } from '@ajf/core/forms';
import { ChangeDetectorRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AjfFormBuilderNodeEntry, AjfFormBuilderService } from './form-builder-service';
import { MatCheckbox } from '@angular/material/checkbox';
import { AjfNodePropertiesNameMatchValidator } from './node-properties-name-validator';
import * as i0 from "@angular/core";
export interface ValidationCondition {
    condition: string;
    errorMessage: string;
}
export interface WarningCondition {
    condition: string;
    warningMessage: string;
}
export declare class AjfFbNodeProperties implements OnDestroy, OnInit {
    private _cdr;
    private _service;
    private _dialog;
    private _fb;
    private _nodeNameValidator;
    private _fieldSizes;
    get fieldSizes(): {
        label: string;
        value: string;
    }[];
    private _nodeEntry;
    get nodeEntry(): Observable<AjfFormBuilderNodeEntry | null>;
    private _choicesOrigins;
    get choicesOrigins(): AjfChoicesOrigin<any>[];
    private _enabled;
    get enabled(): Observable<boolean>;
    private _propertiesForm;
    get propertiesForm(): Observable<UntypedFormGroup>;
    private _hasChoices;
    get hasChoices(): Observable<boolean> | undefined;
    private _curVisibility;
    get curVisibility(): string | null;
    private _curFormulaReps;
    get curFormulaReps(): string | null;
    private _curChoicesFilter;
    get curChoicesFilter(): string | null;
    private _curForceValue;
    get curForceValue(): string | null;
    private _curFormula;
    get curFormula(): string | null;
    private _conditionalBranches;
    get conditionalBranches(): string[];
    private _validationConditions;
    get validationConditions(): ValidationCondition[];
    private _warningConditions;
    get warningConditions(): WarningCondition[];
    private _nextSlideCondition;
    get nextSlideCondition(): string | undefined;
    private _triggerConditions;
    get triggerConditions(): string[];
    isRepeatingContainerNode: (nodeEntry: AjfFormBuilderNodeEntry | null) => boolean;
    private _visibilityOptSub;
    private _visibilitySub;
    private _conditionalBranchesSub;
    private _formulaRepsSub;
    private _choicesFilterSub;
    private _formulaSub;
    private _forceValueSub;
    private _validationConditionsSub;
    private _warningConditionsSub;
    private _nextSlideConditionSub;
    private _choicesOriginsSub;
    private _triggerConditionsSub;
    private _editConditionDialog;
    private _editConditionDialogSub;
    private _editValidationConditionDialog;
    private _editValidationConditionDialogSub;
    private _editWarningConditionDialog;
    private _editWarningConditionDialogSub;
    private _editVisibilityEvt;
    private _editVisibilitySub;
    private _editConditionalBranchEvt;
    private _editConditionalBranchSub;
    private _editFormulaRepsEvt;
    private _editFormulaRepsSub;
    private _editChoicesFilterEvt;
    private _editChoicesFilterSub;
    private _editFormulaEvt;
    private _editFormulaSub;
    private _editForceValueEvt;
    private _editForceValueSub;
    private _editValidationConditionEvt;
    private _editValidationConditionSub;
    private _addValidationConditionEvt;
    private _addValidationConditionSub;
    private _removeValidationConditionEvt;
    private _removeValidationConditionSub;
    private _editWarningConditionEvt;
    private _editWarningConditionSub;
    private _addWarningConditionEvt;
    private _addWarningConditionSub;
    private _removeWarningConditionEvt;
    private _removeWarningConditionSub;
    private _editNextSlideConditionEvt;
    private _editNextSlideConditionSub;
    private _editTriggerConditionEvt;
    private _editTriggerConditionSub;
    private _addTriggerConditionEvt;
    private _addTriggerConditionSub;
    private _removeTriggerConditionEvt;
    private _removeTriggerConditionSub;
    private _saveEvt;
    private _saveSub;
    private _isNodeValidSub;
    private _nodeNameChangedSub;
    constructor(_cdr: ChangeDetectorRef, _service: AjfFormBuilderService, _dialog: MatDialog, _fb: UntypedFormBuilder, _nodeNameValidator: AjfNodePropertiesNameMatchValidator);
    ngOnInit(): void;
    editVisibility(): void;
    editConditionalBranch(idx: number): void;
    editFormulaReps(): void;
    editChoicesFilter(): void;
    editFormula(): void;
    editForceValue(): void;
    editValidationCondition(idx: number): void;
    addValidationCondition(): void;
    removeValidationCondition(idx: number): void;
    editWarningCondition(idx: number): void;
    addWarningCondition(): void;
    removeWarningCondition(idx: number): void;
    editNextSlideCondition(): void;
    editTriggerCondition(idx: number): void;
    addTriggerCondition(): void;
    removeTriggerCondition(idx: number): void;
    isField(nodeEntry: AjfFormBuilderNodeEntry | null): boolean;
    isNumericField(node: AjfNode): node is AjfNumberField;
    isEmptyField(node: AjfNode): node is AjfEmptyField;
    isFieldWithChoices(node: AjfNode): node is AjfFieldWithChoices<any>;
    hasChoicesOriginRef(): Observable<boolean>;
    isRangeField(node: AjfNode): node is AjfRangeField;
    isTableField(node: AjfNode): node is AjfTableField;
    forceCheckbox(checked: boolean, checkbox: MatCheckbox): void;
    save(): void;
    cancel(): void;
    /**
     * Return error message for the form control
     * @param formControl
     * @param fieldName
     * @returns
     */
    fieldErrorMessage(formControl: AbstractControl | null, fieldName: string): string | null;
    /**
     * Return all form error messages
     * @param formGroup
     * @returns
     */
    allErrorMessages(formGroup: UntypedFormGroup | null): string | null;
    ngOnDestroy(): void;
    private _initSave;
    private _initForm;
    private _destroyConditionDialog;
    private _destroyValidationConditionDialog;
    private _destroyWarningConditionDialog;
    private _initRemoveTriggerCondition;
    private _initAddTriggerCondition;
    private _initTriggerConditionEdit;
    private _initRemoveWarningCondition;
    private _initAddWarningCondition;
    private _initWarningConditionEdit;
    private _initRemoveValidationCondition;
    private _initAddValidationCondition;
    private _initValidationConditionEdit;
    private _initForceValueEdit;
    private _initNextSlideConditionEdit;
    private _initFormulaEdit;
    private _initFormulaRepsEdit;
    private _initChoicesFilterEdit;
    private _initConditionalBranchEdit;
    private _initVisibilityEdit;
    private _handleTriggerCondtionsChange;
    private _handleWarningCondtionsChange;
    private _handleValidationCondtionsChange;
    private _handleForceValueChange;
    private _handleNextSlideConditionChange;
    private _handleFormulaChange;
    private _handleFormulaRepsChange;
    private _handleChoicesFilterChange;
    private _handleConditionalBranchesChange;
    private _handleVisibilityChange;
    private _guessVisibilityOpt;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFbNodeProperties, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfFbNodeProperties, "ajf-fb-node-properties", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=node-properties.d.ts.map