/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {
  AjfContainerNode,
  AjfField,
  AjfFieldType,
  AjfNode,
  AjfNodeType,
  AjfTableField,
  isContainerNode,
} from '@ajf/core/forms';
import {Injectable, Optional} from '@angular/core';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {
  DataModelManager,
  MetricsService,
  ParsedWorkbook,
  parseWorkbook as parseWorkbookBuffer,
} from '@dino/core/data';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';

import {FormSchema} from './form-schema';

/**
 * Stateless helpers used by the Import Form to parse the imported file and to
 * compute and validate the form schema fields.
 * The methods here have no component state and no side effects on the import
 * flow: they only read the injected metric managers to build the available
 * mapping targets.
 */
@Injectable({providedIn: 'root'})
export class FormDataImportService {
  /**
   * Metric properties that can not be used as mapping target
   */
  private _notMappableMetricProps: string[] = [
    'id',
    'created_at',
    'updated_at',
    'is_deleted',
    '_deleted',
  ];

  /**
   * The Dino managed columns offered as mapping target
   */
  readonly dinoImportFields: readonly string[] = [
    'created_at',
    'user_data_ref_id',
    'form_status_name',
    'dinoinvalid',
  ];

  /**
   * All metric managers
   */
  private _metricManagers: {[key: string]: DataModelManager<any> | null};

  constructor(
    readonly metricsService: MetricsService,
    @Optional() private _ar: AreaManager | null,
    @Optional() private _cs: CaseManager | null,
    @Optional() private _pj: ProjectManager | null,
    @Optional() private _lc: LocationManager | null,
    @Optional() private _og: OrganizationManager | null,
  ) {
    this._metricManagers = {
      area: this._ar,
      case: this._cs,
      project: this._pj,
      location: this._lc,
      organization: this._og,
    };
  }

  /**
   * Read an xls/csv file buffer, converting it into a json with the file
   * columns as keys and reading the non empty column names from the header.
   * @param bufferArray The array buffer of the file to be read
   * @returns The parsed rows and the file columns
   */
  parseWorkbook(bufferArray: any): ParsedWorkbook {
    return parseWorkbookBuffer(bufferArray);
  }

  /**
   * The metric types usable with a form schema: the active metrics, restricted to
   * the ones declared by form_schema_metrics when the schema declares any.
   * An empty form_schema_metrics means all the active metrics.
   * @param formSchema The form schema
   * @returns The metric type names
   */
  getSchemaMetrics(formSchema: FormSchema | null): string[] {
    const activeMetrics = this.metricsService.activeMetrics.value.map(metric => metric.metricName);
    const schemaMetrics = formSchema?.form_schema_metrics;
    return schemaMetrics && schemaMetrics.length
      ? activeMetrics.filter(metric => schemaMetrics.includes(metric))
      : activeMetrics;
  }

  /**
   * The mapping targets contributed by each metric type usable with the form
   * schema: the metric id plus one entry per importable metric property.
   * @param formSchema The form schema
   * @returns metric type -> its mapping targets
   */
  getMetricFields(formSchema: FormSchema | null): {[metric: string]: string[]} {
    const result: {[metric: string]: string[]} = {};
    this.getSchemaMetrics(formSchema).forEach(metric => {
      const manager = this._metricManagers[metric];
      if (manager == null) {
        return;
      }
      const props = manager.collectionSchema.properties;
      result[metric] = [
        `${metric}_id`,
        ...Object.keys(props)
          .filter(prop => !this._notMappableMetricProps.includes(prop))
          .filter(prop => !(metric === 'case' && prop === 'code'))
          .filter(prop => !(metric === 'project' && prop === 'code_auto'))
          .map(prop => `${metric}_${prop}`),
      ];
    });
    return result;
  }

