import {MatDialogConfig} from '@angular/material/dialog';
import {MatPaginatorDefaultOptions} from '@angular/material/paginator';
import {AuthServiceConfig} from '@dino/core/auth';
import {ConfigServiceConfig} from '@dino/core/config';
import {PandinoConfig} from '@dino/core/data';
import {TranslationsConfig} from '@dino/core/translations';
import {StripePaymentConfig} from '@dino/material/stripe-payment';
import {UITourConfig} from '@dino/material/ui-tour-service';

/**
 * Local Backend
 */
const applicationId = 'c7576d4b-1be7-4381-98b5-d02f13f5dadd';
const host = `http://localhost:9011`;
export const authConfig: AuthServiceConfig = {
  host: host,
  applicationId: applicationId,
  apiKey: `jVe6r5r3u-0sAHjo1nzAIk6j5JTB1_qZOunuY4oMSSBIXClCKbA-3rJb`,
  retryRefreshTime: 3000,
  retryAttemptsMax: 1,
  failedAuthRedirect: 'login',
  externalAuthAvailable: ['azuread', 'google'],
};

/**
 * NHost dev backend
 */
// const host = `https://sehdprpmtgoonqyxyuhk.nhost.run`;
// export const authConfig: AuthServiceConfig = {
//   host: host,
//   nHostAuth: true,
//   userCredential: 'email',
//   applicationId: null,
//   retryRefreshTime: 3000,
//   retryAttemptsMax: 1,
//   failedAuthRedirect: 'login',
// };

export const configurationConfig: ConfigServiceConfig = {
  apiUrl: 'https://dev.cpainitiative.org/instances',
};

/**
 * Stripe Payment module configuration
 */
export const stripePaymentConfig: StripePaymentConfig = {
  stripeKey:
    'pk_test_51NlTETLMj7kkP2jxxzBYrrpLH6XzivAWBGkvmCt3NltGFVg29530Bo0Ld1JqXqmkNx4cwz9o6F5owTqHcJyDMvDB00lTH85e1O',
  gnuPayUrl: 'http://localhost:4242',
  pandinoTokenID: 'prod_R5u9pKgodWUPYD',
};

/**
 * Pandino configuration
 */
export const pandinoConfig: PandinoConfig = {
  pandinoUrl: 'http://localhost:5000',
  pandinoGptNamespaces: ['Gnucoop', 'Dino', 'Xlsform', 'PRAG', 'CC'],
};

/**
 * UI Tour configuration
 */
