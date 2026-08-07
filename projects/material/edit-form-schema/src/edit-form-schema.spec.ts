import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UntypedFormGroup} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {FormDepsEditor} from '@dino/material/form-deps-editor';
import {AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig, InsertModel} from '@dino/core/data';
import {FormSchema, FormSchemaManager, FormStatusManager} from '@dino/core/forms';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {EditFormSchema, EditFormSchemaModule} from './public_api';
import {RxDocument} from 'rxdb';
import {TRANSLATIONS_CONFIG} from '@dino/core/translations';

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
    },
    syncOptions: {
      collection: null,
      replicationIdentifier: 'test-replication',
      url: {http: 'host'},
    },
  };
}

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const authServiceMock = {
  authenticated: of({auth: true, evt: 'init'}),
  authToken: of('test_auth_token'),
  getUserInfo: () => {
    return {};
  },
  resetEvt: of(false),
  logout: () => of(false),
  logoutEvt: new EventEmitter<void>(),
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

class FormSchemaManagerMock extends FormSchemaManager {
  override create(_obj: InsertModel<FormSchema>): Observable<RxDocument<FormSchema> | null> {
    return of(null);
  }
}

describe('Edit FormSchema', () => {
  let fixtureEditFormSchema: ComponentFixture<EditFormSchema>;
  let editFormSchema: EditFormSchema;
  let fsm: FormSchemaManager;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        EditFormSchemaModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      providers: [
        FormStatusManager,
        {provide: AuthService, useValue: authServiceMock},
        {provide: FormSchemaManager, useClass: FormSchemaManagerMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: TRANSLATIONS_CONFIG, useValue: {defaultLanguage: 'eng'}},
      ],
    }).compileComponents();

    fsm = TestBed.inject(FormSchemaManager);
    fixtureEditFormSchema = TestBed.createComponent(EditFormSchema);
    editFormSchema = fixtureEditFormSchema.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureEditFormSchema.whenStable();
    fixtureEditFormSchema.detectChanges();

    expect(editFormSchema).toBeTruthy();
  });

  it('should call the FormSchemaManager create method', async () => {
    await fixtureEditFormSchema.whenStable();
    const createFormSchemaSpy = spyOn(fsm, 'create').and.callThrough();
    fixtureEditFormSchema.detectChanges();

    editFormSchema.save();

    expect(createFormSchemaSpy).toHaveBeenCalledTimes(1);
  });

  it('should host the metrics/relationships editor before any tab is opened', async () => {
    await fixtureEditFormSchema.whenStable();
    fixtureEditFormSchema.detectChanges();

    // The deps editor is declared next to the tab group rather than inside a tab,
    // so it exists from the first render. save() persists relationships through it,
    // and it must not depend on the user having visited a particular tab.
    expect(editFormSchema.depsEditor).toBeTruthy();
    // Its two halves are exposed as templates, projected into the Metrics tab and
    // the Relationships tab respectively.
    expect(editFormSchema.depsEditor!.metricsSections).toBeTruthy();
    expect(editFormSchema.depsEditor!.relationsSection).toBeTruthy();
  });

  it('should open on the Settings tab when creating a new Form Schema', async () => {
    await fixtureEditFormSchema.whenStable();
    fixtureEditFormSchema.detectChanges();

    expect(editFormSchema.selectedTabIndex).toBe(0); // EditorTab.Settings
  });

  it('should switch to the Build tab on goToBuild()', async () => {
    await fixtureEditFormSchema.whenStable();
    fixtureEditFormSchema.detectChanges();

    editFormSchema.goToBuild();

    // Tab order: Settings, Metrics, Status, Build, Relationships.
    expect(editFormSchema.selectedTabIndex).toBe(3); // EditorTab.Build
  });

  // The Build tab's DOM is only attached when that tab is first opened, which when
  // creating a schema happens long after the builder component was created. The
  // Import button relocation and the field-type category headers used to poll for
  // it on a 2s budget and then give up for good; they now wait without a deadline.
  it('should resolve a DOM wait for an element that appears later', async () => {
    await fixtureEditFormSchema.whenStable();
    fixtureEditFormSchema.detectChanges();

    const host = fixtureEditFormSchema.nativeElement as HTMLElement;
    const pending = (editFormSchema as unknown as {
      _whenPresent(s: string): Promise<HTMLElement | null>;
    })._whenPresent('.test-late-element');

    const late = document.createElement('div');
    late.className = 'test-late-element';
    host.appendChild(late);

    await expectAsync(pending).toBeResolvedTo(late);
  });

  // "Generate Report" is pinned to Yes and disabled once an automatic report exists.
  // Disabling must not break Save: Angular drops disabled controls from validation
  // (which gates the Save button) but still exposes their value, which is what the
  // save payload reads.
  it('should keep Generate Report readable and non-blocking while locked', async () => {
    await fixtureEditFormSchema.whenStable();
    const createFormSchemaSpy = spyOn(fsm, 'create').and.callThrough();
    fixtureEditFormSchema.detectChanges();

    let fgroup!: UntypedFormGroup;
    editFormSchema.formGroup.subscribe(fg => (fgroup = fg));
    const control = fgroup.get('generateAutoReport')!;
    const validBefore = fgroup.valid;

    control.setValue(true);
    control.disable();
    fixtureEditFormSchema.detectChanges();

    expect(control.value).toBe(true); // still readable for the save payload
    expect(fgroup.valid).toBe(validBefore); // Save gating unaffected

    editFormSchema.save();

    expect(createFormSchemaSpy).toHaveBeenCalledTimes(1);
  });

  // The relationships and the schema live in two collections with no transaction
  // around them, so the write order decides what a partial failure costs.
  describe('save ordering across the two collections', () => {
    let deps: FormDepsEditor;
    let snackbar: MatSnackBar;

    beforeEach(async () => {
      await fixtureEditFormSchema.whenStable();
      fixtureEditFormSchema.detectChanges();
      deps = editFormSchema.depsEditor!;
      snackbar = TestBed.inject(MatSnackBar);
    });

    /** A saved schema doc, as the manager returns on a successful write. */
    function savedDoc(): RxDocument<FormSchema> {
      return {label: 'Schema one', id: 'schema-1'} as unknown as RxDocument<FormSchema>;
    }

    it('writes the schema before updating an existing relationships document', async () => {
      spyOn(deps, 'pendingWrite').and.returnValue(of('update' as const));
      const order: string[] = [];
      spyOn(fsm, 'create').and.callFake(() => {
        order.push('schema');
        return of(savedDoc());
      });
      spyOn(deps, 'persistRelationships').and.callFake(() => {
        order.push('deps');
        return of('deps-1');
      });

      editFormSchema.save();

      // The schema needs nothing from an existing document, so it goes first: a
      // relationships failure then leaves the schema coherent.
      expect(order).toEqual(['schema', 'deps']);
    });

    it('does not touch the relationships when there is nothing to write', async () => {
      spyOn(deps, 'pendingWrite').and.returnValue(of('none' as const));
      spyOn(fsm, 'create').and.returnValue(of(savedDoc()));
      const persistSpy = spyOn(deps, 'persistRelationships').and.callThrough();

      editFormSchema.save();

      expect(persistSpy).not.toHaveBeenCalled();
    });

    it('creates the relationships document first and folds its id into the schema', async () => {
      spyOn(deps, 'pendingWrite').and.returnValue(of('create' as const));
      spyOn(deps, 'persistRelationships').and.returnValue(of('deps-new'));
      const createSpy = spyOn(fsm, 'create').and.returnValue(of(savedDoc()));
      const discardSpy = spyOn(deps, 'discardCreated').and.returnValue(of(null));

      editFormSchema.save();

      // Creating is the one case the schema write depends on: it needs the new id.
      expect(createSpy.calls.mostRecent().args[0].form_schema_deps_ref_id).toBe('deps-new');
      expect(discardSpy).not.toHaveBeenCalled();
    });

    it('discards a just-created relationships document when the schema write fails', async () => {
      spyOn(deps, 'pendingWrite').and.returnValue(of('create' as const));
      spyOn(deps, 'persistRelationships').and.returnValue(of('deps-new'));
      spyOn(fsm, 'create').and.returnValue(of(null));
      const discardSpy = spyOn(deps, 'discardCreated').and.returnValue(of(null));

      editFormSchema.save();

      // Otherwise it would sit on the db unreferenced, and every retry would add
      // another one: the schema has no ref id to load the previous one from.
      expect(discardSpy).toHaveBeenCalledWith('deps-new');
    });

    it('reports a saved schema whose relationships failed, without leaving the page', async () => {
      spyOn(deps, 'pendingWrite').and.returnValue(of('update' as const));
      spyOn(fsm, 'create').and.returnValue(of(savedDoc()));
      spyOn(deps, 'persistRelationships').and.returnValue(of(null));
      const snackSpy = spyOn(snackbar, 'open').and.callThrough();
      const navigateSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');

      editFormSchema.save();

      // Saying "nothing was saved" would be a lie, and navigating away is the only
      // thing that would actually lose the rows still held by the tables.
      expect(snackSpy.calls.mostRecent().args[0]).toContain('relationships were not');
      expect(navigateSpy).not.toHaveBeenCalled();
      expect(editFormSchema.isSaving).toBe(false);
    });
  });

  it('should release pending DOM waits on destroy', async () => {
    await fixtureEditFormSchema.whenStable();
    fixtureEditFormSchema.detectChanges();

    const pending = (editFormSchema as unknown as {
      _whenPresent(s: string): Promise<HTMLElement | null>;
    })._whenPresent('.element-that-never-appears');

    fixtureEditFormSchema.destroy();

    await expectAsync(pending).toBeResolvedTo(null);
  });
});
