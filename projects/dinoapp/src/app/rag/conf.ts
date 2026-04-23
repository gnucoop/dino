import {environment} from 'src/environments/environment';

export const pandinoUrl = environment.pandinoConfig.pandinoUrl;
export const graphqlUrl = environment.dataConfig.syncGraphQLUrl;
export const filesUrl = environment.authConfig.host.replace('auth.', 'storage.') + '/files';
export const namespaces = environment.pandinoConfig.pandinoGptNamespaces;
