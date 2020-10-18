import {BehaviorSubject, Observable, of, ReplaySubject, Subject, throwError, timer} from 'rxjs';
import {map, scan, startWith, switchMap, takeWhile, tap} from 'rxjs/operators';
import {FormGroup} from '@angular/forms';

type SearchTriggers = 'START' | 'STOP'
type SearchToggleStates = 'IDLE' | 'SEARCH'

export function searchPolling<T, F extends { pollInterval: number }>(
  searchForm: FormGroup,
  searchStateSub: Subject<SearchToggleStates> | ReplaySubject<SearchToggleStates> | BehaviorSubject<SearchToggleStates>,
  fetchData: (formValue: F ) => Observable<T[] | null>
): (source$: Observable<SearchTriggers>) => Observable<T[]> {
  function setSearchStateToIdle<V>(): (s$: Observable<V>) => Observable<V> {
    return (s$) => s$.pipe(tap((_) => searchStateSub.next('IDLE')))
  }

  function usePolling(initialFormValue: F): Observable<T[]> {
    return searchForm.valueChanges.pipe(
      startWith<F, F>(initialFormValue),
      switchMap((formValue: F) => {
        const pollSource$: Observable<number> =
          formValue.pollInterval === 0 ? of(0).pipe(setSearchStateToIdle()) : timer(0, formValue.pollInterval)
        return pollSource$.pipe(map<number, F>((_) => formValue))
      }),
      switchMap(fetchData),
      takeWhile((_) => searchForm.getRawValue().pollInterval !== 0)
    )
  }

  return (source$: Observable<SearchTriggers>) =>
    source$.pipe(
      switchMap<SearchTriggers, Observable<T[]>>((event: SearchTriggers) => {
        if (event === 'STOP') {
          return of<T[]>(null).pipe(setSearchStateToIdle())
        } else if (event === 'START') {
          const formData: F = searchForm.getRawValue()

          return formData.pollInterval === 0
            ? fetchData(formData).pipe(setSearchStateToIdle())
            : usePolling(formData)
        } else {
          return throwError(
            new Error(`Search Polling can only accept 'START' and 'STOP' events, but you provided: '${event}'`)
          )
        }
      }),
      tap((_) => searchForm.markAsPristine()),
      startWith<T[], T[]>([]),
      scan((previous, next) => next || previous)
    )
}
