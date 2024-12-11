/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Dino (dino).
 *
 * Dino (dino) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Dino (dino) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Dino (dino).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CompletionRequest, CompletionResponse, DataChatQA} from './datachat.interfaces';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, take} from 'rxjs/operators';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  Observable,
  of as obsOf,
  Subscription,
} from 'rxjs';
import {UserDataManager, UserGroupManager} from '@dino/core/users';
import {TranslocoService} from '@ajf/core/transloco';
import {AreaManager} from '@dino/core/areas';
import {CaseManager} from '@dino/core/cases';
import {ProjectManager} from '@dino/core/projects';
import {LocationManager} from '@dino/core/locations';
import {OrganizationManager} from '@dino/core/organizations';
import {Exporter} from '@dino/core/exporter';
import {FormData, FormDataManager, FormInfo, FormSchema, FormSchemaManager} from '@dino/core/forms';
import {NodeVisibility} from '@dino/core/list';
import {AjfCustomFunctions, populateDocRefs} from '@dino/core/data';
import {RxDocument} from 'rxdb';
import {TableGenerator} from '@dino/material/table-generator';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService, User} from '@dino/core/auth';
import {MatSelectChange} from '@angular/material/select';
import {
  STRIPE_PAYMENT_CONFIG,
  StripePaymentConfig,
  StripeService,
} from '@dino/material/stripe-payment';

/**
 * The DataChat component.
 * The active User can chat with a LLM via Flask API (PanDino) to analyze
 * the data of a given Form Schema
 */
