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

import {AjfStringIdentifier} from '@ajf/core/common';
import {AjfChoicesOrigin, AjfNodeType} from '@ajf/core/forms';
import {DEFAULT_EXCLUDED_METRIC_KEYS, MetricsService} from '@dino/core/data';
import {FilterGroup, FilterItem, ListHeader} from '@dino/core/list';

import {FormSchema, migrationStrategies} from './form-schema';
import {schema} from './form-schema-json';

export const creationParams = {name: 'form_schema', collection: {schema, migrationStrategies}};

const getChoiceOriginFromRef = (
  choicesOrigins: AjfChoicesOrigin<any>[],
  choicesOriginRef: string,
): AjfChoicesOrigin<any> => {
  return choicesOrigins.filter(f => f.name === choicesOriginRef)[0] || [];
};

/**
 * Generates a group of filters from an AjfFormSchema
 * @param formSchema The form schema definition
 * @returns The generated FilterGroup
 */
export const generateAdditionalFilters = (formSchema?: FormSchema): FilterGroup[] => {
  if (!formSchema) {
    return [];
  }
  const slides = formSchema.schema.nodes;
  const choicesOrigins = formSchema.schema.choicesOrigins as AjfChoicesOrigin<any>[];
  const nodes: FilterGroup[] = [];
  if (slides) {
    for (let i = 0; i < slides.length; i++) {
      let additionalFilters = slides[i].nodes as FilterItem[];
      nodes.push({
        filterGroupName: slides[i].label,
        filterGroupAdditionalFilters: additionalFilters.map(f => {
          f.choicesOrigin = f.choicesOriginRef
            ? getChoiceOriginFromRef(choicesOrigins, f.choicesOriginRef)
            : undefined;
          f.isAdditionalFilter = true;
          f.isRepeatingSlideFilter = slides[i].nodeType == 4;
          return f;
        }),
      } as FilterGroup);
    }
  }
  return nodes;
};

/**
 * Generates List Headers for the active Metrics
 * @returns The generated Metrics List Headers
 */
export const generateMetricsHeaders = (metricService: MetricsService): ListHeader<any>[] => {
  const metricHeaders: ListHeader<any>[] = [];
  metricService.activeMetrics.getValue().forEach(metric => {
    metricHeaders.push({
      column: `${metric.metricName}_ref_id`,
      external_ref: `${metric.metricName}_ref_id`,
      label: metric.label.slice(0, -1),
      populateWith: 'name',
      icon: metric.icon,
    });
    if (metric.metricSchema != null && metric.metricSchema.properties != null) {
      const metricSchemaKeys = Object.keys(metric.metricSchema.properties);
      for (let key of metricSchemaKeys) {
        if (!DEFAULT_EXCLUDED_METRIC_KEYS.includes(key)) {
          metricHeaders.push({
            column: `${metric.metricName}_${key}`,
            external_ref: `${metric.metricName}_ref_id`,
            label: `${metric.label.slice(0, -1)} ${key.replace('_', ' ')}`,
            displayed: false,
            populateWith: key,
            icon: metric.icon,
          });
        }
      }
    }
  });
  return metricHeaders;
};

/**
 * Generates List Headers based on an AjfFormSchema
 * @param formSchema The form schema definition
 * @returns The generated Schema List Headers
 */
export const generateSchemaListHeaders = (
  metricService: MetricsService,
  formSchema?: FormSchema,
): ListHeader<any>[] => {
  if (formSchema == null || formSchema.schema.nodes == null) {
    return [];
  }
  const metricHeaders: ListHeader<any>[] = generateMetricsHeaders(metricService);
  const defaultHeaders: ListHeader<any>[] = [
    {
      column: 'user_data_ref_id',
      label: 'User',
      populateWith: 'full_name',
      displayed: false,
    },
    ...metricHeaders,
    {column: 'created_at', label: 'Creation Date', sortable: true, displayed: false},
  ];
  const stringIdentifier: AjfStringIdentifier[] | undefined = formSchema.schema.stringIdentifier;
  const identifierColumns = [];
  if (stringIdentifier != null) {
    for (let stringId of stringIdentifier) {
      identifierColumns.push(...stringId.value);
    }
  }
  const dataHeadersDisplayed = [...new Set(identifierColumns)];
  const dataHeaders: ListHeader<any>[] = formSchema.schema.nodes
    ?.map(slide =>
      slide.nodes.map(node => ({
        ...node,
        repeatingSlideColumn: slide.nodeType === AjfNodeType.AjfRepeatingSlide,
        slideName: slide.name,
      })),
    )
    .flat(1)
    .map(
      node =>
        ({
          column: node.name,
          label: node.label,
          dataColumn: true,
          repeatingSlideColumn: node.repeatingSlideColumn,
          repeatingSlideName: node.repeatingSlideColumn ? node.slideName : undefined,
          displayed: dataHeadersDisplayed.includes(node.name),
        } as ListHeader<any>),
    );

  return [
    {column: 'id', label: 'ID', sortable: true, displayed: false},
    ...dataHeaders,
    ...defaultHeaders,
  ].sort((a, b) => (a.label > b.label ? 1 : -1));
};
