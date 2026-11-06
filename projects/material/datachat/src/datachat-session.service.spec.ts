import {Component} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {provideRouter, Router} from '@angular/router';
import {AuthService} from '@dino/core/auth';
import {DataChatSessionService} from './datachat-session.service';

@Component({template: '', standalone: true})
class EmptyComponent {}

describe('DataChatSessionService', () => {
  let session: DataChatSessionService;
  let router: Router;
  const dataset = new File(['a,b\n1,2'], 'dataset.csv');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([{path: '**', component: EmptyComponent}]),
        {provide: AuthService, useValue: {getUserInfo: () => null}},
      ],
    });
    session = TestBed.inject(DataChatSessionService);
    router = TestBed.inject(Router);
  });

  it('should keep the dataset while the User moves inside the form section', async () => {
    await router.navigateByUrl('/forms/schema-1/datachat');
    session.keepDataset('schema-1', dataset);

    await router.navigateByUrl('/forms/schema-1/list');
    expect(session.datasetFor('schema-1')).toBe(dataset);
    expect(session.datasetFor('schema-2')).toBeNull();
  });

  it('should drop the dataset when the User leaves the form section', async () => {
    await router.navigateByUrl('/forms/schema-1/datachat');
    session.keepDataset('schema-1', dataset);

    await router.navigateByUrl('/forms/schema-2/datachat');
    expect(session.datasetFor('schema-1')).toBeNull();
  });
});
