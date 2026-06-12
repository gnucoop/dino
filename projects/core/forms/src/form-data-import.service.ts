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

import {AjfContainerNode, AjfField, AjfNode, AjfNodeType, isContainerNode} from '@ajf/core/forms';
import {Injectable, Optional} from '@angular/core';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {DataModelManager, MetricsService} from '@dino/core/data';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {ProjectManager} from '@dino/core/projects';
import * as XLSX from 'xlsx';

import {FormSchema} from './form-schema';

/**
 * The columns and the parsed rows read from an imported file.
 */
export interface ParsedWorkbook {
  /**
   * The rows parsed from the file, keyed by the file column names.
   */
  rows: {[key: string]: any}[];

  /**
   * The non empty column names found in the file header.
   */
  columns: string[];
}

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
    const wb = XLSX.read(bufferArray, {type: 'buffer'});
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    // Some files declare a huge used range (e.g. A1:XFD1048576) caused by stray
    // formatting on empty cells. sheet_to_json iterates the whole declared range,
    // which would freeze the UI, so clamp it to the actually populated cells.
    this._trimSheetRange(ws);
    const rows: {[key: string]: any}[] = XLSX.utils.sheet_to_json(ws);
    const headerRows: any[][] = XLSX.utils.sheet_to_json(ws, {header: 1});
    const columns = (headerRows.length ? headerRows[0] : [])
      .map(column => `${column}`)
      .filter(column => column.length > 0);
    return {rows, columns};
  }

  /**
   * Shrink the worksheet declared range (`!ref`) to the bounding box of the
   * cells that actually hold a value, so a bloated range does not make
   * sheet_to_json walk millions of empty cells.
   * @param ws The worksheet to clamp in place
   */
  private _trimSheetRange(ws: XLSX.WorkSheet): void {
    if (!ws || !ws['!ref']) {
      return;
    }
    const declared = XLSX.utils.decode_range(ws['!ref']);
    let maxRow = -1;
    let maxCol = -1;
    Object.keys(ws).forEach(key => {
      if (key.charAt(0) === '!') {
        return;
      }
      const cell = XLSX.utils.decode_cell(key);
      if (cell.r > maxRow) {
        maxRow = cell.r;
      }
      if (cell.c > maxCol) {
        maxCol = cell.c;
      }
    });
    if (maxRow < 0 || maxCol < 0) {
      // No data cells: nothing to import
      return;
    }
    if (maxRow < declared.e.r || maxCol < declared.e.c) {
      ws['!ref'] = XLSX.utils.encode_range({s: declared.s, e: {r: maxRow, c: maxCol}});
    }
  }

  /**
   * Build the list of all the fields available as mapping target:
   * the form schema fields and the special Dino fields
   * (created_at, user_data_ref_id, form_status_name and the metric columns)
   * @param formSchema The form schema
   * @param columns The columns found in the file
   * @returns All the available fields
   */
  getAvailableFields(formSchema: FormSchema | null, columns: string[]): string[] {
    const fields: string[] = [];
    if (formSchema) {
      this.getFieldsNameFromFormSchema(formSchema).forEach(field => {
        if (field.indexOf('__') > -1) {
          // Repeating slide field: add an entry for every matching file column
          columns.forEach(column => {
            const fieldNameRegex = new RegExp(`^${field}$`, 'g');
            if (fieldNameRegex.test(column)) {
              fields.push(column);
            }
          });
        } else {
          fields.push(field);
        }
      });
    }
    fields.push('created_at', 'user_data_ref_id', 'form_status_name');
    const activeMetrics = this.metricsService.activeMetrics.value.map(metric => metric.metricName);
    activeMetrics.forEach(metric => {
      const manager = this._metricManagers[metric];
      if (manager === null) {
        return;
      }
      fields.push(`${metric}_id`);
      const props = manager.collectionSchema.properties;
      Object.keys(props)
        .filter(prop => !this._notMappableMetricProps.includes(prop))
        .filter(prop => !(metric === 'case' && prop === 'code'))
        .filter(prop => !(metric === 'project' && prop === 'code_auto'))
        .forEach(prop => fields.push(`${metric}_${prop}`));
    });
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
