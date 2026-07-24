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
import {MangoQuerySelector} from 'rxdb';

interface GqlQueryGen {
  queryName: string;
  query: string;
  variables: Record<string, any>;
}

interface GqlMutationGen {
  mutationName: string;
  mutation: string;
  variables: Record<string, any>;
}

export interface GqlQuery<T, V = {}> {
  query: TypedDocumentNode<T, V>;
  queryName: string;
  variables: Record<string, any>;
}

export interface GqlMutation<T, V = {}> {
  mutation: TypedDocumentNode<T, V>;
  mutationName: string;
  variables: Record<string, any>;
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

/**
 * Maps Mango-style query operators to their Hasura `*_comparison_exp`
 * equivalents. Operators not listed fall back to `_<op>` (e.g. `$in` -> `_in`),
 * which already matches Hasura's naming.
 */
const MANGO_TO_HASURA_OP: {[mangoOp: string]: string} = {
  $eq: '_eq',
  $ne: '_neq',
  $gt: '_gt',
  $gte: '_gte',
  $lt: '_lt',
  $lte: '_lte',
  $in: '_in',
  $nin: '_nin',
};

const toHasuraOp = (op: string): string => MANGO_TO_HASURA_OP[op] ?? `_${op.slice(1)}`;

/**
 * Builds a Hasura `where` object (a `<name>_bool_exp` value) from a Mango-style
 * selector. Values are returned as data (to be passed as GraphQL variables),
 * never interpolated into the query string.
 */
const buildWhere = <T extends Model = Model>(
  selector?: MangoQuerySelector<T>,
): Record<string, any> | undefined => {
  if (selector == null) {
    return undefined;
  }
  const where: Record<string, any> = {};
  Object.keys(selector).forEach(key => {
    const selectorKey = key as keyof MangoQuerySelector<T>;
    const value = selector[selectorKey] as any;
    if (value != null && typeof value === 'object' && !Array.isArray(value)) {
      const fieldWhere: Record<string, any> = {};
      Object.keys(value).forEach(op => {
        if (op.startsWith('$')) {
          fieldWhere[toHasuraOp(op)] = value[op];
        }
      });
      if (Object.keys(fieldWhere).length > 0) {
        where[key] = fieldWhere;
      }
    } else {
      where[key] = {_eq: value};
    }
  });
  return Object.keys(where).length > 0 ? where : undefined;
};

/**
 * Builds the variable declarations, field arguments and variable values for a
 * find query from a DataFindRequest. All dynamic values are passed as GraphQL
 * variables (never interpolated into the query string).
 */
const buildFindArgs = <T extends Model = Model>(
  name: string,
  request: DataFindRequest<T>,
): {decls: string[]; args: string[]; variables: Record<string, any>} => {
  const decls: string[] = [];
  const args: string[] = [];
  const variables: Record<string, any> = {};
  const query = request.query;
  if (query != null) {
    if (query.limit != null) {
      decls.push('$limit: Int');
      args.push('limit: $limit');
      variables['limit'] = query.limit;
    }
    if (query.skip != null) {
      decls.push('$offset: Int');
      args.push('offset: $offset');
      variables['offset'] = query.skip;
    }
    if (query.sort != null && query.sort.length > 0) {
      decls.push(`$order_by: [${name}_order_by!]`);
      args.push('order_by: $order_by');
      variables['order_by'] = query.sort;
    }
    const where = buildWhere<T>(query.selector);
    if (where != null) {
      decls.push(`$where: ${name}_bool_exp`);
      args.push('where: $where');
      variables['where'] = where;
    }
  }
  return {decls, args, variables};
};

const wrapDecls = (decls: string[]): string => (decls.length > 0 ? `(${decls.join(', ')})` : '');
const wrapArgs = (args: string[]): string => (args.length > 0 ? `(${args.join(', ')})` : '');

const getQuery = <R extends Model = Model>(
  name: string,
  fields: string[],
  id: R['id'],
): GqlQueryGen => {
  const queryName = name;
  const query = `query Get${pascalCase(
    name,
  )}($where: ${name}_bool_exp!) { ${queryName}(where: $where) { ${fields.join(', ')} } }`;
  return {queryName, query, variables: {where: {id: {_eq: id}}}};
};

const findQuery = <T extends Model = Model>(
  name: string,
  fields: string[],
  request: DataFindRequest<T>,
): GqlQueryGen => {
  const {decls, args, variables} = buildFindArgs(name, request);
  const queryName = name;
  const query = `query Find${pascalCase(name)}${wrapDecls(decls)} { ${queryName}${wrapArgs(
    args,
  )} { ${fields.join(', ')} } }`;
  return {queryName, query, variables};
};

const mutationReturn = (fields: string[]): string =>
  `affected_rows, returning { ${fields.join(', ')} }`;

const insertQuery = (name: string, fields: string[]): GqlMutationGen => {
  const fName = `Insert${pascalCase(name)}`;
  const mutationName = `insert_${name}`;
  const ret = mutationReturn(fields);
  const mutation = `mutation ${fName}($objects: [${name}_insert_input!]!) { ${mutationName}(objects: $objects) { ${ret} } }`;
  return {mutationName, mutation, variables: {}};
};

const updateQuery = <T extends Model = Model>(
  name: string,
  fields: string[],
  request: DataFindRequest<T>,
): GqlMutationGen => {
  const where = buildWhere<T>(request.query?.selector);
  const fName = `Update${pascalCase(name)}`;
  const mutationName = `update_${name}`;
  const ret = mutationReturn(fields);
  const mutation = `mutation ${fName}($where: ${name}_bool_exp!, $_set: ${name}_set_input!) { ${mutationName}(where: $where, _set: $_set) { ${ret} } }`;
  return {mutationName, mutation, variables: {where: where ?? {}}};
};

export const getQueryGql = <T extends Model = Model, V = {}>(
  name: string,
  fields: string[],
  id: T['id'],
): GqlQuery<OnlineGetResult<T>, V> => {
  const {query, queryName, variables} = getQuery(name, fields, id);
  return {
    queryName,
    query: gql<OnlineGetResult<T>, V>(query),
    variables,
  };
};

export const findQueryGql = <T extends Model = Model, V = {}>(
  name: string,
  fields: string[],
  request: DataFindRequest<T>,
): GqlQuery<OnlineGetResult<T>, V> => {
  const {query, queryName, variables} = findQuery(name, fields, request);
  return {
    queryName,
    query: gql<OnlineGetResult<T>, V>(query),
    variables,
  };
};

export const insertQueryGql = <T extends Model = Model, V = {}>(
  name: string,
  fields: string[],
): GqlMutation<OnlineUpdateResult<T>, V & {objects: InsertModel<T>[]}> => {
  const {mutation, mutationName, variables} = insertQuery(name, fields);
  return {
    mutationName,
    mutation: gql<OnlineUpdateResult<T>, V & {objects: InsertModel<T>[]}>(mutation),
    variables,
  };
};

export const updateQueryGql = <T extends Model = Model, V = {}>(
  name: string,
  fields: string[],
  request: DataFindRequest<T>,
): GqlMutation<OnlineUpdateResult<T>, V & {_set: Partial<T>}> => {
  const {mutation, mutationName, variables} = updateQuery(name, fields, request);
  return {
    mutationName,
    mutation: gql<OnlineUpdateResult<T>, V & {_set: Partial<T>}>(mutation),
    variables,
  };
};

/**
 * Builds a minimal Hasura "table changed" subscription string for a collection,
 * mirroring the offline `subscriptionQueryBuilder`. It selects only `updated_at`;
 * consumers use each emission purely as a signal to re-query.
 * @param name The collection name.
 */
export const subscriptionQueryGql = (name: string): string =>
  `subscription on${pascalCase(name)}Changed { ${name} { updated_at } }`;
