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
    'ionic/login',
    'material/login',
    'material',
    'e2e-material',
  ],
};
