import {TestScheduler} from 'rxjs/testing';
import {fifoQueue} from './fifo-queue';

let testScheduler

describe(`fifoQueue operator`, () => {

  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toStrictEqual(expected);
    });
  })

  afterEach(() => {
    testScheduler.flush();
  })

  describe(`with "emitQueue: false" configuration`, () => {
    it(`emits values first in first out`, () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;

        const source$ = cold( '-a--b--c----', { a: 1, b: 2, c: 3});
        const emitter$ = cold('-----x---y-z-');

        const expected = '-----a---b-c-';

        expectObservable(source$.pipe(fifoQueue<number>(emitter$))).toBe(expected, { a: 1, b: 2, c: 3});
      });
    });

    it(`completes when the source observable completes and stops emitting`, () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;

        const source$ = cold( '-a--b--|', { a: 1, b: 2});
        const emitter$ = cold('-----x---y-z-');

        const expected = '-----a-|';

        expectObservable(source$.pipe(fifoQueue<number>(emitter$))).toBe(expected, { a: 1 });
      });
    });

    it(`emits undefined when the queue is empty`, () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;

        const source$ = cold( '-----');
        const emitter$ = cold('-x-y-');

        const expected = '-a-b-';

        expectObservable(source$.pipe(fifoQueue<number>(emitter$))).toBe(expected, { a: undefined, b: undefined});
      });
    });

    it(`errors when the source observable throws an error and stops emitting`, () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;

        const source$ = cold( '-a--b--#', { a: 1, b: 2});
        const emitter$ = cold('-----x---y-z-');

        const expected = '-----a-#';

        expectObservable(source$.pipe(fifoQueue<number>(emitter$))).toBe(expected, { a: 1 });
      });
    });

    it(`completes when the emitter observable completes and stops emitting`, () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;

        const source$ = cold( '-a--b---c-', { a: 1, b: 2, c: 3});
        const emitter$ = cold('-----x-|');

        const expected = '-----a-|';

        expectObservable(source$.pipe(fifoQueue<number>(emitter$))).toBe(expected, { a: 1 });
      });
    });

    it(`errors when the emitter observable throws an error and stops emitting`, () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;

        const source$ = cold( '-a--b---c-', { a: 1, b: 2, c: 3});
        const emitter$ = cold('-----x-#');

        const expected = '-----a-#';

        expectObservable(source$.pipe(fifoQueue<number>(emitter$))).toBe(expected, { a: 1 });
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

        expectObservable(source$.pipe(fifoQueue<number>(emitter$, {emitQueue: true})))
          .toBe(expected, {j: [1], k: [1, 2], l: [2], m: [2, 3], n: [3], o: []});
      });
    });

    it(`emits undefined when the queue is empty`, () => {
      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;

        const source$ = cold( '-----');
        const emitter$ = cold('-x-y-');

        const expected = '-a-b-';

        expectObservable(source$.pipe(fifoQueue<number>(emitter$, {emitQueue: true}))).toBe(expected, { a: [], b: []});
      });
    });
  });

});
