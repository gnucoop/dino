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
import { AjfContext } from '@ajf/core/models';
import { TranslocoService } from '@ajf/core/transloco';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AjfFieldInstance } from './interface/fields-instances/field-instance';
import { AjfForm } from './interface/forms/form';
import { AjfNodeGroupInstance } from './interface/nodes-instances/node-group-instance';
import { AjfNodeInstance } from './interface/nodes-instances/node-instance';
import { AjfRepeatingSlideInstance } from './interface/slides-instances/repeating-slide-instance';
import { AjfSlideInstance } from './interface/slides-instances/slide-instance';
import { AjfValidationService } from './validation-service';
import * as i0 from "@angular/core";
export declare const enum AjfFormInitStatus {
    Initializing = 0,
    Complete = 1
}
export declare class AjfFormRendererService {
    private _ts;
    private _editabilityNodesMap;
    private _editabilityNodesMapUpdates;
    private _visibilityNodesMap;
    private _visibilityNodesMapUpdates;
    private _repetitionNodesMap;
    private _repetitionNodesMapUpdates;
    private _conditionalBranchNodesMap;
    private _conditionalBranchNodesMapUpdates;
    private _formulaNodesMap;
    private _formulaNodesMapUpdates;
    private _validationNodesMap;
    private _validationNodesMapUpdates;
    private _warningNodesMap;
    private _warningNodesMapUpdates;
    private _filteredChoicesNodesMap;
    private _filteredChoicesNodesMapUpdates;
    private _triggerConditionsNodesMap;
    private _triggerConditionsNodesMapUpdates;
    private _nextSlideConditionsNodesMap;
    private _nextSlideConditionsNodesMapUpdates;
    private _formInitEvent;
    readonly formInitEvent: Observable<AjfFormInitStatus>;
    private _formGroup;
    readonly formGroup: Observable<UntypedFormGroup | null>;
    private _form;
    private _nodes;
    private _flatNodes;
    private _flatNodesTree;
    private _nodesUpdates;
    private _errorPositions;
    private _errors;
    private _formGroupSubscription;
    private _valueChanged;
    private _nodesMaps;
    private _nextSlideTrigger;
    readonly nextSlideTrigger: Observable<AjfNodeInstance>;
    private _slidesNum;
    readonly slidesNum: Observable<number>;
    get nodesTree(): Observable<AjfSlideInstance[]>;
    get errorPositions(): Observable<number[]>;
    get errors(): Observable<number>;
    get currentSupplementaryInformations(): any;
    get nodesVisibility(): Observable<{
        name: string;
        type: 'slide' | 'field';
        visible: boolean;
    }[]>;
    constructor(_: AjfValidationService, _ts?: TranslocoService | null);
    private _translateChoices;
    /**
     * It's called by the app to set a new Ajf Form with its context
     * @param form the Ajf Form schema
     * @param context the initial context
     */
    setForm(form: AjfForm | null, context?: AjfContext): void;
    /**
     * Replace date values in this format "2023-03-28T22:00:00.000Z" with "yyyy-MM-dd" format
     * @param ctx
     */
    private _fixDates;
    getFormValue(): any;
    /**
     * Set nodesUpdates value (it's a function) for the flatNodes stream
     * @param group
     * @returns
     */
    addGroup(group: AjfNodeGroupInstance | AjfRepeatingSlideInstance): Observable<boolean>;
    removeGroup(group: AjfNodeGroupInstance | AjfRepeatingSlideInstance, idx?: number): Observable<boolean>;
    getControl(field: AjfFieldInstance | undefined): Observable<AbstractControl | null>;
    /**
     * Recursively extrapolates nodeInstances visibility and returns an array
     * @param nodes The nodes
     * @param parentVisible If false, children nodes will also be not visible
     * @returns An array with all nodes visibility
     */
    private _mapNodesVisibility;
    /**
     * Init the errors stream. Start on valueChanged
     */
    private _initErrorsStreams;
    /**
     * Init all the update map stream for the form nodes
     * (maps for editability, visibility, repetition, formula, validation, filteredChoices...)
     * Each map contains all the fields that are to be re-rendered when editing another field,
     * grouped by the fields on which they depend
     */
    private _initUpdateMapStreams;
    /**
     * Init two streams for new Ajf Form. Start on setForm.
     * On subscribe call next() for the behavior subject
     * and set the new value for formGroup (start the delta) and for nodesUpdates (start the flatNodes)
     */
    private _initFormStreams;
    /**
     * Initialize node instance (visibility, editability...)
     * and add this into the formgroup.
     * If it's a container node, call recursively _orderedNodesInstancesTree
     * @param allNodes all the flatten nodes
     * @param node the node to be initialised
     * @param prefix the prefix
     * @param context the form context
     * @param branchVisibility the branch visibility
     * @returns
     */
    private _initNodeInstance;
    /**
     * Adjust rep slide when add or remove one's
     * @param allNodes All nodes of the form
     * @param instance All the existing instance reps
     * @param oldReps The number of initial reps
     * @param context The form context
     * @param idxToRemove The index of the slide to be removed (optional, default to last)
     * @returns
     */
    private _adjustReps;
    private _updateFormValueAndValidity;
    private _explodeRepeatingNode;
    /**
     * Init and return all form nodes instances.
     * Add the nodes into the formgroup with _initNodeInstance.
     * Start the valueChanges for the formgroup.
     * @param allNodes all flatten nodes di base nodes
     * @param nodes base nodes
     * @param parent start with undefined
     * @param prefix
     * @param context the form data context
     * @returns
     */
    private _orderedNodesInstancesTree;
    private _formValueDelta;
    /**
     * Init the formGroup valueChanges stream, that re-render the form on valueChanges
     * @param formGroup an initial empty Form Group
     * @returns The new FormGroup
     */
    private _initFormGroupStreams;
    private _showSubtree;
    private _hideSubtree;
    private _updateSubtreeVisibility;
    /**
     * Init stream for the form flat nodes.
     * Stream starts when _initFormStreams set the _nodesUpdates
     */
    private _initNodesStreams;
    /**
     * Removes a repeated node instance from the form.
     *
     * This method removes the node instance at the specified repetition index.
     * If the removed instance is not the last one, it shifts all subsequent
     * instances up by one position to keep the sequence contiguous, and then
     * clears the final (now duplicated) instance.
     *
     * It also updates all internal tracking maps (visibility, validation, formulas,
     * warnings, conditions, etc.) to remove references to the deleted node.
     *
     * @param nodeInstance The node instance to remove (always corresponds to the last repetition index).
     * @param idxToRemove The index of the repeated instance to delete.
     * @returns The removed node instance.
     */
    private _removeNodeInstance;
    private _removeSlideInstance;
    private _removeNodeGroupInstance;
    private _removeFieldInstance;
    private _addNodeInstance;
    /**
     * Add field instance as control in formGroup
     * Add field instance in all update maps (NodesEditabilityMap, NodesVisibilityMap, ...)
     * @param fieldInstance
     * @returns
     */
    private _addFieldInstance;
    /**
     * Add slide instance in all update maps (NodesEditabilityMap, NodesVisibilityMap, NodesConditionalBranchMap)
     * @param slideInstance
     * @returns
     */
    private _addSlideInstance;
    /**
     * Add repeating slide instance in all update maps
     * @param nodeGroupInstance
     * @returns
     */
    private _addNodeGroupInstance;
    private _removeNodesEditabilityMapIndex;
    private _removeNodesVisibilityMapIndex;
    private _removeNodesRepetitionMapIndex;
    private _removeNodesConditionalBranchMapIndex;
    private _removeNodesFormulaMapIndex;
    private _removeNodesValidationMapIndex;
    private _removeNodesWarningMapIndex;
    private _removeNodesFilteredChoicesMapIndex;
    private _removeNodesTriggerConditionsMapIndex;
    private _removeNodesNextSlideConditionsMapIndex;
    private _removeNodesMapIndex;
    private _removeFromNodesEditabilityMap;
    private _removeFromNodesVisibilityMap;
    private _removeFromNodesRepetitionMap;
    private _removeFromNodesConditionalBranchMap;
    private _removeFromNodesFormulaMap;
    private _removeFromNodesValidationMap;
    private _removeFromNodesWarningMap;
    private _removeFromNodesFilteredChoicesMap;
    private _removeFromNodesTriggerConditionsMap;
    private _removeFromNodesNextSlideConditionsMap;
    private _removeFromNodesMap;
    private _addToNodesEditabilityMap;
    private _addToNodesVisibilityMap;
    private _addToNodesRepetitionMap;
    private _addToNodesConditionalBranchMap;
    private _addToNodesFormulaMap;
    private _addToNodesValidationMap;
    private _addToNodesWarningMap;
    private _addToNodesFilteredChoicesMap;
    private _addToNodesTriggerConditionsMap;
    private _addToNodesNextSlideConditionsMap;
    private _addToNodesMap;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFormRendererService, [null, { optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfFormRendererService>;
}
//# sourceMappingURL=form-renderer.d.ts.map