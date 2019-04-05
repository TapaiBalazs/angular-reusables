import {Component, OnInit} from '@angular/core';
import {LoadingIndicatorService} from './loading-indicator.service';
import {Observable} from 'rxjs';

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

  constructor(private loadingIndicatorService: LoadingIndicatorService) {
  }

  get isLoading$(): Observable<boolean> {
    return this.loadingIndicatorService.isLoading$;
  }

}
