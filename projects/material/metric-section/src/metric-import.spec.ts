import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AreaManager} from '@dino/core/areas';
import {AuthServiceConfig, AUTH_SERVICE_CONFIG} from '@dino/core/auth';
import {DataService, PermissionContextService} from '@dino/core/data';
import {UserGroup, UserGroupManager} from '@dino/core/users';
import {RxDocument} from 'rxdb';
import {Observable, of} from 'rxjs';

import {MetricImport, MetricImportModule} from './public_api';

const authServiceConfig: AuthServiceConfig = {
  host: 'http://test-auth-backend',
  applicationId: 'applicationId',
  apiKey: 'apiKey',
  retryRefreshTime: 5000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
};

const dataServiceMock = {
  createCollection: () => of(true),
  find: () => of({exec: () => Promise.resolve({})}),
} as unknown as DataService;

const userGroupManagerMock = {
  getActiveUserGroups: () => of([]),
  addToContext: (_: {[key: string]: any}): void => {},
  update: (_: UserGroup): Observable<RxDocument<UserGroup, {}> | null> => of(null),
  isActiveUserAdmin(_roles: string[] = ['admin']): Observable<boolean> {
    return of(true);
  },
} as unknown as UserGroupManager;

const permissionContextServiceMock = {} as PermissionContextService;

const mockDialogRef = {
  close: () => of(null),
  open: () => of(null),
  backdropClick: () => of(null),
};

const metricsCsv = [
  '"project_name","project_parent_name","project_code","project_start_date","project_end_date"',
  '"PRJ1",,"Code1","2024-01-01","2024-12-20"',
].join('\n');

describe('Metric Import', () => {
  let fixtureImport: ComponentFixture<MetricImport>;
  let importMetrics: MetricImport;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MetricImportModule,
        RouterTestingModule,
        MatDialogModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: UserGroupManager, useValue: userGroupManagerMock},
        {provide: MatDialogRef, useValue: mockDialogRef},
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            metricManager: new AreaManager(dataServiceMock, permissionContextServiceMock),
            metricName: 'area',
          },
        },
      ],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    fixtureImport = TestBed.createComponent<MetricImport>(MetricImport);
    importMetrics = fixtureImport.componentInstance;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', async () => {
    await fixtureImport.whenStable();
    fixtureImport.detectChanges();
    expect(importMetrics).toBeTruthy();
  });

  it('should start the import metrics process from csv file', async () => {
    await fixtureImport.whenStable();
    fixtureImport.detectChanges();
    const spyImportXlsx = spyOn<any>(importMetrics, '_importXlsx').and.callThrough();
    const file = new Blob([metricsCsv], {type: 'text/csv'});
    const metricsFile: File = new File([file], 'metrics_import_test.csv');
    const excelEvt = {target: {files: [metricsFile]}};
    importMetrics.onExcelfileSelected(excelEvt);
    importMetrics.apply();
    expect(spyImportXlsx).toHaveBeenCalledTimes(1);
  });

  it('should not strip the collection schema while reading the rows', async () => {
    await fixtureImport.whenStable();
    fixtureImport.detectChanges();
    const manager = (importMetrics as any)._metricManager as AreaManager;
    (importMetrics as any)._getMetricsToBeCreated([{area_name: 'AREA1', area_parent_name: 'ROOT'}]);
    // The auto generated props must be filtered out, not deleted from the
    // shared collection schema
    expect(Object.keys(manager.collectionSchema.properties)).toContain('id');
    expect(Object.keys(manager.collectionSchema.properties)).toContain('updated_at');
  });

  it('should split the rows by parent and collect the parent references', async () => {
    await fixtureImport.whenStable();
    fixtureImport.detectChanges();
    const info = (importMetrics as any)._getMetricsToBeCreated([
      {area_name: 'ROOT'},
      {area_name: 'CHILD', area_parent_name: 'ROOT'},
      {area_name: 'OTHER', area_parent_id: 'a-existing'},
    ]);
    expect(info.newMetrics.map((m: any) => m.name)).toEqual(['ROOT']);
    expect(info.newMetricsWithParent.map((m: any) => m.name)).toEqual(['CHILD', 'OTHER']);
    expect(info.requiredMetricParentNames).toEqual(['ROOT']);
    expect(info.requiredMetricParentIds).toEqual(['a-existing']);
  });
});
