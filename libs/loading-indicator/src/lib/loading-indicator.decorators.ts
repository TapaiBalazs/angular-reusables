import {BehaviorSubject, Observable, Subscriber} from 'rxjs';
import {filter, map, pluck, share, tap} from 'rxjs/operators';

const indicatorSubject = new BehaviorSubject<boolean>(false);

const indicatorState$ = indicatorSubject.asObservable().pipe(share());

const indicatorStart$ = indicatorState$.pipe(filter(indicatorState => indicatorState));
const indicatorStop$ = indicatorState$.pipe(filter(indicatorState => !indicatorState));

export const isLoading$ = indicatorStart$.pipe(
  fifoQueue(indicatorStop$, {emitQueue: true}),
  pluck('length'),
  map(Boolean),
);

function fifoQueue<T>(emit$: Observable<T | T[]>, config: { emitQueue: boolean } = {emitQueue: false}): (source$: Observable<T>) => Observable<T | T[]> {
  const values: T[] = [];

  return (source$: Observable<T>) => {
    return new Observable<T | T[]>((observer: Subscriber<unknown>) => {
      const sourceSub = source$
        .subscribe({
          next: (value) => {
            values.push(value);
            if (config.emitQueue) {
              observer.next(values);
            }
          },
          error: observer.error,
          complete: observer.complete
        });

      const emitterSub = emit$
        .subscribe(({
          next: () => {
            const value = values.shift();
            if (config.emitQueue) {
              observer.next(values);
            } else {
              observer.next(value);
            }
          },
          error: observer.error,
          complete: observer.complete
        }));

      return {
        unsubscribe() {
          sourceSub.unsubscribe();
          emitterSub.unsubscribe();
        }
      };
    });
  };
}


export function startLoadingIndicator(): (target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor) => any {
  return (target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor): any => {
    const original = propertyDescriptor.value;
    propertyDescriptor.value = function(...args: any[]) {
      indicatorSubject.next(true);
      return original.call(this, ...args);
    };
    return propertyDescriptor;
  };
}

export function stopLoadingIndicator(): (target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor) => any {
  return (target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor): any => {
    const original = propertyDescriptor.value;
    propertyDescriptor.value = function(...args: any[]) {
      indicatorSubject.next(false);
      return original.call(this, ...args);
    };
    return propertyDescriptor;
  };
}

export function tapStopLoadingIndicator<T>(): (s$: Observable<T>) => Observable<T> {
  return s$ => s$.pipe(
    tap({
      next: stopLoadingIndicatorStateless,
      error: stopLoadingIndicatorStateless,
      complete: stopLoadingIndicatorStateless,
    })
  );
}

function stopLoadingIndicatorStateless(): void {
  indicatorSubject.next(false);
}
