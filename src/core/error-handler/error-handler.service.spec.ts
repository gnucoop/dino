import {HttpErrorResponse} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {ErrorHandlerService} from './index';

describe('ErrorHandlerService', () => {
  let ehs: ErrorHandlerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [ErrorHandlerService],
    });
    ehs = TestBed.inject(ErrorHandlerService);
  });

  it('should print a `DEWCO ERROR` in the console, with the URL origin of the error', () => {
    const spyLog = spyOn(window.console, 'error').and.callThrough();
    const error = new Error('Test error');
    ehs.handleError(error);

    expect(spyLog).toHaveBeenCalledWith(`DEWCO ERROR: ${error.message} \n URL: /`);
  });

  it('should correctly handle HttpErrorResponses', () => {
    const spyLog = spyOn(window.console, 'error').and.callThrough();
    const errorResponse = {error: 'test error response', status: 404, message: 'Not found'};
    const httpError = new HttpErrorResponse(errorResponse);
    ehs.handleError(httpError);

    const expectedError = `DEWCO HTTP ERROR \n Backend returned status code: ${
        httpError.status} \n Response body: ${httpError.message} \n URL: /`;

    expect(spyLog).toHaveBeenCalledWith(expectedError);
  });
});
