import {AuthServiceConfig} from '@dino/core/auth';
import {DashboardType} from '@dino/material/collect';
import {DinoTheme} from '@dino/material/core';
import {StatusDisplayType} from '@dino/material/list';
import {StripePaymentConfig} from '@dino/material/stripe-payment';
import {UITourConfig} from '@dino/material/ui-tour-service';

/**
 * Represents Environment Data settings
 */
export interface DataConfig {
  /**
   * The graphql endpoint url
   */
  syncGraphQLUrl: string;
  /**
   * The graphql websocket url
   */
  wsUrl: string;
  /**
   * Default authentication error message (token expiration)
   */
  authErrorMessage: string;
  /**
   * The error code number the websocket server returns when the Jwt token expires.
   * The Graphql-ws client will not be created without one. (NHost default: 4400)
   */
  socketJwtExpiredCode?: number;
  /**
   * Form Conv service endpoint url
   */
  formconv_post_url: string;
  /**
   * Gnumail service endpoint url.
   * If omitted, the default sendgrid gnumail is used.
   */
  emailSendUrl?: string;
  /**
   * The base url for documentation files bucket
   */
  completionBucketUrl?: string;
  /**
   * The Name identifier of the pouchDb instance
   */
  instanceName: string;
  /**
   * When true, graphql replication happens.
   * Defaults to true.
   */
  live: boolean;
  /**
   * If true, the App will run locally, detached from its backend.
   * No auth is required in this mode.
   */
  backendless: boolean;
  /**
   * If set, determines a fixed duration of the 'Initializing data' screen in milliseconds.
   */
  initializationScreenMaxDuration?: number;
  /**
   * If true, the Backup/Restore panel is available for Admins (default: false)
   */
  backupRestore: boolean;
  /**
   * If true, Dynamic Backend configuration is activated, and the user can choose
   * the Platform to log in to from a select dropdown during login.
   * Those configs must be provided by an external API.
   */
  dynamicBackend: boolean;
  /**
   * The Endpoint from which configuration settings are retrieved
   */
  dynamicBackendapiUrl: string;
}

/**
 * Represents Environment Users settings
 */
export interface UsersConfig {
  /**
   * If specified, the provided roles will be considered as 'Admin' roles for the purpose
   * of determining privileges and permissions.
   * Defaults to just ['admin'].
   */
  adminRoles?: string[];
  /**
   * The default user sections (labels) for the Main navigation
   * and the Dashboard menu.
   */
  userSections?: availableSection[];
  /**
   * The default admin sections (labels) for the Main navigation
   * and the Dashboard menu.
   */
  adminSections?: availableSection[];
  /**
   * If true, the email service is activated (default: false)
   */
  enableEmail: boolean;
  /**
   * Optional Privacy Policy text displayed in login form.
   */
  privacyPolicy?: string;
  /**
   * Optional alternative label to be displayer in the signup form, field "full_name"
   */
  fullNameLabel?: string;
}

/**
 * Represents Environment Languages settings
 */
export interface LanguageConfig {
  /**
   * The default language
   */
  defaultLanguage: string;
  /**
   * The labels of the lanaguages available in the app
   */
  availableLanguages?: string[];
}

/**
 * Represents Environment Forms settings
 */
export interface FormsConfig {
  /**
   * How the form status should be displayed in a forms list
   */
  statusType?: StatusDisplayType;
  /**
   * Object with Form Schemas (by name) as key with the value for status editing (default: true)
   */
  statusEditable?: {[key: string]: boolean};
  /**
   * Object with Form Schemas (by name) as key with the value for record audio enables (default: false)
   */
  recordAudioEnabled?: {[key: string]: boolean};
  /**
   * List of Pipeline Form Schemas (by name)
   */
  pipelines?: string[];
  /**
   * List of Form Schemas (by name) that allow boolean field quick edit directly from the Form List
   */
  booleanQuickEdit?: string[];
  /**
   * If true, the Save Draft functionality and button are available (default: false)
   */
  saveDraft: boolean;
  /**
   * If true, form datas can be duplicated in the list (default: true)
   */
  duplicateAction: boolean;
  /**
   * If true, the Aggregation Form Creator and the '+' floating button are enable (default: true)
   */
  aggregationFormCreator: boolean;
  /**
   * The optional message displayed before form creation/editing
   */
  formInfoMessage?: string;
  /**
   * If true, Form import can be available in form lists. Defaults to true (according to user permissions).
   */
  formImport: boolean;
  /**
   * Object with Form Schemas (by name) as key and with the number of maximum forms per user as value (default: no limit)
   */
  formCreationUserLimits?: {[key: string]: number};
}

