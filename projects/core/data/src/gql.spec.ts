import {TypedDocumentNode} from 'apollo-angular';

import {DataFindRequest} from './data-find-request';
import {Model} from './model';
import {FieldTypeResolver, findQueryGql, getQueryGql, insertQueryGql, updateQueryGql} from './gql';

/** Returns the `where` variable produced for a selector. */
const whereFor = (selector: any, resolveField?: FieldTypeResolver): any =>
  findQueryGql(name, fields, {collectionName, query: {selector}} as DataFindRequest<any>, resolveField)
    .variables['where'];

const getGqlString = (query: TypedDocumentNode<any, any>): string => {
  return query.loc ? query.loc.source.body : '';
};

interface Foo extends Model {
  bar: string;
  baz: string;
}

const name = 'foo';
const collectionName = name;
const fields = ['bar', 'baz'];

describe('getQueryGql', () => {
  it('should create a get query with the id passed as a variable', () => {
    const expected = `query GetFoo($where: foo_bool_exp!) { foo(where: $where) { bar, baz } }`;
    const {query, queryName, variables} = getQueryGql(name, fields, 'test_id');
    const queryStr = getGqlString(query);
    expect(queryName).toBe('foo');
    expect(queryStr).toBe(expected);
    expect(variables).toEqual({where: {id: {_eq: 'test_id'}}});
  });
});

describe('findQueryGql', () => {
  it('should create a find query with dynamic values passed as variables', () => {
    const expected =
      `query FindFoo($limit: Int, $offset: Int, $order_by: [foo_order_by!], $where: foo_bool_exp)` +
      ` { foo(limit: $limit, offset: $offset, order_by: $order_by, where: $where) { bar, baz } }`;
    const request: DataFindRequest<Foo> = {
      collectionName,
      query: {selector: {bar: 'test_bar'}, limit: 10, skip: 2, sort: [{baz: 'desc'}]},
    };
    const {query, queryName, variables} = findQueryGql(name, fields, request);
    const queryStr = getGqlString(query);
    expect(queryName).toBe('foo');
    expect(queryStr).toBe(expected);
    expect(variables).toEqual({
      limit: 10,
      offset: 2,
      order_by: [{baz: 'desc'}],
      where: {bar: {_eq: 'test_bar'}},
    });
  });

  it('should create a find query with no arguments when the request is empty', () => {
    const expected = `query FindFoo { foo { bar, baz } }`;
    const request: DataFindRequest<Foo> = {collectionName};
    const {query, variables} = findQueryGql(name, fields, request);
    expect(getGqlString(query)).toBe(expected);
    expect(variables).toEqual({});
  });
});

describe('insertQueryGql', () => {
  it('should create an insert query', () => {
    const expected = `mutation InsertFoo($objects: [foo_insert_input!]!) { insert_foo(objects: $objects) { affected_rows, returning { bar, baz } } }`;
    const {mutation, mutationName} = insertQueryGql<Foo>(name, fields);
    const mutationStr = getGqlString(mutation);
    expect(mutationName).toBe('insert_foo');
    expect(mutationStr).toBe(expected);
  });
});

describe('updateQueryGql', () => {
  it('should create an update query with the selector passed as a variable', () => {
    const expected = `mutation UpdateFoo($where: foo_bool_exp!, $_set: foo_set_input!) { update_foo(where: $where, _set: $_set) { affected_rows, returning { bar, baz } } }`;
    const request: DataFindRequest<Foo> = {
      collectionName,
      query: {selector: {id: 'test_id'}},
    };
    const {mutation, mutationName, variables} = updateQueryGql<Foo>(name, fields, request);
    const mutationStr = getGqlString(mutation);
    expect(mutationName).toBe('update_foo');
    expect(mutationStr).toBe(expected);
    expect(variables).toEqual({where: {id: {_eq: 'test_id'}}});
  });

  it('should match nothing rather than everything when the selector cannot be translated', () => {
    // A `where: {}` on an update would match every row.
    const request: DataFindRequest<Foo> = {collectionName, query: {selector: {}}};
    const {variables} = updateQueryGql<Foo>(name, fields, request);
    expect(variables).toEqual({where: {id: {_in: []}}});
  });
});

