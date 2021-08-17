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
      label: 'Collect Forms',
      url: 'collect',
      icon: 'list_alt',
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
