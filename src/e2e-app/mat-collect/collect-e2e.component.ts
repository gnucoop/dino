import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {NetworkStatusService} from '@dewco/core/auth';
import {FormData, FormDataManager, FormSchema, FormSchemaManager} from '@dewco/core/forms';
import {BreakpointObserverService} from '@dewco/material/breakpoint-observer';
import {of as obsOf, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

import {FakeDataGenerator} from '../fake-data-generator';
import {formDatas} from '../test-ajf-formdata';
import {formSchemas} from '../test-ajf-formschema';

/**
 * Only used to generate fake data for the e2e app
 */
const fakeSchemaGenerator = new FakeDataGenerator<FormSchema>();
const fakeDataGenerator = new FakeDataGenerator<FormData>();


@Component({
  selector: 'app-collect',
  templateUrl: 'collect-e2e.component.html',
})
export class MatCollectE2E implements OnInit, OnDestroy {
  isCollectEvt: EventEmitter<boolean> = new EventEmitter<boolean>(true);
  /**
   * Subscription to the fakeData generators
   */
  isCollectSub: Subscription = Subscription.EMPTY;
  readonly collectItems = [
    {
      name: 'list',
      label: 'Forms List',
      icon: 'list',
      url: '/list',
    },
  ];

  constructor(
      readonly breakpointObserver: BreakpointObserverService,
      readonly networkStatus: NetworkStatusService,
      readonly fsm: FormSchemaManager,
      readonly fdm: FormDataManager,
  ) {}

  ngOnInit(): void {
    this.isCollectSub = fakeSchemaGenerator.generateData(this.fsm, formSchemas)
                            .pipe(
                                switchMap(res => {
                                  if (res.success == null || res.success.length === 0) {
                                    return obsOf(null);
                                  }
                                  const genSchemaId = res.success[0].id;
                                  for (let idx = 0; idx < formDatas.length; idx++) {
                                    formDatas[idx].schema_id = genSchemaId;
                                  }
                                  return fakeDataGenerator.generateData(this.fdm, formDatas);
                                }),
                                )
                            .subscribe(_ => this.isCollectEvt.emit(true));
  }

  ngOnDestroy(): void {
    this.isCollectSub.unsubscribe();
  }
}
