import {DinoEnvironment} from './environment-interface';

export const environment: DinoEnvironment = {
  'production': false,
  'installable': false,
  'e2eConfig': {
    'enabled': true,
  },
  'authConfig': {
    'host': '',
    'applicationId': null,
    'retryRefreshTime': 3000,
    'retryAttemptsMax': 1,
    'failedAuthRedirect': 'login',
  },
  'dataConfig': {
    'syncGraphQLUrl': 'http://localhost:8080/v1/graphql',
    'wsUrl': 'ws://localhost:8080/v1/graphql',
    'authErrorMessage': 'Could not verify JWT: JWTExpired',
    'formconv_post_url': 'https://formconv.herokuapp.com/result.json',
    'instanceName': 'dino_e2e',
    'live': false,
    'backupRestore': false,
    'dynamicBackend': false,
    'dynamicBackendapiUrl': '',
    'backendless': false,
  },
  'usersConfig': {
    'adminRoles': ['admin'],
    'userSections': ['dashboard', 'forms', 'reports', 'aggregation', 'metrics'],
    'adminSections': ['users', 'languages'],
    'enableEmail': false,
  },
  'formsConfig': {
    'statusType': 'progress',
    'pipelines': ['pipeline_test'],
    'booleanQuickEdit': [],
    'saveDraft': false,
    'duplicateAction': true,
    'aggregationFormCreator': true,
    'formImport': true,
  },
  'metricsConfig': {
    'optionalFormMetrics': true,
    'optionalReportMetrics': true,
    'allowMetricCreationFor': ['all'],
    'secondaryMetricFieldsDisplayed': null,
  },
  'languageConfig': {
    'defaultLanguage': 'ENG',
    'availableLanguages': ['AR', 'ENG', 'ESP', 'FRA', 'ITA', 'PRT', 'UKR'],
  },
  'layoutConfig': {
    'dashboardType': 'menu',
    'favorites': true,
    'centeredFieldsContent': false,
    'initialExtendedSidenav': false,
    'bulkActions': true,
    'pageSize': 10,
    'pageSizeOptions': [5, 10, 25, 50, 100, 500],
  },
  'optionalModulesConfig': {
    'areasModule': true,
    'caseModule': true,
    'projectsModule': true,
    'locationsModule': true,
    'organizationsModule': true,
    'gptModule': false,
    'logsModule': true,
    'stripePaymentModule': false,
  },
  'pandinoConfig': {
    'pandinoUrl': 'http://localhost:5000',
    'pandinoGptNamespaces': ['Dino'],
  },
  'stripePaymentConfig': {
    'stripeKey': '',
    'gnuPayUrl': '',
    'pandinoTokenID': '',
  },
  'remoteTrackingConfig': {
    'analytics': false,
    'errors': false,
  },
  'themeConfig': {
    'isAutoContrast': true,
    'isDarkTheme': false,
  },
};
