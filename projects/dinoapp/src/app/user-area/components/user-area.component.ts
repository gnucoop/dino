import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ThemeService} from '@dino/material/core';
import {isUserAreaPanelType, UserAreaPanelType} from '@dino/material/user-area';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import * as conf from '../../main-nav/conf';
import {loadingSpinner, themedImagePath} from '../../themed-images';

@Component({
  selector: 'dinoapp-user-area',
  templateUrl: './user-area.component.html',
  styleUrls: ['./user-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserAreaComponent {
  readonly backupRestore: boolean = environment.dataConfig.backupRestore ?? false;
  readonly adminRoles: string[] = environment.usersConfig.adminRoles ?? ['admin'];
  readonly appVersion: string = conf.appVersionLabel;
  readonly lightSpinnerPath: string = loadingSpinner.light;
  readonly spinnerImagePath: Observable<string>;
  readonly activeTab: Observable<UserAreaPanelType>;

  constructor(private _route: ActivatedRoute, private _router: Router, ts: ThemeService) {
    this.spinnerImagePath = themedImagePath(ts, loadingSpinner);
    this.activeTab = this._route.paramMap.pipe(
      map(params => {
        const tab = params.get('tab');
        return isUserAreaPanelType(tab) ? tab : 'password';
      }),
    );
  }

  /**
   * Puts the picked tab in the url. Replaces the history entry rather than pushing one,
   * so Back leaves the page instead of walking back through the tabs.
   * @param tab The tab the page moved to
   */
  goToTab(tab: UserAreaPanelType): void {
    this._router.navigate(['/user-area', tab], {replaceUrl: true});
  }
}
