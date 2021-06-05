import {Observer, Subscription} from 'rxjs';


export function createSourceSubscriber<T>(queue: T[], observer: Observer<T | T[]>, config): Observer<T | T[]> {
  return {
    next: (value: T) => {
      queue.push(value);
      if (config.emitQueue) {
        observer.next([...queue]);
      }
    },
    error: error => {
      observer.error(error);
      this.error(error);
    },
    complete: () => {
      observer.complete();
      this.complete();
    }
  };
}

export function createEmitterSubscriber<T>(arrayMethod: 'pop' | 'shift', queue: T[], observer: Observer<T | T[]>, config): Observer<T | T[]> {
  return {
    next: () => {
      const value = queue[arrayMethod]();
      if (config.emitQueue) {
        observer.next([...queue]);
      } else {
        observer.next(value);
      }
    },
    error: error => {
      observer.error(error);
      this.error(error);
    },
    complete: () => {
      observer.complete();
      this.complete();
    }
  };
}
