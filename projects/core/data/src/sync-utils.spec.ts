import {RxCollection, RxDocumentData, RxJsonSchema, RxReplicationWriteToMasterRow} from 'rxdb';

import {DataServiceSyncOptions, Model} from './public_api';
import {PullQueryContextChecks} from './data-create-collection-request';
import {PullGrantsDiff} from './pull-grants';
import {
  generateBackfillWhere,
  generateSyncPullChecks,
  pullQueryBuilder,
  pullResponseModifier,
  pushQueryBuilder,
  startingPullCheckpoint,
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
  collection: collections[0],
  replicationIdentifier: 'test-replication',
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

describe('pullQueryBuilder with a backfill', () => {
  const collection = collections[0];
  const doc = {id: 'foo', created_at: 'x', updated_at: 'x'} as RxDocumentData<Model>;

  it('puts the checkpoint in _or with the backfill, inside the current checks', async () => {
    const queryBuilder = pullQueryBuilder(collection, syncOptions, {
      where: {_and: [{form_schema_ref_id: {_in: ['s1', 's9']}}]},
      backfillWhere: {_or: [{form_schema_ref_id: {_in: ['s9']}}]},
      fields: ['id'],
    }) as pullQueryMock;
    const timestamp = new Date(doc.updated_at).toUTCString();

    const queryStr = (await getQueryString(queryBuilder(doc))).replace(/[\s]+/g, ' ');

    // The backfill sits inside the _and of the current checks, so it can only
    // reach documents the permissions already allow: it widens what the
    // checkpoint hides, never what the permissions hide.
    expect(queryStr).toContain(
      `where: {_and:[{form_schema_ref_id:{_in:["s1","s9"]}},` +
        `{_or:[{updated_at:{_gte:"${timestamp}"}},{_or:[{form_schema_ref_id:{_in:["s9"]}}]}]}]}`,
    );
  });

  it('leaves the query exactly as it was when there is no backfill', async () => {
    const queryBuilder = pullQueryBuilder(collection, syncOptions, {
      where: {_and: [{form_schema_ref_id: {_in: ['s1']}}]},
      fields: ['id'],
    }) as pullQueryMock;
    const timestamp = new Date(doc.updated_at).toUTCString();

    const queryStr = (await getQueryString(queryBuilder(doc))).replace(/[\s]+/g, ' ');

    expect(queryStr).toContain(
      `where: {_and:[{form_schema_ref_id:{_in:["s1"]}}],updated_at:{_gte:"${timestamp}"}}`,
    );
  });
});

describe('generateBackfillWhere', () => {
  const diff = (over: Partial<PullGrantsDiff> = {}): PullGrantsDiff => ({
    formSchemas: [],
    reportSchemas: [],
    metrics: {},
    ...over,
  });

  // What `form_data` and `report_data` declare: a schema dimension carried by a
  // reference field, and every metric type at once.
  const dataChecks: PullQueryContextChecks = [
    {checkName: 'user_form_schemas', checkKey: 'form_schema_ref_id'},
    {checkName: 'user_metrics'},
  ];
  // What a metric collection declares: its own type, matched on the document id.
  const projectChecks: PullQueryContextChecks = [{checkName: 'user_metrics', checkKey: 'project'}];
  // What `form_schema` declares: no key, so the schema ids are the document ids.
  const schemaChecks: PullQueryContextChecks = [{checkName: 'user_form_schemas'}];

  it('asks a metric collection for the newly granted ids, by id', () => {
    const where = generateBackfillWhere(diff({metrics: {project: ['p3', 'p4']}}), projectChecks);

    expect(where).toEqual({_or: [{id: {_in: ['p3', 'p4']}}]});
  });

  it('asks a schema collection for the newly granted ids, by id', () => {
    const where = generateBackfillWhere(diff({formSchemas: ['s9']}), schemaChecks);

    expect(where).toEqual({_or: [{id: {_in: ['s9']}}]});
  });

  it('joins the metric types of form data with _or, not _and', () => {
    // The whole point of this function. The current filter joins the dimensions
    // with _and - a form data must pass the schema check *and* every metric type -
    // which is right for "what may I see" and wrong for "what has just been opened
    // to me". An _and over the diff would ask for the documents sitting in a new
    // project *and* in a new area at once: almost always none of them.
    const where = generateBackfillWhere(
      diff({metrics: {project: ['p3'], area: ['a7']}}),
      dataChecks,
    );

    expect(where).toEqual({
      _or: [{project_ref_id: {_in: ['p3']}}, {area_ref_id: {_in: ['a7']}}],
    });
  });

  it('produces an _and over the same diff when the current filter is built instead', () => {
    // The contrast that makes the previous test meaningful, on the code that
    // builds the live filter.
    const asFilter = generateSyncPullChecks(
      {user_metrics: {project: ['p3'], area: ['a7']}} as any,
      dataChecks,
    );

    expect(asFilter._and.length).toBe(2);
    expect(asFilter._and[0]).toEqual({
      _or: [{project_ref_id: {_in: ['p3']}}, {project_ref_id: {_is_null: true}}],
    });
  });

  it('carries the schema dimension alongside the metrics for form data', () => {
    // Granting only a schema, with no metric change, must still bring its form
    // data back: an _or built from the metrics alone would be empty.
    const where = generateBackfillWhere(diff({formSchemas: ['s9']}), dataChecks);

    expect(where).toEqual({_or: [{form_schema_ref_id: {_in: ['s9']}}]});
  });

  it('joins schema and metric dimensions with _or when both widened', () => {
    const where = generateBackfillWhere(
      diff({formSchemas: ['s9'], metrics: {project: ['p3']}}),
      dataChecks,
    );

    expect(where).toEqual({
      _or: [{form_schema_ref_id: {_in: ['s9']}}, {project_ref_id: {_in: ['p3']}}],
    });
  });

  it('never adds an _is_null branch', () => {
    // A document with no metric reference was visible already, so it is not
    // something newly granted and asking for it again is waste.
    const where = generateBackfillWhere(diff({metrics: {project: ['p3']}}), dataChecks);

    expect(JSON.stringify(where)).not.toContain('_is_null');
  });

  it('gives a collection nothing when no dimension it filters by has widened', () => {
    // A report schema grant must not make the project collection ask for anything.
    expect(generateBackfillWhere(diff({reportSchemas: ['r2']}), projectChecks)).toBeNull();
    expect(generateBackfillWhere(diff(), dataChecks)).toBeNull();
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

describe('pullResponseModifier', () => {
  const doc = (id: string, updated_at: string) => ({id, updated_at} as any);

  it('should build the checkpoint from the last pulled document', () => {
    const docs = [doc('a', '2026-07-01T10:00:00+00:00'), doc('b', '2026-07-02T10:00:00+00:00')];
    const res = pullResponseModifier(docs);
    expect(res.documents).toEqual(docs);
    expect(res.checkpoint).toEqual({id: 'b', updated_at: '2026-07-02T10:00:00+00:00'});
  });

  it('should keep the requested checkpoint when nothing new was pulled', () => {
    // Rewinding here would make the next pull re-download the whole collection.
    const requested = {id: 'b', updated_at: '2026-07-02T10:00:00+00:00'};
    const res = pullResponseModifier([], requested);
    expect(res.documents).toEqual([]);
    expect(res.checkpoint).toEqual(requested);
  });

  it('should fall back to the starting checkpoint on an empty first pull', () => {
    expect(pullResponseModifier([]).checkpoint).toEqual(startingPullCheckpoint());
    expect(pullResponseModifier([], null).checkpoint).toEqual(startingPullCheckpoint());
    expect(pullResponseModifier([], {} as any).checkpoint).toEqual(startingPullCheckpoint());
  });

  it('should keep the requested checkpoint when a backfill returns only older documents', () => {
    // A backfill asks for documents granted rather than changed, so a page can be
    // entirely older than the checkpoint. Taking the last one would rewind the
    // replication and re-download everything already here.
    const requested = {id: 'z', updated_at: '2026-07-10T10:00:00+00:00'};
    const backfilled = [doc('a', '2026-01-01T10:00:00+00:00'), doc('b', '2026-02-01T10:00:00+00:00')];

    const res = pullResponseModifier(backfilled, requested);

    expect(res.documents).toEqual(backfilled);
    expect(res.checkpoint).toEqual(requested);
  });

  it('should still advance when the page reaches past the requested checkpoint', () => {
    const requested = {id: 'z', updated_at: '2026-07-10T10:00:00+00:00'};
    const docs = [doc('a', '2026-01-01T10:00:00+00:00'), doc('b', '2026-08-01T10:00:00+00:00')];

    expect(pullResponseModifier(docs, requested).checkpoint).toEqual({
      id: 'b',
      updated_at: '2026-08-01T10:00:00+00:00',
    });
  });

  it('should not rewind across repeated empty pulls', () => {
    let checkpoint = pullResponseModifier([doc('a', '2026-07-01T10:00:00+00:00')]).checkpoint;
    for (let i = 0; i < 5; i++) {
      checkpoint = pullResponseModifier([], checkpoint).checkpoint;
    }
    expect(checkpoint).toEqual({id: 'a', updated_at: '2026-07-01T10:00:00+00:00'});
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
