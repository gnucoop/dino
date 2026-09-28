import {AuthService} from '@dino/core/auth';
import {MetricsService} from '@dino/core/data';
import {firstValueFrom, of} from 'rxjs';

import {PermissionContextServiceBackendless} from './backendless-services';

describe('PermissionContextServiceBackendless', () => {
  const authService = {
    authenticated: of({auth: true, evt: 'login'}),
    getUserInfo: () => ({}),
  } as unknown as AuthService;

  // Nothing emits the start of the collections on a backendless instance, so the user
  // group manager never fills the permissions: the service has to hold them itself.
  it('should allow creating form and report schemas', async () => {
    const pcs = new PermissionContextServiceBackendless(authService, {} as MetricsService);

    expect(await firstValueFrom(pcs.getAllowedActions('form_schema', 'all'))).toContain('create');
    expect(await firstValueFrom(pcs.getAllowedActions('report_schema', 'all'))).toContain(
      'create',
    );
  });
});
