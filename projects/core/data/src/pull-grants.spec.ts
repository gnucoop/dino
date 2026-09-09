import {PermissionContext} from './data-permission-interface';
import {
  PULL_GRANTS_STORAGE_KEY_PREFIX,
  PullGrants,
  grantsFromContext,
  pullGrants,
  pullGrantsDiff,
  pullGrantsStorageKey,
  removePullGrants,
  storePullGrants,
} from './pull-grants';

const grants = (over: Partial<PullGrants> = {}): PullGrants => ({
  formSchemas: [],
  reportSchemas: [],
  metrics: {},
  ...over,
});

const contextWith = (over: Partial<PermissionContext>): PermissionContext =>
  ({
    user: null,
    user_data: null,
    user_form_schemas: null,
    user_report_schemas: null,
    user_form_statuses: null,
    user_metrics: null,
    user_permissions: null,
    ...over,
  } as PermissionContext);

describe('pull grants record', () => {
  const keys = [pullGrantsStorageKey('db_a'), pullGrantsStorageKey('db_b')];

  afterEach(() => keys.forEach(key => localStorage.removeItem(key)));

  it('scopes the record to one database name', () => {
    expect(pullGrantsStorageKey('db_a')).toBe(`${PULL_GRANTS_STORAGE_KEY_PREFIX}db_a`);

    storePullGrants('db_a', grants({formSchemas: ['s1']}));

    expect(pullGrants('db_a')?.formSchemas).toEqual(['s1']);
    // A record for one database says nothing about another: the app can be
    // configured with more than one name.
    expect(pullGrants('db_b')).toBeNull();
  });

  it('reads back nothing when no record was ever written', () => {
    // The first session of a version that keeps this record, and the case that
    // must not be mistaken for "nothing was granted".
    expect(pullGrants('db_a')).toBeNull();
  });

  it('reads back nothing rather than throwing on a corrupted record', () => {
    localStorage.setItem(pullGrantsStorageKey('db_a'), 'not json at all');

    expect(pullGrants('db_a')).toBeNull();
  });

  it('forgets the record as soon as it is removed', () => {
    storePullGrants('db_a', grants({formSchemas: ['s1']}));
    removePullGrants('db_a');

    expect(pullGrants('db_a')).toBeNull();
  });
});

describe('grantsFromContext', () => {
  it('takes the schema sets and the metric lists out of the context', () => {
    const record = grantsFromContext(
      contextWith({
        user_form_schemas: new Set(['s2', 's1']),
        user_report_schemas: new Set(['r1']),
        user_metrics: {project: ['p2', 'p1'], area: ['all']},
      }),
    );

    // Sorted and de-duplicated, so that the same grants read in a different
    // order produce the same record and compare equal next time.
    expect(record.formSchemas).toEqual(['s1', 's2']);
    expect(record.reportSchemas).toEqual(['r1']);
    expect(record.metrics).toEqual({project: ['p1', 'p2'], area: ['all']});
  });

  it('reads an empty context as no grants, not as a broken record', () => {
    expect(grantsFromContext(contextWith({}))).toEqual(grants());
  });
});

describe('pullGrantsDiff', () => {
  it('asks for nothing when no record exists yet', () => {
    // The first session after the release registers what it has and backfills
    // from the next change onwards: backfilling every device at once, over the
    // connection that is usually the problem, would cost more than it fixes.
    const current = grants({formSchemas: ['s1'], metrics: {project: ['p1']}});

    expect(pullGrantsDiff(current, null)).toBeNull();
  });

  it('asks for nothing when the grants are unchanged', () => {
    const current = grants({formSchemas: ['s1'], metrics: {project: ['p1', 'p2']}});

    expect(pullGrantsDiff(current, {...current})).toBeNull();
  });

  it('reports only the metric ids that were not granted before', () => {
    const previous = grants({metrics: {project: ['p1', 'p2'], area: ['a1']}});
    const current = grants({metrics: {project: ['p1', 'p2', 'p3', 'p4'], area: ['a1']}});

    const diff = pullGrantsDiff(current, previous);

    expect(diff?.metrics).toEqual({project: ['p3', 'p4']});
    // A metric type that did not move is absent, so no collection backfills for it.
    expect(diff?.metrics['area']).toBeUndefined();
  });

  it('reports a whole metric type that the previous session did not have', () => {
    const diff = pullGrantsDiff(grants({metrics: {case: ['c1', 'c2']}}), grants());

    expect(diff?.metrics).toEqual({case: ['c1', 'c2']});
  });

  it('reports newly granted schemas on their own dimension', () => {
    const previous = grants({formSchemas: ['s1'], reportSchemas: ['r1']});
    const current = grants({formSchemas: ['s1', 's9'], reportSchemas: ['r1', 'r2']});

    const diff = pullGrantsDiff(current, previous);

    expect(diff?.formSchemas).toEqual(['s9']);
    expect(diff?.reportSchemas).toEqual(['r2']);
  });

  it('asks for nothing on a dimension that is now "all"', () => {
    // The filter for it is empty, so every document already comes down: there is
    // no id to ask for, and 'all' is not an id.
    const diff = pullGrantsDiff(
      grants({formSchemas: ['all'], metrics: {project: ['all']}}),
      grants({formSchemas: ['s1'], metrics: {project: ['p1']}}),
    );

    expect(diff).toBeNull();
  });

  it('asks for nothing when a permission was taken away', () => {
    // A restriction never backfills: the documents stay on disk, which is the
    // invariant, and the permission checks stop showing them.
    const diff = pullGrantsDiff(
      grants({formSchemas: ['s1'], metrics: {project: ['p1']}}),
      grants({formSchemas: ['s1', 's2'], metrics: {project: ['p1', 'p2']}}),
    );

    expect(diff).toBeNull();
  });

  it('reports the widening even when another dimension was restricted', () => {
    const diff = pullGrantsDiff(
      grants({formSchemas: ['s9'], metrics: {project: ['p1', 'p2']}}),
      grants({formSchemas: ['s1'], metrics: {project: ['p1']}}),
    );

    expect(diff?.formSchemas).toEqual(['s9']);
    expect(diff?.metrics).toEqual({project: ['p2']});
  });
});
