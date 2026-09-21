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
import { evaluateExpression, getArgumentNames } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { EventEmitter, Injectable, Optional } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { format } from 'date-fns';
import { BehaviorSubject, from, Observable, of as obsOf, Subject, Subscription, timer, } from 'rxjs';
import { filter, map, pairwise, scan, share, startWith, switchMap, tap, withLatestFrom, } from 'rxjs/operators';
import { AjfFieldType } from './interface/fields/field-type';
import { AjfNodeType } from './interface/nodes/node-type';
import { initChoicesOrigin } from './utils/choices/init-choices-origin';
import { isFieldWithChoicesInstance } from './utils/fields-instances/is-field-with-choices-instance';
import { isTableFieldInstance } from './utils/fields-instances/is-table-field-instance';
import { updateFieldInstanceState } from './utils/fields-instances/update-field-instance-state';
import { updateFilteredChoices } from './utils/fields-instances/update-filtered-choices';
import { updateFormula } from './utils/fields-instances/update-formula';
import { updateNextSlideCondition } from './utils/fields-instances/update-next-slide-condition';
import { updateTriggerConditions } from './utils/fields-instances/update-trigger-conditions';
import { updateValidation } from './utils/fields-instances/update-validation';
import { updateWarning } from './utils/fields-instances/update-warning';
import { createField } from './utils/fields/create-field';
import { flattenNodesInstances } from './utils/nodes-instances/flatten-nodes-instances';
import { flattenNodesInstancesTree } from './utils/nodes-instances/flatten-nodes-instances-tree';
import { isFieldInstance } from './utils/nodes-instances/is-field-instance';
import { isNodeGroupInstance } from './utils/nodes-instances/is-node-group-instance';
import { isRepeatingContainerNodeInstance } from './utils/nodes-instances/is-repeating-container-node-instance';
import { isRepeatingGroupInstance } from './utils/nodes-instances/is-repeating-group-instance';
import { isRepeatingSlideInstance } from './utils/nodes-instances/is-repeating-slide-instance';
import { isSlideInstance } from './utils/nodes-instances/is-slide-instance';
import { isSlidesInstance } from './utils/nodes-instances/is-slides-instance';
import { nodeInstanceCompleteName } from './utils/nodes-instances/node-instance-complete-name';
import { nodeInstanceSuffix } from './utils/nodes-instances/node-instance-suffix';
import { nodeToNodeInstance } from './utils/nodes-instances/node-to-node-instance';
import { updateConditionalBranches } from './utils/nodes-instances/update-conditional-branches';
import { updateEditability } from './utils/nodes-instances/update-editability';
import { updateVisibility } from './utils/nodes-instances/update-visibility';
import { flattenNodes } from './utils/nodes/flatten-nodes';
import { isContainerNode } from './utils/nodes/is-container-node';
import { orderedNodes } from './utils/nodes/ordered-nodes';
import { updateRepsNum } from './utils/slides-instances/update-reps-num';
import { validSlide } from './utils/slides-instances/valid-slide';
import { isContainerNodeInstance } from './utils/nodes-instances/is-container-node-instance';
import * as i0 from "@angular/core";
import * as i1 from "./validation-service";
import * as i2 from "@ajf/core/transloco";
/**
 * Update Slide Validity according to the validity of its field nodes
 * @param slide
 */