/**
 * Represents Environment Metrics settings
 */
export interface MetricsConfig {
  /**
   * If true, Metrics are set to optional for both Forms or Reports
   * Form or Report datas can be created without selecting any metric.
   */
  optionalFormMetrics: boolean;
  optionalReportMetrics: boolean;
  /**
   * Determines which Metrics can be created directly from the Form Metric Selector (+ button)
   * Defaults to 'all'.
   * If no metrics should be created from the form, this should be set to an empty array.
   */
  allowMetricCreationFor?: ('area' | 'case' | 'location' | 'organization' | 'project' | 'all')[];
  /**
   * Determines wether a Metric should be displayed with addional info (another metric field value other than its name)
   * in Filters and in Form Metrics Selector.
   * (eg. {case: 'note', project: 'code', organization: 'metric_data descrizione'})
   */
  secondaryMetricFieldsDisplayed: {
    [metricName: string]: string | string[];
  } | null;
}

/**
 * Represents Environment Layout settings
 */
export interface LayoutConfig {
  /**
   * The type of the dashboard component loaded by the app
   */
  dashboardType: DashboardType;
  /**
   * If true, Add/Remove from/to Favorites actions are displayed
   */
  favorites: boolean;
  /**
   * If true, the content of the Ajf Form Fields is centered. Defaults to false.
   */
  centeredFieldsContent: boolean;
  /**
   * The max number of columns on which the Ajf Form Fields are spread. Defaults to 1.
   */
  maxAjfFormColumns?: 1 | 2 | 3;
  /**
   * If true, the sidenav menu is extended when the App loads. Defaults to false.
   */
  initialExtendedSidenav: boolean;
  /**
   * If true, List bulk actions are available. Defaults to true.
   */
  bulkActions: boolean;
  /**
   * The default page size
   */
  pageSize: number;
  /**
   * The available page size options
   */
  pageSizeOptions: number[];

  /**
   * Optional alternative url for help button
   */
  helpUrl?: string;

  /**
   * Optional alternative tooltip for help button
   */
  helpTooltip?: string;

  /**
   * Optional NGX UI Tour configuration
   */
  uiTourConfig?: UITourConfig;
}

/**
 * Represents environment Optional modules configuration
 */
export interface OptionalConfig {
  /**
   * Thematic areas module.
   */
  areasModule: boolean;
  /**
   * Cases module.
   */
  caseModule: boolean;
  /**
   * Projects module.
   */
  projectsModule: boolean;
  /**
   * Locations module.
   */
  locationsModule: boolean;
  /**
   * Organizations module.
   */
  organizationsModule: boolean;
  /**
   * Form Logging module.
   */
  logsModule?: boolean;
  /**
   * Gpt Module.
   */
  gptModule?: boolean;
  /**
   * Stripe Module
   */
  stripePaymentModule?: boolean;
}

/**
 * Represents custom image paths for logos, spinners and some basic app icons
 */
export interface CustomImagesConfig {
  /**
   * Logo image for the light theme
   */
  logoLight?: string;
  /**
   * Logo image for the dark theme
   */
  logoDark?: string;
  /**
   * Logo big image (eg. login view) for the light theme
   */
  logoBigLight?: string;
  /**
   * Logo big image (eg. login view) for the dark theme
   */
  logoBigDark?: string;
  /**
   * Spinner image for the light theme
   */
  spinnerLight?: string;
  /**
   * Spinner image for the dark theme
   */
  spinnerDark?: string;
  /**
   * FavIcon
   */
  favicon?: string;
}

/**
 * Represents all configurations related to remote tracking (error, analytics etc.)
 */