export const uiTourConfig: UITourConfig = {
  tourActive: true,
  tourSteps: [
    {
      stepId: 'start-tour',
      anchorId: 'start-tour',
      title: 'Benvenuti',
      content: 'Benvenuti in Dino BSAI!',
      route: '/dashboard',
      isAsync: true,
    },
    {
      stepId: 'edit-report',
      anchorId: 'edit-report',
      title: 'Controllo Completezza',
      content:
        'Controlla il report per controllare che i dati raccolti necessari siano stati compilati',
      route: '/dashboard',
      isOptional: true,
    },
    {
      stepId: 'forms-nav',
      anchorId: 'forms-nav',
      title: 'Raccogliere i dati',
      content: 'In questa sezione verranno raccolti tutti i dati per il Bilancio Sociale',
      route: '/dashboard',
    },
    {
      stepId: 'collect',
      anchorId: 'collect',
      title: 'Formulari per la raccolta dati',
      content: `Ciascuno di questi formulari permette di raccogliere i dati necessari alla realizzazione del tuo Bilancio Sociale.
        Selezionane uno e comincia la raccolta`,
      route: '/forms',
    },
    {
      stepId: '01 Metodologia',
      anchorId: '01 Metodologia',
      title: 'Form Metodologia',
      content: 'Questo è il formulario per la metodologia',
      route: '/forms',
    },
    {
      stepId: 'add-form-floating-button',
      anchorId: 'add-form-floating-button',
      title: 'Inizia l’inserimento dei dati',
      content: 'Stai aprendo un formulario vuoto e puoi cominciare ad inserire i tuoi dati',
      route: '/forms/bda3fe96-c140-46c2-a082-5464aaec89bb',
    },
    {
      stepId: 'metric-selector-creation-date',
      anchorId: 'metric-selector-creation-date',
      title: 'Data di creazione',
      content: `Assicurati che la data di creazione sia all'interno dell'anno di rendicontazione.
      Per comodità usa il 31/12 dell'anno in questione`,
      route: '/forms/bda3fe96-c140-46c2-a082-5464aaec89bb/create',
    },
    {
      stepId: 'go-to-form-data-button',
      anchorId: 'go-to-data-button',
      title: 'Compila form',
      content: `<b>Clicca</b><i class="material-icons">touch_app</i> il bottone Compila form per cominciare a inserire i tuoi dati e per proseguire il Tour!`,
      route: '/forms/bda3fe96-c140-46c2-a082-5464aaec89bb/create',
      popoverClass: 'dino-tour-step-popover dino-tour-step-active-popover',
      nextOnAnchorClick: true,
    },
    {
      stepId: 'create-form',
      anchorId: 'create-form',
      title: 'Compila tutte le sezioni',
      content: `Seleziona la modalità preferita e assicurati di compilare tutti i dati necessari evidenziati dal triangolino rosso`,
      route: '/forms/bda3fe96-c140-46c2-a082-5464aaec89bb/create',
      delayBeforeStepShow: 1000,
      prevStep: 'create-form',
    },
    {
      stepId: 'save-form-draft-floating-button',
      anchorId: 'save-draft-floating-button',
      title: 'Salva Bozza',
      content: `Se non termini la compilazione in una sessione unica, utilizza il tasto Salva Bozza per poi conitnuare in un secondo momento la compilazione`,
      route: '/forms/bda3fe96-c140-46c2-a082-5464aaec89bb/create',
    },
    {
      stepId: 'save-form-floating-button',
      anchorId: 'save-form-floating-button',
      title: 'Salva i dati',
      content: `Una volta terminata la compilazione, ricordati sempre di salvare i tuoi dati`,
      route: '/forms/bda3fe96-c140-46c2-a082-5464aaec89bb/create',
    },
    {
      stepId: 'edit-status-icon',
      anchorId: 'edit-status-icon',
      title: 'Approva il form',
      content: `Cliccando sull'edit status puoi confermare i dati inseriti`,
      route: 'forms/bda3fe96-c140-46c2-a082-5464aaec89bb',
    },
    {
      stepId: 'reports-nav',
      anchorId: 'reports-nav',
      title: 'Visualizza i report',
      content:
        'Una volta compilati tutti i dati necessari procedi alla generazione del tuo report del BS',
      route: 'forms/bda3fe96-c140-46c2-a082-5464aaec89bb',
    },
    {
      stepId: 'Report Bilancio Sociale - AI',
      anchorId: 'Report Bilancio Sociale - AI',
      title: 'Clicca sul Report BS - AI',
      content: 'Clicca sul Report BS - AI',
      route: '/reports',
    },
    {
      stepId: 'add-report-floating-button-credits',
      anchorId: 'add-report-floating-button-credits',
      title: 'Crediti necessari',
      content:
        'Assicurati di avere crediti a sufficienza per generare un report AI. Il costo di ogni report è di 20 crediti',
      route: '/reports/f4a538b0-faaf-4a35-bb30-c2cc6757e91f',
      backdropConfig: {
        offset: 6,
      },
    },
    {
      stepId: 'add-report-floating-button',
      anchorId: 'add-report-floating-button',
      title: 'Aggiungi nuovo report',
      content:
        '<b>Clicca sul bottone +</b><i class="material-icons">touch_app</i> per creare un nuovo report',
      popoverClass: 'dino-tour-step-popover dino-tour-step-active-popover',
      route: '/reports/f4a538b0-faaf-4a35-bb30-c2cc6757e91f',
      nextOnAnchorClick: true,
    },
    {
      stepId: 'metric-selector-status',
      anchorId: 'metric-selector-status',
      title: 'Seleziona lo stato dei form',
      content: 'Seleziona lo stato dei form utilizzati dal report',
      route: '/reports/f4a538b0-faaf-4a35-bb30-c2cc6757e91f/create',
    },
    {
      stepId: 'go-to-report-data-button',
      anchorId: 'go-to-data-button',
      title: 'Compila il Report',
      content: `<b>Clicca</b><i class="material-icons">touch_app</i> il bottone Compila Report per compilare i dati del report e per proseguire il Tour!`,
      route: '/reports/f4a538b0-faaf-4a35-bb30-c2cc6757e91f/create',
      popoverClass: 'dino-tour-step-popover dino-tour-step-active-popover',
      nextOnAnchorClick: true,
    },
    {
      stepId: 'create-report',
      anchorId: 'create-report',
      title: 'Assegna nome e date',
      content: `Assegna un nome e inserisci gli estremi dell'anno di rendicontazione`,
      route: '/reports/f4a538b0-faaf-4a35-bb30-c2cc6757e91f/create',
      delayBeforeStepShow: 1000,
      prevStep: 'create-report',
    },
    {
      stepId: 'save-report-floating-button',
      anchorId: 'save-report-floating-button',
      title: 'Salva il Report',
      content: `Una volta terminata la compilazione, ricordati sempre di salvare i dati del tuo Report`,
      route: '/reports/f4a538b0-faaf-4a35-bb30-c2cc6757e91f/create',
    },
  ],
  defaultStepOptions: {
    popoverClass: 'dino-tour-step-popover',
    prevBtnTitle: 'Indietro',
    nextBtnTitle: 'Avanti',
    endBtnTitle: 'Fine',
    duplicateAnchorHandling: 'registerLast',
    delayBeforeStepShow: 300,
    delayAfterNavigation: 1000,
    disablePageScrolling: true,
    disableScrollToAnchor: true,
  },
};