describe('buildWhere (via findQueryGql) — real filter shapes', () => {
  const arrayField: FieldTypeResolver = field =>
    field === 'user_group_ids' ? {isArray: true} : {isArray: false};

  it('should drop the "all" sentinel from a scalar reference filter', () => {
    // list-datasource appends 'all' to every metric id list; against a uuid
    // column Hasura rejects it with "invalid input syntax for type uuid".
    const where = whereFor({location_ref_id: {$in: ['3d73d201-0963-46cb-9dab-aa173ac4a52f', 'all']}});
    expect(where).toEqual({location_ref_id: {_in: ['3d73d201-0963-46cb-9dab-aa173ac4a52f']}});
  });

  it('should keep "all" for an array reference column', () => {
    const resolve: FieldTypeResolver = () => ({isArray: true});
    const where = whereFor({area_ref_id: {$in: ['area-7', 'all']}}, resolve);
    expect(where).toEqual({
      _and: [{_or: [{area_ref_id: {_contains: 'area-7'}}, {area_ref_id: {_contains: 'all'}}]}],
    });
  });

  it('should match nothing when every candidate was a sentinel', () => {
    const where = whereFor({case_ref_id: {$in: ['all']}});
    expect(where).toEqual({case_ref_id: {_in: []}});
  });

  it('should translate $ne so NULL rows still match (offline parity)', () => {
    const where = whereFor({is_deleted: {$ne: true}});
    expect(where).toEqual({
      _and: [{_or: [{is_deleted: {_neq: true}}, {is_deleted: {_is_null: true}}]}],
    });
  });

  it('should translate $regex to a case-insensitive _ilike and drop $options', () => {
    const where = whereFor({full_name: {$regex: 'rossi', $options: 'i'}});
    expect(where).toEqual({full_name: {_ilike: '%rossi%'}});
  });

  it('should escape LIKE metacharacters in $regex values', () => {
    const where = whereFor({full_name: {$regex: '50%_x'}});
    expect(where).toEqual({full_name: {_ilike: '%50\\%\\_x%'}});
  });

  it('should translate a keyword $or over columns', () => {
    const where = whereFor({
      $or: [{full_name: {$regex: 'kw', $options: 'i'}}, {user_data_ref_id: {$eq: 'kw'}}],
      form_schema_ref_id: {$eq: 'fs-abc'},
    });
    expect(where).toEqual({
      _or: [{full_name: {_ilike: '%kw%'}}, {user_data_ref_id: {_eq: 'kw'}}],
      form_schema_ref_id: {_eq: 'fs-abc'},
    });
  });

  it('should translate nested $and of $or groups', () => {
    const where = whereFor({
      $and: [{$or: [{a: {$eq: 1}}]}, {$or: [{b: {$eq: 2}}]}],
    });
    expect(where).toEqual({
      _and: [{_or: [{a: {_eq: 1}}]}, {_or: [{b: {_eq: 2}}]}],
    });
  });

  it('should drop empty logical arrays (an empty _or means TRUE in Hasura)', () => {
    expect(whereFor({$or: [], id: {$eq: 'x'}})).toEqual({id: {_eq: 'x'}});
  });

  it('should expand the "Empty" operator so NULL and empty string both match', () => {
    const where = whereFor({notes: {$in: [null, '']}});
    expect(where).toEqual({
      _and: [{_or: [{notes: {_is_null: true}}, {notes: {_eq: ''}}]}],
    });
  });

  it('should negate the "Not empty" operator', () => {
    const where = whereFor({notes: {$nin: [null, '']}});
    expect(where).toEqual({
      _and: [{_not: {_or: [{notes: {_is_null: true}}, {notes: {_eq: ''}}]}}],
    });
  });

  it('should translate $elemMatch to containment', () => {
    const where = whereFor({recipients: {$elemMatch: {$eq: 'user-1'}}});
    expect(where).toEqual({recipients: {_contains: 'user-1'}});
  });

  it('should use containment for a bare value on an array column', () => {
    const where = whereFor({user_group_ids: 'grp-1'}, arrayField);
    expect(where).toEqual({user_group_ids: {_contains: 'grp-1'}});
  });

  it('should drop unknown operators instead of emitting invalid Hasura fields', () => {
    expect(whereFor({a: {$mod: [2, 0]}, b: {$eq: 1}})).toEqual({b: {_eq: 1}});
  });

  it('should drop dotted jsonb paths (they are filtered client-side)', () => {
    const where = whereFor({'data.age': {$gte: 18}, id: {$eq: 'x'}});
    expect(where).toEqual({id: {_eq: 'x'}});
  });

  it('should merge range operators on the same field', () => {
    const where = whereFor({created_at: {$gte: '2026-01-01', $lte: '2026-07-25'}});
    expect(where).toEqual({created_at: {_gte: '2026-01-01', _lte: '2026-07-25'}});
  });
});

describe('buildOrderBy (via findQueryGql)', () => {
  const orderFor = (sort: any): any =>
    findQueryGql(name, fields, {collectionName, query: {selector: {}, sort}} as DataFindRequest<any>)
      .variables['order_by'];

  it('should drop entries with an empty direction', () => {
    expect(orderFor([{created_at: ''}])).toBeUndefined();
  });

  it('should split multi-key sort objects into separate entries', () => {
    expect(orderFor([{created_at: 'desc', updated_at: 'desc'}])).toEqual([
      {created_at: 'desc'},
      {updated_at: 'desc'},
    ]);
  });

  it('should drop dotted sort paths', () => {
    expect(orderFor([{'data.age': 'asc'}, {created_at: 'desc'}])).toEqual([{created_at: 'desc'}]);
  });
});
