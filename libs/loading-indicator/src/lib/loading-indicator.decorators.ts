import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, tap} from 'rxjs/operators';

const indicatorSubject = new BehaviorSubject<boolean>(false);

export const isLoading$ = indicatorSubject.asObservable().pipe(distinctUntilChanged());

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