const updateSlideValidity = (slide) => {
    const subNodesNum = slide.flatNodes.length;
    let valid = true;
    for (let i = 0; i < subNodesNum; i++) {
        const subNode = slide.flatNodes[i];
        if (subNode.visible && isFieldInstance(subNode) && !subNode.valid) {
            valid = false;
            break;
        }
    }
    if (slide.valid !== valid) {
        slide.valid = valid;
    }
};
export class AjfFormRendererService {
    get nodesTree() {
        return this._flatNodesTree;
    }
    get errorPositions() {
        return this._errorPositions;
    }
    get errors() {
        return this._errors;
    }
    get currentSupplementaryInformations() {
        const form = this._form.getValue();
        return form != null && form.form != null ? form.form.supplementaryInformations : null;
    }
    get nodesVisibility() {
        return this._nodes.pipe(map(nodes => {
            return this._mapNodesVisibility(nodes);
        }));
    }
    constructor(_, _ts = null) {
        this._ts = _ts;
        this._editabilityNodesMapUpdates = new Subject();
        this._visibilityNodesMapUpdates = new Subject();
        this._repetitionNodesMapUpdates = new Subject();
        this._conditionalBranchNodesMapUpdates = new Subject();
        this._formulaNodesMapUpdates = new Subject();
        this._validationNodesMapUpdates = new Subject();
        this._warningNodesMapUpdates = new Subject();
        this._filteredChoicesNodesMapUpdates = new Subject();
        this._triggerConditionsNodesMapUpdates = new Subject();
        this._nextSlideConditionsNodesMapUpdates = new Subject();
        this._formInitEvent = new EventEmitter();
        this.formInitEvent = this
            ._formInitEvent;
        this._formGroup = new BehaviorSubject(null);
        this.formGroup = this
            ._formGroup;
        this._form = new BehaviorSubject(null);
        this._nodesUpdates = new Subject();
        this._formGroupSubscription = Subscription.EMPTY;
        this._valueChanged = new Subject();
        this._nextSlideTrigger = new EventEmitter();
        this.nextSlideTrigger = this
            ._nextSlideTrigger;
        this._slidesNum = new BehaviorSubject(0);
        this.slidesNum = this._slidesNum;
        // Initialize all streams for the form
        this._initUpdateMapStreams();
        this._initNodesStreams();
        this._initErrorsStreams();
        this._initFormStreams();
        this._updateFormValueAndValidity();
    }
    _translateChoices(choices) {
        if (this._ts == null) {
            return;
        }
        for (const choice of choices) {
            if (choice.translatedLabel == null) {
                choice.translatedLabel = this._ts.translate(choice.label);
            }
        }
    }
    /**
     * It's called by the app to set a new Ajf Form with its context
     * @param form the Ajf Form schema
     * @param context the initial context
     */
    setForm(form, context = {}) {
        this._initUpdateMapStreams();
        if (form != null &&
            Object.keys(context).length === 0 &&
            Object.keys(form.initContext || {}).length > 0) {
            context = form.initContext || {};
        }
        const currentForm = this._form.getValue();
        if ((currentForm == null && form != null) ||
            (currentForm != null && form !== currentForm.form)) {
            if (form != null) {
                for (const origin of form.choicesOrigins) {
                    this._translateChoices(origin.choices);
                }
            }
            this._form.next({ form: form, context: context });
        }
    }
    /**
     * Replace date values in this format "2023-03-28T22:00:00.000Z" with "yyyy-MM-dd" format
     * @param ctx
     */
    _fixDates(ctx) {
        if (ctx) {
            Object.keys(ctx).forEach(k => {
                const v = ctx[k];
                if (typeof v === 'string' && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ$/.test(v)) {
                    const d = format(new Date(v), 'yyyy-MM-dd');
                    ctx[k] = d;
                }
            });
        }
    }
    getFormValue() {
        const formGroup = this._formGroup.getValue();
        if (formGroup == null) {
            return {};
        }
        let res = deepCopy(formGroup.value);
        this._fixDates(res);
        return res;
    }
    /**
     * Set nodesUpdates value (it's a function) for the flatNodes stream
     * @param group
     * @returns
     */
    addGroup(group) {
        return new Observable((subscriber) => {
            if (group.formulaReps != null) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            const maxReps = group.node.maxReps;
            if (maxReps > 0 && group.reps + 1 > maxReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            const oldReps = group.reps;
            group.reps = group.reps + 1;
            group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
            group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
            this._nodesUpdates.next((nodes) => {
                const flatNodes = flattenNodesInstances(nodes, true);
                this._adjustReps(flatNodes, group, oldReps, this.getFormValue());
                subscriber.next(true);
                subscriber.complete();
                return nodes;
            });
        });
    }
    removeGroup(group, idx) {
        return new Observable((subscriber) => {
            if (group.formulaReps != null) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            const minReps = group.node.minReps;
            if (group.reps - 1 < minReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            const oldReps = group.reps;
            group.reps = group.reps - 1;
            group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
            group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
            this._nodesUpdates.next((nodes) => {
                this._adjustReps(nodes, group, oldReps, this.getFormValue(), idx);
                subscriber.next(true);
                subscriber.complete();
                return nodes;
            });
        });
    }
    getControl(field) {
        return this.formGroup.pipe(map(f => {
            if (field == null) {
                return null;
            }
            const fieldName = nodeInstanceCompleteName(field);
            return f != null && f.contains(fieldName) ? f.controls[fieldName] : null;
        }));
    }
    /**
     * Recursively extrapolates nodeInstances visibility and returns an array
     * @param nodes The nodes
     * @param parentVisible If false, children nodes will also be not visible
     * @returns An array with all nodes visibility
     */
    _mapNodesVisibility(nodes, parentVisible = true) {
        if (!nodes || !nodes.length)
            return [];
        const nodesVisibility = [];
        for (let node of nodes) {
            const name = node.node.name;
            const visible = parentVisible ? node.visible : false;
            if ('nodes' in node && node.nodes && node.nodes.length) {
                nodesVisibility.push({ name, type: 'slide', visible });
                nodesVisibility.push(...this._mapNodesVisibility(node.nodes, visible));
            }
            else {
                nodesVisibility.push({ name, type: 'field', visible });
            }
        }
        return nodesVisibility;
    }
    /**
     * Init the errors stream. Start on valueChanged
     */
    _initErrorsStreams() {
        this._errorPositions = this._valueChanged.pipe(withLatestFrom(this._nodes, this._form), filter(([_, __, form]) => form != null &&
            form.form != null), map(([_, nodes, formDef]) => {
            const form = formDef.form;
            let currentPosition = 0;
            const errors = [];
            nodes.forEach(node => {
                if (isRepeatingSlideInstance(node)) {
                    for (let i = 0; i < node.reps; i++) {
                        if (node.visible) {
                            currentPosition++;
                            if (i == 0) {
                                node.position = currentPosition;
                            }
                            if (!validSlide(node, i)) {
                                errors.push(currentPosition);
                            }
                        }
                    }
                }
                else if (isSlideInstance(node)) {
                    if (node.visible) {
                        currentPosition++;
                        node.position = currentPosition;
                        if (!node.valid) {
                            errors.push(currentPosition);
                        }
                    }
                }
            });
            form.valid = errors.length == 0;
            this._slidesNum.next(currentPosition);
            return errors;
        }), share());
        this._errors = this._errorPositions.pipe(map(e => (e != null ? e.length : 0)), startWith(0), share());
    }
    /**
     * Init all the update map stream for the form nodes
     * (maps for editability, visibility, repetition, formula, validation, filteredChoices...)
     * Each map contains all the fields that are to be re-rendered when editing another field,
     * grouped by the fields on which they depend
     */
    _initUpdateMapStreams() {
        const startValue = () => ({});
        this._editabilityNodesMap = (this._editabilityNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._visibilityNodesMap = (this._visibilityNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._repetitionNodesMap = (this._repetitionNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._conditionalBranchNodesMap = (this._conditionalBranchNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._formulaNodesMap = (this._formulaNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._validationNodesMap = (this._validationNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._warningNodesMap = (this._warningNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._filteredChoicesNodesMap = (this._filteredChoicesNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._triggerConditionsNodesMap = (this._triggerConditionsNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._nextSlideConditionsNodesMap = (this._nextSlideConditionsNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._nodesMaps = [
            this._editabilityNodesMap,
            this._visibilityNodesMap,
            this._repetitionNodesMap,
            this._conditionalBranchNodesMap,
            this._formulaNodesMap,
            this._validationNodesMap,
            this._warningNodesMap,
            this._nextSlideConditionsNodesMap,
            this._filteredChoicesNodesMap,
            this._triggerConditionsNodesMap,
        ];
    }
    /**
     * Init two streams for new Ajf Form. Start on setForm.
     * On subscribe call next() for the behavior subject
     * and set the new value for formGroup (start the delta) and for nodesUpdates (start the flatNodes)
     */
    _initFormStreams() {
        const formObs = this._form;
        formObs
            .pipe(map(_form => {
            return this._initFormGroupStreams(new UntypedFormGroup({}));
        }))
            .subscribe(this._formGroup);
        formObs
            .pipe(switchMap(form => {
            if (form == null || form.form == null) {
                return obsOf(form);
            }
            const choicesOrigins = form.form.choicesOrigins || [];
            if (choicesOrigins.length === 0) {
                return obsOf(form);
            }
            return from(Promise.all(choicesOrigins.map(co => initChoicesOrigin(co)))).pipe(map(() => form));
        }), map(formDef => {
            return (_nodesInstances) => {
                let nodes;
                if (formDef != null &&
                    formDef.form != null) {
                    const form = formDef;
                    const baseNodes = form.form.nodes;
                    nodes = this._orderedNodesInstancesTree(flattenNodes(baseNodes), baseNodes, undefined, [], form.context || {});
                }
                else {
                    nodes = [];
                }
                // Set the position for each slide
                let currentPosition = 0;
                nodes.forEach(node => {
                    if (isRepeatingSlideInstance(node)) {
                        for (let i = 0; i < node.reps; i++) {
                            if (node.visible) {
                                currentPosition++;
                                if (i == 0) {
                                    node.position = currentPosition;
                                }
                            }
                        }
                    }
                    else if (isSlideInstance(node)) {
                        if (node.visible) {
                            currentPosition++;
                            node.position = currentPosition;
                        }
                    }
                });
                return nodes;
            };
        }))
            .subscribe(this._nodesUpdates);
    }
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
    _initNodeInstance(allNodes, node, prefix, context, branchVisibility = true) {
        let instance = nodeToNodeInstance(allNodes, node, prefix, context);
        if (instance == null) {
            return null;
        }
        if (isRepeatingGroupInstance(instance)) {
            this._explodeRepeatingNode(allNodes, instance, context);
        }
        else if (isSlideInstance(instance)) {
            instance.nodes = this._orderedNodesInstancesTree(allNodes, instance.node.nodes, instance.node.id, prefix, context);
        }
        if (isSlideInstance(instance) || isFieldInstance(instance)) {
            updateEditability(instance, context);
        }
        updateVisibility(instance, context, branchVisibility);
        if (isNodeGroupInstance(instance)) {
            // The group's children were built above, before the group itself had a
            // visibility: without this a group that starts out hidden still shows
            // every field it holds until its condition happens to change.
            propagateVisibility(instance, context, instance.visible);
        }
        updateConditionalBranches(instance, context);
        if (isFieldInstance(instance)) {
            if (isFieldWithChoicesInstance(instance)) {
                updateFilteredChoices(instance, context);
            }
            else {
                if (isTableFieldInstance(instance)) {
                    const { node } = instance;
                    instance.context = context[nodeInstanceCompleteName(instance)] || context;
                    const formGroup = this._formGroup.getValue();
                    let controlsWithLabels = [];
                    controlsWithLabels.push([node.label, node.columnLabels]);
                    if (formGroup != null) {
                        const rowsNum = node.rows.length;
                        for (let rowIdx = 0; rowIdx < rowsNum; rowIdx++) {
                            const row = node.rows[rowIdx];
                            let r = [];
                            const cellNum = row.length;
                            for (let idx = 0; idx < cellNum; idx++) {
                                let cell = row[idx];
                                if (typeof cell === 'string') {
                                    cell = { formula: cell };
                                }
                                /*
                                every control is registered with the cell position
                                inside the form control matrix
                                with this mask `${tNode.name}__${rowIdx}__${idx}`
                                */
                                const name = `${node.name}__${rowIdx}__${idx}`;
                                const type = (node.columnTypes && node.columnTypes[idx]) || 'number';
                                const tableFormControl = {
                                    control: new UntypedFormControl(),
                                    show: false,
                                    type,
                                };
                                const value = instance.context[cell.formula] && type === 'number'
                                    ? +instance.context[cell.formula]
                                    : instance.context[cell.formula];
                                tableFormControl.control.setValue(value);
                                formGroup.registerControl(name, tableFormControl.control);
                                r.push(tableFormControl);
                                /* create a object that respect the instance interface
                                with the minimum defined properties to allow to run addToNodeFormula map*/
                                const fakeInstance = {
                                    formula: { formula: cell.formula },
                                    node: { name, nodeType: 0, editable: false },
                                    visible: true,
                                    prefix: [],
                                    conditionalBranches: [],
                                    updatedEvt: new EventEmitter(),
                                };
                                this._addToNodesFormulaMap(fakeInstance, cell.formula);
                            }
                            controlsWithLabels.push([node.rowLabels[rowIdx], r]);
                        }
                        instance.controls = controlsWithLabels;
                    }
                }
                else {
                    instance.value = context[nodeInstanceCompleteName(instance)];
                }
            }
            updateFieldInstanceState(instance, context);
        }
        this._addNodeInstance(instance);
        return instance;
    }
    /**
     * Adjust rep slide when add or remove one's
     * @param allNodes All nodes of the form
     * @param instance All the existing instance reps
     * @param oldReps The number of initial reps
     * @param context The form context
     * @param idxToRemove The index of the slide to be removed (optional, default to last)
     * @returns
     */
    _adjustReps(allNodes, instance, oldReps, context, idxToRemove) {
        const newReps = instance.reps;
        const result = {
            added: null,
            removed: null,
        };
        if (oldReps < newReps) {
            const newNodes = [];
            if (instance.nodes == null) {
                instance.nodes = [];
            }
            if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                const node = createField({
                    id: 999,
                    name: '',
                    parent: -1,
                    fieldType: AjfFieldType.Empty,
                    label: instance.node.label,
                });
                const newInstance = this._initNodeInstance(allNodes, node, instance.prefix.slice(0), context);
                if (newInstance != null) {
                    instance.nodes.push(newInstance);
                }
            }
            for (let i = oldReps; i < newReps; i++) {
                const prefix = instance.prefix.slice(0);
                const group = instance.node;
                prefix.push(i);
                const orderedListNodes = orderedNodes(group.nodes, instance.node.id);
                orderedListNodes.forEach(n => {
                    const newInstance = this._initNodeInstance(allNodes, n, prefix, context);
                    if (newInstance != null) {
                        newNodes.push(newInstance);
                        instance.nodes.push(newInstance);
                    }
                });
                this._addNodeInstance(instance);
            }
            result.added = newNodes;
        }
        else if (oldReps > newReps) {
            let nodesNum = instance.nodes.length / oldReps;
            if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                nodesNum++;
            }
            result.removed = instance.nodes.splice(newReps * nodesNum, nodesNum);
            const idxSlideToRemove = idxToRemove ?? newReps;
            result.removed.forEach(n => {
                this._removeNodeInstance(n, idxSlideToRemove);
            });
        }
        if (oldReps != newReps && instance.formulaReps == null) {
            const fg = this._formGroup.getValue();
            const completeName = nodeInstanceCompleteName(instance);
            if (fg != null && fg.contains(completeName)) {
                fg.controls[completeName].setValue(instance.reps);
            }
        }
        instance.flatNodes = flattenNodesInstances(instance.nodes);
        if (isRepeatingSlideInstance(instance)) {
            const slideNodes = [];
            const nodesPerSlide = instance.nodes != null ? instance.nodes.length / instance.reps : 0;
            for (let i = 0; i < instance.reps; i++) {
                const startNode = i * nodesPerSlide;
                // Flattened, like `flatNodes` above: a node group inside the slide is a
                // container, and its fields live one level down. Slicing alone would hand
                // the repetition the group instance itself -- a node with no fieldType,
                // which renders as an unknown field -- and none of the fields it holds.
                slideNodes.push(flattenNodesInstances(instance.nodes.slice(startNode, startNode + nodesPerSlide)));
            }
            instance.slideNodes = slideNodes;
        }
        return result;
    }
    _updateFormValueAndValidity() {
        this._nodesUpdates
            .pipe(withLatestFrom(this._formGroup), filter(([_, fg]) => fg !== null))
            .subscribe(([_, fg]) => {
            const form = fg;
            form.updateValueAndValidity();
        });
    }
    _explodeRepeatingNode(allNodes, instance, context) {
        const oldReps = updateRepsNum(instance, context);
        if (oldReps !== instance.reps) {
            this._adjustReps(allNodes, instance, oldReps, context);
        }
    }
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
    _orderedNodesInstancesTree(allNodes, nodes, parent = null, prefix = [], context) {
        let nodesInstances = [];
        const curSuffix = prefix.length > 0 ? '__' + prefix.join('__') : '';
        orderedNodes(nodes, parent).forEach((node) => {
            const parentNodeInstance = nodesInstances.find(ni => ni.node.id == node.parent && nodeInstanceSuffix(ni) == curSuffix);
            const branchVisibility = parentNodeInstance != null
                ? parentNodeInstance.verifiedBranch != null &&
                    parentNodeInstance.verifiedBranch == node.parentNode
                : true;
            const nni = this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
            if (nni != null) {
                nodesInstances.push(nni);
            }
        });
        return nodesInstances;
    }
    _formValueDelta(oldValue, newValue) {
        const allKeys = [];
        [...Object.keys(oldValue), ...Object.keys(newValue)].forEach(key => {
            if (key !== '$value' && allKeys.indexOf(key) === -1) {
                allKeys.push(key);
            }
        });
        return allKeys.filter(k => oldValue[k] !== newValue[k]);
    }
    /**
     * Init the formGroup valueChanges stream, that re-render the form on valueChanges
     * @param formGroup an initial empty Form Group
     * @returns The new FormGroup
     */
    _initFormGroupStreams(formGroup) {
        this._formGroupSubscription.unsubscribe();
        let init = true;
        let initForm = true;
        this._formInitEvent.emit(0 /* AjfFormInitStatus.Initializing */);
        this._formGroupSubscription = formGroup.valueChanges
            .pipe(startWith({}), pairwise(), withLatestFrom(this._nodesMaps[0], this._nodesMaps[1], this._nodesMaps[2], this._nodesMaps[3], this._nodesMaps[4], this._nodesMaps[5], this._nodesMaps[6], this._nodesMaps[7], this._nodesMaps[8], this._nodesMaps[9], this._flatNodes))
            .subscribe(v => {
            const oldFormValue = (init && {}) || v[0][0];
            init = false;
            let newFormValue = v[0][1];
            const editability = v[1];
            const visibilityMap = v[2];
            const repetitionMap = v[3];
            const conditionalBranchesMap = v[4];
            const formulaMap = v[5];
            const validationMap = v[6];
            const warningMap = v[7];
            const nextSlideConditionsMap = v[8];
            const filteredChoicesMap = v[9];
            const triggerConditionsMap = v[10];
            const nodes = v[11];
            // takes the names of the fields that have changed
            const delta = this._formValueDelta(oldFormValue, newFormValue);
            const deltaLen = delta.length;
            let updatedNodes = [];
            /*
              for each field update all properties map
              with the rule "if fieldname is in map update it" and
              push on updateNodes the node instance that wrap field
            */
            delta.forEach(fieldName => {
                updatedNodes = updatedNodes.concat(nodes.filter(n => nodeInstanceCompleteName(n) === fieldName));
                if (editability[fieldName] != null) {
                    editability[fieldName].forEach(nodeInstance => {
                        if (isSlideInstance(nodeInstance) || isFieldInstance(nodeInstance)) {
                            updateEditabilityMapEntry(nodeInstance, this._formGroup, newFormValue);
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }
                    });
                }
                if (visibilityMap[fieldName] != null) {
                    visibilityMap[fieldName].forEach(nodeInstance => {
                        updateVisibilityMapEntry(nodeInstance, this._formGroup, newFormValue);
                        newFormValue =
                            this._formGroup && this._formGroup.getValue() != null
                                ? this._formGroup.getValue()?.value
                                : newFormValue;
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (repetitionMap[fieldName] != null) {
                    repetitionMap[fieldName].forEach(nodeInstance => {
                        updateRepetitionMapEntry(nodeInstance, newFormValue, nodes, this._adjustReps);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (conditionalBranchesMap[fieldName] != null) {
                    conditionalBranchesMap[fieldName].forEach(nodeInstance => {
                        updateConditionalBranchesMapEntry(nodeInstance, newFormValue, nodes, this._showSubtree, this._hideSubtree);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (formulaMap[fieldName] != null) {
                    formulaMap[fieldName].forEach(nodeInstance => {
                        updateFormulaMapEntry(nodeInstance, newFormValue, this._formGroup);
                        newFormValue =
                            this._formGroup && this._formGroup.getValue() != null
                                ? this._formGroup.getValue()?.value
                                : newFormValue;
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (validationMap[fieldName] != null) {
                    validationMap[fieldName].forEach(nodeInstance => {
                        updateValidationMapEntry(nodeInstance, newFormValue, this.currentSupplementaryInformations);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (warningMap[fieldName] != null) {
                    warningMap[fieldName].forEach(nodeInstance => {
                        updateWarningMapEntry(nodeInstance, newFormValue);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (deltaLen == 1 && nextSlideConditionsMap[fieldName] != null) {
                    if (nextSlideConditionsMap[fieldName].filter(nodeInstance => {
                        if (isFieldInstance(nodeInstance)) {
                            return updateNextSlideCondition(nodeInstance, newFormValue);
                        }
                        return false;
                    }).length == 1) {
                        this._nextSlideTrigger.emit();
                    }
                }
                if (filteredChoicesMap[fieldName] != null) {
                    filteredChoicesMap[fieldName].forEach(nodeInstance => {
                        updateFilteredChoicesMapEntry(nodeInstance, newFormValue);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (deltaLen == 1 && triggerConditionsMap[fieldName] != null) {
                    const res = triggerConditionsMap[fieldName].filter(nodeInstance => {
                        if (!isFieldWithChoicesInstance(nodeInstance)) {
                            return false;
                        }
                        return updateTriggerConditions(nodeInstance, newFormValue);
                    });
                    if (res.length == 1 && isFieldWithChoicesInstance(res[0])) {
                        res[0].selectionTrigger.emit();
                    }
                }
            });
            updatedNodes.forEach(n => {
                const nodeIdx = nodes.indexOf(n);
                let idx = nodeIdx - 1;
                // Find and update the validity for the node's slide
                while (idx >= 0) {
                    const curNode = nodes[idx];
                    if (isSlidesInstance(curNode)) {
                        updateSlideValidity(curNode);
                        curNode.updatedEvt.emit();
                    }
                    idx--;
                }
                // Mark for check the AjfFormField
                n.updatedEvt.emit();
            });
            if (initForm) {
                initForm = false;
                this._formInitEvent.emit(1 /* AjfFormInitStatus.Complete */);
            }
            this._valueChanged.next();
        });
        return formGroup;
    }
    _showSubtree(context, nodes, node, branch) {
        this._updateSubtreeVisibility(context, nodes, node, true, branch);
    }
    _hideSubtree(context, nodes, node, branch) {
        this._updateSubtreeVisibility(context, nodes, node, false, branch);
    }
    _updateSubtreeVisibility(context, nodes, node, visible, branch) {
        let subNodes;
        const nodeSuffix = nodeInstanceSuffix(node);
        if (branch != null) {
            subNodes = nodes.filter(n => {
                const suffix = nodeInstanceSuffix(n);
                return suffix == nodeSuffix && n.node.parent == node.node.id && n.node.parentNode == branch;
            });
        }
        else {
            subNodes = nodes.filter(n => {
                const suffix = nodeInstanceSuffix(n);
                return suffix == nodeSuffix && n.node.parent == node.node.id;
            });
        }
        const isContainer = isContainerNode(node.node);
        subNodes.forEach(n => {
            if (!isContainer ||
                (isContainer && node.node.nodes.find(cn => cn.id == n.node.id) == null)) {
                updateVisibility(n, context, visible);
                if (isFieldInstance(n)) {
                    updateFormula(n, context);
                }
                this._updateSubtreeVisibility(context, nodes, n, visible);
            }
        });
    }
    /**
     * Init stream for the form flat nodes.
     * Stream starts when _initFormStreams set the _nodesUpdates
     */
    _initNodesStreams() {
        this._nodes = this._nodesUpdates.pipe(scan((nodes, op) => {
            return op(nodes);
        }, []), share());
        this._flatNodesTree = this._nodes.pipe(map(nodes => flattenNodesInstancesTree(nodes)), share());
        this._flatNodes = this._flatNodesTree.pipe(map(slides => {
            let nodes = [];
            slides.forEach(s => {
                nodes.push(s);
                nodes = nodes.concat(s.flatNodes);
                updateSlideValidity(s);
            });
            return nodes;
        }), tap(_ => {
            const formGroup = this._formGroup.getValue();
            const initializedField = '$nodesInitialised';
            if (formGroup != null && !formGroup.contains(initializedField)) {
                const control = new UntypedFormControl();
                control.setValue(true);
                formGroup.registerControl(initializedField, control);
            }
        }), share());
    }
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
    _removeNodeInstance(nodeInstance, idxToRemove) {
        const nodeName = nodeInstanceCompleteName(nodeInstance);
        const fg = this._formGroup.getValue();
        if (fg != null) {
            const curValue = fg.value;
            const maxIdx = nodeInstance.prefix ? nodeInstance.prefix[0] : 30;
            let newFormValue = { ...curValue };
            const baseNodeName = nodeInstance.node.name;
            for (let i = idxToRemove; i < maxIdx; i++) {
                const currInstanceCompleteName = `${baseNodeName}__${i}`;
                const nextInstanceCompleteName = `${baseNodeName}__${i + 1}`;
                newFormValue[currInstanceCompleteName] = newFormValue[nextInstanceCompleteName];
            }
            newFormValue = { ...newFormValue, [nodeName]: undefined };
            fg.patchValue(newFormValue);
        }
        this._removeNodesVisibilityMapIndex(nodeName);
        this._removeNodesRepetitionMapIndex(nodeName);
        this._removeNodesConditionalBranchMapIndex(nodeName);
        this._removeNodesFormulaMapIndex(nodeName);
        this._removeNodesValidationMapIndex(nodeName);
        this._removeNodesWarningMapIndex(nodeName);
        this._removeNodesNextSlideConditionsMapIndex(nodeName);
        this._removeNodesFilteredChoicesMapIndex(nodeName);
        this._removeNodesTriggerConditionsMapIndex(nodeName);
        if (isSlidesInstance(nodeInstance)) {
            this._removeNodesEditabilityMapIndex(nodeName);
            return this._removeSlideInstance(nodeInstance);
        }
        else if (isRepeatingContainerNodeInstance(nodeInstance)) {
            this._removeNodeGroupInstance(nodeInstance);
        }
        else if (isFieldInstance(nodeInstance)) {
            this._removeFieldInstance(nodeInstance);
        }
        return nodeInstance;
    }
    _removeSlideInstance(slideInstance) {
        const slide = slideInstance.node;
        if (slide.visibility != null) {
            this._removeFromNodesVisibilityMap(slideInstance, slide.visibility.condition);
        }
        slideInstance.conditionalBranches.forEach((conditionalBranch) => {
            this._removeFromNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
        });
        return slideInstance;
    }
    _removeNodeGroupInstance(nodeGroupInstance) {
        const nodeGroup = nodeGroupInstance.node;
        if (nodeGroup.visibility != null) {
            this._removeFromNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
        }
        if (nodeGroupInstance.formulaReps != null && nodeGroup.formulaReps != null) {
            this._removeFromNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
        }
        return nodeGroupInstance;
    }
    _removeFieldInstance(fieldInstance) {
        const formGroup = this._formGroup.getValue();
        const fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
        if (formGroup != null && formGroup.contains(fieldInstanceName)) {
            formGroup.removeControl(fieldInstanceName);
        }
        if (fieldInstance.validation != null) {
            this._validationNodesMapUpdates.next((vmap) => {
                if (vmap[fieldInstanceName] == null) {
                    delete vmap[fieldInstanceName];
                }
                return vmap;
            });
        }
        if (fieldInstance.readonly != null) {
            this._removeFromNodesEditabilityMap(fieldInstance, fieldInstance.readonly.condition);
        }
        if (fieldInstance.visibility != null) {
            this._removeFromNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
        }
        fieldInstance.conditionalBranches.forEach((conditionalBranch) => {
            this._removeFromNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
        });
        if (fieldInstance.formula) {
            this._removeFromNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
        }
        // TODO: check this, probably is never verified
        if (isRepeatingContainerNodeInstance(fieldInstance)) {
            if (fieldInstance.formulaReps != null) {
                this._removeFromNodesRepetitionMap(fieldInstance, fieldInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach(condition => {
                this._removeFromNodesValidationMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach(condition => {
                this._removeFromNodesWarningMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._removeFromNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isFieldWithChoicesInstance(fieldInstance)) {
            if (fieldInstance.choicesFilter != null) {
                this._removeFromNodesFilteredChoicesMap(fieldInstance, fieldInstance.choicesFilter.formula);
                if (fieldInstance.triggerConditions != null) {
                    fieldInstance.triggerConditions.forEach(condition => {
                        this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
                    });
                }
            }
        }
        return fieldInstance;
    }
    _addNodeInstance(nodeInstance) {
        if (isRepeatingContainerNodeInstance(nodeInstance)) {
            return this._addNodeGroupInstance(nodeInstance);
        }
        else if (isSlideInstance(nodeInstance)) {
            return this._addSlideInstance(nodeInstance);
        }
        else if (isFieldInstance(nodeInstance)) {
            return this._addFieldInstance(nodeInstance);
        }
        return nodeInstance;
    }
    /**
     * Add field instance as control in formGroup
     * Add field instance in all update maps (NodesEditabilityMap, NodesVisibilityMap, ...)
     * @param fieldInstance
     * @returns
     */
    _addFieldInstance(fieldInstance) {
        const formGroup = this._formGroup.getValue();
        const fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
        if (formGroup != null && !formGroup.contains(fieldInstanceName)) {
            const control = new UntypedFormControl();
            control.setValue(fieldInstance.value);
            formGroup.registerControl(fieldInstanceName, control);
        }
        if (fieldInstance.validation != null) {
            this._validationNodesMapUpdates.next((vmap) => {
                if (vmap[fieldInstanceName] == null) {
                    vmap[fieldInstanceName] = [];
                }
                if (vmap[fieldInstanceName].indexOf(fieldInstance) == -1) {
                    vmap[fieldInstanceName].push(fieldInstance);
                }
                return vmap;
            });
        }
        else {
            fieldInstance.valid = true;
        }
        if (fieldInstance.readonly != null) {
            this._addToNodesEditabilityMap(fieldInstance, fieldInstance.readonly.condition);
        }
        if (fieldInstance.visibility != null) {
            this._addToNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
        }
        fieldInstance.conditionalBranches.forEach((conditionalBranch) => {
            this._addToNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
        });
        if (fieldInstance.formula) {
            this._addToNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
        }
        if (isNodeGroupInstance(fieldInstance)) {
            if (fieldInstance.formulaReps != null) {
                this._addToNodesRepetitionMap(fieldInstance, fieldInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach(condition => {
                this._addToNodesValidationMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach(condition => {
                this._addToNodesWarningMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._addToNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isFieldWithChoicesInstance(fieldInstance)) {
            if (fieldInstance.choicesFilter != null) {
                this._addToNodesFilteredChoicesMap(fieldInstance, fieldInstance.choicesFilter.formula);
            }
            if (fieldInstance.triggerConditions != null) {
                fieldInstance.triggerConditions.forEach((condition) => {
                    this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
                });
            }
        }
        return fieldInstance;
    }
    /**
     * Add slide instance in all update maps (NodesEditabilityMap, NodesVisibilityMap, NodesConditionalBranchMap)
     * @param slideInstance
     * @returns
     */
    _addSlideInstance(slideInstance) {
        const slide = slideInstance.node;
        if (slide.readonly != null) {
            this._addToNodesEditabilityMap(slideInstance, slide.readonly.condition);
        }
        if (slide.visibility != null) {
            this._addToNodesVisibilityMap(slideInstance, slide.visibility.condition);
        }
        slideInstance.conditionalBranches.forEach((conditionalBranch) => {
            this._addToNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
        });
        return slideInstance;
    }
    /**
     * Add repeating slide instance in all update maps
     * @param nodeGroupInstance
     * @returns
     */
    _addNodeGroupInstance(nodeGroupInstance) {
        const nodeGroup = nodeGroupInstance.node;
        if (nodeGroup.visibility != null) {
            this._addToNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
        }
        nodeGroupInstance.conditionalBranches.forEach((conditionalBranch) => {
            this._addToNodesConditionalBranchMap(nodeGroupInstance, conditionalBranch.condition);
        });
        if (nodeGroupInstance.formulaReps != null) {
            if (nodeGroup.formulaReps != null) {
                this._addToNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
            }
        }
        else {
            let formGroup = this._formGroup.getValue();
            let nodeGroupInstanceName = nodeInstanceCompleteName(nodeGroupInstance);
            if (formGroup != null && !formGroup.contains(nodeGroupInstanceName)) {
                const control = new UntypedFormControl();
                control.setValue(nodeGroupInstance.reps);
                formGroup.registerControl(nodeGroupInstanceName, control);
            }
        }
        return nodeGroupInstance;
    }
    _removeNodesEditabilityMapIndex(index) {
        this._removeNodesMapIndex(this._editabilityNodesMapUpdates, index);
    }
    _removeNodesVisibilityMapIndex(index) {
        this._removeNodesMapIndex(this._visibilityNodesMapUpdates, index);
    }
    _removeNodesRepetitionMapIndex(index) {
        this._removeNodesMapIndex(this._repetitionNodesMapUpdates, index);
    }
    _removeNodesConditionalBranchMapIndex(index) {
        this._removeNodesMapIndex(this._conditionalBranchNodesMapUpdates, index);
    }
    _removeNodesFormulaMapIndex(index) {
        this._removeNodesMapIndex(this._formulaNodesMapUpdates, index);
    }
    _removeNodesValidationMapIndex(index) {
        this._removeNodesMapIndex(this._validationNodesMapUpdates, index);
    }
    _removeNodesWarningMapIndex(index) {
        this._removeNodesMapIndex(this._warningNodesMapUpdates, index);
    }
    _removeNodesFilteredChoicesMapIndex(index) {
        this._removeNodesMapIndex(this._filteredChoicesNodesMapUpdates, index);
    }
    _removeNodesTriggerConditionsMapIndex(index) {
        this._removeNodesMapIndex(this._triggerConditionsNodesMapUpdates, index);
    }
    _removeNodesNextSlideConditionsMapIndex(index) {
        this._removeNodesMapIndex(this._nextSlideConditionsNodesMapUpdates, index);
    }
    _removeNodesMapIndex(nodesMap, index) {
        nodesMap.next((vmap) => {
            if (Object.keys(vmap).indexOf(index) > -1) {
                delete vmap[index];
            }
            return vmap;
        });
    }
    _removeFromNodesEditabilityMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._editabilityNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesVisibilityMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesRepetitionMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesConditionalBranchMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesFormulaMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesValidationMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesWarningMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesFilteredChoicesMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesTriggerConditionsMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesNextSlideConditionsMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesMap(nodesMap, nodeInstance, formula) {
        const names = getArgumentNames(formula);
        names.delete('$value');
        if (names.size > 0) {
            nodesMap.next((vmap) => {
                for (const name of names) {
                    if (vmap[name] != null) {
                        const idx = vmap[name].indexOf(nodeInstance);
                        if (idx > -1) {
                            vmap[name].splice(idx, 1);
                            if (vmap[name].length == 0) {
                                delete vmap[name];
                            }
                        }
                    }
                }
                return vmap;
            });
        }
    }
    _addToNodesEditabilityMap(nodeInstance, formula) {
        this._addToNodesMap(this._editabilityNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesVisibilityMap(nodeInstance, formula) {
        this._addToNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesRepetitionMap(nodeInstance, formula) {
        this._addToNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesConditionalBranchMap(nodeInstance, formula) {
        this._addToNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesFormulaMap(nodeInstance, formula) {
        this._addToNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesValidationMap(nodeInstance, formula) {
        this._addToNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesWarningMap(nodeInstance, formula) {
        this._addToNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesFilteredChoicesMap(nodeInstance, formula) {
        this._addToNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesTriggerConditionsMap(nodeInstance, formula) {
        this._addToNodesMap(this._triggerConditionsNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesNextSlideConditionsMap(nodeInstance, formula) {
        this._addToNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesMap(nodesMap, nodeInstance, formula) {
        const names = getArgumentNames(formula);
        names.delete('$value');
        if (names.size > 0) {
            nodesMap.next((vmap) => {
                for (const name of names) {
                    if (vmap[name] == null) {
                        vmap[name] = [];
                    }
                    if (vmap[name].indexOf(nodeInstance) === -1) {
                        vmap[name].push(nodeInstance);
                    }
                }
                return vmap;
            });
        }
    }
    static { this.ɵfac = function AjfFormRendererService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormRendererService)(i0.ɵɵinject(i1.AjfValidationService), i0.ɵɵinject(i2.TranslocoService, 8)); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AjfFormRendererService, factory: AjfFormRendererService.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormRendererService, [{
        type: Injectable
    }], () => [{ type: i1.AjfValidationService }, { type: i2.TranslocoService, decorators: [{
                type: Optional
            }] }], null); })();
/**
 * Update editability for a slide or a field if editability is changed.
 * @param nodeInstance
 * @param formGroup
 * @param newFormValue
 */
const updateEditabilityMapEntry = (nodeInstance, formGroup, newFormValue) => {
    updateEditability(nodeInstance, newFormValue);
};
/**
 * Update visibility for a slide or a field if visibility is changed.
 * Set value to null for non-visible field
 * Re-set default value for fields or for child fields for a container node
 * @param nodeInstance
 * @param formGroup
 * @param newFormValue
 */
const updateVisibilityMapEntry = (nodeInstance, formGroup, newFormValue) => {
    const completeName = nodeInstanceCompleteName(nodeInstance);
    const visibilityChanged = updateVisibility(nodeInstance, newFormValue);
    const isField = isFieldInstance(nodeInstance);
    if (visibilityChanged && isNodeGroupInstance(nodeInstance)) {
        propagateVisibility(nodeInstance, newFormValue, nodeInstance.visible);
    }
    if (visibilityChanged && !nodeInstance.visible) {
        const fg = formGroup.getValue();
        if (fg != null) {
            const s = timer(200).subscribe(() => {
                if (s && !s.closed) {
                    s.unsubscribe();
                }
                if (fg.controls != null && fg.controls[completeName] != null) {
                    fg.controls[completeName].setValue(null);
                }
            });
        }
        if (isField) {
            nodeInstance.value = null;
        }
    }
    else if (visibilityChanged && nodeInstance.visible) {
        const fg = formGroup.getValue();
        if (isField) {
            const res = updateFormula(nodeInstance, newFormValue, true);
            if (fg != null && res.changed && fg.controls != null && fg.controls[completeName] != null) {
                fg.controls[completeName].setValue(res.value);
            }
        }
        else if (isContainerNodeInstance(nodeInstance)) {
            nodeInstance.nodes?.forEach(n => {
                if (isFieldInstance(n)) {
                    if (n.node.defaultValue != null &&
                        fg != null &&
                        fg.controls != null &&
                        fg.controls[n.node.name] != null) {
                        let subFieldVisibility = n.visible ? n.visible : false;
                        if (subFieldVisibility) {
                            let subFieldDefaultValue = null;
                            if (n.node.defaultValue.formula != null) {
                                subFieldDefaultValue = evaluateExpression(n.node.defaultValue.formula, newFormValue);
                            }
                            else {
                                subFieldDefaultValue = n.node.defaultValue;
                            }
                            fg.controls[n.node.name].setValue(subFieldDefaultValue);
                        }
                    }
                }
            });
            if (isRepeatingContainerNodeInstance(nodeInstance)) {
                const s2 = timer(200).subscribe(() => {
                    if (s2 && !s2.closed) {
                        s2.unsubscribe();
                    }
                    if (fg != null &&
                        fg.controls != null &&
                        fg.controls[completeName] != null &&
                        isRepeatingContainerNodeInstance(nodeInstance)) {
                        fg.controls[completeName].setValue(nodeInstance.reps);
                    }
                });
            }
        }
    }
};
/**
 * Push a container's visibility down to the fields it holds.
 *
 * A node group is a bracket: the renderer lays out the fields inside it, never
 * the group itself, so a group whose condition turns false changes nothing on
 * screen unless its children are told. Each descendant re-evaluates its own
 * condition against the branch flag -- the same call `_initNodeInstance` makes
 * when the tree is built -- so a field that hides itself for its own reasons
 * stays hidden when the group comes back into view.
 */
const propagateVisibility = (container, context, branchVisibility) => {
    (container.nodes || []).forEach(node => {
        updateVisibility(node, context, branchVisibility);
        // The nodes reached this way are not in the caller's `updatedNodes` list, so
        // the components bound to them have to be woken up here.
        node.updatedEvt.emit();
        if (isNodeGroupInstance(node)) {
            propagateVisibility(node, context, node.visible);
        }
    });
};
const updateRepetitionMapEntry = (nodeInstance, newFormValue, nodes, cb) => {
    if (isRepeatingContainerNodeInstance(nodeInstance)) {
        const oldReps = updateRepsNum(nodeInstance, newFormValue);
        if (oldReps !== nodeInstance.reps) {
            cb(nodes, nodeInstance, oldReps, newFormValue);
        }
    }
};
const updateConditionalBranchesMapEntry = (nodeInstance, newFormValue, nodes, showCb, hideCb) => {
    // const branchChanged =
    // nodeInstance.updateConditionalBranches(newFormValue);
    updateConditionalBranches(nodeInstance, newFormValue);
    // if (branchChanged) {
    const verifiedBranch = nodeInstance.verifiedBranch;
    nodeInstance.conditionalBranches.forEach((_condition, idx) => {
        if (idx == verifiedBranch) {
            showCb(newFormValue, nodes, nodeInstance, idx);
        }
        else {
            hideCb(newFormValue, nodes, nodeInstance, idx);
        }
    });
    // }
};
const updateFormulaMapEntry = (nodeInstance, newFormValue, formGroup) => {
    if (isFieldInstance(nodeInstance)) {
        const res = updateFormula(nodeInstance, newFormValue);
        const fg = formGroup.getValue();
        if (fg != null && res.changed) {
            updateValidation(nodeInstance, newFormValue);
            fg.controls[nodeInstanceCompleteName(nodeInstance)].setValue(res.value);
        }
    }
};
const updateValidationMapEntry = (nodeInstance, newFormValue, supp) => {
    if (isFieldInstance(nodeInstance)) {
        newFormValue.$value = newFormValue[nodeInstanceCompleteName(nodeInstance)];
        updateValidation(nodeInstance, newFormValue, supp);
    }
};
const updateWarningMapEntry = (nodeInstance, newFormValue) => {
    if (isFieldInstance(nodeInstance)) {
        updateWarning(nodeInstance, newFormValue);
        if (nodeInstance.warningResults != null &&
            nodeInstance.warningResults.filter(warning => warning.result).length > 0) {
            nodeInstance.warningTrigger.emit();
        }
    }
};
const updateFilteredChoicesMapEntry = (nodeInstance, newFormValue) => {
    if (isFieldWithChoicesInstance(nodeInstance)) {
        updateFilteredChoices(nodeInstance, newFormValue);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Zvcm0tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUEyQixrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWhHLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFrQixrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUNMLGVBQWUsRUFDZixJQUFJLEVBQ0osVUFBVSxFQUNWLEVBQUUsSUFBSSxLQUFLLEVBQ1gsT0FBTyxFQUVQLFlBQVksRUFDWixLQUFLLEdBQ04sTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQ0wsTUFBTSxFQUNOLEdBQUcsRUFDSCxRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULEdBQUcsRUFDSCxjQUFjLEdBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQUl4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFRM0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBT3hELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHlEQUF5RCxDQUFDO0FBQ25HLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RGLE9BQU8s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QUMsWUFBWSxDQUFDLENBQUMsQ0FBQztRQUMzRSxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JELENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLHFCQUFxQixHQUFHLENBQUMsWUFBNkIsRUFBRSxZQUFpQixFQUFFLEVBQUU7SUFDakYsSUFBSSxlQUFlLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztRQUNsQyxhQUFhLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzFDLElBQ0UsWUFBWSxDQUFDLGNBQWMsSUFBSSxJQUFJO1lBQ25DLFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ3hFLENBQUM7WUFDRCxZQUFZLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSw2QkFBNkIsR0FBRyxDQUFDLFlBQTZCLEVBQUUsWUFBaUIsRUFBRSxFQUFFO0lBQ3pGLElBQUksMEJBQTBCLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztRQUM3QyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDcEQsQ0FBQztBQUNILENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb25kaXRpb24sIEFqZkNvbnRleHQsIGV2YWx1YXRlRXhwcmVzc2lvbiwgZ2V0QXJndW1lbnROYW1lc30gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1RyYW5zbG9jb1NlcnZpY2V9IGZyb20gJ0BhamYvY29yZS90cmFuc2xvY28nO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlLCBPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgVW50eXBlZEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge2Zvcm1hdH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBmcm9tLFxuICBPYnNlcnZhYmxlLFxuICBvZiBhcyBvYnNPZixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaWJlcixcbiAgU3Vic2NyaXB0aW9uLFxuICB0aW1lcixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBmaWx0ZXIsXG4gIG1hcCxcbiAgcGFpcndpc2UsXG4gIHNjYW4sXG4gIHNoYXJlLFxuICBzdGFydFdpdGgsXG4gIHN3aXRjaE1hcCxcbiAgdGFwLFxuICB3aXRoTGF0ZXN0RnJvbSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkNob2ljZX0gZnJvbSAnLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2UnO1xuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZUYWJsZUZvcm1Db250cm9sfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy90YWJsZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cH0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS1ncm91cCc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy9ub2RlLXR5cGUnO1xuaW1wb3J0IHtBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbn0gZnJvbSAnLi9pbnRlcmZhY2Uvb3BlcmF0aW9ucy9ub2Rlcy1pbnN0YW5jZXMtb3BlcmF0aW9uJztcbmltcG9ydCB7QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb259IGZyb20gJy4vaW50ZXJmYWNlL29wZXJhdGlvbnMvcmVuZGVyZXItdXBkYXRlLW1hcC1vcGVyYXRpb24nO1xuaW1wb3J0IHtBamZSZW5kZXJlclVwZGF0ZU1hcH0gZnJvbSAnLi9pbnRlcmZhY2UvcmVuZGVyZXItbWFwcy91cGRhdGUtbWFwJztcbmltcG9ydCB7QWpmQmFzZVNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvYmFzZS1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2luaXRDaG9pY2VzT3JpZ2lufSBmcm9tICcuL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbic7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvaXMtZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7aXNUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy9pcy10YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge3VwZGF0ZUZpZWxkSW5zdGFuY2VTdGF0ZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1maWVsZC1pbnN0YW5jZS1zdGF0ZSc7XG5pbXBvcnQge3VwZGF0ZUZpbHRlcmVkQ2hvaWNlc30gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1maWx0ZXJlZC1jaG9pY2VzJztcbmltcG9ydCB7dXBkYXRlRm9ybXVsYX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1mb3JtdWxhJztcbmltcG9ydCB7dXBkYXRlTmV4dFNsaWRlQ29uZGl0aW9ufSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLW5leHQtc2xpZGUtY29uZGl0aW9uJztcbmltcG9ydCB7dXBkYXRlVHJpZ2dlckNvbmRpdGlvbnN9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtdHJpZ2dlci1jb25kaXRpb25zJztcbmltcG9ydCB7dXBkYXRlVmFsaWRhdGlvbn0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS12YWxpZGF0aW9uJztcbmltcG9ydCB7dXBkYXRlV2FybmluZ30gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS13YXJuaW5nJztcbmltcG9ydCB7Y3JlYXRlRmllbGR9IGZyb20gJy4vdXRpbHMvZmllbGRzL2NyZWF0ZS1maWVsZCc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc0luc3RhbmNlc30gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMnO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXNJbnN0YW5jZXNUcmVlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9mbGF0dGVuLW5vZGVzLWluc3RhbmNlcy10cmVlJztcbmltcG9ydCB7aXNGaWVsZEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLW5vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdHcm91cEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1yZXBlYXRpbmctZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2lzU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1NsaWRlc0luc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1zbGlkZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWV9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UtY29tcGxldGUtbmFtZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZVN1ZmZpeH0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1zdWZmaXgnO1xuaW1wb3J0IHtub2RlVG9Ob2RlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtdG8tbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge3VwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXN9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS1jb25kaXRpb25hbC1icmFuY2hlcyc7XG5pbXBvcnQge3VwZGF0ZUVkaXRhYmlsaXR5fSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtZWRpdGFiaWxpdHknO1xuaW1wb3J0IHt1cGRhdGVWaXNpYmlsaXR5fSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtdmlzaWJpbGl0eSc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc30gZnJvbSAnLi91dGlscy9ub2Rlcy9mbGF0dGVuLW5vZGVzJztcbmltcG9ydCB7aXNDb250YWluZXJOb2RlfSBmcm9tICcuL3V0aWxzL25vZGVzL2lzLWNvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7b3JkZXJlZE5vZGVzfSBmcm9tICcuL3V0aWxzL25vZGVzL29yZGVyZWQtbm9kZXMnO1xuaW1wb3J0IHt1cGRhdGVSZXBzTnVtfSBmcm9tICcuL3V0aWxzL3NsaWRlcy1pbnN0YW5jZXMvdXBkYXRlLXJlcHMtbnVtJztcbmltcG9ydCB7dmFsaWRTbGlkZX0gZnJvbSAnLi91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3ZhbGlkLXNsaWRlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvblNlcnZpY2V9IGZyb20gJy4vdmFsaWRhdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7aXNDb250YWluZXJOb2RlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcblxuZXhwb3J0IGNvbnN0IGVudW0gQWpmRm9ybUluaXRTdGF0dXMge1xuICBJbml0aWFsaXppbmcsXG4gIENvbXBsZXRlLFxufVxuXG4vKipcbiAqIFVwZGF0ZSBTbGlkZSBWYWxpZGl0eSBhY2NvcmRpbmcgdG8gdGhlIHZhbGlkaXR5IG9mIGl0cyBmaWVsZCBub2Rlc1xuICogQHBhcmFtIHNsaWRlXG4gKi9cbmNvbnN0IHVwZGF0ZVNsaWRlVmFsaWRpdHkgPSAoc2xpZGU6IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UgfCBBamZTbGlkZUluc3RhbmNlKSA9PiB7XG4gIGNvbnN0IHN1Yk5vZGVzTnVtID0gc2xpZGUuZmxhdE5vZGVzLmxlbmd0aDtcbiAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJOb2Rlc051bTsgaSsrKSB7XG4gICAgY29uc3Qgc3ViTm9kZSA9IHNsaWRlLmZsYXROb2Rlc1tpXTtcbiAgICBpZiAoc3ViTm9kZS52aXNpYmxlICYmIGlzRmllbGRJbnN0YW5jZShzdWJOb2RlKSAmJiAhc3ViTm9kZS52YWxpZCkge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoc2xpZGUudmFsaWQgIT09IHZhbGlkKSB7XG4gICAgc2xpZGUudmFsaWQgPSB2YWxpZDtcbiAgfVxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1SZW5kZXJlclNlcnZpY2Uge1xuICBwcml2YXRlIF9lZGl0YWJpbGl0eU5vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2VkaXRhYmlsaXR5Tm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU5vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9yZXBldGl0aW9uTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9mb3JtdWxhTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfZm9ybXVsYU5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Ob2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfd2FybmluZ05vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9maWx0ZXJlZENob2ljZXNOb2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9mb3JtSW5pdEV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUluaXRTdGF0dXM+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtSW5pdFN0YXR1cz4oKTtcbiAgcmVhZG9ubHkgZm9ybUluaXRFdmVudDogT2JzZXJ2YWJsZTxBamZGb3JtSW5pdFN0YXR1cz4gPSB0aGlzXG4gICAgLl9mb3JtSW5pdEV2ZW50IGFzIE9ic2VydmFibGU8QWpmRm9ybUluaXRTdGF0dXM+O1xuXG4gIHByaXZhdGUgX2Zvcm1Hcm91cDogQmVoYXZpb3JTdWJqZWN0PFVudHlwZWRGb3JtR3JvdXAgfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGZvcm1Hcm91cDogT2JzZXJ2YWJsZTxVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbD4gPSB0aGlzXG4gICAgLl9mb3JtR3JvdXAgYXMgT2JzZXJ2YWJsZTxVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbD47XG5cbiAgcHJpdmF0ZSBfZm9ybTogQmVoYXZpb3JTdWJqZWN0PHtcbiAgICBmb3JtOiBBamZGb3JtIHwgbnVsbDtcbiAgICBjb250ZXh0PzogQWpmQ29udGV4dDtcbiAgfSB8IG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDx7XG4gICAgZm9ybTogQWpmRm9ybSB8IG51bGw7XG4gICAgY29udGV4dD86IEFqZkNvbnRleHQ7XG4gIH0gfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfbm9kZXMhOiBPYnNlcnZhYmxlPEFqZk5vZGVJbnN0YW5jZVtdPjtcbiAgcHJpdmF0ZSBfZmxhdE5vZGVzITogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG5cbiAgcHJpdmF0ZSBfZmxhdE5vZGVzVHJlZSE6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPjtcbiAgcHJpdmF0ZSBfbm9kZXNVcGRhdGVzOiBTdWJqZWN0PEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2Vycm9yUG9zaXRpb25zITogT2JzZXJ2YWJsZTxudW1iZXJbXT47XG4gIHByaXZhdGUgX2Vycm9ycyE6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwcml2YXRlIF9mb3JtR3JvdXBTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9ub2Rlc01hcHMhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPltdO1xuXG4gIHByaXZhdGUgX25leHRTbGlkZVRyaWdnZXI6IEV2ZW50RW1pdHRlcjxBamZOb2RlSW5zdGFuY2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZOb2RlSW5zdGFuY2U+KCk7XG4gIHJlYWRvbmx5IG5leHRTbGlkZVRyaWdnZXI6IE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlPiA9IHRoaXNcbiAgICAuX25leHRTbGlkZVRyaWdnZXIgYXMgT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2U+O1xuXG4gIHByaXZhdGUgX3NsaWRlc051bTogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlYWRvbmx5IHNsaWRlc051bTogT2JzZXJ2YWJsZTxudW1iZXI+ID0gdGhpcy5fc2xpZGVzTnVtIGFzIE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBnZXQgbm9kZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2Rlc1RyZWU7XG4gIH1cbiAgZ2V0IGVycm9yUG9zaXRpb25zKCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JQb3NpdGlvbnM7XG4gIH1cbiAgZ2V0IGVycm9ycygpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnM7XG4gIH1cbiAgZ2V0IGN1cnJlbnRTdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zKCk6IGFueSB7XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uZm9ybSAhPSBudWxsID8gZm9ybS5mb3JtLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMgOiBudWxsO1xuICB9XG5cbiAgZ2V0IG5vZGVzVmlzaWJpbGl0eSgpOiBPYnNlcnZhYmxlPHtuYW1lOiBzdHJpbmc7IHR5cGU6ICdzbGlkZScgfCAnZmllbGQnOyB2aXNpYmxlOiBib29sZWFufVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVzLnBpcGUoXG4gICAgICBtYXAobm9kZXMgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwTm9kZXNWaXNpYmlsaXR5KG5vZGVzKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihfOiBBamZWYWxpZGF0aW9uU2VydmljZSwgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfdHM6IFRyYW5zbG9jb1NlcnZpY2UgfCBudWxsID0gbnVsbCkge1xuICAgIC8vIEluaXRpYWxpemUgYWxsIHN0cmVhbXMgZm9yIHRoZSBmb3JtXG4gICAgdGhpcy5faW5pdFVwZGF0ZU1hcFN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Tm9kZXNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEVycm9yc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Rm9ybVN0cmVhbXMoKTtcbiAgICB0aGlzLl91cGRhdGVGb3JtVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNsYXRlQ2hvaWNlcyhjaG9pY2VzOiBBamZDaG9pY2U8YW55PltdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3RzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBjaG9pY2Ugb2YgY2hvaWNlcykge1xuICAgICAgaWYgKGNob2ljZS50cmFuc2xhdGVkTGFiZWwgPT0gbnVsbCkge1xuICAgICAgICBjaG9pY2UudHJhbnNsYXRlZExhYmVsID0gdGhpcy5fdHMudHJhbnNsYXRlKGNob2ljZS5sYWJlbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0J3MgY2FsbGVkIGJ5IHRoZSBhcHAgdG8gc2V0IGEgbmV3IEFqZiBGb3JtIHdpdGggaXRzIGNvbnRleHRcbiAgICogQHBhcmFtIGZvcm0gdGhlIEFqZiBGb3JtIHNjaGVtYVxuICAgKiBAcGFyYW0gY29udGV4dCB0aGUgaW5pdGlhbCBjb250ZXh0XG4gICAqL1xuICBzZXRGb3JtKGZvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0OiBBamZDb250ZXh0ID0ge30pIHtcbiAgICB0aGlzLl9pbml0VXBkYXRlTWFwU3RyZWFtcygpO1xuICAgIGlmIChcbiAgICAgIGZvcm0gIT0gbnVsbCAmJlxuICAgICAgT2JqZWN0LmtleXMoY29udGV4dCkubGVuZ3RoID09PSAwICYmXG4gICAgICBPYmplY3Qua2V5cyhmb3JtLmluaXRDb250ZXh0IHx8IHt9KS5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICBjb250ZXh0ID0gZm9ybS5pbml0Q29udGV4dCB8fCB7fTtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudEZvcm0gPSB0aGlzLl9mb3JtLmdldFZhbHVlKCk7XG4gICAgaWYgKFxuICAgICAgKGN1cnJlbnRGb3JtID09IG51bGwgJiYgZm9ybSAhPSBudWxsKSB8fFxuICAgICAgKGN1cnJlbnRGb3JtICE9IG51bGwgJiYgZm9ybSAhPT0gY3VycmVudEZvcm0uZm9ybSlcbiAgICApIHtcbiAgICAgIGlmIChmb3JtICE9IG51bGwpIHtcbiAgICAgICAgZm9yIChjb25zdCBvcmlnaW4gb2YgZm9ybS5jaG9pY2VzT3JpZ2lucykge1xuICAgICAgICAgIHRoaXMuX3RyYW5zbGF0ZUNob2ljZXMob3JpZ2luLmNob2ljZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9mb3JtLm5leHQoe2Zvcm06IGZvcm0sIGNvbnRleHQ6IGNvbnRleHR9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBkYXRlIHZhbHVlcyBpbiB0aGlzIGZvcm1hdCBcIjIwMjMtMDMtMjhUMjI6MDA6MDAuMDAwWlwiIHdpdGggXCJ5eXl5LU1NLWRkXCIgZm9ybWF0XG4gICAqIEBwYXJhbSBjdHhcbiAgICovXG4gIHByaXZhdGUgX2ZpeERhdGVzKGN0eDogYW55KTogdm9pZCB7XG4gICAgaWYgKGN0eCkge1xuICAgICAgT2JqZWN0LmtleXMoY3R4KS5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBjb25zdCB2ID0gY3R4W2tdO1xuICAgICAgICBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIC9eXFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGRUXFxkXFxkOlxcZFxcZDpcXGRcXGRcXC5cXGRcXGRcXGRaJC8udGVzdCh2KSkge1xuICAgICAgICAgIGNvbnN0IGQgPSBmb3JtYXQobmV3IERhdGUodiksICd5eXl5LU1NLWRkJyk7XG4gICAgICAgICAgY3R4W2tdID0gZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Rm9ybVZhbHVlKCk6IGFueSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGxldCByZXMgPSBkZWVwQ29weShmb3JtR3JvdXAudmFsdWUpO1xuICAgIHRoaXMuX2ZpeERhdGVzKHJlcyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbm9kZXNVcGRhdGVzIHZhbHVlIChpdCdzIGEgZnVuY3Rpb24pIGZvciB0aGUgZmxhdE5vZGVzIHN0cmVhbVxuICAgKiBAcGFyYW0gZ3JvdXBcbiAgICogQHJldHVybnNcbiAgICovXG4gIGFkZEdyb3VwKGdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIGlmIChncm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbWF4UmVwcyA9IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGlmIChtYXhSZXBzID4gMCAmJiBncm91cC5yZXBzICsgMSA+IG1heFJlcHMpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRSZXBzID0gZ3JvdXAucmVwcztcbiAgICAgIGdyb3VwLnJlcHMgPSBncm91cC5yZXBzICsgMTtcbiAgICAgIGdyb3VwLmNhbkFkZCA9IGdyb3VwLm5vZGUubWF4UmVwcyA9PT0gMCB8fCBncm91cC5yZXBzIDwgZ3JvdXAubm9kZS5tYXhSZXBzO1xuICAgICAgZ3JvdXAuY2FuUmVtb3ZlID0gZ3JvdXAubm9kZS5taW5SZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPiBncm91cC5ub2RlLm1pblJlcHM7XG4gICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICBjb25zdCBmbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXNJbnN0YW5jZXMobm9kZXMsIHRydWUpO1xuICAgICAgICB0aGlzLl9hZGp1c3RSZXBzKGZsYXROb2RlcywgZ3JvdXAsIG9sZFJlcHMsIHRoaXMuZ2V0Rm9ybVZhbHVlKCkpO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQodHJ1ZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVHcm91cChcbiAgICBncm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLFxuICAgIGlkeD86IG51bWJlcixcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICBpZiAoZ3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1pblJlcHMgPSBncm91cC5ub2RlLm1pblJlcHM7XG4gICAgICBpZiAoZ3JvdXAucmVwcyAtIDEgPCBtaW5SZXBzKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkUmVwcyA9IGdyb3VwLnJlcHM7XG4gICAgICBncm91cC5yZXBzID0gZ3JvdXAucmVwcyAtIDE7XG4gICAgICBncm91cC5jYW5BZGQgPSBncm91cC5ub2RlLm1heFJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA8IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGdyb3VwLmNhblJlbW92ZSA9IGdyb3VwLm5vZGUubWluUmVwcyA9PT0gMCB8fCBncm91cC5yZXBzID4gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSk6IEFqZk5vZGVJbnN0YW5jZVtdID0+IHtcbiAgICAgICAgdGhpcy5fYWRqdXN0UmVwcyhub2RlcywgZ3JvdXAsIG9sZFJlcHMsIHRoaXMuZ2V0Rm9ybVZhbHVlKCksIGlkeCk7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh0cnVlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRyb2woZmllbGQ6IEFqZkZpZWxkSW5zdGFuY2UgfCB1bmRlZmluZWQpOiBPYnNlcnZhYmxlPEFic3RyYWN0Q29udHJvbCB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtR3JvdXAucGlwZShcbiAgICAgIG1hcChmID0+IHtcbiAgICAgICAgaWYgKGZpZWxkID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGQpO1xuICAgICAgICByZXR1cm4gZiAhPSBudWxsICYmIGYuY29udGFpbnMoZmllbGROYW1lKSA/IGYuY29udHJvbHNbZmllbGROYW1lXSA6IG51bGw7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGV4dHJhcG9sYXRlcyBub2RlSW5zdGFuY2VzIHZpc2liaWxpdHkgYW5kIHJldHVybnMgYW4gYXJyYXlcbiAgICogQHBhcmFtIG5vZGVzIFRoZSBub2Rlc1xuICAgKiBAcGFyYW0gcGFyZW50VmlzaWJsZSBJZiBmYWxzZSwgY2hpbGRyZW4gbm9kZXMgd2lsbCBhbHNvIGJlIG5vdCB2aXNpYmxlXG4gICAqIEByZXR1cm5zIEFuIGFycmF5IHdpdGggYWxsIG5vZGVzIHZpc2liaWxpdHlcbiAgICovXG4gIHByaXZhdGUgX21hcE5vZGVzVmlzaWJpbGl0eShcbiAgICBub2RlczogQWpmTm9kZUluc3RhbmNlW10sXG4gICAgcGFyZW50VmlzaWJsZTogYm9vbGVhbiA9IHRydWUsXG4gICk6IHtuYW1lOiBzdHJpbmc7IHR5cGU6ICdzbGlkZScgfCAnZmllbGQnOyB2aXNpYmxlOiBib29sZWFufVtdIHtcbiAgICBpZiAoIW5vZGVzIHx8ICFub2Rlcy5sZW5ndGgpIHJldHVybiBbXTtcbiAgICBjb25zdCBub2Rlc1Zpc2liaWxpdHk6IHtuYW1lOiBzdHJpbmc7IHR5cGU6ICdzbGlkZScgfCAnZmllbGQnOyB2aXNpYmxlOiBib29sZWFufVtdID0gW107XG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgY29uc3QgbmFtZSA9IG5vZGUubm9kZS5uYW1lO1xuICAgICAgY29uc3QgdmlzaWJsZSA9IHBhcmVudFZpc2libGUgPyBub2RlLnZpc2libGUgOiBmYWxzZTtcbiAgICAgIGlmICgnbm9kZXMnIGluIG5vZGUgJiYgbm9kZS5ub2RlcyAmJiBub2RlLm5vZGVzLmxlbmd0aCkge1xuICAgICAgICBub2Rlc1Zpc2liaWxpdHkucHVzaCh7bmFtZSwgdHlwZTogJ3NsaWRlJywgdmlzaWJsZX0pO1xuICAgICAgICBub2Rlc1Zpc2liaWxpdHkucHVzaCguLi50aGlzLl9tYXBOb2Rlc1Zpc2liaWxpdHkobm9kZS5ub2RlcywgdmlzaWJsZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZXNWaXNpYmlsaXR5LnB1c2goe25hbWUsIHR5cGU6ICdmaWVsZCcsIHZpc2libGV9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzVmlzaWJpbGl0eTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IHRoZSBlcnJvcnMgc3RyZWFtLiBTdGFydCBvbiB2YWx1ZUNoYW5nZWRcbiAgICovXG4gIHByaXZhdGUgX2luaXRFcnJvcnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Vycm9yUG9zaXRpb25zID0gdGhpcy5fdmFsdWVDaGFuZ2VkLnBpcGUoXG4gICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9ub2RlcywgdGhpcy5fZm9ybSksXG4gICAgICBmaWx0ZXIoXG4gICAgICAgIChbXywgX18sIGZvcm1dKSA9PlxuICAgICAgICAgIGZvcm0gIT0gbnVsbCAmJlxuICAgICAgICAgIChcbiAgICAgICAgICAgIGZvcm0gYXMge1xuICAgICAgICAgICAgICBmb3JtOiBBamZGb3JtIHwgbnVsbDtcbiAgICAgICAgICAgICAgY29udGV4dD86IEFqZkNvbnRleHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKS5mb3JtICE9IG51bGwsXG4gICAgICApLFxuICAgICAgbWFwKChbXywgbm9kZXMsIGZvcm1EZWZdKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSAoXG4gICAgICAgICAgZm9ybURlZiBhcyB7XG4gICAgICAgICAgICBmb3JtOiBBamZGb3JtIHwgbnVsbDtcbiAgICAgICAgICAgIGNvbnRleHQ/OiBBamZDb250ZXh0O1xuICAgICAgICAgIH1cbiAgICAgICAgKS5mb3JtIGFzIEFqZkZvcm07XG4gICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgICAgICBjb25zdCBlcnJvcnM6IG51bWJlcltdID0gW107XG4gICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgaWYgKGlzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZShub2RlKSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLnJlcHM7IGkrKykge1xuICAgICAgICAgICAgICBpZiAobm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZFNsaWRlKG5vZGUsIGkpKSB7XG4gICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChjdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNTbGlkZUluc3RhbmNlKG5vZGUpKSB7XG4gICAgICAgICAgICBpZiAobm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICBpZiAoIW5vZGUudmFsaWQpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChjdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZm9ybS52YWxpZCA9IGVycm9ycy5sZW5ndGggPT0gMDtcbiAgICAgICAgdGhpcy5fc2xpZGVzTnVtLm5leHQoY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgcmV0dXJuIGVycm9ycztcbiAgICAgIH0pLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX2Vycm9ycyA9IHRoaXMuX2Vycm9yUG9zaXRpb25zLnBpcGUoXG4gICAgICBtYXAoZSA9PiAoZSAhPSBudWxsID8gZS5sZW5ndGggOiAwKSksXG4gICAgICBzdGFydFdpdGgoMCksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBhbGwgdGhlIHVwZGF0ZSBtYXAgc3RyZWFtIGZvciB0aGUgZm9ybSBub2Rlc1xuICAgKiAobWFwcyBmb3IgZWRpdGFiaWxpdHksIHZpc2liaWxpdHksIHJlcGV0aXRpb24sIGZvcm11bGEsIHZhbGlkYXRpb24sIGZpbHRlcmVkQ2hvaWNlcy4uLilcbiAgICogRWFjaCBtYXAgY29udGFpbnMgYWxsIHRoZSBmaWVsZHMgdGhhdCBhcmUgdG8gYmUgcmUtcmVuZGVyZWQgd2hlbiBlZGl0aW5nIGFub3RoZXIgZmllbGQsXG4gICAqIGdyb3VwZWQgYnkgdGhlIGZpZWxkcyBvbiB3aGljaCB0aGV5IGRlcGVuZFxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdFVwZGF0ZU1hcFN0cmVhbXMoKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhcnRWYWx1ZSA9ICgpOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiAoe30pO1xuICAgIHRoaXMuX2VkaXRhYmlsaXR5Tm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX2VkaXRhYmlsaXR5Tm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9mb3JtdWxhTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl93YXJuaW5nTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcblxuICAgIHRoaXMuX25vZGVzTWFwcyA9IFtcbiAgICAgIHRoaXMuX2VkaXRhYmlsaXR5Tm9kZXNNYXAsXG4gICAgICB0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXAsXG4gICAgICB0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXAsXG4gICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwLFxuICAgICAgdGhpcy5fZm9ybXVsYU5vZGVzTWFwLFxuICAgICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwLFxuICAgICAgdGhpcy5fd2FybmluZ05vZGVzTWFwLFxuICAgICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwLFxuICAgICAgdGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXAsXG4gICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwLFxuICAgIF07XG4gIH1cblxuICAvKipcbiAgICogSW5pdCB0d28gc3RyZWFtcyBmb3IgbmV3IEFqZiBGb3JtLiBTdGFydCBvbiBzZXRGb3JtLlxuICAgKiBPbiBzdWJzY3JpYmUgY2FsbCBuZXh0KCkgZm9yIHRoZSBiZWhhdmlvciBzdWJqZWN0XG4gICAqIGFuZCBzZXQgdGhlIG5ldyB2YWx1ZSBmb3IgZm9ybUdyb3VwIChzdGFydCB0aGUgZGVsdGEpIGFuZCBmb3Igbm9kZXNVcGRhdGVzIChzdGFydCB0aGUgZmxhdE5vZGVzKVxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdEZvcm1TdHJlYW1zKCk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm1PYnMgPSB0aGlzLl9mb3JtO1xuICAgIGZvcm1PYnNcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoX2Zvcm0gPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0Rm9ybUdyb3VwU3RyZWFtcyhuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSkpO1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fZm9ybUdyb3VwKTtcbiAgICBmb3JtT2JzXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGZvcm0gPT4ge1xuICAgICAgICAgIGlmIChmb3JtID09IG51bGwgfHwgZm9ybS5mb3JtID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBvYnNPZihmb3JtKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgY2hvaWNlc09yaWdpbnMgPSBmb3JtLmZvcm0uY2hvaWNlc09yaWdpbnMgfHwgW107XG4gICAgICAgICAgaWYgKGNob2ljZXNPcmlnaW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG9ic09mKGZvcm0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZnJvbShQcm9taXNlLmFsbChjaG9pY2VzT3JpZ2lucy5tYXAoY28gPT4gaW5pdENob2ljZXNPcmlnaW4oY28pKSkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKCkgPT4gZm9ybSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcChmb3JtRGVmID0+IHtcbiAgICAgICAgICByZXR1cm4gKF9ub2Rlc0luc3RhbmNlczogQWpmTm9kZUluc3RhbmNlW10pOiBBamZOb2RlSW5zdGFuY2VbXSA9PiB7XG4gICAgICAgICAgICBsZXQgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBmb3JtRGVmICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIGZvcm1EZWYgYXMge1xuICAgICAgICAgICAgICAgICAgZm9ybTogQWpmRm9ybSB8IG51bGw7XG4gICAgICAgICAgICAgICAgICBjb250ZXh0PzogQWpmQ29udGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICkuZm9ybSAhPSBudWxsXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IGZvcm1EZWYgYXMge1xuICAgICAgICAgICAgICAgIGZvcm06IEFqZkZvcm07XG4gICAgICAgICAgICAgICAgY29udGV4dDogQWpmQ29udGV4dDtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgY29uc3QgYmFzZU5vZGVzID0gZm9ybS5mb3JtLm5vZGVzO1xuICAgICAgICAgICAgICBub2RlcyA9IHRoaXMuX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICAgICAgICAgICAgZmxhdHRlbk5vZGVzKGJhc2VOb2RlcyksXG4gICAgICAgICAgICAgICAgYmFzZU5vZGVzLFxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBbXSxcbiAgICAgICAgICAgICAgICBmb3JtLmNvbnRleHQgfHwge30sXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBub2RlcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU2V0IHRoZSBwb3NpdGlvbiBmb3IgZWFjaCBzbGlkZVxuICAgICAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLnJlcHM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgaWYgKG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTbGlkZUluc3RhbmNlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGl6ZSBub2RlIGluc3RhbmNlICh2aXNpYmlsaXR5LCBlZGl0YWJpbGl0eS4uLilcbiAgICogYW5kIGFkZCB0aGlzIGludG8gdGhlIGZvcm1ncm91cC5cbiAgICogSWYgaXQncyBhIGNvbnRhaW5lciBub2RlLCBjYWxsIHJlY3Vyc2l2ZWx5IF9vcmRlcmVkTm9kZXNJbnN0YW5jZXNUcmVlXG4gICAqIEBwYXJhbSBhbGxOb2RlcyBhbGwgdGhlIGZsYXR0ZW4gbm9kZXNcbiAgICogQHBhcmFtIG5vZGUgdGhlIG5vZGUgdG8gYmUgaW5pdGlhbGlzZWRcbiAgICogQHBhcmFtIHByZWZpeCB0aGUgcHJlZml4XG4gICAqIEBwYXJhbSBjb250ZXh0IHRoZSBmb3JtIGNvbnRleHRcbiAgICogQHBhcmFtIGJyYW5jaFZpc2liaWxpdHkgdGhlIGJyYW5jaCB2aXNpYmlsaXR5XG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwcml2YXRlIF9pbml0Tm9kZUluc3RhbmNlKFxuICAgIGFsbE5vZGVzOiBBamZOb2RlW10gfCBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlOiBBamZOb2RlLFxuICAgIHByZWZpeDogbnVtYmVyW10sXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICBicmFuY2hWaXNpYmlsaXR5ID0gdHJ1ZSxcbiAgKTogQWpmTm9kZUluc3RhbmNlIHwgbnVsbCB7XG4gICAgbGV0IGluc3RhbmNlID0gbm9kZVRvTm9kZUluc3RhbmNlKGFsbE5vZGVzLCBub2RlLCBwcmVmaXgsIGNvbnRleHQpO1xuICAgIGlmIChpbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKGlzUmVwZWF0aW5nR3JvdXBJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgIHRoaXMuX2V4cGxvZGVSZXBlYXRpbmdOb2RlKGFsbE5vZGVzLCBpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChpc1NsaWRlSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICBpbnN0YW5jZS5ub2RlcyA9IHRoaXMuX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICAgIGFsbE5vZGVzLFxuICAgICAgICBpbnN0YW5jZS5ub2RlLm5vZGVzLFxuICAgICAgICBpbnN0YW5jZS5ub2RlLmlkLFxuICAgICAgICBwcmVmaXgsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoaXNTbGlkZUluc3RhbmNlKGluc3RhbmNlKSB8fCBpc0ZpZWxkSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICB1cGRhdGVFZGl0YWJpbGl0eShpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgfVxuICAgIHVwZGF0ZVZpc2liaWxpdHkoaW5zdGFuY2UsIGNvbnRleHQsIGJyYW5jaFZpc2liaWxpdHkpO1xuICAgIGlmIChpc05vZGVHcm91cEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgLy8gVGhlIGdyb3VwJ3MgY2hpbGRyZW4gd2VyZSBidWlsdCBhYm92ZSwgYmVmb3JlIHRoZSBncm91cCBpdHNlbGYgaGFkIGFcbiAgICAgIC8vIHZpc2liaWxpdHk6IHdpdGhvdXQgdGhpcyBhIGdyb3VwIHRoYXQgc3RhcnRzIG91dCBoaWRkZW4gc3RpbGwgc2hvd3NcbiAgICAgIC8vIGV2ZXJ5IGZpZWxkIGl0IGhvbGRzIHVudGlsIGl0cyBjb25kaXRpb24gaGFwcGVucyB0byBjaGFuZ2UuXG4gICAgICBwcm9wYWdhdGVWaXNpYmlsaXR5KGluc3RhbmNlLCBjb250ZXh0LCBpbnN0YW5jZS52aXNpYmxlKTtcbiAgICB9XG4gICAgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgaWYgKGlzRmllbGRJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc1RhYmxlRmllbGRJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgICAgICBjb25zdCB7bm9kZX0gPSBpbnN0YW5jZTtcbiAgICAgICAgICBpbnN0YW5jZS5jb250ZXh0ID0gY29udGV4dFtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpXSB8fCBjb250ZXh0O1xuICAgICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgIGxldCBjb250cm9sc1dpdGhMYWJlbHM6IFtzdHJpbmcsIChzdHJpbmcgfCBBamZUYWJsZUZvcm1Db250cm9sKVtdXVtdID0gW107XG4gICAgICAgICAgY29udHJvbHNXaXRoTGFiZWxzLnB1c2goW25vZGUubGFiZWwsIG5vZGUuY29sdW1uTGFiZWxzXSk7XG4gICAgICAgICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCByb3dzTnVtID0gbm9kZS5yb3dzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IHJvd0lkeCA9IDA7IHJvd0lkeCA8IHJvd3NOdW07IHJvd0lkeCsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJvdyA9IG5vZGUucm93c1tyb3dJZHhdO1xuICAgICAgICAgICAgICBsZXQgcjogQWpmVGFibGVGb3JtQ29udHJvbFtdID0gW107XG4gICAgICAgICAgICAgIGNvbnN0IGNlbGxOdW0gPSByb3cubGVuZ3RoO1xuICAgICAgICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBjZWxsTnVtOyBpZHgrKykge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gcm93W2lkeF07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjZWxsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgY2VsbCA9IHtmb3JtdWxhOiBjZWxsfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBldmVyeSBjb250cm9sIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgY2VsbCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIGluc2lkZSB0aGUgZm9ybSBjb250cm9sIG1hdHJpeFxuICAgICAgICAgICAgICAgIHdpdGggdGhpcyBtYXNrIGAke3ROb2RlLm5hbWV9X18ke3Jvd0lkeH1fXyR7aWR4fWBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgJHtub2RlLm5hbWV9X18ke3Jvd0lkeH1fXyR7aWR4fWA7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IChub2RlLmNvbHVtblR5cGVzICYmIG5vZGUuY29sdW1uVHlwZXNbaWR4XSkgfHwgJ251bWJlcic7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFibGVGb3JtQ29udHJvbDogQWpmVGFibGVGb3JtQ29udHJvbCA9IHtcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2w6IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woKSxcbiAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID1cbiAgICAgICAgICAgICAgICAgIGluc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXSAmJiB0eXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAgICAgICAgICAgICA/ICtpbnN0YW5jZS5jb250ZXh0W2NlbGwuZm9ybXVsYV1cbiAgICAgICAgICAgICAgICAgICAgOiBpbnN0YW5jZS5jb250ZXh0W2NlbGwuZm9ybXVsYV07XG4gICAgICAgICAgICAgICAgdGFibGVGb3JtQ29udHJvbC5jb250cm9sLnNldFZhbHVlKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKG5hbWUsIHRhYmxlRm9ybUNvbnRyb2wuY29udHJvbCk7XG4gICAgICAgICAgICAgICAgci5wdXNoKHRhYmxlRm9ybUNvbnRyb2wpO1xuICAgICAgICAgICAgICAgIC8qIGNyZWF0ZSBhIG9iamVjdCB0aGF0IHJlc3BlY3QgdGhlIGluc3RhbmNlIGludGVyZmFjZVxuICAgICAgICAgICAgICAgIHdpdGggdGhlIG1pbmltdW0gZGVmaW5lZCBwcm9wZXJ0aWVzIHRvIGFsbG93IHRvIHJ1biBhZGRUb05vZGVGb3JtdWxhIG1hcCovXG4gICAgICAgICAgICAgICAgY29uc3QgZmFrZUluc3RhbmNlID0ge1xuICAgICAgICAgICAgICAgICAgZm9ybXVsYToge2Zvcm11bGE6IGNlbGwuZm9ybXVsYX0sXG4gICAgICAgICAgICAgICAgICBub2RlOiB7bmFtZSwgbm9kZVR5cGU6IDAsIGVkaXRhYmxlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgcHJlZml4OiBbXSxcbiAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbmFsQnJhbmNoZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgdXBkYXRlZEV2dDogbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpLFxuICAgICAgICAgICAgICAgIH0gYXMgdW5rbm93biBhcyBBamZOb2RlSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0Zvcm11bGFNYXAoZmFrZUluc3RhbmNlLCBjZWxsLmZvcm11bGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnRyb2xzV2l0aExhYmVscy5wdXNoKFtub2RlLnJvd0xhYmVsc1tyb3dJZHhdLCByXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbnN0YW5jZS5jb250cm9scyA9IGNvbnRyb2xzV2l0aExhYmVscztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zdGFuY2UudmFsdWUgPSBjb250ZXh0W25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShpbnN0YW5jZSldO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB1cGRhdGVGaWVsZEluc3RhbmNlU3RhdGUoaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgIH1cbiAgICB0aGlzLl9hZGROb2RlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGp1c3QgcmVwIHNsaWRlIHdoZW4gYWRkIG9yIHJlbW92ZSBvbmUnc1xuICAgKiBAcGFyYW0gYWxsTm9kZXMgQWxsIG5vZGVzIG9mIHRoZSBmb3JtXG4gICAqIEBwYXJhbSBpbnN0YW5jZSBBbGwgdGhlIGV4aXN0aW5nIGluc3RhbmNlIHJlcHNcbiAgICogQHBhcmFtIG9sZFJlcHMgVGhlIG51bWJlciBvZiBpbml0aWFsIHJlcHNcbiAgICogQHBhcmFtIGNvbnRleHQgVGhlIGZvcm0gY29udGV4dFxuICAgKiBAcGFyYW0gaWR4VG9SZW1vdmUgVGhlIGluZGV4IG9mIHRoZSBzbGlkZSB0byBiZSByZW1vdmVkIChvcHRpb25hbCwgZGVmYXVsdCB0byBsYXN0KVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHJpdmF0ZSBfYWRqdXN0UmVwcyhcbiAgICBhbGxOb2RlczogQWpmTm9kZVtdIHwgQWpmTm9kZUluc3RhbmNlW10sXG4gICAgaW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSxcbiAgICBvbGRSZXBzOiBudW1iZXIsXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICBpZHhUb1JlbW92ZT86IG51bWJlcixcbiAgKToge2FkZGVkOiBBamZOb2RlSW5zdGFuY2VbXSB8IG51bGw7IHJlbW92ZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbH0ge1xuICAgIGNvbnN0IG5ld1JlcHMgPSBpbnN0YW5jZS5yZXBzO1xuICAgIGNvbnN0IHJlc3VsdDoge1xuICAgICAgYWRkZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbDtcbiAgICAgIHJlbW92ZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbDtcbiAgICB9ID0ge1xuICAgICAgYWRkZWQ6IG51bGwsXG4gICAgICByZW1vdmVkOiBudWxsLFxuICAgIH07XG4gICAgaWYgKG9sZFJlcHMgPCBuZXdSZXBzKSB7XG4gICAgICBjb25zdCBuZXdOb2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlcyA9PSBudWxsKSB7XG4gICAgICAgIGluc3RhbmNlLm5vZGVzID0gW107XG4gICAgICB9XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVGaWVsZCh7XG4gICAgICAgICAgaWQ6IDk5OSxcbiAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICBwYXJlbnQ6IC0xLFxuICAgICAgICAgIGZpZWxkVHlwZTogQWpmRmllbGRUeXBlLkVtcHR5LFxuICAgICAgICAgIGxhYmVsOiBpbnN0YW5jZS5ub2RlLmxhYmVsLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSB0aGlzLl9pbml0Tm9kZUluc3RhbmNlKFxuICAgICAgICAgIGFsbE5vZGVzLFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgaW5zdGFuY2UucHJlZml4LnNsaWNlKDApLFxuICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChuZXdJbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICAgICAgaW5zdGFuY2Uubm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSBvbGRSZXBzOyBpIDwgbmV3UmVwczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IGluc3RhbmNlLnByZWZpeC5zbGljZSgwKTtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBpbnN0YW5jZS5ub2RlO1xuICAgICAgICBwcmVmaXgucHVzaChpKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZExpc3ROb2RlcyA9IG9yZGVyZWROb2Rlcyhncm91cC5ub2RlcywgaW5zdGFuY2Uubm9kZS5pZCk7XG4gICAgICAgIG9yZGVyZWRMaXN0Tm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoYWxsTm9kZXMsIG4sIHByZWZpeCwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKG5ld0luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5ld05vZGVzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICAgICAgaW5zdGFuY2Uubm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fYWRkTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5hZGRlZCA9IG5ld05vZGVzO1xuICAgIH0gZWxzZSBpZiAob2xkUmVwcyA+IG5ld1JlcHMpIHtcbiAgICAgIGxldCBub2Rlc051bSA9IGluc3RhbmNlLm5vZGVzLmxlbmd0aCAvIG9sZFJlcHM7XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwKSB7XG4gICAgICAgIG5vZGVzTnVtKys7XG4gICAgICB9XG5cbiAgICAgIHJlc3VsdC5yZW1vdmVkID0gaW5zdGFuY2Uubm9kZXMuc3BsaWNlKG5ld1JlcHMgKiBub2Rlc051bSwgbm9kZXNOdW0pO1xuICAgICAgY29uc3QgaWR4U2xpZGVUb1JlbW92ZSA9IGlkeFRvUmVtb3ZlID8/IG5ld1JlcHM7XG4gICAgICByZXN1bHQucmVtb3ZlZC5mb3JFYWNoKG4gPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVOb2RlSW5zdGFuY2UobiwgaWR4U2xpZGVUb1JlbW92ZSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG9sZFJlcHMgIT0gbmV3UmVwcyAmJiBpbnN0YW5jZS5mb3JtdWxhUmVwcyA9PSBudWxsKSB7XG4gICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgY29uc3QgY29tcGxldGVOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKTtcbiAgICAgIGlmIChmZyAhPSBudWxsICYmIGZnLmNvbnRhaW5zKGNvbXBsZXRlTmFtZSkpIHtcbiAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShpbnN0YW5jZS5yZXBzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaW5zdGFuY2UuZmxhdE5vZGVzID0gZmxhdHRlbk5vZGVzSW5zdGFuY2VzKGluc3RhbmNlLm5vZGVzKTtcbiAgICBpZiAoaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgY29uc3Qgc2xpZGVOb2RlczogQWpmTm9kZUluc3RhbmNlW11bXSA9IFtdO1xuICAgICAgY29uc3Qgbm9kZXNQZXJTbGlkZSA9IGluc3RhbmNlLm5vZGVzICE9IG51bGwgPyBpbnN0YW5jZS5ub2Rlcy5sZW5ndGggLyBpbnN0YW5jZS5yZXBzIDogMDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdGFuY2UucmVwczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0Tm9kZSA9IGkgKiBub2Rlc1BlclNsaWRlO1xuICAgICAgICAvLyBGbGF0dGVuZWQsIGxpa2UgYGZsYXROb2Rlc2AgYWJvdmU6IGEgbm9kZSBncm91cCBpbnNpZGUgdGhlIHNsaWRlIGlzIGFcbiAgICAgICAgLy8gY29udGFpbmVyLCBhbmQgaXRzIGZpZWxkcyBsaXZlIG9uZSBsZXZlbCBkb3duLiBTbGljaW5nIGFsb25lIHdvdWxkIGhhbmRcbiAgICAgICAgLy8gdGhlIHJlcGV0aXRpb24gdGhlIGdyb3VwIGluc3RhbmNlIGl0c2VsZiAtLSBhIG5vZGUgd2l0aCBubyBmaWVsZFR5cGUsXG4gICAgICAgIC8vIHdoaWNoIHJlbmRlcnMgYXMgYW4gdW5rbm93biBmaWVsZCAtLSBhbmQgbm9uZSBvZiB0aGUgZmllbGRzIGl0IGhvbGRzLlxuICAgICAgICBzbGlkZU5vZGVzLnB1c2goXG4gICAgICAgICAgZmxhdHRlbk5vZGVzSW5zdGFuY2VzKGluc3RhbmNlLm5vZGVzLnNsaWNlKHN0YXJ0Tm9kZSwgc3RhcnROb2RlICsgbm9kZXNQZXJTbGlkZSkpLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaW5zdGFuY2Uuc2xpZGVOb2RlcyA9IHNsaWRlTm9kZXM7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGb3JtVmFsdWVBbmRWYWxpZGl0eSgpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2Rlc1VwZGF0ZXNcbiAgICAgIC5waXBlKFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9mb3JtR3JvdXApLFxuICAgICAgICBmaWx0ZXIoKFtfLCBmZ10pID0+IGZnICE9PSBudWxsKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKFtfLCBmZ10pID0+IHtcbiAgICAgICAgY29uc3QgZm9ybSA9IGZnIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgICAgIGZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9leHBsb2RlUmVwZWF0aW5nTm9kZShcbiAgICBhbGxOb2RlczogQWpmTm9kZVtdIHwgQWpmTm9kZUluc3RhbmNlW10sXG4gICAgaW5zdGFuY2U6IEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSxcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICApIHtcbiAgICBjb25zdCBvbGRSZXBzID0gdXBkYXRlUmVwc051bShpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgaWYgKG9sZFJlcHMgIT09IGluc3RhbmNlLnJlcHMpIHtcbiAgICAgIHRoaXMuX2FkanVzdFJlcHMoYWxsTm9kZXMsIGluc3RhbmNlLCBvbGRSZXBzLCBjb250ZXh0KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBhbmQgcmV0dXJuIGFsbCBmb3JtIG5vZGVzIGluc3RhbmNlcy5cbiAgICogQWRkIHRoZSBub2RlcyBpbnRvIHRoZSBmb3JtZ3JvdXAgd2l0aCBfaW5pdE5vZGVJbnN0YW5jZS5cbiAgICogU3RhcnQgdGhlIHZhbHVlQ2hhbmdlcyBmb3IgdGhlIGZvcm1ncm91cC5cbiAgICogQHBhcmFtIGFsbE5vZGVzIGFsbCBmbGF0dGVuIG5vZGVzIGRpIGJhc2Ugbm9kZXNcbiAgICogQHBhcmFtIG5vZGVzIGJhc2Ugbm9kZXNcbiAgICogQHBhcmFtIHBhcmVudCBzdGFydCB3aXRoIHVuZGVmaW5lZFxuICAgKiBAcGFyYW0gcHJlZml4XG4gICAqIEBwYXJhbSBjb250ZXh0IHRoZSBmb3JtIGRhdGEgY29udGV4dFxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHJpdmF0ZSBfb3JkZXJlZE5vZGVzSW5zdGFuY2VzVHJlZShcbiAgICBhbGxOb2RlczogQWpmTm9kZVtdIHwgQWpmTm9kZUluc3RhbmNlW10sXG4gICAgbm9kZXM6IEFqZk5vZGVbXSxcbiAgICBwYXJlbnQ6IG51bWJlciB8IG51bGwgPSBudWxsLFxuICAgIHByZWZpeDogbnVtYmVyW10gPSBbXSxcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICApOiBBamZOb2RlSW5zdGFuY2VbXSB7XG4gICAgbGV0IG5vZGVzSW5zdGFuY2VzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuICAgIGNvbnN0IGN1clN1ZmZpeCA9IHByZWZpeC5sZW5ndGggPiAwID8gJ19fJyArIHByZWZpeC5qb2luKCdfXycpIDogJyc7XG4gICAgb3JkZXJlZE5vZGVzKG5vZGVzLCBwYXJlbnQpLmZvckVhY2goKG5vZGU6IEFqZk5vZGUpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudE5vZGVJbnN0YW5jZSA9IG5vZGVzSW5zdGFuY2VzLmZpbmQoXG4gICAgICAgIG5pID0+IG5pLm5vZGUuaWQgPT0gbm9kZS5wYXJlbnQgJiYgbm9kZUluc3RhbmNlU3VmZml4KG5pKSA9PSBjdXJTdWZmaXgsXG4gICAgICApO1xuICAgICAgY29uc3QgYnJhbmNoVmlzaWJpbGl0eSA9XG4gICAgICAgIHBhcmVudE5vZGVJbnN0YW5jZSAhPSBudWxsXG4gICAgICAgICAgPyBwYXJlbnROb2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2ggIT0gbnVsbCAmJlxuICAgICAgICAgICAgcGFyZW50Tm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoID09IG5vZGUucGFyZW50Tm9kZVxuICAgICAgICAgIDogdHJ1ZTtcbiAgICAgIGNvbnN0IG5uaSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoYWxsTm9kZXMsIG5vZGUsIHByZWZpeCwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gICAgICBpZiAobm5pICE9IG51bGwpIHtcbiAgICAgICAgbm9kZXNJbnN0YW5jZXMucHVzaChubmkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBub2Rlc0luc3RhbmNlcztcbiAgfVxuXG4gIHByaXZhdGUgX2Zvcm1WYWx1ZURlbHRhKG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgYWxsS2V5cyA9IFtdIGFzIHN0cmluZ1tdO1xuICAgIFsuLi5PYmplY3Qua2V5cyhvbGRWYWx1ZSksIC4uLk9iamVjdC5rZXlzKG5ld1ZhbHVlKV0uZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKGtleSAhPT0gJyR2YWx1ZScgJiYgYWxsS2V5cy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgIGFsbEtleXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBhbGxLZXlzLmZpbHRlcihrID0+IG9sZFZhbHVlW2tdICE9PSBuZXdWYWx1ZVtrXSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCB0aGUgZm9ybUdyb3VwIHZhbHVlQ2hhbmdlcyBzdHJlYW0sIHRoYXQgcmUtcmVuZGVyIHRoZSBmb3JtIG9uIHZhbHVlQ2hhbmdlc1xuICAgKiBAcGFyYW0gZm9ybUdyb3VwIGFuIGluaXRpYWwgZW1wdHkgRm9ybSBHcm91cFxuICAgKiBAcmV0dXJucyBUaGUgbmV3IEZvcm1Hcm91cFxuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdEZvcm1Hcm91cFN0cmVhbXMoZm9ybUdyb3VwOiBVbnR5cGVkRm9ybUdyb3VwKTogVW50eXBlZEZvcm1Hcm91cCB7XG4gICAgdGhpcy5fZm9ybUdyb3VwU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgbGV0IGluaXQgPSB0cnVlO1xuICAgIGxldCBpbml0Rm9ybSA9IHRydWU7XG4gICAgdGhpcy5fZm9ybUluaXRFdmVudC5lbWl0KEFqZkZvcm1Jbml0U3RhdHVzLkluaXRpYWxpemluZyk7XG4gICAgdGhpcy5fZm9ybUdyb3VwU3Vic2NyaXB0aW9uID0gZm9ybUdyb3VwLnZhbHVlQ2hhbmdlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN0YXJ0V2l0aCh7fSksXG4gICAgICAgIHBhaXJ3aXNlKCksXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1swXSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbMV0sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzJdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1szXSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbNF0sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzVdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1s2XSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbN10sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzhdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1s5XSxcbiAgICAgICAgICB0aGlzLl9mbGF0Tm9kZXMsXG4gICAgICAgICksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHYgPT4ge1xuICAgICAgICBjb25zdCBvbGRGb3JtVmFsdWUgPSAoaW5pdCAmJiB7fSkgfHwgdlswXVswXTtcbiAgICAgICAgaW5pdCA9IGZhbHNlO1xuICAgICAgICBsZXQgbmV3Rm9ybVZhbHVlID0gdlswXVsxXTtcbiAgICAgICAgY29uc3QgZWRpdGFiaWxpdHkgPSB2WzFdO1xuICAgICAgICBjb25zdCB2aXNpYmlsaXR5TWFwID0gdlsyXTtcbiAgICAgICAgY29uc3QgcmVwZXRpdGlvbk1hcCA9IHZbM107XG4gICAgICAgIGNvbnN0IGNvbmRpdGlvbmFsQnJhbmNoZXNNYXAgPSB2WzRdO1xuICAgICAgICBjb25zdCBmb3JtdWxhTWFwID0gdls1XTtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbk1hcCA9IHZbNl07XG4gICAgICAgIGNvbnN0IHdhcm5pbmdNYXAgPSB2WzddO1xuICAgICAgICBjb25zdCBuZXh0U2xpZGVDb25kaXRpb25zTWFwID0gdls4XTtcbiAgICAgICAgY29uc3QgZmlsdGVyZWRDaG9pY2VzTWFwID0gdls5XTtcbiAgICAgICAgY29uc3QgdHJpZ2dlckNvbmRpdGlvbnNNYXAgPSB2WzEwXTtcbiAgICAgICAgY29uc3Qgbm9kZXMgPSB2WzExXTtcblxuICAgICAgICAvLyB0YWtlcyB0aGUgbmFtZXMgb2YgdGhlIGZpZWxkcyB0aGF0IGhhdmUgY2hhbmdlZFxuICAgICAgICBjb25zdCBkZWx0YSA9IHRoaXMuX2Zvcm1WYWx1ZURlbHRhKG9sZEZvcm1WYWx1ZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgY29uc3QgZGVsdGFMZW4gPSBkZWx0YS5sZW5ndGg7XG4gICAgICAgIGxldCB1cGRhdGVkTm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG5cbiAgICAgICAgLypcbiAgICAgICAgICBmb3IgZWFjaCBmaWVsZCB1cGRhdGUgYWxsIHByb3BlcnRpZXMgbWFwXG4gICAgICAgICAgd2l0aCB0aGUgcnVsZSBcImlmIGZpZWxkbmFtZSBpcyBpbiBtYXAgdXBkYXRlIGl0XCIgYW5kXG4gICAgICAgICAgcHVzaCBvbiB1cGRhdGVOb2RlcyB0aGUgbm9kZSBpbnN0YW5jZSB0aGF0IHdyYXAgZmllbGRcbiAgICAgICAgKi9cbiAgICAgICAgZGVsdGEuZm9yRWFjaChmaWVsZE5hbWUgPT4ge1xuICAgICAgICAgIHVwZGF0ZWROb2RlcyA9IHVwZGF0ZWROb2Rlcy5jb25jYXQoXG4gICAgICAgICAgICBub2Rlcy5maWx0ZXIobiA9PiBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobikgPT09IGZpZWxkTmFtZSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoZWRpdGFiaWxpdHlbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBlZGl0YWJpbGl0eVtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgaWYgKGlzU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpIHx8IGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRWRpdGFiaWxpdHlNYXBFbnRyeShub2RlSW5zdGFuY2UsIHRoaXMuX2Zvcm1Hcm91cCwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZpc2liaWxpdHlNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICB2aXNpYmlsaXR5TWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVWaXNpYmlsaXR5TWFwRW50cnkobm9kZUluc3RhbmNlLCB0aGlzLl9mb3JtR3JvdXAsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgIG5ld0Zvcm1WYWx1ZSA9XG4gICAgICAgICAgICAgICAgdGhpcy5fZm9ybUdyb3VwICYmIHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpICE9IG51bGxcbiAgICAgICAgICAgICAgICAgID8gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk/LnZhbHVlXG4gICAgICAgICAgICAgICAgICA6IG5ld0Zvcm1WYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJlcGV0aXRpb25NYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXBldGl0aW9uTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVSZXBldGl0aW9uTWFwRW50cnkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUsIG5vZGVzLCB0aGlzLl9hZGp1c3RSZXBzKTtcbiAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGNvbmRpdGlvbmFsQnJhbmNoZXNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzTWFwRW50cnkoXG4gICAgICAgICAgICAgICAgbm9kZUluc3RhbmNlLFxuICAgICAgICAgICAgICAgIG5ld0Zvcm1WYWx1ZSxcbiAgICAgICAgICAgICAgICBub2RlcyxcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG93U3VidHJlZSxcbiAgICAgICAgICAgICAgICB0aGlzLl9oaWRlU3VidHJlZSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGZvcm11bGFNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmb3JtdWxhTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVGb3JtdWxhTWFwRW50cnkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUsIHRoaXMuX2Zvcm1Hcm91cCk7XG4gICAgICAgICAgICAgIG5ld0Zvcm1WYWx1ZSA9XG4gICAgICAgICAgICAgICAgdGhpcy5fZm9ybUdyb3VwICYmIHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpICE9IG51bGxcbiAgICAgICAgICAgICAgICAgID8gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk/LnZhbHVlXG4gICAgICAgICAgICAgICAgICA6IG5ld0Zvcm1WYWx1ZTtcbiAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHZhbGlkYXRpb25NYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICB2YWxpZGF0aW9uTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVWYWxpZGF0aW9uTWFwRW50cnkoXG4gICAgICAgICAgICAgICAgbm9kZUluc3RhbmNlLFxuICAgICAgICAgICAgICAgIG5ld0Zvcm1WYWx1ZSxcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAod2FybmluZ01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHdhcm5pbmdNYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgIHVwZGF0ZVdhcm5pbmdNYXBFbnRyeShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChkZWx0YUxlbiA9PSAxICYmIG5leHRTbGlkZUNvbmRpdGlvbnNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG5leHRTbGlkZUNvbmRpdGlvbnNNYXBbZmllbGROYW1lXS5maWx0ZXIobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVOZXh0U2xpZGVDb25kaXRpb24obm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH0pLmxlbmd0aCA9PSAxXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdGhpcy5fbmV4dFNsaWRlVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGZpbHRlcmVkQ2hvaWNlc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZpbHRlcmVkQ2hvaWNlc01hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzTWFwRW50cnkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZGVsdGFMZW4gPT0gMSAmJiB0cmlnZ2VyQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IHRyaWdnZXJDb25kaXRpb25zTWFwW2ZpZWxkTmFtZV0uZmlsdGVyKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgIGlmICghaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlVHJpZ2dlckNvbmRpdGlvbnMobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVzLmxlbmd0aCA9PSAxICYmIGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKHJlc1swXSkpIHtcbiAgICAgICAgICAgICAgcmVzWzBdLnNlbGVjdGlvblRyaWdnZXIuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHVwZGF0ZWROb2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgICAgIGNvbnN0IG5vZGVJZHggPSBub2Rlcy5pbmRleE9mKG4pO1xuICAgICAgICAgIGxldCBpZHggPSBub2RlSWR4IC0gMTtcbiAgICAgICAgICAvLyBGaW5kIGFuZCB1cGRhdGUgdGhlIHZhbGlkaXR5IGZvciB0aGUgbm9kZSdzIHNsaWRlXG4gICAgICAgICAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJOb2RlID0gbm9kZXNbaWR4XTtcbiAgICAgICAgICAgIGlmIChpc1NsaWRlc0luc3RhbmNlKGN1ck5vZGUpKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZVNsaWRlVmFsaWRpdHkoY3VyTm9kZSk7XG4gICAgICAgICAgICAgIGN1ck5vZGUudXBkYXRlZEV2dC5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHgtLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTWFyayBmb3IgY2hlY2sgdGhlIEFqZkZvcm1GaWVsZFxuICAgICAgICAgIG4udXBkYXRlZEV2dC5lbWl0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5pdEZvcm0pIHtcbiAgICAgICAgICBpbml0Rm9ybSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuX2Zvcm1Jbml0RXZlbnQuZW1pdChBamZGb3JtSW5pdFN0YXR1cy5Db21wbGV0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VkLm5leHQoKTtcbiAgICAgIH0pO1xuICAgIHJldHVybiBmb3JtR3JvdXA7XG4gIH1cblxuICBwcml2YXRlIF9zaG93U3VidHJlZShcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgYnJhbmNoPzogbnVtYmVyLFxuICApIHtcbiAgICB0aGlzLl91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShjb250ZXh0LCBub2Rlcywgbm9kZSwgdHJ1ZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVTdWJ0cmVlKFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBicmFuY2g/OiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBub2RlLCBmYWxzZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICB2aXNpYmxlOiBib29sZWFuLFxuICAgIGJyYW5jaD86IG51bWJlcixcbiAgKSB7XG4gICAgbGV0IHN1Yk5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXTtcbiAgICBjb25zdCBub2RlU3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG5vZGUpO1xuICAgIGlmIChicmFuY2ggIT0gbnVsbCkge1xuICAgICAgc3ViTm9kZXMgPSBub2Rlcy5maWx0ZXIobiA9PiB7XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IG5vZGVJbnN0YW5jZVN1ZmZpeChuKTtcbiAgICAgICAgcmV0dXJuIHN1ZmZpeCA9PSBub2RlU3VmZml4ICYmIG4ubm9kZS5wYXJlbnQgPT0gbm9kZS5ub2RlLmlkICYmIG4ubm9kZS5wYXJlbnROb2RlID09IGJyYW5jaDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWJOb2RlcyA9IG5vZGVzLmZpbHRlcihuID0+IHtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG4pO1xuICAgICAgICByZXR1cm4gc3VmZml4ID09IG5vZGVTdWZmaXggJiYgbi5ub2RlLnBhcmVudCA9PSBub2RlLm5vZGUuaWQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgaXNDb250YWluZXIgPSBpc0NvbnRhaW5lck5vZGUobm9kZS5ub2RlKTtcbiAgICBzdWJOb2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAhaXNDb250YWluZXIgfHxcbiAgICAgICAgKGlzQ29udGFpbmVyICYmICg8QWpmTm9kZUdyb3VwPm5vZGUubm9kZSkubm9kZXMuZmluZChjbiA9PiBjbi5pZCA9PSBuLm5vZGUuaWQpID09IG51bGwpXG4gICAgICApIHtcbiAgICAgICAgdXBkYXRlVmlzaWJpbGl0eShuLCBjb250ZXh0LCB2aXNpYmxlKTtcbiAgICAgICAgaWYgKGlzRmllbGRJbnN0YW5jZShuKSkge1xuICAgICAgICAgIHVwZGF0ZUZvcm11bGEobiwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoY29udGV4dCwgbm9kZXMsIG4sIHZpc2libGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgc3RyZWFtIGZvciB0aGUgZm9ybSBmbGF0IG5vZGVzLlxuICAgKiBTdHJlYW0gc3RhcnRzIHdoZW4gX2luaXRGb3JtU3RyZWFtcyBzZXQgdGhlIF9ub2Rlc1VwZGF0ZXNcbiAgICovXG4gIHByaXZhdGUgX2luaXROb2Rlc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fbm9kZXMgPSB0aGlzLl9ub2Rlc1VwZGF0ZXMucGlwZShcbiAgICAgIHNjYW4oKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSwgb3A6IEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChub2Rlcyk7XG4gICAgICB9LCBbXSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fZmxhdE5vZGVzVHJlZSA9IHRoaXMuX25vZGVzLnBpcGUoXG4gICAgICBtYXAobm9kZXMgPT4gZmxhdHRlbk5vZGVzSW5zdGFuY2VzVHJlZShub2RlcykpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX2ZsYXROb2RlcyA9IHRoaXMuX2ZsYXROb2Rlc1RyZWUucGlwZShcbiAgICAgIG1hcChzbGlkZXMgPT4ge1xuICAgICAgICBsZXQgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgIG5vZGVzLnB1c2gocyk7XG4gICAgICAgICAgbm9kZXMgPSBub2Rlcy5jb25jYXQocy5mbGF0Tm9kZXMpO1xuICAgICAgICAgIHVwZGF0ZVNsaWRlVmFsaWRpdHkocyk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICB9KSxcbiAgICAgIHRhcChfID0+IHtcbiAgICAgICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICAgIGNvbnN0IGluaXRpYWxpemVkRmllbGQgPSAnJG5vZGVzSW5pdGlhbGlzZWQnO1xuICAgICAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgIWZvcm1Hcm91cC5jb250YWlucyhpbml0aWFsaXplZEZpZWxkKSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKCk7XG4gICAgICAgICAgY29udHJvbC5zZXRWYWx1ZSh0cnVlKTtcbiAgICAgICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKGluaXRpYWxpemVkRmllbGQsIGNvbnRyb2wpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgcmVwZWF0ZWQgbm9kZSBpbnN0YW5jZSBmcm9tIHRoZSBmb3JtLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCByZW1vdmVzIHRoZSBub2RlIGluc3RhbmNlIGF0IHRoZSBzcGVjaWZpZWQgcmVwZXRpdGlvbiBpbmRleC5cbiAgICogSWYgdGhlIHJlbW92ZWQgaW5zdGFuY2UgaXMgbm90IHRoZSBsYXN0IG9uZSwgaXQgc2hpZnRzIGFsbCBzdWJzZXF1ZW50XG4gICAqIGluc3RhbmNlcyB1cCBieSBvbmUgcG9zaXRpb24gdG8ga2VlcCB0aGUgc2VxdWVuY2UgY29udGlndW91cywgYW5kIHRoZW5cbiAgICogY2xlYXJzIHRoZSBmaW5hbCAobm93IGR1cGxpY2F0ZWQpIGluc3RhbmNlLlxuICAgKlxuICAgKiBJdCBhbHNvIHVwZGF0ZXMgYWxsIGludGVybmFsIHRyYWNraW5nIG1hcHMgKHZpc2liaWxpdHksIHZhbGlkYXRpb24sIGZvcm11bGFzLFxuICAgKiB3YXJuaW5ncywgY29uZGl0aW9ucywgZXRjLikgdG8gcmVtb3ZlIHJlZmVyZW5jZXMgdG8gdGhlIGRlbGV0ZWQgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIG5vZGVJbnN0YW5jZSBUaGUgbm9kZSBpbnN0YW5jZSB0byByZW1vdmUgKGFsd2F5cyBjb3JyZXNwb25kcyB0byB0aGUgbGFzdCByZXBldGl0aW9uIGluZGV4KS5cbiAgICogQHBhcmFtIGlkeFRvUmVtb3ZlIFRoZSBpbmRleCBvZiB0aGUgcmVwZWF0ZWQgaW5zdGFuY2UgdG8gZGVsZXRlLlxuICAgKiBAcmV0dXJucyBUaGUgcmVtb3ZlZCBub2RlIGluc3RhbmNlLlxuICAgKi9cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBpZHhUb1JlbW92ZTogbnVtYmVyKTogQWpmTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpO1xuICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgaWYgKGZnICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGN1clZhbHVlID0gZmcudmFsdWU7XG5cbiAgICAgIGNvbnN0IG1heElkeCA9IG5vZGVJbnN0YW5jZS5wcmVmaXggPyBub2RlSW5zdGFuY2UucHJlZml4WzBdIDogMzA7XG4gICAgICBsZXQgbmV3Rm9ybVZhbHVlID0gey4uLmN1clZhbHVlfTtcbiAgICAgIGNvbnN0IGJhc2VOb2RlTmFtZSA9IG5vZGVJbnN0YW5jZS5ub2RlLm5hbWU7XG4gICAgICBmb3IgKGxldCBpID0gaWR4VG9SZW1vdmU7IGkgPCBtYXhJZHg7IGkrKykge1xuICAgICAgICBjb25zdCBjdXJySW5zdGFuY2VDb21wbGV0ZU5hbWUgPSBgJHtiYXNlTm9kZU5hbWV9X18ke2l9YDtcbiAgICAgICAgY29uc3QgbmV4dEluc3RhbmNlQ29tcGxldGVOYW1lID0gYCR7YmFzZU5vZGVOYW1lfV9fJHtpICsgMX1gO1xuICAgICAgICBuZXdGb3JtVmFsdWVbY3Vyckluc3RhbmNlQ29tcGxldGVOYW1lXSA9IG5ld0Zvcm1WYWx1ZVtuZXh0SW5zdGFuY2VDb21wbGV0ZU5hbWVdO1xuICAgICAgfVxuXG4gICAgICBuZXdGb3JtVmFsdWUgPSB7Li4ubmV3Rm9ybVZhbHVlLCBbbm9kZU5hbWVdOiB1bmRlZmluZWR9O1xuICAgICAgZmcucGF0Y2hWYWx1ZShuZXdGb3JtVmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1Zpc2liaWxpdHlNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNSZXBldGl0aW9uTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNGb3JtdWxhTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzVmFsaWRhdGlvbk1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1dhcm5pbmdNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgaWYgKGlzU2xpZGVzSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlTm9kZXNFZGl0YWJpbGl0eU1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICAgIHJldHVybiB0aGlzLl9yZW1vdmVTbGlkZUluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVOb2RlR3JvdXBJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZUluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlU2xpZGVJbnN0YW5jZShzbGlkZUluc3RhbmNlOiBBamZCYXNlU2xpZGVJbnN0YW5jZSk6IEFqZkJhc2VTbGlkZUluc3RhbmNlIHtcbiAgICBjb25zdCBzbGlkZSA9IHNsaWRlSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAoc2xpZGUudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKHNsaWRlSW5zdGFuY2UsIHNsaWRlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgc2xpZGVJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKHNsaWRlSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNsaWRlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2RlR3JvdXBJbnN0YW5jZShcbiAgICBub2RlR3JvdXBJbnN0YW5jZTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlLFxuICApOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uge1xuICAgIGNvbnN0IG5vZGVHcm91cCA9IG5vZGVHcm91cEluc3RhbmNlLm5vZGU7XG4gICAgaWYgKG5vZGVHcm91cC52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIGlmIChub2RlR3JvdXBJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsICYmIG5vZGVHcm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgfVxuICAgIHJldHVybiBub2RlR3JvdXBJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZpZWxkSW5zdGFuY2UoZmllbGRJbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSk6IEFqZkZpZWxkSW5zdGFuY2Uge1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGNvbnN0IGZpZWxkSW5zdGFuY2VOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGZpZWxkSW5zdGFuY2UpO1xuICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCAmJiBmb3JtR3JvdXAuY29udGFpbnMoZmllbGRJbnN0YW5jZU5hbWUpKSB7XG4gICAgICBmb3JtR3JvdXAucmVtb3ZlQ29udHJvbChmaWVsZEluc3RhbmNlTmFtZSk7XG4gICAgfVxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcy5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgaWYgKHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICBkZWxldGUgdm1hcFtmaWVsZEluc3RhbmNlTmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5yZWFkb25seSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNFZGl0YWJpbGl0eU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLnJlYWRvbmx5LmNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGZpZWxkSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UuZm9ybXVsYSkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzRm9ybXVsYU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmZvcm11bGEuZm9ybXVsYSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogY2hlY2sgdGhpcywgcHJvYmFibHkgaXMgbmV2ZXIgdmVyaWZpZWRcbiAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UoZmllbGRJbnN0YW5jZSkpIHtcbiAgICAgIGlmIChmaWVsZEluc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzUmVwZXRpdGlvbk1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCAmJiBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1ZhbGlkYXRpb25NYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2Uud2FybmluZy5jb25kaXRpb25zLmZvckVhY2goY29uZGl0aW9uID0+IHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzV2FybmluZ01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKFxuICAgICAgICBmaWVsZEluc3RhbmNlLFxuICAgICAgICBmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbi5jb25kaXRpb24sXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShmaWVsZEluc3RhbmNlKSkge1xuICAgICAgaWYgKGZpZWxkSW5zdGFuY2UuY2hvaWNlc0ZpbHRlciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmNob2ljZXNGaWx0ZXIuZm9ybXVsYSk7XG4gICAgICAgIGlmIChmaWVsZEluc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICBmaWVsZEluc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zLmZvckVhY2goY29uZGl0aW9uID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGROb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UpOiBBamZOb2RlSW5zdGFuY2Uge1xuICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkTm9kZUdyb3VwSW5zdGFuY2Uobm9kZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hZGRGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGVJbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgZmllbGQgaW5zdGFuY2UgYXMgY29udHJvbCBpbiBmb3JtR3JvdXBcbiAgICogQWRkIGZpZWxkIGluc3RhbmNlIGluIGFsbCB1cGRhdGUgbWFwcyAoTm9kZXNFZGl0YWJpbGl0eU1hcCwgTm9kZXNWaXNpYmlsaXR5TWFwLCAuLi4pXG4gICAqIEBwYXJhbSBmaWVsZEluc3RhbmNlXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwcml2YXRlIF9hZGRGaWVsZEluc3RhbmNlKGZpZWxkSW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBmaWVsZEluc3RhbmNlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZEluc3RhbmNlKTtcbiAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgIWZvcm1Hcm91cC5jb250YWlucyhmaWVsZEluc3RhbmNlTmFtZSkpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKCk7XG4gICAgICBjb250cm9sLnNldFZhbHVlKGZpZWxkSW5zdGFuY2UudmFsdWUpO1xuICAgICAgZm9ybUdyb3VwLnJlZ2lzdGVyQ29udHJvbChmaWVsZEluc3RhbmNlTmFtZSwgY29udHJvbCk7XG4gICAgfVxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcy5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgaWYgKHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXS5pbmRleE9mKGZpZWxkSW5zdGFuY2UpID09IC0xKSB7XG4gICAgICAgICAgdm1hcFtmaWVsZEluc3RhbmNlTmFtZV0ucHVzaChmaWVsZEluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5yZWFkb25seSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzRWRpdGFiaWxpdHlNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5yZWFkb25seS5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgZmllbGRJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UuZm9ybXVsYSkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0Zvcm11bGFNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhLmZvcm11bGEpO1xuICAgIH1cblxuICAgIGlmIChpc05vZGVHcm91cEluc3RhbmNlKGZpZWxkSW5zdGFuY2UpKSB7XG4gICAgICBpZiAoZmllbGRJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNSZXBldGl0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsICYmIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zLmZvckVhY2goY29uZGl0aW9uID0+IHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1ZhbGlkYXRpb25NYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2Uud2FybmluZy5jb25kaXRpb25zLmZvckVhY2goY29uZGl0aW9uID0+IHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1dhcm5pbmdNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAoXG4gICAgICAgIGZpZWxkSW5zdGFuY2UsXG4gICAgICAgIGZpZWxkSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uLmNvbmRpdGlvbixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKGZpZWxkSW5zdGFuY2UpKSB7XG4gICAgICBpZiAoZmllbGRJbnN0YW5jZS5jaG9pY2VzRmlsdGVyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmNob2ljZXNGaWx0ZXIuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgICBpZiAoZmllbGRJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgIGZpZWxkSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgICAgICB0aGlzLl9hZGRUb05vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWVsZEluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBzbGlkZSBpbnN0YW5jZSBpbiBhbGwgdXBkYXRlIG1hcHMgKE5vZGVzRWRpdGFiaWxpdHlNYXAsIE5vZGVzVmlzaWJpbGl0eU1hcCwgTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcClcbiAgICogQHBhcmFtIHNsaWRlSW5zdGFuY2VcbiAgICogQHJldHVybnNcbiAgICovXG4gIHByaXZhdGUgX2FkZFNsaWRlSW5zdGFuY2Uoc2xpZGVJbnN0YW5jZTogQWpmU2xpZGVJbnN0YW5jZSk6IEFqZlNsaWRlSW5zdGFuY2Uge1xuICAgIGNvbnN0IHNsaWRlID0gc2xpZGVJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChzbGlkZS5yZWFkb25seSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzRWRpdGFiaWxpdHlNYXAoc2xpZGVJbnN0YW5jZSwgc2xpZGUucmVhZG9ubHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgaWYgKHNsaWRlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAoc2xpZGVJbnN0YW5jZSwgc2xpZGUudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBzbGlkZUluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKHNsaWRlSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNsaWRlSW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHJlcGVhdGluZyBzbGlkZSBpbnN0YW5jZSBpbiBhbGwgdXBkYXRlIG1hcHNcbiAgICogQHBhcmFtIG5vZGVHcm91cEluc3RhbmNlXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwcml2YXRlIF9hZGROb2RlR3JvdXBJbnN0YW5jZShcbiAgICBub2RlR3JvdXBJbnN0YW5jZTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlLFxuICApOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uge1xuICAgIGNvbnN0IG5vZGVHcm91cCA9IG5vZGVHcm91cEluc3RhbmNlLm5vZGU7XG4gICAgaWYgKG5vZGVHcm91cC52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBub2RlR3JvdXBJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChub2RlR3JvdXBJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICBpZiAobm9kZUdyb3VwSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgaWYgKG5vZGVHcm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgIGxldCBub2RlR3JvdXBJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUdyb3VwSW5zdGFuY2UpO1xuICAgICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmICFmb3JtR3JvdXAuY29udGFpbnMobm9kZUdyb3VwSW5zdGFuY2VOYW1lKSkge1xuICAgICAgICBjb25zdCBjb250cm9sID0gbmV3IFVudHlwZWRGb3JtQ29udHJvbCgpO1xuICAgICAgICBjb250cm9sLnNldFZhbHVlKG5vZGVHcm91cEluc3RhbmNlLnJlcHMpO1xuICAgICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKG5vZGVHcm91cEluc3RhbmNlTmFtZSwgY29udHJvbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlR3JvdXBJbnN0YW5jZTtcbiAgfVxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0VkaXRhYmlsaXR5TWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fZWRpdGFiaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1Zpc2liaWxpdHlNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1JlcGV0aXRpb25NYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzRm9ybXVsYU1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzVmFsaWRhdGlvbk1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzV2FybmluZ01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzTWFwSW5kZXgobm9kZXNNYXA6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+LCBpbmRleDogc3RyaW5nKSB7XG4gICAgbm9kZXNNYXAubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICBpZiAoT2JqZWN0LmtleXModm1hcCkuaW5kZXhPZihpbmRleCkgPiAtMSkge1xuICAgICAgICBkZWxldGUgdm1hcFtpbmRleF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdm1hcDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0VkaXRhYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZWRpdGFiaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoXG4gICAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgZm9ybXVsYTogc3RyaW5nLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNGb3JtdWxhTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1ZhbGlkYXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzV2FybmluZ01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChcbiAgICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBmb3JtdWxhOiBzdHJpbmcsXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKFxuICAgIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGZvcm11bGE6IHN0cmluZyxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNNYXAoXG4gICAgbm9kZXNNYXA6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+LFxuICAgIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGZvcm11bGE6IHN0cmluZyxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgbmFtZXMgPSBnZXRBcmd1bWVudE5hbWVzKGZvcm11bGEpO1xuICAgIG5hbWVzLmRlbGV0ZSgnJHZhbHVlJyk7XG4gICAgaWYgKG5hbWVzLnNpemUgPiAwKSB7XG4gICAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIG5hbWVzKSB7XG4gICAgICAgICAgaWYgKHZtYXBbbmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gdm1hcFtuYW1lXS5pbmRleE9mKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICAgICAgdm1hcFtuYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgaWYgKHZtYXBbbmFtZV0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdm1hcFtuYW1lXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNFZGl0YWJpbGl0eU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9lZGl0YWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0Zvcm11bGFNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNWYWxpZGF0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzV2FybmluZ01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc01hcChcbiAgICBub2Rlc01hcDogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4sXG4gICAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgZm9ybXVsYTogc3RyaW5nLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBuYW1lcyA9IGdldEFyZ3VtZW50TmFtZXMoZm9ybXVsYSk7XG4gICAgbmFtZXMuZGVsZXRlKCckdmFsdWUnKTtcbiAgICBpZiAobmFtZXMuc2l6ZSA+IDApIHtcbiAgICAgIG5vZGVzTWFwLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAgICAgICBpZiAodm1hcFtuYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgICB2bWFwW25hbWVdID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2bWFwW25hbWVdLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHZtYXBbbmFtZV0ucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFVwZGF0ZSBlZGl0YWJpbGl0eSBmb3IgYSBzbGlkZSBvciBhIGZpZWxkIGlmIGVkaXRhYmlsaXR5IGlzIGNoYW5nZWQuXG4gKiBAcGFyYW0gbm9kZUluc3RhbmNlXG4gKiBAcGFyYW0gZm9ybUdyb3VwXG4gKiBAcGFyYW0gbmV3Rm9ybVZhbHVlXG4gKi9cbmNvbnN0IHVwZGF0ZUVkaXRhYmlsaXR5TWFwRW50cnkgPSAoXG4gIG5vZGVJbnN0YW5jZTogQWpmU2xpZGVJbnN0YW5jZSB8IEFqZkZpZWxkSW5zdGFuY2UsXG4gIGZvcm1Hcm91cDogQmVoYXZpb3JTdWJqZWN0PFVudHlwZWRGb3JtR3JvdXAgfCBudWxsPixcbiAgbmV3Rm9ybVZhbHVlOiBhbnksXG4pID0+IHtcbiAgdXBkYXRlRWRpdGFiaWxpdHkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xufTtcblxuLyoqXG4gKiBVcGRhdGUgdmlzaWJpbGl0eSBmb3IgYSBzbGlkZSBvciBhIGZpZWxkIGlmIHZpc2liaWxpdHkgaXMgY2hhbmdlZC5cbiAqIFNldCB2YWx1ZSB0byBudWxsIGZvciBub24tdmlzaWJsZSBmaWVsZFxuICogUmUtc2V0IGRlZmF1bHQgdmFsdWUgZm9yIGZpZWxkcyBvciBmb3IgY2hpbGQgZmllbGRzIGZvciBhIGNvbnRhaW5lciBub2RlXG4gKiBAcGFyYW0gbm9kZUluc3RhbmNlXG4gKiBAcGFyYW0gZm9ybUdyb3VwXG4gKiBAcGFyYW0gbmV3Rm9ybVZhbHVlXG4gKi9cbmNvbnN0IHVwZGF0ZVZpc2liaWxpdHlNYXBFbnRyeSA9IChcbiAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gIGZvcm1Hcm91cDogQmVoYXZpb3JTdWJqZWN0PFVudHlwZWRGb3JtR3JvdXAgfCBudWxsPixcbiAgbmV3Rm9ybVZhbHVlOiBhbnksXG4pID0+IHtcbiAgY29uc3QgY29tcGxldGVOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSk7XG4gIGNvbnN0IHZpc2liaWxpdHlDaGFuZ2VkID0gdXBkYXRlVmlzaWJpbGl0eShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gIGNvbnN0IGlzRmllbGQgPSBpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKTtcbiAgaWYgKHZpc2liaWxpdHlDaGFuZ2VkICYmIGlzTm9kZUdyb3VwSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgIHByb3BhZ2F0ZVZpc2liaWxpdHkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUsIG5vZGVJbnN0YW5jZS52aXNpYmxlKTtcbiAgfVxuICBpZiAodmlzaWJpbGl0eUNoYW5nZWQgJiYgIW5vZGVJbnN0YW5jZS52aXNpYmxlKSB7XG4gICAgY29uc3QgZmcgPSBmb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBpZiAoZmcgIT0gbnVsbCkge1xuICAgICAgY29uc3QgcyA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHMgJiYgIXMuY2xvc2VkKSB7XG4gICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmZy5jb250cm9scyAhPSBudWxsICYmIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoaXNGaWVsZCkge1xuICAgICAgbm9kZUluc3RhbmNlLnZhbHVlID0gbnVsbDtcbiAgICB9XG4gIH0gZWxzZSBpZiAodmlzaWJpbGl0eUNoYW5nZWQgJiYgbm9kZUluc3RhbmNlLnZpc2libGUpIHtcbiAgICBjb25zdCBmZyA9IGZvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGlmIChpc0ZpZWxkKSB7XG4gICAgICBjb25zdCByZXMgPSB1cGRhdGVGb3JtdWxhKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlLCB0cnVlKTtcbiAgICAgIGlmIChmZyAhPSBudWxsICYmIHJlcy5jaGFuZ2VkICYmIGZnLmNvbnRyb2xzICE9IG51bGwgJiYgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXSAhPSBudWxsKSB7XG4gICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUocmVzLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzQ29udGFpbmVyTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIG5vZGVJbnN0YW5jZS5ub2Rlcz8uZm9yRWFjaChuID0+IHtcbiAgICAgICAgaWYgKGlzRmllbGRJbnN0YW5jZShuKSkge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIG4ubm9kZS5kZWZhdWx0VmFsdWUgIT0gbnVsbCAmJlxuICAgICAgICAgICAgZmcgIT0gbnVsbCAmJlxuICAgICAgICAgICAgZmcuY29udHJvbHMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgZmcuY29udHJvbHNbbi5ub2RlLm5hbWVdICE9IG51bGxcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGxldCBzdWJGaWVsZFZpc2liaWxpdHk6IGJvb2xlYW4gPSBuLnZpc2libGUgPyBuLnZpc2libGUgOiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzdWJGaWVsZFZpc2liaWxpdHkpIHtcbiAgICAgICAgICAgICAgbGV0IHN1YkZpZWxkRGVmYXVsdFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgaWYgKG4ubm9kZS5kZWZhdWx0VmFsdWUuZm9ybXVsYSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgc3ViRmllbGREZWZhdWx0VmFsdWUgPSBldmFsdWF0ZUV4cHJlc3Npb24oXG4gICAgICAgICAgICAgICAgICBuLm5vZGUuZGVmYXVsdFZhbHVlLmZvcm11bGEsXG4gICAgICAgICAgICAgICAgICBuZXdGb3JtVmFsdWUsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWJGaWVsZERlZmF1bHRWYWx1ZSA9IG4ubm9kZS5kZWZhdWx0VmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZmcuY29udHJvbHNbbi5ub2RlLm5hbWVdLnNldFZhbHVlKHN1YkZpZWxkRGVmYXVsdFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgY29uc3QgczIgPSB0aW1lcigyMDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKHMyICYmICFzMi5jbG9zZWQpIHtcbiAgICAgICAgICAgIHMyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGZnICE9IG51bGwgJiZcbiAgICAgICAgICAgIGZnLmNvbnRyb2xzICE9IG51bGwgJiZcbiAgICAgICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0gIT0gbnVsbCAmJlxuICAgICAgICAgICAgaXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShub2RlSW5zdGFuY2UucmVwcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogUHVzaCBhIGNvbnRhaW5lcidzIHZpc2liaWxpdHkgZG93biB0byB0aGUgZmllbGRzIGl0IGhvbGRzLlxuICpcbiAqIEEgbm9kZSBncm91cCBpcyBhIGJyYWNrZXQ6IHRoZSByZW5kZXJlciBsYXlzIG91dCB0aGUgZmllbGRzIGluc2lkZSBpdCwgbmV2ZXJcbiAqIHRoZSBncm91cCBpdHNlbGYsIHNvIGEgZ3JvdXAgd2hvc2UgY29uZGl0aW9uIHR1cm5zIGZhbHNlIGNoYW5nZXMgbm90aGluZyBvblxuICogc2NyZWVuIHVubGVzcyBpdHMgY2hpbGRyZW4gYXJlIHRvbGQuIEVhY2ggZGVzY2VuZGFudCByZS1ldmFsdWF0ZXMgaXRzIG93blxuICogY29uZGl0aW9uIGFnYWluc3QgdGhlIGJyYW5jaCBmbGFnIC0tIHRoZSBzYW1lIGNhbGwgYF9pbml0Tm9kZUluc3RhbmNlYCBtYWtlc1xuICogd2hlbiB0aGUgdHJlZSBpcyBidWlsdCAtLSBzbyBhIGZpZWxkIHRoYXQgaGlkZXMgaXRzZWxmIGZvciBpdHMgb3duIHJlYXNvbnNcbiAqIHN0YXlzIGhpZGRlbiB3aGVuIHRoZSBncm91cCBjb21lcyBiYWNrIGludG8gdmlldy5cbiAqL1xuY29uc3QgcHJvcGFnYXRlVmlzaWJpbGl0eSA9IChcbiAgY29udGFpbmVyOiBBamZOb2RlR3JvdXBJbnN0YW5jZSxcbiAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgYnJhbmNoVmlzaWJpbGl0eTogYm9vbGVhbixcbik6IHZvaWQgPT4ge1xuICAoY29udGFpbmVyLm5vZGVzIHx8IFtdKS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgIHVwZGF0ZVZpc2liaWxpdHkobm9kZSwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gICAgLy8gVGhlIG5vZGVzIHJlYWNoZWQgdGhpcyB3YXkgYXJlIG5vdCBpbiB0aGUgY2FsbGVyJ3MgYHVwZGF0ZWROb2Rlc2AgbGlzdCwgc29cbiAgICAvLyB0aGUgY29tcG9uZW50cyBib3VuZCB0byB0aGVtIGhhdmUgdG8gYmUgd29rZW4gdXAgaGVyZS5cbiAgICBub2RlLnVwZGF0ZWRFdnQuZW1pdCgpO1xuICAgIGlmIChpc05vZGVHcm91cEluc3RhbmNlKG5vZGUpKSB7XG4gICAgICBwcm9wYWdhdGVWaXNpYmlsaXR5KG5vZGUsIGNvbnRleHQsIG5vZGUudmlzaWJsZSk7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IHVwZGF0ZVJlcGV0aXRpb25NYXBFbnRyeSA9IChcbiAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gIG5ld0Zvcm1WYWx1ZTogYW55LFxuICBub2RlczogQWpmTm9kZUluc3RhbmNlW10sXG4gIGNiOiAoXG4gICAgYWxsTm9kZXM6IEFqZk5vZGVbXSB8IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIGluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UsXG4gICAgb2xkUmVwczogbnVtYmVyLFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICkgPT4ge2FkZGVkOiBBamZOb2RlSW5zdGFuY2VbXSB8IG51bGw7IHJlbW92ZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbH0sXG4pID0+IHtcbiAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICBjb25zdCBvbGRSZXBzID0gdXBkYXRlUmVwc051bShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgaWYgKG9sZFJlcHMgIT09IG5vZGVJbnN0YW5jZS5yZXBzKSB7XG4gICAgICBjYihub2Rlcywgbm9kZUluc3RhbmNlLCBvbGRSZXBzLCBuZXdGb3JtVmFsdWUpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlc01hcEVudHJ5ID0gKFxuICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgbmV3Rm9ybVZhbHVlOiBhbnksXG4gIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgc2hvd0NiOiAoXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICBub2RlczogQWpmTm9kZUluc3RhbmNlW10sXG4gICAgbm9kZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGJyYW5jaD86IG51bWJlcixcbiAgKSA9PiB2b2lkLFxuICBoaWRlQ2I6IChcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgYnJhbmNoPzogbnVtYmVyLFxuICApID0+IHZvaWQsXG4pID0+IHtcbiAgLy8gY29uc3QgYnJhbmNoQ2hhbmdlZCA9XG4gIC8vIG5vZGVJbnN0YW5jZS51cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKG5ld0Zvcm1WYWx1ZSk7XG4gIHVwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXMobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAvLyBpZiAoYnJhbmNoQ2hhbmdlZCkge1xuICBjb25zdCB2ZXJpZmllZEJyYW5jaCA9IG5vZGVJbnN0YW5jZS52ZXJpZmllZEJyYW5jaDtcbiAgbm9kZUluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoX2NvbmRpdGlvbiwgaWR4KSA9PiB7XG4gICAgaWYgKGlkeCA9PSB2ZXJpZmllZEJyYW5jaCkge1xuICAgICAgc2hvd0NiKG5ld0Zvcm1WYWx1ZSwgbm9kZXMsIG5vZGVJbnN0YW5jZSwgaWR4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUNiKG5ld0Zvcm1WYWx1ZSwgbm9kZXMsIG5vZGVJbnN0YW5jZSwgaWR4KTtcbiAgICB9XG4gIH0pO1xuICAvLyB9XG59O1xuXG5jb25zdCB1cGRhdGVGb3JtdWxhTWFwRW50cnkgPSAoXG4gIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICBuZXdGb3JtVmFsdWU6IGFueSxcbiAgZm9ybUdyb3VwOiBCZWhhdmlvclN1YmplY3Q8VW50eXBlZEZvcm1Hcm91cCB8IG51bGw+LFxuKSA9PiB7XG4gIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQpIHtcbiAgICAgIHVwZGF0ZVZhbGlkYXRpb24obm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgZmcuY29udHJvbHNbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSldLnNldFZhbHVlKHJlcy52YWx1ZSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1cGRhdGVWYWxpZGF0aW9uTWFwRW50cnkgPSAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZTogYW55LCBzdXBwOiBhbnkpID0+IHtcbiAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgbmV3Rm9ybVZhbHVlLiR2YWx1ZSA9IG5ld0Zvcm1WYWx1ZVtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKV07XG4gICAgdXBkYXRlVmFsaWRhdGlvbihub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSwgc3VwcCk7XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZVdhcm5pbmdNYXBFbnRyeSA9IChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlOiBhbnkpID0+IHtcbiAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgdXBkYXRlV2FybmluZyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgaWYgKFxuICAgICAgbm9kZUluc3RhbmNlLndhcm5pbmdSZXN1bHRzICE9IG51bGwgJiZcbiAgICAgIG5vZGVJbnN0YW5jZS53YXJuaW5nUmVzdWx0cy5maWx0ZXIod2FybmluZyA9PiB3YXJuaW5nLnJlc3VsdCkubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgbm9kZUluc3RhbmNlLndhcm5pbmdUcmlnZ2VyLmVtaXQoKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZUZpbHRlcmVkQ2hvaWNlc01hcEVudHJ5ID0gKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWU6IGFueSkgPT4ge1xuICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgIHVwZGF0ZUZpbHRlcmVkQ2hvaWNlcyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gIH1cbn07XG4iXX0=