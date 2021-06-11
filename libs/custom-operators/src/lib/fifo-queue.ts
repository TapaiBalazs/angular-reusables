import {Observable, Subscriber} from 'rxjs';
import {createEmitterSubscriber, createSourceSubscriber} from './helpers/queue-helpers';
import {QueueConfig} from './interfaces/queue.interfaces';

/**
 * First in, first out queue operator.
 *
 * Takes a source observable, and an emitter observable. The result observable emits every time when the
 * emitter observable emits. It always emits the value that was first added to the queue.
 *
 * If the queue is empty, but the emitter emits, the result observable emits undefined.
 *
 * If the `emitQueue` property in the passed configuration is set to true, the result observable
 * emits every time when the queue changes.
 *
 * @param emit$ observable, which triggers the result observable to emit.
 * @param config { emitQueue: false } configuration, to emit the whole queue instead of its values.
 */
export function fifoQueue<T>(emit$: Observable<unknown>, config: QueueConfig = {emitQueue: false}): (source$: Observable<T>) => Observable<T | T[]> {
  const queue: T[] = [];

  return (source$: Observable<T>) => {
    return new Observable<T | T[]>((observer: Subscriber<unknown>) => {
      const sourceSub = source$
        .subscribe(createSourceSubscriber(queue, observer, config));

      const emitterSub = emit$
        .subscribe(createEmitterSubscriber('shift', queue, observer, config, sourceSub));

      return {
        unsubscribe() {
          sourceSub.unsubscribe();
          emitterSub.unsubscribe();
        }
      };
    });
  };
}
