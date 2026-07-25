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

/**
 * A minimal in-memory evaluator for the Mango-style selectors this app builds.
 *
 * It exists for online mode: conditions on keys inside a jsonb column (e.g.
 * `data.age`) cannot be expressed as Hasura comparisons, so they are evaluated
 * here instead. The semantics intentionally mirror RxDB/mingo so a filter
 * returns the same rows online and offline.
 *
 * Supported: `$eq $ne $gt $gte $lt $lte $in $nin $regex (+$options) $elemMatch
 * $exists`, the logical operators `$and $or $nor $not`, bare-value equality, and
 * dotted paths (`data.field`, `data.data.field__0`).
 */

/**
 * Reads a possibly dotted path out of a document.
 * @param doc The document.
 * @param path The field path (e.g. `data.age`).
 */
export function getPathValue(doc: any, path: string): any {
  if (doc == null) {
    return undefined;
  }
  if (!path.includes('.')) {
    return doc[path];
  }
  return path.split('.').reduce((acc, key) => (acc == null ? undefined : acc[key]), doc);
}

const compare = (left: any, right: any): number | undefined => {
  if (left == null || right == null) {
    return undefined;
  }
  // Dates and date-like strings compare correctly as strings only when equally
  // formatted, so fall back to numeric/temporal comparison where possible.
  if (left instanceof Date || right instanceof Date) {
    const l = new Date(left).getTime();
    const r = new Date(right).getTime();
    return isNaN(l) || isNaN(r) ? undefined : l - r;
  }
  if (typeof left === 'number' && typeof right === 'number') {
    return left - right;
  }
  const l = String(left);
  const r = String(right);
  return l === r ? 0 : l > r ? 1 : -1;
};

const looseEquals = (actual: any, expected: any): boolean => {
  if (actual === expected) {
    return true;
  }
  // Mango treats a missing value and null as equivalent.
  if (actual == null && expected == null) {
    return true;
  }
  if (actual == null || expected == null) {
    return false;
  }
  if (typeof actual !== typeof expected) {
    return String(actual) === String(expected);
  }
  return false;
};

const toRegExp = (pattern: any, options?: string): RegExp | null => {
  if (pattern instanceof RegExp) {
    return pattern;
  }
  try {
    return new RegExp(String(pattern), options ?? '');
  } catch {
    return null;
  }
};

/**
 * Evaluates the operator object of a single field against a document value.
 */
const matchesFieldOperators = (actual: any, ops: {[op: string]: any}): boolean =>
  Object.keys(ops).every(op => {
    const expected = ops[op];
    switch (op) {
      case '$eq':
        // On an array value, equality means "contains".
        return Array.isArray(actual) && !Array.isArray(expected)
          ? actual.some(item => looseEquals(item, expected))
          : looseEquals(actual, expected);
      case '$ne':
        return Array.isArray(actual) && !Array.isArray(expected)
          ? !actual.some(item => looseEquals(item, expected))
          : !looseEquals(actual, expected);
      case '$gt': {
        const result = compare(actual, expected);
        return result != null && result > 0;
      }
      case '$gte': {
        const result = compare(actual, expected);
        return result != null && result >= 0;
      }
      case '$lt': {
        const result = compare(actual, expected);
        return result != null && result < 0;
      }
      case '$lte': {
        const result = compare(actual, expected);
        return result != null && result <= 0;
      }
      case '$in': {
        const candidates: any[] = Array.isArray(expected) ? expected : [expected];
        return Array.isArray(actual)
          ? actual.some(item => candidates.some(candidate => looseEquals(item, candidate)))
          : candidates.some(candidate => looseEquals(actual, candidate));
      }
      case '$nin': {
        const candidates: any[] = Array.isArray(expected) ? expected : [expected];
        return Array.isArray(actual)
          ? !actual.some(item => candidates.some(candidate => looseEquals(item, candidate)))
          : !candidates.some(candidate => looseEquals(actual, candidate));
      }
      case '$regex': {
        const regExp = toRegExp(expected, ops['$options']);
        if (regExp == null) {
          return false;
        }
        const values = Array.isArray(actual) ? actual : [actual];
        return values.some(value => value != null && regExp.test(String(value)));
      }
      case '$options':
        // Consumed by $regex.
        return true;
      case '$exists':
        return expected ? actual !== undefined : actual === undefined;
      case '$elemMatch': {
        const items: any[] = Array.isArray(actual) ? actual : [];
        return items.some(item =>
          typeof expected === 'object' && expected != null
            ? matchesFieldOperators(item, expected)
            : looseEquals(item, expected),
        );
      }
      default:
        // Unknown operator: do not exclude the row.
        return true;
    }
  });

