import {BehaviorSubject, combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';

type DecoratorFunction = (target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor) => PropertyDescriptor;

export const {progressState$, startProgressIndicator, stopProgressIndicator, setState} = (() => {
  const isVisible = new BehaviorSubject<boolean>(false);
  const percengate = new BehaviorSubject<number>(0);
  const message = new BehaviorSubject<string>('');
  const state = combineLatest(isVisible, percengate, message)
    .pipe(
      map(([isVisible$, percentage$, message$]) => {
          return {
            isVisible$,
            percentage$,
            message$
          };
        }
      )
    );

  const getDefaultMessage = (...args) => message.getValue();

  function _startProgressIndicator(startMessage: string = ''): DecoratorFunction{
    return (target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor): PropertyDescriptor => {
      const original = propertyDescriptor.value;
      propertyDescriptor.value = (...args) => {
        isVisible.next(true);
        message.next(startMessage);
        percengate.next(1);
        return original.call(target, ...args);
      };
      return propertyDescriptor;
    };
  }

  function _stopProgressIndicator(target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor): PropertyDescriptor {
    const original = propertyDescriptor.value;
    propertyDescriptor.value = (...args) => {
      isVisible.next(false);
      message.next('');
      percengate.next(0);
      return original.call(target, ...args);
    };
    return propertyDescriptor;
  }

  function _setState(calculateProgress: (...args) => number, setMessage: (...args) => string = getDefaultMessage): DecoratorFunction {
    return (target: any, propertyKey: string | symbol, propertyDescriptor: PropertyDescriptor): PropertyDescriptor => {
      const original = propertyDescriptor.value;
      propertyDescriptor.value = (...args) => {
        percengate.next(calculateProgress.call(target, ...args));
        message.next(setMessage.call(target, ...args));
        return original.call(target, ...args);
      };
      return propertyDescriptor;
    };
  }

  return {
    startProgressIndicator: _startProgressIndicator,
    stopProgressIndicator: _stopProgressIndicator,
    progressState$: state,
    setState: _setState
  };
})();
