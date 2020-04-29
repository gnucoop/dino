import {RxCollection, RxJsonSchema} from 'rxdb';

import {DataServiceSyncOptions} from './data-service-config';
import {Model} from './model';
import {
  pullQueryBuilder,
  pushQueryBuilder,
  subscriptionQueryBuilder,
  syncOrderedCollections,
} from './sync-utils';

const schemas = [
  {
    title: 'model1',
    version: 0,
    type: 'object',
    properties: {
      id: {type: 'string', primary: true},
      model3Id: {type: 'string', ref: 'model3'},
    },
  },
  {
    title: 'model2',
    version: 0,
    type: 'object',
    properties: {
      id: {type: 'string', primary: true},
      model1Id: {type: 'string', ref: 'model1'},
      foo: {type: 'object', bar: {type: 'string'}, model3Id: {type: 'string', ref: 'model3'}}
    },
  },
  {
    title: 'model3',
    version: 0,
    type: 'object',
    properties: {
      id: {type: 'string', primary: true},
    },
  },
] as RxJsonSchema[];

const collections = schemas.map(
    schema => ({name: schema.title, schema: {jsonID: schema}} as unknown as RxCollection));

const syncOptions: DataServiceSyncOptions = {
  url: 'host',
  batchSize: 10,
};

describe('syncOrderedCollections', () => {
  it('should sort collections for sync purposes', () => {
    const sorted = syncOrderedCollections(collections);
    expect(sorted.length).toBe(collections.length);
    expect(sorted[0].schema.jsonID.title).toBe('model3');
    expect(sorted[1].schema.jsonID.title).toBe('model1');
    expect(sorted[2].schema.jsonID.title).toBe('model2');
  });
});

describe('pullQueryBuilder', () => {
  it('should create a pull sync query for a given collection', () => {
    const collection = collections[0];
    const timestamp = new Date().toISOString();
    let pullQuery = `{ model1( ` +
        `where: {"updated_at":{"_gt":"${timestamp}"}}, ` +
        `limit: ${syncOptions.batchSize}, ` +
        `order_by: [{updated_at: asc}] ` +
        `) { id model3Id } }`;
    const doc: Model = {id: 'foo', created_at: timestamp, updated_at: timestamp};

    let queryBuilder = pullQueryBuilder(collection, syncOptions);
    let query = queryBuilder(doc);
    let queryStr = query.query.replace(/[\s]+/g, ' ');
    expect(queryStr).toEqual(pullQuery);

    pullQuery = `{ model1( ` +
        `where: {"foo":"bar","updated_at":{"_gt":"${timestamp}"}}, ` +
        `limit: ${syncOptions.batchSize}, ` +
        `order_by: [{updated_at: asc}] ` +
        `) { id } }`;
    queryBuilder = pullQueryBuilder(collection, syncOptions, {where: {foo: 'bar'}, fields: ['id']});
    query = queryBuilder(doc);
    queryStr = query.query.replace(/[\s]+/g, ' ');
    expect(queryStr).toEqual(pullQuery);
  });
});

describe('pushQueryBuilder', () => {
  it('should create a push sync query for a given collection', () => {
    const collection = collections[0];
    const timestamp = new Date().toISOString();
    const doc: Model = {id: 'foo', created_at: timestamp, updated_at: timestamp};
    const dummyModifier = {modifier: (d: any) => d};
    const modifierSpy = spyOn(dummyModifier, 'modifier').and.callThrough();
    const pushQuery = ` mutation InsertModel1($doc: [model1_insert_input!]!) { ` +
        `insert_model1( objects: $doc ){ returning {id} } } `;
    const queryBuilder = pushQueryBuilder(collection, {docModifier: dummyModifier.modifier});
    const query = queryBuilder(doc);
    const queryStr = query.query.replace(/[\s]+/g, ' ');
    expect(queryStr).toEqual(pushQuery);
    expect(modifierSpy).toHaveBeenCalledWith(doc);
  });
});

describe('subscriptionQueryBuilder', () => {
  it('should create a subscription sync query for a given collection', () => {
    const collection = collections[0];
    const subscriptionQuery = ` subscription onModel1Changed { model1 { id } } `;
    const query = subscriptionQueryBuilder(collection);
    const queryStr = query.replace(/[\s]+/g, ' ');
    expect(queryStr).toEqual(subscriptionQuery);
  });
});
