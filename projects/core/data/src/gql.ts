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
 * Describes a collection field, so the translator can pick the right Hasura
 * shape (e.g. containment instead of equality for array columns).
 */
export interface FieldTypeInfo {
  /** True when the column holds an array (jsonb array in Hasura). */
  isArray: boolean;
}

/**
 * Resolves type information for a field of the collection being queried.
 * Returns undefined when the field is unknown.
 */
export type FieldTypeResolver = (field: string) => FieldTypeInfo | undefined;

/**
 * The app-level "any value" sentinel. `list-datasource` appends it to every
 * metric id list. Offline (RxDB) it simply never matches a scalar id; against
 * Postgres it is an invalid uuid literal and makes the whole query fail, so it
 * must be removed from scalar reference filters.
 */
const ALL_SENTINEL = 'all';

/** Simple Mango -> Hasura operator mapping for direct comparisons. */
const MANGO_TO_HASURA_OP: {[mangoOp: string]: string} = {
  $eq: '_eq',
  $gt: '_gt',
  $gte: '_gte',
  $lt: '_lt',
  $lte: '_lte',
};

/** Escapes LIKE metacharacters so user input is matched literally. */
const escapeLike = (value: string): string => value.replace(/[\\%_]/g, ch => `\\${ch}`);

const isNullish = (value: any): boolean => value == null || value === '';

/**
 * Removes the `'all'` sentinel from a scalar reference filter. Array columns
 * keep it, because there a stored `'all'` is a real, meaningful value
 * (e.g. `user_group.area_ref_id: ['all']`).
 */
const stripSentinel = (field: string, values: any[], info?: FieldTypeInfo): any[] =>
  !info?.isArray && field.endsWith('_ref_id')
    ? values.filter(value => value !== ALL_SENTINEL)
    : values;

/**
 * Translates the operators of a single field into Hasura shapes.
 *
 * Straightforward comparisons are returned in `comparison` (to be attached as
 * `{field: comparison}`). Operators that cannot be expressed as a single
 * comparison (NULL-inclusive inequality, containment over several values) are
 * returned in `lifted` as complete bool_exps to be ANDed at the parent level.
 */
const buildFieldConditions = (
  field: string,
  ops: {[op: string]: any},
  resolveField?: FieldTypeResolver,
): {comparison: Record<string, any>; lifted: Record<string, any>[]} => {
  const info = resolveField?.(field);
  const comparison: Record<string, any> = {};
  const lifted: Record<string, any>[] = [];

  Object.keys(ops).forEach(op => {
    const value = ops[op];
    switch (op) {
      case '$eq':
      case '$gt':
      case '$gte':
      case '$lt':
      case '$lte':
        // Equality on an array column means "contains".
        if (op === '$eq' && info?.isArray) {
          comparison['_contains'] = value;
        } else {
          comparison[MANGO_TO_HASURA_OP[op]] = value;
        }
        break;
      case '$ne':
        // Postgres evaluates `col <> v` as NULL (excluded) when col IS NULL,
        // while RxDB treats a missing value as "not equal". Include NULLs to
        // keep both modes consistent.
        lifted.push({_or: [{[field]: {_neq: value}}, {[field]: {_is_null: true}}]});
        break;
      case '$in':
      case '$nin': {
        const negated = op === '$nin';
        const values = Array.isArray(value) ? value : [value];
        const concrete = stripSentinel(field, values, info).filter(v => !isNullish(v));
        const matchesNull = values.some(v => v == null);
        const matchesEmpty = values.some(v => v === '');
        const branches: Record<string, any>[] = [];
        if (concrete.length > 0) {
          if (info?.isArray) {
            // Overlap on an array column: any of the values contained.
            concrete.forEach(v => branches.push({[field]: {_contains: v}}));
          } else {
            branches.push({[field]: {_in: concrete}});
          }
        }
        if (matchesNull) {
          branches.push({[field]: {_is_null: true}});
        }
        if (matchesEmpty) {
          branches.push({[field]: {_eq: ''}});
        }
        if (branches.length === 0) {
          // Every candidate was a sentinel: match nothing, as offline would.
          comparison['_in'] = [];
        } else if (negated) {
          lifted.push({_not: {_or: branches}});
        } else if (branches.length === 1) {
          // Single branch: inline it instead of wrapping in a redundant _or.
          Object.assign(comparison, branches[0][field]);
        } else {
          lifted.push({_or: branches});
        }
        break;
      }
      case '$elemMatch': {
        // Arrays: `{$elemMatch: {$eq: v}}` means "contains v".
        const inner = value ?? {};
        if ('$eq' in inner) {
          comparison['_contains'] = inner['$eq'];
        } else if ('$in' in inner) {
          const values: any[] = Array.isArray(inner['$in']) ? inner['$in'] : [inner['$in']];
          values.forEach(v => lifted.push({[field]: {_contains: v}}));
        }
        break;
      }
      case '$exists':
        comparison['_is_null'] = !value;
        break;
      case '$regex':
        // Substring, case-insensitive — matching the "Includes" intent. The
        // sibling `$options` is consumed here and never emitted.
        comparison['_ilike'] = `%${escapeLike(String(value))}%`;
        break;
      case '$options':
        break;
      default:
        // Unknown operators are dropped: emitting `_<op>` would produce a
        // Hasura validation error and fail the whole query.
        break;
    }
  });

  return {comparison, lifted};
};

