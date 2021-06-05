import {Observable, Subscriber} from 'rxjs';
import {createEmitterSubscriber, createSourceSubscriber} from './helpers/queue-helpers';


export function filoQueue<T>(emit$: Observable<T | T[]>, config: { emitQueue: boolean } = {emitQueue: false}): (source$: Observable<T>) => Observable<T | T[]> {
  const queue: T[] = [];

  return (source$: Observable<T>) => {
    return new Observable<T | T[]>((observer: Subscriber<unknown>) => {
      const sourceSub = source$
        .subscribe(createSourceSubscriber(queue, observer, config));

      const emitterSub = emit$
        .subscribe(createEmitterSubscriber("pop", queue, observer, config));

      return {
        unsubscribe() {
          sourceSub.unsubscribe();
          emitterSub.unsubscribe();
        }
      };
    });
  };
}
