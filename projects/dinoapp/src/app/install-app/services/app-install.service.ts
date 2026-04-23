import {Platform} from '@angular/cdk/platform';
import {Injectable} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';
import {InstallAppModule} from '../install-app.module';
import {InstallAppComponent} from '../components/install-app.component';
import {environment} from 'src/environments/environment';
import {Router} from '@angular/router';

@Injectable({providedIn: InstallAppModule})
export class AppInstallService {
  private promptEvent: any;

  constructor(
    private _bottomSheet: MatBottomSheet,
    private _platform: Platform,
    private _router: Router,
  ) {}

  public initPwaPrompt() {
    if (environment.installable) {
      if (this._platform.IOS && this._platform.SAFARI) {
        const isInStandaloneMode =
          (window as any).navigator.standalone || (window as any).clientInformation.standalone;
        if (!isInStandaloneMode) {
          this.openPromptComponent('ios');
        }
      } else if (this._platform.ANDROID) {
        window.addEventListener('beforeinstallprompt', (event: any) => {
          event.preventDefault();
          this.promptEvent = event;
          this.openPromptComponent('android');
        });
      } else if (this._platform.isBrowser) {
        window.addEventListener('beforeinstallprompt', (event: any) => {
          event.preventDefault();
          this.promptEvent = event;
          this.openPromptComponent('browser');
        });
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android' | 'browser') {
    timer(3000)
      .pipe(take(1))
      .subscribe(() => {
        const fullUrl = this._router.url;
        if (!this._checkIfIsPublicForm(fullUrl)) {
          this._bottomSheet.open(InstallAppComponent, {
            data: {mobileType, promptEvent: this.promptEvent},
          });
        }
      });
  }

  /**
   * Check if the input string is a public form url, like this: '/f/<uuid>'
   * @param str the url to check
   */
  private _checkIfIsPublicForm(str: string): boolean {
    const regexExp =
      /\/f\/[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/gi;
    return regexExp.test(str);
  }
}
