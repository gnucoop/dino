import {Injectable} from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {ConnectionStatus, Network} from '@capacitor/network';
import {NetworkStatusService as CoreNetworkStatusService} from '@dino/core/auth';
import {Subject} from 'rxjs';
import {distinctUntilChanged, map, shareReplay, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class NetworkStatusService extends CoreNetworkStatusService {
  constructor() {
    super();

    if (Capacitor.getPlatform() !== 'web') {
      const networkChange = new Subject<ConnectionStatus>();
      Network.addListener('networkStatusChange', status => networkChange.next(status));
      Network.getStatus().then(status => networkChange.next(status));

      this._isOnline$ = networkChange.pipe(
        map(status => status.connected === true),
        distinctUntilChanged(),
        tap(st => this.updateStatusHistory(st, 2)),
        shareReplay(1),
      );
    }
  }
}
