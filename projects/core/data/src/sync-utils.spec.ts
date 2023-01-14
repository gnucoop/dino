import {RxCollection, RxDocumentData, RxJsonSchema, RxReplicationWriteToMasterRow} from 'rxdb';

import {DataServiceSyncOptions, Model} from './public_api';
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
      id: {type: 'string', primary: true, maxLength: 200},
      model3Id: {type: 'string', ref: 'model3'},
      updated_at: {type: 'string'},
    },
  },
  {
    title: 'model2',
    version: 0,
    type: 'object',
    properties: {
      id: {type: 'string', primary: true, maxLength: 200},
      model1Id: {type: 'string', ref: 'model1'},
      foo: {type: 'object', bar: {type: 'string'}, model3Id: {type: 'string', ref: 'model3'}},
      updated_at: {type: 'string'},
    },
  },
  {
    title: 'model3',
    version: 0,
    type: 'object',
    primaryKey: 'id',
    properties: {
      id: {type: 'string'},
      updated_at: {type: 'string', maxLength: 200},
    },
  },
] as RxJsonSchema<any>[];

const collections = schemas.map(
  schema => ({name: schema.title, schema: {jsonSchema: schema}} as RxCollection),
);

const syncOptions: DataServiceSyncOptions = {
  url: {http: 'host'},
  batchSizePull: 10,
  batchSizePush: 10,
};

type pullQueryMock = (doc: RxDocumentData<any> | null) => {query: string; variables: any};
type pushQueryMock = (docs: RxReplicationWriteToMasterRow<RxDocumentData<any>>[]) => {
  query: string;
  variables: any;
};

async function getQueryString(query: {query: string} | Promise<{query: string}>): Promise<string> {
  if (query instanceof Promise) {
    return (await query).query;
  }
  return query.query;
}

describe('syncOrderedCollections', () => {
  it('should sort collections for sync purposes', () => {
    const sorted = syncOrderedCollections(collections);
    expect(sorted.length).toBe(collections.length);
    expect(sorted[0].schema.jsonSchema.title).toBe('model3');
    expect(sorted[1].schema.jsonSchema.title).toBe('model1');
    expect(sorted[2].schema.jsonSchema.title).toBe('model2');
  });
});

describe('pullQueryBuilder', () => {
  it('should create a pull sync query for a given collection', async () => {
    const collection = collections[0];
    const newDate = new Date();
    const timestampDoc = newDate.toUTCString();
    const timestamp = newDate.toUTCString();
    let pullQuery =
      `{ model1( ` +
      `where: {updated_at:{_gte:"${timestamp}"}}, ` +
      `order_by: [{updated_at: asc}] ` +
      `) { id model3Id updated_at } }`;
    const doc: RxDocumentData<Model> = {
      id: 'foo',
      created_at: timestampDoc,
      updated_at: timestampDoc,
    } as RxDocumentData<Model>;

    let queryBuilder = pullQueryBuilder(collection, syncOptions) as pullQueryMock;
    let query = queryBuilder(doc);
    let queryStr = (await getQueryString(query)).replace(/[\s]+/g, ' ');
    expect(queryStr).toEqual(pullQuery);

    pullQuery =
      `{ model1( ` +
      `where: {foo:"bar",updated_at:{_gte:"${timestamp}"}}, ` +
      `order_by: [{updated_at: asc}] ` +
      `) { id } }`;
    queryBuilder = pullQueryBuilder(collection, syncOptions, {
      where: {foo: 'bar'},
      fields: ['id'],
    }) as pullQueryMock;
    query = queryBuilder(doc);
    queryStr = (await getQueryString(query)).replace(/[\s]+/g, ' ');
    expect(queryStr).toEqual(pullQuery);
  });
});

describe('pushQueryBuilder', () => {
  it('should create a push sync query for a given collection', async () => {
    const collection = collections[0];
    const timestamp = new Date().toISOString();
    const docs: RxReplicationWriteToMasterRow<RxDocumentData<Model>>[] = [
      {
        assumedMasterState: {},
        newDocumentState: {id: 'foo', created_at: timestamp, updated_at: timestamp},
      } as RxReplicationWriteToMasterRow<RxDocumentData<Model>>,
    ];
    const dummyModifier = {modifier: (d: any) => d};
    const modifierSpy = spyOn(dummyModifier, 'modifier').and.callThrough();
    const pushQuery =
      ` mutation InsertModel1($docs: [model1_insert_input!]!) { ` +
      `insert_model1( objects: $docs, on_conflict: ` +
      `{ constraint: model1_pkey, update_columns: [model3Id, updated_at], where: {updated_at:{_lte:"${timestamp}"}} }) { returning {id} } } `;
    const queryBuilder = pushQueryBuilder(collection, {
      docModifier: dummyModifier.modifier,
    }) as pushQueryMock;
    const query = queryBuilder(docs);
    const queryStr = (await getQueryString(query)).replace(/[\s]+/g, ' ');
    expect(queryStr).toEqual(pushQuery);
    expect(modifierSpy).toHaveBeenCalledWith(docs[0].newDocumentState);
  });
});

describe('subscriptionQueryBuilder', () => {
  it('should create a subscription sync query for a given collection', () => {
    const collection = collections[0];
    const subscriptionQuery = ` subscription onModel1Changed { model1 { updated_at } } `;
    const query = subscriptionQueryBuilder(collection);
    const queryStr = query.replace(/[\s]+/g, ' ');
    expect(queryStr).toEqual(subscriptionQuery);
  });
});
