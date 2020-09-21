import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

const indicatorSubject = new BehaviorSubject<boolean>(false);

export const isLoading$ = indicatorSubject.asObservable().pipe(distinctUntilChanged());

export function startLoadingIndicator(target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor): any {
  const original = propertyDescriptor.value;
  propertyDescriptor.value = function (...args: any[]) {
    indicatorSubject.next(true);
    const result = original.call(this, ...args);
    return result;
  };
  return propertyDescriptor;
}

export function stopLoadingIndicator(target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor): any {
  const original = propertyDescriptor.value;
  propertyDescriptor.value = function (...args: any[]) {
    indicatorSubject.next(false);
    const result = original.call(this, ...args);
    return result;
  };
  return propertyDescriptor;
}
