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

import {TypedDocumentNode} from '@apollo/client/core';
import {gql} from 'apollo-angular';

import {DataFindRequest} from './data-find-request';
import {InsertModel} from './insert-model';
import {Model} from './model';

interface GqlQueryGen {
  queryName: string;
  query: string;
}

interface GqlMutationGen {
  mutationName: string;
  mutation: string;
}

export interface GqlQuery<T, V = {}> {
  query: TypedDocumentNode<T, V>;
  queryName: string;
}

export interface GqlMutation<T, V = {}> {
  mutation: TypedDocumentNode<T, V>;
  mutationName: string;
}

export interface OnlineUpdateResult<T extends Model = Model> {
  [prop: string]: {affected_rows: number; returning: T[]};
}

export interface OnlineGetResult<T extends Model = Model> {
  [prop: string]: T[];
}

const pascalCase = (str: string): string =>
  str
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w*)/, 'g'),
      (_, g1, g2) => `${g1.toUpperCase() + g2.toLowerCase()}`,
    )
    .replace(new RegExp(/\w/), s => s.toUpperCase());

const getQuery = <R extends Model = Model>(
  name: string,
  fields: string[],
  id: R['id'],
): GqlQueryGen => {
  const queryName = name;
  const query = `query Get${pascalCase(
    name,
  )} { ${queryName}(where: {id: {_eq: "${id}"}}) { ${fields.join(', ')} } }`;
  return {queryName, query};
};

const dataFindRequestToFnParams = <T extends Model = Model>(
  request: DataFindRequest<T>,
  other: string[] = [],
): string => {
  const {query} = request;
  if (query == null) {
    return '';
  }
  let params = [];
  if (query.limit != null) {
    params.push(`limit: ${query.limit}`);
  }
  if (query.skip != null) {
    params.push(`offset: ${query.skip}`);
  }
  if (query.sort != null && query.sort.length > 0) {
    const sorts = [] as string[];
    query.sort.forEach(sort => {
      Object.keys(sort).forEach(key => {
        sorts.push(`key: ${sort[key]}`);
      });
    });
    params.push(`order_by: {${sorts.join(', ')}}`);
  }
  const where = [] as string[];
  Object.keys(query.selector).forEach(key => {
    const selector = query.selector[key];
    if (typeof selector === 'object') {
      const fieldWhere = [] as string[];
      Object.keys(selector).forEach(op => {
        if (op.startsWith('$')) {
          fieldWhere.push(`_${op.slice(1)}: ${JSON.stringify(selector[op])}`);
        }
      });
      if (fieldWhere.length > 0) {
        where.push(`${key}: {${fieldWhere.join(', ')}}`);
      }
    } else {
      where.push(`${key}: {_eq: ${JSON.stringify(selector)}}`);
    }
  });
  if (where.length > 0) {
    params.push(`where: {${where.join(', ')}}`);
  }
  params = [...params, ...other];
  if (params.length === 0) {
    return '';
  }
  return `(${params.join(', ')})`;
};

const findQuery = <T extends Model = Model>(
  name: string,
  fields: string[],
  request: DataFindRequest<T>,
): GqlQueryGen => {
  const params = dataFindRequestToFnParams(request);
  const queryName = name;
  const query = `query Find${pascalCase(name)} { ${queryName}${params} { ${fields.join(', ')} } }`;
  return {queryName, query};
};

const mutationReturn = (fields: string[]): string =>
  `affected_rows, returning { ${fields.join(', ')} }`;

const insertQuery = (name: string, fields: string[]): GqlMutationGen => {
  const fName = `Insert${pascalCase(name)}`;
  const mutationName = `insert_${name}`;
  const ret = mutationReturn(fields);
  const mutation = `mutation ${fName}($objects: [${name}_insert_input!]!) { ${mutationName}(objects: $objects) { ${ret} } }`;
  return {mutationName, mutation};
};

const updateQuery = <T extends Model = Model>(
  name: string,
  fields: string[],
  request: DataFindRequest<T>,
): GqlMutationGen => {
  const params = dataFindRequestToFnParams(request, ['_set: $_set']);
  const fName = `Update${pascalCase(name)}`;
  const mutationName = `update_${name}`;
  const ret = mutationReturn(fields);
  const mutation = `mutation ${fName}($_set: ${name}_set_input!) { ${mutationName}${params} { ${ret} } }`;
  console.log(mutation);
  return {mutationName, mutation};
};

export const getQueryGql = <T extends Model = Model, V = {}>(
  name: string,
  fields: string[],
  id: T['id'],
): GqlQuery<OnlineGetResult<T>, V> => {
  const {query, queryName} = getQuery(name, fields, id);
  return {
    queryName,
    query: gql<OnlineGetResult<T>, V>(query),
  };
};

export const findQueryGql = <T extends Model = Model, V = {}>(
  name: string,
  fields: string[],
  request: DataFindRequest<T>,
): GqlQuery<OnlineGetResult<T>, V> => {
  const {query, queryName} = findQuery(name, fields, request);
  return {
    queryName,
    query: gql<OnlineGetResult<T>, V>(query),
  };
};

export const insertQueryGql = <T extends Model = Model, V = {}>(
  name: string,
  fields: string[],
): GqlMutation<OnlineUpdateResult<T>, V & {objects: InsertModel<T>[]}> => {
  const {mutation, mutationName} = insertQuery(name, fields);
  return {
    mutationName,
    mutation: gql<OnlineUpdateResult<T>, V & {objects: InsertModel<T>[]}>(mutation),
  };
};

export const updateQueryGql = <T extends Model = Model, V = {}>(
  name: string,
  fields: string[],
  request: DataFindRequest<T>,
): GqlMutation<OnlineUpdateResult<T>, V & {_set: Partial<T>}> => {
  const {mutation, mutationName} = updateQuery(name, fields, request);
  return {mutationName, mutation: gql<OnlineUpdateResult<T>, V & {_set: Partial<T>}>(mutation)};
};
