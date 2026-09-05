import {PermissionContextService} from '@dino/core/data';
import {Section} from '@dino/material/main-nav';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

const pkg = require('../../../package.json');
const ngsw = require('../../../ngsw-config.json');

export function getSections(pcs: PermissionContextService): Observable<Section[]> {
  return pcs.fullContext.pipe(
    filter(ctx => ctx != null && ctx.user_permissions != null),
    map(context => {
      const sections = [
        {
          label: 'Dashboard',
          url: 'dashboard',
          icon: 'apps',
          svgIcon: environment.customSvgIcons?.dashboard,
        },
        {
          label: 'Forms',
          url: 'forms',
          icon: 'list_alt',
          svgIcon: environment.customSvgIcons?.forms,
        },
        {
          label: 'Reports',
          url: 'reports',
          icon: 'stacked_bar_chart',
          svgIcon: environment.customSvgIcons?.reports,
        },
      ];
      if (context && context.user_permissions != null) {
        sections.push({
          label: 'Aggregation',
          url: 'aggregation',
          icon: 'zoom_in',
          svgIcon: environment.customSvgIcons?.aggregation,
        });
      }
      if (environment.optionalModulesConfig.gptModule) {
        sections.push({label: 'AI', url: 'ai', icon: 'chat', svgIcon: undefined});
      }
      if (
        context &&
        context.user_permissions != null &&
        !pcs.isActiveUserGuestOnly(context.user_permissions)
      ) {
        sections.push({
          label: 'Metrics',
          icon: 'bookmarks',
          url: 'metrics',
          svgIcon: environment.customSvgIcons?.metrics,
        });
      }

      return sections.filter(section => {
        if (!environment.usersConfig.userSections) {
          return true;
        }
        const findSection = environment.usersConfig.userSections.find(
          userSect => userSect === section.label.toLowerCase(),
        );
        return findSection;
      });
    }),
  );
}

export const adSections: Section[] = [
  {
    label: 'Users',
    url: 'users',
    icon: 'people',
    svgIcon: environment.customSvgIcons?.users,
  },
  {
    label: 'Languages',
    url: 'languages',
    icon: 'translate',
    svgIcon: environment.customSvgIcons?.translations,
  },
];

if (environment.usersConfig.adminSections) {
  if (environment.usersConfig.adminSections.includes('metrics')) {
    adSections.push({
      label: 'Metrics',
      icon: 'bookmarks',
      url: 'metrics',
      svgIcon: environment.customSvgIcons?.metrics,
    });
  }
  if (environment.usersConfig.adminSections.includes('reports')) {
    adSections.push({
      label: 'Reports',
      url: 'reports',
      icon: 'stacked_bar_chart',
      svgIcon: environment.customSvgIcons?.reports,
    });
  }
  if (environment.usersConfig.adminSections.includes('aggregation')) {
    adSections.push({
      label: 'Aggregation',
      url: 'aggregation',
      icon: 'zoom_in',
      svgIcon: environment.customSvgIcons?.aggregation,
    });
  }
  if (environment.usersConfig.adminSections.includes('rag')) {
    adSections.push({
      label: 'RAG',
      url: 'rag',
      icon: 'document_scanner',
    });
  }
}

export const adminSections = adSections;

const DOC_LANG_BY_APP_LANG: {[appLang: string]: string} = {
  ENG: 'en',
  ITA: 'it',
  ESP: 'es',
  FRA: 'fr',
  PRT: 'pt',
  UKR: 'uk',
  AR: 'ar',
};
const defaultDocLang =
  DOC_LANG_BY_APP_LANG[environment.languageConfig.defaultLanguage ?? 'ENG'] ?? 'en';
const defaultHelpUrl = `https://gnucoop.github.io/dino/${defaultDocLang}/`;

export const linkIcons = [
  {
    icon: 'info',
    tooltip: `DINO v.${pkg.version} (${ngsw.appData.sw_version}) -  Angular: ${pkg.dependencies[
      '@angular/core'
    ].replace('^', '')}, Ajf: ${pkg.dependencies['@ajf/core'].replace(
      '^',
      '',
    )}, RxDb: ${pkg.dependencies['rxdb'].replace('^', '')}`,
  },
  {
    icon: 'help',
    url: environment.layoutConfig.helpUrl ? environment.layoutConfig.helpUrl : defaultHelpUrl,
    tooltip: environment.layoutConfig.helpTooltip
      ? environment.layoutConfig.helpTooltip
      : 'Learn about DINO!',
  },
];

export const defaultAvailableLangs = ['ITA', 'ENG', 'FRA', 'PRT', 'ESP'];
export const availableLangs =
  environment.languageConfig.availableLanguages ?? defaultAvailableLangs;
export const initialExtendedSidenav = environment.layoutConfig.initialExtendedSidenav ?? false;
export const customSvgIcons = environment.customSvgIcons;

/**
 * The app version, displayed in the user card at the bottom of the sidenav.
 */
export const appVersion: string = pkg.version;

/**
 * The app version together with the service worker build, as the build info tooltip
 * spells it out, eg. '18.0.5 (148)'.
 */
export const appVersionLabel: string = `${pkg.version} (${ngsw.appData.sw_version})`;

/**
 * The labels heading the two navigation groups in the sidenav.
 */
export const userSectionsLabel = 'User';
export const adminSectionsLabel = 'Administration';
