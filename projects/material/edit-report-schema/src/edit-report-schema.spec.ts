import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UntypedFormGroup} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {ReportSchemaManager} from '@dino/core/reports';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {BehaviorSubject, of} from 'rxjs';

import {EditReportSchema, EditReportSchemaModule} from './public_api';

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

describe('Edit ReportSchema', () => {
  let fixtureEditReportSchema: ComponentFixture<EditReportSchema>;
  let editReportSchema: EditReportSchema;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        EditReportSchemaModule,
        RouterTestingModule,
        MatDialogModule,
      ],
      providers: [
        ReportSchemaManager,
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
      ],
    }).compileComponents();

    fixtureEditReportSchema = TestBed.createComponent(EditReportSchema);
    editReportSchema = fixtureEditReportSchema.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureEditReportSchema.whenStable();
    fixtureEditReportSchema.detectChanges();

    expect(editReportSchema).toBeTruthy();
  });

  describe('groups', () => {
    let fgroup: UntypedFormGroup;

    beforeEach(async () => {
      await fixtureEditReportSchema.whenStable();
      fixtureEditReportSchema.detectChanges();
      editReportSchema.formGroup.subscribe(fg => (fgroup = fg));
    });

    it('should store the assigned groups trimmed and without the empty ones', () => {
      editReportSchema.addGroup(fgroup, {
        kind: 'existing',
        group: {name: ' Finance ', description: ' Budget ', color: '#4fd1d9'},
      });
      editReportSchema.addGroup(fgroup, {kind: 'existing', group: {name: 'M&E', description: ''}});
      editReportSchema.addGroup(fgroup, {kind: 'existing', group: {name: '  '}});

      expect((editReportSchema as any)._groupsValue(fgroup)).toEqual([
        {name: 'Finance', description: 'Budget', color: '#4fd1d9'},
        {name: 'M&E', color: '#a3abb5'},
      ]);
    });

    it('should give a new group a color', () => {
      editReportSchema.addGroup(fgroup, {kind: 'create', name: 'Finance'});
      const group = editReportSchema.groupsArray(fgroup).at(0).value;
      expect(group.name).toBe('Finance');
      expect(editReportSchema.groupColors).toContain(group.color);
    });

    it('should reject two groups with the same name', () => {
      editReportSchema.addGroup(fgroup, {kind: 'existing', group: {name: 'Finance'}});
      expect(editReportSchema.groupsArray(fgroup).valid).toBeTrue();

      editReportSchema.addGroup(fgroup, {kind: 'create', name: 'finance '});
      expect(editReportSchema.groupsArray(fgroup).hasError('duplicateGroup')).toBeTrue();
      expect(fgroup.valid).toBeFalse();

      editReportSchema.removeGroup(fgroup, 1);
      expect(editReportSchema.groupsArray(fgroup).valid).toBeTrue();
    });
  });
});
