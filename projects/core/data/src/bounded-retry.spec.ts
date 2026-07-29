import {fakeAsync, tick} from '@angular/core/testing';
import {concat, defer, of as obsOf, throwError} from 'rxjs';

import {boundedRetry} from './bounded-retry';

/**
 * Builds a source that counts its subscriptions, so the number of attempts is
 * observable.
 */
function failingSource(counter: {attempts: number}) {
  return defer(() => {
    counter.attempts++;
    return throwError(() => new Error('nope'));
  });
}

describe('boundedRetry', () => {
  it('should retry the configured number of times and then rethrow', fakeAsync(() => {
    const counter = {attempts: 0};
    let error: any = null;

    failingSource(counter)
      .pipe(boundedRetry({count: 3, delay: 100}))
      .subscribe({error: err => (error = err)});
    tick(300);

    // One initial attempt plus three retries.
    expect(counter.attempts).toBe(4);
    expect(error?.message).toBe('nope');
  }));

  it('should wait the configured delay between attempts', fakeAsync(() => {
    const counter = {attempts: 0};

    failingSource(counter)
      .pipe(boundedRetry({count: 2, delay: 1000}))
      .subscribe({error: () => {}});

    expect(counter.attempts).toBe(1);
    tick(999);
    expect(counter.attempts).toBe(1);
    tick(1);
    expect(counter.attempts).toBe(2);
    tick(1000);
    expect(counter.attempts).toBe(3);
  }));

  it('should stop retrying as soon as an attempt succeeds', fakeAsync(() => {
    let attempts = 0;
    const values: string[] = [];

    defer(() => {
      attempts++;
      return attempts < 3 ? throwError(() => new Error('nope')) : obsOf('ok');
    })
      .pipe(boundedRetry<string>({count: 5, delay: 100}))
      .subscribe(v => values.push(v));
    tick(200);

    expect(attempts).toBe(3);
    expect(values).toEqual(['ok']);
  }));

  it('should reset the attempt budget after a successful emission', fakeAsync(() => {
    let attempts = 0;
    const values: number[] = [];

    // Emits, then fails, every time. With a budget of 1 and no reset this would
    // stop after two attempts; the reset keeps it going.
    const sub = defer(() => {
      attempts++;
      return concat(obsOf(attempts), throwError(() => new Error('nope')));
    })
      .pipe(boundedRetry<number>({count: 1, delay: 100}))
      .subscribe({next: v => values.push(v), error: () => {}});
    tick(500);
    sub.unsubscribe();

    expect(attempts).toBeGreaterThan(2);
    expect(values.length).toBeGreaterThan(2);
  }));

  it('should not retry a source that never fails', fakeAsync(() => {
    let attempts = 0;
    const values: string[] = [];

    defer(() => {
      attempts++;
      return obsOf('ok');
    })
      .pipe(boundedRetry<string>())
      .subscribe(v => values.push(v));
    tick(0);

    expect(attempts).toBe(1);
    expect(values).toEqual(['ok']);
  }));
});
