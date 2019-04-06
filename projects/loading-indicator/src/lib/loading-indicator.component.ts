import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {isLoading$} from './loading-indicator.decorators';

@Component({
  selector: 'lib-loading-indicator',
  template: `
    <p *ngIf="isLoading$ | async">
      loading-indicator works!
    </p>
  `,
  styles: []
})
export class LoadingIndicatorComponent {

  constructor() {
  }

  get isLoading$(): Observable<boolean> {
    return isLoading$;
  }

}
