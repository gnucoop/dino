import {environment} from '../../environments/environment';
import {LoginPageConfig} from '../../environments/environment-interface';

export const redirectPath = 'dashboard';
export const dynamicConfiguration = environment.dataConfig.dynamicBackend;

export const privacyPolicy: string | null = environment.usersConfig.privacyPolicy ?? null;
export const fullNameLabel: string | undefined = environment.usersConfig.fullNameLabel;

/**
 * The texts of the login page introduction configured for this deployment.
 */
export const loginPage: LoginPageConfig = environment.loginPageConfig ?? {};

/**
 * Whether the login page lists the Dino modules under its introduction.
 */
export const showLoginModules: boolean = loginPage.showModules ?? true;
