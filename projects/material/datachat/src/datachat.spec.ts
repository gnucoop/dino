import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataChatModule} from './datachat.module';
import {DataChat} from './datachat';
import {DataChatQA} from './datachat.interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {AUTH_SERVICE_CONFIG, AuthService, AuthServiceConfig} from '@dino/core/auth';
import {BehaviorSubject, of} from 'rxjs';
import {EventEmitter} from '@angular/core';
import {
  DATA_SERVICE_CONFIG,
  DataServiceConfig,
  Model,
  PANDINO_SERVICE_CONFIG,
  PandinoConfig,
} from '@dino/core/data';
import {getRxStorageMemory} from 'rxdb/plugins/storage-memory';
import {RxJsonSchema} from 'rxdb';
import {STRIPE_PAYMENT_CONFIG, StripePaymentConfig} from '@dino/material/stripe-payment';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideRouter} from '@angular/router';

let testDbIdx = 0;

const collectionName = 'dummymodel';
interface DummyModel extends Model {
  name: string;
  age?: number;
  author?: string;
}
const dummySchema: RxJsonSchema<DummyModel> = {
  title: 'dummy schema',
  version: 0,
  description: 'describe a dummy model',
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: {type: 'string', maxLength: 200},
    name: {type: 'string', maxLength: 200},
    age: {type: 'number'},
    author: {type: 'string'},
    created_at: {type: 'string'},
    updated_at: {type: ['string', 'null']},
    is_deleted: {type: 'boolean'},
    _deleted: {type: 'boolean'},
  },
  indexes: ['name'],
};
const collection = {name: collectionName, collection: {schema: dummySchema}};

function dataServiceConfig(): DataServiceConfig {
  return {
    databaseCreateOptions: {
      name: `dino_datamanager_test_db_${testDbIdx++}`,
      storage: getRxStorageMemory(),
    },
    syncOptions: {
      collection,
      url: {http: 'host'},
      replicationIdentifier: 'test-replication',
    },
  };
}

const stripePaymentConfig: StripePaymentConfig = {
  stripeKey: '',
  gnuPayUrl: '',
  pandinoTokenID: '',
};

const pandinoConfig: PandinoConfig = {
  pandinoUrl: '',
  pandinoGptNamespaces: [],
};

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
    return {id: '1', email: 'test@test.com'};
  },
  resetEvt: of(false),
  logout: () => of(false),
  logoutEvt: new EventEmitter<void>(),
  tokenRefreshedEvt: new EventEmitter<void>(),
  hasValidAuthToken: () => true,
  _authConfig: new BehaviorSubject<AuthServiceConfig>(authServiceConfig),
  authConfig: authServiceConfig,
} as unknown as AuthService;

