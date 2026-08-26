import {
  DB_OWNER_STORAGE_KEY_PREFIX,
  dbOwnerStorageKey,
  localDataOwner,
  localDataOwners,
} from './local-data-owner';

describe('local data owner', () => {
  const keys = [dbOwnerStorageKey('db_a'), dbOwnerStorageKey('db_b')];

  afterEach(() => keys.forEach(key => localStorage.removeItem(key)));

  it('scopes the record to one database name', () => {
    expect(dbOwnerStorageKey('db_a')).toBe(`${DB_OWNER_STORAGE_KEY_PREFIX}db_a`);

    localStorage.setItem(dbOwnerStorageKey('db_a'), 'user_1');

    expect(localDataOwner('db_a')).toBe('user_1');
    // A record for one database says nothing about another.
    expect(localDataOwner('db_b')).toBeNull();
  });

  it('lists the owners recorded on the device, for callers with no database name', () => {
    // The login page is one: it warns about data left behind before anything
    // has been configured for a session.
    localStorage.setItem(dbOwnerStorageKey('db_a'), 'user_1');
    localStorage.setItem(dbOwnerStorageKey('db_b'), 'user_2');

    const owners = localDataOwners();

    expect(owners).toContain('user_1');
    expect(owners).toContain('user_2');
  });

  it('reports nothing when no database claims an owner', () => {
    expect(localDataOwners().filter(owner => owner.startsWith('user_'))).toEqual([]);
  });
});
