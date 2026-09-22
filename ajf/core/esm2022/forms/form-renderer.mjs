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
import { BehaviorSubject, combineLatest, from, Observable, of as obsOf, Subject, Subscription, timer, } from 'rxjs';
import { filter, map, pairwise, scan, share, shareReplay, startWith, switchMap, tap, withLatestFrom, } from 'rxjs/operators';
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
        // Recomputed when a value moves *or* when the tree does, and seeded by the
        // tree. Driven off `_valueChanged` alone the stream stayed silent on a form
        // that was only opened -- a saved draft, say, which never sees a value
        // change -- and the renderer's error navigation, which reads the latest
        // positions, had nothing to move to while the footer was already reporting
        // the failing fields, counted off the instances themselves.
        //
        // The form is read from the subject rather than combined in: `_form.next()`
        // notifies the node builder before this stream, and that builder feeds
        // `_nodes` synchronously, so a `withLatestFrom(this._form)` here is still
        // holding the previous value -- null, on the first form -- while the tree it
        // is being handed was built from the new one. The positions belong to the
        // tree anyway; the form only takes the verdict.
        this._errorPositions = combineLatest([
            this._valueChanged.pipe(startWith(undefined)),
            this._nodes,
        ]).pipe(map(([_, nodes]) => {
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
            const formDef = this._form.getValue();
            if (formDef != null && formDef.form != null) {
                formDef.form.valid = errors.length == 0;
            }
            this._slidesNum.next(currentPosition);
            return errors;
        }), 
        // Replayed, not just multicast: the renderer wires its error-navigation
        // handler only once the page slider exists, which is later than the first
        // recount, and a plain `share()` left that handler with no positions until
        // the next one.
        shareReplay({ bufferSize: 1, refCount: true }));
        // Replayed as well: `startWith` sits upstream of the multicast, so it only
        // ever served the subscriber that connected the stream. Anyone subscribing
        // later -- and the renderer's own validity subscription can be one of them --
        // got nothing at all until the next recount.
        this._errors = this._errorPositions.pipe(map(e => (e != null ? e.length : 0)), startWith(0), shareReplay({ bufferSize: 1, refCount: true }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Zvcm0tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUEyQixrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWhHLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFrQixrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3JGLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxFQUNMLGVBQWUsRUFDZixhQUFhLEVBQ2IsSUFBSSxFQUNKLFVBQVUsRUFDVixFQUFFLElBQUksS0FBSyxFQUNYLE9BQU8sRUFFUCxZQUFZLEVBQ1osS0FBSyxHQUNOLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLE1BQU0sRUFDTixHQUFHLEVBQ0gsUUFBUSxFQUNSLElBQUksRUFDSixLQUFLLEVBQ0wsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1QsR0FBRyxFQUNILGNBQWMsR0FDZixNQUFNLGdCQUFnQixDQUFDO0FBSXhCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQVEzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFPeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDdEUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0seURBQXlELENBQUM7QUFDbkcsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0RB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QUU7SUFDekYsSUFBSSwwQkFBMEIsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO1FBQzdDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUNwRCxDQUFDO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgQWpmQ29udGV4dCwgZXZhbHVhdGVFeHByZXNzaW9uLCBnZXRBcmd1bWVudE5hbWVzfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7VHJhbnNsb2NvU2VydmljZX0gZnJvbSAnQGFqZi9jb3JlL3RyYW5zbG9jbyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBVbnR5cGVkRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7Zm9ybWF0fSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGNvbWJpbmVMYXRlc3QsXG4gIGZyb20sXG4gIE9ic2VydmFibGUsXG4gIG9mIGFzIG9ic09mLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpYmVyLFxuICBTdWJzY3JpcHRpb24sXG4gIHRpbWVyLFxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGZpbHRlcixcbiAgbWFwLFxuICBwYWlyd2lzZSxcbiAgc2NhbixcbiAgc2hhcmUsXG4gIHNoYXJlUmVwbGF5LFxuICBzdGFydFdpdGgsXG4gIHN3aXRjaE1hcCxcbiAgdGFwLFxuICB3aXRoTGF0ZXN0RnJvbSxcbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkNob2ljZX0gZnJvbSAnLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2UnO1xuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZUYWJsZUZvcm1Db250cm9sfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy90YWJsZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cH0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS1ncm91cCc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy9ub2RlLXR5cGUnO1xuaW1wb3J0IHtBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbn0gZnJvbSAnLi9pbnRlcmZhY2Uvb3BlcmF0aW9ucy9ub2Rlcy1pbnN0YW5jZXMtb3BlcmF0aW9uJztcbmltcG9ydCB7QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb259IGZyb20gJy4vaW50ZXJmYWNlL29wZXJhdGlvbnMvcmVuZGVyZXItdXBkYXRlLW1hcC1vcGVyYXRpb24nO1xuaW1wb3J0IHtBamZSZW5kZXJlclVwZGF0ZU1hcH0gZnJvbSAnLi9pbnRlcmZhY2UvcmVuZGVyZXItbWFwcy91cGRhdGUtbWFwJztcbmltcG9ydCB7QWpmQmFzZVNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvYmFzZS1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2luaXRDaG9pY2VzT3JpZ2lufSBmcm9tICcuL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbic7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvaXMtZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7aXNUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy9pcy10YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge3VwZGF0ZUZpZWxkSW5zdGFuY2VTdGF0ZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1maWVsZC1pbnN0YW5jZS1zdGF0ZSc7XG5pbXBvcnQge3VwZGF0ZUZpbHRlcmVkQ2hvaWNlc30gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1maWx0ZXJlZC1jaG9pY2VzJztcbmltcG9ydCB7dXBkYXRlRm9ybXVsYX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1mb3JtdWxhJztcbmltcG9ydCB7dXBkYXRlTmV4dFNsaWRlQ29uZGl0aW9ufSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLW5leHQtc2xpZGUtY29uZGl0aW9uJztcbmltcG9ydCB7dXBkYXRlVHJpZ2dlckNvbmRpdGlvbnN9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtdHJpZ2dlci1jb25kaXRpb25zJztcbmltcG9ydCB7dXBkYXRlVmFsaWRhdGlvbn0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS12YWxpZGF0aW9uJztcbmltcG9ydCB7dXBkYXRlV2FybmluZ30gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS13YXJuaW5nJztcbmltcG9ydCB7Y3JlYXRlRmllbGR9IGZyb20gJy4vdXRpbHMvZmllbGRzL2NyZWF0ZS1maWVsZCc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc0luc3RhbmNlc30gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMnO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXNJbnN0YW5jZXNUcmVlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9mbGF0dGVuLW5vZGVzLWluc3RhbmNlcy10cmVlJztcbmltcG9ydCB7aXNGaWVsZEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLW5vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdHcm91cEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1yZXBlYXRpbmctZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2lzU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1NsaWRlc0luc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1zbGlkZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWV9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UtY29tcGxldGUtbmFtZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZVN1ZmZpeH0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1zdWZmaXgnO1xuaW1wb3J0IHtub2RlVG9Ob2RlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtdG8tbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge3VwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXN9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS1jb25kaXRpb25hbC1icmFuY2hlcyc7XG5pbXBvcnQge3VwZGF0ZUVkaXRhYmlsaXR5fSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtZWRpdGFiaWxpdHknO1xuaW1wb3J0IHt1cGRhdGVWaXNpYmlsaXR5fSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtdmlzaWJpbGl0eSc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc30gZnJvbSAnLi91dGlscy9ub2Rlcy9mbGF0dGVuLW5vZGVzJztcbmltcG9ydCB7aXNDb250YWluZXJOb2RlfSBmcm9tICcuL3V0aWxzL25vZGVzL2lzLWNvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7b3JkZXJlZE5vZGVzfSBmcm9tICcuL3V0aWxzL25vZGVzL29yZGVyZWQtbm9kZXMnO1xuaW1wb3J0IHt1cGRhdGVSZXBzTnVtfSBmcm9tICcuL3V0aWxzL3NsaWRlcy1pbnN0YW5jZXMvdXBkYXRlLXJlcHMtbnVtJztcbmltcG9ydCB7dmFsaWRTbGlkZX0gZnJvbSAnLi91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3ZhbGlkLXNsaWRlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvblNlcnZpY2V9IGZyb20gJy4vdmFsaWRhdGlvbi1zZXJ2aWNlJztcbmltcG9ydCB7aXNDb250YWluZXJOb2RlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcblxuZXhwb3J0IGNvbnN0IGVudW0gQWpmRm9ybUluaXRTdGF0dXMge1xuICBJbml0aWFsaXppbmcsXG4gIENvbXBsZXRlLFxufVxuXG4vKipcbiAqIFVwZGF0ZSBTbGlkZSBWYWxpZGl0eSBhY2NvcmRpbmcgdG8gdGhlIHZhbGlkaXR5IG9mIGl0cyBmaWVsZCBub2Rlc1xuICogQHBhcmFtIHNsaWRlXG4gKi9cbmNvbnN0IHVwZGF0ZVNsaWRlVmFsaWRpdHkgPSAoc2xpZGU6IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UgfCBBamZTbGlkZUluc3RhbmNlKSA9PiB7XG4gIGNvbnN0IHN1Yk5vZGVzTnVtID0gc2xpZGUuZmxhdE5vZGVzLmxlbmd0aDtcbiAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJOb2Rlc051bTsgaSsrKSB7XG4gICAgY29uc3Qgc3ViTm9kZSA9IHNsaWRlLmZsYXROb2Rlc1tpXTtcbiAgICBpZiAoc3ViTm9kZS52aXNpYmxlICYmIGlzRmllbGRJbnN0YW5jZShzdWJOb2RlKSAmJiAhc3ViTm9kZS52YWxpZCkge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoc2xpZGUudmFsaWQgIT09IHZhbGlkKSB7XG4gICAgc2xpZGUudmFsaWQgPSB2YWxpZDtcbiAgfVxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1SZW5kZXJlclNlcnZpY2Uge1xuICBwcml2YXRlIF9lZGl0YWJpbGl0eU5vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2VkaXRhYmlsaXR5Tm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU5vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9yZXBldGl0aW9uTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9mb3JtdWxhTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfZm9ybXVsYU5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Ob2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfd2FybmluZ05vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9maWx0ZXJlZENob2ljZXNOb2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9mb3JtSW5pdEV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUluaXRTdGF0dXM+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtSW5pdFN0YXR1cz4oKTtcbiAgcmVhZG9ubHkgZm9ybUluaXRFdmVudDogT2JzZXJ2YWJsZTxBamZGb3JtSW5pdFN0YXR1cz4gPSB0aGlzXG4gICAgLl9mb3JtSW5pdEV2ZW50IGFzIE9ic2VydmFibGU8QWpmRm9ybUluaXRTdGF0dXM+O1xuXG4gIHByaXZhdGUgX2Zvcm1Hcm91cDogQmVoYXZpb3JTdWJqZWN0PFVudHlwZWRGb3JtR3JvdXAgfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGZvcm1Hcm91cDogT2JzZXJ2YWJsZTxVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbD4gPSB0aGlzXG4gICAgLl9mb3JtR3JvdXAgYXMgT2JzZXJ2YWJsZTxVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbD47XG5cbiAgcHJpdmF0ZSBfZm9ybTogQmVoYXZpb3JTdWJqZWN0PHtcbiAgICBmb3JtOiBBamZGb3JtIHwgbnVsbDtcbiAgICBjb250ZXh0PzogQWpmQ29udGV4dDtcbiAgfSB8IG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDx7XG4gICAgZm9ybTogQWpmRm9ybSB8IG51bGw7XG4gICAgY29udGV4dD86IEFqZkNvbnRleHQ7XG4gIH0gfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfbm9kZXMhOiBPYnNlcnZhYmxlPEFqZk5vZGVJbnN0YW5jZVtdPjtcbiAgcHJpdmF0ZSBfZmxhdE5vZGVzITogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG5cbiAgcHJpdmF0ZSBfZmxhdE5vZGVzVHJlZSE6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPjtcbiAgcHJpdmF0ZSBfbm9kZXNVcGRhdGVzOiBTdWJqZWN0PEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2Vycm9yUG9zaXRpb25zITogT2JzZXJ2YWJsZTxudW1iZXJbXT47XG4gIHByaXZhdGUgX2Vycm9ycyE6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwcml2YXRlIF9mb3JtR3JvdXBTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9ub2Rlc01hcHMhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPltdO1xuXG4gIHByaXZhdGUgX25leHRTbGlkZVRyaWdnZXI6IEV2ZW50RW1pdHRlcjxBamZOb2RlSW5zdGFuY2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZOb2RlSW5zdGFuY2U+KCk7XG4gIHJlYWRvbmx5IG5leHRTbGlkZVRyaWdnZXI6IE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlPiA9IHRoaXNcbiAgICAuX25leHRTbGlkZVRyaWdnZXIgYXMgT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2U+O1xuXG4gIHByaXZhdGUgX3NsaWRlc051bTogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlYWRvbmx5IHNsaWRlc051bTogT2JzZXJ2YWJsZTxudW1iZXI+ID0gdGhpcy5fc2xpZGVzTnVtIGFzIE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBnZXQgbm9kZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2Rlc1RyZWU7XG4gIH1cbiAgZ2V0IGVycm9yUG9zaXRpb25zKCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JQb3NpdGlvbnM7XG4gIH1cbiAgZ2V0IGVycm9ycygpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnM7XG4gIH1cbiAgZ2V0IGN1cnJlbnRTdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zKCk6IGFueSB7XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uZm9ybSAhPSBudWxsID8gZm9ybS5mb3JtLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMgOiBudWxsO1xuICB9XG5cbiAgZ2V0IG5vZGVzVmlzaWJpbGl0eSgpOiBPYnNlcnZhYmxlPHtuYW1lOiBzdHJpbmc7IHR5cGU6ICdzbGlkZScgfCAnZmllbGQnOyB2aXNpYmxlOiBib29sZWFufVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVzLnBpcGUoXG4gICAgICBtYXAobm9kZXMgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwTm9kZXNWaXNpYmlsaXR5KG5vZGVzKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihfOiBBamZWYWxpZGF0aW9uU2VydmljZSwgQE9wdGlvbmFsKCkgcHJpdmF0ZSBfdHM6IFRyYW5zbG9jb1NlcnZpY2UgfCBudWxsID0gbnVsbCkge1xuICAgIC8vIEluaXRpYWxpemUgYWxsIHN0cmVhbXMgZm9yIHRoZSBmb3JtXG4gICAgdGhpcy5faW5pdFVwZGF0ZU1hcFN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Tm9kZXNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEVycm9yc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Rm9ybVN0cmVhbXMoKTtcbiAgICB0aGlzLl91cGRhdGVGb3JtVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdHJhbnNsYXRlQ2hvaWNlcyhjaG9pY2VzOiBBamZDaG9pY2U8YW55PltdKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3RzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCBjaG9pY2Ugb2YgY2hvaWNlcykge1xuICAgICAgaWYgKGNob2ljZS50cmFuc2xhdGVkTGFiZWwgPT0gbnVsbCkge1xuICAgICAgICBjaG9pY2UudHJhbnNsYXRlZExhYmVsID0gdGhpcy5fdHMudHJhbnNsYXRlKGNob2ljZS5sYWJlbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEl0J3MgY2FsbGVkIGJ5IHRoZSBhcHAgdG8gc2V0IGEgbmV3IEFqZiBGb3JtIHdpdGggaXRzIGNvbnRleHRcbiAgICogQHBhcmFtIGZvcm0gdGhlIEFqZiBGb3JtIHNjaGVtYVxuICAgKiBAcGFyYW0gY29udGV4dCB0aGUgaW5pdGlhbCBjb250ZXh0XG4gICAqL1xuICBzZXRGb3JtKGZvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0OiBBamZDb250ZXh0ID0ge30pIHtcbiAgICB0aGlzLl9pbml0VXBkYXRlTWFwU3RyZWFtcygpO1xuICAgIGlmIChcbiAgICAgIGZvcm0gIT0gbnVsbCAmJlxuICAgICAgT2JqZWN0LmtleXMoY29udGV4dCkubGVuZ3RoID09PSAwICYmXG4gICAgICBPYmplY3Qua2V5cyhmb3JtLmluaXRDb250ZXh0IHx8IHt9KS5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICBjb250ZXh0ID0gZm9ybS5pbml0Q29udGV4dCB8fCB7fTtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudEZvcm0gPSB0aGlzLl9mb3JtLmdldFZhbHVlKCk7XG4gICAgaWYgKFxuICAgICAgKGN1cnJlbnRGb3JtID09IG51bGwgJiYgZm9ybSAhPSBudWxsKSB8fFxuICAgICAgKGN1cnJlbnRGb3JtICE9IG51bGwgJiYgZm9ybSAhPT0gY3VycmVudEZvcm0uZm9ybSlcbiAgICApIHtcbiAgICAgIGlmIChmb3JtICE9IG51bGwpIHtcbiAgICAgICAgZm9yIChjb25zdCBvcmlnaW4gb2YgZm9ybS5jaG9pY2VzT3JpZ2lucykge1xuICAgICAgICAgIHRoaXMuX3RyYW5zbGF0ZUNob2ljZXMob3JpZ2luLmNob2ljZXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9mb3JtLm5leHQoe2Zvcm06IGZvcm0sIGNvbnRleHQ6IGNvbnRleHR9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZSBkYXRlIHZhbHVlcyBpbiB0aGlzIGZvcm1hdCBcIjIwMjMtMDMtMjhUMjI6MDA6MDAuMDAwWlwiIHdpdGggXCJ5eXl5LU1NLWRkXCIgZm9ybWF0XG4gICAqIEBwYXJhbSBjdHhcbiAgICovXG4gIHByaXZhdGUgX2ZpeERhdGVzKGN0eDogYW55KTogdm9pZCB7XG4gICAgaWYgKGN0eCkge1xuICAgICAgT2JqZWN0LmtleXMoY3R4KS5mb3JFYWNoKGsgPT4ge1xuICAgICAgICBjb25zdCB2ID0gY3R4W2tdO1xuICAgICAgICBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIC9eXFxkXFxkXFxkXFxkLVxcZFxcZC1cXGRcXGRUXFxkXFxkOlxcZFxcZDpcXGRcXGRcXC5cXGRcXGRcXGRaJC8udGVzdCh2KSkge1xuICAgICAgICAgIGNvbnN0IGQgPSBmb3JtYXQobmV3IERhdGUodiksICd5eXl5LU1NLWRkJyk7XG4gICAgICAgICAgY3R4W2tdID0gZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Rm9ybVZhbHVlKCk6IGFueSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGxldCByZXMgPSBkZWVwQ29weShmb3JtR3JvdXAudmFsdWUpO1xuICAgIHRoaXMuX2ZpeERhdGVzKHJlcyk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbm9kZXNVcGRhdGVzIHZhbHVlIChpdCdzIGEgZnVuY3Rpb24pIGZvciB0aGUgZmxhdE5vZGVzIHN0cmVhbVxuICAgKiBAcGFyYW0gZ3JvdXBcbiAgICogQHJldHVybnNcbiAgICovXG4gIGFkZEdyb3VwKGdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIGlmIChncm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbWF4UmVwcyA9IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGlmIChtYXhSZXBzID4gMCAmJiBncm91cC5yZXBzICsgMSA+IG1heFJlcHMpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRSZXBzID0gZ3JvdXAucmVwcztcbiAgICAgIGdyb3VwLnJlcHMgPSBncm91cC5yZXBzICsgMTtcbiAgICAgIGdyb3VwLmNhbkFkZCA9IGdyb3VwLm5vZGUubWF4UmVwcyA9PT0gMCB8fCBncm91cC5yZXBzIDwgZ3JvdXAubm9kZS5tYXhSZXBzO1xuICAgICAgZ3JvdXAuY2FuUmVtb3ZlID0gZ3JvdXAubm9kZS5taW5SZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPiBncm91cC5ub2RlLm1pblJlcHM7XG4gICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICBjb25zdCBmbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXNJbnN0YW5jZXMobm9kZXMsIHRydWUpO1xuICAgICAgICB0aGlzLl9hZGp1c3RSZXBzKGZsYXROb2RlcywgZ3JvdXAsIG9sZFJlcHMsIHRoaXMuZ2V0Rm9ybVZhbHVlKCkpO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQodHJ1ZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVHcm91cChcbiAgICBncm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLFxuICAgIGlkeD86IG51bWJlcixcbiAgKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICBpZiAoZ3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1pblJlcHMgPSBncm91cC5ub2RlLm1pblJlcHM7XG4gICAgICBpZiAoZ3JvdXAucmVwcyAtIDEgPCBtaW5SZXBzKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkUmVwcyA9IGdyb3VwLnJlcHM7XG4gICAgICBncm91cC5yZXBzID0gZ3JvdXAucmVwcyAtIDE7XG4gICAgICBncm91cC5jYW5BZGQgPSBncm91cC5ub2RlLm1heFJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA8IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGdyb3VwLmNhblJlbW92ZSA9IGdyb3VwLm5vZGUubWluUmVwcyA9PT0gMCB8fCBncm91cC5yZXBzID4gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSk6IEFqZk5vZGVJbnN0YW5jZVtdID0+IHtcbiAgICAgICAgdGhpcy5fYWRqdXN0UmVwcyhub2RlcywgZ3JvdXAsIG9sZFJlcHMsIHRoaXMuZ2V0Rm9ybVZhbHVlKCksIGlkeCk7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh0cnVlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRyb2woZmllbGQ6IEFqZkZpZWxkSW5zdGFuY2UgfCB1bmRlZmluZWQpOiBPYnNlcnZhYmxlPEFic3RyYWN0Q29udHJvbCB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtR3JvdXAucGlwZShcbiAgICAgIG1hcChmID0+IHtcbiAgICAgICAgaWYgKGZpZWxkID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGQpO1xuICAgICAgICByZXR1cm4gZiAhPSBudWxsICYmIGYuY29udGFpbnMoZmllbGROYW1lKSA/IGYuY29udHJvbHNbZmllbGROYW1lXSA6IG51bGw7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlY3Vyc2l2ZWx5IGV4dHJhcG9sYXRlcyBub2RlSW5zdGFuY2VzIHZpc2liaWxpdHkgYW5kIHJldHVybnMgYW4gYXJyYXlcbiAgICogQHBhcmFtIG5vZGVzIFRoZSBub2Rlc1xuICAgKiBAcGFyYW0gcGFyZW50VmlzaWJsZSBJZiBmYWxzZSwgY2hpbGRyZW4gbm9kZXMgd2lsbCBhbHNvIGJlIG5vdCB2aXNpYmxlXG4gICAqIEByZXR1cm5zIEFuIGFycmF5IHdpdGggYWxsIG5vZGVzIHZpc2liaWxpdHlcbiAgICovXG4gIHByaXZhdGUgX21hcE5vZGVzVmlzaWJpbGl0eShcbiAgICBub2RlczogQWpmTm9kZUluc3RhbmNlW10sXG4gICAgcGFyZW50VmlzaWJsZTogYm9vbGVhbiA9IHRydWUsXG4gICk6IHtuYW1lOiBzdHJpbmc7IHR5cGU6ICdzbGlkZScgfCAnZmllbGQnOyB2aXNpYmxlOiBib29sZWFufVtdIHtcbiAgICBpZiAoIW5vZGVzIHx8ICFub2Rlcy5sZW5ndGgpIHJldHVybiBbXTtcbiAgICBjb25zdCBub2Rlc1Zpc2liaWxpdHk6IHtuYW1lOiBzdHJpbmc7IHR5cGU6ICdzbGlkZScgfCAnZmllbGQnOyB2aXNpYmxlOiBib29sZWFufVtdID0gW107XG4gICAgZm9yIChsZXQgbm9kZSBvZiBub2Rlcykge1xuICAgICAgY29uc3QgbmFtZSA9IG5vZGUubm9kZS5uYW1lO1xuICAgICAgY29uc3QgdmlzaWJsZSA9IHBhcmVudFZpc2libGUgPyBub2RlLnZpc2libGUgOiBmYWxzZTtcbiAgICAgIGlmICgnbm9kZXMnIGluIG5vZGUgJiYgbm9kZS5ub2RlcyAmJiBub2RlLm5vZGVzLmxlbmd0aCkge1xuICAgICAgICBub2Rlc1Zpc2liaWxpdHkucHVzaCh7bmFtZSwgdHlwZTogJ3NsaWRlJywgdmlzaWJsZX0pO1xuICAgICAgICBub2Rlc1Zpc2liaWxpdHkucHVzaCguLi50aGlzLl9tYXBOb2Rlc1Zpc2liaWxpdHkobm9kZS5ub2RlcywgdmlzaWJsZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZXNWaXNpYmlsaXR5LnB1c2goe25hbWUsIHR5cGU6ICdmaWVsZCcsIHZpc2libGV9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzVmlzaWJpbGl0eTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IHRoZSBlcnJvcnMgc3RyZWFtLiBTdGFydCBvbiB2YWx1ZUNoYW5nZWRcbiAgICovXG4gIHByaXZhdGUgX2luaXRFcnJvcnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIC8vIFJlY29tcHV0ZWQgd2hlbiBhIHZhbHVlIG1vdmVzICpvciogd2hlbiB0aGUgdHJlZSBkb2VzLCBhbmQgc2VlZGVkIGJ5IHRoZVxuICAgIC8vIHRyZWUuIERyaXZlbiBvZmYgYF92YWx1ZUNoYW5nZWRgIGFsb25lIHRoZSBzdHJlYW0gc3RheWVkIHNpbGVudCBvbiBhIGZvcm1cbiAgICAvLyB0aGF0IHdhcyBvbmx5IG9wZW5lZCAtLSBhIHNhdmVkIGRyYWZ0LCBzYXksIHdoaWNoIG5ldmVyIHNlZXMgYSB2YWx1ZVxuICAgIC8vIGNoYW5nZSAtLSBhbmQgdGhlIHJlbmRlcmVyJ3MgZXJyb3IgbmF2aWdhdGlvbiwgd2hpY2ggcmVhZHMgdGhlIGxhdGVzdFxuICAgIC8vIHBvc2l0aW9ucywgaGFkIG5vdGhpbmcgdG8gbW92ZSB0byB3aGlsZSB0aGUgZm9vdGVyIHdhcyBhbHJlYWR5IHJlcG9ydGluZ1xuICAgIC8vIHRoZSBmYWlsaW5nIGZpZWxkcywgY291bnRlZCBvZmYgdGhlIGluc3RhbmNlcyB0aGVtc2VsdmVzLlxuICAgIC8vXG4gICAgLy8gVGhlIGZvcm0gaXMgcmVhZCBmcm9tIHRoZSBzdWJqZWN0IHJhdGhlciB0aGFuIGNvbWJpbmVkIGluOiBgX2Zvcm0ubmV4dCgpYFxuICAgIC8vIG5vdGlmaWVzIHRoZSBub2RlIGJ1aWxkZXIgYmVmb3JlIHRoaXMgc3RyZWFtLCBhbmQgdGhhdCBidWlsZGVyIGZlZWRzXG4gICAgLy8gYF9ub2Rlc2Agc3luY2hyb25vdXNseSwgc28gYSBgd2l0aExhdGVzdEZyb20odGhpcy5fZm9ybSlgIGhlcmUgaXMgc3RpbGxcbiAgICAvLyBob2xkaW5nIHRoZSBwcmV2aW91cyB2YWx1ZSAtLSBudWxsLCBvbiB0aGUgZmlyc3QgZm9ybSAtLSB3aGlsZSB0aGUgdHJlZSBpdFxuICAgIC8vIGlzIGJlaW5nIGhhbmRlZCB3YXMgYnVpbHQgZnJvbSB0aGUgbmV3IG9uZS4gVGhlIHBvc2l0aW9ucyBiZWxvbmcgdG8gdGhlXG4gICAgLy8gdHJlZSBhbnl3YXk7IHRoZSBmb3JtIG9ubHkgdGFrZXMgdGhlIHZlcmRpY3QuXG4gICAgdGhpcy5fZXJyb3JQb3NpdGlvbnMgPSBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlZC5waXBlKHN0YXJ0V2l0aCh1bmRlZmluZWQpKSxcbiAgICAgIHRoaXMuX25vZGVzLFxuICAgIF0pLnBpcGUoXG4gICAgICBtYXAoKFtfLCBub2Rlc10pID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgIGNvbnN0IGVycm9yczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlKG5vZGUpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUucmVwczsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmIChub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkU2xpZGUobm9kZSwgaSkpIHtcbiAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChpc1NsaWRlSW5zdGFuY2Uobm9kZSkpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgIGlmICghbm9kZS52YWxpZCkge1xuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBmb3JtRGVmID0gdGhpcy5fZm9ybS5nZXRWYWx1ZSgpO1xuICAgICAgICBpZiAoZm9ybURlZiAhPSBudWxsICYmIGZvcm1EZWYuZm9ybSAhPSBudWxsKSB7XG4gICAgICAgICAgZm9ybURlZi5mb3JtLnZhbGlkID0gZXJyb3JzLmxlbmd0aCA9PSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NsaWRlc051bS5uZXh0KGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgICB9KSxcbiAgICAgIC8vIFJlcGxheWVkLCBub3QganVzdCBtdWx0aWNhc3Q6IHRoZSByZW5kZXJlciB3aXJlcyBpdHMgZXJyb3ItbmF2aWdhdGlvblxuICAgICAgLy8gaGFuZGxlciBvbmx5IG9uY2UgdGhlIHBhZ2Ugc2xpZGVyIGV4aXN0cywgd2hpY2ggaXMgbGF0ZXIgdGhhbiB0aGUgZmlyc3RcbiAgICAgIC8vIHJlY291bnQsIGFuZCBhIHBsYWluIGBzaGFyZSgpYCBsZWZ0IHRoYXQgaGFuZGxlciB3aXRoIG5vIHBvc2l0aW9ucyB1bnRpbFxuICAgICAgLy8gdGhlIG5leHQgb25lLlxuICAgICAgc2hhcmVSZXBsYXkoe2J1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlfSksXG4gICAgKTtcbiAgICAvLyBSZXBsYXllZCBhcyB3ZWxsOiBgc3RhcnRXaXRoYCBzaXRzIHVwc3RyZWFtIG9mIHRoZSBtdWx0aWNhc3QsIHNvIGl0IG9ubHlcbiAgICAvLyBldmVyIHNlcnZlZCB0aGUgc3Vic2NyaWJlciB0aGF0IGNvbm5lY3RlZCB0aGUgc3RyZWFtLiBBbnlvbmUgc3Vic2NyaWJpbmdcbiAgICAvLyBsYXRlciAtLSBhbmQgdGhlIHJlbmRlcmVyJ3Mgb3duIHZhbGlkaXR5IHN1YnNjcmlwdGlvbiBjYW4gYmUgb25lIG9mIHRoZW0gLS1cbiAgICAvLyBnb3Qgbm90aGluZyBhdCBhbGwgdW50aWwgdGhlIG5leHQgcmVjb3VudC5cbiAgICB0aGlzLl9lcnJvcnMgPSB0aGlzLl9lcnJvclBvc2l0aW9ucy5waXBlKFxuICAgICAgbWFwKGUgPT4gKGUgIT0gbnVsbCA/IGUubGVuZ3RoIDogMCkpLFxuICAgICAgc3RhcnRXaXRoKDApLFxuICAgICAgc2hhcmVSZXBsYXkoe2J1ZmZlclNpemU6IDEsIHJlZkNvdW50OiB0cnVlfSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IGFsbCB0aGUgdXBkYXRlIG1hcCBzdHJlYW0gZm9yIHRoZSBmb3JtIG5vZGVzXG4gICAqIChtYXBzIGZvciBlZGl0YWJpbGl0eSwgdmlzaWJpbGl0eSwgcmVwZXRpdGlvbiwgZm9ybXVsYSwgdmFsaWRhdGlvbiwgZmlsdGVyZWRDaG9pY2VzLi4uKVxuICAgKiBFYWNoIG1hcCBjb250YWlucyBhbGwgdGhlIGZpZWxkcyB0aGF0IGFyZSB0byBiZSByZS1yZW5kZXJlZCB3aGVuIGVkaXRpbmcgYW5vdGhlciBmaWVsZCxcbiAgICogZ3JvdXBlZCBieSB0aGUgZmllbGRzIG9uIHdoaWNoIHRoZXkgZGVwZW5kXG4gICAqL1xuICBwcml2YXRlIF9pbml0VXBkYXRlTWFwU3RyZWFtcygpOiB2b2lkIHtcbiAgICBjb25zdCBzdGFydFZhbHVlID0gKCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+ICh7fSk7XG4gICAgdGhpcy5fZWRpdGFiaWxpdHlOb2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fZWRpdGFiaWxpdHlOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX2Zvcm11bGFOb2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX3dhcm5pbmdOb2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuXG4gICAgdGhpcy5fbm9kZXNNYXBzID0gW1xuICAgICAgdGhpcy5fZWRpdGFiaWxpdHlOb2Rlc01hcCxcbiAgICAgIHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcCxcbiAgICAgIHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcCxcbiAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXAsXG4gICAgICB0aGlzLl9mb3JtdWxhTm9kZXNNYXAsXG4gICAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXAsXG4gICAgICB0aGlzLl93YXJuaW5nTm9kZXNNYXAsXG4gICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXAsXG4gICAgICB0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcCxcbiAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXAsXG4gICAgXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IHR3byBzdHJlYW1zIGZvciBuZXcgQWpmIEZvcm0uIFN0YXJ0IG9uIHNldEZvcm0uXG4gICAqIE9uIHN1YnNjcmliZSBjYWxsIG5leHQoKSBmb3IgdGhlIGJlaGF2aW9yIHN1YmplY3RcbiAgICogYW5kIHNldCB0aGUgbmV3IHZhbHVlIGZvciBmb3JtR3JvdXAgKHN0YXJ0IHRoZSBkZWx0YSkgYW5kIGZvciBub2Rlc1VwZGF0ZXMgKHN0YXJ0IHRoZSBmbGF0Tm9kZXMpXG4gICAqL1xuICBwcml2YXRlIF9pbml0Rm9ybVN0cmVhbXMoKTogdm9pZCB7XG4gICAgY29uc3QgZm9ybU9icyA9IHRoaXMuX2Zvcm07XG4gICAgZm9ybU9ic1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChfZm9ybSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRGb3JtR3JvdXBTdHJlYW1zKG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KSk7XG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb3JtR3JvdXApO1xuICAgIGZvcm1PYnNcbiAgICAgIC5waXBlKFxuICAgICAgICBzd2l0Y2hNYXAoZm9ybSA9PiB7XG4gICAgICAgICAgaWYgKGZvcm0gPT0gbnVsbCB8fCBmb3JtLmZvcm0gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG9ic09mKGZvcm0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBjaG9pY2VzT3JpZ2lucyA9IGZvcm0uZm9ybS5jaG9pY2VzT3JpZ2lucyB8fCBbXTtcbiAgICAgICAgICBpZiAoY2hvaWNlc09yaWdpbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JzT2YoZm9ybSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmcm9tKFByb21pc2UuYWxsKGNob2ljZXNPcmlnaW5zLm1hcChjbyA9PiBpbml0Q2hvaWNlc09yaWdpbihjbykpKSkucGlwZShcbiAgICAgICAgICAgIG1hcCgoKSA9PiBmb3JtKSxcbiAgICAgICAgICApO1xuICAgICAgICB9KSxcbiAgICAgICAgbWFwKGZvcm1EZWYgPT4ge1xuICAgICAgICAgIHJldHVybiAoX25vZGVzSW5zdGFuY2VzOiBBamZOb2RlSW5zdGFuY2VbXSk6IEFqZk5vZGVJbnN0YW5jZVtdID0+IHtcbiAgICAgICAgICAgIGxldCBub2RlczogQWpmTm9kZUluc3RhbmNlW107XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIGZvcm1EZWYgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAoXG4gICAgICAgICAgICAgICAgZm9ybURlZiBhcyB7XG4gICAgICAgICAgICAgICAgICBmb3JtOiBBamZGb3JtIHwgbnVsbDtcbiAgICAgICAgICAgICAgICAgIGNvbnRleHQ/OiBBamZDb250ZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKS5mb3JtICE9IG51bGxcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCBmb3JtID0gZm9ybURlZiBhcyB7XG4gICAgICAgICAgICAgICAgZm9ybTogQWpmRm9ybTtcbiAgICAgICAgICAgICAgICBjb250ZXh0OiBBamZDb250ZXh0O1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICBjb25zdCBiYXNlTm9kZXMgPSBmb3JtLmZvcm0ubm9kZXM7XG4gICAgICAgICAgICAgIG5vZGVzID0gdGhpcy5fb3JkZXJlZE5vZGVzSW5zdGFuY2VzVHJlZShcbiAgICAgICAgICAgICAgICBmbGF0dGVuTm9kZXMoYmFzZU5vZGVzKSxcbiAgICAgICAgICAgICAgICBiYXNlTm9kZXMsXG4gICAgICAgICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgICAgIGZvcm0uY29udGV4dCB8fCB7fSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG5vZGVzID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTZXQgdGhlIHBvc2l0aW9uIGZvciBlYWNoIHNsaWRlXG4gICAgICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIG5vZGVzLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICAgICAgICAgIGlmIChpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2Uobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUucmVwczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBpZiAobm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1NsaWRlSW5zdGFuY2Uobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIG5vZGUgaW5zdGFuY2UgKHZpc2liaWxpdHksIGVkaXRhYmlsaXR5Li4uKVxuICAgKiBhbmQgYWRkIHRoaXMgaW50byB0aGUgZm9ybWdyb3VwLlxuICAgKiBJZiBpdCdzIGEgY29udGFpbmVyIG5vZGUsIGNhbGwgcmVjdXJzaXZlbHkgX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWVcbiAgICogQHBhcmFtIGFsbE5vZGVzIGFsbCB0aGUgZmxhdHRlbiBub2Rlc1xuICAgKiBAcGFyYW0gbm9kZSB0aGUgbm9kZSB0byBiZSBpbml0aWFsaXNlZFxuICAgKiBAcGFyYW0gcHJlZml4IHRoZSBwcmVmaXhcbiAgICogQHBhcmFtIGNvbnRleHQgdGhlIGZvcm0gY29udGV4dFxuICAgKiBAcGFyYW0gYnJhbmNoVmlzaWJpbGl0eSB0aGUgYnJhbmNoIHZpc2liaWxpdHlcbiAgICogQHJldHVybnNcbiAgICovXG4gIHByaXZhdGUgX2luaXROb2RlSW5zdGFuY2UoXG4gICAgYWxsTm9kZXM6IEFqZk5vZGVbXSB8IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIG5vZGU6IEFqZk5vZGUsXG4gICAgcHJlZml4OiBudW1iZXJbXSxcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgIGJyYW5jaFZpc2liaWxpdHkgPSB0cnVlLFxuICApOiBBamZOb2RlSW5zdGFuY2UgfCBudWxsIHtcbiAgICBsZXQgaW5zdGFuY2UgPSBub2RlVG9Ob2RlSW5zdGFuY2UoYWxsTm9kZXMsIG5vZGUsIHByZWZpeCwgY29udGV4dCk7XG4gICAgaWYgKGluc3RhbmNlID09IG51bGwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoaXNSZXBlYXRpbmdHcm91cEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgdGhpcy5fZXhwbG9kZVJlcGVhdGluZ05vZGUoYWxsTm9kZXMsIGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICB9IGVsc2UgaWYgKGlzU2xpZGVJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgIGluc3RhbmNlLm5vZGVzID0gdGhpcy5fb3JkZXJlZE5vZGVzSW5zdGFuY2VzVHJlZShcbiAgICAgICAgYWxsTm9kZXMsXG4gICAgICAgIGluc3RhbmNlLm5vZGUubm9kZXMsXG4gICAgICAgIGluc3RhbmNlLm5vZGUuaWQsXG4gICAgICAgIHByZWZpeCxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChpc1NsaWRlSW5zdGFuY2UoaW5zdGFuY2UpIHx8IGlzRmllbGRJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgIHVwZGF0ZUVkaXRhYmlsaXR5KGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICB9XG4gICAgdXBkYXRlVmlzaWJpbGl0eShpbnN0YW5jZSwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gICAgaWYgKGlzTm9kZUdyb3VwSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICAvLyBUaGUgZ3JvdXAncyBjaGlsZHJlbiB3ZXJlIGJ1aWx0IGFib3ZlLCBiZWZvcmUgdGhlIGdyb3VwIGl0c2VsZiBoYWQgYVxuICAgICAgLy8gdmlzaWJpbGl0eTogd2l0aG91dCB0aGlzIGEgZ3JvdXAgdGhhdCBzdGFydHMgb3V0IGhpZGRlbiBzdGlsbCBzaG93c1xuICAgICAgLy8gZXZlcnkgZmllbGQgaXQgaG9sZHMgdW50aWwgaXRzIGNvbmRpdGlvbiBoYXBwZW5zIHRvIGNoYW5nZS5cbiAgICAgIHByb3BhZ2F0ZVZpc2liaWxpdHkoaW5zdGFuY2UsIGNvbnRleHQsIGluc3RhbmNlLnZpc2libGUpO1xuICAgIH1cbiAgICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICBpZiAoaXNGaWVsZEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICB1cGRhdGVGaWx0ZXJlZENob2ljZXMoaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzVGFibGVGaWVsZEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICAgIGNvbnN0IHtub2RlfSA9IGluc3RhbmNlO1xuICAgICAgICAgIGluc3RhbmNlLmNvbnRleHQgPSBjb250ZXh0W25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShpbnN0YW5jZSldIHx8IGNvbnRleHQ7XG4gICAgICAgICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICAgICAgbGV0IGNvbnRyb2xzV2l0aExhYmVsczogW3N0cmluZywgKHN0cmluZyB8IEFqZlRhYmxlRm9ybUNvbnRyb2wpW11dW10gPSBbXTtcbiAgICAgICAgICBjb250cm9sc1dpdGhMYWJlbHMucHVzaChbbm9kZS5sYWJlbCwgbm9kZS5jb2x1bW5MYWJlbHNdKTtcbiAgICAgICAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd3NOdW0gPSBub2RlLnJvd3MubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgcm93SWR4ID0gMDsgcm93SWR4IDwgcm93c051bTsgcm93SWR4KyspIHtcbiAgICAgICAgICAgICAgY29uc3Qgcm93ID0gbm9kZS5yb3dzW3Jvd0lkeF07XG4gICAgICAgICAgICAgIGxldCByOiBBamZUYWJsZUZvcm1Db250cm9sW10gPSBbXTtcbiAgICAgICAgICAgICAgY29uc3QgY2VsbE51bSA9IHJvdy5sZW5ndGg7XG4gICAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGNlbGxOdW07IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSByb3dbaWR4XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNlbGwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICBjZWxsID0ge2Zvcm11bGE6IGNlbGx9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIGV2ZXJ5IGNvbnRyb2wgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBjZWxsIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgaW5zaWRlIHRoZSBmb3JtIGNvbnRyb2wgbWF0cml4XG4gICAgICAgICAgICAgICAgd2l0aCB0aGlzIG1hc2sgYCR7dE5vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke25vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YDtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gKG5vZGUuY29sdW1uVHlwZXMgJiYgbm9kZS5jb2x1bW5UeXBlc1tpZHhdKSB8fCAnbnVtYmVyJztcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJsZUZvcm1Db250cm9sOiBBamZUYWJsZUZvcm1Db250cm9sID0ge1xuICAgICAgICAgICAgICAgICAgY29udHJvbDogbmV3IFVudHlwZWRGb3JtQ29udHJvbCgpLFxuICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPVxuICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuY29udGV4dFtjZWxsLmZvcm11bGFdICYmIHR5cGUgPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgID8gK2luc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXVxuICAgICAgICAgICAgICAgICAgICA6IGluc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXTtcbiAgICAgICAgICAgICAgICB0YWJsZUZvcm1Db250cm9sLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2wobmFtZSwgdGFibGVGb3JtQ29udHJvbC5jb250cm9sKTtcbiAgICAgICAgICAgICAgICByLnB1c2godGFibGVGb3JtQ29udHJvbCk7XG4gICAgICAgICAgICAgICAgLyogY3JlYXRlIGEgb2JqZWN0IHRoYXQgcmVzcGVjdCB0aGUgaW5zdGFuY2UgaW50ZXJmYWNlXG4gICAgICAgICAgICAgICAgd2l0aCB0aGUgbWluaW11bSBkZWZpbmVkIHByb3BlcnRpZXMgdG8gYWxsb3cgdG8gcnVuIGFkZFRvTm9kZUZvcm11bGEgbWFwKi9cbiAgICAgICAgICAgICAgICBjb25zdCBmYWtlSW5zdGFuY2UgPSB7XG4gICAgICAgICAgICAgICAgICBmb3JtdWxhOiB7Zm9ybXVsYTogY2VsbC5mb3JtdWxhfSxcbiAgICAgICAgICAgICAgICAgIG5vZGU6IHtuYW1lLCBub2RlVHlwZTogMCwgZWRpdGFibGU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBwcmVmaXg6IFtdLFxuICAgICAgICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlczogW10sXG4gICAgICAgICAgICAgICAgICB1cGRhdGVkRXZ0OiBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCksXG4gICAgICAgICAgICAgICAgfSBhcyB1bmtub3duIGFzIEFqZk5vZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRUb05vZGVzRm9ybXVsYU1hcChmYWtlSW5zdGFuY2UsIGNlbGwuZm9ybXVsYSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29udHJvbHNXaXRoTGFiZWxzLnB1c2goW25vZGUucm93TGFiZWxzW3Jvd0lkeF0sIHJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlLmNvbnRyb2xzID0gY29udHJvbHNXaXRoTGFiZWxzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnN0YW5jZS52YWx1ZSA9IGNvbnRleHRbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHVwZGF0ZUZpZWxkSW5zdGFuY2VTdGF0ZShpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgfVxuICAgIHRoaXMuX2FkZE5vZGVJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkanVzdCByZXAgc2xpZGUgd2hlbiBhZGQgb3IgcmVtb3ZlIG9uZSdzXG4gICAqIEBwYXJhbSBhbGxOb2RlcyBBbGwgbm9kZXMgb2YgdGhlIGZvcm1cbiAgICogQHBhcmFtIGluc3RhbmNlIEFsbCB0aGUgZXhpc3RpbmcgaW5zdGFuY2UgcmVwc1xuICAgKiBAcGFyYW0gb2xkUmVwcyBUaGUgbnVtYmVyIG9mIGluaXRpYWwgcmVwc1xuICAgKiBAcGFyYW0gY29udGV4dCBUaGUgZm9ybSBjb250ZXh0XG4gICAqIEBwYXJhbSBpZHhUb1JlbW92ZSBUaGUgaW5kZXggb2YgdGhlIHNsaWRlIHRvIGJlIHJlbW92ZWQgKG9wdGlvbmFsLCBkZWZhdWx0IHRvIGxhc3QpXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwcml2YXRlIF9hZGp1c3RSZXBzKFxuICAgIGFsbE5vZGVzOiBBamZOb2RlW10gfCBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBpbnN0YW5jZTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlLFxuICAgIG9sZFJlcHM6IG51bWJlcixcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgIGlkeFRvUmVtb3ZlPzogbnVtYmVyLFxuICApOiB7YWRkZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbDsgcmVtb3ZlZDogQWpmTm9kZUluc3RhbmNlW10gfCBudWxsfSB7XG4gICAgY29uc3QgbmV3UmVwcyA9IGluc3RhbmNlLnJlcHM7XG4gICAgY29uc3QgcmVzdWx0OiB7XG4gICAgICBhZGRlZDogQWpmTm9kZUluc3RhbmNlW10gfCBudWxsO1xuICAgICAgcmVtb3ZlZDogQWpmTm9kZUluc3RhbmNlW10gfCBudWxsO1xuICAgIH0gPSB7XG4gICAgICBhZGRlZDogbnVsbCxcbiAgICAgIHJlbW92ZWQ6IG51bGwsXG4gICAgfTtcbiAgICBpZiAob2xkUmVwcyA8IG5ld1JlcHMpIHtcbiAgICAgIGNvbnN0IG5ld05vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuICAgICAgaWYgKGluc3RhbmNlLm5vZGVzID09IG51bGwpIHtcbiAgICAgICAgaW5zdGFuY2Uubm9kZXMgPSBbXTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXApIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGNyZWF0ZUZpZWxkKHtcbiAgICAgICAgICBpZDogOTk5LFxuICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgIHBhcmVudDogLTEsXG4gICAgICAgICAgZmllbGRUeXBlOiBBamZGaWVsZFR5cGUuRW1wdHksXG4gICAgICAgICAgbGFiZWw6IGluc3RhbmNlLm5vZGUubGFiZWwsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoXG4gICAgICAgICAgYWxsTm9kZXMsXG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICBpbnN0YW5jZS5wcmVmaXguc2xpY2UoMCksXG4gICAgICAgICAgY29udGV4dCxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKG5ld0luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICBpbnN0YW5jZS5ub2Rlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IG9sZFJlcHM7IGkgPCBuZXdSZXBzOyBpKyspIHtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gaW5zdGFuY2UucHJlZml4LnNsaWNlKDApO1xuICAgICAgICBjb25zdCBncm91cCA9IGluc3RhbmNlLm5vZGU7XG4gICAgICAgIHByZWZpeC5wdXNoKGkpO1xuICAgICAgICBjb25zdCBvcmRlcmVkTGlzdE5vZGVzID0gb3JkZXJlZE5vZGVzKGdyb3VwLm5vZGVzLCBpbnN0YW5jZS5ub2RlLmlkKTtcbiAgICAgICAgb3JkZXJlZExpc3ROb2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gdGhpcy5faW5pdE5vZGVJbnN0YW5jZShhbGxOb2RlcywgbiwgcHJlZml4LCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAobmV3SW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICBpbnN0YW5jZS5ub2Rlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9hZGROb2RlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmFkZGVkID0gbmV3Tm9kZXM7XG4gICAgfSBlbHNlIGlmIChvbGRSZXBzID4gbmV3UmVwcykge1xuICAgICAgbGV0IG5vZGVzTnVtID0gaW5zdGFuY2Uubm9kZXMubGVuZ3RoIC8gb2xkUmVwcztcbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXApIHtcbiAgICAgICAgbm9kZXNOdW0rKztcbiAgICAgIH1cblxuICAgICAgcmVzdWx0LnJlbW92ZWQgPSBpbnN0YW5jZS5ub2Rlcy5zcGxpY2UobmV3UmVwcyAqIG5vZGVzTnVtLCBub2Rlc051bSk7XG4gICAgICBjb25zdCBpZHhTbGlkZVRvUmVtb3ZlID0gaWR4VG9SZW1vdmUgPz8gbmV3UmVwcztcbiAgICAgIHJlc3VsdC5yZW1vdmVkLmZvckVhY2gobiA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU5vZGVJbnN0YW5jZShuLCBpZHhTbGlkZVRvUmVtb3ZlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAob2xkUmVwcyAhPSBuZXdSZXBzICYmIGluc3RhbmNlLmZvcm11bGFSZXBzID09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICBjb25zdCBjb21wbGV0ZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpO1xuICAgICAgaWYgKGZnICE9IG51bGwgJiYgZmcuY29udGFpbnMoY29tcGxldGVOYW1lKSkge1xuICAgICAgICBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdLnNldFZhbHVlKGluc3RhbmNlLnJlcHMpO1xuICAgICAgfVxuICAgIH1cbiAgICBpbnN0YW5jZS5mbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXNJbnN0YW5jZXMoaW5zdGFuY2Uubm9kZXMpO1xuICAgIGlmIChpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICBjb25zdCBzbGlkZU5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXVtdID0gW107XG4gICAgICBjb25zdCBub2Rlc1BlclNsaWRlID0gaW5zdGFuY2Uubm9kZXMgIT0gbnVsbCA/IGluc3RhbmNlLm5vZGVzLmxlbmd0aCAvIGluc3RhbmNlLnJlcHMgOiAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0YW5jZS5yZXBzOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3RhcnROb2RlID0gaSAqIG5vZGVzUGVyU2xpZGU7XG4gICAgICAgIC8vIEZsYXR0ZW5lZCwgbGlrZSBgZmxhdE5vZGVzYCBhYm92ZTogYSBub2RlIGdyb3VwIGluc2lkZSB0aGUgc2xpZGUgaXMgYVxuICAgICAgICAvLyBjb250YWluZXIsIGFuZCBpdHMgZmllbGRzIGxpdmUgb25lIGxldmVsIGRvd24uIFNsaWNpbmcgYWxvbmUgd291bGQgaGFuZFxuICAgICAgICAvLyB0aGUgcmVwZXRpdGlvbiB0aGUgZ3JvdXAgaW5zdGFuY2UgaXRzZWxmIC0tIGEgbm9kZSB3aXRoIG5vIGZpZWxkVHlwZSxcbiAgICAgICAgLy8gd2hpY2ggcmVuZGVycyBhcyBhbiB1bmtub3duIGZpZWxkIC0tIGFuZCBub25lIG9mIHRoZSBmaWVsZHMgaXQgaG9sZHMuXG4gICAgICAgIHNsaWRlTm9kZXMucHVzaChcbiAgICAgICAgICBmbGF0dGVuTm9kZXNJbnN0YW5jZXMoaW5zdGFuY2Uubm9kZXMuc2xpY2Uoc3RhcnROb2RlLCBzdGFydE5vZGUgKyBub2Rlc1BlclNsaWRlKSksXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpbnN0YW5jZS5zbGlkZU5vZGVzID0gc2xpZGVOb2RlcztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUZvcm1WYWx1ZUFuZFZhbGlkaXR5KCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzVXBkYXRlc1xuICAgICAgLnBpcGUoXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX2Zvcm1Hcm91cCksXG4gICAgICAgIGZpbHRlcigoW18sIGZnXSkgPT4gZmcgIT09IG51bGwpLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgoW18sIGZnXSkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtID0gZmcgYXMgVW50eXBlZEZvcm1Hcm91cDtcbiAgICAgICAgZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2V4cGxvZGVSZXBlYXRpbmdOb2RlKFxuICAgIGFsbE5vZGVzOiBBamZOb2RlW10gfCBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBpbnN0YW5jZTogQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICkge1xuICAgIGNvbnN0IG9sZFJlcHMgPSB1cGRhdGVSZXBzTnVtKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICBpZiAob2xkUmVwcyAhPT0gaW5zdGFuY2UucmVwcykge1xuICAgICAgdGhpcy5fYWRqdXN0UmVwcyhhbGxOb2RlcywgaW5zdGFuY2UsIG9sZFJlcHMsIGNvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IGFuZCByZXR1cm4gYWxsIGZvcm0gbm9kZXMgaW5zdGFuY2VzLlxuICAgKiBBZGQgdGhlIG5vZGVzIGludG8gdGhlIGZvcm1ncm91cCB3aXRoIF9pbml0Tm9kZUluc3RhbmNlLlxuICAgKiBTdGFydCB0aGUgdmFsdWVDaGFuZ2VzIGZvciB0aGUgZm9ybWdyb3VwLlxuICAgKiBAcGFyYW0gYWxsTm9kZXMgYWxsIGZsYXR0ZW4gbm9kZXMgZGkgYmFzZSBub2Rlc1xuICAgKiBAcGFyYW0gbm9kZXMgYmFzZSBub2Rlc1xuICAgKiBAcGFyYW0gcGFyZW50IHN0YXJ0IHdpdGggdW5kZWZpbmVkXG4gICAqIEBwYXJhbSBwcmVmaXhcbiAgICogQHBhcmFtIGNvbnRleHQgdGhlIGZvcm0gZGF0YSBjb250ZXh0XG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBwcml2YXRlIF9vcmRlcmVkTm9kZXNJbnN0YW5jZXNUcmVlKFxuICAgIGFsbE5vZGVzOiBBamZOb2RlW10gfCBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlczogQWpmTm9kZVtdLFxuICAgIHBhcmVudDogbnVtYmVyIHwgbnVsbCA9IG51bGwsXG4gICAgcHJlZml4OiBudW1iZXJbXSA9IFtdLFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICk6IEFqZk5vZGVJbnN0YW5jZVtdIHtcbiAgICBsZXQgbm9kZXNJbnN0YW5jZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gICAgY29uc3QgY3VyU3VmZml4ID0gcHJlZml4Lmxlbmd0aCA+IDAgPyAnX18nICsgcHJlZml4LmpvaW4oJ19fJykgOiAnJztcbiAgICBvcmRlcmVkTm9kZXMobm9kZXMsIHBhcmVudCkuZm9yRWFjaCgobm9kZTogQWpmTm9kZSkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50Tm9kZUluc3RhbmNlID0gbm9kZXNJbnN0YW5jZXMuZmluZChcbiAgICAgICAgbmkgPT4gbmkubm9kZS5pZCA9PSBub2RlLnBhcmVudCAmJiBub2RlSW5zdGFuY2VTdWZmaXgobmkpID09IGN1clN1ZmZpeCxcbiAgICAgICk7XG4gICAgICBjb25zdCBicmFuY2hWaXNpYmlsaXR5ID1cbiAgICAgICAgcGFyZW50Tm9kZUluc3RhbmNlICE9IG51bGxcbiAgICAgICAgICA/IHBhcmVudE5vZGVJbnN0YW5jZS52ZXJpZmllZEJyYW5jaCAhPSBudWxsICYmXG4gICAgICAgICAgICBwYXJlbnROb2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2ggPT0gbm9kZS5wYXJlbnROb2RlXG4gICAgICAgICAgOiB0cnVlO1xuICAgICAgY29uc3Qgbm5pID0gdGhpcy5faW5pdE5vZGVJbnN0YW5jZShhbGxOb2Rlcywgbm9kZSwgcHJlZml4LCBjb250ZXh0LCBicmFuY2hWaXNpYmlsaXR5KTtcbiAgICAgIGlmIChubmkgIT0gbnVsbCkge1xuICAgICAgICBub2Rlc0luc3RhbmNlcy5wdXNoKG5uaSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5vZGVzSW5zdGFuY2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybVZhbHVlRGVsdGEob2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBhbGxLZXlzID0gW10gYXMgc3RyaW5nW107XG4gICAgWy4uLk9iamVjdC5rZXlzKG9sZFZhbHVlKSwgLi4uT2JqZWN0LmtleXMobmV3VmFsdWUpXS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5ICE9PSAnJHZhbHVlJyAmJiBhbGxLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgYWxsS2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGFsbEtleXMuZmlsdGVyKGsgPT4gb2xkVmFsdWVba10gIT09IG5ld1ZhbHVlW2tdKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0IHRoZSBmb3JtR3JvdXAgdmFsdWVDaGFuZ2VzIHN0cmVhbSwgdGhhdCByZS1yZW5kZXIgdGhlIGZvcm0gb24gdmFsdWVDaGFuZ2VzXG4gICAqIEBwYXJhbSBmb3JtR3JvdXAgYW4gaW5pdGlhbCBlbXB0eSBGb3JtIEdyb3VwXG4gICAqIEByZXR1cm5zIFRoZSBuZXcgRm9ybUdyb3VwXG4gICAqL1xuICBwcml2YXRlIF9pbml0Rm9ybUdyb3VwU3RyZWFtcyhmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXApOiBVbnR5cGVkRm9ybUdyb3VwIHtcbiAgICB0aGlzLl9mb3JtR3JvdXBTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBsZXQgaW5pdCA9IHRydWU7XG4gICAgbGV0IGluaXRGb3JtID0gdHJ1ZTtcbiAgICB0aGlzLl9mb3JtSW5pdEV2ZW50LmVtaXQoQWpmRm9ybUluaXRTdGF0dXMuSW5pdGlhbGl6aW5nKTtcbiAgICB0aGlzLl9mb3JtR3JvdXBTdWJzY3JpcHRpb24gPSBmb3JtR3JvdXAudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgICAgcGFpcndpc2UoKSxcbiAgICAgICAgd2l0aExhdGVzdEZyb20oXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzBdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1sxXSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbMl0sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzNdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1s0XSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbNV0sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzZdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1s3XSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbOF0sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzldLFxuICAgICAgICAgIHRoaXMuX2ZsYXROb2RlcyxcbiAgICAgICAgKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodiA9PiB7XG4gICAgICAgIGNvbnN0IG9sZEZvcm1WYWx1ZSA9IChpbml0ICYmIHt9KSB8fCB2WzBdWzBdO1xuICAgICAgICBpbml0ID0gZmFsc2U7XG4gICAgICAgIGxldCBuZXdGb3JtVmFsdWUgPSB2WzBdWzFdO1xuICAgICAgICBjb25zdCBlZGl0YWJpbGl0eSA9IHZbMV07XG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHlNYXAgPSB2WzJdO1xuICAgICAgICBjb25zdCByZXBldGl0aW9uTWFwID0gdlszXTtcbiAgICAgICAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlc01hcCA9IHZbNF07XG4gICAgICAgIGNvbnN0IGZvcm11bGFNYXAgPSB2WzVdO1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWFwID0gdls2XTtcbiAgICAgICAgY29uc3Qgd2FybmluZ01hcCA9IHZbN107XG4gICAgICAgIGNvbnN0IG5leHRTbGlkZUNvbmRpdGlvbnNNYXAgPSB2WzhdO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZENob2ljZXNNYXAgPSB2WzldO1xuICAgICAgICBjb25zdCB0cmlnZ2VyQ29uZGl0aW9uc01hcCA9IHZbMTBdO1xuICAgICAgICBjb25zdCBub2RlcyA9IHZbMTFdO1xuXG4gICAgICAgIC8vIHRha2VzIHRoZSBuYW1lcyBvZiB0aGUgZmllbGRzIHRoYXQgaGF2ZSBjaGFuZ2VkXG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5fZm9ybVZhbHVlRGVsdGEob2xkRm9ybVZhbHVlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICBjb25zdCBkZWx0YUxlbiA9IGRlbHRhLmxlbmd0aDtcbiAgICAgICAgbGV0IHVwZGF0ZWROb2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcblxuICAgICAgICAvKlxuICAgICAgICAgIGZvciBlYWNoIGZpZWxkIHVwZGF0ZSBhbGwgcHJvcGVydGllcyBtYXBcbiAgICAgICAgICB3aXRoIHRoZSBydWxlIFwiaWYgZmllbGRuYW1lIGlzIGluIG1hcCB1cGRhdGUgaXRcIiBhbmRcbiAgICAgICAgICBwdXNoIG9uIHVwZGF0ZU5vZGVzIHRoZSBub2RlIGluc3RhbmNlIHRoYXQgd3JhcCBmaWVsZFxuICAgICAgICAqL1xuICAgICAgICBkZWx0YS5mb3JFYWNoKGZpZWxkTmFtZSA9PiB7XG4gICAgICAgICAgdXBkYXRlZE5vZGVzID0gdXBkYXRlZE5vZGVzLmNvbmNhdChcbiAgICAgICAgICAgIG5vZGVzLmZpbHRlcihuID0+IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShuKSA9PT0gZmllbGROYW1lKSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChlZGl0YWJpbGl0eVtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGVkaXRhYmlsaXR5W2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICBpZiAoaXNTbGlkZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkgfHwgaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVFZGl0YWJpbGl0eU1hcEVudHJ5KG5vZGVJbnN0YW5jZSwgdGhpcy5fZm9ybUdyb3VwLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmlzaWJpbGl0eU1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZpc2liaWxpdHlNYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgIHVwZGF0ZVZpc2liaWxpdHlNYXBFbnRyeShub2RlSW5zdGFuY2UsIHRoaXMuX2Zvcm1Hcm91cCwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgbmV3Rm9ybVZhbHVlID1cbiAgICAgICAgICAgICAgICB0aGlzLl9mb3JtR3JvdXAgJiYgdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCkgIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgPyB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKT8udmFsdWVcbiAgICAgICAgICAgICAgICAgIDogbmV3Rm9ybVZhbHVlO1xuICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmVwZXRpdGlvbk1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJlcGV0aXRpb25NYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgIHVwZGF0ZVJlcGV0aXRpb25NYXBFbnRyeShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSwgbm9kZXMsIHRoaXMuX2FkanVzdFJlcHMpO1xuICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoY29uZGl0aW9uYWxCcmFuY2hlc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbmRpdGlvbmFsQnJhbmNoZXNNYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgIHVwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXNNYXBFbnRyeShcbiAgICAgICAgICAgICAgICBub2RlSW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgbmV3Rm9ybVZhbHVlLFxuICAgICAgICAgICAgICAgIG5vZGVzLFxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dTdWJ0cmVlLFxuICAgICAgICAgICAgICAgIHRoaXMuX2hpZGVTdWJ0cmVlLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZm9ybXVsYU1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZvcm11bGFNYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgIHVwZGF0ZUZvcm11bGFNYXBFbnRyeShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSwgdGhpcy5fZm9ybUdyb3VwKTtcbiAgICAgICAgICAgICAgbmV3Rm9ybVZhbHVlID1cbiAgICAgICAgICAgICAgICB0aGlzLl9mb3JtR3JvdXAgJiYgdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCkgIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgPyB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKT8udmFsdWVcbiAgICAgICAgICAgICAgICAgIDogbmV3Rm9ybVZhbHVlO1xuICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodmFsaWRhdGlvbk1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25NYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgIHVwZGF0ZVZhbGlkYXRpb25NYXBFbnRyeShcbiAgICAgICAgICAgICAgICBub2RlSW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgbmV3Rm9ybVZhbHVlLFxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh3YXJuaW5nTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgd2FybmluZ01hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlV2FybmluZ01hcEVudHJ5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGRlbHRhTGVuID09IDEgJiYgbmV4dFNsaWRlQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbmV4dFNsaWRlQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdLmZpbHRlcihub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZU5leHRTbGlkZUNvbmRpdGlvbihub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfSkubGVuZ3RoID09IDFcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLl9uZXh0U2xpZGVUcmlnZ2VyLmVtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZmlsdGVyZWRDaG9pY2VzTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZmlsdGVyZWRDaG9pY2VzTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVGaWx0ZXJlZENob2ljZXNNYXBFbnRyeShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChkZWx0YUxlbiA9PSAxICYmIHRyaWdnZXJDb25kaXRpb25zTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gdHJpZ2dlckNvbmRpdGlvbnNNYXBbZmllbGROYW1lXS5maWx0ZXIobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB1cGRhdGVUcmlnZ2VyQ29uZGl0aW9ucyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID09IDEgJiYgaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UocmVzWzBdKSkge1xuICAgICAgICAgICAgICByZXNbMF0uc2VsZWN0aW9uVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdXBkYXRlZE5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgICAgICAgY29uc3Qgbm9kZUlkeCA9IG5vZGVzLmluZGV4T2Yobik7XG4gICAgICAgICAgbGV0IGlkeCA9IG5vZGVJZHggLSAxO1xuICAgICAgICAgIC8vIEZpbmQgYW5kIHVwZGF0ZSB0aGUgdmFsaWRpdHkgZm9yIHRoZSBub2RlJ3Mgc2xpZGVcbiAgICAgICAgICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIGNvbnN0IGN1ck5vZGUgPSBub2Rlc1tpZHhdO1xuICAgICAgICAgICAgaWYgKGlzU2xpZGVzSW5zdGFuY2UoY3VyTm9kZSkpIHtcbiAgICAgICAgICAgICAgdXBkYXRlU2xpZGVWYWxpZGl0eShjdXJOb2RlKTtcbiAgICAgICAgICAgICAgY3VyTm9kZS51cGRhdGVkRXZ0LmVtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBNYXJrIGZvciBjaGVjayB0aGUgQWpmRm9ybUZpZWxkXG4gICAgICAgICAgbi51cGRhdGVkRXZ0LmVtaXQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpbml0Rm9ybSkge1xuICAgICAgICAgIGluaXRGb3JtID0gZmFsc2U7XG4gICAgICAgICAgdGhpcy5fZm9ybUluaXRFdmVudC5lbWl0KEFqZkZvcm1Jbml0U3RhdHVzLkNvbXBsZXRlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZWQubmV4dCgpO1xuICAgICAgfSk7XG4gICAgcmV0dXJuIGZvcm1Hcm91cDtcbiAgfVxuXG4gIHByaXZhdGUgX3Nob3dTdWJ0cmVlKFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBicmFuY2g/OiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBub2RlLCB0cnVlLCBicmFuY2gpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZVN1YnRyZWUoXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICBub2RlczogQWpmTm9kZUluc3RhbmNlW10sXG4gICAgbm9kZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGJyYW5jaD86IG51bWJlcixcbiAgKSB7XG4gICAgdGhpcy5fdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoY29udGV4dCwgbm9kZXMsIG5vZGUsIGZhbHNlLCBicmFuY2gpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICBub2RlczogQWpmTm9kZUluc3RhbmNlW10sXG4gICAgbm9kZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIHZpc2libGU6IGJvb2xlYW4sXG4gICAgYnJhbmNoPzogbnVtYmVyLFxuICApIHtcbiAgICBsZXQgc3ViTm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdO1xuICAgIGNvbnN0IG5vZGVTdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobm9kZSk7XG4gICAgaWYgKGJyYW5jaCAhPSBudWxsKSB7XG4gICAgICBzdWJOb2RlcyA9IG5vZGVzLmZpbHRlcihuID0+IHtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG4pO1xuICAgICAgICByZXR1cm4gc3VmZml4ID09IG5vZGVTdWZmaXggJiYgbi5ub2RlLnBhcmVudCA9PSBub2RlLm5vZGUuaWQgJiYgbi5ub2RlLnBhcmVudE5vZGUgPT0gYnJhbmNoO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1Yk5vZGVzID0gbm9kZXMuZmlsdGVyKG4gPT4ge1xuICAgICAgICBjb25zdCBzdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobik7XG4gICAgICAgIHJldHVybiBzdWZmaXggPT0gbm9kZVN1ZmZpeCAmJiBuLm5vZGUucGFyZW50ID09IG5vZGUubm9kZS5pZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBpc0NvbnRhaW5lciA9IGlzQ29udGFpbmVyTm9kZShub2RlLm5vZGUpO1xuICAgIHN1Yk5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgICFpc0NvbnRhaW5lciB8fFxuICAgICAgICAoaXNDb250YWluZXIgJiYgKDxBamZOb2RlR3JvdXA+bm9kZS5ub2RlKS5ub2Rlcy5maW5kKGNuID0+IGNuLmlkID09IG4ubm9kZS5pZCkgPT0gbnVsbClcbiAgICAgICkge1xuICAgICAgICB1cGRhdGVWaXNpYmlsaXR5KG4sIGNvbnRleHQsIHZpc2libGUpO1xuICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG4pKSB7XG4gICAgICAgICAgdXBkYXRlRm9ybXVsYShuLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShjb250ZXh0LCBub2RlcywgbiwgdmlzaWJsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW5pdCBzdHJlYW0gZm9yIHRoZSBmb3JtIGZsYXQgbm9kZXMuXG4gICAqIFN0cmVhbSBzdGFydHMgd2hlbiBfaW5pdEZvcm1TdHJlYW1zIHNldCB0aGUgX25vZGVzVXBkYXRlc1xuICAgKi9cbiAgcHJpdmF0ZSBfaW5pdE5vZGVzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2RlcyA9IHRoaXMuX25vZGVzVXBkYXRlcy5waXBlKFxuICAgICAgc2Nhbigobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBvcDogQWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKG5vZGVzKTtcbiAgICAgIH0sIFtdKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9mbGF0Tm9kZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgIG1hcChub2RlcyA9PiBmbGF0dGVuTm9kZXNJbnN0YW5jZXNUcmVlKG5vZGVzKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fZmxhdE5vZGVzID0gdGhpcy5fZmxhdE5vZGVzVHJlZS5waXBlKFxuICAgICAgbWFwKHNsaWRlcyA9PiB7XG4gICAgICAgIGxldCBub2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICAgICAgc2xpZGVzLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgbm9kZXMucHVzaChzKTtcbiAgICAgICAgICBub2RlcyA9IG5vZGVzLmNvbmNhdChzLmZsYXROb2Rlcyk7XG4gICAgICAgICAgdXBkYXRlU2xpZGVWYWxpZGl0eShzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pLFxuICAgICAgdGFwKF8gPT4ge1xuICAgICAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgICAgY29uc3QgaW5pdGlhbGl6ZWRGaWVsZCA9ICckbm9kZXNJbml0aWFsaXNlZCc7XG4gICAgICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCAmJiAhZm9ybUdyb3VwLmNvbnRhaW5zKGluaXRpYWxpemVkRmllbGQpKSB7XG4gICAgICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woKTtcbiAgICAgICAgICBjb250cm9sLnNldFZhbHVlKHRydWUpO1xuICAgICAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2woaW5pdGlhbGl6ZWRGaWVsZCwgY29udHJvbCk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYSByZXBlYXRlZCBub2RlIGluc3RhbmNlIGZyb20gdGhlIGZvcm0uXG4gICAqXG4gICAqIFRoaXMgbWV0aG9kIHJlbW92ZXMgdGhlIG5vZGUgaW5zdGFuY2UgYXQgdGhlIHNwZWNpZmllZCByZXBldGl0aW9uIGluZGV4LlxuICAgKiBJZiB0aGUgcmVtb3ZlZCBpbnN0YW5jZSBpcyBub3QgdGhlIGxhc3Qgb25lLCBpdCBzaGlmdHMgYWxsIHN1YnNlcXVlbnRcbiAgICogaW5zdGFuY2VzIHVwIGJ5IG9uZSBwb3NpdGlvbiB0byBrZWVwIHRoZSBzZXF1ZW5jZSBjb250aWd1b3VzLCBhbmQgdGhlblxuICAgKiBjbGVhcnMgdGhlIGZpbmFsIChub3cgZHVwbGljYXRlZCkgaW5zdGFuY2UuXG4gICAqXG4gICAqIEl0IGFsc28gdXBkYXRlcyBhbGwgaW50ZXJuYWwgdHJhY2tpbmcgbWFwcyAodmlzaWJpbGl0eSwgdmFsaWRhdGlvbiwgZm9ybXVsYXMsXG4gICAqIHdhcm5pbmdzLCBjb25kaXRpb25zLCBldGMuKSB0byByZW1vdmUgcmVmZXJlbmNlcyB0byB0aGUgZGVsZXRlZCBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0gbm9kZUluc3RhbmNlIFRoZSBub2RlIGluc3RhbmNlIHRvIHJlbW92ZSAoYWx3YXlzIGNvcnJlc3BvbmRzIHRvIHRoZSBsYXN0IHJlcGV0aXRpb24gaW5kZXgpLlxuICAgKiBAcGFyYW0gaWR4VG9SZW1vdmUgVGhlIGluZGV4IG9mIHRoZSByZXBlYXRlZCBpbnN0YW5jZSB0byBkZWxldGUuXG4gICAqIEByZXR1cm5zIFRoZSByZW1vdmVkIG5vZGUgaW5zdGFuY2UuXG4gICAqL1xuICBwcml2YXRlIF9yZW1vdmVOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGlkeFRvUmVtb3ZlOiBudW1iZXIpOiBBamZOb2RlSW5zdGFuY2Uge1xuICAgIGNvbnN0IG5vZGVOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSk7XG4gICAgY29uc3QgZmcgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBpZiAoZmcgIT0gbnVsbCkge1xuICAgICAgY29uc3QgY3VyVmFsdWUgPSBmZy52YWx1ZTtcblxuICAgICAgY29uc3QgbWF4SWR4ID0gbm9kZUluc3RhbmNlLnByZWZpeCA/IG5vZGVJbnN0YW5jZS5wcmVmaXhbMF0gOiAzMDtcbiAgICAgIGxldCBuZXdGb3JtVmFsdWUgPSB7Li4uY3VyVmFsdWV9O1xuICAgICAgY29uc3QgYmFzZU5vZGVOYW1lID0gbm9kZUluc3RhbmNlLm5vZGUubmFtZTtcbiAgICAgIGZvciAobGV0IGkgPSBpZHhUb1JlbW92ZTsgaSA8IG1heElkeDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGN1cnJJbnN0YW5jZUNvbXBsZXRlTmFtZSA9IGAke2Jhc2VOb2RlTmFtZX1fXyR7aX1gO1xuICAgICAgICBjb25zdCBuZXh0SW5zdGFuY2VDb21wbGV0ZU5hbWUgPSBgJHtiYXNlTm9kZU5hbWV9X18ke2kgKyAxfWA7XG4gICAgICAgIG5ld0Zvcm1WYWx1ZVtjdXJySW5zdGFuY2VDb21wbGV0ZU5hbWVdID0gbmV3Rm9ybVZhbHVlW25leHRJbnN0YW5jZUNvbXBsZXRlTmFtZV07XG4gICAgICB9XG5cbiAgICAgIG5ld0Zvcm1WYWx1ZSA9IHsuLi5uZXdGb3JtVmFsdWUsIFtub2RlTmFtZV06IHVuZGVmaW5lZH07XG4gICAgICBmZy5wYXRjaFZhbHVlKG5ld0Zvcm1WYWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZU5vZGVzVmlzaWJpbGl0eU1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1JlcGV0aXRpb25NYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc0Zvcm11bGFNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNWYWxpZGF0aW9uTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzV2FybmluZ01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNGaWx0ZXJlZENob2ljZXNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVOb2Rlc0VkaXRhYmlsaXR5TWFwSW5kZXgobm9kZU5hbWUpO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbW92ZVNsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHRoaXMuX3JlbW92ZU5vZGVHcm91cEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVTbGlkZUluc3RhbmNlKHNsaWRlSW5zdGFuY2U6IEFqZkJhc2VTbGlkZUluc3RhbmNlKTogQWpmQmFzZVNsaWRlSW5zdGFuY2Uge1xuICAgIGNvbnN0IHNsaWRlID0gc2xpZGVJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChzbGlkZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAoc2xpZGVJbnN0YW5jZSwgc2xpZGUudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBzbGlkZUluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoc2xpZGVJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2xpZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVHcm91cEluc3RhbmNlKFxuICAgIG5vZGVHcm91cEluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UsXG4gICk6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZUdyb3VwID0gbm9kZUdyb3VwSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAobm9kZUdyb3VwLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgaWYgKG5vZGVHcm91cEluc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwgJiYgbm9kZUdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGVHcm91cEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRmllbGRJbnN0YW5jZShmaWVsZEluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgY29uc3QgZmllbGRJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGRJbnN0YW5jZSk7XG4gICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmIGZvcm1Hcm91cC5jb250YWlucyhmaWVsZEluc3RhbmNlTmFtZSkpIHtcbiAgICAgIGZvcm1Hcm91cC5yZW1vdmVDb250cm9sKGZpZWxkSW5zdGFuY2VOYW1lKTtcbiAgICB9XG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICBpZiAodm1hcFtmaWVsZEluc3RhbmNlTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgIGRlbGV0ZSB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnJlYWRvbmx5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0VkaXRhYmlsaXR5TWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UucmVhZG9ubHkuY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgZmllbGRJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5mb3JtdWxhKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNGb3JtdWxhTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuZm9ybXVsYS5mb3JtdWxhKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBjaGVjayB0aGlzLCBwcm9iYWJseSBpcyBuZXZlciB2ZXJpZmllZFxuICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZShmaWVsZEluc3RhbmNlKSkge1xuICAgICAgaWYgKGZpZWxkSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNSZXBldGl0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsICYmIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zLmZvckVhY2goY29uZGl0aW9uID0+IHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmFsaWRhdGlvbk1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS53YXJuaW5nLmNvbmRpdGlvbnMuZm9yRWFjaChjb25kaXRpb24gPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNXYXJuaW5nTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAoXG4gICAgICAgIGZpZWxkSW5zdGFuY2UsXG4gICAgICAgIGZpZWxkSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uLmNvbmRpdGlvbixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKGZpZWxkSW5zdGFuY2UpKSB7XG4gICAgICBpZiAoZmllbGRJbnN0YW5jZS5jaG9pY2VzRmlsdGVyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuY2hvaWNlc0ZpbHRlci5mb3JtdWxhKTtcbiAgICAgICAgaWYgKGZpZWxkSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgIGZpZWxkSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMuZm9yRWFjaChjb25kaXRpb24gPT4ge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGRJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZE5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSk6IEFqZk5vZGVJbnN0YW5jZSB7XG4gICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hZGROb2RlR3JvdXBJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNTbGlkZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hZGRTbGlkZUluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZEZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZUluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBmaWVsZCBpbnN0YW5jZSBhcyBjb250cm9sIGluIGZvcm1Hcm91cFxuICAgKiBBZGQgZmllbGQgaW5zdGFuY2UgaW4gYWxsIHVwZGF0ZSBtYXBzIChOb2Rlc0VkaXRhYmlsaXR5TWFwLCBOb2Rlc1Zpc2liaWxpdHlNYXAsIC4uLilcbiAgICogQHBhcmFtIGZpZWxkSW5zdGFuY2VcbiAgICogQHJldHVybnNcbiAgICovXG4gIHByaXZhdGUgX2FkZEZpZWxkSW5zdGFuY2UoZmllbGRJbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSk6IEFqZkZpZWxkSW5zdGFuY2Uge1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGNvbnN0IGZpZWxkSW5zdGFuY2VOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGZpZWxkSW5zdGFuY2UpO1xuICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCAmJiAhZm9ybUdyb3VwLmNvbnRhaW5zKGZpZWxkSW5zdGFuY2VOYW1lKSkge1xuICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBVbnR5cGVkRm9ybUNvbnRyb2woKTtcbiAgICAgIGNvbnRyb2wuc2V0VmFsdWUoZmllbGRJbnN0YW5jZS52YWx1ZSk7XG4gICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKGZpZWxkSW5zdGFuY2VOYW1lLCBjb250cm9sKTtcbiAgICB9XG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICBpZiAodm1hcFtmaWVsZEluc3RhbmNlTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgIHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdLmluZGV4T2YoZmllbGRJbnN0YW5jZSkgPT0gLTEpIHtcbiAgICAgICAgICB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXS5wdXNoKGZpZWxkSW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkSW5zdGFuY2UudmFsaWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnJlYWRvbmx5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNFZGl0YWJpbGl0eU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLnJlYWRvbmx5LmNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBmaWVsZEluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5mb3JtdWxhKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzRm9ybXVsYU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmZvcm11bGEuZm9ybXVsYSk7XG4gICAgfVxuXG4gICAgaWYgKGlzTm9kZUdyb3VwSW5zdGFuY2UoZmllbGRJbnN0YW5jZSkpIHtcbiAgICAgIGlmIChmaWVsZEluc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1JlcGV0aXRpb25NYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwgJiYgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMuZm9yRWFjaChjb25kaXRpb24gPT4ge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzVmFsaWRhdGlvbk1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS53YXJuaW5nLmNvbmRpdGlvbnMuZm9yRWFjaChjb25kaXRpb24gPT4ge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzV2FybmluZ01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChcbiAgICAgICAgZmllbGRJbnN0YW5jZSxcbiAgICAgICAgZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24uY29uZGl0aW9uLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UoZmllbGRJbnN0YW5jZSkpIHtcbiAgICAgIGlmIChmaWVsZEluc3RhbmNlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuY2hvaWNlc0ZpbHRlci5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZEluc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgZmllbGRJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb246IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgICAgIHRoaXMuX2FkZFRvTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkSW5zdGFuY2U7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHNsaWRlIGluc3RhbmNlIGluIGFsbCB1cGRhdGUgbWFwcyAoTm9kZXNFZGl0YWJpbGl0eU1hcCwgTm9kZXNWaXNpYmlsaXR5TWFwLCBOb2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKVxuICAgKiBAcGFyYW0gc2xpZGVJbnN0YW5jZVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgcHJpdmF0ZSBfYWRkU2xpZGVJbnN0YW5jZShzbGlkZUluc3RhbmNlOiBBamZTbGlkZUluc3RhbmNlKTogQWpmU2xpZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgc2xpZGUgPSBzbGlkZUluc3RhbmNlLm5vZGU7XG4gICAgaWYgKHNsaWRlLnJlYWRvbmx5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNFZGl0YWJpbGl0eU1hcChzbGlkZUluc3RhbmNlLCBzbGlkZS5yZWFkb25seS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBpZiAoc2xpZGUudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChzbGlkZUluc3RhbmNlLCBzbGlkZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIHNsaWRlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoc2xpZGVJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2xpZGVJbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgcmVwZWF0aW5nIHNsaWRlIGluc3RhbmNlIGluIGFsbCB1cGRhdGUgbWFwc1xuICAgKiBAcGFyYW0gbm9kZUdyb3VwSW5zdGFuY2VcbiAgICogQHJldHVybnNcbiAgICovXG4gIHByaXZhdGUgX2FkZE5vZGVHcm91cEluc3RhbmNlKFxuICAgIG5vZGVHcm91cEluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UsXG4gICk6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZUdyb3VwID0gbm9kZUdyb3VwSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAobm9kZUdyb3VwLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIG5vZGVHcm91cEluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKG5vZGVHcm91cEluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuICAgIGlmIChub2RlR3JvdXBJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICBpZiAobm9kZUdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgbGV0IG5vZGVHcm91cEluc3RhbmNlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlR3JvdXBJbnN0YW5jZSk7XG4gICAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgIWZvcm1Hcm91cC5jb250YWlucyhub2RlR3JvdXBJbnN0YW5jZU5hbWUpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKCk7XG4gICAgICAgIGNvbnRyb2wuc2V0VmFsdWUobm9kZUdyb3VwSW5zdGFuY2UucmVwcyk7XG4gICAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2wobm9kZUdyb3VwSW5zdGFuY2VOYW1lLCBjb250cm9sKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVHcm91cEluc3RhbmNlO1xuICB9XG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzRWRpdGFiaWxpdHlNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9lZGl0YWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzVmlzaWJpbGl0eU1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzUmVwZXRpdGlvbk1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNGb3JtdWxhTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNWYWxpZGF0aW9uTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNXYXJuaW5nTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNGaWx0ZXJlZENob2ljZXNNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNNYXBJbmRleChub2Rlc01hcDogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4sIGluZGV4OiBzdHJpbmcpIHtcbiAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh2bWFwKS5pbmRleE9mKGluZGV4KSA+IC0xKSB7XG4gICAgICAgIGRlbGV0ZSB2bWFwW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2bWFwO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzRWRpdGFiaWxpdHlNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9lZGl0YWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzUmVwZXRpdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChcbiAgICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBmb3JtdWxhOiBzdHJpbmcsXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0Zvcm11bGFNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzVmFsaWRhdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNXYXJuaW5nTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKFxuICAgIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGZvcm11bGE6IHN0cmluZyxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAoXG4gICAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgZm9ybXVsYTogc3RyaW5nLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc01hcChcbiAgICBub2Rlc01hcDogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4sXG4gICAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgZm9ybXVsYTogc3RyaW5nLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCBuYW1lcyA9IGdldEFyZ3VtZW50TmFtZXMoZm9ybXVsYSk7XG4gICAgbmFtZXMuZGVsZXRlKCckdmFsdWUnKTtcbiAgICBpZiAobmFtZXMuc2l6ZSA+IDApIHtcbiAgICAgIG5vZGVzTWFwLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2YgbmFtZXMpIHtcbiAgICAgICAgICBpZiAodm1hcFtuYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB2bWFwW25hbWVdLmluZGV4T2Yobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgICB2bWFwW25hbWVdLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICBpZiAodm1hcFtuYW1lXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB2bWFwW25hbWVdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0VkaXRhYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2VkaXRhYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzRm9ybXVsYU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1ZhbGlkYXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNXYXJuaW5nTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzTWFwKFxuICAgIG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPixcbiAgICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBmb3JtdWxhOiBzdHJpbmcsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IG5hbWVzID0gZ2V0QXJndW1lbnROYW1lcyhmb3JtdWxhKTtcbiAgICBuYW1lcy5kZWxldGUoJyR2YWx1ZScpO1xuICAgIGlmIChuYW1lcy5zaXplID4gMCkge1xuICAgICAgbm9kZXNNYXAubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBuYW1lcykge1xuICAgICAgICAgIGlmICh2bWFwW25hbWVdID09IG51bGwpIHtcbiAgICAgICAgICAgIHZtYXBbbmFtZV0gPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZtYXBbbmFtZV0uaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgdm1hcFtuYW1lXS5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVXBkYXRlIGVkaXRhYmlsaXR5IGZvciBhIHNsaWRlIG9yIGEgZmllbGQgaWYgZWRpdGFiaWxpdHkgaXMgY2hhbmdlZC5cbiAqIEBwYXJhbSBub2RlSW5zdGFuY2VcbiAqIEBwYXJhbSBmb3JtR3JvdXBcbiAqIEBwYXJhbSBuZXdGb3JtVmFsdWVcbiAqL1xuY29uc3QgdXBkYXRlRWRpdGFiaWxpdHlNYXBFbnRyeSA9IChcbiAgbm9kZUluc3RhbmNlOiBBamZTbGlkZUluc3RhbmNlIHwgQWpmRmllbGRJbnN0YW5jZSxcbiAgZm9ybUdyb3VwOiBCZWhhdmlvclN1YmplY3Q8VW50eXBlZEZvcm1Hcm91cCB8IG51bGw+LFxuICBuZXdGb3JtVmFsdWU6IGFueSxcbikgPT4ge1xuICB1cGRhdGVFZGl0YWJpbGl0eShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB2aXNpYmlsaXR5IGZvciBhIHNsaWRlIG9yIGEgZmllbGQgaWYgdmlzaWJpbGl0eSBpcyBjaGFuZ2VkLlxuICogU2V0IHZhbHVlIHRvIG51bGwgZm9yIG5vbi12aXNpYmxlIGZpZWxkXG4gKiBSZS1zZXQgZGVmYXVsdCB2YWx1ZSBmb3IgZmllbGRzIG9yIGZvciBjaGlsZCBmaWVsZHMgZm9yIGEgY29udGFpbmVyIG5vZGVcbiAqIEBwYXJhbSBub2RlSW5zdGFuY2VcbiAqIEBwYXJhbSBmb3JtR3JvdXBcbiAqIEBwYXJhbSBuZXdGb3JtVmFsdWVcbiAqL1xuY29uc3QgdXBkYXRlVmlzaWJpbGl0eU1hcEVudHJ5ID0gKFxuICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgZm9ybUdyb3VwOiBCZWhhdmlvclN1YmplY3Q8VW50eXBlZEZvcm1Hcm91cCB8IG51bGw+LFxuICBuZXdGb3JtVmFsdWU6IGFueSxcbikgPT4ge1xuICBjb25zdCBjb21wbGV0ZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKTtcbiAgY29uc3QgdmlzaWJpbGl0eUNoYW5nZWQgPSB1cGRhdGVWaXNpYmlsaXR5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgY29uc3QgaXNGaWVsZCA9IGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICBpZiAodmlzaWJpbGl0eUNoYW5nZWQgJiYgaXNOb2RlR3JvdXBJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgcHJvcGFnYXRlVmlzaWJpbGl0eShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSwgbm9kZUluc3RhbmNlLnZpc2libGUpO1xuICB9XG4gIGlmICh2aXNpYmlsaXR5Q2hhbmdlZCAmJiAhbm9kZUluc3RhbmNlLnZpc2libGUpIHtcbiAgICBjb25zdCBmZyA9IGZvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGlmIChmZyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBzID0gdGltZXIoMjAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBpZiAocyAmJiAhcy5jbG9zZWQpIHtcbiAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZnLmNvbnRyb2xzICE9IG51bGwgJiYgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChpc0ZpZWxkKSB7XG4gICAgICBub2RlSW5zdGFuY2UudmFsdWUgPSBudWxsO1xuICAgIH1cbiAgfSBlbHNlIGlmICh2aXNpYmlsaXR5Q2hhbmdlZCAmJiBub2RlSW5zdGFuY2UudmlzaWJsZSkge1xuICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgaWYgKGlzRmllbGQpIHtcbiAgICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUsIHRydWUpO1xuICAgICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQgJiYgZmcuY29udHJvbHMgIT0gbnVsbCAmJiBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShyZXMudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgbm9kZUluc3RhbmNlLm5vZGVzPy5mb3JFYWNoKG4gPT4ge1xuICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG4pKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgbi5ub2RlLmRlZmF1bHRWYWx1ZSAhPSBudWxsICYmXG4gICAgICAgICAgICBmZyAhPSBudWxsICYmXG4gICAgICAgICAgICBmZy5jb250cm9scyAhPSBudWxsICYmXG4gICAgICAgICAgICBmZy5jb250cm9sc1tuLm5vZGUubmFtZV0gIT0gbnVsbFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbGV0IHN1YkZpZWxkVmlzaWJpbGl0eTogYm9vbGVhbiA9IG4udmlzaWJsZSA/IG4udmlzaWJsZSA6IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHN1YkZpZWxkVmlzaWJpbGl0eSkge1xuICAgICAgICAgICAgICBsZXQgc3ViRmllbGREZWZhdWx0VmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICBpZiAobi5ub2RlLmRlZmF1bHRWYWx1ZS5mb3JtdWxhICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBzdWJGaWVsZERlZmF1bHRWYWx1ZSA9IGV2YWx1YXRlRXhwcmVzc2lvbihcbiAgICAgICAgICAgICAgICAgIG4ubm9kZS5kZWZhdWx0VmFsdWUuZm9ybXVsYSxcbiAgICAgICAgICAgICAgICAgIG5ld0Zvcm1WYWx1ZSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1YkZpZWxkRGVmYXVsdFZhbHVlID0gbi5ub2RlLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBmZy5jb250cm9sc1tuLm5vZGUubmFtZV0uc2V0VmFsdWUoc3ViRmllbGREZWZhdWx0VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICBjb25zdCBzMiA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICBpZiAoczIgJiYgIXMyLmNsb3NlZCkge1xuICAgICAgICAgICAgczIudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZmcgIT0gbnVsbCAmJlxuICAgICAgICAgICAgZmcuY29udHJvbHMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXSAhPSBudWxsICYmXG4gICAgICAgICAgICBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdLnNldFZhbHVlKG5vZGVJbnN0YW5jZS5yZXBzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBQdXNoIGEgY29udGFpbmVyJ3MgdmlzaWJpbGl0eSBkb3duIHRvIHRoZSBmaWVsZHMgaXQgaG9sZHMuXG4gKlxuICogQSBub2RlIGdyb3VwIGlzIGEgYnJhY2tldDogdGhlIHJlbmRlcmVyIGxheXMgb3V0IHRoZSBmaWVsZHMgaW5zaWRlIGl0LCBuZXZlclxuICogdGhlIGdyb3VwIGl0c2VsZiwgc28gYSBncm91cCB3aG9zZSBjb25kaXRpb24gdHVybnMgZmFsc2UgY2hhbmdlcyBub3RoaW5nIG9uXG4gKiBzY3JlZW4gdW5sZXNzIGl0cyBjaGlsZHJlbiBhcmUgdG9sZC4gRWFjaCBkZXNjZW5kYW50IHJlLWV2YWx1YXRlcyBpdHMgb3duXG4gKiBjb25kaXRpb24gYWdhaW5zdCB0aGUgYnJhbmNoIGZsYWcgLS0gdGhlIHNhbWUgY2FsbCBgX2luaXROb2RlSW5zdGFuY2VgIG1ha2VzXG4gKiB3aGVuIHRoZSB0cmVlIGlzIGJ1aWx0IC0tIHNvIGEgZmllbGQgdGhhdCBoaWRlcyBpdHNlbGYgZm9yIGl0cyBvd24gcmVhc29uc1xuICogc3RheXMgaGlkZGVuIHdoZW4gdGhlIGdyb3VwIGNvbWVzIGJhY2sgaW50byB2aWV3LlxuICovXG5jb25zdCBwcm9wYWdhdGVWaXNpYmlsaXR5ID0gKFxuICBjb250YWluZXI6IEFqZk5vZGVHcm91cEluc3RhbmNlLFxuICBjb250ZXh0OiBBamZDb250ZXh0LFxuICBicmFuY2hWaXNpYmlsaXR5OiBib29sZWFuLFxuKTogdm9pZCA9PiB7XG4gIChjb250YWluZXIubm9kZXMgfHwgW10pLmZvckVhY2gobm9kZSA9PiB7XG4gICAgdXBkYXRlVmlzaWJpbGl0eShub2RlLCBjb250ZXh0LCBicmFuY2hWaXNpYmlsaXR5KTtcbiAgICAvLyBUaGUgbm9kZXMgcmVhY2hlZCB0aGlzIHdheSBhcmUgbm90IGluIHRoZSBjYWxsZXIncyBgdXBkYXRlZE5vZGVzYCBsaXN0LCBzb1xuICAgIC8vIHRoZSBjb21wb25lbnRzIGJvdW5kIHRvIHRoZW0gaGF2ZSB0byBiZSB3b2tlbiB1cCBoZXJlLlxuICAgIG5vZGUudXBkYXRlZEV2dC5lbWl0KCk7XG4gICAgaWYgKGlzTm9kZUdyb3VwSW5zdGFuY2Uobm9kZSkpIHtcbiAgICAgIHByb3BhZ2F0ZVZpc2liaWxpdHkobm9kZSwgY29udGV4dCwgbm9kZS52aXNpYmxlKTtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgdXBkYXRlUmVwZXRpdGlvbk1hcEVudHJ5ID0gKFxuICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgbmV3Rm9ybVZhbHVlOiBhbnksXG4gIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgY2I6IChcbiAgICBhbGxOb2RlczogQWpmTm9kZVtdIHwgQWpmTm9kZUluc3RhbmNlW10sXG4gICAgaW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSxcbiAgICBvbGRSZXBzOiBudW1iZXIsXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgKSA9PiB7YWRkZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbDsgcmVtb3ZlZDogQWpmTm9kZUluc3RhbmNlW10gfCBudWxsfSxcbikgPT4ge1xuICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgIGNvbnN0IG9sZFJlcHMgPSB1cGRhdGVSZXBzTnVtKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICBpZiAob2xkUmVwcyAhPT0gbm9kZUluc3RhbmNlLnJlcHMpIHtcbiAgICAgIGNiKG5vZGVzLCBub2RlSW5zdGFuY2UsIG9sZFJlcHMsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzTWFwRW50cnkgPSAoXG4gIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICBuZXdGb3JtVmFsdWU6IGFueSxcbiAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICBzaG93Q2I6IChcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgYnJhbmNoPzogbnVtYmVyLFxuICApID0+IHZvaWQsXG4gIGhpZGVDYjogKFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBicmFuY2g/OiBudW1iZXIsXG4gICkgPT4gdm9pZCxcbikgPT4ge1xuICAvLyBjb25zdCBicmFuY2hDaGFuZ2VkID1cbiAgLy8gbm9kZUluc3RhbmNlLnVwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXMobmV3Rm9ybVZhbHVlKTtcbiAgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gIC8vIGlmIChicmFuY2hDaGFuZ2VkKSB7XG4gIGNvbnN0IHZlcmlmaWVkQnJhbmNoID0gbm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoO1xuICBub2RlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChfY29uZGl0aW9uLCBpZHgpID0+IHtcbiAgICBpZiAoaWR4ID09IHZlcmlmaWVkQnJhbmNoKSB7XG4gICAgICBzaG93Q2IobmV3Rm9ybVZhbHVlLCBub2Rlcywgbm9kZUluc3RhbmNlLCBpZHgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWRlQ2IobmV3Rm9ybVZhbHVlLCBub2Rlcywgbm9kZUluc3RhbmNlLCBpZHgpO1xuICAgIH1cbiAgfSk7XG4gIC8vIH1cbn07XG5cbmNvbnN0IHVwZGF0ZUZvcm11bGFNYXBFbnRyeSA9IChcbiAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gIG5ld0Zvcm1WYWx1ZTogYW55LFxuICBmb3JtR3JvdXA6IEJlaGF2aW9yU3ViamVjdDxVbnR5cGVkRm9ybUdyb3VwIHwgbnVsbD4sXG4pID0+IHtcbiAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgY29uc3QgcmVzID0gdXBkYXRlRm9ybXVsYShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgY29uc3QgZmcgPSBmb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBpZiAoZmcgIT0gbnVsbCAmJiByZXMuY2hhbmdlZCkge1xuICAgICAgdXBkYXRlVmFsaWRhdGlvbihub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICBmZy5jb250cm9sc1tub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKV0uc2V0VmFsdWUocmVzLnZhbHVlKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZVZhbGlkYXRpb25NYXBFbnRyeSA9IChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlOiBhbnksIHN1cHA6IGFueSkgPT4ge1xuICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICBuZXdGb3JtVmFsdWUuJHZhbHVlID0gbmV3Rm9ybVZhbHVlW25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpXTtcbiAgICB1cGRhdGVWYWxpZGF0aW9uKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlLCBzdXBwKTtcbiAgfVxufTtcblxuY29uc3QgdXBkYXRlV2FybmluZ01hcEVudHJ5ID0gKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWU6IGFueSkgPT4ge1xuICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICB1cGRhdGVXYXJuaW5nKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICBpZiAoXG4gICAgICBub2RlSW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMgIT0gbnVsbCAmJlxuICAgICAgbm9kZUluc3RhbmNlLndhcm5pbmdSZXN1bHRzLmZpbHRlcih3YXJuaW5nID0+IHdhcm5pbmcucmVzdWx0KS5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICBub2RlSW5zdGFuY2Uud2FybmluZ1RyaWdnZXIuZW1pdCgpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlRmlsdGVyZWRDaG9pY2VzTWFwRW50cnkgPSAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZTogYW55KSA9PiB7XG4gIGlmIChpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgfVxufTtcbiJdfQ==