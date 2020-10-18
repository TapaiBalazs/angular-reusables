import {FormControl, FormGroup} from '@angular/forms';
import {of, ReplaySubject} from 'rxjs';
import {marbles} from 'rxjs-marbles';
import {searchPolling} from './search-polling.operator';
import {delay, scan, tap} from 'rxjs/operators';

describe(`SearchPolling Operator`, () => {
  let MOCK_FORM: FormGroup;
  let MOCK_SUBJECT: ReplaySubject<any>;

  beforeEach(() => {
    MOCK_FORM = new FormGroup({
      pollInterval: new FormControl(0),
    });
    MOCK_SUBJECT = new ReplaySubject(1);
  });

  it(`emits an empty array as a default value`, marbles((m) => {
    const source$ = m.hot('----');
    const expected$ = m.cold('x---', {x: []});

    m.expect(
      source$.pipe(searchPolling(MOCK_FORM, MOCK_SUBJECT, (formValue: any) => of(['test'])))
    ).toBeObservable(expected$);
  }));


  it(`should throw an error if it is misused`, marbles((m) => {
    const expectedError = new Error(
      `Search Polling can only accept 'START' and 'STOP' events, but you provided: 'WHATEVER'`
    );
    const source$ = m.hot('-a--', {a: 'WHATEVER'});
    const expected$ = m.cold('x#--', {x: []}, expectedError);

    m.expect(
      source$.pipe(searchPolling(MOCK_FORM, MOCK_SUBJECT, (formValue: any) => of(['test'])))
    ).toBeObservable(expected$);
  }));

  it(`should trigger search when the event emitted by the source is 'START' and set the search state to 'IDLE'.`, marbles(m => {
    const source$ = m.hot('--a-', {a: 'START'});
    const searchState$ = m.hot('--s-', {s: 'IDLE'});
    const expected$ = m.cold('x-y-', {x: [], y: ['test']});

    m.expect(
      source$.pipe(searchPolling(MOCK_FORM, MOCK_SUBJECT, (formValue: any) => of(['test'])))
    ).toBeObservable(expected$);
    m.expect(
      MOCK_SUBJECT.asObservable()
        .pipe(tap(_ => expect(MOCK_FORM.dirty).toBe(false)))
    ).toBeObservable(searchState$);
  }));

  it(`should unsubscribe from fetching the data if it takes too long to arrive and return the previously emitted value.`, marbles(m => {
    const source$ = m.hot('--ab', {a: 'START', b: 'STOP'});
    const expected$ = m.cold('x--x', {x: []});

    m.expect(
      source$.pipe(
        searchPolling(
          MOCK_FORM,
          MOCK_SUBJECT,
          (formValue: any) => of(['test']).pipe(delay(200))  // simulate slow response.
        )
      )
    ).toBeObservable(expected$);
  }));

  it(`should emit the previous successful value, when the data fetch encounters an error and a null value is emitted`, marbles(m => {
    let counter = 0;
    const mockData = ['firstEmmit', 'secondEmmit', 'thirdEmmit'];
    const mockFetchData = (formValue: any) => {
      if (counter === 2) {
        return of(null); // simulate caught error
      } else {
        const returnValue = mockData[counter];
        counter++;
        return of([returnValue]);
      }
    };

    const source$ = m.hot('--a-a-a', {a: 'START'});
    const expected$ = m.cold('x-y-z-z', {x: [], y: ['firstEmmit'], z: ['secondEmmit']});

    m.expect(
      source$.pipe(searchPolling(MOCK_FORM, MOCK_SUBJECT, mockFetchData))
    ).toBeObservable(expected$);

  }));

  it(`should trigger polling search when the provided FromGroups pollInterval property is not 0`, marbles((m) => {
    MOCK_FORM.setValue({
      pollInterval: 2,
    });
    const source$ = m.hot('--a------b', {a: 'START', b: 'STOP'});
    const expected$ = m.cold('x-y-y-y-yy', {x: [], y: ['test']});

    m.expect(
      source$.pipe(
        searchPolling(MOCK_FORM, MOCK_SUBJECT, (formValue: any) => of(['test']))
      )
    ).toBeObservable(expected$);
  }));

  it(`should stop a running polling search when the FromGroup's pollInterval property gets set to 0`, marbles((m) => {
    MOCK_FORM.setValue({
      pollInterval: 2,
    });
    const source$ = m.hot('--a-------', {a: 'START'});
    const searchState$ = m.hot('------s--', {s: 'IDLE'});
    const expected$ = m.cold('x-y-y-y---', {x: [], y: ['test']});

    m.expect(
      source$.pipe(
        searchPolling(MOCK_FORM, MOCK_SUBJECT, (formValue: any) => of(['test'])),
        // simulate setting the formControl on the third emmit.
        scan((previous, current, index) => {
          if (index === 2) {
            MOCK_FORM.setValue({pollInterval: 0});
            MOCK_FORM.updateValueAndValidity();
          }
          return current;
        })
      )
    ).toBeObservable(expected$);

    m.expect(MOCK_SUBJECT.asObservable()).toBeObservable(searchState$);
  }));

});
