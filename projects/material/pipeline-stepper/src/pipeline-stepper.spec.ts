import {EventEmitter} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {DATA_SERVICE_CONFIG, DataServiceConfig} from '@dino/core/data';
import {FormStatus} from '@dino/core/forms';
import {getRxStorageMemory} from 'rxdb/plugins/memory';
import {BehaviorSubject, firstValueFrom, of} from 'rxjs';
import {PipelineStepperModule, StepperComponent} from './public_api';

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

const mockFormStatus_a: FormStatus = {
  id: 'mock_id_a',
  created_at: '',
  updated_at: '',
  name: 'test_status_a',
  label: 'Test Status A',
  status_level: 0,
};

const mockFormStatus_b: FormStatus = {
  id: 'mock_id_b',
  created_at: '',
  updated_at: '',
  name: 'test_status_b',
  label: 'Test Status B',
  status_level: 1,
};

const mockFormStatus_c: FormStatus = {
  id: 'mock_id_c',
  created_at: '',
  updated_at: '',
  name: 'test_status_c',
  label: 'Test Status C',
  status_level: 2,
};

const mockStatuses: FormStatus[] = [mockFormStatus_a, mockFormStatus_b, mockFormStatus_c];

describe('Stepper Component', () => {
  let fixtureStepper: ComponentFixture<StepperComponent>;
  let stepper: StepperComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PipelineStepperModule],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
      ],
    }).compileComponents();
    fixtureStepper = TestBed.createComponent<StepperComponent>(StepperComponent);
    stepper = fixtureStepper.componentInstance;
  });

  it('should create a Stepper Component', async () => {
    await fixtureStepper.whenStable();
    fixtureStepper.detectChanges();

    expect(stepper).toBeDefined();
  });

  it('should return Pipeline Steps and their correct state from the provided Form Statuses', async () => {
    const spyStepsFromStatuses = spyOn(stepper, 'getStepsFromFormStatuses').and.callThrough();

    await fixtureStepper.whenStable();
    fixtureStepper.detectChanges();

    stepper.setStatuses = mockStatuses;
    stepper.setIsPipeline = true;
    stepper.setCurrentFormStatus = mockFormStatus_b;

    const steps = await firstValueFrom(stepper.steps);
    const firstStepState = await firstValueFrom(stepper.getStepState(steps[0]));
    const lastStepState = await firstValueFrom(stepper.getStepState(steps[2]));

    expect(spyStepsFromStatuses).toHaveBeenCalledTimes(1);
    expect(steps.length).toEqual(3);
    expect(steps[2].label).toEqual(mockStatuses[2].label);
    expect(firstStepState).toEqual('done');
    expect(lastStepState).toEqual('edit-writable');
  });
});
