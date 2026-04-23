import {ChangeDetectionStrategy, Component, HostListener, ViewEncapsulation} from '@angular/core';
import {environment} from 'src/environments/environment';
import {inject} from '@vercel/analytics';
import {baseManifest} from './base-webmanifest';
@Component({
  selector: 'dino-root',
  templateUrl: './dino.component.html',
  styleUrls: ['./dino.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DinoComponent {
  title = 'dinoapp';
  constructor() {
    if (environment.remoteTrackingConfig.analytics) {
      inject();
    }
    this._setFavicon();
    this._setDynamicManifest();
  }

  @HostListener('mousewheel', ['$event']) onMouseWheelChrome(event: any) {
    this.disableScroll(event);
  }

  @HostListener('DOMMouseScroll', ['$event']) onMouseWheelFirefox(event: any) {
    this.disableScroll(event);
  }

  @HostListener('onmousewheel', ['$event']) onMouseWheelIE(event: any) {
    this.disableScroll(event);
  }

  /**
   * Disables scroll number change for all Inputs with type "number"
   * @param event The scroll event
   */
  disableScroll(event: any) {
    if (event.srcElement.type === 'number') event.preventDefault();
  }

  /**
   * Sets the Favicon path
   */
  private _setFavicon() {
    const favIconPath = environment.customImagesConfig?.favicon;
    const favIconElement: HTMLLinkElement | null = document.querySelector('#favIcon');
    if (!favIconElement || !favIconPath) {
      return;
    }
    favIconElement.href = favIconPath;
  }

  private _setDynamicManifest() {
    const customManifest = environment.webManifest;

    const manifestLinkElement: Element | null = document.querySelector('#web-manifest');
    const applePwaIconElement: Element | null = document.querySelector('#apple-pwa-icon');
    const applePwaNameElement: Element | null = document.querySelector('#apple-pwa-name');

    if (customManifest) {
      let myManifest = {...baseManifest, ...customManifest};
      if (!myManifest.scope) {
        myManifest.scope = myManifest.start_url;
      }
      const stringManifest = JSON.stringify(myManifest);
      const blob = new Blob([stringManifest], {type: 'application/manifest+json'});
      const manifestURL = URL.createObjectURL(blob);
      const findAppleTouchManifestIcon = myManifest.icons.find(icon => icon.sizes === '192x192');
      if (applePwaIconElement && findAppleTouchManifestIcon) {
        applePwaIconElement.setAttribute('href', findAppleTouchManifestIcon.src);
      }
      if (applePwaNameElement) {
        applePwaNameElement.setAttribute('content', myManifest.name);
      }
      if (manifestLinkElement) {
        manifestLinkElement.setAttribute('href', manifestURL);
      }
    } else {
      if (applePwaIconElement) {
        applePwaIconElement.setAttribute('href', 'assets/icons/pwa-icons/default/icon-192x192.png');
      }
      if (applePwaNameElement) {
        applePwaNameElement.setAttribute('content', 'Dino');
      }
    }
  }
}