/**
 * Returns true when a document satisfies a Mango-style selector.
 * @param doc The document to test.
 * @param selector The Mango selector (may contain dotted paths).
 */
export function matchesSelector(doc: any, selector: {[key: string]: any} | undefined): boolean {
  if (selector == null) {
    return true;
  }
  return Object.keys(selector).every(key => {
    const value = selector[key];
    if (key === '$and') {
      const elements: any[] = Array.isArray(value) ? value : [value];
      return elements.every(element => matchesSelector(doc, element));
    }
    if (key === '$or') {
      const elements: any[] = Array.isArray(value) ? value : [value];
      // An empty $or is a no-op, matching the Hasura translation.
      return elements.length === 0 || elements.some(element => matchesSelector(doc, element));
    }
    if (key === '$nor') {
      const elements: any[] = Array.isArray(value) ? value : [value];
      return !elements.some(element => matchesSelector(doc, element));
    }
    if (key === '$not') {
      return !matchesSelector(doc, value);
    }
    const actual = getPathValue(doc, key);
    if (value != null && typeof value === 'object' && !Array.isArray(value)) {
      const hasOperators = Object.keys(value).some(op => op.startsWith('$'));
      if (hasOperators) {
        return matchesFieldOperators(actual, value);
      }
    }
    return matchesFieldOperators(actual, {$eq: value});
  });
}

/**
 * True when the selector (at any depth) references a dotted path, i.e. a key
 * inside a jsonb column that Hasura cannot filter on.
 * @param selector The Mango selector.
 */
export function hasDottedPath(selector: {[key: string]: any} | undefined): boolean {
  if (selector == null) {
    return false;
  }
  return Object.keys(selector).some(key => {
    const value = selector[key];
    if (key === '$and' || key === '$or' || key === '$nor') {
      const elements: any[] = Array.isArray(value) ? value : [value];
      return elements.some(element => hasDottedPath(element));
    }
    if (key === '$not') {
      return hasDottedPath(value);
    }
    return key.includes('.');
  });
}

/**
 * Splits a selector into the part Hasura can evaluate (real columns) and the
 * part that must be evaluated in memory (keys inside a jsonb column).
 *
 * `$and` is separable, so its elements are split individually. A `$or`/`$nor`/
 * `$not` group cannot be split — if it references any dotted path the whole
 * group is evaluated client-side.
 * @param selector The Mango selector.
 */
export function splitSelector(selector: {[key: string]: any} | undefined): {
  server: {[key: string]: any} | undefined;
  client: {[key: string]: any} | undefined;
} {
  if (selector == null) {
    return {server: undefined, client: undefined};
  }
  const server: {[key: string]: any} = {};
  const client: {[key: string]: any} = {};

  Object.keys(selector).forEach(key => {
    const value = selector[key];

    if (key === '$and') {
      const elements: any[] = Array.isArray(value) ? value : [value];
      const serverElements: any[] = [];
      const clientElements: any[] = [];
      elements.forEach(element => {
        const split = splitSelector(element);
        if (split.server != null) {
          serverElements.push(split.server);
        }
        if (split.client != null) {
          clientElements.push(split.client);
        }
      });
      if (serverElements.length > 0) {
        server['$and'] = serverElements;
      }
      if (clientElements.length > 0) {
        client['$and'] = clientElements;
      }
      return;
    }

    // Non-separable groups and dotted fields.
    if (key === '$or' || key === '$nor' || key === '$not' || key.includes('.')) {
      if (hasDottedPath({[key]: value})) {
        client[key] = value;
      } else {
        server[key] = value;
      }
      return;
    }

    server[key] = value;
  });

  return {
    server: Object.keys(server).length > 0 ? server : undefined,
    client: Object.keys(client).length > 0 ? client : undefined,
  };
}
