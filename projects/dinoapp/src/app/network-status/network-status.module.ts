import {ModuleWithProviders, NgModule} from '@angular/core';
import {NetworkStatusService as CoreNetworkStatusService} from '@dino/core/auth';
import {NetworkStatusService} from './services/network-status.service';

@NgModule({})
export class NetworkStatusModule {
  static forRoot(): ModuleWithProviders<NetworkStatusModule> {
    return {
      ngModule: NetworkStatusModule,
      providers:
          [{provide: CoreNetworkStatusService, useClass: NetworkStatusService}],
    };
  }
}