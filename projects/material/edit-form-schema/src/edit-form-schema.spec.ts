import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UntypedFormGroup} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
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