@Component({
  selector: 'dino-datachat',
  styleUrls: ['datachat.scss'],
  templateUrl: 'datachat.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DataChat implements AfterViewInit, OnDestroy, OnInit {
  /**
   * The Chat history element
   */
  @ViewChild('chatHistory')
  private _chatHistory?: ElementRef<HTMLDivElement>;
  /**
   * True if the API is currently creating an Agent and Dino is waiting for a response.
   */
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * True if the User has not enough Pandino tokens to perform the operation.
   */
  noTokens: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * True if the API is currently sending a request and Dino is waiting for a response.
   */
  isCommunicating: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * True if there is no data associated with the schema
   */
  noData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Emitted when the Api Key validation is confirmed
   */
  readonly apiKeyConfirmationEvt: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The currently confirmed Api Key
   */
  apiKey: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  /**
   * The base url of the DataChat (Pandino) API
   */
  @Input() baseDataChatAPIurl?: string;

  /**
   * The base url for the graphql backend (Hasura)
   */
  @Input() syncGraphQLUrl?: string;

  /**
   * The base url for documentation files bucket
   */
  @Input() bucketUrl?: string;

  /**
   * Defines the mode of this component.
   * Datachat allows chatting with PandasAI about csv data files.
   * Completion allows direct chat with LLM.
   */
  @Input() mode: 'datachat' | 'completion' = 'datachat';

  /**
   * The Completion mode chat namespaces
   */
  @Input() namespaces: string[] = [];

  /**
   * The endpoint names in the urls
   */
  @Input() endpointUrls?: {
    validateEndpoint: string;
    dataChatEndpoint?: string;
    completionChatEndpoint?: string;
    startEndpoint?: string;
    endEndpoint?: string;
  };

  /**
   * The Custom loading spinner image path
   */
  @Input() spinnerImagePath: string | undefined;

  /**
   * The Ajf functions used to evaluate relevant permissions
   */
  @Input() ajfCustomFunctions: AjfCustomFunctions | undefined;

  /**
   * Form Group for API key input
   */
  readonly apiKeyFormGroup: FormGroup = new FormGroup<{}>({
    apiKeyControl: new FormControl<string>('', [Validators.required]),
  });

  /**
   * Form Group for Chat propmt input
   */
  readonly chatInputFormGrop: FormGroup = new FormGroup<{}>({
    chatInputControl: new FormControl<string>(''),
  });

  /**
   * The current chat history
   */
  history: DataChatQA[] = [];

  /**
   * Currently selected Chat namespace
   */
  currentNamespace: string =
    this.namespaces && this.namespaces.length ? this.namespaces[0] : 'default';

  /**
   * Emitted when the Exporter has been successfully created and set up
   */
  private _ExporterReadyEvt: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Subscribes to API key validation
   */
  private _apiKeyConfirmationSub: Subscription = Subscription.EMPTY;

  /**
   * The Exporter instance
   */
  private _exporter: Exporter | null;

  /**
   * The file generated from the Exporter
   */
  private _exportedFile$: Observable<File | null>;
  get exportedFile$(): Observable<File | null> {
    return this._exportedFile$;
  }

  /**
   * The DataChat Form Schema
   */
  private _formSchema$: Observable<FormSchema | null>;

  /**
   * The list of all populate Form Data associate with the Form Schema
   */
  private _formDataList$: Observable<RxDocument<FormData>[]>;

  /**
   * The Ajf Nodes Visibility observable
   */
  private _nodesVisibility: Observable<NodeVisibility[]>;

  /**
   * If present, terms of use for GPT have been accepted
   */
  private _termsAccepted: string | null = localStorage.getItem('pandas_dino_api_key_accept_terms');
  get termsAccepted(): string | null {
    return this._termsAccepted;
  }

  constructor(
    @Optional() @Inject(STRIPE_PAYMENT_CONFIG) readonly config: StripePaymentConfig | null,
    private _route: ActivatedRoute,
    private _auth: AuthService,
    private _http: HttpClient,
    private _udm: UserDataManager,
    private _ugm: UserGroupManager,
    private _ehms: ErrorHandlerMessageService,
    private _fsm: FormSchemaManager,
    private _fdm: FormDataManager,
    private _snackBar: MatSnackBar,
    private _ts: TranslocoService,
    private _stripeService: StripeService,
    @Optional() private _ar: AreaManager | null,
    @Optional() private _cs: CaseManager | null,
    @Optional() private _pj: ProjectManager | null,
    @Optional() private _lc: LocationManager | null,
    @Optional() private _og: OrganizationManager | null,
    private _cdr: ChangeDetectorRef,
  ) {
    this._exporter = null;
    this._formSchema$ = obsOf(null);
    this._formDataList$ = obsOf([]);
    this._nodesVisibility = obsOf([]);
    this._exportedFile$ = obsOf(null);
  }

  ngAfterViewInit(): void {
    if (this.mode === 'datachat') {
      this._exporter = this._createExporter();

      this._formSchema$ = this._fsm.get(this._route.snapshot.params['form_schema_id']);

      this._formDataList$ = this._fdm
        .query({
          selector: {
            form_schema_ref_id: {$eq: this._route.snapshot.params['form_schema_id']},
            is_deleted: {$ne: true},
          },
        })
        .pipe(map(docs => populateDocRefs<FormData>(docs)));

      this._nodesVisibility = combineLatest([
        this._formSchema$,
        this._udm.getActiveUserData(),
        this._ugm.getActiveUserGroups(),
      ]).pipe(
        map(([fschema, activeUser, activeUserGroups]) => {
          if (fschema == null || activeUser == null || activeUserGroups == null) return [];

          const dinoFormInfo: FormInfo = {
            activeUser,
            activeUserGroups,
            createdAt: null,
            status: null,
            allStatuses: [],
            user: null,
            userGroups: null,
          };

          const nodesVisibility = this._fsm.getPermissionsRelevant(
            fschema.schema.nodes,
            dinoFormInfo,
            this.ajfCustomFunctions
              ? {
                  isUserInGroup: this.ajfCustomFunctions['isUserInGroup'],
                  isUserInAtLeastOneGroup: this.ajfCustomFunctions['isUserInAtLeastOneGroup'],
                }
              : undefined,
          );
          return nodesVisibility;
        }),
      );

      forkJoin([this._formSchema$, this._formDataList$])
        .pipe(take(1))
        .subscribe(([schema, data]) => {
          if (!schema || !data || !this._exporter) return;
          this._setupExporter(this._exporter, schema, data);
        });

      this._apiKeyConfirmationSub = combineLatest([
        this._ExporterReadyEvt,
        this._formDataList$,
        this.apiKeyConfirmationEvt,
      ]).subscribe({
        next: res => {
          const data = res[1];
          const confirmedKey = res[2];
          this.apiKey.next(confirmedKey);
          if (this._exporter && data && data.length) {
            this._exporter.export();
            this._createAgent(confirmedKey);
          } else {
            if (!data || !data.length) {
              this.noData.next(true);
            }
            this.isLoading.next(false);
          }
          this._cdr.detectChanges();
        },
        error: (err: any) => {
          if (isDevMode()) {
            console.log(err);
          } else {
            this._ehms.captureErrorMessage(
              `Could not confirm api key and trigger csv file export and agent creation: ${JSON.stringify(
                err,
              )}`,
              'error',
            );
          }
        },
      });

      this._exportedFile$ = this._exporter.exportedFile;
    } else if (this.mode === 'completion') {
      this._apiKeyConfirmationSub = this.apiKeyConfirmationEvt.subscribe({
        next: (res: string) => {
          const confirmedKey = res;
          this.apiKey.next(confirmedKey);
          this._addToHistory({response: 'Hello! How can I help you?', noPrompt: true});
          this.isLoading.next(false);
          this._cdr.detectChanges();
        },
        error: (err: any) => {
          if (isDevMode()) {
            console.log(err);
          } else {
            this._ehms.captureErrorMessage(
              `Could not confirm api key: ${JSON.stringify(err)}`,
              'error',
            );
          }
        },
      });
    }
  }

  ngOnInit(): void {
    const storedApiKey = localStorage.getItem('pandas_dino_api_key');
    const storedAcceptTerms = localStorage.getItem('pandas_dino_api_key_accept_terms');
    if (storedApiKey && storedAcceptTerms) {
      this.sendAPIKey(storedApiKey);
    }
  }

  /**
   * Opens a Stripe Payment dialog
   */
  openPayment() {
    this._stripeService.openPayment('stripe-checkout', 25);
  }

  /**
   * Sends the API Key to the 'validateapikey' endpoint and triggers
   * the PandasAi agent creation
   * @param key
   * @returns
   */
  sendAPIKey(key: string): void {
    if (!this.baseDataChatAPIurl || this.isCommunicating.value) return;
    this.isCommunicating.next(true);
    const userInfo = this._auth.getUserInfo();
    if (!userInfo || !userInfo.email) return;
    const headers = {'X-API-KEY': key, 'X-USER-EMAIL': userInfo.email};
    this._http
      .post(
        `${this.baseDataChatAPIurl}/${this.endpointUrls?.validateEndpoint ?? 'validateapikey'}`,
        null,
        {headers},
      )
      .pipe(take(1))
      .subscribe({
        next: res => {
          setTimeout(() => {
            this.isCommunicating.next(false);
          }, 1000);
          this.isLoading.next(true);
          const storedApiKey = localStorage.getItem('pandas_dino_api_key');
          if (!storedApiKey) {
            localStorage.setItem('pandas_dino_api_key', key);
            this._snackBar.open(
              this._ts.translate(
                'Your API Key was successfully authenticated. You can check it any time in your User Area',
              ),
              this._ts.translate('PANDINO: AUTHENTICATION SUCCESSFUL!'),
              {duration: 10000},
            );
          }
          this.apiKeyConfirmationEvt.emit(key);
          this._refreshAvailableTokens();
          if (isDevMode()) {
            console.log(res);
          }
        },
        error: err => {
          setTimeout(() => {
            this.isCommunicating.next(false);
          }, 1000);
          if (err.error.error && err.error.error === 'Invalid API key') {
            this.apiKeyFormGroup.get('apiKeyControl')?.setErrors({'invalid': true});
            this._cdr.detectChanges();
          } else {
            this._snackBar.open(
              this._ts.translate('PANDINO is not responding at the moment. Please try later'),
              this._ts.translate('PANDINO NOT RESPONDING'),
              {
                duration: 5000,
              },
            );
            if (!isDevMode()) {
              this._ehms.captureErrorMessage(
                `PANDINO is not responding: ${JSON.stringify(err)}`,
                'warning',
              );
            }
          }
        },
      });
  }

  chat(text: string) {
    if (this.mode === 'datachat') {
      this.dataChat(text);
    } else if (this.mode === 'completion') {
      this.completionChat(text);
    } else {
      return;
    }
  }

  /**
   * Sends a message to the API 'datachat' endpoint and adds the response
   * to the chat history
   * @param text The chat message sent
   */
  dataChat(text: string): void {
    this._addToHistory({question: text});
    this._udm
      .getActiveUserData()
      .pipe(
        switchMap(activeUserData => {
          if (!activeUserData || !this.apiKey.value) return obsOf(null);
          const headers = {'X-API-KEY': this.apiKey.value, 'X-USER-EMAIL': activeUserData.email};
          const url = `${this.baseDataChatAPIurl}/${
            this.endpointUrls?.dataChatEndpoint ?? 'datachat'
          }`;
          this._addToHistory({
            componentData: {component: MatProgressBar, inputs: {mode: 'indeterminate'}},
          });
          return this._http.post<{
            explanation: string;
            response: {type: string; value: any};
          }>(url, {'chat': text}, {headers});
        }),
        take(1),
      )
      .subscribe({
        next: res => {
          if (isDevMode()) {
            console.log(res);
          }
          this._removeLastFromHistory();
          if (res) {
            switch (res.response.type) {
              case 'image':
                const base64string: string = res.response.value;
                const base64imageData = `data:image/png;base64, ${base64string
                  .replace("b'", '')
                  .slice(0, -1)}`;
                this._addToHistory({
                  explanation: res.explanation,
                  imageData: base64imageData,
                  noPrompt: true,
                });
                break;
              case 'dataframe':
                this._addToHistory({
                  explanation: res.explanation,
                  componentData: {
                    component: TableGenerator,
                    inputs: {maxRowsDisplayed: 50, setJsonData: res.response.value},
                  },
                  noPrompt: true,
                });
                break;
              default:
                this._addToHistory({
                  explanation: res.explanation,
                  response: typeof res.response.value === 'object' ? undefined : res.response.value,
                  componentData:
                    typeof res.response.value === 'object'
                      ? {
                          component: TableGenerator,
                          inputs: {maxRowsDisplayed: 50, setJsonData: res.response.value},
                        }
                      : undefined,
                  noPrompt: true,
                });
                break;
            }
            this._refreshAvailableTokens();
          }
        },
        error: err => {
          if (err && err.error && err.error.error === 'Not enough tokens') {
            this.noTokens.next(true);
            this.isLoading.next(false);
            this._snackBar.open(
              this._ts.translate(
                'Not enough tokens! Please add more Pandino Tokens to your account to use this feature',
              ),
              'OOPS!',
              {duration: 10000},
            );
          } else {
            if (isDevMode()) {
              console.log(err);
            } else {
              this._ehms.captureErrorMessage(
                `Pandino chat response error: ${JSON.stringify(err)}`,
                'warning',
              );
            }
          }

          this._removeLastFromHistory();
        },
      });
  }

  /**
   * Sends a message to the API 'completion.json' endpoint and adds the response
   * to the chat history
   * @param text The chat message sent
   */
  completionChat(text: string) {
    const question = text;
    const namespace = this.currentNamespace;
    const userInfo: User | null = this._auth.getUserInfo();
    if (question === '' || namespace == null || !this.syncGraphQLUrl || !userInfo) {
      return;
    }

    const qa: DataChatQA = {question, namespace};
    this._addToHistory(qa);

    const chat = this._chatFromHistory();
    const req: CompletionRequest = {
      dinoGraphql: this.syncGraphQLUrl,
      authToken: this._auth.getAuthToken() || '',
      username: userInfo.email,
      namespace,
      info: this._infoFromHistory(),
      chat,
    };
    if (isDevMode()) {
      console.log('Sending completion request: ', req);
    }
    const url = `${this.baseDataChatAPIurl}/${
      this.endpointUrls?.completionChatEndpoint ?? 'completion.json'
    }`;
    this._udm
      .getActiveUserData()
      .pipe(
        switchMap(activeUserData => {
          if (!activeUserData || !this.apiKey.value) return obsOf(null);
          const headers = {'X-API-KEY': this.apiKey.value};
          this._addToHistory({
            componentData: {component: MatProgressBar, inputs: {mode: 'indeterminate'}},
          });
          return this._http.post<CompletionResponse | null>(url, req, {headers});
        }),
        take(1),
      )
      .subscribe({
        next: (resp: CompletionResponse | null) => {
          this._removeLastFromHistory();
          if (resp == null) {
            if (isDevMode()) console.log('Could not receive completion response');
            return;
          }
          if (isDevMode()) console.log('Received completion response: ', resp);
          if (resp.error != null) {
            if (resp.error.includes('tokens') && resp.error.includes('length')) {
              resp.error =
                'Questa chat ha raggiunto la lunghezza massima, ' +
                'ricarica la pagina per fare altre domande.';
            }
            this._addToHistory({
              error: resp.error,
            });
          } else {
            this._addToHistory({
              response: resp.answer,
              vectors: resp.vectors,
              noPrompt: true,
            });
          }
          this._refreshAvailableTokens();
          this._cdr.detectChanges();
        },
        error: err => {
          if (err && err.error && err.error.error === 'Not enough tokens') {
            this.noTokens.next(true);
            this.isLoading.next(false);
            this._snackBar.open(
              this._ts.translate(
                'Not enough tokens! Please add more Pandino Tokens to your account to use this feature',
              ),
              'OOPS!',
              {duration: 10000},
            );
          } else {
            if (isDevMode()) console.log(err);
            qa.error = err.message;
          }
          this._removeLastFromHistory();
          this._cdr.detectChanges();
        },
      });
  }

  /**
   * Accepts terms of use for GPT
   */
  acceptTerms() {
    this._termsAccepted = 'true';
    localStorage.setItem('pandas_dino_api_key_accept_terms', 'true');
    const storedApiKey = localStorage.getItem('pandas_dino_api_key');
    if (storedApiKey) {
      this.sendAPIKey(storedApiKey);
    }
    this._cdr.markForCheck();
  }

  selectNamespace(ev: MatSelectChange): void {
    this.currentNamespace = ev.value ?? null;
  }

  /**
   * Triggers the Stripeservice refresh pandino tokens event emission
   */
  private _refreshAvailableTokens() {
    this._stripeService.refreshPandinoTokensEvt.emit();
  }

  /**
   * Retrieves all Chat History's questions and responses.
   * @returns Questions and responses of all chat history.
   */
  private _chatFromHistory(): string[] {
    const chat: string[] = [];
    for (const qa of this.history) {
      if (qa.response) chat.push(qa.response);
      if (qa.question) chat.push(qa.question);
    }
    return chat;
  }

  /**
   * Gets all quoted paragraphs from chat history's responses.
   * @returns The set of paragraphs
   */
  private _infoFromHistory(): string[] {
    const info = new Set<string>();
    for (const qa of this.history) {
      if (qa.response && qa.vectors) {
        for (const vec of qa.vectors) {
          info.add(vec.metadata.text);
        }
      }
    }
    return [...info];
  }

  /**
   * Sends an agent creation request to the API 'startdatachat' endpoint
   * and adds to chat history the default table, generated by TableGenerator with
   * the exported csv file
   * @param apiKey
   */
  private _createAgent(apiKey: string) {
    combineLatest([this._udm.getActiveUserData(), this._exportedFile$])
      .pipe(
        switchMap(([activeUserData, exportedFile]) => {
          if (!activeUserData || !exportedFile) return obsOf(null);
          const headers = {
            'X-API-KEY': apiKey,
            'X-USER-NAME': activeUserData.full_name,
            'X-USER-EMAIL': activeUserData.email,
          };
          const url = `${this.baseDataChatAPIurl}/${
            this.endpointUrls?.startEndpoint ?? 'startdatachat'
          }`;
          const formData = new FormData();
          formData.append('file', exportedFile);
          const currentLang = this._ts.getActiveLang();
          formData.append('lang', currentLang);
          return this._http.post<any>(url, formData, {headers}).pipe(
            map(response => {
              return {
                response,
                exportedFile,
              };
            }),
          );
        }),
        take(1),
      )
      .subscribe({
        next: res => {
          if (res) {
            this._addToHistory([
              {response: 'Here is your data!', noPrompt: true},
              {
                componentData: {
                  component: TableGenerator,
                  inputs: {maxRowsDisplayed: 50, setCsvFile: res.exportedFile},
                },
              },
            ]);
            if (res.response.suggested_questions) {
              this._addToHistory({
                response: res.response.suggested_questions,
                noPrompt: true,
              });
            }
            this._refreshAvailableTokens();
          }

          if (isDevMode()) {
            console.log(res);
          }
          this.isLoading.next(false);
        },
        error: err => {
          // Not enough tokens response from Pandino
          if (err && err.error && err.error.error === 'Not enough tokens') {
            this.noTokens.next(true);
            this.isLoading.next(false);
            this._snackBar.open(
              this._ts.translate(
                'Not enough tokens! Please add more Pandino Tokens to your account to use this feature',
              ),
              'OOPS!',
              {duration: 10000},
            );
          } else {
            if (isDevMode()) {
              console.log(err);
            } else {
              this._ehms.captureErrorMessage(
                `Pandino agent creation error: ${JSON.stringify(err)}`,
                'warning',
              );
            }
          }
        },
      });
  }

  /**
   * Sends an agent destruction request to the API 'enddatachat' endpoint
   * @param apiKey The api key
   */
  private _destroyAgent(apiKey: string) {
    this._udm
      .getActiveUserData()
      .pipe(
        switchMap(activeUserData => {
          if (!activeUserData) return obsOf(null);
          const headers = {
            'X-API-KEY': apiKey,
            'X-USER-NAME': activeUserData.full_name,
            'X-USER-EMAIL': activeUserData.email,
          };
          const url = `${this.baseDataChatAPIurl}/${
            this.endpointUrls?.endEndpoint ?? 'enddatachat'
          }`;
          return this._http.post<any>(url, {}, {headers});
        }),
        take(1),
      )
      .subscribe(res => {
        if (isDevMode()) {
          console.log(res);
        }
      });
  }

  /**
   * Adds an entry to the Chat history and scrolls the history container to the bottom
   * @param qa A question/answer object or array
   */
  private _addToHistory(qa: DataChatQA | DataChatQA[]): void {
    if (qa == null) return;
    if (Array.isArray(qa)) {
      this.history.push(...qa);
    } else {
      this.history.push(qa);
    }
    this._cdr.detectChanges();
    this._scrollChatBottom();
  }

  /**
   * Removes last entry from chat history
   */
  private _removeLastFromHistory(): void {
    this.history.splice(-1, 1);
  }

  /**
   * Scrolls Chat history container to the bottom
   */
  private _scrollChatBottom(): void {
    if (this._chatHistory) {
      const container = this._chatHistory.nativeElement;
      container.scroll({top: container.scrollHeight, behavior: 'smooth'});
    }
  }

  /**
   * Creates an Exporter instance
   * @returns The exporter instance
   */
  private _createExporter(): Exporter {
    return new Exporter(this._ts, this._ar, this._cs, this._pj, this._lc, this._og);
  }

  /**
   * Performs the Exporter instance setup and emits the ExporterReady event
   * @param exporter The exporter instance
   * @param schema The form schema
   * @param data All form datas
   */
  private _setupExporter(exporter: Exporter, schema: FormSchema, data: RxDocument<FormData>[]) {
    exporter.setup(
      {
        exportFormat: 'csv',
        formSchema: schema,
        listType: 'forms',
        nodesVisibility: this._nodesVisibility,
        singleHeader: true,
        removeCommas: true,
      },
      'all',
      data,
      'csv',
      true,
      true,
    );
    this._ExporterReadyEvt.emit();
  }

  ngOnDestroy(): void {
    if (this.apiKey.value) {
      this._destroyAgent(this.apiKey.value);
    }
    if (this._exporter) {
      this._exporter.ngOnDestroy();
    }
    this._apiKeyConfirmationSub.unsubscribe();
    this.apiKey.complete();
    this.isLoading.complete();
  }
}