// Paginator default config
export const paginatorConfig: MatPaginatorDefaultOptions = {
  pageSize: 10,
  pageSizeOptions: [5, 10, 25, 50, 100, 500],
};

// Dialog default config
export const dialogConfig: MatDialogConfig = new MatDialogConfig();
dialogConfig.minWidth = '95vw';
dialogConfig.maxWidth = '95vw';

/**
 * Default language config
 */
export const defaultLanguageConfig: TranslationsConfig = {
  defaultLanguage: 'ENG',
};

/**
 * The languages available in the app
 */
export const availableLanguagesConfig = ['AR', 'ENG', 'ESP', 'FRA', 'ITA', 'PRT', 'UKR'];

/**
 * Any additional configurable parameters
 */
export const additionalConfig = {
  /**
   * If true, fake data is generated from test-ajf-formschema and test-ajf-formdata
   * when the e2e-app starts
   */
  generateData: true,

  /**
   * If true, authGuard is on for all guarded routes.
   * Set this to false to correctly perform e2e-tests.
   */
  authGuard: false,

  /**
   * If true, the real auth service will be used to authenticate
   * users against the external authentication platform.
   * Set this to false to correctly perform e2e-tests.
   */
  externalAuthentication: false,

  /**
   * Config the mocked breakpointobserver service for "large" or "small" screens
   */
  isSmallScreen: false,

  /**
   * If true, Dynamic Configuration is activated, and the user can choose
   * the Platform to log in to from a select dropdown during login.
   * Those configs must be provided by an external API.
   */
  dynamicConfiguration: false,

  /**
   * Url of the Go FormConv endpoint
   */
  formconv_post_url: 'https://formconv.herokuapp.com/result.json',

  /**
   * If true, Metrics are set to optional for both Forms or Reports
   * Form or Report datas can be created without selecting any metric.
   */
  optionalFormMetrics: true,
  optionalReportMetrics: true,

  /**
   * If true, files selected in a form are saved into form data,
   * otherwise are uploaded on cloud and only the online url is saved
   */
  offlineFileUpload: false,

  /**
   * The type of the dashboard component loaded by the app
   */
  dashboardType: 'menu',

  /**
   * How the form status should be displayed in a forms list
   */
  statusType: 'progress',

  /**
   * True if the form status can be edited in the list rows
   */
  statusEditable: true,

  /**
   * List of Pipeline Form Schemas (by name)
   */
  pipelines: ['pipeline_test'],

  /**
   * List of Form Schemas (by name) that allow boolean field quick edit directly from the Form List
   */
  booleanQuickEdit: ['00 Baseline Target 8PERMILLE'],

  /**
   * Logo for case card
   */
  logoImage: 'https://gnudino.vercel.app/assets/icons/logos/logodino.png',
  /**
   * secondaryMetricFieldsDisplayed
   */
  secondaryMetricFieldsDisplayed: {
    case: 'notes',
    project: 'code',
    organization: ['metric_data descrizione', 'website_url'],
  },
};

/**
 * Optional Modules Config.
 * Can activate/deactivate all optional modules in the app.
 */
export const optionalModulesConfig = {
  /**
   * Thematic areas module.
   */
  areasModule: true,

  /**
   * Cases module.
   */
  casesModule: true,

  /**
   * Projects module.
   */
  projectsModule: true,

  /**
   * Locations module.
   */
  locationsModule: true,

  /**
   * Organizations module.
   */
  organizationsModule: true,

  /**
   * Logs module
   */
  logsModule: true,

  /**
   * Stripe Payments module
   */
  stripeModule: true,
};
