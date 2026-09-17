import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UntypedFormBuilder} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DATA_SERVICE_CONFIG, DataServiceConfig, MetricsService} from '@dino/core/data';
import {FormDataManager, FormStatusManager} from '@dino/core/forms';
import {ProjectManager} from '@dino/core/projects';
import {UserData, UserDataManager} from '@dino/core/users';
import {TranslocoModule} from '@ngneat/transloco';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {RxDocument} from 'rxdb';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {ImportForm} from './public_api';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {AuthService, AuthServiceConfig} from '@dino/core/auth';
import {EventEmitter} from '@angular/core';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';

let testDbIdx = 0;

const formDatasCsv = [
  '"id","user_data_ref_id","created_at","district","sub_county","settlement","parish","village","poc","patient_id","nationality","age","gender","disability_status","disabilities","project_id","project_created_at","project_name","project_parent_id","project_parent_name","project_code","project_sectors_of_intervention","project_donors","project_start_date","project_end_date"',
  '"id","user_ref_id","created_at","District","Sub County","Settlement","Parish","Village","Point of care","Patient id number","Nationality","Age","Gender","Disability Status","Disabilities",,,,,,,,,,',
  ',,,"lamwo","padibe","A","A","A","pnc","6677","ugandans",56,"m","y","[ds01]","b4f2598e-3ec9-451c-9a1a-806cb50ba9b7",,,,,,,,,',
  ',,,"arua","omugo_hciv","Ar","Par","Vil","pnc","3456","refugees",19,"f","n",,,,,,,,,,,',
  ',,,"arua","vurra","aa","aa",,"opd","8989","ugandans",31,"f","n",,,,"Proj3",,,"code03",,,,',
  ',,"2022-03-08","agago","adilang","Sett","Par",,,"1234","ugandans",56,"m","n",,,,"Proj2",,,"code02",,,,',
].join('\n');

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
      collection: null,
      replicationIdentifier: 'test-replication',
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
  bulkCreate: (_: any[]): Observable<{success: any[]; error: any[]}> => {
    return of({success: [], error: []});
  },
};

const formStatusManagerMock = {
  query: (_: any) => {
    return of([]);
  },
};

const metricServiceManagerMock = {
  activeMetrics: new BehaviorSubject<{metricName: string}[]>([{metricName: 'project'}]),
};

/**
 * A simplified project schema: name and code are mandatory, the parent
 * properties are required by the schema but nullable, as in the real metrics.
 */
const projectCollectionSchema = {
  properties: {
    name: {type: 'string'},
    parent_id: {type: ['string', 'null']},
    parent_name: {type: ['string', 'null']},
    code: {type: 'string'},
  },
  required: ['name', 'parent_id', 'parent_name', 'code'],
};

/**
 * Projects already stored, returned by the metric lookup query.
 */
let storedProjects: {[key: string]: any}[] = [];

/**
 * The metrics passed to each bulk creation, one entry per tree level.
 */
let projectBulkCalls: {[key: string]: any}[][] = [];

const projectManagerMock = {
  collectionSchema: projectCollectionSchema,
  query: (_: any) => of(storedProjects),
  bulkCreate: (docs: {[key: string]: any}[]) => {
    projectBulkCalls.push([...docs]);
    const level = projectBulkCalls.length;
    return of({
      success: docs.map((doc, idx) => ({...doc, id: `project-${level}-${idx}`})),
      error: [],
    });
  },
} as unknown as ProjectManager;

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

