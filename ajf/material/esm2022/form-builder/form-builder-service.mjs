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
import { AjfFieldType, AjfNodeType, createChoicesFixedOrigin, createContainerNode, createField, createForm, createValidation, createValidationGroup, createWarning, createWarningGroup, isChoicesFixedOrigin, isContainerNode, isEmptyField, isField, isFieldWithChoices, isRangeField, isRepeatingContainerNode, isSlidesNode, isTableField, maxDigitsValidation, maxValidation, minDigitsValidation, minValidation, notEmptyValidation, notEmptyWarning, } from '@ajf/core/forms';
import { alwaysCondition, createCondition, createFormula, } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, of as obsOf, Subject, Subscription } from 'rxjs';
import { filter, map, shareReplay, scan, withLatestFrom, take } from 'rxjs/operators';
import * as i0 from "@angular/core";
/**
 * The categories the entries of the form builder field types palette are
 * grouped into, in display order. The values are translation keys, rendered as
 * the header of each group.
 */
export const AjfFormBuilderNodeTypeCategories = {
    structure: 'Structure',
    text: 'Text',
    numeric: 'Numeric',
    // Deliberately not 'Choices', which is already used by the choices origins
    // menu of the toolbar and has a different meaning.
    choices: 'Choice fields',
    dateTime: 'Date & time',
    advanced: 'Advanced',
};
function getNodeContainer(c, node) {
    if (c.nodes.indexOf(node) > -1 || c.nodes.map(n => n.id).indexOf(node?.id) > -1) {
        return c;
    }
    const cns = c.nodes.filter(n => isContainerNode(n));
    const len = cns.length;
    for (let i = 0; i < len; i++) {
        const cn = getNodeContainer(cns[i], node);
        if (cn != null) {
            return cn;
        }
    }
    return null;
}
function toArray(input) {
    if (!input)
        return [];
    input = input.replace(/\[|\]/g, '').trim();
    return input
        .split(',')
        .map(s => s.trim())
        .map(s => s.replace(/^['"]|['"]$/g, ''))
        .filter(s => s);
}
/**
 * Take the defaultValue from the properties box and return the new value to save in the ajf form defaultValue field properties
 * @param value
 * @param node
 * @returns
 * {"formula": "'colazione note'"}
 * {"formula": "'[\"colazione\", \"docce\"]'"}
 * {"formula": "3"}
 * {"formula": "(1 === 1)"}
 */
function getDefaultValue(value, node) {
    let defaultValue = value && value.trim() != '' ? value : null;
    if (defaultValue) {
        switch (node.fieldType) {
            case AjfFieldType.Boolean:
                if (defaultValue === 'true' || defaultValue === '1') {
                    return true;
                }
                if (defaultValue === 'false' || defaultValue === '0') {
                    return false;
                }
                return createFormula({ formula: defaultValue });
            case AjfFieldType.MultipleChoice:
                // return a string[]
                return toArray(defaultValue);
        }
        return createFormula({ formula: defaultValue });
    }
    return defaultValue;
}
/**
 * Take the defaultValue from the ajf form defaultValue prop (non formula)
 * and return the value to be shown in the properties box
 * @param value
 * @param node
 * @returns
 */
export function cleanDefaultValue(value, node) {
    if (!value || String(value).trim() === '') {
        return null;
    }
    switch (node.fieldType) {
        case AjfFieldType.String:
        case AjfFieldType.Text:
        case AjfFieldType.SingleChoice:
            if (/^"[^"]*"$/.test(String(value)) || /^'[^']*'$/.test(String(value))) {
                return String(value);
            }
            return `'${String(value)}'`;
        case AjfFieldType.MultipleChoice:
            return JSON.stringify(value);
    }
    return String(value);
}
function buildFormBuilderNodesSubtree(nodes, parent, ignoreConditionalBranches = false) {
    const entries = nodes
        .filter(n => n.parent === parent.id)
        .sort((n1, n2) => n1.parentNode - n2.parentNode)
        .map(n => {
        const children = buildFormBuilderNodesSubtree(nodes, n);
        if (children.length === 0) {
            children.push({ parent: n, parentNode: 0 });
        }
        return {
            node: n,
            children,
            content: buildFormBuilderNodesContent(nodes, n),
        };
    });
    if (!ignoreConditionalBranches) {
        const entriesNum = entries.length;
        const cbs = parent.conditionalBranches.length;
        for (let i = entriesNum; i < cbs; i++) {
            entries.push({ parent: parent, parentNode: i });
        }
    }
    return entries;
}
function buildFormBuilderNodesContent(_nodes, node) {
    if (isContainerNode(node)) {
        return buildFormBuilderNodesSubtree(node.nodes, node, true);
    }
    return [];
}
export function flattenNodes(nodes) {
    let flatNodes = [];
    nodes.forEach((node) => {
        if (isContainerNode(node)) {
            flatNodes = flatNodes.concat(flattenNodes(node.nodes));
        }
        flatNodes.push(node);
    });
    return flatNodes;
}
function getDescendants(flatNodes, parentNode, branch = null) {
    return branch != null
        ? flatNodes.filter(n => n.parent === parentNode.id && n.parentNode === branch)
        : flatNodes.filter(n => n.parent === parentNode.id);
}
function removeNodes(nodes, ids) {
    const len = nodes.length;
    for (let i = 0; i < len; i++) {
        const node = nodes[i];
        if (isContainerNode(node)) {
            const container = node;
            container.nodes = removeNodes(container.nodes, ids);
        }
    }
    return nodes.filter(n => ids.indexOf(n.id) === -1);
}
function deleteNodeSubtree(nodes, parentNode, branch = null) {
    const flatNodes = flattenNodes(nodes);
    let delNodes = [];
    let descendants = getDescendants(flatNodes, parentNode, branch);
    const len = descendants.length;
    for (let i = 0; i < len; i++) {
        delNodes = delNodes.concat(getDescendants(flatNodes, descendants[i]));
    }
    delNodes = delNodes.concat(descendants);
    return removeNodes(nodes, delNodes.map(n => n.id));
}
let nodeUniqueId = 0;
export class AjfFormBuilderService {
    /**
     * Available node types
     *
     * @readonly
     * @memberOf AjfFormBuilderService
     */
    get availableNodeTypes() {
        return this._availableNodeTypes;
    }
    /**
     * Current edited form stream
     *
     * @readonly
     * @memberOf AjfFormBuilderService
     */
    get form() {
        return this._formObs;
    }
    get attachmentsOrigins() {
        return this._attachmentsOrigins;
    }
    get choicesOrigins() {
        return this._choicesOrigins;
    }
    get stringIdentifier() {
        return this._stringIdentifier;
    }
    get nodes() {
        return this._nodes;
    }
    get flatNodes() {
        return this._flatNodes;
    }
    get flatFields() {
        return this._flatFields;
    }
    get nodeEntriesTree() {
        return this._nodeEntriesTree;
    }
    get connectedDropLists() {
        return this._connectedDropLists;
    }
    get nodeEntriesTreeExpandedStatus() {
        return this._nodeEntriesTreeExpandedStatus;
    }
    get editedNodeEntry() {
        return this._editedNodeEntryObs;
    }
    get editedCondition() {
        return this._editedConditionObs;
    }
    get editedChoicesOrigin() {
        return this._editedChoicesOriginObs;
    }
    get editedNodesValidation() {
        return this._editedNodesValidationObs;
    }
    get beforeNodesUpdate() {
        return this._beforeNodesUpdateObs;
    }
    get afterNodeUpdate() {
        return this._afterNodeUpdateObs;
    }
    constructor() {
        /**
         * The node types available in the palette, listed by category in display
         * order. Entries of the same category are rendered under a common header, see
         * {@link AjfFormBuilderNodeTypeCategories}.
         */
        this._availableNodeTypes = [
            {
                label: 'Slide',
                nodeType: { node: AjfNodeType.AjfSlide },
                isSlide: true,
                category: AjfFormBuilderNodeTypeCategories.structure,
            },
            {
                label: 'Repeating slide',
                nodeType: { node: AjfNodeType.AjfRepeatingSlide },
                isSlide: true,
                category: AjfFormBuilderNodeTypeCategories.structure,
            },
            {
                label: 'String',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.String },
                category: AjfFormBuilderNodeTypeCategories.text,
            },
            {
                label: 'Text',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Text },
                category: AjfFormBuilderNodeTypeCategories.text,
            },
            {
                label: 'Note',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Empty },
                category: AjfFormBuilderNodeTypeCategories.text,
            },
            {
                label: 'Number',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Number },
                category: AjfFormBuilderNodeTypeCategories.numeric,
            },
            {
                label: 'Boolean',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Boolean },
                category: AjfFormBuilderNodeTypeCategories.choices,
            },
            {
                label: 'Single choice',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.SingleChoice },
                category: AjfFormBuilderNodeTypeCategories.choices,
            },
            {
                label: 'Multiple choice',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.MultipleChoice },
                category: AjfFormBuilderNodeTypeCategories.choices,
            },
            {
                label: 'Range',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Range },
                category: AjfFormBuilderNodeTypeCategories.choices,
            },
            {
                label: 'Date range',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.DateRange },
                category: AjfFormBuilderNodeTypeCategories.dateTime,
            },
            {
                label: 'Date input',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.DateInput },
                category: AjfFormBuilderNodeTypeCategories.dateTime,
            },
            {
                label: 'Time',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Time },
                category: AjfFormBuilderNodeTypeCategories.dateTime,
            },
            {
                label: 'Geolocation',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Geolocation },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'Image',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Image },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'Barcode',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Barcode },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'Formula',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Formula },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'Table',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Table },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'File',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.File },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'Signature',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Signature },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
            {
                label: 'Audio',
                nodeType: { node: AjfNodeType.AjfField, field: AjfFieldType.Audio },
                category: AjfFormBuilderNodeTypeCategories.advanced,
            },
        ];
        this._form = new BehaviorSubject(null);
        this._formObs = this._form;
        this._attachmentsOrigins = obsOf([]);
        this._choicesOrigins = obsOf([]);
        this._stringIdentifier = obsOf([]);
        this._nodesWithoutChoiceOrigins = obsOf([]);
        this._nodes = obsOf([]);
        this._flatFields = obsOf([]);
        this._nodeEntriesTree = obsOf([]);
        /**
         * A list of the ids of the dropLists connected to the source list.
         */
        this._connectedDropLists = new BehaviorSubject([]);
        /**
         * A dictionary of the 'expanded' status of all nodeEntries in the tree {node.name: boolean}
         */
        this._nodeEntriesTreeExpandedStatus = new BehaviorSubject({});
        /**
         * Determines the default expanded state of nodeEntries when the FormBuilder loads
         */
        this._defaultExpanded = false;
        this._editedNodeEntry = new BehaviorSubject(null);
        this._editedNodeEntryObs = this
            ._editedNodeEntry;
        /**
         * New field or node just added in tree
         */
        this._newNodeEntry = new BehaviorSubject(null);
        this._editedCondition = new BehaviorSubject(null);
        this._editedConditionObs = this
            ._editedCondition;
        this._editedChoicesOrigin = new BehaviorSubject(null);
        this._editedChoicesOriginObs = this
            ._editedChoicesOrigin;
        this._editedNodesValidation = new BehaviorSubject(null);
        this._editedNodesValidationObs = this
            ._editedNodesValidation;
        this._beforeNodesUpdate = new EventEmitter();
        this._beforeNodesUpdateObs = this._beforeNodesUpdate;
        this._afterNodeUpdate = new EventEmitter();
        this._afterNodeUpdateObs = this._afterNodeUpdate;
        this._nodesUpdates = new Subject();
        this._attachmentsOriginsUpdates = new Subject();
        this._choicesOriginsUpdates = new Subject();
        this._stringIdentifierUpdates = new Subject();
        this._saveNodeEntryEvent = new EventEmitter();
        this._deleteNodeEntryEvent = new EventEmitter();
        /**
         * Event fired when the position of a node in a tree changes.
         */
        this._moveNodeEntryEvent = new EventEmitter();
        /**
         * Subscribes to the moveNodeEntryEvent event emitter;
         */
        this._moveNodeSub = Subscription.EMPTY;
        /**
         * Counters for default name assigned to inserted fields/slides
         */
        this._emptyFieldCounter = 1;
        this._emptySlideCounter = 1;
        this._initChoicesOriginsStreams();
        this._initAttachmentsOriginsStreams();
        this._initStringIdentifierStreams();
        this._initNodesStreams();
        this._initFormStreams();
        this._initSaveNode();
        this._initMoveNode();
        this._initDeleteNode();
    }
    /**
     * Sets the current edited form
     *
     * @param form
     *
     * @memberOf AjfFormBuilderService
     */
    setForm(form) {
        if (form !== this._form.getValue()) {
            this._form.next(form);
        }
    }
    editNodeEntry(nodeEntry) {
        this._editedNodeEntry.next(nodeEntry);
    }
    /**
     * Add a node validation entry
     * @param fbNodeValidation
     */
    editNodeValidation(fbNodeValidation) {
        this._editedNodesValidation.next({
            ...this._editedNodesValidation.value,
            ...fbNodeValidation,
        });
    }
    /**
     * Return if a node is valid
     * @param nodeName
     */
    isNodeValid(nodeName) {
        const allNodeValidations = this._editedNodesValidation.value;
        if (!allNodeValidations || allNodeValidations[nodeName] == null) {
            return true;
        }
        return allNodeValidations[nodeName].isValid;
    }
    /**
     * Clean node validation entries when a node is deleted
     * @param fbNodeValidation the deleted node
     */
    cleanNodeValidation(fbNodeName) {
        if (fbNodeName) {
            // set validation true for old unused name
            const fbNodeValidation = {};
            fbNodeValidation[fbNodeName] = { isValid: true, errors: null };
            this.editNodeValidation(fbNodeValidation);
        }
        // Clean all not existing invalid nodes
        const allNodeValidations = this._editedNodesValidation.value;
        if (allNodeValidations && this._flatNodes) {
            const invalidNodes = [];
            Object.keys(allNodeValidations).forEach(key => {
                if (allNodeValidations[key]?.isValid === false) {
                    invalidNodes.push(key);
                }
            });
            if (invalidNodes.length) {
                this._flatNodes.pipe(take(1)).subscribe(nodes => {
                    const existingNodeNames = new Set(nodes.map(n => n.name));
                    invalidNodes.forEach(invalidNode => {
                        if (!existingNodeNames.has(invalidNode)) {
                            delete allNodeValidations[invalidNode];
                        }
                    });
                    this._editedNodesValidation.next(allNodeValidations);
                });
            }
        }
    }
    editCondition(condition) {
        this._editedCondition.next(condition);
    }
    saveCurrentCondition(condition) {
        let c = this._editedCondition.getValue();
        if (c == null) {
            return;
        }
        c.condition = condition;
        this._editedCondition.next(null);
    }
    cancelConditionEdit() {
        this._editedChoicesOrigin.next(null);
    }
    assignListId(node, empty = false) {
        if (node.nodeType === AjfNodeType.AjfSlide || node.nodeType === AjfNodeType.AjfRepeatingSlide) {
            const listId = empty ? `empty_fields_list_${node.id}` : `fields_list_${node.id}`;
            if (this._connectedDropLists.value.indexOf(listId) == -1) {
                this._connectDropList(listId);
            }
            return listId;
        }
        return '';
    }
    insertNode(nodeType, parent, parentNode, inContent = false, insertInIndex = 0) {
        let node;
        const id = ++nodeUniqueId;
        const isFieldNode = nodeType.nodeType?.field != null;
        if (isFieldNode) {
            node = createField({
                id,
                nodeType: AjfNodeType.AjfField,
                fieldType: nodeType.nodeType.field,
                parent: parent.id,
                parentNode,
                name: `new_field_${this._emptyFieldCounter}`,
                label: `New ${AjfFieldType[nodeType.nodeType.field]} field ${this._emptyFieldCounter}`,
            });
            this._emptyFieldCounter++;
        }
        else {
            node = createContainerNode({
                id,
                nodeType: nodeType.nodeType.node,
                parent: 0,
                parentNode,
                name: `new_slide_${this._emptySlideCounter}`,
                label: `New Slide ${this._emptySlideCounter}`,
                nodes: [],
            });
            this._emptySlideCounter++;
        }
        this.cancelNodeEntryEdit();
        this._newNodeEntry.next(node);
        this._beforeNodesUpdate.emit();
        this._nodesUpdates.next((nodes) => {
            const cn = isContainerNode(parent) && inContent
                ? parent
                : getNodeContainer({ nodes }, parent);
            if (!isFieldNode) {
                let newNodes = nodes.slice(0);
                newNodes.splice(insertInIndex, 0, node);
                newNodes = this._updateNodesList(0, newNodes);
                return newNodes;
            }
            else {
                let newNodes = cn.nodes.slice(0);
                newNodes.splice(insertInIndex, 0, node);
                newNodes = this._updateNodesList(cn.id, newNodes);
                cn.nodes = newNodes;
            }
            return nodes;
        });
    }
    saveNodeEntry(properties) {
        this._saveNodeEntryEvent.emit(properties);
    }
    cancelNodeEntryEdit() {
        this._editedNodeEntry.next(null);
    }
    deleteNodeEntry(nodeEntry) {
        this._deleteNodeEntryEvent.next(nodeEntry);
        this.cleanNodeValidation(nodeEntry.node.name);
    }
    /**
     * Triggers the moveNode event when a node is moved in the formbuilder.
     * @param nodeEntry The node to be moved.
     */
    moveNodeEntry(nodeEntry, from, to) {
        const moveEvent = { nodeEntry: nodeEntry, fromIndex: from, toIndex: to };
        this._moveNodeEntryEvent.next(moveEvent);
        this.cancelNodeEntryEdit();
    }
    getCurrentForm() {
        return combineLatest([
            this.form,
            this._nodesWithoutChoiceOrigins,
            this.attachmentsOrigins,
            this.choicesOrigins,
            this.stringIdentifier,
        ]).pipe(filter(([form]) => form != null), map(([form, nodes, attachmentsOrigins, choicesOrigins, stringIdentifier]) => {
            const supplementaryInformations = (form || {}).supplementaryInformations;
            return createForm({
                choicesOrigins: [...choicesOrigins],
                attachmentsOrigins: [...attachmentsOrigins],
                stringIdentifier: [...(stringIdentifier || [])],
                nodes: [...nodes],
                supplementaryInformations,
            });
        }));
    }
    editChoicesOrigin(choicesOrigin) {
        this._editedChoicesOrigin.next(choicesOrigin);
    }
    createChoicesOrigin() {
        this._editedChoicesOrigin.next(createChoicesFixedOrigin({ name: '' }));
    }
    cancelChoicesOriginEdit() {
        this._editedChoicesOrigin.next(null);
    }
    saveChoicesOrigin(params) {
        const choicesOrigin = this._editedChoicesOrigin.getValue();
        const choicesOriginPreviousName = choicesOrigin?.name;
        if (choicesOrigin != null) {
            choicesOrigin.label = params.label;
            choicesOrigin.name = params.name;
            if (isChoicesFixedOrigin(choicesOrigin)) {
                choicesOrigin.choices = params.choices;
            }
            this._updateChoicesOriginRefInNodes(choicesOriginPreviousName, params.name);
            this._choicesOriginsUpdates.next(choicesOrigins => {
                const idx = choicesOrigins.indexOf(choicesOrigin);
                if (idx > -1) {
                    choicesOrigins = [
                        ...choicesOrigins.slice(0, idx),
                        choicesOrigin,
                        ...choicesOrigins.slice(idx + 1),
                    ];
                }
                else {
                    choicesOrigins = [...choicesOrigins, choicesOrigin];
                }
                return choicesOrigins;
            });
        }
        this._editedChoicesOrigin.next(null);
    }
    saveStringIdentifier(identifier) {
        this._stringIdentifierUpdates.next(() => [...identifier]);
    }
    /**
     * Resets the nodeEntriesTreeExpandedStatus dictionary to an empty object.
     */
    resetNodeEntriesTreeExpandedStatus() {
        this._nodeEntriesTreeExpandedStatus.next({});
    }
    /**
     * Gets the expanded status of an entry in the nodeEntriesTreeExpandedStatus dictionary
     * @param nodeName The unique name of the nodeEntry
     */
    getExpandedStatus(nodeName) {
        return this._nodeEntriesTreeExpandedStatus.pipe(map(tree => {
            if (nodeName in tree) {
                return tree[nodeName];
            }
            return this._defaultExpanded;
        }));
    }
    /**
     * Upserts an entry in the nodeEntriesTreeExpandedStatus dictionary
     * @param nodeName The unique name of the nodeEntry
     * @param expanded True if the nodeEntry is expanded
     */
    updateExpandedStatus(nodeName, expanded) {
        if (!nodeName)
            return;
        const dictValue = this._nodeEntriesTreeExpandedStatus.value;
        this._nodeEntriesTreeExpandedStatus.next({ ...dictValue, [nodeName]: expanded });
    }
    /**
     * Removes an entry from the nodeEntriesTreeExpandedStatus dictionary
     * @param nodeName The unique name of the nodeEntry
     */
    removeExpandedStatus(nodeName) {
        const dictValue = this._nodeEntriesTreeExpandedStatus.value;
        delete dictValue[nodeName];
        this._nodeEntriesTreeExpandedStatus.next(dictValue);
    }
    /**
     * Sets expanded to true for each entry in the nodeEntriesTreeExpandedStatus dictionary
     */
    expandAll() {
        const dictValue = this._nodeEntriesTreeExpandedStatus.value;
        for (let nodeName in dictValue) {
            dictValue[nodeName] = true;
        }
        this._defaultExpanded = true;
        this._nodeEntriesTreeExpandedStatus.next(dictValue);
    }
    /**
     * Sets expanded to false for each entry in the nodeEntriesTreeExpandedStatus dictionary
     */
    collapseAll() {
        const dictValue = this._nodeEntriesTreeExpandedStatus.value;
        for (let nodeName in dictValue) {
            dictValue[nodeName] = false;
        }
        this._defaultExpanded = false;
        this._nodeEntriesTreeExpandedStatus.next(dictValue);
    }
    /**
     * Resets the empty fields/slides counters
     */
    resetEmptyCounters() {
        this._emptyFieldCounter = 1;
        this._emptySlideCounter = 1;
    }
    /**
     * Searches the form nodes for field nodes with choicesOriginRef corresponding
     * to an edited choicesOrigin and updates it with the new name.
     * @param previous_name The choicesOrigin previous name
     * @param new_name The choicesOrigin new name
     */
    _updateChoicesOriginRefInNodes(previous_name, new_name) {
        if (!previous_name || !new_name)
            return;
        const currentForm = this._form.value;
        if (!currentForm)
            return;
        const updatedNodes = [];
        const currentSlides = currentForm.nodes;
        for (let slide of currentSlides) {
            if (!slide.nodes || !slide.nodes.length)
                continue;
            for (let node of slide.nodes) {
                const nodeObj = node;
                if (nodeObj['choicesOriginRef'] && nodeObj['choicesOriginRef'] === previous_name) {
                    nodeObj['choicesOriginRef'] = new_name;
                    updatedNodes.push(nodeObj);
                }
            }
        }
        this._nodesUpdates.next((_nodes) => {
            return currentForm.nodes.slice(0);
        });
    }
    _buildFormBuilderNodesTree(nodes) {
        this._updateNodesList(0, nodes);
        const rootNodes = nodes.filter(n => n.nodeType == AjfNodeType.AjfSlide || n.nodeType == AjfNodeType.AjfRepeatingSlide);
        if (rootNodes.length === 0) {
            return [null];
        }
        const rootNode = rootNodes[0];
        if (isSlidesNode(rootNode)) {
            const tree = [];
            tree.push({
                node: rootNode,
                container: null,
                children: buildFormBuilderNodesSubtree(nodes, rootNode),
                content: buildFormBuilderNodesContent(nodes, rootNode),
            });
            const lastAddedAjfNode = this._newNodeEntry.value;
            if (lastAddedAjfNode) {
                const lastAddedFbNode = this._findNodeInTree(tree, lastAddedAjfNode);
                if (lastAddedFbNode) {
                    this.editNodeEntry(lastAddedFbNode);
                }
                this._newNodeEntry.next(null);
            }
            return tree;
        }
        throw new Error('Invalid form definition');
    }
    /**
     * Find an ajfNode in AjfFormBuilderNodeEntry tree, by node name
     * @param tree
     * @param node
     * @returns the AjfFormBuilderNodeEntry node
     */
    _findNodeInTree(tree, node) {
        for (const fbn of tree) {
            const fbe = fbn;
            if (fbe.node?.name === node.name) {
                return fbe;
            }
            if (fbe.content && fbe.content.length) {
                const foundInContent = this._findNodeInTree(fbe.content, node);
                if (foundInContent) {
                    return foundInContent;
                }
            }
            if (fbe.children && fbe.children.length) {
                const foundInChildren = this._findNodeInTree(fbe.children, node);
                if (foundInChildren) {
                    return foundInChildren;
                }
            }
        }
        return null;
    }
    /**
     * Adds the id of a dropList to be connected with the FormBuilder source list.
     * @param listId The id of the list to connect.
     */
    _connectDropList(listId) {
        let connectedLists = this._connectedDropLists.value.slice(0);
        this._connectedDropLists.next([...connectedLists, listId]);
    }
    _findMaxNodeId(nodes, _curMaxId = 0) {
        let maxId = 0;
        let maxNewFieldCounter = 0;
        let maxNewSlideCounter = 0;
        nodes.forEach(n => {
            maxId = Math.max(maxId, n.id);
            if (isContainerNode(n)) {
                maxId = Math.max(maxId, this._findMaxNodeId(n.nodes));
            }
            if (n.name.startsWith('new_field_')) {
                const newFieldNumber = this._extractNumberFromName(n.name, 'new_field_');
                if (newFieldNumber !== null) {
                    maxNewFieldCounter = Math.max(maxNewFieldCounter, newFieldNumber);
                }
            }
            else if (n.name.startsWith('new_slide_')) {
                const newSlideNumber = this._extractNumberFromName(n.name, 'new_slide_');
                if (newSlideNumber !== null) {
                    maxNewSlideCounter = Math.max(maxNewSlideCounter, newSlideNumber);
                }
            }
        });
        this._emptyFieldCounter = Math.max(this._emptyFieldCounter, maxNewFieldCounter + 1);
        this._emptySlideCounter = Math.max(this._emptySlideCounter, maxNewSlideCounter + 1);
        return maxId;
    }
    _extractNumberFromName(str, prefix) {
        const regex = new RegExp(`^${prefix}(\\d+)$`);
        const match = regex.exec(str);
        return match ? Number(match[1]) : null;
    }
    _initFormStreams() {
        this._form.subscribe((form) => {
            nodeUniqueId = 0;
            if (form != null && form.nodes != null && form.nodes.length > 0) {
                nodeUniqueId = this._findMaxNodeId(form.nodes);
            }
            this._nodesUpdates.next((_nodes) => {
                return form != null && form.nodes != null ? form.nodes.slice(0) : [];
            });
            this._attachmentsOriginsUpdates.next((_attachmentsOrigins) => {
                return form != null && form.attachmentsOrigins != null
                    ? form.attachmentsOrigins.slice(0)
                    : [];
            });
            this._choicesOriginsUpdates.next((_choicesOrigins) => {
                return form != null && form.choicesOrigins != null ? form.choicesOrigins.slice(0) : [];
            });
            this._stringIdentifierUpdates.next((_) => {
                return form != null && form.stringIdentifier != null
                    ? form.stringIdentifier.slice(0)
                    : [];
            });
        });
    }
    _initChoicesOriginsStreams() {
        this._choicesOrigins = (this._choicesOriginsUpdates).pipe(scan((choicesOrigins, op) => {
            return op(choicesOrigins);
        }, []), shareReplay(1));
    }
    _initAttachmentsOriginsStreams() {
        this._attachmentsOrigins = this._attachmentsOriginsUpdates.pipe(scan((attachmentsOrigins, op) => {
            return op(attachmentsOrigins);
        }, []), shareReplay(1));
    }
    _initStringIdentifierStreams() {
        this._stringIdentifier = this._stringIdentifierUpdates.pipe(scan((stringIdentifier, op) => {
            return op(stringIdentifier);
        }, []), shareReplay(1));
    }
    _initNodesStreams() {
        this._nodes = this._nodesUpdates.pipe(scan((nodes, op) => {
            return op(nodes);
        }, []), shareReplay(1));
        this._nodesWithoutChoiceOrigins = this._nodes.pipe(map(slides => slides.map(slide => {
            slide.nodes = slide.nodes.map((node) => {
                if (isFieldWithChoices(node)) {
                    const { choices, choicesOrigin, ...fwc } = deepCopy(node);
                    return fwc;
                }
                return node;
            });
            return slide;
        })));
        this._flatNodes = this._nodes.pipe(map((nodes) => flattenNodes(nodes)), shareReplay(1));
        this._flatFields = this._flatNodes.pipe(map((nodes) => nodes.filter(n => !isContainerNode(n))), shareReplay(1));
        this._nodeEntriesTree = this._nodes.pipe(map(nodes => this._buildFormBuilderNodesTree(nodes)), shareReplay(1));
    }
    _initSaveNode() {
        this._saveNodeEntryEvent
            .pipe(withLatestFrom(this.editedNodeEntry, this.choicesOrigins, this.attachmentsOrigins), filter(([_, nodeEntry]) => nodeEntry != null), map(([properties, ne]) => {
            this._beforeNodesUpdate.emit();
            const nodeEntry = ne;
            const origNode = nodeEntry.node;
            const node = deepCopy(origNode);
            node.id = nodeEntry.node.id;
            node.name = properties.name;
            node.label = properties.label;
            node.visibility =
                properties.visibility != null
                    ? createCondition({ condition: properties.visibility })
                    : undefined;
            const oldConditionalBranches = node.conditionalBranches.length;
            node.conditionalBranches =
                properties.conditionalBranches != null
                    ? properties.conditionalBranches.map((condition) => createCondition({ condition }))
                    : [alwaysCondition()];
            const newConditionalBranches = node.conditionalBranches.length;
            if (isRepeatingContainerNode(node)) {
                node.formulaReps =
                    properties.formulaReps != null
                        ? createFormula({ formula: properties.formulaReps })
                        : undefined;
                node.minReps = properties.minReps;
                node.maxReps = properties.maxReps;
            }
            if (isField(node)) {
                node.hint = properties.hint;
                node.editable = !properties.readonlyField;
                node.description = properties.description;
                node.defaultValue = getDefaultValue(properties.defaultValue, node);
                node.formula =
                    properties.formula != null ? createFormula({ formula: properties.formula }) : undefined;
                const forceValue = properties.value;
                const notEmpty = properties.notEmpty;
                const validationConditions = properties.validationConditions;
                let minValue = parseInt(properties.minValue, 10);
                let maxValue = parseInt(properties.maxValue, 10);
                let minDigits = parseInt(properties.minDigits, 10);
                let maxDigits = parseInt(properties.maxDigits, 10);
                if (isNaN(minValue)) {
                    minValue = null;
                }
                if (isNaN(maxValue)) {
                    maxValue = null;
                }
                if (isNaN(minDigits)) {
                    minDigits = null;
                }
                if (isNaN(maxDigits)) {
                    maxDigits = null;
                }
                if (forceValue != null ||
                    notEmpty != null ||
                    (validationConditions != null && validationConditions.length > 0) ||
                    minValue != null ||
                    maxValue != null ||
                    minDigits != null ||
                    maxDigits != null) {
                    const validation = node.validation || createValidationGroup({});
                    validation.forceValue = forceValue;
                    validation.notEmpty = notEmpty ? notEmptyValidation() : undefined;
                    validation.minValue = minValue != null ? minValidation(minValue) : undefined;
                    validation.maxValue = maxValue != null ? maxValidation(maxValue) : undefined;
                    validation.minDigits = minDigits != null ? minDigitsValidation(minDigits) : undefined;
                    validation.maxDigits = maxDigits != null ? maxDigitsValidation(maxDigits) : undefined;
                    validation.conditions = (validationConditions || []).map((c) => createValidation({
                        condition: c.condition,
                        errorMessage: c.errorMessage,
                    }));
                    node.validation = validation;
                }
                else {
                    node.validation = undefined;
                }
                const notEmptyWarn = properties.notEmptyWarning;
                const warningConditions = properties.warningConditions;
                if (notEmptyWarn != null ||
                    (warningConditions != null && warningConditions.length > 0)) {
                    const warning = node.warning || createWarningGroup({});
                    warning.notEmpty = notEmptyWarn ? notEmptyWarning() : undefined;
                    warning.conditions = (warningConditions || []).map((w) => createWarning({
                        condition: w.condition,
                        warningMessage: w.warningMessage,
                    }));
                    node.warning = warning;
                }
                else {
                    node.warning = undefined;
                }
                node.nextSlideCondition =
                    properties.nextSlideCondition != null
                        ? createCondition({ condition: properties.nextSlideCondition })
                        : undefined;
                node.size = properties.size;
                if (isFieldWithChoices(node)) {
                    node.choicesOriginRef = properties.choicesOriginRef;
                    node.forceExpanded = properties.forceExpanded;
                    node.forceNarrow = properties.forceNarrow;
                    node.triggerConditions = (properties.triggerConditions || []).map((t) => createCondition({ condition: t }));
                }
                if (isRangeField(node)) {
                    node.start = properties.start;
                    node.end = properties.end;
                    node.step = properties.step;
                    node.appearance = properties.appearance ?? undefined;
                }
                if (isEmptyField(node)) {
                    node.HTML = properties.HTML;
                }
                if (isTableField(node)) {
                    let { columnTypes, rows, columnLabels, rowLabels } = JSON.parse(properties.tableDef);
                    node.columnTypes = columnTypes || [];
                    node.rows = rows || [];
                    node.columnLabels = columnLabels || [];
                    node.rowLabels = rowLabels || [];
                    node.hideEmptyRows = properties.hideEmptyRows;
                }
            }
            this._editedNodeEntry.next(null);
            return (nodes) => {
                let cn = getNodeContainer({ nodes }, origNode);
                if (cn != null) {
                    // TODO: @trik check this, was always true?
                    // if (cn instanceof AjfNode) {
                    const replaceNodes = cn.nodes === nodes;
                    const idx = cn.nodes.map(n => n.id).indexOf(origNode.id);
                    let newNodes = cn.nodes.slice(0, idx);
                    newNodes.push(node);
                    newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
                    cn.nodes = newNodes;
                    if (replaceNodes) {
                        nodes = newNodes;
                    }
                    else {
                        nodes = nodes.slice(0);
                    }
                    // } else {
                    //   const idx = nodes.indexOf(origNode);
                    //   nodes = nodes.slice(0, idx).concat([node]).concat(nodes.slice(idx + 1));
                    // }
                    if (newConditionalBranches < oldConditionalBranches) {
                        for (let i = newConditionalBranches; i < oldConditionalBranches; i++) {
                            nodes = deleteNodeSubtree(nodes, node, i);
                        }
                    }
                }
                return nodes;
            };
        }))
            .subscribe(this._nodesUpdates);
    }
    _initDeleteNode() {
        this._deleteNodeEntryEvent
            .pipe(map((nodeEntry) => {
            this._beforeNodesUpdate.emit();
            this.removeExpandedStatus(nodeEntry.node.name);
            return (nodes) => {
                const node = nodeEntry.node;
                let cn = getNodeContainer({ nodes }, node);
                if (cn != null) {
                    const replaceNodes = cn.nodes === nodes;
                    const idx = cn.nodes.map(n => n.id).indexOf(node.id);
                    let newNodes = cn.nodes.slice(0, idx);
                    newNodes = newNodes.concat(cn.nodes.slice(idx + 1));
                    cn.nodes = newNodes;
                    if (replaceNodes) {
                        nodes = newNodes;
                    }
                    else {
                        nodes = nodes.slice(0);
                    }
                }
                return nodes;
            };
        }))
            .subscribe(this._nodesUpdates);
    }
    /**
     * Initializes the subscription to the moveNodeEntryEvent.
     */
    _initMoveNode() {
        this._moveNodeSub.unsubscribe();
        this._moveNodeSub = this._moveNodeEntryEvent
            .pipe(map((moveEvent) => {
            this._beforeNodesUpdate.emit();
            return (nodes) => {
                const nodeEntry = moveEvent.nodeEntry;
                const node = nodeEntry.node;
                let cn = getNodeContainer({ nodes }, node);
                let newNodes = nodes;
                if (cn != null) {
                    const replaceNodes = cn.nodes === nodes;
                    newNodes = cn.nodes;
                    moveItemInArray(newNodes, moveEvent.fromIndex, moveEvent.toIndex);
                    newNodes = this._updateNodesList(cn.id, newNodes);
                    cn.nodes = newNodes;
                    if (replaceNodes) {
                        nodes = newNodes;
                    }
                    else {
                        nodes = nodes.slice(0);
                    }
                }
                return nodes;
            };
        }))
            .subscribe(this._nodesUpdates);
    }
    /**
     * Updates the "id" and "parent" fields of a modified or rearranged list of nodes.
     * @param containerId The id of the parent container of the list.
     * @param nodesList The list of nodes to be updated.
     */
    _updateNodesList(containerId, nodesList) {
        if (!nodesList.length) {
            return [];
        }
        const contId = containerId != undefined ? containerId : 0;
        for (let idx = 0; idx < nodesList.length; idx++) {
            let currentNode = nodesList[idx];
            currentNode.id = contId * 1000 + idx + 1;
            currentNode.parent = idx == 0 ? contId : contId * 1000 + idx;
            if (isSlidesNode(currentNode)) {
                this._updateNodesList(currentNode.id, currentNode.nodes);
            }
        }
        return nodesList;
    }
    static { this.ɵfac = function AjfFormBuilderService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AjfFormBuilderService)(); }; }
    static { this.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: AjfFormBuilderService, factory: AjfFormBuilderService.ɵfac }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AjfFormBuilderService, [{
        type: Injectable
    }], () => [], null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFJTCxZQUFZLEVBTVosV0FBVyxFQUdYLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixZQUFZLEVBQ1osT0FBTyxFQUNQLGtCQUFrQixFQUNsQixZQUFZLEVBQ1osd0JBQXdCLEVBQ3hCLFlBQVksRUFDWixZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixlQUFlLEdBQ2hCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUdMLGVBQWUsRUFDZixlQUFlLEVBQ2YsYUFBYSxHQUNkLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFFLGFBQWEsRUFBYyxFQUFFLElBQUksS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEcsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7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LENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztZQUM3RCxJQUFJLFlBQVksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDO2dCQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDM0QsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO3NIQWhsQ1UscUJBQXFCO3VFQUFyQixxQkFBcUIsV0FBckIscUJBQXFCOztpRkFBckIscUJBQXFCO2NBRGpDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkF0dGFjaG1lbnRzT3JpZ2luLFxuICBBamZDaG9pY2VzT3JpZ2luLFxuICBBamZGaWVsZCxcbiAgQWpmRmllbGRUeXBlLFxuICBBamZGb3JtLFxuICBBamZGb3JtU3RyaW5nSWRlbnRpZmllcixcbiAgQWpmTm9kZSxcbiAgQWpmTm9kZUdyb3VwLFxuICBBamZOb2Rlc09wZXJhdGlvbixcbiAgQWpmTm9kZVR5cGUsXG4gIEFqZlJlcGVhdGluZ1NsaWRlLFxuICBBamZTbGlkZSxcbiAgY3JlYXRlQ2hvaWNlc0ZpeGVkT3JpZ2luLFxuICBjcmVhdGVDb250YWluZXJOb2RlLFxuICBjcmVhdGVGaWVsZCxcbiAgY3JlYXRlRm9ybSxcbiAgY3JlYXRlVmFsaWRhdGlvbixcbiAgY3JlYXRlVmFsaWRhdGlvbkdyb3VwLFxuICBjcmVhdGVXYXJuaW5nLFxuICBjcmVhdGVXYXJuaW5nR3JvdXAsXG4gIGlzQ2hvaWNlc0ZpeGVkT3JpZ2luLFxuICBpc0NvbnRhaW5lck5vZGUsXG4gIGlzRW1wdHlGaWVsZCxcbiAgaXNGaWVsZCxcbiAgaXNGaWVsZFdpdGhDaG9pY2VzLFxuICBpc1JhbmdlRmllbGQsXG4gIGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZSxcbiAgaXNTbGlkZXNOb2RlLFxuICBpc1RhYmxlRmllbGQsXG4gIG1heERpZ2l0c1ZhbGlkYXRpb24sXG4gIG1heFZhbGlkYXRpb24sXG4gIG1pbkRpZ2l0c1ZhbGlkYXRpb24sXG4gIG1pblZhbGlkYXRpb24sXG4gIG5vdEVtcHR5VmFsaWRhdGlvbixcbiAgbm90RW1wdHlXYXJuaW5nLFxufSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQWpmQ29uZGl0aW9uLFxuICBBamZGb3JtdWxhLFxuICBhbHdheXNDb25kaXRpb24sXG4gIGNyZWF0ZUNvbmRpdGlvbixcbiAgY3JlYXRlRm9ybXVsYSxcbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHttb3ZlSXRlbUluQXJyYXl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIGNvbWJpbmVMYXRlc3QsIE9ic2VydmFibGUsIG9mIGFzIG9ic09mLCBTdWJqZWN0LCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgc2hhcmVSZXBsYXksIHNjYW4sIHdpdGhMYXRlc3RGcm9tLCB0YWtlfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7XG4gIEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbixcbiAgQWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24sXG4gIEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uLFxufSBmcm9tICcuL29wZXJhdGlvbnMnO1xuXG4vKipcbiAqIFRoZSBjYXRlZ29yaWVzIHRoZSBlbnRyaWVzIG9mIHRoZSBmb3JtIGJ1aWxkZXIgZmllbGQgdHlwZXMgcGFsZXR0ZSBhcmVcbiAqIGdyb3VwZWQgaW50bywgaW4gZGlzcGxheSBvcmRlci4gVGhlIHZhbHVlcyBhcmUgdHJhbnNsYXRpb24ga2V5cywgcmVuZGVyZWQgYXNcbiAqIHRoZSBoZWFkZXIgb2YgZWFjaCBncm91cC5cbiAqL1xuZXhwb3J0IGNvbnN0IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzID0ge1xuICBzdHJ1Y3R1cmU6ICdTdHJ1Y3R1cmUnLFxuICB0ZXh0OiAnVGV4dCcsXG4gIG51bWVyaWM6ICdOdW1lcmljJyxcbiAgLy8gRGVsaWJlcmF0ZWx5IG5vdCAnQ2hvaWNlcycsIHdoaWNoIGlzIGFscmVhZHkgdXNlZCBieSB0aGUgY2hvaWNlcyBvcmlnaW5zXG4gIC8vIG1lbnUgb2YgdGhlIHRvb2xiYXIgYW5kIGhhcyBhIGRpZmZlcmVudCBtZWFuaW5nLlxuICBjaG9pY2VzOiAnQ2hvaWNlIGZpZWxkcycsXG4gIGRhdGVUaW1lOiAnRGF0ZSAmIHRpbWUnLFxuICBhZHZhbmNlZDogJ0FkdmFuY2VkJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5IHtcbiAgbGFiZWw6IHN0cmluZztcbiAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZTsgZmllbGQ/OiBBamZGaWVsZFR5cGV9O1xuICBpc1NsaWRlPzogYm9vbGVhbjtcbiAgLyoqXG4gICAqIFRoZSBjYXRlZ29yeSB0aGUgZW50cnkgYmVsb25ncyB0bywgb25lIG9mXG4gICAqIHtAbGluayBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllc30uIEVudHJpZXMgc2hhcmluZyBhIGNhdGVnb3J5IGFyZVxuICAgKiByZW5kZXJlZCB1bmRlciBhIGNvbW1vbiBoZWFkZXI7IGVudHJpZXMgd2l0aG91dCBhIGNhdGVnb3J5IGFyZSByZW5kZXJlZFxuICAgKiBsYXN0LCB3aXRoIG5vIGhlYWRlci5cbiAgICovXG4gIGNhdGVnb3J5Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHtcbiAgbm9kZTogQWpmTm9kZTtcbiAgY29udGFpbmVyOiBBamZDb250YWluZXJOb2RlIHwgbnVsbDtcbiAgY2hpbGRyZW46IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W107XG4gIGNvbnRlbnQ6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRm9ybUJ1aWxkZXJGaWVsZFZhbGlkYXRpb24ge1xuICBpc1ZhbGlkOiBib29sZWFuO1xuICBlcnJvcnM6IHtba2V5OiBzdHJpbmddOiBhbnl9IHwgbnVsbDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlclZhbGlkYXRpb24ge1xuICBba2V5OiBzdHJpbmddOiBGb3JtQnVpbGRlckZpZWxkVmFsaWRhdGlvbiB8IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Qge1xuICBwYXJlbnQ6IEFqZk5vZGU7XG4gIHBhcmVudE5vZGU6IG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgbm9kZSdzIHBvc2l0aW9uIGNoYW5nZSBpbiB0aGUgZm9ybWJ1aWxkZXIuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJNb3ZlRXZlbnQge1xuICAvKipcbiAgICogVGhlIG5vZGUgYmVpbmcgbW92ZWQuXG4gICAqL1xuICBub2RlRW50cnk6IEFqZkZvcm1CdWlsZGVyTm9kZTtcblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBub2RlIHByZXZpb3VzIHBvc2l0aW9uLlxuICAgKi9cbiAgZnJvbUluZGV4OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgbm9kZSBuZXcgcG9zaXRpb24uXG4gICAqL1xuICB0b0luZGV4OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIEFqZkZvcm1CdWlsZGVyTm9kZSA9IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgQWpmRm9ybUJ1aWxkZXJFbXB0eVNsb3Q7XG5leHBvcnQgdHlwZSBBamZDb250YWluZXJOb2RlID0gQWpmU2xpZGUgfCBBamZSZXBlYXRpbmdTbGlkZSB8IEFqZk5vZGVHcm91cDtcblxuZnVuY3Rpb24gZ2V0Tm9kZUNvbnRhaW5lcihjOiB7bm9kZXM6IEFqZk5vZGVbXX0sIG5vZGU6IEFqZk5vZGUpOiB7bm9kZXM6IEFqZk5vZGVbXX0gfCBudWxsIHtcbiAgaWYgKGMubm9kZXMuaW5kZXhPZihub2RlKSA+IC0xIHx8IGMubm9kZXMubWFwKG4gPT4gbi5pZCkuaW5kZXhPZihub2RlPy5pZCkgPiAtMSkge1xuICAgIHJldHVybiBjO1xuICB9XG4gIGNvbnN0IGNucyA9IGMubm9kZXMuZmlsdGVyKG4gPT4gaXNDb250YWluZXJOb2RlKG4pKTtcbiAgY29uc3QgbGVuID0gY25zLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IGNuID0gZ2V0Tm9kZUNvbnRhaW5lcig8QWpmQ29udGFpbmVyTm9kZT5jbnNbaV0sIG5vZGUpO1xuICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICByZXR1cm4gY247XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiB0b0FycmF5KGlucHV0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gIGlmICghaW5wdXQpIHJldHVybiBbXTtcbiAgaW5wdXQgPSBpbnB1dC5yZXBsYWNlKC9cXFt8XFxdL2csICcnKS50cmltKCk7XG4gIHJldHVybiBpbnB1dFxuICAgIC5zcGxpdCgnLCcpXG4gICAgLm1hcChzID0+IHMudHJpbSgpKVxuICAgIC5tYXAocyA9PiBzLnJlcGxhY2UoL15bJ1wiXXxbJ1wiXSQvZywgJycpKVxuICAgIC5maWx0ZXIocyA9PiBzKTtcbn1cblxuLyoqXG4gKiBUYWtlIHRoZSBkZWZhdWx0VmFsdWUgZnJvbSB0aGUgcHJvcGVydGllcyBib3ggYW5kIHJldHVybiB0aGUgbmV3IHZhbHVlIHRvIHNhdmUgaW4gdGhlIGFqZiBmb3JtIGRlZmF1bHRWYWx1ZSBmaWVsZCBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBub2RlXG4gKiBAcmV0dXJuc1xuICoge1wiZm9ybXVsYVwiOiBcIidjb2xhemlvbmUgbm90ZSdcIn1cbiAqIHtcImZvcm11bGFcIjogXCInW1xcXCJjb2xhemlvbmVcXFwiLCBcXFwiZG9jY2VcXFwiXSdcIn1cbiAqIHtcImZvcm11bGFcIjogXCIzXCJ9XG4gKiB7XCJmb3JtdWxhXCI6IFwiKDEgPT09IDEpXCJ9XG4gKi9cbmZ1bmN0aW9uIGdldERlZmF1bHRWYWx1ZShcbiAgdmFsdWU6IGFueSxcbiAgbm9kZTogQWpmRmllbGQ8YW55Pixcbik6IHN0cmluZyB8IHN0cmluZ1tdIHwgbnVtYmVyIHwgYm9vbGVhbiB8IEFqZkZvcm11bGEgfCBudWxsIHtcbiAgbGV0IGRlZmF1bHRWYWx1ZSA9IHZhbHVlICYmICh2YWx1ZSBhcyBzdHJpbmcpLnRyaW0oKSAhPSAnJyA/ICh2YWx1ZSBhcyBzdHJpbmcpIDogbnVsbDtcbiAgaWYgKGRlZmF1bHRWYWx1ZSkge1xuICAgIHN3aXRjaCAobm9kZS5maWVsZFR5cGUpIHtcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkJvb2xlYW46XG4gICAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT09ICd0cnVlJyB8fCBkZWZhdWx0VmFsdWUgPT09ICcxJykge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT09ICdmYWxzZScgfHwgZGVmYXVsdFZhbHVlID09PSAnMCcpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGRlZmF1bHRWYWx1ZX0pO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2U6XG4gICAgICAgIC8vIHJldHVybiBhIHN0cmluZ1tdXG4gICAgICAgIHJldHVybiB0b0FycmF5KGRlZmF1bHRWYWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBkZWZhdWx0VmFsdWV9KTtcbiAgfVxuICByZXR1cm4gZGVmYXVsdFZhbHVlO1xufVxuXG4vKipcbiAqIFRha2UgdGhlIGRlZmF1bHRWYWx1ZSBmcm9tIHRoZSBhamYgZm9ybSBkZWZhdWx0VmFsdWUgcHJvcCAobm9uIGZvcm11bGEpXG4gKiBhbmQgcmV0dXJuIHRoZSB2YWx1ZSB0byBiZSBzaG93biBpbiB0aGUgcHJvcGVydGllcyBib3hcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIG5vZGVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjbGVhbkRlZmF1bHRWYWx1ZSh2YWx1ZTogYW55LCBub2RlOiBBamZGaWVsZDxhbnk+KTogc3RyaW5nIHwgbnVsbCB7XG4gIGlmICghdmFsdWUgfHwgU3RyaW5nKHZhbHVlKS50cmltKCkgPT09ICcnKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBzd2l0Y2ggKG5vZGUuZmllbGRUeXBlKSB7XG4gICAgY2FzZSBBamZGaWVsZFR5cGUuU3RyaW5nOlxuICAgIGNhc2UgQWpmRmllbGRUeXBlLlRleHQ6XG4gICAgY2FzZSBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlOlxuICAgICAgaWYgKC9eXCJbXlwiXSpcIiQvLnRlc3QoU3RyaW5nKHZhbHVlKSkgfHwgL14nW14nXSonJC8udGVzdChTdHJpbmcodmFsdWUpKSkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBgJyR7U3RyaW5nKHZhbHVlKX0nYDtcbiAgICBjYXNlIEFqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZTpcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUoXG4gIG5vZGVzOiBBamZOb2RlW10sXG4gIHBhcmVudDogQWpmTm9kZSxcbiAgaWdub3JlQ29uZGl0aW9uYWxCcmFuY2hlcyA9IGZhbHNlLFxuKTogQWpmRm9ybUJ1aWxkZXJOb2RlW10ge1xuICBjb25zdCBlbnRyaWVzOiBBamZGb3JtQnVpbGRlck5vZGVbXSA9IG5vZGVzXG4gICAgLmZpbHRlcihuID0+IG4ucGFyZW50ID09PSBwYXJlbnQuaWQpXG4gICAgLnNvcnQoKG4xLCBuMikgPT4gbjEucGFyZW50Tm9kZSAtIG4yLnBhcmVudE5vZGUpXG4gICAgLm1hcChuID0+IHtcbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShub2Rlcywgbik7XG4gICAgICBpZiAoY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNoaWxkcmVuLnB1c2goe3BhcmVudDogbiwgcGFyZW50Tm9kZTogMH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT57XG4gICAgICAgIG5vZGU6IG4sXG4gICAgICAgIGNoaWxkcmVuLFxuICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCBuKSxcbiAgICAgIH07XG4gICAgfSk7XG4gIGlmICghaWdub3JlQ29uZGl0aW9uYWxCcmFuY2hlcykge1xuICAgIGNvbnN0IGVudHJpZXNOdW0gPSBlbnRyaWVzLmxlbmd0aDtcbiAgICBjb25zdCBjYnMgPSBwYXJlbnQuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IGVudHJpZXNOdW07IGkgPCBjYnM7IGkrKykge1xuICAgICAgZW50cmllcy5wdXNoKHtwYXJlbnQ6IHBhcmVudCwgcGFyZW50Tm9kZTogaX0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZW50cmllcztcbn1cblxuZnVuY3Rpb24gYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChfbm9kZXM6IEFqZk5vZGVbXSwgbm9kZTogQWpmTm9kZSk6IEFqZkZvcm1CdWlsZGVyTm9kZVtdIHtcbiAgaWYgKGlzQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgIHJldHVybiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKCg8QWpmQ29udGFpbmVyTm9kZT5ub2RlKS5ub2Rlcywgbm9kZSwgdHJ1ZSk7XG4gIH1cbiAgcmV0dXJuIFtdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmxhdHRlbk5vZGVzKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10ge1xuICBsZXQgZmxhdE5vZGVzOiBBamZOb2RlW10gPSBbXTtcblxuICBub2Rlcy5mb3JFYWNoKChub2RlOiBBamZOb2RlKSA9PiB7XG4gICAgaWYgKGlzQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgZmxhdE5vZGVzID0gZmxhdE5vZGVzLmNvbmNhdChmbGF0dGVuTm9kZXMoKDxBamZDb250YWluZXJOb2RlPm5vZGUpLm5vZGVzKSk7XG4gICAgfVxuICAgIGZsYXROb2Rlcy5wdXNoKG5vZGUpO1xuICB9KTtcblxuICByZXR1cm4gZmxhdE5vZGVzO1xufVxuXG5mdW5jdGlvbiBnZXREZXNjZW5kYW50cyhcbiAgZmxhdE5vZGVzOiBBamZOb2RlW10sXG4gIHBhcmVudE5vZGU6IEFqZk5vZGUsXG4gIGJyYW5jaDogbnVtYmVyIHwgbnVsbCA9IG51bGwsXG4pOiBBamZOb2RlW10ge1xuICByZXR1cm4gYnJhbmNoICE9IG51bGxcbiAgICA/IGZsYXROb2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50Tm9kZS5pZCAmJiBuLnBhcmVudE5vZGUgPT09IGJyYW5jaClcbiAgICA6IGZsYXROb2Rlcy5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50Tm9kZS5pZCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZU5vZGVzKG5vZGVzOiBBamZOb2RlW10sIGlkczogbnVtYmVyW10pOiBBamZOb2RlW10ge1xuICBjb25zdCBsZW4gPSBub2Rlcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBub2RlID0gbm9kZXNbaV07XG4gICAgaWYgKGlzQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgY29uc3QgY29udGFpbmVyID0gPEFqZkNvbnRhaW5lck5vZGU+bm9kZTtcbiAgICAgIGNvbnRhaW5lci5ub2RlcyA9IHJlbW92ZU5vZGVzKGNvbnRhaW5lci5ub2RlcywgaWRzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5vZGVzLmZpbHRlcihuID0+IGlkcy5pbmRleE9mKG4uaWQpID09PSAtMSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZU5vZGVTdWJ0cmVlKFxuICBub2RlczogQWpmTm9kZVtdLFxuICBwYXJlbnROb2RlOiBBamZOb2RlLFxuICBicmFuY2g6IG51bWJlciB8IG51bGwgPSBudWxsLFxuKTogQWpmTm9kZVtdIHtcbiAgY29uc3QgZmxhdE5vZGVzID0gZmxhdHRlbk5vZGVzKG5vZGVzKTtcbiAgbGV0IGRlbE5vZGVzOiBBamZOb2RlW10gPSBbXTtcbiAgbGV0IGRlc2NlbmRhbnRzID0gZ2V0RGVzY2VuZGFudHMoZmxhdE5vZGVzLCBwYXJlbnROb2RlLCBicmFuY2gpO1xuICBjb25zdCBsZW4gPSBkZXNjZW5kYW50cy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBkZWxOb2RlcyA9IGRlbE5vZGVzLmNvbmNhdChnZXREZXNjZW5kYW50cyhmbGF0Tm9kZXMsIGRlc2NlbmRhbnRzW2ldKSk7XG4gIH1cbiAgZGVsTm9kZXMgPSBkZWxOb2Rlcy5jb25jYXQoZGVzY2VuZGFudHMpO1xuICByZXR1cm4gcmVtb3ZlTm9kZXMoXG4gICAgbm9kZXMsXG4gICAgZGVsTm9kZXMubWFwKG4gPT4gbi5pZCksXG4gICk7XG59XG5cbmxldCBub2RlVW5pcXVlSWQgPSAwO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIFRoZSBub2RlIHR5cGVzIGF2YWlsYWJsZSBpbiB0aGUgcGFsZXR0ZSwgbGlzdGVkIGJ5IGNhdGVnb3J5IGluIGRpc3BsYXlcbiAgICogb3JkZXIuIEVudHJpZXMgb2YgdGhlIHNhbWUgY2F0ZWdvcnkgYXJlIHJlbmRlcmVkIHVuZGVyIGEgY29tbW9uIGhlYWRlciwgc2VlXG4gICAqIHtAbGluayBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllc30uXG4gICAqL1xuICBwcml2YXRlIF9hdmFpbGFibGVOb2RlVHlwZXM6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdID0gW1xuICAgIHtcbiAgICAgIGxhYmVsOiAnU2xpZGUnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZTbGlkZX0sXG4gICAgICBpc1NsaWRlOiB0cnVlLFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLnN0cnVjdHVyZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnUmVwZWF0aW5nIHNsaWRlJyxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5zdHJ1Y3R1cmUsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1N0cmluZycsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlN0cmluZ30sXG4gICAgICBjYXRlZ29yeTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXMudGV4dCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGV4dCcsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRleHR9LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLnRleHQsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ05vdGUnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5FbXB0eX0sXG4gICAgICBjYXRlZ29yeTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXMudGV4dCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnTnVtYmVyJyxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTnVtYmVyfSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5udW1lcmljLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdCb29sZWFuJyxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuQm9vbGVhbn0sXG4gICAgICBjYXRlZ29yeTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXMuY2hvaWNlcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU2luZ2xlIGNob2ljZScsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZX0sXG4gICAgICBjYXRlZ29yeTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXMuY2hvaWNlcyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnTXVsdGlwbGUgY2hvaWNlJyxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2V9LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLmNob2ljZXMsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1JhbmdlJyxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuUmFuZ2V9LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLmNob2ljZXMsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0RhdGUgcmFuZ2UnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5EYXRlUmFuZ2V9LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLmRhdGVUaW1lLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdEYXRlIGlucHV0JyxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZUlucHV0fSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5kYXRlVGltZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGltZScsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRpbWV9LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLmRhdGVUaW1lLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdHZW9sb2NhdGlvbicsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkdlb2xvY2F0aW9ufSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5hZHZhbmNlZCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnSW1hZ2UnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5JbWFnZX0sXG4gICAgICBjYXRlZ29yeTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXMuYWR2YW5jZWQsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0JhcmNvZGUnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5CYXJjb2RlfSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5hZHZhbmNlZCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRm9ybXVsYScsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkZvcm11bGF9LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLmFkdmFuY2VkLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdUYWJsZScsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlRhYmxlfSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5hZHZhbmNlZCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRmlsZScsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkZpbGV9LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLmFkdmFuY2VkLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdTaWduYXR1cmUnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5TaWduYXR1cmV9LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLmFkdmFuY2VkLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdBdWRpbycsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkF1ZGlvfSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5hZHZhbmNlZCxcbiAgICB9LFxuICBdO1xuICAvKipcbiAgICogQXZhaWxhYmxlIG5vZGUgdHlwZXNcbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBhdmFpbGFibGVOb2RlVHlwZXMoKTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5W10ge1xuICAgIHJldHVybiB0aGlzLl9hdmFpbGFibGVOb2RlVHlwZXM7XG4gIH1cblxuICBwcml2YXRlIF9mb3JtOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybSB8IG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtIHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2Zvcm1PYnM6IE9ic2VydmFibGU8QWpmRm9ybSB8IG51bGw+ID0gdGhpcy5fZm9ybSBhcyBPYnNlcnZhYmxlPEFqZkZvcm0gfCBudWxsPjtcblxuICAvKipcbiAgICogQ3VycmVudCBlZGl0ZWQgZm9ybSBzdHJlYW1cbiAgICpcbiAgICogQHJlYWRvbmx5XG4gICAqIEBtZW1iZXJPZiBBamZGb3JtQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGdldCBmb3JtKCk6IE9ic2VydmFibGU8QWpmRm9ybSB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZm9ybU9icztcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10+ID0gb2JzT2YoW10pO1xuICBnZXQgYXR0YWNobWVudHNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucztcbiAgfVxuXG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPiA9IG9ic09mKFtdKTtcbiAgZ2V0IGNob2ljZXNPcmlnaW5zKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+W10+IHtcbiAgICByZXR1cm4gdGhpcy5fY2hvaWNlc09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+ID0gb2JzT2YoW10pO1xuICBnZXQgc3RyaW5nSWRlbnRpZmllcigpOiBPYnNlcnZhYmxlPEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fc3RyaW5nSWRlbnRpZmllcjtcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVzV2l0aG91dENob2ljZU9yaWdpbnM6IE9ic2VydmFibGU8QWpmU2xpZGVbXT4gPSBvYnNPZihbXSk7XG4gIHByaXZhdGUgX25vZGVzOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4gPSBvYnNPZihbXSk7XG4gIGdldCBub2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXROb2RlczogT2JzZXJ2YWJsZTxBamZOb2RlW10+IHwgdW5kZWZpbmVkO1xuICBnZXQgZmxhdE5vZGVzKCk6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2RlcztcbiAgfVxuXG4gIHByaXZhdGUgX2ZsYXRGaWVsZHM6IE9ic2VydmFibGU8QWpmRmllbGRbXT4gPSBvYnNPZihbXSk7XG4gIGdldCBmbGF0RmllbGRzKCk6IE9ic2VydmFibGU8QWpmRmllbGRbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mbGF0RmllbGRzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbm9kZUVudHJpZXNUcmVlOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+ID0gb2JzT2YoW10pO1xuICBnZXQgbm9kZUVudHJpZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cmllc1RyZWU7XG4gIH1cblxuICAvKipcbiAgICogQSBsaXN0IG9mIHRoZSBpZHMgb2YgdGhlIGRyb3BMaXN0cyBjb25uZWN0ZWQgdG8gdGhlIHNvdXJjZSBsaXN0LlxuICAgKi9cbiAgcHJpdmF0ZSBfY29ubmVjdGVkRHJvcExpc3RzOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4oW10pO1xuICBnZXQgY29ubmVjdGVkRHJvcExpc3RzKCk6IEJlaGF2aW9yU3ViamVjdDxzdHJpbmdbXT4ge1xuICAgIHJldHVybiB0aGlzLl9jb25uZWN0ZWREcm9wTGlzdHM7XG4gIH1cblxuICAvKipcbiAgICogQSBkaWN0aW9uYXJ5IG9mIHRoZSAnZXhwYW5kZWQnIHN0YXR1cyBvZiBhbGwgbm9kZUVudHJpZXMgaW4gdGhlIHRyZWUge25vZGUubmFtZTogYm9vbGVhbn1cbiAgICovXG4gIHByaXZhdGUgX25vZGVFbnRyaWVzVHJlZUV4cGFuZGVkU3RhdHVzOiBCZWhhdmlvclN1YmplY3Q8e1tuYW1lOiBzdHJpbmddOiBib29sZWFufT4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8e1tuYW1lOiBzdHJpbmddOiBib29sZWFufT4oe30pO1xuICBnZXQgbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMoKTogQmVoYXZpb3JTdWJqZWN0PHtbbmFtZTogc3RyaW5nXTogYm9vbGVhbn0+IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXM7XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lcyB0aGUgZGVmYXVsdCBleHBhbmRlZCBzdGF0ZSBvZiBub2RlRW50cmllcyB3aGVuIHRoZSBGb3JtQnVpbGRlciBsb2Fkc1xuICAgKi9cbiAgcHJpdmF0ZSBfZGVmYXVsdEV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfZWRpdGVkTm9kZUVudHJ5OiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9lZGl0ZWROb2RlRW50cnlPYnM6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiA9IHRoaXNcbiAgICAuX2VkaXRlZE5vZGVFbnRyeSBhcyBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD47XG4gIGdldCBlZGl0ZWROb2RlRW50cnkoKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5fZWRpdGVkTm9kZUVudHJ5T2JzO1xuICB9XG5cbiAgLyoqXG4gICAqIE5ldyBmaWVsZCBvciBub2RlIGp1c3QgYWRkZWQgaW4gdHJlZVxuICAgKi9cbiAgcHJpdmF0ZSBfbmV3Tm9kZUVudHJ5OiBCZWhhdmlvclN1YmplY3Q8QWpmTm9kZSB8IEFqZkZpZWxkIHwgbnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFxuICAgIEFqZk5vZGUgfCBBamZGaWVsZCB8IG51bGxcbiAgPihudWxsKTtcblxuICBwcml2YXRlIF9lZGl0ZWRDb25kaXRpb246IEJlaGF2aW9yU3ViamVjdDxBamZDb25kaXRpb24gfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZDb25kaXRpb24gfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkQ29uZGl0aW9uT2JzOiBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbiB8IG51bGw+ID0gdGhpc1xuICAgIC5fZWRpdGVkQ29uZGl0aW9uIGFzIE9ic2VydmFibGU8QWpmQ29uZGl0aW9uIHwgbnVsbD47XG4gIGdldCBlZGl0ZWRDb25kaXRpb24oKTogT2JzZXJ2YWJsZTxBamZDb25kaXRpb24gfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZENvbmRpdGlvbk9icztcbiAgfVxuXG4gIHByaXZhdGUgX2VkaXRlZENob2ljZXNPcmlnaW46IEJlaGF2aW9yU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luPGFueT4gfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luPGFueT4gfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkQ2hvaWNlc09yaWdpbk9iczogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT4gfCBudWxsPiA9IHRoaXNcbiAgICAuX2VkaXRlZENob2ljZXNPcmlnaW4gYXMgT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT4gfCBudWxsPjtcbiAgZ2V0IGVkaXRlZENob2ljZXNPcmlnaW4oKTogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT4gfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW5PYnM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWROb2Rlc1ZhbGlkYXRpb246IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlclZhbGlkYXRpb24gfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxBamZGb3JtQnVpbGRlclZhbGlkYXRpb24gfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkTm9kZXNWYWxpZGF0aW9uT2JzOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyVmFsaWRhdGlvbiB8IG51bGw+ID0gdGhpc1xuICAgIC5fZWRpdGVkTm9kZXNWYWxpZGF0aW9uIGFzIE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJWYWxpZGF0aW9uIHwgbnVsbD47XG4gIGdldCBlZGl0ZWROb2Rlc1ZhbGlkYXRpb24oKTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlclZhbGlkYXRpb24gfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZE5vZGVzVmFsaWRhdGlvbk9icztcbiAgfVxuXG4gIHByaXZhdGUgX2JlZm9yZU5vZGVzVXBkYXRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2JlZm9yZU5vZGVzVXBkYXRlT2JzOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUgYXMgT2JzZXJ2YWJsZTx2b2lkPjtcbiAgZ2V0IGJlZm9yZU5vZGVzVXBkYXRlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZU9icztcbiAgfVxuICBwcml2YXRlIF9hZnRlck5vZGVVcGRhdGU6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfYWZ0ZXJOb2RlVXBkYXRlT2JzOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fYWZ0ZXJOb2RlVXBkYXRlIGFzIE9ic2VydmFibGU8dm9pZD47XG4gIGdldCBhZnRlck5vZGVVcGRhdGUoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2FmdGVyTm9kZVVwZGF0ZU9icztcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVzVXBkYXRlczogU3ViamVjdDxBamZOb2Rlc09wZXJhdGlvbj4gPSBuZXcgU3ViamVjdDxBamZOb2Rlc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfYXR0YWNobWVudHNPcmlnaW5zVXBkYXRlczogU3ViamVjdDxBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2Nob2ljZXNPcmlnaW5zVXBkYXRlczogU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9zdHJpbmdJZGVudGlmaWVyVXBkYXRlczogU3ViamVjdDxBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3NhdmVOb2RlRW50cnlFdmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgcHJpdmF0ZSBfZGVsZXRlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+KCk7XG4gIC8qKlxuICAgKiBFdmVudCBmaXJlZCB3aGVuIHRoZSBwb3NpdGlvbiBvZiBhIG5vZGUgaW4gYSB0cmVlIGNoYW5nZXMuXG4gICAqL1xuICBwcml2YXRlIF9tb3ZlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxBamZGb3JtQnVpbGRlck1vdmVFdmVudD4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJNb3ZlRXZlbnQ+KCk7XG5cbiAgLyoqXG4gICAqIFN1YnNjcmliZXMgdG8gdGhlIG1vdmVOb2RlRW50cnlFdmVudCBldmVudCBlbWl0dGVyO1xuICAgKi9cbiAgcHJpdmF0ZSBfbW92ZU5vZGVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICAvKipcbiAgICogQ291bnRlcnMgZm9yIGRlZmF1bHQgbmFtZSBhc3NpZ25lZCB0byBpbnNlcnRlZCBmaWVsZHMvc2xpZGVzXG4gICAqL1xuICBwcml2YXRlIF9lbXB0eUZpZWxkQ291bnRlcjogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBfZW1wdHlTbGlkZUNvdW50ZXI6IG51bWJlciA9IDE7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5faW5pdENob2ljZXNPcmlnaW5zU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdFN0cmluZ0lkZW50aWZpZXJTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdE5vZGVzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRGb3JtU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRTYXZlTm9kZSgpO1xuICAgIHRoaXMuX2luaXRNb3ZlTm9kZSgpO1xuICAgIHRoaXMuX2luaXREZWxldGVOb2RlKCk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyB0aGUgY3VycmVudCBlZGl0ZWQgZm9ybVxuICAgKlxuICAgKiBAcGFyYW0gZm9ybVxuICAgKlxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBzZXRGb3JtKGZvcm06IEFqZkZvcm0gfCBudWxsKTogdm9pZCB7XG4gICAgaWYgKGZvcm0gIT09IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKSkge1xuICAgICAgdGhpcy5fZm9ybS5uZXh0KGZvcm0pO1xuICAgIH1cbiAgfVxuXG4gIGVkaXROb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG5vZGVFbnRyeSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgbm9kZSB2YWxpZGF0aW9uIGVudHJ5XG4gICAqIEBwYXJhbSBmYk5vZGVWYWxpZGF0aW9uXG4gICAqL1xuICBlZGl0Tm9kZVZhbGlkYXRpb24oZmJOb2RlVmFsaWRhdGlvbjogQWpmRm9ybUJ1aWxkZXJWYWxpZGF0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkTm9kZXNWYWxpZGF0aW9uLm5leHQoe1xuICAgICAgLi4udGhpcy5fZWRpdGVkTm9kZXNWYWxpZGF0aW9uLnZhbHVlLFxuICAgICAgLi4uZmJOb2RlVmFsaWRhdGlvbixcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm4gaWYgYSBub2RlIGlzIHZhbGlkXG4gICAqIEBwYXJhbSBub2RlTmFtZVxuICAgKi9cbiAgaXNOb2RlVmFsaWQobm9kZU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGFsbE5vZGVWYWxpZGF0aW9ucyA9IHRoaXMuX2VkaXRlZE5vZGVzVmFsaWRhdGlvbi52YWx1ZTtcbiAgICBpZiAoIWFsbE5vZGVWYWxpZGF0aW9ucyB8fCBhbGxOb2RlVmFsaWRhdGlvbnNbbm9kZU5hbWVdID09IG51bGwpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gYWxsTm9kZVZhbGlkYXRpb25zW25vZGVOYW1lXS5pc1ZhbGlkO1xuICB9XG5cbiAgLyoqXG4gICAqIENsZWFuIG5vZGUgdmFsaWRhdGlvbiBlbnRyaWVzIHdoZW4gYSBub2RlIGlzIGRlbGV0ZWRcbiAgICogQHBhcmFtIGZiTm9kZVZhbGlkYXRpb24gdGhlIGRlbGV0ZWQgbm9kZVxuICAgKi9cbiAgY2xlYW5Ob2RlVmFsaWRhdGlvbihmYk5vZGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoZmJOb2RlTmFtZSkge1xuICAgICAgLy8gc2V0IHZhbGlkYXRpb24gdHJ1ZSBmb3Igb2xkIHVudXNlZCBuYW1lXG4gICAgICBjb25zdCBmYk5vZGVWYWxpZGF0aW9uOiBBamZGb3JtQnVpbGRlclZhbGlkYXRpb24gPSB7fTtcbiAgICAgIGZiTm9kZVZhbGlkYXRpb25bZmJOb2RlTmFtZV0gPSB7aXNWYWxpZDogdHJ1ZSwgZXJyb3JzOiBudWxsfTtcbiAgICAgIHRoaXMuZWRpdE5vZGVWYWxpZGF0aW9uKGZiTm9kZVZhbGlkYXRpb24pO1xuICAgIH1cblxuICAgIC8vIENsZWFuIGFsbCBub3QgZXhpc3RpbmcgaW52YWxpZCBub2Rlc1xuICAgIGNvbnN0IGFsbE5vZGVWYWxpZGF0aW9ucyA9IHRoaXMuX2VkaXRlZE5vZGVzVmFsaWRhdGlvbi52YWx1ZTtcbiAgICBpZiAoYWxsTm9kZVZhbGlkYXRpb25zICYmIHRoaXMuX2ZsYXROb2Rlcykge1xuICAgICAgY29uc3QgaW52YWxpZE5vZGVzOiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgICBPYmplY3Qua2V5cyhhbGxOb2RlVmFsaWRhdGlvbnMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgaWYgKGFsbE5vZGVWYWxpZGF0aW9uc1trZXldPy5pc1ZhbGlkID09PSBmYWxzZSkge1xuICAgICAgICAgIGludmFsaWROb2Rlcy5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAoaW52YWxpZE5vZGVzLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9mbGF0Tm9kZXMucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUobm9kZXMgPT4ge1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nTm9kZU5hbWVzID0gbmV3IFNldChub2Rlcy5tYXAobiA9PiBuLm5hbWUpKTtcblxuICAgICAgICAgIGludmFsaWROb2Rlcy5mb3JFYWNoKGludmFsaWROb2RlID0+IHtcbiAgICAgICAgICAgIGlmICghZXhpc3RpbmdOb2RlTmFtZXMuaGFzKGludmFsaWROb2RlKSkge1xuICAgICAgICAgICAgICBkZWxldGUgYWxsTm9kZVZhbGlkYXRpb25zW2ludmFsaWROb2RlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHRoaXMuX2VkaXRlZE5vZGVzVmFsaWRhdGlvbi5uZXh0KGFsbE5vZGVWYWxpZGF0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGVkaXRDb25kaXRpb24oY29uZGl0aW9uOiBBamZDb25kaXRpb24pOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDb25kaXRpb24ubmV4dChjb25kaXRpb24pO1xuICB9XG5cbiAgc2F2ZUN1cnJlbnRDb25kaXRpb24oY29uZGl0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgYyA9IHRoaXMuX2VkaXRlZENvbmRpdGlvbi5nZXRWYWx1ZSgpO1xuICAgIGlmIChjID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYy5jb25kaXRpb24gPSBjb25kaXRpb247XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLm5leHQobnVsbCk7XG4gIH1cblxuICBjYW5jZWxDb25kaXRpb25FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIGFzc2lnbkxpc3RJZChub2RlOiBBamZOb2RlLCBlbXB0eTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcbiAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUgfHwgbm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgIGNvbnN0IGxpc3RJZCA9IGVtcHR5ID8gYGVtcHR5X2ZpZWxkc19saXN0XyR7bm9kZS5pZH1gIDogYGZpZWxkc19saXN0XyR7bm9kZS5pZH1gO1xuICAgICAgaWYgKHRoaXMuX2Nvbm5lY3RlZERyb3BMaXN0cy52YWx1ZS5pbmRleE9mKGxpc3RJZCkgPT0gLTEpIHtcbiAgICAgICAgdGhpcy5fY29ubmVjdERyb3BMaXN0KGxpc3RJZCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbGlzdElkO1xuICAgIH1cbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBpbnNlcnROb2RlKFxuICAgIG5vZGVUeXBlOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnksXG4gICAgcGFyZW50OiBBamZOb2RlLFxuICAgIHBhcmVudE5vZGU6IG51bWJlcixcbiAgICBpbkNvbnRlbnQgPSBmYWxzZSxcbiAgICBpbnNlcnRJbkluZGV4ID0gMCxcbiAgKTogdm9pZCB7XG4gICAgbGV0IG5vZGU6IEFqZk5vZGUgfCBBamZGaWVsZDtcbiAgICBjb25zdCBpZCA9ICsrbm9kZVVuaXF1ZUlkO1xuICAgIGNvbnN0IGlzRmllbGROb2RlID0gbm9kZVR5cGUubm9kZVR5cGU/LmZpZWxkICE9IG51bGw7XG4gICAgaWYgKGlzRmllbGROb2RlKSB7XG4gICAgICBub2RlID0gY3JlYXRlRmllbGQoe1xuICAgICAgICBpZCxcbiAgICAgICAgbm9kZVR5cGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLFxuICAgICAgICBmaWVsZFR5cGU6IG5vZGVUeXBlLm5vZGVUeXBlLmZpZWxkISxcbiAgICAgICAgcGFyZW50OiBwYXJlbnQuaWQsXG4gICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgIG5hbWU6IGBuZXdfZmllbGRfJHt0aGlzLl9lbXB0eUZpZWxkQ291bnRlcn1gLFxuICAgICAgICBsYWJlbDogYE5ldyAke0FqZkZpZWxkVHlwZVtub2RlVHlwZS5ub2RlVHlwZS5maWVsZCFdfSBmaWVsZCAke3RoaXMuX2VtcHR5RmllbGRDb3VudGVyfWAsXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2VtcHR5RmllbGRDb3VudGVyKys7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSBjcmVhdGVDb250YWluZXJOb2RlKHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5vZGVUeXBlOiBub2RlVHlwZS5ub2RlVHlwZS5ub2RlLFxuICAgICAgICBwYXJlbnQ6IDAsXG4gICAgICAgIHBhcmVudE5vZGUsXG4gICAgICAgIG5hbWU6IGBuZXdfc2xpZGVfJHt0aGlzLl9lbXB0eVNsaWRlQ291bnRlcn1gLFxuICAgICAgICBsYWJlbDogYE5ldyBTbGlkZSAke3RoaXMuX2VtcHR5U2xpZGVDb3VudGVyfWAsXG4gICAgICAgIG5vZGVzOiBbXSxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5fZW1wdHlTbGlkZUNvdW50ZXIrKztcbiAgICB9XG4gICAgdGhpcy5jYW5jZWxOb2RlRW50cnlFZGl0KCk7XG4gICAgdGhpcy5fbmV3Tm9kZUVudHJ5Lm5leHQobm9kZSk7XG5cbiAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgY29uc3QgY24gPVxuICAgICAgICBpc0NvbnRhaW5lck5vZGUocGFyZW50KSAmJiBpbkNvbnRlbnRcbiAgICAgICAgICA/IDxBamZDb250YWluZXJOb2RlPnBhcmVudFxuICAgICAgICAgIDogKGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgcGFyZW50KSBhcyBBamZDb250YWluZXJOb2RlKTtcbiAgICAgIGlmICghaXNGaWVsZE5vZGUpIHtcbiAgICAgICAgbGV0IG5ld05vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgIG5ld05vZGVzLnNwbGljZShpbnNlcnRJbkluZGV4LCAwLCBub2RlKTtcbiAgICAgICAgbmV3Tm9kZXMgPSB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoMCwgbmV3Tm9kZXMpO1xuICAgICAgICByZXR1cm4gbmV3Tm9kZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwKTtcbiAgICAgICAgbmV3Tm9kZXMuc3BsaWNlKGluc2VydEluSW5kZXgsIDAsIG5vZGUpO1xuICAgICAgICBuZXdOb2RlcyA9IHRoaXMuX3VwZGF0ZU5vZGVzTGlzdChjbi5pZCwgbmV3Tm9kZXMpO1xuICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH0pO1xuICB9XG5cbiAgc2F2ZU5vZGVFbnRyeShwcm9wZXJ0aWVzOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9zYXZlTm9kZUVudHJ5RXZlbnQuZW1pdChwcm9wZXJ0aWVzKTtcbiAgfVxuXG4gIGNhbmNlbE5vZGVFbnRyeUVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkTm9kZUVudHJ5Lm5leHQobnVsbCk7XG4gIH1cblxuICBkZWxldGVOb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSk6IHZvaWQge1xuICAgIHRoaXMuX2RlbGV0ZU5vZGVFbnRyeUV2ZW50Lm5leHQobm9kZUVudHJ5KTtcbiAgICB0aGlzLmNsZWFuTm9kZVZhbGlkYXRpb24obm9kZUVudHJ5Lm5vZGUubmFtZSk7XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlcnMgdGhlIG1vdmVOb2RlIGV2ZW50IHdoZW4gYSBub2RlIGlzIG1vdmVkIGluIHRoZSBmb3JtYnVpbGRlci5cbiAgICogQHBhcmFtIG5vZGVFbnRyeSBUaGUgbm9kZSB0byBiZSBtb3ZlZC5cbiAgICovXG4gIG1vdmVOb2RlRW50cnkobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSwgZnJvbTogbnVtYmVyLCB0bzogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3QgbW92ZUV2ZW50OiBBamZGb3JtQnVpbGRlck1vdmVFdmVudCA9IHtub2RlRW50cnk6IG5vZGVFbnRyeSwgZnJvbUluZGV4OiBmcm9tLCB0b0luZGV4OiB0b307XG4gICAgdGhpcy5fbW92ZU5vZGVFbnRyeUV2ZW50Lm5leHQobW92ZUV2ZW50KTtcbiAgICB0aGlzLmNhbmNlbE5vZGVFbnRyeUVkaXQoKTtcbiAgfVxuXG4gIGdldEN1cnJlbnRGb3JtKCk6IE9ic2VydmFibGU8QWpmRm9ybT4ge1xuICAgIHJldHVybiBjb21iaW5lTGF0ZXN0KFtcbiAgICAgIHRoaXMuZm9ybSxcbiAgICAgIHRoaXMuX25vZGVzV2l0aG91dENob2ljZU9yaWdpbnMsXG4gICAgICB0aGlzLmF0dGFjaG1lbnRzT3JpZ2lucyxcbiAgICAgIHRoaXMuY2hvaWNlc09yaWdpbnMsXG4gICAgICB0aGlzLnN0cmluZ0lkZW50aWZpZXIsXG4gICAgXSkucGlwZShcbiAgICAgIGZpbHRlcigoW2Zvcm1dKSA9PiBmb3JtICE9IG51bGwpLFxuICAgICAgbWFwKChbZm9ybSwgbm9kZXMsIGF0dGFjaG1lbnRzT3JpZ2lucywgY2hvaWNlc09yaWdpbnMsIHN0cmluZ0lkZW50aWZpZXJdKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMgPSAoZm9ybSB8fCB7fSkuc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucztcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUZvcm0oe1xuICAgICAgICAgIGNob2ljZXNPcmlnaW5zOiBbLi4uY2hvaWNlc09yaWdpbnNdLFxuICAgICAgICAgIGF0dGFjaG1lbnRzT3JpZ2luczogWy4uLmF0dGFjaG1lbnRzT3JpZ2luc10sXG4gICAgICAgICAgc3RyaW5nSWRlbnRpZmllcjogWy4uLihzdHJpbmdJZGVudGlmaWVyIHx8IFtdKV0sXG4gICAgICAgICAgbm9kZXM6IFsuLi5ub2Rlc10sXG4gICAgICAgICAgc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgZWRpdENob2ljZXNPcmlnaW4oY2hvaWNlc09yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KGNob2ljZXNPcmlnaW4pO1xuICB9XG5cbiAgY3JlYXRlQ2hvaWNlc09yaWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQoY3JlYXRlQ2hvaWNlc0ZpeGVkT3JpZ2luPGFueT4oe25hbWU6ICcnfSkpO1xuICB9XG5cbiAgY2FuY2VsQ2hvaWNlc09yaWdpbkVkaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgc2F2ZUNob2ljZXNPcmlnaW4ocGFyYW1zOiB7bGFiZWw6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBjaG9pY2VzOiBhbnlbXX0pOiB2b2lkIHtcbiAgICBjb25zdCBjaG9pY2VzT3JpZ2luID0gdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5nZXRWYWx1ZSgpO1xuICAgIGNvbnN0IGNob2ljZXNPcmlnaW5QcmV2aW91c05hbWU6IHN0cmluZyB8IHVuZGVmaW5lZCA9IGNob2ljZXNPcmlnaW4/Lm5hbWU7XG4gICAgaWYgKGNob2ljZXNPcmlnaW4gIT0gbnVsbCkge1xuICAgICAgY2hvaWNlc09yaWdpbi5sYWJlbCA9IHBhcmFtcy5sYWJlbDtcbiAgICAgIGNob2ljZXNPcmlnaW4ubmFtZSA9IHBhcmFtcy5uYW1lO1xuICAgICAgaWYgKGlzQ2hvaWNlc0ZpeGVkT3JpZ2luKGNob2ljZXNPcmlnaW4pKSB7XG4gICAgICAgIGNob2ljZXNPcmlnaW4uY2hvaWNlcyA9IHBhcmFtcy5jaG9pY2VzO1xuICAgICAgfVxuICAgICAgdGhpcy5fdXBkYXRlQ2hvaWNlc09yaWdpblJlZkluTm9kZXMoY2hvaWNlc09yaWdpblByZXZpb3VzTmFtZSwgcGFyYW1zLm5hbWUpO1xuICAgICAgdGhpcy5fY2hvaWNlc09yaWdpbnNVcGRhdGVzLm5leHQoY2hvaWNlc09yaWdpbnMgPT4ge1xuICAgICAgICBjb25zdCBpZHggPSBjaG9pY2VzT3JpZ2lucy5pbmRleE9mKGNob2ljZXNPcmlnaW4pO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyA9IFtcbiAgICAgICAgICAgIC4uLmNob2ljZXNPcmlnaW5zLnNsaWNlKDAsIGlkeCksXG4gICAgICAgICAgICBjaG9pY2VzT3JpZ2luLFxuICAgICAgICAgICAgLi4uY2hvaWNlc09yaWdpbnMuc2xpY2UoaWR4ICsgMSksXG4gICAgICAgICAgXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyA9IFsuLi5jaG9pY2VzT3JpZ2lucywgY2hvaWNlc09yaWdpbl07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNob2ljZXNPcmlnaW5zO1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIHNhdmVTdHJpbmdJZGVudGlmaWVyKGlkZW50aWZpZXI6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5uZXh0KCgpID0+IFsuLi5pZGVudGlmaWVyXSk7XG4gIH1cblxuICAvKipcbiAgICogUmVzZXRzIHRoZSBub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cyBkaWN0aW9uYXJ5IHRvIGFuIGVtcHR5IG9iamVjdC5cbiAgICovXG4gIHJlc2V0Tm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMoKTogdm9pZCB7XG4gICAgdGhpcy5fbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMubmV4dCh7fSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgZXhwYW5kZWQgc3RhdHVzIG9mIGFuIGVudHJ5IGluIHRoZSBub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cyBkaWN0aW9uYXJ5XG4gICAqIEBwYXJhbSBub2RlTmFtZSBUaGUgdW5pcXVlIG5hbWUgb2YgdGhlIG5vZGVFbnRyeVxuICAgKi9cbiAgZ2V0RXhwYW5kZWRTdGF0dXMobm9kZU5hbWU6IHN0cmluZyk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9ub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cy5waXBlKFxuICAgICAgbWFwKHRyZWUgPT4ge1xuICAgICAgICBpZiAobm9kZU5hbWUgaW4gdHJlZSkge1xuICAgICAgICAgIHJldHVybiB0cmVlW25vZGVOYW1lXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fZGVmYXVsdEV4cGFuZGVkO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVcHNlcnRzIGFuIGVudHJ5IGluIHRoZSBub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cyBkaWN0aW9uYXJ5XG4gICAqIEBwYXJhbSBub2RlTmFtZSBUaGUgdW5pcXVlIG5hbWUgb2YgdGhlIG5vZGVFbnRyeVxuICAgKiBAcGFyYW0gZXhwYW5kZWQgVHJ1ZSBpZiB0aGUgbm9kZUVudHJ5IGlzIGV4cGFuZGVkXG4gICAqL1xuICB1cGRhdGVFeHBhbmRlZFN0YXR1cyhub2RlTmFtZTogc3RyaW5nLCBleHBhbmRlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghbm9kZU5hbWUpIHJldHVybjtcbiAgICBjb25zdCBkaWN0VmFsdWUgPSB0aGlzLl9ub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cy52YWx1ZTtcbiAgICB0aGlzLl9ub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cy5uZXh0KHsuLi5kaWN0VmFsdWUsIFtub2RlTmFtZV06IGV4cGFuZGVkfSk7XG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlcyBhbiBlbnRyeSBmcm9tIHRoZSBub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cyBkaWN0aW9uYXJ5XG4gICAqIEBwYXJhbSBub2RlTmFtZSBUaGUgdW5pcXVlIG5hbWUgb2YgdGhlIG5vZGVFbnRyeVxuICAgKi9cbiAgcmVtb3ZlRXhwYW5kZWRTdGF0dXMobm9kZU5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IGRpY3RWYWx1ZSA9IHRoaXMuX25vZGVFbnRyaWVzVHJlZUV4cGFuZGVkU3RhdHVzLnZhbHVlO1xuICAgIGRlbGV0ZSBkaWN0VmFsdWVbbm9kZU5hbWVdO1xuICAgIHRoaXMuX25vZGVFbnRyaWVzVHJlZUV4cGFuZGVkU3RhdHVzLm5leHQoZGljdFZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGV4cGFuZGVkIHRvIHRydWUgZm9yIGVhY2ggZW50cnkgaW4gdGhlIG5vZGVFbnRyaWVzVHJlZUV4cGFuZGVkU3RhdHVzIGRpY3Rpb25hcnlcbiAgICovXG4gIGV4cGFuZEFsbCgpIHtcbiAgICBjb25zdCBkaWN0VmFsdWUgPSB0aGlzLl9ub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cy52YWx1ZTtcbiAgICBmb3IgKGxldCBub2RlTmFtZSBpbiBkaWN0VmFsdWUpIHtcbiAgICAgIGRpY3RWYWx1ZVtub2RlTmFtZV0gPSB0cnVlO1xuICAgIH1cbiAgICB0aGlzLl9kZWZhdWx0RXhwYW5kZWQgPSB0cnVlO1xuICAgIHRoaXMuX25vZGVFbnRyaWVzVHJlZUV4cGFuZGVkU3RhdHVzLm5leHQoZGljdFZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGV4cGFuZGVkIHRvIGZhbHNlIGZvciBlYWNoIGVudHJ5IGluIHRoZSBub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cyBkaWN0aW9uYXJ5XG4gICAqL1xuICBjb2xsYXBzZUFsbCgpIHtcbiAgICBjb25zdCBkaWN0VmFsdWUgPSB0aGlzLl9ub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cy52YWx1ZTtcbiAgICBmb3IgKGxldCBub2RlTmFtZSBpbiBkaWN0VmFsdWUpIHtcbiAgICAgIGRpY3RWYWx1ZVtub2RlTmFtZV0gPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fZGVmYXVsdEV4cGFuZGVkID0gZmFsc2U7XG4gICAgdGhpcy5fbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMubmV4dChkaWN0VmFsdWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgZW1wdHkgZmllbGRzL3NsaWRlcyBjb3VudGVyc1xuICAgKi9cbiAgcmVzZXRFbXB0eUNvdW50ZXJzKCkge1xuICAgIHRoaXMuX2VtcHR5RmllbGRDb3VudGVyID0gMTtcbiAgICB0aGlzLl9lbXB0eVNsaWRlQ291bnRlciA9IDE7XG4gIH1cblxuICAvKipcbiAgICogU2VhcmNoZXMgdGhlIGZvcm0gbm9kZXMgZm9yIGZpZWxkIG5vZGVzIHdpdGggY2hvaWNlc09yaWdpblJlZiBjb3JyZXNwb25kaW5nXG4gICAqIHRvIGFuIGVkaXRlZCBjaG9pY2VzT3JpZ2luIGFuZCB1cGRhdGVzIGl0IHdpdGggdGhlIG5ldyBuYW1lLlxuICAgKiBAcGFyYW0gcHJldmlvdXNfbmFtZSBUaGUgY2hvaWNlc09yaWdpbiBwcmV2aW91cyBuYW1lXG4gICAqIEBwYXJhbSBuZXdfbmFtZSBUaGUgY2hvaWNlc09yaWdpbiBuZXcgbmFtZVxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlQ2hvaWNlc09yaWdpblJlZkluTm9kZXMocHJldmlvdXNfbmFtZT86IHN0cmluZywgbmV3X25hbWU/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAoIXByZXZpb3VzX25hbWUgfHwgIW5ld19uYW1lKSByZXR1cm47XG4gICAgY29uc3QgY3VycmVudEZvcm06IEFqZkZvcm0gfCBudWxsID0gdGhpcy5fZm9ybS52YWx1ZTtcbiAgICBpZiAoIWN1cnJlbnRGb3JtKSByZXR1cm47XG4gICAgY29uc3QgdXBkYXRlZE5vZGVzOiBBamZOb2RlW10gPSBbXTtcbiAgICBjb25zdCBjdXJyZW50U2xpZGVzOiAoQWpmU2xpZGUgfCBBamZSZXBlYXRpbmdTbGlkZSlbXSA9IGN1cnJlbnRGb3JtLm5vZGVzO1xuICAgIGZvciAobGV0IHNsaWRlIG9mIGN1cnJlbnRTbGlkZXMpIHtcbiAgICAgIGlmICghc2xpZGUubm9kZXMgfHwgIXNsaWRlLm5vZGVzLmxlbmd0aCkgY29udGludWU7XG4gICAgICBmb3IgKGxldCBub2RlIG9mIHNsaWRlLm5vZGVzKSB7XG4gICAgICAgIGNvbnN0IG5vZGVPYmogPSBub2RlIGFzIHtba2V5OiBzdHJpbmddOiBhbnl9O1xuICAgICAgICBpZiAobm9kZU9ialsnY2hvaWNlc09yaWdpblJlZiddICYmIG5vZGVPYmpbJ2Nob2ljZXNPcmlnaW5SZWYnXSA9PT0gcHJldmlvdXNfbmFtZSkge1xuICAgICAgICAgIG5vZGVPYmpbJ2Nob2ljZXNPcmlnaW5SZWYnXSA9IG5ld19uYW1lO1xuICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVPYmogYXMgQWpmTm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKF9ub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgIHJldHVybiBjdXJyZW50Rm9ybS5ub2Rlcy5zbGljZSgwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkRm9ybUJ1aWxkZXJOb2Rlc1RyZWUobm9kZXM6IEFqZk5vZGVbXSk6IChBamZGb3JtQnVpbGRlck5vZGUgfCBudWxsKVtdIHtcbiAgICB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoMCwgbm9kZXMpO1xuICAgIGNvbnN0IHJvb3ROb2RlcyA9IG5vZGVzLmZpbHRlcihcbiAgICAgIG4gPT4gbi5ub2RlVHlwZSA9PSBBamZOb2RlVHlwZS5BamZTbGlkZSB8fCBuLm5vZGVUeXBlID09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlLFxuICAgICk7XG4gICAgaWYgKHJvb3ROb2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBbbnVsbF07XG4gICAgfVxuICAgIGNvbnN0IHJvb3ROb2RlID0gcm9vdE5vZGVzWzBdO1xuICAgIGlmIChpc1NsaWRlc05vZGUocm9vdE5vZGUpKSB7XG4gICAgICBjb25zdCB0cmVlOiBBamZGb3JtQnVpbGRlck5vZGVbXSA9IFtdO1xuICAgICAgdHJlZS5wdXNoKDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT57XG4gICAgICAgIG5vZGU6IHJvb3ROb2RlLFxuICAgICAgICBjb250YWluZXI6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKG5vZGVzLCByb290Tm9kZSksXG4gICAgICAgIGNvbnRlbnQ6IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQobm9kZXMsIHJvb3ROb2RlKSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBsYXN0QWRkZWRBamZOb2RlID0gdGhpcy5fbmV3Tm9kZUVudHJ5LnZhbHVlO1xuICAgICAgaWYgKGxhc3RBZGRlZEFqZk5vZGUpIHtcbiAgICAgICAgY29uc3QgbGFzdEFkZGVkRmJOb2RlID0gdGhpcy5fZmluZE5vZGVJblRyZWUodHJlZSwgbGFzdEFkZGVkQWpmTm9kZSk7XG4gICAgICAgIGlmIChsYXN0QWRkZWRGYk5vZGUpIHtcbiAgICAgICAgICB0aGlzLmVkaXROb2RlRW50cnkoPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5Pmxhc3RBZGRlZEZiTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbmV3Tm9kZUVudHJ5Lm5leHQobnVsbCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJlZTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGZvcm0gZGVmaW5pdGlvbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIEZpbmQgYW4gYWpmTm9kZSBpbiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB0cmVlLCBieSBub2RlIG5hbWVcbiAgICogQHBhcmFtIHRyZWVcbiAgICogQHBhcmFtIG5vZGVcbiAgICogQHJldHVybnMgdGhlIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IG5vZGVcbiAgICovXG4gIHByaXZhdGUgX2ZpbmROb2RlSW5UcmVlKFxuICAgIHRyZWU6IEFqZkZvcm1CdWlsZGVyTm9kZVtdLFxuICAgIG5vZGU6IEFqZk5vZGUgfCBBamZGaWVsZCxcbiAgKTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsIHtcbiAgICBmb3IgKGNvbnN0IGZibiBvZiB0cmVlKSB7XG4gICAgICBjb25zdCBmYmUgPSBmYm4gYXMgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk7XG4gICAgICBpZiAoZmJlLm5vZGU/Lm5hbWUgPT09IG5vZGUubmFtZSkge1xuICAgICAgICByZXR1cm4gZmJlO1xuICAgICAgfVxuICAgICAgaWYgKGZiZS5jb250ZW50ICYmIGZiZS5jb250ZW50Lmxlbmd0aCkge1xuICAgICAgICBjb25zdCBmb3VuZEluQ29udGVudCA9IHRoaXMuX2ZpbmROb2RlSW5UcmVlKGZiZS5jb250ZW50LCBub2RlKTtcbiAgICAgICAgaWYgKGZvdW5kSW5Db250ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIGZvdW5kSW5Db250ZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZmJlLmNoaWxkcmVuICYmIGZiZS5jaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZm91bmRJbkNoaWxkcmVuID0gdGhpcy5fZmluZE5vZGVJblRyZWUoZmJlLmNoaWxkcmVuLCBub2RlKTtcbiAgICAgICAgaWYgKGZvdW5kSW5DaGlsZHJlbikge1xuICAgICAgICAgIHJldHVybiBmb3VuZEluQ2hpbGRyZW47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyB0aGUgaWQgb2YgYSBkcm9wTGlzdCB0byBiZSBjb25uZWN0ZWQgd2l0aCB0aGUgRm9ybUJ1aWxkZXIgc291cmNlIGxpc3QuXG4gICAqIEBwYXJhbSBsaXN0SWQgVGhlIGlkIG9mIHRoZSBsaXN0IHRvIGNvbm5lY3QuXG4gICAqL1xuICBwcml2YXRlIF9jb25uZWN0RHJvcExpc3QobGlzdElkOiBzdHJpbmcpIHtcbiAgICBsZXQgY29ubmVjdGVkTGlzdHMgPSB0aGlzLl9jb25uZWN0ZWREcm9wTGlzdHMudmFsdWUuc2xpY2UoMCk7XG4gICAgdGhpcy5fY29ubmVjdGVkRHJvcExpc3RzLm5leHQoWy4uLmNvbm5lY3RlZExpc3RzLCBsaXN0SWRdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpbmRNYXhOb2RlSWQobm9kZXM6IEFqZk5vZGVbXSwgX2N1ck1heElkID0gMCk6IG51bWJlciB7XG4gICAgbGV0IG1heElkID0gMDtcbiAgICBsZXQgbWF4TmV3RmllbGRDb3VudGVyID0gMDtcbiAgICBsZXQgbWF4TmV3U2xpZGVDb3VudGVyID0gMDtcbiAgICBub2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgbWF4SWQgPSBNYXRoLm1heChtYXhJZCwgbi5pZCk7XG4gICAgICBpZiAoaXNDb250YWluZXJOb2RlKG4pKSB7XG4gICAgICAgIG1heElkID0gTWF0aC5tYXgobWF4SWQsIHRoaXMuX2ZpbmRNYXhOb2RlSWQoKDxBamZDb250YWluZXJOb2RlPm4pLm5vZGVzKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChuLm5hbWUuc3RhcnRzV2l0aCgnbmV3X2ZpZWxkXycpKSB7XG4gICAgICAgIGNvbnN0IG5ld0ZpZWxkTnVtYmVyID0gdGhpcy5fZXh0cmFjdE51bWJlckZyb21OYW1lKG4ubmFtZSwgJ25ld19maWVsZF8nKTtcbiAgICAgICAgaWYgKG5ld0ZpZWxkTnVtYmVyICE9PSBudWxsKSB7XG4gICAgICAgICAgbWF4TmV3RmllbGRDb3VudGVyID0gTWF0aC5tYXgobWF4TmV3RmllbGRDb3VudGVyLCBuZXdGaWVsZE51bWJlcik7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobi5uYW1lLnN0YXJ0c1dpdGgoJ25ld19zbGlkZV8nKSkge1xuICAgICAgICBjb25zdCBuZXdTbGlkZU51bWJlciA9IHRoaXMuX2V4dHJhY3ROdW1iZXJGcm9tTmFtZShuLm5hbWUsICduZXdfc2xpZGVfJyk7XG4gICAgICAgIGlmIChuZXdTbGlkZU51bWJlciAhPT0gbnVsbCkge1xuICAgICAgICAgIG1heE5ld1NsaWRlQ291bnRlciA9IE1hdGgubWF4KG1heE5ld1NsaWRlQ291bnRlciwgbmV3U2xpZGVOdW1iZXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5fZW1wdHlGaWVsZENvdW50ZXIgPSBNYXRoLm1heCh0aGlzLl9lbXB0eUZpZWxkQ291bnRlciwgbWF4TmV3RmllbGRDb3VudGVyICsgMSk7XG4gICAgdGhpcy5fZW1wdHlTbGlkZUNvdW50ZXIgPSBNYXRoLm1heCh0aGlzLl9lbXB0eVNsaWRlQ291bnRlciwgbWF4TmV3U2xpZGVDb3VudGVyICsgMSk7XG4gICAgcmV0dXJuIG1heElkO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXh0cmFjdE51bWJlckZyb21OYW1lKHN0cjogc3RyaW5nLCBwcmVmaXg6IHN0cmluZyk6IG51bWJlciB8IG51bGwge1xuICAgIGNvbnN0IHJlZ2V4ID0gbmV3IFJlZ0V4cChgXiR7cHJlZml4fShcXFxcZCspJGApO1xuICAgIGNvbnN0IG1hdGNoID0gcmVnZXguZXhlYyhzdHIpO1xuICAgIHJldHVybiBtYXRjaCA/IE51bWJlcihtYXRjaFsxXSkgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1TdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm0uc3Vic2NyaWJlKChmb3JtOiBBamZGb3JtIHwgbnVsbCkgPT4ge1xuICAgICAgbm9kZVVuaXF1ZUlkID0gMDtcbiAgICAgIGlmIChmb3JtICE9IG51bGwgJiYgZm9ybS5ub2RlcyAhPSBudWxsICYmIGZvcm0ubm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBub2RlVW5pcXVlSWQgPSB0aGlzLl9maW5kTWF4Tm9kZUlkKGZvcm0ubm9kZXMpO1xuICAgICAgfVxuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKF9ub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLm5vZGVzICE9IG51bGwgPyBmb3JtLm5vZGVzLnNsaWNlKDApIDogW107XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMubmV4dChcbiAgICAgICAgKF9hdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSk6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmF0dGFjaG1lbnRzT3JpZ2lucyAhPSBudWxsXG4gICAgICAgICAgICA/IGZvcm0uYXR0YWNobWVudHNPcmlnaW5zLnNsaWNlKDApXG4gICAgICAgICAgICA6IFtdO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcy5uZXh0KFxuICAgICAgICAoX2Nob2ljZXNPcmlnaW5zOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSk6IEFqZkNob2ljZXNPcmlnaW48YW55PltdID0+IHtcbiAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uY2hvaWNlc09yaWdpbnMgIT0gbnVsbCA/IGZvcm0uY2hvaWNlc09yaWdpbnMuc2xpY2UoMCkgOiBbXTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5uZXh0KFxuICAgICAgICAoXzogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSk6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10gPT4ge1xuICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5zdHJpbmdJZGVudGlmaWVyICE9IG51bGxcbiAgICAgICAgICAgID8gZm9ybS5zdHJpbmdJZGVudGlmaWVyLnNsaWNlKDApXG4gICAgICAgICAgICA6IFtdO1xuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDaG9pY2VzT3JpZ2luc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2hvaWNlc09yaWdpbnMgPSAoPE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChjaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sIG9wOiBBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3AoY2hvaWNlc09yaWdpbnMpO1xuICAgICAgfSwgW10pLFxuICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRBdHRhY2htZW50c09yaWdpbnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2lucyA9IHRoaXMuX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXMucGlwZShcbiAgICAgIHNjYW4oXG4gICAgICAgIChhdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSwgb3A6IEFqZkF0dGFjaG1lbnRzT3JpZ2luc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgIHJldHVybiBvcChhdHRhY2htZW50c09yaWdpbnMpO1xuICAgICAgICB9LFxuICAgICAgICBbXSxcbiAgICAgICksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFN0cmluZ0lkZW50aWZpZXJTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX3N0cmluZ0lkZW50aWZpZXIgPSB0aGlzLl9zdHJpbmdJZGVudGlmaWVyVXBkYXRlcy5waXBlKFxuICAgICAgc2Nhbigoc3RyaW5nSWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXSwgb3A6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChzdHJpbmdJZGVudGlmaWVyKTtcbiAgICAgIH0sIFtdKSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZXNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzID0gKDxPYnNlcnZhYmxlPEFqZk5vZGVzT3BlcmF0aW9uPj50aGlzLl9ub2Rlc1VwZGF0ZXMpLnBpcGUoXG4gICAgICBzY2FuKChub2RlczogQWpmTm9kZVtdLCBvcDogQWpmTm9kZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKG5vZGVzKTtcbiAgICAgIH0sIFtdKSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG5cbiAgICB0aGlzLl9ub2Rlc1dpdGhvdXRDaG9pY2VPcmlnaW5zID0gKHRoaXMuX25vZGVzIGFzIE9ic2VydmFibGU8QWpmU2xpZGVbXT4pLnBpcGUoXG4gICAgICBtYXAoc2xpZGVzID0+XG4gICAgICAgIHNsaWRlcy5tYXAoc2xpZGUgPT4ge1xuICAgICAgICAgIHNsaWRlLm5vZGVzID0gKHNsaWRlLm5vZGVzIGFzIEFqZkZpZWxkW10pLm1hcCgobm9kZTogQWpmRmllbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgY29uc3Qge2Nob2ljZXMsIGNob2ljZXNPcmlnaW4sIC4uLmZ3Y30gPSBkZWVwQ29weShub2RlKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ3YyBhcyBBamZGaWVsZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBzbGlkZTtcbiAgICAgICAgfSksXG4gICAgICApLFxuICAgICk7XG5cbiAgICB0aGlzLl9mbGF0Tm9kZXMgPSB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgbWFwKChub2RlczogQWpmTm9kZVtdKSA9PiBmbGF0dGVuTm9kZXMobm9kZXMpKSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG5cbiAgICB0aGlzLl9mbGF0RmllbGRzID0gdGhpcy5fZmxhdE5vZGVzLnBpcGUoXG4gICAgICBtYXAoKG5vZGVzOiBBamZOb2RlW10pID0+IDxBamZGaWVsZFtdPm5vZGVzLmZpbHRlcihuID0+ICFpc0NvbnRhaW5lck5vZGUobikpKSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG5cbiAgICB0aGlzLl9ub2RlRW50cmllc1RyZWUgPSB0aGlzLl9ub2Rlcy5waXBlKFxuICAgICAgbWFwKG5vZGVzID0+IDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPnRoaXMuX2J1aWxkRm9ybUJ1aWxkZXJOb2Rlc1RyZWUobm9kZXMpKSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0U2F2ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50XG4gICAgICAucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5lZGl0ZWROb2RlRW50cnksIHRoaXMuY2hvaWNlc09yaWdpbnMsIHRoaXMuYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICAgICAgZmlsdGVyKChbXywgbm9kZUVudHJ5XSkgPT4gbm9kZUVudHJ5ICE9IG51bGwpLFxuICAgICAgICBtYXAoKFtwcm9wZXJ0aWVzLCBuZV0pID0+IHtcbiAgICAgICAgICB0aGlzLl9iZWZvcmVOb2Rlc1VwZGF0ZS5lbWl0KCk7XG4gICAgICAgICAgY29uc3Qgbm9kZUVudHJ5ID0gbmUgYXMgQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk7XG4gICAgICAgICAgY29uc3Qgb3JpZ05vZGUgPSBub2RlRW50cnkubm9kZTtcbiAgICAgICAgICBjb25zdCBub2RlID0gZGVlcENvcHkob3JpZ05vZGUpO1xuICAgICAgICAgIG5vZGUuaWQgPSBub2RlRW50cnkubm9kZS5pZDtcbiAgICAgICAgICBub2RlLm5hbWUgPSBwcm9wZXJ0aWVzLm5hbWU7XG4gICAgICAgICAgbm9kZS5sYWJlbCA9IHByb3BlcnRpZXMubGFiZWw7XG4gICAgICAgICAgbm9kZS52aXNpYmlsaXR5ID1cbiAgICAgICAgICAgIHByb3BlcnRpZXMudmlzaWJpbGl0eSAhPSBudWxsXG4gICAgICAgICAgICAgID8gY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IHByb3BlcnRpZXMudmlzaWJpbGl0eX0pXG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgY29uc3Qgb2xkQ29uZGl0aW9uYWxCcmFuY2hlcyA9IG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGg7XG4gICAgICAgICAgbm9kZS5jb25kaXRpb25hbEJyYW5jaGVzID1cbiAgICAgICAgICAgIHByb3BlcnRpZXMuY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsXG4gICAgICAgICAgICAgID8gcHJvcGVydGllcy5jb25kaXRpb25hbEJyYW5jaGVzLm1hcCgoY29uZGl0aW9uOiBzdHJpbmcpID0+XG4gICAgICAgICAgICAgICAgICBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbn0pLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgOiBbYWx3YXlzQ29uZGl0aW9uKCldO1xuICAgICAgICAgIGNvbnN0IG5ld0NvbmRpdGlvbmFsQnJhbmNoZXMgPSBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuXG4gICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlKSkge1xuICAgICAgICAgICAgbm9kZS5mb3JtdWxhUmVwcyA9XG4gICAgICAgICAgICAgIHByb3BlcnRpZXMuZm9ybXVsYVJlcHMgIT0gbnVsbFxuICAgICAgICAgICAgICAgID8gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogcHJvcGVydGllcy5mb3JtdWxhUmVwc30pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBub2RlLm1pblJlcHMgPSBwcm9wZXJ0aWVzLm1pblJlcHM7XG4gICAgICAgICAgICBub2RlLm1heFJlcHMgPSBwcm9wZXJ0aWVzLm1heFJlcHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzRmllbGQobm9kZSkpIHtcbiAgICAgICAgICAgIG5vZGUuaGludCA9IHByb3BlcnRpZXMuaGludDtcbiAgICAgICAgICAgIG5vZGUuZWRpdGFibGUgPSAhcHJvcGVydGllcy5yZWFkb25seUZpZWxkO1xuICAgICAgICAgICAgbm9kZS5kZXNjcmlwdGlvbiA9IHByb3BlcnRpZXMuZGVzY3JpcHRpb247XG4gICAgICAgICAgICBub2RlLmRlZmF1bHRWYWx1ZSA9IGdldERlZmF1bHRWYWx1ZShwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZSwgbm9kZSk7XG4gICAgICAgICAgICBub2RlLmZvcm11bGEgPVxuICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmZvcm11bGEgIT0gbnVsbCA/IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IHByb3BlcnRpZXMuZm9ybXVsYX0pIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgZm9yY2VWYWx1ZSA9IHByb3BlcnRpZXMudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBub3RFbXB0eSA9IHByb3BlcnRpZXMubm90RW1wdHk7XG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uQ29uZGl0aW9ucyA9IHByb3BlcnRpZXMudmFsaWRhdGlvbkNvbmRpdGlvbnM7XG4gICAgICAgICAgICBsZXQgbWluVmFsdWU6IG51bWJlciB8IG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1pblZhbHVlLCAxMCk7XG4gICAgICAgICAgICBsZXQgbWF4VmFsdWU6IG51bWJlciB8IG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heFZhbHVlLCAxMCk7XG4gICAgICAgICAgICBsZXQgbWluRGlnaXRzOiBudW1iZXIgfCBudWxsID0gcGFyc2VJbnQocHJvcGVydGllcy5taW5EaWdpdHMsIDEwKTtcbiAgICAgICAgICAgIGxldCBtYXhEaWdpdHM6IG51bWJlciB8IG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heERpZ2l0cywgMTApO1xuICAgICAgICAgICAgaWYgKGlzTmFOKG1pblZhbHVlKSkge1xuICAgICAgICAgICAgICBtaW5WYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNOYU4obWF4VmFsdWUpKSB7XG4gICAgICAgICAgICAgIG1heFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc05hTihtaW5EaWdpdHMpKSB7XG4gICAgICAgICAgICAgIG1pbkRpZ2l0cyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNOYU4obWF4RGlnaXRzKSkge1xuICAgICAgICAgICAgICBtYXhEaWdpdHMgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBmb3JjZVZhbHVlICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgbm90RW1wdHkgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAodmFsaWRhdGlvbkNvbmRpdGlvbnMgIT0gbnVsbCAmJiB2YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgICBtaW5WYWx1ZSAhPSBudWxsIHx8XG4gICAgICAgICAgICAgIG1heFZhbHVlICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgbWluRGlnaXRzICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgbWF4RGlnaXRzICE9IG51bGxcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uID0gbm9kZS52YWxpZGF0aW9uIHx8IGNyZWF0ZVZhbGlkYXRpb25Hcm91cCh7fSk7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24uZm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24ubm90RW1wdHkgPSBub3RFbXB0eSA/IG5vdEVtcHR5VmFsaWRhdGlvbigpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pblZhbHVlID0gbWluVmFsdWUgIT0gbnVsbCA/IG1pblZhbGlkYXRpb24obWluVmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1heFZhbHVlID0gbWF4VmFsdWUgIT0gbnVsbCA/IG1heFZhbGlkYXRpb24obWF4VmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pbkRpZ2l0cyA9IG1pbkRpZ2l0cyAhPSBudWxsID8gbWluRGlnaXRzVmFsaWRhdGlvbihtaW5EaWdpdHMpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1heERpZ2l0cyA9IG1heERpZ2l0cyAhPSBudWxsID8gbWF4RGlnaXRzVmFsaWRhdGlvbihtYXhEaWdpdHMpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLmNvbmRpdGlvbnMgPSAodmFsaWRhdGlvbkNvbmRpdGlvbnMgfHwgW10pLm1hcChcbiAgICAgICAgICAgICAgICAoYzoge2NvbmRpdGlvbjogc3RyaW5nOyBlcnJvck1lc3NhZ2U6IHN0cmluZ30pID0+XG4gICAgICAgICAgICAgICAgICBjcmVhdGVWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiBjLmNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBjLmVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBub2RlLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbm9kZS52YWxpZGF0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgbm90RW1wdHlXYXJuID0gcHJvcGVydGllcy5ub3RFbXB0eVdhcm5pbmc7XG4gICAgICAgICAgICBjb25zdCB3YXJuaW5nQ29uZGl0aW9ucyA9IHByb3BlcnRpZXMud2FybmluZ0NvbmRpdGlvbnM7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG5vdEVtcHR5V2FybiAhPSBudWxsIHx8XG4gICAgICAgICAgICAgICh3YXJuaW5nQ29uZGl0aW9ucyAhPSBudWxsICYmIHdhcm5pbmdDb25kaXRpb25zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IG5vZGUud2FybmluZyB8fCBjcmVhdGVXYXJuaW5nR3JvdXAoe30pO1xuICAgICAgICAgICAgICB3YXJuaW5nLm5vdEVtcHR5ID0gbm90RW1wdHlXYXJuID8gbm90RW1wdHlXYXJuaW5nKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHdhcm5pbmcuY29uZGl0aW9ucyA9ICh3YXJuaW5nQ29uZGl0aW9ucyB8fCBbXSkubWFwKFxuICAgICAgICAgICAgICAgICh3OiB7Y29uZGl0aW9uOiBzdHJpbmc7IHdhcm5pbmdNZXNzYWdlOiBzdHJpbmd9KSA9PlxuICAgICAgICAgICAgICAgICAgY3JlYXRlV2FybmluZyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogdy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlOiB3Lndhcm5pbmdNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIG5vZGUud2FybmluZyA9IHdhcm5pbmc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBub2RlLndhcm5pbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLm5leHRTbGlkZUNvbmRpdGlvbiA9XG4gICAgICAgICAgICAgIHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLm5leHRTbGlkZUNvbmRpdGlvbn0pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBub2RlLnNpemUgPSBwcm9wZXJ0aWVzLnNpemU7XG5cbiAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgKG5vZGUgYXMgYW55KS5jaG9pY2VzT3JpZ2luUmVmID0gcHJvcGVydGllcy5jaG9pY2VzT3JpZ2luUmVmO1xuICAgICAgICAgICAgICBub2RlLmZvcmNlRXhwYW5kZWQgPSBwcm9wZXJ0aWVzLmZvcmNlRXhwYW5kZWQ7XG4gICAgICAgICAgICAgIG5vZGUuZm9yY2VOYXJyb3cgPSBwcm9wZXJ0aWVzLmZvcmNlTmFycm93O1xuICAgICAgICAgICAgICBub2RlLnRyaWdnZXJDb25kaXRpb25zID0gKHByb3BlcnRpZXMudHJpZ2dlckNvbmRpdGlvbnMgfHwgW10pLm1hcCgodDogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiB0fSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1JhbmdlRmllbGQobm9kZSkpIHtcbiAgICAgICAgICAgICAgbm9kZS5zdGFydCA9IHByb3BlcnRpZXMuc3RhcnQ7XG4gICAgICAgICAgICAgIG5vZGUuZW5kID0gcHJvcGVydGllcy5lbmQ7XG4gICAgICAgICAgICAgIG5vZGUuc3RlcCA9IHByb3BlcnRpZXMuc3RlcDtcbiAgICAgICAgICAgICAgbm9kZS5hcHBlYXJhbmNlID0gcHJvcGVydGllcy5hcHBlYXJhbmNlID8/IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzRW1wdHlGaWVsZChub2RlKSkge1xuICAgICAgICAgICAgICBub2RlLkhUTUwgPSBwcm9wZXJ0aWVzLkhUTUw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1RhYmxlRmllbGQobm9kZSkpIHtcbiAgICAgICAgICAgICAgbGV0IHtjb2x1bW5UeXBlcywgcm93cywgY29sdW1uTGFiZWxzLCByb3dMYWJlbHN9ID0gSlNPTi5wYXJzZShwcm9wZXJ0aWVzLnRhYmxlRGVmKTtcbiAgICAgICAgICAgICAgbm9kZS5jb2x1bW5UeXBlcyA9IGNvbHVtblR5cGVzIHx8IFtdO1xuICAgICAgICAgICAgICBub2RlLnJvd3MgPSByb3dzIHx8IFtdO1xuICAgICAgICAgICAgICBub2RlLmNvbHVtbkxhYmVscyA9IGNvbHVtbkxhYmVscyB8fCBbXTtcbiAgICAgICAgICAgICAgbm9kZS5yb3dMYWJlbHMgPSByb3dMYWJlbHMgfHwgW107XG4gICAgICAgICAgICAgIG5vZGUuaGlkZUVtcHR5Um93cyA9IHByb3BlcnRpZXMuaGlkZUVtcHR5Um93cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChudWxsKTtcblxuICAgICAgICAgIHJldHVybiAobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG9yaWdOb2RlKTtcbiAgICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIC8vIFRPRE86IEB0cmlrIGNoZWNrIHRoaXMsIHdhcyBhbHdheXMgdHJ1ZT9cbiAgICAgICAgICAgICAgLy8gaWYgKGNuIGluc3RhbmNlb2YgQWpmTm9kZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICAgIGNvbnN0IGlkeCA9IGNuLm5vZGVzLm1hcChuID0+IG4uaWQpLmluZGV4T2Yob3JpZ05vZGUuaWQpO1xuICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICBuZXdOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IG5ld05vZGVzLmNvbmNhdChjbi5ub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gICBjb25zdCBpZHggPSBub2Rlcy5pbmRleE9mKG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgLy8gICBub2RlcyA9IG5vZGVzLnNsaWNlKDAsIGlkeCkuY29uY2F0KFtub2RlXSkuY29uY2F0KG5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICBpZiAobmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA8IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gbmV3Q29uZGl0aW9uYWxCcmFuY2hlczsgaSA8IG9sZENvbmRpdGlvbmFsQnJhbmNoZXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RGVsZXRlTm9kZSgpOiB2b2lkIHtcbiAgICAoPE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+PnRoaXMuX2RlbGV0ZU5vZGVFbnRyeUV2ZW50KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUV4cGFuZGVkU3RhdHVzKG5vZGVFbnRyeS5ub2RlLm5hbWUpO1xuICAgICAgICAgIHJldHVybiAobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG5vZGUpO1xuICAgICAgICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICBjb25zdCBpZHggPSBjbi5ub2Rlcy5tYXAobiA9PiBuLmlkKS5pbmRleE9mKG5vZGUuaWQpO1xuICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IG5ld05vZGVzLmNvbmNhdChjbi5ub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgc3Vic2NyaXB0aW9uIHRvIHRoZSBtb3ZlTm9kZUVudHJ5RXZlbnQuXG4gICAqL1xuICBwcml2YXRlIF9pbml0TW92ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fbW92ZU5vZGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9tb3ZlTm9kZVN1YiA9IHRoaXMuX21vdmVOb2RlRW50cnlFdmVudFxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgobW92ZUV2ZW50OiBBamZGb3JtQnVpbGRlck1vdmVFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm9kZUVudHJ5ID0gbW92ZUV2ZW50Lm5vZGVFbnRyeSBhcyBBamZGb3JtQnVpbGRlck5vZGVFbnRyeTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBub2RlRW50cnkubm9kZTtcbiAgICAgICAgICAgIGxldCBjbiA9IGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgbm9kZSkgYXMgQWpmQ29udGFpbmVyTm9kZTtcbiAgICAgICAgICAgIGxldCBuZXdOb2RlczogQWpmTm9kZVtdID0gbm9kZXM7XG4gICAgICAgICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICAgIG5ld05vZGVzID0gY24ubm9kZXM7XG4gICAgICAgICAgICAgIG1vdmVJdGVtSW5BcnJheShuZXdOb2RlcywgbW92ZUV2ZW50LmZyb21JbmRleCwgbW92ZUV2ZW50LnRvSW5kZXgpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IHRoaXMuX3VwZGF0ZU5vZGVzTGlzdChjbi5pZCwgbmV3Tm9kZXMpO1xuICAgICAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgXCJpZFwiIGFuZCBcInBhcmVudFwiIGZpZWxkcyBvZiBhIG1vZGlmaWVkIG9yIHJlYXJyYW5nZWQgbGlzdCBvZiBub2Rlcy5cbiAgICogQHBhcmFtIGNvbnRhaW5lcklkIFRoZSBpZCBvZiB0aGUgcGFyZW50IGNvbnRhaW5lciBvZiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIG5vZGVzTGlzdCBUaGUgbGlzdCBvZiBub2RlcyB0byBiZSB1cGRhdGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlTm9kZXNMaXN0KGNvbnRhaW5lcklkOiBudW1iZXIsIG5vZGVzTGlzdDogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgICBpZiAoIW5vZGVzTGlzdC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgY29udElkID0gY29udGFpbmVySWQgIT0gdW5kZWZpbmVkID8gY29udGFpbmVySWQgOiAwO1xuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IG5vZGVzTGlzdC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBsZXQgY3VycmVudE5vZGUgPSBub2Rlc0xpc3RbaWR4XTtcbiAgICAgIGN1cnJlbnROb2RlLmlkID0gY29udElkICogMTAwMCArIGlkeCArIDE7XG4gICAgICBjdXJyZW50Tm9kZS5wYXJlbnQgPSBpZHggPT0gMCA/IGNvbnRJZCA6IGNvbnRJZCAqIDEwMDAgKyBpZHg7XG4gICAgICBpZiAoaXNTbGlkZXNOb2RlKGN1cnJlbnROb2RlKSkge1xuICAgICAgICB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoY3VycmVudE5vZGUuaWQsIGN1cnJlbnROb2RlLm5vZGVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzTGlzdDtcbiAgfVxufVxuIl19