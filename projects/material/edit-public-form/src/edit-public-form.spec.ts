import {HttpClientTestingModule} from '@angular/common/http/testing';
import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/memory';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Apollo} from 'apollo-angular';

import {EditPublicForm, EditPublicFormModule} from './public_api';
import {AjfFormRendererService} from '@ajf/core/forms';
import {
  FormData,
  FormSchema,
  OnlineFormDataManager,
  OnlineFormSchemaManager,
} from '@dino/core/forms';
import {ActivatedRoute} from '@angular/router';
import {AnimationBuilder, AnimationFactory, AnimationPlayer} from '@angular/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {format} from 'date-fns';

let testDbIdx = 0;

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

const dummyFormSchema: FormSchema = {
  id: 'id',
  name: 'dummyschema',
  label: 'Dummy Schema',
  visibility: 1,
  schema: {},
  created_at: '',
  updated_at: '',
};

class OnlineFormSchemaManagerMock extends OnlineFormSchemaManager {
  override get(_id: string): Observable<FormSchema | null> {
    return of(dummyFormSchema);
  }
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

const animationBuilderMock = {
  build: (_: any) => {
    return {
      create: () => {
        return {
          onDone: () => {},
          play: () => {},
        } as unknown as AnimationPlayer;
      },
    } as unknown as AnimationFactory;
  },
};

const paramsSubject = new BehaviorSubject({
  form_schema_id: 'id',
});

describe('Edit Public Form', () => {
  let fixtureEditPublicForm: ComponentFixture<EditPublicForm>;
  let editPublicForm: EditPublicForm;
  let ajfFrs: AjfFormRendererService;
  let osm: OnlineFormSchemaManager;
  let odm: OnlineFormDataManager;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        EditPublicFormModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        Apollo,
        OnlineFormDataManager,
        {provide: AnimationBuilder, useValue: animationBuilderMock},
        {provide: AuthService, useValue: authServiceMock},
        {provide: OnlineFormSchemaManager, useClass: OnlineFormSchemaManagerMock},
        {provide: ActivatedRoute, useValue: {params: paramsSubject, queryParams: of([])}},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    }).compileComponents();
    osm = TestBed.inject(OnlineFormSchemaManager);
    odm = TestBed.inject(OnlineFormDataManager);
    ajfFrs = TestBed.inject(AjfFormRendererService);
    route = TestBed.inject(ActivatedRoute);
    fixtureEditPublicForm = TestBed.createComponent(EditPublicForm);
    editPublicForm = fixtureEditPublicForm.componentInstance;
    editPublicForm.windowReload = () => null;
  });

  it('should create the component', async () => {
    await fixtureEditPublicForm.whenStable();
    fixtureEditPublicForm.detectChanges();

    expect(editPublicForm).toBeTruthy();
    expect(ajfFrs).toBeTruthy();
    expect(osm).toBeTruthy();
    expect(odm).toBeTruthy();
  });

  it('should call the Ajf Form Renderer "getFormValue" method, and the OnlineFormDataManager "create" method', async () => {
    await fixtureEditPublicForm.whenStable();
    const ajfFrsGetFormValueSpy = spyOn(ajfFrs, 'getFormValue').and.callThrough();
    const odmCreateSpy = spyOn(odm, 'create').and.callThrough();
    const mockFormValue = {
      user_data_ref_id: '',
      form_schema_ref_id: 'id',
      area_ref_id: null,
      case_ref_id: null,
      location_ref_id: null,
      project_ref_id: null,
      organization_ref_id: null,
      form_status_ref_id: null,
      data: Object({}),
      created_at: format(new Date(), 'yyyy-MM-dd'),
    };
    fixtureEditPublicForm.detectChanges();

    editPublicForm.saveForm();

    expect(ajfFrsGetFormValueSpy).toHaveBeenCalledTimes(1);
    expect(odmCreateSpy).toHaveBeenCalledTimes(1);
    expect(odmCreateSpy).toHaveBeenCalledWith(mockFormValue);
  });
});
