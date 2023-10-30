import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UntypedFormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {FormDataManager, FormSchema, FormSchemaVisibility} from '@dino/core/forms';
import {UserData, UserDataManager} from '@dino/core/users';
import {TranslocoModule} from '@ngneat/transloco';
import {getRxStorageMemory} from 'rxdb/plugins/memory';
import {RxDocument} from 'rxdb';
import {of} from 'rxjs';

import {ExportList} from './public_api';
import {BreakpointObserverModule} from '@dino/material/breakpoint-observer';

import {Data} from './export-interface';
import {AjfField} from '@ajf/core/forms';

let testDbIdx = 0;

const mockDialogData = {
  formSchema: 'test_schema_id',
};

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
    },
    syncOptions: {
      url: {http: 'host'},
    },
  };
}

const mockDialogRef = {
  close: () => of(null),
  open: () => of(null),
  backdropClick: () => of(null),
};

const dummyUserData: RxDocument<UserData> = {
  id: 'dino_user_id',
  email: 'user@dino.gnu',
  full_name: 'dino_user',
  user_group_ids: ['1', '2', '3'],
  created_at: '',
  updated_at: '',
} as RxDocument<UserData>;

const userDataManagerMock = {
  getActiveUserData: () => of(dummyUserData),
} as unknown as UserDataManager;

const formDataManagerMock = {
  bulkCreate: (_: any[]) => {
    return of({success: [], error: []});
  },
};

const testAjfSchema = {
  'nodes': [
    {
      'id': 1,
      'name': '_1',
      'label': 'DUMMY FILTER GROUP',
      'nodes': [
        {
          'id': 101,
          'name': 'dob',
          'size': 'normal',
          'label': 'DOB',
          'parent': 1,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': [{'condition': 'true'}],
        },
        {
          'id': 102,
          'name': 'first_name',
          'size': 'normal',
          'label': 'first name',
          'parent': 101,
          'editable': true,
          'nodeType': 0,
          'fieldType': 0,
          'parentNode': 0,
          'validation': {'notEmpty': true, 'conditions': []},
          'visibility': {'condition': 'true'},
          'defaultValue': null,
          'conditionalBranches': [{'condition': 'true'}],
        },
      ],
      'parent': 0,
      'nodeType': 3,
      'parentNode': 0,
      'visibility': {'condition': 'true'},
      'conditionalBranches': [{'condition': 'true'}],
    },
  ],
  'choicesOrigins': [],
};

export const formSchema: FormSchema = {
  id: '1',
  name: 'test_schema',
  schema: testAjfSchema,
  created_at: '',
  updated_at: '',
  visibility: FormSchemaVisibility.Private,
};

export const formData: Data[] = [
  {
    data: {dob: '2023-05-24', first_name: 'test1'},
    created_at: '2023-09-11',
    updated_at: '2023-09-12T08:01:25.553255+00:00',
    form_schema_ref_id: 'c8c53714-1f46-41e9-beed-db49ac9da78c',
    id: '0d7f2a84-0002-49d1-b6ca-58a4e90075d8',
    is_deleted: false,
  },
  {
    data: {dob: '2022-02-28', first_name: 'test2'},
    created_at: '2023-09-10',
    updated_at: '2023-09-13T08:01:25.553255+00:00',
    form_schema_ref_id: 'c8c53714-1f46-41e9-beed-db49ac9da78c',
    id: '0d7f2a84-0002-49d1-b6ca-58a4e90075d9',
    is_deleted: false,
  },
];

describe('Export Forms', () => {
  let fixtureImportForm: ComponentFixture<ExportList>;
  let exportForm: ExportList;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, TranslocoModule, BreakpointObserverModule],
      providers: [
        UntypedFormBuilder,
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: UserDataManager, useValue: userDataManagerMock},
        {provide: FormDataManager, useValue: formDataManagerMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData},
      ],
    }).compileComponents();
    fixtureImportForm = TestBed.createComponent(ExportList);
    exportForm = fixtureImportForm.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    expect(exportForm).toBeTruthy();
  });

  it('should start the export csv forms process', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const spyExportCsv = spyOn<any>(exportForm, '_buildCsv').and.callThrough();

    spyOn<any>(exportForm, '_getFieldsFromTabs').and.callFake(() => {
      return testAjfSchema.nodes[0].nodes as unknown[] as AjfField[];
    });

    exportForm.data = formData;
    exportForm.formSchema = formSchema;
    exportForm.export();
    expect(spyExportCsv).toHaveBeenCalledTimes(1);
  });
});
