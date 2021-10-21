import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BreakpointObserverModule} from '@dewco/material/breakpoint-observer';
import {CollectModule as DinoCollectModule} from '@dewco/material/collect';

import {MatUsersE2E} from './users-e2e.component';

@NgModule({
  declarations: [MatUsersE2E],
  imports: [BreakpointObserverModule, CommonModule, DinoCollectModule],
})
export class MaterialUsersE2eModule {}
