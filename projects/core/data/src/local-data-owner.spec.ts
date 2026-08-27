import {
  DB_OWNER_STORAGE_KEY_PREFIX,
  dbOwnerStorageKey,
  localDataOwner,
  localDataOwners,
  removeLocalDataOwner,
  storeLocalDataOwner,
} from './local-data-owner';

// The ids are sentinels: `localDataOwners()` reads the whole local storage, and
// the other suites of this project leave their own owner records behind.
const OWNER_A = {id: 'owner_of_db_a_sentinel', label: 'a@sentinel.test'};
const OWNER_B = {id: 'owner_of_db_b_sentinel', label: null};

describe('local data owner', () => {
  const keys = [dbOwnerStorageKey('db_a'), dbOwnerStorageKey('db_b')];

  afterEach(() => keys.forEach(key => localStorage.removeItem(key)));

  it('scopes the record to one database name', () => {
    expect(dbOwnerStorageKey('db_a')).toBe(`${DB_OWNER_STORAGE_KEY_PREFIX}db_a`);

    storeLocalDataOwner('db_a', OWNER_A);

    expect(localDataOwner('db_a')).toEqual(OWNER_A);
    // A record for one database says nothing about another.
    expect(localDataOwner('db_b')).toBeNull();
  });

  it('keeps the label next to the id, because the login page has nothing else to ask', () => {
    storeLocalDataOwner('db_a', OWNER_A);

    expect(localDataOwner('db_a')?.label).toBe(OWNER_A.label);
  });

  it('reads a legacy record, a bare user id, as an owner with no label', () => {
    // Written by the first version of this record: a device upgrading must not
    // look unowned, or the warning on the login page disappears.
    localStorage.setItem(dbOwnerStorageKey('db_a'), 'legacy_owner_sentinel');

    expect(localDataOwner('db_a')).toEqual({id: 'legacy_owner_sentinel', label: null});
  });

  it('lists the owners recorded on the device, for callers with no database name', () => {
    // The login page is one: it warns about data left behind before anything
    // has been configured for a session.
    storeLocalDataOwner('db_a', OWNER_A);
    storeLocalDataOwner('db_b', OWNER_B);

    const owners = localDataOwners();

    expect(owners).toContain(OWNER_A);
    expect(owners).toContain(OWNER_B);
  });

  it('forgets an owner as soon as its record is removed', () => {
    storeLocalDataOwner('db_a', OWNER_A);
    removeLocalDataOwner('db_a');

    expect(localDataOwner('db_a')).toBeNull();
    expect(localDataOwners()).not.toContain(OWNER_A);
  });
});
