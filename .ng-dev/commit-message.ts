import {CommitMessageConfig} from '@angular/dev-infra-private/ng-dev/commit-message/config';

/**
 * The configuration for `ng-dev commit-message` commands.
 */
export const commitMessage: CommitMessageConfig = {
  maxLineLength: Infinity,
  minBodyLength: 0,
  minBodyLengthTypeExcludes: ['docs'],
  scopes: [
    'multiple', // For when a commit applies to multiple components.
    'core/areas',
    'core/auth',
    'core/config',
    'core/data',
    'core/error-handler',
    'core/forms',
    'core/list',
    'core/locations',
    'core/organizations',
    'core/projects',
    'core/users',
    'e2e-mat/list',
    'e2e-mat/login',
    'e2e-mat',
    'material/list',
    'material/login',
    'material/main-nav',
    'material',
    'e2e-material',
    'material/breakpoint-observer',
    'material/edit-form',
    'material/main-nav',
    'material/metric-editor',
    'material/metric-section',
    'material/mixed-editor',
    'material/collect',
    'material/floating-button',
    'material/form-metric-selector',
    'material/search-filters-bar',
    'material/search-filters-chips',
    'material/search-filters-dialog',
    'material/search-filters-preset-manager',
    'material/search-filters-widget',
    'material/user-editor',
  ],
};
