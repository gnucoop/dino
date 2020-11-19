import {CommitMessageConfig} from '@angular/dev-infra-private/commit-message/config';

/**
 * The configuration for `ng-dev commit-message` commands.
 */
export const commitMessage: CommitMessageConfig = {
  maxLineLength: 120,
  minBodyLength: 0,
  minBodyLengthTypeExcludes: ['docs'],
  scopes: [
    'core/auth',
    'core/data',
    'ionic/login',
    'material/login',
  ],
};