describe('Import Forms', () => {
  let fixtureImportForm: ComponentFixture<ImportForm>;
  let importForm: ImportForm;

  beforeEach(() => {
    storedProjects = [];
    projectBulkCalls = [];
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, TranslocoModule],
      providers: [
        UntypedFormBuilder,
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: UserDataManager, useValue: userDataManagerMock},
        {provide: FormDataManager, useValue: formDataManagerMock},
        {provide: FormStatusManager, useValue: formStatusManagerMock},
        {provide: MetricsService, useValue: metricServiceManagerMock},
        {provide: ProjectManager, useValue: projectManagerMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
    fixtureImportForm = TestBed.createComponent(ImportForm);
    importForm = fixtureImportForm.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    expect(importForm).toBeTruthy();
  });

  it('should read the csv file and build the column mappings on file selection', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const spyReadFile = spyOn<any>(importForm, '_readFile').and.callThrough();
    const file = new Blob([formDatasCsv], {type: 'text/csv'});
    const excelEvt = {target: {files: [file]}};
    importForm.onExcelfileSelected(excelEvt);
    expect(spyReadFile).toHaveBeenCalledTimes(1);
  });

  it('should start the import forms process with the mapped columns', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const spyProcessData = spyOn<any>(importForm, '_processData').and.callThrough();
    (importForm as any)._file = new Blob([formDatasCsv], {type: 'text/csv'});
    (importForm as any)._rows = [{district: 'lamwo', project_id: 'b4f2598e'}];
    importForm.columnMappings = [
      {column: 'district', field: 'district'},
      {column: 'project_id', field: 'project_id'},
    ];
    importForm.apply();
    expect(spyProcessData).toHaveBeenCalledTimes(1);
    const mappedRows = spyProcessData.calls.mostRecent().args[0];
    expect(mappedRows).toEqual([{district: 'lamwo', project_id: 'b4f2598e'}]);
  });

  it('should not start the import if a field is mapped by more than one column', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const spyProcessData = spyOn<any>(importForm, '_processData').and.callThrough();
    (importForm as any)._file = new Blob([formDatasCsv], {type: 'text/csv'});
    (importForm as any)._rows = [{district: 'lamwo', sub_county: 'padibe'}];
    importForm.columnMappings = [
      {column: 'district', field: 'district'},
      {column: 'sub_county', field: 'district'},
    ];
    importForm.onMappingChange(importForm.columnMappings[1], 'district');
    expect(importForm.duplicateFields).toEqual(['district']);
    importForm.apply();
    expect(spyProcessData).not.toHaveBeenCalled();
  });

  it('should drop the unmapped columns from the imported rows', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    importForm.columnMappings = [
      {column: 'District', field: 'district'},
      {column: 'notes', field: null},
    ];
    const mappedRows = (importForm as any)._applyColumnMappings([
      {District: 'lamwo', notes: 'to be ignored'},
    ]);
    expect(mappedRows).toEqual([{district: 'lamwo'}]);
  });

  it('should map table cell columns to their name__row__column data keys', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    importForm.columnMappings = [
      {column: 'q1', field: 'myTable__0__0'},
      {column: 'q2', field: 'myTable__0__1'},
      {column: 'q3', field: 'myTable__1__0'},
    ];
    const mappedRows = (importForm as any)._applyColumnMappings([{q1: 'a', q2: 'b', q3: 'c'}]);
    expect(mappedRows).toEqual([{myTable__0__0: 'a', myTable__0__1: 'b', myTable__1__0: 'c'}]);
  });

  it('should collect the parent references of the new metrics', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const info = (importForm as any)._getMetricsToBeCreated(
      [
        {project_name: 'Child', project_parent_name: 'Parent', project_code: 'c2'},
        {project_name: 'Other', project_parent_id: 'p-existing', project_code: 'c3'},
      ],
      ['project'],
    );
    expect(info.requiredParentNamesByType).toEqual({project: ['Parent']});
    expect(info.requiredParentIdsByType).toEqual({project: ['p-existing']});
  });

  it('should create a metric parent defined by a later row of the same file', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const bulkSpy = spyOn(formDataManagerMock, 'bulkCreate').and.callFake((forms: any[]) =>
      of({success: forms, error: []}),
    );
    const rows = [
      {project_name: 'Child', project_parent_name: 'Parent', project_code: 'c2'},
      {project_name: 'Parent', project_code: 'c1'},
    ];
    const info = (importForm as any)._getMetricsToBeCreated(rows, ['project']);
    (importForm as any)._importFormDataRows(rows, info, false, []);

    // One bulk creation per tree level: the parent first, then the child
    expect(projectBulkCalls.length).toBe(2);
    expect(projectBulkCalls[0].map(m => m['name'])).toEqual(['Parent']);
    expect(projectBulkCalls[1].map(m => m['name'])).toEqual(['Child']);
    expect(projectBulkCalls[1][0]['parent_id']).toBe('project-1-0');

    const forms = bulkSpy.calls.mostRecent().args[0];
    expect(forms.length).toBe(2);
    expect(forms[0].project_ref_id).toBe('project-2-0');
    expect(forms[1].project_ref_id).toBe('project-1-0');
  });

  it('should reuse a metric created by a previous row as parent, with the reuse flag on', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const bulkSpy = spyOn(formDataManagerMock, 'bulkCreate').and.callFake((forms: any[]) =>
      of({success: forms, error: []}),
    );
    importForm.importForm.controls['reuseMetricName'].setValue(true);
    (importForm as any)._metricMustBeUnique = true;
    // Neither metric exists yet: the parent of the second row is the metric
    // created by the first one
    const rows = [
      {project_name: 'Alpha', project_code: 'c1'},
      {project_name: 'Beta', project_parent_name: 'Alpha', project_code: 'c2'},
    ];
    const info = (importForm as any)._getMetricsToBeCreated(rows, ['project']);
    (importForm as any)._importFormDataRows(rows, info, false, []);

    expect(projectBulkCalls.length).toBe(2);
    expect(projectBulkCalls[0].map(m => m['name'])).toEqual(['Alpha']);
    expect(projectBulkCalls[1].map(m => m['name'])).toEqual(['Beta']);
    expect(projectBulkCalls[1][0]['parent_id']).toBe('project-1-0');
    expect(projectBulkCalls[1][0]['parent_name']).toBe('Alpha');
    // Both metrics were created: a clean success, with nothing to report
    expect(importForm.outcome!.status).toBe('success');
    expect(importForm.outcome!.warnings).toEqual([]);

    const forms = bulkSpy.calls.mostRecent().args[0];
    expect(forms[0].project_ref_id).toBe('project-1-0');
    expect(forms[1].project_ref_id).toBe('project-2-0');
  });

  it('should fill in the parent name of a metric whose parent is referenced by id', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    storedProjects = [{id: 'p-existing', name: 'Stored parent'}];
    const rows = [{project_name: 'Child', project_parent_id: 'p-existing', project_code: 'c2'}];
    const info = (importForm as any)._getMetricsToBeCreated(rows, ['project']);
    (importForm as any)._importFormDataRows(rows, info, false, []);

    expect(projectBulkCalls.length).toBe(1);
    expect(projectBulkCalls[0][0]['parent_name']).toBe('Stored parent');
  });

  it('should not import a row whose metric could not be created', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const bulkSpy = spyOn(formDataManagerMock, 'bulkCreate').and.callFake((forms: any[]) =>
      of({success: forms, error: []}),
    );
    const rows = [
      {project_name: 'Alpha', project_code: 'c1'},
      {project_name: 'Child', project_parent_name: 'Missing', project_code: 'c2'},
    ];
    const info = (importForm as any)._getMetricsToBeCreated(rows, ['project']);
    (importForm as any)._importFormDataRows(rows, info, false, []);

    // Alpha has no parent and is created, Child is deferred and never created
    expect(projectBulkCalls.length).toBe(1);
    expect(projectBulkCalls[0].map(m => m['name'])).toEqual(['Alpha']);
    // Only the row whose metric exists is imported: no form data with an empty metric
    const forms = bulkSpy.calls.mostRecent().args[0];
    expect(forms.length).toBe(1);
    expect(forms[0].project_ref_id).toBe('project-1-0');
    // The outcome is shown in the result step, not in a snackbar the user cannot read
    expect(importForm.step).toBe(3);
    // One row out of the two of the file made it: a partial import, not a success
    expect(importForm.outcome!.status).toBe('partial');
    expect(importForm.outcome!.message).toContain('1/2');
    expect(importForm.outcome!.message).toContain('File partially imported');
    expect(importForm.outcome!.message).not.toContain('File imported successfully');
    // One single table: the reason travels with the row, there is no separate
    // group listing the metrics with an invalid parent
    expect(importForm.outcome!.warnings.length).toBe(1);
    const skipped = importForm.outcome!.warnings[0];
    expect(skipped.label).toContain('Rows not imported');
    // The second data row of the file is the third spreadsheet row
    expect(skipped.kind).toBe('rows');
    expect(skipped.items).toEqual([
      {row: 3, text: 'project "Child": en.metric with invalid parent'},
    ]);
    expect(skipped.count).toBe(1);
    // The counters feed the tiles at the top of the result step
    expect(importForm.outcome!.counts).toEqual({
      fileRows: 2,
      imported: 1,
      rejected: 1,
      metricsCreated: 1,
    });
    // The table and the counters already say it: no sentence repeating them
    expect(importForm.outcome!.detail).toBeUndefined();
  });

  it('should group the missing references by category in the result step', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const missing = (importForm as any)._checkIfMissingIds(
      ['u1', 'u2'],
      [{id: 'u1'}],
      {project: ['p1', 'p2']},
      [],
      ['draft', 'closed'],
      [{name: 'draft'}],
    );
    expect(missing).toBe(true);
    const warnings = importForm.outcome!.warnings;
    // One group per category, all of them kept: the user group used to be
    // overwritten by the form status one
    expect(warnings.length).toBe(3);
    expect(warnings.every(w => w.kind === 'values')).toBe(true);
    expect(warnings[0].items).toEqual([{text: 'u2'}]);
    expect(warnings[1].label).toContain('project');
    expect(warnings[1].items).toEqual([{text: 'p1'}, {text: 'p2'}]);
    expect(warnings[2].items).toEqual([{text: 'closed'}]);
  });

  it('should cap a group and report how many entries are hidden', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const ids = Array.from({length: 14}, (_, i) => `id-${i}`);
    (importForm as any)._checkIfMissingIds([], [], {project: ids}, [], [], []);
    const group = importForm.outcome!.warnings[0];
    // Ten per group, as in the mockup, but the count stays the real one
    expect(group.count).toBe(14);
    expect(group.items.length).toBe(10);
    expect(importForm.hiddenItems(group)).toBe(4);
  });

  it('should not leave the result step until the user closes it', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    spyOn(formDataManagerMock, 'bulkCreate').and.callFake((forms: any[]) =>
      of({success: forms, error: []}),
    );
    const importedSpy = jasmine.createSpy('imported');
    importForm.imported.subscribe(importedSpy);
    const rows = [
      {project_name: 'Alpha', project_code: 'c1'},
      {project_name: 'Child', project_parent_name: 'Missing', project_code: 'c2'},
    ];
    const info = (importForm as any)._getMetricsToBeCreated(rows, ['project']);
    (importForm as any)._importFormDataRows(rows, info, false, []);

    expect(importForm.step).toBe(3);
    expect(importedSpy).not.toHaveBeenCalled();
    importForm.closeOutcome();
    expect(importedSpy).toHaveBeenCalledTimes(1);
  });

  it('should show the result step also when everything is imported', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    spyOn(formDataManagerMock, 'bulkCreate').and.callFake((forms: any[]) =>
      of({success: forms, error: []}),
    );
    const importedSpy = jasmine.createSpy('imported');
    importForm.imported.subscribe(importedSpy);
    const rows = [{project_name: 'Alpha', project_code: 'c1'}];
    const info = (importForm as any)._getMetricsToBeCreated(rows, ['project']);
    (importForm as any)._importFormDataRows(rows, info, false, []);

    expect(importForm.step).toBe(3);
    expect(importForm.outcome!.status).toBe('success');
    expect(importForm.outcome!.warnings).toEqual([]);
    // Nothing was left out: the total is not repeated
    expect(importForm.outcome!.message).toContain('1 ');
    expect(importForm.outcome!.message).not.toContain('/');
    // The wizard is left by hand, so that the result can be read
    expect(importedSpy).not.toHaveBeenCalled();
    importForm.closeOutcome();
    expect(importedSpy).toHaveBeenCalledTimes(1);
  });

  it('should not import anything when no row can be linked to its metric', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const bulkSpy = spyOn(formDataManagerMock, 'bulkCreate').and.callFake((forms: any[]) =>
      of({success: forms, error: []}),
    );
    const rows = [{project_name: 'Child', project_parent_name: 'Missing', project_code: 'c2'}];
    const info = (importForm as any)._getMetricsToBeCreated(rows, ['project']);
    (importForm as any)._importFormDataRows(rows, info, false, []);

    expect(bulkSpy).not.toHaveBeenCalled();
    expect(importForm.step).toBe(3);
    expect(importForm.outcome!.status).toBe('error');
    expect(importForm.outcome!.message).toContain('File not imported!');
    expect(importForm.outcome!.warnings.some(w => w.label.includes('Rows not imported'))).toBe(
      true,
    );
    // A failed import can be corrected without re-uploading the file
    importForm.columnMappings = [{column: 'project_name', field: 'project_name'}];
    importForm.backToMapping();
    expect(importForm.step).toBe(2);
    expect(importForm.outcome).toBeNull();
  });

  it('should still import a row that names no metric at all', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const bulkSpy = spyOn(formDataManagerMock, 'bulkCreate').and.callFake((forms: any[]) =>
      of({success: forms, error: []}),
    );
    (importForm as any)._importFormData(
      [{district: 'lamwo'}],
      ['project'],
      'dino_user_id',
      false,
      null,
      [],
    );
    const forms = bulkSpy.calls.mostRecent().args[0];
    expect(forms.length).toBe(1);
    expect(forms[0].project_ref_id).toBeNull();
  });

  it('should import the dinoinvalid column as a boolean flag', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const bulkSpy = spyOn(formDataManagerMock, 'bulkCreate').and.callFake((forms: any[]) =>
      of({success: forms, error: []}),
    );
    (importForm as any)._importFormData(
      [
        {dinoinvalid: 'TRUE', district: 'lamwo'},
        {dinoinvalid: 'false', district: 'arua'},
        {district: 'agago'},
      ],
      [],
      'dino_user_id',
      false,
      null,
      [],
    );
    const forms = bulkSpy.calls.mostRecent().args[0];
    expect(forms[0].data).toEqual({dinoinvalid: true, district: 'lamwo'});
    // Like the form editors, the flag is written only when the record is invalid
    expect(forms[1].data).toEqual({district: 'arua'});
    expect(forms[2].data).toEqual({district: 'agago'});
  });

  it('should ignore the metrics not declared by the form schema', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const bulkSpy = spyOn(formDataManagerMock, 'bulkCreate').and.callFake((forms: any[]) =>
      of({success: forms, error: []}),
    );
    (importForm as any)._schemaMetrics = [];
    expect((importForm as any)._activeMetrics).toEqual([]);
    (importForm as any)._importFormData(
      [{district: 'lamwo', project_id: 'b4f2598e'}],
      (importForm as any)._activeMetrics,
      'dino_user_id',
      false,
      null,
      [],
    );
    expect(bulkSpy.calls.mostRecent().args[0][0].project_ref_id).toBeNull();
  });

  it('should show the field name and search it, with the label in the tooltip', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    // No dictionary is loaded in the tests: keep the key as the translation
    spyOn((importForm as any)._ts, 'translate').and.callFake((key: string) => key);
    (importForm as any)._fieldLabels = {district: '<b>District</b> of residence'};
    importForm.availableFields = ['district', 'created_at'];

    // The option shows the field key, the readable label goes in the tooltip
    expect(importForm.fieldName('district')).toBe('district');
    // The markup left by the rich text editor must not reach the tooltip
    expect(importForm.fieldLabel('district')).toBe('District of residence');
    // A Dino field has no schema label: it keeps its raw key on both
    expect(importForm.fieldName('created_at')).toBe('created_at');
    expect(importForm.fieldLabel('created_at')).toBe('created_at');

    // The select search matches the field name, the value shown in the option
    importForm.fieldFilterCtrl.setValue('distr');
    expect(importForm.isFieldVisible('district')).toBe(true);
    expect(importForm.isFieldVisible('created_at')).toBe(false);
    // Not the label, which is only in the tooltip
    importForm.fieldFilterCtrl.setValue('residence');
    expect(importForm.isFieldVisible('district')).toBe(false);
  });
});
