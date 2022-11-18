/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {EventEmitter, Inject, Injectable, isDevMode} from '@angular/core';
import {DataModelManager, DataService, PermissionContextService} from '@dino/core/data';
import {dinoTranslations, TranslationsConfig, TRANSLATIONS_CONFIG} from '@dino/core/translations';
import {TranslocoService} from '@ngneat/transloco';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  iif,
  merge,
  Observable,
  of as obsOf,
  zip,
} from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  startWith,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {Lang, migrationStrategies} from './lang';
import {schema} from './lang-json';
import {defaultLangs, Dic, LangCreate, LangRow} from './utils';

const collectionDef = {name: 'lang', collection: {schema, migrationStrategies}};

@Injectable({providedIn: 'root'})
export class LangManager extends DataModelManager<Lang> {
  readonly infoAfterStoredLang$: Observable<any>;
  readonly saveLangEvt = new EventEmitter<void>();
  readonly deleteLangEvt = new EventEmitter<void>();

  private _refreshEvt = new EventEmitter<void>();
  private _reloadLangsStoredEvt = new EventEmitter<void>();
  private _removeLangEvt = new EventEmitter<Lang | null>();

  readonly langRows$: Observable<LangRow[]>;
  readonly allLangsNames$ = new BehaviorSubject<string[]>([]);

  readonly currentLangName$: BehaviorSubject<string> = new BehaviorSubject<string>(
    this._config.defaultLanguage,
  );
  set currentLangName(langName: string) {
    this.currentLangName$.next(langName);
  }

  readonly newLang$ = new BehaviorSubject<LangCreate | null>(null);
  set newLang(lang: LangCreate | null) {
    this.newLang$.next(lang);
  }

  // le langs storate su django
  readonly langsStored$ = new BehaviorSubject<Lang[]>([]);
  readonly langsShowed$: Observable<Lang[]> = combineLatest([
    this.list(),
    this._reloadLangsStoredEvt.pipe(startWith(true)),
  ]).pipe(
    map(([langsStored, _]) => {
      const langsShowed: Lang[] = [];

      langsStored.forEach(l => {
        this._ts.setTranslation(l.schema, l.name);
      });
      const allLangs = this._ts.getAvailableLangs() as string[];
      this.allLangsNames$.next(allLangs);

      allLangs.forEach(lang => {
        const translation = this._ts.getTranslation(lang);
        if (Object.keys(translation).length > 0) {
          langsShowed.push({name: lang, schema: translation} as Lang);
        }
      });
      return langsShowed;
    }),
  );

  // osservabile che torna il json visualizzato frutto della composizione del default +
  // jsonScaricato + modifiche ancora non salvate
  readonly currentLangShowed$: Observable<Lang> = combineLatest([
    this.langsShowed$,
    this.currentLangName$,
  ]).pipe(
    map(([langsShowed, currentLangName]) => {
      return langsShowed.filter(langShowed => langShowed.name === currentLangName)[0];
    }),
  );

  // lo schema caricato nella sezione update json per aggiornare una lang tramite file json
  private _currentLangUpdateSchema$: BehaviorSubject<Dic | null> = new BehaviorSubject<Dic | null>(
    null,
  );
  readonly currentLangUpdateSchema$: Observable<Dic> = (
    this._currentLangUpdateSchema$ as Observable<Dic>
  ).pipe(filter(l => l != null));
  set currentLangUpdateSchema(updateSchema: Dic) {
    this._currentLangUpdateSchema$.next(updateSchema);
  }

  // lo schema salvato su django della lang corrente
  readonly currentLangStored$: Observable<Lang> = this.currentLangName$.pipe(
    withLatestFrom(this.langsStored$),
    map(([langName, langsStored]) => {
      const currentLangStored = langsStored.filter(l => l.name === langName)[0];
      return currentLangStored;
    }),
  );

  // lo schema di default della lang corrente
  readonly currentLangDefault$: Observable<Lang> = this.currentLangName$.pipe(
    map(langName => {
      return defaultLangs[langName];
    }),
  );

  // tutti gli attributi presenti nel json di aggiornamento ma non presenti
  // sullo schema salvato su django
  readonly currentDiffBetweenStoredJsonAndCurrentUpdates$: Observable<Dic | null> = combineLatest([
    this.currentLangUpdateSchema$,
    this.currentLangStored$,
    this.currentLangDefault$,
  ]).pipe(
    map(([update, currentStoredLang, currentDefaultLang]) => {
      return this._diff(
        currentStoredLang ? currentStoredLang.schema : currentDefaultLang.schema,
        update,
      );
    }),
  );

