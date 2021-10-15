import {Component, ViewEncapsulation} from '@angular/core';
import {Section} from '@dewco/material/main-nav';

@Component({
  selector: 'app-main',
  templateUrl: 'main-e2e.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class MatMainE2E {
  sections: Section[] = [
    {
      label: 'Dashboard',
      url: 'dashboard',
      icon: 'apps',
    },
    {
      label: 'Forms',
      url: 'forms',
      icon: 'list_alt',
    },
    {
      label: 'Reports',
      url: 'reports',
      icon: 'stacked_bar_chart',
    },
  ];

  adminSections: Section[] = [
    {
      label: 'Users',
      url: 'users',
      icon: 'people',
    },
  ];
}
