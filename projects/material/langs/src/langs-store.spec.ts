import {fakeAsync, tick} from '@angular/core/testing';
import {Dic, LangManager, LangRow} from '@dino/core/langs';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import {map} from 'rxjs/operators';

import {LangsStore, TranslationKeyVm} from './langs-store';

const UPDATE_DURATION = 10;

class LangManagerStub {
  readonly allLangsNames$ = new BehaviorSubject<string[]>(['ENG', 'ITA']);
  readonly langRows$ = new BehaviorSubject<LangRow[]>([
    {key: 'Accept', ENG: 'Accept', ITA: 'Accetta'},
    {key: 'Add New', ENG: 'Add New', ITA: ''},
  ]);
  readonly updateLangCalls: {updates: Dic; key: string}[] = [];
  /** The calls that started but did not complete yet. */
  running = 0;
  maxRunning = 0;

  updateLang(updates: Dic, key: string): Observable<string> {
    this.updateLangCalls.push({updates, key});
    this.running++;
    this.maxRunning = Math.max(this.maxRunning, this.running);
    return timer(UPDATE_DURATION).pipe(
      map(() => {
        this.running--;
        return 'update: ITA';
      }),
    );
  }
}

describe('LangsStore', () => {
  let langSvc: LangManagerStub;
  let store: LangsStore;

  // The store is built by every test, and not once by beforeEach, so that the
  // timers of its debounces belong to the zone of the test that ticks them.
  function createStore(): void {
    langSvc = new LangManagerStub();
    store = new LangsStore(langSvc as unknown as LangManager);
  }

  beforeEach(() => createStore());

  afterEach(() => store.ngOnDestroy());

  function rows(source: Observable<TranslationKeyVm[]>): TranslationKeyVm[] {
    let res: TranslationKeyVm[] = [];
    source.subscribe(r => (res = r)).unsubscribe();
    return res;
  }

  it('should expose the stored rows with their completion', () => {
    const res = rows(store.rows$);
    expect(res.map(r => r.key)).toEqual(['Accept', 'Add New']);
    expect(res[0].pct).toBe(100);
    expect(res[0].status).toBe('ok');
    expect(res[1].pct).toBe(50);
    expect(res[1].status).toBe('warn');
  });

  it('should layer the pending edits over the stored rows', () => {
    store.setValue('Add New', 'ITA', 'Aggiungi');
    const res = rows(store.rows$);
    expect(res[1].values['ITA']).toBe('Aggiungi');
    expect(res[1].pct).toBe(100);
    expect(res[1].status).toBe('ok');
  });

  it('should search the key and every translation', fakeAsync(() => {
    createStore();
    store.setQuery('accetta');
    tick(250);
    expect(rows(store.visibleRows$).map(r => r.key)).toEqual(['Accept']);

    store.setQuery('add');
    tick(250);
    expect(rows(store.visibleRows$).map(r => r.key)).toEqual(['Add New']);
  }));

  it('should combine the search with the untranslated filter', fakeAsync(() => {
    createStore();
    store.setFilter('missing');
    expect(rows(store.visibleRows$).map(r => r.key)).toEqual(['Add New']);

    store.setQuery('accept');
    tick(250);
    expect(rows(store.visibleRows$)).toEqual([]);
  }));

  it('should select the first visible key when nothing is selected', () => {
    let selected: TranslationKeyVm | null = null;
    const sub = store.selected$.subscribe(s => (selected = selected ?? s));
    expect(selected!.key).toBe('Accept');
    sub.unsubscribe();
  });

  it('should debounce the edits of a key into a single update', fakeAsync(() => {
    store.setValue('Add New', 'ITA', 'Agg');
    tick(200);
    store.setValue('Add New', 'ITA', 'Aggiungi');
    tick(200);
    expect(langSvc.updateLangCalls.length).toBe(0);

    tick(500);
    expect(langSvc.updateLangCalls.length).toBe(1);
    expect(langSvc.updateLangCalls[0]).toEqual({updates: {ITA: 'Aggiungi'}, key: 'Add New'});
    tick(UPDATE_DURATION);
  }));

  it('should send the edits of every language of a key together', fakeAsync(() => {
    store.setValue('Add New', 'ITA', 'Aggiungi');
    store.setValue('Add New', 'ENG', 'Add new');
    tick(500);
    expect(langSvc.updateLangCalls.length).toBe(1);
    expect(langSvc.updateLangCalls[0].updates).toEqual({ITA: 'Aggiungi', ENG: 'Add new'});
    tick(UPDATE_DURATION);
  }));

  it('should never run two updates at the same time', fakeAsync(() => {
    store.setValue('Add New', 'ITA', 'Aggiungi');
    store.setValue('Accept', 'ITA', 'Accetto');
    tick(500);

    // Both debounces elapsed, but only the first update started.
    expect(langSvc.updateLangCalls.length).toBe(1);
    tick(UPDATE_DURATION);
    expect(langSvc.updateLangCalls.length).toBe(2);
    expect(langSvc.maxRunning).toBe(1);
    tick(UPDATE_DURATION);
  }));

  it('should report the state of a save', fakeAsync(() => {
    const states: string[] = [];
    const sub = store.saveStates$.subscribe(s => states.push(s['Add New'] ?? 'none'));

    store.setValue('Add New', 'ITA', 'Aggiungi');
    tick(500);
    tick(UPDATE_DURATION);

    expect(states).toContain('saving');
    expect(states[states.length - 1]).toBe('saved');
    sub.unsubscribe();
  }));

  it('should drop the edits already carried by the reloaded rows', fakeAsync(() => {
    store.setValue('Add New', 'ITA', 'Aggiungi');
    tick(500);
    tick(UPDATE_DURATION);

    langSvc.langRows$.next([
      {key: 'Accept', ENG: 'Accept', ITA: 'Accetta'},
      {key: 'Add New', ENG: 'Add New', ITA: 'Aggiungi'},
    ]);

    let edits = {};
    store.edits$.subscribe(e => (edits = e)).unsubscribe();
    expect(edits).toEqual({});
    expect(rows(store.rows$)[1].values['ITA']).toBe('Aggiungi');
  }));

  it('should keep the edits that the reloaded rows do not carry yet', () => {
    store.setValue('Add New', 'ITA', 'Aggiungi');
    langSvc.langRows$.next([
      {key: 'Accept', ENG: 'Accept', ITA: 'Accetta'},
      {key: 'Add New', ENG: 'Add New', ITA: ''},
    ]);

    let edits: {[key: string]: Dic} = {};
    store.edits$.subscribe(e => (edits = e)).unsubscribe();
    expect(edits).toEqual({'Add New': {ITA: 'Aggiungi'}});
  });
});