  // tutti gli attributi presenti nel json dia ggiornamento che modificano attributi
  // dello schema salvato su django
  readonly currentModifiedBetweenStoredJsonAndCurrentUpdates$: Observable<Dic | null> =
    combineLatest([
      this.currentLangUpdateSchema$,
      this.currentLangStored$,
      this.currentLangDefault$,
    ]).pipe(
      map(([update, currentStoredLang, currentDefaultLang]) => {
        return this._modified(
          currentStoredLang ? currentStoredLang.schema : currentDefaultLang.schema,
          update,
        );
      }),
    );

  constructor(
    dataService: DataService,
    permissionContextService: PermissionContextService,
    private _ts: TranslocoService,
    @Inject(TRANSLATIONS_CONFIG) private _config: TranslationsConfig,
  ) {
    super(collectionDef, dataService, permissionContextService);

    (this._ts.getAvailableLangs() as string[]).map((lang: string) => {
      defaultLangs[lang] = {
        id: '',
        name: lang,
        schema: dinoTranslations[lang],
        created_at: '',
        updated_at: '',
      };
    });

    const emptyLangDic$: Observable<Partial<LangRow>> = this.allLangsNames$.pipe(
      map(allLangsNames => {
        const emptyLangDic: {[key: string]: string} = {};
        allLangsNames.forEach((langKey: string) => {
          emptyLangDic[langKey] = '';
        });
        return emptyLangDic;
      }),
    );

    this.langRows$ = combineLatest([this.langsShowed$, emptyLangDic$]).pipe(
      map(([r, emptyLangRow]) => {
        const res: {[key: string]: LangRow} = {};
        r.map((lang: Lang) => {
          Object.keys(lang.schema).forEach(key => {
            if (!res[key]) {
              res[key] = {key};
            }
            res[key][lang.name] = lang.schema[key];
          });
        });
        return Object.keys(res).map(key => ({...emptyLangRow, ...res[key]} as LangRow));
      }),
      debounceTime(100),
    );

    this._reloadLangsStoredEvt
      .pipe(
        switchMap(() => this.list()),
        catchError(() => obsOf([])),
        map(r => r.filter(l => !l.is_deleted)),
      )
      .subscribe(langs => {
        this.langsStored$.next(langs);
        const langName: string = localStorage.getItem('lang') ?? this._config.defaultLanguage;
        this._ts.setActiveLang(langName);
        this.currentLangName$.next(langName);
      });

    const savePipe: Observable<LangCreate> = zip(
      this.currentLangStored$,
      this.currentLangUpdateSchema$,
      this.currentLangDefault$,
    ).pipe(
      switchMap(zipped => {
        const currentLangStored = (zipped[0] as Lang) || null;
        const currentLangUpdateSchema = (zipped[1] as Dic) || null;
        const currentLangDefault = (zipped[2] as Lang) || null;
        if (currentLangStored) {
          currentLangStored.schema = {
            ...currentLangStored.schema,
            ...currentLangUpdateSchema,
          };
          return obsOf(currentLangStored);
        } else {
          return obsOf({
            name: currentLangDefault.name,
            schema: currentLangUpdateSchema,
            created_at: new Date().toISOString(),
          });
        }
      }),
    );

    const saveLang = this.saveLangEvt.pipe(
      // creo due rami pipe se newLang è valorizzato ritorno newLang altrimenti
      // seguo il ramo savePipe
      switchMap(() => iif(() => this.newLang != null, obsOf(this.newLang as Lang), savePipe)),
      take(1),
      switchMap(l => this.saveLang(l)),
      map((l: Lang | null) => {
        if (l == null) {
          return;
        }
        const langsStoredNames = this.langsStored$.value.map((lang: Lang) => lang.name);
        const idx = langsStoredNames.indexOf(l.name);
        if (idx > -1 && this.langsStored$.value[idx].id) {
          return this._ts.translate('lang: {{language}} updated', {language: l.name});
        } else {
          return this._ts.translate('lang: {{language}} created', {language: l.name});
        }
      }),
      tap(_ => this._reloadList()),
    );

    const deleteLang = this.deleteLangEvt.pipe(
      switchMap(() => this.currentLangStored$),
      take(1),
      switchMap(lang => this.deleteLang(lang)),
      map(l => {
        this._reloadList();
        if (l) {
          return this._ts.translate('deleted: custom translations of {{language}}', {
            language: l.name,
          });
        } else {
          return this._ts.translate(`forbidden: delete default translations`);
        }
      }),
    );
    this.infoAfterStoredLang$ = merge(saveLang, deleteLang);
  }

  deleteLang(lang: Lang): Observable<Lang> {
    return this.delete(lang).pipe(
      map(l => l || lang),
      catchError(_ => obsOf(lang)),
    );
  }