  /**
   * Build the list of all the fields available as mapping target:
   * the form schema fields and the special Dino fields
   * (created_at, user_data_ref_id, form_status_name, dinoinvalid and the metric columns)
   * @param formSchema The form schema
   * @returns All the available fields
   */
  getAvailableFields(formSchema: FormSchema | null): string[] {
    const fields: string[] = [];
    const tableCells = this.getTableFields(formSchema);
    const tableNames = new Set(Object.values(tableCells).map(cell => cell.tableName));
    if (formSchema) {
      this.getFieldsNameFromFormSchema(formSchema).forEach(field => {
        // Repeating slide fields come from the schema as `name__[0-9]+`: expose
        // a single base entry (`name`); the repetition index of each mapped
        // column is chosen by the user and applied at import time.
        const repSuffixIdx = field.indexOf('__[0-9]+');
        const baseName = repSuffixIdx > -1 ? field.substring(0, repSuffixIdx) : field;
        // A table field carries no data under its own name: its cells are stored
        // as `name__<row>__<column>`. Skip the bare table name here and expose
        // one mapping target per cell (added below).
        if (tableNames.has(baseName)) {
          return;
        }
        fields.push(baseName);
      });
    }
    Object.keys(tableCells).forEach(cell => fields.push(cell));
    fields.push(...this.dinoImportFields);
    const metricFields = this.getMetricFields(formSchema);
    Object.keys(metricFields).forEach(metric => fields.push(...metricFields[metric]));
    return [...new Set(fields)].sort((a, b) => a.localeCompare(b));
  }

  /**
   * Get all fields name for an ajf formschema
   * @param fschema
   * @returns All field names
   */
  getFieldsNameFromFormSchema(fschema: FormSchema): string[] {
    const nodes = fschema.schema.nodes;
    let schemaFields: string[] = [];
    if (nodes) {
      const flatNodes = this.flattenNodes(nodes);
      const fields = <AjfField[]>flatNodes.filter(n => !isContainerNode(n));
      schemaFields = fields
        .filter(f => f.name != null)
        .map(f => f.name)
        .filter(f => f.length > 0);
    }
    return schemaFields;
  }

  /**
   * The raw, untranslated label of every mappable form schema field, keyed by the
   * same name used by getAvailableFields (a repeating-slide inner field is keyed
   * by its base name, without the `__[0-9]+` suffix).
   * @param formSchema The form schema
   * @returns field name -> field label
   */
  getFieldLabels(formSchema: FormSchema | null): {[fieldName: string]: string} {
    const result: {[fieldName: string]: string} = {};
    if (!formSchema) {
      return result;
    }
    this.flattenNodes(formSchema.schema.nodes || [])
      .filter(node => !isContainerNode(node))
      .forEach(node => {
        const field = node as AjfField;
        if (field.name == null || !field.name.length || !field.label || !field.label.length) {
          return;
        }
        const repSuffixIdx = field.name.indexOf('__[0-9]+');
        const baseName = repSuffixIdx > -1 ? field.name.substring(0, repSuffixIdx) : field.name;
        result[baseName] = field.label;
      });
    return result;
  }

  /**
   * Map every repeating-slide inner field (by its base name) to the name of its
   * repeating slide. The slide name is the key that, in the form data, holds the
   * number of repetitions (e.g. `data[slideName] = 3`).
   * @param formSchema The form schema
   * @returns base field name -> containing repeating slide name
   */
  getRepeatingSlideFields(formSchema: FormSchema | null): {[fieldName: string]: string} {
    const result: {[fieldName: string]: string} = {};
    if (!formSchema) {
      return result;
    }
    const visit = (nodes: AjfNode[]): void => {
      nodes.forEach(node => {
        if (!isContainerNode(node)) {
          return;
        }
        if (node.nodeType === AjfNodeType.AjfRepeatingSlide) {
          this.flattenNodes((node as AjfContainerNode).nodes)
            .filter(inner => !isContainerNode(inner) && inner.name != null && inner.name.length > 0)
            .forEach(inner => {
              result[inner.name] = node.name;
            });
        } else {
          visit((node as AjfContainerNode).nodes);
        }
      });
    };
    visit(formSchema.schema.nodes || []);
    return result;
  }

