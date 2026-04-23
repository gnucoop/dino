import {environment} from 'src/environments/environment';

export const collectItems = [
  {
    name: 'forms',
    label: 'Forms',
    icon: 'list_alt',
    url: '/forms',
    svgIcon: environment.customSvgIcons?.forms,
  },
  {
    name: 'reports',
    label: 'Reports',
    icon: 'stacked_bar_chart',
    url: '/reports',
    svgIcon: environment.customSvgIcons?.reports,
  },
].filter(section => {
  if (!environment.usersConfig.userSections) {
    return true;
  }
  const findSection = environment.usersConfig.userSections.find(
    userSect => userSect === section.label.toLowerCase(),
  );
  return findSection;
});

export const adItems = [
  {
    name: 'users',
    label: 'Users',
    icon: 'people',
    url: '/users',
    svgIcon: environment.customSvgIcons?.users,
  },
];

if (environment.usersConfig.adminSections) {
  if (environment.usersConfig.adminSections.includes('metrics')) {
    adItems.push({
      name: 'metrics',
      label: 'Metrics',
      icon: 'bookmarks',
      url: 'metrics',
      svgIcon: environment.customSvgIcons?.metrics,
    });
  }
  if (environment.usersConfig.adminSections.includes('reports')) {
    adItems.push({
      name: 'reports',
      label: 'Reports',
      url: 'reports',
      icon: 'stacked_bar_chart',
      svgIcon: environment.customSvgIcons?.reports,
    });
  }
  if (environment.usersConfig.adminSections.includes('aggregation')) {
    adItems.push({
      name: 'aggregation',
      label: 'Aggregation',
      url: 'aggregation',
      icon: 'zoom_in',
      svgIcon: environment.customSvgIcons?.aggregation,
    });
  }
}

export const adminItems = adItems.filter(section => {
  if (!environment.usersConfig.adminSections) {
    return true;
  }
  const findSection = environment.usersConfig.adminSections.find(
    userSect => userSect === section.label.toLowerCase(),
  );
  return findSection;
});

export const metricItem = {
  name: 'metrics',
  label: 'Metrics',
  icon: 'bookmarks',
  url: '/metrics',
  svgIcon: environment.customSvgIcons?.metrics,
};

export const adminRoles: string[] | undefined = environment.usersConfig.adminRoles;