describe('Data Chat', () => {
  let fixtureDataChat: ComponentFixture<DataChat>;
  let dataChat: DataChat;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, DataChatModule],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
        {provide: DATA_SERVICE_CONFIG, useValue: dataServiceConfig()},
        {provide: AUTH_SERVICE_CONFIG, useValue: authServiceConfig},
        {provide: STRIPE_PAYMENT_CONFIG, useValue: stripePaymentConfig},
        {provide: PANDINO_SERVICE_CONFIG, useValue: pandinoConfig},
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    fixtureDataChat = TestBed.createComponent(DataChat);
    dataChat = fixtureDataChat.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create the component', async () => {
    await fixtureDataChat.whenStable();
    fixtureDataChat.detectChanges();

    expect(dataChat).toBeTruthy();
  });

  it('should send a post request to validate the API key', async () => {
    await fixtureDataChat.whenStable();
    fixtureDataChat.detectChanges();

    dataChat.baseDataChatAPIurl = 'http://127.0.0.1:5000';

    dataChat.sendAPIKey('key_code');

    const req = httpTestingController.expectOne('http://127.0.0.1:5000/validateapikey');
    const reqHeaders = req.request.headers;
    expect(req.request.method).toEqual('POST');
    expect(reqHeaders.keys()).toEqual(['X-API-KEY', 'X-USER-EMAIL']);
  });

  it('should add a chat question to the chat history', async () => {
    await fixtureDataChat.whenStable();
    fixtureDataChat.detectChanges();
    let addHistorySpy = spyOn<any>(dataChat, '_addToHistory').and.callThrough();

    dataChat.chat('test_question');
    await fixtureDataChat.whenStable();
    fixtureDataChat.detectChanges();

    expect(addHistorySpy).toHaveBeenCalledWith({question: 'test_question'});
    expect(dataChat.history.length).toEqual(1);
  });

  describe('preview and export info', () => {
    const previewInfo = (response: any) =>
      (dataChat as any)._previewInfoFromResponse(response) as DataChatQA;

    it('should map the preview info of a truncated dataframe', () => {
      const info = previewInfo({
        type: 'dataframe',
        value: [
          {city: 'c0', n: 0},
          {city: 'c1', n: 1},
        ],
        total_rows: 340,
        total_columns: 2,
        preview_rows: 20,
        truncated: true,
        download_url: '/datachat/export/bf80bb41d8214522b0d38bca61afbd26',
        download_filename: 'cities.csv',
      });

      expect(info.truncated).toBeTrue();
      expect(info.totalRows).toEqual(340);
      expect(info.totalColumns).toEqual(2);
      expect(info.previewRows).toEqual(20);
      expect(info.previewColumns).toEqual(2);
      expect(info.downloadUrl).toEqual('/datachat/export/bf80bb41d8214522b0d38bca61afbd26');
      expect(info.downloadFilename).toEqual('cities.csv');
      expect(info.note).toBeUndefined();
    });

    it('should map a complete dataframe with no export', () => {
      const info = previewInfo({
        type: 'dataframe',
        value: [{city: 'Roma', n: 1}],
        total_rows: 2,
        total_columns: 2,
        preview_rows: 2,
        truncated: false,
        download_url: null,
        download_filename: null,
      });

      expect(info.truncated).toBeFalse();
      expect(info.downloadUrl).toBeUndefined();
      expect(info.downloadFilename).toBeUndefined();
    });

    it('should not infer the truncated flag from the row counts', () => {
      const info = previewInfo({
        type: 'dataframe',
        value: [{city: 'Roma'}],
        total_rows: 500,
        preview_rows: 20,
        truncated: false,
      });

      expect(info.truncated).toBeFalse();
    });

    it('should count the columns actually displayed', () => {
      const info = previewInfo({
        type: 'dataframe',
        value: [{txt: 'ottimo servizio', sentiment: 'positive', score: 0.95}],
        total_columns: 14,
      });

      expect(info.previewColumns).toEqual(3);
      expect(info.totalColumns).toEqual(14);
    });

    it('should keep a note of a complete result and tolerate unknown fields', () => {
      const note = '12 rows could not be analyzed: their sentiment is empty, not neutral.';
      const info = previewInfo({
        type: 'dataframe',
        value: [{txt: 'mai piu', sentiment: null}],
        truncated: false,
        note,
        some_future_field: {nested: true},
      });

      expect(info.note).toEqual(note);
      expect(info.truncated).toBeFalse();
    });

    it('should map an export of a text answer', () => {
      const info = previewInfo({
        type: 'str',
        value: 'Export pronto: 340 righe.',
        download_url: '/datachat/export/abc123',
        download_filename: 'dataset.csv',
      });

      expect(info.downloadUrl).toEqual('/datachat/export/abc123');
      expect(info.downloadFilename).toEqual('dataset.csv');
      expect(info.previewColumns).toBeUndefined();
    });

    it('should default to no preview info for a plain text answer', () => {
      const info = previewInfo({type: 'str', value: 'Questo dataset contiene...'});

      expect(info.truncated).toBeFalse();
      expect(info.totalRows).toBeUndefined();
      expect(info.downloadUrl).toBeUndefined();
      expect(info.note).toBeUndefined();
      expect(info.charts).toBeUndefined();
    });
  });

  describe('charts', () => {
    const chartSpec = (label: string) => ({
      type: 'bar',
      labels: ['1', '2'],
      datasets: [{label, data: [20, 71]}],
      title: label,
    });
    const previewInfo = (response: any) =>
      (dataChat as any)._previewInfoFromResponse(response) as DataChatQA;

    it('should map the charts of a text answer', () => {
      const info = previewInfo({
        type: 'str',
        value: '### Analisi del dataset',
        charts: [chartSpec('Soddisfazione'), chartSpec('Media per programma')],
      });

      expect(info.charts?.length).toEqual(2);
      expect(info.charts![0].title).toEqual('Soddisfazione');
    });

    it('should map the charts of a dataframe answer', () => {
      const info = previewInfo({
        type: 'dataframe',
        value: [{programma: 'INTELLIGENZA ARTIFICIALE', media: 3.573}],
        total_rows: 8,
        truncated: false,
        charts: [chartSpec('Soddisfazione media')],
      });

      expect(info.charts?.length).toEqual(1);
      expect(info.totalRows).toEqual(8);
    });

    it('should map unprompted charts, whatever the answer says', () => {
      /* The API attaches every chart built during a run, even when the answer does not
       * mention one: nothing here may depend on the text referring to a chart. */
      const info = previewInfo({
        type: 'str',
        value: 'Questo dataset contiene 804 risposte.',
        charts: [chartSpec('Soddisfazione')],
      });
      const emptyText = previewInfo({type: 'str', value: '', charts: [chartSpec('Soddisfazione')]});

      expect(info.charts?.length).toEqual(1);
      expect(emptyText.charts?.length).toEqual(1);
    });

    it('should cap the charts of a single answer', () => {
      const info = previewInfo({
        type: 'str',
        value: 'many charts',
        charts: Array.from({length: 8}, (_, idx) => chartSpec(`chart ${idx}`)),
      });

      expect(info.charts?.length).toEqual(6);
    });

    it('should drop what is not a chart and keep no empty list', () => {
      const withoutDatasets = previewInfo({
        type: 'str',
        value: 'x',
        charts: [{type: 'bar', labels: ['1']}, null, 'not a chart'],
      });
      const emptyList = previewInfo({type: 'str', value: 'x', charts: []});

      expect(withoutDatasets.charts).toBeUndefined();
      expect(emptyList.charts).toBeUndefined();
    });
  });

  describe('image base64', () => {
    const clean = (value: any) => (dataChat as any)._cleanBase64(value) as string;

    it('should strip the python bytes repr wrapper', () => {
      expect(clean("b'iVBORw0KAAA='")).toEqual('iVBORw0KAAA=');
      expect(clean('b"iVBORw0KAAA="')).toEqual('iVBORw0KAAA=');
    });

    it('should leave a correctly encoded image untouched', () => {
      expect(clean('iVBORw0KAAA=')).toEqual('iVBORw0KAAA=');
      expect(clean('')).toEqual('');
    });
  });

  describe('export download', () => {
    const exportPath = '/datachat/export/bf80bb41d8214522b0d38bca61afbd26';
    let snackBarSpy: jasmine.Spy;

    beforeEach(() => {
      dataChat.baseDataChatAPIurl = 'http://127.0.0.1:5000/';
      dataChat.apiKey.next('key_code');
      spyOn<any>((dataChat as any)._udm, 'getActiveUserData').and.returnValue(
        of({email: 'test@test.com'}),
      );
      snackBarSpy = spyOn(TestBed.inject(MatSnackBar), 'open');
    });

    it('should request the export with the api key and user email headers', () => {
      dataChat.downloadExport(exportPath, 'cities.csv');

      const req = httpTestingController.expectOne(`http://127.0.0.1:5000${exportPath}`);

      expect(req.request.method).toEqual('GET');
      expect(req.request.responseType).toEqual('blob');
      expect(req.request.headers.keys()).toEqual(['X-API-KEY', 'X-USER-EMAIL']);
      expect(req.request.headers.get('X-USER-EMAIL')).toEqual('test@test.com');

      req.flush(new Blob(['city,n\nRoma,1'], {type: 'text/csv'}));
    });

    it('should emit the downloaded file', () => {
      let downloaded: {blob: Blob; filename: string} | null = null;
      dataChat.exportDownload.subscribe(evt => (downloaded = evt));

      dataChat.downloadExport(exportPath, 'cities.csv');
      httpTestingController
        .expectOne(`http://127.0.0.1:5000${exportPath}`)
        .flush(new Blob(['city,n\nRoma,1'], {type: 'text/csv'}));

      expect(downloaded).not.toBeNull();
      expect(downloaded!.filename).toEqual('cities.csv');
      expect(downloaded!.blob.type).toEqual('text/csv');
    });

    it('should explain an expired export on 404 without emitting a file', () => {
      let emitted = false;
      dataChat.exportDownload.subscribe(() => (emitted = true));

      dataChat.downloadExport(exportPath, 'cities.csv');
      httpTestingController
        .expectOne(`http://127.0.0.1:5000${exportPath}`)
        .flush(new Blob(['{"error":"Export not found or expired"}']), {
          status: 404,
          statusText: 'Not Found',
        });

      expect(emitted).toBeFalse();
      expect(snackBarSpy).toHaveBeenCalled();
      expect(snackBarSpy.calls.mostRecent().args[0]).toContain('no longer available');
    });

    it('should explain an ended chat session on 400', () => {
      dataChat.downloadExport(exportPath, 'cities.csv');
      httpTestingController
        .expectOne(`http://127.0.0.1:5000${exportPath}`)
        .flush(new Blob(['{"error":"Agent not active for this Api Key"}']), {
          status: 400,
          statusText: 'Bad Request',
        });

      expect(snackBarSpy.calls.mostRecent().args[0]).toContain('chat session has ended');
    });

    it('should not parse the html body of a 403', () => {
      dataChat.downloadExport(exportPath, 'cities.csv');

      expect(() =>
        httpTestingController
          .expectOne(`http://127.0.0.1:5000${exportPath}`)
          .flush(new Blob(['<html><body>Forbidden</body></html>'], {type: 'text/html'}), {
            status: 403,
            statusText: 'Forbidden',
          }),
      ).not.toThrow();

      expect(snackBarSpy).toHaveBeenCalled();
    });

    it('should not request anything without an api key', () => {
      dataChat.apiKey.next(null);

      dataChat.downloadExport(exportPath, 'cities.csv');

      httpTestingController.expectNone(`http://127.0.0.1:5000${exportPath}`);
    });
  });
});
