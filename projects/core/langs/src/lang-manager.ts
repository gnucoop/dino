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
  shareReplay,
  startWith,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs/operators';

import {Lang, migrationStrategies} from './lang';
import {schema} from './lang-json';
import {defaultLangs, Dic, LangCreate, LangRow} from './utils';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';

const collectionDef = {name: 'lang', collection: {schema, migrationStrategies}};

@Injectable({providedIn: 'root'})
export class LangManager extends DataModelManager<Lang> {
  readonly infoAfterStoredLang$: Observable<any>;
  readonly saveLangEvt = new EventEmitter<void>();
  readonly deleteLangEvt = new EventEmitter<void>();

  private _refreshEvt = new EventEmitter<void>();
  private _reloadLangsStoredEvt = new EventEmitter<void>();
  private _removeLangEvt = new EventEmitter<Lang | null>();

  /**
   * Emit `true` one time when replication completed.
   */
  private _replicated$!: Observable<boolean>;

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

  /**
   * Le langs storate sul db dino
   */
  readonly langsStored$ = new BehaviorSubject<Lang[]>([]);
  readonly langsShowed$: Observable<Lang[]> = combineLatest([
    this.langsStored$,
    this._reloadLangsStoredEvt.pipe(startWith(true)),
  ]).pipe(
    map(([langsStored, _]) => {
      const langsShowed: Lang[] = [];

      langsStored.forEach(l => {
        try {
          this._ts.setTranslation(l.schema, l.name);
        } catch (err) {
          if (isDevMode()) {
            console.log(`Could not set Translations for lang ${l.name}: ${err}`);
          }
          this._ehms.captureErrorMessage(
            `Could not set Translations for lang ${l.name}: ${err}`,
            'error',
          );
        }
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

  /**
   * Osservabile che torna il json visualizzato frutto della composizione
   * del default + jsonScaricato + modifiche ancora non salvate
   */
  readonly currentLangShowed$: Observable<Lang> = combineLatest([
    this.langsShowed$,
    this.currentLangName$,
  ]).pipe(
    map(([langsShowed, currentLangName]) => {
      return langsShowed.filter(langShowed => langShowed.name === currentLangName)[0];
    }),
  );

  /**
   * Lo schema caricato nella sezione update json per aggiornare una lang tramite file json
   */
  private _currentLangUpdateSchema$: BehaviorSubject<Dic | null> = new BehaviorSubject<Dic | null>(
    null,
  );

  readonly currentLangUpdateSchema$: Observable<Dic> = (
    this._currentLangUpdateSchema$ as Observable<Dic>
  ).pipe(filter(l => l != null));

  set currentLangUpdateSchema(updateSchema: Dic) {
    this._currentLangUpdateSchema$.next(updateSchema);
  }

  /**
   * Resets the schema loaded from file
   */
  resetCurrentLangUpdateSchema(): void {
    this._currentLangUpdateSchema$.next(null);
  }

  /**
   * Lo schema salvato sul db di dino della lang corrente
   */
  readonly currentLangStored$: Observable<Lang> = this.currentLangName$.pipe(
    withLatestFrom(this.langsStored$),
    map(([langName, langsStored]) => {
      const currentLangStored = langsStored.filter(l => l.name === langName)[0];
      return currentLangStored;
    }),
  );

  /**
   * Lo schema di default della lang corrente nel json della app
   */
  readonly currentLangDefault$: Observable<Lang> = this.currentLangName$.pipe(
    map(langName => {
      return defaultLangs[langName];
    }),
  );

  /**
   * Tutti gli attributi presenti nel json di aggiornamento ma non presenti
   * sullo schema salvato su dino
   */
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

  /**
   * Tutti gli attributi presenti nel json di aggiornamento che modificano attributi
   * dello schema salvato su dino
   */
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
    private _ds: DataService,
    permissionContextService: PermissionContextService,
    private _ts: TranslocoService,
    private _ehms: ErrorHandlerMessageService,
    @Inject(TRANSLATIONS_CONFIG) private _config: TranslationsConfig,
  ) {
    super(collectionDef, _ds, permissionContextService);

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
            if (lang.schema[key] !== undefined) {
              if (!res[key]) {
                res[key] = {key};
              }
              res[key][lang.name] = lang.schema[key];
            }
          });
        });
        return Object.keys(res).map(key => ({...emptyLangRow, ...res[key]} as LangRow));
      }),
      debounceTime(200),
    );

    this._reloadLangsStoredEvt
      .pipe(
        switchMap(() => this.list()),
        catchError(() => obsOf([])),
        map(r => r.filter(l => !l.is_deleted)),
      )
      .subscribe(langs => {
        langs.forEach(l => {
          try {
            this._ts.setTranslation(l.schema, l.name);
          } catch (err) {
            if (isDevMode()) {
              console.log(`Could not set Translations for lang ${l.name}: ${err}`);
            }
            this._ehms.captureErrorMessage(
              `Could not set Translations for lang ${l.name}: ${err}`,
              'error',
            );
          }
        });
        const plainLangs = langs.map(l => (l as any).toJSON()) as Lang[];
        this.langsStored$.next(plainLangs);
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

    this._reloadLangsStoredEvt.emit();

    this._replicated$ = this._ds.firstReplicationComplete.pipe(
      filter(complete => complete),
      take(1),
      shareReplay(1),
    );

    // Reload langs when first replication completed.
    this._replicated$.subscribe(() => this._reloadLangsStoredEvt.emit());

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
    const apiCall: Observable<Lang | null>[] = [];
    const langs = this.langsStored$.value;

    langs.forEach(lang => {
      // If the key exists in this language doc, remove it
      if (lang.schema && lang.schema[key] !== undefined) {
        const updatedSchema = {...lang.schema};
        delete updatedSchema[key];

        const updatedDoc = {
          id: lang.id,
          schema: updatedSchema,
        };

        apiCall.push(
          this.patch(updatedDoc).pipe(
            catchError(() => obsOf(null)),
            take(1),
          ),
        );
      }
    });

    if (apiCall.length === 0) {
      // No custom translations found for this key, but it might be in defaults.
      // We can't delete from defaults, so we warn the user.
      return obsOf(this._ts.translate('forbidden deleting default key') as string).pipe(
        tap(_ => this._refreshEvt.emit()),
      );
    }

    return forkJoin(apiCall).pipe(
      map((results: (Lang | null)[]) => {
        const updatedLangs = results.filter((l): l is Lang => l !== null);
        if (updatedLangs.length === 0) {
          return this._ts.translate('error try later');
        }

        updatedLangs.forEach(l => {
          const currentFullTranslation = this._ts.getTranslation(l.name) ?? {};
          // rimuovi la key dalla cache locale prima di riscrivere
          const {[key]: _removed, ...rest} = currentFullTranslation;
          this._ts.setTranslation({...rest, ...l.schema}, l.name, {merge: false});
        });

        const currentStored = this.langsStored$.value;
        const optimisticStored = currentStored.map(lang => {
          const updated = updatedLangs.find(l => l.name === lang.name);
          if (updated) {
            return (updated as any).toJSON();
          }
          return lang;
        });
        this.langsStored$.next(optimisticStored as Lang[]);

        return this._ts.translate('key: "{{key}}" removed', {key});
      }),
      tap(_ => this._reloadList()),
    );
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

    return this._replicated$.pipe(
      switchMap(() => this.query({selector: {name: {$eq: lang.name}}})),
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
      take(1),
    );
  }

  updateLang(updates: {[key: string]: string}, key: string): Observable<string> {
    const apiCall: Observable<Lang | null>[] = [];
    const langsStored = this.langsStored$.value;
    const allLangsNames = langsStored.map(l => l.name);

    const isRename = updates['key'] ? updates['key'] !== key : false;
    const newKey = updates['key'] || key;

    allLangsNames.forEach(langName => {
      const langDoc = langsStored.find(l => l.name === langName);
      let schema: {[key: string]: string} = langDoc ? {...langDoc.schema} : {};
      let updated = false;

      // Handle key renaming
      if (isRename) {
        if (schema[key] !== undefined) {
          const val = schema[key];
          delete schema[key];
          schema[newKey] = val;
          updated = true;
        } else if (dinoTranslations[langName] && dinoTranslations[langName][key] !== undefined) {
          // If it was only in defaults, and no new value provided, copy to newKey in DB
          if (updates[langName] === undefined) {
            schema[newKey] = dinoTranslations[langName][key];
            updated = true;
          }
        }
      }

      // Handle value update/addition/deletion
      if (updates[langName] !== undefined) {
        const newValue = updates[langName];
        if (newValue === '') {
          if (schema[newKey] !== undefined) {
            delete schema[newKey];
            updated = true;
          }
        } else if (schema[newKey] !== newValue) {
          schema[newKey] = newValue;
          updated = true;
        }
      }

      if (updated) {
        if (langDoc) {
          apiCall.push(
            this.patch({id: langDoc.id, schema}).pipe(
              catchError(() => obsOf(null)),
              take(1),
            ),
          );
        } else {
          apiCall.push(
            this.create({
              name: langName,
              schema,
              created_at: new Date().toISOString(),
            }).pipe(
              catchError(() => obsOf(null)),
              take(1),
            ),
          );
        }
      }
    });

    if (apiCall.length === 0) {
      return obsOf(this._ts.translate('no changes') as string);
    }

    return forkJoin(apiCall).pipe(
      map((results: (Lang | null)[]) => {
        const updatedLangs = results.filter((l): l is Lang => l !== null);
        if (updatedLangs.length === 0) {
          return this._ts.translate('error try later') as string;
        }

        let msg = this._ts.translate(isRename ? 'key updated:' : 'update:') as string;
        updatedLangs.forEach(l => {
          msg += ` ${l.name}`;
          const currentFullTranslation = this._ts.getTranslation(l.name) ?? {};
          const dinoBase = dinoTranslations[l.name] ?? {};

          this._ts.setTranslation(
            {
              ...currentFullTranslation,
              ...dinoBase,
              ...l.schema,
            },
            l.name,
            {merge: false},
          );
        });

        return msg;
      }),
      tap(_ => this._reloadList()),
    );
  }

  loadDinoLangs() {
    this.langRows$.pipe(take(1)).subscribe();
  }

  private _modified(current: Dic, update: Dic | null): Dic {
    const res: Dic = {} as Dic;
    if (update) {
      const currentKeys = Object.keys(current);
      const updateKeys = Object.keys(update);
      const modifiedKeys = updateKeys.filter(key => currentKeys.indexOf(key) > -1);

      modifiedKeys.forEach((key: string) => {
        if (current[key] !== update[key]) {
          res[key] = update[key];
        }
      });
    }
    return res as Dic;
  }

  private _diff(current: Dic, update: Dic | null): Dic {
    const res: Dic = {} as Dic;
    if (update) {
      const currentKeys = Object.keys(current);
      const updateKeys = Object.keys(update);
      const diffKeys = updateKeys.filter(key => currentKeys.indexOf(key) === -1);

      diffKeys.forEach(key => {
        res[key] = update[key];
      });
    }
    return res as Dic;
  }

  private _reloadList(): void {
    this._currentLangUpdateSchema$.next(null);
    this._refreshEvt.emit();
    this._reloadLangsStoredEvt.emit();
  }
}
