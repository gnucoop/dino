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
                slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Zvcm0tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUEyQixrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWhHLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFrQixrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUNMLGVBQWUsRUFDZixJQUFJLEVBQ0osVUFBVSxFQUNWLEVBQUUsSUFBSSxLQUFLLEVBQ1gsT0FBTyxFQUVQLFlBQVksRUFDWixLQUFLLEdBQ04sTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQ0wsTUFBTSxFQUNOLEdBQUcsRUFDSCxRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULEdBQUcsRUFDSCxjQUFjLEdBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQUl4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFRM0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBT3hELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHlEQUF5RCxDQUFDO0FBQ25HLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RGLE9BQU8s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WUFBaUIsRUFBRSxJQUFTLEVBQUUsRUFBRTtJQUMvRixJQUFJLGVBQWUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1FBQ2xDLFlBQVksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLHdCQUF3QixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDM0UsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLFlBQTZCLEVBQUUsWUFBaUIsRUFBRSxFQUFFO0lBQ2pGLElBQUksZUFBZSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7UUFDbEMsYUFBYSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMxQyxJQUNFLFlBQVksQ0FBQyxjQUFjLElBQUksSUFBSTtZQUNuQyxZQUFZLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUN4RSxDQUFDO1lBQ0QsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sNkJBQTZCLEdBQUcsQ0FBQyxZQUE2QixFQUFFLFlBQWlCLEVBQUUsRUFBRTtJQUN6RixJQUFJLDBCQUEwQixDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7UUFDN0MscUJBQXFCLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQ3BELENBQUM7QUFDSCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBBamZDb250ZXh0LCBldmFsdWF0ZUV4cHJlc3Npb24sIGdldEFyZ3VtZW50TmFtZXN9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtUcmFuc2xvY29TZXJ2aWNlfSBmcm9tICdAYWpmL2NvcmUvdHJhbnNsb2NvJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIFVudHlwZWRGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtmb3JtYXR9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgZnJvbSxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YgYXMgb2JzT2YsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmliZXIsXG4gIFN1YnNjcmlwdGlvbixcbiAgdGltZXIsXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHBhaXJ3aXNlLFxuICBzY2FuLFxuICBzaGFyZSxcbiAgc3RhcnRXaXRoLFxuICBzd2l0Y2hNYXAsXG4gIHRhcCxcbiAgd2l0aExhdGVzdEZyb20sXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZDaG9pY2V9IGZyb20gJy4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlJztcbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7QWpmVGFibGVGb3JtQ29udHJvbH0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvdGFibGUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGV9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXB9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzL25vZGUtZ3JvdXAnO1xuaW1wb3J0IHtBamZOb2RlVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb259IGZyb20gJy4vaW50ZXJmYWNlL29wZXJhdGlvbnMvbm9kZXMtaW5zdGFuY2VzLW9wZXJhdGlvbic7XG5pbXBvcnQge0FqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9ufSBmcm9tICcuL2ludGVyZmFjZS9vcGVyYXRpb25zL3JlbmRlcmVyLXVwZGF0ZS1tYXAtb3BlcmF0aW9uJztcbmltcG9ydCB7QWpmUmVuZGVyZXJVcGRhdGVNYXB9IGZyb20gJy4vaW50ZXJmYWNlL3JlbmRlcmVyLW1hcHMvdXBkYXRlLW1hcCc7XG5pbXBvcnQge0FqZkJhc2VTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL2Jhc2Utc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpbml0Q2hvaWNlc09yaWdpbn0gZnJvbSAnLi91dGlscy9jaG9pY2VzL2luaXQtY2hvaWNlcy1vcmlnaW4nO1xuaW1wb3J0IHtpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge2lzVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvaXMtdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHt1cGRhdGVGaWVsZEluc3RhbmNlU3RhdGV9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmllbGQtaW5zdGFuY2Utc3RhdGUnO1xuaW1wb3J0IHt1cGRhdGVGaWx0ZXJlZENob2ljZXN9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmlsdGVyZWQtY2hvaWNlcyc7XG5pbXBvcnQge3VwZGF0ZUZvcm11bGF9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZm9ybXVsYSc7XG5pbXBvcnQge3VwZGF0ZU5leHRTbGlkZUNvbmRpdGlvbn0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1uZXh0LXNsaWRlLWNvbmRpdGlvbic7XG5pbXBvcnQge3VwZGF0ZVRyaWdnZXJDb25kaXRpb25zfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLXRyaWdnZXItY29uZGl0aW9ucyc7XG5pbXBvcnQge3VwZGF0ZVZhbGlkYXRpb259IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtdmFsaWRhdGlvbic7XG5pbXBvcnQge3VwZGF0ZVdhcm5pbmd9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtd2FybmluZyc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy9jcmVhdGUtZmllbGQnO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXNJbnN0YW5jZXN9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2ZsYXR0ZW4tbm9kZXMtaW5zdGFuY2VzJztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzSW5zdGFuY2VzVHJlZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMtdHJlZSc7XG5pbXBvcnQge2lzRmllbGRJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc05vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXJlcGVhdGluZy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge2lzUmVwZWF0aW5nR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtcmVwZWF0aW5nLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7aXNTbGlkZXNJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtc2xpZGVzLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VTdWZmaXh9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2Utc3VmZml4JztcbmltcG9ydCB7bm9kZVRvTm9kZUluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLXRvLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHt1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtY29uZGl0aW9uYWwtYnJhbmNoZXMnO1xuaW1wb3J0IHt1cGRhdGVFZGl0YWJpbGl0eX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvdXBkYXRlLWVkaXRhYmlsaXR5JztcbmltcG9ydCB7dXBkYXRlVmlzaWJpbGl0eX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvdXBkYXRlLXZpc2liaWxpdHknO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXN9IGZyb20gJy4vdXRpbHMvbm9kZXMvZmxhdHRlbi1ub2Rlcyc7XG5pbXBvcnQge2lzQ29udGFpbmVyTm9kZX0gZnJvbSAnLi91dGlscy9ub2Rlcy9pcy1jb250YWluZXItbm9kZSc7XG5pbXBvcnQge29yZGVyZWROb2Rlc30gZnJvbSAnLi91dGlscy9ub2Rlcy9vcmRlcmVkLW5vZGVzJztcbmltcG9ydCB7dXBkYXRlUmVwc051bX0gZnJvbSAnLi91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3VwZGF0ZS1yZXBzLW51bSc7XG5pbXBvcnQge3ZhbGlkU2xpZGV9IGZyb20gJy4vdXRpbHMvc2xpZGVzLWluc3RhbmNlcy92YWxpZC1zbGlkZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICcuL3ZhbGlkYXRpb24tc2VydmljZSc7XG5pbXBvcnQge2lzQ29udGFpbmVyTm9kZUluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5cbmV4cG9ydCBjb25zdCBlbnVtIEFqZkZvcm1Jbml0U3RhdHVzIHtcbiAgSW5pdGlhbGl6aW5nLFxuICBDb21wbGV0ZSxcbn1cblxuLyoqXG4gKiBVcGRhdGUgU2xpZGUgVmFsaWRpdHkgYWNjb3JkaW5nIHRvIHRoZSB2YWxpZGl0eSBvZiBpdHMgZmllbGQgbm9kZXNcbiAqIEBwYXJhbSBzbGlkZVxuICovXG5jb25zdCB1cGRhdGVTbGlkZVZhbGlkaXR5ID0gKHNsaWRlOiBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlIHwgQWpmU2xpZGVJbnN0YW5jZSkgPT4ge1xuICBjb25zdCBzdWJOb2Rlc051bSA9IHNsaWRlLmZsYXROb2Rlcy5sZW5ndGg7XG4gIGxldCB2YWxpZCA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViTm9kZXNOdW07IGkrKykge1xuICAgIGNvbnN0IHN1Yk5vZGUgPSBzbGlkZS5mbGF0Tm9kZXNbaV07XG4gICAgaWYgKHN1Yk5vZGUudmlzaWJsZSAmJiBpc0ZpZWxkSW5zdGFuY2Uoc3ViTm9kZSkgJiYgIXN1Yk5vZGUudmFsaWQpIHtcbiAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgaWYgKHNsaWRlLnZhbGlkICE9PSB2YWxpZCkge1xuICAgIHNsaWRlLnZhbGlkID0gdmFsaWQ7XG4gIH1cbn07XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfZWRpdGFiaWxpdHlOb2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9lZGl0YWJpbGl0eU5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3Zpc2liaWxpdHlOb2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfcmVwZXRpdGlvbk5vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfZm9ybXVsYU5vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF92YWxpZGF0aW9uTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3dhcm5pbmdOb2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF93YXJuaW5nTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfZm9ybUluaXRFdmVudDogRXZlbnRFbWl0dGVyPEFqZkZvcm1Jbml0U3RhdHVzPiA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUluaXRTdGF0dXM+KCk7XG4gIHJlYWRvbmx5IGZvcm1Jbml0RXZlbnQ6IE9ic2VydmFibGU8QWpmRm9ybUluaXRTdGF0dXM+ID0gdGhpc1xuICAgIC5fZm9ybUluaXRFdmVudCBhcyBPYnNlcnZhYmxlPEFqZkZvcm1Jbml0U3RhdHVzPjtcblxuICBwcml2YXRlIF9mb3JtR3JvdXA6IEJlaGF2aW9yU3ViamVjdDxVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8VW50eXBlZEZvcm1Hcm91cCB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSBmb3JtR3JvdXA6IE9ic2VydmFibGU8VW50eXBlZEZvcm1Hcm91cCB8IG51bGw+ID0gdGhpc1xuICAgIC5fZm9ybUdyb3VwIGFzIE9ic2VydmFibGU8VW50eXBlZEZvcm1Hcm91cCB8IG51bGw+O1xuXG4gIHByaXZhdGUgX2Zvcm06IEJlaGF2aW9yU3ViamVjdDx7XG4gICAgZm9ybTogQWpmRm9ybSB8IG51bGw7XG4gICAgY29udGV4dD86IEFqZkNvbnRleHQ7XG4gIH0gfCBudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8e1xuICAgIGZvcm06IEFqZkZvcm0gfCBudWxsO1xuICAgIGNvbnRleHQ/OiBBamZDb250ZXh0O1xuICB9IHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX25vZGVzITogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX2ZsYXROb2RlcyE6IE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlW10+O1xuXG4gIHByaXZhdGUgX2ZsYXROb2Rlc1RyZWUhOiBPYnNlcnZhYmxlPEFqZlNsaWRlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX25vZGVzVXBkYXRlczogU3ViamVjdDxBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9lcnJvclBvc2l0aW9ucyE6IE9ic2VydmFibGU8bnVtYmVyW10+O1xuICBwcml2YXRlIF9lcnJvcnMhOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgcHJpdmF0ZSBfZm9ybUdyb3VwU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfbm9kZXNNYXBzITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD5bXTtcblxuICBwcml2YXRlIF9uZXh0U2xpZGVUcmlnZ2VyOiBFdmVudEVtaXR0ZXI8QWpmTm9kZUluc3RhbmNlPiA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmTm9kZUluc3RhbmNlPigpO1xuICByZWFkb25seSBuZXh0U2xpZGVUcmlnZ2VyOiBPYnNlcnZhYmxlPEFqZk5vZGVJbnN0YW5jZT4gPSB0aGlzXG4gICAgLl9uZXh0U2xpZGVUcmlnZ2VyIGFzIE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlPjtcblxuICBwcml2YXRlIF9zbGlkZXNOdW06IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWFkb25seSBzbGlkZXNOdW06IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMuX3NsaWRlc051bSBhcyBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgZ2V0IG5vZGVzVHJlZSgpOiBPYnNlcnZhYmxlPEFqZlNsaWRlSW5zdGFuY2VbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mbGF0Tm9kZXNUcmVlO1xuICB9XG4gIGdldCBlcnJvclBvc2l0aW9ucygpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yUG9zaXRpb25zO1xuICB9XG4gIGdldCBlcnJvcnMoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JzO1xuICB9XG4gIGdldCBjdXJyZW50U3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucygpOiBhbnkge1xuICAgIGNvbnN0IGZvcm0gPSB0aGlzLl9mb3JtLmdldFZhbHVlKCk7XG4gICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmZvcm0gIT0gbnVsbCA/IGZvcm0uZm9ybS5zdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zIDogbnVsbDtcbiAgfVxuXG4gIGdldCBub2Rlc1Zpc2liaWxpdHkoKTogT2JzZXJ2YWJsZTx7bmFtZTogc3RyaW5nOyB0eXBlOiAnc2xpZGUnIHwgJ2ZpZWxkJzsgdmlzaWJsZTogYm9vbGVhbn1bXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgbWFwKG5vZGVzID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21hcE5vZGVzVmlzaWJpbGl0eShub2Rlcyk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXzogQWpmVmFsaWRhdGlvblNlcnZpY2UsIEBPcHRpb25hbCgpIHByaXZhdGUgX3RzOiBUcmFuc2xvY29TZXJ2aWNlIHwgbnVsbCA9IG51bGwpIHtcbiAgICAvLyBJbml0aWFsaXplIGFsbCBzdHJlYW1zIGZvciB0aGUgZm9ybVxuICAgIHRoaXMuX2luaXRVcGRhdGVNYXBTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdE5vZGVzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRFcnJvcnNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEZvcm1TdHJlYW1zKCk7XG4gICAgdGhpcy5fdXBkYXRlRm9ybVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3RyYW5zbGF0ZUNob2ljZXMoY2hvaWNlczogQWpmQ2hvaWNlPGFueT5bXSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl90cyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoY29uc3QgY2hvaWNlIG9mIGNob2ljZXMpIHtcbiAgICAgIGlmIChjaG9pY2UudHJhbnNsYXRlZExhYmVsID09IG51bGwpIHtcbiAgICAgICAgY2hvaWNlLnRyYW5zbGF0ZWRMYWJlbCA9IHRoaXMuX3RzLnRyYW5zbGF0ZShjaG9pY2UubGFiZWwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJdCdzIGNhbGxlZCBieSB0aGUgYXBwIHRvIHNldCBhIG5ldyBBamYgRm9ybSB3aXRoIGl0cyBjb250ZXh0XG4gICAqIEBwYXJhbSBmb3JtIHRoZSBBamYgRm9ybSBzY2hlbWFcbiAgICogQHBhcmFtIGNvbnRleHQgdGhlIGluaXRpYWwgY29udGV4dFxuICAgKi9cbiAgc2V0Rm9ybShmb3JtOiBBamZGb3JtIHwgbnVsbCwgY29udGV4dDogQWpmQ29udGV4dCA9IHt9KSB7XG4gICAgdGhpcy5faW5pdFVwZGF0ZU1hcFN0cmVhbXMoKTtcbiAgICBpZiAoXG4gICAgICBmb3JtICE9IG51bGwgJiZcbiAgICAgIE9iamVjdC5rZXlzKGNvbnRleHQpLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgT2JqZWN0LmtleXMoZm9ybS5pbml0Q29udGV4dCB8fCB7fSkubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgY29udGV4dCA9IGZvcm0uaW5pdENvbnRleHQgfHwge307XG4gICAgfVxuICAgIGNvbnN0IGN1cnJlbnRGb3JtID0gdGhpcy5fZm9ybS5nZXRWYWx1ZSgpO1xuICAgIGlmIChcbiAgICAgIChjdXJyZW50Rm9ybSA9PSBudWxsICYmIGZvcm0gIT0gbnVsbCkgfHxcbiAgICAgIChjdXJyZW50Rm9ybSAhPSBudWxsICYmIGZvcm0gIT09IGN1cnJlbnRGb3JtLmZvcm0pXG4gICAgKSB7XG4gICAgICBpZiAoZm9ybSAhPSBudWxsKSB7XG4gICAgICAgIGZvciAoY29uc3Qgb3JpZ2luIG9mIGZvcm0uY2hvaWNlc09yaWdpbnMpIHtcbiAgICAgICAgICB0aGlzLl90cmFuc2xhdGVDaG9pY2VzKG9yaWdpbi5jaG9pY2VzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fZm9ybS5uZXh0KHtmb3JtOiBmb3JtLCBjb250ZXh0OiBjb250ZXh0fSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2UgZGF0ZSB2YWx1ZXMgaW4gdGhpcyBmb3JtYXQgXCIyMDIzLTAzLTI4VDIyOjAwOjAwLjAwMFpcIiB3aXRoIFwieXl5eS1NTS1kZFwiIGZvcm1hdFxuICAgKiBAcGFyYW0gY3R4XG4gICAqL1xuICBwcml2YXRlIF9maXhEYXRlcyhjdHg6IGFueSk6IHZvaWQge1xuICAgIGlmIChjdHgpIHtcbiAgICAgIE9iamVjdC5rZXlzKGN0eCkuZm9yRWFjaChrID0+IHtcbiAgICAgICAgY29uc3QgdiA9IGN0eFtrXTtcbiAgICAgICAgaWYgKHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiAvXlxcZFxcZFxcZFxcZC1cXGRcXGQtXFxkXFxkVFxcZFxcZDpcXGRcXGQ6XFxkXFxkXFwuXFxkXFxkXFxkWiQvLnRlc3QodikpIHtcbiAgICAgICAgICBjb25zdCBkID0gZm9ybWF0KG5ldyBEYXRlKHYpLCAneXl5eS1NTS1kZCcpO1xuICAgICAgICAgIGN0eFtrXSA9IGQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEZvcm1WYWx1ZSgpOiBhbnkge1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBsZXQgcmVzID0gZGVlcENvcHkoZm9ybUdyb3VwLnZhbHVlKTtcbiAgICB0aGlzLl9maXhEYXRlcyhyZXMpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG5vZGVzVXBkYXRlcyB2YWx1ZSAoaXQncyBhIGZ1bmN0aW9uKSBmb3IgdGhlIGZsYXROb2RlcyBzdHJlYW1cbiAgICogQHBhcmFtIGdyb3VwXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBhZGRHcm91cChncm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICBpZiAoZ3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1heFJlcHMgPSBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBpZiAobWF4UmVwcyA+IDAgJiYgZ3JvdXAucmVwcyArIDEgPiBtYXhSZXBzKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkUmVwcyA9IGdyb3VwLnJlcHM7XG4gICAgICBncm91cC5yZXBzID0gZ3JvdXAucmVwcyArIDE7XG4gICAgICBncm91cC5jYW5BZGQgPSBncm91cC5ub2RlLm1heFJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA8IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGdyb3VwLmNhblJlbW92ZSA9IGdyb3VwLm5vZGUubWluUmVwcyA9PT0gMCB8fCBncm91cC5yZXBzID4gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSk6IEFqZk5vZGVJbnN0YW5jZVtdID0+IHtcbiAgICAgICAgY29uc3QgZmxhdE5vZGVzID0gZmxhdHRlbk5vZGVzSW5zdGFuY2VzKG5vZGVzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fYWRqdXN0UmVwcyhmbGF0Tm9kZXMsIGdyb3VwLCBvbGRSZXBzLCB0aGlzLmdldEZvcm1WYWx1ZSgpKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlR3JvdXAoXG4gICAgZ3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSxcbiAgICBpZHg/OiBudW1iZXIsXG4gICk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxib29sZWFuPikgPT4ge1xuICAgICAgaWYgKGdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBtaW5SZXBzID0gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgaWYgKGdyb3VwLnJlcHMgLSAxIDwgbWluUmVwcykge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFJlcHMgPSBncm91cC5yZXBzO1xuICAgICAgZ3JvdXAucmVwcyA9IGdyb3VwLnJlcHMgLSAxO1xuICAgICAgZ3JvdXAuY2FuQWRkID0gZ3JvdXAubm9kZS5tYXhSZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPCBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBncm91cC5jYW5SZW1vdmUgPSBncm91cC5ub2RlLm1pblJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA+IGdyb3VwLm5vZGUubWluUmVwcztcbiAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZUluc3RhbmNlW10pOiBBamZOb2RlSW5zdGFuY2VbXSA9PiB7XG4gICAgICAgIHRoaXMuX2FkanVzdFJlcHMobm9kZXMsIGdyb3VwLCBvbGRSZXBzLCB0aGlzLmdldEZvcm1WYWx1ZSgpLCBpZHgpO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQodHJ1ZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDb250cm9sKGZpZWxkOiBBamZGaWVsZEluc3RhbmNlIHwgdW5kZWZpbmVkKTogT2JzZXJ2YWJsZTxBYnN0cmFjdENvbnRyb2wgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUdyb3VwLnBpcGUoXG4gICAgICBtYXAoZiA9PiB7XG4gICAgICAgIGlmIChmaWVsZCA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZmllbGROYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGZpZWxkKTtcbiAgICAgICAgcmV0dXJuIGYgIT0gbnVsbCAmJiBmLmNvbnRhaW5zKGZpZWxkTmFtZSkgPyBmLmNvbnRyb2xzW2ZpZWxkTmFtZV0gOiBudWxsO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWN1cnNpdmVseSBleHRyYXBvbGF0ZXMgbm9kZUluc3RhbmNlcyB2aXNpYmlsaXR5IGFuZCByZXR1cm5zIGFuIGFycmF5XG4gICAqIEBwYXJhbSBub2RlcyBUaGUgbm9kZXNcbiAgICogQHBhcmFtIHBhcmVudFZpc2libGUgSWYgZmFsc2UsIGNoaWxkcmVuIG5vZGVzIHdpbGwgYWxzbyBiZSBub3QgdmlzaWJsZVxuICAgKiBAcmV0dXJucyBBbiBhcnJheSB3aXRoIGFsbCBub2RlcyB2aXNpYmlsaXR5XG4gICAqL1xuICBwcml2YXRlIF9tYXBOb2Rlc1Zpc2liaWxpdHkoXG4gICAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIHBhcmVudFZpc2libGU6IGJvb2xlYW4gPSB0cnVlLFxuICApOiB7bmFtZTogc3RyaW5nOyB0eXBlOiAnc2xpZGUnIHwgJ2ZpZWxkJzsgdmlzaWJsZTogYm9vbGVhbn1bXSB7XG4gICAgaWYgKCFub2RlcyB8fCAhbm9kZXMubGVuZ3RoKSByZXR1cm4gW107XG4gICAgY29uc3Qgbm9kZXNWaXNpYmlsaXR5OiB7bmFtZTogc3RyaW5nOyB0eXBlOiAnc2xpZGUnIHwgJ2ZpZWxkJzsgdmlzaWJsZTogYm9vbGVhbn1bXSA9IFtdO1xuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBub2RlLm5vZGUubmFtZTtcbiAgICAgIGNvbnN0IHZpc2libGUgPSBwYXJlbnRWaXNpYmxlID8gbm9kZS52aXNpYmxlIDogZmFsc2U7XG4gICAgICBpZiAoJ25vZGVzJyBpbiBub2RlICYmIG5vZGUubm9kZXMgJiYgbm9kZS5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgbm9kZXNWaXNpYmlsaXR5LnB1c2goe25hbWUsIHR5cGU6ICdzbGlkZScsIHZpc2libGV9KTtcbiAgICAgICAgbm9kZXNWaXNpYmlsaXR5LnB1c2goLi4udGhpcy5fbWFwTm9kZXNWaXNpYmlsaXR5KG5vZGUubm9kZXMsIHZpc2libGUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGVzVmlzaWJpbGl0eS5wdXNoKHtuYW1lLCB0eXBlOiAnZmllbGQnLCB2aXNpYmxlfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2Rlc1Zpc2liaWxpdHk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCB0aGUgZXJyb3JzIHN0cmVhbS4gU3RhcnQgb24gdmFsdWVDaGFuZ2VkXG4gICAqL1xuICBwcml2YXRlIF9pbml0RXJyb3JzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvclBvc2l0aW9ucyA9IHRoaXMuX3ZhbHVlQ2hhbmdlZC5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fbm9kZXMsIHRoaXMuX2Zvcm0pLFxuICAgICAgZmlsdGVyKFxuICAgICAgICAoW18sIF9fLCBmb3JtXSkgPT5cbiAgICAgICAgICBmb3JtICE9IG51bGwgJiZcbiAgICAgICAgICAoXG4gICAgICAgICAgICBmb3JtIGFzIHtcbiAgICAgICAgICAgICAgZm9ybTogQWpmRm9ybSB8IG51bGw7XG4gICAgICAgICAgICAgIGNvbnRleHQ/OiBBamZDb250ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICkuZm9ybSAhPSBudWxsLFxuICAgICAgKSxcbiAgICAgIG1hcCgoW18sIG5vZGVzLCBmb3JtRGVmXSkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtID0gKFxuICAgICAgICAgIGZvcm1EZWYgYXMge1xuICAgICAgICAgICAgZm9ybTogQWpmRm9ybSB8IG51bGw7XG4gICAgICAgICAgICBjb250ZXh0PzogQWpmQ29udGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICkuZm9ybSBhcyBBamZGb3JtO1xuICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICAgICAgY29uc3QgZXJyb3JzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgIGlmIChpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2Uobm9kZSkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5yZXBzOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdmFsaWRTbGlkZShub2RlLCBpKSkge1xuICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGlzU2xpZGVJbnN0YW5jZShub2RlKSkge1xuICAgICAgICAgICAgaWYgKG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgaWYgKCFub2RlLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZvcm0udmFsaWQgPSBlcnJvcnMubGVuZ3RoID09IDA7XG4gICAgICAgIHRoaXMuX3NsaWRlc051bS5uZXh0KGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgICB9KSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9lcnJvcnMgPSB0aGlzLl9lcnJvclBvc2l0aW9ucy5waXBlKFxuICAgICAgbWFwKGUgPT4gKGUgIT0gbnVsbCA/IGUubGVuZ3RoIDogMCkpLFxuICAgICAgc3RhcnRXaXRoKDApLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgYWxsIHRoZSB1cGRhdGUgbWFwIHN0cmVhbSBmb3IgdGhlIGZvcm0gbm9kZXNcbiAgICogKG1hcHMgZm9yIGVkaXRhYmlsaXR5LCB2aXNpYmlsaXR5LCByZXBldGl0aW9uLCBmb3JtdWxhLCB2YWxpZGF0aW9uLCBmaWx0ZXJlZENob2ljZXMuLi4pXG4gICAqIEVhY2ggbWFwIGNvbnRhaW5zIGFsbCB0aGUgZmllbGRzIHRoYXQgYXJlIHRvIGJlIHJlLXJlbmRlcmVkIHdoZW4gZWRpdGluZyBhbm90aGVyIGZpZWxkLFxuICAgKiBncm91cGVkIGJ5IHRoZSBmaWVsZHMgb24gd2hpY2ggdGhleSBkZXBlbmRcbiAgICovXG4gIHByaXZhdGUgX2luaXRVcGRhdGVNYXBTdHJlYW1zKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXJ0VmFsdWUgPSAoKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4gKHt9KTtcbiAgICB0aGlzLl9lZGl0YWJpbGl0eU5vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl9lZGl0YWJpbGl0eU5vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fZm9ybXVsYU5vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fd2FybmluZ05vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG5cbiAgICB0aGlzLl9ub2Rlc01hcHMgPSBbXG4gICAgICB0aGlzLl9lZGl0YWJpbGl0eU5vZGVzTWFwLFxuICAgICAgdGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwLFxuICAgICAgdGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwLFxuICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcCxcbiAgICAgIHRoaXMuX2Zvcm11bGFOb2Rlc01hcCxcbiAgICAgIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcCxcbiAgICAgIHRoaXMuX3dhcm5pbmdOb2Rlc01hcCxcbiAgICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcCxcbiAgICAgIHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwLFxuICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcCxcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgdHdvIHN0cmVhbXMgZm9yIG5ldyBBamYgRm9ybS4gU3RhcnQgb24gc2V0Rm9ybS5cbiAgICogT24gc3Vic2NyaWJlIGNhbGwgbmV4dCgpIGZvciB0aGUgYmVoYXZpb3Igc3ViamVjdFxuICAgKiBhbmQgc2V0IHRoZSBuZXcgdmFsdWUgZm9yIGZvcm1Hcm91cCAoc3RhcnQgdGhlIGRlbHRhKSBhbmQgZm9yIG5vZGVzVXBkYXRlcyAoc3RhcnQgdGhlIGZsYXROb2RlcylcbiAgICovXG4gIHByaXZhdGUgX2luaXRGb3JtU3RyZWFtcygpOiB2b2lkIHtcbiAgICBjb25zdCBmb3JtT2JzID0gdGhpcy5fZm9ybTtcbiAgICBmb3JtT2JzXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKF9mb3JtID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdEZvcm1Hcm91cFN0cmVhbXMobmV3IFVudHlwZWRGb3JtR3JvdXAoe30pKTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX2Zvcm1Hcm91cCk7XG4gICAgZm9ybU9ic1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChmb3JtID0+IHtcbiAgICAgICAgICBpZiAoZm9ybSA9PSBudWxsIHx8IGZvcm0uZm9ybSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JzT2YoZm9ybSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNob2ljZXNPcmlnaW5zID0gZm9ybS5mb3JtLmNob2ljZXNPcmlnaW5zIHx8IFtdO1xuICAgICAgICAgIGlmIChjaG9pY2VzT3JpZ2lucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBvYnNPZihmb3JtKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5hbGwoY2hvaWNlc09yaWdpbnMubWFwKGNvID0+IGluaXRDaG9pY2VzT3JpZ2luKGNvKSkpKS5waXBlKFxuICAgICAgICAgICAgbWFwKCgpID0+IGZvcm0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoZm9ybURlZiA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfbm9kZXNJbnN0YW5jZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgZm9ybURlZiAhPSBudWxsICYmXG4gICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICBmb3JtRGVmIGFzIHtcbiAgICAgICAgICAgICAgICAgIGZvcm06IEFqZkZvcm0gfCBudWxsO1xuICAgICAgICAgICAgICAgICAgY29udGV4dD86IEFqZkNvbnRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApLmZvcm0gIT0gbnVsbFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBmb3JtRGVmIGFzIHtcbiAgICAgICAgICAgICAgICBmb3JtOiBBamZGb3JtO1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6IEFqZkNvbnRleHQ7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGNvbnN0IGJhc2VOb2RlcyA9IGZvcm0uZm9ybS5ub2RlcztcbiAgICAgICAgICAgICAgbm9kZXMgPSB0aGlzLl9vcmRlcmVkTm9kZXNJbnN0YW5jZXNUcmVlKFxuICAgICAgICAgICAgICAgIGZsYXR0ZW5Ob2RlcyhiYXNlTm9kZXMpLFxuICAgICAgICAgICAgICAgIGJhc2VOb2RlcyxcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgW10sXG4gICAgICAgICAgICAgICAgZm9ybS5jb250ZXh0IHx8IHt9LFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFNldCB0aGUgcG9zaXRpb24gZm9yIGVhY2ggc2xpZGVcbiAgICAgICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgaWYgKGlzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5yZXBzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGlmIChub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzU2xpZGVJbnN0YW5jZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLl9ub2Rlc1VwZGF0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgbm9kZSBpbnN0YW5jZSAodmlzaWJpbGl0eSwgZWRpdGFiaWxpdHkuLi4pXG4gICAqIGFuZCBhZGQgdGhpcyBpbnRvIHRoZSBmb3JtZ3JvdXAuXG4gICAqIElmIGl0J3MgYSBjb250YWluZXIgbm9kZSwgY2FsbCByZWN1cnNpdmVseSBfb3JkZXJlZE5vZGVzSW5zdGFuY2VzVHJlZVxuICAgKiBAcGFyYW0gYWxsTm9kZXMgYWxsIHRoZSBmbGF0dGVuIG5vZGVzXG4gICAqIEBwYXJhbSBub2RlIHRoZSBub2RlIHRvIGJlIGluaXRpYWxpc2VkXG4gICAqIEBwYXJhbSBwcmVmaXggdGhlIHByZWZpeFxuICAgKiBAcGFyYW0gY29udGV4dCB0aGUgZm9ybSBjb250ZXh0XG4gICAqIEBwYXJhbSBicmFuY2hWaXNpYmlsaXR5IHRoZSBicmFuY2ggdmlzaWJpbGl0eVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdE5vZGVJbnN0YW5jZShcbiAgICBhbGxOb2RlczogQWpmTm9kZVtdIHwgQWpmTm9kZUluc3RhbmNlW10sXG4gICAgbm9kZTogQWpmTm9kZSxcbiAgICBwcmVmaXg6IG51bWJlcltdLFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgYnJhbmNoVmlzaWJpbGl0eSA9IHRydWUsXG4gICk6IEFqZk5vZGVJbnN0YW5jZSB8IG51bGwge1xuICAgIGxldCBpbnN0YW5jZSA9IG5vZGVUb05vZGVJbnN0YW5jZShhbGxOb2Rlcywgbm9kZSwgcHJlZml4LCBjb250ZXh0KTtcbiAgICBpZiAoaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChpc1JlcGVhdGluZ0dyb3VwSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICB0aGlzLl9leHBsb2RlUmVwZWF0aW5nTm9kZShhbGxOb2RlcywgaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgIH0gZWxzZSBpZiAoaXNTbGlkZUluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgaW5zdGFuY2Uubm9kZXMgPSB0aGlzLl9vcmRlcmVkTm9kZXNJbnN0YW5jZXNUcmVlKFxuICAgICAgICBhbGxOb2RlcyxcbiAgICAgICAgaW5zdGFuY2Uubm9kZS5ub2RlcyxcbiAgICAgICAgaW5zdGFuY2Uubm9kZS5pZCxcbiAgICAgICAgcHJlZml4LFxuICAgICAgICBjb250ZXh0LFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGlzU2xpZGVJbnN0YW5jZShpbnN0YW5jZSkgfHwgaXNGaWVsZEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgdXBkYXRlRWRpdGFiaWxpdHkoaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgIH1cbiAgICB1cGRhdGVWaXNpYmlsaXR5KGluc3RhbmNlLCBjb250ZXh0LCBicmFuY2hWaXNpYmlsaXR5KTtcbiAgICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICBpZiAoaXNGaWVsZEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICB1cGRhdGVGaWx0ZXJlZENob2ljZXMoaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzVGFibGVGaWVsZEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICAgIGNvbnN0IHtub2RlfSA9IGluc3RhbmNlO1xuICAgICAgICAgIGluc3RhbmNlLmNvbnRleHQgPSBjb250ZXh0W25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShpbnN0YW5jZSldIHx8IGNvbnRleHQ7XG4gICAgICAgICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICAgICAgbGV0IGNvbnRyb2xzV2l0aExhYmVsczogW3N0cmluZywgKHN0cmluZyB8IEFqZlRhYmxlRm9ybUNvbnRyb2wpW11dW10gPSBbXTtcbiAgICAgICAgICBjb250cm9sc1dpdGhMYWJlbHMucHVzaChbbm9kZS5sYWJlbCwgbm9kZS5jb2x1bW5MYWJlbHNdKTtcbiAgICAgICAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd3NOdW0gPSBub2RlLnJvd3MubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgcm93SWR4ID0gMDsgcm93SWR4IDwgcm93c051bTsgcm93SWR4KyspIHtcbiAgICAgICAgICAgICAgY29uc3Qgcm93ID0gbm9kZS5yb3dzW3Jvd0lkeF07XG4gICAgICAgICAgICAgIGxldCByOiBBamZUYWJsZUZvcm1Db250cm9sW10gPSBbXTtcbiAgICAgICAgICAgICAgY29uc3QgY2VsbE51bSA9IHJvdy5sZW5ndGg7XG4gICAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGNlbGxOdW07IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSByb3dbaWR4XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNlbGwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICBjZWxsID0ge2Zvcm11bGE6IGNlbGx9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIGV2ZXJ5IGNvbnRyb2wgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBjZWxsIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgaW5zaWRlIHRoZSBmb3JtIGNvbnRyb2wgbWF0cml4XG4gICAgICAgICAgICAgICAgd2l0aCB0aGlzIG1hc2sgYCR7dE5vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke25vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YDtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gKG5vZGUuY29sdW1uVHlwZXMgJiYgbm9kZS5jb2x1bW5UeXBlc1tpZHhdKSB8fCAnbnVtYmVyJztcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJsZUZvcm1Db250cm9sOiBBamZUYWJsZUZvcm1Db250cm9sID0ge1xuICAgICAgICAgICAgICAgICAgY29udHJvbDogbmV3IFVudHlwZWRGb3JtQ29udHJvbCgpLFxuICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPVxuICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuY29udGV4dFtjZWxsLmZvcm11bGFdICYmIHR5cGUgPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgID8gK2luc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXVxuICAgICAgICAgICAgICAgICAgICA6IGluc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXTtcbiAgICAgICAgICAgICAgICB0YWJsZUZvcm1Db250cm9sLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2wobmFtZSwgdGFibGVGb3JtQ29udHJvbC5jb250cm9sKTtcbiAgICAgICAgICAgICAgICByLnB1c2godGFibGVGb3JtQ29udHJvbCk7XG4gICAgICAgICAgICAgICAgLyogY3JlYXRlIGEgb2JqZWN0IHRoYXQgcmVzcGVjdCB0aGUgaW5zdGFuY2UgaW50ZXJmYWNlXG4gICAgICAgICAgICAgICAgd2l0aCB0aGUgbWluaW11bSBkZWZpbmVkIHByb3BlcnRpZXMgdG8gYWxsb3cgdG8gcnVuIGFkZFRvTm9kZUZvcm11bGEgbWFwKi9cbiAgICAgICAgICAgICAgICBjb25zdCBmYWtlSW5zdGFuY2UgPSB7XG4gICAgICAgICAgICAgICAgICBmb3JtdWxhOiB7Zm9ybXVsYTogY2VsbC5mb3JtdWxhfSxcbiAgICAgICAgICAgICAgICAgIG5vZGU6IHtuYW1lLCBub2RlVHlwZTogMCwgZWRpdGFibGU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBwcmVmaXg6IFtdLFxuICAgICAgICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlczogW10sXG4gICAgICAgICAgICAgICAgICB1cGRhdGVkRXZ0OiBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCksXG4gICAgICAgICAgICAgICAgfSBhcyB1bmtub3duIGFzIEFqZk5vZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRUb05vZGVzRm9ybXVsYU1hcChmYWtlSW5zdGFuY2UsIGNlbGwuZm9ybXVsYSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29udHJvbHNXaXRoTGFiZWxzLnB1c2goW25vZGUucm93TGFiZWxzW3Jvd0lkeF0sIHJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlLmNvbnRyb2xzID0gY29udHJvbHNXaXRoTGFiZWxzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnN0YW5jZS52YWx1ZSA9IGNvbnRleHRbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHVwZGF0ZUZpZWxkSW5zdGFuY2VTdGF0ZShpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgfVxuICAgIHRoaXMuX2FkZE5vZGVJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkanVzdCByZXAgc2xpZGUgd2hlbiBhZGQgb3IgcmVtb3ZlIG9uZSdzXG4gICAqIEBwYXJhbSBhbGxOb2RlcyBBbGwgbm9kZXMgb2YgdGhlIGZvcm1cbiAgICogQHBhcmFtIGluc3RhbmNlIEFsbCB0aGUgZXhpc3RpbmcgaW5zdGFuY2UgcmVwc1xuICAgKiBAcGFyYW0gb2xkUmVwcyBUaGUgbnVtYmVyIG9mIGluaXRpYWwgcmVwc1xuICAgKiBAcGFyYW0gY29udGV4dCBUaGUgZm9ybSBjb250ZXh0XG4gICAqIEBwYXJhbSBpZHhUb1JlbW92ZSBUaGUgaW5kZXggb2YgdGhlIHNsaWRlIHRvIGJlIHJlbW92ZWQgKG9wdGlvbmFsLCBkZWZhdWx0IHRvIGxhc3QpXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwcml2YXRlIF9hZGp1c3RSZXBzKFxuICAgIGFsbE5vZGVzOiBBamZOb2RlW10gfCBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBpbnN0YW5jZTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlLFxuICAgIG9sZFJlcHM6IG51bWJlcixcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgIGlkeFRvUmVtb3ZlPzogbnVtYmVyLFxuICApOiB7YWRkZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbDsgcmVtb3ZlZDogQWpmTm9kZUluc3RhbmNlW10gfCBudWxsfSB7XG4gICAgY29uc3QgbmV3UmVwcyA9IGluc3RhbmNlLnJlcHM7XG4gICAgY29uc3QgcmVzdWx0OiB7XG4gICAgICBhZGRlZDogQWpmTm9kZUluc3RhbmNlW10gfCBudWxsO1xuICAgICAgcmVtb3ZlZDogQWpmTm9kZUluc3RhbmNlW10gfCBudWxsO1xuICAgIH0gPSB7XG4gICAgICBhZGRlZDogbnVsbCxcbiAgICAgIHJlbW92ZWQ6IG51bGwsXG4gICAgfTtcbiAgICBpZiAob2xkUmVwcyA8IG5ld1JlcHMpIHtcbiAgICAgIGNvbnN0IG5ld05vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuICAgICAgaWYgKGluc3RhbmNlLm5vZGVzID09IG51bGwpIHtcbiAgICAgICAgaW5zdGFuY2Uubm9kZXMgPSBbXTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXApIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGNyZWF0ZUZpZWxkKHtcbiAgICAgICAgICBpZDogOTk5LFxuICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgIHBhcmVudDogLTEsXG4gICAgICAgICAgZmllbGRUeXBlOiBBamZGaWVsZFR5cGUuRW1wdHksXG4gICAgICAgICAgbGFiZWw6IGluc3RhbmNlLm5vZGUubGFiZWwsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoXG4gICAgICAgICAgYWxsTm9kZXMsXG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICBpbnN0YW5jZS5wcmVmaXguc2xpY2UoMCksXG4gICAgICAgICAgY29udGV4dCxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG5ld0luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICBpbnN0YW5jZS5ub2Rlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IG9sZFJlcHM7IGkgPCBuZXdSZXBzOyBpKyspIHtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gaW5zdGFuY2UucHJlZml4LnNsaWNlKDApO1xuICAgICAgICBjb25zdCBncm91cCA9IGluc3RhbmNlLm5vZGU7XG4gICAgICAgIHByZWZpeC5wdXNoKGkpO1xuICAgICAgICBjb25zdCBvcmRlcmVkTGlzdE5vZGVzID0gb3JkZXJlZE5vZGVzKGdyb3VwLm5vZGVzLCBpbnN0YW5jZS5ub2RlLmlkKTtcbiAgICAgICAgb3JkZXJlZExpc3ROb2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gdGhpcy5faW5pdE5vZGVJbnN0YW5jZShhbGxOb2RlcywgbiwgcHJlZml4LCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAobmV3SW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICBpbnN0YW5jZS5ub2Rlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9hZGROb2RlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmFkZGVkID0gbmV3Tm9kZXM7XG4gICAgfSBlbHNlIGlmIChvbGRSZXBzID4gbmV3UmVwcykge1xuICAgICAgbGV0IG5vZGVzTnVtID0gaW5zdGFuY2Uubm9kZXMubGVuZ3RoIC8gb2xkUmVwcztcbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXApIHtcbiAgICAgICAgbm9kZXNOdW0rKztcbiAgICAgIH1cblxuICAgICAgcmVzdWx0LnJlbW92ZWQgPSBpbnN0YW5jZS5ub2Rlcy5zcGxpY2UobmV3UmVwcyAqIG5vZGVzTnVtLCBub2Rlc051bSk7XG4gICAgICBjb25zdCBpZHhTbGlkZVRvUmVtb3ZlID0gaWR4VG9SZW1vdmUgPz8gbmV3UmVwcztcbiAgICAgIHJlc3VsdC5yZW1vdmVkLmZvckVhY2gobiA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU5vZGVJbnN0YW5jZShuLCBpZHhTbGlkZVRvUmVtb3ZlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAob2xkUmVwcyAhPSBuZXdSZXBzICYmIGluc3RhbmNlLmZvcm11bGFSZXBzID09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICBjb25zdCBjb21wbGV0ZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpO1xuICAgICAgaWYgKGZnICE9IG51bGwgJiYgZmcuY29udGFpbnMoY29tcGxldGVOYW1lKSkge1xuICAgICAgICBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdLnNldFZhbHVlKGluc3RhbmNlLnJlcHMpO1xuICAgICAgfVxuICAgIH1cbiAgICBpbnN0YW5jZS5mbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXNJbnN0YW5jZXMoaW5zdGFuY2Uubm9kZXMpO1xuICAgIGlmIChpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICBjb25zdCBzbGlkZU5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXVtdID0gW107XG4gICAgICBjb25zdCBub2Rlc1BlclNsaWRlID0gaW5zdGFuY2Uubm9kZXMgIT0gbnVsbCA/IGluc3RhbmNlLm5vZGVzLmxlbmd0aCAvIGluc3RhbmNlLnJlcHMgOiAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0YW5jZS5yZXBzOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3RhcnROb2RlID0gaSAqIG5vZGVzUGVyU2xpZGU7XG4gICAgICAgIHNsaWRlTm9kZXMucHVzaChpbnN0YW5jZS5ub2Rlcy5zbGljZShzdGFydE5vZGUsIHN0YXJ0Tm9kZSArIG5vZGVzUGVyU2xpZGUpKTtcbiAgICAgIH1cbiAgICAgIGluc3RhbmNlLnNsaWRlTm9kZXMgPSBzbGlkZU5vZGVzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRm9ybVZhbHVlQW5kVmFsaWRpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5fbm9kZXNVcGRhdGVzXG4gICAgICAucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fZm9ybUdyb3VwKSxcbiAgICAgICAgZmlsdGVyKChbXywgZmddKSA9PiBmZyAhPT0gbnVsbCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChbXywgZmddKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBmZyBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgICBmb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXhwbG9kZVJlcGVhdGluZ05vZGUoXG4gICAgYWxsTm9kZXM6IEFqZk5vZGVbXSB8IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIGluc3RhbmNlOiBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UsXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgKSB7XG4gICAgY29uc3Qgb2xkUmVwcyA9IHVwZGF0ZVJlcHNOdW0oaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgIGlmIChvbGRSZXBzICE9PSBpbnN0YW5jZS5yZXBzKSB7XG4gICAgICB0aGlzLl9hZGp1c3RSZXBzKGFsbE5vZGVzLCBpbnN0YW5jZSwgb2xkUmVwcywgY29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgYW5kIHJldHVybiBhbGwgZm9ybSBub2RlcyBpbnN0YW5jZXMuXG4gICAqIEFkZCB0aGUgbm9kZXMgaW50byB0aGUgZm9ybWdyb3VwIHdpdGggX2luaXROb2RlSW5zdGFuY2UuXG4gICAqIFN0YXJ0IHRoZSB2YWx1ZUNoYW5nZXMgZm9yIHRoZSBmb3JtZ3JvdXAuXG4gICAqIEBwYXJhbSBhbGxOb2RlcyBhbGwgZmxhdHRlbiBub2RlcyBkaSBiYXNlIG5vZGVzXG4gICAqIEBwYXJhbSBub2RlcyBiYXNlIG5vZGVzXG4gICAqIEBwYXJhbSBwYXJlbnQgc3RhcnQgd2l0aCB1bmRlZmluZWRcbiAgICogQHBhcmFtIHByZWZpeFxuICAgKiBAcGFyYW0gY29udGV4dCB0aGUgZm9ybSBkYXRhIGNvbnRleHRcbiAgICogQHJldHVybnNcbiAgICovXG4gIHByaXZhdGUgX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgYWxsTm9kZXM6IEFqZk5vZGVbXSB8IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIG5vZGVzOiBBamZOb2RlW10sXG4gICAgcGFyZW50OiBudW1iZXIgfCBudWxsID0gbnVsbCxcbiAgICBwcmVmaXg6IG51bWJlcltdID0gW10sXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgKTogQWpmTm9kZUluc3RhbmNlW10ge1xuICAgIGxldCBub2Rlc0luc3RhbmNlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICBjb25zdCBjdXJTdWZmaXggPSBwcmVmaXgubGVuZ3RoID4gMCA/ICdfXycgKyBwcmVmaXguam9pbignX18nKSA6ICcnO1xuICAgIG9yZGVyZWROb2Rlcyhub2RlcywgcGFyZW50KS5mb3JFYWNoKChub2RlOiBBamZOb2RlKSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnROb2RlSW5zdGFuY2UgPSBub2Rlc0luc3RhbmNlcy5maW5kKFxuICAgICAgICBuaSA9PiBuaS5ub2RlLmlkID09IG5vZGUucGFyZW50ICYmIG5vZGVJbnN0YW5jZVN1ZmZpeChuaSkgPT0gY3VyU3VmZml4LFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGJyYW5jaFZpc2liaWxpdHkgPVxuICAgICAgICBwYXJlbnROb2RlSW5zdGFuY2UgIT0gbnVsbFxuICAgICAgICAgID8gcGFyZW50Tm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoICE9IG51bGwgJiZcbiAgICAgICAgICAgIHBhcmVudE5vZGVJbnN0YW5jZS52ZXJpZmllZEJyYW5jaCA9PSBub2RlLnBhcmVudE5vZGVcbiAgICAgICAgICA6IHRydWU7XG4gICAgICBjb25zdCBubmkgPSB0aGlzLl9pbml0Tm9kZUluc3RhbmNlKGFsbE5vZGVzLCBub2RlLCBwcmVmaXgsIGNvbnRleHQsIGJyYW5jaFZpc2liaWxpdHkpO1xuICAgICAgaWYgKG5uaSAhPSBudWxsKSB7XG4gICAgICAgIG5vZGVzSW5zdGFuY2VzLnB1c2gobm5pKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbm9kZXNJbnN0YW5jZXM7XG4gIH1cblxuICBwcml2YXRlIF9mb3JtVmFsdWVEZWx0YShvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGFsbEtleXMgPSBbXSBhcyBzdHJpbmdbXTtcbiAgICBbLi4uT2JqZWN0LmtleXMob2xkVmFsdWUpLCAuLi5PYmplY3Qua2V5cyhuZXdWYWx1ZSldLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmIChrZXkgIT09ICckdmFsdWUnICYmIGFsbEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICBhbGxLZXlzLnB1c2goa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYWxsS2V5cy5maWx0ZXIoayA9PiBvbGRWYWx1ZVtrXSAhPT0gbmV3VmFsdWVba10pO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXQgdGhlIGZvcm1Hcm91cCB2YWx1ZUNoYW5nZXMgc3RyZWFtLCB0aGF0IHJlLXJlbmRlciB0aGUgZm9ybSBvbiB2YWx1ZUNoYW5nZXNcbiAgICogQHBhcmFtIGZvcm1Hcm91cCBhbiBpbml0aWFsIGVtcHR5IEZvcm0gR3JvdXBcbiAgICogQHJldHVybnMgVGhlIG5ldyBGb3JtR3JvdXBcbiAgICovXG4gIHByaXZhdGUgX2luaXRGb3JtR3JvdXBTdHJlYW1zKGZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCk6IFVudHlwZWRGb3JtR3JvdXAge1xuICAgIHRoaXMuX2Zvcm1Hcm91cFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGxldCBpbml0ID0gdHJ1ZTtcbiAgICBsZXQgaW5pdEZvcm0gPSB0cnVlO1xuICAgIHRoaXMuX2Zvcm1Jbml0RXZlbnQuZW1pdChBamZGb3JtSW5pdFN0YXR1cy5Jbml0aWFsaXppbmcpO1xuICAgIHRoaXMuX2Zvcm1Hcm91cFN1YnNjcmlwdGlvbiA9IGZvcm1Hcm91cC52YWx1ZUNoYW5nZXNcbiAgICAgIC5waXBlKFxuICAgICAgICBzdGFydFdpdGgoe30pLFxuICAgICAgICBwYWlyd2lzZSgpLFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbShcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbMF0sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzFdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1syXSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbM10sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzRdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1s1XSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbNl0sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzddLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1s4XSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbOV0sXG4gICAgICAgICAgdGhpcy5fZmxhdE5vZGVzLFxuICAgICAgICApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh2ID0+IHtcbiAgICAgICAgY29uc3Qgb2xkRm9ybVZhbHVlID0gKGluaXQgJiYge30pIHx8IHZbMF1bMF07XG4gICAgICAgIGluaXQgPSBmYWxzZTtcbiAgICAgICAgbGV0IG5ld0Zvcm1WYWx1ZSA9IHZbMF1bMV07XG4gICAgICAgIGNvbnN0IGVkaXRhYmlsaXR5ID0gdlsxXTtcbiAgICAgICAgY29uc3QgdmlzaWJpbGl0eU1hcCA9IHZbMl07XG4gICAgICAgIGNvbnN0IHJlcGV0aXRpb25NYXAgPSB2WzNdO1xuICAgICAgICBjb25zdCBjb25kaXRpb25hbEJyYW5jaGVzTWFwID0gdls0XTtcbiAgICAgICAgY29uc3QgZm9ybXVsYU1hcCA9IHZbNV07XG4gICAgICAgIGNvbnN0IHZhbGlkYXRpb25NYXAgPSB2WzZdO1xuICAgICAgICBjb25zdCB3YXJuaW5nTWFwID0gdls3XTtcbiAgICAgICAgY29uc3QgbmV4dFNsaWRlQ29uZGl0aW9uc01hcCA9IHZbOF07XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hvaWNlc01hcCA9IHZbOV07XG4gICAgICAgIGNvbnN0IHRyaWdnZXJDb25kaXRpb25zTWFwID0gdlsxMF07XG4gICAgICAgIGNvbnN0IG5vZGVzID0gdlsxMV07XG5cbiAgICAgICAgLy8gdGFrZXMgdGhlIG5hbWVzIG9mIHRoZSBmaWVsZHMgdGhhdCBoYXZlIGNoYW5nZWRcbiAgICAgICAgY29uc3QgZGVsdGEgPSB0aGlzLl9mb3JtVmFsdWVEZWx0YShvbGRGb3JtVmFsdWUsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgIGNvbnN0IGRlbHRhTGVuID0gZGVsdGEubGVuZ3RoO1xuICAgICAgICBsZXQgdXBkYXRlZE5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuXG4gICAgICAgIC8qXG4gICAgICAgICAgZm9yIGVhY2ggZmllbGQgdXBkYXRlIGFsbCBwcm9wZXJ0aWVzIG1hcFxuICAgICAgICAgIHdpdGggdGhlIHJ1bGUgXCJpZiBmaWVsZG5hbWUgaXMgaW4gbWFwIHVwZGF0ZSBpdFwiIGFuZFxuICAgICAgICAgIHB1c2ggb24gdXBkYXRlTm9kZXMgdGhlIG5vZGUgaW5zdGFuY2UgdGhhdCB3cmFwIGZpZWxkXG4gICAgICAgICovXG4gICAgICAgIGRlbHRhLmZvckVhY2goZmllbGROYW1lID0+IHtcbiAgICAgICAgICB1cGRhdGVkTm9kZXMgPSB1cGRhdGVkTm9kZXMuY29uY2F0KFxuICAgICAgICAgICAgbm9kZXMuZmlsdGVyKG4gPT4gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG4pID09PSBmaWVsZE5hbWUpLFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKGVkaXRhYmlsaXR5W2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZWRpdGFiaWxpdHlbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpc1NsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSB8fCBpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZUVkaXRhYmlsaXR5TWFwRW50cnkobm9kZUluc3RhbmNlLCB0aGlzLl9mb3JtR3JvdXAsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2aXNpYmlsaXR5TWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgdmlzaWJpbGl0eU1hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlVmlzaWJpbGl0eU1hcEVudHJ5KG5vZGVJbnN0YW5jZSwgdGhpcy5fZm9ybUdyb3VwLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICBuZXdGb3JtVmFsdWUgPVxuICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1Hcm91cCAmJiB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKSAhPSBudWxsXG4gICAgICAgICAgICAgICAgICA/IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpPy52YWx1ZVxuICAgICAgICAgICAgICAgICAgOiBuZXdGb3JtVmFsdWU7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyZXBldGl0aW9uTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVwZXRpdGlvbk1hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlUmVwZXRpdGlvbk1hcEVudHJ5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlLCBub2RlcywgdGhpcy5fYWRqdXN0UmVwcyk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb25kaXRpb25hbEJyYW5jaGVzTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlc01hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlc01hcEVudHJ5KFxuICAgICAgICAgICAgICAgIG5vZGVJbnN0YW5jZSxcbiAgICAgICAgICAgICAgICBuZXdGb3JtVmFsdWUsXG4gICAgICAgICAgICAgICAgbm9kZXMsXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd1N1YnRyZWUsXG4gICAgICAgICAgICAgICAgdGhpcy5faGlkZVN1YnRyZWUsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChmb3JtdWxhTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYU1hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlRm9ybXVsYU1hcEVudHJ5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlLCB0aGlzLl9mb3JtR3JvdXApO1xuICAgICAgICAgICAgICBuZXdGb3JtVmFsdWUgPVxuICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1Hcm91cCAmJiB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKSAhPSBudWxsXG4gICAgICAgICAgICAgICAgICA/IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpPy52YWx1ZVxuICAgICAgICAgICAgICAgICAgOiBuZXdGb3JtVmFsdWU7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh2YWxpZGF0aW9uTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgdmFsaWRhdGlvbk1hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlVmFsaWRhdGlvbk1hcEVudHJ5KFxuICAgICAgICAgICAgICAgIG5vZGVJbnN0YW5jZSxcbiAgICAgICAgICAgICAgICBuZXdGb3JtVmFsdWUsXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHdhcm5pbmdNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICB3YXJuaW5nTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVXYXJuaW5nTWFwRW50cnkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZGVsdGFMZW4gPT0gMSAmJiBuZXh0U2xpZGVDb25kaXRpb25zTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBuZXh0U2xpZGVDb25kaXRpb25zTWFwW2ZpZWxkTmFtZV0uZmlsdGVyKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlTmV4dFNsaWRlQ29uZGl0aW9uKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9KS5sZW5ndGggPT0gMVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRoaXMuX25leHRTbGlkZVRyaWdnZXIuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChmaWx0ZXJlZENob2ljZXNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBmaWx0ZXJlZENob2ljZXNNYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgIHVwZGF0ZUZpbHRlcmVkQ2hvaWNlc01hcEVudHJ5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGRlbHRhTGVuID09IDEgJiYgdHJpZ2dlckNvbmRpdGlvbnNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCByZXMgPSB0cmlnZ2VyQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdLmZpbHRlcihub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICBpZiAoIWlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZVRyaWdnZXJDb25kaXRpb25zKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHJlcy5sZW5ndGggPT0gMSAmJiBpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShyZXNbMF0pKSB7XG4gICAgICAgICAgICAgIHJlc1swXS5zZWxlY3Rpb25UcmlnZ2VyLmVtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB1cGRhdGVkTm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICAgICAgICBjb25zdCBub2RlSWR4ID0gbm9kZXMuaW5kZXhPZihuKTtcbiAgICAgICAgICBsZXQgaWR4ID0gbm9kZUlkeCAtIDE7XG4gICAgICAgICAgLy8gRmluZCBhbmQgdXBkYXRlIHRoZSB2YWxpZGl0eSBmb3IgdGhlIG5vZGUncyBzbGlkZVxuICAgICAgICAgIHdoaWxlIChpZHggPj0gMCkge1xuICAgICAgICAgICAgY29uc3QgY3VyTm9kZSA9IG5vZGVzW2lkeF07XG4gICAgICAgICAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShjdXJOb2RlKSkge1xuICAgICAgICAgICAgICB1cGRhdGVTbGlkZVZhbGlkaXR5KGN1ck5vZGUpO1xuICAgICAgICAgICAgICBjdXJOb2RlLnVwZGF0ZWRFdnQuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4LS07XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE1hcmsgZm9yIGNoZWNrIHRoZSBBamZGb3JtRmllbGRcbiAgICAgICAgICBuLnVwZGF0ZWRFdnQuZW1pdCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGluaXRGb3JtKSB7XG4gICAgICAgICAgaW5pdEZvcm0gPSBmYWxzZTtcbiAgICAgICAgICB0aGlzLl9mb3JtSW5pdEV2ZW50LmVtaXQoQWpmRm9ybUluaXRTdGF0dXMuQ29tcGxldGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlZC5uZXh0KCk7XG4gICAgICB9KTtcbiAgICByZXR1cm4gZm9ybUdyb3VwO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvd1N1YnRyZWUoXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICBub2RlczogQWpmTm9kZUluc3RhbmNlW10sXG4gICAgbm9kZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGJyYW5jaD86IG51bWJlcixcbiAgKSB7XG4gICAgdGhpcy5fdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoY29udGV4dCwgbm9kZXMsIG5vZGUsIHRydWUsIGJyYW5jaCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlU3VidHJlZShcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgYnJhbmNoPzogbnVtYmVyLFxuICApIHtcbiAgICB0aGlzLl91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShjb250ZXh0LCBub2Rlcywgbm9kZSwgZmFsc2UsIGJyYW5jaCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgdmlzaWJsZTogYm9vbGVhbixcbiAgICBicmFuY2g/OiBudW1iZXIsXG4gICkge1xuICAgIGxldCBzdWJOb2RlczogQWpmTm9kZUluc3RhbmNlW107XG4gICAgY29uc3Qgbm9kZVN1ZmZpeCA9IG5vZGVJbnN0YW5jZVN1ZmZpeChub2RlKTtcbiAgICBpZiAoYnJhbmNoICE9IG51bGwpIHtcbiAgICAgIHN1Yk5vZGVzID0gbm9kZXMuZmlsdGVyKG4gPT4ge1xuICAgICAgICBjb25zdCBzdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobik7XG4gICAgICAgIHJldHVybiBzdWZmaXggPT0gbm9kZVN1ZmZpeCAmJiBuLm5vZGUucGFyZW50ID09IG5vZGUubm9kZS5pZCAmJiBuLm5vZGUucGFyZW50Tm9kZSA9PSBicmFuY2g7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3ViTm9kZXMgPSBub2Rlcy5maWx0ZXIobiA9PiB7XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IG5vZGVJbnN0YW5jZVN1ZmZpeChuKTtcbiAgICAgICAgcmV0dXJuIHN1ZmZpeCA9PSBub2RlU3VmZml4ICYmIG4ubm9kZS5wYXJlbnQgPT0gbm9kZS5ub2RlLmlkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ29udGFpbmVyID0gaXNDb250YWluZXJOb2RlKG5vZGUubm9kZSk7XG4gICAgc3ViTm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgIWlzQ29udGFpbmVyIHx8XG4gICAgICAgIChpc0NvbnRhaW5lciAmJiAoPEFqZk5vZGVHcm91cD5ub2RlLm5vZGUpLm5vZGVzLmZpbmQoY24gPT4gY24uaWQgPT0gbi5ub2RlLmlkKSA9PSBudWxsKVxuICAgICAgKSB7XG4gICAgICAgIHVwZGF0ZVZpc2liaWxpdHkobiwgY29udGV4dCwgdmlzaWJsZSk7XG4gICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2UobikpIHtcbiAgICAgICAgICB1cGRhdGVGb3JtdWxhKG4sIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBuLCB2aXNpYmxlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IHN0cmVhbSBmb3IgdGhlIGZvcm0gZmxhdCBub2Rlcy5cbiAgICogU3RyZWFtIHN0YXJ0cyB3aGVuIF9pbml0Rm9ybVN0cmVhbXMgc2V0IHRoZSBfbm9kZXNVcGRhdGVzXG4gICAqL1xuICBwcml2YXRlIF9pbml0Tm9kZXNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzID0gdGhpcy5fbm9kZXNVcGRhdGVzLnBpcGUoXG4gICAgICBzY2FuKChub2RlczogQWpmTm9kZUluc3RhbmNlW10sIG9wOiBBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aobm9kZXMpO1xuICAgICAgfSwgW10pLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX2ZsYXROb2Rlc1RyZWUgPSB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgbWFwKG5vZGVzID0+IGZsYXR0ZW5Ob2Rlc0luc3RhbmNlc1RyZWUobm9kZXMpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9mbGF0Tm9kZXMgPSB0aGlzLl9mbGF0Tm9kZXNUcmVlLnBpcGUoXG4gICAgICBtYXAoc2xpZGVzID0+IHtcbiAgICAgICAgbGV0IG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuICAgICAgICBzbGlkZXMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICBub2Rlcy5wdXNoKHMpO1xuICAgICAgICAgIG5vZGVzID0gbm9kZXMuY29uY2F0KHMuZmxhdE5vZGVzKTtcbiAgICAgICAgICB1cGRhdGVTbGlkZVZhbGlkaXR5KHMpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgfSksXG4gICAgICB0YXAoXyA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICBjb25zdCBpbml0aWFsaXplZEZpZWxkID0gJyRub2Rlc0luaXRpYWxpc2VkJztcbiAgICAgICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmICFmb3JtR3JvdXAuY29udGFpbnMoaW5pdGlhbGl6ZWRGaWVsZCkpIHtcbiAgICAgICAgICBjb25zdCBjb250cm9sID0gbmV3IFVudHlwZWRGb3JtQ29udHJvbCgpO1xuICAgICAgICAgIGNvbnRyb2wuc2V0VmFsdWUodHJ1ZSk7XG4gICAgICAgICAgZm9ybUdyb3VwLnJlZ2lzdGVyQ29udHJvbChpbml0aWFsaXplZEZpZWxkLCBjb250cm9sKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhIHJlcGVhdGVkIG5vZGUgaW5zdGFuY2UgZnJvbSB0aGUgZm9ybS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgcmVtb3ZlcyB0aGUgbm9kZSBpbnN0YW5jZSBhdCB0aGUgc3BlY2lmaWVkIHJlcGV0aXRpb24gaW5kZXguXG4gICAqIElmIHRoZSByZW1vdmVkIGluc3RhbmNlIGlzIG5vdCB0aGUgbGFzdCBvbmUsIGl0IHNoaWZ0cyBhbGwgc3Vic2VxdWVudFxuICAgKiBpbnN0YW5jZXMgdXAgYnkgb25lIHBvc2l0aW9uIHRvIGtlZXAgdGhlIHNlcXVlbmNlIGNvbnRpZ3VvdXMsIGFuZCB0aGVuXG4gICAqIGNsZWFycyB0aGUgZmluYWwgKG5vdyBkdXBsaWNhdGVkKSBpbnN0YW5jZS5cbiAgICpcbiAgICogSXQgYWxzbyB1cGRhdGVzIGFsbCBpbnRlcm5hbCB0cmFja2luZyBtYXBzICh2aXNpYmlsaXR5LCB2YWxpZGF0aW9uLCBmb3JtdWxhcyxcbiAgICogd2FybmluZ3MsIGNvbmRpdGlvbnMsIGV0Yy4pIHRvIHJlbW92ZSByZWZlcmVuY2VzIHRvIHRoZSBkZWxldGVkIG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSBub2RlSW5zdGFuY2UgVGhlIG5vZGUgaW5zdGFuY2UgdG8gcmVtb3ZlIChhbHdheXMgY29ycmVzcG9uZHMgdG8gdGhlIGxhc3QgcmVwZXRpdGlvbiBpbmRleCkuXG4gICAqIEBwYXJhbSBpZHhUb1JlbW92ZSBUaGUgaW5kZXggb2YgdGhlIHJlcGVhdGVkIGluc3RhbmNlIHRvIGRlbGV0ZS5cbiAgICogQHJldHVybnMgVGhlIHJlbW92ZWQgbm9kZSBpbnN0YW5jZS5cbiAgICovXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgaWR4VG9SZW1vdmU6IG51bWJlcik6IEFqZk5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKTtcbiAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGlmIChmZyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBjdXJWYWx1ZSA9IGZnLnZhbHVlO1xuXG4gICAgICBjb25zdCBtYXhJZHggPSBub2RlSW5zdGFuY2UucHJlZml4ID8gbm9kZUluc3RhbmNlLnByZWZpeFswXSA6IDMwO1xuICAgICAgbGV0IG5ld0Zvcm1WYWx1ZSA9IHsuLi5jdXJWYWx1ZX07XG4gICAgICBjb25zdCBiYXNlTm9kZU5hbWUgPSBub2RlSW5zdGFuY2Uubm9kZS5uYW1lO1xuICAgICAgZm9yIChsZXQgaSA9IGlkeFRvUmVtb3ZlOyBpIDwgbWF4SWR4OyBpKyspIHtcbiAgICAgICAgY29uc3QgY3Vyckluc3RhbmNlQ29tcGxldGVOYW1lID0gYCR7YmFzZU5vZGVOYW1lfV9fJHtpfWA7XG4gICAgICAgIGNvbnN0IG5leHRJbnN0YW5jZUNvbXBsZXRlTmFtZSA9IGAke2Jhc2VOb2RlTmFtZX1fXyR7aSArIDF9YDtcbiAgICAgICAgbmV3Rm9ybVZhbHVlW2N1cnJJbnN0YW5jZUNvbXBsZXRlTmFtZV0gPSBuZXdGb3JtVmFsdWVbbmV4dEluc3RhbmNlQ29tcGxldGVOYW1lXTtcbiAgICAgIH1cblxuICAgICAgbmV3Rm9ybVZhbHVlID0gey4uLm5ld0Zvcm1WYWx1ZSwgW25vZGVOYW1lXTogdW5kZWZpbmVkfTtcbiAgICAgIGZnLnBhdGNoVmFsdWUobmV3Rm9ybVZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNWaXNpYmlsaXR5TWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzUmVwZXRpdGlvbk1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzRm9ybXVsYU1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1ZhbGlkYXRpb25NYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNXYXJuaW5nTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIGlmIChpc1NsaWRlc0luc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHRoaXMuX3JlbW92ZU5vZGVzRWRpdGFiaWxpdHlNYXBJbmRleChub2RlTmFtZSk7XG4gICAgICByZXR1cm4gdGhpcy5fcmVtb3ZlU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlTm9kZUdyb3VwSW5zdGFuY2Uobm9kZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZVNsaWRlSW5zdGFuY2Uoc2xpZGVJbnN0YW5jZTogQWpmQmFzZVNsaWRlSW5zdGFuY2UpOiBBamZCYXNlU2xpZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgc2xpZGUgPSBzbGlkZUluc3RhbmNlLm5vZGU7XG4gICAgaWYgKHNsaWRlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChzbGlkZUluc3RhbmNlLCBzbGlkZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIHNsaWRlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChzbGlkZUluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuICAgIHJldHVybiBzbGlkZUluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZUdyb3VwSW5zdGFuY2UoXG4gICAgbm9kZUdyb3VwSW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSxcbiAgKTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlR3JvdXAgPSBub2RlR3JvdXBJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChub2RlR3JvdXAudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBpZiAobm9kZUdyb3VwSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCAmJiBub2RlR3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzUmVwZXRpdGlvbk1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZUdyb3VwSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGaWVsZEluc3RhbmNlKGZpZWxkSW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBmaWVsZEluc3RhbmNlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZEluc3RhbmNlKTtcbiAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgZm9ybUdyb3VwLmNvbnRhaW5zKGZpZWxkSW5zdGFuY2VOYW1lKSkge1xuICAgICAgZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woZmllbGRJbnN0YW5jZU5hbWUpO1xuICAgIH1cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIGlmICh2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgZGVsZXRlIHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UucmVhZG9ubHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzRWRpdGFiaWxpdHlNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5yZWFkb25seS5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBmaWVsZEluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcblxuICAgIGlmIChmaWVsZEluc3RhbmNlLmZvcm11bGEpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0Zvcm11bGFNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhLmZvcm11bGEpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGNoZWNrIHRoaXMsIHByb2JhYmx5IGlzIG5ldmVyIHZlcmlmaWVkXG4gICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKGZpZWxkSW5zdGFuY2UpKSB7XG4gICAgICBpZiAoZmllbGRJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwgJiYgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMuZm9yRWFjaChjb25kaXRpb24gPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWYWxpZGF0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2Uud2FybmluZyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLndhcm5pbmcuY29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1dhcm5pbmdNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChcbiAgICAgICAgZmllbGRJbnN0YW5jZSxcbiAgICAgICAgZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24uY29uZGl0aW9uLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UoZmllbGRJbnN0YW5jZSkpIHtcbiAgICAgIGlmIChmaWVsZEluc3RhbmNlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5jaG9pY2VzRmlsdGVyLmZvcm11bGEpO1xuICAgICAgICBpZiAoZmllbGRJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgZmllbGRJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWVsZEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogQWpmTm9kZUluc3RhbmNlIHtcbiAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZE5vZGVHcm91cEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc1NsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZFNsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlSW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGZpZWxkIGluc3RhbmNlIGFzIGNvbnRyb2wgaW4gZm9ybUdyb3VwXG4gICAqIEFkZCBmaWVsZCBpbnN0YW5jZSBpbiBhbGwgdXBkYXRlIG1hcHMgKE5vZGVzRWRpdGFiaWxpdHlNYXAsIE5vZGVzVmlzaWJpbGl0eU1hcCwgLi4uKVxuICAgKiBAcGFyYW0gZmllbGRJbnN0YW5jZVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHJpdmF0ZSBfYWRkRmllbGRJbnN0YW5jZShmaWVsZEluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgY29uc3QgZmllbGRJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGRJbnN0YW5jZSk7XG4gICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmICFmb3JtR3JvdXAuY29udGFpbnMoZmllbGRJbnN0YW5jZU5hbWUpKSB7XG4gICAgICBjb25zdCBjb250cm9sID0gbmV3IFVudHlwZWRGb3JtQ29udHJvbCgpO1xuICAgICAgY29udHJvbC5zZXRWYWx1ZShmaWVsZEluc3RhbmNlLnZhbHVlKTtcbiAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2woZmllbGRJbnN0YW5jZU5hbWUsIGNvbnRyb2wpO1xuICAgIH1cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIGlmICh2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgdm1hcFtmaWVsZEluc3RhbmNlTmFtZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodm1hcFtmaWVsZEluc3RhbmNlTmFtZV0uaW5kZXhPZihmaWVsZEluc3RhbmNlKSA9PSAtMSkge1xuICAgICAgICAgIHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdLnB1c2goZmllbGRJbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmllbGRJbnN0YW5jZS52YWxpZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UucmVhZG9ubHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0VkaXRhYmlsaXR5TWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UucmVhZG9ubHkuY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGZpZWxkSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcblxuICAgIGlmIChmaWVsZEluc3RhbmNlLmZvcm11bGEpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNGb3JtdWxhTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuZm9ybXVsYS5mb3JtdWxhKTtcbiAgICB9XG5cbiAgICBpZiAoaXNOb2RlR3JvdXBJbnN0YW5jZShmaWVsZEluc3RhbmNlKSkge1xuICAgICAgaWYgKGZpZWxkSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCAmJiBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNWYWxpZGF0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2Uud2FybmluZyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLndhcm5pbmcuY29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNXYXJuaW5nTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKFxuICAgICAgICBmaWVsZEluc3RhbmNlLFxuICAgICAgICBmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbi5jb25kaXRpb24sXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShmaWVsZEluc3RhbmNlKSkge1xuICAgICAgaWYgKGZpZWxkSW5zdGFuY2UuY2hvaWNlc0ZpbHRlciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5jaG9pY2VzRmlsdGVyLmZvcm11bGEpO1xuICAgICAgfVxuICAgICAgaWYgKGZpZWxkSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICBmaWVsZEluc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGRJbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgc2xpZGUgaW5zdGFuY2UgaW4gYWxsIHVwZGF0ZSBtYXBzIChOb2Rlc0VkaXRhYmlsaXR5TWFwLCBOb2Rlc1Zpc2liaWxpdHlNYXAsIE5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXApXG4gICAqIEBwYXJhbSBzbGlkZUluc3RhbmNlXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwcml2YXRlIF9hZGRTbGlkZUluc3RhbmNlKHNsaWRlSW5zdGFuY2U6IEFqZlNsaWRlSW5zdGFuY2UpOiBBamZTbGlkZUluc3RhbmNlIHtcbiAgICBjb25zdCBzbGlkZSA9IHNsaWRlSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAoc2xpZGUucmVhZG9ubHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0VkaXRhYmlsaXR5TWFwKHNsaWRlSW5zdGFuY2UsIHNsaWRlLnJlYWRvbmx5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIGlmIChzbGlkZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKHNsaWRlSW5zdGFuY2UsIHNsaWRlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgc2xpZGVJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChzbGlkZUluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuICAgIHJldHVybiBzbGlkZUluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCByZXBlYXRpbmcgc2xpZGUgaW5zdGFuY2UgaW4gYWxsIHVwZGF0ZSBtYXBzXG4gICAqIEBwYXJhbSBub2RlR3JvdXBJbnN0YW5jZVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHJpdmF0ZSBfYWRkTm9kZUdyb3VwSW5zdGFuY2UoXG4gICAgbm9kZUdyb3VwSW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSxcbiAgKTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlR3JvdXAgPSBub2RlR3JvdXBJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChub2RlR3JvdXAudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgbm9kZUdyb3VwSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAobm9kZUdyb3VwSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG4gICAgaWYgKG5vZGVHcm91cEluc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgIGlmIChub2RlR3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICBsZXQgbm9kZUdyb3VwSW5zdGFuY2VOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVHcm91cEluc3RhbmNlKTtcbiAgICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCAmJiAhZm9ybUdyb3VwLmNvbnRhaW5zKG5vZGVHcm91cEluc3RhbmNlTmFtZSkpIHtcbiAgICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woKTtcbiAgICAgICAgY29udHJvbC5zZXRWYWx1ZShub2RlR3JvdXBJbnN0YW5jZS5yZXBzKTtcbiAgICAgICAgZm9ybUdyb3VwLnJlZ2lzdGVyQ29udHJvbChub2RlR3JvdXBJbnN0YW5jZU5hbWUsIGNvbnRyb2wpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZUdyb3VwSW5zdGFuY2U7XG4gIH1cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNFZGl0YWJpbGl0eU1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2VkaXRhYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNWaXNpYmlsaXR5TWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNSZXBldGl0aW9uTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0Zvcm11bGFNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1ZhbGlkYXRpb25NYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1dhcm5pbmdNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc01hcEluZGV4KG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiwgaW5kZXg6IHN0cmluZykge1xuICAgIG5vZGVzTWFwLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHZtYXApLmluZGV4T2YoaW5kZXgpID4gLTEpIHtcbiAgICAgICAgZGVsZXRlIHZtYXBbaW5kZXhdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZtYXA7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNFZGl0YWJpbGl0eU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2VkaXRhYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKFxuICAgIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGZvcm11bGE6IHN0cmluZyxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzRm9ybXVsYU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNWYWxpZGF0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1dhcm5pbmdNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAoXG4gICAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgZm9ybXVsYTogc3RyaW5nLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChcbiAgICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBmb3JtdWxhOiBzdHJpbmcsXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzTWFwKFxuICAgIG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPixcbiAgICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBmb3JtdWxhOiBzdHJpbmcsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IG5hbWVzID0gZ2V0QXJndW1lbnROYW1lcyhmb3JtdWxhKTtcbiAgICBuYW1lcy5kZWxldGUoJyR2YWx1ZScpO1xuICAgIGlmIChuYW1lcy5zaXplID4gMCkge1xuICAgICAgbm9kZXNNYXAubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBuYW1lcykge1xuICAgICAgICAgIGlmICh2bWFwW25hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHZtYXBbbmFtZV0uaW5kZXhPZihub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICAgIHZtYXBbbmFtZV0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgIGlmICh2bWFwW25hbWVdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHZtYXBbbmFtZV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzRWRpdGFiaWxpdHlNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fZWRpdGFiaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNGb3JtdWxhTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzVmFsaWRhdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1dhcm5pbmdNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNNYXAoXG4gICAgbm9kZXNNYXA6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+LFxuICAgIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGZvcm11bGE6IHN0cmluZyxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgbmFtZXMgPSBnZXRBcmd1bWVudE5hbWVzKGZvcm11bGEpO1xuICAgIG5hbWVzLmRlbGV0ZSgnJHZhbHVlJyk7XG4gICAgaWYgKG5hbWVzLnNpemUgPiAwKSB7XG4gICAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgZm9yIChjb25zdCBuYW1lIG9mIG5hbWVzKSB7XG4gICAgICAgICAgaWYgKHZtYXBbbmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdm1hcFtuYW1lXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodm1hcFtuYW1lXS5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICB2bWFwW25hbWVdLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBVcGRhdGUgZWRpdGFiaWxpdHkgZm9yIGEgc2xpZGUgb3IgYSBmaWVsZCBpZiBlZGl0YWJpbGl0eSBpcyBjaGFuZ2VkLlxuICogQHBhcmFtIG5vZGVJbnN0YW5jZVxuICogQHBhcmFtIGZvcm1Hcm91cFxuICogQHBhcmFtIG5ld0Zvcm1WYWx1ZVxuICovXG5jb25zdCB1cGRhdGVFZGl0YWJpbGl0eU1hcEVudHJ5ID0gKFxuICBub2RlSW5zdGFuY2U6IEFqZlNsaWRlSW5zdGFuY2UgfCBBamZGaWVsZEluc3RhbmNlLFxuICBmb3JtR3JvdXA6IEJlaGF2aW9yU3ViamVjdDxVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbD4sXG4gIG5ld0Zvcm1WYWx1ZTogYW55LFxuKSA9PiB7XG4gIHVwZGF0ZUVkaXRhYmlsaXR5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHZpc2liaWxpdHkgZm9yIGEgc2xpZGUgb3IgYSBmaWVsZCBpZiB2aXNpYmlsaXR5IGlzIGNoYW5nZWQuXG4gKiBTZXQgdmFsdWUgdG8gbnVsbCBmb3Igbm9uLXZpc2libGUgZmllbGRcbiAqIFJlLXNldCBkZWZhdWx0IHZhbHVlIGZvciBmaWVsZHMgb3IgZm9yIGNoaWxkIGZpZWxkcyBmb3IgYSBjb250YWluZXIgbm9kZVxuICogQHBhcmFtIG5vZGVJbnN0YW5jZVxuICogQHBhcmFtIGZvcm1Hcm91cFxuICogQHBhcmFtIG5ld0Zvcm1WYWx1ZVxuICovXG5jb25zdCB1cGRhdGVWaXNpYmlsaXR5TWFwRW50cnkgPSAoXG4gIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICBmb3JtR3JvdXA6IEJlaGF2aW9yU3ViamVjdDxVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbD4sXG4gIG5ld0Zvcm1WYWx1ZTogYW55LFxuKSA9PiB7XG4gIGNvbnN0IGNvbXBsZXRlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpO1xuICBjb25zdCB2aXNpYmlsaXR5Q2hhbmdlZCA9IHVwZGF0ZVZpc2liaWxpdHkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICBjb25zdCBpc0ZpZWxkID0gaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gIGlmICh2aXNpYmlsaXR5Q2hhbmdlZCAmJiAhbm9kZUluc3RhbmNlLnZpc2libGUpIHtcbiAgICBjb25zdCBmZyA9IGZvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGlmIChmZyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBzID0gdGltZXIoMjAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAocyAmJiAhcy5jbG9zZWQpIHtcbiAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZnLmNvbnRyb2xzICE9IG51bGwgJiYgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChpc0ZpZWxkKSB7XG4gICAgICBub2RlSW5zdGFuY2UudmFsdWUgPSBudWxsO1xuICAgIH1cbiAgfSBlbHNlIGlmICh2aXNpYmlsaXR5Q2hhbmdlZCAmJiBub2RlSW5zdGFuY2UudmlzaWJsZSkge1xuICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgaWYgKGlzRmllbGQpIHtcbiAgICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUsIHRydWUpO1xuICAgICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQgJiYgZmcuY29udHJvbHMgIT0gbnVsbCAmJiBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShyZXMudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgbm9kZUluc3RhbmNlLm5vZGVzPy5mb3JFYWNoKG4gPT4ge1xuICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG4pKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgbi5ub2RlLmRlZmF1bHRWYWx1ZSAhPSBudWxsICYmXG4gICAgICAgICAgICBmZyAhPSBudWxsICYmXG4gICAgICAgICAgICBmZy5jb250cm9scyAhPSBudWxsICYmXG4gICAgICAgICAgICBmZy5jb250cm9sc1tuLm5vZGUubmFtZV0gIT0gbnVsbFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbGV0IHN1YkZpZWxkVmlzaWJpbGl0eTogYm9vbGVhbiA9IG4udmlzaWJsZSA/IG4udmlzaWJsZSA6IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHN1YkZpZWxkVmlzaWJpbGl0eSkge1xuICAgICAgICAgICAgICBsZXQgc3ViRmllbGREZWZhdWx0VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICBpZiAobi5ub2RlLmRlZmF1bHRWYWx1ZS5mb3JtdWxhICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdWJGaWVsZERlZmF1bHRWYWx1ZSA9IGV2YWx1YXRlRXhwcmVzc2lvbihcbiAgICAgICAgICAgICAgICAgIG4ubm9kZS5kZWZhdWx0VmFsdWUuZm9ybXVsYSxcbiAgICAgICAgICAgICAgICAgIG5ld0Zvcm1WYWx1ZSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1YkZpZWxkRGVmYXVsdFZhbHVlID0gbi5ub2RlLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmZy5jb250cm9sc1tuLm5vZGUubmFtZV0uc2V0VmFsdWUoc3ViRmllbGREZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICBjb25zdCBzMiA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAoczIgJiYgIXMyLmNsb3NlZCkge1xuICAgICAgICAgICAgczIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZmcgIT0gbnVsbCAmJlxuICAgICAgICAgICAgZmcuY29udHJvbHMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXSAhPSBudWxsICYmXG4gICAgICAgICAgICBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdLnNldFZhbHVlKG5vZGVJbnN0YW5jZS5yZXBzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlUmVwZXRpdGlvbk1hcEVudHJ5ID0gKFxuICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgbmV3Rm9ybVZhbHVlOiBhbnksXG4gIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgY2I6IChcbiAgICBhbGxOb2RlczogQWpmTm9kZVtdIHwgQWpmTm9kZUluc3RhbmNlW10sXG4gICAgaW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSxcbiAgICBvbGRSZXBzOiBudW1iZXIsXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgKSA9PiB7YWRkZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbDsgcmVtb3ZlZDogQWpmTm9kZUluc3RhbmNlW10gfCBudWxsfSxcbikgPT4ge1xuICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgIGNvbnN0IG9sZFJlcHMgPSB1cGRhdGVSZXBzTnVtKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICBpZiAob2xkUmVwcyAhPT0gbm9kZUluc3RhbmNlLnJlcHMpIHtcbiAgICAgIGNiKG5vZGVzLCBub2RlSW5zdGFuY2UsIG9sZFJlcHMsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzTWFwRW50cnkgPSAoXG4gIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICBuZXdGb3JtVmFsdWU6IGFueSxcbiAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICBzaG93Q2I6IChcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgYnJhbmNoPzogbnVtYmVyLFxuICApID0+IHZvaWQsXG4gIGhpZGVDYjogKFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBicmFuY2g/OiBudW1iZXIsXG4gICkgPT4gdm9pZCxcbikgPT4ge1xuICAvLyBjb25zdCBicmFuY2hDaGFuZ2VkID1cbiAgLy8gbm9kZUluc3RhbmNlLnVwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXMobmV3Rm9ybVZhbHVlKTtcbiAgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gIC8vIGlmIChicmFuY2hDaGFuZ2VkKSB7XG4gIGNvbnN0IHZlcmlmaWVkQnJhbmNoID0gbm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoO1xuICBub2RlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChfY29uZGl0aW9uLCBpZHgpID0+IHtcbiAgICBpZiAoaWR4ID09IHZlcmlmaWVkQnJhbmNoKSB7XG4gICAgICBzaG93Q2IobmV3Rm9ybVZhbHVlLCBub2Rlcywgbm9kZUluc3RhbmNlLCBpZHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlQ2IobmV3Rm9ybVZhbHVlLCBub2Rlcywgbm9kZUluc3RhbmNlLCBpZHgpO1xuICAgIH1cbiAgfSk7XG4gIC8vIH1cbn07XG5cbmNvbnN0IHVwZGF0ZUZvcm11bGFNYXBFbnRyeSA9IChcbiAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gIG5ld0Zvcm1WYWx1ZTogYW55LFxuICBmb3JtR3JvdXA6IEJlaGF2aW9yU3ViamVjdDxVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbD4sXG4pID0+IHtcbiAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgY29uc3QgcmVzID0gdXBkYXRlRm9ybXVsYShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgY29uc3QgZmcgPSBmb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBpZiAoZmcgIT0gbnVsbCAmJiByZXMuY2hhbmdlZCkge1xuICAgICAgdXBkYXRlVmFsaWRhdGlvbihub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICBmZy5jb250cm9sc1tub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKV0uc2V0VmFsdWUocmVzLnZhbHVlKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZVZhbGlkYXRpb25NYXBFbnRyeSA9IChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlOiBhbnksIHN1cHA6IGFueSkgPT4ge1xuICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICBuZXdGb3JtVmFsdWUuJHZhbHVlID0gbmV3Rm9ybVZhbHVlW25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpXTtcbiAgICB1cGRhdGVWYWxpZGF0aW9uKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlLCBzdXBwKTtcbiAgfVxufTtcblxuY29uc3QgdXBkYXRlV2FybmluZ01hcEVudHJ5ID0gKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWU6IGFueSkgPT4ge1xuICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICB1cGRhdGVXYXJuaW5nKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICBpZiAoXG4gICAgICBub2RlSW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMgIT0gbnVsbCAmJlxuICAgICAgbm9kZUluc3RhbmNlLndhcm5pbmdSZXN1bHRzLmZpbHRlcih3YXJuaW5nID0+IHdhcm5pbmcucmVzdWx0KS5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICBub2RlSW5zdGFuY2Uud2FybmluZ1RyaWdnZXIuZW1pdCgpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlRmlsdGVyZWRDaG9pY2VzTWFwRW50cnkgPSAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZTogYW55KSA9PiB7XG4gIGlmIChpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgfVxufTtcbiJdfQ==