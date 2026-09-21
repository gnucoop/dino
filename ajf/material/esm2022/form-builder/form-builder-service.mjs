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
                // minReps is deliberately left alone: the builder no longer offers it,
                // and assigning the missing property would wipe the value a schema
                // authored elsewhere came in with. Absent, it deserialises as 1.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1idWlsZGVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9tYXRlcmlhbC9mb3JtLWJ1aWxkZXIvc3JjL2Zvcm0tYnVpbGRlci1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFJTCxZQUFZLEVBTVosV0FBVyxFQUdYLHdCQUF3QixFQUN4QixtQkFBbUIsRUFDbkIsV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsb0JBQW9CLEVBQ3BCLGVBQWUsRUFDZixZQUFZLEVBQ1osT0FBTyxFQUNQLGtCQUFrQixFQUNsQixZQUFZLEVBQ1osd0JBQXdCLEVBQ3hCLFlBQVksRUFDWixZQUFZLEVBQ1osbUJBQW1CLEVBQ25CLGFBQWEsRUFDYixtQkFBbUIsRUFDbkIsYUFBYSxFQUNiLGtCQUFrQixFQUNsQixlQUFlLEdBQ2hCLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUdMLGVBQWUsRUFDZixlQUFlLEVBQ2YsYUFBYSxHQUNkLE1BQU0sa0JBQWtCLENBQUM7QUFDMUIsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQUMsZUFBZSxFQUFFLGFBQWEsRUFBYyxFQUFFLElBQUksS0FBSyxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDcEcsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsSUFBSSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7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LENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7WUFDN0QsSUFBSSxZQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQztnQkFDOUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNELENBQUM7UUFDSCxDQUFDO1FBQ0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztzSEFsbENVLHFCQUFxQjt1RUFBckIscUJBQXFCLFdBQXJCLHFCQUFxQjs7aUZBQXJCLHFCQUFxQjtjQURqQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZBdHRhY2htZW50c09yaWdpbixcbiAgQWpmQ2hvaWNlc09yaWdpbixcbiAgQWpmRmllbGQsXG4gIEFqZkZpZWxkVHlwZSxcbiAgQWpmRm9ybSxcbiAgQWpmRm9ybVN0cmluZ0lkZW50aWZpZXIsXG4gIEFqZk5vZGUsXG4gIEFqZk5vZGVHcm91cCxcbiAgQWpmTm9kZXNPcGVyYXRpb24sXG4gIEFqZk5vZGVUeXBlLFxuICBBamZSZXBlYXRpbmdTbGlkZSxcbiAgQWpmU2xpZGUsXG4gIGNyZWF0ZUNob2ljZXNGaXhlZE9yaWdpbixcbiAgY3JlYXRlQ29udGFpbmVyTm9kZSxcbiAgY3JlYXRlRmllbGQsXG4gIGNyZWF0ZUZvcm0sXG4gIGNyZWF0ZVZhbGlkYXRpb24sXG4gIGNyZWF0ZVZhbGlkYXRpb25Hcm91cCxcbiAgY3JlYXRlV2FybmluZyxcbiAgY3JlYXRlV2FybmluZ0dyb3VwLFxuICBpc0Nob2ljZXNGaXhlZE9yaWdpbixcbiAgaXNDb250YWluZXJOb2RlLFxuICBpc0VtcHR5RmllbGQsXG4gIGlzRmllbGQsXG4gIGlzRmllbGRXaXRoQ2hvaWNlcyxcbiAgaXNSYW5nZUZpZWxkLFxuICBpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUsXG4gIGlzU2xpZGVzTm9kZSxcbiAgaXNUYWJsZUZpZWxkLFxuICBtYXhEaWdpdHNWYWxpZGF0aW9uLFxuICBtYXhWYWxpZGF0aW9uLFxuICBtaW5EaWdpdHNWYWxpZGF0aW9uLFxuICBtaW5WYWxpZGF0aW9uLFxuICBub3RFbXB0eVZhbGlkYXRpb24sXG4gIG5vdEVtcHR5V2FybmluZyxcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7XG4gIEFqZkNvbmRpdGlvbixcbiAgQWpmRm9ybXVsYSxcbiAgYWx3YXlzQ29uZGl0aW9uLFxuICBjcmVhdGVDb25kaXRpb24sXG4gIGNyZWF0ZUZvcm11bGEsXG59IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7bW92ZUl0ZW1JbkFycmF5fSBmcm9tICdAYW5ndWxhci9jZGsvZHJhZy1kcm9wJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBjb21iaW5lTGF0ZXN0LCBPYnNlcnZhYmxlLCBvZiBhcyBvYnNPZiwgU3ViamVjdCwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHNoYXJlUmVwbGF5LCBzY2FuLCB3aXRoTGF0ZXN0RnJvbSwgdGFrZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge1xuICBBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24sXG4gIEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uLFxuICBBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbixcbn0gZnJvbSAnLi9vcGVyYXRpb25zJztcblxuLyoqXG4gKiBUaGUgY2F0ZWdvcmllcyB0aGUgZW50cmllcyBvZiB0aGUgZm9ybSBidWlsZGVyIGZpZWxkIHR5cGVzIHBhbGV0dGUgYXJlXG4gKiBncm91cGVkIGludG8sIGluIGRpc3BsYXkgb3JkZXIuIFRoZSB2YWx1ZXMgYXJlIHRyYW5zbGF0aW9uIGtleXMsIHJlbmRlcmVkIGFzXG4gKiB0aGUgaGVhZGVyIG9mIGVhY2ggZ3JvdXAuXG4gKi9cbmV4cG9ydCBjb25zdCBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcyA9IHtcbiAgc3RydWN0dXJlOiAnU3RydWN0dXJlJyxcbiAgdGV4dDogJ1RleHQnLFxuICBudW1lcmljOiAnTnVtZXJpYycsXG4gIC8vIERlbGliZXJhdGVseSBub3QgJ0Nob2ljZXMnLCB3aGljaCBpcyBhbHJlYWR5IHVzZWQgYnkgdGhlIGNob2ljZXMgb3JpZ2luc1xuICAvLyBtZW51IG9mIHRoZSB0b29sYmFyIGFuZCBoYXMgYSBkaWZmZXJlbnQgbWVhbmluZy5cbiAgY2hvaWNlczogJ0Nob2ljZSBmaWVsZHMnLFxuICBkYXRlVGltZTogJ0RhdGUgJiB0aW1lJyxcbiAgYWR2YW5jZWQ6ICdBZHZhbmNlZCcsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeSB7XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGU7IGZpZWxkPzogQWpmRmllbGRUeXBlfTtcbiAgaXNTbGlkZT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUaGUgY2F0ZWdvcnkgdGhlIGVudHJ5IGJlbG9uZ3MgdG8sIG9uZSBvZlxuICAgKiB7QGxpbmsgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXN9LiBFbnRyaWVzIHNoYXJpbmcgYSBjYXRlZ29yeSBhcmVcbiAgICogcmVuZGVyZWQgdW5kZXIgYSBjb21tb24gaGVhZGVyOyBlbnRyaWVzIHdpdGhvdXQgYSBjYXRlZ29yeSBhcmUgcmVuZGVyZWRcbiAgICogbGFzdCwgd2l0aCBubyBoZWFkZXIuXG4gICAqL1xuICBjYXRlZ29yeT86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB7XG4gIG5vZGU6IEFqZk5vZGU7XG4gIGNvbnRhaW5lcjogQWpmQ29udGFpbmVyTm9kZSB8IG51bGw7XG4gIGNoaWxkcmVuOiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdO1xuICBjb250ZW50OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEZvcm1CdWlsZGVyRmllbGRWYWxpZGF0aW9uIHtcbiAgaXNWYWxpZDogYm9vbGVhbjtcbiAgZXJyb3JzOiB7W2tleTogc3RyaW5nXTogYW55fSB8IG51bGw7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUJ1aWxkZXJWYWxpZGF0aW9uIHtcbiAgW2tleTogc3RyaW5nXTogRm9ybUJ1aWxkZXJGaWVsZFZhbGlkYXRpb24gfCBudWxsO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90IHtcbiAgcGFyZW50OiBBamZOb2RlO1xuICBwYXJlbnROb2RlOiBudW1iZXI7XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIG5vZGUncyBwb3NpdGlvbiBjaGFuZ2UgaW4gdGhlIGZvcm1idWlsZGVyLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1CdWlsZGVyTW92ZUV2ZW50IHtcbiAgLyoqXG4gICAqIFRoZSBub2RlIGJlaW5nIG1vdmVkLlxuICAgKi9cbiAgbm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGU7XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBvZiB0aGUgbm9kZSBwcmV2aW91cyBwb3NpdGlvbi5cbiAgICovXG4gIGZyb21JbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggb2YgdGhlIG5vZGUgbmV3IHBvc2l0aW9uLlxuICAgKi9cbiAgdG9JbmRleDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBBamZGb3JtQnVpbGRlck5vZGUgPSBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IEFqZkZvcm1CdWlsZGVyRW1wdHlTbG90O1xuZXhwb3J0IHR5cGUgQWpmQ29udGFpbmVyTm9kZSA9IEFqZlNsaWRlIHwgQWpmUmVwZWF0aW5nU2xpZGUgfCBBamZOb2RlR3JvdXA7XG5cbmZ1bmN0aW9uIGdldE5vZGVDb250YWluZXIoYzoge25vZGVzOiBBamZOb2RlW119LCBub2RlOiBBamZOb2RlKToge25vZGVzOiBBamZOb2RlW119IHwgbnVsbCB7XG4gIGlmIChjLm5vZGVzLmluZGV4T2Yobm9kZSkgPiAtMSB8fCBjLm5vZGVzLm1hcChuID0+IG4uaWQpLmluZGV4T2Yobm9kZT8uaWQpID4gLTEpIHtcbiAgICByZXR1cm4gYztcbiAgfVxuICBjb25zdCBjbnMgPSBjLm5vZGVzLmZpbHRlcihuID0+IGlzQ29udGFpbmVyTm9kZShuKSk7XG4gIGNvbnN0IGxlbiA9IGNucy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBjbiA9IGdldE5vZGVDb250YWluZXIoPEFqZkNvbnRhaW5lck5vZGU+Y25zW2ldLCBub2RlKTtcbiAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNuO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gdG9BcnJheShpbnB1dDogc3RyaW5nKTogc3RyaW5nW10ge1xuICBpZiAoIWlucHV0KSByZXR1cm4gW107XG4gIGlucHV0ID0gaW5wdXQucmVwbGFjZSgvXFxbfFxcXS9nLCAnJykudHJpbSgpO1xuICByZXR1cm4gaW5wdXRcbiAgICAuc3BsaXQoJywnKVxuICAgIC5tYXAocyA9PiBzLnRyaW0oKSlcbiAgICAubWFwKHMgPT4gcy5yZXBsYWNlKC9eWydcIl18WydcIl0kL2csICcnKSlcbiAgICAuZmlsdGVyKHMgPT4gcyk7XG59XG5cbi8qKlxuICogVGFrZSB0aGUgZGVmYXVsdFZhbHVlIGZyb20gdGhlIHByb3BlcnRpZXMgYm94IGFuZCByZXR1cm4gdGhlIG5ldyB2YWx1ZSB0byBzYXZlIGluIHRoZSBhamYgZm9ybSBkZWZhdWx0VmFsdWUgZmllbGQgcHJvcGVydGllc1xuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gbm9kZVxuICogQHJldHVybnNcbiAqIHtcImZvcm11bGFcIjogXCInY29sYXppb25lIG5vdGUnXCJ9XG4gKiB7XCJmb3JtdWxhXCI6IFwiJ1tcXFwiY29sYXppb25lXFxcIiwgXFxcImRvY2NlXFxcIl0nXCJ9XG4gKiB7XCJmb3JtdWxhXCI6IFwiM1wifVxuICoge1wiZm9ybXVsYVwiOiBcIigxID09PSAxKVwifVxuICovXG5mdW5jdGlvbiBnZXREZWZhdWx0VmFsdWUoXG4gIHZhbHVlOiBhbnksXG4gIG5vZGU6IEFqZkZpZWxkPGFueT4sXG4pOiBzdHJpbmcgfCBzdHJpbmdbXSB8IG51bWJlciB8IGJvb2xlYW4gfCBBamZGb3JtdWxhIHwgbnVsbCB7XG4gIGxldCBkZWZhdWx0VmFsdWUgPSB2YWx1ZSAmJiAodmFsdWUgYXMgc3RyaW5nKS50cmltKCkgIT0gJycgPyAodmFsdWUgYXMgc3RyaW5nKSA6IG51bGw7XG4gIGlmIChkZWZhdWx0VmFsdWUpIHtcbiAgICBzd2l0Y2ggKG5vZGUuZmllbGRUeXBlKSB7XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5Cb29sZWFuOlxuICAgICAgICBpZiAoZGVmYXVsdFZhbHVlID09PSAndHJ1ZScgfHwgZGVmYXVsdFZhbHVlID09PSAnMScpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVmYXVsdFZhbHVlID09PSAnZmFsc2UnIHx8IGRlZmF1bHRWYWx1ZSA9PT0gJzAnKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBkZWZhdWx0VmFsdWV9KTtcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgICAvLyByZXR1cm4gYSBzdHJpbmdbXVxuICAgICAgICByZXR1cm4gdG9BcnJheShkZWZhdWx0VmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogZGVmYXVsdFZhbHVlfSk7XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbn1cblxuLyoqXG4gKiBUYWtlIHRoZSBkZWZhdWx0VmFsdWUgZnJvbSB0aGUgYWpmIGZvcm0gZGVmYXVsdFZhbHVlIHByb3AgKG5vbiBmb3JtdWxhKVxuICogYW5kIHJldHVybiB0aGUgdmFsdWUgdG8gYmUgc2hvd24gaW4gdGhlIHByb3BlcnRpZXMgYm94XG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBub2RlXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY2xlYW5EZWZhdWx0VmFsdWUodmFsdWU6IGFueSwgbm9kZTogQWpmRmllbGQ8YW55Pik6IHN0cmluZyB8IG51bGwge1xuICBpZiAoIXZhbHVlIHx8IFN0cmluZyh2YWx1ZSkudHJpbSgpID09PSAnJykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgc3dpdGNoIChub2RlLmZpZWxkVHlwZSkge1xuICAgIGNhc2UgQWpmRmllbGRUeXBlLlN0cmluZzpcbiAgICBjYXNlIEFqZkZpZWxkVHlwZS5UZXh0OlxuICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZTpcbiAgICAgIGlmICgvXlwiW15cIl0qXCIkLy50ZXN0KFN0cmluZyh2YWx1ZSkpIHx8IC9eJ1teJ10qJyQvLnRlc3QoU3RyaW5nKHZhbHVlKSkpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYCcke1N0cmluZyh2YWx1ZSl9J2A7XG4gICAgY2FzZSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2U6XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICB9XG4gIHJldHVybiBTdHJpbmcodmFsdWUpO1xufVxuXG5mdW5jdGlvbiBidWlsZEZvcm1CdWlsZGVyTm9kZXNTdWJ0cmVlKFxuICBub2RlczogQWpmTm9kZVtdLFxuICBwYXJlbnQ6IEFqZk5vZGUsXG4gIGlnbm9yZUNvbmRpdGlvbmFsQnJhbmNoZXMgPSBmYWxzZSxcbik6IEFqZkZvcm1CdWlsZGVyTm9kZVtdIHtcbiAgY29uc3QgZW50cmllczogQWpmRm9ybUJ1aWxkZXJOb2RlW10gPSBub2Rlc1xuICAgIC5maWx0ZXIobiA9PiBuLnBhcmVudCA9PT0gcGFyZW50LmlkKVxuICAgIC5zb3J0KChuMSwgbjIpID0+IG4xLnBhcmVudE5vZGUgLSBuMi5wYXJlbnROb2RlKVxuICAgIC5tYXAobiA9PiB7XG4gICAgICBjb25zdCBjaGlsZHJlbiA9IGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc1N1YnRyZWUobm9kZXMsIG4pO1xuICAgICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjaGlsZHJlbi5wdXNoKHtwYXJlbnQ6IG4sIHBhcmVudE5vZGU6IDB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+e1xuICAgICAgICBub2RlOiBuLFxuICAgICAgICBjaGlsZHJlbixcbiAgICAgICAgY29udGVudDogYnVpbGRGb3JtQnVpbGRlck5vZGVzQ29udGVudChub2RlcywgbiksXG4gICAgICB9O1xuICAgIH0pO1xuICBpZiAoIWlnbm9yZUNvbmRpdGlvbmFsQnJhbmNoZXMpIHtcbiAgICBjb25zdCBlbnRyaWVzTnVtID0gZW50cmllcy5sZW5ndGg7XG4gICAgY29uc3QgY2JzID0gcGFyZW50LmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgIGZvciAobGV0IGkgPSBlbnRyaWVzTnVtOyBpIDwgY2JzOyBpKyspIHtcbiAgICAgIGVudHJpZXMucHVzaCh7cGFyZW50OiBwYXJlbnQsIHBhcmVudE5vZGU6IGl9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVudHJpZXM7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkRm9ybUJ1aWxkZXJOb2Rlc0NvbnRlbnQoX25vZGVzOiBBamZOb2RlW10sIG5vZGU6IEFqZk5vZGUpOiBBamZGb3JtQnVpbGRlck5vZGVbXSB7XG4gIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICByZXR1cm4gYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZSgoPEFqZkNvbnRhaW5lck5vZGU+bm9kZSkubm9kZXMsIG5vZGUsIHRydWUpO1xuICB9XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYXR0ZW5Ob2Rlcyhub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgbGV0IGZsYXROb2RlczogQWpmTm9kZVtdID0gW107XG5cbiAgbm9kZXMuZm9yRWFjaCgobm9kZTogQWpmTm9kZSkgPT4ge1xuICAgIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgIGZsYXROb2RlcyA9IGZsYXROb2Rlcy5jb25jYXQoZmxhdHRlbk5vZGVzKCg8QWpmQ29udGFpbmVyTm9kZT5ub2RlKS5ub2RlcykpO1xuICAgIH1cbiAgICBmbGF0Tm9kZXMucHVzaChub2RlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGZsYXROb2Rlcztcbn1cblxuZnVuY3Rpb24gZ2V0RGVzY2VuZGFudHMoXG4gIGZsYXROb2RlczogQWpmTm9kZVtdLFxuICBwYXJlbnROb2RlOiBBamZOb2RlLFxuICBicmFuY2g6IG51bWJlciB8IG51bGwgPSBudWxsLFxuKTogQWpmTm9kZVtdIHtcbiAgcmV0dXJuIGJyYW5jaCAhPSBudWxsXG4gICAgPyBmbGF0Tm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudE5vZGUuaWQgJiYgbi5wYXJlbnROb2RlID09PSBicmFuY2gpXG4gICAgOiBmbGF0Tm9kZXMuZmlsdGVyKG4gPT4gbi5wYXJlbnQgPT09IHBhcmVudE5vZGUuaWQpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVOb2Rlcyhub2RlczogQWpmTm9kZVtdLCBpZHM6IG51bWJlcltdKTogQWpmTm9kZVtdIHtcbiAgY29uc3QgbGVuID0gbm9kZXMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY29uc3Qgbm9kZSA9IG5vZGVzW2ldO1xuICAgIGlmIChpc0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lciA9IDxBamZDb250YWluZXJOb2RlPm5vZGU7XG4gICAgICBjb250YWluZXIubm9kZXMgPSByZW1vdmVOb2Rlcyhjb250YWluZXIubm9kZXMsIGlkcyk7XG4gICAgfVxuICB9XG4gIHJldHVybiBub2Rlcy5maWx0ZXIobiA9PiBpZHMuaW5kZXhPZihuLmlkKSA9PT0gLTEpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVOb2RlU3VidHJlZShcbiAgbm9kZXM6IEFqZk5vZGVbXSxcbiAgcGFyZW50Tm9kZTogQWpmTm9kZSxcbiAgYnJhbmNoOiBudW1iZXIgfCBudWxsID0gbnVsbCxcbik6IEFqZk5vZGVbXSB7XG4gIGNvbnN0IGZsYXROb2RlcyA9IGZsYXR0ZW5Ob2Rlcyhub2Rlcyk7XG4gIGxldCBkZWxOb2RlczogQWpmTm9kZVtdID0gW107XG4gIGxldCBkZXNjZW5kYW50cyA9IGdldERlc2NlbmRhbnRzKGZsYXROb2RlcywgcGFyZW50Tm9kZSwgYnJhbmNoKTtcbiAgY29uc3QgbGVuID0gZGVzY2VuZGFudHMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZGVsTm9kZXMgPSBkZWxOb2Rlcy5jb25jYXQoZ2V0RGVzY2VuZGFudHMoZmxhdE5vZGVzLCBkZXNjZW5kYW50c1tpXSkpO1xuICB9XG4gIGRlbE5vZGVzID0gZGVsTm9kZXMuY29uY2F0KGRlc2NlbmRhbnRzKTtcbiAgcmV0dXJuIHJlbW92ZU5vZGVzKFxuICAgIG5vZGVzLFxuICAgIGRlbE5vZGVzLm1hcChuID0+IG4uaWQpLFxuICApO1xufVxuXG5sZXQgbm9kZVVuaXF1ZUlkID0gMDtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1CdWlsZGVyU2VydmljZSB7XG4gIC8qKlxuICAgKiBUaGUgbm9kZSB0eXBlcyBhdmFpbGFibGUgaW4gdGhlIHBhbGV0dGUsIGxpc3RlZCBieSBjYXRlZ29yeSBpbiBkaXNwbGF5XG4gICAqIG9yZGVyLiBFbnRyaWVzIG9mIHRoZSBzYW1lIGNhdGVnb3J5IGFyZSByZW5kZXJlZCB1bmRlciBhIGNvbW1vbiBoZWFkZXIsIHNlZVxuICAgKiB7QGxpbmsgQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXN9LlxuICAgKi9cbiAgcHJpdmF0ZSBfYXZhaWxhYmxlTm9kZVR5cGVzOiBBamZGb3JtQnVpbGRlck5vZGVUeXBlRW50cnlbXSA9IFtcbiAgICB7XG4gICAgICBsYWJlbDogJ1NsaWRlJyxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmU2xpZGV9LFxuICAgICAgaXNTbGlkZTogdHJ1ZSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5zdHJ1Y3R1cmUsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1JlcGVhdGluZyBzbGlkZScsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlfSxcbiAgICAgIGlzU2xpZGU6IHRydWUsXG4gICAgICBjYXRlZ29yeTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXMuc3RydWN0dXJlLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdTdHJpbmcnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5TdHJpbmd9LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLnRleHQsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RleHQnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5UZXh0fSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy50ZXh0LFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdOb3RlJyxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRW1wdHl9LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLnRleHQsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ051bWJlcicsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLk51bWJlcn0sXG4gICAgICBjYXRlZ29yeTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXMubnVtZXJpYyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnQm9vbGVhbicsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkJvb2xlYW59LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLmNob2ljZXMsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1NpbmdsZSBjaG9pY2UnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2V9LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLmNob2ljZXMsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ011bHRpcGxlIGNob2ljZScsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlfSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5jaG9pY2VzLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdSYW5nZScsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLlJhbmdlfSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5jaG9pY2VzLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdEYXRlIHJhbmdlJyxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuRGF0ZVJhbmdlfSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5kYXRlVGltZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnRGF0ZSBpbnB1dCcsXG4gICAgICBub2RlVHlwZToge25vZGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLCBmaWVsZDogQWpmRmllbGRUeXBlLkRhdGVJbnB1dH0sXG4gICAgICBjYXRlZ29yeTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXMuZGF0ZVRpbWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ1RpbWUnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5UaW1lfSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5kYXRlVGltZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnR2VvbG9jYXRpb24nLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5HZW9sb2NhdGlvbn0sXG4gICAgICBjYXRlZ29yeTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXMuYWR2YW5jZWQsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0ltYWdlJyxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuSW1hZ2V9LFxuICAgICAgY2F0ZWdvcnk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVDYXRlZ29yaWVzLmFkdmFuY2VkLFxuICAgIH0sXG4gICAge1xuICAgICAgbGFiZWw6ICdCYXJjb2RlJyxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuQmFyY29kZX0sXG4gICAgICBjYXRlZ29yeTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXMuYWR2YW5jZWQsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0Zvcm11bGEnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5Gb3JtdWxhfSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5hZHZhbmNlZCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnVGFibGUnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5UYWJsZX0sXG4gICAgICBjYXRlZ29yeTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXMuYWR2YW5jZWQsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogJ0ZpbGUnLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5GaWxlfSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5hZHZhbmNlZCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnU2lnbmF0dXJlJyxcbiAgICAgIG5vZGVUeXBlOiB7bm9kZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsIGZpZWxkOiBBamZGaWVsZFR5cGUuU2lnbmF0dXJlfSxcbiAgICAgIGNhdGVnb3J5OiBBamZGb3JtQnVpbGRlck5vZGVUeXBlQ2F0ZWdvcmllcy5hZHZhbmNlZCxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiAnQXVkaW8nLFxuICAgICAgbm9kZVR5cGU6IHtub2RlOiBBamZOb2RlVHlwZS5BamZGaWVsZCwgZmllbGQ6IEFqZkZpZWxkVHlwZS5BdWRpb30sXG4gICAgICBjYXRlZ29yeTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUNhdGVnb3JpZXMuYWR2YW5jZWQsXG4gICAgfSxcbiAgXTtcbiAgLyoqXG4gICAqIEF2YWlsYWJsZSBub2RlIHR5cGVzXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgYXZhaWxhYmxlTm9kZVR5cGVzKCk6IEFqZkZvcm1CdWlsZGVyTm9kZVR5cGVFbnRyeVtdIHtcbiAgICByZXR1cm4gdGhpcy5fYXZhaWxhYmxlTm9kZVR5cGVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm0gfCBudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybSB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9mb3JtT2JzOiBPYnNlcnZhYmxlPEFqZkZvcm0gfCBudWxsPiA9IHRoaXMuX2Zvcm0gYXMgT2JzZXJ2YWJsZTxBamZGb3JtIHwgbnVsbD47XG5cbiAgLyoqXG4gICAqIEN1cnJlbnQgZWRpdGVkIGZvcm0gc3RyZWFtXG4gICAqXG4gICAqIEByZWFkb25seVxuICAgKiBAbWVtYmVyT2YgQWpmRm9ybUJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBnZXQgZm9ybSgpOiBPYnNlcnZhYmxlPEFqZkZvcm0gfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Zvcm1PYnM7XG4gIH1cblxuICBwcml2YXRlIF9hdHRhY2htZW50c09yaWdpbnM6IE9ic2VydmFibGU8QWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdPiA9IG9ic09mKFtdKTtcbiAgZ2V0IGF0dGFjaG1lbnRzT3JpZ2lucygpOiBPYnNlcnZhYmxlPEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXT4ge1xuICAgIHJldHVybiB0aGlzLl9hdHRhY2htZW50c09yaWdpbnM7XG4gIH1cblxuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luczogT2JzZXJ2YWJsZTxBamZDaG9pY2VzT3JpZ2luPGFueT5bXT4gPSBvYnNPZihbXSk7XG4gIGdldCBjaG9pY2VzT3JpZ2lucygpOiBPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW48YW55PltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Nob2ljZXNPcmlnaW5zO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllcjogT2JzZXJ2YWJsZTxBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdPiA9IG9ic09mKFtdKTtcbiAgZ2V0IHN0cmluZ0lkZW50aWZpZXIoKTogT2JzZXJ2YWJsZTxBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX3N0cmluZ0lkZW50aWZpZXI7XG4gIH1cblxuICBwcml2YXRlIF9ub2Rlc1dpdGhvdXRDaG9pY2VPcmlnaW5zOiBPYnNlcnZhYmxlPEFqZlNsaWRlW10+ID0gb2JzT2YoW10pO1xuICBwcml2YXRlIF9ub2RlczogT2JzZXJ2YWJsZTxBamZOb2RlW10+ID0gb2JzT2YoW10pO1xuICBnZXQgbm9kZXMoKTogT2JzZXJ2YWJsZTxBamZOb2RlW10+IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZXM7XG4gIH1cblxuICBwcml2YXRlIF9mbGF0Tm9kZXM6IE9ic2VydmFibGU8QWpmTm9kZVtdPiB8IHVuZGVmaW5lZDtcbiAgZ2V0IGZsYXROb2RlcygpOiBPYnNlcnZhYmxlPEFqZk5vZGVbXT4gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl9mbGF0Tm9kZXM7XG4gIH1cblxuICBwcml2YXRlIF9mbGF0RmllbGRzOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+ID0gb2JzT2YoW10pO1xuICBnZXQgZmxhdEZpZWxkcygpOiBPYnNlcnZhYmxlPEFqZkZpZWxkW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZmxhdEZpZWxkcztcbiAgfVxuXG4gIHByaXZhdGUgX25vZGVFbnRyaWVzVHJlZTogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeVtdPiA9IG9ic09mKFtdKTtcbiAgZ2V0IG5vZGVFbnRyaWVzVHJlZSgpOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5W10+IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJpZXNUcmVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbGlzdCBvZiB0aGUgaWRzIG9mIHRoZSBkcm9wTGlzdHMgY29ubmVjdGVkIHRvIHRoZSBzb3VyY2UgbGlzdC5cbiAgICovXG4gIHByaXZhdGUgX2Nvbm5lY3RlZERyb3BMaXN0czogQmVoYXZpb3JTdWJqZWN0PHN0cmluZ1tdPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+KFtdKTtcbiAgZ2V0IGNvbm5lY3RlZERyb3BMaXN0cygpOiBCZWhhdmlvclN1YmplY3Q8c3RyaW5nW10+IHtcbiAgICByZXR1cm4gdGhpcy5fY29ubmVjdGVkRHJvcExpc3RzO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgZGljdGlvbmFyeSBvZiB0aGUgJ2V4cGFuZGVkJyBzdGF0dXMgb2YgYWxsIG5vZGVFbnRyaWVzIGluIHRoZSB0cmVlIHtub2RlLm5hbWU6IGJvb2xlYW59XG4gICAqL1xuICBwcml2YXRlIF9ub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1czogQmVoYXZpb3JTdWJqZWN0PHtbbmFtZTogc3RyaW5nXTogYm9vbGVhbn0+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PHtbbmFtZTogc3RyaW5nXTogYm9vbGVhbn0+KHt9KTtcbiAgZ2V0IG5vZGVFbnRyaWVzVHJlZUV4cGFuZGVkU3RhdHVzKCk6IEJlaGF2aW9yU3ViamVjdDx7W25hbWU6IHN0cmluZ106IGJvb2xlYW59PiB7XG4gICAgcmV0dXJuIHRoaXMuX25vZGVFbnRyaWVzVHJlZUV4cGFuZGVkU3RhdHVzO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZXMgdGhlIGRlZmF1bHQgZXhwYW5kZWQgc3RhdGUgb2Ygbm9kZUVudHJpZXMgd2hlbiB0aGUgRm9ybUJ1aWxkZXIgbG9hZHNcbiAgICovXG4gIHByaXZhdGUgX2RlZmF1bHRFeHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2VkaXRlZE5vZGVFbnRyeTogQmVoYXZpb3JTdWJqZWN0PEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfZWRpdGVkTm9kZUVudHJ5T2JzOiBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbD4gPSB0aGlzXG4gICAgLl9lZGl0ZWROb2RlRW50cnkgYXMgT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlck5vZGVFbnRyeSB8IG51bGw+O1xuICBnZXQgZWRpdGVkTm9kZUVudHJ5KCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgfCBudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VkaXRlZE5vZGVFbnRyeU9icztcbiAgfVxuXG4gIC8qKlxuICAgKiBOZXcgZmllbGQgb3Igbm9kZSBqdXN0IGFkZGVkIGluIHRyZWVcbiAgICovXG4gIHByaXZhdGUgX25ld05vZGVFbnRyeTogQmVoYXZpb3JTdWJqZWN0PEFqZk5vZGUgfCBBamZGaWVsZCB8IG51bGw+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxcbiAgICBBamZOb2RlIHwgQWpmRmllbGQgfCBudWxsXG4gID4obnVsbCk7XG5cbiAgcHJpdmF0ZSBfZWRpdGVkQ29uZGl0aW9uOiBCZWhhdmlvclN1YmplY3Q8QWpmQ29uZGl0aW9uIHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ29uZGl0aW9uIHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZENvbmRpdGlvbk9iczogT2JzZXJ2YWJsZTxBamZDb25kaXRpb24gfCBudWxsPiA9IHRoaXNcbiAgICAuX2VkaXRlZENvbmRpdGlvbiBhcyBPYnNlcnZhYmxlPEFqZkNvbmRpdGlvbiB8IG51bGw+O1xuICBnZXQgZWRpdGVkQ29uZGl0aW9uKCk6IE9ic2VydmFibGU8QWpmQ29uZGl0aW9uIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWRDb25kaXRpb25PYnM7XG4gIH1cblxuICBwcml2YXRlIF9lZGl0ZWRDaG9pY2VzT3JpZ2luOiBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZENob2ljZXNPcmlnaW5PYnM6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD4gPSB0aGlzXG4gICAgLl9lZGl0ZWRDaG9pY2VzT3JpZ2luIGFzIE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD47XG4gIGdldCBlZGl0ZWRDaG9pY2VzT3JpZ2luKCk6IE9ic2VydmFibGU8QWpmQ2hvaWNlc09yaWdpbjxhbnk+IHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luT2JzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZWRpdGVkTm9kZXNWYWxpZGF0aW9uOiBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybUJ1aWxkZXJWYWxpZGF0aW9uIHwgbnVsbD4gPVxuICAgIG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmRm9ybUJ1aWxkZXJWYWxpZGF0aW9uIHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX2VkaXRlZE5vZGVzVmFsaWRhdGlvbk9iczogT2JzZXJ2YWJsZTxBamZGb3JtQnVpbGRlclZhbGlkYXRpb24gfCBudWxsPiA9IHRoaXNcbiAgICAuX2VkaXRlZE5vZGVzVmFsaWRhdGlvbiBhcyBPYnNlcnZhYmxlPEFqZkZvcm1CdWlsZGVyVmFsaWRhdGlvbiB8IG51bGw+O1xuICBnZXQgZWRpdGVkTm9kZXNWYWxpZGF0aW9uKCk6IE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJWYWxpZGF0aW9uIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLl9lZGl0ZWROb2Rlc1ZhbGlkYXRpb25PYnM7XG4gIH1cblxuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9iZWZvcmVOb2Rlc1VwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlIGFzIE9ic2VydmFibGU8dm9pZD47XG4gIGdldCBiZWZvcmVOb2Rlc1VwZGF0ZSgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGVPYnM7XG4gIH1cbiAgcHJpdmF0ZSBfYWZ0ZXJOb2RlVXBkYXRlOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX2FmdGVyTm9kZVVwZGF0ZU9iczogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX2FmdGVyTm9kZVVwZGF0ZSBhcyBPYnNlcnZhYmxlPHZvaWQ+O1xuICBnZXQgYWZ0ZXJOb2RlVXBkYXRlKCk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9hZnRlck5vZGVVcGRhdGVPYnM7XG4gIH1cblxuICBwcml2YXRlIF9ub2Rlc1VwZGF0ZXM6IFN1YmplY3Q8QWpmTm9kZXNPcGVyYXRpb24+ID0gbmV3IFN1YmplY3Q8QWpmTm9kZXNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2F0dGFjaG1lbnRzT3JpZ2luc1VwZGF0ZXM6IFN1YmplY3Q8QWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmQXR0YWNobWVudHNPcmlnaW5zT3BlcmF0aW9uPigpO1xuICBwcml2YXRlIF9jaG9pY2VzT3JpZ2luc1VwZGF0ZXM6IFN1YmplY3Q8QWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZDaG9pY2VzT3JpZ2luc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfc3RyaW5nSWRlbnRpZmllclVwZGF0ZXM6IFN1YmplY3Q8QWpmRm9ybVN0cmluZ0lkZW50aWZpZXJPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9zYXZlTm9kZUVudHJ5RXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIHByaXZhdGUgX2RlbGV0ZU5vZGVFbnRyeUV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5PigpO1xuICAvKipcbiAgICogRXZlbnQgZmlyZWQgd2hlbiB0aGUgcG9zaXRpb24gb2YgYSBub2RlIGluIGEgdHJlZSBjaGFuZ2VzLlxuICAgKi9cbiAgcHJpdmF0ZSBfbW92ZU5vZGVFbnRyeUV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUJ1aWxkZXJNb3ZlRXZlbnQ+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1CdWlsZGVyTW92ZUV2ZW50PigpO1xuXG4gIC8qKlxuICAgKiBTdWJzY3JpYmVzIHRvIHRoZSBtb3ZlTm9kZUVudHJ5RXZlbnQgZXZlbnQgZW1pdHRlcjtcbiAgICovXG4gIHByaXZhdGUgX21vdmVOb2RlU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgLyoqXG4gICAqIENvdW50ZXJzIGZvciBkZWZhdWx0IG5hbWUgYXNzaWduZWQgdG8gaW5zZXJ0ZWQgZmllbGRzL3NsaWRlc1xuICAgKi9cbiAgcHJpdmF0ZSBfZW1wdHlGaWVsZENvdW50ZXI6IG51bWJlciA9IDE7XG4gIHByaXZhdGUgX2VtcHR5U2xpZGVDb3VudGVyOiBudW1iZXIgPSAxO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2luaXRDaG9pY2VzT3JpZ2luc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0QXR0YWNobWVudHNPcmlnaW5zU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRTdHJpbmdJZGVudGlmaWVyU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXROb2Rlc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Rm9ybVN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0U2F2ZU5vZGUoKTtcbiAgICB0aGlzLl9pbml0TW92ZU5vZGUoKTtcbiAgICB0aGlzLl9pbml0RGVsZXRlTm9kZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIGN1cnJlbnQgZWRpdGVkIGZvcm1cbiAgICpcbiAgICogQHBhcmFtIGZvcm1cbiAgICpcbiAgICogQG1lbWJlck9mIEFqZkZvcm1CdWlsZGVyU2VydmljZVxuICAgKi9cbiAgc2V0Rm9ybShmb3JtOiBBamZGb3JtIHwgbnVsbCk6IHZvaWQge1xuICAgIGlmIChmb3JtICE9PSB0aGlzLl9mb3JtLmdldFZhbHVlKCkpIHtcbiAgICAgIHRoaXMuX2Zvcm0ubmV4dChmb3JtKTtcbiAgICB9XG4gIH1cblxuICBlZGl0Tm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChub2RlRW50cnkpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIG5vZGUgdmFsaWRhdGlvbiBlbnRyeVxuICAgKiBAcGFyYW0gZmJOb2RlVmFsaWRhdGlvblxuICAgKi9cbiAgZWRpdE5vZGVWYWxpZGF0aW9uKGZiTm9kZVZhbGlkYXRpb246IEFqZkZvcm1CdWlsZGVyVmFsaWRhdGlvbik6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVzVmFsaWRhdGlvbi5uZXh0KHtcbiAgICAgIC4uLnRoaXMuX2VkaXRlZE5vZGVzVmFsaWRhdGlvbi52YWx1ZSxcbiAgICAgIC4uLmZiTm9kZVZhbGlkYXRpb24sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJuIGlmIGEgbm9kZSBpcyB2YWxpZFxuICAgKiBAcGFyYW0gbm9kZU5hbWVcbiAgICovXG4gIGlzTm9kZVZhbGlkKG5vZGVOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBhbGxOb2RlVmFsaWRhdGlvbnMgPSB0aGlzLl9lZGl0ZWROb2Rlc1ZhbGlkYXRpb24udmFsdWU7XG4gICAgaWYgKCFhbGxOb2RlVmFsaWRhdGlvbnMgfHwgYWxsTm9kZVZhbGlkYXRpb25zW25vZGVOYW1lXSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGFsbE5vZGVWYWxpZGF0aW9uc1tub2RlTmFtZV0uaXNWYWxpZDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhbiBub2RlIHZhbGlkYXRpb24gZW50cmllcyB3aGVuIGEgbm9kZSBpcyBkZWxldGVkXG4gICAqIEBwYXJhbSBmYk5vZGVWYWxpZGF0aW9uIHRoZSBkZWxldGVkIG5vZGVcbiAgICovXG4gIGNsZWFuTm9kZVZhbGlkYXRpb24oZmJOb2RlTmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKGZiTm9kZU5hbWUpIHtcbiAgICAgIC8vIHNldCB2YWxpZGF0aW9uIHRydWUgZm9yIG9sZCB1bnVzZWQgbmFtZVxuICAgICAgY29uc3QgZmJOb2RlVmFsaWRhdGlvbjogQWpmRm9ybUJ1aWxkZXJWYWxpZGF0aW9uID0ge307XG4gICAgICBmYk5vZGVWYWxpZGF0aW9uW2ZiTm9kZU5hbWVdID0ge2lzVmFsaWQ6IHRydWUsIGVycm9yczogbnVsbH07XG4gICAgICB0aGlzLmVkaXROb2RlVmFsaWRhdGlvbihmYk5vZGVWYWxpZGF0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBDbGVhbiBhbGwgbm90IGV4aXN0aW5nIGludmFsaWQgbm9kZXNcbiAgICBjb25zdCBhbGxOb2RlVmFsaWRhdGlvbnMgPSB0aGlzLl9lZGl0ZWROb2Rlc1ZhbGlkYXRpb24udmFsdWU7XG4gICAgaWYgKGFsbE5vZGVWYWxpZGF0aW9ucyAmJiB0aGlzLl9mbGF0Tm9kZXMpIHtcbiAgICAgIGNvbnN0IGludmFsaWROb2Rlczogc3RyaW5nW10gPSBbXTtcblxuICAgICAgT2JqZWN0LmtleXMoYWxsTm9kZVZhbGlkYXRpb25zKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGlmIChhbGxOb2RlVmFsaWRhdGlvbnNba2V5XT8uaXNWYWxpZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBpbnZhbGlkTm9kZXMucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKGludmFsaWROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5fZmxhdE5vZGVzLnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKG5vZGVzID0+IHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZ05vZGVOYW1lcyA9IG5ldyBTZXQobm9kZXMubWFwKG4gPT4gbi5uYW1lKSk7XG5cbiAgICAgICAgICBpbnZhbGlkTm9kZXMuZm9yRWFjaChpbnZhbGlkTm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAoIWV4aXN0aW5nTm9kZU5hbWVzLmhhcyhpbnZhbGlkTm9kZSkpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIGFsbE5vZGVWYWxpZGF0aW9uc1tpbnZhbGlkTm9kZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICB0aGlzLl9lZGl0ZWROb2Rlc1ZhbGlkYXRpb24ubmV4dChhbGxOb2RlVmFsaWRhdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlZGl0Q29uZGl0aW9uKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ29uZGl0aW9uLm5leHQoY29uZGl0aW9uKTtcbiAgfVxuXG4gIHNhdmVDdXJyZW50Q29uZGl0aW9uKGNvbmRpdGlvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGMgPSB0aGlzLl9lZGl0ZWRDb25kaXRpb24uZ2V0VmFsdWUoKTtcbiAgICBpZiAoYyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGMuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgIHRoaXMuX2VkaXRlZENvbmRpdGlvbi5uZXh0KG51bGwpO1xuICB9XG5cbiAgY2FuY2VsQ29uZGl0aW9uRWRpdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBhc3NpZ25MaXN0SWQobm9kZTogQWpmTm9kZSwgZW1wdHk6IGJvb2xlYW4gPSBmYWxzZSk6IHN0cmluZyB7XG4gICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlIHx8IG5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICBjb25zdCBsaXN0SWQgPSBlbXB0eSA/IGBlbXB0eV9maWVsZHNfbGlzdF8ke25vZGUuaWR9YCA6IGBmaWVsZHNfbGlzdF8ke25vZGUuaWR9YDtcbiAgICAgIGlmICh0aGlzLl9jb25uZWN0ZWREcm9wTGlzdHMudmFsdWUuaW5kZXhPZihsaXN0SWQpID09IC0xKSB7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3REcm9wTGlzdChsaXN0SWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxpc3RJZDtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgaW5zZXJ0Tm9kZShcbiAgICBub2RlVHlwZTogQWpmRm9ybUJ1aWxkZXJOb2RlVHlwZUVudHJ5LFxuICAgIHBhcmVudDogQWpmTm9kZSxcbiAgICBwYXJlbnROb2RlOiBudW1iZXIsXG4gICAgaW5Db250ZW50ID0gZmFsc2UsXG4gICAgaW5zZXJ0SW5JbmRleCA9IDAsXG4gICk6IHZvaWQge1xuICAgIGxldCBub2RlOiBBamZOb2RlIHwgQWpmRmllbGQ7XG4gICAgY29uc3QgaWQgPSArK25vZGVVbmlxdWVJZDtcbiAgICBjb25zdCBpc0ZpZWxkTm9kZSA9IG5vZGVUeXBlLm5vZGVUeXBlPy5maWVsZCAhPSBudWxsO1xuICAgIGlmIChpc0ZpZWxkTm9kZSkge1xuICAgICAgbm9kZSA9IGNyZWF0ZUZpZWxkKHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5vZGVUeXBlOiBBamZOb2RlVHlwZS5BamZGaWVsZCxcbiAgICAgICAgZmllbGRUeXBlOiBub2RlVHlwZS5ub2RlVHlwZS5maWVsZCEsXG4gICAgICAgIHBhcmVudDogcGFyZW50LmlkLFxuICAgICAgICBwYXJlbnROb2RlLFxuICAgICAgICBuYW1lOiBgbmV3X2ZpZWxkXyR7dGhpcy5fZW1wdHlGaWVsZENvdW50ZXJ9YCxcbiAgICAgICAgbGFiZWw6IGBOZXcgJHtBamZGaWVsZFR5cGVbbm9kZVR5cGUubm9kZVR5cGUuZmllbGQhXX0gZmllbGQgJHt0aGlzLl9lbXB0eUZpZWxkQ291bnRlcn1gLFxuICAgICAgfSk7XG4gICAgICB0aGlzLl9lbXB0eUZpZWxkQ291bnRlcisrO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gY3JlYXRlQ29udGFpbmVyTm9kZSh7XG4gICAgICAgIGlkLFxuICAgICAgICBub2RlVHlwZTogbm9kZVR5cGUubm9kZVR5cGUubm9kZSxcbiAgICAgICAgcGFyZW50OiAwLFxuICAgICAgICBwYXJlbnROb2RlLFxuICAgICAgICBuYW1lOiBgbmV3X3NsaWRlXyR7dGhpcy5fZW1wdHlTbGlkZUNvdW50ZXJ9YCxcbiAgICAgICAgbGFiZWw6IGBOZXcgU2xpZGUgJHt0aGlzLl9lbXB0eVNsaWRlQ291bnRlcn1gLFxuICAgICAgICBub2RlczogW10sXG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2VtcHR5U2xpZGVDb3VudGVyKys7XG4gICAgfVxuICAgIHRoaXMuY2FuY2VsTm9kZUVudHJ5RWRpdCgpO1xuICAgIHRoaXMuX25ld05vZGVFbnRyeS5uZXh0KG5vZGUpO1xuXG4gICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZVtdKTogQWpmTm9kZVtdID0+IHtcbiAgICAgIGNvbnN0IGNuID1cbiAgICAgICAgaXNDb250YWluZXJOb2RlKHBhcmVudCkgJiYgaW5Db250ZW50XG4gICAgICAgICAgPyA8QWpmQ29udGFpbmVyTm9kZT5wYXJlbnRcbiAgICAgICAgICA6IChnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIHBhcmVudCkgYXMgQWpmQ29udGFpbmVyTm9kZSk7XG4gICAgICBpZiAoIWlzRmllbGROb2RlKSB7XG4gICAgICAgIGxldCBuZXdOb2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICBuZXdOb2Rlcy5zcGxpY2UoaW5zZXJ0SW5JbmRleCwgMCwgbm9kZSk7XG4gICAgICAgIG5ld05vZGVzID0gdGhpcy5fdXBkYXRlTm9kZXNMaXN0KDAsIG5ld05vZGVzKTtcbiAgICAgICAgcmV0dXJuIG5ld05vZGVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IG5ld05vZGVzID0gY24ubm9kZXMuc2xpY2UoMCk7XG4gICAgICAgIG5ld05vZGVzLnNwbGljZShpbnNlcnRJbkluZGV4LCAwLCBub2RlKTtcbiAgICAgICAgbmV3Tm9kZXMgPSB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoY24uaWQsIG5ld05vZGVzKTtcbiAgICAgICAgY24ubm9kZXMgPSBuZXdOb2RlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBub2RlcztcbiAgICB9KTtcbiAgfVxuXG4gIHNhdmVOb2RlRW50cnkocHJvcGVydGllczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fc2F2ZU5vZGVFbnRyeUV2ZW50LmVtaXQocHJvcGVydGllcyk7XG4gIH1cblxuICBjYW5jZWxOb2RlRW50cnlFZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZE5vZGVFbnRyeS5uZXh0KG51bGwpO1xuICB9XG5cbiAgZGVsZXRlTm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkpOiB2b2lkIHtcbiAgICB0aGlzLl9kZWxldGVOb2RlRW50cnlFdmVudC5uZXh0KG5vZGVFbnRyeSk7XG4gICAgdGhpcy5jbGVhbk5vZGVWYWxpZGF0aW9uKG5vZGVFbnRyeS5ub2RlLm5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXJzIHRoZSBtb3ZlTm9kZSBldmVudCB3aGVuIGEgbm9kZSBpcyBtb3ZlZCBpbiB0aGUgZm9ybWJ1aWxkZXIuXG4gICAqIEBwYXJhbSBub2RlRW50cnkgVGhlIG5vZGUgdG8gYmUgbW92ZWQuXG4gICAqL1xuICBtb3ZlTm9kZUVudHJ5KG5vZGVFbnRyeTogQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnksIGZyb206IG51bWJlciwgdG86IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IG1vdmVFdmVudDogQWpmRm9ybUJ1aWxkZXJNb3ZlRXZlbnQgPSB7bm9kZUVudHJ5OiBub2RlRW50cnksIGZyb21JbmRleDogZnJvbSwgdG9JbmRleDogdG99O1xuICAgIHRoaXMuX21vdmVOb2RlRW50cnlFdmVudC5uZXh0KG1vdmVFdmVudCk7XG4gICAgdGhpcy5jYW5jZWxOb2RlRW50cnlFZGl0KCk7XG4gIH1cblxuICBnZXRDdXJyZW50Rm9ybSgpOiBPYnNlcnZhYmxlPEFqZkZvcm0+IHtcbiAgICByZXR1cm4gY29tYmluZUxhdGVzdChbXG4gICAgICB0aGlzLmZvcm0sXG4gICAgICB0aGlzLl9ub2Rlc1dpdGhvdXRDaG9pY2VPcmlnaW5zLFxuICAgICAgdGhpcy5hdHRhY2htZW50c09yaWdpbnMsXG4gICAgICB0aGlzLmNob2ljZXNPcmlnaW5zLFxuICAgICAgdGhpcy5zdHJpbmdJZGVudGlmaWVyLFxuICAgIF0pLnBpcGUoXG4gICAgICBmaWx0ZXIoKFtmb3JtXSkgPT4gZm9ybSAhPSBudWxsKSxcbiAgICAgIG1hcCgoW2Zvcm0sIG5vZGVzLCBhdHRhY2htZW50c09yaWdpbnMsIGNob2ljZXNPcmlnaW5zLCBzdHJpbmdJZGVudGlmaWVyXSkgPT4ge1xuICAgICAgICBjb25zdCBzdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zID0gKGZvcm0gfHwge30pLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnM7XG4gICAgICAgIHJldHVybiBjcmVhdGVGb3JtKHtcbiAgICAgICAgICBjaG9pY2VzT3JpZ2luczogWy4uLmNob2ljZXNPcmlnaW5zXSxcbiAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnM6IFsuLi5hdHRhY2htZW50c09yaWdpbnNdLFxuICAgICAgICAgIHN0cmluZ0lkZW50aWZpZXI6IFsuLi4oc3RyaW5nSWRlbnRpZmllciB8fCBbXSldLFxuICAgICAgICAgIG5vZGVzOiBbLi4ubm9kZXNdLFxuICAgICAgICAgIHN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMsXG4gICAgICAgIH0pO1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIGVkaXRDaG9pY2VzT3JpZ2luKGNob2ljZXNPcmlnaW46IEFqZkNob2ljZXNPcmlnaW48YW55Pik6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChjaG9pY2VzT3JpZ2luKTtcbiAgfVxuXG4gIGNyZWF0ZUNob2ljZXNPcmlnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGVkQ2hvaWNlc09yaWdpbi5uZXh0KGNyZWF0ZUNob2ljZXNGaXhlZE9yaWdpbjxhbnk+KHtuYW1lOiAnJ30pKTtcbiAgfVxuXG4gIGNhbmNlbENob2ljZXNPcmlnaW5FZGl0KCk6IHZvaWQge1xuICAgIHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4ubmV4dChudWxsKTtcbiAgfVxuXG4gIHNhdmVDaG9pY2VzT3JpZ2luKHBhcmFtczoge2xhYmVsOiBzdHJpbmc7IG5hbWU6IHN0cmluZzsgY2hvaWNlczogYW55W119KTogdm9pZCB7XG4gICAgY29uc3QgY2hvaWNlc09yaWdpbiA9IHRoaXMuX2VkaXRlZENob2ljZXNPcmlnaW4uZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBjaG9pY2VzT3JpZ2luUHJldmlvdXNOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBjaG9pY2VzT3JpZ2luPy5uYW1lO1xuICAgIGlmIChjaG9pY2VzT3JpZ2luICE9IG51bGwpIHtcbiAgICAgIGNob2ljZXNPcmlnaW4ubGFiZWwgPSBwYXJhbXMubGFiZWw7XG4gICAgICBjaG9pY2VzT3JpZ2luLm5hbWUgPSBwYXJhbXMubmFtZTtcbiAgICAgIGlmIChpc0Nob2ljZXNGaXhlZE9yaWdpbihjaG9pY2VzT3JpZ2luKSkge1xuICAgICAgICBjaG9pY2VzT3JpZ2luLmNob2ljZXMgPSBwYXJhbXMuY2hvaWNlcztcbiAgICAgIH1cbiAgICAgIHRoaXMuX3VwZGF0ZUNob2ljZXNPcmlnaW5SZWZJbk5vZGVzKGNob2ljZXNPcmlnaW5QcmV2aW91c05hbWUsIHBhcmFtcy5uYW1lKTtcbiAgICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zVXBkYXRlcy5uZXh0KGNob2ljZXNPcmlnaW5zID0+IHtcbiAgICAgICAgY29uc3QgaWR4ID0gY2hvaWNlc09yaWdpbnMuaW5kZXhPZihjaG9pY2VzT3JpZ2luKTtcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgY2hvaWNlc09yaWdpbnMgPSBbXG4gICAgICAgICAgICAuLi5jaG9pY2VzT3JpZ2lucy5zbGljZSgwLCBpZHgpLFxuICAgICAgICAgICAgY2hvaWNlc09yaWdpbixcbiAgICAgICAgICAgIC4uLmNob2ljZXNPcmlnaW5zLnNsaWNlKGlkeCArIDEpLFxuICAgICAgICAgIF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2hvaWNlc09yaWdpbnMgPSBbLi4uY2hvaWNlc09yaWdpbnMsIGNob2ljZXNPcmlnaW5dO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaG9pY2VzT3JpZ2lucztcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0aGlzLl9lZGl0ZWRDaG9pY2VzT3JpZ2luLm5leHQobnVsbCk7XG4gIH1cblxuICBzYXZlU3RyaW5nSWRlbnRpZmllcihpZGVudGlmaWVyOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdKTogdm9pZCB7XG4gICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclVwZGF0ZXMubmV4dCgoKSA9PiBbLi4uaWRlbnRpZmllcl0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlc2V0cyB0aGUgbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMgZGljdGlvbmFyeSB0byBhbiBlbXB0eSBvYmplY3QuXG4gICAqL1xuICByZXNldE5vZGVFbnRyaWVzVHJlZUV4cGFuZGVkU3RhdHVzKCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVFbnRyaWVzVHJlZUV4cGFuZGVkU3RhdHVzLm5leHQoe30pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGV4cGFuZGVkIHN0YXR1cyBvZiBhbiBlbnRyeSBpbiB0aGUgbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMgZGljdGlvbmFyeVxuICAgKiBAcGFyYW0gbm9kZU5hbWUgVGhlIHVuaXF1ZSBuYW1lIG9mIHRoZSBub2RlRW50cnlcbiAgICovXG4gIGdldEV4cGFuZGVkU3RhdHVzKG5vZGVOYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5fbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMucGlwZShcbiAgICAgIG1hcCh0cmVlID0+IHtcbiAgICAgICAgaWYgKG5vZGVOYW1lIGluIHRyZWUpIHtcbiAgICAgICAgICByZXR1cm4gdHJlZVtub2RlTmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRFeHBhbmRlZDtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXBzZXJ0cyBhbiBlbnRyeSBpbiB0aGUgbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMgZGljdGlvbmFyeVxuICAgKiBAcGFyYW0gbm9kZU5hbWUgVGhlIHVuaXF1ZSBuYW1lIG9mIHRoZSBub2RlRW50cnlcbiAgICogQHBhcmFtIGV4cGFuZGVkIFRydWUgaWYgdGhlIG5vZGVFbnRyeSBpcyBleHBhbmRlZFxuICAgKi9cbiAgdXBkYXRlRXhwYW5kZWRTdGF0dXMobm9kZU5hbWU6IHN0cmluZywgZXhwYW5kZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIW5vZGVOYW1lKSByZXR1cm47XG4gICAgY29uc3QgZGljdFZhbHVlID0gdGhpcy5fbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMudmFsdWU7XG4gICAgdGhpcy5fbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMubmV4dCh7Li4uZGljdFZhbHVlLCBbbm9kZU5hbWVdOiBleHBhbmRlZH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYW4gZW50cnkgZnJvbSB0aGUgbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMgZGljdGlvbmFyeVxuICAgKiBAcGFyYW0gbm9kZU5hbWUgVGhlIHVuaXF1ZSBuYW1lIG9mIHRoZSBub2RlRW50cnlcbiAgICovXG4gIHJlbW92ZUV4cGFuZGVkU3RhdHVzKG5vZGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBkaWN0VmFsdWUgPSB0aGlzLl9ub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cy52YWx1ZTtcbiAgICBkZWxldGUgZGljdFZhbHVlW25vZGVOYW1lXTtcbiAgICB0aGlzLl9ub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cy5uZXh0KGRpY3RWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBleHBhbmRlZCB0byB0cnVlIGZvciBlYWNoIGVudHJ5IGluIHRoZSBub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cyBkaWN0aW9uYXJ5XG4gICAqL1xuICBleHBhbmRBbGwoKSB7XG4gICAgY29uc3QgZGljdFZhbHVlID0gdGhpcy5fbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMudmFsdWU7XG4gICAgZm9yIChsZXQgbm9kZU5hbWUgaW4gZGljdFZhbHVlKSB7XG4gICAgICBkaWN0VmFsdWVbbm9kZU5hbWVdID0gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5fZGVmYXVsdEV4cGFuZGVkID0gdHJ1ZTtcbiAgICB0aGlzLl9ub2RlRW50cmllc1RyZWVFeHBhbmRlZFN0YXR1cy5uZXh0KGRpY3RWYWx1ZSk7XG4gIH1cblxuICAvKipcbiAgICogU2V0cyBleHBhbmRlZCB0byBmYWxzZSBmb3IgZWFjaCBlbnRyeSBpbiB0aGUgbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMgZGljdGlvbmFyeVxuICAgKi9cbiAgY29sbGFwc2VBbGwoKSB7XG4gICAgY29uc3QgZGljdFZhbHVlID0gdGhpcy5fbm9kZUVudHJpZXNUcmVlRXhwYW5kZWRTdGF0dXMudmFsdWU7XG4gICAgZm9yIChsZXQgbm9kZU5hbWUgaW4gZGljdFZhbHVlKSB7XG4gICAgICBkaWN0VmFsdWVbbm9kZU5hbWVdID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX2RlZmF1bHRFeHBhbmRlZCA9IGZhbHNlO1xuICAgIHRoaXMuX25vZGVFbnRyaWVzVHJlZUV4cGFuZGVkU3RhdHVzLm5leHQoZGljdFZhbHVlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXNldHMgdGhlIGVtcHR5IGZpZWxkcy9zbGlkZXMgY291bnRlcnNcbiAgICovXG4gIHJlc2V0RW1wdHlDb3VudGVycygpIHtcbiAgICB0aGlzLl9lbXB0eUZpZWxkQ291bnRlciA9IDE7XG4gICAgdGhpcy5fZW1wdHlTbGlkZUNvdW50ZXIgPSAxO1xuICB9XG5cbiAgLyoqXG4gICAqIFNlYXJjaGVzIHRoZSBmb3JtIG5vZGVzIGZvciBmaWVsZCBub2RlcyB3aXRoIGNob2ljZXNPcmlnaW5SZWYgY29ycmVzcG9uZGluZ1xuICAgKiB0byBhbiBlZGl0ZWQgY2hvaWNlc09yaWdpbiBhbmQgdXBkYXRlcyBpdCB3aXRoIHRoZSBuZXcgbmFtZS5cbiAgICogQHBhcmFtIHByZXZpb3VzX25hbWUgVGhlIGNob2ljZXNPcmlnaW4gcHJldmlvdXMgbmFtZVxuICAgKiBAcGFyYW0gbmV3X25hbWUgVGhlIGNob2ljZXNPcmlnaW4gbmV3IG5hbWVcbiAgICovXG4gIHByaXZhdGUgX3VwZGF0ZUNob2ljZXNPcmlnaW5SZWZJbk5vZGVzKHByZXZpb3VzX25hbWU/OiBzdHJpbmcsIG5ld19uYW1lPzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCFwcmV2aW91c19uYW1lIHx8ICFuZXdfbmFtZSkgcmV0dXJuO1xuICAgIGNvbnN0IGN1cnJlbnRGb3JtOiBBamZGb3JtIHwgbnVsbCA9IHRoaXMuX2Zvcm0udmFsdWU7XG4gICAgaWYgKCFjdXJyZW50Rm9ybSkgcmV0dXJuO1xuICAgIGNvbnN0IHVwZGF0ZWROb2RlczogQWpmTm9kZVtdID0gW107XG4gICAgY29uc3QgY3VycmVudFNsaWRlczogKEFqZlNsaWRlIHwgQWpmUmVwZWF0aW5nU2xpZGUpW10gPSBjdXJyZW50Rm9ybS5ub2RlcztcbiAgICBmb3IgKGxldCBzbGlkZSBvZiBjdXJyZW50U2xpZGVzKSB7XG4gICAgICBpZiAoIXNsaWRlLm5vZGVzIHx8ICFzbGlkZS5ub2Rlcy5sZW5ndGgpIGNvbnRpbnVlO1xuICAgICAgZm9yIChsZXQgbm9kZSBvZiBzbGlkZS5ub2Rlcykge1xuICAgICAgICBjb25zdCBub2RlT2JqID0gbm9kZSBhcyB7W2tleTogc3RyaW5nXTogYW55fTtcbiAgICAgICAgaWYgKG5vZGVPYmpbJ2Nob2ljZXNPcmlnaW5SZWYnXSAmJiBub2RlT2JqWydjaG9pY2VzT3JpZ2luUmVmJ10gPT09IHByZXZpb3VzX25hbWUpIHtcbiAgICAgICAgICBub2RlT2JqWydjaG9pY2VzT3JpZ2luUmVmJ10gPSBuZXdfbmFtZTtcbiAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlT2JqIGFzIEFqZk5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChfbm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICByZXR1cm4gY3VycmVudEZvcm0ubm9kZXMuc2xpY2UoMCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZEZvcm1CdWlsZGVyTm9kZXNUcmVlKG5vZGVzOiBBamZOb2RlW10pOiAoQWpmRm9ybUJ1aWxkZXJOb2RlIHwgbnVsbClbXSB7XG4gICAgdGhpcy5fdXBkYXRlTm9kZXNMaXN0KDAsIG5vZGVzKTtcbiAgICBjb25zdCByb290Tm9kZXMgPSBub2Rlcy5maWx0ZXIoXG4gICAgICBuID0+IG4ubm9kZVR5cGUgPT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUgfHwgbi5ub2RlVHlwZSA9PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSxcbiAgICApO1xuICAgIGlmIChyb290Tm9kZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gW251bGxdO1xuICAgIH1cbiAgICBjb25zdCByb290Tm9kZSA9IHJvb3ROb2Rlc1swXTtcbiAgICBpZiAoaXNTbGlkZXNOb2RlKHJvb3ROb2RlKSkge1xuICAgICAgY29uc3QgdHJlZTogQWpmRm9ybUJ1aWxkZXJOb2RlW10gPSBbXTtcbiAgICAgIHRyZWUucHVzaCg8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+e1xuICAgICAgICBub2RlOiByb290Tm9kZSxcbiAgICAgICAgY29udGFpbmVyOiBudWxsLFxuICAgICAgICBjaGlsZHJlbjogYnVpbGRGb3JtQnVpbGRlck5vZGVzU3VidHJlZShub2Rlcywgcm9vdE5vZGUpLFxuICAgICAgICBjb250ZW50OiBidWlsZEZvcm1CdWlsZGVyTm9kZXNDb250ZW50KG5vZGVzLCByb290Tm9kZSksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgbGFzdEFkZGVkQWpmTm9kZSA9IHRoaXMuX25ld05vZGVFbnRyeS52YWx1ZTtcbiAgICAgIGlmIChsYXN0QWRkZWRBamZOb2RlKSB7XG4gICAgICAgIGNvbnN0IGxhc3RBZGRlZEZiTm9kZSA9IHRoaXMuX2ZpbmROb2RlSW5UcmVlKHRyZWUsIGxhc3RBZGRlZEFqZk5vZGUpO1xuICAgICAgICBpZiAobGFzdEFkZGVkRmJOb2RlKSB7XG4gICAgICAgICAgdGhpcy5lZGl0Tm9kZUVudHJ5KDxBamZGb3JtQnVpbGRlck5vZGVFbnRyeT5sYXN0QWRkZWRGYk5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX25ld05vZGVFbnRyeS5uZXh0KG51bGwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRyZWU7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBmb3JtIGRlZmluaXRpb24nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kIGFuIGFqZk5vZGUgaW4gQWpmRm9ybUJ1aWxkZXJOb2RlRW50cnkgdHJlZSwgYnkgbm9kZSBuYW1lXG4gICAqIEBwYXJhbSB0cmVlXG4gICAqIEBwYXJhbSBub2RlXG4gICAqIEByZXR1cm5zIHRoZSBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSBub2RlXG4gICAqL1xuICBwcml2YXRlIF9maW5kTm9kZUluVHJlZShcbiAgICB0cmVlOiBBamZGb3JtQnVpbGRlck5vZGVbXSxcbiAgICBub2RlOiBBamZOb2RlIHwgQWpmRmllbGQsXG4gICk6IEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5IHwgbnVsbCB7XG4gICAgZm9yIChjb25zdCBmYm4gb2YgdHJlZSkge1xuICAgICAgY29uc3QgZmJlID0gZmJuIGFzIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5O1xuICAgICAgaWYgKGZiZS5ub2RlPy5uYW1lID09PSBub2RlLm5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZiZTtcbiAgICAgIH1cbiAgICAgIGlmIChmYmUuY29udGVudCAmJiBmYmUuY29udGVudC5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZm91bmRJbkNvbnRlbnQgPSB0aGlzLl9maW5kTm9kZUluVHJlZShmYmUuY29udGVudCwgbm9kZSk7XG4gICAgICAgIGlmIChmb3VuZEluQ29udGVudCkge1xuICAgICAgICAgIHJldHVybiBmb3VuZEluQ29udGVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZiZS5jaGlsZHJlbiAmJiBmYmUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgIGNvbnN0IGZvdW5kSW5DaGlsZHJlbiA9IHRoaXMuX2ZpbmROb2RlSW5UcmVlKGZiZS5jaGlsZHJlbiwgbm9kZSk7XG4gICAgICAgIGlmIChmb3VuZEluQ2hpbGRyZW4pIHtcbiAgICAgICAgICByZXR1cm4gZm91bmRJbkNoaWxkcmVuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgdGhlIGlkIG9mIGEgZHJvcExpc3QgdG8gYmUgY29ubmVjdGVkIHdpdGggdGhlIEZvcm1CdWlsZGVyIHNvdXJjZSBsaXN0LlxuICAgKiBAcGFyYW0gbGlzdElkIFRoZSBpZCBvZiB0aGUgbGlzdCB0byBjb25uZWN0LlxuICAgKi9cbiAgcHJpdmF0ZSBfY29ubmVjdERyb3BMaXN0KGxpc3RJZDogc3RyaW5nKSB7XG4gICAgbGV0IGNvbm5lY3RlZExpc3RzID0gdGhpcy5fY29ubmVjdGVkRHJvcExpc3RzLnZhbHVlLnNsaWNlKDApO1xuICAgIHRoaXMuX2Nvbm5lY3RlZERyb3BMaXN0cy5uZXh0KFsuLi5jb25uZWN0ZWRMaXN0cywgbGlzdElkXSk7XG4gIH1cblxuICBwcml2YXRlIF9maW5kTWF4Tm9kZUlkKG5vZGVzOiBBamZOb2RlW10sIF9jdXJNYXhJZCA9IDApOiBudW1iZXIge1xuICAgIGxldCBtYXhJZCA9IDA7XG4gICAgbGV0IG1heE5ld0ZpZWxkQ291bnRlciA9IDA7XG4gICAgbGV0IG1heE5ld1NsaWRlQ291bnRlciA9IDA7XG4gICAgbm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICAgIG1heElkID0gTWF0aC5tYXgobWF4SWQsIG4uaWQpO1xuICAgICAgaWYgKGlzQ29udGFpbmVyTm9kZShuKSkge1xuICAgICAgICBtYXhJZCA9IE1hdGgubWF4KG1heElkLCB0aGlzLl9maW5kTWF4Tm9kZUlkKCg8QWpmQ29udGFpbmVyTm9kZT5uKS5ub2RlcykpO1xuICAgICAgfVxuXG4gICAgICBpZiAobi5uYW1lLnN0YXJ0c1dpdGgoJ25ld19maWVsZF8nKSkge1xuICAgICAgICBjb25zdCBuZXdGaWVsZE51bWJlciA9IHRoaXMuX2V4dHJhY3ROdW1iZXJGcm9tTmFtZShuLm5hbWUsICduZXdfZmllbGRfJyk7XG4gICAgICAgIGlmIChuZXdGaWVsZE51bWJlciAhPT0gbnVsbCkge1xuICAgICAgICAgIG1heE5ld0ZpZWxkQ291bnRlciA9IE1hdGgubWF4KG1heE5ld0ZpZWxkQ291bnRlciwgbmV3RmllbGROdW1iZXIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG4ubmFtZS5zdGFydHNXaXRoKCduZXdfc2xpZGVfJykpIHtcbiAgICAgICAgY29uc3QgbmV3U2xpZGVOdW1iZXIgPSB0aGlzLl9leHRyYWN0TnVtYmVyRnJvbU5hbWUobi5uYW1lLCAnbmV3X3NsaWRlXycpO1xuICAgICAgICBpZiAobmV3U2xpZGVOdW1iZXIgIT09IG51bGwpIHtcbiAgICAgICAgICBtYXhOZXdTbGlkZUNvdW50ZXIgPSBNYXRoLm1heChtYXhOZXdTbGlkZUNvdW50ZXIsIG5ld1NsaWRlTnVtYmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuX2VtcHR5RmllbGRDb3VudGVyID0gTWF0aC5tYXgodGhpcy5fZW1wdHlGaWVsZENvdW50ZXIsIG1heE5ld0ZpZWxkQ291bnRlciArIDEpO1xuICAgIHRoaXMuX2VtcHR5U2xpZGVDb3VudGVyID0gTWF0aC5tYXgodGhpcy5fZW1wdHlTbGlkZUNvdW50ZXIsIG1heE5ld1NsaWRlQ291bnRlciArIDEpO1xuICAgIHJldHVybiBtYXhJZDtcbiAgfVxuXG4gIHByaXZhdGUgX2V4dHJhY3ROdW1iZXJGcm9tTmFtZShzdHI6IHN0cmluZywgcHJlZml4OiBzdHJpbmcpOiBudW1iZXIgfCBudWxsIHtcbiAgICBjb25zdCByZWdleCA9IG5ldyBSZWdFeHAoYF4ke3ByZWZpeH0oXFxcXGQrKSRgKTtcbiAgICBjb25zdCBtYXRjaCA9IHJlZ2V4LmV4ZWMoc3RyKTtcbiAgICByZXR1cm4gbWF0Y2ggPyBOdW1iZXIobWF0Y2hbMV0pIDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtLnN1YnNjcmliZSgoZm9ybTogQWpmRm9ybSB8IG51bGwpID0+IHtcbiAgICAgIG5vZGVVbmlxdWVJZCA9IDA7XG4gICAgICBpZiAoZm9ybSAhPSBudWxsICYmIGZvcm0ubm9kZXMgIT0gbnVsbCAmJiBmb3JtLm5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbm9kZVVuaXF1ZUlkID0gdGhpcy5fZmluZE1heE5vZGVJZChmb3JtLm5vZGVzKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChfbm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5ub2RlcyAhPSBudWxsID8gZm9ybS5ub2Rlcy5zbGljZSgwKSA6IFtdO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzLm5leHQoXG4gICAgICAgIChfYXR0YWNobWVudHNPcmlnaW5zOiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10pOiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10gPT4ge1xuICAgICAgICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5hdHRhY2htZW50c09yaWdpbnMgIT0gbnVsbFxuICAgICAgICAgICAgPyBmb3JtLmF0dGFjaG1lbnRzT3JpZ2lucy5zbGljZSgwKVxuICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgICB0aGlzLl9jaG9pY2VzT3JpZ2luc1VwZGF0ZXMubmV4dChcbiAgICAgICAgKF9jaG9pY2VzT3JpZ2luczogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10pOiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmNob2ljZXNPcmlnaW5zICE9IG51bGwgPyBmb3JtLmNob2ljZXNPcmlnaW5zLnNsaWNlKDApIDogW107XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgdGhpcy5fc3RyaW5nSWRlbnRpZmllclVwZGF0ZXMubmV4dChcbiAgICAgICAgKF86IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10pOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdID0+IHtcbiAgICAgICAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uc3RyaW5nSWRlbnRpZmllciAhPSBudWxsXG4gICAgICAgICAgICA/IGZvcm0uc3RyaW5nSWRlbnRpZmllci5zbGljZSgwKVxuICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q2hvaWNlc09yaWdpbnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Nob2ljZXNPcmlnaW5zID0gKDxPYnNlcnZhYmxlPEFqZkNob2ljZXNPcmlnaW5zT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl9jaG9pY2VzT3JpZ2luc1VwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2NhbigoY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdLCBvcDogQWpmQ2hvaWNlc09yaWdpbnNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKGNob2ljZXNPcmlnaW5zKTtcbiAgICAgIH0sIFtdKSxcbiAgICAgIHNoYXJlUmVwbGF5KDEpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0QXR0YWNobWVudHNPcmlnaW5zU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9hdHRhY2htZW50c09yaWdpbnMgPSB0aGlzLl9hdHRhY2htZW50c09yaWdpbnNVcGRhdGVzLnBpcGUoXG4gICAgICBzY2FuKFxuICAgICAgICAoYXR0YWNobWVudHNPcmlnaW5zOiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10sIG9wOiBBamZBdHRhY2htZW50c09yaWdpbnNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICByZXR1cm4gb3AoYXR0YWNobWVudHNPcmlnaW5zKTtcbiAgICAgICAgfSxcbiAgICAgICAgW10sXG4gICAgICApLFxuICAgICAgc2hhcmVSZXBsYXkoMSksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRTdHJpbmdJZGVudGlmaWVyU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9zdHJpbmdJZGVudGlmaWVyID0gdGhpcy5fc3RyaW5nSWRlbnRpZmllclVwZGF0ZXMucGlwZShcbiAgICAgIHNjYW4oKHN0cmluZ0lkZW50aWZpZXI6IEFqZkZvcm1TdHJpbmdJZGVudGlmaWVyW10sIG9wOiBBamZGb3JtU3RyaW5nSWRlbnRpZmllck9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aoc3RyaW5nSWRlbnRpZmllcik7XG4gICAgICB9LCBbXSksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5vZGVzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2RlcyA9ICg8T2JzZXJ2YWJsZTxBamZOb2Rlc09wZXJhdGlvbj4+dGhpcy5fbm9kZXNVcGRhdGVzKS5waXBlKFxuICAgICAgc2Nhbigobm9kZXM6IEFqZk5vZGVbXSwgb3A6IEFqZk5vZGVzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChub2Rlcyk7XG4gICAgICB9LCBbXSksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuXG4gICAgdGhpcy5fbm9kZXNXaXRob3V0Q2hvaWNlT3JpZ2lucyA9ICh0aGlzLl9ub2RlcyBhcyBPYnNlcnZhYmxlPEFqZlNsaWRlW10+KS5waXBlKFxuICAgICAgbWFwKHNsaWRlcyA9PlxuICAgICAgICBzbGlkZXMubWFwKHNsaWRlID0+IHtcbiAgICAgICAgICBzbGlkZS5ub2RlcyA9IChzbGlkZS5ub2RlcyBhcyBBamZGaWVsZFtdKS5tYXAoKG5vZGU6IEFqZkZpZWxkKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzKG5vZGUpKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHtjaG9pY2VzLCBjaG9pY2VzT3JpZ2luLCAuLi5md2N9ID0gZGVlcENvcHkobm9kZSk7XG4gICAgICAgICAgICAgIHJldHVybiBmd2MgYXMgQWpmRmllbGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gc2xpZGU7XG4gICAgICAgIH0pLFxuICAgICAgKSxcbiAgICApO1xuXG4gICAgdGhpcy5fZmxhdE5vZGVzID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgIG1hcCgobm9kZXM6IEFqZk5vZGVbXSkgPT4gZmxhdHRlbk5vZGVzKG5vZGVzKSksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuXG4gICAgdGhpcy5fZmxhdEZpZWxkcyA9IHRoaXMuX2ZsYXROb2Rlcy5waXBlKFxuICAgICAgbWFwKChub2RlczogQWpmTm9kZVtdKSA9PiA8QWpmRmllbGRbXT5ub2Rlcy5maWx0ZXIobiA9PiAhaXNDb250YWluZXJOb2RlKG4pKSksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuXG4gICAgdGhpcy5fbm9kZUVudHJpZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgIG1hcChub2RlcyA9PiA8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnlbXT50aGlzLl9idWlsZEZvcm1CdWlsZGVyTm9kZXNUcmVlKG5vZGVzKSksXG4gICAgICBzaGFyZVJlcGxheSgxKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFNhdmVOb2RlKCk6IHZvaWQge1xuICAgIHRoaXMuX3NhdmVOb2RlRW50cnlFdmVudFxuICAgICAgLnBpcGUoXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuZWRpdGVkTm9kZUVudHJ5LCB0aGlzLmNob2ljZXNPcmlnaW5zLCB0aGlzLmF0dGFjaG1lbnRzT3JpZ2lucyksXG4gICAgICAgIGZpbHRlcigoW18sIG5vZGVFbnRyeV0pID0+IG5vZGVFbnRyeSAhPSBudWxsKSxcbiAgICAgICAgbWFwKChbcHJvcGVydGllcywgbmVdKSA9PiB7XG4gICAgICAgICAgdGhpcy5fYmVmb3JlTm9kZXNVcGRhdGUuZW1pdCgpO1xuICAgICAgICAgIGNvbnN0IG5vZGVFbnRyeSA9IG5lIGFzIEFqZkZvcm1CdWlsZGVyTm9kZUVudHJ5O1xuICAgICAgICAgIGNvbnN0IG9yaWdOb2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgY29uc3Qgbm9kZSA9IGRlZXBDb3B5KG9yaWdOb2RlKTtcbiAgICAgICAgICBub2RlLmlkID0gbm9kZUVudHJ5Lm5vZGUuaWQ7XG4gICAgICAgICAgbm9kZS5uYW1lID0gcHJvcGVydGllcy5uYW1lO1xuICAgICAgICAgIG5vZGUubGFiZWwgPSBwcm9wZXJ0aWVzLmxhYmVsO1xuICAgICAgICAgIG5vZGUudmlzaWJpbGl0eSA9XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLnZpc2liaWxpdHkgIT0gbnVsbFxuICAgICAgICAgICAgICA/IGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLnZpc2liaWxpdHl9KVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgICAgIGNvbnN0IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMgPSBub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoO1xuICAgICAgICAgIG5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcyA9XG4gICAgICAgICAgICBwcm9wZXJ0aWVzLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbFxuICAgICAgICAgICAgICA/IHByb3BlcnRpZXMuY29uZGl0aW9uYWxCcmFuY2hlcy5tYXAoKGNvbmRpdGlvbjogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb259KSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIDogW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgICAgICAgICBjb25zdCBuZXdDb25kaXRpb25hbEJyYW5jaGVzID0gbm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aDtcblxuICAgICAgICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZSkpIHtcbiAgICAgICAgICAgIG5vZGUuZm9ybXVsYVJlcHMgPVxuICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmZvcm11bGFSZXBzICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IHByb3BlcnRpZXMuZm9ybXVsYVJlcHN9KVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgLy8gbWluUmVwcyBpcyBkZWxpYmVyYXRlbHkgbGVmdCBhbG9uZTogdGhlIGJ1aWxkZXIgbm8gbG9uZ2VyIG9mZmVycyBpdCxcbiAgICAgICAgICAgIC8vIGFuZCBhc3NpZ25pbmcgdGhlIG1pc3NpbmcgcHJvcGVydHkgd291bGQgd2lwZSB0aGUgdmFsdWUgYSBzY2hlbWFcbiAgICAgICAgICAgIC8vIGF1dGhvcmVkIGVsc2V3aGVyZSBjYW1lIGluIHdpdGguIEFic2VudCwgaXQgZGVzZXJpYWxpc2VzIGFzIDEuXG4gICAgICAgICAgICBub2RlLm1heFJlcHMgPSBwcm9wZXJ0aWVzLm1heFJlcHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzRmllbGQobm9kZSkpIHtcbiAgICAgICAgICAgIG5vZGUuaGludCA9IHByb3BlcnRpZXMuaGludDtcbiAgICAgICAgICAgIG5vZGUuZWRpdGFibGUgPSAhcHJvcGVydGllcy5yZWFkb25seUZpZWxkO1xuICAgICAgICAgICAgbm9kZS5kZXNjcmlwdGlvbiA9IHByb3BlcnRpZXMuZGVzY3JpcHRpb247XG4gICAgICAgICAgICBub2RlLmRlZmF1bHRWYWx1ZSA9IGdldERlZmF1bHRWYWx1ZShwcm9wZXJ0aWVzLmRlZmF1bHRWYWx1ZSwgbm9kZSk7XG4gICAgICAgICAgICBub2RlLmZvcm11bGEgPVxuICAgICAgICAgICAgICBwcm9wZXJ0aWVzLmZvcm11bGEgIT0gbnVsbCA/IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IHByb3BlcnRpZXMuZm9ybXVsYX0pIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgY29uc3QgZm9yY2VWYWx1ZSA9IHByb3BlcnRpZXMudmFsdWU7XG4gICAgICAgICAgICBjb25zdCBub3RFbXB0eSA9IHByb3BlcnRpZXMubm90RW1wdHk7XG4gICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uQ29uZGl0aW9ucyA9IHByb3BlcnRpZXMudmFsaWRhdGlvbkNvbmRpdGlvbnM7XG4gICAgICAgICAgICBsZXQgbWluVmFsdWU6IG51bWJlciB8IG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1pblZhbHVlLCAxMCk7XG4gICAgICAgICAgICBsZXQgbWF4VmFsdWU6IG51bWJlciB8IG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heFZhbHVlLCAxMCk7XG4gICAgICAgICAgICBsZXQgbWluRGlnaXRzOiBudW1iZXIgfCBudWxsID0gcGFyc2VJbnQocHJvcGVydGllcy5taW5EaWdpdHMsIDEwKTtcbiAgICAgICAgICAgIGxldCBtYXhEaWdpdHM6IG51bWJlciB8IG51bGwgPSBwYXJzZUludChwcm9wZXJ0aWVzLm1heERpZ2l0cywgMTApO1xuICAgICAgICAgICAgaWYgKGlzTmFOKG1pblZhbHVlKSkge1xuICAgICAgICAgICAgICBtaW5WYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNOYU4obWF4VmFsdWUpKSB7XG4gICAgICAgICAgICAgIG1heFZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc05hTihtaW5EaWdpdHMpKSB7XG4gICAgICAgICAgICAgIG1pbkRpZ2l0cyA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNOYU4obWF4RGlnaXRzKSkge1xuICAgICAgICAgICAgICBtYXhEaWdpdHMgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBmb3JjZVZhbHVlICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgbm90RW1wdHkgIT0gbnVsbCB8fFxuICAgICAgICAgICAgICAodmFsaWRhdGlvbkNvbmRpdGlvbnMgIT0gbnVsbCAmJiB2YWxpZGF0aW9uQ29uZGl0aW9ucy5sZW5ndGggPiAwKSB8fFxuICAgICAgICAgICAgICBtaW5WYWx1ZSAhPSBudWxsIHx8XG4gICAgICAgICAgICAgIG1heFZhbHVlICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgbWluRGlnaXRzICE9IG51bGwgfHxcbiAgICAgICAgICAgICAgbWF4RGlnaXRzICE9IG51bGxcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uID0gbm9kZS52YWxpZGF0aW9uIHx8IGNyZWF0ZVZhbGlkYXRpb25Hcm91cCh7fSk7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24uZm9yY2VWYWx1ZSA9IGZvcmNlVmFsdWU7XG4gICAgICAgICAgICAgIHZhbGlkYXRpb24ubm90RW1wdHkgPSBub3RFbXB0eSA/IG5vdEVtcHR5VmFsaWRhdGlvbigpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pblZhbHVlID0gbWluVmFsdWUgIT0gbnVsbCA/IG1pblZhbGlkYXRpb24obWluVmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1heFZhbHVlID0gbWF4VmFsdWUgIT0gbnVsbCA/IG1heFZhbGlkYXRpb24obWF4VmFsdWUpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1pbkRpZ2l0cyA9IG1pbkRpZ2l0cyAhPSBudWxsID8gbWluRGlnaXRzVmFsaWRhdGlvbihtaW5EaWdpdHMpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLm1heERpZ2l0cyA9IG1heERpZ2l0cyAhPSBudWxsID8gbWF4RGlnaXRzVmFsaWRhdGlvbihtYXhEaWdpdHMpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICB2YWxpZGF0aW9uLmNvbmRpdGlvbnMgPSAodmFsaWRhdGlvbkNvbmRpdGlvbnMgfHwgW10pLm1hcChcbiAgICAgICAgICAgICAgICAoYzoge2NvbmRpdGlvbjogc3RyaW5nOyBlcnJvck1lc3NhZ2U6IHN0cmluZ30pID0+XG4gICAgICAgICAgICAgICAgICBjcmVhdGVWYWxpZGF0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uOiBjLmNvbmRpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBjLmVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBub2RlLnZhbGlkYXRpb24gPSB2YWxpZGF0aW9uO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbm9kZS52YWxpZGF0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3Qgbm90RW1wdHlXYXJuID0gcHJvcGVydGllcy5ub3RFbXB0eVdhcm5pbmc7XG4gICAgICAgICAgICBjb25zdCB3YXJuaW5nQ29uZGl0aW9ucyA9IHByb3BlcnRpZXMud2FybmluZ0NvbmRpdGlvbnM7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIG5vdEVtcHR5V2FybiAhPSBudWxsIHx8XG4gICAgICAgICAgICAgICh3YXJuaW5nQ29uZGl0aW9ucyAhPSBudWxsICYmIHdhcm5pbmdDb25kaXRpb25zLmxlbmd0aCA+IDApXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3Qgd2FybmluZyA9IG5vZGUud2FybmluZyB8fCBjcmVhdGVXYXJuaW5nR3JvdXAoe30pO1xuICAgICAgICAgICAgICB3YXJuaW5nLm5vdEVtcHR5ID0gbm90RW1wdHlXYXJuID8gbm90RW1wdHlXYXJuaW5nKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgIHdhcm5pbmcuY29uZGl0aW9ucyA9ICh3YXJuaW5nQ29uZGl0aW9ucyB8fCBbXSkubWFwKFxuICAgICAgICAgICAgICAgICh3OiB7Y29uZGl0aW9uOiBzdHJpbmc7IHdhcm5pbmdNZXNzYWdlOiBzdHJpbmd9KSA9PlxuICAgICAgICAgICAgICAgICAgY3JlYXRlV2FybmluZyh7XG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbjogdy5jb25kaXRpb24sXG4gICAgICAgICAgICAgICAgICAgIHdhcm5pbmdNZXNzYWdlOiB3Lndhcm5pbmdNZXNzYWdlLFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIG5vZGUud2FybmluZyA9IHdhcm5pbmc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBub2RlLndhcm5pbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBub2RlLm5leHRTbGlkZUNvbmRpdGlvbiA9XG4gICAgICAgICAgICAgIHByb3BlcnRpZXMubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGxcbiAgICAgICAgICAgICAgICA/IGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBwcm9wZXJ0aWVzLm5leHRTbGlkZUNvbmRpdGlvbn0pXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBub2RlLnNpemUgPSBwcm9wZXJ0aWVzLnNpemU7XG5cbiAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMobm9kZSkpIHtcbiAgICAgICAgICAgICAgKG5vZGUgYXMgYW55KS5jaG9pY2VzT3JpZ2luUmVmID0gcHJvcGVydGllcy5jaG9pY2VzT3JpZ2luUmVmO1xuICAgICAgICAgICAgICBub2RlLmZvcmNlRXhwYW5kZWQgPSBwcm9wZXJ0aWVzLmZvcmNlRXhwYW5kZWQ7XG4gICAgICAgICAgICAgIG5vZGUuZm9yY2VOYXJyb3cgPSBwcm9wZXJ0aWVzLmZvcmNlTmFycm93O1xuICAgICAgICAgICAgICBub2RlLnRyaWdnZXJDb25kaXRpb25zID0gKHByb3BlcnRpZXMudHJpZ2dlckNvbmRpdGlvbnMgfHwgW10pLm1hcCgodDogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiB0fSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1JhbmdlRmllbGQobm9kZSkpIHtcbiAgICAgICAgICAgICAgbm9kZS5zdGFydCA9IHByb3BlcnRpZXMuc3RhcnQ7XG4gICAgICAgICAgICAgIG5vZGUuZW5kID0gcHJvcGVydGllcy5lbmQ7XG4gICAgICAgICAgICAgIG5vZGUuc3RlcCA9IHByb3BlcnRpZXMuc3RlcDtcbiAgICAgICAgICAgICAgbm9kZS5hcHBlYXJhbmNlID0gcHJvcGVydGllcy5hcHBlYXJhbmNlID8/IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGlzRW1wdHlGaWVsZChub2RlKSkge1xuICAgICAgICAgICAgICBub2RlLkhUTUwgPSBwcm9wZXJ0aWVzLkhUTUw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChpc1RhYmxlRmllbGQobm9kZSkpIHtcbiAgICAgICAgICAgICAgbGV0IHtjb2x1bW5UeXBlcywgcm93cywgY29sdW1uTGFiZWxzLCByb3dMYWJlbHN9ID0gSlNPTi5wYXJzZShwcm9wZXJ0aWVzLnRhYmxlRGVmKTtcbiAgICAgICAgICAgICAgbm9kZS5jb2x1bW5UeXBlcyA9IGNvbHVtblR5cGVzIHx8IFtdO1xuICAgICAgICAgICAgICBub2RlLnJvd3MgPSByb3dzIHx8IFtdO1xuICAgICAgICAgICAgICBub2RlLmNvbHVtbkxhYmVscyA9IGNvbHVtbkxhYmVscyB8fCBbXTtcbiAgICAgICAgICAgICAgbm9kZS5yb3dMYWJlbHMgPSByb3dMYWJlbHMgfHwgW107XG4gICAgICAgICAgICAgIG5vZGUuaGlkZUVtcHR5Um93cyA9IHByb3BlcnRpZXMuaGlkZUVtcHR5Um93cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9lZGl0ZWROb2RlRW50cnkubmV4dChudWxsKTtcblxuICAgICAgICAgIHJldHVybiAobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG9yaWdOb2RlKTtcbiAgICAgICAgICAgIGlmIChjbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIC8vIFRPRE86IEB0cmlrIGNoZWNrIHRoaXMsIHdhcyBhbHdheXMgdHJ1ZT9cbiAgICAgICAgICAgICAgLy8gaWYgKGNuIGluc3RhbmNlb2YgQWpmTm9kZSkge1xuICAgICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICAgIGNvbnN0IGlkeCA9IGNuLm5vZGVzLm1hcChuID0+IG4uaWQpLmluZGV4T2Yob3JpZ05vZGUuaWQpO1xuICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICBuZXdOb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IG5ld05vZGVzLmNvbmNhdChjbi5ub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gICBjb25zdCBpZHggPSBub2Rlcy5pbmRleE9mKG9yaWdOb2RlKTtcbiAgICAgICAgICAgICAgLy8gICBub2RlcyA9IG5vZGVzLnNsaWNlKDAsIGlkeCkuY29uY2F0KFtub2RlXSkuY29uY2F0KG5vZGVzLnNsaWNlKGlkeCArIDEpKTtcbiAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICBpZiAobmV3Q29uZGl0aW9uYWxCcmFuY2hlcyA8IG9sZENvbmRpdGlvbmFsQnJhbmNoZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gbmV3Q29uZGl0aW9uYWxCcmFuY2hlczsgaSA8IG9sZENvbmRpdGlvbmFsQnJhbmNoZXM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgbm9kZXMgPSBkZWxldGVOb2RlU3VidHJlZShub2Rlcywgbm9kZSwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RGVsZXRlTm9kZSgpOiB2b2lkIHtcbiAgICAoPE9ic2VydmFibGU8QWpmRm9ybUJ1aWxkZXJOb2RlRW50cnk+PnRoaXMuX2RlbGV0ZU5vZGVFbnRyeUV2ZW50KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgobm9kZUVudHJ5OiBBamZGb3JtQnVpbGRlck5vZGVFbnRyeSkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICB0aGlzLnJlbW92ZUV4cGFuZGVkU3RhdHVzKG5vZGVFbnRyeS5ub2RlLm5hbWUpO1xuICAgICAgICAgIHJldHVybiAobm9kZXM6IEFqZk5vZGVbXSk6IEFqZk5vZGVbXSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gbm9kZUVudHJ5Lm5vZGU7XG4gICAgICAgICAgICBsZXQgY24gPSBnZXROb2RlQ29udGFpbmVyKHtub2Rlc30sIG5vZGUpO1xuICAgICAgICAgICAgaWYgKGNuICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgY29uc3QgcmVwbGFjZU5vZGVzID0gY24ubm9kZXMgPT09IG5vZGVzO1xuICAgICAgICAgICAgICBjb25zdCBpZHggPSBjbi5ub2Rlcy5tYXAobiA9PiBuLmlkKS5pbmRleE9mKG5vZGUuaWQpO1xuICAgICAgICAgICAgICBsZXQgbmV3Tm9kZXMgPSBjbi5ub2Rlcy5zbGljZSgwLCBpZHgpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IG5ld05vZGVzLmNvbmNhdChjbi5ub2Rlcy5zbGljZShpZHggKyAxKSk7XG4gICAgICAgICAgICAgIGNuLm5vZGVzID0gbmV3Tm9kZXM7XG4gICAgICAgICAgICAgIGlmIChyZXBsYWNlTm9kZXMpIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgICB9O1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyB0aGUgc3Vic2NyaXB0aW9uIHRvIHRoZSBtb3ZlTm9kZUVudHJ5RXZlbnQuXG4gICAqL1xuICBwcml2YXRlIF9pbml0TW92ZU5vZGUoKTogdm9pZCB7XG4gICAgdGhpcy5fbW92ZU5vZGVTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9tb3ZlTm9kZVN1YiA9IHRoaXMuX21vdmVOb2RlRW50cnlFdmVudFxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgobW92ZUV2ZW50OiBBamZGb3JtQnVpbGRlck1vdmVFdmVudCkgPT4ge1xuICAgICAgICAgIHRoaXMuX2JlZm9yZU5vZGVzVXBkYXRlLmVtaXQoKTtcbiAgICAgICAgICByZXR1cm4gKG5vZGVzOiBBamZOb2RlW10pOiBBamZOb2RlW10gPT4ge1xuICAgICAgICAgICAgY29uc3Qgbm9kZUVudHJ5ID0gbW92ZUV2ZW50Lm5vZGVFbnRyeSBhcyBBamZGb3JtQnVpbGRlck5vZGVFbnRyeTtcbiAgICAgICAgICAgIGNvbnN0IG5vZGUgPSBub2RlRW50cnkubm9kZTtcbiAgICAgICAgICAgIGxldCBjbiA9IGdldE5vZGVDb250YWluZXIoe25vZGVzfSwgbm9kZSkgYXMgQWpmQ29udGFpbmVyTm9kZTtcbiAgICAgICAgICAgIGxldCBuZXdOb2RlczogQWpmTm9kZVtdID0gbm9kZXM7XG4gICAgICAgICAgICBpZiAoY24gIT0gbnVsbCkge1xuICAgICAgICAgICAgICBjb25zdCByZXBsYWNlTm9kZXMgPSBjbi5ub2RlcyA9PT0gbm9kZXM7XG4gICAgICAgICAgICAgIG5ld05vZGVzID0gY24ubm9kZXM7XG4gICAgICAgICAgICAgIG1vdmVJdGVtSW5BcnJheShuZXdOb2RlcywgbW92ZUV2ZW50LmZyb21JbmRleCwgbW92ZUV2ZW50LnRvSW5kZXgpO1xuICAgICAgICAgICAgICBuZXdOb2RlcyA9IHRoaXMuX3VwZGF0ZU5vZGVzTGlzdChjbi5pZCwgbmV3Tm9kZXMpO1xuICAgICAgICAgICAgICBjbi5ub2RlcyA9IG5ld05vZGVzO1xuICAgICAgICAgICAgICBpZiAocmVwbGFjZU5vZGVzKSB7XG4gICAgICAgICAgICAgICAgbm9kZXMgPSBuZXdOb2RlcztcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgXCJpZFwiIGFuZCBcInBhcmVudFwiIGZpZWxkcyBvZiBhIG1vZGlmaWVkIG9yIHJlYXJyYW5nZWQgbGlzdCBvZiBub2Rlcy5cbiAgICogQHBhcmFtIGNvbnRhaW5lcklkIFRoZSBpZCBvZiB0aGUgcGFyZW50IGNvbnRhaW5lciBvZiB0aGUgbGlzdC5cbiAgICogQHBhcmFtIG5vZGVzTGlzdCBUaGUgbGlzdCBvZiBub2RlcyB0byBiZSB1cGRhdGVkLlxuICAgKi9cbiAgcHJpdmF0ZSBfdXBkYXRlTm9kZXNMaXN0KGNvbnRhaW5lcklkOiBudW1iZXIsIG5vZGVzTGlzdDogQWpmTm9kZVtdKTogQWpmTm9kZVtdIHtcbiAgICBpZiAoIW5vZGVzTGlzdC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgY29udElkID0gY29udGFpbmVySWQgIT0gdW5kZWZpbmVkID8gY29udGFpbmVySWQgOiAwO1xuICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IG5vZGVzTGlzdC5sZW5ndGg7IGlkeCsrKSB7XG4gICAgICBsZXQgY3VycmVudE5vZGUgPSBub2Rlc0xpc3RbaWR4XTtcbiAgICAgIGN1cnJlbnROb2RlLmlkID0gY29udElkICogMTAwMCArIGlkeCArIDE7XG4gICAgICBjdXJyZW50Tm9kZS5wYXJlbnQgPSBpZHggPT0gMCA/IGNvbnRJZCA6IGNvbnRJZCAqIDEwMDAgKyBpZHg7XG4gICAgICBpZiAoaXNTbGlkZXNOb2RlKGN1cnJlbnROb2RlKSkge1xuICAgICAgICB0aGlzLl91cGRhdGVOb2Rlc0xpc3QoY3VycmVudE5vZGUuaWQsIGN1cnJlbnROb2RlLm5vZGVzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVzTGlzdDtcbiAgfVxufVxuIl19