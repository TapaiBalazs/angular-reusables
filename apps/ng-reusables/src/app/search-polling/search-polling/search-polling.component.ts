import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {FormBuilder, Validators} from '@angular/forms';
import {delay, tap} from 'rxjs/operators';
import {searchPolling} from '../utils/search-polling.operator';

type SearchTriggers = 'START' | 'STOP'
type SearchToggleStates = 'IDLE' | 'SEARCH'

interface SearchFormValue {
  username: string
  email: string
  pollInterval: number
}


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'btp-search-polling',
  templateUrl: './search-polling.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./search-polling.component.css']
})
export class SearchPollingComponent {
  readonly searchForm = this.formBuilder.group({
    username: ['', []],
    email: ['', [Validators.email]],
    pollInterval: [0, []],
  });

  private searchActionSub = new Subject<SearchTriggers>();
  private searchStateSub = new BehaviorSubject<SearchToggleStates>('IDLE');

  readonly searchState$: Observable<SearchToggleStates> = this.searchStateSub.asObservable();

  private readonly searchAction$: Observable<SearchTriggers> = this.searchActionSub.asObservable().pipe(
    tap((action: SearchTriggers) => {
      this.searchStateSub.next(action === 'START' ? 'SEARCH' : 'IDLE');
    })
  );

  readonly searchResults$: Observable<any[]> = this.searchAction$
    .pipe(
      searchPolling<any, SearchFormValue>(this.searchForm, this.searchStateSub, this.fetchData.bind(this))
    );

  constructor(private formBuilder: FormBuilder) {
    this.searchForm.markAsDirty();
  }

  triggerSearchAction(state: SearchToggleStates): void {
    this.searchActionSub.next(state === 'IDLE' ? 'START' : 'STOP');
  }

  fetchData(formValue: SearchFormValue): Observable<any[] | null> {
    if (formValue.username.startsWith('error')) {
      // This simulates an error thrown and handled with catchError
      return of(null).pipe(
        delay(5000),
        tap(_ => console.error('Mock error')),
      );
    }
    return of([
        {username: 'bela', email: 'bela@test.com'},
        {username: 'geza', email: 'geza@test.com'}
      ].filter(user => {
        return (!formValue.username && !formValue.email)
          || user.username.includes(formValue.username || null) || user.email.includes(formValue.email || null);
      })
    ).pipe(delay(2000));
  }

}
