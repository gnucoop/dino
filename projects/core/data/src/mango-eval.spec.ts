import {getPathValue, hasDottedPath, matchesSelector, splitSelector} from './mango-eval';

describe('getPathValue', () => {
  it('should read a plain field', () => {
    expect(getPathValue({a: 1}, 'a')).toBe(1);
  });

  it('should read a dotted jsonb path', () => {
    expect(getPathValue({data: {age: 42}}, 'data.age')).toBe(42);
    expect(getPathValue({data: {data: {age: 7}}}, 'data.data.age')).toBe(7);
    expect(getPathValue({data: {'visits__0': 'x'}}, 'data.visits__0')).toBe('x');
  });

  it('should return undefined for a missing path', () => {
    expect(getPathValue({}, 'data.age')).toBeUndefined();
    expect(getPathValue(null, 'a')).toBeUndefined();
  });
});

describe('matchesSelector', () => {
  const doc = {
    id: 'r1',
    is_deleted: false,
    created_at: '2026-03-01',
    recipients: ['u1', 'all'],
    data: {age: 30, name: 'Rossi Mario', district: 'd1', notes: '', consent: false},
  };

  it('should match a bare equality', () => {
    expect(matchesSelector(doc, {id: 'r1'})).toBe(true);
    expect(matchesSelector(doc, {id: 'other'})).toBe(false);
  });

  it('should treat a missing value as not-equal for $ne (offline parity)', () => {
    expect(matchesSelector(doc, {is_deleted: {$ne: true}})).toBe(true);
    expect(matchesSelector({}, {is_deleted: {$ne: true}})).toBe(true);
  });

  it('should compare numbers inside a jsonb path', () => {
    expect(matchesSelector(doc, {'data.age': {$gte: 18}})).toBe(true);
    expect(matchesSelector(doc, {'data.age': {$gte: 18, $lte: 25}})).toBe(false);
  });

  it('should compare dates', () => {
    expect(matchesSelector(doc, {created_at: {$gte: '2026-01-01', $lte: '2026-07-25'}})).toBe(true);
    expect(matchesSelector(doc, {created_at: {$gte: '2026-06-01'}})).toBe(false);
  });

  it('should apply $regex with options', () => {
    expect(matchesSelector(doc, {'data.name': {$regex: 'rossi', $options: 'i'}})).toBe(true);
    expect(matchesSelector(doc, {'data.name': {$regex: 'rossi'}})).toBe(false);
  });

  it('should apply $in and $nin, including the Empty operator shape', () => {
    expect(matchesSelector(doc, {'data.district': {$in: ['d1', 'd2']}})).toBe(true);
    expect(matchesSelector(doc, {'data.notes': {$in: [null, '']}})).toBe(true);
    expect(matchesSelector(doc, {'data.notes': {$nin: [null, '']}})).toBe(false);
  });

  it('should treat equality on an array as containment', () => {
    expect(matchesSelector(doc, {recipients: {$eq: 'u1'}})).toBe(true);
    expect(matchesSelector(doc, {recipients: {$elemMatch: {$eq: 'all'}}})).toBe(true);
    expect(matchesSelector(doc, {recipients: {$elemMatch: {$eq: 'nope'}}})).toBe(false);
  });

  it('should apply logical operators', () => {
    expect(matchesSelector(doc, {$or: [{'data.age': {$gt: 100}}, {'data.district': 'd1'}]})).toBe(
      true,
    );
    expect(matchesSelector(doc, {$and: [{'data.age': {$gt: 10}}, {'data.district': 'd1'}]})).toBe(
      true,
    );
    expect(matchesSelector(doc, {$nor: [{'data.district': 'd1'}]})).toBe(false);
    expect(matchesSelector(doc, {$not: {'data.district': 'd1'}})).toBe(false);
  });

  it('should treat an empty $or as a no-op', () => {
    expect(matchesSelector(doc, {$or: []})).toBe(true);
  });

  it('should match a boolean false-or-null filter', () => {
    expect(matchesSelector(doc, {'data.consent': {$ne: true}})).toBe(true);
  });
});

describe('hasDottedPath', () => {
  it('should detect dotted paths at any depth', () => {
    expect(hasDottedPath({id: 'x'})).toBe(false);
    expect(hasDottedPath({'data.age': 1})).toBe(true);
    expect(hasDottedPath({$or: [{id: 'x'}, {'data.age': 1}]})).toBe(true);
    expect(hasDottedPath({$and: [{$or: [{'data.a': 1}]}]})).toBe(true);
  });
});

describe('splitSelector', () => {
  it('should keep column-only selectors on the server', () => {
    const {server, client} = splitSelector({id: {$eq: 'x'}, is_deleted: {$ne: true}});
    expect(server).toEqual({id: {$eq: 'x'}, is_deleted: {$ne: true}});
    expect(client).toBeUndefined();
  });

  it('should move dotted fields to the client', () => {
    const {server, client} = splitSelector({'data.age': {$gte: 18}, id: {$eq: 'x'}});
    expect(server).toEqual({id: {$eq: 'x'}});
    expect(client).toEqual({'data.age': {$gte: 18}});
  });

  it('should split $and element by element', () => {
    const {server, client} = splitSelector({
      $and: [{id: {$eq: 'x'}}, {'data.age': {$gte: 18}}],
    });
    expect(server).toEqual({$and: [{id: {$eq: 'x'}}]});
    expect(client).toEqual({$and: [{'data.age': {$gte: 18}}]});
  });

  it('should move a whole $or group to the client when it mixes columns and jsonb paths', () => {
    const selector = {$or: [{full_name: {$regex: 'kw'}}, {'data.name': {$regex: 'kw'}}]};
    const {server, client} = splitSelector(selector);
    expect(server).toBeUndefined();
    expect(client).toEqual(selector);
  });

  it('should keep a column-only $or on the server', () => {
    const selector = {$or: [{a: {$eq: 1}}, {b: {$eq: 2}}]};
    const {server, client} = splitSelector(selector);
    expect(server).toEqual(selector);
    expect(client).toBeUndefined();
  });
});
