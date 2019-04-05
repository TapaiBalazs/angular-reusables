import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {
  private loadingIndicatorSubject = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  get isLoading$(): Observable<boolean> {
    return this.loadingIndicatorSubject
      .asObservable()
      .pipe(
        distinctUntilChanged()
      );
  }

  startLoadingIndicator(): void {
    this.loadingIndicatorSubject.next(true);
  }

  stopLoadingIndicator(): void {
    this.loadingIndicatorSubject.next(false);
  }
}