  /**
   * Map every table cell (by its data key `name__<row>__<column>`) to the table
   * it belongs to, together with its row and column labels. Unlike a repeating
   * slide, a table has a fixed, known number of rows and columns, so every cell
   * can be offered as its own mapping target and matched by name against a dino
   * exported file (whose header already uses these keys).
   * @param formSchema The form schema
   * @returns cell data key -> {tableName, tableLabel, rowLabel, columnLabel}
   */
  getTableFields(formSchema: FormSchema | null): {
    [cellKey: string]: {
      tableName: string;
      tableLabel: string;
      rowLabel: string;
      columnLabel: string;
    };
  } {
    const result: {
      [cellKey: string]: {
        tableName: string;
        tableLabel: string;
        rowLabel: string;
        columnLabel: string;
      };
    } = {};
    if (!formSchema) {
      return result;
    }
    const visit = (nodes: AjfNode[]): void => {
      nodes.forEach(node => {
        if (isContainerNode(node)) {
          visit((node as AjfContainerNode).nodes);
          return;
        }
        const field = node as AjfField;
        if (field.fieldType === AjfFieldType.Table && field.name != null && field.name.length > 0) {
          const table = field as AjfTableField;
          const rowLabels = table.rowLabels || [];
          const columnLabels = table.columnLabels || [];
          rowLabels.forEach((rowLabel, rowIdx) => {
            columnLabels.forEach((columnLabel, columnIdx) => {
              result[`${field.name}__${rowIdx}__${columnIdx}`] = {
                tableName: field.name,
                tableLabel: field.label || '',
                rowLabel,
                columnLabel,
              };
            });
          });
        }
      });
    };
    visit(formSchema.schema.nodes || []);
    return result;
  }

  /**
   * Get flatten nodes for an ajf formschema
   * @param nodes
   * @returns an ajfNode list for the schema
   */
  flattenNodes(nodes: AjfNode[], isRepSlide: boolean = false): AjfNode[] {
    let flatNodes: AjfNode[] = [];
    nodes.forEach((node: AjfNode) => {
      if (isContainerNode(node)) {
        const isRepSlide = node.nodeType === AjfNodeType.AjfRepeatingSlide;
        flatNodes = flatNodes.concat(this.flattenNodes((<AjfContainerNode>node).nodes, isRepSlide));
      }
      if (isRepSlide) {
        flatNodes.push({...node, name: node.name + '__[0-9]+'});
      } else {
        flatNodes.push(node);
      }
    });

    return flatNodes;
  }

  /**
   * Check if the row keys contain at least one field
   * @param rowKeys row keys
   * @param fields fields to be check
   * @returns true if exist
   */
  containsAtLeastOne(rowKeys: string[], fields: string[]): boolean {
    return fields.some(f => {
      if (f.indexOf('__') > -1) {
        const fieldNameRegex = new RegExp(`^${f}$`, 'g');
        return rowKeys.some(k => fieldNameRegex.test(k));
      } else {
        return rowKeys.indexOf(f) > -1;
      }
    });
  }

  /**
   * Check if imported xls file is valid for dino and for the selected form schema.
   * @param data json data contained into the xlsx file, with mapped field names as keys
   * @param formSchema ajf form schema
   * @returns true if xls colomns contains at least one field from the schema
   */
  isValidXlsxData(data: {[key: string]: any}[], formSchema: FormSchema | null): boolean {
    if (formSchema && data && data.length) {
      const rowKeys = Object.keys(data[0]);
      const schemaFields = this.getFieldsNameFromFormSchema(formSchema);
      return this.containsAtLeastOne(rowKeys, schemaFields);
    }
    return false;
  }
}