  removeKey(key: string): Observable<string> {
    const apiCall: Observable<any>[] = [];
    this.langsStored$.value.forEach(lang => {
      // se è presente l'id allora vuol dire che è una lang storata su django
      if (lang.schema[key] !== 'undefined' && lang.id != null) {
        delete lang.schema[key];
        apiCall.push(this.patch(lang));
      }
    });
    if (apiCall.length > 0) {
      return forkJoin(apiCall).pipe(
        map((lngs: Lang[]) => {
          const msg =
            lngs.length > 0
              ? this._ts.translate("key: '{{key}}' removed", {key})
              : this._ts.translate('error try later');
          lngs.forEach(l => {
            this._ts.setTranslation(l.schema, l.name);
          });
          return msg;
        }),
        tap(_ => this._reloadList()),
      );
    } else {
      return obsOf(this._ts.translate('forbidden deleting default key') as string).pipe(
        tap(_ => this._refreshEvt.emit()),
      );
    }
  }

  removeLang(lang: Lang): Observable<string> {
    return this.delete(lang).pipe(
      map(lng => {
        this._removeLangEvt.emit(lng);
        if (lng) {
          return this._ts.translate('remove: {{language}}', {language: lng.name});
        }
        return this._ts.translate('error try later');
      }),
      catchError(_ =>
        obsOf(this._ts.translate('{{language}} already deleted', {language: lang.name}) as string),
      ),
      tap(_ => this._reloadList()),
    );
  }

  saveLang(lang: LangCreate): Observable<Lang | null> {
    if (lang == null) {
      return obsOf(null);
    }
    return this.query({selector: {name: {$eq: lang.name}}}).pipe(
      switchMap(queryRes => {
        if (!queryRes.length || queryRes[0] == null) {
          return this.create(lang);
        }
        const upDoc: Partial<Lang> & {id: string} = {
          schema: {...queryRes[0].schema, ...lang.schema},
          id: queryRes[0].id,
        };
        return this.patch(upDoc).pipe(
          catchError(_ => this.create(lang)),
          map(l => l || {...lang, id: '', created_at: '', updated_at: ''}),
        );
      }),
    );
  }

  updateLang(updates: {[key: string]: string}, key: string): Observable<string> {
    const apiCall: Observable<any>[] = [];
    const langs = this.langsStored$.value;
    const langNames = langs.map(l => l.name);
    const defaultLangNames = Object.keys(defaultLangs);
    const allLangsNames = defaultLangNames.concat(
      langNames.filter(item => defaultLangNames.indexOf(item) < 0),
    );

    if (Object.keys(updates).length > 0) {
      allLangsNames.forEach(langName => {
        let updated = false;
        let currentKey = key;
        let lang: LangCreate | null = langs.filter(l => l.name === langName)[0] || null;
        // se modifico la chiave rispetto a quella salvata su django
        if (updates['key'] && updates['key'] !== currentKey) {
          const updatedKey: string = updates['key'];
          lang.schema[updatedKey] = lang.schema[currentKey];
          delete lang.schema[currentKey];
          currentKey = updatedKey;
          updated = true;
        }
        // se modifico una traduzione di una lingua presente su django
        if (lang != null && updates[lang.name] != null) {
          if (updates[lang.name] === '') {
            // se l'utente ha cancellato la traduzione
            delete lang.schema[currentKey];
          } else {
            lang.schema[currentKey] = updates[lang.name];
          }
          updated = true;
        }

        lang = {name: langName, schema: {}, created_at: new Date().toISOString()};
        lang.schema[currentKey] = updates[langName];
        updated = true;

        if (updated) {
          apiCall.push(this.saveLang(lang));
        }
      });
    }

    return forkJoin(apiCall).pipe(
      map((lngs: Lang[]) => {
        let msg = this._ts.translate(lngs.length > 0 ? 'update:' : 'error try later');
        lngs.forEach(l => {
          msg += ` ${l.name}`;
          this._ts.setTranslation(l.schema, l.name);
        });
        return msg;
      }),
      tap(_ => this._reloadList()),
    );
  }

  loadDinoLangs() {
    this.langRows$.pipe(take(1)).subscribe(langs => {
      if (isDevMode()) console.log(`Loaded Languages: ${langs}`);
    });
  }

  private _modified(current: Dic, update: Dic): Dic {
    const res: Dic = {} as Dic;
    const currentKeys = Object.keys(current);
    const updateKeys = Object.keys(update);
    const modifiedKeys = updateKeys.filter(key => currentKeys.indexOf(key) > -1);

    modifiedKeys.forEach((key: string) => {
      if (current[key] !== update[key]) {
        res[key] = update[key];
      }
    });
    return res as Dic;
  }

  private _diff(current: Dic, update: Dic): Dic {
    const res: Dic = {} as Dic;
    const currentKeys = Object.keys(current);
    const updateKeys = Object.keys(update);
    const diffKeys = updateKeys.filter(key => currentKeys.indexOf(key) === -1);

    diffKeys.forEach(key => {
      res[key] = update[key];
    });
    return res as Dic;
  }

  private _reloadList(): void {
    this._currentLangUpdateSchema$.next(null);
    this._refreshEvt.emit();
    this._reloadLangsStoredEvt.emit();
  }
}
