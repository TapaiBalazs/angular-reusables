import {noop, Observer, Subject, Subscription} from 'rxjs';
import {QueueConfig} from '../interfaces/queue.interfaces';

export function createSourceSubscriber<T>(queue: T[], observer: Observer<T | T[]>, config: QueueConfig): Observer<T | T[]> {
  return {
    next: (value: T) => {
      queue.push(value);
      if (config.emitQueue) {
        observer.next([...queue]);
      }
    },
    error: error => observer.error(error),
    complete: noop
  };
}

export function createEmitterSubscriber<T>(arrayMethod: 'pop' | 'shift', queue: T[], observer: Observer<T | T[]>, config: QueueConfig, sourceSub: Subscription): Observer<T | T[]> {
  return {
    next: () => {
      const value = queue[arrayMethod]();
      if (config.emitQueue) {
        observer.next([...queue]);
      } else {
        observer.next(value);
      }
    },
    error: error => observer.error(error),
    complete: () => {
      sourceSub.unsubscribe();
      observer.complete();
    }
  };
}
