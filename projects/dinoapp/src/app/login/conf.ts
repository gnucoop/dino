import {environment} from '../../environments/environment';

export const redirectPath = 'dashboard';
export const dynamicConfiguration = environment.dataConfig.dynamicBackend;

export const privacyPolicy: string | null = environment.usersConfig.privacyPolicy ?? null;
export const fullNameLabel: string | undefined = environment.usersConfig.fullNameLabel;
