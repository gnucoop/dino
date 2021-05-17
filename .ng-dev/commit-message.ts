import {CommitMessageConfig} from '@angular/dev-infra-private/commit-message/config';

/**
 * The configuration for `ng-dev commit-message` commands.
 */
export const commitMessage: CommitMessageConfig = {
  maxLineLength: Infinity,
  minBodyLength: 0,
  minBodyLengthTypeExcludes: ['docs'],
  scopes: [
    'core/auth',
    'core/data',
    'core/error-handler',
    'core/forms',
    'core/list',
    'core/locations',
    'core/projects',
    'e2e-mat/list',
    'e2e-mat/login',
    'e2e-mat',
    'material/list',
    'material/login',
    'material',
    'e2e-material',
    'material/breakpoint-observer',
    'material/edit-form',
    'material/main-nav',
    'material/collect',
    'material/search-filters-bar',
    'material/search-filters-chips',
    'material/search-filters-dialog',
    'material/search-filters-preset-manager',
    'material/search-filters-widget',
  ],
};
