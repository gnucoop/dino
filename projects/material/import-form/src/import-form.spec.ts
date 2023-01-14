import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UntypedFormBuilder} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DATA_SERVICE_CONFIG, DataServiceConfig, MetricsService} from '@dino/core/data';
import {FormDataManager, FormStatusManager} from '@dino/core/forms';
import {UserData, UserDataManager} from '@dino/core/users';
import {TranslocoModule} from '@ngneat/transloco';
import {getRxStorageMemory} from 'rxdb/plugins/memory';
import {RxDocument} from 'rxdb';
import {BehaviorSubject, of} from 'rxjs';

import {ImportForm} from './public_api';

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

const formStatusManagerMock = {
  query: (_: any) => {
    return of([]);
  },
};

const metricServiceManagerMock = {
  activeMetrics: new BehaviorSubject<{metricName: string}[]>([{metricName: 'project'}]),
};

describe('Import Forms', () => {
  let fixtureImportForm: ComponentFixture<ImportForm>;
  let importForm: ImportForm;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, TranslocoModule],
      providers: [
        UntypedFormBuilder,
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: UserDataManager, useValue: userDataManagerMock},
        {provide: FormDataManager, useValue: formDataManagerMock},
        {provide: FormStatusManager, useValue: formStatusManagerMock},
        {provide: MetricsService, useValue: metricServiceManagerMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData},
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

  it('should start the import forms process from csv file', async () => {
    await fixtureImportForm.whenStable();
    fixtureImportForm.detectChanges();
    const spyImportXlsx = spyOn<any>(importForm, '_importXlsx').and.callThrough();
    const file = new Blob([formDatasCsv], {type: 'text/csv'});
    const excelEvt = {target: {files: [file]}};
    importForm.onExcelfileSelected(excelEvt);
    importForm.apply();
    expect(spyImportXlsx).toHaveBeenCalledTimes(1);
  });
});
