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
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {DataChatSessionService} from './datachat-session.service';
import {DataChatConversation} from './datachat-store';
import {
  CompletionRequest,
  CompletionResponse,
  ComponentData,
  DataChatApiResponse,
  DataChatChartSpec,
  DataChatQA,
  DataChatResponsePayload,
} from './datachat.interfaces';
import {HttpBackend, HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, map, shareReplay, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {ErrorHandlerMessageService} from '@dino/core/error-handler';
import {
  BehaviorSubject,
  combineLatest,
  forkJoin,
  Observable,
  of as obsOf,
  Subject,
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
import {BreakpointObserverService} from '@dino/material/breakpoint-observer';
import {
  STRIPE_PAYMENT_CONFIG,
  StripePaymentConfig,
  TokensService,
} from '@dino/material/stripe-payment';

/**
 * The conversations key used in completion mode, where the chat is not bound
 * to a Form Schema.
 */
const COMPLETION_CONVERSATIONS_KEY = 'completion';

/**
 * The maximum number of charts displayed for a single answer, as documented by the API.
 * When the API has more charts than this, its response carries a note saying so.
 */
const MAX_CHARTS_PER_ANSWER = 6;

/**
 * The text displayed for a null cell of a generated table: a value that was not
 * analyzed is not a value of its own.
 */
const EMPTY_CELL_PLACEHOLDER = '—';

/**
 * The maximum number of rows displayed by a generated table
 */
const MAX_TABLE_ROWS = 50;

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
   * Emitted when a DataChat export has been downloaded, so that the host application
   * can save it with the most appropriate strategy for its platform
   */
  @Output() exportDownload: EventEmitter<{blob: Blob; filename: string}> = new EventEmitter<{
    blob: Blob;
    filename: string;
  }>();

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
   * If true, the conversations sidebar is displayed beside the chat, allowing
   * the User to switch between the stored conversations of the Form Schema.
   * Only meaningful in 'datachat' mode.
   */
  @Input() conversationsSidebar = false;

  /**
   * If true, an empty chat displays a welcome block with the starter questions.
   */
  @Input() showWelcome = false;

  /**
   * The title of the welcome block. Defaults to a translated label.
   */
  @Input() welcomeTitle: string | null = null;

  /**
   * The subtitle of the welcome block. Defaults to a translated label.
   */
  @Input() welcomeSubtitle: string | null = null;

  /**
   * The questions suggested by the welcome block. Default to translated ones.
   */
  @Input() starterQuestions: string[] | null = null;

  /**
   * The `source` sent along with the feedback of an answer, telling the two
   * chats apart in the backend logs. Defaults to the chat mode.
   */
  private _feedbackSource: string | null = null;
  get feedbackSource(): string {
    return (
      this._feedbackSource ?? (this.mode === 'completion' ? 'dinoapp-ragai' : 'dinoapp-datachat')
    );
  }
  @Input()
  set feedbackSource(source: string | null) {
    this._feedbackSource = source;
  }

  /**
   * The Ajf functions used to evaluate relevant permissions.
   * This input is unnecessary and should be removed, as dino custom
   * functions are registered through AjfValidationService and are available
   * to ajf to be used inside expressions evaluated by evaluateExpression
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
   * The stored conversations of the current Form Schema, most recent first.
   */
  readonly conversations: Observable<DataChatConversation[]>;

  /**
   * The conversation currently displayed.
   */
  readonly activeConversation: BehaviorSubject<DataChatConversation | null>;

  /**
   * True when the conversations sidebar is closed.
   */
  readonly sidebarCollapsed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * True once the User has opened or closed the sidebar: from then on the
   * screen size does not change its state anymore.
   */
  private _sidebarToggledByUser = false;

  /**
   * Unsubscribes the component subscriptions on destroy.
   */
  private _unsubscribe: Subject<void> = new Subject<void>();

  /**
   * The default starter questions of the welcome block.
   */
  private readonly _defaultStarterQuestions: string[] = [
    'How many records were collected this month?',
    'Summarize the collected notes',
    'Compare the activities by organization',
    'Which items have the lowest values?',
  ];

  /**
   * The questions displayed by the welcome block, translated when they are the
   * default ones.
   */
  get starters(): string[] {
    if (this.starterQuestions != null) {
      return this.starterQuestions;
    }
    return this._defaultStarterQuestions.map(question => this._ts.translate(question));
  }

  /**
   * Currently selected Chat namespace
   */
  currentNamespace: string = 'default';

  /**
   * Current Chat Prompt text value
   */
  chatPromptText: string = '';

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
   * Http client used to download the exports, bypassing the interceptors.
   * The export endpoint answers 400 when its agent is gone, and JWTInterceptor
   * reads any 400 as an expired token: it would refresh the auth token, replay
   * the request and possibly log the user out.
   */
  private readonly _exportHttp: HttpClient;

  /**
   * If present, terms of use for GPT have been accepted
   */
  private _termsAccepted: string | null = localStorage.getItem('pandas_dino_api_key_accept_terms');
  get termsAccepted(): string | null {
    return this._termsAccepted;
  }

  /**
   * The Form Schema id of the current chat, in datachat mode.
   */
  private _schemaId: string | null = null;

  /**
   * The key the stored conversations of this chat are grouped by.
   */
  private _conversationKey: string | null = null;

  /**
   * True if a PandasAI agent of a previous visit of this Form Schema is still
   * alive: in that case no api key validation, csv export or agent creation
   * is performed, and the chat history is restored from the session.
   */
  private _agentAlive = false;

  /**
   * True once this component has created its own agent.
   */
  private _agentReady = false;

  /**
   * The agent creation currently in flight, shared by the questions asked
   * while it is running.
   */
  private _agentCreation: Observable<boolean> | null = null;

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
    private _tokensService: TokensService,
    private _session: DataChatSessionService,
    private _router: Router,
    private _breakpointObserver: BreakpointObserverService,
    @Optional() private _ar: AreaManager | null,
    @Optional() private _cs: CaseManager | null,
    @Optional() private _pj: ProjectManager | null,
    @Optional() private _lc: LocationManager | null,
    @Optional() private _og: OrganizationManager | null,
    private _cdr: ChangeDetectorRef,
    httpBackend: HttpBackend,
  ) {
    this._exportHttp = new HttpClient(httpBackend);
    this.conversations = this._session.conversations;
    this.activeConversation = this._session.activeConversation;
    // The sidebar is closed by default on small screens, until the User
    // explicitly opens or closes it.
    this._breakpointObserver.large.pipe(takeUntil(this._unsubscribe)).subscribe(isLarge => {
      if (!this._sidebarToggledByUser) {
        this.sidebarCollapsed.next(!isLarge);
      }
    });
    this._exporter = null;
    this._formSchema$ = obsOf(null);
    this._formDataList$ = obsOf([]);
    this._nodesVisibility = obsOf([]);
    this._exportedFile$ = obsOf(null);
  }

  ngAfterViewInit(): void {
    if (this.mode === 'datachat') {
      if (this._agentAlive) {
        // The agent of a previous visit is still alive: its data has already
        // been uploaded, there is nothing to export nor to create.
        return;
      }
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
            // Only the csv is prepared here: it is built locally and costs
            // nothing. The agent - which is paid - is created on the first
            // question, so that merely opening the chat is free.
            this._exporter.export();
          } else if (!data || !data.length) {
            this.noData.next(true);
          }
          this.isLoading.next(false);
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
      this.currentNamespace =
        this.namespaces && this.namespaces.length ? this.namespaces[0] : 'default';

      this._apiKeyConfirmationSub = this.apiKeyConfirmationEvt.subscribe({
        next: (res: string) => {
          const confirmedKey = res;
          this.apiKey.next(confirmedKey);
          if (this.history.length === 0) {
            this._addToHistory({response: 'Hello! How can I help you?', noPrompt: true});
          }
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
    if (this.mode === 'datachat') {
      this._schemaId = this._route.snapshot.params['form_schema_id'] ?? null;
    }
    // In datachat mode the conversations belong to the Form Schema, in
    // completion mode they are the single chat of the AI section.
    this._conversationKey = this.mode === 'datachat' ? this._schemaId : COMPLETION_CONVERSATIONS_KEY;
    if (this._conversationKey != null) {
      this._session.openScope(this._conversationKey).then(messages => {
        this.history = this._restoreTables(messages);
        this._cdr.detectChanges();
        this._scrollChatBottom();
      });
    }
    if (this.mode === 'datachat' && this._schemaId != null) {
      const liveApiKey = this._session.apiKey;
      if (this._session.isAliveFor(this._schemaId) && liveApiKey != null) {
        this._agentAlive = true;
        this.apiKey.next(liveApiKey);
        return;
      }
    }
    const storedApiKey = localStorage.getItem('pandas_dino_api_key');
    const storedAcceptTerms = localStorage.getItem('pandas_dino_api_key_accept_terms');
    if (storedApiKey && storedAcceptTerms) {
      this.sendAPIKey(storedApiKey);
    }
  }

  /**
   * Activates a new, empty conversation.
   */
  newConversation(): void {
    this.history = this._session.newConversation();
    this._cdr.detectChanges();
  }

  /**
   * Builds again the tables of the entries of a stored conversation: a table is
   * a component instance, which cannot be stored, but its rows are.
   * @param messages The chat entries of the conversation
   * @returns The same entries, with their tables
   */
  private _restoreTables(messages: DataChatQA[]): DataChatQA[] {
    for (const qa of messages) {
      if (qa.tableData != null && qa.componentData == null) {
        qa.componentData = this._tableComponentData(qa.tableData);
      }
    }
    return messages;
  }

  /**
   * Displays a stored conversation. The live agent is left untouched: the
   * restored entries are shown as they were, and any new question is answered
   * by the current agent.
   * @param conversation The conversation to display
   */
  openConversation(conversation: DataChatConversation): void {
    if (conversation.id === this.activeConversation.value?.id) {
      return;
    }
    this._session.openConversation(conversation.id).then(messages => {
      if (messages != null) {
        this.history = this._restoreTables(messages);
        this._cdr.detectChanges();
        this._scrollChatBottom();
      }
    });
  }

  /**
   * Deletes a stored conversation.
   * @param conversation The conversation to delete
   * @param evt The click event, stopped so that the conversation is not opened
   */
  deleteConversation(conversation: DataChatConversation, evt: Event): void {
    evt.stopPropagation();
    this._session.removeConversation(conversation.id).then(messages => {
      this.history = messages;
      this._cdr.detectChanges();
    });
  }

  /**
   * Opens or closes the conversations sidebar.
   */
  toggleSidebar(): void {
    this._sidebarToggledByUser = true;
    this.sidebarCollapsed.next(!this.sidebarCollapsed.value);
  }

  /**
   * Sends the content of the chat input and clears it.
   * @param input The chat input element
   */
  sendPrompt(input: HTMLTextAreaElement): void {
    const text = input.value;
    input.value = '';
    this.chatPromptText = '';
    this.chatInputFormGrop.get('chatInputControl')?.setValue('');
    this.chat(text);
  }

  /**
   * Opens a Stripe Payment dialog
   */
  openPayment() {
    this._tokensService.openPayment('stripe-checkout', 25);
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
              this._ts.translate('DINO-AI: AUTHENTICATION SUCCESSFUL!'),
              {duration: 10000},
            );
            // The credits of a key just entered are unknown: they are read here
            // once. Opening the chat spends nothing, so from then on they are
            // refreshed by what does spend them, i.e. creating the agent and
            // asking a question.
            this._refreshAvailableTokens();
          }
          this.apiKeyConfirmationEvt.emit(key);
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
              this._ts.translate('DINO-AI is not responding at the moment. Please try later'),
              this._ts.translate('DINO-AI NOT RESPONDING'),
              {
                duration: 5000,
              },
            );
            if (!isDevMode()) {
              this._ehms.captureErrorMessage(
                `DINO-AI is not responding: ${JSON.stringify(err)}`,
                'warning',
              );
            }
          }
        },
      });
  }

  chat(text: string) {
    const chatText = text.trim();
    if (!chatText || !chatText.length) return;
    if (this.mode === 'datachat') {
      this.dataChat(chatText);
    } else if (this.mode === 'completion') {
      this.completionChat(chatText);
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
    this._addToHistory({
      componentData: {component: MatProgressBar, inputs: {mode: 'indeterminate'}},
    });
    // The agent is created here, on the first question, and reused by the
    // following ones.
    this._ensureAgent()
      .pipe(
        switchMap(agentReady => (agentReady ? this._udm.getActiveUserData() : obsOf(null))),
        switchMap(activeUserData => {
          if (!activeUserData || !this.apiKey.value) return obsOf(null);
          const headers = {'X-API-KEY': this.apiKey.value, 'X-USER-EMAIL': activeUserData.email};
          const url = `${this.baseDataChatAPIurl}/${
            this.endpointUrls?.dataChatEndpoint ?? 'datachat'
          }`;
          return this._http.post<DataChatApiResponse>(url, {'chat': text}, {headers});
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
            // The question is kept on every answer entry too - hidden by
            // noPrompt - so that the feedback request can quote it.
            const answer: DataChatQA = {
              ...this._previewInfoFromResponse(res.response),
              question: text,
              explanation: res.explanation ?? undefined,
              noPrompt: true,
              feedbackEnabled: true,
              log_id: res.log_id ?? undefined,
            };
            switch (res.response.type) {
              case 'image':
                const base64string: string = res.response.value;
                this._addToHistory({
                  ...answer,
                  imageData: `data:image/png;base64,${this._cleanBase64(base64string)}`,
                });
                break;
              case 'chart':
                this._addToHistory({
                  ...answer,
                  // The value is the primary chart and charts holds the further
                  // ones, which the API never repeats inside it.
                  charts: this._sanitizeCharts([
                    res.response.value,
                    ...(res.response.charts ?? []),
                  ]),
                });
                break;
              case 'dataframe':
                this._addToHistory({
                  ...answer,
                  tableData: res.response.value,
                  componentData: this._tableComponentData(res.response.value),
                });
                break;
              default:
                const isTabular = typeof res.response.value === 'object';
                this._addToHistory({
                  ...answer,
                  response: isTabular ? undefined : res.response.value,
                  tableData: isTabular ? res.response.value : undefined,
                  componentData: isTabular
                    ? this._tableComponentData(res.response.value)
                    : undefined,
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
                'Not enough credits! Please add more DINO-AI Credits to your account to use this feature',
              ),
              'OOPS!',
              {duration: 10000},
            );
          } else {
            if (isDevMode()) {
              console.log(err);
            } else {
              this._ehms.captureErrorMessage(
                `DINO-AI chat response error: ${JSON.stringify(err)}`,
                'warning',
              );
            }
          }

          this._removeLastFromHistory();
        },
      });
  }

  /**
   * Maps the additive fields of a DataChat response, i.e. the preview, export and
   * chart info, onto a chat history entry.
   * A missing field and a null field always mean the same thing.
   * @param response The 'response' object of the DataChat reply
   * @returns The preview, export and chart fields of the history entry
   */
  private _previewInfoFromResponse(response: DataChatResponsePayload): Partial<DataChatQA> {
    return {
      truncated: response.truncated === true,
      totalRows: response.total_rows ?? undefined,
      totalColumns: response.total_columns ?? undefined,
      previewRows: response.preview_rows ?? undefined,
      previewColumns: this._previewColumnsCount(response.value),
      downloadUrl: response.download_url ?? undefined,
      downloadFilename: response.download_filename ?? undefined,
      note: response.note ?? undefined,
      charts: this._sanitizeCharts(response.charts),
    };
  }

  /**
   * Keeps the chart specifications that can be displayed, capped to the maximum
   * number of charts of a single answer.
   * Only what is not a chart at all is discarded here: a chart that cannot be drawn
   * is displayed as such by DataChatChart, instead of disappearing silently.
   * @param charts The charts of the DataChat reply
   * @returns The charts to display, undefined if there are none
   */
  private _sanitizeCharts(charts: any): DataChatChartSpec[] | undefined {
    if (!Array.isArray(charts)) return undefined;
    const valid = charts.filter(
      chart => chart != null && typeof chart === 'object' && Array.isArray(chart.datasets),
    );
    return valid.length ? valid.slice(0, MAX_CHARTS_PER_ANSWER) : undefined;
  }

  /**
   * Counts the columns actually displayed. TableGenerator builds its columns from the
   * keys of the first row, so that is what the user sees.
   * @param value The 'value' of the DataChat reply
   * @returns The number of displayed columns, undefined if the value is not tabular
   */
  private _previewColumnsCount(value: any): number | undefined {
    const firstRow = Array.isArray(value) ? value[0] : value;
    if (firstRow == null || typeof firstRow !== 'object') return undefined;
    return Object.keys(firstRow).length;
  }

  /**
   * Builds the table displaying the rows of a tabular answer.
   * @param rows The rows of the answer
   * @returns The TableGenerator component data
   */
  private _tableComponentData(rows: unknown): ComponentData {
    return {
      component: TableGenerator,
      inputs: {
        maxRowsDisplayed: MAX_TABLE_ROWS,
        setJsonData: rows,
        emptyCellPlaceholder: EMPTY_CELL_PLACEHOLDER,
      },
    };
  }

  /**
   * Strips the python bytes repr wrapper, i.e. b'...', from a base64 encoded image.
   * A correctly encoded image is returned untouched, so that the API can stop
   * wrapping its images at any time without breaking this client.
   * @param value The image value of the DataChat reply
   * @returns The base64 encoded image
   */
  private _cleanBase64(value: string): string {
    const trimmed = (value ?? '').trim();
    const wrapped = /^b(['"])([\s\S]*)\1$/.exec(trimmed);
    return wrapped ? wrapped[2] : trimmed;
  }

  /**
   * Downloads the complete result of a DataChat answer as a csv file.
   * The export endpoint is not publicly reachable, so it must be requested with the
   * same headers as the 'datachat' endpoint. The downloaded file is emitted through
   * the exportDownload event, to be saved by the host application.
   * @param url The server relative path of the export, as received in the response
   * @param filename The suggested file name of the export
   */
  downloadExport(url: string, filename: string): void {
    if (!this.baseDataChatAPIurl || !this.apiKey.value || !url) return;
    this._udm
      .getActiveUserData()
      .pipe(
        switchMap(activeUserData => {
          if (!activeUserData || !this.apiKey.value) return obsOf(null);
          const headers = {'X-API-KEY': this.apiKey.value, 'X-USER-EMAIL': activeUserData.email};
          return this._exportHttp.get(this._exportUrl(url), {headers, responseType: 'blob'});
        }),
        take(1),
      )
      .subscribe({
        next: blob => {
          if (!blob) return;
          this.exportDownload.emit({blob, filename});
        },
        error: (err: HttpErrorResponse) => this._handleExportError(err),
      });
  }

  /**
   * Joins the base DataChat url and the server relative export path.
   * The export token is never parsed nor rebuilt.
   * @param downloadUrl The server relative path of the export
   * @returns The absolute export url
   */
  private _exportUrl(downloadUrl: string): string {
    const base = (this.baseDataChatAPIurl ?? '').replace(/\/+$/, '');
    return `${base}${downloadUrl.startsWith('/') ? downloadUrl : `/${downloadUrl}`}`;
  }

  /**
   * Notifies the user of a failed export download.
   * Exports live as long as the chat session, so an expired or unknown token is an
   * expected outcome and is not reported as an error.
   * The error body is not parsed: a blob response type leaves it as a Blob, and the
   * 403 body is an html page.
   * @param err The http error
   */
  private _handleExportError(err: HttpErrorResponse): void {
    let message: string;
    switch (err.status) {
      case 404:
        message = 'This download is no longer available. Please run the query again';
        break;
      case 400:
        message = 'The chat session has ended. Please run the query again';
        break;
      case 0:
      case 401:
      case 403:
        message = 'DINO-AI is not responding at the moment. Please try later';
        break;
      default:
        message = 'Could not download the export file';
        if (isDevMode()) {
          console.log(err);
        } else {
          this._ehms.captureErrorMessage(
            `DINO-AI export download error: ${JSON.stringify(err)}`,
            'warning',
          );
        }
        break;
    }
    this._snackBar.open(this._ts.translate(message), 'OK', {duration: 5000});
  }

  /**
   * Sends a message to the API 'agentchat' endpoint and adds the response
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
      this.endpointUrls?.completionChatEndpoint ?? 'agentchat'
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
              question: question,
              response: resp.answer,
              vectors: resp.vectors,
              followUpQuestions: resp.follow_ups,
              log_id: resp.log_id,
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
                'Not enough credits! Please add more DINO-AI Credits to your account to use this feature',
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
   * Sends the user feedback to maui's feedback endpoint
   *
   * @param logId The ID of the log in the mauidb log table
   * @param feedback User feedback
   * @param question qa question
   * @param answer qa answer
   * @returns
   */
  sendFeedback(logId: string | number, feedback: boolean, question: string, answer: string) {
    if (!this.apiKey.value) return;
    // The entry has just flagged itself as rated: keep that in the stored
    // conversation too.
    this._persistHistory();
    const url = `${this.baseDataChatAPIurl}/feedback`;
    const headers = {'X-API-KEY': this.apiKey.value};
    const userInfo = this._auth.getUserInfo();
    const body = {
      username: userInfo?.email,
      userEmail: userInfo?.email,
      question,
      answer,
      feedback: feedback ? 'positive' : 'negative',
      log_id: logId,
      source: this.feedbackSource,
    };
    this._http
      .post(url, body, {headers})
      .pipe(take(1))
      .subscribe({
        next: res => {
          if (isDevMode()) console.log('Feedback sent', res);
          this._snackBar.open(this._ts.translate('Feedback sent!'), 'OK', {duration: 3000});
        },
        error: err => {
          if (isDevMode()) console.error('Error sending feedback', err);
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
    this._tokensService.refreshPandinoTokensEvt.emit();
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
   * Sends an agent creation request to the API 'startdatachat' endpoint,
   * uploading the exported csv file the agent will analyze
   * @param apiKey
   */
  private _createAgent(apiKey: string): Observable<boolean> {
    return combineLatest([this._udm.getActiveUserData(), this._exportedFile$]).pipe(
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
        return this._http.post<any>(url, formData, {headers});
      }),
      take(1),
      map(res => {
        if (res) {
          this._refreshAvailableTokens();
        }
        if (isDevMode()) {
          console.log(res);
        }
        return res != null;
      }),
      catchError(err => {
        // Not enough tokens response from Pandino
        if (err && err.error && err.error.error === 'Not enough tokens') {
          this.noTokens.next(true);
          this._snackBar.open(
            this._ts.translate(
              'Not enough credits! Please add more DINO-AI Credits to your account to use this feature',
            ),
            'OOPS!',
            {duration: 10000},
          );
        } else {
          if (isDevMode()) {
            console.log(err);
          } else {
            this._ehms.captureErrorMessage(
              `DINO-AI agent creation error: ${JSON.stringify(err)}`,
              'warning',
            );
          }
        }
        return obsOf(false);
      }),
    );
  }

  /**
   * Creates the PandasAI agent if it does not exist yet.
   * The agent creation uploads the whole dataset and is charged to the User,
   * so it is deferred to the first question instead of being performed when
   * the chat is opened.
   * @returns True as soon as an agent is available
   */
  private _ensureAgent(): Observable<boolean> {
    if (this._agentAlive || this._agentReady) {
      return obsOf(true);
    }
    if (this._agentCreation != null) {
      return this._agentCreation;
    }
    const apiKey = this.apiKey.value;
    if (apiKey == null) {
      return obsOf(false);
    }
    this._agentCreation = this._createAgent(apiKey).pipe(
      tap(created => {
        this._agentReady = created;
        this._agentCreation = null;
      }),
      shareReplay(1),
    );
    return this._agentCreation;
  }

  /**
   * The url the application is navigating to, or the current one when the
   * component is not being destroyed by a navigation.
   */
  private _nextUrl(): string {
    const navigation = this._router.getCurrentNavigation();
    return navigation?.finalUrl != null
      ? this._router.serializeUrl(navigation.finalUrl)
      : this._router.url;
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
    this._persistHistory();
    this._cdr.detectChanges();
    this._scrollChatBottom();
  }

  /**
   * Removes last entry from chat history
   */
  private _removeLastFromHistory(): void {
    this.history.splice(-1, 1);
    this._persistHistory();
  }

  /**
   * Saves the chat history in the session, so that it can be restored when the
   * AI view of this Form Schema is entered again.
   */
  private _persistHistory(): void {
    if (this._conversationKey == null) {
      return;
    }
    this._session.saveActive(this.history);
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
    // Only the datachat mode creates a PandasAI agent, and only on the first
    // question: there is nothing to keep alive nor to destroy in completion
    // mode, or when no question was ever asked.
    const hasAgent = this.mode === 'datachat' && (this._agentAlive || this._agentReady);
    if (this.apiKey.value && hasAgent) {
      if (this._schemaId != null) {
        // The agent is kept alive while the User stays inside the form section,
        // so that moving between the Data, Map and AI views does not destroy it
        // and does not re-upload its data.
        this._session.keepAlive({
          schemaId: this._schemaId,
          apiKey: this.apiKey.value,
          baseUrl: this.baseDataChatAPIurl ?? '',
          endEndpoint: this.endpointUrls?.endEndpoint ?? 'enddatachat',
        });
        if (!this._session.isInsideForm(this._nextUrl(), this._schemaId)) {
          this._session.endSession();
        }
      } else {
        // A datachat outside of a form section (no schema id in the route):
        // its agent has no section to stay alive for.
        this._destroyAgent(this.apiKey.value);
      }
    }
    if (this._exporter) {
      this._exporter.ngOnDestroy();
    }
    this._apiKeyConfirmationSub.unsubscribe();
    this._unsubscribe.next();
    this._unsubscribe.complete();
    this.apiKey.complete();
    this.isLoading.complete();
  }
}