/**
 * Builds a Hasura `where` object (a `<name>_bool_exp` value) from a Mango-style
 * selector. Values are returned as data (to be passed as GraphQL variables),
 * never interpolated into the query string.
 *
 * Handles logical operators recursively and drops conditions that cannot be
 * expressed as Hasura columns (e.g. dotted jsonb paths, which are evaluated
 * client-side by the online data service).
 * @param selector The Mango selector.
 * @param resolveField Optional field type lookup, used for array columns and
 * sentinel stripping.
 */
const buildWhere = <T extends Model = Model>(
  selector?: MangoQuerySelector<T>,
  resolveField?: FieldTypeResolver,
): Record<string, any> | undefined => {
  if (selector == null) {
    return undefined;
  }
  const where: Record<string, any> = {};
  const conjunction: Record<string, any>[] = [];

  Object.keys(selector).forEach(key => {
    const value = (selector as {[key: string]: any})[key];

    // Logical operators.
    if (key === '$and' || key === '$or' || key === '$nor') {
      const elements = (Array.isArray(value) ? value : [value])
        .map(element => buildWhere(element, resolveField))
        .filter((element): element is Record<string, any> => element != null);
      // An empty `_and`/`_or` means TRUE in Hasura, so drop it entirely.
      if (elements.length === 0) {
        return;
      }
      if (key === '$and') {
        conjunction.push(...elements);
      } else if (key === '$or') {
        where['_or'] = elements;
      } else {
        where['_not'] = {_or: elements};
      }
      return;
    }
    if (key === '$not') {
      const negated = buildWhere(value, resolveField);
      if (negated != null) {
        where['_not'] = negated;
      }
      return;
    }

    // Dotted paths address keys inside a jsonb column and are not valid Hasura
    // fields; the online data service filters those client-side.
    if (key.includes('.')) {
      return;
    }

    if (value != null && typeof value === 'object' && !Array.isArray(value)) {
      const hasOperators = Object.keys(value).some(op => op.startsWith('$'));
      if (hasOperators) {
        const {comparison, lifted} = buildFieldConditions(key, value, resolveField);
        if (Object.keys(comparison).length > 0) {
          where[key] = {...(where[key] ?? {}), ...comparison};
        }
        conjunction.push(...lifted);
        return;
      }
      // A nested object without operators: treat as containment on jsonb.
      where[key] = {...(where[key] ?? {}), _contains: value};
      return;
    }

    // Bare value: implicit equality (containment for array columns).
    const info = resolveField?.(key);
    where[key] = {
      ...(where[key] ?? {}),
      ...(info?.isArray ? {_contains: value} : {_eq: value}),
    };
  });

  if (conjunction.length > 0) {
    where['_and'] = [...((where['_and'] as Record<string, any>[]) ?? []), ...conjunction];
  }

  return Object.keys(where).length > 0 ? where : undefined;
};

/**
 * Normalizes a Mango `sort` into a Hasura `order_by` list: drops empty
 * directions (Material emits `''` when sorting is cleared) and dotted jsonb
 * paths, and splits multi-key entries so ordering is deterministic.
 */
const buildOrderBy = (sort?: {[key: string]: any}[]): Record<string, string>[] | undefined => {
  if (sort == null) {
    return undefined;
  }
  const orderBy: Record<string, string>[] = [];
  sort.forEach(entry => {
    Object.keys(entry ?? {}).forEach(key => {
      const direction = entry[key];
      if ((direction !== 'asc' && direction !== 'desc') || key.includes('.')) {
        return;
      }
      orderBy.push({[key]: direction});
    });
  });
  return orderBy.length > 0 ? orderBy : undefined;
};

/**
 * Builds the variable declarations, field arguments and variable values for a
 * find query from a DataFindRequest. All dynamic values are passed as GraphQL
 * variables (never interpolated into the query string).
 */
const buildFindArgs = <T extends Model = Model>(
  name: string,
  request: DataFindRequest<T>,
  resolveField?: FieldTypeResolver,
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
    const orderBy = buildOrderBy(query.sort as {[key: string]: any}[] | undefined);
    if (orderBy != null) {
      decls.push(`$order_by: [${name}_order_by!]`);
      args.push('order_by: $order_by');
      variables['order_by'] = orderBy;
    }
    const where = buildWhere<T>(query.selector, resolveField);
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
  resolveField?: FieldTypeResolver,
): GqlQueryGen => {
  const {decls, args, variables} = buildFindArgs(name, request, resolveField);
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
  resolveField?: FieldTypeResolver,
): GqlMutationGen => {
  const where = buildWhere<T>(request.query?.selector, resolveField);
  const fName = `Update${pascalCase(name)}`;
  const mutationName = `update_${name}`;
  const ret = mutationReturn(fields);
  const mutation = `mutation ${fName}($where: ${name}_bool_exp!, $_set: ${name}_set_input!) { ${mutationName}(where: $where, _set: $_set) { ${ret} } }`;
  // Never fall back to `{}`: for an update that would match every row. If the
  // selector could not be translated, match nothing instead.
  return {mutationName, mutation, variables: {where: where ?? {id: {_in: []}}}};
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
  resolveField?: FieldTypeResolver,
): GqlQuery<OnlineGetResult<T>, V> => {
  const {query, queryName, variables} = findQuery(name, fields, request, resolveField);
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
  resolveField?: FieldTypeResolver,
): GqlMutation<OnlineUpdateResult<T>, V & {_set: Partial<T>}> => {
  const {mutation, mutationName, variables} = updateQuery(name, fields, request, resolveField);
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
