import {createProgressIndicatorScope} from './progress-indicator.decorators';
import {skip, take} from 'rxjs/operators';
import {async} from '@angular/core/testing';

describe(`ProgressIndicatorDecorators`, () => {
  let startProgress;
  let stopProgress;
  let setProgressState;
  let state$;
  let testHarness: any;

  beforeEach(() => {
    const scope = createProgressIndicatorScope();

    startProgress = scope.start;
    stopProgress = scope.stop;
    setProgressState = scope.setState;
    state$ = scope.state$;

    class TestClass {
      @startProgress('startMessage')
      startMethod() {
        console.log('started');
      }
    }

    testHarness = new TestClass();
  });

  it(`A decorated function sets visibility and progress on the state`, async(() => {
    testHarness.startMethod();

    state$
      .pipe(take(2), skip(1))
      .subscribe((state) => {
        expect(state.isVisible).toBe(true);
        expect(state.percentage).toEqual(1);
        expect(state.message).toEqual('startMessage');
      });
  }));
});
