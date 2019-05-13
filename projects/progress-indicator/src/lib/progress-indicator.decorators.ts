import {BehaviorSubject, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

type DecoratorFunction = (target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor) => PropertyDescriptor;

export function createProgressIndicatorScope() {
  const isVisible$ = new BehaviorSubject<boolean>(false);
  const percentage$ = new BehaviorSubject<number>(0);
  const message$ = new BehaviorSubject<string>('');
  const indicatorState$ = combineLatest(isVisible$, percentage$, message$)
    .pipe(map(([isVisible, percentage, message]) => ({isVisible, percentage, message})));

  function _startProgressIndicator(startMessage: string = ''): DecoratorFunction {
    return (target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor): PropertyDescriptor => {
      const original = propertyDescriptor.value;
      propertyDescriptor.value = (...args) => {
        isVisible$.next(true);
        message$.next(startMessage);
        percentage$.next(1);
        return original.call(target, ...args);
      };
      return propertyDescriptor;
    };
  }

  function _stopProgressIndicator(target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
    const original = propertyDescriptor.value;
    propertyDescriptor.value = (...args) => {
      isVisible$.next(false);
      message$.next('');
      percentage$.next(0);
      return original.call(target, ...args);
    };
    return propertyDescriptor;
  }

  function _setState(calculateProgress: (...args) => number, setMessage?: (...args) => string): DecoratorFunction {
    return (target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor): PropertyDescriptor => {
      const original = propertyDescriptor.value;
      propertyDescriptor.value = (...args) => {
        percentage$.next(calculateProgress.call(target, ...args));
        if (typeof setMessage === 'function') {
          message$.next(setMessage.call(target, ...args));
        }
        return original.call(target, ...args);
      };
      return propertyDescriptor;
    };
  }

  return {
    start: _startProgressIndicator,
    stop: _stopProgressIndicator,
    state$: indicatorState$,
    setState: _setState
  };
}

export const { state$, start, stop, setState } = createProgressIndicatorScope();
