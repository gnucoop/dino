import {Injectable, Optional} from '@angular/core';
import {SwUpdate, VersionEvent} from '@angular/service-worker';
import {environment} from 'src/environments/environment';
import {Subscription, interval} from 'rxjs';
import {InstallAppModule} from '../install-app.module';

@Injectable({providedIn: InstallAppModule})
export class AppUpdateService {
  private _checkForUpdatesSub: Subscription = Subscription.EMPTY;

  constructor(@Optional() private _updates: SwUpdate) {
    if (this._updates != null && environment.installable && this._updates.isEnabled) {
      this._updates.versionUpdates.subscribe(evt => {
        if (evt.type === 'VERSION_READY') {
          this.setNewVersionAlert(evt);
        }
      });
    }
  }

  public checkForUpdates() {
    if (this._updates != null && environment.installable && this._updates.isEnabled) {
      this._updates.checkForUpdate();
      this._checkForUpdatesSub.unsubscribe();
      this._checkForUpdatesSub = interval(1000 * 60 * 60).subscribe(() =>
        this._updates.checkForUpdate(),
      );
    }
  }

  private setNewVersionAlert(event: VersionEvent) {
    if (event && event.type === 'VERSION_READY') {
      const appData: {name: string; version: string; sw_version: string} | undefined = event
        .latestVersion.appData as {name: string; version: string; sw_version: string} | undefined;

      const appVersion = appData ? appData.version : null;
      const swVersion = appData ? appData.sw_version : null;
      const msg = appVersion ? `${appVersion} (${swVersion})` : 'Not available';
      localStorage.setItem('dino_new_version_ready', msg);
    }
  }
}
