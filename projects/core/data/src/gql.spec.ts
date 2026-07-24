import {TypedDocumentNode} from 'apollo-angular';

import {DataFindRequest} from './data-find-request';
import {Model} from './model';
import {findQueryGql, getQueryGql, insertQueryGql, updateQueryGql} from './gql';

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
});
