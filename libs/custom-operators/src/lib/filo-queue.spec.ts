import {TestScheduler} from 'rxjs/testing';
import {filoQueue} from './filo-queue';

let testScheduler;

describe(`filoQueue operator`, () => {

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toStrictEqual(expected);
    });
  });

  afterEach(() => {
    testScheduler.flush();
  });

  describe(`with "emitQueue: false" configuration`, () => {
    it(`emits values in reverse order`, () => {
      testScheduler.run((helpers) => {
        const {cold, expectObservable} = helpers;

        const source$ = cold('-a-b-c-------', {a: 1, b: 2, c: 3});
        const emitter$ = cold('-------x-y-z-');

        const expected = '-------c-b-a-';

        expectObservable(source$.pipe(filoQueue<number>(emitter$))).toBe(expected, {a: 1, b: 2, c: 3});
      });
    });

    it(`emits values first in last out`, () => {
      testScheduler.run((helpers) => {
        const {cold, expectObservable} = helpers;

        const source$ = cold('-a--b--c----', {a: 1, b: 2, c: 3});
        const emitter$ = cold('-----x---y-z-');

        const expected = '-----b---c-a-';

        expectObservable(source$.pipe(filoQueue<number>(emitter$))).toBe(expected, {a: 1, b: 2, c: 3});
      });
    });

    it(`emits undefined when the queue is empty`, () => {
      testScheduler.run((helpers) => {
        const {cold, expectObservable} = helpers;

        const source$ = cold('-----');
        const emitter$ = cold('-x-y-');

        const expected = '-a-b-';

        expectObservable(source$.pipe(filoQueue<number>(emitter$))).toBe(expected, {a: undefined, b: undefined});
      });
    });

    it(`completes when the source observable completes and stops emitting`, () => {
      testScheduler.run((helpers) => {
        const {cold, expectObservable} = helpers;

        const source$ = cold('-a--b--|', {a: 1, b: 2});
        const emitter$ = cold('-----x---y-z-');

        const expected = '-----b-|';

        expectObservable(source$.pipe(filoQueue<number>(emitter$))).toBe(expected, {b: 2});
      });
    });

    it(`errors when the source observable throws an error and stops emitting`, () => {
      testScheduler.run((helpers) => {
        const {cold, expectObservable} = helpers;

        const source$ = cold('-a--b--#', {a: 1, b: 2});
        const emitter$ = cold('-----x---y-z-');

        const expected = '-----b-#';

        expectObservable(source$.pipe(filoQueue<number>(emitter$))).toBe(expected, {b: 2});
      });
    });

    it(`completes when the emitter observable completes and stops emitting`, () => {
      testScheduler.run((helpers) => {
        const {cold, expectObservable} = helpers;

        const source$ = cold('-a--b---c-', {a: 1, b: 2, c: 3});
        const emitter$ = cold('-----x-|');

        const expected = '-----b-|';

        expectObservable(source$.pipe(filoQueue<number>(emitter$))).toBe(expected, {b: 2});
      });
    });

    it(`errors when the emitter observable throws an error and stops emitting`, () => {
      testScheduler.run((helpers) => {
        const {cold, expectObservable} = helpers;

        const source$ = cold('-a--b---c-', {a: 1, b: 2, c: 3});
        const emitter$ = cold('-----x-#');

        const expected = '-----b-#';

        expectObservable(source$.pipe(filoQueue<number>(emitter$))).toBe(expected, {b: 2});
      });
    });
  });

  describe(`with "emitQueue: true" configuration`, () => {
    it(`emits the queue whenever it changes`, () => {
      testScheduler.run((helpers) => {
        const {cold, expectObservable} = helpers;

        const source$ = cold('-a--b--c----', {a: 1, b: 2, c: 3});
        const emitter$ = cold('-----x---y-z-');
        const expected = '-j--kl-m-n-o-';

        expectObservable(source$.pipe(filoQueue<number>(emitter$, {emitQueue: true})))
          .toBe(expected, {j: [1], k: [1, 2], l: [1], m: [1, 3], n: [1], o: []});
      });
    });

    it(`emits undefined when the queue is empty`, () => {
      testScheduler.run((helpers) => {
        const {cold, expectObservable} = helpers;

        const source$ = cold('-----');
        const emitter$ = cold('-x-y-');

        const expected = '-a-b-';

        expectObservable(source$.pipe(filoQueue<number>(emitter$, {emitQueue: true}))).toBe(expected, {a: [], b: []});
      });
    });
  });

});
