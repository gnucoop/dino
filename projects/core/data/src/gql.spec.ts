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
  it('should create a get query', () => {
    const expected = `query GetFoo { foo(where: {id: {_eq: "test_id"}}) { bar, baz } }`;
    const {query, queryName} = getQueryGql(name, fields, 'test_id');
    const queryStr = getGqlString(query);
    expect(queryName).toBe('foo');
    expect(queryStr).toBe(expected);
  });
});

describe('findQueryGql', () => {
  it('should create a find query', () => {
    const expected = `query FindFoo { foo(limit: 10, offset: 2, order_by: {key: desc}, where: {bar: {_eq: "test_bar"}}) { bar, baz } }`;
    const request: DataFindRequest<Foo> = {
      collectionName,
      query: {selector: {bar: 'test_bar'}, limit: 10, skip: 2, sort: [{baz: 'desc'}]},
    };
    const {query, queryName} = findQueryGql(name, fields, request);
    const queryStr = getGqlString(query);
    expect(queryName).toBe('foo');
    expect(queryStr).toBe(expected);
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
  it('should create an update query', () => {
    const expected = `mutation UpdateFoo($_set: foo_set_input!) { update_foo(where: {id: {_eq: "test_id"}}, _set: $_set) { affected_rows, returning { bar, baz } } }`;
    const request: DataFindRequest<Foo> = {
      collectionName,
      query: {selector: {id: 'test_id'}},
    };
    const {mutation, mutationName} = updateQueryGql<Foo>(name, fields, request);
    const mutationStr = getGqlString(mutation);
    expect(mutationName).toBe('update_foo');
    expect(mutationStr).toBe(expected);
  });
});
