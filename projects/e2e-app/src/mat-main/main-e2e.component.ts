import {Component, ViewEncapsulation} from '@angular/core';
import {PermissionContextService} from '@dino/core/data';
import {Section} from '@dino/material/main-nav';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: 'main-e2e.component.html',
  styles: [
    `
    app-main, main, dino-main-nav {
      display: block;
      height: 100%;
      position: relative;
    }
  `,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MatMainE2E {
  constructor(private _pcs: PermissionContextService) {}
  sections: Observable<Section[]> = this._pcs.fullContext.pipe(
    filter(ctx => ctx != null && ctx.user_permissions != null),
    map(context => {
      const sections = [
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
      ];
      if (context && context.user_permissions != null) {
        sections.push({
          label: 'Aggregation',
          url: 'aggregation',
          icon: 'manage_search',
        });
      }
      sections.push({
        label: 'Reports',
        url: 'reports',
        icon: 'stacked_bar_chart',
      });
      if (
        context &&
        context.user_permissions != null &&
        !this._pcs.isActiveUserGuestOnly(context.user_permissions)
      ) {
        sections.push({label: 'Metrics', icon: 'bookmarks', url: 'metrics'});
      }

      return sections;
    }),
  );

  adminSections: Section[] = [
    {
      label: 'Users',
      url: 'users',
      icon: 'people',
    },
    {
      label: 'Languages',
      url: 'languages',
      icon: 'translate',
    },
  ];
}