export interface RemoteTrackingConfig {
  /**
   * If true, Analytics tracking is on.
   */
  analytics?: boolean;
  /**
   * If true, Remote error tracking is on.
   */
  errors?: boolean;
  /**
   * The errors-tracking service url
   */
  errorsUrl?: string;
  /**
   * If true, errors are collected and queued offline, then sent to the
   * Remote service once the app is back online
   */
  errorsOffline?: boolean;
}

/**
 * Represents all configurations related to Pandino API
 */
export interface PandinoConfig {
  /**
   * Base url of Pandino Flask API
   */
  pandinoUrl: string;
  /**
   * Namespaces available to Completion Chat
   */
  pandinoGptNamespaces: string[];
}

/**
 * Represents all the custom svg icon slots available in the app
 */
export interface CustomSvgIcons {
  userSection?: string;
  sync?: string;
  dashboard?: string;
  forms?: string;
  aggregation?: string;
  metrics?: string;
  reports?: string;
  users?: string;
  translations?: string;
}

/**
 * THe available navigation sections
 */
export type availableSection =
  | 'dashboard'
  | 'forms'
  | 'reports'
  | 'aggregation'
  | 'metrics'
  | 'users'
  | 'languages'
  | 'notifications'
  | 'gpt'
  | 'rag';

/**
 * Represents a Manifest Icon object
 */
export interface DinoManifestIcon {
  src: string;
  sizes: string;
  type: string;
  purpose: string;
}

/**
 * Represents a Dino App custom webmanifest structure.
 * Can be merged with a full webmanifest to provide a pwa custom webmanifest,
 * which will be set by the main component in the index.html link element.
 * Start Url MUST be provided as absolute path. Icons must be provided.
 */
export interface DinoManifest {
  start_url: string;
  icons: DinoManifestIcon[];
  scope?: string;
  name?: string;
  short_name?: string;
  theme_color?: string;
  background_color?: string;
}

/**
 * E2E testing configuration. When enabled, mock services and fake data are used.
 * Only set in environment.e2e.ts — never in production environments.
 */
export interface E2eConfig {
  enabled: boolean;
}

/**
 * Represents a Dino App environment structure
 */
export interface DinoEnvironment {
  /**
   * True for production mode
   */
  production: boolean;
  /**
   * E2E test configuration. Activates mock services and fake data seeding when enabled.
   */
  e2eConfig?: E2eConfig;
  /**
   * If true, the pwa in installable from the browser.
   */
  installable?: boolean;
  /**
   * The Authentication settings
   */
  authConfig: AuthServiceConfig;
  /**
   * The Data Settings
   */
  dataConfig: DataConfig;
  /**
   * The Users Settings
   */
  usersConfig: UsersConfig;
  /**
   * The Forms Settings
   */
  formsConfig: FormsConfig;
  /**
   * The Metrics Settings
   */
  metricsConfig: MetricsConfig;
  /**
   * The Languages Settings
   */
  languageConfig: LanguageConfig;
  /**
   * The Layout Settings
   */
  layoutConfig: LayoutConfig;
  /**
   * The Optional modules activation flags
   */
  optionalModulesConfig: OptionalConfig;
  /**
   * Configurations related to remote tracking (error, analytics etc.)
   */
  remoteTrackingConfig: RemoteTrackingConfig;
  /**
   * Configurations related to Stripe payments
   */
  stripePaymentConfig: StripePaymentConfig;
  /**
   * Configurations related to Pandino API
   */
  pandinoConfig: PandinoConfig;
  /**
   * Custom logos, spinners and icons paths
   */
  customImagesConfig?: CustomImagesConfig;
  /**
   * Custom svg App icons
   */
  customSvgIcons?: CustomSvgIcons;
  /**
   * The default Dino Theme configuration
   */
  themeConfig?: Partial<DinoTheme> & {isAutoContrast: boolean; isDarkTheme: boolean};
  /**
   * Url of the file of Actions performed by the app based on specific triggers
   */
  actionsUrl?: string;
  /**
   * Url of the file of Ajf custom functions available in ajf forms and reports
   */
  ajfCustomFunctionsUrl?: string;
  /**
   * The custom WebManifest data
   */
  webManifest?: DinoManifest;
}
