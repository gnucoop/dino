import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthService} from '@dewco/core/auth';
import {DATA_SERVICE_CONFIG, DataModelManager, DataServiceConfig, Model} from '@dewco/core/data';
import {FormSchemaManager} from '@dewco/core/forms';
import {of} from 'rxjs';

import {EditForm} from './edit-form';
import {EditFormModule} from './edit-form.module';

const authServiceMock = {
  authenticated: of(true),
  getUserInfo: () => {
    return {};
  },
} as unknown as AuthService;

let testDbIdx = 0;

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dewco_datamanager_test_db_${testDbIdx++}`,
      adapter: 'memory',
    },
    syncOptions: {
      url: 'host',
    },
  };
}


describe('Edit Form', () => {
  let fsm: FormSchemaManager;
  let fixtureEditForm: ComponentFixture<EditForm>;
  let editForm: EditForm;

  beforeEach(() => {
    TestBed
        .configureTestingModule({
          imports: [
            EditFormModule,
            HttpClientTestingModule,
            RouterTestingModule,
          ],
          providers: [
            FormSchemaManager,
            {provide: AuthService, useValue: authServiceMock},
            {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
          ],
        })
        .compileComponents();

    fsm = TestBed.inject(FormSchemaManager);
    fixtureEditForm = TestBed.createComponent(EditForm);
    editForm = fixtureEditForm.componentInstance;
  });

  it('should create the component', async () => {
    await fixtureEditForm.whenStable();
    editForm.dataModelManager = fsm as unknown as DataModelManager<Model>;
    fixtureEditForm.detectChanges();

    expect(editForm).toBeTruthy();
    expect(fsm).toBeTruthy();
  });
});
